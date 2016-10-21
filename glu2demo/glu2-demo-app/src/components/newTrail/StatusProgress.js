import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../..//enums/MessageEvents';
import LinearProgress from 'material-ui/LinearProgress';

class StatusProgress extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            activeID: this.props.id,
            barColor: '#FF0000',
            progressVal: 0,
        };
        this.bindGluBusEvents({
            [MessageEvents.GEOFILE_PROCESS_PROGRESS]: this.onGeoFileProcessProgress,
            [MessageEvents.SIMPLIFY_PROGRESS]: this.onGeoFileSimplifyProgress,
            [MessageEvents.TRAIL_ELEVATION_FIX_PROGRESS]: this.onTrailElevationProgress,
            [MessageEvents.PICTURE_UPLOAD_PROGRESS]: this.onPictureUploadProgress,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onGeoFileProcessProgress(payload) {
        if (payload.loaded && payload.total) {
            this.setState({
                barColor: '#FF0000',
                progressVal: ((payload.loaded / payload.total) * 100),
            });
        }
    }

    onGeoFileSimplifyProgress(payload) {
        if (payload.loaded && payload.total) {
            this.setState({
                barColor: '#1FFF00',
                progressVal: ((payload.loaded / payload.total) * 100),
            });
        }
    }

    onTrailElevationProgress(payload) {
        if (payload.loaded && payload.total) {
            this.setState({
                barColor: '#FF00DF',
                progressVal: ((payload.loaded / payload.total) * 100),
            });
        }
    }

    onPictureUploadProgress(payload) {
        if (payload.loaded && payload.total) {
            this.setState({
                barColor: '#FFFF00',
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
