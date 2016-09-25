import BusComponent from './BusComponent';

class BasePage extends BusComponent {
    constructor(params) {
        super(params);

        this._activeControllers = null;
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
