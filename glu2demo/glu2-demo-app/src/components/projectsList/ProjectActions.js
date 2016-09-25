import React from 'react';
import Rename from '../projectActions/Rename';

class ProjectActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideList: true,
        };
    }

    onToggleList() {
        this.setState({
            hideList: !this.state.hideList,
        });
    }

    onPreventDefault(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        const listProperties = {
            display: this.state.hideList ? 'none' : 'block',
        };
        return (<span onClick={this.onPreventDefault}>
                <button onClick={this.onToggleList.bind(this)}>Actions</button>
                <div style={listProperties}>
                    <ul>
                        <li><Rename project={this.props.project}/></li>
                    </ul>
                </div>
            </span>);
    }
}

export default ProjectActions;
