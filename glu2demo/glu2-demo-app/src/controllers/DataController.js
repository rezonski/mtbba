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
        this.progressPayload = {
            id: 'progressGeneral',
            status: 'progress',
            loaded: 0,
            total: 100,
        };
    }
    onActivate() {
        this.bindGluBusEvents({
            [Enum.MapEvents.RETRIEVE_MAP_INIT]: this.getMapInitSetup,
            [Enum.MapEvents.RETRIEVE_INITIAL_DATA_SETUP]: this.getDataInitSetup,
            [Enum.DataEvents.SAVE_TRAILDATA2MODEL]: this.setTrailData2Model,
            [Enum.DataEvents.RETRIEVE_TRAIL_DATA]: this.getTrailData,
            [Enum.DataEvents.RETRIEVE_CHART_DATA]: this.getChartData,
            [Enum.DataEvents.START_IMAGE_UPLOAD]: this.uploadImage,
            [Enum.DataEvents.SAVE_INITIAL_GEO_FILE]: this.saveInitalGeoFile,
            [Enum.DataEvents.START_SIMPLIFYING_PATH]: this.onSimplifyRequest,
            [Enum.DataEvents.START_ELEVATING_PATH]: this.onElevatePathRequest,
            [Enum.DataEvents.START_FLATTENING_PATH]: this.onFlattenPathRequest,
            [Enum.DataEvents.START_FIXING_WAYPOINTS]: this.onFixWaypointsRequest,
            [Enum.ChartEvents.CHART_POINT_CLICKED]: this.onChartEvent,
            [Enum.ChartEvents.CHART_POINT_HOVERED]: this.onChartEvent,
        });
    }

    onChartEvent() {
        // console.info('onChartEvent');
        // console.info(e);
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
        // console.error(err);
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

    getChartData(containerId) {
        const chartData = TrailDataModel.getChartData(containerId);
        GLU.bus.emit(Enum.DataEvents.CHART_DATA_RETRIEVED, chartData);
    }

    onSimplifyRequest() {
        TrailDataModel.reducePathLinePoints();
        this.progressPayload.loaded = 30;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeoFileSimplifying'));
        GLU.bus.emit(Enum.DataEvents.START_ELEVATING_PATH);
    }

    onElevatePathRequest() {
        let badPoints = [];
        let elevatedPathLine = JSON.parse(JSON.stringify(TrailDataModel.pathLine));
        elevatedPathLine.forEach((location, index) => {
            if (location[2] === undefined || location[2] === 0) {
                badPoints.push({
                    pathIndex: index,
                    point: location,
                });
            }
        });

        if (badPoints.length > 0) {
            // this.checkAddElevation();
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('totalBadElevatedPoints') + badPoints.length);
            this.checkAddElevation(badPoints, 0);
        } else {
            this.progressPayload.loaded = 70;
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endAddingElevation'));

            let elevationProgressPayload = {
                status: 'progress',
                id: 'progressElevationPath',
                loaded: 1,
                total: 1,
            };
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, elevationProgressPayload);

            GLU.bus.emit(Enum.DataEvents.START_FLATTENING_PATH);
        }
    }

    checkAddElevation(badPoints, startIndex) {
        // console.log('checkAddElevation(' + badPoints.length + ', ' + startIndex + ')');
        let currentProgressPayload = {
                                status: 'progress',
                                id: 'progressElevationPath',
                                loaded: null,
                                total: badPoints.length,
                            };
        let requestPayloadPointsString = '';
        let pointsContainerIndex = 0;
        let passLoopCounter = 0;
        let maxPoints = 90;
        let tempBadPoints = [];

        for (let loopCounter = parseInt(startIndex, 10); loopCounter < badPoints.length; loopCounter++) {
            // console.log('loopCounter ' + loopCounter);
            if (pointsContainerIndex < maxPoints) {
                const badPoint = badPoints[loopCounter];
                tempBadPoints.push(badPoint);
                requestPayloadPointsString += badPoint.point[1] + ',' + badPoint.point[0] + '|';
                pointsContainerIndex++;
                passLoopCounter = parseInt(loopCounter + 1, 10);
            }
        }

        if (tempBadPoints.length > 0) {
            const xmlhttpElevation = new XMLHttpRequest();
            xmlhttpElevation.onreadystatechange = () => {
                if (xmlhttpElevation.readyState === 4 && xmlhttpElevation.status === 200) {
                    // console.log('response xmlhttpElevation');
                    const response = JSON.parse(xmlhttpElevation.responseText);
                    const elevatedPoints = response.results;
                    let tempElevation = 0;
                    elevatedPoints.forEach((elPoint, pointIndex) => {
                        const calculatedElevation = (elPoint.ele || elPoint.elevation) ? parseInt(elPoint.elevation, 10) : parseInt(tempElevation, 10);
                        const pointIndexToFix = parseInt(tempBadPoints[pointIndex].pathIndex, 10);
                        TrailDataModel.setElevationOnPathByIndex(pointIndexToFix, calculatedElevation);
                        if (pointIndexToFix % 10 === 0) {
                            currentProgressPayload.loaded = parseInt(pointIndexToFix, 10);
                            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, currentProgressPayload);
                        }
                    });
                    // this.checkAddElevation(badPoints, loopCounter);
                    setTimeout(this.checkAddElevation(badPoints, parseInt(passLoopCounter, 10)), 10);
                }
            };
            const endpoint = Globals.ELEVATION_SERVICE_PATH + requestPayloadPointsString.substring(0, requestPayloadPointsString.length - 1) + Globals.ELEVATION_SERVICE_KEY;
            xmlhttpElevation.open('GET', endpoint, true);
            xmlhttpElevation.send();
        } else {
            this.progressPayload.loaded = 70;
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endAddingElevation'));
            GLU.bus.emit(Enum.DataEvents.START_FLATTENING_PATH);
        }
    }

    saveInitalGeoFile(payload) {
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
                this.progressPayload.loaded = 10;
                GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
                GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeoFileReading'));

                // Parse JSON to structures
                TrailDataModel.parseInitialFile();
                this.progressPayload.loaded = 20;
                GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
                GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeoFileParsing'));

                const trailData = TrailDataModel.getTrailData();
                GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
            };
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startGeoFileReading'));
            r.readAsText(payload.file);
        } else {
            GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('fileLoadFailed'));
            return;
        }
    }

    onFlattenPathRequest() {
        TrailDataModel.flattenPathLine();
        this.progressPayload.loaded = 82;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endPathFlattening'));

        TrailDataModel.generateGeneralFacts();
        this.progressPayload.loaded = 85;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeneralFactsGenerating'));

        GLU.bus.emit(Enum.DataEvents.START_FIXING_WAYPOINTS);
    }

    onFixWaypointsRequest() {
        if (TrailDataModel.waypoints.length > 0) {
            TrailDataModel.generateWaypoints();
            // console.info(TrailDataModel.waypoints);
            // console.info(TrailDataModel.chartWaypoints);
        } else {
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, {
                status: 'progress',
                id: 'progressFixWPs',
                loaded: 1,
                total: 1,
            });
        }
        this.progressPayload.loaded = 100;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endWaypointsGenerating'));
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
                TrailDataModel.imageURL = Globals.IMAGE_UPLOAD_PATH + payload.fileName;
                const statusPayload = {
                    status: resp.status,
                    message: resp.data,
                    imgURL: Globals.IMAGE_UPLOAD_PATH + payload.fileName,
                };
                GLU.bus.emit(MessageEvents.PICTURE_UPLOAD_STATUS, statusPayload);
                const trailData = TrailDataModel.getTrailData();
                GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
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
}

export default new DataController();
