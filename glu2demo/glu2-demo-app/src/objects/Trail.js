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
        this._trailName = '';
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
        this.parsedFeaturesCollection.features.forEach((feature) => {
            if (feature.geometry.type === 'LineString') {
                pathline = pathline.concat(feature.geometry.coordinates);
                generalFacts = feature.properties;
            } else if (feature.geometry.type === 'Point') {
                features.push(feature);
            }
        });
        let path = turf.linestring(pathline);
        path.properties = JSON.parse(JSON.stringify(generalFacts));
        features.push(path);
        this.parsedFeaturesCollection = turf.featurecollection(features);
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

    interpolatePathLine() {
        this.interpolatedFeaturesCollection = TrailHelper.interpolatePathLine(this.elevationNivelatedFeaturesCollection);
    }

    getEnrichedFeatureCollection() {
        const enriched = TrailHelper.enrichPathLine(this.interpolatedFeaturesCollection);
        return enriched;
    }

    getGeneralFacts() {
        return JSON.parse(JSON.stringify(CommonHelper.getLineStrings(this.interpolatedFeaturesCollection)[0].properties));
    }

    setGeneralFacts(newGeneralFacts) {
        CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].properties = newGeneralFacts;
        CommonHelper.getLineStrings(this.simplifiedFeaturesCollection)[0].properties = newGeneralFacts;
        CommonHelper.getLineStrings(this.elevatedFeaturesCollection)[0].properties = newGeneralFacts;
        CommonHelper.getLineStrings(this.elevationNivelatedFeaturesCollection)[0].properties = newGeneralFacts;
        CommonHelper.getLineStrings(this.interpolatedFeaturesCollection)[0].properties = newGeneralFacts;
    }

    generateGeneralFacts() {
        const trail = this.getEnrichedFeatureCollection();
        const generalFacts = TrailHelper.getGeneralFacts(trail);
        this.setGeneralFacts(generalFacts);
    }

    generateWaypoints(maps) {
        const enrichedFeaturesCollection = TrailHelper.enrichPathLine(this.interpolatedFeaturesCollection);
        const computedWaypoints = WaypointHelper.generateWaypoints(maps.leftMap, maps.rightMap, enrichedFeaturesCollection);
        this.waypoints = computedWaypoints;
    }

    reBuildMapLayers(maps) {
        // this.mapPathLayers = MapHelper.reBuildPathLayers(this.mapPathLayers, maps.leftMap, maps.rightMap, this.surfaceCollection, this.pathLine, this.generalFact);
        this.mapPathLayers = MapHelper.reBuildPathLayers(this.mapPathLayers, maps.leftMap, maps.rightMap, this.elevationNivelatedFeaturesCollection);
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
        if (propIndex && propProp) {
            const tempWaypoints = JSON.parse(JSON.stringify(this.waypoints));
            tempWaypoints[propIndex][propProp] = propValue;
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
        };
    }

    get waypoints() {
        return CommonHelper.getPoints(this.interpolatedFeaturesCollection);
    }

    set waypoints(waypoints) {
        console.log('set waypoints(waypoints)');
        console.log(this.parsedFeaturesCollection.features[15].properties);
        // CommonHelper.getPoints(this.parsedFeaturesCollection) = JSON.parse(JSON.stringify(waypoints));
        // CommonHelper.getPoints(this.simplifiedFeaturesCollection) = JSON.parse(JSON.stringify(waypoints));
        // CommonHelper.getPoints(this.elevatedFeaturesCollection) = JSON.parse(JSON.stringify(waypoints));
        // CommonHelper.getPoints(this.elevationNivelatedFeaturesCollection) = JSON.parse(JSON.stringify(waypoints));
        // CommonHelper.getPoints(this.interpolatedFeaturesCollection) = JSON.parse(JSON.stringify(waypoints));
        waypoints.forEach((wp, idx) => {
            // pitanje hoce li ovo raditi, getPoint radi sa reduce, ne znam da li ce prepoznati referencu
            CommonHelper.getPoints(this.parsedFeaturesCollection)[idx].properties = JSON.parse(JSON.stringify(wp.properties));
            CommonHelper.getPoints(this.simplifiedFeaturesCollection)[idx] = JSON.parse(JSON.stringify(wp.properties));
            CommonHelper.getPoints(this.elevatedFeaturesCollection)[idx] = JSON.parse(JSON.stringify(wp.properties));
            CommonHelper.getPoints(this.elevationNivelatedFeaturesCollection)[idx] = JSON.parse(JSON.stringify(wp.properties));
            CommonHelper.getPoints(this.interpolatedFeaturesCollection)[idx] = JSON.parse(JSON.stringify(wp.properties));
        });
        // console.log(this.elevationNivelatedFeaturesCollection);
        console.log(this.parsedFeaturesCollection.features[15].properties);
    }

    getChartData(containerId) {
        const chartData = ChartHelper.getChartSetup(containerId, this.trailName, this.chartWaypoints, this.profileMapPathLine, this.surfaceCollection);
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

    newTrail() {
        this._newTrail = true;
    }

    isNewTrail() {
        return this._newTrail;
    }
}

export default Trail;
