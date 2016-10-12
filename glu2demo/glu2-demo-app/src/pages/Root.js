import React from 'react';
import BasePage from '../components/BasePage';
import Message from '../components/notifications/Message';
import ModalMessage from '../components/notifications/ModalMessage';
import AddNewTrail from '../components/forms/AddNewTrail';
import MainToolbar from '../components/menu/MainToolbar';
import MapController from '../controllers/MapController';
import DataController from '../controllers/DataController';

class Root extends BasePage {
    constructor(params) {
        super(params);

        this.state = {
        };

        this.activateControllers(
            MapController,
            DataController,
        );

        this.bindGluBusEvents({
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    render() {
        return (
            <div id="root-container">
                <div id="toolbar-container">
                    <MainToolbar />
                </div>
                <div id="map-container">
                    {this.props.children}
                    <Message />
                    <ModalMessage />
                    <AddNewTrail />
                </div>
            </div>
        );
    }
}

Root.propTypes = {
    route: React.PropTypes.object.isRequired,
};

export default Root;
