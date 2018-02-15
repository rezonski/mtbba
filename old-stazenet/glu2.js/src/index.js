import EventEmitter from 'eventemitter3';
import BaseController from './core/BaseController';
import Constants from './core/Constants';
import BaseApi from './core/BaseApi';
import DataSource from './core/DataSource';

class GLU {
    constructor() {
        this._eventEmiter = new EventEmitter();
    }

    get constants() {
        return Constants;
    }

    get bus() {
        return this._eventEmiter;
    }

    get Controller() {
        return BaseController;
    }

    get Api() {
        return BaseApi;
    }

    get DataSource() {
        return DataSource;
    }
}

export default new GLU();
