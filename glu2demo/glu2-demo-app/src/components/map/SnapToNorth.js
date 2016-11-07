import React from 'react';
import BasePage from '/components/BasePage';
import Enum from '/enums/Enum';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Navigation from 'material-ui/svg-icons/maps/navigation';

class SnapToNorth extends BasePage {
    constructor(params) {
        super(params);
        this.state = {
        };
        this.onNorthEvent = this.onNorth.bind(this);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onNorth() {
        this.emit(Enum.MapEvents.MAP_RESET_2_NORTH);
    }

    render() {
        return (<FloatingActionButton
                    onTouchTap={this.onNorthEvent}
                    mini={true}
                >
                    <Navigation />
                </FloatingActionButton>
        );
    }
}

export default SnapToNorth;
