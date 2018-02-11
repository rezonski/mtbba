import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ListSelection extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            fieldName: this.props.fieldName,
            sourceName: this.props.sourceName,
            defaultValueIndex: (this.props.defaultValueIndex !== undefined) ? this.props.defaultValueIndex : 0,
            label: (this.props.label) ? this.props.label : '',
            initialSetup: (this.props.optionList) ? { optionList: this.props.optionList } : {},
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            fieldName: nextProps.fieldName,
            sourceName: nextProps.sourceName,
            defaultValueIndex: (nextProps.defaultValueIndex !== undefined) ? nextProps.defaultValueIndex : 0,
            label: (nextProps.label) ? nextProps.label : '',
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onListValueChanged(event, key, value) {
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
        if (this.props.fieldIndex !== undefined &&
            payload[this.props.fieldName] &&
            payload[this.props.fieldName][this.props.fieldIndex] &&
            payload[this.props.fieldName][this.props.fieldIndex][this.props.fieldProp]) {
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

    onInitialSetupRetrieved(payload) {
        if (payload[this.props.sourceName] && (!this.state.initialSetup[this.props.sourceName] || this.state.initialSetup[this.props.sourceName][this.state.defaultValueIndex].id !== this.state.value)) {
            this.setState({
                initialSetup: payload,
                value: payload[this.props.sourceName][this.state.defaultValueIndex].id,
            });
            this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
        }
    }

    render() {
        if (this.state.value === undefined) {
            return null;
        }

        const style = {
            menuItem: {
                fontSize: '12px',
            },
        };

        let listElements = [];
        if (this.state.initialSetup && this.state.initialSetup[this.props.sourceName]) {
            this.state.initialSetup[this.props.sourceName].forEach((element, index) => {
                listElements.push(<MenuItem
                                    key={ this.props.sourceName + index }
                                    value={element.id}
                                    style={style.menuItem}
                                    primaryText={element.name}
                                    secondaryText={element.desc}
                                />);
            });
        }

        return (<SelectField
                    key={'selectList' + this.props.fieldName}
                    onChange={this.onListValueChangedEvent}
                    value={this.state.value}
                    floatingLabelText={this.props.floatingLabelText}
                    maxHeight={300}
                    fullWidth={true} >
                    {listElements}
                </SelectField>);
    }
}

export default ListSelection;
