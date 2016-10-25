import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';

class TrailHelper extends GLU.Controller {
    constructor(props) {
        super(props);
        this.surfaceTypes = [];
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialSetupRetrieved,
        });
    }

    onInitialSetupRetrieved(payload) {
        this.surfaceTypes = payload.surfaceTypes;
    }

    reducePathLinePoints(inputPointsArray, toleranceInMeters) {
        let returnArray = [];
        const maxIndx = inputPointsArray.length - 1;
        let currentIndex;
        let iterator = 1;
        let nextIndex;
        let escaped = false;
        let tempDistance = 0;
        let progressPayload;

        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startSimplifyingRoute'));

        while (iterator < maxIndx) {
            currentIndex = parseInt(iterator, 10);
            escaped = false;
            nextIndex = parseInt(iterator, 10) + 1;

            while (nextIndex < maxIndx) {
                iterator = parseInt(nextIndex, 10);
                tempDistance = this.getDistanceFromLatLonInMeters(inputPointsArray[currentIndex][0], inputPointsArray[currentIndex][1], inputPointsArray[nextIndex][0], inputPointsArray[nextIndex][1]);
                if (tempDistance > toleranceInMeters) {
                    returnArray.push(inputPointsArray[nextIndex]);
                    escaped = true;
                    currentIndex = parseInt(nextIndex, 10);
                    nextIndex = parseInt(maxIndx, 10); // Escape
                } else {
                    nextIndex++; // Check next point
                }
            }

            progressPayload = {
                status: 'progress',
                id: 'progressSimplifyPath',
                loaded: nextIndex,
                total: maxIndx,
            };

            if (nextIndex === maxIndx && !escaped) {
                iterator = parseInt(maxIndx, 10);
                GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
            } else {
                iterator = parseInt(currentIndex, 10);
                if (iterator % 10 === 0) {
                    GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
                }
            }
        }
        returnArray.push(inputPointsArray[maxIndx]);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endSimplifyingRoute'));
        return returnArray;
    }

    flattenPathLine(pathLine) {
        let newPathLine = [];
        let pathLineMasterd = [];
        let prevLoc = {};
        let currLocOut = {};
        let flattenProgressPayload = {
            status: 'progress',
            id: 'progressFlattenPath',
            loaded: 0,
            total: pathLine.length,
        };
        pathLine.forEach((location, index) => {
            let elevationCalc = 0;
            let currLoc;
            if (index > 0) {
                elevationCalc = (!location[2]) ? prevLoc.elevation : location[2];
                currLoc = {
                    lon: location[0],
                    lat: location[1],
                    elevation: elevationCalc,
                    prev_dist: this.getDistanceFromLatLonInMeters(prevLoc.lon, prevLoc.lat, location[0], location[1]) / 1000,
                    prev_elev: elevationCalc - prevLoc.elevation,
                };
            } else {
                elevationCalc = (location[2] === undefined) ? 0 : location[2];
                currLoc = {
                    lon: location[0],
                    lat: location[1],
                    elevation: elevationCalc,
                    prev_dist: 0,
                    prev_elev: 0,
                };
            }
            currLocOut = JSON.parse(JSON.stringify(currLoc));
            prevLoc = JSON.parse(JSON.stringify(currLocOut));
            // New enriched path line
            newPathLine.push(currLoc);
            // For vertical profile and map
            pathLineMasterd.push([location[0], location[1], elevationCalc]);
            if (index % 10 === 0) {
                flattenProgressPayload.loaded = parseInt(index / 2, 10);
                GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, flattenProgressPayload);
            }
        });
        return {
            enrichedPathLine: newPathLine,
            mapProfilePathLine: pathLineMasterd,
        };
    }

    getGeneralFacts(newPathLine) {
        let maxLon = 0;
        let minLon = 999999;
        let maxLat = 0;
        let minLat = 999999;
        let maxElev = 0;
        let minElev = 999999;
        let totaldistance = 0; // in kms
        let totalelevgain = 0; // in kms
        let totalelevloss = 0; // in kms
        let exportGeneralFacts = {};
        let generateGeneralFactsProgressPayload = {
            status: 'progress',
            id: 'progressFlattenPath',
            loaded: 0,
            total: 100,
        };

        newPathLine.forEach((location) => {
            if (location.lon >= maxLon) {
                maxLon = location.lon;
            }
            if (location.lon <= minLon) {
                minLon = location.lon;
            }
            if (location.lat >= maxLat) {
                maxLat = location.lat;
            }
            if (location.lat <= minLat) {
                minLat = location.lat;
            }
            if (location.elevation >= maxElev) {
                maxElev = location.elevation;
            }
            if (location.elevation <= minElev) {
                minElev = location.elevation;
            }
        });

        generateGeneralFactsProgressPayload.loaded = 80;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, generateGeneralFactsProgressPayload);

        // Distance and elevation

        for (let i = 0; i < newPathLine.length; i++) {
            totaldistance += newPathLine[i].prev_dist;
            if (newPathLine[i].prev_elev > 0) {
                totalelevgain += newPathLine[i].prev_elev;
            } else {
                totalelevloss += newPathLine[i].prev_elev;
            }
        }
        exportGeneralFacts.distance = totaldistance;
        exportGeneralFacts.elevgain = totalelevgain;
        exportGeneralFacts.elevloss = totalelevloss;

        // Bounds calculation
        const lonDelta = (maxLon - minLon) / 1;
        const latDelta = (maxLat - minLat) / 1;
        exportGeneralFacts.bounds = [[(maxLon + lonDelta), (maxLat + latDelta)], [(minLon - lonDelta), (minLat - latDelta)]];

        exportGeneralFacts.lonCenter = (maxLon + minLon) / 2;
        exportGeneralFacts.latCenter = (maxLat + minLat) / 2;
        exportGeneralFacts.elevMin = minElev;
        exportGeneralFacts.elevMax = maxElev;

        generateGeneralFactsProgressPayload.loaded = 100;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, generateGeneralFactsProgressPayload);

        return exportGeneralFacts;
    }

    getDistanceFromLatLonInMeters(lon1, lat1, lon2, lat2) {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c * 1000;
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    getSegmentByOdometer(odometer, surfaceCollection) {
        if (surfaceCollection !== undefined && surfaceCollection.length > 0) {
            surfaceCollection.forEach((cutpoint) => {
                if (odometer > cutpoint[0]) {
                    return cutpoint;
                }
            });
        }
        return surfaceCollection[0];
    }

    getSurfaceTypeByName(name) {
        if (this.surfaceTypes !== undefined && this.surfaceTypes.length > 0) {
            this.surfaceTypes.forEach((element) => {
                if (element.name === name) {
                    return element;
                }
            });
        }
        return this.surfaceTypes[0];
    }
}
export default new TrailHelper();
