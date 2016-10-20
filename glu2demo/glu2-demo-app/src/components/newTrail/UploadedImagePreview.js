import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../..//enums/MessageEvents';

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

    render() {
        const contentStyle = {
            backgroundImage: 'url("' + this.state.imageURL + '")',
        };
        return (<div className="image-preview" style={contentStyle}></div>);
    }
}

export default UploadedImagePreview;
