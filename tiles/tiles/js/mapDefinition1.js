var importCSV = 'data/Adm1-Drawing-2.csv';
var mapStyle = {
    'version': 8,
    'glyphs': 'font/Arial Regular/0-255.pbf',
    'sprite': 'sprite/sprite',
    // 'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    // 'sprite': 'mapbox://sprites/mapbox/streets-v9',
    'sources': {
        'geobuffer': {
            'type': 'vector',
            'tiles': [
                'https://tiles3.socialexplorer.com/gettile/?x={x}&y={y}&z={z}&layers={layers}&projection=EPSG-3857&columns={columns}'
            ],
            'layers': [
                // STATES
                {
                    'layerId': '22837',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ID',
                                'ISO',
                                'NAME_0',
                                'NAME_1',
                                'HASC_1',
                            ]
                        }
                    ]
                },
                {
                    'layerId': '22837p',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ID',
                                'ISO',
                                'NAME_0',
                                'NAME_1',
                                'HASC_1',
                            ]
                        }
                    ]
                },
            ]
        },
        'rasterSource': {
            'type': 'raster',
            'tiles': ['http://wpc.4693.edgecastcdn.net/004693/tiles/area/2000/Z{z}/{y}/{x}.png?v=20'],
            'tileSize': 256
        }
    },
    'layers': [
        {
            'id': 'background',
            'type': 'background',
            'paint': {
                'background-color': '#fff'
            }
        },
        {
            'id': 'history-tiles',
            'type': 'raster',
            'source': 'rasterSource',
            'minzoom': 0,
            'maxzoom': 7
        },
        {
            'id': 'dummy',
            'type': 'background',
            'paint': {
                'background-color': 'rgba(0,0,0,0)'
            }
        },
        {
            'id': 'features',
            'type': 'fill',
            'source': 'geobuffer',
            'source-layer': '22837',
            'paint': {
                'fill-color': 'rgba(0,0,0,0.1)'
            }
        },
        {
            'id': 'hovered',
            'type': 'fill',
            'source': 'geobuffer',
            'source-layer': '22837',
            'paint': {
                'fill-color': '#F4FF00',
                'fill-opacity': 0.5
            },
            'filter': ['in', 'ID', 0]
        },
        {
            'id': 'changed',
            'type': 'fill',
            'source': 'geobuffer',
            'source-layer': '22837',
            'paint': {
                'fill-color': '#FF00B4',
                'fill-opacity': 0.5
            },
            'filter': ['in', 'ID', 0]
        },
        {
            'id': 'boundaries',
            'type': 'line',
            'source': 'geobuffer',
            'source-layer': '22837',
            'paint': {
                'line-color': 'rgba(0, 0, 0, 0.2)',
                'line-width': 1,
                'line-blur': 1
            }
        },
        {
            'id': 'labels',
            'type': 'symbol',
            'source': 'geobuffer',
            'source-layer': '22837p',
            'paint': {
                'text-color': 'rgba(0, 0, 0, 0.7)',
                'text-halo-color': 'rgba(255, 255, 255, 0.8)',
                'text-halo-width': 1,
                'text-halo-blur': 1
            },
            'layout': {
                'text-field': '{ISO}',
                'text-offset': [0, 1.1],
                'text-size': {
                    'stops': [[4,9],[22,15]]
                },
            }
        },
    ]
};