var importCSV = 'data/World_Administrative_area1_2015.csv';
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
                    'layerId': '16891',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'UID',
                                'ID->{UID}',
                                'ISO',
                                'NAME',
                                'NAME_0->{NAME}',
                                'VARNAME_1',
                                'NAME_1->{VARNAME_1}',
                                'HASC_1',
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
                                'UID',
                                'ID->{UID}',
                                'ISO',
                                'NAME',
                                'NAME_0->{NAME}',
                                'VARNAME_1',
                                'NAME_1->{VARNAME_1}',
                                'HASC_1',
                            ]
                        }
                    ]
                },
            ]
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