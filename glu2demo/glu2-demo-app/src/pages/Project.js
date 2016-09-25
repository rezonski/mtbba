import React from 'react';
import BasePage from '../components/BasePage';
import ToMyProjects from '/components/toMyProjects/ToMyProjects';
import EditProjectController from '/controllers/EditProjectController';

class Project extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            project: null,
        };
        this.activateControllers(EditProjectController);
        this.bindGluBusEvents({
            PROJECT_RETRIEVED: this.onProjectRetrieved,
        });
        this.emit('RETRIEVE_PROJECT', this.props.params.projectId);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        this.deactivateControllers();
    }

    onProjectRetrieved(project) {
        this.setState(project);
    }

    render() {
        let title;
        if (this.state.project) {
            title = this.state.project.title;
        }
        return (<div>
            <ToMyProjects />
            {title}
        </div>);
    }
}

export default Project;
