/* globals Highcharts */
import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';

class ChartComponent extends BasePage {
    constructor(params) {
        super(params);
        this.state = {
            options: {},
        };
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.CHART_DATA_RETRIEVED]: this.onChartDataRetrieved,
        });
        this.emit(Enum.DataEvents.RETRIEVE_CHART_DATA, this.props.containerId);
        this.chart = new Highcharts.Chart(
            this.props.containerId,
            this.state.options
        );
    }

    onChartDataRetrieved(payload) {
        if (payload) {
            this.setState({
                options: payload,
            });
        }
    }

    render() {
        return (<div key={this.props.containerId} id={this.props.containerId} className={(this.props.className ? this.props.className : null)}></div>);
    }
}

export default ChartComponent;
