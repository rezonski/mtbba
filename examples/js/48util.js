function changeWpointType(wid) {
  console.log('changeWpointType(' + wid + ')');
}

function handleSastav() {

  if (parseFloat(document.getElementById('sastavodometar').value) > -0.1 
    && (document.getElementById('sastavtype').value === 'A' ||
        document.getElementById('sastavtype').value === 'M' || 
        document.getElementById('sastavtype').value === 'S' ||
        document.getElementById('sastavtype').value === 'N')) {
    var currentValue = [parseFloat(document.getElementById('sastavodometar').value),document.getElementById('sastavtype').value];

    var found = false;
    
    sastavArray.forEach(function(combination, index) {
      if (combination[0] == currentValue[0] && combination[1] == currentValue[1]) {
        sastavArray.splice(index,1);
        found = true;
      } else if (combination[0] == parseFloat(document.getElementById('sastavodometar').value)) {
        sastavArray[index][1] = document.getElementById('sastavtype').value;
        found = true;
      }
    });
    
    if (!found) {
      sastavArray.push(currentValue);
    }

  } else {
    alert('Greska u unesenim parametrima');
  }
  sastavArray = sastavArray.sort(sortFunction);
  console.log('sastavArray');
  console.log(sastavArray);
  document.getElementById('sastavtrailatext').value = JSON.stringify(sastavArray);
  document.getElementById('sastavtype').value = '';
}

function selectMnt(mntid) {
  // console.log('before');
  // console.log(tempMountains);
  
  if (document.getElementById('mntcheckbox'+mntid).checked) {
    if (tempMountains.indexOf(mntid) === -1) {
      tempMountains.push(mntid);
    } else {
      console.log('skip inserting ' + mntid + ' into tempMountains');
    }
  } else {
    tempMountains.splice(tempMountains.indexOf(mntid),1);
  }
  console.log('new tempMountains');
  console.log(tempMountains.toString());
}

function selectType(typeId) {
  // console.log('before');
  // console.log(tempTrailType);
  tempTrailType = typeId;
  typesArray.forEach(function(type) {
    document.getElementById('typeradio'+type.id).checked = false;
  })
  document.getElementById('typeradio'+typeId).checked = true;
  // console.log('after');
  console.log('new type: ' + tempTrailType);
}

function makeTrail(parsedObject) {
  var sastavArray = parsedObject.sastav;
  var features = parsedObject.features;
  waypoints = [];
  features.forEach(function(feature){
      
      if (feature.geometry.type === 'LineString') {
          pathLine = feature.geometry.coordinates;
          generalFact = feature.properties;
          if (feature.properties.id != undefined) {
              generalFact.newupdate = 'update';
          } else {
              document.getElementById("popupform").style.display = "block";
              generalFact.newupdate = 'new';
          }

          // console.log('Add linestring');
      } else if (feature.geometry.type === 'Point') {
          waypoints.push(feature);
          // console.log('Add waypoint ' + feature.properties.name);
      }
  });
  fixPathArray();
  fixWaypoints();
  // makeWaypointsEditor(newWaypointsExport);
  // setElevationProfile(pathLine,newWaypointsChart,sastavArray);
}

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) {   
          importedfilename = f.name;
          var contents = e.target.result;
          var dom = (new DOMParser()).parseFromString(contents, 'text/xml');
          if (f.name.toLowerCase().indexOf('.gpx') > 0) {
            makeTrail(toGeoJSON.gpx(dom));
          } else if (f.name.toLowerCase().indexOf('.kml') > 0) {
            makeTrail(toGeoJSON.kml(dom));
          } else {
             alert( "Unsuported file type");
          } 
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
}


function funkcija() {
  console.log('sastavArray');
  console.log(sastavArray);
  console.log('waypoints');
  console.log(waypoints);
  actionSend('waypoints');
}

function funkcija_path() {
  actionSend('path');
} 

