/* global turf */
// import GLU from '/../../glu2.js/src/index';
// import API from '/apis/Api';
import TrailHelper from '/helpers/TrailHelper';
import MapHelper from '/helpers/MapHelper';
import WaypointHelper from '/helpers/WaypointHelper';
import ChartHelper from '/helpers/ChartHelper';
import CommonHelper from '/helpers/CommonHelper';

class Trail {
    constructor() {
        this._initialised = false;
        this._newTrail = false;
        this._mapPathLayers = [];
        this._parsedFeaturesCollection = {};
        this._simplifiedFeaturesCollection = {}; // Simplified
        this._elevatedFeaturesCollection = {}; // Elevated
        this._elevationNivelatedFeaturesCollection = {}; // Flatten elevation LineString
        this._interpolatedFeaturesCollection = {}; // Flatten elevation LineString
        this._enrichedFeaturesCollection = {}; // Flatten elevation LineString
    }

    getElevationTreshold() {
        const generalFacts = this.getGeneralFacts();
        return {
            ta: generalFacts.absoluteElevationThreshold, // Absolute elevation threshold
            tr: generalFacts.relativeElevationThreshold, // Relative elevation threshold
            sl: generalFacts.slopeTreshlod, // slope threshold
        };
    }

    recalculateElevation(enrichedPathLine) {
        console.info('TrailsDataModel.activeTrail.recalculateElevation(enrichedPathLine)');
        enrichedPathLine.forEach((pp, idx) => {
            console.log('this.fixPointElevation(' + idx + ', ' + pp.elevation + ')');
            // this.fixPointElevation(idx, pp.elevation);
        });
    }

