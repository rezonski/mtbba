import React from 'react';
import BasePage from '../components/BasePage';
import SwipeMap from '../components/map/SwipeMap';
import MapController from '../controllers/MapController';

class MapPage extends BasePage {
    constructor(params) {
        super(params);
        this.activateControllers(
            MapController,
        );
    }

    componentDidMount() {
        console.info('MapPage DidMount');
        this.emit('RETRIEVE_MAP_INIT');
    }

    componentWillUnmount() {
        this.deactivateControllers();
    }

    render() {
        return (
            <div>
                <SwipeMap/>
            </div>
        );
    }


}

export default MapPage;
