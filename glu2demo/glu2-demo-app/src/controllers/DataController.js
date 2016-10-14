import GLU from '/../../glu2.js/src/index';
import CommonDataModel from '/dataSources/CommonDataModel';
import TrailDataModel from '/dataSources/TrailDataModel';
import MessageEvents from '/enums/MessageEvents';
import Globals from '/Globals';
import Enum from '/enums/Enum';
import API from '/apis/Api';
// import { handleReject } from '/helpers/RejectHandler';

class DataController extends GLU.Controller {
    constructor() {
        super();
    }
    onActivate() {
        this.bindGluBusEvents({
            [Enum.MapEvents.RETRIEVE_MAP_INIT]: this.getMapInitSetup,
            [Enum.MapEvents.RETRIEVE_INITIAL_DATA_SETUP]: this.getDataInitSetup,
            [Enum.DataEvents.SAVE_TRAILDATA2MODEL]: this.setTrailData2Model,
            [Enum.DataEvents.RETRIEVE_TRAIL_DATA]: this.getTrailData,
            [Enum.DataEvents.START_IMAGE_UPLOAD]: this.uploadImage,
        });
    }

    getMapInitSetup() {
        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, 'Start loading initial data');
        API.Trails.getInitialSetup({
                query: {},
            })
            .then(response => CommonDataModel.parseSetupData(response.text))
            .catch(err => this.getSetupDataError(err));
        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, 'Initial data loaded');
    }

    getDataInitSetup() {
        const dataSetup = CommonDataModel.getSetup();
        GLU.bus.emit(Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED, dataSetup);
    }

    onDeactivate() {
        this.unbindGluBusEvents();
    }

    getSetupDataError(err) {
        console.error(err);
        GLU.bus.emit(Enum.Enum.AppEvents.ERROR_OCCURRED, {
            title: 'Error',
            errormessage: err && err.response ? err.response.text : err.toString(),
        });
    }

    setTrailData2Model(payload) {
        TrailDataModel.setDataByName(payload.name, payload.value);
    }

    getTrailData() {
        const trailData = TrailDataModel.getTrailData();
        GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
    }

    uploadImage(payload) {
        const data = new FormData();
        data.append('SelectedFile', payload.file);
        const request = new XMLHttpRequest();
        let resp;
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                try {
                    resp = JSON.parse(request.response);
                } catch (e) {
                    resp = {
                        status: 'error',
                        data: 'Unknown error occurred: [' + request.responseText + ']',
                    };
                }
                const statusPayload = {
                    status: resp.status,
                    message: resp.data,
                    imgURL: Globals.IMAGE_UPLOAD_PATH + payload.fileName,
                };
                GLU.bus.emit(MessageEvents.PICTURE_UPLOAD_STATUS, statusPayload);
            }
        };

        request.upload.addEventListener('progress', (e) => {
            const progressPayload = {
                    status: 'progress',
                    loaded: e.loaded,
                    total: e.total,
                };
            GLU.bus.emit(MessageEvents.PICTURE_UPLOAD_PROGRESS, progressPayload);
            // _progress.style.width = Math.ceil(e.loaded/e.total) * 100 + '%';
        }, false);

        request.open('POST', Globals.IMAGE_UPLOADER_PATH);
        request.send(data);
    }
}

export default new DataController();
