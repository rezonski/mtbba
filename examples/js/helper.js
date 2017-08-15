function getTrailLine(featuresCollection) {
    return getLineStrings(featuresCollection)[0];
}

function getLineStrings(featuresCollection) {
    return getFeature(featuresCollection, 'LineString');
}

function getLinePoints(featuresCollection) {
    return getFeature(featuresCollection, 'Point');
}

function getFeature(featuresCollection, featureType) {
    var returnCollection = [];
    if (!featuresCollection.features) {
        return null;
    } else {
        for (var i = 0; i < featuresCollection.features.length; i++) {
            var currentValue = featuresCollection.features[i];
            if (currentValue.geometry.type === featureType) {
                returnCollection.push(currentValue);
            }
        }
    }
    return returnCollection;
}

function parseRaw(featuresCollection) {
  var trail = getTrailLine(featuresCollection);
  var trailOdometer = parseFloat(turf.lineDistance(trail, 'kilometers')).toFixed(1);
  
  var lastCoordinate = trail.geometry.coordinates[getTrailLine(featuresCollection).geometry.coordinates.length - 1];
  var endPoint = turf.point(lastCoordinate, {
    'name': 'Kraj',
    'desc': trailOdometer + '#270#Dosli ste na kraj rute.',
    'sym': 'Flag, Blue'
  });
  featuresCollection.features.push(endPoint);

  var curPoint = {};
  var prevPoint = {};
  
  for (var i = 0; i < trail.geometry.coordinates.length; i++) {
    var cur = trail.geometry.coordinates[i];
    curPoint = turf.point([cur[0], cur[1]]);
    if (i == 0) {
      cur[3] = 0;
      cur[4] = 0;
      cur[5] = 0;
      cur[6] = 0;
    } else {
      var prev = trail.geometry.coordinates[i - 1];
      prevPoint = turf.point([prev[0], prev[1]]);
      // odometer
      var distDelta = turf.distance(prevPoint, curPoint)
      cur[3] = prev[3] + distDelta;
      var elevDelta = cur[2] - prev[2];
      // elevation gain/loss
      if (elevDelta >= 0) {
        cur[4] = prev[4] + elevDelta;
        cur[5] = prev[5];
      } else {
        cur[4] = prev[4];
        cur[5] = prev[5] - elevDelta;
      }
      cur[6] = (elevDelta / (distDelta * 1000)) * 100;
    }
    prevPoint = JSON.parse(JSON.stringify(curPoint));    
  }

  var waypoints = getLinePoints(featuresCollection);
  for (var i = 0; i < waypoints.length; i++) {
    var parsed = waypoints[i].properties.desc.replace(/(\r\n|\n|\r)/gm,'').split('#');
    waypoints[i].properties.odometer = parseFloat(parsed[0].replace(',','.'));
    waypoints[i].properties.pictogram = parsed[1];
    waypoints[i].properties.desc = parsed[2];
  }

  return featuresCollection;
}

// MAP

function addTrailLayers(map) {
  map.addSource('datasource', {
    'type': 'geojson',
    'data': dataJSON
  });

  map.addSource('temp', {
    'type': 'geojson',
    'data': {
        'type': 'FeatureCollection',
        'features': []
      }
  });
  
  map.addLayer({
    'id': 'trail-line-outline',
    'type': 'line',
    'source': 'datasource',
    'paint': {
        'line-color': '#C00',
        'line-width': 6
    }
  }, 'housenum-label');
  
  map.addLayer({
    'id': 'trail-line',
    'type': 'line',
    'source': 'datasource',
    'paint': {
        'line-color': '#FFF',
        'line-width': 3
    }
  }, 'housenum-label');
  
  map.addLayer({
    'id': 'waypoints-outline-red',
    'type': 'circle',
    'source': 'datasource',
    'paint': {
        'circle-radius': {
            'base': 1,
            'stops': [[4,0],[6,2],[12,9]]
        },
        'circle-color': '#C00'
    },
    'filter': ['has', 'desc']
  }, 'housenum-label');

  map.addLayer({
    'id': 'current-position',
    'type': 'circle',
    'source': 'temp',
    'paint': {
        'circle-radius': {
            'base': 1,
            'stops': [[4,0],[6,1],[12,7]]
        },
        'circle-color': '#000'
    }
  }, 'housenum-label');
  
  map.addLayer({
    'id': 'waypoints-outline-white',
    'type': 'circle',
    'source': 'datasource',
    'paint': {
        'circle-radius': {
            'base': 1,
            'stops': [[4,0],[6,0.5],[12,5.5]]
        },
        'circle-color': '#FFF'
    },
    'filter': ['has', 'desc']
  }, 'housenum-label');
  
  map.addLayer({
      'id': 'waypoints',
      'type': 'symbol',
      'source': 'datasource',
      'paint': {
          'text-halo-color': '#fff',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-color': '#F00'
      },
      'layout': {
          'icon-image': 'circle-11',
          // 'icon-allow-overlap': true,
          'text-field': '{name}',
          'text-anchor': 'left',
          'text-offset': [0.8, 0],
          'text-size': {
              'base': 1,
              'stops': [[4,0],[6,1],[12,12]]
          }
      },
      'filter': ['has', 'desc']
  });
}

