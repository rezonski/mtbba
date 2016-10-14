import GLU from '/../../glu2.js/src/index';
// import API from '/apis/Api';
// import { error } from '/helpers/ResolveMessages';
// import { fileUpload } from '/helpers/FileUpload';

class CommonDataModel extends GLU.DataSource {
    constructor() {
        super();
        this._countries = [];
        this._mountains = [];
        this._trailTypes = [];
        this._fitnessLevels = [];
        this._techniqueLevels = [];
        this._pointTypes = [];
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

    get fitnessLevels() {
        return this._fitnessLevels;
    }

    get techniqueLevels() {
        return this._techniqueLevels;
    }

    parseSetupData(rawData) {
        const data = JSON.parse(rawData);
        this._countries = data.countries;
        this._mountains = data.mountains;
        this._trailTypes = data.trailTypes;
        this._fitnessLevels = data.fitnessLevels;
        this._techniqueLevels = data.techniqueLevels;
        this._pointTypes = data.pointTypes;
    }

    getSetup() {
        return {
            countries: this.countries,
            mountains: this.mountains,
            trailTypes: this.trailTypes,
            fitnessLevels: this.fitnessLevels,
            techniqueLevels: this.techniqueLevels,
            pointTypes: this.pointTypes,
        };
    }
}

export default new CommonDataModel();
