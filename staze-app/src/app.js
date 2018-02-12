import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BaseTheme from '/themes/BaseTheme';
import AppBar from 'material-ui/AppBar';
import mapboxgl from 'mapbox-gl';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        mapboxgl.accessToken = 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            center: [17.74, 43.72],
            zoom: 7,
            style: 'mapbox://styles/mapbox/streets-v9',
            maxBounds: [[13.6, 40.6], [22.4, 47.7]],
        });
        map.fitBounds([[15.65, 41.98], [19.83, 45.41]]);
        window.map = map;
        map.on('load', () => {
            console.log('loaded');
        });
    }

    render() {
        return (<MuiThemeProvider muiTheme={getMuiTheme(BaseTheme)}>
            <div className="app">
                <AppBar title="My AppBar" className="app__header"/>
                <div className="app__content">
                    <div className="app__content__map__container">
                        <div id="map" className="map"></div>
                    </div>
                    <div className="app__content__content__container">
                        <div className="content">
                            Neki sadrzaj
                        </div>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>);
    }

    static run(container) {
        injectTapEventPlugin();
        ReactDOM.render(<App />, document.querySelector(`#${container}`));
    }
}

export default App;
