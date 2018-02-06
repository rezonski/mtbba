import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import CircularProgress from 'material-ui/CircularProgress';
import InputTextBox from '../common/InputTextBox';
import Switch from '../common/Switch';
import ListSelection from '../common/ListSelection';
import RaisedButton from 'material-ui/RaisedButton';
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
            step: 'intro', // ['intro', 'loading', 'loaded']
            height: '300px',
        };
    }

    // componentDidMount() {
    //     this.emit(Enum.DataEvents.GENERATE_WP_SUGGESTIONS);
    // }

    componentWillUnmount() {
        // this.emit(Enum.MapEvents.HIDE_PREVIEW_MAP);
        this.unbindGluBusEvents();
    }

    onWpSuggestionsGenerated(payload) {
        this.setState({
            step: false,
            waypoints: payload.waypoints,
        });
    }

    render() {
        if (this.state.step === 'intro') {
            return (<div className="flex-container row">
                <RaisedButton
                    label={Lang.label('suggestion') + ' ' + Lang.label('yes')}
                    secondary={true}
                    className="margined-right"
                    style={{ minWidth: '200px' }}
                    onTouchTap={() => {
                        this.emit(Enum.DataEvents.GENERATE_WP_SUGGESTIONS, {
                            suggestions: true,
                        });
                    }}
                />
                <RaisedButton
                    label={Lang.label('suggestion') + ' ' + Lang.label('no')}
                    secondary={true}
                    className="margined-right"
                    style={{ minWidth: '200px' }}
                    onTouchTap={() => {
                        this.emit(Enum.DataEvents.GENERATE_WP_SUGGESTIONS, {
                            suggestions: false,
                        });
                    }}
                />
            </div>);
        } else if (this.state.step === 'loading') {
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
            columnWider: {
                minWidth: '200px',
                paddingLeft: '0px',
                paddingRight: '10px',
            },
            columnNarow: {
                width: '80px',
                paddingLeft: '0px',
                paddingRight: '10px',
            },
        };

        const wpstable = this.state.waypoints.map((wp, wpIdx) => {
            return (<TableRow
                        key={'waypoint-suggestion-row-' + wpIdx}
                        selectable={false}
                    >
                        <TableRowColumn style={styles.columnNarow}>
                            <Switch
                                fieldName={'waypoints'}
                                fieldIndex={wpIdx}
                                fieldProp={'elevationProfile'}
                                label={''}
                                type={'toggle'}
                            />
                        </TableRowColumn>
                        <TableRowColumn style={styles.columnNarower}>
                            <ListSelection
                                key="pointTypes"
                                fieldName={'waypoints'}
                                sourceName="pointTypes"
                                defaultValueIndex={0}
                                fieldIndex={this.props.wpIndex}
                                fieldProp={'symbol'}
                                floatingLabelText={Lang.label('pointTypes')}
                            />
                        </TableRowColumn>
                        <TableRowColumn style={styles.columnNarower}>
                            <InputTextBox
                                fieldName={'waypoints'}
                                fieldIndex={wpIdx}
                                fieldProp={'name'}
                                inputBoxStyle={{ fontSize: '80%' }}
                                isMultiline={false}
                                noRows={1}
                                filedLabel={Lang.label('wpName')}
                                filedHintText={Lang.label('wpName')}
                            />
                        </TableRowColumn>
                        <TableRowColumn style={styles.columnWider}>
                            <span style={{ whiteSpace: 'pre-line' }}>{wp.properties.suggestionNames}</span>
                        </TableRowColumn>
                    </TableRow>);
        });

        return (<div className="flex-container row">
                    <Table
                        height={this.state.height}
                        selectable={false}
                    >
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn style={styles.columnNarower}>{Lang.label('showOnElevationProfile')}</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columnNarower}>{Lang.label('pointTypes')}</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columnNarower}>{Lang.label('wpName')}</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columnNarower}>{Lang.label('suggestion')}</TableHeaderColumn>
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
