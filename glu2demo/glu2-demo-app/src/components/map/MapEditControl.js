import GLU from '/../../glu2.js/src/index';
import Lang from '/helpers/Lang';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';

class MapEditControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';

        // Splitter
        this._addtrailSpritterButtonActive = false;
        this._trailSpritterButton = document.createElement('button');
        this._trailSpritterButton.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-split';
        this._trailSpritterButton.title = 'Split trail line string near the selected point on map';
        this._trailSpritterButton.addEventListener('click', this.onSplitterEvent);
        this._container.appendChild(this._trailSpritterButton);

        // Add point
        this._addWaypointButtonActive = false;
        this._addWaypointButton = document.createElement('button');
        this._addWaypointButton.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-add-point';
        this._addWaypointButton.title = 'Add new waypoint clicking on map';
        this._addWaypointButton.addEventListener('click', this.onAddWaypointEvent);
        this._container.appendChild(this._addWaypointButton);

        // Add terrain switch
        this._addTerrainSwitchButtonActive = false;
        this._addTerrainSwitchButton = document.createElement('button');
        this._addTerrainSwitchButton.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-add-terrain';
        this._addTerrainSwitchButton.title = 'Add new point where surface changes';
        this._addTerrainSwitchButton.addEventListener('click', this.onAddTerrainSwitchEvent);
        this._container.appendChild(this._addTerrainSwitchButton);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onSplitter() {
        this._addtrailSpritterButtonActive = false;
        window.leftmap.on('click', e => {
            if (!this._addtrailSpritterButtonActive) {
                console.log('onSplitterEvent(' + e.lngLat + ')');
                window.leftmap.fire('lineSlice', { position: e.lngLat });
                this._addtrailSpritterButtonActive = true;
            }
        });
    }

    onAddWaypointEvent() {
        this._addWaypointButtonActive = false;
        window.leftmap.on('click', e => {
            if (!this._addWaypointButtonActive) {
                console.log('onAddWaypointEvent(' + e.lngLat + ')');
                GLU.bus.emit(Enum.DataEvents.ADD_NEW_WAYPOINT, { position: e.lngLat });
                // window.leftmap.fire('addNewWaypoint', { position: e.lngLat });
                this._addWaypointButtonActive = true;
            }
        });
    }

    onAddTerrainSwitchEvent() {
        this._addTerrainSwitchButtonActive = false;
        window.leftmap.on('click', e => {
            if (!this._addTerrainSwitchButtonActive) {
                GLU.bus.emit(MessageEvents.LONGER_INFO_MESSAGE, Lang.msg('keypress4surfaceType'));
                this._addTerrainSwitchButtonActive = true;
                // window.leftmap.fire('askForTerrainCode', { position: e.lngLat });
                console.log('onAddTerrainSwitchEvent(' + e.lngLat + ')');
                this._keylistenerActive = false;
                window.addEventListener('keydown', keyEvent => {
                    if (!this._keylistenerActive) {
                        if (keyEvent.keyCode === 77 || keyEvent.keyCode === 65 || keyEvent.keyCode === 83 || keyEvent.keyCode === 78) {
                            keyEvent.preventDefault();
                            const parsedChar = String.fromCharCode(keyEvent.keyCode);
                            console.log('keyEvent.keyCode = ' + keyEvent.keyCode + ' - ' + parsedChar);
                            window.leftmap.fire('addTerrainSwitch', { position: e.lngLat, surface: parsedChar });
                            this._keylistenerActive = true;
                        }
                    }
                });
            }
        });
    }
}

export default MapEditControl;
