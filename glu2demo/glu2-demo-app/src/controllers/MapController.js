import GLU from '/../../glu2.js/src/index';
import MapModel from '/dataSources/MapModel';
import MessageEvents from '/enums/MessageEvents';
// import AppEvents from '/enums/AppEvents';
import Enum from '/enums/Enum';
// import API from '/apis/Api';

class MapController extends GLU.Controller {
    constructor() {
        super();
    }
    onActivate() {
        this.bindGluBusEvents({
            [Enum.MapEvents.RETRIEVE_MAP_INIT]: this.getMapInitSetup,
        });
    }

    getMapInitSetup() {
        const mapSetup = MapModel.getInitialSetup();
        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, 'Start loading map');
        GLU.bus.emit(Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED, mapSetup);
    }

    onDeactivate() {
        this.unbindGluBusEvents();
    }
}

export default new MapController();
