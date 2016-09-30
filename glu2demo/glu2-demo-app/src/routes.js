import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import GLU from '/../../glu2.js/src/index';
import Root from './pages/Root';
import MapPage from './pages/MapPage';

function checkIfLoggedIn(nextState, replace) {
    console.log('checkIfLoggedIn dummy');
    if (nextState.routes.length === 1) {
        replace({
            pathname: '/all',
            state: {
                nextPathname: nextState.location.pathname,
            },
        });
    }
}

// notify route change
browserHistory.listen(loc => GLU.bus.emit(GLU.constants.NAVIGATED_TO_PAGE, { path: loc.pathname }));

export default () => {
    render(<Router history={browserHistory}>
        <Route path="/" onEnter={checkIfLoggedIn} />
        <Route path="/" component={Root}>
            <Route path="admin/new" component={MapPage} />
        </Route>
    </Router>, document.querySelector('#application'));
};
