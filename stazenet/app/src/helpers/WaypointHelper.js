/* global turf */
import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';
import CommonHelper from '/helpers/CommonHelper';
import TrailHelper from '/helpers/TrailHelper';
import TrailsDataModel from '/dataSources/TrailsDataModel';

class WaypointHelper extends GLU.Controller {
    constructor(props) {
        super(props);
        this.pointTypes = [];
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialSetupRetrieved,
        });

        this.usedWpNames = [];
        this.usedWpNamesIdxs = {};
    }

    getMarkerColor(symbol) {
        switch (symbol) {
            case 'CROSSROAD':
                return '#FAEA19';
            case 'DANGER':
                return '#FF0000';
            case 'END':
                return '#C00F0F';
            case 'FOOD':
                return '#F937EF';
            case 'MINES':
                return '#FF0000';
            case 'PASS':
                return '#A0FC98';
            case 'PHOTO':
                return '#21B4EE';
            case 'PLACE':
                return '#F9B837';
            case 'WATER':
                return '#1D57EC';
            case 'RIVER':
                return '#1D57EC';
            case 'SLEEP':
                return '#8697C2';
            case 'START':
                return '#06FF00';
            case 'SUMMIT':
                return '#C01013';
            default:
                return '#FFFFFF';
        }
    }

    getMarkerSymbol(symbol) {
        switch (symbol) {
            case 'CROSSROAD':
                return 'cross';
            case 'DANGER':
                return 'danger';
            case 'END':
                return 'roadblock';
            case 'FOOD':
                return 'restaurant';
            case 'MINES':
                return 'danger';
            case 'PASS':
                return 'triangle-stroked';
            case 'PHOTO':
                return 'camera';
            case 'PLACE':
                return 'circle';
            case 'WATER':
                return 'water';
            case 'RIVER':
                return 'swimming';
            case 'SLEEP':
                return 'lodging';
            case 'START':
                return 'bicycle';
            case 'SUMMIT':
                return 'triangle';
            default:
                return 'circle';
        }
    }

    getIcon4Symbol(symbol) {
        switch (symbol) {
            case 'CROSSROAD':
                return 'crossroad';
            case 'DANGER':
                return 'danger';
            case 'END':
                return 'roadblock';
            case 'FOOD':
                return 'restaurant';
            case 'MINES':
                return 'danger';
            case 'PASS':
                return 'pass';
            case 'PHOTO':
                return 'photo';
            case 'PLACE':
                return 'place';
            case 'WATER':
                return 'drinking-water';
            case 'RIVER':
                return 'swimming';
            case 'SLEEP':
                return 'lodging';
            case 'START':
                return 'bicycle2';
            case 'SUMMIT':
                return 'summit';
            default:
                return 'circle';
        }
    }

    generateWPointGeoJSON(currentIndex, newWaypoint, inputPathLine) {
        const pointIndex = parseInt(currentIndex, 10);
        const offset = 20;
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
        const inPathFeature = turf.lineString(inPathCoordinates, {
            name: 'Input line',
            stroke: '#CC1111',
            'stroke-width': 3,
        });
        const outPathFeature = turf.lineString(outPathCoordinates, {
            name: 'Output line',
            stroke: '#11FF11',
            'stroke-width': 3,
        });
        const currentWaypoint = turf.point([newWaypoint.lon, newWaypoint.lat], {
            name: newWaypoint.name,
            'marker-color': this.getMarkerColor(newWaypoint.symbol),
            'marker-symbol': this.getMarkerSymbol(newWaypoint.symbol),
        });
        if (inPathCoordinates.length > 1) {
            features.push(inPathFeature);
        }
        if (outPathCoordinates.length > 1) {
            features.push(outPathFeature);
        }
        features.push(currentWaypoint);
        const wpGeoJSON = turf.featureCollection(features);
        newWaypoint.wpGeoJSON = wpGeoJSON;
    }

    initialParseOneWP(wpoint) {
        let tempName = (wpoint.properties.name) ? wpoint.properties.name : 'Raskrsnica';
        if (this.usedWpNames.indexOf(tempName) > -1) {
            this.usedWpNamesIdxs[tempName].idx = (this.usedWpNamesIdxs[tempName].idx) ? (this.usedWpNamesIdxs[tempName].idx + 1) : 1;
            tempName = tempName + ' #' + this.usedWpNamesIdxs[tempName].idx;
        }
        wpoint.properties.name = tempName;
        let tempDescArray = '', tempDesc = '', tempPictogram = '';
        if (wpoint.properties.desc !== undefined && wpoint.properties.desc.indexOf('#') > -1 ) {
            tempDescArray = wpoint.properties.desc.replace('#\n\n', '#\n').replace('#\n\n', '#\n').replace('#\n', '#').replace('#\n', '#').split('#');
            tempDesc = tempDescArray[2];
            tempPictogram = tempDescArray[1];
            delete wpoint.properties.desc;
        } else if (wpoint.properties.cmt !== undefined && wpoint.properties.cmt.indexOf('#') > -1 ) {
            tempDescArray = wpoint.properties.cmt.replace('#\n\n', '#\n').replace('#\n\n', '#\n').replace('#\n', '#').replace('#\n', '#').split('#');
            tempDesc = tempDescArray[2];
            tempPictogram = tempDescArray[1];
            delete wpoint.properties.cmt;
        } else if (wpoint.properties.desc !== undefined) {
            tempDesc = wpoint.properties.desc;
            tempPictogram = (wpoint.properties.pictogram !== undefined) ? wpoint.properties.pictogram : '90';
        } else {
            tempDesc = '';
            tempPictogram = (wpoint.properties.pictogram !== undefined) ? wpoint.properties.pictogram : '90';
        }
        wpoint.properties.initDesc = tempDesc;
        wpoint.properties.desc = tempDesc;
        wpoint.properties.pictogram = tempPictogram;
        return wpoint;
    }

    isTerrainSwitchPoint(properties) {
        if (properties.type && properties.type === 'terrainSwitch') {
            return true;
        }
        if (properties.name && properties.name.length === 1 && (properties.name === 'A' || properties.name === 'M' || properties.name === 'S' || properties.name === 'N')) {
            return true;
        }
        return false;
    }

    // generateWaypoints(leftMap, rightMap, featuresCollection) {
    generateWaypoints(leftMap, featuresCollection) {
        const inputPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(featuresCollection)))[0].geometry.coordinates;
        // const elevatedPathLine = CommonHelper.getLineStrings(JSON.parse(JSON.stringify(elevatedFeaturesCollection)))[0].geometry.coordinates;
        let inputWaypoints = CommonHelper.getPoints(JSON.parse(JSON.stringify(featuresCollection)));
        // console.log('inputWaypoints on enter');
        // console.log(inputWaypoints.filter(f => { return f.properties.type && f.properties.type === 'terrainSwitch'; }));
        const startPathPoint = turf.point([inputPathLine[0].lon, inputPathLine[0].lat], { name: 'Start', pictogram: '90' });
        const endPathPoint = turf.point([inputPathLine[inputPathLine.length - 1].lon, inputPathLine[inputPathLine.length - 1].lat], { name: 'Finish', pictogram: '270' });
        const firstWP = inputWaypoints[0];
        const lasttWP = inputWaypoints[inputWaypoints.length - 1];
        if (turf.distance(startPathPoint, firstWP, 'kilometers') > 0.2) {
            inputWaypoints.unshift(startPathPoint);
        }
        if (turf.distance(lasttWP, endPathPoint, 'kilometers') > 0.2) {
            inputWaypoints.push(endPathPoint);
        }
        if (inputWaypoints.length === 0) {
            inputWaypoints = [startPathPoint, endPathPoint];
        }

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

        // console.log('inputWaypoints before edit');
        // console.log(inputWaypoints.filter(f => { return f.properties.type && f.properties.type === 'terrainSwitch'; }));

        inputWaypoints.forEach((wpoint, wpindex) => {
            let tempDistance = 9999999;
            let tempIndex = -1;

            // Calculate closest point on line
            inputPathLine.forEach((ppoint, pindex) => {
                // let currentDistance = TrailHelper.getDistanceFromLatLonInMeters(wpoint.geometry.coordinates[0], wpoint.geometry.coordinates[1], ppoint.lon, ppoint.lat);
                let currentDistance = turf.distance(turf.point([wpoint.geometry.coordinates[0], wpoint.geometry.coordinates[1]]), turf.point([ppoint.lon, ppoint.lat]));
                if ((currentDistance < tempDistance) && currentDistance < 0.2) { // less than 100m
                    tempDistance = currentDistance;
                    tempIndex = pindex;
                }
            });
            // console.log(wpoint.properties);
            // console.log('#tempIndex = ' + tempIndex);
            if (tempIndex > -1) {
                if (this.isTerrainSwitchPoint(wpoint.properties)) {
                    // console.log('Surface: ' + wpoint.properties.surfaceType + ' - ' + JSON.stringify(wpoint.geometry.coordinates) + ' - ' + (Math.round(inputPathLine[tempIndex].odometer * 100) / 100));
                    const payload = {
                        odometer: Math.round(inputPathLine[tempIndex].odometer * 100) / 100,
                        surfaceType: wpoint.properties.surfaceType,
                    };
                    surfaceCollection.push([payload.odometer, payload.surfaceType]);
                    GLU.bus.emit(Enum.DataEvents.ADD_SURFACE_CHANGE, payload);
                } else {
                    let symbol = this.symbolFromDesc(wpoint.properties.desc, wpoint.properties.pictogram, wpoint.properties.name);
                    const newWaypoint = {
                        id: wpindex,
                        time: (wpoint.properties.time !== undefined) ? wpoint.properties.time : null,
                        name: wpoint.properties.name,
                        nameEn: wpoint.properties.name,
                        desc: wpoint.properties.desc,
                        descEn: null,
                        elevGain: Math.round(inputPathLine[tempIndex].elevGain * 100) / 100,
                        elevLoss: Math.round(inputPathLine[tempIndex].elevLoss * 100) / 100,
                        nextElevGain: 0,
                        nextElevLoss: 0,
                        odometer: Math.round(inputPathLine[tempIndex].odometer * 100) / 100,
                        nextStepDist: 0,
                        symbol,
                        iconMarker: this.getIcon4Symbol(symbol),
                        pictogram: wpoint.properties.pictogram,
                        pictureUrl: (wpoint.properties.pictureUrl !== undefined) ? wpoint.properties.pictureUrl : '',
                        elevationProfile: true,
                        lon: (TrailsDataModel.activeTrail.getTrailData().snapWPsToPath) ? inputPathLine[tempIndex].lon : wpoint.geometry.coordinates[0],
                        lat: (TrailsDataModel.activeTrail.getTrailData().snapWPsToPath) ? inputPathLine[tempIndex].lat : wpoint.geometry.coordinates[1],
                        elevation: (TrailsDataModel.activeTrail.getTrailData().snapWPsToPath || !wpoint.geometry.coordinates[2]) ? inputPathLine[tempIndex].elevation : wpoint.geometry.coordinates[2],
                    };
                    this.generateWPointGeoJSON(tempIndex, newWaypoint, inputPathLine);
                    newWaypoints.push(newWaypoint);
                }
            } else {
                console.warn('wpoint ' + JSON.stringify(wpoint.properties) + ' too far from Path');
                GLU.bus.emit(MessageEvents.WARNING_MESSAGE, 'wpoint ' + JSON.stringify(wpoint.properties) + ' too far from Path');
            }
            waypointsProgressPayload.loaded = parseInt((wpindex + 1), 10);
            // GLU.bus.emit(MessageEvents.PROGRESS_MESSAGE, waypointsProgressPayload);
        });

        newWaypointsExport = CommonHelper.sortArrayByKey(newWaypoints, 'odometer');

        newWaypointsExport[0].symbol = 'START';
        newWaypointsExport[0].iconMarker = this.getIcon4Symbol('START');
        newWaypointsExport[0].elevation = inputPathLine[0].elevation;
        newWaypointsExport[newWaypointsExport.length - 1].symbol = 'END';
        newWaypointsExport[newWaypointsExport.length - 1].iconMarker = this.getIcon4Symbol('END');
        newWaypointsExport[newWaypointsExport.length - 1].elevation = inputPathLine[inputPathLine.length - 1].elevation;

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
            const descgenerated = this.generateDesc(tempWp, surfaceCollection);
            element.desc = element.initDesc + descgenerated;
        });

        newWaypointsExport.forEach((wp, wpIdx) => {
            const newPoint = turf.point([wp.lon, wp.lat, wp.elevation]);
            newPoint.properties = wp;
            newPoint.properties.id = wpIdx;
            mapWaypointsCollection.features.push(newPoint);
        });
        return mapWaypointsCollection.features;
    }

    onInitialSetupRetrieved(payload) {
        this.pointTypes = payload.pointTypes;
    }

    generateDesc(wp, surfaceCollection) {
        let returnDesc = CommonHelper.getElementByKey(this.pointTypes, 'id', 'CROSSROAD', 'name');

        if (wp.next !== null) {
            let directionText = CommonHelper.getElementByKey(this.pointTypes, 'id', wp.current.symbol, 'name') + ' `' + wp.current.name + '`. Nastaviti ';
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
            directionText += '. Sljedeca kontrolna tacka je ' + CommonHelper.getElementByKey(this.pointTypes, 'id', wp.next.symbol, 'name') + ' `' + wp.next.name + '` (' + wp.next.odometer + ' km od starta na ' + parseInt(wp.next.elevation, 10) + ' mnv).';
            returnDesc = directionText;
        } else {
            returnDesc = 'Stigli ste na odrediste';
        }
        // console.log('generateDesc');
        // console.log(wp);
        console.log('generated description: ' + returnDesc.length);
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
            returnVal = 'PLACE';
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
            returnVal = 'START';
        }
        // KRAJ
        if (!found && (desc.indexOf('end ') === 0 ||
                name.indexOf('end ') === 0 ||
                desc.indexOf('kraj ture ') === 0 ||
                name.indexOf('kraj ture ') === 0 ||
                desc.indexOf('kraj staze ') === 0 ||
                name.indexOf('kraj staze ') === 0)) {
            found = true;
            returnVal = 'END';
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
