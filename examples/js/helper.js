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
  window.trail.odometer = parseInt(trailOdometer, 10);
  
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
    if (cur[2] < window.trail.minElev) {
      window.trail.minElev = cur[2];
    }
    // Max elevation
    if (cur[2] > window.trail.maxElev) {
      window.trail.maxElev = cur[2];
    }
    // Max slope
    if (cur[6] > window.trail.maxSlope && cur[6] < 100) {
      window.trail.maxSlope = cur[6];
    }
    prevPoint = JSON.parse(JSON.stringify(curPoint));
    // Elev gain and loss
    if (i == trail.geometry.coordinates.length - 1) {
      window.trail.elevGain = parseInt(cur[4], 10);
      window.trail.elevLoss = parseInt(cur[5], 10);
    }   
  }

  var waypoints = getLinePoints(featuresCollection);

  for (var i = 0; i < waypoints.length; i++) {
    var parsed = waypoints[i].properties.desc.replace(/(\r\n|\n|\r)/gm,'').split('#');
    waypoints[i].properties.odometer = parseFloat(parsed[0].replace(',','.'));
    waypoints[i].properties.pictogram = parsed[1];
    waypoints[i].properties.desc = parsed[2];
    waypoints[i].properties.elevation = waypoints[i].geometry.coordinates[2];
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

  for (var i = 0; i < newWaypoints.length; i++) {
    newWaypoints[i].id = i;
  }

  var newCollection = turf.featureCollection([trail].concat(newWaypoints));

  return newCollection;
}

// MAP

function addSources(map) {
  map.addSource('rasterTiles', {
      type: 'raster',
      url: 'mapbox://mapbox.satellite',
      tileSize: 256,
  });

  map.addSource('mineTiles', {
      type: 'vector',
      url: 'mapbox://mersadpasic.bdixpo9t',
  });

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
}

function addLayers(map) {
  map.addLayer({
      id: 'satelliteLayer',
      type: 'raster',
      source: 'rasterTiles',
      paint: {
          'raster-saturation': 0.5,
      },
      layout: {
          visibility: 'none',
      },
      minzoom: 0,
      maxzoom: 22,
  }, 'contour-line-index');

  map.addLayer({
      id: 'minesLayer',
      type: 'fill',
      source: 'mineTiles',
      'source-layer': 'BHMACmine_sistematskoizvidjanje',
      paint: {
          'fill-color': '#ff0000',
          'fill-opacity': 0.3,
      },
      layout: {
          visibility: 'none',
      },
      minzoom: 7,
      maxzoom: 22,
  }, 'contour-line-index');
  
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
  });

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
  });
  
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

