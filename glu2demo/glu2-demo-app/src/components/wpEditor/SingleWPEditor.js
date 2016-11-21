import React from 'react';
import BasePage from '../BasePage';
// import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import InputTextBox from '../common/InputTextBox';

class SingleWPEditor extends BasePage {
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
            <InputTextBox
                key={'waypoints'}
                fieldName={'waypoints'}
                fieldIndex={this.props.wp.properties.id}
                fieldProp={'descgenerated'}
                isMultiline={true}
                noRows={6}
                filedLabel={Lang.label('wpDesc')}
                filedHintText={Lang.label('trailDescHint')}
            />
        </div>);
    }
}

export default SingleWPEditor;
