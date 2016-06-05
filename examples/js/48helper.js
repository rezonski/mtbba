function generateDesc(wp) {
  var returnDesc = JSON.stringify(wp);
  returnDesc = getElementByKey(pointtypesArray,'symbol_code','CROSSROAD','desc');
  
  if (wp.next !== undefined && wp.next !== null) {
    
    var directionText = getElementByKey(pointtypesArray,'symbol_code', wp.current.symbol,'desc') + ' "' + wp.current.name + '". Nastaviti ';
    var otherDirections = ' Sporedni putevi: ';
    var waterSupplyText = ' Izvor vode: ';
    var forbiddenDirectionText = ' Zabranjen smjer: ';

    var pictogramArray = wp.current.pictogram.split('-');

    pictogramArray.forEach(function(element, index) {
      if (index === 0) {
        directionText += parseDirection(element) + ' drzeci se glavnog puta.';
      } else if (element.toLowerCase().indexOf('v') > -1) {
        waterSupplyText += parseDirection(element.toLowerCase().replace('v','')) + ', ';
      } else if (element.toLowerCase().indexOf('z') > -1) {
        forbiddenDirectionText += parseDirection(element.toLowerCase().replace('v','')) + ', ';
      } else {
        otherDirections += parseDirection(element) + ', ';
      }
    });

    if (waterSupplyText.length > (' Izvor vode: ').length) {
      waterSupplyText = waterSupplyText.substring(0, (waterSupplyText.length - 2)) + '.';
    } else {
      waterSupplyText = '';
    }

    if (forbiddenDirectionText.length > (' Zabranjen smjer: ').length) {
      forbiddenDirectionText = forbiddenDirectionText.substring(0, (forbiddenDirectionText.length - 2)) + '.';
    } else {
      forbiddenDirectionText = '';
    }

    if (otherDirections.length > (' Sporedni putevi: ').length) {
      otherDirections = otherDirections.substring(0, (otherDirections.length - 2)) + '.';
    } else {
      otherDirections = '';
    }

    directionText += otherDirections + forbiddenDirectionText  + waterSupplyText;

    directionText += ' Slijedi sekcija duzine ' + wp.current.nextstepdist + ' km'; 
    if (wp.current.nextelevgain > 0) {
      directionText += ' sa ' + wp.current.nextelevgain +  ' m visinskog uspona'; 
    }
    if (Math.abs(wp.current.nextelevloss) > 0) {
      directionText += ' i ' + Math.abs(wp.current.nextelevloss) + ' m visinskog spusta';
    }
    
    directionText += parseSurfaceTransition(wp.current.odometer, wp.next.odometer, sastavArray);

    directionText += '. Sljedeca kontrolna tacka je ' + getElementByKey(pointtypesArray,'symbol_code', wp.next.symbol,'desc')/*.toLowerCase()*/ + ' "' + wp.next.name + '" (' + wp.next.odometer + ' km od starta na ' + wp.next.elevation + ' mnv).';

    returnDesc = directionText;
    
  } else {
    returnDesc = 'Stigli ste na odrediste';
  }


  return returnDesc;
}

function parseDirection(position) {
    var returnText = '';
    switch (parseInt(position,10)) {
      case 0:
        returnText = 'desno';
        break;
      case 45:
        returnText = 'polu-desno';
        break;
      case 90:
        returnText = 'pravo';
        break;
      case 135:
        returnText = 'polu-lijevo';
        break;
      case 180:
        returnText = 'lijevo';
        break;
      case 225:
        returnText = 'ostro/natrag lijevo';
        break;
      case 270:
        returnText = 'natrag istim putem';
        break;
      case 315:
        returnText = 'ostro/natrag desno';
        break;
      default:
        returnText = 'pravo';
    }
    return returnText;
}

function parseSurfaceTransition(odoStart, odoEnd, surfaceArray) {
  var surface = surfaceArray;
  surface.unshift([0,"A"]);
  var startSurfaceIndex = null;
  var endSurfaceIndex = null;
  var output = ' sa promjenama podloge: ';

  for (var i = 0; i < surface.length; i++) {
    if (surface[i][0] <= odoStart && surface[i+1] !== undefined && surface[i+1][0] >= odoStart) {
      startSurfaceIndex = i;
      i = surface.length;
    }
  }

  startSurfaceIndex = (startSurfaceIndex === null) ?  (surface.length - 1) : startSurfaceIndex;

  for (var j = 0; j < surface.length; j++) {
    if (surface[j][0] <= odoEnd 
          && ((surface[j+1] !== undefined && surface[j+1][0]  >= odoEnd) || (surface[j+1] === undefined))) {
      endSurfaceIndex = j;
      j = surface.length;
    }
  }
  
  endSurfaceIndex = (endSurfaceIndex === null) ?  (surface.length - 1) : endSurfaceIndex;

  if (startSurfaceIndex < endSurfaceIndex) {
    for (var z = startSurfaceIndex; z <= endSurfaceIndex; z++) {
      if (z === startSurfaceIndex) {
        output += getSegmentDesc(surface[z][1]);
      } else {
        output += ' -> ' + getSegmentDesc(surface[z][1]) + '(' + surface[z][0] + 'km)';
      }
    }
  } else {
    output = ' bez promjene podloge (' + getSegmentDesc(surface[startSurfaceIndex][1]) + ')';
  }
  return output;
}

