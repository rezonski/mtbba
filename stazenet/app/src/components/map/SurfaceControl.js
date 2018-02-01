class SurfaceControl {
    onAdd(map) {
        this._map = map;
        this._nextSectionSurface = null;

        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';

        // asphalt
        this._addButtonAsphalth = document.createElement('button');
        this._addButtonAsphalth.className = 'mapbox-gl-draw_ctrl-draw-btn terrain-label';
        this._addButtonAsphalth.innerHTML = 'A';
        this._addButtonAsphalth.title = 'Point where starts ASPHALT section';
        this._addButtonAsphalth.addEventListener('click', () => {
            this._nextSectionSurface = 'A';
        });
        this._container.appendChild(this._addButtonAsphalth);

        // Macadam
        this._addButtonMacadam = document.createElement('button');
        this._addButtonMacadam.className = 'mapbox-gl-draw_ctrl-draw-btn terrain-label';
        this._addButtonMacadam.innerHTML = 'M';
        this._addButtonMacadam.title = 'Point where starts MACADAM section';
        this._addButtonMacadam.addEventListener('click', () => {
            this._nextSectionSurface = 'M';
        });
        this._container.appendChild(this._addButtonMacadam);

        // Trail
        this._addButtonTrail = document.createElement('button');
        this._addButtonTrail.className = 'mapbox-gl-draw_ctrl-draw-btn terrain-label';
        this._addButtonTrail.innerHTML = 'S';
        this._addButtonTrail.title = 'Point where starts TRAIL section';
        this._addButtonTrail.addEventListener('click', () => {
            this._nextSectionSurface = 'S';
        });
        this._container.appendChild(this._addButtonTrail);

        // Hiking
        this._addButtonHiking = document.createElement('button');
        this._addButtonHiking.className = 'mapbox-gl-draw_ctrl-draw-btn terrain-label';
        this._addButtonHiking.innerHTML = 'N';
        this._addButtonHiking.title = 'Point where starts HIKING section';
        this._addButtonHiking.addEventListener('click', () => {
            this._nextSectionSurface = 'N';
        });
        this._container.appendChild(this._addButtonHiking);

        window.leftmap.on('click', e => {
            if (this._nextSectionSurface) {
                const clickedPoint = JSON.parse(JSON.stringify(e.lngLat));
                const nextSurface = this._nextSectionSurface.toString();
                console.log('clickedPoint = ' + JSON.stringify(clickedPoint) + ' to change surface to ' + nextSurface);
                window.leftmap.fire('addTerrainSwitch', { position: clickedPoint, surface: nextSurface });
                window.setTimeout(() => {
                    this._nextSectionSurface = null;
                    window.leftmap.fire('saveEditedPath');
                }, 100);
            }
        });

        return this._container;
    }

    onRemove() {
        // console.log('SurfaceControl onRemove()');
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

export default SurfaceControl;
