import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        mapboxgl.accessToken = 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
        });
        map.on('load', () => {
            console.log('loaded');
        });
    }

    render() {
        return (<div id="map"></div>);
    }

    static run(container) {
        ReactDOM.render(<App />, document.querySelector(`#${container}`));
    }
}

export default App;
