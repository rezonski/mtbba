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

function save2json() {
  console.log(window.stores);
  const xmlhttpUpload = new XMLHttpRequest();
  xmlhttpUpload.onreadystatechange = () => {
      if (xmlhttpUpload.readyState === 4 && xmlhttpUpload.status === 200) {
          console.log(xmlhttpUpload.responseText);
      }
  };
  xmlhttpUpload.open('POST', 'setStores.php', true);
  xmlhttpUpload.send(JSON.stringify(window.stores));
}

function loadJson() {
  $.getJSON('data/stores.geojson', storesData => {
      window.stores = storesData;
      if (!window.stores.deletedIDs) {
        window.stores.deletedIDs = [];
      }
      if (!window.stores.confirmedIDs) {
        window.stores.confirmedIDs = [];
      }
      $.getJSON('data/resellers.geojson', resellersData => {
          window.resellers = resellersData;
          displayStores();
      });
  });
}

function initLocalStorage() {
  loadJson();
  // if (localStorage.getItem('stores')) {
  //     loadJson();
  // } else {
  //     reGenerateStores();
  // }
}

function displayStores() {
  if (window.map.getSource('highlighted')) {
    window.map.getSource('highlighted').setData({
      type: 'FeatureCollection',
      features: []
    });
  } else {
    window.map.addSource('highlighted',{
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    window.map.addLayer({
      'id': 'highlighted',
      'type': 'circle',
      'source': 'highlighted',
      'paint': {
          'circle-radius': 20,
          'circle-color': '#E6FF08'
      }
    });
  }
  
  ['resellers','stores'].forEach(t => {
    if (window.map.getSource(t)) {
      window.map.getSource(t).setData(window[t]);
    } else {
      window.map.addSource(t, {
        'type': 'geojson',
        'data': window[t]
      });
      window.map.addLayer({
        'id': t,
        'type': 'symbol',
        'source': t,
        'paint': {
            'text-halo-color': '#fff',
            'text-halo-width': 2,
            'text-halo-blur': 2,
            'text-color': '#F00'
        },
        'layout': {
            'icon-image': 'circle-15',
            // 'icon-allow-overlap': true,
            'text-field': '{name}',
            // 'text-anchor': 'left',
            'text-max-width': 8,
            'text-offset': [0, 1.5],
            'text-size': {
                'base': 1,
                'stops': [[4,0],[5,1],[7,13]]
            }
        }
      });
    }
  });
}

function reGenerateStores() {
  // console.log('Reset global variable');
  // window.stores = {
  //   type: "FeatureCollection",
  //   allIDs: [],
  //   features: []
  // };
  // window.resellers = {
  //   type: "FeatureCollection",
  //   allIDs: [],
  //   features: []
  // };
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
        service: 'nearbysearch/json?type=bicycle_store&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=intersport&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=juventa+sport&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=decathlon&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=bajk+garaza&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=beosport&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=cyclomania&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=freestyle+pancevo&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=jankovic+comp&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=neptun+bike&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=nomad&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=sportofis&radius=25000&location=',
        prefix: ''
      },
      {
        service: 'autocomplete/json?input=totalbike&radius=25000&location=',
        prefix: ''
      },
    ],
    replacement: []
  };
  getLevel(setup, 0);
}


function getLevel(setup, indexLvl) {
  // console.info('getLevel(setup, ' + indexLvl + ')');
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
  // console.info('generateDetailedPoints(setup, ' + placeIndex + ')');
  const id = window[setup.type].allIDs[placeIndex];
  if (window[setup.type].processedIDs.indexOf(id) == -1) {
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
  } else {
    console.info('generateDetailedPoints - SKIP processed ' + id + ')');
    generateDetailedPoints(setup, placeIndex + 1);
  }
}

function getPlacePhotos(setup, newStore, refs, index, placeIndex) {
  // console.info('getPlacePhotos(setup, newStore, refs, ' + index + ', ' + placeIndex + ')');
  if (refs.length == index) {
    window[setup.type].features.push(newStore);
    window[setup.type].processedIDs.push(newStore.properties.id);
    generateDetailedPoints(setup, placeIndex + 1);
  } else {
    $.ajax(setup.localUpload + refs[index] + '&fileName=' + newStore.properties.id + index + '&key=' + setup.key).done(photoResponse => {
      const resp =JSON.parse(photoResponse);
      if (resp.success) {
        console.log('getPlacePhotos - ' + resp.msg);
        newStore.properties.photos.push(resp.url);
      }
      getPlacePhotos(setup, newStore, refs, index + 1, placeIndex);
    });
  }
}

// WP CONTROLS

function check(e) {
    switch (e.keyCode) {
      case 37:
        console.log('Go previous');
        if (window.currentWPindex > 0) {
          window.currentWPindex -= 1;
        } else {
          window.currentWPindex = parseInt(window.stores.allIDs.length - 1,10);
        }
        go2wp();
        break;
      case 39:
        console.log('Go next');
        if (window.currentWPindex < window.stores.allIDs.length - 1) {
          window.currentWPindex += 1;
        } else {
          window.currentWPindex = 0;
        }
        go2wp();
        break;
      case 46:
        console.log('Delete');
        deleteCurrentWP();
        window.currentWPindex += 1;
        go2wp();
        break;
      case 67:
        console.log('Confirm');
        confirmCurrentWP();
        window.currentWPindex += 1;
        go2wp();
        break;
      case 87:
        console.log('Open URL');
        openUrl();
        break;
      default:
        console.log('Unknown command');
    }
}

function go2wp() {
  const wp = window.stores.features[window.currentWPindex];
  const currentID = window.stores.allIDs[window.currentWPindex];
  
  var additionalStyle = '';
  if (window.stores.deletedIDs.indexOf(currentID) > -1) {
    additionalStyle = ' deleted';
  } else if (window.stores.confirmedIDs.indexOf(currentID) > -1) {
    additionalStyle = ' confirmed';
  }

  renderWPdetails(wp, additionalStyle);
  window.map.getSource('highlighted').setData({
    "type": "FeatureCollection",
    "features": [wp]
  });
  window.map.flyTo({
      center: wp.geometry.coordinates,
      zoom: 15
  });
}

function openUrl() {
  const website = window.stores.features[window.currentWPindex].properties.website;
  if (website.length > 3) {
    window.open(website, '_blank');
  } else {
    alert('NO website');
  }
}

function deleteCurrentWP() {
  console.log('Delete ' + window.stores.allIDs[window.currentWPindex]);
  window.stores.deletedIDs.push(window.stores.allIDs[window.currentWPindex]);
}

function confirmCurrentWP() {
  console.log('Confirm ' + window.stores.allIDs[window.currentWPindex]);
  window.stores.confirmedIDs.push(window.stores.allIDs[window.currentWPindex]);
}

function renderWPdetails(w, additionalStyle) {
  var content = '';
  Object.keys(w.properties).forEach(p => {
    const prop = w.properties[p];
    if (p == 'photos') {
      content += `<div class='piccontainer'>`;
      prop.forEach(pic => {
        content += `<div class='pointimg' style='background-image: url("${pic}")'></div>`;
      });
      content += `</div>`;
    } else if (p != 'openingHours' && p != 'reviews' && p != 'openingHours') {
      content += `<div class='pointrow${additionalStyle}'><strong>${p}</strong>: ${prop}</div>`;
    }
  });
  document.getElementById('pointdetails').innerHTML = content;
}