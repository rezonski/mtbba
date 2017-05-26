import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import Drawer from 'material-ui/Drawer';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
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
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        });
    }

    onSetStep(stepIndex) {
        this.setState({
            stepIndex,
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
            return (<Step key={'wp-step-' + wpIdx}>
                        <StepButton onTouchTap={this.onSetStep.bind(this, wpIdx)}>
                            {wp.properties.odometer + 'km - ' + wp.properties.name}
                        </StepButton>
                        <StepContent>
                            <WPEditorTray
                                wp={wp.properties}
                                wpIndex={wpIdx}
                            />
                        </StepContent>
                    </Step>);
        });

        const content = (<Stepper
                            activeStep={this.state.stepIndex}
                            linear={false}
                            orientation="vertical"
                        >
                          {steps}
                        </Stepper>);

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