function addControls(map) {
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map.addControl(new mapboxgl.FullscreenControl());
  map.addControl(new UserMapControl());
  map.addControl(new mapboxgl.ScaleControl({
      maxWidth: 150,
      unit: 'metric',
  }));
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

function goHome(map) {
  console.log(mapCenter);
}

function UserMapControl() {}

UserMapControl.prototype.onAdd = function(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
    
    this._button1 = document.createElement('button');
    this._button1.className = 'mapboxgl-ctrl-icon satellite';
    this._button1.title = 'Satelitski snimak';
    this._button1.addEventListener('click', function() {
      toggleLayer('satelliteLayer');
      reorderLayers();
    });
    this._container.appendChild(this._button1);
    
    this._button2 = document.createElement('button');
    this._button2.className = 'mapboxgl-ctrl-icon danger';
    this._button2.title = 'Minska situacija';
    this._button2.addEventListener('click', function() {
      toggleLayer('minesLayer');
      reorderLayers();
    });
    this._container.appendChild(this._button2);

    this._button3 = document.createElement('button');
    this._button3.className = 'mapboxgl-ctrl-icon home';
    this._button3.title = 'Pocetna pozicija';
    this._button3.addEventListener('click', function() {
      window.map.fitBounds(window.trail.bbox);
    });
    this._container.appendChild(this._button3);

    return this._container;
};

UserMapControl.prototype.onRemove = function () {
     this._container.parentNode.removeChild(this._container);
     this._map = undefined;
};

function toggleLayer(layer) {
  window.trail[layer] = !window.trail[layer];
  if (window.trail[layer]) {
    if (layer === 'minesLayer') {
      alert('Aktivirate mapu sumnjivih povrsina po evidenciji Centra za uklanjanje mina u Bih (BH MAC) sa stanjem iz mjeseca 06/2016. Ova karta je sa samo informativnog karaktera i ne garantuje nepostojanje i drugih sumnjivih povrsina! MTB.ba se u potpunosti ogradjuje od odgovornosti za istinitost prikazanih podataka!');
    }
    window.map.setLayoutProperty(layer, 'visibility', 'visible');
  } else {
    window.map.setLayoutProperty(layer, 'visibility', 'none');
  }
}

function reorderLayers() {
  if (window.trail.satelliteLayer) {
    window.map.moveLayer('satelliteLayer');
    window.map.moveLayer('minesLayer');
    window.map.moveLayer('trail-line-outline');
    window.map.moveLayer('trail-line');
    window.map.moveLayer('waypoints-outline-red');
    window.map.moveLayer('waypoints-outline-white');
  } else {
    window.map.moveLayer('satelliteLayer', 'contour-line-index');
    window.map.moveLayer('minesLayer', 'contour-line-index');
    window.map.moveLayer('trail-line-outline', 'housenum-label');
    window.map.moveLayer('trail-line', 'housenum-label');
    window.map.moveLayer('waypoints-outline-red', 'housenum-label');
    window.map.moveLayer('waypoints-outline-white', 'housenum-label');
  }
  window.map.moveLayer('current-position');
  window.map.moveLayer('waypoints');
}

// POPUP

function addPopups(map, popup) {
  map.on('click', 'waypoints', function(e) {
      map.getCanvas().style.cursor = 'pointer';
      new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(renderWaypoint4Popup(e.features[0]))
          .addTo(map);
  });

  map.on('mouseenter', 'waypoints', function(e) {
      map.getCanvas().style.cursor = 'pointer';
      popup.setLngLat(e.features[0].geometry.coordinates)
          .setHTML(renderWaypoint4Popup(e.features[0]))
          .addTo(map);
  });

  map.on('mouseleave', 'waypoints', function() {
      map.getCanvas().style.cursor = '';
      popup.remove();
  });
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
        // text: window.trail.trailName,
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

  var surface = window.trail.surface.split('-');
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
  if (window.trail.activeLanguage == 'bos') {
    document.querySelectorAll('.description-text-container')[0].innerHTML = window.trail.descEng;
    document.getElementById('language-switcher').text = 'B/H/S verzija'; 
    window.trail.activeLanguage = 'eng';
  } else {
    document.querySelectorAll('.description-text-container')[0].innerHTML = window.trail.descBos;
    document.getElementById('language-switcher').text = 'English version'; 
    window.trail.activeLanguage = 'bos';
  } 
}

function downloadGPX() {
  var dlink = document.createElement('a');
  dlink.href = window.trail.gpxExport;
  dlink.click();
  dlink.remove();
}

function renderlayout(featureCollection) {
  // site title
  document.getElementsByTagName('title')[0].innerHTML = window.trail.trailName + ' - MTB.ba staze';
  // title
  document.querySelectorAll('.trail-name-text')[0].innerHTML = window.trail.trailName + ' (' + window.trail.trailMountains + ')';
  // info panel
  document.getElementById('value-odometer').innerHTML = parseInt(window.trail.odometer, 10) + ' km';
  document.getElementById('value-category').innerHTML = window.trail.trailCategory;
  document.getElementById('value-elevgain').innerHTML = parseInt(window.trail.elevGain, 10) + ' m';
  document.getElementById('value-elevloss').innerHTML = parseInt(window.trail.elevLoss, 10) + ' m';
  document.getElementById('value-difficulty').innerHTML = window.trail.techDiff + '/10';
  document.getElementById('value-slope').innerHTML = parseInt(window.trail.maxSlope, 10) + '%';
  document.getElementById('value-maxelev').innerHTML = parseInt(window.trail.maxElev, 10) + ' mnv';
  document.getElementById('value-minelev').innerHTML = parseInt(window.trail.minElev, 10) + ' mnv';
  // description
  document.querySelectorAll('.description-text-container')[0].innerHTML = window.trail.descBos;

  renderWaypoints(featureCollection);
}

function renderWaypoints(featuresCollection) {
  var waypoints = getLinePoints(featuresCollection);
  var container = document.querySelectorAll('.waypoints-container')[0];
  var content = '';
  var waypoints = getLinePoints(featuresCollection);
  for (var i = 0; i < waypoints.length; i++) {
    content = content + renderWaypoint(waypoints[i]);
  }
  container.innerHTML = content;
}

function renderWaypoint(w) {
  var newCoordinates = JSON.stringify([w.geometry.coordinates[0], w.geometry.coordinates[1]]);
  return '<div class="waypoint-container" onclick="zoomToCoordinate(' + newCoordinates + ')">' +
  '<div class="waypoint-header">' +
  '<div class="waypoint-header-info">' +
  '<div class="waypoint-header-iterator">' + (w.id + 1) + '</div>' +
  '<div class="waypoint-header-odometer">' + w.properties.odometer + ' km</div>' +
  '<div class="waypoint-header-elevation">' + w.properties.elevation + ' mnv</div>' +
  '</div>' +
  '<div class="waypoint-header-pictogram" style="background-image: url(\'http://www.mtb.ba/wp-content/themes/mtbba-v2/functions/user/raskrsnice/a-ras.php?opis=' + w.properties.pictogram + '\')"></div>' +
  '</div>' +
  '<div class="waypoint-trailname">' + w.properties.name + '</div>' +
  '<div class="waypoint-description">' + w.properties.desc + '</div>' +
  '</div>';
}

function renderWaypoint4Popup(w) {
  var newCoordinates = JSON.stringify([w.geometry.coordinates[0], w.geometry.coordinates[1]]);
  return '<div class="waypoint-container" onclick="zoomToCoordinate(' + newCoordinates + ')">' +
  '<div class="waypoint-trailname">' + w.properties.name + '</div>' +
  '<div class="waypoint-header">' +
  '<div class="waypoint-header-info">' +
  '<div class="waypoint-header-odometer">' + w.properties.odometer + ' km</div>' +
  '<div class="waypoint-header-elevation">' + w.properties.elevation + ' mnv</div>' +
  '</div>' +
  '<div class="waypoint-header-pictogram" style="background-image: url(\'http://www.mtb.ba/wp-content/themes/mtbba-v2/functions/user/raskrsnice/a-ras.php?opis=' + w.properties.pictogram + '\')"></div>' +
  '</div>' +
  '<div class="waypoint-description">' + w.properties.desc + '</div>' +
  '</div>';
}