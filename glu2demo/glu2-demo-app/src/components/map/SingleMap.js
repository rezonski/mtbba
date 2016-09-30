/* global mapboxgl */
import React from 'react';
import BasePage from '../BasePage';
// import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';


class SingleMap extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            setup: {},
        };
        this.bindGluBusEvents({
            INITIAL_MAP_SETUP_RETRIEVED: this.onInitMap,
        });
    }

    componentDidMount() {
        this.emit('RETRIEVE_MAP_INIT');
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    componentDidUpdate() {
        mapboxgl.accessToken = this.state.setup.accessToken;
        this.mapprim = new mapboxgl.Map({
            container: 'mapprim',
            style: this.state.setup.primaryStyle,
            zoom: this.state.setup.zoom.base,
            minZoom: this.state.setup.zoom.min,
            maxZoom: this.state.setup.zoom.max,
            center: this.state.setup.center,
            maxBounds: this.state.setup.maxBounds,
        });
    }

    onInitMap(initSetup) {
        if (initSetup) {
            this.setState({
                initialized: true,
                setup: initSetup,
            });
        }
    }

    render() {
        if (!this.state) {
            return (<div id="mapa" />);
        }
        return (<div id="mapa">
            <div id="mapprim" className="map"></div>
        </div>);
    }
}

export default SingleMap;
