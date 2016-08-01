function changeWpointType(wid) {
  console.log('changeWpointType(' + wid + ')');
}

function saveSastav(){
  sastavArray = JSON.parse(document.getElementById('sastavtrailatext').value);
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
  C = sastavArray.sort(sortFunction);
  console.log('sastavArray');
  console.log(sastavArray);
  document.getElementById('sastavtrailatext').value = JSON.stringify(sastavArray);
  document.getElementById('sastavodometar').value = '';
  document.getElementById('sastavtype').value = '';
}


function handleNewWP() {

  if (document.getElementById('newwpname').value.length > 5 && document.getElementById('newwppictogram').value.length > 3) {
    
    var tempWp = {
      "type": "Feature",
      "properties": {
        "name": document.getElementById('newwpname').value,
        "desc": "",
        "time": "",
        "pictogram": document.getElementById('newwppictogram').value
      },
      "geometry": {
        "type": "Point",
        "coordinates": selectedPointOnTrail
      }
    };

    waypoints.push(tempWp);
    parsedJSON.features.push(tempWp);
    fixWaypoints();
    mapbefore.getSource('rawjson').setData(parsedJSON);
    mapafter.getSource('rawjson').setData(parsedJSON);
    document.getElementById('waypointscontainer').innerHTML = null;
    makeWaypointsEditor(newWaypointsExport);
  } else {
    alert('Greska WP');
  }


  document.getElementById('newwpname').value = '';
  document.getElementById('newwppictogram').value = '';
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
  console.info('makeTrail()');
  var sastavArray = parsedObject.sastav;
  var features = parsedObject.features;
  waypoints = [];
  features.forEach(function(feature){
      
      if (feature.geometry.type === 'LineString') {
          unfilteredPathLine = unfilteredPathLine.concat(feature.geometry.coordinates);
          // pathLine = feature.geometry.coordinates;
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

  filterPathLinePoints();

  checkAddElevation();
  
  // makeWaypointsEditor(newWaypointsExport);
  // setElevationProfile(pathLine,newWaypointsChart,sastavArray);
}

function filterPathLinePoints() {
  console.info('filterPathLinePoints(): unfilteredPathLine.length = ' + unfilteredPathLine.length);
  pathLine = simplifyPath(unfilteredPathLine, 0.1);
  console.info('filterPathLinePoints(): pathLine.length = ' + pathLine.length);
}


function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 
    console.info('readSingleFile()');
    if (f) {
      var r = new FileReader();
      r.onload = function(e) {   
          importedfilename = f.name;
          rawTrailName = importedfilename.replace('.gpx', '').replace('_profil', ' ').replace('_', ' ').capitalizeFirstLetter();
          document.getElementById("trailname").value = rawTrailName;
          var contents = e.target.result;
          var dom = (new DOMParser()).parseFromString(contents, 'text/xml');
          if (f.name.toLowerCase().indexOf('.gpx') > 0) {
            parsedJSON = toGeoJSON.gpx(dom);
          } else if (f.name.toLowerCase().indexOf('.kml') > 0) {
            parsedJSON = toGeoJSON.kml(dom);
          } else {
             alert( "Unsuported file type");
          } 
          makeTrail(parsedJSON);
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

function checkAddElevation() {
  var badPoints = [];
  var parsedPoints = '';
  var maxPoints = 90;
  var xmlhttpElevation = new XMLHttpRequest();
  
  pathLine.forEach(function(location, index) {
    if ((badPoints.length <= maxPoints ) && (location[2] === undefined || location[2] === 0)) {
      // console.info('Missing elevation on location ' + location[0] + ' - ' + location[1]);
      if (badPoints.length < maxPoints) {
        badPoints.push({
          "pathIndex": index,
          "point": location
        });
        // parsedPoints += location[0] + ',' + location[1] + ';';
        parsedPoints += location[1] + ',' + location[0] + '|';
      } else {
        xmlhttpElevation.onreadystatechange = function() {
            if (xmlhttpElevation.readyState == 4 && xmlhttpElevation.status == 200) {
                var response = JSON.parse(xmlhttpElevation.responseText);
                var elevatedPoints = response.results;
                var tempElevation = 0;
                elevatedPoints.forEach(function (elPoint, pointIndex) {
                  if (elPoint.ele || elPoint.elevation) {
                    // tempElevation = elPoint.ele;
                    // pathLine[badPoints[pointIndex].pathIndex][2] = parseInt(elPoint.ele, 10);
                    tempElevation = elPoint.elevation;
                    pathLine[badPoints[pointIndex].pathIndex][2] = parseInt(elPoint.elevation, 10);
                  } else {
                    pathLine[badPoints[pointIndex].pathIndex][2] = parseInt(tempElevation, 10);
                  }
                });
                console.info('badPoints.length = ' + badPoints.length);
                if (badPoints.length === maxPoints) {
                  checkAddElevation();          
                } else {
                  badPoints = [];
                }
            }
        };
        
      }
    } else {
      // console.info('OK location ' + location[0] + ' - ' + location[1]);
    }
  });

  // var endpoint = 'https://api.mapbox.com/v4/surface/mapbox.mapbox-terrain-v1.json?layer=contour&fields=ele&points=' + parsedPoints.substring(0, parsedPoints.length - 1) + '&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbG10dnA3NzY3OTZ0dmtwejN2ZnUycjYifQ.1W5oTOnWXQ9R1w8u3Oo1yA';
  var endpoint = 'https://maps.googleapis.com/maps/api/elevation/json?locations=' + parsedPoints.substring(0, parsedPoints.length - 1) + '&key=AIzaSyDJOri7DbQEliNmWM3L7yyVZko6MrAasJE';
  console.info(endpoint);
  console.info('endpoint.length = ' + endpoint.length + ' , badPoints.length = ' + badPoints.length);
  xmlhttpElevation.open('GET', endpoint , true);
  xmlhttpElevation.send();

  if (badPoints.length === 0 || (badPoints.length > 0 && badPoints.length < maxPoints)) {
    console.info('All elevation data ok');
    fixPathArray();
    fixWaypoints();
  }
}

function fixPathArray() {
  console.info('fixPathArray()');
  newPathLine = [];
  var prevLoc = {};
  var currLocOut = {};

  var maxLon = 0;
  var minLon = 999999;
  var maxLat = 0;
  var minLat = 999999;
  var maxElev = 0;
  var minElev = 999999;

  pathLine.forEach(function(location, index) {
    
    var elevationCalc

    if (index > 0) {
      elevationCalc = (location[2] === undefined) ? prevLoc.elevation : location[2];
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
    } else {
      elevationCalc = (location[2] === undefined) ? 0 : location[2];
      var currLoc = {
        lon: location[0],
        lat: location[1],
        elevation: elevationCalc,
        prev_dist: 0,
        prev_elev: 0
      };
    }
    currLocOut = JSON.parse(JSON.stringify(currLoc));
    newPathLine.push(currLoc);
    pathLineMasterd.push([location[0],location[1],elevationCalc]);
    
    if (location[0] >= maxLon) {
      maxLon = location[0];
    }
    if (location[0] <= minLon) {
      minLon = location[0];
    }

    if (location[1] >= maxLat) {
      maxLat = location[1];
    }
    if (location[1] <= minLat) {
      minLat = location[1];
    }

    if (elevationCalc >= maxElev) {
      maxElev = elevationCalc;
    }
    if (elevationCalc <= minElev) {
      minElev = elevationCalc;
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

  var lonDelta = (maxLon - minLon) / 1;
  var latDelta = (maxLat - minLat) / 1;

  // generalFact.bounds = [[(maxLat + latDelta),(maxLon + lonDelta)],[(maxLat - latDelta),(maxLon - lonDelta)]];
  generalFact.bounds = [[(maxLon + lonDelta),(maxLat + latDelta)],[(minLon - lonDelta),(minLat - latDelta)]];



  generalFact.lonCenter = (maxLon + minLon)/2;
  generalFact.latCenter = (maxLat + minLat)/2;
  generalFact.elevMin = minElev;
  generalFact.elevMax = maxElev;

  createMap();

  setElevationProfile('rawprofilecontainer',pathLineMasterd,waypoints,sastavArray);

}

function fixWaypoints() {
  console.info('fixWaypoints()');
  var newWaypoints = [];

  waypoints.forEach(function(wpoint) {
  
    var tempDistance = 9999999;
    var tempIndex = -1;
    var tempDesc = '';
    var tempPictogram = '';
    
    newPathLine.forEach(function(ppoint, pindex) {
      var currentDistance = getDistanceFromLatLonInKm(wpoint.geometry.coordinates[0], wpoint.geometry.coordinates[1], ppoint.lon, ppoint.lat);
      // if ((currentDistance < tempDistance || tempDistance === -1) && currentDistance > 0 && currentDistance < 0.2) {
      if ((currentDistance < tempDistance) && currentDistance < 0.2) {
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

      if (wpoint.properties.desc !== undefined && wpoint.properties.desc.indexOf('#')  > -1 ) {
        var tempDescArray = wpoint.properties.desc.replace("#\n\n","#\n").replace("#\n\n","#\n").replace("#\n","#").replace("#\n","#").split("#");
        tempDesc = tempDescArray[2];
        tempPictogram = tempDescArray[1];
      } else if (wpoint.properties.desc !== undefined) {
        tempDesc = wpoint.properties.desc;
        tempPictogram = (wpoint.properties.pictogram != undefined) ? wpoint.properties.pictogram : '90';
      } else {
        tempDesc = '';
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