    fixPointElevation(index, elevation) {
        CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].geometry.coordinates[index][2] = elevation;
        CommonHelper.getLineStrings(this.simplifiedFeaturesCollection)[0].geometry.coordinates[index][2] = elevation;
        CommonHelper.getLineStrings(this.elevatedFeaturesCollection)[0].geometry.coordinates[index][2] = elevation;
        CommonHelper.getLineStrings(this.elevationNivelatedFeaturesCollection)[0].geometry.coordinates[index][2] = elevation;
        CommonHelper.getLineStrings(this.interpolatedFeaturesCollection)[0].geometry.coordinates[index][2] = elevation;
    }

    parseInitialFeaturesCollection() {
        let features = [];
        let pathline = [];
        let generalFacts = {};
        this.initialised = true;
        this.parsedFeaturesCollection.features.forEach((feature) => {
            if (feature.geometry.type === 'LineString') {
                pathline = pathline.concat(feature.geometry.coordinates);
                generalFacts = feature.properties;
            } else if (feature.geometry.type === 'Point') {
                features.push(feature);
            }
        });
        const elevatedPathline = pathline.map(p => {
            let point = p;
            if (!p[2]) {
                point[2] = 0;
            }
            return point;
        });
        let path = turf.lineString(elevatedPathline);
        path.properties = this.getInitialGeneralFacts(generalFacts);
        features.push(path);
        this.parsedFeaturesCollection = turf.featureCollection(features);
    }

    saveDownloadedFeaturesCollection(featuresCollection) {
        this.parsedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        this.parseInitialFeaturesCollection();
        this.simplifiedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        this.elevatedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        this.elevationNivelatedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        this.interpolatedFeaturesCollection = JSON.parse(JSON.stringify(featuresCollection));
        this.enrichPathLine();
    }

    previewParsedInitialFeaturesCollection(previewMap) {
        MapHelper.previewTrailOnMap(this.parsedFeaturesCollection, previewMap);
    }

    hideParsedInitialFeaturesCollection(previewMap) {
        MapHelper.hidePreviewTrailOnMap(previewMap);
    }

    interpolatePathLine() {
        this.interpolatedFeaturesCollection = JSON.parse(JSON.stringify(this.elevationNivelatedFeaturesCollection));
        // console.info('Trails.interpolatePathLine() - do nothing');
    }

    translateByOffset(payload) {
        // let path = CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].geometry.coordinates;
        // console.log('Pre offset');
        // console.log(path[0]);
        // path = path.map(element => {
        //     return [(element[0] + offset[0]), (element[1] + offset[1]), element[2]];
        // });
        const offset = payload.offset;
        const pointIndexes = payload.pointIndexes;
        if (pointIndexes.length === 0) {
            CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].geometry.coordinates.forEach((element, idx) => {
                CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].geometry.coordinates[idx] = [(element[0] + offset[0]), (element[1] + offset[1]), element[2]];
            });
        } else {
            // first 2 element in array are part of filter syntax
            for (let i = 2; i < pointIndexes.length; i++) {
                const element = CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].geometry.coordinates[pointIndexes[i]];
                CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].geometry.coordinates[pointIndexes[i]] = [(element[0] + offset[0]), (element[1] + offset[1]), element[2]];
            }
        }
        // console.log('Post offset');
        // console.log(path[0]);
    }

    // getPoints4LinePath(featuresCollection) {
    //     const outFeaturesCollection = {
    //         type: 'FeatureCollection',
    //         features: [],
    //     };
    //     let path = CommonHelper.getLineStrings(featuresCollection)[0].geometry.coordinates;
    //     path.forEach((pathPoint, pointIdx) => {
    //         outFeaturesCollection.features.push(turf.point(pathPoint, {
    //             highlightId: pointIdx,
    //             type: 'controlPoint',
    //         }));
    //     });
    //     return outFeaturesCollection;
    // }

    getInitialGeneralFacts(inputGeneralFacts) {
        let generalFacts = JSON.parse(JSON.stringify(inputGeneralFacts));
        generalFacts.trailID = (generalFacts.trailID === undefined) ? null : generalFacts.trailID;
        generalFacts.trailVersionID = (generalFacts.trailVersionID === undefined) ? null : generalFacts.trailVersionID;
        generalFacts.trailName = (generalFacts.trailName === undefined) ? '' : generalFacts.trailName;
        generalFacts.trailNameEn = (generalFacts.trailNameEn === undefined) ? '' : generalFacts.trailNameEn;
        generalFacts.trailDesc = (generalFacts.trailDesc === undefined) ? '' : generalFacts.trailDesc;
        generalFacts.trailDescEn = (generalFacts.trailDescEn === undefined) ? '' : generalFacts.trailDescEn;
        generalFacts.mntns = (generalFacts.mntns === undefined) ? [] : generalFacts.mntns;
        generalFacts.surfaceCollection = (generalFacts.surfaceCollection === undefined) ? [[ 0, 'A']] : generalFacts.surfaceCollection;
        generalFacts.trailTypeID = (generalFacts.trailTypeID === undefined) ? 0 : generalFacts.trailTypeID;
        generalFacts.typeName = (generalFacts.typeName === undefined) ? '' : generalFacts.typeName;
        generalFacts.typeDesc = (generalFacts.typeDesc === undefined) ? '' : generalFacts.typeDesc;
        generalFacts.distance = (generalFacts.distance === undefined) ? 0 : generalFacts.distance;
        generalFacts.elevMin = (generalFacts.elevMin === undefined) ? 0 : generalFacts.elevMin;
        generalFacts.elevMax = (generalFacts.elevMax === undefined) ? 0 : generalFacts.elevMax;
        generalFacts.elevGain = (generalFacts.elevGain === undefined) ? 0 : generalFacts.elevGain;
        generalFacts.elevLoss = (generalFacts.elevLoss === undefined) ? 0 : generalFacts.elevLoss;
        generalFacts.reviewLandscape = (generalFacts.reviewLandscape === undefined) ? 0 : generalFacts.reviewLandscape;
        generalFacts.reviewFun = (generalFacts.reviewFun === undefined) ? 0 : generalFacts.reviewFun;
        generalFacts.requiredFitness = (generalFacts.requiredFitness === undefined) ? 0 : generalFacts.requiredFitness;
        generalFacts.requiredTechnique = (generalFacts.requiredTechnique === undefined) ? 0 : generalFacts.requiredTechnique;
        generalFacts.center = (generalFacts.center === undefined) ? [] : generalFacts.center;
        generalFacts.bounds = (generalFacts.bounds === undefined) ? [] : generalFacts.bounds;
        generalFacts.fileName = (generalFacts.fileName === undefined) ? '' : generalFacts.fileName;
        generalFacts.externalLink = (generalFacts.externalLink === undefined) ? '' : generalFacts.externalLink;
        generalFacts.imageURL = (generalFacts.imageURL === undefined) ? '' : generalFacts.imageURL;
        generalFacts.overrideThumbnails = false;
        generalFacts.absoluteElevationThreshold = 30; // between measured and google height
        generalFacts.relativeElevationThreshold = 10; // between two points
        generalFacts.slopeTreshlod = 20;
        generalFacts.snapWPsToPath = false;
        return generalFacts;
    }

    getTrailGeoLocation() {
        const path = CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].properties;
        return {
            center: path.center,
            bounds: path.bounds,
        };
    }

    simplifyTrailLineString() {
        this.simplifiedFeaturesCollection = TrailHelper.simplifyLineString(this._parsedFeaturesCollection);
    }

    nivelatePathLine() {
        this.elevationNivelatedFeaturesCollection = TrailHelper.nivelatePathLine(this.elevatedFeaturesCollection);
    }

    enrichPathLine() {
        this.enrichedFeaturesCollection = TrailHelper.enrichPathLine(this.elevationNivelatedFeaturesCollection);
    }

    getSimplifiedFeatureCollectionPathOnly() {
        const lineStringFeature = JSON.parse(JSON.stringify(CommonHelper.getLineStrings(this.elevationNivelatedFeaturesCollection)[0]));
        const simplified = turf.simplify(lineStringFeature, 0.001, false);
        return simplified;
    }

    getSimplifiedFeatureCollectionPathNoElevation() {
        const lineStringFeature = JSON.parse(JSON.stringify(CommonHelper.getLineStrings(this.elevationNivelatedFeaturesCollection)[0]));
        lineStringFeature.properties = {};
        const newCoordinates = lineStringFeature.geometry.coordinates.map(c => {
            c.pop();
            return c;
        });
        lineStringFeature.geometry.coordinates = newCoordinates;
        const simplified = turf.simplify(lineStringFeature, 0.001, false);
        return simplified;
    }

    getGeneralFacts() {
        if (this.enrichedFeaturesCollection.features) {
            return JSON.parse(JSON.stringify(CommonHelper.getLineStrings(this.enrichedFeaturesCollection)[0].properties));
        }
        return JSON.parse(JSON.stringify(CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].properties));
    }

    setGeneralFacts(newGeneralFacts) {
        if (this.parsedFeaturesCollection.features) {
            CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].properties = newGeneralFacts;
        }
        if (this.simplifiedFeaturesCollection.features) {
            CommonHelper.getLineStrings(this.simplifiedFeaturesCollection)[0].properties = newGeneralFacts;
        }
        if (this.elevatedFeaturesCollection.features) {
            CommonHelper.getLineStrings(this.elevatedFeaturesCollection)[0].properties = newGeneralFacts;
        }
        if (this.elevationNivelatedFeaturesCollection.features) {
            CommonHelper.getLineStrings(this.elevationNivelatedFeaturesCollection)[0].properties = newGeneralFacts;
        }
        if (this.interpolatedFeaturesCollection.features) {
            CommonHelper.getLineStrings(this.interpolatedFeaturesCollection)[0].properties = newGeneralFacts;
        }
        if (this.enrichedFeaturesCollection.features) {
            CommonHelper.getLineStrings(this.enrichedFeaturesCollection)[0].properties = newGeneralFacts;
        }
    }

    generateGeneralFacts() {
        const generalFacts = TrailHelper.getGeneralFacts(this.enrichedFeaturesCollection, this.interpolatedFeaturesCollection);
        this.setGeneralFacts(generalFacts);
    }

    setProgressFinished() {
        const generalFacts = this.getGeneralFacts();
        generalFacts.progressSimplifyPath = 100;
        generalFacts.progressElevationPath = 100;
        generalFacts.progressFlattenPath = 100;
        generalFacts.progressFixWPs = 100;
        generalFacts.progressGeneral = 100;
        this.setGeneralFacts(generalFacts);
    }

    generateWaypoints(maps) {
        const enrichedFeaturesCollection = this.enrichedFeaturesCollection;
        const computedWaypoints = WaypointHelper.generateWaypoints(maps.leftMap, enrichedFeaturesCollection);
        this.waypoints = computedWaypoints;
        return this.waypoints;
    }

    reBuildMapLayers(maps) {
        const enrichedFeaturesCollection = this.enrichedFeaturesCollection;
        this.mapPathLayers = MapHelper.reBuildPathLayers(this.mapPathLayers, maps.leftMap, enrichedFeaturesCollection);
    }

    // rebuildWaypoints(maps) {
    //     const currentWaypoints = JSON.parse(JSON.stringify(this._mapWaypoints));
    //     const computedWaypoints = WaypointHelper.generateWaypoints(maps.leftMap, maps.rightMap, currentWaypoints, this.pathLine, this.surfaceCollection);
    //     this._waypoints = JSON.parse(JSON.stringify(computedWaypoints.waypoints));
    //     this._chartWaypoints = JSON.parse(JSON.stringify(computedWaypoints.chartWaypoints));
    //     this._mapWaypoints = JSON.parse(JSON.stringify(computedWaypoints.mapWaypoints));
    // }

    // koristeno i za WP, sad taj dio treba izdvojiti
    setDataByName(propName, propIndex, propProp, propValue) {
        if ((propIndex || propIndex === 0) && propProp) {
            // console.log('seting WP[' + propIndex + '] parameter ' + propProp + ' to value ' + propValue);
            const tempWaypoints = JSON.parse(JSON.stringify(this.waypoints));
            tempWaypoints[propIndex].properties[propProp] = propValue;
            this.waypoints = tempWaypoints;
        } else {
            const generalFacts = this.getGeneralFacts();
            generalFacts[propName] = propValue;
            this.setGeneralFacts(generalFacts);
        }
        // if (propIndex && propProp) {
        //     generalFacts[propName][propIndex][propProp] = propValue;
        // } else {
        //     generalFacts[propName] = propValue;
        // }
    }

    getTrailData() {
        const trailFacts = this.getGeneralFacts();
        return {
            trailID: trailFacts.trailID,
            trailName: trailFacts.trailName,
            trailDesc: trailFacts.trailDesc,
            externalLink: trailFacts.externalLink,
            imageURL: trailFacts.imageURL,
            trailTypeID: trailFacts.trailTypeID,
            fitnessLevelID: trailFacts.fitnessLevelID,
            techniqueLevelID: trailFacts.techniqueLevelID,
            mntns: trailFacts.mntns,
            surfaceCollection: trailFacts.surfaceCollection,
            generalFact: trailFacts.generalFact,
            progressGeneral: trailFacts.progressGeneral,
            progressSimplifyPath: trailFacts.progressSimplifyPath,
            progressElevationPath: trailFacts.progressElevationPath,
            progressFlattenPath: trailFacts.progressFlattenPath,
            progressFixWPs: trailFacts.progressFixWPs,
            waypoints: this.waypoints,
            overrideThumbnails: trailFacts.overrideThumbnails,
            absoluteElevationThreshold: trailFacts.absoluteElevationThreshold,
            relativeElevationThreshold: trailFacts.relativeElevationThreshold,
            slopeTreshlod: trailFacts.slopeTreshlod,
            snapWPsToPath: trailFacts.snapWPsToPath,
        };
    }

    get waypoints() {
        return CommonHelper.getPoints(this.interpolatedFeaturesCollection);
    }

    get chartWaypoints() {
        const waypoints = CommonHelper.getPoints(this.interpolatedFeaturesCollection).map((point) => {
            return {
                odometer: point.odometer,
                name: point.name,
            };
        });
        return waypoints;
    }

    set waypoints(waypoints) {
        const parsedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        parsedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0]);
        this.parsedFeaturesCollection = turf.featureCollection(parsedFeaturesCollectionFeatures);

        const simplifiedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        simplifiedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.simplifiedFeaturesCollection)[0]);
        this.simplifiedFeaturesCollection = turf.featureCollection(simplifiedFeaturesCollectionFeatures);

        const elevatedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        elevatedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.simplifiedFeaturesCollection)[0]);
        this.elevatedFeaturesCollection = turf.featureCollection(elevatedFeaturesCollectionFeatures);

        const elevationNivelatedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        elevationNivelatedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.elevationNivelatedFeaturesCollection)[0]);
        this.elevationNivelatedFeaturesCollection = turf.featureCollection(elevationNivelatedFeaturesCollectionFeatures);

        const interpolatedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        interpolatedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.interpolatedFeaturesCollection)[0]);
        this.interpolatedFeaturesCollection = turf.featureCollection(interpolatedFeaturesCollectionFeatures);

        const enrichedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        enrichedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.enrichedFeaturesCollection)[0]);
        this.enrichedFeaturesCollection = turf.featureCollection(enrichedFeaturesCollectionFeatures);
    }

    getChartData(containerId) {
        // const chartData = ChartHelper.getChartSetup(containerId, trailFacts.trailName, this.chartWaypoints, this.profileMapPathLine, this.surfaceCollection);
        const enrichedFeaturesCollection = this.enrichedFeaturesCollection;
        const chartData = ChartHelper.getChartSetup(containerId, enrichedFeaturesCollection);
        return chartData;
    }

