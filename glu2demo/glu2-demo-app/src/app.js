import 'babelify/polyfill';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

let App = {
    init: () => {
        injectTapEventPlugin();
        routes();
    },
};

export default App;
