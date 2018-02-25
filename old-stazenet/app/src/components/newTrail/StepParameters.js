import React from 'react';
import BasePage from '../BasePage';
// import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import MountainMultiSelection from '../newTrail/MountainMultiSelection';
import ListSelection from '../common/ListSelection';
import InputTextBox from '../common/InputTextBox';

class StepParameters extends BasePage {
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
                     <ListSelection
                        key="trailTypeID"
                        fieldName="trailTypeID"
                        sourceName="trailTypes"
                        defaultValueIndex={0}
                        floatingLabelText={Lang.label('chooseTrailType')}
                    />
                </div>
                <div className="flex-container row">
                    <ListSelection
                        key="requiredFitness"
                        fieldName="requiredFitness"
                        sourceName="fitnessLevels"
                        defaultValueIndex={0}
                        floatingLabelText={Lang.label('chooseFitnessLevel')}
                    />
                </div>
                <div className="flex-container row">
                    <ListSelection
                        key="requiredTechnique"
                        fieldName="requiredTechnique"
                        sourceName="techniqueLevels"
                        defaultValueIndex={0}
                        floatingLabelText={Lang.label('chooseTechniqueLevel')}
                    />
                </div>
                <div className="flex-container row">
                    <div className="flex-container margined-right">
                        <InputTextBox
                            key="reviewLandscape"
                            fieldName="reviewLandscape"
                            isMultiline={false}
                            noRows={1}
                            filedLabel={Lang.label('reviewLandscape')}
                        />
                    </div>
                    <div className="flex-container margined-right">
                        <InputTextBox
                            key="reviewFun"
                            fieldName="reviewFun"
                            isMultiline={false}
                            noRows={1}
                            filedLabel={Lang.label('reviewFun')}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-element column">
                <div className="flex-container row">
                    {Lang.label('selectMountain') + ': '}
                </div>
                <div className="flex-container row">
                    <MountainMultiSelection />
                </div>
            </div>
        </div>);
    }
}

export default StepParameters;
