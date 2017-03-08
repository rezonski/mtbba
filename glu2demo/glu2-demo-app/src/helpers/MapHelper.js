/* global turf */
/* global MapboxDraw */
import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';
import TrailHelper from '/helpers/TrailHelper';
import CommonHelper from '/helpers/CommonHelper';
import ReturnPathSplitter from '/helpers/ReturnPathSplitter';
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
        rightMap.getSource('pointafter').setData(data);
    }

    setFocus(leftMap, rightMap, coordinates) {
        let data = this.pointOnCircle(coordinates);
        leftMap.getSource('focuswpbefore').setData(data);
        rightMap.getSource('focuswpafter').setData(data);
    }

    previewTrailOnMap(pointsCollection, initCollection, previewMap) {
        if (!previewMap.getSource('previewCollection')) {
            let intialisedCollection = JSON.parse(JSON.stringify(initCollection));
            const lineStrings = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(initCollection)));
            const firstPoint = lineStrings[0].geometry.coordinates;
            previewMap.addSource('previewCollection', {
                type: 'geojson',
                data: intialisedCollection,
            });
            const lineLayerPreview = {};
            lineLayerPreview.id = 'previewCollection';
            lineLayerPreview.type = 'line';
            lineLayerPreview.source = 'previewCollection';
            lineLayerPreview.layout = {};
            lineLayerPreview.layout['line-join'] = 'round';
            lineLayerPreview.layout['line-cap'] = 'round';
            lineLayerPreview.paint = {};
            lineLayerPreview.paint['line-color'] = 'rgba(255,0,0,0.3)';
            lineLayerPreview.paint['line-width'] = 3;
            lineLayerPreview.paint['line-dasharray'] = [1, 1];
            previewMap.addLayer(lineLayerPreview);
            previewMap.flyTo({ center: [firstPoint[0][0], firstPoint[0][1]], zoom: 15 });
            const Draw = new MapboxDraw({});
            window.Draw = Draw;
            previewMap.addControl(Draw);
            const returnPathSplitter = new ReturnPathSplitter({});
            window.returnPathSplitter = returnPathSplitter;
            previewMap.addControl(returnPathSplitter);
            previewMap.on('lineSlice', p => {
                const waypointsOnly = CommonHelper.getPoints(JSON.parse(JSON.stringify(intialisedCollection)));
                const linesOnly = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(intialisedCollection)));
                console.log('position ' + JSON.stringify(p.position) + ' picked');
                const fromPoint = turf.point(firstPoint[0]);
                const toPoint = turf.point([p.position.lng, p.position.lat]);
                console.log('lineStrings length : ' + linesOnly[0].geometry.coordinates.length);
                const sliced = turf.lineSlice(fromPoint, toPoint, linesOnly[0]);
                console.log('sliced length : ' + sliced.geometry.coordinates.length);
                console.log(sliced);
                console.log('setting new preview data 4 path line');
                waypointsOnly.push(sliced);
                intialisedCollection = turf.featurecollection(waypointsOnly);
                previewMap.getSource('previewCollection').setData(intialisedCollection);
                console.log('new preview data set');
            });
            // const collectionId = Draw.set(initCollection);
            // console.log(collectionId);
        } else {
            console.info('Source&layer "previewCollection" already exists');
        }
    }

    hidePreviewTrailOnMap(previewMap) {
        if (previewMap.getSource('previewCollection')) {
            previewMap.removeLayer('previewCollection');
            previewMap.removeSource('previewCollection');
            previewMap.removeControl(window.Draw);
        } else {
            console.info('No source&layer "previewCollection" found');
        }
    }

    reBuildPathLayers(currentLayers, leftMap, rightMap, featuresCollection) {
        let startOdometer = 0;
        let endOdometer = 99999;
        let sastavPathsArray = [];
        let layersArray = [];
        const generalFact = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].properties;
        const surfaceCollection = generalFact.surfaceCollection;
        const pathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;

        let sastavPathsCollection = {
            type: 'FeatureCollection',
            features: [],
        };

        let basePath = {
            type: 'Feature',
                properties: {
                name: 'basePath',
            },
            geometry: {
                type: 'LineString',
                coordinates: [],
            },
        };

        currentLayers.forEach((layer) => {
            leftMap.removeLayer(layer.id);
            rightMap.removeLayer(layer.id);
            if (leftMap.getSource('segments')) {
                leftMap.removeSource('segments');
            }
            if (rightMap.getSource('segments')) {
                rightMap.removeSource('segments');
            }
        });

        for (let i = 0; i < (pathLine.length - 1); i++) {
            basePath.geometry.coordinates.push([pathLine[i].lon, pathLine[i].lat]);
        }

        const baseLayerStyle = {};
        baseLayerStyle.id = 'baseLayerPath';
        baseLayerStyle.type = 'line';
        baseLayerStyle.source = 'segments';
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
                name: surfaceElement[1] + '-' + surfaceIndex,
              },
              geometry: {
                type: 'LineString',
                coordinates: [],
              },
            };

            for (let i = 0; i < (pathLine.length - 1); i++) {
                totalOdometer += pathLine[i + 1].prev_dist;
                if (startOdometer <= totalOdometer && totalOdometer <= endOdometer) {
                    currentSection.geometry.coordinates.push([pathLine[i].lon, pathLine[i].lat]);
                }
            }

            const layerStyle = {};
            layerStyle.id = surfaceElement[1] + '-' + surfaceIndex;
            layerStyle.type = 'line';
            layerStyle.source = 'segments';
            layerStyle.layout = {};
            layerStyle.layout['line-join'] = 'round';
            layerStyle.layout['line-cap'] = 'round';
            layerStyle.layout.visibility = 'none';
            layerStyle.paint = {};
            layerStyle.paint['line-color'] = TrailHelper.getSurfaceTypeByName(surfaceElement[1]).colorRGBA;
            layerStyle.paint['line-width'] = 4;
            // layerStyle.paint['line-dasharray'] = [4, 10];
            layerStyle.filter = ['==', 'name', surfaceElement[1] + '-' + surfaceIndex];
            layersArray.push(layerStyle);
            sastavPathsArray.push(JSON.parse(JSON.stringify(currentSection)));
        });

        sastavPathsCollection.features = sastavPathsArray;

        leftMap.addSource('segments', {
            type: 'geojson',
            data: sastavPathsCollection,
        });

        rightMap.addSource('segments', {
            type: 'geojson',
            data: sastavPathsCollection,
        });

        layersArray.forEach((layer) => {
            // leftMap.addLayer(layer, 'animpoint');
            // rightMap.addLayer(layer, 'animpoint');
            leftMap.addLayer(layer);
            rightMap.addLayer(layer);
        });

        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('mapPathLayersRebuilt'));

        leftMap.fitBounds(generalFact.bounds);

        return layersArray;
    }
}
export default new MapHelper();
