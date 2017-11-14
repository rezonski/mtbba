import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Paper from 'material-ui/Paper';
import ImagePreview from '../common/ImagePreview';

class PictogramPreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            wpIndex: null,
        };
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.AppEvents.PREVIEW_PICTOGRAM]: this.onDisplayWpRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    componentDidUpdate() {
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    onDisplayWpRequest(payload) {
        this.setState({
            wpIndex: payload.wpIndex,
        });
    }

    render() {
        if (this.state.wpIndex === null) {
            return null;
        }
        const style = {
            height: 200,
            width: 200,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
            position: 'absolute',
            right: '35px',
            top: '50px',
        };

        return (
            <Paper style={style} zDepth={1}>
                <ImagePreview
                    fieldName={'waypoints'}
                    fieldIndex={this.state.wpIndex}
                    fieldProp={'pictogram'}
                />
            </Paper>
        );
    }
}

export default PictogramPreview;
