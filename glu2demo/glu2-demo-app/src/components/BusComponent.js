import React from 'react';
import GLU from '/../../glu2.js/src/index';

class BusComponent extends React.Component {
    constructor(params) {
        super(params);
        this._gluBusEvents = null;
    }

    bindGluBusEvents(events) {
        this._gluBusEvents = events;
        Object.keys(this._gluBusEvents)
            .forEach(eventName => {
                GLU.bus.on(eventName, this._gluBusEvents[eventName], this);
            });
    }

    unbindGluBusEvents() {
        Object.keys(this._gluBusEvents)
            .forEach(eventName => {
                GLU.bus.off(eventName, this._gluBusEvents[eventName]);
            });
        this._gluBusEvents = null;
    }

    emit(eventName, payload) {
        console.info(eventName);
        const hadListeners = GLU.bus.emit(eventName, payload);
        if (!hadListeners) {
            console.warn(`No one listened to event ${eventName}`);
        }
        return hadListeners;
    }
}

export default BusComponent;
