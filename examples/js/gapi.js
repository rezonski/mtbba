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
  const content2save = turf.featureCollection(window.stores.features);
  console.log(content2save);
  const xmlhttpUpload = new XMLHttpRequest();
  xmlhttpUpload.onreadystatechange = () => {
      if (xmlhttpUpload.readyState === 4 && xmlhttpUpload.status === 200) {
          console.log(xmlhttpUpload.responseText);
      }
  };
  xmlhttpUpload.open('POST', 'setStores.php', true);
  xmlhttpUpload.send(JSON.stringify(content2save));
}

function loadJson() {
  $.getJSON('data/stores.geojson', storesData => {
      window.setup = {
        stores: {
          deletedIDs: [],
          confirmedIDs: [],
          newIDs: [],
          allIDs: [],
          photoDelete: [],
        },
        resellers: {
          deletedIDs: [],
          confirmedIDs: [],
          newIDs: [],
          allIDs: [],
        }
      };
      window.stores = storesData;
      window.stores.features.forEach(f => {
        if (f.properties.status == 'D') {
          window.setup.stores.deletedIDs.push(f.properties.id);
        } else if (f.properties.status == 'C') {
          window.setup.stores.confirmedIDs.push(f.properties.id);
        } else {
          if (!f.properties.status) {
            f.properties.status = 'N';
          }
          window.setup.stores.newIDs.push(f.properties.id);
        }
        window.setup.stores.allIDs.push(f.properties.id);
      })
      $.getJSON('data/resellers.geojson', resellersData => {
          window.resellers = resellersData;
          displayStores();
      });
  });
}

function initLocalStorage() {
  loadJson();
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
        },
        'filter': (window.params.show == 'A') ? ['has', 'status'] : ['==', 'status', window.params.show]
      });
    }
  });
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
    // localUpload: 'http://127.0.0.1:8080/sandbox/examples/getGooglePlacePhoto.php?photoReference=',
    localUpload: 'http://localhost/sandbox/examples/getGooglePlacePhoto.php?photoReference=',
    coordinates: w.geometry.coordinates[1] + ',' +  w.geometry.coordinates[0],
    endpoint: 'https://maps.googleapis.com/maps/api/place/',
    key: 'AIzaSyDRi_-A_op267m9UYOEVWFJ_L17Gq5Klis',
    lvl: [
      // {
      //   service: 'nearbysearch/json?type=bicycle_store&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=intersport&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=juventa+sport&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=decathlon&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=bajk+garaza&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=beosport&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=cyclomania&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=freestyle+pancevo&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=jankovic+comp&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=neptun+bike&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=nomad&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=sportofis&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=totalbike&radius=25000&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=rent+a+bike&radius=25000&location=',
      //   StoreServiceRent: [0,0,1]
      // },
      // {
      //   service: 'autocomplete/json?input=rent+bicikl&radius=25000&location=',
      //   StoreServiceRent: [0,0,1]
      // },
      // {
      //   service: 'autocomplete/json?input=iznajmljivanje+bicikla+bicikala&radius=25000&location=',
      //   StoreServiceRent: [0,0,1]
      // },
      // {
      //   service: 'autocomplete/json?input=nextbike&radius=25000&location=',
      //   StoreServiceRent: [0,0,1]
      // },
      // {
      //   service: 'autocomplete/json?input=bike+servis&radius=25000&location=',
      //   StoreServiceRent: [0,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=servis+bicikala&radius=25000&location=',
      //   StoreServiceRent: [0,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=servis+bicikla&radius=25000&location=',
      //   StoreServiceRent: [0,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=dsg+bjelovar&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=planet+bike+beograd&location=',
      //   StoreServiceRent: [1,1,1]
      // },
      // {
      //   service: 'autocomplete/json?input=planet+bike+nis&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=planet+bike+novi+sad&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=planet+bike+cacak&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=planet+bike+kopaonik&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=planet+bike+stara+planina&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=tempo+podgorica&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=simicvike+arandjelovac&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=bike+mv+sport+kragujevac&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=masterbike+kraljevo&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=power+bike+leskovac&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=bike+igic+pirot&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=cadenze+novi+pazar&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Aleksandrovac+Tip-Top&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Arilje+Luković&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Bačka+Palanka+Proma+2002&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kruševac+Bicikl&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Negotin+T-Bike&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Novi+Pazar+Cadence&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Priboj+Profibike&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Sombor+Meksiko&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Sremska+Mitrovica+Bicikl+centar+Radulović&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Trstenik+Profy+Bike&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Užice+Milivoja-Bike&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Valjevo+Kolnago&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Vranje+Makado&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Vršac+Zlatni+točak&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Zrenjanin+Polar+Bike&location=',
      //   StoreServiceRent: [1,1,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Arilje+Profi+Bike&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Bečej+Gama+ML&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Beograd-Vračar+Pro+Bike&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Beograd-Čukarica+Sportofis&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kikinda+Sebastian&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kikinda+Apollo+Bike&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kragujevac+Bike+MV+Sport&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kragujevac+Metal&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kragujevac+Kole&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kraljevo+Johana+S+Gagi&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kraljevo+Masterbike&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kraljevo+Metalac&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Loznica+Vladimir+Tursunović&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Mokrin+Tušta&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Niš+Digor+Sport-Bajk+Garaža&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Novi+Sad+Ris+Cycling&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Novi+Sad+Vector&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Novi+Sad+Invicta&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Pančevo+Freestyle&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Požarevac+Staco&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Požega+Gojković&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Palić+Mega+Favorit&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Senta+Tehnoguma&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Sombor+Meksiko&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Šabac+Tandem+Kid&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Veternik+Bicikl+Centar+Bleša&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Vršac+Zlatni+Točak&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Zemun+Bozaro&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Sombor+Meksiko&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Šabac+Tandem+Kid&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Temerin+Panter-Sport&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Veternik+Bicikl+Centar+Bleša&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Vršac+Zlatni+Točak&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Zemun+Bozaro&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Zemun+Migo&location=',
      //   StoreServiceRent: [1,0,0]
      // },
      // {
      //   service: 'autocomplete/json?input=Kikinda+Appolo=',
      //   StoreServiceRent: [1,0,0]
      // },
      {
        service: 'autocomplete/json?input=keindl=',
        StoreServiceRent: [1,0,0]
      }
    ],
    replacement: []
  };
  getLevel(setup, 0);
}