function showCurrentPositionOnMap(map, featuresCollection, index) {
  var trail = getTrailLine(featuresCollection);
  var newCollection = turf.featureCollection([turf.point([trail.geometry.coordinates[index][0], trail.geometry.coordinates[index][1]])]);
  map.getSource('temp').setData(newCollection);
}

// POPUP

function addPopups(map, popup) {
  map.on('click', 'waypoints', function(e) {
      map.getCanvas().style.cursor = 'pointer';
      new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(generateHTML4popup(e.features[0].properties))
          .addTo(map);
  });

  map.on('mouseenter', 'waypoints', function(e) {
      map.getCanvas().style.cursor = 'pointer';
      popup.setLngLat(e.features[0].geometry.coordinates)
          .setHTML(generateHTML4popup(e.features[0].properties))
          .addTo(map);
  });

  map.on('mouseleave', 'waypoints', function() {
      map.getCanvas().style.cursor = '';
      popup.remove();
  });
}

function generateHTML4popup(o) {
  return '<div class="popup">'
            + '<div class="popup-location-name">' + o.name + '</div>'
            + '<div class="popup-location-odometer">' + o.odometer + ' km od starta</div>'
            + '<div class="popup-location-pictogram"><img src="http://www.mtb.ba/wp-content/themes/mtbba-v2/functions/user/raskrsnice/a-ras.php?opis=' + o.pictogram + '"></div>'
            + '<div class="popup-location-description">Opis: ' + o.desc + '</div>'
        + '</div>';
}

// CHART

function addChart(map, featuresCollection) {
  // LINE
  var dataset = [];
  var pathLine = getTrailLine(featuresCollection).geometry.coordinates;
  for (var i = 0; i < pathLine.length; i++) {
    dataset.push({x: pathLine[i][3], y: pathLine[i][2]});
  }
  // console.log(dataset);

  // WPS
  var plotlines = [];
  var waypoints = getLinePoints(featuresCollection);
  for (var i = 0; i < waypoints.length; i++) {
    plotlines.push({
        value: waypoints[i].properties.odometer,
        width: 1,
        color: '#333',
        dashStyle: 'dot',
        label: { 
            text: waypoints[i].properties.name,
            rotation: -45,
            align: 'right',
            y: -15,
            x: 2
        }
    });
  }

  Highcharts.chart('elevation-profile', {
    chart: {
        type: 'areaspline',
        pinchType: 'x',
        zoomType: 'x'
    },
    title: {
        text: window.importovano.trailName
    },
    legend: {
        enabled: false
    },
    xAxis: {
        type: 'integer',
        title: {
            text: 'Predjeni put [km]'
        },
        plotLines: plotlines,
        // plotBands: [{ // visualize the weekend
        //     from: 4.5,
        //     to: 6.5,
        //     color: 'rgba(68, 170, 213, .2)'
        // }]
    },
    yAxis: {
        title: {
            text: 'Nadmorska visina [m]'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
        min: 0,
        max: 2000
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.x.toFixed(2) + ' km</b><br>' + this.y.toFixed(0) + ' mnv';
        },
        shared: true
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.1,
            connectNulls : true,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        },
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    mouseOver: function () {
                        showCurrentPositionOnMap(map, featuresCollection, this.index);
                    }
                }
            }
        }
    },
    series: [{
        name: 'Nadmorska visina',
        turboThreshold: 4000,
        data: dataset
    }]
  });

  var surface = window.importovano.sastav.split('-');
  var surfaceTypes = ['Asfalt', 'Utaban put', 'Makadam', 'Staza', 'Pl.sekcija'];
  var surfaceData = [];
  for (var i = 0; i < 5; i++) {
    if (surface[i]) {
      surfaceData.push({
        name: surfaceTypes[i],
        y: parseInt(surface[i], 10)
      });
    } else {
      surfaceData.push({
        name: surfaceTypes[i],
        y: 0
      });
    }
  }

  Highcharts.chart('surface-pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 300,
            height: 200
        },
        title: {
            text: ''
        },
        exporting: {
          enabled: false,
        },
        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical',
          itemStyle: {
              fontSize: '10px'
          }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f} %</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Podloga',
            colorByPoint: true,
            data: surfaceData
        }]
    });
}