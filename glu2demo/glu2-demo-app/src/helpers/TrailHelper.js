import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';

class TrailHelper extends GLU.Controller {
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

    simplifyPath(inputPointsArray, toleranceInMeters) {
        let returnArray = [];
        const maxIndx = inputPointsArray.length - 1;
        let currentIndex;
        let iterator = 1;
        let nextIndex;
        let escaped = false;
        let tempDistance = 0;
        let progressPayload;

        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startSimplifyingRoute'));

        while (iterator < maxIndx) {
            currentIndex = parseInt(iterator, 10);
            escaped = false;
            nextIndex = parseInt(iterator, 10) + 1;

            while (nextIndex < maxIndx) {
                iterator = parseInt(nextIndex, 10);
                tempDistance = this.getDistanceFromLatLonInMeters(inputPointsArray[currentIndex][0], inputPointsArray[currentIndex][1], inputPointsArray[nextIndex][0], inputPointsArray[nextIndex][1]);
                if (tempDistance > toleranceInMeters) {
                    returnArray.push(inputPointsArray[nextIndex]);
                    escaped = true;
                    currentIndex = parseInt(nextIndex, 10);
                    nextIndex = parseInt(maxIndx, 10); // Escape
                } else {
                    nextIndex++; // Check next point
                }
            }

            if (nextIndex === maxIndx && !escaped) {
                iterator = parseInt(maxIndx, 10);
            } else {
                iterator = parseInt(currentIndex, 10);
                if (iterator % 10 === 0) {
                    progressPayload = {
                        status: 'progress',
                        loaded: iterator,
                        total: maxIndx,
                    };
                    GLU.bus.emit(MessageEvents.SIMPLIFY_PROGRESS, progressPayload);
                }
            }
        }
        returnArray.push(inputPointsArray[maxIndx]);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('endSimplifyingRoute'));
        return returnArray;
    }

    getDistanceFromLatLonInMeters(lon1, lat1, lon2, lat2) {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c * 1000;
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    getSegmentByOdometer(odometer, surfaceCollection) {
        if (surfaceCollection !== undefined && surfaceCollection.length > 0) {
            surfaceCollection.forEach((cutpoint) => {
                if (odometer > cutpoint[0]) {
                    return cutpoint;
                }
            });
        }
        return surfaceCollection[0];
    }

    getSurfaceTypeByName(name) {
        if (this.surfaceTypes !== undefined && this.surfaceTypes.length > 0) {
            this.surfaceTypes.forEach((element) => {
                if (element.name === name) {
                    return element;
                }
            });
        }
        return this.surfaceTypes[0];
    }
}
export default new TrailHelper();
