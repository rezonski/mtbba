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
            this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('previewMapLoaded'));
            this.emit(Enum.MapEvents.SAVE_PREVIEW_MAP, this.mappreview);
        });
        this.mappreview.on('click', (e) => {
            console.log(e.point);
            console.log(e.lngLat);
            // console.log('MapPreview - onCLick');
            // this.onNewCoordinate.bind(e.lngLat);
        });
    }

    // onNewCoordinate(coord) {
    //     console.log('MapPreview - onNewCoordinate(' + JSON.stringify(coord) + ')');
    //     if (this.firstPoint.length === 0) {
    //         this.firstPoint = [coord.lng, coord.lat];
    //         this.emit(MessageEvents.INFO_MESSAGE, Lang.msg('clickSecondCoordinate'));
    //     } else if (this.firstPoint.length > 0) {
    //         const offset = [(this.firstPoint[0] - coord.lng), (this.firstPoint[1] - coord.lat)];
    //         this.firstPoint = [];
    //         this.emit(MessageEvents.INFO_MESSAGE, 'Offset: ' + JSON.stringify(offset));
    //         this.emit(Enum.DataEvents.TRANSLATE_BY_OFFSET, offset);
    //     }
    // }

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
