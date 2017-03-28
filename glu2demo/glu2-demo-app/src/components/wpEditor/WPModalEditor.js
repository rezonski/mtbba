import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import appConfig from '../../appConfig';

class WPModalEditor extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: Lang.label('newWaypoint'),
            name: 'Place #',
            pictogram: '90',
        };
        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveEvent = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.ADD_NEW_WAYPOINT]: this.onOpenFormRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenFormRequest(payload) {
        this.setState({
            open: true,
            position: payload.position,
        });
    }

    render() {
        const contentStyle = {
            width: 300,
            height: 300,
            backgroundImage: 'url("' + appConfig.constants.server + '/svg/getsvg.php?opis=' + this.state.pictogram + '")',
        };

        const actions = [
            <FlatButton
                label={Lang.label('cancel')}
                primary={true}
                onTouchTap={this.onCloseEvent}
            />,
            <RaisedButton
                label={Lang.label('save')}
                primary={true}
                // disabled={this.state.openDisabled}
                onTouchTap={this.onSaveEvent}
            />,
        ];

        return (
            <Dialog
                className="dialog"
                title={this.state.title}
                modal={false}
                open={this.state.open}
                actions={actions}
                onRequestClose={this.onCloseEvent}
            >
                <div className="flex-container row">
                    <div className="flex-container column">
                        <div
                            key="pictogram-preview"
                            className="image-preview"
                            style={contentStyle}
                        />
                    </div>
                    <div className="flex-container column">
                        <TextField
                            key="wp-name"
                            floatingLabelText="Enter waypoint/place name"
                            value={this.state.name}
                            onChange={this.changeName.bind(this)}
                        />
                        <TextField
                            key="wp-pictogram"
                            floatingLabelText="Enter waypoint pictogram code"
                            value={this.state.pictogram}
                            onChange={this.changePictogram.bind(this)}
                        />
                    </div>
                </div>
            </Dialog>
        );
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    handleSave() {
        window.leftmap.fire('addNewWaypoint', {
            position: this.state.position,
            name: this.state.name,
            pictogram: this.state.pictogram,
        });
        this.setState({
            open: false,
        });
    }

    changeName(event) {
        this.setState({
            name: event.target.value,
        });
    }

    changePictogram(event) {
        this.setState({
            pictogram: event.target.value,
        });
    }
}

export default WPModalEditor;
