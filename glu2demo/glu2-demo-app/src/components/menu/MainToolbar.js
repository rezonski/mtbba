import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
// import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavLayers from 'material-ui/svg-icons/maps/layers';
import NavMap from 'material-ui/svg-icons/maps/map';
import NavTerrain from 'material-ui/svg-icons/maps/terrain';
import NavSatellite from 'material-ui/svg-icons/maps/satellite';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

class MainToolbar extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            activeTitle: Lang.label('newTrail'),
            newEditButtonLabel: Lang.label('new'),
            mapStyles: [],
        };
        this.onNewTrailEvent = this.onNewTrail.bind(this);
        this.bindGluBusEvents({
            [Enum.MapEvents.MAP_STYLES_RETRIEVED]: this.onMapStylesRetrieved,
        });
    }

    onNewTrail() {
        this.setState({
            newEditButtonLabel: Lang.label('edit'),
        });
        this.emit(Enum.AppEvents.OPEN_FORM_NEW_TRAIL);
    }

    onMapStylesRetrieved(styles) {
        this.setState({
            mapStyles: styles,
        });
    }

    onStyleSelected(style, side) {
        const changeSetup = {
            side,
            style,
        };
        this.emit(Enum.MapEvents.CHANGE_MAP_STYLE, changeSetup);
    }

    render() {
        const style = {
            width: '100%',
        };

        let leftMapStyles = [];
        let rightMapStyles = [];

        this.state.mapStyles.forEach((mapStyle, mapStyleIndex) => {
            let icon;
            switch (mapStyle.type) {
                case 'terrain':
                    icon = <NavTerrain />;
                    break;
                case 'satttelite':
                    icon = <NavSatellite />;
                    break;
                default:
                    icon = <NavSatellite />;
            }
            leftMapStyles.push(<MenuItem leftIcon={icon} key={'left' + mapStyleIndex} primaryText={mapStyle.name} onTouchTap={this.onStyleSelected.bind(this, mapStyle.value, 'leftmap')}/>);
            rightMapStyles.push(<MenuItem leftIcon={icon} key={'right' + mapStyleIndex} primaryText={mapStyle.name} onTouchTap={this.onStyleSelected.bind(this, mapStyle.value, 'rightmap')}/>);
        });

        return (
            <Toolbar style={style}>
                <ToolbarGroup>
                    <ToolbarTitle text={this.state.activeTitle} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator />
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                <NavMap />
                            </IconButton>
                        }
                        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}>
                        <MenuItem
                            primaryText={Lang.label('leftMap')}
                            leftIcon={<ArrowDropDown />}
                            menuItems={leftMapStyles}
                        />
                        <Divider />
                        <MenuItem
                            primaryText={Lang.label('rightMap')}
                            leftIcon={<ArrowDropDown />}
                            menuItems={rightMapStyles}
                        />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default MainToolbar;
