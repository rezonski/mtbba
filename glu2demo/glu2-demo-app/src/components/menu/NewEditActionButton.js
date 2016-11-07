import React from 'react';
import BasePage from '/components/BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/image/edit';

class NewEditActionButton extends BasePage {
    constructor(params) {
        super(params);
        this.state = {
            actionType: 'new',
            tooltip: Lang.label('new'),
        };
        this.bindGluBusEvents({
        });
        this.onNewTrailEvent = this.onNewTrail.bind(this);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onNewTrail() {
        this.setState({
            actionType: 'edit',
            tooltip: Lang.label('edit'),
        });
        this.emit(Enum.AppEvents.OPEN_FORM_NEW_TRAIL);
    }

    render() {
        let buttonIcon = <ContentAdd />;
        if (this.state.actionType === 'edit') {
            buttonIcon = <ContentEdit />;
        }
        return (<FloatingActionButton
                    onTouchTap={this.onNewTrailEvent}
                    secondary={true}
                >
                    {buttonIcon}
                </FloatingActionButton>
        );
    }
}

export default NewEditActionButton;
