import React from 'react';
import BasePage from '../components/BasePage';
import Message from '../components/notifications/Message';
import NewEditActionButton from '../components/menu/NewEditActionButton';
// import SnapToNorth from '../components/map/SnapToNorth';
import NewTrailContainer from '../components/newTrail/NewTrailContainer';
import OpenTrailContainer from '../components/openTrail/OpenTrailContainer';
import AllWPEditor from '../components/wpEditor/AllWPEditor';
import PictogramPreview from '../components/wpEditor/PictogramPreview';
import MainToolbar from '../components/menu/MainToolbar';
import MapController from '../controllers/MapController';
import DataController from '../controllers/DataController';
import WPDrawer from '../components/wpEditor/WPDrawer';
import WPModalEditor from '../components/wpEditor/WPModalEditor';
import WPPopup from '../components/map/WPPopup';

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
                    <PictogramPreview />
                    <NewTrailContainer />
                    <OpenTrailContainer />
                    <AllWPEditor />
                    <WPDrawer />
                    <div className="overlay bottom right">
                        <NewEditActionButton />
                    </div>
                    <WPModalEditor />
                    <WPPopup />
                </div>
            </div>
        );
    }
}

Root.propTypes = {
    route: React.PropTypes.object.isRequired,
};

export default Root;
