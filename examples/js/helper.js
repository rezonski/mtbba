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
    // Min elevation
    if (cur[2] < window.globalno.minElev) {
      window.globalno.minElev = cur[2];
    }
    // Max elevation
    if (cur[2] > window.globalno.maxElev) {
      window.globalno.maxElev = cur[2];
    }
    // Max slope
    if (cur[6] > window.globalno.maxSlope) {
      window.globalno.maxSlope = cur[6];
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

  var newWaypoints = JSON.parse(JSON.stringify(waypoints)).sort(function (a, b) {
      var x = a.properties.odometer;
      var y = b.properties.odometer;
      if (x > y) {
        return 1;
      } else if (x < y) {
        return -1;
      }
      return 0;
  });

  var newCollection = turf.featureCollection([trail].concat(newWaypoints));

  // console.log('unsorted');
  // console.log(waypoints);
  // console.log('sorted');
  // console.log(newWaypoints);

  return newCollection;
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

function zoomCurrentPositionOnMap(map, featuresCollection, index) {
  var trail = getTrailLine(featuresCollection);
  var newCoordinates = [trail.geometry.coordinates[index][0], trail.geometry.coordinates[index][1]];
  zoomToCoordinate(newCoordinates);
}

function zoomToCoordinate(coordinate) {
  map.flyTo({
    center: coordinate,
    zoom: 15,
    speed: 0.5
  });
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
        color: '#C00',
        dashStyle: 'dot',
        label: { 
            text: waypoints[i].properties.name,
            style: {
              color: '#C00',
              fontSize: '10px',
            },
            rotation: -45,
            align: 'right',
            y: 7,
            x: -3
        }
    });
  }

  Highcharts.chart('elevation-profile', {
    chart: {
        type: 'areaspline',
        backgroundColor: null,
        pinchType: 'x',
        zoomType: 'x',
        spacing: [15, 10, 5, 10],
        style: {
            fontFamily: 'Roboto,sans-serif'
        }
    },
    title: {
        // text: window.globalno.trailName,
        text: '',
        style: {
          color: '#60899a',
          fontSize: '14px',
          fontWeight: 'bold'
        }
    },
    exporting: {
      enabled: false,
    },
    legend: {
      enabled: false
    },
    xAxis: {
        type: 'integer',
        title: {
            // text: 'Predjeni put [km]',
            text: '',
            style: {
              color: '#60899a',
            }
        },
        labels: {
            style: {
              color: '#60899a',
            }
        },
        plotLines: plotlines,
    },
    yAxis: {
        title: {
            text: 'Nadmorska visina [m]',
            offset: 50,
            style: {
              color: '#60899a',
            }
        },
        labels: {
            style: {
              color: '#60899a',
            }
        },
        gridLineColor: '#60899a',
        // gridLineColor: '#60899a',
        // minorGridLineColor: '#60899a',
        // minorTickColor: '#60899a',
        // minColor: '#60899a',
        // maxColor: '#60899a',
        // lineColor: '#60899a',
        // tickColor: '#60899a',
        sofMin: 0,
        softMax: 2000
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
            fillOpacity: 0.2,
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
                    },
                    click: function () {
                        zoomCurrentPositionOnMap(map, featuresCollection, this.index);
                    }
                }
            }
        }
    },
    series: [{
        name: 'Nadmorska visina',
        turboThreshold: 4000,
        color: '#CC0000',
        data: dataset
    }]
  });

  var surface = window.globalno.surface.split('-');
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
            backgroundColor: null,
            plotShadow: false,
            type: 'pie',
            width: 300,
            height: 200,
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
              fontSize: '10px',
              color: '#FFF'
          }
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f} %</b>'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                colors: ['#A7A7A7','#CDCB2E','#CDAD2E','#CD492E','#881717']
            }
        },
        series: [{
            name: 'Podloga',
            colorByPoint: true,
            data: surfaceData
        }]
    });
}

// LAYOUT

function menuClicked(index) {
  for (var i = 0; i < document.querySelectorAll('.content-item').length; i++) {
    document.querySelectorAll('.content-item')[i].classList.remove('content-active');
    document.querySelectorAll('.menu-item')[i].classList.remove('menu-item-active');
  }
  document.querySelectorAll('.content-item')[index].classList.add('content-active');  
  document.querySelectorAll('.menu-item')[index].classList.add('menu-item-active');  
}

function toogleDescriptionLanguage() {
  if (window.globalno.activeLanguage == 'bos') {
    document.getElementById('description-bos').classList.remove('content-active'); 
    document.getElementById('description-eng').classList.add('content-active'); 
    document.getElementById('language-switcher').text = 'B/H/S verzija'; 
    window.globalno.activeLanguage = 'eng';
  } else {
    document.getElementById('description-eng').classList.remove('content-active'); 
    document.getElementById('description-bos').classList.add('content-active'); 
    document.getElementById('language-switcher').text = 'English version'; 
    window.globalno.activeLanguage = 'bos';
  } 
}

function renderlayout(featureCollection) {
  renderWaypoints(featureCollection);
}

function renderWaypoints(featuresCollection) {
  var waypoints = getLinePoints(featuresCollection);
  var container = document.querySelectorAll('.waypoints-container')[0];
  var content = '';
  var waypoints = getLinePoints(featuresCollection);
  for (var i = 0; i < waypoints.length; i++) {
    var w = waypoints[i];
    var newCoordinates = JSON.stringify([w.geometry.coordinates[0], w.geometry.coordinates[1]]);
    var addition = '<div class="waypoint-container" onclick="zoomToCoordinate(' + newCoordinates + ')">' +
    '<div class="waypoint-header">' +
    '<div class="waypoint-header-info">' +
    '<div class="waypoint-header-iterator">' + (i + 1) + '</div>' +
    '<div class="waypoint-header-odometer">' + w.properties.odometer + ' km</div>' +
    '<div class="waypoint-header-elevation">' + w.geometry.coordinates[2] + ' mnv</div>' +
    '</div>' +
    '<div class="waypoint-header-pictogram" style="background-image: url(\'http://www.mtb.ba/wp-content/themes/mtbba-v2/functions/user/raskrsnice/a-ras.php?opis=' + w.properties.pictogram + '\')"></div>' +
    '</div>' +
    '<div class="waypoint-trailname">' + w.properties.name + '</div>' +
    '<div class="waypoint-description">' + w.properties.desc + '</div>' +
    '</div>';
    content = content + addition;
  }
  container.innerHTML = content;
}