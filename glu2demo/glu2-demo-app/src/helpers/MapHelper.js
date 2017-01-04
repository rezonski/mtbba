/* global turf */
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

    previewTrailOnMap(featuresCollection, previewMap) {
        const inputPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        if (previewMap.getSource('previewPath')) {
            previewMap.removeLayer('previewPath1');
            previewMap.removeLayer('previewPath2');
            previewMap.removeLayer('previewPath3');
            previewMap.removeSource('previewPath');
        }
        previewMap.addSource('previewPath', {
            type: 'geojson',
            data: featuresCollection,
        });
        const previewPathLine1 = {};
        previewPathLine1.id = 'previewPath1';
        previewPathLine1.type = 'line';
        previewPathLine1.source = 'previewPath';
        previewPathLine1.layout = {};
        previewPathLine1.layout['line-join'] = 'round';
        previewPathLine1.layout['line-cap'] = 'round';
        previewPathLine1.paint = {};
        previewPathLine1.paint['line-color'] = 'rgba(0,0,0,0.8)';
        previewPathLine1.paint['line-width'] = 8;
        previewMap.addLayer(previewPathLine1);

        const previewPathLine2 = JSON.parse(JSON.stringify(previewPathLine1));
        previewPathLine2.id = 'previewPath2';
        previewPathLine2.paint['line-color'] = 'rgba(255,255,255,1)';
        previewPathLine2.paint['line-width'] = 6;
        previewMap.addLayer(previewPathLine2);

        const previewPathLine3 = JSON.parse(JSON.stringify(previewPathLine1));
        previewPathLine3.id = 'previewPath3';
        previewPathLine3.paint['line-color'] = 'rgba(255,0,0,1)';
        previewPathLine3.paint['line-width'] = 2;
        previewMap.addLayer(previewPathLine3);

        previewMap.flyTo({ center: [inputPathLine[0][0], inputPathLine[0][1]], zoom: 15 });
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
