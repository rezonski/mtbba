class ReturnPathSplitterControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
        this._button = document.createElement('button');
        this._button.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_combine';
        this._button.addEventListener('click', this.onButtonClicked);
        this._container.appendChild(this._button);
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onButtonClicked() {
        console.log('splitter activated');
        this._pointSelected = false;
        window.leftmap.on('click', e => {
            if (!this._pointSelected) {
                console.log(e.lngLat);
                window.leftmap.fire('lineSlice', { position: e.lngLat });
                this._pointSelected = true;
                console.log('unbind eventListener');
            }
        });
    }
}

export default ReturnPathSplitterControl;
