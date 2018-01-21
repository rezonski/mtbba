import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import Drawer from 'material-ui/Drawer';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import WPEditorTray from '../wpEditor/WPEditorTray';
import InputTextBox from '../common/InputTextBox';
import Switch from '../common/Switch';
import Lang from '/helpers/Lang';

class WPDRawer extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            waypoints: [],
            drawerOpen: false,
            stepIndex: 0,
        };
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onWaypointsaRetrieved,
            [Enum.AppEvents.TOGGLE_WP_DRAWER]: this.onToggleOpenDrawer,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onWaypointsaRetrieved(payload) {
        if (payload.waypoints) {
            this.setState({
                waypoints: payload.waypoints,
            });
        }
    }

    onToggleOpenDrawer() {
        if (this.state.drawerOpen) {
            this.emit(Enum.AppEvents.PREVIEW_PICTOGRAM, {
                wpIndex: null,
            });
        }
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    onWpClick(wp, wpIdx) {
        // console.log(wp);
        this.emit(Enum.MapEvents.FOCUS_FEATURE_ON_MAP, {
            feature: wp,
        });
        this.emit(Enum.AppEvents.PREVIEW_PICTOGRAM, {
            wpIndex: wpIdx,
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
            return (<div id={'wp-step-' + wpIdx}
                        className={'flex-container row single-wp-edit-box'}
                        onClick={this.onWpClick.bind(this, wp, wpIdx)}
                        key={'wp-step-' + wpIdx}>
                            <InputTextBox
                                fieldName={'waypoints'}
                                fieldIndex={wpIdx}
                                fieldProp={'name'}
                                inputBoxStyle={{ fontSize: '80%' }}
                                isMultiline={false}
                                noRows={1}
                                filedLabel={Lang.label('name')}
                                filedHintText={Lang.label('name')}
                            />
                            <InputTextBox
                                fieldName={'waypoints'}
                                fieldIndex={wpIdx}
                                fieldProp={'pictogram'}
                                inputBoxStyle={{ fontSize: '80%' }}
                                isMultiline={false}
                                noRows={1}
                                filedLabel={Lang.label('pictogram')}
                                filedHintText={Lang.label('pictogramHint')}
                            />
                            <Switch
                                fieldName={'waypoints'}
                                fieldIndex={wpIdx}
                                fieldProp={'elevationProfile'}
                                label={Lang.label('showOnElevationProfile')}
                                type={'toggle'}
                            />
                    </div>);
        });

        const content = (<div id="wp-stepper">{steps}</div>);

        // console.log('Render WPDRawer');

        return (<Drawer
                    open={this.state.drawerOpen}
                    width={300}
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
