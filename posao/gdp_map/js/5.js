// Transposes data matrix in order to sum columns
function transposeArray(arr) {
    return Object.keys(arr[0]).map(function(c) {
        return arr.map(function(r) {
            return r[c];
        });
    });
}

function choseYearFromList() {
    setYear(parseInt(document.getElementById('sliderContentMobile').value, 0));
}

function createYearSlider(yearsArray) {
    
    var yearSlider = document.getElementById('yearslider');
    var yearSliderMobile = document.getElementById('yearslidermobile');

    var sliderContentMobile = '<select id="sliderContentMobile" onchange="choseYearFromList()">';

    yearsArray.forEach(function(yearSelected) {
        // Standard slider
        var yearItem = document.createElement('div');
        yearItem.id = 'y'+yearSelected;
        yearItem.title = yearSelected;
        yearItem.className = 'yearitem';
        var yearItemValue = document.createElement('span');
        yearItemValue.innerHTML = yearSelected;
        yearItem.appendChild(yearItemValue);
        yearItem.onclick = function(){
            stopYears();
            setYear(parseInt(yearSelected, 0));
        };
        yearSlider.appendChild(yearItem);
        sliderContentMobile = sliderContentMobile + '<option value="' + yearSelected + '" id="selected' + yearSelected + '">' + yearSelected;

    });

    sliderContentMobile = sliderContentMobile + '</select>';

    yearSliderMobile.innerHTML = sliderContentMobile;

}

function setYearSliderYear(newYear) {
     
    if(document.getElementById('y' + currentActiveYear)) {
        if (document.getElementById('y' + currentActiveYear).classList.length > 1) {
            document.getElementById('y' + currentActiveYear).classList.remove('yearitemhover');
        }
        document.getElementById('selected' + currentActiveYear).removeAttribute('selected');
        document.getElementById('selected' + newYear).setAttribute('selected', 'selected');

        document.getElementById('y' + currentActiveYear).classList.add('yearitem');
        document.getElementById('y' + newYear).classList.add('yearitemhover');
    }
}

function getChartSeries(country) {
    // console.log(country);
    var pass = 0;
    if (country.length === 0) {
        var pass = 1;
    }
    var dataChartSeries = [];
    var currentCountryDataset = {};
    countriesArray.forEach(function(singleCountry) {
        if (singleCountry === country || pass === 1) {
            currentCountryDataset.name = singleCountry;
            var singleCountryData = [];
            datasetsArray.forEach(function(singleYearCountry){
                if (singleYearCountry.country === singleCountry && singleYearCountry.gdp > 0) {
                    singleCountryData.push([Date.UTC(singleYearCountry.year, 0, 1), singleYearCountry.gdp]);
                }
            });
            currentCountryDataset.data = singleCountryData;
            dataChartSeries.push(currentCountryDataset);
            currentCountryDataset = {};
        }
    });
    return dataChartSeries;
} 

function updateYearChart(chartData,currentYear) {
    var chart = $('#chart-container').highcharts();
    chart.setTitle({text: 'Real GDP per Capita - year '+ currentYear});
    chart.series[0].setData(chartData);
}

