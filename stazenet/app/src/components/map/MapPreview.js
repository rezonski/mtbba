/* global mapboxgl */
/* global MapboxDraw */
/* global turf */
import React from 'react';
import BasePage from '../BasePage';
// import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
import Lang from '/helpers/Lang';
// import CommonHelper from '/helpers/CommonHelper';

class MapPreview extends BasePage {
    constructor(props) {
        super(props);
        // this.keyListener = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED]: this.initMap,
        });
        this.emit(Enum.MapEvents.RETRIEVE_MAP_INIT);
        // window.addEventListener('keydown', this.keyListener, false);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
        // window.removeEventListener('keydown', this.keyListener, false);
    }

    componentDidUpdate() {
        mapboxgl.accessToken = this.state.setup.accessToken;
        this.mappreview = new mapboxgl.Map({
            container: 'mappreview',
            style: this.state.setup.primaryStyle.value,
            zoom: this.state.setup.zoom.base,
            minZoom: this.state.setup.zoom.min,
            maxZoom: this.state.setup.zoom.max,
            center: this.state.setup.center,
            maxBounds: this.state.setup.maxBounds,
        });
        window.mappreview = this.mappreview;
        this.mappreview.on('load', () => {
            this.emit(Enum.MapEvents.SAVE_PREVIEW_MAP, this.mappreview);
            this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('previewMapLoaded'));
        });
    }

    render() {
        if (!this.state) {
            return (<div id="mapa" />);
        }
        return (<div id="mapa" className="preview">
            <div id="mappreview" className="map preview"></div>
        </div>);
    }

    initMap(initSetup) {
        if (initSetup) {
            this.setState({
                initialized: true,
                setup: initSetup,
            });
        }
    }
}

export default MapPreview;
