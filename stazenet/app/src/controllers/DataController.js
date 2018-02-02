/* global toGeoJSON */
/* global polyline */
/* global turf */
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
import TrailHelper from '/helpers/TrailHelper';
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
            [Enum.DataEvents.GENERATE_WP_SUGGESTIONS]: this.generateWaypointSuggestions,
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
        TrailsDataModel.activeTrail.enrichPathLine();
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
        throw msg;
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
        // console.log('addSurfaceChange(' + payload.odometer + ', ' + payload.surfaceType + ')');
        let currentSurfaceCollection = TrailsDataModel.activeTrail.getTrailData().surfaceCollection;
        currentSurfaceCollection.push([payload.odometer, payload.surfaceType]);
        TrailsDataModel.activeTrail.setDataByName('surfaceCollection', null, null, currentSurfaceCollection);
    }

    getChartData(containerId) {
        TrailsDataModel.activeTrail.enrichPathLine();
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
                throw msg;
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
                    throw Lang.msg('fileFormatUnsuported');
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
            throw Lang.msg('fileLoadFailed');
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
                TrailsDataModel.activeTrail.saveDownloadedFeaturesCollection(JSON.parse(response.text));
                const geoSetup = TrailsDataModel.activeTrail.getTrailGeoLocation(); // Runs parsing
                MapModel.initialCenter = JSON.parse(JSON.stringify(geoSetup.center));
                MapModel.initialMaxBounds = JSON.parse(JSON.stringify(geoSetup.bounds));
                TrailsDataModel.activeTrail.setProgressFinished();
                const trailData = TrailsDataModel.activeTrail.getTrailData();
                GLU.bus.emit(Enum.DataEvents.TRAIL_DOWNLOADED, trailData);
                GLU.bus.emit(Enum.DataEvents.TRAIL_DATA_RETRIEVED, trailData);
                GLU.bus.emit(Enum.MapEvents.REBUILD_PATH_LAYERS);
            })
            .catch((err) => {
                const msg = (err && err.response) ? err.response.text : err.toString();
                console.error('DataController.downloadTrail()');
                console.error(err);
                // console.log('downloadTrail: ' + msg);
                GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('trailLoadFailed') + msg);
                throw msg;
            });
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endDownloadingTrailLoading'));
    }

    uploadTrail() {
        TrailsDataModel.activeTrail.enrichPathLine();
        const trail = JSON.parse(JSON.stringify(TrailsDataModel.activeTrail.enrichedFeaturesCollection));
        const lines = CommonHelper.getLineStrings(trail);
        const waypoints = CommonHelper.getPoints(trail);
        const generalFacts = JSON.parse(JSON.stringify(TrailsDataModel.activeTrail.getGeneralFacts()));
        const uploadPayload = JSON.stringify({
            lines,
            waypoints,
            generalFacts,
        });
        // console.log({
        //     lines,
        //     waypoints,
        //     generalFacts,
        // });
        // Connection
        const destination = appConfig.constants.server + 'api/db/setTrail.php';
        const xmlhttpUpload = new XMLHttpRequest();
        xmlhttpUpload.onreadystatechange = () => {
            if (xmlhttpUpload.readyState === 4 && xmlhttpUpload.status === 200) {
                const resp = JSON.parse(xmlhttpUpload.responseText);
                if (resp.status && resp.newTrail) {
                    GLU.bus.emit(MessageEvents.INFO_MESSAGE, `New trail/version ${resp.trailID}/${resp.newVersionID} upladed successfully`);
                } else {
                    console.warn('#TrailUpladFailure');
                    console.info(resp.log);
                    GLU.bus.emit(MessageEvents.ERROR_MESSAGE, `Upload failed. See console log for details`);
                }
            }
        };
        xmlhttpUpload.open('POST', destination, true);
        xmlhttpUpload.send(uploadPayload);
    }

    generateWaypointSuggestions() {
        const parsedFeaturesCollection = TrailsDataModel.activeTrail.parsedFeaturesCollection;
        const waypoints = CommonHelper.getPoints(parsedFeaturesCollection);
        this.searchOneWaypointToponyms(waypoints, 0);
    }

    searchOneWaypointToponyms(waypoints, widx) {
        if (waypoints.length > 0 && !waypoints[widx]) { // skinuti !
            const setup = {
                coordinates: waypoints[widx].geometry.coordinates[1] + ',' + waypoints[widx].geometry.coordinates[0],
                key: 'AIzaSyDRi_-A_op267m9UYOEVWFJ_L17Gq5Klis',
                lvl: [
                  {
                    type: 'locality',
                    radius: 1000,
                    prefix: 'Selo ',
                  },
                  {
                    type: 'geocode',
                    radius: 300,
                    prefix: 'Lokacija ',
                  },
                  {
                    type: 'natural_feature',
                    radius: 500,
                    prefix: '',
                  },
                  {
                    type: 'route',
                    radius: 200,
                    prefix: 'Put ',
                  },
                ],
              };
            this.searchOneToponymLevel(waypoints, widx, setup, 0);
        } else {
            TrailsDataModel.activeTrail.waypoints = waypoints;
            GLU.bus.emit(Enum.DataEvents.WP_SUGGESTIONS_GENERATED, {
                waypoints,
            });
        }
    }

    searchOneToponymLevel(waypoints, widx, setup, indexLvl) {
        if (setup.lvl[indexLvl]) {
            const wp = waypoints[widx];
            const query = {
                location: setup.coordinates,
                radius: setup.lvl[indexLvl].radius,
                type: setup.lvl[indexLvl].type,
                key: setup.key,
            };
            API.Google.search4Point({ query })
            .then((responseRaw) => {
                const response = JSON.parse(responseRaw.text);
                if (response.status === 'OK' && response.results) {
                    const suggestions = response.results.reduce((total, currentValue) => {
                        // console.log('add ' + currentValue.name);
                        const toPoint = turf.point([currentValue.geometry.location.lng, currentValue.geometry.location.lat]);
                        const distance = turf.distance(wp, toPoint).toFixed(2);
                        const angle = turf.bearing(wp, toPoint);
                        const angleDesc = CommonHelper.angle2string(angle);
                        // return total + ', ' + setup.lvl[indexLvl].prefix + currentValue.name;
                        return `${total}, ${setup.lvl[indexLvl].prefix} ${currentValue.name} (${distance}km ${angleDesc})`;
                    }, '');
                    // console.log('waypoints[' + widx + '] = ' + suggestions);
                    if (wp.properties.suggestionNames !== undefined) {
                        wp.properties.suggestionNames = wp.properties.suggestionNames + suggestions;
                    } else {
                        wp.properties.suggestionNames = suggestions;
                    }
                }
                this.searchOneToponymLevel(waypoints, widx, setup, indexLvl + 1);
            });
            // .catch((err) => {
            //     const msg = (err && err.response) ? err.response.text : err.toString();
            //     console.error('API.Trails.search4Point()');
            //     console.error(err);
            //     GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('search4PointsFailed') + msg);
            //     throw msg;
            // });
        } else {
            const currentSuggestionNames = (waypoints[widx].properties.suggestionNames) ? waypoints[widx].properties.suggestionNames : '';
            waypoints[widx].properties.suggestionNames = (currentSuggestionNames.length > 0) ? currentSuggestionNames.substr(2) : '';
            this.searchOneWaypointToponyms(waypoints, widx + 1);
        }
    }

    onSimplifyRequest() {
        TrailsDataModel.activeTrail.simplifyTrailLineString();
        this.progressPayload.loaded = 30;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeoFileSimplifying'));
        GLU.bus.emit(Enum.DataEvents.START_ELEVATING_PATH);
    }

    onElevatePathRequest() {
        TrailsDataModel.activeTrail.elevatedFeaturesCollection = JSON.parse(JSON.stringify(TrailsDataModel.activeTrail.simplifiedFeaturesCollection));
        const elevatedFeaturesCollection = TrailsDataModel.activeTrail.elevatedFeaturesCollection;
        const elevatedPathLines = CommonHelper.getLineStrings(elevatedFeaturesCollection);
        let elevatedPathLine = elevatedPathLines[0].geometry.coordinates;
        const badPoints = elevatedPathLine.map((location, index) => {
            return {
                pathIndex: index,
                point: location,
            };
        });
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('totalBadElevatedPoints') + badPoints.length);
        this.checkAddElevation(elevatedPathLine, badPoints, 0);
    }

    checkAddElevation(elevatedPathLine, badPoints, startIndex) {
        // console.log('checkAddElevation(' + badPoints.length + ', ' + startIndex + ')');
        // debugger;
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
        // debugger;
        if (tempBadPoints.length > 0) {
            const xmlhttpElevation = new XMLHttpRequest();
            xmlhttpElevation.onreadystatechange = () => {
                if (xmlhttpElevation.readyState === 4 && xmlhttpElevation.status === 200) {
                    // console.log('response xmlhttpElevation');
                    const response = JSON.parse(xmlhttpElevation.responseText);
                    const elevatedPoints = response.results;
                    elevatedPoints.forEach((elPoint, pointIndex) => {
                        // threshold
                        const ta = TrailsDataModel.activeTrail.getElevationTreshold().ta;
                        const tr = TrailsDataModel.activeTrail.getElevationTreshold().tr;
                        // Fix index
                        const pointIndexToFix = parseInt(tempBadPoints[pointIndex].pathIndex, 10);
                        // 0 - lng
                        // 1 - lat
                        // 2 - original elevation
                        const originalElevation = parseInt(elevatedPathLine[pointIndexToFix][2], 10);
                        const googleElevation = (elPoint.ele || elPoint.elevation) ? parseInt(elPoint.elevation, 10) : 0;
                        const previousElevation = (pointIndexToFix > 0) ? parseInt(elevatedPathLine[pointIndexToFix - 1][2], 10) : parseInt(originalElevation, 10);
                        let calculatedElevation = parseInt(originalElevation, 10);
                        // Fix huge elevation faults
                        if (originalElevation <= 0 || Math.abs(originalElevation - googleElevation) > ta || Math.abs(originalElevation - previousElevation) > tr) {
                            calculatedElevation = googleElevation;
                        }
                        // Assign final elevation
                        elevatedPathLine[pointIndexToFix][2] = calculatedElevation;
                        // Progress notification
                        if (pointIndexToFix % 10 === 0) {
                            currentProgressPayload.loaded = parseInt(pointIndexToFix, 10);
                            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, currentProgressPayload);
                        }
                    });
                    // this.checkAddElevation(badPoints, loopCounter);
                    setTimeout(() => {
                        this.checkAddElevation(elevatedPathLine, badPoints, parseInt(passLoopCounter, 10));
                    }, 10);
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

        TrailsDataModel.activeTrail.enrichPathLine();
        // console.info('# 23');
        this.progressPayload.loaded = 86;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endPathlineEnriching'));

        TrailsDataModel.activeTrail.generateGeneralFacts();
        // console.info('# 23');
        this.progressPayload.loaded = 88;
        GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, this.progressPayload);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endGeneralFactsGenerating'));

        const trailFacts = TrailsDataModel.activeTrail.getGeneralFacts();
        const overrideThumbnails = TrailsDataModel.activeTrail.getTrailData().overrideThumbnails;

        if (trailFacts.imageURL === '' || overrideThumbnails) {
            const trailCenter = trailFacts.center;
            const simplifiedPolyline = TrailsDataModel.activeTrail.getSimplifiedFeatureCollectionPathNoElevation();
            const query = {
                polyline: polyline.fromGeoJSON(simplifiedPolyline),
                mapParams: trailCenter[0] + ',' + trailCenter[1] + ',' + TrailHelper.calculateZoomLevel(simplifiedPolyline),
                fileName: CommonHelper.getUUID() + '.png',
                deleteFile: (trailFacts.imageURL) ? trailFacts.imageURL.replace(appConfig.constants.server, '') : '',
                accessToken: MapModel.accessToken.token,
            };
            // console.log('getTrailThumbnail');
            // console.log(query);
            API.Trails.getTrailThumbnail({ query })
            .then((responseRaw) => {
                const response = JSON.parse(responseRaw.text);
                if (!response.success) {
                    GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('trailThumbnailGetFailed') + response.msg);
                    console.warn(Lang.msg('trailThumbnailGetFailed') + response.msg);
                    throw response.msg;
                } else if (response.success) {
                    TrailsDataModel.activeTrail.setDataByName('imageURL', null, null, appConfig.constants.server + response.url);
                    GLU.bus.emit(Enum.DataEvents.START_FIXING_WAYPOINTS);
                }
            })
            .catch((err) => {
                const msg = (err && err.response) ? err.response.text : err.toString();
                console.error('API.Trails.getTrailThumbnail()');
                console.error(err);
                // console.log('downloadTrail: ' + msg);
                GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('trailThumbnailGetFailed') + msg);
                throw msg;
            });
        } else {
            GLU.bus.emit(Enum.DataEvents.START_FIXING_WAYPOINTS);
        }
    }

    onFixWaypointsRequest() {
        if (CommonHelper.getPoints(TrailsDataModel.activeTrail.enrichedFeaturesCollection).length > 0) {
            const maps = {
                leftMap: MapModel.leftMap,
                // rightMap: MapModel.rightMap,
            };
            const waypoints = TrailsDataModel.activeTrail.generateWaypoints(maps);
            const overrideThumbnails = TrailsDataModel.activeTrail.getTrailData().overrideThumbnails;
            this.setWaypointsThumbnails(waypoints, 0, overrideThumbnails);
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

    setWaypointsThumbnails(waypoints, WPindex, overrideThumbnails) {
        // console.log('setWaypointsThumbnails(' + waypoints + ', ' + WPindex + ') - -  waypoints.length = ' + waypoints.length);
        if (WPindex < waypoints.length) {
            if (overrideThumbnails || !waypoints[WPindex].properties.pictureUrl || waypoints[WPindex].properties.pictureUrl.length === 0) {
                const query = {
                    geojson: JSON.stringify(waypoints[WPindex].properties.wpGeoJSON),
                    mapParams: waypoints[WPindex].geometry.coordinates[0] + ',' + waypoints[WPindex].geometry.coordinates[1] + ',17',
                    fileName: CommonHelper.getUUID() + '.png',
                    deleteFile: (waypoints[WPindex].properties.pictureUrl) ? waypoints[WPindex].properties.pictureUrl.replace(appConfig.constants.server, '') : '',
                    accessToken: MapModel.accessToken.token,
                };
                const getURL = 'https://api.mapbox.com/v4/mapbox.satellite/geojson(' + encodeURIComponent(query.geojson) + ')/' + query.mapParams + '/300x300.png?access_token=' + query.accessToken;
                API.Trails.getWPThumbnail({ query })
                .then((responseRaw) => {
                    // console.log(responseRaw);
                    if (responseRaw.text && CommonHelper.isJSON(responseRaw.text)) {
                        // console.info('responseRaw.text is OK using URL:');
                        // console.log(getURL);
                        const response = JSON.parse(responseRaw.text);
                        if (!response.success) {
                            GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('wpThumbnailGetFailed') + response.msg);
                            console.warn(Lang.msg('wpThumbnailGetFailed') + response.msg);
                            throw response.msg;
                        } else if (response.success) {
                            TrailsDataModel.activeTrail.setDataByName('waypoints', WPindex, 'pictureUrl', appConfig.constants.server + response.url);
                            GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, {
                                status: 'progress',
                                id: 'progressFixWPs',
                                loaded: WPindex,
                                total: waypoints.length,
                            });
                            setTimeout(() => {
                                this.setWaypointsThumbnails(waypoints, WPindex + 1, overrideThumbnails);
                            }, 100);
                        }
                    } else {
                        const erMsg = 'Faulted URL';
                        console.info('responseRaw.text is not JSON, faulted URL');
                        console.info(getURL);
                        GLU.bus.emit(MessageEvents.ERROR_MESSAGE, erMsg);
                        throw erMsg;
                    }
                })
                .catch((err) => {
                    const msg = (err && err.response) ? err.response.text : err.toString();
                    console.error('API.Trails.getWPThumbnail(): ' + err);
                    GLU.bus.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('wpThumbnailGetFailed') + msg);
                    setTimeout(() => {
                        this.setWaypointsThumbnails(waypoints, WPindex + 1, overrideThumbnails);
                    }, 100);
                });
            } else {
                // SKIP IF pictureUrl is not null
                this.setWaypointsThumbnails(waypoints, WPindex + 1);
            }
        } else {
            // console.log('progressFixWPs COMPLETED!');
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
                const filePath = Globals.IMAGE_UPLOAD_PATH + payload.fileName;
                TrailsDataModel.activeTrail.setDataByName(payload.name, payload.index, payload.prop, filePath);
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
