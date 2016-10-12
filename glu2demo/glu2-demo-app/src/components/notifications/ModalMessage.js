import React from 'react';
import BasePage from '../BasePage';
// import Enum from '../../enums/Enum';
import MessageEvents from '/enums/MessageEvents';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

class ModalMessage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.onCloseEvent = this.handleClose.bind(this);

        this.bindGluBusEvents({
            [MessageEvents.STATUS_MESSAGE]: this.onOpenModalRequest,
            [MessageEvents.PROGRESS_MESSAGE]: this.onOpenModalRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenModalRequest(payload) {
        if (payload.status) {
            this.setState({
                open: true,
                type: 'Message',
                statusMessage: payload.status,
            });
            return;
        } else if (payload.loaded && payload.total) {
            this.setState({
                open: true,
                type: 'Progress',
                loaded: payload.loaded,
                total: payload.total,
            });
            return;
        }
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

        let content;

        if (this.state.type && this.state.type === 'Progress') {
            content = <LinearProgress mode="determinate" value={this.state.loaded / this.state.total} />;
        } else if (this.state.type && this.state.type === 'Progress') {
            content = <div>{this.state.statusMessage}</div>;
        }


        return (<Dialog
                    className="dialog"
                    title={this.state.type}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.onCloseEvent}>
                    {content}
                </Dialog>);
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }
}

export default ModalMessage;
