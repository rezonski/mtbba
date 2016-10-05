import GLU from '/../../glu2.js/src/index';
import MapModel from '/dataSources/MapModel';
import MessageEvents from '/enums/MessageEvents';
import AppEvents from '/enums/AppEvents';
import Enum from '/enums/Enum';
import API from '/apis/Api';

class MapController extends GLU.Controller {
    constructor() {
        super();
    }
    onActivate() {
        this.bindGluBusEvents({
            [Enum.MapEvents.RETRIEVE_MAP_INIT]: this.getMapInitSetup,
            [AppEvents.ADD_NEW_TRAIL]: this.getDataInitSetup,
        });
    }

    getMapInitSetup() {
        const mapSetup = MapModel.getInitialSetup();
        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, 'Start loading map');
        GLU.bus.emit(Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED, mapSetup);

        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, 'Start loading initial data');
        API.Trails.getInitialSetup({
                query: {},
            })
            .then(response => MapModel.parseSetupData(response.text))
            .catch(err => this.getSetupDataError(err));
        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, 'Initial data loaded');
    }

    getDataInitSetup() {
        const dataSetup = {
            countries: MapModel.countries,
            mountains: MapModel.mountains,
            trailTypes: MapModel.trailTypes,
            pointTypes: MapModel.pointTypes,
        };
        GLU.bus.emit(Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED, dataSetup);
    }

    onDeactivate() {
        this.unbindGluBusEvents();
    }

    getSetupDataError(err) {
        console.error(err);
        GLU.bus.emit(Enum.AppEvents.ERROR_OCCURRED, {
            title: 'Error',
            errormessage: err && err.response ? err.response.text : err.toString(),
        });
    }
}

export default new MapController();
