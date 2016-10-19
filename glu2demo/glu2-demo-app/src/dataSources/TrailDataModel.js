import GLU from '/../../glu2.js/src/index';
// import API from '/apis/Api';
// import { error } from '/helpers/ResolveMessages';

class TrailDataModel extends GLU.DataSource {
    constructor() {
        super();
        this._trailName = '';
        this._trailDesc = '';
        this._trailTypeID = null;
        this._fitnessLevelID = null;
        this._techniqueLevelID = null;
        this._mountainIDs = [];
        this._surfaceCollection = [];
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

    setDataByName(propName, propValue) {
        this[propName] = propValue;
    }

    getTrailData() {
        return {
            trailName: this.trailName,
            trailDesc: this.trailDesc,
            trailTypeID: this.trailTypeID,
            fitnessLevelID: this.fitnessLevelID,
            techniqueLevelID: this.techniqueLevelID,
            mountainIDs: this.mountainIDs,
            surfaceCollection: this.surfaceCollection,
        };
    }
}

export default new TrailDataModel();