function actionSend(type) {
    var destination = undefined;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // var values = $("input").map(function () {
    //     return $(this).val();
    // }).get();
    // var myJsonString = JSON.stringify(values);
    var myJsonString;
    switch (type) {
      case 'waypoints': 
        // myJsonString = JSON.stringify(waypoints);
        myJsonString = JSON.stringify({general: generalFact, waypoints: newWaypointsExport});
        destination = "ajax-test.php";
        document.getElementById('buttonshowelev').disabled = false;
        break;
      case 'path':
        // myJsonString = JSON.stringify({general: generalFact, path: pathLine});
        myJsonString = JSON.stringify({general: generalFact, path: newPathLine});
        destination = "ajax-test1.php";
        document.getElementById('buttonprepwpoints').disabled = false;
        break;
      case 'general':
        
        if (generalFact.newupdate === 'new') {        
            if (document.getElementById('trailname').value.length < 5 ||
                document.getElementById('traildescription').value.length < 50 || 
                tempMountains.length < 1 ||
                sastavArray.length < 1 ||
                tempTrailType === undefined) {
              alert('Enter proper trail properties (name, desc, mountain and type');
            } else {
              generalFact.name = document.getElementById('trailname').value;
              generalFact.description = document.getElementById('traildescription').value.replace(/(?:\r\n|\r|\n)/g, ' ');
              generalFact.idtrailtype = tempTrailType;
              generalFact.idplanine = tempMountains;
              generalFact.sastav = JSON.stringify(sastavArray);
              generalFact.inputfilename = importedfilename;
              myJsonString = JSON.stringify(generalFact);
              destination = "api_general.php";
            }
        } else {
          myJsonString = JSON.stringify(generalFact);
          destination = "api_general.php";
        }
        document.getElementById('buttonsendpath2db').disabled = false;
        break;
      default:
        console.log('wrong type ' + type);
    }

    if (destination !== undefined) {
      xmlhttp.onreadystatechange = respond;
      xmlhttp.open("POST", destination, true);
      xmlhttp.send(myJsonString);
    }
}

function respond() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById('result').value = decodeURI(xmlhttp.responseText);  
        if (1===1 || generalFact.newupdate === 'new') {
          
          if (xmlhttp.responseText.indexOf('NEW_ID_$') > -1) {
            $duzina = xmlhttp.responseText.indexOf('#endTrailId') - (xmlhttp.responseText.indexOf('NEW_ID_$') + 8);
            generalFact.id = parseInt(xmlhttp.responseText.substr((xmlhttp.responseText.indexOf('NEW_ID_$') + 8),$duzina),10);
          }

          if (xmlhttp.responseText.indexOf('NEW_VERSIONID_$') > -1) {
            $duzina = xmlhttp.responseText.indexOf('#endVersionId') - (xmlhttp.responseText.indexOf('NEW_VERSIONID_$') + 15);
            generalFact.versionid = parseInt(xmlhttp.responseText.substr((xmlhttp.responseText.indexOf('NEW_VERSIONID_$') + 15),$duzina),10);
          }

        }
    }
}

function fixPathArray() {
  newPathLine = [];
  var prevLoc = {};
  var currLocOut = {};
  pathLine.forEach(function(location, index) {
    if (index > 0) {
      var elevationCalc = (location[2] === undefined) ? prevLoc.elevation : location[2];
      var currLoc = {
        lon: location[0],
        lat: location[1],
        elevation: elevationCalc,
        prev_dist: getDistanceFromLatLonInKm(prevLoc.lon, prevLoc.lat, location[0], location[1]),
        prev_elev: elevationCalc - prevLoc.elevation
      };
      // console.log('currLoc/prevLoc');
      // console.log(currLoc);
      // console.log(prevLoc);
      newPathLine.push(currLoc);
      currLocOut = JSON.parse(JSON.stringify(currLoc));
    } else {
      var elevationCalc = (location[2] === undefined) ? 0 : location[2];
      var currLoc = {
        lon: location[0],
        lat: location[1],
        elevation: elevationCalc,
        prev_dist: 0,
        prev_elev: 0
      };
      newPathLine.push(currLoc);
      currLocOut = JSON.parse(JSON.stringify(currLoc));
    }
    prevLoc = JSON.parse(JSON.stringify(currLocOut));
  });

  var totaldistance = 0; // in kms
  var totalelevgain = 0; // in kms
  var totalelevloss = 0; // in kms

  for (var i = 0; i < newPathLine.length; i++) {
    totaldistance += newPathLine[i].prev_dist;
    if (newPathLine[i].prev_elev > 0) {
      totalelevgain += newPathLine[i].prev_elev;
    } else {
      totalelevloss += newPathLine[i].prev_elev;
    }
  }

  generalFact.distance = totaldistance;
  generalFact.elevgain = totalelevgain;
  generalFact.elevloss = totalelevloss;

}

