/* global turf */
import GLU from '/../../glu2.js/src/index';
// import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';
import CommonHelper from '/helpers/CommonHelper';
import TrailHelper from '/helpers/TrailHelper';

class WaypointHelper extends GLU.Controller {
    constructor(props) {
        super(props);
        this.pointTypes = [];
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialSetupRetrieved,
        });
    }

    generateWPointGeoJSON(currentIndex, newWaypoint, inputPathLine) {
        const pointIndex = parseInt(currentIndex, 10);
        const offset = 40;
        const pointFromIndex = ((pointIndex - offset) < 0) ? 0 : (pointIndex - offset);
        const pointToIndex = ((pointIndex + offset) > (inputPathLine.length - 1)) ? (inputPathLine.length - 1) : (pointIndex + offset);
        let inPathCoordinates = [];
        let outPathCoordinates = [];
        let features = [];
        for (let i = parseInt(pointFromIndex, 10); i <= pointIndex; i++) {
            inPathCoordinates.push([inputPathLine[i].lon, inputPathLine[i].lat]);
        }
        for (let j = parseInt(pointIndex, 10); j <= pointToIndex; j++) {
            outPathCoordinates.push([inputPathLine[j].lon, inputPathLine[j].lat]);
        }
        const inPathFeature = turf.linestring(inPathCoordinates, {
            name: 'Input line',
            stroke: '#CC1111',
            'stroke-width': 3,
        });
        const outPathFeature = turf.linestring(outPathCoordinates, {
            name: 'Output line',
            stroke: '#11FF11',
            'stroke-width': 3,
        });
        const currentWaypoint = turf.point([newWaypoint.lon, newWaypoint.lat], {
            name: newWaypoint.name,
            'marker-color': '#0033FF',
            'marker-symbol': 'cross',
        });
        if (inPathCoordinates.length > 1) {
            features.push(inPathFeature);
        }
        if (outPathCoordinates.length > 1) {
            features.push(outPathFeature);
        }
        features.push(currentWaypoint);
        const wpGeoJSON = turf.featurecollection(features);
        newWaypoint.wpGeoJSON = wpGeoJSON;
    }

    generateWaypoints(leftMap, rightMap, featuresCollection) {
        const inputPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        let inputWaypoints = CommonHelper.getPoints(JSON.parse(JSON.stringify(featuresCollection)));
        const startPathPoint = turf.point([inputPathLine[0].lon, inputPathLine[0].lat], { name: 'Start', pictogram: '90' });
        const endPathPoint = turf.point([inputPathLine[inputPathLine.length - 1].lon, inputPathLine[inputPathLine.length - 1].lat], { name: 'Finish', pictogram: '270' });
        // const firstWP = inputWaypoints[0];
        // const lasttWP = inputWaypoints[inputWaypoints.length - 1];
        if (inputWaypoints.length === 0) {
            inputWaypoints = [startPathPoint, endPathPoint];
        } /* else if (turf.distance(startPathPoint, firstWP, 'kilometers') > 0.2) {
            inputWaypoints.unshift(startPathPoint);
        } else if (turf.distance(lasttWP, endPathPoint, 'kilometers') > 0.2) {
            inputWaypoints.push(endPathPoint);
        }*/

        const surfaceCollection = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].properties.surfaceCollection;
        let newWaypoints = [];
        // let newWaypointsChart = [];
        let newWaypointsExport = [];
        let waypointsProgressPayload = {
            status: 'progress',
            id: 'progressFixWPs',
            loaded: 0,
            total: inputWaypoints.length,
        };

        let mapWaypointsCollection = {
            type: 'FeatureCollection',
            features: [],
        };


        inputWaypoints.forEach((wpoint, wpindex) => {
            let tempDistance = 9999999;
            let tempIndex = -1;
            let tempDesc = '';
            let tempPictogram = '';

            // Calculate closest point on line
            inputPathLine.forEach((ppoint, pindex) => {
                // let currentDistance = TrailHelper.getDistanceFromLatLonInMeters(wpoint.geometry.coordinates[0], wpoint.geometry.coordinates[1], ppoint.lon, ppoint.lat);
                let currentDistance = turf.distance(turf.point([wpoint.geometry.coordinates[0], wpoint.geometry.coordinates[1]]), turf.point([ppoint.lon, ppoint.lat]));
                if ((currentDistance < tempDistance) && currentDistance < 0.1) { // less than 100m
                    tempDistance = currentDistance;
                    tempIndex = pindex;
                }
            });
            if (tempIndex > -1) {
                if (wpoint.properties.desc !== undefined && wpoint.properties.desc.indexOf('#') > -1 ) {
                    let tempDescArray = wpoint.properties.desc.replace('#\n\n', '#\n').replace('#\n\n', '#\n').replace('#\n', '#').replace('#\n', '#').split('#');
                    tempDesc = tempDescArray[2];
                    tempPictogram = tempDescArray[1];
                } else if (wpoint.properties.desc !== undefined) {
                    tempDesc = wpoint.properties.desc;
                    tempPictogram = (wpoint.properties.pictogram !== undefined) ? wpoint.properties.pictogram : '90';
                } else {
                    tempDesc = '';
                    tempPictogram = (wpoint.properties.pictogram !== undefined) ? wpoint.properties.pictogram : '90';
                }
                const newWaypoint = {
                    id: wpindex,
                    time: (wpoint.properties.time !== undefined) ? wpoint.properties.time : null,
                    name: wpoint.properties.name,
                    desc: tempDesc,
                    elevGain: Math.round(inputPathLine[tempIndex].elevGain * 100) / 100,
                    elevLoss: Math.round(inputPathLine[tempIndex].elevLoss * 100) / 100,
                    nextElevGain: 0,
                    nextElevLoss: 0,
                    odometer: Math.round(inputPathLine[tempIndex].odometer * 100) / 100,
                    nextStepDist: 0,
                    symbol: this.symbolFromDesc(tempDesc, tempPictogram, wpoint.properties.name),
                    pictogram: tempPictogram,
                    pictureUrl: (wpoint.properties.pictureUrl !== undefined) ? wpoint.properties.pictureUrl : '',
                    elevationProfile: 0,
                    lon: inputPathLine[tempIndex].lon,
                    lat: inputPathLine[tempIndex].lat,
                    elevation: inputPathLine[tempIndex].elevation,
                };
                this.generateWPointGeoJSON(tempIndex, newWaypoint, inputPathLine);
                newWaypoints.push(newWaypoint);
            }
            waypointsProgressPayload.loaded = parseInt((wpindex + 1), 10);
            // GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, waypointsProgressPayload);
        });

        newWaypointsExport = CommonHelper.sortArrayByKey(newWaypoints, 'odometer');

        newWaypointsExport.forEach((element, index) => {
            let tempWp = {};
            if (index < (newWaypointsExport.length - 1)) {
                tempWp = {
                    current: element,
                    next: newWaypointsExport[index + 1],
                };
                element.nextStepDist = Math.round((newWaypointsExport[index + 1].odometer - element.odometer) * 100) / 100;
                element.nextElevGain = Math.round((newWaypointsExport[index + 1].elevGain - element.elevGain) * 100) / 100;
                element.nextElevLoss = Math.round((newWaypointsExport[index + 1].elevLoss - element.elevLoss) * 100) / 100;
            } else {
                tempWp = {
                    current: element,
                    next: null,
                };
            }
            element.id = index;
            element.descgenerated = this.generateDesc(tempWp, surfaceCollection);
        });

        newWaypointsExport.forEach((wp, wpIdx) => {
            const newPoint = turf.point([wp.lon, wp.lat, wp.elevation]);
            newPoint.properties = wp;
            newPoint.properties.id = wpIdx;
            mapWaypointsCollection.features.push(newPoint);
        });

        // Adding to map
        if (leftMap.getSource('waypoints')) {
            leftMap.removeLayer('waypoints');
            leftMap.removeSource('waypoints');
        }
        if (rightMap.getSource('waypoints')) {
            rightMap.removeLayer('waypoints');
            rightMap.removeSource('waypoints');
        }
        leftMap.addSource('waypoints', {
            type: 'geojson',
            data: mapWaypointsCollection,
        });
        rightMap.addSource('waypoints', {
            type: 'geojson',
            data: mapWaypointsCollection,
        });

        const pointLayer = {};
        pointLayer.id = 'waypoints';
        pointLayer.type = 'symbol';
        pointLayer.source = 'waypoints';
        pointLayer.layout = {};
        pointLayer.layout['icon-image'] = 'monument-15';
        pointLayer.layout['text-field'] = '{id}';
        pointLayer.paint = {};
        pointLayer.paint['icon-color'] = '#FF0000';
        pointLayer.paint['icon-halo-color'] = '#FFFFFF';

        leftMap.addLayer(pointLayer);
        rightMap.addLayer(pointLayer);

        // return {
        //     waypoints: newWaypointsExport,
        //     chartWaypoints: newWaypointsChart,
        //     mapWaypoints: mapWaypointsCollection.features,
        // };

        return mapWaypointsCollection.features;
    }

    onInitialSetupRetrieved(payload) {
        this.pointTypes = payload.pointTypes;
    }

    generateDesc(wp, surfaceCollection) {
        let returnDesc = JSON.stringify(wp);
        returnDesc = CommonHelper.getElementByKey(this.pointTypes, 'symbol_code', 'CROSSROAD', 'desc');

        if (wp.next !== null) {
            let directionText = CommonHelper.getElementByKey(this.pointTypes, 'symbol_code', wp.current.symbol, 'desc') + ' "' + wp.current.name + '". Nastaviti ';
            let otherDirections = ' Sporedni putevi: ';
            let waterSupplyText = ' Izvor vode: ';
            let forbiddenDirectionText = ' Zabranjen smjer: ';
            let pictogramArray = wp.current.pictogram.split('-');

            pictogramArray.forEach((element, index) => {
                if (index === 0) {
                    directionText += this.parseDirection(element) + ' drzeci se glavnog puta.';
                } else if (element.toLowerCase().indexOf('v') > -1) {
                    waterSupplyText += this.parseDirection(element.toLowerCase().replace('v', '')) + ', ';
                } else if (element.toLowerCase().indexOf('z') > -1) {
                    forbiddenDirectionText += this.parseDirection(element.toLowerCase().replace('v', '')) + ', ';
                } else {
                    otherDirections += this.parseDirection(element) + ', ';
                }
            });

            if (waterSupplyText.length > (' Izvor vode: ').length) {
                waterSupplyText = waterSupplyText.substring(0, (waterSupplyText.length - 2)) + '.';
            } else {
                waterSupplyText = '';
            }

            if (forbiddenDirectionText.length > (' Zabranjen smjer: ').length) {
                forbiddenDirectionText = forbiddenDirectionText.substring(0, (forbiddenDirectionText.length - 2)) + '.';
            } else {
                forbiddenDirectionText = '';
            }

            if (otherDirections.length > (' Sporedni putevi: ').length) {
                otherDirections = otherDirections.substring(0, (otherDirections.length - 2)) + '.';
            } else {
                otherDirections = '';
            }

            directionText += otherDirections + forbiddenDirectionText + waterSupplyText;

            directionText += ' Slijedi sekcija duzine ' + wp.current.nextStepDist + ' km';
            if (wp.current.nextElevGain > 0) {
                directionText += ' sa ' + wp.current.nextElevGain + ' m visinskog uspona';
            }
            if (Math.abs(wp.current.nextElevLoss) > 0) {
                directionText += ' i ' + Math.abs(wp.current.nextElevLoss) + ' m visinskog spusta';
            }
            // console.log('wp.current.odometer = ' + wp.current.odometer + ' , wp.next.odometer = ' + wp.next.odometer);
            directionText += this.parseSurfaceTransition(wp.current.odometer, wp.next.odometer, surfaceCollection);
            directionText += '. Sljedeca kontrolna tacka je ' + CommonHelper.getElementByKey(this.pointTypes, 'symbol_code', wp.next.symbol, 'desc') + ' "' + wp.next.name + '" (' + wp.next.odometer + ' km od starta na ' + wp.next.elevation + ' mnv).';
            returnDesc = directionText;
        } else {
            returnDesc = 'Stigli ste na odrediste';
        }
        return returnDesc;
    }

    parseDirection(angle) {
        const directions = [
            {
                from: 0,
                to: 20,
                desc: 'desno',
            },
            {
                from: 20,
                to: 70,
                desc: 'polu-desno',
            },
            {
                from: 70,
                to: 110,
                desc: 'pravo',
            },
            {
                from: 110,
                to: 160,
                desc: 'polu-lijevo',
            },
            {
                from: 160,
                to: 200,
                desc: 'lijevo',
            },
            {
                from: 200,
                to: 250,
                desc: 'oštro/natrag lijevo',
            },
            {
                from: 270,
                to: 270,
                desc: 'natrag istim putem',
            },
            {
                from: 250,
                to: 290,
                desc: 'natrag',
            },
            {
                from: 290,
                to: 340,
                desc: 'oštro/natrag desno',
            },
            {
                from: 340,
                to: 360,
                desc: 'desno',
            },
        ];
        let retVar = 'dalje';
        directions.forEach((direction) => {
            if (parseInt(angle, 10) >= direction.from && parseInt(angle, 10) <= direction.to) {
                retVar = direction.desc;
            }
        });
        return retVar;
    }

    parseSurfaceTransition(odoStart, odoEnd, surfaceArray) {
        let surface = JSON.parse(JSON.stringify(surfaceArray));
        // surface.unshift([0, 'A']);
        let startSurfaceIndex = null;
        let endSurfaceIndex = null;
        let output = ' sa promjenama podloge: ';

        for (let i = 0; i < surface.length; i++) {
            if (surface[i][0] <= odoStart && surface[i + 1] !== undefined && surface[i + 1][0] >= odoStart) {
                startSurfaceIndex = i;
                i = surface.length;
            }
        }

        startSurfaceIndex = (startSurfaceIndex === null) ? (surface.length - 1) : startSurfaceIndex;

        for (let j = 0; j < surface.length; j++) {
            if (surface[j][0] <= odoEnd && ((surface[j + 1] !== undefined && surface[j + 1][0] >= odoEnd) || (surface[j + 1] === undefined))) {
                endSurfaceIndex = parseInt(j, 10);
                j = surface.length;
            }
        }

        endSurfaceIndex = (endSurfaceIndex === null) ? (surface.length - 1) : endSurfaceIndex;

        if (startSurfaceIndex < endSurfaceIndex) {
            for (let z = startSurfaceIndex; z <= endSurfaceIndex; z++) {
                if (z === startSurfaceIndex) {
                    output += TrailHelper.getSurfaceTypeByName(surface[z][1]).shortdesc;
                } else {
                    output += ' -> ' + TrailHelper.getSurfaceTypeByName(surface[z][1]).shortdesc + '(' + surface[z][0] + 'km)';
                }
            }
        } else {
            output = ' bez promjene podloge (' + TrailHelper.getSurfaceTypeByName(surface[startSurfaceIndex][1]).shortdesc + ')';
        }
        return output;
    }

    symbolFromDesc(inputDesc, inputPictogram, inputName) {
        let returnVal = 'CROSSROAD';
        let found = false;
        let desc = (inputDesc !== undefined && inputDesc.length > 0) ? inputDesc.toLowerCase() : '';
        let pictogram = (inputPictogram !== undefined && inputPictogram.length > 0) ? inputPictogram.toLowerCase() : '';
        let name = inputName.toLowerCase();

        // VODA
        if (!found && (pictogram.indexOf('v') > -1 ||
                desc.indexOf('voda ') === 0 ||
                name.indexOf('voda ') === 0 ||
                desc.indexOf('izvor vode ') === 0 ||
                name.indexOf('izvor vode ') === 0 ||
                desc.indexOf('cesma ') === 0 ||
                name.indexOf('cesma ') === 0)) {
            found = true;
            returnVal = 'WATER';
        }

        // SELO
        if (!found && (desc.indexOf('selo ') === 0 ||
                name.indexOf('selo ') === 0 ||
                desc.indexOf('zaseok ') === 0 ||
                name.indexOf('zaseok ') === 0)) {
            found = true;
            returnVal = 'VILLAGE';
        }
        // LOKALITET
        if (!found && (desc.indexOf('lokalitet ') === 0 ||
                name.indexOf('lokalitet ') === 0 ||
                desc.indexOf('lokacija ') === 0 ||
                name.indexOf('lokacija ') === 0)) {
            found = true;
            returnVal = 'LOCATION';
        }
        // GRAD
        if (!found && (desc.indexOf('grad ') === 0 ||
                name.indexOf('grad ') === 0)) {
            found = true;
            returnVal = 'CITY';
        }
        // MOST
        if (!found && (desc.indexOf('most ') === 0 ||
                name.indexOf('most ') === 0 ||
                desc.indexOf('splav ') === 0 ||
                name.indexOf('splav ') === 0 ||
                desc.indexOf('rijeka ') === 0 ||
                name.indexOf('rijeka ') === 0 ||
                desc.indexOf('potok ') === 0 ||
                name.indexOf('potok ') === 0)) {
            found = true;
            returnVal = 'RIVER';
        }
        // START
        if (!found && (desc.indexOf('start ') === 0 ||
                name.indexOf('start ') === 0 ||
                desc.indexOf('pocetak ture ') === 0 ||
                name.indexOf('pocetak ture ') === 0 ||
                desc.indexOf('pocetak staze ') === 0 ||
                name.indexOf('pocetak staze ') === 0)) {
            found = true;
            returnVal = 'TRAILSTART';
        }
        // KRAJ
        if (!found && (desc.indexOf('end ') === 0 ||
                name.indexOf('end ') === 0 ||
                desc.indexOf('kraj ture ') === 0 ||
                name.indexOf('kraj ture ') === 0 ||
                desc.indexOf('kraj staze ') === 0 ||
                name.indexOf('kraj staze ') === 0)) {
            found = true;
            returnVal = 'TRAILEND';
        }
        // HRANA
        if (!found && (desc.indexOf('restoran ') === 0 ||
                name.indexOf('restoran ') === 0 ||
                desc.indexOf('planinarski dom ') === 0 ||
                name.indexOf('planinarski dom ') === 0 ||
                desc.indexOf('pd ') === 0 ||
                name.indexOf('pd ') === 0 ||
                desc.indexOf('pd.') === 0 ||
                name.indexOf('pd.') === 0)) {
            found = true;
            returnVal = 'FOOD';
        }
        // PREVOJ
        if (!found && (desc.indexOf('prevoj ') === 0 ||
                name.indexOf('prevoj ') === 0 ||
                desc.indexOf('planinski prevoj ') === 0 ||
                name.indexOf('planinski prevoj ') === 0)) {
            found = true;
            returnVal = 'PASS';
        }
        // VRH
        if (!found && (desc.indexOf('vrh ') === 0 ||
                name.indexOf('vrh ') === 0 ||
                desc.indexOf('najvisa tacka ') === 0 ||
                name.indexOf('najvisa tacka ') === 0)) {
            found = true;
            returnVal = 'SUMMIT';
        }
        // OPREZ
        if (!found && (desc.indexOf('opasnost') === 0 ||
                name.indexOf('opasnost') === 0 ||
                desc.indexOf('oprez') === 0 ||
                name.indexOf('oprez') === 0 ||
                desc.indexOf('upozorenje') === 0 ||
                name.indexOf('upozorenje') === 0)) {
            found = true;
            returnVal = 'DANGER';
        }
        // MINE
        if (!found && (desc.indexOf('mine ') === 0 ||
                name.indexOf('mine ') > -1 ||
                desc.indexOf(' minsko ') > -1 ||
                name.indexOf(' minsko ') > -1 ||
                desc.indexOf(' mina ') > -1 ||
                name.indexOf(' mina ') > -1 ||
                desc.indexOf(' nus ') > -1 ||
                name.indexOf(' nus ') > -1)) {
            found = true;
            returnVal = 'MINES';
        }
        // FOTO
        if (!found && (desc.indexOf('vidikovac') === 0 ||
                name.indexOf('vidikovac') === 0 ||
                desc.indexOf('foto') === 0 ||
                name.indexOf('foto') === 0 ||
                desc.indexOf(' za fotografiju ') > -1 ||
                name.indexOf(' za fotografiju ') > -1 ||
                desc.indexOf(' za foto ') > -1 ||
                name.indexOf(' za foto ') > -1)) {
            found = true;
            returnVal = 'PHOTO';
        }
        // PRENOCISTE
        if (!found && (desc.indexOf('hotel') === 0 ||
                name.indexOf('hotel') === 0 ||
                desc.indexOf('motel') === 0 ||
                name.indexOf('motel') === 0 ||
                desc.indexOf('prenociste') === 0 ||
                name.indexOf('prenociste') === 0 ||
                desc.indexOf('apartman') === 0 ||
                name.indexOf('apartman') === 0 ||
                desc.indexOf('pansion') === 0 ||
                name.indexOf('pansion') === 0)) {
            found = true;
            returnVal = 'SLEEP';
        }
        return returnVal;
    }
}
export default new WaypointHelper();
