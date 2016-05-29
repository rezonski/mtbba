function setElevationProfile(pathLine,wayPoints,sastavArray) {
    
    var dataset = [];
    var odometer = [0];
    var currentPart = 0;
    var plotlines = [];
    var plotline = {};

    pathLine.forEach(function(element,index){

        if (index > 0) {
            currentPart = getDistance(pathLine[index-1], element) 
            odometer.push(Math.round((odometer[index-1] + currentPart)*100000)/100000);
        }
        
        // dataset.push(Math.round(element[2]*100000)/100000);
        // dataset.push(element[2]);
        // dataset.push(odometer[index], element[2]);
        if (element[2] > 0) {
            // console.log(odometer[index]);
            dataset.push({x: odometer[index], y: element[2], segmentColor: getSegmentColor(getSegmentName(odometer[index], sastavArray))});
            // dataset.push({y: element[2], segmentColor: getSegmentColor(getSegmentName(odometer[index], sastavArray))});
            // dataset.push([odometer[index], element[2], getSegmentColor(getSegmentName(odometer[index], sastavArray))]);
            // dataset.push([odometer[index], element[2]]);
        }
    });


    wayPoints.forEach(function(waypoint){
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
                x: -5
            }
        };
        plotlines.push(plotline);
    });

    // console.log(dataset);

    document.getElementById("container").style.display = "block";


    $(function () {
        $('#container').highcharts({
            chart: {
                renderTo: 'container',
                type: 'coloredarea',
                zoomType: 'xy',
                borderWidth: 5,
                borderColor: '#e8eaeb',
                borderRadius: 0,
                backgroundColor: '#f7f7f7'
            },
            title: {
                text: 'Variable profile'
            },
            xAxis: {
                type: 'integer',
                // categories: odometer,
                // tickInterval: 2,
                title: {
                    text: 'Variable A'
                },
                plotLines: plotlines
            },
            yAxis: {
                title: {
                    text: 'Variable B'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min: 0,
                max: 2000
            },
            tooltip: {
                shared: true,
                valueSuffix: ' m',
                crosshairs: true
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.1,
                    connectNulls : true,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Variable',
                type: 'coloredarea',
                turboThreshold: 2000,
                data: dataset
                // data: [[0, 150],[0.7, 110],[2.3, 133],[4.56, 50],[5.88, 40]],
                //color: '#35C22E'
            }]
        });
    });
    
}