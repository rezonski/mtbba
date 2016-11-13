import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Dialog from 'material-ui/Dialog';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';


class OpenTrailContainer extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: Lang.label('opentrail'),
            trails: [],
            height: '300px',
        };
        this.onCloseEvent = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.bindGluBusEvents({
            [Enum.AppEvents.OPEN_FORM_OPEN_TRAIL]: this.onOpenFormRequest,
            [Enum.DataEvents.TRAILS_LIST_RETRIEVED]: this.onTrailsListRetrieved,
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
        const trailsParsed = JSON.parse(payload);
        console.log(trailsParsed);
        this.setState({
            trails: trailsParsed,
        });
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
        const trailstable = this.state.trails.map((trail, trailIdx) => {
            return(<TableRow key={'trail-row-' + trailIdx}>
                        <TableRowColumn style={styles.columnNarow}>{trail['trail_id']}</TableRowColumn>
                        <TableRowColumn>{trail['trail_name']}</TableRowColumn>
                        <TableRowColumn style={styles.columnNarower}>{trail['distance'].toFixed(2) + 'km'}</TableRowColumn>
                        <TableRowColumn style={styles.columnNarower}>{trail['elev_gain'].toFixed(2)}</TableRowColumn>
                        <TableRowColumn style={styles.columnNarower}>{trail['type_name']}</TableRowColumn>
                    </TableRow>);
        });
        return (
            <Dialog
                className="dialog"
                contentStyle={styles.dialogContentStyle}
                title={this.state.title}
                modal={false}
                open={this.state.open}
                onRequestClose={this.onCloseEvent}>
                <Table
                    height={this.state.height}>
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
        this.emit(Enum.MapEvents.REQUEST_DISPLAY_PATH_LAYERS);
        this.setState({
            open: false,
            stepIndex: 0,
            finished: false,
        });
    }

    saveAddedTrail() {
        this.onCloseEvent();
    }

    handleNext() {
        const stepIndex = this.state.stepIndex;
        this.setState({
            stepIndex: (stepIndex >= 4) ? stepIndex : (stepIndex + 1),
            finished: stepIndex >= 4,
        });
    }

    handlePrev() {
        const stepIndex = this.state.stepIndex;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    }
}

export default OpenTrailContainer;
