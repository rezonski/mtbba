import React from 'react';
import BasePage from '../BasePage';
// import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import InputTextBox from '../common/InputTextBox';
import UploadGeoFile from '../newTrail/UploadGeoFile';
import UploadedTrailPreview from '../newTrail/UploadedTrailPreview';

class StepUpload extends BasePage {
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
            <div className="flex-element column">
                <div className="flex-container row">
                    <UploadedTrailPreview/>
                </div>
            </div>
        </div>);
    }
}

export default StepUpload;
