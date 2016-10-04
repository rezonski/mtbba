import React from 'react';
import BasePage from '../BasePage';
import AppEvents from '../../enums/AppEvents';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AddNewTrail extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message: '',
            type: null,
        };

        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveAddedTrail = this.saveAddedTrail.bind(this);
        this.onUploadDoneEvent = this.onUploadDone.bind(this);

        this.bindGluBusEvents({
            [AppEvents.ADD_NEW_TRAIL]: this.onAddNewTrailRequest,
        });
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

        return (<div>
                    <Dialog
                        title="Nova staza"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.onCloseEvent}
                    >
                        Učitaj novu GPX ili KML datoteku.
                        <input type="file" onChange={this.onUploadDoneEvent}/>
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
