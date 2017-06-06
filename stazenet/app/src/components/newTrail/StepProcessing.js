import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import StatusProgress from '../common/StatusProgress';
import UploadedTrailPreview from '../newTrail/UploadedTrailPreview';
import RaisedButton from 'material-ui/RaisedButton';
import Switch from '../common/Switch';


class StepProcessing extends BasePage {
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
            <div className="flex-element column wider">
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right label-width">{Lang.label('generalProcesProgres') + ': '}</div>
                    <StatusProgress key="progressGeneral" id="progressGeneral" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right label-width">{Lang.label('simplifyingPathProgres') + ': '}</div>
                    <StatusProgress key="progressSimplifyPath" id="progressSimplifyPath" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right label-width">{Lang.label('addingElevationProgres') + ': '}</div>
                    <StatusProgress key="progressElevationPath" id="progressElevationPath" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right label-width">{Lang.label('flattenPathProgres') + ': '}</div>
                    <StatusProgress key="progressFlattenPath" id="progressFlattenPath" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right label-width">{Lang.label('WPFixProgres') + ': '}</div>
                    <StatusProgress key="progressFixWPs" id="progressFixWPs" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <RaisedButton
                        label={Lang.label('startProcessing')}
                        secondary={true}
                        className="margined-right"
                        style={{ minWidth: '200px' }}
                        onTouchTap={this.onStartProcessingRequestEvent} />
                    <Switch
                        key="overrideThumbnails"
                        fieldName="overrideThumbnails"
                        label={Lang.label('overrideThumbnails')}
                        // type="toggle"
                        type="checkbox"
                    />
                </div>
            </div>
            <div className="flex-element column narower margined-left">
                <div className="flex-container row">
                    <UploadedTrailPreview/>
                </div>
            </div>
        </div>);
    }
}

export default StepProcessing;
