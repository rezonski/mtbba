// var importCSV = 'data/World-detail-polygons---for-historical-maps-creation.csv';
// var importCSV = 'data/years/1914.csv';
var importCSV = 'data/years/year_1914_version_2017.12.1.17.13.csv';
var processedIDs = [];
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
                    'layerId': '27138',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ID',
                                'Geo_FIPS',
                                'Geo_QName',
                            ]
                        }
                    ]
                },
                {
                    'layerId': '27138p',
                    'datasets': [
                        {
                            'datasetId': 0,
                            'columns': [
                                'ID',
                                'Geo_FIPS',
                                'Geo_QName',
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
            'source-layer': '27138',
            'paint': {
                'fill-color': 'rgba(0,0,0,0.1)'
            }
        },
        {
            'id': 'hovered',
            'type': 'fill',
            'source': 'geobuffer',
            'source-layer': '27138',
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
            'source-layer': '27138',
            'paint': {
                'fill-color': '#FF00B4',
                'fill-opacity': 0.5
            },
            'filter': ['in', 'ID', 0]
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
            'source-layer': '27138',
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
            'source-layer': '27138p',
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
            }
        },
    ]
};