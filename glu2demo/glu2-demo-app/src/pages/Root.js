import React from 'react';
import BasePage from '../components/BasePage';
import IdentitiesController from '../controllers/IdentitiesController';
import ProjectsController from '../controllers/ProjectsController';
import ModalHandler from '/components/modal/ModalHandler';

class Root extends BasePage {
    constructor(params) {
        super(params);
        this.activateControllers(IdentitiesController, ProjectsController);
    }

    componentWillUnmount() {
        this.deactivateControllers();
    }

    render() {
        return (
            <div>
                <ModalHandler />
                {this.props.children}
            </div>
        );
    }
}

export default Root;
