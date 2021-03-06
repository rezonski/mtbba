import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import TextField from 'material-ui/TextField';

class InputTextBox extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            fieldName: this.props.fieldName,
            value: (this.props.value === undefined) ? '' : this.props.value,
            label: (this.props.label) ? this.props.label : '',
        };
        this.onTextFieldChangedEvent = this.onTextFieldChanged.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onTrailDataRetrieved,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fieldName: nextProps.fieldName,
            value: (nextProps.value === undefined) ? this.state.value : nextProps.value,
            label: (nextProps.label) ? nextProps.label : '',
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onTextFieldChanged(event) {
        const payload = {
            name: this.props.fieldName,
            index: this.props.fieldIndex,
            prop: this.props.fieldProp,
            value: event.target.value,
        };
        this.emit(Enum.DataEvents.SAVE_TRAILDATA2MODEL, payload);
        this.setState({
            value: event.target.value,
        });
    }

    onTrailDataRetrieved(payload) {
        if (payload[this.props.fieldName] && this.props.fieldIndex >= 0 && this.props.fieldProp) {
            // console.log(this.props);
            // console.log(payload);
            if (payload[this.props.fieldName][this.props.fieldIndex].properties[this.props.fieldProp] !== this.state.value) {
                this.setState({
                    value: payload[this.props.fieldName][this.props.fieldIndex].properties[this.props.fieldProp],
                });
            }
        } else {
            if (payload[this.props.fieldName] && payload[this.props.fieldName] !== this.state.value) {
                this.setState({
                    value: payload[this.props.fieldName],
                });
            }
        }
    }

    render() {
        const key = (this.props.fieldIndex !== undefined && this.props.fieldProp) ? 'input' + this.props.fieldName + this.props.fieldIndex + this.props.fieldProp : 'input' + this.props.fieldName;
        const inputBoxStyle = (this.props.inputBoxStyle !== undefined) ? this.props.inputBoxStyle : {};
        return (<TextField
                    key={key}
                    value={this.state.value}
                    inputStyle={(this.props.isMultiline) ? {} : inputBoxStyle}
                    textareaStyle={(this.props.isMultiline) ? inputBoxStyle : { }}
                    onChange={this.onTextFieldChangedEvent}
                    multiLine={this.props.isMultiline}
                    rows={this.props.noRows}
                    fullWidth={true}
                    hintText={this.props.filedHintText}
                    floatingLabelText={this.props.filedLabel}/>
                );
    }
}

export default InputTextBox;
