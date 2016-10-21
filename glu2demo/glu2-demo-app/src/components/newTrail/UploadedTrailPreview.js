import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../..//enums/MessageEvents';

class UploadedTrailPreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.bindGluBusEvents({
            [MessageEvents.INFO_MESSAGE]: this.onNewMessageReceived,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onNewMessageReceived(payload) {
        const today = new Date();
        const h = today.getHours();
        const m = today.getMinutes();
        const s = today.getSeconds();
        if (payload) {
            const currentMessages = this.state.messages;
            currentMessages.push([h + ':' + m + ':' + s, payload]);
            this.setState({
                messages: currentMessages,
            });
        }
    }

    render() {
        let content = [];
        this.state.messages.forEach((message, index) => {
            content.push((<li key={'msg-log-' + index}><span className="time">{message[0]}</span>{message[1]}</li>));
        });
        return (<div className="code-message-preview">
                    <ul>
                        {content}
                    </ul>
                </div>);
    }
}

export default UploadedTrailPreview;
