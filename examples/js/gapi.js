function enrichWP(w) {
  const setup = {
    w: w,
    coordinates: w.geometry.coordinates[1] + ',' +  w.geometry.coordinates[0],
    endpoint: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=',
    key: 'AIzaSyDRi_-A_op267m9UYOEVWFJ_L17Gq5Klis',
    lvl: [
      {
        type: 'locality',
        prefix: 'Selo ',
        radius: 1000,
      },
      {
        type: 'geocode',
        prefix: 'Lokacija ',
        radius: 200,
      },
      {
        type: 'natural_feature',
        prefix: '',
        radius: 200,
      },
      {
        type: 'route',
        prefix: 'Put ',
        radius: 200,
      }
    ],
    replacement: []
  };
  getLevel(setup, 0);
}

function getLevel(setup, index) {
  $.ajax(setup.endpoint + setup.coordinates + '&radius=' + setup.lvl[index].radius + '&type=' + setup.lvl[index].type + '&key=' + setup.key).done(response => {
    if (response.status == 'OK') {
      response.results.forEach(r => {
        const fromPoint = setup.w;
        const toPoint = turf.point([r.geometry.location.lng, r.geometry.location.lat]);
        const distance = turf.distance(fromPoint, toPoint);
        setup.replacement.push(setup.lvl[index].prefix + r.name + ' - ' + distance + 'km');
      });
    }
    if (index == (setup.lvl.length - 1)) {
      console.log(setup.w.properties.name + ' - replace with: ' + JSON.stringify(setup.replacement));
    } else {
      getLevel(setup, index + 1);
    }
  });
}

function findStore(w, total, index) {
  // console.log(w.properties.name);
  const setup = {
    w: w,
    coordinates: w.geometry.coordinates[1] + ',' +  w.geometry.coordinates[0],
    endpoint: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=',
    key: 'AIzaSyDRi_-A_op267m9UYOEVWFJ_L17Gq5Klis',
    lvl: [
      {
        type: 'bicycle_store',
        radius: 15000,
      }
    ],
    replacement: []
  };
  // console.log(setup.endpoint + setup.coordinates + '&radius=' + setup.lvl[0].radius + '&type=' + setup.lvl[0].type + '&key=' + setup.key);
  $.ajax(setup.endpoint + setup.coordinates + '&radius=' + setup.lvl[0].radius + '&type=' + setup.lvl[0].type + '&key=' + setup.key).done(placeResponse => {
    if (placeResponse.status == 'OK') {
      placeResponse.results.forEach(r => {
        if (window.stores.allIDs.indexOf(r['place_id']) == -1) {
          window.stores.allIDs.push(r['place_id']);
          // Get place details
          $.ajax('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + r['place_id'] + '&key=' + setup.key).done(detailResponse => {
            if (detailResponse.status == 'OK') {
              const det = detailResponse.result;
              const newStore = turf.point([r.geometry.location.lng, r.geometry.location.lat], {
                name: det.name,
                phoneNum: det['international_phone_number'],
                address: det['formatted_address'],
                city: det['address_components'][0]['long_name'],
                openingHours: det['opening_hours'].periods,
                rating: det.rating,
                reviews: det.reviews,
                website: det.website,
              });
              window.stores.features.push(newStore);
            }
          });
        }
      });
      if (total == (index + 1)) {
        displayStores();
        localStorage.setItem('stores', JSON.stringify(window.stores));
        console.info('Saved to local storage');
      }
    }
    console.log(setup.w.properties.name + ' - nearby: ' + JSON.stringify(setup.replacement));
  });
}


function generateStores() {
  var wps = getLinePoints(dataJSON);
  wps.forEach((w, wpindex) => {
      findStore(w, wps.length, wpindex);
  })
}

function displayStores() {
  if (window.map.getSource('stores')) {
    window.map.getSource('stores').setData()
  }  

  window.map.addLayer({
    'id': 'stores',
    'type': 'symbol',
    'source': {
      'type': 'geojson',
      'data': window.stores
    },
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
        // 'text-anchor': 'left',
        'text-max-width': 5,
        'text-offset': [0, 1],
        'text-size': {
            'base': 1,
            'stops': [[4,0],[6,1],[12,12]]
        }
    }
  });
}

function initLocalStorage() {
  if (localStorage.getItem('stores')) {
      window.stores = JSON.parse(localStorage.getItem('stores'));
      displayStores();
  } else {
      window.stores = {
        type: "FeatureCollection",
        allIDs: [],
        features: []
      };
      generateStores();
  }
}