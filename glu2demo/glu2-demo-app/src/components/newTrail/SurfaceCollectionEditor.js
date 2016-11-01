import React from 'react';
import BasePage from '../BasePage';
import Enum from '../../enums/Enum';
import Lang from '../../helpers/Lang';
import TrailHelper from '../../helpers/TrailHelper';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import IconButton from 'material-ui/IconButton';
// import CommonHelper from '../../helpers/CommonHelper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class SurfaceCollectionEditor extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            id: 'surfaceCollection',
            surfaceCollection: null,
        };
        this.keyListener = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onTrailDataRetrieved,
            [Enum.ChartEvents.CHART_POINT_CLICKED]: this.onAddNewSurface,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
        window.addEventListener('keydown', this.keyListener, false);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
        window.removeEventListener('keydown', this.keyListener, false);
    }

    // componentDidUpdate() {
    //     this.emit(Enum.MapEvents.REBUILD_PATH_LAYERS);
    // }

    onTrailDataRetrieved(payload) {
        if (payload[this.state.id]) {
            const newData = JSON.parse(JSON.stringify(payload[this.state.id]));
            this.setState({
                surfaceCollection: newData,
            });
        }
    }

    onKeyDown(e) {
        if (e.keyCode === 77 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 78) {
            e.preventDefault();
            this.state.surfaceCollection.push([this.newSurfaceOdometer, String.fromCharCode(e.keyCode)]);
            const payload = {
                name: this.state.id,
                value: this.state.surfaceCollection,
            };
            this.emit(Enum.DataEvents.UPDATE_TRAILDATA2MODEL, payload);
        }
    }

    onDeleteRow(index) {
        this.state.surfaceCollection.splice(index, 1);
        const payload = {
            name: this.state.id,
            value: this.state.surfaceCollection,
        };
        this.emit(Enum.DataEvents.UPDATE_TRAILDATA2MODEL, payload);
    }

    onAddNewSurface(payload) {
        this.newSurfaceOdometer = payload;
    }

    render() {
        if (!this.state.surfaceCollection) {
            return <div/>;
        }
        const tableStyle = {
            column: {
                width: '50px',
                paddingLeft: '0px',
                paddingRight: '10px',
            },
        };
        let rows = [];
        this.state.surfaceCollection.forEach((row, rowIndex) => {
            rows.push(<TableRow key={'SurfaceElementRow' + rowIndex}>
                            <TableRowColumn style={tableStyle.column}>
                                <IconButton
                                    onTouchTap={this.onDeleteRow.bind(this, rowIndex)}
                                >
                                    <DeleteSweep />
                                </IconButton>
                            </TableRowColumn>
                            <TableRowColumn style={tableStyle.column}>
                                {row[0] + ' km'}
                            </TableRowColumn>
                            <TableRowColumn>
                                {TrailHelper.getSurfaceTypeByName(row[1]).desc}
                            </TableRowColumn>
                        </TableRow>);
        });
        return (<Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={tableStyle.column} />
                            <TableHeaderColumn style={tableStyle.column}>
                                {Lang.label('odometer')}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {Lang.label('surfaceDesc')}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}>
                        {rows}
                    </TableBody>
                </Table>);
    }
}

export default SurfaceCollectionEditor;
