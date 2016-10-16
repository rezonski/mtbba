// import GLU from '/../../glu2.js/src/index';
// import MessageEvents from '/enums/MessageEvents';

class CommonHelper {
    constructor() {
    }

    getElementByKey(inputArray, keyName, keyValue, getKeyName) {
        for (let i=0; i<inputArray.length; i++) {
            if (inputArray[i][keyName] === keyValue) {
                return inputArray[i][getKeyName];
            }
        }
    }

    sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }
}
export default new CommonHelper();
