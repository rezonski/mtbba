import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../../enums/MessageEvents';
import Snackbar from 'material-ui/Snackbar';

class Message extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message: '',
            type: null,
        };

        this.bindGluBusEvents({
            [MessageEvents.ERROR_MESSAGE]: this.onErrorMessage,
            [MessageEvents.WARNING_MESSAGE]: this.onWarningMessage,
            [MessageEvents.PICTURE_UPLOAD_STATUS]: this.onUploadStatus,
            [MessageEvents.INFO_MESSAGE]: this.onInfoMessage,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onInfoMessage(message) {
        this.setState({
            open: true,
            message,
            type: 'info',
        });
    }

    onWarningMessage(message) {
        this.setState({
            open: true,
            message,
            type: 'warning',
        });
    }

    onErrorMessage(message) {
        this.setState({
            open: true,
            message,
            type: 'error',
        });
    }

    onUploadStatus(payload) {
        this.setState({
            open: true,
            message: payload.message,
            type: 'info',
        });
    }

    onCloseMessage() {
        this.setState({
            open: false,
            message: '',
            type: null,
        });
    }

    render() {
        return (
            <Snackbar
                className={this.state.type}
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={2000}
                onRequestClose={this.onCloseMessage.bind(this)}/>
        );
    }
}

export default Message;