import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import CircularProgress from 'material-ui/CircularProgress';
import ListSelection from '../common/ListSelection';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRowColumn,
    TableRow
} from 'material-ui/Table';

class StepWaypointsPreprocessing extends BasePage {
    constructor(props) {
        super(props);
        this.bindGluBusEvents({
            [Enum.DataEvents.WP_SUGGESTIONS_GENERATED]: this.onWpSuggestionsGenerated,
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

    onWpSuggestionsGenerated(payload) {
        this.setState({
            loading: false,
            waypoints: payload.waypoints,
        });
    }

    render() {
        if (this.state.loading) {
            return (<div className="flex-container row">
                <CircularProgress />
            </div>);
        }

        const styles = {
            columnNarower: {
                minWidth: '80px',
                maxWidth: '250px',
                paddingLeft: '0px',
                paddingRight: '10px',
            },
        };

        const wpstable = this.state.waypoints.map((wp, wpIdx) => {
            return (<TableRow
                key={'waypoint-suggestion-row-' + wpIdx}
            >
                <TableRowColumn style={styles.columnNarower}>{wp.properties.name}</TableRowColumn>
                <TableRowColumn style={styles.columnNarower}>
                    <ListSelection
                        key="wpSuggestions"
                        fieldName={'waypoints'}
                        sourceName="optionList"
                        optionList={wp.properties.suggestionNames}
                        defaultValueIndex={0}
                        fieldIndex={this.props.wpIndex}
                        fieldProp={'altName'}
                        floatingLabelText={Lang.label('suggestion')}
                    />
                </TableRowColumn>
                <TableRowColumn>{wp.properties.desc}</TableRowColumn>
            </TableRow>);
        });

        return (<div className="flex-container row">
                <Table
                    height={this.state.height}
                    onRowSelection={this.onRowSelectedEvent}
                >
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn style={styles.columnNarower}>{Lang.label('wpName')}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnNarower}>{Lang.label('suggestion')}</TableHeaderColumn>
                            <TableHeaderColumn>{Lang.label('wpDesc')}</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {wpstable}
                    </TableBody>
                </Table>
        </div>);
    }
}

export default StepWaypointsPreprocessing;
