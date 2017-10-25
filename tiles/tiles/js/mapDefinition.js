var currentYear = '2000';
var mapStyle = {
    'version': 8,
    'glyphs': 'font/Arial%20Regular/0-255.pbf',
    'sprite': 'sprite/sprite',
    'sources': {
        'geobuffer': {
            'type': 'vector',
            'tiles': [
                'https://tiles3.socialexplorer.com/gettile/?x={x}&y={y}&z={z}&layers={layers}&projection=EPSG-3857&columns={columns}'
            ],
            'layers': [
                // STATES
                {
                    'layerId': '16891',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ISO',
                                'UID',
                            ]
                        }
                    ]
                },
                {
                    'layerId': '16891p',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ISO',
                                'UID',
                            ]
                        }
                    ]
                },
            ]
        },
        'rasterSource': {
            'type': 'raster',
            'tiles': ['http://wpc.4693.edgecastcdn.net/004693/tiles/area/' + currentYear + '/Z{z}/{y}/{x}.png?v=20'],
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
            'source-layer': '16891',
            'paint': {
                'fill-color': 'rgba(0,0,0,0.1)'
            }
        },
        {
            'id': 'selected',
            'type': 'fill',
            'source': 'geobuffer',
            'source-layer': '16891',
            'paint': {
                'fill-color': '#C369C3'
            },
            'filter': ['in', 'UID', 0]
        },
        {
            'id': 'boundaries',
            'type': 'line',
            'source': 'geobuffer',
            'source-layer': '16891',
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
            'source-layer': '16891p',
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