import EventEmitter from 'eventemitter3';

class DataSource extends EventEmitter {
    constructor() {
        super();
        this._doneRequests = {};
        this._inProgressRequests = {};
    }

    hashRequest(params) {
        return JSON.stringify(params);
    }

    cacheRequest(params, callback, placeToStore) {
        const requestHash = this.hashRequest(params);
        if (this._inProgressRequests[requestHash]) {
            return this._inProgressRequests[requestHash];
        }
        const promise = new Promise((resolve, reject) => {
            if (this._doneRequests[requestHash]) {
                return resolve(this._doneRequests[requestHash]);
            }
            callback(resolve, reject);
        });
        if (!this._doneRequests[requestHash]) {
            this._inProgressRequests[requestHash] = promise;
        }
        promise
            .then(response => {
                delete this._inProgressRequests[requestHash];
                this._doneRequests[requestHash] = response;
                if (placeToStore) {
                    response.forEach(item => {
                        const existingItem = placeToStore.find(storedElement => storedElement.id === item.id);
                        if (!existingItem) {
                            placeToStore.push(item);
                        } else if (existingItem !== item) {
                            // update existingItem with properties from new item
                            Object.keys(existingItem)
                                .forEach(key => delete existingItem[key]);
                            Object.keys(item)
                                .forEach(key => existingItem[key] = item[key]);
                        }
                    });
                }
            }, () => {
                delete this._inProgressRequests[requestHash];
            });
        return promise;
    }

    getDoneRequestByParam(params) {
        const requestHash = this.hashRequest(params);
        return this._doneRequests[requestHash];
    }
}

export default DataSource;
