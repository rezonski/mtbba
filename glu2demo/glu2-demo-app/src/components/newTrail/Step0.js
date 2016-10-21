import React from 'react';
import BasePage from '../BasePage';
// import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import InputTextBox from '../newTrail/InputTextBox';
import UploadGeoFile from '../newTrail/UploadGeoFile';
import StatusProgress from '../newTrail/StatusProgress';
import UploadedTrailPreview from '../newTrail/UploadedTrailPreview';
import Divider from 'material-ui/Divider';

class Step0 extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.bindGluBusEvents({
            // [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }


    render() {
        return (<div className="flex-container row">
            <div className="flex-element column margined-right">
                <div className="flex-container column">
                    <UploadGeoFile />
                </div>
                <div className="flex-container row">
                </div>
                <div className="flex-container column">
                    <div className="flex-container row">{Lang.label('generalProcesProgres')}</div>
                    <StatusProgress key="generalProgress" id="generalProgress" barColor="#FF0000"/>
                    <Divider />
                </div>
                <div className="flex-container column">
                    <div className="flex-container row">{Lang.label('simplifyingPathProgres')}</div>
                    <StatusProgress key="simplifyPath" id="simplifyPath" barColor="#FF0000"/>
                    <Divider />
                </div>
                <div className="flex-container column">
                    <div className="flex-container row">{Lang.label('addingElevationProgres')}</div>
                    <StatusProgress key="elevationPath" id="elevationPath" barColor="#FF0000"/>
                    <Divider />
                </div>
                <div className="flex-container column">
                    <InputTextBox
                        key="trailName"
                        fieldName="trailName"
                        isMultiline={false}
                        noRows={1}
                        filedLabel={Lang.label('trailName')}
                        filedHintText={Lang.label('trailNameHint')}
                    />
                </div>
            </div>
            <div className="flex-element column margined-right">
                <div className="flex-container row">
                    <UploadedTrailPreview/>
                </div>
            </div>
        </div>);
    }
}

export default Step0;
