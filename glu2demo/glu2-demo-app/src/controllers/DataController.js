/* global toGeoJSON */
/* global polyline */
import GLU from '/../../glu2.js/src/index';
import CommonDataModel from '/dataSources/CommonDataModel';
import TrailsDataModel from '/dataSources/TrailsDataModel';
import Trail from '/objects/Trail';
import MapModel from '/dataSources/MapModel';
import MessageEvents from '/enums/MessageEvents';
import Globals from '/Globals';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import API from '/apis/Api';
import CommonHelper from '/helpers/CommonHelper';
import appConfig from '/appConfig';
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
            [Enum.MapEvents.REBUILD_PATH_LAYERS]: this.reBuildMapLayers,
            [Enum.MapEvents.REQUEST_DISPLAY_PATH_LAYERS]: this.onRequestMapLayers,
            [Enum.DataEvents.SAVE_TRAILDATA2MODEL]: this.setTrailData2Model,
            [Enum.DataEvents.UPDATE_TRAILDATA2MODEL]: this.updateTrailData2Model,
            [Enum.DataEvents.ADD_SURFACE_CHANGE]: this.addSurfaceChange,
            [Enum.DataEvents.RETRIEVE_TRAIL_DATA]: this.getTrailData,
            [Enum.DataEvents.RETRIEVE_CHART_DATA]: this.getChartData,
            [Enum.DataEvents.RETRIEVE_TRAILS_LIST]: this.getTrailsList,
            [Enum.DataEvents.DOWNLOAD_TRAIL]: this.downloadTrail,
            [Enum.DataEvents.UPLOAD_TRAIL]: this.uploadTrail,
            [Enum.DataEvents.START_IMAGE_UPLOAD]: this.uploadImage,
            [Enum.DataEvents.SAVE_INITIAL_GEO_FILE]: this.saveInitalGeoFile,
            [Enum.DataEvents.SAVE_MANUAL_EDITED_FILE]: this.saveManualyEditedGeoFile,
            [Enum.DataEvents.START_SIMPLIFYING_PATH]: this.onSimplifyRequest,
            [Enum.DataEvents.START_ELEVATING_PATH]: this.onElevatePathRequest,
            [Enum.DataEvents.START_FLATTENING_PATH]: this.onFlattenPathRequest,
            [Enum.DataEvents.START_FIXING_WAYPOINTS]: this.onFixWaypointsRequest,
            [Enum.DataEvents.TRANSLATE_BY_OFFSET]: this.onTranslateByOffset,
            [Enum.DataEvents.SAVE2FILE_JSON]: this.onSaveTrail2File,
            [Enum.ChartEvents.CHART_POINT_CLICKED]: this.onChartClickEvent,
        });
    }

    onChartClickEvent() {
        GLU.bus.emit(MessageEvents.LONGER_INFO_MESSAGE, Lang.msg('keypress4surfaceType'));
    }

    onTranslateByOffset(payload) {
        TrailsDataModel.activeTrail.translateByOffset(payload);
        GLU.bus.emit(Enum.MapEvents.SHOW_PREVIEW_MAP);
    }

    onSaveTrail2File() {
        const featuresCollection = TrailsDataModel.activeTrail.parsedFeaturesCollection;
        if (featuresCollection.features.length > 0) {
            const a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(JSON.stringify(featuresCollection)));
            a.setAttribute('download', TrailsDataModel.activeTrail.getTrailData().trailName + '.geojson');
            a.click();
        }
    }

    getMapInitSetup() {
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startInitialDataLoading'));
        API.Trails.getInitialSetup({
                query: {},
            })
            .then((response) => {
                CommonDataModel.parseSetupData(response.text);
                this.getDataInitSetup();
            })
            .catch(err => this.getSetupDataError(err));
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endInitialDataLoading'));
    }

    getDataInitSetup() {
        const dataSetup = CommonDataModel.getSetup();
        GLU.bus.emit(Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED, dataSetup);
    }

    reBuildMapLayers() {
        const maps = {
            leftMap: MapModel.leftMap,
            // rightMap: MapModel.rightMap,
        };
        TrailsDataModel.activeTrail.reBuildMapLayers(maps);
        GLU.bus.emit(Enum.MapEvents.REQUEST_DISPLAY_PATH_LAYERS);
    }

    onRequestMapLayers() {
        const maps = {
            leftMap: MapModel.leftMap,
            // rightMap: MapModel.rightMap,
        };
        TrailsDataModel.activeTrail.generateWaypoints(maps);
        const pathLayers = TrailsDataModel.activeTrail.mapPathLayers;
        GLU.bus.emit(Enum.MapEvents.DISPLAY_PATH_LAYERS_ON_MAP, pathLayers);
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
        TrailsDataModel.activeTrail.setDataByName(payload.name, payload.index, payload.prop, payload.value);
    }

    getTrailData() {
        if (TrailsDataModel.activeTrail === undefined) {
            TrailsDataModel.trail = new Trail();
        } else {
            if (TrailsDataModel.activeTrail.initialised) {
                const trailData = TrailsDataModel.activeTrail.getTrailData();
                GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
            }
        }
    }

    updateTrailData2Model(payload) {
        if (payload.name === 'waypoints') {
            TrailsDataModel.activeTrail.setDataByName(payload.name, payload.index, payload.prop, payload.value);
        } else {
            TrailsDataModel.activeTrail.setDataByName(payload.name, null, null, payload.value);
        }
        const trailData = TrailsDataModel.activeTrail.getTrailData();
        GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
        GLU.bus.emit(Enum.DataEvents.RETRIEVE_CHART_DATA, 'chartcontainer');
        if (payload.name === 'surfaceCollection') {
            GLU.bus.emit(Enum.MapEvents.REBUILD_PATH_LAYERS);
        }
    }

    addSurfaceChange(payload) {
        console.log('addSurfaceChange(' + payload.odometer + ', ' + payload.surfaceType + ')');
        let currentSurfaceCollection = TrailsDataModel.activeTrail.getTrailData().surfaceCollection;
        currentSurfaceCollection.push([payload.odometer, payload.surfaceType]);
        TrailsDataModel.activeTrail.setDataByName('surfaceCollection', null, null, currentSurfaceCollection);
    }

    getChartData(containerId) {
        const chartData = TrailsDataModel.activeTrail.getChartData(containerId);
        GLU.bus.emit(Enum.DataEvents.CHART_DATA_RETRIEVED, chartData);
    }

    getTrailsList() {
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startTrailsListLoading'));
        API.Trails.getTrailsList({
                query: {},
            })
            .then((response) => {
                CommonDataModel.trails = JSON.parse(response.text);
                const curentTrailsList = CommonDataModel.trails;
                GLU.bus.emit(Enum.DataEvents.TRAILS_LIST_RETRIEVED, curentTrailsList);
            })
            .catch((err) => {
                const msg = (err && err.response) ? err.response.text : err.toString();
                console.error('DataController.getTrailsList()');
                console.error(err);
                // console.log('getTrailList: ' + msg);
                GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('trailLoadFailed') + msg);
            });
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endTrailsListLoading'));
    }

    saveInitalGeoFile(payload) {
        if (payload.file) {
            const r = new FileReader();
            r.onload = (e) => {
                TrailsDataModel.trail = new Trail();
                // Save trail name
                // Save parsed file
                const domParser = (new DOMParser()).parseFromString(e.target.result, 'text/xml');
                if (payload.file.name.toLowerCase().indexOf('.gpx') > 0) {
                    TrailsDataModel.activeTrail.parsedFeaturesCollection = toGeoJSON.gpx(domParser);
                } else if (payload.file.name.toLowerCase().indexOf('.kml') > 0) {
                    TrailsDataModel.activeTrail.parsedFeaturesCollection = toGeoJSON.kml(domParser);
                } else {
                    GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('fileFormatUnsuported'));
                    return;
                }
                TrailsDataModel.activeTrail.parseInitialFeaturesCollection();
                TrailsDataModel.activeTrail.setDataByName('trailName', null, null, payload.file.name.replace('.gpx', '').replace('_profil', ' ').replace('_', ' '));
                TrailsDataModel.activeTrail.setDataByName('fileName', null, null, payload.file.name);
                const trailData = TrailsDataModel.activeTrail.getTrailData();
                GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
            };
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startGeoFileReading'));
            r.readAsText(payload.file);
        } else {
            GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('fileLoadFailed'));
            return;
        }
    }

    saveManualyEditedGeoFile(payload) {
        TrailsDataModel.activeTrail.parsedFeaturesCollection = JSON.parse(JSON.stringify(payload));
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('changesSaved'));
    }

    downloadTrail(trailId) {
        const query = {
            trailid: trailId,
        };
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startDownloadingTrailLoading'));
        API.Trails.getTrail({ query })
            .then((response) => {
                TrailsDataModel.trail = new Trail();
                TrailsDataModel.activeTrail.parsedFeaturesCollection = JSON.parse(response.text);
                TrailsDataModel.activeTrail.parseInitialFeaturesCollection();
                const geoSetup = TrailsDataModel.activeTrail.getTrailGeoLocation(); // Runs parsing
                MapModel.initialCenter = JSON.parse(JSON.stringify(geoSetup.center));
                MapModel.initialMaxBounds = JSON.parse(JSON.stringify(geoSetup.bounds));
                console.info('# 1');
                this.onSimplifyRequest();
                TrailsDataModel.activeTrail.setProgressFinished();
                const trailData = TrailsDataModel.activeTrail.getTrailData();
                GLU.bus.emit(Enum.DataEvents.TRAIL_DOWNLOADED, trailData);
                GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
            })
            .catch((err) => {
                const msg = (err && err.response) ? err.response.text : err.toString();
                console.error('DataController.downloadTrail()');
                console.error(err);
                // console.log('downloadTrail: ' + msg);
                GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('trailLoadFailed') + msg);
            });
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endDownloadingTrailLoading'));
    }

    uploadTrail() {
        const trail = JSON.parse(JSON.stringify(TrailsDataModel.activeTrail.elevationNivelatedFeaturesCollectionFeatures));
        const lines = CommonHelper.getLineStrings(trail);
        const waypoints = CommonHelper.getPoints(trail);
        const generalFacts = JSON.parse(JSON.stringify(TrailsDataModel.activeTrail.getGeneralFacts()));
        const uploadPayload = JSON.stringify({
            lines,
            waypoints,
            generalFacts,
        });
        // Connection
        const destination = appConfig.constants.server + 'setTrail.php';
        const xmlhttpUpload = new XMLHttpRequest();
        xmlhttpUpload.onreadystatechange = () => {
            if (xmlhttpUpload.readyState === 4 && xmlhttpUpload.status === 200) {
                console.log(xmlhttpUpload.responseText);
            }
        };
        xmlhttpUpload.open('POST', destination, true);
        xmlhttpUpload.send(uploadPayload);
    }

    onSimplifyRequest() {
        TrailsDataModel.activeTrail.simplifyTrailLineString();
        this.progressPayload.loaded = 30;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeoFileSimplifying'));
        GLU.bus.emit(Enum.DataEvents.START_ELEVATING_PATH);
    }

    onElevatePathRequest() {
        let badPoints = [];
        TrailsDataModel.activeTrail.elevatedFeaturesCollection = JSON.parse(JSON.stringify(TrailsDataModel.activeTrail.simplifiedFeaturesCollection));
        const elevatedFeaturesCollection = TrailsDataModel.activeTrail.elevatedFeaturesCollection;
        const elevatedPathLines = CommonHelper.getLineStrings(elevatedFeaturesCollection);
        let elevatedPathLine = elevatedPathLines[0].geometry.coordinates;
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
            this.checkAddElevation(elevatedPathLine, badPoints, 0);
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
    }x
    checkAddElevation(elevatedPathLine, badPoints, startIndex) {
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
                        elevatedPathLine[pointIndexToFix][2] = calculatedElevation;
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

    onFlattenPathRequest() {
        TrailsDataModel.activeTrail.nivelatePathLine();
        // console.info('# 21');
        this.progressPayload.loaded = 82;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endPathNivelating'));

        TrailsDataModel.activeTrail.interpolatePathLine();
        // console.info('# 22');
        this.progressPayload.loaded = 84;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endPathInterpolating'));

        TrailsDataModel.activeTrail.generateGeneralFacts();
        // console.info('# 23');
        this.progressPayload.loaded = 86;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeneralFactsGenerating'));

        const trailFacts = TrailsDataModel.activeTrail.getGeneralFacts();
        if (trailFacts.imageURL === '') {
            const trailCenter = trailFacts.center;
            // const query = {
            //     polyline: encodeURIComponent(polyline.fromGeoJSON(TrailsDataModel.activeTrail.getSimplifiedFeatureCollectionPathOnly())),
            //     mapParams: trailCenter[0] + ',' + trailCenter[1] + ',10',
            //     fileName: encodeURIComponent(CommonHelper.getUUID()) + '.png',
            // };
            const query = {
                polyline: polyline.fromGeoJSON(TrailsDataModel.activeTrail.getSimplifiedFeatureCollectionPathOnly()),
                mapParams: trailCenter[0] + ',' + trailCenter[1] + ',10',
                fileName: CommonHelper.getUUID() + '.png',
            };
            // console.log('getTrailThumbnail');
            // console.log(query);
            API.Trails.getTrailThumbnail({ query })
            .then((response) => {
                if (response.text.substring(0, 6) === '#Error') {
                    GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('trailThumbnailGetFailed') + response.text);
                    console.warn(response.text);
                } else if (response.text.substring(0, 3) === '#OK') {
                    const parsedResponseArray = response.text.split(': ');
                    TrailsDataModel.activeTrail.setDataByName('imageURL', null, null, appConfig.constants.server + parsedResponseArray[1]);
                    GLU.bus.emit(Enum.DataEvents.START_FIXING_WAYPOINTS);
                }
            })
            .catch((err) => {
                const msg = (err && err.response) ? err.response.text : err.toString();
                console.error('API.Trails.getTrailThumbnail()');
                console.error(err);
                // console.log('downloadTrail: ' + msg);
                GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('trailThumbnailGetFailed') + msg);
            });
        } else {
            GLU.bus.emit(Enum.DataEvents.START_FIXING_WAYPOINTS);
        }
    }

    onFixWaypointsRequest() {
        if (CommonHelper.getPoints(TrailsDataModel.activeTrail.getEnrichedFeatureCollection()).length > 0) {
            const maps = {
                leftMap: MapModel.leftMap,
                // rightMap: MapModel.rightMap,
            };
            const waypoints = TrailsDataModel.activeTrail.generateWaypoints(maps);
            this.setWaypointsThumbnails(waypoints, 0);
        } else {
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, {
                status: 'progress',
                id: 'progressFixWPs',
                loaded: 1,
                total: 1,
            });
            this.progressPayload.loaded = 100;
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endWaypointsGenerating'));
            GLU.bus.emit(Enum.MapEvents.REBUILD_PATH_LAYERS);
        }
    }

    setWaypointsThumbnails(waypoints, WPindex) {
        console.log('setWaypointsThumbnails(' + waypoints + ', ' + WPindex + ') - -  waypoints.length = ' + waypoints.length);
        if (WPindex < waypoints.length) {
            console.log('progressFixWPs WPindex < waypoints.length!');
            const query = {
                geojson: JSON.stringify(waypoints[WPindex].properties.wpGeoJSON),
                mapParams: waypoints[WPindex].geometry.coordinates[0] + ',' + waypoints[WPindex].geometry.coordinates[1] + ',17',
                fileName: CommonHelper.getUUID() + '.png',
            };
            console.log('setWaypointsThumbnails(' + waypoints + ',' + WPindex + ')');
            console.log(query);
            API.Trails.getWPThumbnail({ query })
            .then((response) => {
                if (response.text.substring(0, 6) === '#Error') {
                    GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('wpThumbnailGetFailed') + response.text);
                    console.warn(response.text);
                } else if (response.text.substring(0, 3) === '#OK') {
                    const parsedResponseArray = response.text.split(': ');
                    TrailsDataModel.activeTrail.setDataByName('waypoints', WPindex, 'pictureUrl', appConfig.constants.server + parsedResponseArray[1]);
                    console.log('WP thumbnail URL:');
                    console.log(appConfig.constants.server + parsedResponseArray[1]);
                    GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, {
                        status: 'progress',
                        id: 'progressFixWPs',
                        loaded: WPindex,
                        total: waypoints.length,
                    });
                    setTimeout(() => {
                        this.setWaypointsThumbnails(waypoints, WPindex + 1);
                    }, 100);
                }
            })
            .catch((err) => {
                const msg = (err && err.response) ? err.response.text : err.toString();
                console.error('API.Trails.getWPThumbnail()');
                console.error(err);
                GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('wpThumbnailGetFailed') + msg);
                setTimeout(() => {
                    this.setWaypointsThumbnails(waypoints, WPindex + 1);
                }, 100);
            });
        } else {
            console.log('progressFixWPs COMPLETED!');
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, {
                status: 'progress',
                id: 'progressFixWPs',
                loaded: 1,
                total: 1,
            });
            this.progressPayload.loaded = 100;
            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
            GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endWaypointsGenerating'));
            GLU.bus.emit(Enum.MapEvents.REBUILD_PATH_LAYERS);
        }
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
                TrailsDataModel.activeTrail.imageURL = Globals.IMAGE_UPLOAD_PATH + payload.fileName;
                const statusPayload = {
                    status: resp.status,
                    message: resp.data,
                    imgURL: Globals.IMAGE_UPLOAD_PATH + payload.fileName,
                };
                GLU.bus.emit(MessageEvents.PICTURE_UPLOAD_STATUS, statusPayload);
                const trailData = TrailsDataModel.activeTrail.getTrailData();
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
