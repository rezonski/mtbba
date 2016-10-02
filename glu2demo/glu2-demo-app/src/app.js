import 'babelify/polyfill';
import routes from './routes';

let App = {
    init: () => {
        routes();
    },
};

export default App;
