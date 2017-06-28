/* global mapboxgl */
import React from 'react';
import BasePage from '../BasePage';
// import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
import Lang from '/helpers/Lang';
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
            [Enum.MapEvents.MAP_RESET_2_NORTH]: this.onOrientate2North,
        });
        this.emit(Enum.MapEvents.RETRIEVE_MAP_INIT);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    componentDidUpdate() {
        // console.info('SingleMap DidUpdate');
        mapboxgl.accessToken = this.state.setup.accessToken;
        this.leftmap = new mapboxgl.Map({
            container: 'leftmap',
            style: this.state.setup.primaryStyle.value,
            zoom: this.state.setup.zoom.base,
            minZoom: this.state.setup.zoom.min,
            maxZoom: this.state.setup.zoom.max,
            center: this.state.setup.center,
            maxBounds: this.state.setup.maxBounds,
        });
        this.leftmap.on('load', () => {
            window.leftmap = this.leftmap;
            this.leftmap.addControl(new mapboxgl.NavigationControl());
            const mapTypeControl = new MapTypeControl({});
            window.mapTypeControl = mapTypeControl;
            this.leftmap.addControl(mapTypeControl);
            this.leftmap.fitBounds(this.state.setup.bounds);
            this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('firstMapLoaded'));
            this.emit(Enum.MapEvents.SAVE_LEFT_MAP, this.leftmap);
            this.emit(Enum.MapEvents.SAVE_PREVIEW_MAP, this.leftmap);
        });
    }

    onOrientate2North() {
        this.leftmap.setBearing(0);
        // this.rightmap.setBearing(0);
    }

    onPathLayersRetrieved(layers) {
        layers.forEach((layer) => {
            // console.info('setLayoutProperty(' + layer.id + ', visibility, visible)');
            this.leftmap.setLayoutProperty(layer.id, 'visibility', 'visible');
            // this.rightmap.setLayoutProperty(layer.id, 'visibility', 'visible');
        });
    }

    onMapStyleChanged(styleSetup) {
        this[styleSetup.side].setStyle(styleSetup.style);
    }

    render() {
        return (<div id="mapa">
            <div id="leftmap" className="map"></div>
        </div>);
    }

    initMap(initSetup) {
        // console.log(initSetup);
        if (initSetup) {
            this.setState({
                initialized: true,
                setup: initSetup,
            });
        }
    }
}

export default SingleMap;
