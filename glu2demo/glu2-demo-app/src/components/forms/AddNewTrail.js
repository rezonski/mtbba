import React from 'react';
import BasePage from '../BasePage';
import AppEvents from '../../enums/AppEvents';
import Enum from '../../enums/Enum';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';

class AddNewTrail extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message: '',
            type: null,
            data: {},
        };

        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveAddedTrail = this.saveAddedTrail.bind(this);
        this.onUploadDoneEvent = this.onUploadDone.bind(this);

        this.bindGluBusEvents({
            [AppEvents.ADD_NEW_TRAIL]: this.onAddNewTrailRequest,
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialDataRetrieved,
        });
    }

    componentDidMount() {
        this.emit(Enum.MapEvents.RETRIEVE_INITIAL_DATA_SETUP);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onAddNewTrailRequest() {
        this.setState({
            open: true,
        });
    }

    onUploadDone(event) {
        console.info(event.target.value);
    }

    onInitialDataRetrieved(payload) {
        this.setState({
            data: payload,
        });
    }

    render() {
        const actions = [
          <RaisedButton
            label="Spasi"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.onSaveAddedTrail}
          />,
          <FlatButton
            label="Poništi"
            primary={true}
            keyboardFocused={false}
            onTouchTap={this.onCloseEvent}
          />,
        ];

        console.info(this.state.data);

        return (<div>
                    <Dialog title="New" actions={actions} modal={false} open={this.state.open} onRequestClose={this.onCloseEvent}>
                        <br />
                        Add new geo data file: <input type="file" onChange={this.onUploadDoneEvent}/>
                        <br />
                        <TextField fullWidth={true} hintText="Hint Text" floatingLabelText="Floating Label Text"/>
                        <br />
                        <TextField fullWidth={true} hintText="Message Field" floatingLabelText="MultiLine and FloatingLabel" multiLine={true} rows={4}/>
                    </Dialog>
                </div>);
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    saveAddedTrail() {
        console.info('spasi');
    }
}

export default AddNewTrail;
