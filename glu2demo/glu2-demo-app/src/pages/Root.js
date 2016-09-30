import React from 'react';
import BasePage from '../components/BasePage';

class Root extends BasePage {
    constructor(params) {
        super(params);
    }

    componentWillUnmount() {
        this.deactivateControllers();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Root;
