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
            const prog = parseInt(((payload.loaded / payload.total) * 100), 10);
            console.info('Progres ' + this.state.activeID + ' : ' + prog + '%');
            this.setState({
                progressVal: prog,
            });
        }
    }

    render() {
        return (<div className={'status-progress-box'}>
                    <LinearProgress
                        color={this.state.barColor}
                        mode="determinate"
                        style={{ height: '6px' }}
                        value={this.state.progressVal} />
                </div>);
    }
}

export default StatusProgress;
