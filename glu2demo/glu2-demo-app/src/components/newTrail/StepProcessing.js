import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import StatusProgress from '../common/StatusProgress';
import UploadedTrailPreview from '../newTrail/UploadedTrailPreview';
import RaisedButton from 'material-ui/RaisedButton';


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
                    <div className="flex-container margined-right" style={{ minWidth: '180px' }}>{Lang.label('generalProcesProgres') + ': '}</div>
                    <StatusProgress key="generalProgress" id="generalProgress" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right" style={{ minWidth: '180px' }}>{Lang.label('simplifyingPathProgres') + ': '}</div>
                    <StatusProgress key="simplifyPath" id="simplifyPath" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right" style={{ minWidth: '180px' }}>{Lang.label('addingElevationProgres') + ': '}</div>
                    <StatusProgress key="elevationPath" id="elevationPath" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right" style={{ minWidth: '180px' }}>{Lang.label('flattenPathProgres') + ': '}</div>
                    <StatusProgress key="flattenPath" id="flattenPath" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <div className="flex-container margined-right" style={{ minWidth: '180px' }}>{Lang.label('WPFixProgres') + ': '}</div>
                    <StatusProgress key="fixWPs" id="fixWPs" barColor="#FF0000"/>
                </div>
                <div className="flex-container row margined-bottom">
                    <RaisedButton
                        label={Lang.label('startProcessing')}
                        secondary={true}
                        className="margined-right"
                        style={{ minWidth: '200px' }}
                        onTouchTap={this.onStartProcessingRequestEvent} />
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
