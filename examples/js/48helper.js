function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function symbolFromDesc(inputDesc, inputPictogram, inputName) {
  var returnVal = 'CROSS';
  var found = false;
  var desc = inputDesc.toLowerCase();
  var pictogram = inputPictogram.toLowerCase();
  var name = inputName.toLowerCase();

  // VODA
  if (!found && ( pictogram.indexOf('v') > -1 ||
                  desc.indexOf('voda ') === 0 || 
                  name.indexOf('voda ') === 0 || 
                  desc.indexOf('izvor vode ') === 0 || 
                  name.indexOf('izvor vode ') === 0 || 
                  desc.indexOf('cesma ') === 0 || 
                  name.indexOf('cesma ') === 0 )) {
    found = true;
    returnVal = 'WATER';
  }

  // MJESTO
  if (!found && ( desc.indexOf('selo ') === 0 || 
                  name.indexOf('selo ') === 0 || 
                  desc.indexOf('zaseok ') === 0 || 
                  name.indexOf('zaseok ') === 0 || 
                  desc.indexOf('lokalitet ') === 0 ||
                  name.indexOf('lokalitet ') === 0 ||
                  desc.indexOf('grad ') === 0 ||
                  name.indexOf('grad ') === 0 )) {
    found = true;
    returnVal = 'PLACE';
  }

  // START
  if (!found && ( desc.indexOf('start ') === 0 || 
                  name.indexOf('start ') === 0 || 
                  desc.indexOf('pocetak ture ') === 0 || 
                  name.indexOf('pocetak ture ') === 0 || 
                  desc.indexOf('pocetak staze ') === 0 || 
                  name.indexOf('pocetak staze ') === 0)) {
    found = true;
    returnVal = 'START';
  }

  // KRAJ
  if (!found && ( desc.indexOf('end ') === 0 || 
                  name.indexOf('end ') === 0 || 
                  desc.indexOf('kraj ture ') === 0 || 
                  name.indexOf('kraj ture ') === 0 || 
                  desc.indexOf('kraj staze ') === 0 || 
                  name.indexOf('kraj staze ') === 0)) {
    found = true;
    returnVal = 'END';
  }

  // HRANA
  if (!found && ( desc.indexOf('restoran ') === 0 || 
                  name.indexOf('restoran ') === 0 || 
                  desc.indexOf('planinarski dom ') === 0 || 
                  name.indexOf('planinarski dom ') === 0 || 
                  desc.indexOf('pd ') === 0 || 
                  name.indexOf('pd ') === 0 || 
                  desc.indexOf('pd.') === 0 || 
                  name.indexOf('pd.') === 0)) {
    found = true;
    returnVal = 'FOOD';
  }

  // PREVOJ
  if (!found && ( desc.indexOf('prevoj ') === 0 || 
                  name.indexOf('prevoj ') === 0 || 
                  desc.indexOf('planinski prevoj ') === 0 || 
                  name.indexOf('planinski prevoj ') === 0)) {
    found = true;
    returnVal = 'PASS';
  }

  // VRH
  if (!found && ( desc.indexOf('vrh ') === 0 || 
                  name.indexOf('vrh ') === 0 || 
                  desc.indexOf('najvisa tacka ') === 0 || 
                  name.indexOf('najvisa tacka ') === 0)) {
    found = true;
    returnVal = 'SUMMIT';
  }
  

  // OPREZ
  if (!found && ( desc.indexOf('opasnost') === 0 || 
                  name.indexOf('opasnost') === 0 || 
                  desc.indexOf('oprez') === 0 || 
                  name.indexOf('oprez') === 0 || 
                  desc.indexOf('upozorenje') === 0 || 
                  name.indexOf('upozorenje') === 0)) {
    found = true;
    returnVal = 'DANGER';
  }

  // MINE
  if (!found && ( desc.indexOf('mine ') === 0 || 
                  name.indexOf('mine ') > -1 || 
                  desc.indexOf(' minsko ') > -1 || 
                  name.indexOf(' minsko ') > -1 || 
                  desc.indexOf(' mina ') > -1 || 
                  name.indexOf(' mina ') > -1 || 
                  desc.indexOf(' nus ') > -1 || 
                  name.indexOf(' nus ') > -1)) {
    found = true;
    returnVal = 'MINES';
  }

  // FOTO
  if (!found && ( desc.indexOf('vidikovac') === 0 ||
                  name.indexOf('vidikovac') === 0 || 
                  desc.indexOf('foto') === 0 || 
                  name.indexOf('foto') === 0 || 
                  desc.indexOf(' za fotografiju ') > -1 || 
                  name.indexOf(' za fotografiju ') > -1 || 
                  desc.indexOf(' za foto ') > -1 || 
                  name.indexOf(' za foto ') > -1)) {
    found = true;
    returnVal = 'PHOTO';
  }

  // PRENOCISTE
  if (!found && ( desc.indexOf('hotel') === 0 || 
                  name.indexOf('hotel') === 0 || 
                  desc.indexOf('motel') === 0 || 
                  name.indexOf('motel') === 0 || 
                  desc.indexOf('prenociste') === 0 ||
                  name.indexOf('prenociste') === 0 ||
                  desc.indexOf('apartman') === 0 ||
                  name.indexOf('apartman') === 0 ||
                  desc.indexOf('pansion') === 0 ||
                  name.indexOf('pansion') === 0)) {
    found = true;
    returnVal = 'SLEEP';
  }

  return returnVal;

}


function getDistance(first, second) {
  
    var lon1 = first[0];
    var lat1 = first[1];
    var lon2 = second[0];
    var lat2 = second[1];

    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function getDistanceFromLatLonInKm(lon1,lat1,lon2,lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getDistancePositionXaxis(distance, odometer) {
     var returnVal = 0;
     odometer.forEach(function(point, index){
        if (distance < point && distance >= odometer[index-1]) {
            returnVal = index;
        }
     });
     return returnVal;
}

function getSegmentColor(segmentName) {
    
    // console.log('getSegmentColor for ' + segmentName);

    var segmentColor;

    if (segmentName === 'M') {
        segmentColor = 'rgba(255,128,0,0.5)'; // narandzasta
    } else if (segmentName === 'S') {
        segmentColor = 'rgba(255,0,0,0.5)'; // crvena
    } else if (segmentName === 'N') {
        segmentColor = 'rgba(0,0,0,0.6)'; // crno
    } else {
        segmentColor = 'rgba(150,150,150,0.5)'; // asfalt, sivo
    }

    return segmentColor;
}


function getSegmentName(odometar, sastavArray) {
    
    // console.log('getSegmentName for ' + odometar);

    var segmentName = 'A';

    // console.log(sastavArray);

    if (sastavArray !== undefined && sastavArray.length > 0) {
      sastavArray.forEach(function(cutpoint){
         if (odometar > cutpoint[0]) {
              segmentName = cutpoint[1];
         } 
      });
    }

    return segmentName;

}
