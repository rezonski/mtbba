function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
    map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
        center: [-74.50, 40], // starting position
        zoom: 9 // starting zoom
    });
}