function setYearChart(currentYear, chartCategories, chartData){
    $(function () {
        $('#chart-container').highcharts({
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            // chart: {
            //     renderTo: 'container',
            //     defaultSeriesType: 'column'
            // },
            title: {
                text: 'Real GDP per Capita - year '+ currentYear,
                // text: null,
                style: {
                    'fontSize': '1em'
                },
                align: 'right',
                x: -20,
                verticalAlign: 'top',
                y: 20
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: chartCategories, 
                crosshair: true
            },
            yAxis: {
                // type: 'logarithmic',
                // minorTickInterval: 0.1,
                min: 325,
                max: 32000,
                title: {
                    text: 'US dollars ($)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} USD</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0
                },
                series: {
                    cursor: 'pointer',
                    animation: {
                        duration: 200
                    },
                    point: {
                        events: {
                            click: function () {
                                console.log(this.x);
                                console.log(chartCategories[this.x]);
                                if (timeChartEnabled) {
                                    stopYears();
                                    console.log(this.x);
                                    console.log(this.x);

                                    setTimeChart(getChartSeries(chartCategories[this.x]));
                                }
                            }
                        }
                    }
                }
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            series: [{
                name: 'GDP per Capita',
                data: chartData,
                color: '#2196F3'

            }]
        });
    });
}

function setTimeChart(dataSeries) {
    yearChartLoaded = false;
    $(function () {
        var chartTitle = 'GDP Per Capita in 1990 Int. Dollars since 1870';
        $('#chart-container').highcharts({
            chart: {
                type: 'spline'
            },
            credits: {
                enabled: false
            },
            title: {
                text: chartTitle,
                // text: null,
                style: {
                    'fontSize': '1em'
                },
                align: 'left',
                verticalAlign: 'top',
                x: 63,
                y: 15
            },
            legend: {
                title: {
                    text: 'Countries'
                },
                style: {
                        'fontSize': '1em'
                },
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical',
                padding: 0,
                itemMarginTop: -6,
                itemMarginBottom: 0
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%Y'
                },
                title: {
                    text: 'Year',
                    enabled: false
                },
                plotBands: [{
                                color: '#eee', // Color value
                                from: Date.UTC(1914, 0, 2), // Start of the plot band
                                to: Date.UTC(1918, 0, 2), // End of the plot band
                                label: { 
                                    text: 'WW 1st',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    y: -10
                                  }
                            },
                            {
                                color: '#eee', // Color value
                                from: Date.UTC(1939, 0, 2), // Start of the plot band
                                to: Date.UTC(1945, 0, 2), // End of the plot band
                                label: { 
                                    text: 'WW 2nd',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    y: -10
                                  }
                            },
                            {
                                color: '#eee', // Color value
                                from: Date.UTC(1973, 0, 2), // Start of the plot band
                                to: Date.UTC(1974, 0, 2), // End of the plot band
                                label: { 
                                    text: 'Oil crisis',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    y: -10
                                  }
                            },
                            {
                                color: '#eee', // Color value
                                from: Date.UTC(1990, 0, 1), // Start of the plot band
                                to: Date.UTC(1991, 0, 1), // End of the plot band
                                label: { 
                                    text: 'Gulf war',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    y: -10
                                  }
                            },
                            {
                                color: '#eee', // Color value
                                from: Date.UTC(2008, 7, 1), // Start of the plot band
                                to: Date.UTC(2010, 11, 1), // End of the plot band
                                label: { 
                                    text: 'Recession',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    y: -10
                                  }
                            }]
            },
            yAxis: {
                // type: 'linear',
                type: 'logarithmic',
                min: 250,
                max: 32000,
                tickInterval: 0.2,
                title: {
                    text: 'Real GDP, Log Scale',
                    // text: 'Real GDP (1990 International Dollars)'
                    style: {
                        'fontSize': '0.9em'
                    }
                }
            },

            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%Y}: {point.y:.2f} $'
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    cursor: 'pointer',
                    // color: '#2196F3',
                    point: {
                        events: {
                            click: function () {
                                var date = new Date(this.x);
                                var year = date.getFullYear();
                                setYear(year);
                            }
                        }
                    }
                }
            },

            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },

            series: dataSeries
        });
    });
}


function setLegend() {
    var legendContainer = document.getElementById('legend-container');
    var cutPointTitle = document.createElement('div');
    cutPointTitle.classList.add('cutpointtitle');
    cutPointTitle.innerHTML = 'Real GDP per Capita:'
    legendContainer.appendChild(cutPointTitle);

    cutpointsArray.forEach(function(cut,index) {
        var cutPoint = document.createElement('div');
        cutPoint.id = 'cut'+index;
        cutPoint.classList.add('legendcutpoint');
        if (index === cutpointsArray.length - 1) {
            cutPoint.innerHTML = '<div class="circle" style="background-color: ' + cut.color +';"></div><div class="cutpoint-label">More than ' + cut.bottom + ' USD ($)</div>';
        } else if (index === 0){
            cutPoint.innerHTML = '<div class="circle" style="background-color: ' + cut.color +';"></div><div class="cutpoint-label">Not available data</div>';
        } else {
            cutPoint.innerHTML = '<div class="circle" style="background-color: ' + cut.color +';"></div><div class="cutpoint-label">' + cut.bottom + ' - ' + cut.top + ' USD ($)</div>';
        }

        legendContainer.appendChild(cutPoint);
    });
}


function setKeyboardListeners() {
    window.addEventListener("keydown", dealWithKeyboard, false);
}

function dealWithKeyboard(e) {
    if (e.keyCode == "37" && currentActiveYear > yearsArray[0]) {
        setYear(currentActiveYear-1);
    } else if (e.keyCode == "39" && currentActiveYear < yearsArray[yearsArray.length-1]) {
        setYear(currentActiveYear+1);
    }
}

