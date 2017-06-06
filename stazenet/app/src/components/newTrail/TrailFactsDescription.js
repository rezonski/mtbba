import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import Lang from '../../helpers/Lang';

class TrailFactsDescription extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            id: 'generalFact',
            data: null,
        };
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onTrailDataRetrieved,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onTrailDataRetrieved(payload) {
        if (payload[this.state.id]) {
            const newData = JSON.parse(JSON.stringify(payload[this.state.id]));
            this.setState({
                data: newData,
            });
        }
    }

    render() {
        if (!this.state.data) {
            return <div/>;
        }
        return (<div className={'trail-data-box'}>
                    <div className="flex-container column">
                        <div className="flex-container row margined-bottom">
                            <div className="flex-element margined-right label-width">{Lang.label('generalFactsDistance') + ': '}</div>
                            <div className="flex-element">{this.state.data.distance}</div>
                        </div>
                        <div className="flex-container row margined-bottom">
                            <div className="flex-element margined-right label-width">{Lang.label('generalElevationGain') + ': '}</div>
                            <div className="flex-element">{this.state.data.elevGain}</div>
                        </div>
                        <div className="flex-container row margined-bottom">
                            <div className="flex-element margined-right label-width">{Lang.label('generalElevationLoss') + ': '}</div>
                            <div className="flex-element">{this.state.data.elevloss}</div>
                        </div>
                    </div>
                </div>);
    }
}

export default TrailFactsDescription;
