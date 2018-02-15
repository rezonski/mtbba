import React from 'react';
import BasePage from '../BasePage';
// import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import UploadImage from '../common/UploadImage';
import ImagePreview from '../common/ImagePreview';
import StatusProgress from '../common/StatusProgress';
import InputTextBox from '../common/InputTextBox';

class StepDescription extends BasePage {
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
                    <InputTextBox
                        key="trailDesc"
                        fieldName="trailDesc"
                        isMultiline={true}
                        noRows={8}
                        filedLabel={Lang.label('trailDesc')}
                        filedHintText={Lang.label('trailDescHint')}
                    />
                </div>
                <div className="flex-container row">
                    <InputTextBox
                        key="externalLink"
                        fieldName="externalLink"
                        isMultiline={false}
                        noRows={1}
                        filedLabel={Lang.label('externalLink')}
                        filedHintText={Lang.label('externalLinkHint')}
                    />
                </div>
            </div>
            <div className="flex-element column">
                <div className="flex-container row">
                    <UploadImage
                        key="imageURL"
                        fieldName="imageURL"
                    />
                </div>
                <div className="flex-container row">
                </div>
                <div className="flex-container column">
                    <div className="flex-container row">{Lang.label('imageUploadProgres')}</div>
                    <StatusProgress key="uploadImage" id="uploadImage" barColor="#33FFFF"/>
                </div>
                <div className="flex-container row">
                    <ImagePreview
                        fieldName={'imageURL'}
                        fieldIndex={undefined}
                        fieldProp={undefined}
                    />
                </div>
            </div>
        </div>);
    }
}

export default StepDescription;
