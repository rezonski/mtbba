import GLU from '/../../glu2.js/src/index';

class TrailsDataModel extends GLU.DataSource {
    constructor() {
        super();
        this._trails = [];
        this._trailsMaxIndex = -1;
    }

    get trails() {
        return this._trails;
    }

    get trailsMaxIndex() {
        return this._trailsMaxIndex;
    }

    set trail(newTrail) {
        // console.log('set trail(' + newTrail + ')');
        if (newTrail) {
            this.trails.push(newTrail);
            this._trailsMaxIndex += 1;
        }
    }

    get activeTrail() {
        // console.log('get activeTrail()');
        return this.trails[this.trailsMaxIndex];
    }
}

export default new TrailsDataModel();
