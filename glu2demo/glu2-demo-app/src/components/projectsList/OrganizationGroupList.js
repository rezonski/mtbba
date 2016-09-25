import React from 'react';
import ProjectListItem from '/components/projectsList/ProjectListItem';
import LoadMore from './LoadMore';
import BusComponent from '../BusComponent';

class OrganizationGroupList extends BusComponent {
    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
        };

        this.bindGluBusEvents({
            PROJECTS_FOR_ORGANIZATION_RETRIEVED: this.onProjectsRetrieved,
        });

        this.emit('RETRIEVE_PROJECTS_FOR_ORGANIZATION', { ownerId: this.props.organization.id });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onProjectsRetrieved(payload) {
        if (payload.ownerId === this.props.organization.id) {
            this.setState({
                projectList: payload.projects,
            });
        }
    }

    render() {
        const projects = this.state.projectList.map(project => <ProjectListItem
            key={project.id}
            project={project}/>);
        return (<div>
                <div className="organization-name">
                    {this.props.organization.id}
                </div>
                <div className="projects-list">
                    {projects}
                </div>
                <LoadMore organization={this.props.organization} />
            </div>);
    }
}

export default OrganizationGroupList;
