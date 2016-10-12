import GLU from '/../../glu2.js/src/index';
// import API from '/apis/Api';
// import { error } from '/helpers/ResolveMessages';
import { fileUpload } from '/helpers/FileUpload';

class DataModel extends GLU.DataSource {
    constructor() {
        super();
        this._countries = [];
        this._mountains = [];
        this._trailTypes = [];
        this._pointTypes = [];
        this._trailName = '';
        this._trailDesc = '';
        this._trailTypeID = null;
        this._mountainIDs = [];
        this._xhrs = [];
    }

    get countries() {
        return this._countries;
    }

    get mountains() {
        return this._mountains;
    }

    get trailTypes() {
        return this._trailTypes;
    }

    get pointTypes() {
        return this._pointTypes;
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

    set trailTypeID(newTypeID) {
        if (newTypeID) {
            this._trailTypeID = newTypeID;
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
    setDataByName(propName, propValue) {
        switch (propName) {
            case 'trailName':
                this.trailName = propValue;
                break;
            case 'trailDesc':
                this.trailDesc = propValue;
                break;
            case 'trailTypeID':
                this.trailTypeID = propValue;
                break;
            case 'mountainIDs':
                this.mountainIDs = propValue;
                break;
        }
    }

    parseSetupData(rawData) {
        const data = JSON.parse(rawData);
        this._countries = data.countries;
        this._mountains = data.mountains;
        this._trailTypes = data.types;
        this._pointTypes = data.pointtypes;
    }
}

export default new DataModel();
