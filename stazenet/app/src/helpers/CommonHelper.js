// import GLU from '/../../glu2.js/src/index';
// import MessageEvents from '/enums/MessageEvents';

class CommonHelper {
    constructor() {
    }

    getUUID() {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now();
        }
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
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
        if (!featuresCollection.features) {
            return null;
        }
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
        if (!featuresCollection.features) {
            return null;
        }
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
