import React from 'react';
import Root from './Root';

class App extends React.Component {
    constructor(params) {
        super(params);
    }

    render() {
        return (<Root {...this.props} />);
    }
}

export default App;
