import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import StatusProgress from '../common/StatusProgress';
import InputTextBox from '../common/InputTextBox';
// import UploadedTrailPreview from '../newTrail/UploadedTrailPreview';
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
            </div>
            <div className="flex-element column narower margined-left">
                <div className="flex-container row">
                    {Lang.label('elevationThreshold')}
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right">
                        <InputTextBox
                            key="absoluteElevationThreshold"
                            fieldName="absoluteElevationThreshold"
                            isMultiline={false}
                            noRows={1}
                            filedLabel={Lang.label('absoluteElevationThreshold')}
                            filedHintText={Lang.label('absoluteElevationThresholdHint')}
                        />
                    </div>
                    <div className="flex-container margined-right">
                        <InputTextBox
                            key="relativeElevationThreshold"
                            fieldName="relativeElevationThreshold"
                            isMultiline={false}
                            noRows={1}
                            filedLabel={Lang.label('relativeElevationThreshold')}
                            filedHintText={Lang.label('relativeElevationThresholdHint')}
                        />
                    </div>
                    <div className="flex-container margined-right">
                        <InputTextBox
                            key="slopeTreshlod"
                            fieldName="slopeTreshlod"
                            isMultiline={false}
                            noRows={1}
                            filedLabel={Lang.label('slopeTreshlod')}
                            filedHintText={Lang.label('slopeTreshlodHint')}
                        />
                    </div>
                </div>
                <div className="flex-container row margined-bottom">
                    <Switch
                        key="overrideThumbnails"
                        fieldName="overrideThumbnails"
                        label={Lang.label('overrideThumbnails')}
                        // type="toggle"
                        type="checkbox"
                    />
                </div>
                <div className="flex-container row margined-bottom">
                    <Switch
                        key="snapWPsToPath"
                        fieldName="snapWPsToPath"
                        label={Lang.label('snapWPsToPath')}
                        // type="toggle"
                        type="checkbox"
                    />
                </div>
                <div className="flex-container row margined-bottom">
                    <RaisedButton
                        label={Lang.label('startProcessing')}
                        secondary={true}
                        className="margined-right"
                        style={{ minWidth: '200px' }}
                        onTouchTap={this.onStartProcessingRequestEvent}
                    />
                </div>
            </div>
        </div>);
    }
}

export default StepProcessing;
