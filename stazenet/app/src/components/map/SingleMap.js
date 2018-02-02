/* global mapboxgl */
import React from 'react';
import BasePage from '../BasePage';
// import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
// import Lang from '/helpers/Lang';
import MapTypeControl from '/components/map/MapTypeControl';

class SingleMap extends BasePage {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED]: this.initMap,
            [Enum.MapEvents.DISPLAY_PATH_LAYERS_ON_MAP]: this.onPathLayersRetrieved,
            [Enum.MapEvents.CHANGE_MAP_STYLE]: this.onMapStyleChanged,
        });
        this.emit(Enum.MapEvents.RETRIEVE_MAP_INIT);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    componentDidUpdate() {
        // console.log('SingleMap componentDidUpdate()');
        if (this.state.map) {
            this.state.map.on('load', () => {
                window.leftmap = this.state.map;
                // Add satellite raster
                this.state.map.addSource('rasterTiles', {
                    type: 'raster',
                    url: 'mapbox://mapbox.satellite',
                    tileSize: 256,
                });
                // Add satellite layer
                this.state.map.addLayer({
                    id: 'satelliteLayer',
                    type: 'raster',
                    source: 'rasterTiles',
                    paint: {
                        'raster-saturation': 0.5,
                    },
                    layout: {
                        visibility: 'none',
                    },
                    minzoom: 0,
                    maxzoom: 22,
                }, 'contour-line-index');
                // Add mines source
                this.state.map.addSource('mineTiles', {
                    type: 'vector',
                    url: 'mapbox://' + this.state.setup.accessToken.sid,
                });
                // Add mines layer
                this.state.map.addLayer({
                    id: 'minesLayer',
                    type: 'fill',
                    source: 'mineTiles',
                    'source-layer': this.state.setup.accessToken.lid,
                    paint: {
                        'fill-color': '#ff0000',
                        'fill-opacity': 0.3,
                    },
                    minzoom: 0,
                    maxzoom: 22,
                }, 'contour-line-index');
                // Add controls
                // Navigation
                this.state.map.addControl(new mapboxgl.NavigationControl());
                // Map type
                const mapTypeControl = new MapTypeControl({});
                window.mapTypeControl = mapTypeControl;
                this.state.map.addControl(mapTypeControl);
                // Scale legend
                this.state.map.addControl(new mapboxgl.ScaleControl({
                    maxWidth: 150,
                    unit: 'metric',
                }));
                // Setting bounds
                this.state.map.fitBounds(this.state.setup.bounds);
                this.emit(Enum.MapEvents.SAVE_LEFT_MAP, this.state.map);
                this.emit(Enum.MapEvents.SAVE_PREVIEW_MAP, this.state.map);
                this.emit(Enum.MapEvents.PRELOAD_MAP_ICONS, this.state.map);
            });
            this.wpListener('mousemove');
            this.wpListener('click');
        }
    }


    onPathLayersRetrieved(layers) {
        layers.forEach((layer) => {
            this.state.map.setLayoutProperty(layer.id, 'visibility', 'visible');
        });
    }

    onMapStyleChanged(styleSetup) {
        this[styleSetup.side].setStyle(styleSetup.style);
    }

    render() {
        return (<div id="mapa"><div id="leftmap" className="map"></div></div>);
    }

    initMap(initSetup) {
        if (initSetup) {
            mapboxgl.accessToken = initSetup.accessToken.token;
            const newMap = new mapboxgl.Map({
                container: 'leftmap',
                style: initSetup.primaryStyle.value,
                zoom: initSetup.zoom.base,
                minZoom: initSetup.zoom.min,
                maxZoom: initSetup.zoom.max,
                center: initSetup.center,
                maxBounds: initSetup.maxBounds,
            });
            this.setState({
                map: newMap,
                initialized: true,
                setup: initSetup,
            });
        }
    }

    wpListener(eventName) {
        this.state.map.on(eventName, e => {
            if (this.state.map.getLayer('waypoints')) {
                let payload;
                const bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
                const features = this.state.map.queryRenderedFeatures(bbox, { layers: ['waypoints'] });
                if (features.length > 0) {
                    payload = {
                        feature: features[0].properties,
                        position: e.point,
                    };
                    if (eventName === 'mousemove') {
                        payload.isVisible = true;
                    } else {
                        payload.isPinned = true;
                    }
                    this.emit(Enum.MapEvents.CONTROL_WP_POPUP, payload);
                } else {
                    payload = {
                        feature: null,
                        position: null,
                        isVisible: false,
                        isPinned: false,
                    };
                    this.emit(Enum.MapEvents.CONTROL_WP_POPUP, payload);
                }
            }
        });
    }
}

export default SingleMap;
