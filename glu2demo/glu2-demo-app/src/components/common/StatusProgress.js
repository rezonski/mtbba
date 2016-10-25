import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
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

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onTrailDataRetrieved,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onProcessProgress(payload) {
        if (payload.id === this.state.activeID && payload.loaded && payload.total) {
            const prog = parseInt(((payload.loaded / payload.total) * 100), 10);
            const savePayload = {
                name: this.props.id,
                value: prog,
            };
            this.emit(Enum.DataEvents.SAVE_TRAILDATA2MODEL, savePayload);
            this.setState({
                progressVal: prog,
            });
        }
    }

    onTrailDataRetrieved(payload) {
        if (payload[this.props.id] !== this.state.progressVal) {
            this.setState({
                progressVal: payload[this.props.id],
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
