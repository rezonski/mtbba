import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import Drawer from 'material-ui/Drawer';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import WPEditorTray from '../wpEditor/WPEditorTray';

class WPDRawer extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            waypoints: [],
            drawerOpen: false,
            stepIndex: 0,
        };
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onTrailDataRetrieved,
            [Enum.AppEvents.TOGGLE_WP_DRAWER]: this.onToggleOpenDrawer,
        });
    }

    componentDidMount() {
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA, 'waypoints');
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onTrailDataRetrieved(payload) {
        if (payload.waypoints && payload.waypoints !== this.state.waypoints) {
            this.setState({
                waypoints: payload.waypoints,
            });
        }
    }

    onToggleOpenDrawer() {
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA, 'waypoints');
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        });
    }

    render() {
        if (this.state.waypoints.length === 0) {
            return null;
        }

        const style = {
            drawer: {
                overflow: 'hidden',
            },
        };

        const steps = this.state.waypoints.map((wp, wpIdx) => {
            return (<div
                        id={'wp-step-' + wpIdx}
                        className={'wp-step'}
                        key={'wp-step-' + wpIdx}>
                            <WPEditorTray
                                wp={wp}
                                wpIndex={wpIdx}
                            />
                    </div>);
        });

        const content = (<div id="wp-stepper">{steps}</div>);

        return (<Drawer
                    open={this.state.drawerOpen}
                    width={500}
                    containerStyle={style.drawer}
                >
                    <div className="wp-drawer-container">
                        <div className="wp-drawer-container header">Header</div>
                        <div className="wp-drawer-container body">{content}</div>
                        <div className="wp-drawer-container footer">Footer</div>
                    </div>
                </Drawer>);
    }
}

export default WPDRawer;
