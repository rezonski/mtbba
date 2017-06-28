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
            duration: 2000,
        };

        this.bindGluBusEvents({
            [MessageEvents.ERROR_MESSAGE]: this.onErrorMessage,
            [MessageEvents.WARNING_MESSAGE]: this.onWarningMessage,
            [MessageEvents.PICTURE_UPLOAD_STATUS]: this.onUploadStatus,
            [MessageEvents.INFO_MESSAGE]: this.onInfoMessage,
            [MessageEvents.LONGER_INFO_MESSAGE]: this.onLongerInfoMessage,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onInfoMessage(message) {
        this.setState({
            open: true,
            message,
            duration: 2000,
            type: 'info',
        });
    }

    onLongerInfoMessage(message) {
        this.setState({
            open: true,
            message,
            duration: 4000,
            type: 'info',
        });
    }

    onWarningMessage(message) {
        this.setState({
            open: true,
            message,
            duration: 2000,
            type: 'warning',
        });
    }

    onErrorMessage(message) {
        this.setState({
            open: true,
            message,
            duration: 2000,
            type: 'error',
        });
    }

    onUploadStatus(payload) {
        this.setState({
            open: true,
            message: payload.message,
            duration: 2000,
            type: 'info',
        });
    }

    onCloseMessage() {
        this.setState({
            open: false,
            message: '',
            duration: 2000,
            type: null,
        });
    }

    render() {
        // console.info('# ' + this.state.message);
        return (
            <Snackbar
                className={this.state.type}
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={this.state.duration}
                onRequestClose={this.onCloseMessage.bind(this)}/>
        );
    }
}

export default Message;
