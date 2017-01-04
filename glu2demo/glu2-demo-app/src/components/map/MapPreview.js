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
        this.onMouseDownEvent = this.mouseDown.bind(this);
        this.onMouseMoveEvent = this.mouseMove.bind(this);
        this.onMouseUpEvent = this.mouseUp.bind(this);
        this.onKeyDownEvent = this.keyDown.bind(this);
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
            this.canvas = this.mappreview.getCanvasContainer();
            this.canvas.addEventListener('mousedown', this.onMouseDownEvent, true);
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
                const payload = {
                    offset,
                    pointIndexes: JSON.parse(JSON.stringify(this.filteredIdxs)),
                };
                this.emit(MessageEvents.INFO_MESSAGE, 'Offset: ' + JSON.stringify(offset));
                this.emit(MessageEvents.INFO_MESSAGE, Lang.msg('clickFirstCoordinate'));
                this.emit(Enum.DataEvents.TRANSLATE_BY_OFFSET, payload);
                this.firstPoint = [];
                this.filteredIdxs = [];
            }
        });
        this.mappreview.on('mousemove', (e) => {
            const features = this.mappreview.queryRenderedFeatures(e.point, { layers: ['controlPointsHighlight'] });
            // Change the cursor style as a UI indicator.
            this.mappreview.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
            if (!features.length) {
                return;
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

    mouseDown(e) {
        if (!(e.shiftKey && e.button === 0)) return;
        this.mappreview.dragPan.disable();
        document.addEventListener('mousemove', this.onMouseMoveEvent);
        document.addEventListener('mouseup', this.onMouseUpEvent);
        document.addEventListener('keydown', this.onKeyDownEvent);
        this.startPoint = this.mousePos(e);
    }

    mousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return new mapboxgl.Point(
            e.clientX - rect.left - this.canvas.clientLeft,
            e.clientY - rect.top - this.canvas.clientTop
        );
    }

    mouseMove(e) {
        // Capture the ongoing xy coordinates
        this.currentPoint = this.mousePos(e);

        // Append the box element if it doesnt exist
        if (!this.box) {
            this.box = document.createElement('div');
            this.box.classList.add('boxdraw');
            this.canvas.appendChild(this.box);
        }

        const minX = Math.min(this.startPoint.x, this.currentPoint.x);
        const maxX = Math.max(this.startPoint.x, this.currentPoint.x);
        const minY = Math.min(this.startPoint.y, this.currentPoint.y);
        const maxY = Math.max(this.startPoint.y, this.currentPoint.y);

        // Adjust width and xy position of the box element ongoing
        const pos = 'translate(' + minX + 'px,' + minY + 'px)';
        this.box.style.transform = pos;
        this.box.style.WebkitTransform = pos;
        this.box.style.width = maxX - minX + 'px';
        this.box.style.height = maxY - minY + 'px';
    }

    mouseUp(e) {
        // Capture xy coordinates
        this.finish([this.startPoint, this.mousePos(e)]);
    }

    keyDown(e) {
        // If the ESC key is pressed
        if (e.keyCode === 27) this.finish();
    }

    finish(bbox) {
        // Remove these events now that finish has been called.
        document.removeEventListener('mousemove', this.onMouseMoveEvent);
        document.removeEventListener('keydown', this.onKeyDownEvent);
        document.removeEventListener('mouseup', this.onMouseUpEvent);
        if (this.box) {
            this.box.parentNode.removeChild(this.box);
            this.box = null;
        }
        // If bbox exists. use this value as the argument for `queryRenderedFeatures`
        if (bbox) {
            const features = this.mappreview.queryRenderedFeatures(bbox, { layers: ['controlPoints'] });
            if (features.length >= 1000) {
                return this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('tooManyPointsSelected'));
            }
            // Run through the selected features and set a filter
            // to match features with unique FIPS codes to activate
            // the `counties-highlighted` layer.
            this.filteredIdxs = features.reduce((memo, feature) => {
                memo.push(feature.properties.highlightId);
                return memo;
            }, ['in', 'highlightId']);
            this.mappreview.setFilter('controlPointsHighlight', this.filteredIdxs);
        }
        this.mappreview.dragPan.enable();
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