function getElementByKey(inputArray, keyName, keyValue, getKeyName) {
  for (var i=0; i<inputArray.length; i++) {
    if (inputArray[i][keyName] == keyValue) {
      return inputArray[i][getKeyName];
    }
  }
}

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
  var returnVal = 'CROSSROAD';
  var found = false;
  var desc = (inputDesc !== undefined && inputDesc.length > 0) ? inputDesc.toLowerCase() : '';
  var pictogram = (inputPictogram !== undefined && inputPictogram.length > 0) ? inputPictogram.toLowerCase() : '';
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

  // SELO
  if (!found && ( desc.indexOf('selo ') === 0 || 
                  name.indexOf('selo ') === 0 || 
                  desc.indexOf('zaseok ') === 0 || 
                  name.indexOf('zaseok ') === 0)) {
    found = true;
    returnVal = 'VILLAGE';
  }

  // LOKALITET
  if (!found && ( desc.indexOf('lokalitet ') === 0 ||
                  name.indexOf('lokalitet ') === 0 ||
                  desc.indexOf('lokacija ') === 0 ||
                  name.indexOf('lokacija ') === 0)) {
    found = true;
    returnVal = 'LOCATION';
  }

  // GRAD
  if (!found && ( desc.indexOf('grad ') === 0 || 
                  name.indexOf('grad ') === 0 )) {
    found = true;
    returnVal = 'CITY';
  }


  // MOST
  if (!found && ( desc.indexOf('most ') === 0 || 
                  name.indexOf('most ') === 0 || 
                  desc.indexOf('splav ') === 0 || 
                  name.indexOf('splav ') === 0 || 
                  desc.indexOf('rijeka ') === 0 || 
                  name.indexOf('rijeka ') === 0 || 
                  desc.indexOf('potok ') === 0 || 
                  name.indexOf('potok ') === 0 )) {
    found = true;
    returnVal = 'RIVER';
  }

  // START
  if (!found && ( desc.indexOf('start ') === 0 || 
                  name.indexOf('start ') === 0 || 
                  desc.indexOf('pocetak ture ') === 0 || 
                  name.indexOf('pocetak ture ') === 0 || 
                  desc.indexOf('pocetak staze ') === 0 || 
                  name.indexOf('pocetak staze ') === 0 )) {
    found = true;
    returnVal = 'TRAILSTART';
  }

  // KRAJ
  if (!found && ( desc.indexOf('end ') === 0 || 
                  name.indexOf('end ') === 0 || 
                  desc.indexOf('kraj ture ') === 0 || 
                  name.indexOf('kraj ture ') === 0 || 
                  desc.indexOf('kraj staze ') === 0 || 
                  name.indexOf('kraj staze ') === 0)) {
    found = true;
    returnVal = 'TRAILEND';
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

    var segmentColor = {
      rgb: '',
      hex: ''
    };

    if (segmentName === 'M') {
        segmentColor.rgb = 'rgba(255,128,0,0.5)'; // narandzasta
        segmentColor.hex = '#ff6600'; // narandzasta
    } else if (segmentName === 'S') {
        segmentColor.rgb = 'rgba(255,128,0,0.5)'; // narandzasta
        segmentColor.hex = '#cc3300'; // crvena
    } else if (segmentName === 'N') {
        segmentColor.rgb = 'rgba(0,0,0,0.6)'; // crno
        segmentColor.hex = '#000000'; // crno
    } else {
        segmentColor.rgb = 'rgba(150,150,150,0.5)'; // asfalt, sivo
        segmentColor.hex = '#999999'; // asfalt, sivo
    }

    return segmentColor;
}

function getSegmentDesc(segmentName) {
    
    // console.log('getSegmentColor for ' + segmentName);

    var segmentDesc;

    if (segmentName === 'M') {
        segmentDesc = 'makadam'; // narandzasta
    } else if (segmentName === 'S') {
        segmentDesc = 'staza'; // crvena
    } else if (segmentName === 'N') {
        segmentDesc = 'nevozljivo'; // crno
    } else {
        segmentDesc = 'asfalt'; // asfalt, sivo
    }

    return segmentDesc;
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
