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
        let path = turf.linestring(pathline);
        path.properties = this.getInitialGeneralFacts(generalFacts);
        features.push(path);
        this.parsedFeaturesCollection = turf.featurecollection(features);
    }

    getInitialGeneralFacts(inputGeneralFacts) {
        let generalFacts = JSON.parse(JSON.stringify(inputGeneralFacts));
        generalFacts.trailID = (generalFacts.trailID === undefined) ? null : generalFacts.trailID;
        generalFacts.trailName = (generalFacts.trailName === undefined) ? '' : generalFacts.trailName;
        generalFacts.trailDesc = (generalFacts.trailDesc === undefined) ? '' : generalFacts.trailDesc;
        generalFacts.mntns = (generalFacts.mntns === undefined) ? [] : generalFacts.mntns;
        generalFacts.surfaceCollection = (generalFacts.surfaceCollection === undefined) ? [[ 0, 'A']] : generalFacts.surfaceCollection;
        generalFacts.typeID = (generalFacts.typeID === undefined) ? null : generalFacts.typeID;
        generalFacts.typeName = (generalFacts.typeName === undefined) ? '' : generalFacts.typeName;
        generalFacts.typeDesc = (generalFacts.typeDesc === undefined) ? '' : generalFacts.typeDesc;
        generalFacts.distance = (generalFacts.distance === undefined) ? 0 : generalFacts.distance;
        generalFacts.elevMin = (generalFacts.elevMin === undefined) ? 0 : generalFacts.elevMin;
        generalFacts.elevMax = (generalFacts.elevMax === undefined) ? 0 : generalFacts.elevMax;
        generalFacts.elevGain = (generalFacts.elevGain === undefined) ? 0 : generalFacts.elevGain;
        generalFacts.elevLoss = (generalFacts.elevLoss === undefined) ? 0 : generalFacts.elevLoss;
        generalFacts.reviewLandscape = (generalFacts.reviewLandscape === undefined) ? null : generalFacts.reviewLandscape;
        generalFacts.reviewFun = (generalFacts.reviewFun === undefined) ? null : generalFacts.reviewFun;
        generalFacts.requiredFitness = (generalFacts.requiredFitness === undefined) ? null : generalFacts.requiredFitness;
        generalFacts.requiredTechnique = (generalFacts.requiredTechnique === undefined) ? null : generalFacts.requiredTechnique;
        generalFacts.center = (generalFacts.center === undefined) ? [] : generalFacts.center;
        generalFacts.bounds = (generalFacts.bounds === undefined) ? [] : generalFacts.bounds;
        generalFacts.externalLink = (generalFacts.externalLink === undefined) ? '' : generalFacts.externalLink;
        generalFacts.imageURL = (generalFacts.imageURL === undefined) ? '' : generalFacts.imageURL;
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

    getSimplifiedFeatureCollectionPathOnly() {
        const lineStringFeature = CommonHelper.getLineStrings(this.elevationNivelatedFeaturesCollection)[0];
        lineStringFeature.properties = {};
        const simplified = turf.simplify(lineStringFeature, 0.001, false);
        return simplified;
    }

    interpolatePathLine() {
        this.interpolatedFeaturesCollection = TrailHelper.interpolatePathLine(this.elevationNivelatedFeaturesCollection);
    }

    getEnrichedFeatureCollection() {
        const enriched = TrailHelper.enrichPathLine(this.interpolatedFeaturesCollection);
        return enriched;
    }

    getSimpleEnrichedFeatureCollection() {
        const enriched = TrailHelper.enrichPathLine(this.elevationNivelatedFeaturesCollection);
        return enriched;
    }

    getGeneralFacts() {
        if (this.interpolatedFeaturesCollection.features) {
            return JSON.parse(JSON.stringify(CommonHelper.getLineStrings(this.interpolatedFeaturesCollection)[0].properties));
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
    }

    generateGeneralFacts() {
        const trail = this.getEnrichedFeatureCollection();
        const generalFacts = TrailHelper.getGeneralFacts(trail);
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
        const enrichedFeaturesCollection = this.getEnrichedFeatureCollection();
        // const enrichedFeaturesCollection = this.getSimpleEnrichedFeatureCollection();
        const computedWaypoints = WaypointHelper.generateWaypoints(maps.leftMap, maps.rightMap, enrichedFeaturesCollection);
        this.waypoints = computedWaypoints;
        return this.waypoints;
    }

    reBuildMapLayers(maps) {
        // this.mapPathLayers = MapHelper.reBuildPathLayers(this.mapPathLayers, maps.leftMap, maps.rightMap, this.surfaceCollection, this.pathLine, this.generalFact);
        const enrichedFeaturesCollection = this.getSimpleEnrichedFeatureCollection();
        this.mapPathLayers = MapHelper.reBuildPathLayers(this.mapPathLayers, maps.leftMap, maps.rightMap, enrichedFeaturesCollection);
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
        this.parsedFeaturesCollection = turf.featurecollection(parsedFeaturesCollectionFeatures);

        const simplifiedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        simplifiedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.simplifiedFeaturesCollection)[0]);
        this.simplifiedFeaturesCollection = turf.featurecollection(simplifiedFeaturesCollectionFeatures);

        const elevatedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        elevatedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.elevatedFeaturesCollection)[0]);
        this.elevatedFeaturesCollection = turf.featurecollection(elevatedFeaturesCollectionFeatures);

        const elevationNivelatedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        elevationNivelatedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.elevationNivelatedFeaturesCollection)[0]);
        this.elevationNivelatedFeaturesCollection = turf.featurecollection(elevationNivelatedFeaturesCollectionFeatures);

        const interpolatedFeaturesCollectionFeatures = JSON.parse(JSON.stringify(waypoints));
        interpolatedFeaturesCollectionFeatures.push(CommonHelper.getLineStrings(this.interpolatedFeaturesCollection)[0]);
        this.interpolatedFeaturesCollection = turf.featurecollection(interpolatedFeaturesCollectionFeatures);
    }

    getChartData(containerId) {
        // const chartData = ChartHelper.getChartSetup(containerId, trailFacts.trailName, this.chartWaypoints, this.profileMapPathLine, this.surfaceCollection);
        const enrichedFeaturesCollection = this.getSimpleEnrichedFeatureCollection();
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
