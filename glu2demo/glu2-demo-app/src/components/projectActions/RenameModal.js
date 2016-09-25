import React from 'react';
import BusComponent from '../BusComponent';
import Input from '/components/form/Input';

class RenameModal extends BusComponent {
    constructor(props) {
        super(props);
        this.state = {
            validationMessage: null,
        };
        this.bindGluBusEvents({
            VALIDATION_ERROR: this.onValidationErrorOccured,
            UPDATE_PROJECT: this.onResetValidationError,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onValidationErrorOccured(message) {
        this.setState({
            validationMessage: message,
        });
    }

    onResetValidationError() {
        this.setState({
            validationMessage: null,
        });
    }

    render() {
        return (<div>
                <h1>Rename</h1>
                <label htmlFor="title">Title</label>
                <Input onChange={this.props.onRename.bind(this)} value={this.props.project.title} />
                {this.state.validationMessage}
            </div>);
    }
}

export default RenameModal;
