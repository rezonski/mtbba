import GLU from '/../../glu2.js/src/index';
import Lang from '/helpers/Lang';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';

class MapEditControl {
    onAdd(map) {
        this._map = map;
        window.clickedPoint = {};
        window.pressedKeyCode = '';
        window.listenKeyboard = false;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';

        // Splitter
        this._trailSpritterButton = document.createElement('button');
        this._trailSpritterButton.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-split';
        this._trailSpritterButton.title = 'Split trail line string near the selected point on map';
        this._trailSpritterButton.addEventListener('click', this.onSplitterEvent);
        this._container.appendChild(this._trailSpritterButton);

        // Add point
        this._addWaypointButton = document.createElement('button');
        this._addWaypointButton.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-add-point';
        this._addWaypointButton.title = 'Add new waypoint clicking on map';
        this._addWaypointButton.addEventListener('click', this.onAddWaypointEvent);
        this._container.appendChild(this._addWaypointButton);

        // Add terrain switch
        this._addTerrainSwitchButton = document.createElement('button');
        this._addTerrainSwitchButton.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-add-terrain';
        this._addTerrainSwitchButton.title = 'Add new point where surface changes';
        this._addTerrainSwitchButton.addEventListener('click', this.onAddTerrainSwitchEvent);
        this._container.appendChild(this._addTerrainSwitchButton);

        window.leftmap.on('click', e => {
            window.clickedPoint = JSON.parse(JSON.stringify(e.lngLat));
            console.log('window.clickedPoint = ' + JSON.stringify(window.clickedPoint));
            window.leftmap.fire('displayTempPoint', { position: window.clickedPoint });
        });

        window.addEventListener('keydown', keyEvent => {
            if (window.listenKeyboard) {
                if (keyEvent.keyCode === 77 || keyEvent.keyCode === 65 || keyEvent.keyCode === 83 || keyEvent.keyCode === 78) {
                    keyEvent.preventDefault();
                    window.pressedKeyCode = String.fromCharCode(keyEvent.keyCode);
                    console.log('window.pressedKeyCode = ' + window.pressedKeyCode);
                    window.leftmap.fire('addTerrainSwitch', { position: JSON.parse(JSON.stringify(window.clickedPoint)), surface: window.pressedKeyCode });
                    window.listenKeyboard = false;
                }
            }
        });

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onSplitter() {
        window.leftmap.fire('saveEditedPath');
        console.log('onSplitterEvent(' + JSON.stringify(window.clickedPoint) + ')');
        window.leftmap.fire('lineSlice', { position: window.clickedPoint });
    }

    onAddWaypointEvent() {
        window.leftmap.fire('saveEditedPath');
        console.log('onAddWaypointEvent(' + JSON.stringify(window.clickedPoint) + ')');
        GLU.bus.emit(Enum.DataEvents.ADD_NEW_WAYPOINT, { position: window.clickedPoint });
    }

    onAddTerrainSwitchEvent() {
        window.listenKeyboard = true;
        window.leftmap.fire('saveEditedPath');
        GLU.bus.emit(MessageEvents.LONGER_INFO_MESSAGE, Lang.msg('keypress4surfaceType'));
    }
}

export default MapEditControl;
