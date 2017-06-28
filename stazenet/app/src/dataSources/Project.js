import Api from '/apis/Api';
import GLU from '/../../glu2.js/src/index';
import Identities from './Identities';

const LIMIT = 10;

class Projects extends GLU.DataSource {
    constructor() {
        super();
        this._collection = [];
    }

    _handleProjectSuccessResponse(params, resolve) {
        return response => {
            const projects = response.body.projects;
            Promise
                .all(projects.map(project => Identities.getIdentity(project.ownerId)))
                .then(identities => {
                    identities.forEach((identity, index) => {
                        projects[index].owner = identity[0];
                    });

                    const requestHash = this.hashRequest(params);
                    const canLoadMore = projects.length > LIMIT;
                    if (canLoadMore) {
                        projects.splice(-1);
                    }
                    this._canLoadMoreForParams[requestHash] = canLoadMore;

                    resolve(projects);
                });
        };
    }

    getProject(projectId) {
        const logic = (resolve, reject) => {
            const existingItem = this._collection.find(project => project.id === projectId);
            if (existingItem) {
                resolve([existingItem]);
            } else {
                Api.Chart.loadProject({ query: { projectId } })
                    .then(response => resolve([response.body]))
                    .catch(err => reject(err));
            }
        };

        return this.cacheRequest({ projectId }, logic, this._collection);
    }
}

export default new Projects();
