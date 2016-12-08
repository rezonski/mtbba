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

        this._trailDesc = '';
        this._externalLink = '';
        this._imageURL = '';
        this._trailTypeID = null;
        this._fitnessLevelID = null;
        this._techniqueLevelID = null;
        this._mountainIDs = [];
        this._surfaceCollection = [[0, 'A']];
        this._generalFact = {};
        this._waypoints = [];
        this._chartWaypoints = [];
        this._mapWaypoints = [];
        this._unfilteredPathLine = [];
        this._pathLine = [];
        this._profileMapPathLine = [];
        this._mapPathLayers = [];
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

    parseDownloadedTrail() {
        this.parsedFeaturesCollection.features.forEach((feature) => {
            if (feature.geometry.type === 'LineString') {
                this._unfilteredPathLine = this._unfilteredPathLine.concat(feature.geometry.coordinates);
                this._generalFact = feature.properties;
            } else if (feature.geometry.type === 'Point') {
                this._waypoints.push(feature);
            }
        });
        this._trailName = this._generalFact.trail_name;
        this._trailDesc = this._generalFact.trail_desc;
        this._externalLink = this._generalFact.external_link;
        this._imageURL = this._generalFact.image_url;
        this._trailTypeID = this._generalFact.type_id;
        this._fitnessLevelID = this._generalFact.required_fitness;
        this._techniqueLevelID = this._generalFact.required_technique;
        this._mountainIDs = this._generalFact.mntns.map((mnt) => {
            return mnt.id;
        });
        this._surfaceCollection = this._generalFact.surface;
        this._generalFact = this._generalFact;
        return {
            center: [this._generalFact.lon_center, this._generalFact.lat_center],
            bounds: this._generalFact.bounds,
        };
    }

    simplifyTrailLineString() {
        // this._pathLine = TrailHelper.simplifyTrailLineString(this._unfilteredPathLine, 0.02);
        this.simplifiedFeaturesCollection = TrailHelper.simplifyLineString(this._parsedFeaturesCollection);
    }

    nivelatePathLine() {
        this.elevationNivelatedFeaturesCollection = TrailHelper.nivelatePathLine(this.elevatedFeaturesCollection);
    }

    getEnrichedFeatureCollection() {
        const enriched = TrailHelper.enrichPathLine(this.elevationNivelatedFeaturesCollection);
        return enriched;
    }

    generateGeneralFacts() {
        TrailHelper.getGeneralFacts(this.elevationNivelatedFeaturesCollection);
    }

    generateWaypoints(maps) {
        const currentWaypoints = JSON.parse(JSON.stringify(this._waypoints));
        const computedWaypoints = WaypointHelper.generateWaypoints(maps.leftMap, maps.rightMap, currentWaypoints, this.pathLine, this.surfaceCollection);
        this._waypoints = JSON.parse(JSON.stringify(computedWaypoints.waypoints));
        this._chartWaypoints = JSON.parse(JSON.stringify(computedWaypoints.chartWaypoints));
        this._mapWaypoints = JSON.parse(JSON.stringify(computedWaypoints.mapWaypoints));
    }

    setDataByName(propName, propIndex, propProp, propValue) {
        if (propIndex && propProp) {
            this['_' + propName][propIndex][propProp] = propValue;
        } else {
            this[propName] = propValue;
        }
    }

    getTrailData() {
        return {
            trailName: this.trailName,
            trailDesc: this.trailDesc,
            externalLink: this.externalLink,
            imageURL: this.imageURL,
            trailTypeID: this.trailTypeID,
            fitnessLevelID: this.fitnessLevelID,
            techniqueLevelID: this.techniqueLevelID,
            mountainIDs: this.mountainIDs,
            surfaceCollection: this.surfaceCollection,
            waypoints: this.waypoints,
            chartWaypoints: this.chartWaypoints,
            mapWaypoints: this.mapWaypoints,
            generalFact: this.generalFact,
            progressGeneral: this.progressGeneral,
            progressSimplifyPath: this.progressSimplifyPath,
            progressElevationPath: this.progressElevationPath,
            progressFlattenPath: this.progressFlattenPath,
            progressFixWPs: this.progressFixWPs,
        };
    }

    getChartData(containerId) {
        const chartData = ChartHelper.getChartSetup(containerId, this.trailName, this.chartWaypoints, this.profileMapPathLine, this.surfaceCollection);
        return chartData;
    }

    get progressFixWPs() {
        return this._progressFixWPs;
    }

    set progressFixWPs(newValue) {
        if (newValue) {
            this._progressFixWPs = newValue;
        }
    }

    get progressFlattenPath() {
        return this._progressFlattenPath;
    }

    set progressFlattenPath(newValue) {
        if (newValue) {
            this._progressFlattenPath = newValue;
        }
    }

    get progressElevationPath() {
        return this._progressElevationPath;
    }

    set progressElevationPath(newValue) {
        if (newValue) {
            this._progressElevationPath = newValue;
        }
    }

    get progressSimplifyPath() {
        return this._progressSimplifyPath;
    }

    set progressSimplifyPath(newValue) {
        if (newValue) {
            this._progressSimplifyPath = newValue;
        }
    }

    get progressGeneral() {
        return this._progressGeneral;
    }

    set progressGeneral(newValue) {
        if (newValue) {
            this._progressGeneral = newValue;
        }
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

    newTrail() {
        this._newTrail = true;
    }

    isNewTrail() {
        return this._newTrail;
    }
}

export default Trail;
