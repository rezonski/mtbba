import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MountainMultiSelection from '../newTrail/MountainMultiSelection';
import InputTextBox from '../newTrail/InputTextBox';
import ListSelection from '../newTrail/ListSelection';
import UploadImage from '../newTrail/UploadImage';
import UploadGeoFile from '../newTrail/UploadGeoFile';
import StatusProgress from '../newTrail/StatusProgress';

class AddNewTrail extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedFile: '',
            title: Lang.label('newTrail'),
        };
        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveAddedTrail = this.saveAddedTrail.bind(this);

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
            label={Lang.label('save')}
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.onSaveAddedTrail}
          />,
          <FlatButton
            label={Lang.label('cancel')}
            primary={true}
            keyboardFocused={false}
            onTouchTap={this.onCloseEvent}
          />,
        ];


        return (<Dialog
                    className="dialog"
                    contentStyle={styles.dialogContentStyle}
                    title={this.state.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.onCloseEvent}>
                        <div className="flex-container row">
                            <div className="flex-element column wider margined-right">
                                <div className="flex-container row">
                                    <UploadGeoFile /><UploadImage />
                                </div>
                                <StatusProgress />
                                <InputTextBox
                                    key="trailName"
                                    fieldName="trailName"
                                    isMultiline={false}
                                    noRows={1}
                                    filedLabel={Lang.label('trailName')}
                                    filedHintText={Lang.label('trailNameHint')}
                                />
                                <InputTextBox
                                    key="trailDesc"
                                    fieldName="trailDesc"
                                    isMultiline={true}
                                    noRows={4}
                                    filedLabel={Lang.label('trailDesc')}
                                    filedHintText={Lang.label('trailDescHint')}
                                />
                                <ListSelection
                                    key="trailTypeID"
                                    fieldName="trailTypeID"
                                    sourceName="trailTypes"
                                    floatingLabelText={Lang.label('chooseTrailType')}
                                    filedHintText={Lang.label('listSelectionHint')}
                                />
                                <ListSelection
                                    key="fitnessLevelID"
                                    fieldName="fitnessLevelID"
                                    sourceName="fitnessLevels"
                                    floatingLabelText={Lang.label('chooseFitnessLevel')}
                                    filedHintText={Lang.label('listSelectionHint')}
                                />
                                <ListSelection
                                    key="techniqueLevelID"
                                    fieldName="techniqueLevelID"
                                    sourceName="techniqueLevels"
                                    floatingLabelText={Lang.label('chooseTechniqueLevel')}
                                    filedHintText={Lang.label('listSelectionHint')}
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
