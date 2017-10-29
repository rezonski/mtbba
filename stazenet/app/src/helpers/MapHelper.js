/* global turf */
/* global MapboxDraw */
import GLU from '/../../glu2.js/src/index';
import Enum from '/enums/Enum';
import MessageEvents from '/enums/MessageEvents';
import TrailHelper from '/helpers/TrailHelper';
import WaypointHelper from '/helpers/WaypointHelper';
import CommonHelper from '/helpers/CommonHelper';
import MapEditControl from '/components/map/MapEditControl';
import SurfaceControl from '/components/map/SurfaceControl';
import SavePathControl from '/components/map/SavePathControl';
import Lang from '/helpers/Lang';

class MapHelper {
    constructor() {
    }

    pointOnCircle(coordinates) {
        return {
            type: 'Point',
            coordinates,
        };
    }

    animateMarker(leftMap, rightMap, coordinates) {
        let data = this.pointOnCircle(coordinates);
        leftMap.getSource('pointbefore').setData(data);
        // rightMap.getSource('pointafter').setData(data);
    }

    setFocus(leftMap, rightMap, coordinates) {
        let data = this.pointOnCircle(coordinates);
        leftMap.getSource('focuswpbefore').setData(data);
        // rightMap.getSource('focuswpafter').setData(data);
    }

