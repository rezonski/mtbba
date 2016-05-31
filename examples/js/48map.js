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
            "id": "pointbefore",
            "source": "pointbefore",
            "type": "symbol",
            "layout": {
                "icon-image": "circle-15",
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
            "id": "pointafter",
            "source": "pointafter",
            "type": "symbol",
            "layout": {
                "icon-image": "circle-15",
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