import React from 'react';
import BasePage from '../BasePage';
import AppEvents from '../../enums/AppEvents';
import Enum from '../../enums/Enum';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

class AddNewTrail extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message: '',
            data: {},
            trailName: '',
            trailDesc: '',
            mountainIDs: [],
            trailTypeID: null,
        };

        this.form = {
            trailName: '',
            trailDesc: '',
            mountainIDs: [],
            trailTypeID: null,
        };

        // this.mounted = false;

        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveAddedTrail = this.saveAddedTrail.bind(this);
        this.onUploadDoneEvent = this.onUploadDone.bind(this);
        this.onTrailNameChangedEvent = this.onTrailNameChanged.bind(this);
        this.onTrailDescChangedEvent = this.onTrailDescChanged.bind(this);
        this.eventChangeTrailType = this.onFormChangeTrailType.bind(this);

        this.bindGluBusEvents({
            [AppEvents.ADD_NEW_TRAIL]: this.onAddNewTrailRequest,
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialDataRetrieved,
        });
    }

    componentDidMount() {
        // this.mounted = true;
        this.emit(Enum.MapEvents.RETRIEVE_INITIAL_DATA_SETUP);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // return nextProps !== this.props || nextState.data !== this.state.data;
    // }

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

    onTrailNameChanged(event) {
        this.form.trailName = event.target.value;
        // this.setState({
        //     trailName: event.target.value,
        // });
    }

    onTrailDescChanged(event) {
        this.form.trailDesc = event.target.value;
        // this.setState({
        //     trailDesc: event.target.value,
        // });
    }

    onFormChangeTrailType(event, index, value) {
        this.form.trailTypeID = value;
        // this.setState({
        //     trailTypeID: value,
        // });
    }

    onFormChangeMountain(mntID, event, isChecked) {
        let temp = this.state.mountainIDs;
        if (isChecked) {
            if (temp.indexOf(mntID) === -1) {
                temp.push(mntID);
            }
        } else {
            if (temp.indexOf(mntID) > -1) {
                temp.splice(temp.indexOf(mntID), 1);
            }
        }
        this.form.mountainIDs = temp;
        // this.setState({
        //     mountainIDs: temp,
        // });
    }

    render() {
        const styles = {
            block: {
                maxWidth: 250,
            },
            checkbox: {
                marginBottom: 16,
            },
            dialogContentStyle: {
                width: '75%',
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

        // console.info(this.state.data);
        // console.info(this.state.mountainIDs);

        let mountainItems = [];
        let trailTypes = [];

        if (this.state.data && this.state.data.countries) {
            this.state.data.countries.forEach((country, cIndex) => {
                // mountainItems.push(<MenuItem key={ 'country' + cIndex } value={undefined} primaryText={country.name + '(' + country.total + ')'} disabled={true}/>);
                mountainItems.push(<Checkbox key={ 'country' + cIndex } label={country.name + '(' + country.total + ')'} style={styles.checkbox} disabled={true}/>);
                this.state.data.mountains.forEach((mountain, mIndex ) => {
                    if (mountain.id_parent === country.id) {
                        // mountainItems.push(<MenuItem key={ 'mountain' + mIndex } value={mountain.id} primaryText={mountain.name + ' / ' + mountain.region + ' (' + mountain.total + ')'} />);
                        mountainItems.push(<Checkbox key={ 'mountain' + mIndex } checked={this.mntChecked(mountain.id)} onCheck={this.onFormChangeMountain.bind(this, mountain.id)} label={mountain.name + ' / ' + mountain.region + ' (' + mountain.total + ')'} style={styles.checkbox} />);
                    }
                });
                mountainItems.push(<Divider key={ 'country-divider' + cIndex }/>);
            });

            this.state.data.trailTypes.forEach((trailType, tIndex) => {
                trailTypes.push(<MenuItem key={ 'trailType' + tIndex } value={trailType.id} primaryText={trailType.name + ' - ' + trailType.desc} />);
            });
        }

        return (<Dialog className="dialog" contentStyle={styles.dialogContentStyle} title="New" actions={actions} modal={false} open={this.state.open} onRequestClose={this.onCloseEvent}>
                    <div className="flex-container row">
                        <div className="flex-element column wider">
                            Add new geo data file:
                            <br />
                            <input type="file" onChange={this.onUploadDoneEvent}/>
                            <br />
                            <TextField onChange={this.onTrailNameChangedEvent} value={this.form.trailName} fullWidth={true} hintText="E.g. 'Sarajevo-Nahorevo-Skakavac'" floatingLabelText="Trail name"/>
                            <br />
                            <TextField onChange={this.onTrailDescChangedEvent} value={this.form.trailDesc} fullWidth={true} hintText="Between 200 and 400 character" floatingLabelText="Trail description" multiLine={true} rows={4}/>
                            <br />
                            <SelectField onChange={this.eventChangeTrailType} value={this.form.trailTypeID} floatingLabelText="Choose trail type" floatingLabelFixed={true} hintText="Choose only one from list" maxHeight={200} autoWidth={true}>{trailTypes}</SelectField>
                        </div>
                        <div className="flex-element column narower">
                            <div className="list-container">
                                {mountainItems}
                            </div>
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
    }

    mntChecked(mntID) {
        if (this.form.mountainIDs.indexOf(mntID) > -1) {
            return true;
        }
        return false;
    }
}

export default AddNewTrail;
