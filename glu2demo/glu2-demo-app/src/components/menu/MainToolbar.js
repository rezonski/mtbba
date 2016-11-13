import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
// import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup/* , ToolbarSeparator */, ToolbarTitle } from 'material-ui/Toolbar';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavLayers from 'material-ui/svg-icons/maps/layers';
import NavMap from 'material-ui/svg-icons/maps/map';
import NumList from 'material-ui/svg-icons/editor/format-list-numbered';
import NavTerrain from 'material-ui/svg-icons/maps/terrain';
import NavSatellite from 'material-ui/svg-icons/maps/satellite';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SaveTrailIcon from 'material-ui/svg-icons/file/cloud-upload';
import OpenTrailIcon from 'material-ui/svg-icons/file/cloud-download';

class MainToolbar extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            activeTitle: Lang.label('newTrail'),
            newEditButtonLabel: Lang.label('new'),
            mapStyles: [],
            openMapLayers: false,
            disabledWaypoints: true,
            disabledSaveTrail: true,
        };
        this.onNewTrailEvent = this.onNewTrail.bind(this);
        this.onOpenMapLayersEvent = this.onOpenMapLayers.bind(this);
        this.onCloseMapLayersEvent = this.onCloseMapLayers.bind(this);
        this.onToggleWPDrawerEvent = this.onToggleWPDrawer.bind(this);
        this.onOpenTrailReuestEvent = this.onOpenTrailReuest.bind(this);
        this.bindGluBusEvents({
            [Enum.MapEvents.MAP_STYLES_RETRIEVED]: this.onMapStylesRetrieved,
            [Enum.MapEvents.REQUEST_DISPLAY_PATH_LAYERS]: this.onWaypointEnabled,
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

    onOpenMapLayers(e) {
        e.preventDefault();
        this.setState({
            openMapLayers: true,
            anchorEl: e.currentTarget,
        });
    }

    onToggleWPDrawer() {
        this.emit(Enum.AppEvents.TOGGLE_WP_DRAWER);
    }

    onOpenTrailReuest() {
        this.emit(Enum.AppEvents.OPEN_FORM_OPEN_TRAIL);
    }

    onCloseMapLayers() {
        this.setState({
            openMapLayers: false,
        });
    }

    onWaypointEnabled() {
        this.setState({
            disabledWaypoints: false,
            disabledSaveTrail: false,
        });
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
                    <FlatButton
                        label={Lang.label('opentrail')}
                        primary={true}
                        onTouchTap={this.onOpenTrailReuestEvent}
                        icon={<OpenTrailIcon />}
                    />
                    <FlatButton
                        label={Lang.label('savetrail')}
                        primary={true}
                        disabled={this.state.disabledWaypoints}
                        onTouchTap={this.onToggleWPDrawerEvent}
                        icon={<SaveTrailIcon />}
                    />
                    <FlatButton
                        label={Lang.label('waypoints')}
                        primary={true}
                        disabled={this.state.disabledWaypoints}
                        onTouchTap={this.onToggleWPDrawerEvent}
                        icon={<NumList />}
                    />
                    <FlatButton
                        label={Lang.label('maplayers')}
                        primary={true}
                        onTouchTap={this.onOpenMapLayersEvent}
                        icon={<NavMap />}
                    />
                    <Popover
                        open={this.state.openMapLayers}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        onRequestClose={this.onCloseMapLayersEvent}
                    >
                        <Menu>
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
                        </Menu>
                    </Popover>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default MainToolbar;
