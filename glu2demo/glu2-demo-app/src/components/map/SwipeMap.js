/* global mapboxgl */
import React from 'react';
import BasePage from '../BasePage';
// import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
import Lang from '/helpers/Lang';

class SwipeMap extends BasePage {
    constructor(props) {
        super(props);
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED]: this.initMap,
            [Enum.MapEvents.DISPLAY_PATH_LAYERS_ON_MAP]: this.onPathLayersRetrieved,
            [Enum.MapEvents.CHANGE_MAP_STYLE]: this.onMapStyleChanged,
        });
    }

    componentDidMount() {
        this.emit(Enum.MapEvents.RETRIEVE_MAP_INIT);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    componentDidUpdate() {
        // console.info('SwipeMap DidUpdate');
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
        this.rightmap = new mapboxgl.Map({
            container: 'rightmap',
            style: this.state.setup.secondaryStyle.value,
            zoom: this.state.setup.zoom.base,
            minZoom: this.state.setup.zoom.min,
            maxZoom: this.state.setup.zoom.max,
            center: this.state.setup.center,
            maxBounds: this.state.setup.maxBounds,
        });
        this.combined = new mapboxgl.Compare(this.leftmap, this.rightmap);

        this.leftmap.on('load', () => {
            window.leftmap = this.leftmap;
            this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('firstMapLoaded'));
            this.emit(Enum.MapEvents.SAVE_LEFT_MAP, this.leftmap);
        });

        this.rightmap.on('load', () => {
            window.rightmap = this.rightmap;
            this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('secondMapLoaded'));
            this.emit(Enum.MapEvents.SAVE_RIGHT_MAP, this.rightmap);
        });
    }

    onPathLayersRetrieved(layers) {
        layers.forEach((layer) => {
            console.info('setLayoutProperty(' + layer.id + ', visibility, visible)');
            this.leftmap.setLayoutProperty(layer.id, 'visibility', 'visible');
            this.rightmap.setLayoutProperty(layer.id, 'visibility', 'visible');
        });
        console.log(this.leftmap.style._layers);
        console.log(this.rightmap.style._layers);
    }

    onMapStyleChanged(styleSetup) {
        this[styleSetup.side].setStyle(styleSetup.style);
    }

    render() {
        return (<div id="mapa">
            <div id="leftmap" className="map"></div>
            <div id="rightmap" className="map"></div>
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

export default SwipeMap;
