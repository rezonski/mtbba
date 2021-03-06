class MapTypeControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';

        this._button1 = document.createElement('button');
        this._button1.className = 'mapbox-gl-draw_ctrl-draw-btn satellite';
        this._button1.title = 'Show satellite map';
        this._button1.addEventListener('click', this.onToggleSatellite.bind(this));
        this._container.appendChild(this._button1);

        this._button2 = document.createElement('button');
        this._button2.className = 'mapbox-gl-draw_ctrl-draw-btn mines off';
        this._button2.title = 'Toggle mine danger zones';
        this._button2.addEventListener('click', this.onToggleMines.bind(this));
        this._container.appendChild(this._button2);

        this._button3 = document.createElement('button');
        this._button3.className = 'mapbox-gl-draw_ctrl-draw-btn strava off';
        this._button3.title = 'Toggle STRAVA heat map';
        this._button3.addEventListener('click', this.onToggleStrava.bind(this));
        this._container.appendChild(this._button3);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onToggleSatellite() {
        if (window.leftmap.getLayer('satelliteLayer')) {
            if (window.leftmap.getLayoutProperty('satelliteLayer', 'visibility') === 'visible') {
                window.leftmap.setLayoutProperty('satelliteLayer', 'visibility', 'none');
                this._button1.className = 'mapbox-gl-draw_ctrl-draw-btn satellite';
                this._button1.title = 'Show satellite map';
            } else {
                this._button1.className = 'mapbox-gl-draw_ctrl-draw-btn outdoors';
                this._button1.title = 'Show outdoor map';
                window.leftmap.setLayoutProperty('satelliteLayer', 'visibility', 'visible');
            }
        }
    }

    onToggleMines() {
        if (window.leftmap.getLayer('minesLayer')) {
            if (window.leftmap.getLayoutProperty('minesLayer', 'visibility') === 'visible') {
                window.leftmap.setLayoutProperty('minesLayer', 'visibility', 'none');
                this._button2.className = 'mapbox-gl-draw_ctrl-draw-btn mines off';
            } else {
                window.leftmap.setLayoutProperty('minesLayer', 'visibility', 'visible');
                this._button2.className = 'mapbox-gl-draw_ctrl-draw-btn mines on';
            }
        }
    }

    onToggleStrava() {
        if (window.leftmap.getLayer('stravaLayer')) {
            if (window.leftmap.getLayoutProperty('stravaLayer', 'visibility') === 'visible') {
                window.leftmap.setLayoutProperty('stravaLayer', 'visibility', 'none');
                this._button3.className = 'mapbox-gl-draw_ctrl-draw-btn strava off';
            } else {
                window.leftmap.setLayoutProperty('stravaLayer', 'visibility', 'visible');
                this._button3.className = 'mapbox-gl-draw_ctrl-draw-btn strava on';
            }
        }
    }
}

export default MapTypeControl;
