var endpoint = 'https://maps.googleapis.com/maps/api/place/';
var key = 'AIzaSyDRi_-A_op267m9UYOEVWFJ_L17Gq5Klis';
var service = 'autocomplete/json?input=';

function getLevel(setup, indexLvl) {
  
  const requestURL = endpoint + service + searchString  + '&key=' + setup.key;
  
  console.info(requestURL);
  $.ajax(requestURL).done(response => {
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