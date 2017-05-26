import React from 'react';
import BasePage from '../BasePage';
// import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import MountainMultiSelection from '../newTrail/MountainMultiSelection';
import ListSelection from '../common/ListSelection';

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
                        defaultValueIndex={1}
                        floatingLabelText={Lang.label('chooseTrailType')}
                    />
                </div>
                <div className="flex-container row">
                    <ListSelection
                        key="fitnessLevelID"
                        fieldName="fitnessLevelID"
                        sourceName="fitnessLevels"
                        defaultValueIndex={1}
                        floatingLabelText={Lang.label('chooseFitnessLevel')}
                    />
                </div>
                <div className="flex-container row">
                    <ListSelection
                        key="techniqueLevelID"
                        fieldName="techniqueLevelID"
                        sourceName="techniqueLevels"
                        defaultValueIndex={1}
                        floatingLabelText={Lang.label('chooseTechniqueLevel')}
                    />
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
