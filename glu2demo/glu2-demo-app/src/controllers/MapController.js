import GLU from '/../../glu2.js/src/index';
import MapModel from '/dataSources/MapModel';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';

class MapController extends GLU.Controller {
    constructor() {
        super();
    }
    onActivate() {
        this.bindGluBusEvents({
            [Enum.MapEvents.RETRIEVE_MAP_INIT]: this.getMapInitSetup,
            [Enum.MapEvents.SAVE_LEFT_MAP]: this.saveLeftMap,
            [Enum.MapEvents.SAVE_RIGHT_MAP]: this.saveRightMap,
        });
    }

    getMapInitSetup() {
        const mapSetup = MapModel.getInitialSetup();
        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('startLoadingMap'));
        GLU.bus.emit(Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED, mapSetup);
        const mapStyles = MapModel.mapStyles;
        GLU.bus.emit(Enum.MapEvents.MAP_STYLES_RETRIEVED, mapStyles);
    }

    saveLeftMap(map) {
        MapModel.leftMap = map;
    }

    saveRightMap(map) {
        MapModel.rightMap = map;
    }

    onDeactivate() {
        this.unbindGluBusEvents();
    }
}

export default new MapController();
