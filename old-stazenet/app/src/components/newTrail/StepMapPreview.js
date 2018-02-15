import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
// import MapPreview from '/components/map/MapPreview';
import RaisedButton from 'material-ui/RaisedButton';

class StepMapPreview extends BasePage {
    constructor(props) {
        super(props);
        this.bindGluBusEvents({
            // [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
        });
        this.onManualyEditPathPointsRequestEvent = this.onManualyEditPathPointsRequest.bind(this);
        this.onShowPreviewRequestEvent = this.onShowPreviewRequest.bind(this);
        this.onHidePreviewRequestEvent = this.onHidePreviewRequest.bind(this);
    }

    componentDidMount() {
        this.emit(Enum.MapEvents.HIDE_PREVIEW_MAP);
        this.emit(Enum.MapEvents.SHOW_PREVIEW_MAP);
    }

    componentWillUnmount() {
        // this.emit(Enum.MapEvents.HIDE_PREVIEW_MAP);
        this.unbindGluBusEvents();
    }

    onShowPreviewRequest() {
        this.emit(Enum.MapEvents.SHOW_PREVIEW_MAP);
    }

    onHidePreviewRequest() {
        this.emit(Enum.MapEvents.HIDE_PREVIEW_MAP);
    }

    onManualyEditPathPointsRequest() {
        this.emit(Enum.AppEvents.CLOSE_FORM_NEW_TRAIL);
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

export default StepMapPreview;
