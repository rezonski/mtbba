import React from 'react';
import BasePage from '../BasePage';
// import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import InputTextBox from '../newTrail/InputTextBox';
import UploadGeoFile from '../newTrail/UploadGeoFile';
import StatusProgress from '../newTrail/StatusProgress';
import UploadedTrailPreview from '../newTrail/UploadedTrailPreview';

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
                <div className="flex-container row">
                    <UploadGeoFile />
                </div>
                <div className="flex-container row">
                    <StatusProgress key="geoFileProcess" id="geoFileProcess"/>
                </div>
                <div className="flex-container row">
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
