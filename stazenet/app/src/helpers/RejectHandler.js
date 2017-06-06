import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';

const busEvents = {
    error: MessageEvents.ERROR_MESSAGE,
    warning: MessageEvents.WARNING_MESSAGE,
    info: MessageEvents.INFO_MESSAGE,
};

export const handleReject = payload => {
    if (payload.type && payload.message) {
        // we are dealing with ResolveMessages
        let eventName = busEvents[payload.type];
        GLU.bus.emit(eventName, payload.message);
        return;
    }
    GLU.bus.emit(MessageEvents.ERROR_MESSAGE, payload);
};
