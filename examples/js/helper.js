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

// MAP

function addTrailLayers(map) {
  map.addSource('datasource', {
    'type': 'geojson',
    'data': dataJSON
  });
  map.addLayer({
    'id': 'trail-line-outline',
    'type': 'line',
    'source': 'datasource',
    'paint': {
        'line-color': '#C00',
        'line-width': 6,
        'line-blur': 2
    }
  }, 'housenum-label');
  map.addLayer({
    'id': 'trail-line',
    'type': 'line',
    'source': 'datasource',
    'paint': {
        'line-color': '#FFF',
        'line-width': 3,
        'line-blur': 1
    }
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
          'icon-image': 'circle-15',
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
  var locationName = o.name;
  var parsed = o.desc.replace(/(\r\n|\n|\r)/gm,'').split('#');
  var odometer = parseFloat(parsed[0].replace(',','.'));
  var pictogram = parsed[1];
  var desc = parsed[2];

  return '<div class="popup-container">'
            + '<div class="popup-location-name">' + locationName + '</div>'
            + '<div class="popup-location-odometer">' + odometer + ' km od starta</div>'
            + '<div class="popup-location-pictogram"><img src="http://www.mtb.ba/wp-content/themes/mtbba-v2/functions/user/raskrsnice/a-ras.php?opis=' + pictogram + '"></div>'
            + '<div class="popup-location-description">Opis: ' + desc + '</div>'
        + '</div>';
}