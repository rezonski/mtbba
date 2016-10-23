import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../..//enums/MessageEvents';
import Enum from '../..//enums/Enum';

class UploadedImagePreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: '',
        };
        this.bindGluBusEvents({
            [MessageEvents.PICTURE_UPLOAD_STATUS]: this.onPictureUploadStatus,
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

    onPictureUploadStatus(payload) {
        if (payload.imgURL) {
            this.setState({
                imageURL: payload.imgURL,
            });
        }
    }

    onTrailDataRetrieved(payload) {
        if (payload.imageURL !== this.state.imageURL) {
            this.setState({
                imageURL: payload.imageURL,
            });
        }
    }

    render() {
        const contentStyle = {
            backgroundImage: 'url("' + this.state.imageURL + '")',
        };
        return (<div className="image-preview" style={contentStyle}></div>);
    }
}

export default UploadedImagePreview;
