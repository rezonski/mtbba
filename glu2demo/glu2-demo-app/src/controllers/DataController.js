/* global toGeoJSON */
import GLU from '/../../glu2.js/src/index';
import CommonDataModel from '/dataSources/CommonDataModel';
import TrailDataModel from '/dataSources/TrailDataModel';
import MessageEvents from '/enums/MessageEvents';
import Globals from '/Globals';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
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
            [Enum.DataEvents.SAVE_INITIAL_GEO_FILE]: this.saveInitalGeoFile,
            [Enum.DataEvents.ENRICH_PATH_LINE]: this.enrichPathLine,
        });
    }

    getMapInitSetup() {
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startInitialDataLoading'));
        API.Trails.getInitialSetup({
                query: {},
            })
            .then(response => CommonDataModel.parseSetupData(response.text))
            .catch(err => this.getSetupDataError(err));
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endInitialDataLoading'));
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
        const msg = (err && err.response) ? err.response.text : err.toString();
        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, msg);
    }

    setTrailData2Model(payload) {
        TrailDataModel.setDataByName(payload.name, payload.value);
    }

    getTrailData() {
        const trailData = TrailDataModel.getTrailData();
        GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
    }

    saveInitalGeoFile(payload) {
        let progressPayload = {
            id: 'generalProgress',
            status: 'progress',
            loaded: 0,
            total: 100,
        };
        if (payload.file) {
            const r = new FileReader();
            r.onload = (e) => {
                // Save trail name
                TrailDataModel.trailName = payload.file.name.replace('.gpx', '').replace('_profil', ' ').replace('_', ' ');

                // Save parsed file
                const domParser = (new DOMParser()).parseFromString(e.target.result, 'text/xml');
                if (payload.file.name.toLowerCase().indexOf('.gpx') > 0) {
                    TrailDataModel.parsedInitialFile = toGeoJSON.gpx(domParser);
                } else if (payload.file.name.toLowerCase().indexOf('.kml') > 0) {
                    TrailDataModel.parsedInitialFile = toGeoJSON.kml(domParser);
                } else {
                    GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('fileFormatUnsuported'));
                    return;
                }
                progressPayload.loaded = 10;
                GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
                GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeoFileReading'));

                // Parse JSON to structures
                TrailDataModel.parseInitialFile();
                progressPayload.loaded = 20;
                GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
                GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeoFileParsing'));

                // Filter
                TrailDataModel.reducePathLinePoints();
                progressPayload.loaded = 30;
                GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
                GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeoFileSimplifying'));

                // console.log('Pre eleveation');
                // console.log(TrailDataModel.pathLine);

                this.checkAddElevation();
            };
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startGeoFileReading'));
            r.readAsText(payload.file);
        } else {
            GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('fileLoadFailed'));
            return;
        }
    }

    enrichPathLine() {
        console.info('enrich');
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
                    id: 'uploadImage',
                    loaded: e.loaded,
                    total: e.total,
                };
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
            // _progress.style.width = Math.ceil(e.loaded/e.total) * 100 + '%';
        }, false);

        request.open('POST', Globals.IMAGE_UPLOADER_PATH);
        request.send(data);
    }

    checkAddElevation() {
        let badPoints = [];
        let parsedPoints = '';
        let maxPoints = 50;
        let elevatedPathLine = JSON.parse(JSON.stringify(TrailDataModel.pathLine));
        const xmlhttpElevation = new XMLHttpRequest();
        let progressPayload = {
                                status: 'progress',
                                id: 'elevationPath',
                                loaded: 0,
                                total: elevatedPathLine.length,
                            };

        elevatedPathLine.forEach((location, index) => {
            if ((badPoints.length <= maxPoints ) && (location[2] === undefined || location[2] === 0)) {
                // console.info('Fix elevation index ' + index);
                if (index % 10 === 0) {
                    progressPayload.loaded = parseInt(index, 10);
                    GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
                }
                if (badPoints.length < maxPoints) {
                    badPoints.push({
                        pathIndex: index,
                        point: location,
                    });
                    parsedPoints += location[1] + ',' + location[0] + '|';
                } else {
                    xmlhttpElevation.onreadystatechange = () => {
                        if (xmlhttpElevation.readyState === 4 && xmlhttpElevation.status === 200) {
                            const response = JSON.parse(xmlhttpElevation.responseText);
                            const elevatedPoints = response.results;
                            let tempElevation = 0;
                            elevatedPoints.forEach((elPoint, pointIndex) => {
                                if (elPoint.ele || elPoint.elevation) {
                                    tempElevation = elPoint.elevation;
                                    // console.info('Fix elevation index ' + index);
                                    elevatedPathLine[badPoints[pointIndex].pathIndex][2] = parseInt(elPoint.elevation, 10);
                                } else {
                                    elevatedPathLine[badPoints[pointIndex].pathIndex][2] = parseInt(tempElevation, 10);
                                }
                            });
                            TrailDataModel.pathLine = JSON.parse(JSON.stringify(elevatedPathLine));
                            if (badPoints.length === maxPoints) {
                                this.checkAddElevation();
                            } else {
                                badPoints = [];
                            }
                        }
                    };
                }
            }
        });
        if (badPoints.length === 0 || (badPoints.length > 0 && badPoints.length < maxPoints)) {
            progressPayload.id = 'generalProgress';
            progressPayload.loaded = 70;
            progressPayload.total = 100;
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, progressPayload);
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endAddingElevation'));
            GLU.bus.emit(Enum.DataEvents.ENRICH_PATH_LINE);


            // fixPathArray();
            // fixWaypoints();
        } else {
            if (parsedPoints.length > 10) {
                const endpoint = Globals.ELEVATION_SERVICE_PATH + parsedPoints.substring(0, parsedPoints.length - 1) + Globals.ELEVATION_SERVICE_KEY;
                xmlhttpElevation.open('GET', endpoint, true);
                xmlhttpElevation.send();
            }
        }
    }
}

export default new DataController();
