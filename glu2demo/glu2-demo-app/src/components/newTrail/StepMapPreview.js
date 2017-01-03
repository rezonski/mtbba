import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import MapPreview from '/components/map/MapPreview';
import RaisedButton from 'material-ui/RaisedButton';

class StepMapPreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.bindGluBusEvents({
            // [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
        });
        this.onStartProcessingRequestEvent = this.onStartProcessingRequest.bind(this);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onStartProcessingRequest() {
        this.emit(Enum.DataEvents.START_SIMPLIFYING_PATH);
    }


    render() {
        return (<div className="flex-container row">
            <div className="flex-element column narower2 margined-right">
                <RaisedButton
                    label={Lang.label('startProcessing')}
                    secondary={true}
                    className="margined-right"
                    style={{ minWidth: '200px' }}
                    onTouchTap={this.onStartProcessingRequestEvent} />
            </div>
            <div className="flex-element column wider2">
                <MapPreview />
            </div>
        </div>);
    }
}

export default StepMapPreview;
