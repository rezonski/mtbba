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

    nivelatePathLine(featuresCollection) {
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
        let elevationNivelatedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        CommonHelper.getLineStrings(elevationNivelatedFeaturesCollection)[0].geometry.coordinates = pathLineMasterd;
        return elevationNivelatedFeaturesCollection;
    }

    interpolatePathLine(featuresCollection) {
        let interpolatedPathLine = [];
        let prevPoint = [];
        // let currLocOut = {};
        const nivelatedPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        nivelatedPathLine.forEach((location, index) => {
            const segmentDistanceMeters = (turf.distance(turf.point([prevPoint[0], prevPoint[1]]), turf.point([location[0], location[1]])) * 1000); // in meters
            if (index > 0) {
                if (segmentDistanceMeters > 10) {
                    const countAdditionSegments = Math.round(segmentDistanceMeters / 5);
                    const elevStep = (location[2] - prevPoint[2]) / countAdditionSegments;
                    const lineSegment = {
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: [prevPoint, location],
                        },
                    };
                    for (let i = 0; i < countAdditionSegments; i++) {
                        // console.log('Calculate distance using Turf.js');
                        const segment = turf.along(lineSegment, i / (segmentDistanceMeters * 1000), 'kilometers'); // ovo je ok
                        // console.log('Distance: ' + segment);
                        const newPoint = segment.geometry.coordinates;
                        newPoint.push((prevPoint[2] + (i * elevStep))); // add elevation to new points
                        interpolatedPathLine.push(newPoint);
                    }
                } else {
                    interpolatedPathLine.push(location);
                }
            } else {
                interpolatedPathLine.push(location);
            }
            prevPoint = JSON.parse(JSON.stringify(location));
        });

        let interpolatedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        CommonHelper.getLineStrings(interpolatedFeaturesCollection)[0].geometry.coordinates = interpolatedPathLine;
        return interpolatedFeaturesCollection;
    }

    enrichPathLine(featuresCollection) {
        let enrichedPathLine = [];
        let prevLoc = {};
        let prevPoint = [];
        // let currLocOut = {};
        const interpolatedPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        interpolatedPathLine.forEach((location, index) => {
            let elevationCalc = 0;
            let currLoc;
            if (index > 0) {
                elevationCalc = (!location[2]) ? prevLoc.elevation : location[2];
                const prevDist = turf.distance(turf.point([prevPoint[0], prevPoint[1]]), turf.point([location[0], location[1]]));
                const elevDelta = elevationCalc - prevLoc.elevation;
                currLoc = {
                    lon: location[0],
                    lat: location[1],
                    elevation: elevationCalc,
                    prev_elev: elevDelta,
                    elev_gain: (elevDelta > 0) ? (prevLoc.elev_gain + elevDelta) : prevLoc.elev_gain,
                    elev_loss: (elevDelta < 0) ? (prevLoc.elev_loss + elevDelta) : prevLoc.elev_loss,
                    odometer: prevLoc.odometer + prevDist,
                    prev_dist: prevDist,
                };
            } else {
                elevationCalc = (location[2] === undefined) ? 0 : location[2];
                currLoc = {
                    lon: location[0],
                    lat: location[1],
                    elevation: elevationCalc,
                    prev_elev: 0,
                    elev_gain: 0,
                    elev_loss: 0,
                    odometer: 0,
                    prev_dist: 0,
                };
            }
            enrichedPathLine.push(currLoc);
            // currLocOut = JSON.parse(JSON.stringify(currLoc));
            prevLoc = JSON.parse(JSON.stringify(currLoc));
            prevPoint = JSON.parse(JSON.stringify(location));
        });

        let enrichedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        CommonHelper.getLineStrings(enrichedFeaturesCollection)[0].geometry.coordinates = enrichedPathLine;
        return enrichedFeaturesCollection;
    }

    getGeneralFacts(featuresCollection) {
        let maxLon = 0;
        let minLon = 999999;
        let maxLat = 0;
        let minLat = 999999;
        let maxElev = 0;
        let minElev = 999999;
        let totaldistance = 0; // in kms
        let totalelevgain = 0; // in kms
        let totalelevloss = 0; // in kms
        let exportGeneralFacts = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].properties;
        let generateGeneralFactsProgressPayload = {
            status: 'progress',
            id: 'progressFlattenPath',
            loaded: 0,
            total: 100,
        };

        const newPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;

        newPathLine.forEach((location) => {
            maxLon = Math.max(maxLon, location.lon);
            minLon = Math.min(minLon, location.lon);
            maxLat = Math.max(maxLat, location.lat);
            minLat = Math.min(minLat, location.lat);
            maxElev = Math.max(maxElev, location.elevation);
            minElev = Math.min(minElev, location.elevation);
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
        exportGeneralFacts.elev_gain = totalelevgain;
        exportGeneralFacts.elev_loss = totalelevloss;

        // Bounds calculation
        const lonDelta = (maxLon - minLon) / 1;
        const latDelta = (maxLat - minLat) / 1;
        exportGeneralFacts.bounds = [[(maxLon + lonDelta), (maxLat + latDelta)], [(minLon - lonDelta), (minLat - latDelta)]];

        const lonCenter = (maxLon + minLon) / 2;
        const latCenter = (maxLat + minLat) / 2;
        exportGeneralFacts.center = [lonCenter, latCenter];
        exportGeneralFacts.elev_min = minElev;
        exportGeneralFacts.elev_max = maxElev;

        generateGeneralFactsProgressPayload.loaded = 100;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, generateGeneralFactsProgressPayload);

        return exportGeneralFacts;
    }

    // getDistanceFromLatLonInMeters(lon1, lat1, lon2, lat2) {
    //     const R = 6371;
    //     const dLat = this.deg2rad(lat2 - lat1);
    //     const dLon = this.deg2rad(lon2 - lon1);
    //     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     const d = R * c * 1000;
    //     return d;
    // }

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
