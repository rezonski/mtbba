import GLU from '/../../glu2.js/src/index';

import Projects from '/dataSources/Projects';
import Identities from '/dataSources/Identities';

class ProjectsController extends GLU.Controller {
    onActivate() {
        this.bindGluBusEvents({
            RETRIEVE_PROJECTS_FOR_ORGANIZATION: this.getProjectsForOrganization,
            LOAD_MORE: this.getLoadMoreProjects,
            UPDATE_PROJECT: this.updateProject,
        });
    }

    getLoadMoreProjects(ownerId) {
        Projects.loadMore(ownerId)
            .then(projects => {
                Promise
                    .all(projects.map(project => Identities.getIdentity(project.ownerId)))
                    .then(identities => {
                        identities.forEach((identity, index) => {
                            projects[index].owner = identity[0];
                        });

                        const canLoadMore = Projects.canLoadMoreForOwnerId(ownerId);
                        GLU.bus.emit('PROJECTS_FOR_ORGANIZATION_RETRIEVED', { ownerId, projects });
                        GLU.bus.emit('LOAD_MORE_CHANGED', { ownerId, canLoadMore });
                    });
            });
    }

    getProjectsForOrganization(params) {
        const ownerId = params.ownerId;
        Projects.getProjects(params)
            .then(projects => {
                Promise
                    .all(projects.map(project => Identities.getIdentity(project.ownerId)))
                    .then(identities => {
                        identities.forEach((identity, index) => {
                            projects[index].owner = identity[0];
                        });

                        const canLoadMore = Projects.canLoadMoreForOwnerId(ownerId);
                        GLU.bus.emit('LOAD_MORE_CHANGED', { ownerId, canLoadMore });
                        GLU.bus.emit('PROJECTS_FOR_ORGANIZATION_RETRIEVED', { ownerId, projects });
                    });
            });
    }

    updateProject(params) {
        Projects.updateProject(params)
            .then(project => GLU.bus.emit('PROJECT_CHANGED', project))
            .catch(err => {
                if (err.type === 'VALIDATION_ERROR') {
                    GLU.bus.emit('VALIDATION_ERROR', err.message);
                }
            });
    }

    onDeactivate() {
        this.unbindGluBusEvents();
    }
}

export default new ProjectsController();
