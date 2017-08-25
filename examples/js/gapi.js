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

function findStore(w) {
  console.log(w.properties.name);
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
  $.ajax(setup.endpoint + setup.coordinates + '&radius=' + setup.lvl[0].radius + '&type=' + setup.lvl[0].type + '&key=' + setup.key).done(response => {
    if (response.status == 'OK') {
      response.results.forEach(r => {
        // debugger;
        setup.replacement.push(r.name);
      });
    }
    console.log(setup.w.properties.name + ' - nearby: ' + JSON.stringify(setup.replacement));
  });
}
