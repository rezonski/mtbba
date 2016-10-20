import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../..//enums/MessageEvents';
import LinearProgress from 'material-ui/LinearProgress';

class StatusProgress extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            geoFileProcessProgressVal: 0,
            imageUploadProgressVal: 0,
        };
        this.bindGluBusEvents({
            [MessageEvents.GEOFILE_PROCESS_PROGRESS]: this.onGeoFileProcessProgress,
            [MessageEvents.PICTURE_UPLOAD_PROGRESS]: this.onPictureUploadProgress,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onGeoFileProcessProgress(payload) {
        if (payload.loaded && payload.total) {
            this.setState({
                geoFileProcessProgressVal: ((payload.loaded / payload.total) * 100),
            });
        }
    }

    onPictureUploadProgress(payload) {
        if (payload.loaded && payload.total) {
            this.setState({
                imageUploadProgressVal: ((payload.loaded / payload.total) * 100),
            });
        }
    }

    render() {
        let content;
        switch (this.props.id) {
            case 'geoFileProcess':
                content = <LinearProgress color="#FF0000" mode="determinate" value={this.state.geoFileProcessProgressVal} />;
                break;
            case 'imageFileProcess':
                content = <LinearProgress color="#FF0000" mode="determinate" value={this.state.imageUploadProgressVal} />;
                break;
            default:
                content = <LinearProgress color="#FF0000" mode="determinate" value={1} />;
        }
        return (<div className={'status-progress-box'}>{content}</div>);
    }
}

export default StatusProgress;
