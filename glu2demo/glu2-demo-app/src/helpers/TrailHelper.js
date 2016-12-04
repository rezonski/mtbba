/* global turf */
import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import CommonHelper from '/helpers/CommonHelper';

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

    simplifyLineString(featuresCollection) {
        let returnCollection = JSON.parse(JSON.stringify(featuresCollection));
        CommonHelper.getLineStrings(returnCollection).forEach((feature, featureIndex) => {
            returnCollection[featureIndex] = turf.simplify(feature, 0.01, true); // feature, tolerance, highQuality
        });
        const progressPayload = {
            status: 'progress',
            id: 'progressSimplifyPath',
            loaded: 1,
            total: 1,
        };
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endSimplifyingRoute'));
        return returnCollection;
    }

    flattenPathLine(featuresCollection) {
        let pathLineMasterd = [];
        let prevLoc = {};
        const pathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        let flattenProgressPayload = {
            status: 'progress',
            id: 'progressFlattenPath',
            loaded: 0,
            total: pathLine.length,
        };
        pathLine.forEach((location, index) => {
            let elevationCalc = 0;
            if (index > 0) {
                elevationCalc = (!location[2]) ? prevLoc.elevation : location[2];
            } else {
                elevationCalc = (location[2] === undefined) ? 0 : location[2];
            }
            pathLineMasterd.push([location[0], location[1], elevationCalc]);
            if (index % 10 === 0) {
                flattenProgressPayload.loaded = parseInt(index / 2, 10);
                GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, flattenProgressPayload);
            }
        });
        let flattenFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        CommonHelper.getLineStrings(flattenFeaturesCollection)[0].geometry.coordinates = pathLineMasterd;
        return flattenFeaturesCollection;
    }

    enrichPathLine(featuresCollection) {
        let newPathLine = [];
        let prevLoc = {};
        let currLocOut = {};
        const pathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
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
            newPathLine.push(currLoc);
        });

        let enrichedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        CommonHelper.getLineStrings(enrichedFeaturesCollection)[0].geometry.coordinates = newPathLine;
        return enrichedFeaturesCollection;
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
        let retSegment = surfaceCollection[0];
        if (surfaceCollection !== undefined && surfaceCollection.length > 0) {
            surfaceCollection.forEach((cutpoint) => {
                if (odometer > cutpoint[0]) {
                    retSegment = cutpoint;
                }
            });
        }
        return retSegment;
    }

    getSurfaceTypeByName(name) {
        let returnSurfaceType = this.surfaceTypes[0];
        if (this.surfaceTypes !== undefined && this.surfaceTypes.length > 0) {
            this.surfaceTypes.forEach((element) => {
                if (element.name === name) {
                    returnSurfaceType = element;
                }
            });
        }
        return returnSurfaceType;
    }
}
export default new TrailHelper();
