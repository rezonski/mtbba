import GLU from '/../../glu2.js/src/index';
import MessageEvents from '/enums/MessageEvents';
import Lang from '/helpers/Lang';

class ChartHelper extends GLU.Controller {
    constructor(props) {
        super(props);
        this.surfaceTypes = payload.surfaceTypes;
        this.surfaceCollection = payload.surfaceCollection;
        this.bindGluBusEvents({
            [Enum.MapEvents.INITIAL_DATA_SETUP_RETRIEVED]: this.onInitialSetupRetrieved,
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onDataRetrieved,
        });
    }

    onInitialSetupRetrieved(payload) {
        this.surfaceTypes = payload.surfaceTypes;
    }

    onDataRetrieved(payload) {
        this.surfaceCollection = payload.surfaceCollection;
    }

    getDistancePositionXaxis(distance, odometer) {
        let returnVal = 0;
        odometer.forEach(function(point, index){
            if (distance < point && distance >= odometer[index-1]) {
                returnVal = index;
            }
        });
        return returnVal;
    }

    getSegment(segmentName) { 
        this.surfaceTypes.forEach((segment, index) => {
            if (segment.name === segmentName) {
                return segment;
            }
        });
        return this.surfaceTypes[0];
    }


}
export default new ChartHelper();
