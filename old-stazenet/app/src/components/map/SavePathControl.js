class SavePathControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
        this._button = document.createElement('button');
        this._button.className = 'mapbox-gl-draw_ctrl-draw-btn save';
        this._button.title = 'Save modified trail';
        this._button.addEventListener('click', this.onButtonClicked);
        this._container.appendChild(this._button);
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onButtonClicked() {
        window.leftmap.fire('saveEditedPath');
    }
}

export default SavePathControl;
