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
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class OpenTrailContainer extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: Lang.label('opentrail'),
            trails: [],
            height: '300px',
            selectedTrailIdxs: [],
            // openDisabled: true,
        };
        this.onCloseEvent = this.handleClose.bind(this);
        this.onOpenSelectedTrailEvent = this.onOpenSelectedTrail.bind(this);
        this.onRowSelectedEvent = this.onRowSelected.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.AppEvents.OPEN_FORM_OPEN_TRAIL]: this.onOpenFormRequest,
            [Enum.DataEvents.TRAILS_LIST_RETRIEVED]: this.onTrailsListRetrieved,
            [Enum.DataEvents.TRAIL_DOWNLOADED]: this.onCloseEvent,
        });
        this.emit(Enum.DataEvents.RETRIEVE_TRAILS_LIST);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenFormRequest() {
        this.setState({
            open: true,
        });
    }

    onTrailsListRetrieved(payload) {
        this.setState({
            trails: payload,
        });
    }

    onOpenSelectedTrail() {
        const trailId = this.state.trails[this.selectedIndex].trailID;
        this.emit(Enum.DataEvents.DOWNLOAD_TRAIL, trailId);
    }

    onRowSelected(rows) {
        console.info(rows);
        this.selectedIndex = (rows.length > 0) ? rows[0] : null;
    }

    render() {
        if (this.state.trails.length === 0) {
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
                onTouchTap={this.onCloseEvent}
            />,
            <RaisedButton
                label={Lang.label('opentrail')}
                primary={true}
                // disabled={this.state.openDisabled}
                onTouchTap={this.onOpenSelectedTrailEvent}
            />,
        ];

        const trailstable = this.state.trails.map((trail, trailIdx) => {
            return (<TableRow
                        key={'trail-row-' + trailIdx}
                    >
                        <TableRowColumn style={styles.columnNarow}>{trail.trailID}</TableRowColumn>
                        <TableRowColumn>{trail.trailName}</TableRowColumn>
                        <TableRowColumn style={styles.columnNarower}>{trail.distance.toFixed(2) + 'km'}</TableRowColumn>
                        <TableRowColumn style={styles.columnNarower}>{trail.elevGain.toFixed(2)}</TableRowColumn>
                        <TableRowColumn style={styles.columnNarower}>{trail.typeName}</TableRowColumn>
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
                        {trailstable}
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

export default OpenTrailContainer;
