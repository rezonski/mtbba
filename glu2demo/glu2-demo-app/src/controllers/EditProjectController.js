import GLU from '/../../glu2.js/src/index';

import Project from '/dataSources/Project';

class EditProjectsController extends GLU.Controller {
    onActivate() {
        this.bindGluBusEvents({
            RETRIEVE_PROJECT: this.getProject,
        });
    }

    getProject(projectId) {
        Project.getProject(projectId)
            .then(project => GLU.bus.emit('PROJECT_RETRIEVED', project[0]));
    }

    onDeactivate() {
        this.unbindGluBusEvents();
    }
}

export default new EditProjectsController();
