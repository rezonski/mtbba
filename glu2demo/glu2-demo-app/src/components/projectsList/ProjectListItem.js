import React from 'react';
import ProjectActions from './ProjectActions';
import { Link } from 'react-router';
import BusComponent from '../BusComponent';

class ProjectListItem extends BusComponent {
    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,
        };

        this.bindGluBusEvents({
            PROJECT_CHANGED: this.onProjectChanged,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onProjectChanged(payload) {
        if (payload.id === this.props.project.id) {
            this.setState({
                project: payload,
            });
        }
    }

    render() {
        return (<div>
            <Link to={`/project/${this.props.project.id}`} >
                <span><strong>type </strong>{this.state.project.visualizationType}</span>
                <span><strong>title </strong>{this.state.project.title}</span>
                <span><strong>theme </strong>{this.state.project.themeTitle}</span>
                <span><strong>owner </strong>{this.state.project.owner.id}</span>
                <ProjectActions project={this.state.project} />
            </Link>
        </div>);
    }
}

export default ProjectListItem;
