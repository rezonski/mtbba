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
        if (payload[this.props.fieldName] && payload[this.props.fieldName] !== this.state.value) {
            this.setState({
                value: payload[this.props.fieldName],
            });
        }
    }

    onInitialSetupRetrieved(payload) {
        this.setState({
            initialSetup: payload,
            value: payload[this.props.sourceName][this.props.defaultValueIndex].id,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    render() {
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
