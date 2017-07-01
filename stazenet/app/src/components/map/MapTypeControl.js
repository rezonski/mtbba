class MapTypeControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';

        this._button1 = document.createElement('button');
        this._button1.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-satellite';
        this._button1.title = 'Satellite map';
        // this._button1.addEventListener('click', this.onMapStyleChange.bind(this, 'satellite'));
        this._button1.addEventListener('click', this.onShowSatellite.bind(this));
        this._container.appendChild(this._button1);

        this._button2 = document.createElement('button');
        this._button2.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-outdoors';
        this._button2.title = 'Topographic map';
        this._button2.addEventListener('click', this.onShowOutdoor.bind(this));
        this._container.appendChild(this._button2);

        // this._button3 = document.createElement('button');
        // this._button3.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw-basic';
        // this._button3.title = 'Simple map';
        // this._button3.addEventListener('click', this.onMapStyleChange.bind(this, 'streets'));
        // this._container.appendChild(this._button3);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onShowSatellite() {
        if (!window.leftmap.getSource('rasterTiles')) {
            window.leftmap.addSource('rasterTiles', {
                type: 'raster',
                url: 'mapbox://mapbox.satellite',
                tileSize: 256,
            });
        }
        if (window.leftmap.getLayer('satelliteLayer')) {
            window.leftmap.setLayoutProperty('satelliteLayer', 'visibility', 'visible');
        } else {
            window.leftmap.addLayer({
                id: 'satelliteLayer',
                type: 'raster',
                source: 'rasterTiles',
                minzoom: 0,
                maxzoom: 22,
            }, 'barrier_line-land-line');
        }
    }

    onShowOutdoor() {
        if (window.leftmap.getLayer('satelliteLayer')) {
            window.leftmap.setLayoutProperty('satelliteLayer', 'visibility', 'none');
        }
    }
}

export default MapTypeControl;
