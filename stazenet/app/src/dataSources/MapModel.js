import GLU from '/../../glu2.js/src/index';

class MapModel extends GLU.DataSource {
    constructor() {
        super();
        this._collection = [];
        this._accessToken = null;
        this._initialMaxBounds = [[10, 39], [25, 48]];
        this._initialBounds = [[14.69, 42.12], [20.36, 45.67]];
        this._initialCenter = [17.67696, 43.920101];
        this._leftMap = {};
        this._rightMap = {};
        this._previewMap = {};
        this._initialZoomLevels = {
          base: 6,
          min: 5,
          max: 20,
        };
        this._mapStyles = [
          {
            name: 'Outdoors',
            type: 'terrain',
            value: 'mapbox://styles/mapbox/outdoors-v9',
          },
          {
            name: 'Satellite',
            type: 'satellite',
            value: 'mapbox://styles/mapbox/satellite-hybrid-v8',
          },
          {
            name: 'Dark',
            type: 'terrain',
            value: 'mapbox://styles/mapbox/dark-v9',
          },
          {
            name: 'Basic',
            type: 'terrain',
            value: 'mapbox://styles/mapbox/basic-v9',
          },
        ];
    }

    get leftMap() {
        return this._leftMap;
    }

    set leftMap(newMap) {
        if (newMap) {
            this._leftMap = newMap;
        }
    }

    get rightMap() {
        return this._rightMap;
    }

    set rightMap(newMap) {
        if (newMap) {
            this._rightMap = newMap;
        }
    }

    get previewMap() {
        return this._previewMap;
    }

    set previewMap(newMap) {
        if (newMap) {
            this._previewMap = newMap;
        }
    }

    get accessToken() {
        return this._accessToken;
    }

    get initialBounds() {
        return this._initialBounds;
    }

    set initialBounds(newBounds) {
        if (newBounds) {
            this._initialBounds = newBounds;
        }
    }

    get initialMaxBounds() {
        return this._initialMaxBounds;
    }

    set initialMaxBounds(newBounds) {
        if (newBounds) {
            this._initialMaxBounds = newBounds;
        }
    }

    get initialCenter() {
        return this._initialCenter;
    }

    set initialCenter(newCenter) {
        if (newCenter) {
            this._initialCenter = newCenter;
        }
    }

    get initialZoomLevels() {
        return this._initialZoomLevels;
    }

    get mapStyles() {
        return this._mapStyles;
    }

    getInitialSetup() {
        return {
            accessToken: this.accessToken,
            primaryStyle: this.getPrimaryStyle(),
            secondaryStyle: this.getSecondaryStyle(),
            bounds: this.initialBounds,
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
