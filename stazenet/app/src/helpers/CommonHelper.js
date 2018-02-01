// import GLU from '/../../glu2.js/src/index';
// import MessageEvents from '/enums/MessageEvents';

class CommonHelper {
    constructor() {
    }

    isJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
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

    angle2string(inputAngle) {
        const angle = (360 + inputAngle) % 360;
        const angles = [
          {
            id: 0,
            fromAngle: -22.5,
            toAngle: 22.5,
            desc: 'E',
          },
          {
            id: 1,
            fromAngle: 22.5,
            toAngle: 67.5,
            desc: 'NE',
          },
          {
            id: 2,
            fromAngle: 67.5,
            toAngle: 112.5,
            desc: 'N',
          },
          {
            id: 3,
            fromAngle: 112.5,
            toAngle: 157.5,
            desc: 'NW',
          },
          {
            id: 4,
            fromAngle: 157.5,
            toAngle: 202.5,
            desc: 'W',
          },
          {
            id: 5,
            fromAngle: 202.5,
            toAngle: 247.5,
            desc: 'SW',
          },
          {
            id: 6,
            fromAngle: 247.5,
            toAngle: 292.5,
            desc: 'S',
          },
          {
            id: 7,
            fromAngle: 292.5,
            toAngle: 337.5,
            desc: 'SE',
          },
          {
            id: 0,
            fromAngle: 337.5,
            toAngle: 382.5,
            desc: 'E',
          },
        ];
        const out = angles.filter(f => {
            return (angle > f.fromAngle && angle <= f.toAngle);
        })[0].desc;
        // console.log(out);
        return out;
    }
}
export default new CommonHelper();
