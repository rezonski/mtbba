import { point, featureCollection } from '@turf/helpers';

class MapHelper {
    constructor() {
    }

    createGeoJSONcentroid4AllTrails(map, data) {
        const allPoints = [];
        data.forEach(t => {
            if (t.center && Array.isArray(JSON.parse(t.center))) {
                console.log(t.center);
                allPoints.push(point(JSON.parse(t.center), {
                    name: t.name,
                }));
            }
        });
        const collection = featureCollection(allPoints);
        map.addSource('activeTrails', {
            type: 'geojson',
            data: collection,
        });
        map.addLayer({
            id: 'activeTrails',
            type: 'symbol',
            source: 'activeTrails',
            layout: {
                'icon-image': 'bicycle-15',
                'icon-allow-overlap': true,
            },
        });
    }
}

export default new MapHelper();
