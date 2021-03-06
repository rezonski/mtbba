/* global turf */
import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import CommonHelper from '/helpers/CommonHelper';
import TrailsDataModel from '/dataSources/TrailsDataModel';

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

    calculateZoomLevel(feature) {
        const features = turf.featureCollection([feature]);
        const bbox = turf.bbox(features);
        const squared = turf.bboxPolygon(turf.square(bbox));
        const area = turf.area(squared) / 1000000; // in square kilometers
        const radius = Math.sqrt(area);
        if (radius > 110) {
            return 7;
        } else if (radius > 75) {
            return 8;
        } else if (radius > 50) {
            return 9;
        } else if (radius > 30) {
            return 10;
        } else if (radius > 15) {
            return 11;
        } else if (radius > 10) {
            return 12;
        } else if (radius > 5) {
            return 13;
        }
        return 14;
        // const pt0 = turf.point(bounds[0]);
        // const pt1 = turf.point(bounds[1]);
        // const distance = turf.distance(pt0, pt1);
        // if (distance > 70) {
        //     return 8;
        // } else if (distance > 40) {
        //     return 9;
        // } else if (distance > 20) {
        //     return 10;
        // } else if (distance > 10) {
        //     return 11;
        // }
        // return 12;
    }

    simplifyLineString(featuresCollection) {
        const inputLines = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)));
        let inputPoints = CommonHelper.getPoints(JSON.parse(JSON.stringify(featuresCollection)));
        inputLines.forEach((feature) => {
            // inputPoints.push(turf.simplify(feature, 0.001, true)); // feature, tolerance, highQuality
            inputPoints.push(feature); // feature, tolerance, highQuality
        });
        const progressPayload = {
            status: 'progress',
            id: 'progressSimplifyPath',
            loaded: 1,
            total: 1,
        };
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endSimplifyingRoute'));
        const returnCollection = turf.featureCollection(inputPoints);
        return returnCollection;
    }

    nivelatePathLine(featuresCollection) {
        // let pathLineMasterd = [];
        // let prevLoc = {};
        // const pathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        // let flattenProgressPayload = {
        //     status: 'progress',
        //     id: 'progressFlattenPath',
        //     loaded: 0,
        //     total: pathLine.length,
        // };
        // pathLine.forEach((location, index) => {
        //     let elevationCalc = 0;
        //     if (index > 0) {
        //         elevationCalc = (!location[2]) ? prevLoc.elevation : location[2];
        //     } else {
        //         elevationCalc = (location[2] === undefined) ? 0 : location[2];
        //     }
        //     pathLineMasterd.push([location[0], location[1], elevationCalc]);
        //     if (index % 10 === 0) {
        //         flattenProgressPayload.loaded = parseInt(index / 2, 10);
        //         GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, flattenProgressPayload);
        //     }
        // });
        // let elevationNivelatedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        // CommonHelper.getLineStrings(elevationNivelatedFeaturesCollection)[0].geometry.coordinates = pathLineMasterd;
        // return elevationNivelatedFeaturesCollection;
        return featuresCollection;
    }

    // interpolatePathLine(featuresCollection) {
    //     let interpolatedPathLine = [];
    //     let prevPoint = [];
    //     // let currLocOut = {};
    //     const nivelatedPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
    //     nivelatedPathLine.forEach((location, index) => {
    //         const segmentDistanceMeters = (turf.distance(turf.point([prevPoint[0], prevPoint[1]]), turf.point([location[0], location[1]])) * 1000); // in meters
    //         if (index > 0) {
    //             if (segmentDistanceMeters > 10) {
    //                 const countAdditionSegments = Math.round(segmentDistanceMeters / 5);
    //                 const elevStep = (location[2] - prevPoint[2]) / countAdditionSegments;
    //                 const lineSegment = {
    //                     type: 'Feature',
    //                     geometry: {
    //                         type: 'LineString',
    //                         coordinates: [prevPoint, location],
    //                     },
    //                 };
    //                 for (let i = 0; i < countAdditionSegments; i++) {
    //                     // console.log('Calculate distance using Turf.js');
    //                     const segment = turf.along(lineSegment, i / (segmentDistanceMeters * 1000), 'kilometers'); // ovo je ok
    //                     // console.log('Distance: ' + segment);
    //                     const newPoint = segment.geometry.coordinates;
    //                     newPoint.push((prevPoint[2] + (i * elevStep))); // add elevation to new points
    //                     interpolatedPathLine.push(newPoint);
    //                 }
    //             } else {
    //                 interpolatedPathLine.push(location);
    //             }
    //         } else {
    //             interpolatedPathLine.push(location);
    //         }
    //         prevPoint = JSON.parse(JSON.stringify(location));
    //     });

    //     let interpolatedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
    //     CommonHelper.getLineStrings(interpolatedFeaturesCollection)[0].geometry.coordinates = interpolatedPathLine;
    //     return interpolatedFeaturesCollection;
    // }

    enrichPathLine(featuresCollection) {
        let enrichedPathLine = [];
        let prevLoc = {};
        let prevPoint = [];
        // let recalculateElevation = false;
        // let currLocOut = {};
        const inputLines = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)));
        const pathLine = inputLines[0].geometry.coordinates;

        pathLine.forEach((location, index) => {
            let elevationCalc = 0;
            let currLoc;
            if (index > 0) {
                elevationCalc = (!location[2]) ? prevLoc.elevation : location[2];
                const prevDist = turf.distance(turf.point([prevPoint[0], prevPoint[1]]), turf.point([location[0], location[1]]));
                let elevDelta = elevationCalc - prevLoc.elevation;
                const slope = (elevDelta / (prevDist * 1000)) * 100;

                if (Math.abs(slope) > TrailsDataModel.activeTrail.getElevationTreshold().sl) {
                    // console.info('Fix elevation ' + elevationCalc + ' on index ' + index + ' slope overload');
                    elevationCalc = (elevationCalc + prevLoc.elevation) / 2;
                    elevDelta = elevationCalc - prevLoc.elevation;
                    // recalculateElevation = true;
                }

                currLoc = {
                    lon: location[0],
                    lat: location[1],
                    elevation: elevationCalc,
                    prevElev: elevDelta,
                    elevGain: (elevDelta > 0) ? (prevLoc.elevGain + elevDelta) : prevLoc.elevGain,
                    elevLoss: (elevDelta < 0) ? (prevLoc.elevLoss + elevDelta) : prevLoc.elevLoss,
                    odometer: prevLoc.odometer + prevDist,
                    prevDist,
                    slope,
                };
            } else {
                elevationCalc = (location[2] === undefined) ? 0 : location[2];
                currLoc = {
                    lon: location[0],
                    lat: location[1],
                    elevation: elevationCalc,
                    prevElev: 0,
                    elevGain: 0,
                    elevLoss: 0,
                    odometer: 0,
                    prevDist: 0,
                    slope: 0,
                };
            }
            enrichedPathLine.push(currLoc);
            // currLocOut = JSON.parse(JSON.stringify(currLoc));
            prevLoc = JSON.parse(JSON.stringify(currLoc));
            prevPoint = JSON.parse(JSON.stringify(location));
        });

        let enrichedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        CommonHelper.getLineStrings(enrichedFeaturesCollection)[0].geometry.coordinates = enrichedPathLine;

        // if (recalculateElevation) {
        //     TrailsDataModel.activeTrail.recalculateElevation(enrichedPathLine);
        // }

        return enrichedFeaturesCollection;
    }

    getGeneralFacts(enrichedFeaturesCollection, interpolatedFeaturesCollection) {
        // let maxLon = 0;
        // let minLon = 999999;
        // let maxLat = 0;
        // let minLat = 999999;
        let maxElev = 0;
        let minElev = 999999;
        let totaldistance = 0; // in kms
        let totalelevGain = 0; // in kms
        let totalelevloss = 0; // in kms
        let exportGeneralFacts = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(interpolatedFeaturesCollection)))[0].properties;
        let generateGeneralFactsProgressPayload = {
            status: 'progress',
            id: 'progressFlattenPath',
            loaded: 0,
            total: 100,
        };

        const newPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(enrichedFeaturesCollection)))[0].geometry.coordinates;

        newPathLine.forEach((location) => {
            // maxLon = Math.max(maxLon, location.lon);
            // minLon = Math.min(minLon, location.lon);
            // maxLat = Math.max(maxLat, location.lat);
            // minLat = Math.min(minLat, location.lat);
            maxElev = Math.max(maxElev, location.elevation);
            minElev = Math.min(minElev, location.elevation);
        });

        generateGeneralFactsProgressPayload.loaded = 80;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, generateGeneralFactsProgressPayload);

        // Distance and elevation

        for (let i = 0; i < newPathLine.length; i++) {
            totaldistance += newPathLine[i].prevDist;
            if (newPathLine[i].prevElev > 0) {
                totalelevGain += newPathLine[i].prevElev;
            } else {
                totalelevloss += newPathLine[i].prevElev;
            }
        }
        exportGeneralFacts.distance = totaldistance;
        exportGeneralFacts.elevGain = totalelevGain;
        exportGeneralFacts.elevLoss = totalelevloss;

        // Bounds calculation
        // const lonDelta = (maxLon - minLon) / 1;
        // const latDelta = (maxLat - minLat) / 1;
        // exportGeneralFacts.bounds = [[(maxLon + lonDelta), (maxLat + latDelta)], [(minLon - lonDelta), (minLat - latDelta)]];
        const cBounds = turf.bbox(interpolatedFeaturesCollection);
        exportGeneralFacts.bounds = [[cBounds[0], cBounds[1]], [cBounds[2], cBounds[3]]];

        // Center
        // const lonCenter = (maxLon + minLon) / 2;
        // const latCenter = (maxLat + minLat) / 2;
        // exportGeneralFacts.center = [lonCenter, latCenter];
        const centerOfMass = turf.center(interpolatedFeaturesCollection);
        exportGeneralFacts.center = centerOfMass.geometry.coordinates;

        // Elevation extremes
        exportGeneralFacts.elevMin = minElev;
        exportGeneralFacts.elevMax = maxElev;

        // Technique level
        exportGeneralFacts.requiredTechnique = this.calculateTechniqueLevelID(exportGeneralFacts.surfaceCollection, totalelevGain);

        // Fitness level
        exportGeneralFacts.requiredFitness = this.calculateFitnessLevelID(totaldistance, totalelevGain);

        // trailTypeID
        exportGeneralFacts.trailTypeID = this.calculateTrailTypeID(exportGeneralFacts.requiredTechnique, exportGeneralFacts.requiredFitness);

        generateGeneralFactsProgressPayload.loaded = 100;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, generateGeneralFactsProgressPayload);

        return exportGeneralFacts;
    }

    calculateTrailTypeID(t, f) {
        if (t === 1 && f === 4) {
            return 4;
        }
        if (t >= 3 && f >= 2) {
            return 3;
        }
        if (t >= 2 && f >= 1) {
            return 2;
        }
        if (t >= 1 && f >= 0) {
            return 1;
        }
        return 0;
    }

    calculateFitnessLevelID(distance, elevation) {
        const idx = parseInt(elevation + distance * 10, 10);
        if (idx < 750) {
            return 1;
        } else if (idx < 1700) {
            return 2;
        } else if (idx < 3000) {
            return 3;
        }
        return 4;
    }

    calculateTechniqueLevelID(surfaceCollection, totaldistance) {
        const temp = surfaceCollection.map((s, idx) => {
            if (idx < (surfaceCollection.length - 1)) {
                return {
                    type: s[1],
                    start: s[0],
                    end: surfaceCollection[idx + 1][0],
                    distance: surfaceCollection[idx + 1][0] - s[0],
                    percent: ((surfaceCollection[idx + 1][0] - s[0]) / totaldistance) * 100,
                };
            }
            return {
                type: s[1],
                start: s[0],
                end: totaldistance,
                distance: totaldistance - s[0],
                percent: ((totaldistance - s[0]) / totaldistance) * 100,
            };
        });
        let surface = {};
        ['A', 'M', 'S', 'N'].forEach(t => {
            surface[t] = {
                distance: 0,
                percent: 0,
            };
            const segment = temp.filter(s => {
                return s.type === t;
            });
            segment.forEach(s => {
                surface[t].distance += s.total;
                surface[t].percent += s.percent;
            });
        });
        // 4
        if (surface.N.percent > 5 ||
            surface.S.percent > 20 ||
            surface.M.percent > 80 ||
            surface.N.distance > 2 ||
            surface.S.distance > 10) {
            return 4;
        }
        // 3
        if (surface.N.percent > 1 ||
            surface.S.percent > 5 ||
            surface.M.percent > 50 ||
            surface.S.distance > 2 ||
            surface.M.distance > 20) {
            return 3;
        }
        // 2
        if (surface.S.percent > 1 ||
            surface.M.percent > 20 ||
            surface.S.distance > 1) {
            return 2;
        }
        return 1;
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
