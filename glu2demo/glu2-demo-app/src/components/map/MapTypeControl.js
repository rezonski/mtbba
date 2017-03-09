class MapTypeControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';

        this._button1 = document.createElement('button');
        this._button1.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-satellite';
        this._button1.addEventListener('click', this.onMapStyleChange.bind(this, 'satellite-hybrid-v8'));
        this._container.appendChild(this._button1);

        this._button2 = document.createElement('button');
        this._button2.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-outdoors';
        this._button2.addEventListener('click', this.onMapStyleChange.bind(this, 'outdoors-v9'));
        this._container.appendChild(this._button2);

        this._button3 = document.createElement('button');
        this._button3.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-basic';
        this._button3.addEventListener('click', this.onMapStyleChange.bind(this, 'basic-v9'));
        this._container.appendChild(this._button3);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onMapStyleChange(mapType) {
        window.leftmap.setStyle('mapbox://styles/mapbox/' + mapType);
    }
}

export default MapTypeControl;
