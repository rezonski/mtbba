import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
// import Lang from '/helpers/Lang';
import Chart from '../common/ChartComponent';
import SurfaceCollectionEditor from '../newTrail/SurfaceCollectionEditor';
// import RaisedButton from 'material-ui/RaisedButton';


class StepChartPreview extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: undefined,
            containerId: 'chartcontainer',
        };

        this.bindGluBusEvents({
            // [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
        });
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.CHART_DATA_RETRIEVED]: this.onChartDataRetrieved,
        });
        this.emit(Enum.DataEvents.RETRIEVE_CHART_DATA, this.state.containerId);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onChartDataRetrieved(payload) {
        if (payload) {
            this.setState({
                chartOptions: payload,
            });
        }
    }

    render() {
        let chartContent = null;
        if (this.state.chartOptions) {
            chartContent = (<Chart
                                className="chart_preview"
                                containerId={this.state.containerId}
                                options={this.state.chartOptions}
                            />);
        }
        return (<div className="flex-container row">
            <div className="flex-element column wider">
                {chartContent}
            </div>
            <div className="flex-element column narower margined-left">
                <div className="flex-container row">
                    <SurfaceCollectionEditor/>
                </div>
            </div>
        </div>);
    }
}

export default StepChartPreview;
