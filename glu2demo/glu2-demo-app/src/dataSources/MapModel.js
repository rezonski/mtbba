import GLU from '/../../glu2.js/src/index';

class MapModel extends GLU.DataSource {
    constructor() {
        super();
        this._collection = [];
        this._accessToken = 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
        this._initialMaxBounds = [[13, 45.38], [22, 42.42]];
        this._initialCenter = [17.67696, 43.920101];
        this._initialZoomLevels = {
          base: 6,
          min: 5,
          max: 20,
        };
        this._mapStyles = [
          {
            name: 'outdoors',
            value: 'mapbox://styles/mapbox/outdoors-v9',
          },
          {
            name: 'sattelite',
            value: 'mapbox://styles/mapbox/sattelite-v9',
          },
          {
            name: 'basic',
            value: 'mapbox://styles/mapbox/basic-v9',
          },
          {
            name: 'dark',
            value: 'mapbox://styles/mapbox/dark-v9',
          },
        ];
    }

    get accessToken() {
        return this._accessToken;
    }

    get initialMaxBounds() {
        return this._initialMaxBounds;
    }

    get initialCenter() {
        return this._initialCenter;
    }

    get initialZoomLevels() {
        return this._initialZoomLevels;
    }

    getInitialSetup() {
        return {
            accessToken: this.accessToken,
            primaryStyle: this.getPrimaryStyle(),
            secondaryStyle: this.getSecondaryStyle(),
            maxBounds: this.initialMaxBounds,
            center: this.initialCenter,
            zoom: this.initialZoomLevels,
        };
    }

    getPrimaryStyle() {
        return this._mapStyles[0];
    }

    getSecondaryStyle() {
        return this._mapStyles[1];
    }

    getStyle(key) {
        this._mapStyles.forEach((style) => {
            if (style.name === key) {
                return style;
            }
        });
    }

    set accessToken(newToken) {
        if (newToken) {
            this._accessToken = newToken;
        }
    }
}

export default new MapModel();
