import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class WPModalEditor extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: Lang.label('opentrail'),
        };
        this.onCloseEvent = this.handleClose.bind(this);
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
        };

        const actions = [
            <FlatButton
                label={Lang.label('cancel')}
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <RaisedButton
                label={Lang.label('opentrail')}
                primary={true}
                // disabled={this.state.openDisabled}
                onTouchTap={this.onOpenSelectedTrailEvent}
            />,
        ];

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
                content
            </Dialog>
        );
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }
}

export default WPModalEditor;
