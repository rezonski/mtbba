// var importCSV = 'data/World-detail-polygons---for-historical-maps-creation.csv';
// var importCSV = 'data/years/1914.csv';
var importCSV = 'data/years/year_1920_version_2017.12.19.9.51.csv';
var processedIDs = [];
var currentYear = 1920;
var year1 = 1918;
var year2 = 1920;
var year3 = 1924;
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
                    'layerId': '26852',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ID',
                                'ISO',
                                'Geo_FIPS->{ISO}',
                                'NAME_0',
                                'Geo_QName->{NAME_0}',
                            ]
                        }
                    ]
                },
                {
                    'layerId': '26852p',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ID',
                                'ISO',
                                'Geo_FIPS->{ISO}',
                                'NAME_0',
                                'Geo_QName->{NAME_0}',
                            ]
                        }
                    ]
                },
                {
                    "layerId": "12016",
                    "datasets": [
                      {
                        "datasetId": 0,
                        "columns": [
                          "NAME",
                          "SCALERANK"
                        ]
                      }
                    ]
                  },
                  {
                    "layerId": "1038",
                    "datasets": [
                      {
                        "datasetId": 0,
                        "columns": [
                          "CAPITAL"
                        ]
                      }
                    ]
                  },
            ]
        },
        'rasterSource1': {
            'type': 'raster',
            'tiles': ['http://wpc.4693.edgecastcdn.net/004693/tiles/area/' + year1 + '/Z{z}/{y}/{x}.png?v=20'],
            'tileSize': 256
        },
        'rasterSource2': {
            'type': 'raster',
            'tiles': ['http://wpc.4693.edgecastcdn.net/004693/tiles/area/' + year2 + '/Z{z}/{y}/{x}.png?v=20'],
            'tileSize': 256
        },
        'rasterSource3': {
            'type': 'raster',
            'tiles': ['http://wpc.4693.edgecastcdn.net/004693/tiles/area/' + year3 + '/Z{z}/{y}/{x}.png?v=20'],
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
            'id': 'history-tiles1',
            'type': 'raster',
            'source': 'rasterSource1',
            'minzoom': 0,
            'maxzoom': 7
        },
        {
            'id': 'history-tiles2',
            'type': 'raster',
            'source': 'rasterSource2',
            'minzoom': 0,
            'maxzoom': 7
        },
        {
            'id': 'history-tiles3',
            'type': 'raster',
            'source': 'rasterSource3',
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
            'source-layer': '26852',
            'paint': {
                'fill-color': 'rgba(0,0,0,0.1)'
            }
        },
        {
            'id': 'hovered',
            'type': 'fill',
            'source': 'geobuffer',
            'source-layer': '26852',
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
            'source-layer': '26852',
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
              'source-layer': '26852',
              'paint': {
                  'line-color': 'rgba(100, 100, 100, 0.5)',
                  'line-width': 1,
                  'line-blur': 1
              },
              'filter': ['!in', 'ID', ...processedIDs]
          },
    ]
};