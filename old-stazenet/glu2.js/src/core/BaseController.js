import GLU from '../index';

class BaseController {
    constructor() {
        this._numberOfActivations = 0;
        this._busEvents = null;
    }

    bindGluBusEvents(events) {
        this._busEvents = events;
        Object.keys(this._busEvents)
            .forEach(eventName => GLU.bus.on(eventName, this._busEvents[eventName], this));
    }

    unbindGluBusEvents() {
        Object.keys(this._busEvents)
            .forEach(eventName => GLU.bus.off(eventName, this._busEvents[eventName]));
        this._busEvents = null;
    }

    activate() {
        if (typeof this.onActivate === 'function') {
            this._numberOfActivations += 1;
            if (this._numberOfActivations === 1) {
                // activate it only for the first time
                this.onActivate();
            } else {
                console.warn('Controller is already activated');
            }
        } else {
            console.warn('Controller doesn\'t have implemented "onActivate method"');
        }
    }

    deactivate() {
        if (typeof this.onDeactivate === 'function') {
            this._numberOfActivations = Math.max(0, this._numberOfActivations - 1);
            if (this._numberOfActivations === 0) {
                this.onDeactivate();
            }
        } else {
            console.warn('Controller doesn\'t have implemented "onDeactivate method"');
        }
    }
}

export default BaseController;
