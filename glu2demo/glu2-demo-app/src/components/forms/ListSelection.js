import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ListSelection extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            initialSetup: {},
        };
        this.onListValueChangedEvent = this.onListValueChanged.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onDataRetrieved,
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialSetupRetrieved,
        });
        this.emit(Enum.MapEvents.RETRIEVE_INITIAL_DATA_SETUP);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onListValueChanged(event, key, value) {
        const payload = {
            name: this.props.fieldName,
            value,
        };
        this.emit(Enum.DataEvents.SAVE_TRAILDATA2MODEL, payload);
        this.setState({
            value,
        });
    }

    onDataRetrieved(payload) {
        if (payload[this.props.fieldName] !== this.state.value) {
            this.setState({
                value: payload[this.props.fieldName],
            });
        }
    }

    onInitialSetupRetrieved(payload) {
        this.setState({
            initialSetup: payload,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    render() {
        let trailTypes = [];
        if (this.state.initialSetup && this.state.initialSetup.trailTypes) {
            this.state.initialSetup.trailTypes.forEach((trailType, tIndex) => {
                trailTypes.push(<MenuItem key={ 'trailType' + tIndex } value={trailType.id} primaryText={trailType.name + ' - ' + trailType.desc} />);
            });
        }

        return (<SelectField
                    key={'selectList' + this.props.fieldName}
                    onChange={this.onListValueChangedEvent}
                    value={this.state.value}
                    hintText={this.props.filedHintText}
                    floatingLabelText={this.props.floatingLabelText}
                    floatingLabelFixed={true}
                    maxHeight={200}
                    fullWidth={true} >
                    {trailTypes}
                </SelectField>);
    }
}

export default ListSelection;
