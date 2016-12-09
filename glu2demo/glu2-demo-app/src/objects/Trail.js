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
        this._parsedFeaturesCollection = {};
        this._simplifiedFeaturesCollection = {}; // Simplified
        this._elevatedFeaturesCollection = {}; // Elevated
        this._elevationNivelatedFeaturesCollection = {}; // Flatten elevation LineString
        this._interpolatedFeaturesCollection = {}; // Flatten elevation LineString
    }

    // Treba doraditi da radi sad kolekcijom
    // parseDownloadedTrail() {
    //     this.parsedFeaturesCollection.features.forEach((feature) => {
    //         if (feature.geometry.type === 'LineString') {
    //             this._unfilteredPathLine = this._unfilteredPathLine.concat(feature.geometry.coordinates);
    //             this._generalFact = feature.properties;
    //         } else if (feature.geometry.type === 'Point') {
    //             this._waypoints.push(feature);
    //         }
    //     });
    //     this._trailName = this._generalFact.trail_name;
    //     this._trailDesc = this._generalFact.trail_desc;
    //     this._externalLink = this._generalFact.external_link;
    //     this._imageURL = this._generalFact.image_url;
    //     this._trailTypeID = this._generalFact.type_id;
    //     this._fitnessLevelID = this._generalFact.required_fitness;
    //     this._techniqueLevelID = this._generalFact.required_technique;
    //     this._mountainIDs = this._generalFact.mntns.map((mnt) => {
    //         return mnt.id;
    //     });
    //     this._surfaceCollection = this._generalFact.surface;
    //     this._generalFact = this._generalFact;
    //     return {
    //         center: [this._generalFact.lon_center, this._generalFact.lat_center],
    //         bounds: this._generalFact.bounds,
    //     };
    // }

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
        return JSON.parse(JSON.stringify(CommonHelper.getLineStrings(this.parsedFeaturesCollection)[0].properties));
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

    setWaypoints(waypoints) {
        waypoints.forEach((wp, idx) => {
            CommonHelper.getPoints(this.parsedFeaturesCollection)[idx] = wp;
            CommonHelper.getPoints(this.simplifiedFeaturesCollection)[idx] = wp;
            CommonHelper.getPoints(this.elevatedFeaturesCollection)[idx] = wp;
            CommonHelper.getPoints(this.elevationNivelatedFeaturesCollection)[idx] = wp;
            CommonHelper.getPoints(this.interpolatedFeaturesCollection)[idx] = wp;
        });
    }

    generateWaypoints(maps) {
        const enrichedFeaturesCollection = TrailHelper.enrichPathLine(this.interpolatedFeaturesCollection);
        const computedWaypoints = WaypointHelper.generateWaypoints(maps.leftMap, maps.rightMap, enrichedFeaturesCollection);
        this.setWaypoints(computedWaypoints);
    }

    rebuildMapLayers(maps) {
        this.mapPathLayers = MapHelper.rebuildPathLayers(this.mapPathLayers, maps.leftMap, maps.rightMap, this.surfaceCollection, this.pathLine, this.generalFact);
    }

    rebuildWaypoints(maps) {
        const currentWaypoints = JSON.parse(JSON.stringify(this._mapWaypoints));
        const computedWaypoints = WaypointHelper.generateWaypoints(maps.leftMap, maps.rightMap, currentWaypoints, this.pathLine, this.surfaceCollection);
        this._waypoints = JSON.parse(JSON.stringify(computedWaypoints.waypoints));
        this._chartWaypoints = JSON.parse(JSON.stringify(computedWaypoints.chartWaypoints));
        this._mapWaypoints = JSON.parse(JSON.stringify(computedWaypoints.mapWaypoints));
    }

    // koristeno i za WP, sad taj dio treba izdvojiti
    setDataByName(propName, propIndex, propProp, propValue) {
        const generalFacts = this.getGeneralFacts();
        if (propIndex && propProp) {
            generalFacts[propName][propIndex][propProp] = propValue;
        } else {
            generalFacts[propName] = propValue;
        }
        this.setGeneralFacts(generalFacts);
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
            mountainIDs: trailFacts.mountainIDs,
            surfaceCollection: trailFacts.surfaceCollection,
            
            waypoints: trailFacts.waypoints,
            chartWaypoints: trailFacts.chartWaypoints,
            
            mapWaypoints: trailFacts.mapWaypoints,
            generalFact: trailFacts.generalFact,
            progressGeneral: trailFacts.progressGeneral,
            progressSimplifyPath: trailFacts.progressSimplifyPath,
            progressElevationPath: trailFacts.progressElevationPath,
            progressFlattenPath: trailFacts.progressFlattenPath,
            progressFixWPs: trailFacts.progressFixWPs,
        };
    }

    getChartData(containerId) {
        const chartData = ChartHelper.getChartSetup(containerId, this.trailName, this.chartWaypoints, this.profileMapPathLine, this.surfaceCollection);
        return chartData;
    }

    get waypoints() {
        return this._waypoints;
    }

    get chartWaypoints() {
        return this._chartWaypoints;
    }

    get mapWaypoints() {
        return this._mapWaypoints;
    }

    get trailName() {
        return this._trailName;
    }

    set trailName(newName) {
        if (newName) {
            this._trailName = newName;
        }
    }

    get trailDesc() {
        return this._trailDesc;
    }

    set trailDesc(newDesc) {
        if (newDesc) {
            this._trailDesc = newDesc;
        }
    }

    get externalLink() {
        return this._externalLink;
    }

    set externalLink(newLink) {
        if (newLink) {
            this._externalLink = newLink;
        }
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(newLink) {
        if (newLink) {
            this._imageURL = newLink;
        }
    }

    get trailTypeID() {
        return this._trailTypeID;
    }

    set trailTypeID(newValue) {
        if (newValue) {
            this._trailTypeID = newValue;
        }
    }

    get fitnessLevelID() {
        return this._fitnessLevelID;
    }

    set fitnessLevelID(newValue) {
        if (newValue) {
            this._fitnessLevelID = newValue;
        }
    }

    get techniqueLevelID() {
        return this._techniqueLevelID;
    }

    set techniqueLevelID(newValue) {
        if (newValue) {
            this._techniqueLevelID = newValue;
        }
    }

    get mountainIDs() {
        return this._mountainIDs;
    }

    set mountainIDs(newMntArray) {
        if (newMntArray) {
            this._mountainIDs = newMntArray;
        }
    }

    get surfaceCollection() {
        return this._surfaceCollection;
    }

    set surfaceCollection(newSurfaceSetup) {
        if (newSurfaceSetup) {
            const collArray = CommonHelper.sortArrayByElementIndex(newSurfaceSetup, 0);
            this._surfaceCollection = collArray;
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

    get pathLine() {
        return this._pathLine;
    }

    set pathLine(newLine) {
        if (newLine) {
            this._pathLine = newLine;
        }
    }

    get profileMapPathLine() {
        return this._profileMapPathLine;
    }

    set profileMapPathLine(newLine) {
        if (newLine) {
            this._profileMapPathLine = newLine;
        }
    }

    get mapPathLayers() {
        return this._mapPathLayers;
    }

    set mapPathLayers(newArray) {
        if (newArray) {
            this._mapPathLayers = newArray;
        }
    }

    get generalFact() {
        return this._generalFact;
    }

    set generalFact(newPropertiesObject) {
        if (newPropertiesObject) {
            this._generalFact = newPropertiesObject;
        }
    }

/* NEW */

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