function setPlayStopContainer() {
    var playStopContainer = document.getElementById('playstopcontainer');

    var playContainer = document.createElement('div');
    playContainer.id = 'playcontainer'; 
    playContainer.classList.add('controlcontainer');
    playContainer.innerHTML = '<i class="material-icons">play_circle_filled</i>';
    playContainer.onclick = function() {
        document.getElementById('stopcontainer').classList.remove('destroy');
        this.classList.add('destroy');
        playYears();
    }


    var stopContainer = document.createElement('div');
    stopContainer.id = 'stopcontainer';
    stopContainer.classList.add('controlcontainer');
    stopContainer.innerHTML = '<i class="material-icons">pause_circle_filled</i>';
    stopContainer.classList.add('destroy');
    stopContainer.onclick = function() {
        stopYears();
    }


    playStopContainer.appendChild(playContainer);
    playStopContainer.appendChild(stopContainer);

}

function playYears() {
    // console.log(currentActiveYear+1);
    if (currentActiveYear + 2 <= 2010) {
        setYear(currentActiveYear+2);
        tim = window.setTimeout(playYears, 500);
    }
}


function playReverseYears() {
    // console.log(currentActiveYear+1);
    if (currentActiveYear - 2 >= 1870) {
        setYear(currentActiveYear-2);
        tim = window.setTimeout(playReverseYears, 500);
    }
}

function stopYears() {
    // console.log(currentActiveYear+1);
    document.getElementById('playcontainer').classList.remove('destroy');
    document.getElementById('stopcontainer').classList.add('destroy');
    clearTimeout(tim);
}

function getRadius(gdp) {
    var returnRadius = 1;
    if (gdp>0) {
        // returnRadius = ((Math.log(gdp) / Math.log(maxGdpOverall)) * 30);
        returnRadius = ((gdp / maxGdpOverall) * 60);
        // returnRadius = Math.log((gdp / maxGdpOverall) * 100) * 10;
    } 
    console.log('gdp=' + gdp + ' returnRadius=' + returnRadius);
    return returnRadius;
}

function getMaxGdp(datasetsArray) {
    // first pass
    var maxVal = 0;

    datasetsArray.forEach(function(dataSet){
        if (dataSet.gdp >= maxVal) {
            maxVal = dataSet.gdp;
        }
    });
    return maxVal;
}



function resolutionControler() {
    var resolutionRange;
    if (window.innerWidth < 481) {
        timeChartEnabled = false;
        resolutionRange = 'low';
        // console.log('currentActiveYear: ' + currentActiveYear);
        if (currentActiveYear < 2010) {
           setYear(currentActiveYear+1);
           setYear(currentActiveYear-1); 
       } else if (currentActiveYear > 1870) {
           setYear(currentActiveYear-1);
           setYear(currentActiveYear+1);
       }
    } else if (window.innerWidth > 480 && window.innerWidth < 800) {
        resolutionRange = 'med';
        timeChartEnabled = true;
    } else  {
        resolutionRange = 'high';
        timeChartEnabled = true;
    }
    
    // configChart2Resolution('time',resolutionRange);
    // configChart2Resolution('year',resolutionRange);

}

function setCountriesLayerSet() {
    
    var filterSet = [
        'any',              
        ['in','name'].concat(countriesArray),
        ['in','name_en'].concat(countriesArray),
        ['in','admin'].concat(countriesArray)
    ];
    
    map.addLayer({
        'id': 'countrylabels',
        'type': 'symbol',
        'source': 'countrieslabels',
        'source-layer': 'country_label',
        'layout': {
            'icon-optional': true,
            'text-field': '{name_en}',
            // 'text-anchor': 'top',
            'text-size': 12
        },
        'paint': {
            'text-color': '#fff'
        },
        'filter': filterSet
    }); 

    countriesArray.forEach(function(country, index){
        map.addLayer({
            'id': 'layer' + country,
            'type': 'fill',
            'source': 'contours',
            'source-layer': 'ne_110m_admin_0_countries',
            'layout': {},
            'paint': {
                'fill-color': '#fff',
                'fill-opacity': 0,
                'fill-outline-color': '#eee'
            },
            'interactive': true,
            'filter': ['any',
                ['in','name', country],
                ['in','name_en', country],
                ['in','admin', country]
            ] 
        },'countrylabels'); 
    });

    countriespropertiesArray.forEach(function(countryCircle){
        map.addLayer({
            'id': 'circle' + countryCircle.name,
            'interactive': true,
            'type': 'circle',
            'source': 'gdpdata',
            'paint': {
                'circle-color': '#ffffff', // mag[1],
                'circle-opacity': 0.7,
                'circle-radius': 30 // (mag[0] - 4) * 10 // Nice radius value
            },
            'filter': ['==','country',countryCircle.name]
        });
    });
}

