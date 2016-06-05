function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
    mapbefore = new mapboxgl.Map({
        container: 'mapbefore',
        style: 'mapbox://styles/mapbox/outdoors-v9', //stylesheet location
        maxBounds: generalFact.bounds, // starting position
        center: [generalFact.lonCenter, generalFact.latCenter] // starting position
    });

    mapafter = new mapboxgl.Map({
        container: 'mapafter',
        style: 'mapbox://styles/mapbox/satellite-v9',
        maxBounds: generalFact.bounds, // starting position
        center: [generalFact.lonCenter, generalFact.latCenter] // starting position
    });

    new mapboxgl.Compare(mapbefore, mapafter);

    mapbefore.on('load', function () {
        mapbefore.addSource("rawjson", {
            "type": "geojson",
            "data": parsedJSON
        });
        mapbefore.addSource('pointbefore', {
            "type": "geojson",
            "data": {
                "type": "Point",
                "coordinates": [0,0]
            }
        });
        mapbefore.addSource('focuswpbefore', {
            "type": "geojson",
            "data": {
                "type": "Point",
                "coordinates": [0,0]
            }
        });
        mapbefore.addLayer({
            "id": "route",
            "type": "line",
            "source": "rawjson",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#cc0000",
                "line-width": 4
            }
        });
        mapbefore.addLayer({
            "id": "markers",
            "type": "symbol",
            "source": "rawjson",
            "layout": {
                "icon-image": "circle-15",
                "text-field": "{title}",
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        });
        mapbefore.addLayer({
            "id": "animpoint",
            "source": "pointbefore",
            "type": "symbol",
            "layout": {
                "icon-image": "circle-15",
            }
        });
        mapbefore.addLayer({
            'id': 'focuscirclebefore',
            'interactive': true,
            'type': 'circle',
            'source': 'focuswpbefore',
            'paint': {
                'circle-color': '#FFFBA0', // mag[1],
                'circle-opacity': 0.7,
                'circle-radius': 30 // (mag[0] - 4) * 10 // Nice radius value
            }
        });
    });

    mapafter.on('load', function () {
        mapafter.addSource("rawjson", {
            "type": "geojson",
            "data": parsedJSON
        });       
        mapafter.addSource('pointafter', {
            "type": "geojson",
            "data": {
                "type": "Point",
                "coordinates": [0,0]
            }
        });
        mapafter.addSource('focuswpafter', {
            "type": "geojson",
            "data": {
                "type": "Point",
                "coordinates": [0,0]
            }
        });
        mapafter.addLayer({
            "id": "route",
            "type": "line",
            "source": "rawjson",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#cc0000",
                "line-width": 4
            }
        });
        mapafter.addLayer({
            "id": "markers",
            "type": "symbol",
            "source": "rawjson",
            "layout": {
                "icon-image": "circle-15",
                "text-field": "{title}",
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        });
        mapafter.addLayer({
            "id": "animpoint",
            "source": "pointafter",
            "type": "symbol",
            "layout": {
                "icon-image": "circle-15",
            }
        });
        mapafter.addLayer({
            'id': 'focuscircleafter',
            'interactive': true,
            'type': 'circle',
            'source': 'focuswpafter',
            'paint': {
                'circle-color': '#FFFBA0', // mag[1],
                'circle-opacity': 0.7,
                'circle-radius': 30 // (mag[0] - 4) * 10 // Nice radius value
            }
        });
    });

}

function pointOnCircle(coordinates) {
    // console.log(coordinates);
    // requestAnimationFrame(animateMarker);
    return {
        "type": "Point",
        "coordinates": coordinates
    };
}


function animateMarker(coordinates) {
    var data = pointOnCircle(coordinates);
    mapbefore.getSource('pointbefore').setData(data);
    mapafter.getSource('pointafter').setData(data);
}

function setFocus(coordinates) {
    var data = pointOnCircle(coordinates);
    mapbefore.getSource('focuswpbefore').setData(data);
    mapafter.getSource('focuswpafter').setData(data);
}

function addMulticolorPath(nesto) {
    console.log(nesto);
    var startOdometer = 0;
    var endOdometer = 99999;
    sastavPathsArray = [];

    var layersArray = [];

    var i=0;
    sastavArray.forEach(function (element, index) {
        if (index === 0 && index !== (sastavArray.length -1)) {
            startOdometer = 0;
            endOdometer = sastavArray[index+1][0];
        } else if (index === (sastavArray.length -1)) {
            startOdometer = element[0];
            endOdometer = 99999;
        } else {
            startOdometer = element[0];
            endOdometer = sastavArray[index+1][0];
        }
        var totalOdometer = 0;
        
        var currentSection = {
          "type": "Feature",
          "properties": {
            "name": element[1] + '-' + index,
          },
          "geometry": {
            "type": "LineString",
            "coordinates": []
          }
        }
        // var i = 0;
        for (var i = 0; i < (newPathLine.length - 1); i++) {
            totalOdometer += newPathLine[i+1].prev_dist;
            if (startOdometer <= totalOdometer && totalOdometer <= endOdometer) {
                currentSection.geometry.coordinates.push([newPathLine[i].lon,newPathLine[i].lat]);
            }
        }
        // currentSection.geometry.coordinates.push([newPathLine[i+1].lon,newPathLine[i+1].lat]);

        layersArray.push({
            "id": element[1] + '-' + index,
            "type": "line",
            "source": "segments",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": getSegmentColor(element[1]).rgb,
                "line-width": 4
            },
            "filter": ["==", "name", element[1] + '-' + index]
        });

        sastavPathsArray.push(JSON.parse(JSON.stringify(currentSection)));
    });

    sastavPathsCollection.features = sastavPathsArray;

    mapbefore.addSource("segments", {
        "type": "geojson",
        "data": sastavPathsCollection
    });
    mapafter.addSource("segments", {
        "type": "geojson",
        "data": sastavPathsCollection
    });
    layersArray.forEach(function (layer, index) {
        mapbefore.addLayer(layer, 'animpoint');
        mapafter.addLayer(layer, 'animpoint');
    });
}