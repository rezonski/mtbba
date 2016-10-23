import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import TextField from 'material-ui/TextField';

class InputTextBox extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.onTextFieldChangedEvent = this.onTextFieldChanged.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onTrailDataRetrieved,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onTextFieldChanged(event) {
        const payload = {
            name: this.props.fieldName,
            value: event.target.value,
        };
        this.emit(Enum.DataEvents.SAVE_TRAILDATA2MODEL, payload);
        this.setState({
            value: event.target.value,
        });
    }

    onTrailDataRetrieved(payload) {
        if (payload[this.props.fieldName] !== this.state.value) {
            this.setState({
                value: payload[this.props.fieldName],
            });
        }
    }

    render() {
        return (<TextField
                    key={'input' + this.props.fieldName}
                    onChange={this.onTextFieldChangedEvent}
                    multiLine={this.props.isMultiline}
                    rows={this.props.noRows}
                    value={this.state.value}
                    fullWidth={true}
                    hintText={this.props.filedHintText}
                    floatingLabelText={this.props.filedLabel}/>
                );
    }
}

export default InputTextBox;
