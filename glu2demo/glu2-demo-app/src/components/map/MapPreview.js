/* global mapboxgl */
/* global turf */
import React from 'react';
import BasePage from '../BasePage';
// import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
import Lang from '/helpers/Lang';

class MapPreview extends BasePage {
    constructor(props) {
        super(props);
        this.keyListener = this.onKeyDown.bind(this);
        this.onMouseDownEvent = this.mouseDown.bind(this);
        this.onMouseMoveEvent = this.mouseMove.bind(this);
        this.onMouseUpEvent = this.mouseUp.bind(this);
        this.onKeyDownEvent = this.keyDown.bind(this);
        this.onMapMoveEvent = this.mapMove.bind(this);
        this.onMapUpEvent = this.mapUp.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_MAP_SETUP_RETRIEVED]: this.initMap,
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
        this.canvas = this.mappreview.getCanvas();
        this.canvasContainer = this.mappreview.getCanvasContainer();
        window.mappreview = this.mappreview;
        this.mappreview.on('load', () => {
            this.canvasContainer.addEventListener('mousedown', this.onMouseDownEvent, true);
            this.emit(Enum.MapEvents.SAVE_PREVIEW_MAP, this.mappreview);
            this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('previewMapLoaded'));
            // this.mappreview.on('click', (e) => {
            //     if (this.firstPoint.length === 0) {
            //         this.firstPoint = [e.lngLat.lng, e.lngLat.lat];
            //         this.emit(MessageEvents.INFO_MESSAGE, Lang.msg('clickSecondCoordinate'));
            //     } else if (this.firstPoint.length > 0) {
            //         const offset = [(e.lngLat.lng - this.firstPoint[0]), (e.lngLat.lat - this.firstPoint[1])];
            //         const payload = {
            //             offset,
            //             pointIndexes: JSON.parse(JSON.stringify(this.filteredIdxs)),
            //         };
            //         this.emit(MessageEvents.INFO_MESSAGE, 'Offset: ' + JSON.stringify(offset));
            //         this.emit(MessageEvents.INFO_MESSAGE, Lang.msg('clickFirstCoordinate'));
            //         this.emit(Enum.DataEvents.TRANSLATE_BY_OFFSET, payload);
            //         this.firstPoint = [];
            //         this.filteredIdxs = [];
            //     }
            // });
            this.mappreview.on('mousemove', (e) => {
                if (!this.mappreview.getLayer('controlPointsSelected')) return;
                const selectedFeatures = this.mappreview.queryRenderedFeatures(e.point, { layers: ['controlPointsSelected'] });
                // Change the cursor style as a UI indicator.
                // this.canvas.style.cursor = (selectedFeatures.length) ? 'pointer' : '';
                if (selectedFeatures.length) {
                    this.canvas.style.cursor = 'move';
                    this.isCursorOverPoint = true;
                    this.mappreview.dragPan.disable();
                } else {
                    this.canvas.style.cursor = '';
                    this.isCursorOverPoint = false;
                    this.mappreview.dragPan.enable();
                }
            });
            this.mappreview.on('mousedown', this.onMouseDownEvent, true);
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
        // On shift-selection
        if (e.shiftKey && e.button === 0) {
            this.mappreview.dragPan.disable();
            document.addEventListener('mousemove', this.onMouseMoveEvent);
            document.addEventListener('mouseup', this.onMouseUpEvent);
            document.addEventListener('keydown', this.onKeyDownEvent);
            this.startPoint = this.mousePos(e);
        // On mouse dragging
        } else if (this.isCursorOverPoint) {
            this.isDragging = true;
            this.startedDragging = true;
            this.canvas.style.cursor = 'grab';
            this.mappreview.on('mousemove', this.onMapMoveEvent);
            this.mappreview.once('mouseup', this.onMapUpEvent);
        }
    }

    mapMove(e) {
        if (!this.isDragging) return;
        const coords = e.lngLat;
        this.canvas.style.cursor = 'grabbing';
        if (this.startedDragging) {
            this.initialPosition = turf.point([coords.lng, coords.lat]);
            this.startedDragging = false;
        }
        const tempPosition = turf.point([coords.lng, coords.lat]);
        const bearing = turf.bearing(this.initialPosition, tempPosition);
        const distance = turf.distance(this.initialPosition, tempPosition, 'kilometers');
        // console.info('bearing: ' + bearing + ' , distance: ' + distance);
        const tempFeatures = this.selectedControlFeatures.map(feat => {
            return turf.destination(feat, distance, bearing, 'kilometers');
        });
        this.mappreview.getSource('controlPoints').setData({
            type: 'FeatureCollection',
            features: tempFeatures,
        });
        // Update the Point feature in `geojson` coordinates
        // and call setData to the source layer `point` on it.
        // geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
        // map.getSource('point').setData(geojson);
    }

    mapUp(e) {
        if (!this.isDragging) return;
        const coords = e.lngLat;
        const tempPosition = turf.point([coords.lng, coords.lat]);
        const bearing = turf.bearing(this.initialPosition, tempPosition);
        const distance = turf.distance(this.initialPosition, tempPosition, 'kilometers');
        // console.info('bearing: ' + bearing + ' , distance: ' + distance);
        const tempFeatures = this.selectedControlFeatures.map(feat => {
            return turf.destination(feat, distance, bearing, 'kilometers');
        });
        this.mappreview.getSource('controlPoints').setData({
            type: 'FeatureCollection',
            features: tempFeatures,
        });
        // console.info([coords.lng, coords.lat]);
        // Print the coordinates of where the point had
        // finished being dragged to on the map.
        // coordinates.style.display = 'block';
        // coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
        this.canvas.style.cursor = '';
        this.isDragging = false;

        // Unbind mouse events
        this.mappreview.off('mousemove', this.onMapMoveEvent);
    }

    mousePos(e) {
        const rect = this.canvasContainer.getBoundingClientRect();
        return new mapboxgl.Point(
            e.clientX - rect.left - this.canvasContainer.clientLeft,
            e.clientY - rect.top - this.canvasContainer.clientTop
        );
    }

    mouseMove(e) {
        // Capture the ongoing xy coordinates
        this.currentPoint = this.mousePos(e);

        // Append the box element if it doesnt exist
        if (!this.box) {
            this.box = document.createElement('div');
            this.box.classList.add('boxdraw');
            this.canvasContainer.appendChild(this.box);
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
            this.selectedControlFeatures = this.mappreview.queryRenderedFeatures(bbox, { layers: ['controlPoints'] });
            if (this.selectedControlFeatures.length >= 1000) {
                return this.emit(MessageEvents.ERROR_MESSAGE, Lang.msg('tooManyPointsSelected'));
            }
            // Run through the selected selectedControlFeatures and set a filter
            // to match selectedControlFeatures with unique FIPS codes to activate
            // the `counties-highlighted` layer.
            // this.initialPosition = this.selectedControlFeatures[0];
            this.filteredIdxs = this.selectedControlFeatures.reduce((memo, feature) => {
                memo.push(feature.properties.highlightId);
                return memo;
            }, ['in', 'highlightId']);
            this.mappreview.setFilter('controlPointsSelected', this.filteredIdxs);
            // this.mappreview.getSource('controlPoints').setData({
            //     type: 'FeatureCollection',
            //     features: this.selectedControlFeatures,
            // });
            this.selecteFeaturesPoints = CommonHelper.getPoints(JSON.parse(JSON.stringify(this.mappreview.getSource('previewPath')._data)));
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
