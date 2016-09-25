import Api from '/apis/Api';
import GLU from '/../../glu2.js/src/index';

function uuid() {
    let _p8 = (s) => {
        let p = (Math.random().toString(16) + '000000000').substr(2, 8);
        return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    };
    return _p8() + _p8(true) + _p8(true) + _p8();
}

const LIMIT = 10;

class Projects extends GLU.DataSource {
    constructor() {
        super();
        this._collection = [];
        this._canLoadMoreForParams = {};
    }

    _handleProjectSuccessResponse(params, resolve) {
        return response => {
            const projects = response.body.projects;
            const requestHash = this.hashRequest(params);
            const canLoadMore = projects.length > LIMIT;
            if (canLoadMore) {
                projects.splice(-1);
            }
            this._canLoadMoreForParams[requestHash] = canLoadMore;

            resolve(projects);
        };
    }

    getProjects(params) {
        const logic = (resolve, reject) => {
            const query = {
                ownersIds: [params.ownerId],
                limit: LIMIT + 1,
            };
            Api.Chart.searchProjects({ query })
                .then(this._handleProjectSuccessResponse(params, resolve))
                .catch(err => reject(err));
        };
        return this.cacheRequest(params, logic, this._collection);
    }

    canLoadMoreForOwnerId(ownerId) {
        const requestHash = this.hashRequest({ ownerId });
        return this._canLoadMoreForParams[requestHash];
    }

    loadMore(ownerId) {
        const params = { ownerId };
        const canLoadMore = this.canLoadMoreForOwnerId(ownerId);
        const doneResponse = this.getDoneRequestByParam(params);
        if (!canLoadMore || !doneResponse) {
            return this.getProjects(params);
        }
        const promise = new Promise((resolve, reject) => {
            const query = {
                ownersIds: [ownerId],
                offset: doneResponse.length,
                limit: LIMIT + 1,
            };
            const apendProjects = (newProjects) => {
                doneResponse.push.apply(doneResponse, newProjects);
                resolve(doneResponse);
            };
            Api.Chart.searchProjects({ query })
                .then(this._handleProjectSuccessResponse(params, apendProjects))
                .catch(err => reject(err));
        });
        return promise;
    }

    updateProject(params) {
        const promise = new Promise((resolve, reject) => {
            const { project, field, value } = params;
            if (field === 'title' && (!value || !value.trim())) {
                reject({
                    type: 'VALIDATION_ERROR',
                    message: 'Title is required',
                });
                return;
            }
            function createUpdateAction(f, v) {
                const changes = {};
                changes[f] = v;
                return {
                    propertyUpdate: changes,
                };
            }

            const changes = {};
            changes[field] = value;
            let oldValue = project[field];
            const payload = {
                messageId: uuid(),
                type: 'project',
                context: 'chart',
                action: 'projectEdit',
                up: createUpdateAction(field, value),
                down: createUpdateAction(field, oldValue),
            };
            Api.Chart
                .updateProject({
                    payload,
                    query: { projectId: project.id },
                })
                .catch(err => {
                    GLU.bus.emit('ERROR_OCCURED', err);
                    GLU.bus.emit('PROJECT_CHANGED', this._updateProjectProperty(project.id, field, oldValue));
                });
            resolve(this._updateProjectProperty(project.id, field, value));
        });
        return promise;
    }

    _updateProjectProperty(id, property, value) {
        const project = this._collection.find(projectInCollection => projectInCollection.id === id);
        project[property] = value;
        return project;
    }
}

export default new Projects();
