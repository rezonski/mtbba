import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
import appConfig from '../../appConfig';

class ImagePreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
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
                value: payload.imgURL,
            });
        }
    }

    onTrailDataRetrieved(payload) {
        if (payload[this.props.fieldName] && this.props.fieldIndex !== undefined && this.props.fieldProp) {
            if (payload[this.props.fieldName][this.props.fieldIndex][this.props.fieldProp] !== this.state.value) {
                this.setState({
                    value: payload[this.props.fieldName][this.props.fieldIndex].properties[this.props.fieldProp],
                });
            }
        } else {
            if (payload[this.props.fieldName] && payload[this.props.fieldName] !== this.state.value) {
                this.setState({
                    value: payload[this.props.fieldName],
                });
            }
        }
    }

    render() {
        let contentStyle = {
            backgroundImage: 'url("' + this.state.value + '")',
        };
        if (this.props.fieldName === 'waypoints' && this.props.fieldProp === 'pictogram') {
            contentStyle = {
                backgroundImage: 'url("' + appConfig.constants.server + '/svg/getsvg.php?opis=' + this.state.value + '")',
            };
        }
        const key = (this.props.fieldIndex !== undefined && this.props.fieldProp) ? 'picture' + this.props.fieldName + this.props.fieldIndex + this.props.fieldProp : 'picture' + this.props.fieldName;

        return (<div
                    key={key}
                    className="image-preview"
                    style={contentStyle}
                >
                    <img src="http://127.0.0.1:8080/sandbox/examples/upload/watermark/watermark.png" />
                </div>);
    }
}

export default ImagePreview;
