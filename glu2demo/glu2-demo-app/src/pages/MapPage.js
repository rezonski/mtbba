import React from 'react';
import BasePage from '../components/BasePage';
import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';


class MapPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            popup: null,
            center: [ -77.01239, 38.91275 ],
        };
        this.config = {
          'accessToken': 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg',
          'style': 'mapbox://styles/mapbox/outdoors-v9',
        };

        // this.activateControllers(EditProjectController);
        this.bindGluBusEvents({
            // PROJECT_RETRIEVED: this.onProjectRetrieved,
        });
        // this.emit('RETRIEVE_PROJECT', this.props.params.projectId);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    // onProjectRetrieved(project) {
    //     this.setState(project);
    // }

    render() {
        return (
        <ReactMapboxGl
            style={this.config.style}
            accessToken={this.config.accessToken}
            center={this.state.center}
            movingMethod='jumpTo'
            containerStyle={{ height: '100vh', width: '100%' }}>
            <ScaleControl/>
            <ZoomControl/>
        </ReactMapboxGl>);
    }
}

export default MapPage;