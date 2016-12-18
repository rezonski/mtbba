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

    getLineStrings(featuresCollection) {
        // const returnCollection = JSON.parse(JSON.stringify(featuresCollection)).features.reduce(feature => {
        // const returnCollection = featuresCollection.features.reduce(feature => {
        //     if (feature.geometry.type === 'LineString') {
        //         return feature;
        //     }
        // });
        const returnCollection = featuresCollection.features.reduce((total, currentValue) => {
            if (currentValue.geometry.type === 'LineString') {
                total.push(currentValue);
            }
            return total;
        }, []);
        return returnCollection;
    }

    getPoints(featuresCollection) {
        // const returnCollection = JSON.parse(JSON.stringify(featuresCollection)).features.reduce(feature => {
        // const returnCollection = featuresCollection.features.reduce(feature => {
        //     if (feature.geometry.type === 'Point') {
        //         return feature;
        //     }
        // });
        const returnCollection = featuresCollection.features.reduce((total, currentValue) => {
            if (currentValue.geometry.type === 'Point') {
                total.push(currentValue);
            }
            return total;
        }, []);
        return returnCollection;
    }
}
export default new CommonHelper();
