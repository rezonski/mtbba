// var importCSV = 'data/World-detail-polygons---for-historical-maps-creation.csv';
// var importCSV = 'data/years/1914.csv';
var importCSV = 'data/germany/germany.csv';
var processedIDs = [];
var currentYear = 1919;
var year1 = 1918;
var year2 = 1919;
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
                    'layerId': '27996',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ID_3',
                                'ID->{ID_3}',
                                'ISO',
                                'Geo_FIPS->{ISO}',
                                'NAME_1',
                                'Geo_QName->{NAME_1}',
                            ]
                        }
                    ]
                },
                {
                    'layerId': '27996p',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ID_3',
                                'ID->{ID_3}',
                                'ISO',
                                'Geo_FIPS->{ISO}',
                                'NAME_1',
                                'Geo_QName->{NAME_1}',
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
            'source-layer': '27996',
            'paint': {
                'fill-color': 'rgba(0,0,0,0.1)'
            }
        },
        {
            'id': 'hovered',
            'type': 'fill',
            'source': 'geobuffer',
            'source-layer': '27996',
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
            'source-layer': '27996',
            'paint': {
                'fill-color': '#FF00B4',
                'fill-opacity': 0.5
            },
            'filter': ['in', 'ID', 0]
        },
        {
          'id': '1923-boundaries',
          'type': 'line',
          'source': 'geobuffer',
          'source-layer': '11505',
          'paint': {
              'line-color': '#FF0000',
              'line-width': 4,
              'line-blur': 3
          },
        },
        {
          "id": "world-cities-smaller",
          "type": "symbol",
          "source": "geobuffer",
          "source-layer": "12016",
          "paint": {
            "text-color": "rgba(0, 0, 0, 0.7)",
            "text-halo-color": "rgba(255, 255, 255, 0.8)",
            "text-halo-width": 1,
            "icon-opacity": 0.3,
            "text-halo-blur": 1
          },
          "layout": {
            "icon-image": "small_city",
            "text-field": "{NAME}",
            "text-offset": [
              0,
              1.1
            ],
            "text-size": {
              "stops": [
                [
                  4,
                  11
                ],
                [
                  22,
                  20
                ]
              ]
            }
          },
          "minzoom": 6,
          "maxzoom": 22,
          "filter": [
            "all",
            [
              "<=",
              "SCALERANK",
              5
            ],
            [
              ">",
              "SCALERANK",
              0
            ]
          ]
        },
        {
          "id": "world-cities-small",
          "type": "symbol",
          "source": "geobuffer",
          "source-layer": "12016",
          "paint": {
            "text-color": "rgba(0, 0, 0, 0.7)",
            "text-halo-color": "rgba(255, 255, 255, 0.8)",
            "text-halo-width": 1,
            "icon-opacity": 0.6,
            "text-halo-blur": 1
          },
          "layout": {
            "icon-image": "small_city",
            "text-field": "{NAME}",
            "text-offset": [
              0,
              1.1
            ],
            "text-size": {
              "stops": [
                [
                  4,
                  11
                ],
                [
                  22,
                  20
                ]
              ]
            }
          },
          "minzoom": 5,
          "maxzoom": 22,
          "filter": [
            "all",
            [
              "<=",
              "SCALERANK",
              7
            ],
            [
              ">",
              "SCALERANK",
              5
            ]
          ]
        },
        {
          "id": "world-cities-medium",
          "type": "symbol",
          "source": "geobuffer",
          "source-layer": "12016",
          "paint": {
            "text-color": "rgba(0, 0, 0, 0.7)",
            "text-halo-color": "rgba(255, 255, 255, 0.8)",
            "text-halo-width": 1,
            "icon-opacity": 0.5,
            "text-halo-blur": 1
          },
          "layout": {
            "icon-image": "medium_city",
            "text-field": "{NAME}",
            "text-offset": [
              0,
              1.1
            ],
            "text-size": {
              "stops": [
                [
                  4,
                  11
                ],
                [
                  22,
                  20
                ]
              ]
            }
          },
          "minzoom": 4.5,
          "maxzoom": 22,
          "filter": [
            "all",
            [
              "<=",
              "SCALERANK",
              8
            ],
            [
              ">",
              "SCALERANK",
              7
            ]
          ]
        },
        {
          "id": "world-cities-city",
          "type": "symbol",
          "source": "geobuffer",
          "source-layer": "12016",
          "paint": {
            "text-color": "rgba(0, 0, 0, 0.7)",
            "text-halo-color": "rgba(255, 255, 255, 0.8)",
            "text-halo-width": 1,
            "icon-opacity": 0.5,
            "text-halo-blur": 1
          },
          "layout": {
            "icon-image": "city",
            "text-field": "{NAME}",
            "text-offset": [
              0,
              1.1
            ],
            "text-size": {
              "stops": [
                [
                  4,
                  11
                ],
                [
                  22,
                  25
                ]
              ]
            }
          },
          "minzoom": 4,
          "maxzoom": 22,
          "filter": [
            "all",
            [
              "<=",
              "SCALERANK",
              9
            ],
            [
              ">",
              "SCALERANK",
              8
            ]
          ]
          },
          {
              "id": "world-cities-major",
              "type": "symbol",
              "source": "geobuffer",
              "source-layer": "12016",
              "paint": {
                "text-color": "rgba(0, 0, 0, 0.7)",
                "text-halo-color": "rgba(255, 255, 255, 0.8)",
                "text-halo-width": 1,
                "icon-opacity": 0.5,
                "text-halo-blur": 1
              },
              "layout": {
                "icon-image": "major_city",
                "text-field": "{NAME}",
                "text-offset": [
                  0,
                  1.2
                ],
                "text-size": {
                  "stops": [
                    [
                      4,
                      11
                    ],
                    [
                      22,
                      25
                    ]
                  ]
                }
              },
              "minzoom": 4,
              "maxzoom": 22,
              "filter": [
                "all",
                [
                  ">",
                  "SCALERANK",
                  9
                ]
              ]
          },
          {
              "id": "world-cities-capital",
              "type": "symbol",
              "source": "geobuffer",
              "source-layer": "1038",
              "paint": {
                "text-color": "rgba(0, 0, 0, 1)",
                "text-halo-color": "rgba(255, 255, 255, 0.8)",
                "text-halo-width": 1,
                "text-halo-blur": 1
              },
              "layout": {
                "icon-image": "capital_city",
                "text-field": "{CAPITAL}",
                "text-offset": [
                  0,
                  1.4
                ],
                "text-size": {
                  "stops": [
                    [
                      3,
                      10
                    ],
                    [
                      12,
                      25
                    ]
                  ]
                }
              },
              "minzoom": 3,
              "maxzoom": 22
          },
          {
              'id': 'boundaries',
              'type': 'line',
              'source': 'geobuffer',
              'source-layer': '27996',
              'paint': {
                  'line-color': 'rgba(100, 100, 100, 0.5)',
                  'line-width': 1,
                  'line-blur': 1
              },
              'filter': ['!in', 'ID', ...processedIDs]
          },
          {
              'id': 'labels',
              'type': 'symbol',
              'source': 'geobuffer',
              'source-layer': '27996p',
              'paint': {
                  'text-color': 'rgba(0, 0, 0, 0.7)',
                  'text-halo-color': 'rgba(255, 255, 255, 0.8)',
                  'text-halo-width': 1,
                  'text-halo-blur': 1
              },
              'layout': {
                  'text-field': '{Geo_FIPS}',
                  'text-offset': [0, 1.1],
                  'text-size': {
                      'stops': [[4,9],[22,15]]
                  },
              },
              'filter': ['!in', 'ID', ...processedIDs]
          },
    ]
};