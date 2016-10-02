import React from 'react';
import BasePage from '../components/BasePage';
import Message from '../components/notifications/Message';
import MapController from '../controllers/MapController';

class Root extends BasePage {
    constructor(params) {
        super(params);

        this.state = {
        };

        this.activateControllers(
            MapController,
        );

        this.bindGluBusEvents({
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    render() {
        const style = {
            fontFamily: this.context.muiTheme.fontFamily,
        };

        return (
            <div style={style} >
                {this.props.children}
                <Message />
            </div>
        );
    }
}

Root.propTypes = {
    route: React.PropTypes.object.isRequired,
};

Root.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default Root;
