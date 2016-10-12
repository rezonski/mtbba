import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../..//enums/MessageEvents';
import LinearProgress from 'material-ui/LinearProgress';

class StatusProgress extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            type: 'initial',
            text: 'load image...',
            imgURL: '',
            progressVal: 0,
        };
        this.bindGluBusEvents({
            [MessageEvents.PICTURE_UPLOAD_STATUS]: this.onOpenModalRequest,
            [MessageEvents.PICTURE_UPLOAD_PROGRESS]: this.onOpenModalRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenModalRequest(payload) {
        if (payload.status !== 'progress') {
            this.setState({
                type: payload.status,
                text: payload.message,
                imgURL: payload.imgURL,
            });
            return;
        } else if (payload.loaded && payload.total) {
            this.setState({
                type: payload.status,
                progressVal: ((payload.loaded / payload.total) * 100),
            });
            return;
        }
    }

    render() {
        const imgPrevStyle = {
            backgroundImage: 'url(' + this.state.imgURL + ')',
        };
        let content;
        if (this.state.type === 'progress') {
            content = (<div className={'status-progress-box'}>
                                <LinearProgress color="#FF0000" mode="determinate" value={this.state.progressVal} />
                        </div>);
        } else {
            content = (<div className={'status-progress-box'}>
                            <div className={'status-text ' + this.state.type}>{this.state.text}</div>
                            <div className="image-preview" style={imgPrevStyle} ></div>
                        </div>);
        }
        return content;
    }
}

export default StatusProgress;
