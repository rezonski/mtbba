import React from 'react';
import BasePage from '../BasePage';
// import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
// import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

class MainToolbar extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            activeTitle: 'New',
            value: 3,
        };
        this.onNewTrailEvent = this.onNewTrail.bind(this);
    }

    onNewTrail() {
        // console.info('ok');
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
                    <RaisedButton label="New" primary={true} onTouchTap={this.onNewTrailEvent} />
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
