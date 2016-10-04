import React from 'react';
import BasePage from '../components/BasePage';
import SwipeMap from '../components/map/SwipeMap';

class NewTrail extends BasePage {
    constructor(params) {
        super(params);
    }

    componentDidMount() {
        console.info('NewTrail DidMount');
        this.emit('RETRIEVE_MAP_INIT');
    }

    componentWillUnmount() {
        this.deactivateControllers();
    }

    render() {
        return (<SwipeMap/>);
    }


}

export default NewTrail;
