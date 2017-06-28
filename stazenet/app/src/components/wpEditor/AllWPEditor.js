import React from 'react';
import BasePage from '../BasePage';
// import TrailListRow from '../openTrail/TrailListRow';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Dialog from 'material-ui/Dialog';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRowColumn,
    TableRow
} from 'material-ui/Table';
// import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class AllWPEditor extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: Lang.label('waypoints'),
            waypoints: [],
            height: '300px',
        };
        this.onCloseEvent = this.handleClose.bind(this);
        this.onRowSelectedEvent = this.onRowSelected.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.AppEvents.OPEN_FORM_EDIT_WAYPOINTS]: this.onOpenFormRequest,
            [Enum.DataEvents.TRAIL_DATA_RETRIEVED]: this.onTrailDataRetrieved,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAIL_DATA);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenFormRequest() {
        this.setState({
            open: true,
        });
    }

    onTrailDataRetrieved(payload) {
        if (payload.waypoints && payload.waypoints.length > 0) {
            this.setState({
                waypoints: payload.waypoints,
            });
        }
    }

    onOpenSelectedTrail() {
        const trailId = this.state.waypoints[this.selectedIndex].trailID;
        this.emit(Enum.DataEvents.DOWNLOAD_TRAIL, trailId);
    }

    onRowSelected(rows) {
        console.info(rows);
        this.selectedIndex = (rows.length > 0) ? rows[0] : null;
    }

    render() {
        if (this.state.waypoints.length === 0) {
            return null;
        }
        const styles = {
            dialogContentStyle: {
                width: '80%',
                maxWidth: 'none',
            },
            columnNarower: {
                width: '60px',
                paddingLeft: '0px',
                paddingRight: '10px',
            },
            columnNarow: {
                width: '30px',
                paddingLeft: '0px',
                paddingRight: '10px',
            },
        };

        const actions = [
            <FlatButton
                label={Lang.label('cancel')}
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        const waypointstable = this.state.waypoints.map((wp, wpIdx) => {
            return (<TableRow
                        key={'wp-row-' + wpIdx}
                    >
                        <TableRowColumn>{wp.properties.name}</TableRowColumn>
                        <TableRowColumn>{wp.properties.nameEn}</TableRowColumn>
                        <TableRowColumn>{wp.properties.desc}</TableRowColumn>
                        <TableRowColumn>{wp.properties.descEn}</TableRowColumn>
                        <TableRowColumn>{wp.properties.elevation}</TableRowColumn>
                        <TableRowColumn>{wp.properties.symbol}</TableRowColumn>
                    </TableRow>);
        });
        return (
            <Dialog
                className="dialog"
                contentStyle={styles.dialogContentStyle}
                title={this.state.title}
                modal={false}
                open={this.state.open}
                actions={actions}
                onRequestClose={this.onCloseEvent}
            >
                <Table
                    height={this.state.height}
                    onRowSelection={this.onRowSelectedEvent}
                >
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn style={styles.columnNarow}>ID</TableHeaderColumn>
                            <TableHeaderColumn>{Lang.label('name')}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnNarower}>{Lang.label('distance')}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnNarower}>{Lang.label('elevationgain')}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnNarower}>{Lang.label('trailtype')}</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {waypointstable}
                    </TableBody>
                </Table>
            </Dialog>
        );
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }
}

export default AllWPEditor;
