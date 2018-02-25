import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Globals from '../../Globals';

class WPModalEditor extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: Lang.label('newWaypoint'),
            name: 'Place #',
            pictogram: '90',
            selectedFile: '',
            pictureUrl: '',
        };
        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveEvent = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.ADD_NEW_WAYPOINT]: this.onOpenFormRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenFormRequest(payload) {
        console.log('ADD_NEW_WAYPOINT @ WPModalEditor');
        console.log(payload);
        this.setState({
            open: true,
            position: payload.position,
            action: payload.action,
        });
    }

    onAttachmentUploadClicked() {
        this.refs.fileUpload.click();
    }

    onFileSelected(e) {
        if (e.target.files.length > 0) {
            this.setState({
                selectedFile: e.target.files[0],
                name: 'Foto ' + e.target.files[0].name,
            });
            this.onStartUpload(e.target.files[0], this);
        }
    }

    onImageUploaded(filePath) {
        this.setState({
            pictureUrl: filePath,
        });
    }

    onStartUpload(selectedFile, context) {
        const data = new FormData();
        data.append('SelectedFile', selectedFile);
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                let resp = '';
                try {
                    resp = JSON.parse(request.response);
                } catch (e) {
                    resp = {
                        status: 'error',
                        data: 'Unknown error occurred: [' + request.responseText + ']',
                    };
                }
                console.log(resp);
                const filePath = Globals.IMAGE_UPLOAD_PATH + resp.fileName;
                context.onImageUploaded(filePath);
            }
        };
        request.open('POST', Globals.IMAGE_UPLOADER_PATH);
        request.send(data);
    }

    render() {
        const style = {
            newpoint: {
                width: 300,
                height: 300,
                backgroundImage: 'url("' + Globals.IMAGE_UPLOAD_PATH + 'svg/getsvg.php?opis=' + this.state.pictogram + '")',
            },
            newphoto: {
                width: 300,
                height: 300,
                backgroundImage: 'url("' + this.state.pictureUrl + '")',
            },
            inputFile: {
                display: 'none',
            },
        };

        const actions = [
            <FlatButton
                label={Lang.label('cancel')}
                primary={true}
                onTouchTap={this.onCloseEvent}
            />,
            <RaisedButton
                label={Lang.label('save')}
                primary={true}
                // disabled={this.state.openDisabled}
                onTouchTap={this.onSaveEvent}
            />,
        ];

        let content = null;

        if (this.state.action === 'newpoint') {
            content = (<div className="flex-container row">
                <div className="flex-container column">
                    <div
                        key="pictogram-preview"
                        className="image-preview"
                        style={style.newpoint}
                    />
                </div>
                <div className="flex-container column">
                    <TextField
                        key="wp-name"
                        floatingLabelText="Enter waypoint/place name"
                        value={this.state.name}
                        onChange={this.changeName.bind(this)}
                    />
                    <TextField
                        key="wp-pictogram"
                        floatingLabelText="Enter waypoint pictogram code"
                        value={this.state.pictogram}
                        onChange={this.changePictogram.bind(this)}
                    />
                </div>
            </div>);
        } else if (this.state.action === 'newphoto') {
            content = (<div className="flex-container row">
                <div className="flex-container column">
                    <div
                        key="pictogram-preview"
                        className="image-preview"
                        style={style.newphoto}
                    />
                </div>
                <div className="flex-container column">
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
            </div>);
        }


        return (
            <Dialog
                className="dialog"
                title={this.state.title}
                modal={false}
                open={this.state.open}
                actions={actions}
                onRequestClose={this.onCloseEvent}
            >
                {content}
            </Dialog>
        );
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    handleSave() {
        console.log('handleSave @ WPModalEditor');
        console.log({
            position: this.state.position,
            name: this.state.name,
            action: this.state.action,
            pictogram: this.state.pictogram,
            pictureUrl: this.state.pictureUrl,
        });
        window.leftmap.fire('addNewWaypoint', {
            position: this.state.position,
            name: this.state.name,
            action: this.state.action,
            pictogram: this.state.pictogram,
            pictureUrl: this.state.pictureUrl,
        });
        this.setState({
            open: false,
        });
    }

    changeName(event) {
        this.setState({
            name: event.target.value,
        });
    }

    changePictogram(event) {
        this.setState({
            pictogram: event.target.value,
        });
    }
}

export default WPModalEditor;
