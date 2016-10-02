import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Geobuffer from '/material-ui-custom-themes/Geobuffer';
import Root from './Root';

// Needed for onTouchTap (material-ui components)
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class App extends React.Component {
    constructor(params) {
        super(params);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(Geobuffer)}>
                <Root {...this.props} />
            </MuiThemeProvider>
        );
    }
}

export default App;
