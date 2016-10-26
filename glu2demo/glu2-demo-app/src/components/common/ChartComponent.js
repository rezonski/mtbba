/* globals Highcharts */
import React from 'react';
import BasePage from '../BasePage';
// import Enum from '../../enums/Enum';

const globalCallback = Highcharts.Chart.prototype.callbacks.push((chart) => {
    Highcharts.addEvent(chart.container, 'click', (event) => {
        // e = chart.pointer.normalize();
        console.log('click ' + event);
    });
    Highcharts.addEvent(chart.container, 'mouseover', (event) => {
        // e = chart.pointer.normalize();
        console.log('mouseOver ' + event);
    });
});

Highcharts.Chart.prototype.callbacks.push(globalCallback);

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
