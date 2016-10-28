// import GLU from '/../../glu2.js/src/index';
// import MessageEvents from '/enums/MessageEvents';

class CommonHelper {
    constructor() {
    }

    getElementByKey(inputArray, keyName, keyValue, getKeyName) {
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i][keyName] === keyValue) {
                return inputArray[i][getKeyName];
            }
        }
    }

    sortFunction(a, b) {
        const c = (a[0] < b[0]) ? -1 : 1;
        return (a[0] === b[0]) ? 0 : c;
    }

    sortArrayByKey(array, key) {
        return array.sort((a, b) => {
            const x = a[key];
            const y = b[key];
            const ret = (x > y) ? 1 : 0;
            return ((x < y) ? -1 : ret);
        });
    }

    sortArrayByElementIndex(array, index) {
        return array.sort((a, b) => {
            const x = a[index];
            const y = b[index];
            const ret = (x > y) ? 1 : 0;
            return ((x < y) ? -1 : ret);
        });
    }
}
export default new CommonHelper();
