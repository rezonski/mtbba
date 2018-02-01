import React from 'react';
import BasePage from '../BasePage';
import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
import appConfig from '../../appConfig';
import AppConfig from '/appConfig';

class ImagePreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
        };
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onTrailDataRetrieved,
            [MessageEvents.PICTURE_UPLOAD_STATUS]: this.onPictureUploadStatus,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    // componentWillUnmount() {
    //     this.unbindGluBusEvents();
    // }

    onPictureUploadStatus(payload) {
        if (payload.imgURL) {
            this.setState({
                value: payload.imgURL,
            });
        }
    }

    onTrailDataRetrieved(payload) {
        if (payload[this.props.fieldName] && this.props.fieldIndex !== undefined && this.props.fieldProp) {
            // console.log(this.props);
            // console.log(payload);
            if (payload[this.props.fieldName][this.props.fieldIndex].properties[this.props.fieldProp] !== this.state.value) {
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
        if (!this.state.value) {
            return null;
        }

        let contentStyle = { backgroundImage: 'url("' + this.state.value + '")' };
        let content = <img src={AppConfig.constants.server + 'upload/watermark/watermark.png'} />;

        if (this.props.fieldName === 'waypoints' && this.props.fieldProp === 'pictogram') {
            contentStyle = {
                backgroundImage: 'url("' + appConfig.constants.server + '/svg/getsvg.php?opis=' + this.state.value + '")',
            };
            content = null;
        }
        const key = (this.props.fieldIndex !== undefined && this.props.fieldProp) ? 'picture' + this.props.fieldName + this.props.fieldIndex + this.props.fieldProp : 'picture' + this.props.fieldName;

        return (<div
                    key={key}
                    className="image-preview"
                    style={contentStyle}
                >
                    {content}
                </div>);
    }
}

export default ImagePreview;
