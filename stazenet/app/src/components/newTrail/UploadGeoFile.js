import React from 'react';
import BusComponent from '../BusComponent';
import RaisedButton from 'material-ui/RaisedButton';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';

const style = {
    inputFile: {
        display: 'none',
    },
};

class UploadGeoFile extends BusComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: '',
        };
        this.onFileSelectedEvent = this.onFileSelected.bind(this);
    }

    onAttachmentUploadClicked() {
        this.refs.fileUpload.click();
    }

    onFileSelected(e) {
        if (e.target.files.length > 0) {
            this.setState({
                selectedFile: e.target.files[0],
            }, this.onStartUpload.bind(this));
        }
    }

    onStartUpload() {
        this.emit(Enum.DataEvents.SAVE_INITIAL_GEO_FILE, {
            fileName: this.state.selectedFile.name,
            file: this.state.selectedFile,
        });
    }

    render() {
        return (
            <div>
                <RaisedButton
                    label={Lang.label('addGeoFile')}
                    primary={true}
                    onTouchTap={this.onAttachmentUploadClicked.bind(this)} />
                <input
                    type={"file"}
                    ref={'fileUpload'}
                    onChange={this.onFileSelectedEvent}
                    style={style.inputFile} />
            </div>
        );
    }
}

export default UploadGeoFile;
