import React from 'react';
import BusComponent from './BusComponent';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SurveyTheme from '../components/theme/SurveyTheme';

class BasePage extends BusComponent {
    constructor(params) {
        super(params);
        this._activeControllers = [null];
        this.constructor.childContextTypes = {
            muiTheme: React.PropTypes.object,
        };
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(SurveyTheme),
        };
    }

    activateControllers(... controllers) {
        this._activeControllers = controllers;
        this._activeControllers.forEach(controller => controller.activate());
    }

    deactivateControllers() {
        if (!Array.isArray(this._activeControllers)) {
            console.warn('No controllers have been activated.');
        } else {
            this._activeControllers.forEach(controller => controller.deactivate());
        }
    }
}

export default BasePage;
