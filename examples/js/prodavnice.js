function loadJson() {
  $.getJSON('data/stores.geojson', storesData => {
      window.stores = storesData;
      $.getJSON('data/resellers.geojson', resellersData => {
          window.resellers = resellersData;
          generateGlobalVariables();
      });
  });
}

function generateGlobalVariables() {
  window.brandsStores = {};
  window.citiesStores = {};
  window.vendorStores = {};
  //
  window.stores.features.forEach(store => {
    if (store.properties.bikeBrands) {
      store.properties.bikeBrands.forEach(bikeBrand => {
        if(!window.brandsStores[bikeBrand]) {
          window.brandsStores[bikeBrand] = [store.properties.id];
        } else {
          window.brandsStores[bikeBrand].push(store.properties.id);
        }
      });
    }
    if (store.properties.eqBrands) {
      store.properties.eqBrands.forEach(eqBrand => {
        if(!window.brandsStores[eqBrand]) {
          window.brandsStores[eqBrand] = [store.properties.id];
        } else {
          window.brandsStores[eqBrand].push(store.properties.id);
        }
      });
    }
    if (store.properties.eqBrands) {
      store.properties.vendors.forEach(vendor => {
        if(!window.vendorStores[vendor]) {
          window.vendorStores[vendor] = [store.properties.id];
        } else {
          window.vendorStores[vendor].push(store.properties.id);
        }
      });
    }
    if(!window.citiesStores[store.properties.city]) {
      window.citiesStores[store.properties.city] = [store.properties.id];
    } else {
      window.citiesStores[store.properties.city].push(store.properties.id);
    }
  });
}

function startLoadingProcess() {
  preloadIcons(0);
}

var iconset = ['rent1','rent2','rent3','store1','store2','store3','service1','service2','service3'];

function preloadIcons(idx) {
  if (iconset[idx]) {
    window.map.loadImage('pics/' + iconset[idx] + '.png', (error, image) => {
      if (error) throw error;
      window.map.addImage(iconset[idx], image);
      preloadIcons(idx + 1);
    });
  } else {
    displayMapLayers();
    setSearchBox();
  }
}

function displayMapLayers() {
  ['stores'].forEach(t => {
    if (window.map.getSource(t)) {
      window.map.getSource(t).setData(window[t]);
    } else {
      window.map.addSource(t, {
        'type': 'geojson',
        'data': window[t],
        'cluster': true,
        'clusterMaxZoom': 12, // Max zoom to cluster points on
        'clusterRadius': 40 // Radius of each cluster when clustering points (defaults to 50)
      });
      window.map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: t,
          filter: ['has', 'point_count'],
          paint: {
              'circle-color': {
                  property: 'point_count',
                  type: 'interval',
                  stops: [
                      [0, '#EEEE5A'],
                      [3, '#EED65A'],
                      [5, '#EEAB5A'],
                      [15, '#EE815A'],
                      [20, '#CE5E40'],
                      [25, '#D02931'],
                  ]
              },
              'circle-radius': {
                  property: 'point_count',
                  type: 'interval',
                  stops: [
                      [0, 10],
                      [3, 15],
                      [5, 20],
                      [15, 25],
                      [20, 30],
                      [25, 35],
                  ]
              },
              // 'circle-stroke-width': 1,
              // 'circle-stroke-color': '#A43D42'
          }
      });
      window.map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: t,
          filter: ['has', 'point_count'],
          layout: {
              'text-field': '{point_count_abbreviated}',
              'text-size': 12
          }
      });
      window.map.addLayer({
        'id': t + '-rent',
        'type': 'symbol',
        'source': t,
        'paint': {
            'text-halo-color': '#F6FF00',
            'text-halo-width': 1,
            'text-halo-blur': 1,
            'text-color': '#000'
        },
        'layout': {
            'icon-image': 'rent3',
            'text-field': '{name}',
            'text-max-width': 8,
            'text-offset': [0, 2],
            'text-size': {
                'base': 1,
                'stops': [[4,0],[5,1],[7,13]]
            }
        },
        'filter': ['all', ['==', 'isRent', 1]]
      });
      window.map.addLayer({
        'id': t + '-service',
        'type': 'symbol',
        'source': t,
        'paint': {
            'text-halo-color': '#A6F67A',
            'text-halo-width': 1,
            'text-halo-blur': 1,
            'text-color': '#000'
        },
        'layout': {
            'icon-image': 'service1',
            // 'icon-allow-overlap': true,
            'text-field': '{name}',
            // 'text-anchor': 'left',
            'text-max-width': 8,
            'text-offset': [0, 2],
            'text-size': {
                'base': 1,
                'stops': [[4,0],[5,1],[7,13]]
            }
        },
        'filter': ['all', ['==', 'isService', 1]]
      });
      window.map.addLayer({
        'id': t + '-bikestore',
        'type': 'symbol',
        'source': t,
        'paint': {
            'text-halo-color': '#F9FDA3',
            'text-halo-width': 1,
            'text-halo-blur': 1,
            'text-color': '#000'
        },
        'layout': {
            'icon-image': 'store1',
            'text-field': '{name}',
            'text-max-width': 8,
            'text-offset': [0, 2],
            'text-size': {
                'base': 1,
                'stops': [[4,0],[5,1],[7,13]]
            }
        },
        'filter': ['all', ['==', 'isStore', 1]]
      });
      initMapListeners();
    }
  });
}

function initMapListeners() {
  window.map.on('mousemove', function (e) {
      var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
      const features = window.map.queryRenderedFeatures(bbox, { layers: ['stores-rent','stores-service','stores-bikestore'] });
      if (features.length > 0) {
        console.log(features.length);
      }
  });
  window.map.on('click', function (e) {
      var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
      const features = window.map.queryRenderedFeatures(bbox, { layers: ['stores-rent','stores-service','stores-bikestore'] });
      if (features.length > 0) {
        console.log(features[0].properties);
      }
  });
}

// UI

function addControls(map) {
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map.addControl(new mapboxgl.FullscreenControl());
  // map.addControl(new UserMapControl());
  map.addControl(new mapboxgl.ScaleControl({
      maxWidth: 150,
      unit: 'metric',
  }));
}

function setSearchBox() {
  const listOfBrands = Object.keys(window.brandsStores);
  const listOfCities = Object.keys(window.citiesStores);
  const listOfVendors = Object.keys(window.vendorStores);
  $( "#brands" ).autocomplete({
    source: listOfBrands
  });
  $( "#cities" ).autocomplete({
    source: listOfCities
  });
  $( "#vendors" ).autocomplete({
    source: listOfVendors
  });
}