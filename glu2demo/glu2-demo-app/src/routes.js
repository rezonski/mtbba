import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import GLU from '/../../glu2.js/src/index';
import App from './pages/App';
import NewTrail from './pages/NewTrail';


// notify route change
browserHistory.listen(loc => GLU.bus.emit(GLU.constants.NAVIGATED_TO_PAGE, { path: loc.pathname }));

export default () => {
    render(<Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="admin/new" component={NewTrail} />
        </Route>
    </Router>, document.querySelector('#application'));
};
