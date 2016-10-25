import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
// import Lang from '/helpers/Lang';
import Chart from '../common/ChartComponent';
import TrailFactsDescription from '../newTrail/TrailFactsDescription';
// import RaisedButton from 'material-ui/RaisedButton';


class StepChartPreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.bindGluBusEvents({
            // [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
        });

        this.onStartProcessingRequestEvent = this.onStartProcessingRequest.bind(this);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onStartProcessingRequest() {
        this.emit(Enum.DataEvents.START_SIMPLIFYING_PATH);
    }

    render() {
        return (<div className="flex-container row">
            <div className="flex-element column wider2">
                <Chart
                    className="chart_preview"
                    containerId="chart_preview"
                />
            </div>
            <div className="flex-element column narower2 margined-left">
                <div className="flex-container row">
                    <TrailFactsDescription/>
                </div>
            </div>
        </div>);
    }
}

export default StepChartPreview;
