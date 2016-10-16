import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../..//enums/MessageEvents';
import LinearProgress from 'material-ui/LinearProgress';

class StatusProgress extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            progressVal: 0,
        };
        this.bindGluBusEvents({
            [MessageEvents.PICTURE_UPLOAD_PROGRESS]: this.onProgressStatus,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onProgressStatus(payload) {
        if (payload.loaded && payload.total) {
            this.setState({
                progressVal: ((payload.loaded / payload.total) * 100),
            });
        }
    }

    render() {
        return (<div className={'status-progress-box'}>
                    <LinearProgress color="#FF0000" mode="determinate" value={this.state.progressVal} />
                </div>);
    }
}

export default StatusProgress;