function fixWaypoints() {
  
  var newWaypoints = [];

  waypoints.forEach(function(wpoint) {
  
    var tempDistance = 0;
    var tempIndex = -1;
    var tempDesc = '';
    var tempPictogram = '';
    
    newPathLine.forEach(function(ppoint, pindex) {
      var currentDistance = getDistanceFromLatLonInKm(wpoint.geometry.coordinates[0], wpoint.geometry.coordinates[1], ppoint.lon, ppoint.lat);
      if ((currentDistance < tempDistance || tempDistance === 0) && currentDistance > 0 && currentDistance < 0.2) {
        tempDistance = currentDistance;
        tempIndex = pindex;
      }
    });

    var odometar = null;
    var elevationgain = 0;
    var elevationloss = 0;

    if (tempIndex > -1) {
      for (var i = 0; i <= tempIndex; i++) {
          odometar += newPathLine[i].prev_dist;
      }
      odometar = Math.round(odometar*100)/100;
      // console.log(wpoint.properties.name + ' odometar: ' + Math.round(odometar*100)/100);      
      for (var i = 0; i <= tempIndex; i++) {
          if (newPathLine[i].prev_elev > 0) {
            elevationgain += newPathLine[i].prev_elev;
          } else {
            elevationloss += newPathLine[i].prev_elev;
          }
      }
      elevationgain = Math.round(elevationgain*100)/100;
      elevationloss = Math.round(elevationloss*100)/100;
  
      console.log(wpoint.properties.name + ' odometar: ' + Math.round(odometar*100)/100 + ' elevation gain ' + elevationgain + ' loss ' + elevationloss);

      if (wpoint.properties.desc.indexOf('#')  > -1 ) {
        var tempDescArray = wpoint.properties.desc.replace("#\n\n","#\n").replace("#\n\n","#\n").replace("#\n","#").replace("#\n","#").split("#");
        tempDesc = tempDescArray[2];
        tempPictogram = tempDescArray[1];
      } else {
        tempDesc = wpoint.properties.desc;
        tempPictogram = (wpoint.properties.pictogram != undefined) ? wpoint.properties.pictogram : '90';
      }

      newWaypoints.push({
        id: 0,
        time: (wpoint.properties.time !== undefined) ? wpoint.properties.time : null,
        // name: encodeURIComponent(wpoint.properties.name),
        // desc: encodeURIComponent(tempDesc),
        name: wpoint.properties.name,
        desc: tempDesc,
        lon: wpoint.geometry.coordinates[0],
        lat: wpoint.geometry.coordinates[1],
        elevation: Math.round(newPathLine[tempIndex].elevation), 
        elevgain: Math.round(elevationgain),
        elevloss: Math.round(elevationloss),
        nextelevgain: 0,
        nextelevloss: 0,
        odometer: odometar,
        nextstepdist: 0,
        symbol: symbolFromDesc(tempDesc,tempPictogram, wpoint.properties.name),
        pictogram: tempPictogram,
        pictureurl: (wpoint.properties.pictureurl != undefined) ? wpoint.properties.pictureurl : '',
        elevationprofile: 0
      });

      newWaypointsChart.push({
        name: wpoint.properties.name,
        odometer: odometar
      });
    }
  });

  newWaypointsExport = sortByKey(newWaypoints, 'odometer');

  newWaypointsExport.forEach(function(element, index) {
    newWaypointsExport[index].id = (index + 1)*10;
    if (index < (newWaypointsExport.length - 1)) {
      
      newWaypointsExport[index].nextstepdist = Math.round((newWaypointsExport[index+1].odometer - newWaypointsExport[index].odometer)*100)/100;
      
      newWaypointsExport[index].nextelevgain = Math.round((newWaypointsExport[index+1].elevgain - newWaypointsExport[index].elevgain)*100)/100;
      
      newWaypointsExport[index].nextelevloss = Math.round((newWaypointsExport[index+1].elevloss - newWaypointsExport[index].elevloss)*100)/100;

    }
  });

  console.log(newWaypointsExport);

}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}