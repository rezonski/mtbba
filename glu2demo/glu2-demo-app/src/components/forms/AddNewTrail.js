import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MountainMultiSelection from '../forms/MountainMultiSelection';
import InputTextBox from '../forms/InputTextBox';
import ListSelection from '../forms/ListSelection';

class AddNewTrail extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveAddedTrail = this.saveAddedTrail.bind(this);
        this.onUploadDoneEvent = this.onUploadDone.bind(this);

        this.bindGluBusEvents({
            [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenFormRequest() {
        this.setState({
            open: true,
        });
    }

    onUploadDone(event) {
        console.info(event.target.value);
    }

    render() {
        const styles = {
            block: {
                maxWidth: 250,
            },
            dialogContentStyle: {
                width: '80%',
                maxWidth: 'none',
            },
        };

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


        return (<Dialog
                    className="dialog"
                    contentStyle={styles.dialogContentStyle}
                    title="New"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.onCloseEvent}>
                        <div className="flex-container row">
                            <div className="flex-element column wider">
                                Add new geo data file:
                                <br />
                                <input type="file" onChange={this.onUploadDoneEvent}/>
                                <br />
                                <InputTextBox
                                    key="trailName"
                                    fieldName="trailName"
                                    isMultiline={false}
                                    noRows={1}
                                    filedHintText="E.g. 'Sarajevo-Nahorevo-Skakavac'"
                                    filedLabel="Trail name"
                                />
                                <br />
                                <InputTextBox
                                    key="trailDesc"
                                    fieldName="trailDesc"
                                    isMultiline={true}
                                    noRows={4}
                                    filedHintText="Between 200 and 400 character"
                                    filedLabel="Trail description"
                                />
                                <br />
                                <ListSelection
                                    key="trailTypeID"
                                    fieldName="trailTypeID"
                                    filedHintText="Choose only one from list"
                                    floatingLabelText="Choose trail type"
                                />
                            </div>
                            <div className="flex-element column narower">
                                <MountainMultiSelection />
                            </div>
                        </div>
                </Dialog>);
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    saveAddedTrail() {
        console.info('spasi');
        console.info(this.refs);
    }
}

export default AddNewTrail;
