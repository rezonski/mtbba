import React from 'react';
import { browserHistory } from 'react-router';

class ToMyProjects extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        browserHistory.push('/my-projects');
    }

    render() {
        return <button onClick={this.onClick}>Go to my projects</button>;
    }
}

export default ToMyProjects;
