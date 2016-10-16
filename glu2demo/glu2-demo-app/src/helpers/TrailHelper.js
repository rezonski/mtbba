import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';

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
            currentIndex = iterator;
            escaped = false;
            nextIndex = iterator + 1;

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
                if (currentIndex%10 === 0) {
                    progressPayload = {
                        status: 'progress',
                        loaded: currentIndex,
                        total: maxIndx,
                    };
                    GLU.bus.emit(MessageEvents.SIMPLIFY_PROGRESS, progressPayload);
                }
                iterator = maxIndx;
            } else {
                iterator = currentIndex;
            }
        }
        returnArray.push(inputPointsArray[maxIndx]);
        GLU.bus.emit(MessageEvents.INFO_MESSAGE, Lang.msg('startSimplifyingRoute'));
        return returnArray;
    }

    getDistanceFromLatLonInMeters(lon1,lat1,lon2,lat2) {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        const dLon = this.deg2rad(lon2-lon1); 
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c * 1000; // Distance in km
        return d;
    }

    getDistance(first, second) {
        const lon1 = first[0];
        const lat1 = first[1];
        const lon2 = second[0];
        const lat2 = second[1];
        const p = 0.017453292519943295; // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
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
}
export default new TrailHelper();