    previewTrailOnMap(initCollection, previewMap) {
        let intialisedCollection = JSON.parse(JSON.stringify(initCollection));
        const lineStrings = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(initCollection)));
        const firstPoint = lineStrings[0].geometry.coordinates;
        let Draw;
        let editTrail;
        let editSurface;
        let savePathControl;

        // Add previewCollection source if not exists
        if (!previewMap.getSource('previewCollection')) {
            previewMap.addSource('previewCollection', {
                type: 'geojson',
                data: intialisedCollection,
            });
        } else {
            console.info('Source&layer "previewCollection" already exists');
            previewMap.getSource('previewCollection').setData(intialisedCollection);
        }

        // Add previewCollection source if not exists
        if (!previewMap.getSource('tempCollection')) {
            previewMap.addSource('tempCollection', {
                type: 'geojson',
                data: turf.featureCollection([]),
            });
        } else {
            console.info('Source&layer "tempCollection" already exists');
            previewMap.getSource('tempCollection').setData(intialisedCollection);
        }

        // Add preview layer
        if (!previewMap.getLayer('previewCollection')) {
            console.info('Add layer previewCollection');
            const lineLayerPreview = {};
            lineLayerPreview.id = 'previewCollection';
            lineLayerPreview.type = 'line';
            lineLayerPreview.source = 'previewCollection';
            lineLayerPreview.layout = {};
            lineLayerPreview.layout['line-join'] = 'round';
            lineLayerPreview.layout['line-cap'] = 'round';
            lineLayerPreview.paint = {};
            lineLayerPreview.paint['line-color'] = 'rgba(255,0,0,0.1)';
            lineLayerPreview.paint['line-width'] = 10;
            previewMap.addLayer(lineLayerPreview);
        }

        // Add temp layer
        if (!previewMap.getLayer('tempCollection')) {
            console.info('Add layer tempCollection');
            const tempPointLayerPreview = {};
            tempPointLayerPreview.id = 'tempCollection';
            tempPointLayerPreview.type = 'circle';
            tempPointLayerPreview.source = 'tempCollection';
            tempPointLayerPreview.paint = {};
            tempPointLayerPreview.paint['circle-color'] = '#0000FF';
            tempPointLayerPreview.paint['circle-opacity'] = 0.4;
            tempPointLayerPreview.paint['circle-radius'] = 6;
            tempPointLayerPreview.paint['circle-stroke-width'] = 4;
            tempPointLayerPreview.paint['circle-stroke-color'] = '#FFFFFF';
            previewMap.addLayer(tempPointLayerPreview);
        }


        // Add Draw control if not exists
        if (!window.Draw) {
            Draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    line_string: true,
                    point: true,
                    trash: true,
                },
            });
            window.Draw = Draw;
            previewMap.addControl(Draw);
        } else {
            Draw = window.Draw;
        }
        Draw.set(intialisedCollection);

        // Add edit trail control if not exists
        if (!window.editTrail) {
            editTrail = new MapEditControl({});
            window.editTrail = editTrail;
        } else {
            editTrail = window.editTrail;
        }
        previewMap.addControl(editTrail);

        // Add edit surface control if not exists
        if (!window.editSurface) {
            editSurface = new SurfaceControl({});
            window.editSurface = editSurface;
        } else {
            editSurface = window.editSurface;
        }
        previewMap.addControl(editSurface);

        // Add save trail control if not exists
        if (!window.savePathControl) {
            savePathControl = new SavePathControl({});
            window.savePathControl = savePathControl;
        } else {
            savePathControl = window.savePathControl;
        }
        previewMap.addControl(savePathControl);

        if (previewMap.getSource('previewCollection') && previewMap.getSource('previewCollection')) {
            previewMap.flyTo({ center: [firstPoint[0][0], firstPoint[0][1]], zoom: 15 });
            previewMap.on('lineSlice', p => {
                const waypointsOnly = CommonHelper.getPoints(JSON.parse(JSON.stringify(intialisedCollection)));
                const linesOnly = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(intialisedCollection)));
                // console.log('position ' + JSON.stringify(p.position) + ' picked');
                const fromPoint = turf.point(firstPoint[0]);
                const toPoint = turf.point([p.position.lng, p.position.lat]);
                // console.log('lineStrings length : ' + linesOnly[0].geometry.coordinates.length);
                const sliced = turf.lineSlice(fromPoint, toPoint, linesOnly[0]);
                sliced.properties = JSON.parse(JSON.stringify(linesOnly[0].properties));
                // console.log('sliced length : ' + sliced.geometry.coordinates.length);
                // console.log(sliced);
                // console.log('setting new preview data 4 path line');
                waypointsOnly.push(sliced);
                intialisedCollection = turf.featureCollection(waypointsOnly);
                previewMap.getSource('previewCollection').setData(intialisedCollection);
                Draw.set(intialisedCollection);
            });
            previewMap.on('saveEditedPath', () => {
                const editedCollection = window.Draw.getAll();
                GLU.bus.emit(Enum.DataEvents.SAVE_MANUAL_EDITED_FILE, editedCollection);
            });
            previewMap.on('displayTempPoint', p => {
                const tempPoint = turf.point([p.position.lng, p.position.lat]);
                const tempCollection = turf.featureCollection([tempPoint]);
                previewMap.getSource('tempCollection').setData(tempCollection);
            });
            previewMap.on('addNewWaypoint', p => {
                const newPoint = turf.point([p.position.lng, p.position.lat], { name: p.name, pictogram: p.pictogram });
                const currentCollection = window.Draw.getAll();
                currentCollection.features.push(newPoint);
                previewMap.getSource('previewCollection').setData(currentCollection);
                Draw.set(currentCollection);
                previewMap.fire('saveEditedPath');
            });

            previewMap.on('addTerrainSwitch', p => {
                const newPoint = turf.point([p.position.lng, p.position.lat], { type: 'terrainSwitch', surfaceType: p.surface });
                const currentCollection = window.Draw.getAll();
                currentCollection.features.push(newPoint);
                previewMap.getSource('previewCollection').setData(currentCollection);
                Draw.set(currentCollection);
                previewMap.fire('saveEditedPath');
            });
        }
    }

    hidePreviewTrailOnMap(previewMap) {
        // remove previewCollection
        if (previewMap.getSource('previewCollection')) {
            previewMap.removeLayer('previewCollection');
            previewMap.removeSource('previewCollection');
        } else {
            console.warn('No source&layer "previewCollection" found');
        }

        // remove tempCollection
        if (previewMap.getSource('tempCollection')) {
            previewMap.removeLayer('tempCollection');
            previewMap.removeSource('tempCollection');
        } else {
            console.warn('No source&layer "tempCollection" found');
        }

        // remove controls
        if (window.editTrail) {
            previewMap.removeControl(window.editTrail);
            delete window.editTrail;
        }
        if (window.editSurface) {
            previewMap.removeControl(window.editSurface);
            delete window.editSurface;
        }
        if (window.savePathControl) {
            previewMap.removeControl(window.savePathControl);
            delete window.savePathControl;
        }
        if (window.Draw) {
            previewMap.removeControl(window.Draw);
            delete window.Draw;
        }
    }

    // reBuildPathLayers(currentLayers, leftMap, rightMap, featuresCollection) {
    reBuildPathLayers(currentLayers, leftMap, featuresCollection) {
        let startOdometer = 0;
        let endOdometer = 99999;
        let sastavPathsArray = [];
        let layersArray = [];
        const generalFact = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].properties;
        const surfaceCollection = generalFact.surfaceCollection;
        const pathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        const wpoints = CommonHelper.getPoints(JSON.parse(JSON.stringify(featuresCollection)));
        // debugger;
        let sastavPathsCollection = {
            type: 'FeatureCollection',
            features: [],
        };

        let basePath = {
            type: 'Feature',
                properties: {
                basePathName: 'basePath',
            },
            geometry: {
                type: 'LineString',
                coordinates: [],
            },
        };

        // Erase existing layers and source
        currentLayers.forEach((layer) => {
            leftMap.removeLayer(layer.id);
            if (leftMap.getSource('trailSource')) {
                leftMap.removeSource('trailSource');
            }
        });

        for (let i = 0; i < (pathLine.length - 1); i++) {
            basePath.geometry.coordinates.push([pathLine[i].lon, pathLine[i].lat]);
        }

        // Add base white line under path
        const baseLayerStyle = {};
        baseLayerStyle.id = 'baseLayerPath';
        baseLayerStyle.type = 'line';
        baseLayerStyle.source = 'trailSource';
        baseLayerStyle.layout = {};
        baseLayerStyle.layout['line-join'] = 'round';
        baseLayerStyle.layout['line-cap'] = 'round';
        baseLayerStyle.layout.visibility = 'none';
        baseLayerStyle.paint = {};
        baseLayerStyle.paint['line-color'] = 'rgba(255,255,255,1)';
        baseLayerStyle.paint['line-width'] = 8;
        baseLayerStyle.filter = ['==', 'name', 'basePath'];
        layersArray.push(baseLayerStyle);
        sastavPathsArray.push(JSON.parse(JSON.stringify(basePath)));

        // Create segments
        // debugger;
        surfaceCollection.forEach((surfaceElement, surfaceIndex) => {
            if (surfaceIndex === 0 && surfaceIndex !== (surfaceCollection.length - 1)) {
                startOdometer = 0;
                endOdometer = surfaceCollection[surfaceIndex + 1][0];
            } else if (surfaceIndex === (surfaceCollection.length - 1)) {
                startOdometer = surfaceElement[0];
                endOdometer = 99999;
            } else {
                startOdometer = surfaceElement[0];
                endOdometer = surfaceCollection[surfaceIndex + 1][0];
            }

            let totalOdometer = 0;

            let currentSection = {
              type: 'Feature',
              properties: {
                surfaceSection: surfaceElement[1] + '-' + surfaceIndex,
              },
              geometry: {
                type: 'LineString',
                coordinates: [],
              },
            };

            for (let i = 0; i < (pathLine.length - 1); i++) {
                totalOdometer += pathLine[i + 1].prevDist;
                if (startOdometer <= totalOdometer && totalOdometer <= endOdometer) {
                    currentSection.geometry.coordinates.push([pathLine[i].lon, pathLine[i].lat]);
                }
            }

            // Add segment layer
            const layerStyle = {};
            layerStyle.id = surfaceElement[1] + '-' + surfaceIndex;
            layerStyle.type = 'line';
            layerStyle.source = 'trailSource';
            layerStyle.layout = {};
            layerStyle.layout['line-join'] = 'round';
            layerStyle.layout['line-cap'] = 'round';
            layerStyle.layout.visibility = 'none';
            layerStyle.paint = {};
            layerStyle.paint['line-color'] = TrailHelper.getSurfaceTypeByName(surfaceElement[1]).colorRGBA;
            layerStyle.paint['line-width'] = 4;
            // layerStyle.paint['line-dasharray'] = [4, 10];
            layerStyle.filter = ['==', 'surfaceSection', surfaceElement[1] + '-' + surfaceIndex];
            layersArray.push(layerStyle);
            sastavPathsArray.push(JSON.parse(JSON.stringify(currentSection)));
        });
        // debugger;
        // Add waypoints layer
        const pointLayer = {};
        pointLayer.id = 'waypoints';
        pointLayer.type = 'symbol';
        pointLayer.source = 'trailSource';
        pointLayer.layout = {};
        pointLayer.layout['text-field'] = '{name}';
        pointLayer.layout['text-anchor'] = 'top';
        pointLayer.layout['text-offset'] = [0, 1];
        pointLayer.layout['icon-image'] = '{iconMarker}';
        pointLayer.paint = {};
        pointLayer.paint['text-halo-color'] = '#FFFFFF';
        pointLayer.paint['text-halo-width'] = 1;
        pointLayer.paint['text-halo-blur'] = 1;
        pointLayer.filter = ['!has', 'surfaceSection'];
        layersArray.push(pointLayer);

        // Add waypoints to feature collection
        wpoints.forEach(point => {
            const newPoint = JSON.parse(JSON.stringify(point));
            newPoint.properties.iconMarker = WaypointHelper.getIcon4Symbol(point.properties.symbol);
            sastavPathsArray.push(newPoint);
        });

        // reference all features to collection
        sastavPathsCollection.features = sastavPathsArray;

        leftMap.addSource('trailSource', {
            type: 'geojson',
            data: sastavPathsCollection,
        });

        layersArray.forEach((layer) => {
            if (layer.type === 'line') {
                leftMap.addLayer(layer, 'housenum-label');
            } else {
                leftMap.addLayer(layer);
            }
        });

        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('mapPathLayersRebuilt'));

        leftMap.fitBounds(generalFact.bounds);

        return layersArray;
    }
}
export default new MapHelper();
