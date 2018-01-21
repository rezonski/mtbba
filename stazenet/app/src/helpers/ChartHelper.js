import GLU from '/../../glu2.js/src/index';
import Enum from '/enums/Enum';
import TrailHelper from '/helpers/TrailHelper';
import CommonHelper from '/helpers/CommonHelper';

class ChartHelper extends GLU.Controller {
    constructor(props) {
        super(props);
        this.surfaceTypes = [];
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialSetupRetrieved,
        });
    }

    onInitialSetupRetrieved(payload) {
        this.surfaceTypes = payload.surfaceTypes;
    }

    getDistancePositionXaxis(distance, odometer) {
        let returnVal = 0;
        odometer.forEach(function(point, index) {
            if (distance < point && distance >= odometer[index - 1]) {
                returnVal = index;
            }
        });
        return returnVal;
    }

    getSegment(segmentName) {
        let retSegment = this.surfaceTypes[0];
        this.surfaceTypes.forEach((segment) => {
            if (segment.name === segmentName) {
                retSegment = segment;
            }
        });
        return retSegment;
    }

    // getDistance(first, second) {
    //     const lon1 = first[0];
    //     const lat1 = first[1];
    //     const lon2 = second[0];
    //     const lat2 = second[1];
    //     const p = 0.017453292519943295; // Math.PI / 180
    //     const c = Math.cos;
    //     const a = 0.5 - c((lat2 - lat1) * p) / 2 +
    //         c(lat1 * p) * c(lat2 * p) *
    //         (1 - c((lon2 - lon1) * p)) / 2;
    //     return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    // }

    getPlotlines(wayPoints) {
        let plotlines = [];
        let plotline = {};
        wayPoints.forEach((waypoint) => {
            plotline = {
                // value: getDistancePositionXaxis(waypoint.properties.odometar,odometer),
                value: waypoint.odometer,
                width: 1,
                color: '#333',
                dashStyle: 'dot',
                label: {
                    text: waypoint.name,
                    rotation: -45,
                    align: 'right',
                    y: 10,
                    x: -5,
                },
            };
            plotlines.push(plotline);
        });
        return plotlines;
    }

    getDataSegments(pathLine, surfaceCollection) {
        let dataset = [];
        let odometer = [0];
        // let currentPart = 0;
        pathLine.forEach((element, index) => {
            if (index > 0) {
                // currentPart = this.getDistance(pathLine[ index - 1 ], element);
                odometer.push(Math.round(element.odometer * 100000) / 100000);
            }
            // if (element[2] > 0) {
            if (element.elevation > 0) {
                dataset.push({
                    x: odometer[index],
                    // y: element[2],
                    y: element.elevation,
                    segmentColor: this.getSegment(TrailHelper.getSegmentByOdometer(odometer[index], surfaceCollection)[1]).colorRGBA,
                });
            }
        });
        return dataset;
    }

    // getChartSetup(chartContainer, trailName, trailWayPoints, pathLine, surfaceCollection) {
    getChartSetup(chartContainer, featuresCollection) {
        const pathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        const generalFacts = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].properties;
        const trailName = generalFacts.trailName;
        const surfaceCollection = generalFacts.surfaceCollection;
        const allTrailWayPoints = CommonHelper.getPoints(JSON.parse(JSON.stringify(featuresCollection)));
        const filteredTrailWayPoints = allTrailWayPoints.filter(point => point.properties.elevationProfile === true);
        const trailWayPoints = filteredTrailWayPoints.map((point) => {
            return {
                odometer: point.properties.odometer,
                name: point.properties.name,
            };
        });

        return {
            chart: {
                renderTo: chartContainer,
                type: 'coloredarea',
                zoomType: 'xy',
                // borderWidth: 5,
                // borderColor: '#e8eaeb',
                borderRadius: 0,
                // backgroundColor: '#f7f7f7',
            },
            title: {
                text: trailName.toString(),
            },
            legend: {
                enabled: false,
            },
            xAxis: {
                type: 'integer',
                // categories: odometer,
                // tickInterval: 2,
                title: {
                    text: 'Predjeni put [km]',
                },
                plotLines: this.getPlotlines(trailWayPoints),
            },
            yAxis: {
                title: {
                    text: 'Nadmorska visina [m]',
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080',
                    },
                ],
                min: 0,
                max: 2000,
            },
            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<b>{point.key} km</b><br>',
                pointFormat: '{point.y} mnv',
                valueDecimals: 2,
            },
            credits: {
                enabled: false,
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.1,
                    connectNulls: true,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true,
                            },
                        },
                    },
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            mouseOver: (event) => {
                                // console.info(pathLine[event.target.index]);
                                GLU.bus.emit(Enum.ChartEvents.CHART_POINT_HOVERED, pathLine[event.target.index]);
                            },
                            click: (event) => {
                                const odometer = Math.round(event.point.x * 10) / 10;
                                // console.info(odometer);
                                GLU.bus.emit(Enum.ChartEvents.CHART_POINT_CLICKED, odometer);
                            },
                        },
                    },
                },
            },
            series: [
                {
                    name: 'Nadmorska visina',
                    type: 'coloredarea',
                    turboThreshold: 4000,
                    data: this.getDataSegments(pathLine, surfaceCollection),
                },
            ],
        };
    }

}
export default new ChartHelper();
