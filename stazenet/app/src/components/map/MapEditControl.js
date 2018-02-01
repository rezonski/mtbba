import GLU from '/../../glu2.js/src/index';
// import Lang from '/helpers/Lang';
// import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';

class MapEditControl {
    onAdd(map) {
        this._map = map;
        this._action = null;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';

        // Splitter
        this._trailSpritterButton = document.createElement('button');
        this._trailSpritterButton.className = 'mapbox-gl-draw_ctrl-draw-btn split';
        this._trailSpritterButton.title = 'Split trail line string near the selected point on map';
        this._trailSpritterButton.addEventListener('click', () => {
            this._action = 'splitter';
        });
        this._container.appendChild(this._trailSpritterButton);

        // Add point
        this._addWaypointButton = document.createElement('button');
        this._addWaypointButton.className = 'mapbox-gl-draw_ctrl-draw-btn add-point';
        this._addWaypointButton.title = 'Add new waypoint clicking on map';
        this._addWaypointButton.addEventListener('click', () => {
            this._action = 'newpoint';
        });
        this._container.appendChild(this._addWaypointButton);

        // Add photo
        this._addPhotoButton = document.createElement('button');
        this._addPhotoButton.className = 'mapbox-gl-draw_ctrl-draw-btn add-photo';
        this._addPhotoButton.title = 'Add new photo clicking on map';
        this._addPhotoButton.addEventListener('click', () => {
            this._action = 'newphoto';
        });
        this._container.appendChild(this._addPhotoButton);


        window.leftmap.on('click', e => {
            const clickedPoint = JSON.parse(JSON.stringify(e.lngLat));
            if (this._action === 'splitter') {
                window.leftmap.fire('lineSlice', { position: clickedPoint });
                window.setTimeout(() => {
                    this._action = null;
                    window.leftmap.fire('saveEditedPath');
                }, 100);
            } else if (this._action === 'newpoint') {
                GLU.bus.emit(Enum.DataEvents.ADD_NEW_WAYPOINT, { position: clickedPoint, action: this._action });
                window.setTimeout(() => {
                    this._action = null;
                    window.leftmap.fire('saveEditedPath');
                }, 100);
            } else if (this._action === 'newphoto') {
                GLU.bus.emit(Enum.DataEvents.ADD_NEW_WAYPOINT, { position: clickedPoint, action: this._action });
                window.setTimeout(() => {
                    this._action = null;
                    window.leftmap.fire('saveEditedPath');
                }, 100);
            }
        });

        return this._container;
    }

    onRemove() {
        // console.log('MapEditControl onRemove()');
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

export default MapEditControl;
