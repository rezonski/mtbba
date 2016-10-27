/* globals Highcharts */
import React from 'react';
import BasePage from '../BasePage';
// import Enum from '../../enums/Enum';


class ChartComponent extends BasePage {
    constructor(params) {
        super(params);
    }

    componentDidMount() {
        this.chart = new Highcharts.Chart(
            this.props.containerId,
            this.props.options
        );
    }

    render() {
        return React.createElement('div', { id: this.props.containerId, className: (this.props.className ? this.props.className : null) });
    }
}

export default ChartComponent;
