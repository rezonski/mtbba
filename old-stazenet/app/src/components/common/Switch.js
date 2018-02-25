import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';

class Switch extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            fieldName: this.props.fieldName,
            value: (this.props.value === undefined) ? false : this.props.value,
            label: (this.props.label) ? this.props.label : '',
            type: (this.props.type) ? this.props.type : 'toggle',
        };
        this.onToggleCheckEvent = this.onToggleCheck.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onDataRetrieved,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fieldName: nextProps.fieldName,
            value: (nextProps.value === undefined) ? this.state.value : nextProps.value,
            label: (nextProps.label) ? nextProps.label : '',
            type: (nextProps.type) ? nextProps.type : 'toggle',
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onToggleCheck(event, value) {
        const payload = {
            name: this.props.fieldName,
            index: this.props.fieldIndex,
            prop: this.props.fieldProp,
            value,
        };
        this.emit(Enum.DataEvents.SAVE_TRAILDATA2MODEL, payload);
        this.setState({
            value,
        });
    }

    onDataRetrieved(payload) {
        if (payload[this.props.fieldName] && this.props.fieldIndex !== undefined && this.props.fieldProp) {
            if (payload[this.props.fieldName][this.props.fieldIndex][this.props.fieldProp] !== this.state.value) {
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
        const styles = {
            toggle: {
                marginBottom: 16,
            },
            checkbox: {
                marginBottom: 16,
            },
        };
        if (this.state.type === 'toggle') {
            return (<Toggle
                        label={this.state.label}
                        style={styles.toggle}
                        labelPosition="right"
                        toggled={this.state.value}
                        onToggle={this.onToggleCheckEvent}
                    />);
        }
        return (<Checkbox
                    label={this.state.label}
                    style={styles.checkbox}
                    checked={this.state.value}
                    onCheck={this.onToggleCheckEvent}
                />);
    }
}

export default Switch;
