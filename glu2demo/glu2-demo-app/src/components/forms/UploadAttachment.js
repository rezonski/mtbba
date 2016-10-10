import React from 'react';
import BusComponent from '../BusComponent';
import FlatButton from 'material-ui/FlatButton';
import Enum from '../../enums/Enum';

const style = {
    inputFile: {
        display: 'none',
    },
};

class UploadAttachment extends BusComponent {
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
        });
    }

    render() {
        return (
            <div>
                <FlatButton label="Dodaj sliku"
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

export default UploadAttachment;