function updateCountryShade(country, fillColor, fillOpacity, outlineColor) {
    if (fillColor) {
        map.setPaintProperty('layer' + country, 'fill-color', fillColor);
    }
    if (fillOpacity) {
        map.setPaintProperty('layer' + country, 'fill-opacity', fillOpacity);
    }
    if (outlineColor) {
        map.setPaintProperty('layer' + country, 'fill-outline-color', outlineColor);
    }
}

function updateCountryCircle(country, circleColor, circleOpacity, circleRadius) {
    if (circleColor) {
        map.setPaintProperty('circle' + country, 'circle-color', circleColor);
    }
    if (circleOpacity) {
        map.setPaintProperty('circle' + country, 'circle-opacity', circleOpacity);
    }
    if (circleRadius) {
        map.setPaintProperty('circle' + country, 'circle-radius', circleRadius);
    }
}


function getShadeColor(gdp) {
   var color;
   cutpointsArray.forEach(function(cut){
        if (gdp > cut.bottom && gdp <= cut.top) {
            color = cut.color;
        }
   });
   return color;
}

function setYear(currentYear) {

    if (currentYear !== currentActiveYear) { 

        setYearSliderYear(currentYear);

        currentActiveYear = currentYear;

        datasetsArray.forEach(function(countryData, index) {
            if (countryData.year === currentYear) {
                // console.log('updateCountryShade ' + currentYear + ' ' + countryData.country);
                console.log('country=' + countryData.country + ', year ' + countryData.year + ', gdp ' + countryData.gdp);
                updateCountryShade(countryData.country, getShadeColor(countryData.gdp), 0.7, '#eee');
                updateCountryCircle(countryData.country, "#000000", 0.5, getRadius(countryData.gdp));
            }
        });
    
        //////////////
        // set chart //
        //////////////
        
        var chartDataArray = [];

        datasetsArray.forEach(function(countryYear){
            if (countryYear.year === currentYear /*&& countryYear.gdp > 0*/) {
                chartDataArray.push([countryYear.country,countryYear.gdp]);
            }
        });

        chartDataArray.sort(function(a, b) {
            if (a[1] > b[1]) {
                return -1;
            }
            if (a[1] < b[1]) {
                return 1;
            }
            // a must be equal to b
            return 0;
        });

        var chartDataArrayTrans = transposeArray(chartDataArray);
        var chartCategories = chartDataArrayTrans[0];
        var chartData = chartDataArrayTrans[1];

        if (yearChartLoaded) {
            updateYearChart(chartData,currentYear);
        } else {
            yearChartLoaded = true;
            setYearChart(currentYear, chartCategories, chartData);
        }
    }
}

function getGeoJsonDataset(rawDataset) {
    var outputData = {};
    var yearsCountryDataset = [];
    var oneYearCountryData = {};
    var oneCountryData = {};

/*    rawDataset.countriesproperties.forEach(function(country) {
        // console.log(country.name);
        // console.log(country.coordinates);
        rawDataset.dataset.forEach(function(yearCountryData){
            if(yearCountryData.country === country.name) {
                oneYearCountryData = {
                  "type": "Feature",
                  "properties": {
                    "country": country.name,
                    "year": yearCountryData.year,
                    "gdp": yearCountryData.gdp
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": country.coordinates
                  }
                };
                yearsCountryDataset.push(oneYearCountryData);
                // console.log(oneYearCountryData);
            }
        });
    });*/

    rawDataset.countriesproperties.forEach(function(country) {
        oneCountryData = {
          "type": "Feature",
          "properties": {
            "country": country.name
          },
          "geometry": {
            "type": "Point",
            "coordinates": country.coordinates
          }
        };
        yearsCountryDataset.push(oneCountryData);
        // console.log(oneCountryData);
    });

    outputData = {
        "type": "FeatureCollection",
        "features": yearsCountryDataset
    };
    return outputData;
}