function getLevel(setup, indexLvl) {
  // console.info('getLevel(setup, ' + indexLvl + ')');
  $.ajax(setup.endpoint + setup.lvl[indexLvl].service + setup.coordinates  + '&key=' + setup.key).done(response => {
    window.setup[setup.type].isStore = parseInt(setup.lvl[indexLvl].StoreServiceRent[0],10);
    window.setup[setup.type].isService = parseInt(setup.lvl[indexLvl].StoreServiceRent[1],10);
    window.setup[setup.type].isRent = parseInt(setup.lvl[indexLvl].StoreServiceRent[2],10);
    if (response.status == 'OK') {
      const res = (response.results) ? response.results : response.predictions;
      res.forEach(r => {
        if (window.setup[setup.type].allIDs.indexOf(r['place_id']) == -1 && window.setup[setup.type].newIDs.indexOf(r['place_id']) == -1) {
          window.setup[setup.type].newIDs.push(r['place_id']); 
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
  const id = window.setup[setup.type].newIDs[placeIndex];
  if (window.setup[setup.type].allIDs.indexOf(id) == -1) {
    $.ajax('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=' + setup.key).done(detailResponse => {
      if (detailResponse.status == 'OK') {
        const det = detailResponse.result;
        const photoRefs = (det.photos) ? det.photos.map(p => {
          return p['photo_reference'];
        }) : [];
        // debugger;
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
            status: 'N',
            isStore: window.setup[setup.type].isStore,
            isService: window.setup[setup.type].isService,
            isRent: window.setup[setup.type].isRent,
            photos: []
          });
          if (turf.inside(newStore, bboxPoly)) {
            getPlacePhotos(setup, newStore, photoRefs, 0, placeIndex);
          } else {
            console.info('generateDetailedPoints - place ' + det.name + ' outside boundaries');
            generateDetailedPoints(setup, placeIndex + 1);
          }
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
    // window.setup[setup.type].allIDs.push(newStore.properties.id);
    // window.setup[setup.type].newIDs.push(newStore.properties.id);
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
function shouldDisplayWPidx(code) {
  if (
      (window.params.show == 'A' && window.setup.stores.allIDs && window.setup.stores.allIDs.length > 0) ||
      (window.params.show == 'N' && window.setup.stores.newIDs && window.setup.stores.newIDs.length > 0) ||
      (window.params.show == 'C' && window.setup.stores.confirmedIDs && window.setup.stores.confirmedIDs.length > 0) ||
      (window.params.show == 'D' && window.setup.stores.deletedIDs && window.setup.stores.deletedIDs.length > 0)
    ) {
    const wp = window.stores.features[window.currentWPindex];
    if (window.params.show == 'A' || window.params.show == wp.properties.status) {
      go2wp();
    } else {
      // console.log('Can not display ' + wp.properties.status + ' store ' + wp.properties.name + ' (' + wp.properties.id + ')');
      checkCode(code);
    }
  }
}

function checkEvent(e) {
  checkCode(e.keyCode);
}

function checkCode(code) {
    switch (code) {
      case 37:
        // console.log('Go previous');
        if (window.currentWPindex > 0) {
          window.currentWPindex -= 1;
        } else {
          window.currentWPindex = parseInt(window.setup.stores.allIDs.length - 1,10);
        }
        shouldDisplayWPidx(code);
        break;
      case 39:
        // console.log('Go next');
        if (window.currentWPindex < window.setup.stores.allIDs.length - 1) {
          window.currentWPindex += 1;
        } else {
          window.currentWPindex = 0;
        }
        shouldDisplayWPidx(code);
        break;
      case 46:
        // console.log('Delete');
        deleteCurrentWP();
        checkCode(39);
        break;
      case 67:
        // console.log('Confirm');
        confirmCurrentWP();
        checkCode(39);
        break;
      case 87:
        // console.log('Open URL');
        openUrl();
        break;
      default:
        // console.log('Unknown command');
    }
}

function go2wp() {
  const wp = window.stores.features[window.currentWPindex];
  const currentID = window.setup.stores.allIDs[window.currentWPindex];
  
  var additionalStyle = '';
  if (wp.properties.status == 'D') {
    additionalStyle = ' deleted';
  } else if (wp.properties.status == 'C') {
    additionalStyle = ' confirmed';
  } else if (wp.properties.status == 'N') {
    additionalStyle = ' new';
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
  if(window.setup.stores.deletedIDs.indexOf(window.setup.stores.allIDs[window.currentWPindex]) == -1) {
    // console.log('Delete ' + window.setup.stores.allIDs[window.currentWPindex]);
    window.setup.stores.deletedIDs.push(window.setup.stores.allIDs[window.currentWPindex]);
    window.stores.features[window.currentWPindex].properties.status = 'D';
  }
}

function confirmCurrentWP() {
  if(window.setup.stores.confirmedIDs.indexOf(window.setup.stores.allIDs[window.currentWPindex]) == -1) {
    // console.log('Confirm ' + window.setup.stores.allIDs[window.currentWPindex]);
    window.setup.stores.confirmedIDs.push(window.setup.stores.allIDs[window.currentWPindex]);
    window.stores.features[window.currentWPindex].properties.status = 'C';
  }
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


function exportStores() {
  var exportData = [['id', 'name', 'city', 'website']];
  window.stores.features.forEach(f => {
    if (window.setup.stores.confirmedIDs.indexOf(f.properties.id) > -1) {
      exportData.push([f.properties.id, f.properties.name, f.properties.city, f.properties.website]);
    }
  });
  window.open(encodeURI(`data:text/csv,${exportData.map((row, index) =>  row.join(',')).join(`\n`)}`));
}

function updateAllPoints() {
  // debugger;
  window.stores.features.forEach(f => {
    // adjustStatus(f);
    if (f.properties.type) {
      delete f.properties.type;
    }
    deleteOutsider(f);
    // setRental(f);
    prepare4delete(f);
  });
}

function adjustStatus(f) {
  if (window.setup.stores.confirmedIDs.indexOf(f.properties.id) > -1) {
    f.properties.status = 'C';
  } else if (window.setup.stores.deletedIDs.indexOf(f.properties.id) > -1) {
    f.properties.status = 'D';
  } else {
    f.properties.status = 'N';
  }
  // f.properties.isStore = 1;
  // f.properties.isRent = 0;
  // f.properties.isService = 0;
}

function deleteOutsider(f) {
  if (f.properties.status == 'N') {
    if (!turf.inside(f, bboxPoly)) {
      f.properties.status = 'D';
      window.setup.stores.deletedIDs.push(f.properties.id)
    }
  }
}

function setRental(f) {
  if (f.properties.status == 'N') {
    f.properties.isRent = 1;
    f.properties.isStore = 0;
    f.properties.isService = 0;
  }
}

function prepare4delete(f) {
  if (f.properties.status == 'D') {
    // debugger;
    window.setup.stores.photoDelete = window.setup.stores.photoDelete.concat(f.properties.photos);
  }
}

function photoCleaner(index) {
  const photos = window.setup.stores.photoDelete;
  if (photos[index]) {
    // $.ajax('http://127.0.0.1:8080/sandbox/examples/deleteGooglePlacePhoto.php?fileName=' + photos[index]).done(photoDelete => {
    $.ajax('http://localhost/sandbox/examples/deleteGooglePlacePhoto.php?fileName=' + photos[index]).done(photoDelete => {
      const resp =JSON.parse(photoDelete);
      if (resp.success) {
        console.log('photoCleaner - ' + resp.msg);
      }
      photoCleaner(index + 1)
    });
  }
}