/* NEW */

    get mapPathLayers() {
        return this._mapPathLayers;
    }

    set mapPathLayers(newArray) {
        if (newArray) {
            this._mapPathLayers = newArray;
        }
    }

    get parsedFeaturesCollection() {
        return this._parsedFeaturesCollection;
    }

    set parsedFeaturesCollection(newFile) {
        if (newFile) {
            this._parsedFeaturesCollection = newFile;
        }
    }

    get simplifiedFeaturesCollection() {
        return this._simplifiedFeaturesCollection;
    }

    set simplifiedFeaturesCollection(newFeaturesCollection) {
        if (newFeaturesCollection) {
            this._simplifiedFeaturesCollection = newFeaturesCollection;
        }
    }

    get elevatedFeaturesCollection() {
        return this._elevatedFeaturesCollection;
    }

    set elevatedFeaturesCollection(newFeaturesCollection) {
        if (newFeaturesCollection) {
            this._elevatedFeaturesCollection = newFeaturesCollection;
        }
    }

    get elevationNivelatedFeaturesCollection() {
        return this._elevationNivelatedFeaturesCollection;
    }

    set elevationNivelatedFeaturesCollection(newFeaturesCollection) {
        if (newFeaturesCollection) {
            this._elevationNivelatedFeaturesCollection = newFeaturesCollection;
        }
    }

    get interpolatedFeaturesCollection() {
        return this._interpolatedFeaturesCollection;
    }

    set interpolatedFeaturesCollection(newFeaturesCollection) {
        if (newFeaturesCollection) {
            this._interpolatedFeaturesCollection = newFeaturesCollection;
        }
    }

    get enrichedFeaturesCollection() {
        return this._enrichedFeaturesCollection;
    }

    set enrichedFeaturesCollection(newFeaturesCollection) {
        if (newFeaturesCollection) {
            this._enrichedFeaturesCollection = newFeaturesCollection;
        }
    }

    get initialised() {
        return this._initialised;
    }

    set initialised(isInitialised) {
        if (isInitialised) {
            this._initialised = isInitialised;
        }
    }

    newTrail() {
        this._newTrail = true;
    }

    isNewTrail() {
        return this._newTrail;
    }
}

export default Trail;
