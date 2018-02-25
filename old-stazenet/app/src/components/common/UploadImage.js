import React from 'react';
import BusComponent from '../BusComponent';
import RaisedButton from 'material-ui/RaisedButton';
import Enum from '../../enums/Enum';
import Lang from '../../helpers/Lang';

class UploadImage extends BusComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: '',
        };
    }

    onAttachmentUploadClicked() {
        this.refs.fileUpload.click();
    }

    onFileSelected(e) {
        if (e.target.files.length > 0) {
            this.setState({ selectedFile: e.target.files[0] }, this.onStartUpload.bind(this));
        }
    }

    onStartUpload() {
        this.emit(Enum.DataEvents.START_IMAGE_UPLOAD, {
            fileName: this.state.selectedFile.name,
            file: this.state.selectedFile,
            name: this.props.fieldName,
            index: this.props.fieldIndex,
            prop: this.props.fieldProp,
        });
    }

    render() {
        const style = {
            inputFile: {
                display: 'none',
            },
        };
        return (
            <div>
                <RaisedButton
                    label={Lang.label('addImageFile')}
                    secondary={true}
                    onTouchTap={this.onAttachmentUploadClicked.bind(this)} />
                <input type="file"
                       key={this.state.selectedFile}
                       ref="fileUpload"
                       onChange={this.onFileSelected.bind(this)}
                       style={style.inputFile} />
            </div>
        );
    }
}

export default UploadImage;
