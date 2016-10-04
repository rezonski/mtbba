import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    onChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    onBlur() {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.value);
        }
    }

    render() {
        return (<input
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}/>);
    }
}

export default Input;
