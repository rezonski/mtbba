
function enrichWP(w) {
  const setup = {
    w: w,
    type: 'wp',
    coordinates: w.geometry.coordinates[1] + ',' +  w.geometry.coordinates[0],
    endpoint: 'https://maps.googleapis.com/maps/api/place/',
    key: 'AIzaSyDRi_-A_op267m9UYOEVWFJ_L17Gq5Klis',
    lvl: [
      {
        service: 'nearbysearch/json?type=locality&radius=1000&location=',
        prefix: 'Selo ',
      },
      {
        service: 'nearbysearch/json?type=geocode&radius=200&location=',
        prefix: 'Lokacija ',
      },
      {
        service: 'nearbysearch/json?type=natural_feature&radius=200&location=',
        prefix: '',
      },
      {
        service: 'nearbysearch/json?type=route&radius=200&location=',
        prefix: 'Put ',
      }
    ],
    replacement: []
  };
  getLevel(setup, 0);
}


function initLocalStorage() {
  if (localStorage.getItem('stores')) {
      window.stores = JSON.parse(localStorage.getItem('stores'));
      displayStores();
  } else {
      reGenerateStores();
  }
}

function displayStores() {
  if (window.map.getSource('stores')) {
    window.map.getSource('stores').setData(window.stores);
  } else {
    window.map.addSource('stores', {
      'type': 'geojson',
      'data': window.stores
    });
    window.map.addLayer({
      'id': 'stores',
      'type': 'symbol',
      'source': 'stores',
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
}

function reGenerateStores() {
  console.log('Reset global variable');
  window.stores = {
    type: "FeatureCollection",
    allIDs: [],
    features: []
  };
  generateStores();
}

function generateStores() {
  var wps = getLinePoints(dataJSON);
  findStores(wps, 0);
}

function findStores(wps, index) {
  console.info('findStores(wps[' + wps.length + '], ' + index + ')');
  const w = wps[index];
  const setup = {
    w: w,
    wps: wps,
    total: wps.length, 
    index: index,
    type: 'stores',
    localUpload: 'http://localhost/sandbox/examples/getGooglePlacePhoto.php?photoReference=',
    coordinates: w.geometry.coordinates[1] + ',' +  w.geometry.coordinates[0],
    endpoint: 'https://maps.googleapis.com/maps/api/place/',
    key: 'AIzaSyDRi_-A_op267m9UYOEVWFJ_L17Gq5Klis',
    lvl: [
      {
        service: 'nearbysearch/json?type=bicycle_store&radius=15000&location=',
        prefix: ''
      },
      // {
      //   service: 'autocomplete/json?input=intersport&radius=15000&location=',
      //   prefix: ''
      // },
    ],
    replacement: []
  };
  getLevel(setup, 0);

}

function getLevel(setup, indexLvl) {
  console.info('getLevel(setup, ' + indexLvl + ')');
  $.ajax(setup.endpoint + setup.lvl[indexLvl].service + setup.coordinates  + '&key=' + setup.key).done(response => {
    if (response.status == 'OK') {
      const res = (response.results) ? response.results : response.predictions;
      res.forEach(r => {
        if (window[setup.type].allIDs.indexOf(r['place_id']) == -1) {
          window[setup.type].allIDs.push(r['place_id']); 
        }
      });
    }
    if (indexLvl == (setup.lvl.length - 1)) {
      if (setup.type == 'stores') {
          if (setup.total == (setup.index + 1)) {
            generateDetailedPoints(setup, 0);
            displayStores();
            console.log(window.stores);
            localStorage.setItem('stores', JSON.stringify(window.stores));
            console.info('Saved to local storage');
          } else {
            findStores(setup.wps, setup.index + 1);
          }
      }
    } else {
      getLevel(setup, indexLvl + 1);
    }
  });
}

function generateDetailedPoints(setup, placeIndex) {
  console.info('generateDetailedPoints(setup, ' + placeIndex + ')');
  const id = window[setup.type].allIDs[placeIndex];
  $.ajax('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=' + setup.key).done(detailResponse => {
    if (detailResponse.status == 'OK') {
      const det = detailResponse.result;
      const photoRefs = (det.photos) ? det.photos.map(p => {
        return p['photo_reference'];
      }) : [];
      if (!det.geometry.location) {
        console.log('Invalid det.geometry.location');
      } else {
        const newStore = turf.point([det.geometry.location.lng, det.geometry.location.lat], {
          id: id,
          name: det.name,
          phoneNum: det['international_phone_number'],
          address: det['formatted_address'],
          city: det['vicinity'].split(',').pop().replace(' ',''),
          openingHours: (det['opening_hours']) ? det['opening_hours'].periods : [],
          rating: (det.rating) ? det.rating : 0,
          reviews: (det.reviews) ? det.reviews : [],
          website: (det.website) ? det.website : '',
          photos: []
        });
        getPlacePhotos(setup, newStore, photoRefs, 0, placeIndex);
      }
    }
  });
}

function getPlacePhotos(setup, newStore, refs, index, placeIndex) {
  console.info('getPlacePhotos(setup, newStore, refs, ' + index + ', ' + placeIndex + ')');
  if (refs.length == index) {
    window.stores.features.push(newStore);
    generateDetailedPoints(setup, placeIndex + 1);
  } else {
    $.ajax(setup.localUpload + refs[index] + '&fileName=' + newStore.properties.id + index + '&key=' + setup.key).done(photoResponse => {
      const resp =JSON.parse(photoResponse);
      if (resp.success) {
        newStore.properties.photos.push(resp.url);
      }
      getPlacePhotos(setup, newStore, refs, index + 1, placeIndex);
    });
  }
}
