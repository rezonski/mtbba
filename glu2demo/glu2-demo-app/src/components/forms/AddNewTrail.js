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

class AddNewTrail extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message: '',
            type: null,
            data: {},
            mountainID: null,
            trailTypeID: null,
        };

        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveAddedTrail = this.saveAddedTrail.bind(this);
        this.onUploadDoneEvent = this.onUploadDone.bind(this);
        this.eventChangeMountain = this.onFormChangeMountain.bind(this);
        this.eventChangeTrailType = this.onFormChangeTrailType.bind(this);

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

    onFormChangeMountain(event, index, value) {
        this.setState({
            mountainID: value,
        });
    }

    onFormChangeTrailType(event, index, value) {
        this.setState({
            trailTypeID: value,
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

        let mountainItems = [];
        let trailTypes = [];

        if (this.state.data && this.state.data.countries) {
            this.state.data.countries.forEach((country, cIndex) => {
                mountainItems.push(<MenuItem key={ 'country' + cIndex } value={undefined} primaryText={country.name + '(' + country.total + ')'} disabled={true}/>);
                this.state.data.mountains.forEach((mountain, mIndex ) => {
                    if (mountain.id_parent === country.id) {
                        mountainItems.push(<MenuItem key={ 'mountain' + mIndex } value={mountain.id} primaryText={mountain.name + ' / ' + mountain.region + ' (' + mountain.total + ')'} />);
                    }
                });
                mountainItems.push(<Divider key={ 'country-divider' + cIndex }/>);
            });

            this.state.data.trailTypes.forEach((trailType, tIndex) => {
                trailTypes.push(<MenuItem key={ 'trailType' + tIndex } value={trailType.id} primaryText={trailType.name + ' - ' + trailType.desc} />);
            });
        }

        return (<div>
                    <Dialog title="New" actions={actions} modal={false} open={this.state.open} onRequestClose={this.onCloseEvent}>
                        <br />
                        Add new geo data file: <input type="file" onChange={this.onUploadDoneEvent}/>
                        <br />
                        <TextField fullWidth={true} hintText="E.g. 'Sarajevo-Nahorevo-Skakavac'" floatingLabelText="Trail name"/>
                        <br />
                        <TextField fullWidth={true} hintText="Between 200 and 400 character" floatingLabelText="Trail description" multiLine={true} rows={2}/>
                        <br />
                        <SelectField value={this.state.mountainID} onChange={this.eventChangeMountain} floatingLabelText="Choose mountain/region" floatingLabelFixed={true} hintText="Choose only one from list" maxHeight={200} autoWidth={true}>{mountainItems}</SelectField>
                        <SelectField value={this.state.trailTypeID} onChange={this.eventChangeTrailType} floatingLabelText="Choose trail type" floatingLabelFixed={true} hintText="Choose only one from list" maxHeight={200} autoWidth={true}>{trailTypes}</SelectField>
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
