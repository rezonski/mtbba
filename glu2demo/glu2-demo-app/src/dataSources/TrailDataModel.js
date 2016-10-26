import GLU from '/../../glu2.js/src/index';
// import API from '/apis/Api';
import TrailHelper from '/helpers/TrailHelper';
import WaypointHelper from '/helpers/WaypointHelper';
import ChartHelper from '/helpers/ChartHelper';

class TrailDataModel extends GLU.DataSource {
    constructor() {
        super();
        this._trailName = '';
        this._trailDesc = '';
        this._externalLink = '';
        this._imageURL = '';
        this._trailTypeID = null;
        this._fitnessLevelID = null;
        this._techniqueLevelID = null;
        this._mountainIDs = [];
        this._surfaceCollection = [[0, 'A']];
        this._parsedInitialFile = {};
        this._generalFact = {};
        this._waypoints = [];
        this._chartWaypoints = [];
        this._unfilteredPathLine = [];
        this._pathLine = [];
        this._profileMapPathLine = [];
    }

    flattenPathLine() {
        const flattenPathLineResponse = TrailHelper.flattenPathLine(this.pathLine);
        this.pathLine = JSON.parse(JSON.stringify(flattenPathLineResponse.enrichedPathLine));
        this.profileMapPathLine = JSON.parse(JSON.stringify(flattenPathLineResponse.mapProfilePathLine));
    }

    generateGeneralFacts() {
        this.generalFact = TrailHelper.getGeneralFacts(this.pathLine);
    }

    generateWaypoints() {
        const currentWaypoints = JSON.parse(JSON.stringify(this._waypoints));
        this._waypoints = WaypointHelper.generateWaypoints(currentWaypoints, this.pathLine).waypoints;
        this._chartWaypoints = WaypointHelper.generateWaypoints(currentWaypoints, this.pathLine).chartWaypoints;
    }

    setElevationOnPathByIndex(pointIndex, elevation) {
        // const preElevation = parseInt(this._pathLine[pointIndex][2], 10);
        this._pathLine[pointIndex][2] = elevation;
        // console.log('# ' + pointIndex + ' elevated ' + preElevation + ' -> ' + elevation);
    }

    parseInitialFile() {
        this.surfaceCollection = this.parsedInitialFile.sastav;
        this.parsedInitialFile.features.forEach((feature) => {
            if (feature.geometry.type === 'LineString') {
                this._unfilteredPathLine = this._unfilteredPathLine.concat(feature.geometry.coordinates);
                this._generalFact = feature.properties;
                if (feature.properties.id !== undefined) {
                    this._generalFact.newupdate = 'update';
                } else {
                    this._generalFact.newupdate = 'new';
                }
            } else if (feature.geometry.type === 'Point') {
                this._waypoints.push(feature);
            }
        });
    }

    reducePathLinePoints() {
        this._pathLine = TrailHelper.reducePathLinePoints(this._unfilteredPathLine, 0.02);
    }

    setDataByName(propName, propValue) {
        this[propName] = propValue;
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
            this._surfaceCollection = newSurfaceSetup;
        }
    }

    get parsedInitialFile() {
        return this._parsedInitialFile;
    }

    set parsedInitialFile(newFile) {
        if (newFile) {
            this._parsedInitialFile = newFile;
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

    get generalFact() {
        return this._generalFact;
    }

    set generalFact(newPropertiesObject) {
        if (newPropertiesObject) {
            this._generalFact = newPropertiesObject;
        }
    }
}

export default new TrailDataModel();
