import React from 'react';
import BasePage from '../components/BasePage';
import Message from '../components/notifications/Message';
import NewEditActionButton from '../components/menu/NewEditActionButton';
// import SnapToNorth from '../components/map/SnapToNorth';
import NewTrailContainer from '../components/newTrail/NewTrailContainer';
import OpenTrailContainer from '../components/openTrail/OpenTrailContainer';
import MainToolbar from '../components/menu/MainToolbar';
import MapController from '../controllers/MapController';
import DataController from '../controllers/DataController';
import WPDrawer from '../components/wpEditor/WPDrawer';
import WPModalEditor from '../components/wpEditor/WPModalEditor';

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
                    <NewTrailContainer />
                    <OpenTrailContainer />
                    <WPDrawer />
                    <div className="overlay bottom right">
                        <NewEditActionButton />
                    </div>
                    <WPModalEditor />
                </div>
            </div>
        );
    }
}

Root.propTypes = {
    route: React.PropTypes.object.isRequired,
};

export default Root;
