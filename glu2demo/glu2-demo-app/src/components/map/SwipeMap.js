/* global mapboxgl */
import React from 'react';
import BasePage from '../BasePage';
// import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MessageEvents from '../../enums/MessageEvents';


class SwipeMap extends BasePage {
    constructor(props) {
        super(props);
        this.bindGluBusEvents({
            INITIAL_MAP_SETUP_RETRIEVED: this.initMap,
        });
    }

    componentDidMount() {
        console.info('SwipeMap DidMount');
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    componentDidUpdate() {
        console.info('SwipeMap DidUpdate');
        mapboxgl.accessToken = this.state.setup.accessToken;
        this.mapprim = new mapboxgl.Map({
            container: 'mapprim',
            style: this.state.setup.primaryStyle.value,
            zoom: this.state.setup.zoom.base,
            minZoom: this.state.setup.zoom.min,
            maxZoom: this.state.setup.zoom.max,
            center: this.state.setup.center,
            maxBounds: this.state.setup.maxBounds,
        });
        this.mapsec = new mapboxgl.Map({
            container: 'mapsec',
            style: this.state.setup.secondaryStyle.value,
            zoom: this.state.setup.zoom.base,
            minZoom: this.state.setup.zoom.min,
            maxZoom: this.state.setup.zoom.max,
            center: this.state.setup.center,
            maxBounds: this.state.setup.maxBounds,
        });
        this.combined = new mapboxgl.Compare(this.mapprim, this.mapsec);

        this.mapprim.on('load', () => {
            this.emit(MessageEvents.ERROR_MESSAGE, 'Loaded first map');
        });

        this.mapsec.on('load', () => {
            this.emit(MessageEvents.ERROR_MESSAGE, 'Loaded second map');
        });
    }

    render() {
        return (<div id="mapa">
            <div id="mapprim" className="map"></div>
            <div id="mapsec" className="map"></div>
        </div>);
    }
    initMap(initSetup) {
        console.log(initSetup);
        if (initSetup) {
            this.setState({
                initialized: true,
                setup: initSetup,
            });
        }
    }
}

export default SwipeMap;
