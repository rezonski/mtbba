/* global turf */
/* global MapboxDraw */
import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';
import TrailHelper from '/helpers/TrailHelper';
import CommonHelper from '/helpers/CommonHelper';
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
        const lineStrings = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(initCollection)));
        const firstPoint = lineStrings[0].geometry.coordinates;
        if (previewMap.getSource('previewCollection')) {
            previewMap.removeLayer('previewCollection');
            previewMap.removeSource('previewCollection');
        }
        previewMap.addSource('previewCollection', {
            type: 'geojson',
            data: initCollection,
        });
        const lineLayerPreview = {};
        lineLayerPreview.id = 'previewCollection';
        lineLayerPreview.type = 'line';
        lineLayerPreview.source = 'previewCollection';
        lineLayerPreview.layout = {};
        lineLayerPreview.layout['line-join'] = 'round';
        lineLayerPreview.layout['line-cap'] = 'round';
        lineLayerPreview.paint = {};
        lineLayerPreview.paint['line-color'] = 'rgba(255,0,0,0.6)';
        lineLayerPreview.paint['line-width'] = 6;
        previewMap.addLayer(lineLayerPreview);
        previewMap.flyTo({ center: [firstPoint[0][0], firstPoint[0][1]], zoom: 15 });
        const Draw = new MapboxDraw({});
        previewMap.addControl(Draw);
        const collectionId = Draw.set(initCollection);
        console.log(collectionId);
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
