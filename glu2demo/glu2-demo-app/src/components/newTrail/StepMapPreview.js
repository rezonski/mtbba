import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
// import MapPreview from '/components/map/MapPreview';
import RaisedButton from 'material-ui/RaisedButton';

class StepMapPreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            previewMapInitialised: false,
        };
        this.bindGluBusEvents({
            // [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
        });
        this.onManualyEditPathPointsRequestEvent = this.onManualyEditPathPointsRequest.bind(this);
    }

    componentDidMount() {
        if (!this.state.previewMapInitialised) {
            this.emit(Enum.MapEvents.SHOW_PREVIEW_MAP);
            this.setState({
                previewMapInitialised: true,
            });
        }
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onManualyEditPathPointsRequest() {
        this.emit(Enum.AppEvents.CLOSE_FORM_NEW_TRAIL);
    }


    render() {
        return (<div className="flex-container row">
            <div className="flex-element column narower2 margined-right">
                <RaisedButton
                    label={Lang.label('manualEditPath')}
                    secondary={true}
                    className="margined-right"
                    style={{ minWidth: '200px' }}
                    onTouchTap={this.onManualyEditPathPointsRequestEvent} />
            </div>
            {/* <div className="flex-element column wider2">
                <MapPreview />
            </div>*/}
        </div>);
    }
}

export default StepMapPreview;
