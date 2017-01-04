/* global mapboxgl */
import React from 'react';
import BasePage from '../BasePage';
// import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
import Lang from '/helpers/Lang';

class MapPreview extends BasePage {
    constructor(props) {
        super(props);
        this.firstPoint = [];
        this.keyListener = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED]: this.initMap,
            [Enum.MapEvents.DISPLAY_PATH_LAYERS_ON_MAP]: this.onPathLayersRetrieved,
            [Enum.MapEvents.CHANGE_MAP_STYLE]: this.onMapStyleChanged,
            [Enum.MapEvents.MAP_RESET_2_NORTH]: this.onOrientate2North,
        });
        this.emit(Enum.MapEvents.RETRIEVE_MAP_INIT);
        window.addEventListener('keydown', this.keyListener, false);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
        window.removeEventListener('keydown', this.keyListener, false);
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
        this.mappreview.on('load', () => {
            window.mappreview = this.mappreview;
            this.emit(Enum.MapEvents.SAVE_PREVIEW_MAP, this.mappreview);
            this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('previewMapLoaded'));
        });
        this.mappreview.on('click', (e) => {
            if (this.firstPoint.length === 0) {
                this.firstPoint = [e.lngLat.lng, e.lngLat.lat];
                this.emit(MessageEvents.INFO_MESSAGE, Lang.msg('clickSecondCoordinate'));
            } else if (this.firstPoint.length > 0) {
                const offset = [(e.lngLat.lng - this.firstPoint[0]), (e.lngLat.lat - this.firstPoint[1])];
                this.firstPoint = [];
                this.emit(MessageEvents.INFO_MESSAGE, 'Offset: ' + JSON.stringify(offset));
                this.emit(MessageEvents.INFO_MESSAGE, Lang.msg('clickFirstCoordinate'));
                this.emit(Enum.DataEvents.TRANSLATE_BY_OFFSET, offset);
            }
        });
    }

    onKeyDown(e) {
        if (e.keyCode === 83) {
            e.preventDefault();
            this.emit(Enum.DataEvents.SAVE2FILE_JSON);
        }
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
