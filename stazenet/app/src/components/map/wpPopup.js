import React from 'react';
import BasePage from '../BasePage';
// import MessageEvents from '../../enums/MessageEvents';
import Enum from '../../enums/Enum';
// import Lang from '/helpers/Lang';


class wpPopup extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            map: this.props.map,
            feature: null,
        };
    }

    componentDidMount() {
        this.bindGluBusEvents({});
        this.emit(Enum.MapEvents.RETRIEVE_MAP_INIT);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    componentDidUpdate() {
        this.state.map.on('mousemove', e => {
            const features = this.state.map.queryRenderedFeatures(e.point, {
                layers: 'waypoints',
            });
            this.this.setState({
                feature: features[0].properties,
            });
        });
    }

    render() {
        return (<div id="wp-popup">{this.state.feature.name}</div>);
    }
}

export default wpPopup;
