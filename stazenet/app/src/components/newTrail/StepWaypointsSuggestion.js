import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRowColumn,
    TableRow
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class StepWaypointsSuggestion extends BasePage {
    constructor(props) {
        super(props);
        this.bindGluBusEvents({
            [Enum.DataEvents.GENERATE_WP_SUGGESTIONS]: this.onWpSuggestionsGenerated,
        });
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.emit(Enum.DataEvents.GENERATE_WP_SUGGESTIONS);
    }

    componentWillUnmount() {
        // this.emit(Enum.MapEvents.HIDE_PREVIEW_MAP);
        this.unbindGluBusEvents();
    }

    onWpSuggestionsGenerated(wps) {
        this.setState({
            loading: false,
            waypoints: wps,
        });
    }

    render() {
        return (<div className="flex-container row">
                <RaisedButton
                    label={Lang.label('showPreviewPath')}
                    secondary={true}
                    className="margined-right"
                    style={{ minWidth: '200px' }}
                    onTouchTap={this.onShowPreviewRequestEvent} />
                <RaisedButton
                    label={Lang.label('manualEditPath')}
                    secondary={true}
                    className="margined-right"
                    style={{ minWidth: '200px' }}
                    onTouchTap={this.onManualyEditPathPointsRequestEvent} />
                <RaisedButton
                    label={Lang.label('hidePreviewPath')}
                    secondary={true}
                    className="margined-right"
                    style={{ minWidth: '200px' }}
                    onTouchTap={this.onHidePreviewRequestEvent} />
        </div>);
    }
}

export default StepWaypointsSuggestion;
