import React from 'react';
import BasePage from '../components/BasePage';
// import SwipeMap from '../components/map/SwipeMap';
import SingleMap from '../components/map/SingleMap';

class NewTrail extends BasePage {
    constructor(params) {
        super(params);
    }

    // componentDidMount() {
        // console.info('NewTrail DidMount');
        // this.emit('RETRIEVE_MAP_INIT');
    // }

    componentWillUnmount() {
        this.deactivateControllers();
    }

    render() {
        // return (<SwipeMap/>);
        return (<SingleMap/>);
    }


}

export default NewTrail;
