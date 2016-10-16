import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

class MainToolbar extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            activeTitle: Lang.label('newTrail'),
            newEditButtonLabel: Lang.label('new'),
            value: 3,
        };
        this.onNewTrailEvent = this.onNewTrail.bind(this);
    }

    onNewTrail() {
        this.setState({
            newEditButtonLabel: Lang.label('edit'),
        });
        this.emit(Enum.AppEvents.OPEN_FORM_NEW_TRAIL);
    }

    render() {
        const style = {
            width: '100%',
        };

        return (
            <Toolbar style={style}>
                <ToolbarGroup>
                    <ToolbarTitle text={this.state.activeTitle} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator />
                    <IconMenu iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                    }>
                        <MenuItem primaryText="Download" />
                        <MenuItem primaryText="More Info" />
                    </IconMenu>
                    <RaisedButton
                        label={this.state.newEditButtonLabel}
                        primary={true}
                        onTouchTap={this.onNewTrailEvent} />
                </ToolbarGroup>
            </Toolbar>
        );
    }

    handleChange(event, index, value) {
        this.setState({
            value,
        });
    }
}

export default MainToolbar;
