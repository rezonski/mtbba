import React from 'react';
import BusComponent from '../BusComponent';

class LoadMore extends BusComponent {
    constructor(props) {
        super(props);
        this.state = {
            loadMoreStatus: 'hide',
        };

        this.bindGluBusEvents({
            LOAD_MORE_CHANGED: this.onLoadMoreChanged,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onLoadMoreChanged(payload) {
        if (payload.ownerId === this.props.organization.id) {
            this.setState({
                loadMoreStatus: payload.canLoadMore ? 'show' : 'hide',
            });
        }
    }

    onLoadMoreClick() {
        this.setState({
            loadMoreStatus: 'show spinner',
        });
        this.emit('LOAD_MORE', this.props.organization.id);
    }

    render() {
        let loadMoreButton;
        switch (this.state.loadMoreStatus) {
        case 'show':
            loadMoreButton = <button onClick={this.onLoadMoreClick.bind(this)}>Load More</button>;
            break;
        case 'show spinner':
            loadMoreButton = <span>Loading...</span>;
            break;
        }
        return <div>{loadMoreButton}</div>;
    }
}

export default LoadMore;
