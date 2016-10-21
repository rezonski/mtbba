import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../..//enums/MessageEvents';
import LinearProgress from 'material-ui/LinearProgress';

class StatusProgress extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            activeID: this.props.id,
            barColor: this.props.barColor,
            progressVal: 0,
        };
        this.bindGluBusEvents({
            [MessageEvents.PROGRESS_MESSAGE]: this.onProcessProgress,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onProcessProgress(payload) {
        if (payload.id === this.state.activeID && payload.loaded && payload.total) {
            console.info('Progres ' + this.state.activeID + ' : ' + ((payload.loaded / payload.total) * 100) + '%');
            this.setState({
                progressVal: ((payload.loaded / payload.total) * 100),
            });
        }
    }

    render() {
        return (<div className={'status-progress-box'}>
                    <LinearProgress
                        color={this.state.barColor}
                        mode="determinate"
                        value={this.state.progressVal} />
                </div>);
    }
}

export default StatusProgress;
