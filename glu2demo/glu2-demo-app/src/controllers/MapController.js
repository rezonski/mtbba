import GLU from '/../../glu2.js/src/index';
import MapModel from '/dataSources/MapModel';
import TrailsDataModel from '/dataSources/TrailsDataModel';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import API from '/apis/Api';

class MapController extends GLU.Controller {
    constructor() {
        super();
    }
    onActivate() {
        this.bindGluBusEvents({
            [Enum.MapEvents.RETRIEVE_MAP_INIT]: this.getToken,
            [Enum.MapEvents.SAVE_LEFT_MAP]: this.saveLeftMap,
            [Enum.MapEvents.SAVE_RIGHT_MAP]: this.saveRightMap,
            [Enum.MapEvents.SAVE_PREVIEW_MAP]: this.savePreviewMap,
            [Enum.MapEvents.SHOW_PREVIEW_MAP]: this.showPreviewMap,
        });
    }

    getMapInitSetup() {
        const mapSetup = MapModel.getInitialSetup();
        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('startLoadingMap'));
        GLU.bus.emit(Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED, mapSetup);
        const mapStyles = MapModel.mapStyles;
        GLU.bus.emit(Enum.MapEvents.MAP_STYLES_RETRIEVED, mapStyles);
    }

    getToken() {
        API.Trails.getToken({
                query: {},
            })
            .then((payload) => {
                const newToken = payload.text;
                MapModel.accessToken = newToken;
                this.getMapInitSetup();
            })
            .catch((err) => {
                const msg = (err && err.response) ? err.response.text : err.toString();
                GLU.bus.emit(MessageEvents.ERROR_MESSAGE, msg);
            });
    }

    saveLeftMap(map) {
        MapModel.leftMap = map;
    }

    saveRightMap(map) {
        MapModel.rightMap = map;
    }

    savePreviewMap(map) {
        MapModel.previewMap = map;
        GLU.bus.emit(Enum.MapEvents.SHOW_PREVIEW_MAP);
    }

    showPreviewMap() {
        TrailsDataModel.activeTrail.previewParsedInitialFeaturesCollection(MapModel.previewMap);
    }

    onDeactivate() {
        this.unbindGluBusEvents();
    }
}

export default new MapController();
