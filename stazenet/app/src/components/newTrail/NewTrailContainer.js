import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Dialog from 'material-ui/Dialog';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import ExpandTransition from 'material-ui/internal/ExpandTransition';
// import TextField from 'material-ui/TextField';
import StepUpload from '../newTrail/StepUpload';
import StepMapPreview from '../newTrail/StepMapPreview';
import StepWaypointsPreprocessing from '../newTrail/StepWaypointsPreprocessing';
import StepDescription from '../newTrail/StepDescription';
import StepParameters from '../newTrail/StepParameters';
import StepProcessing from '../newTrail/StepProcessing';
import StepChartPreview from '../newTrail/StepChartPreview';


class NewTrailContainer extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            finished: false,
            selectedFile: '',
            title: Lang.label('newTrail'),
            stepIndex: 0,
        };
        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveAddedTrail = this.saveAddedTrail.bind(this);
        this.onHandleNext = this.handleNext.bind(this);
        this.onHandlePrev = this.handlePrev.bind(this);

        this.bindGluBusEvents({
            [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
            [Enum.AppEvents.CLOSE_FORM_NEW_TRAIL]: this.onCloseFormRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    componentDidUpdate() {
        switch (this.state.stepIndex) {
            case 3:
                this.emit(Enum.AppEvents.ENABLE_WP_DRAWER);
                break;
            case 4:
                this.emit(Enum.MapEvents.HIDE_PREVIEW_MAP);
                break;
            default:
                break;
        }
    }

    onOpenFormRequest() {
        this.setState({
            open: true,
        });
    }

    onCloseFormRequest() {
        this.setState({
            open: false,
        });
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (<StepUpload/>);
            case 1:
                return (<StepMapPreview/>);
            case 2:
                return (<StepWaypointsPreprocessing/>);
            case 3:
                return (<StepMapPreview/>);
            case 4:
                return (<StepProcessing/>);
            case 5:
                return (<StepParameters/>);
            case 6:
                return (<StepDescription/>);
            case 7:
                return (<StepChartPreview/>);
        }
    }

    render() {
        const stepIndex = this.state.stepIndex;
        const styles = {
            dialogContentStyle: {
                width: '80%',
                maxWidth: 'none',
            },
        };

        return (
            <Dialog
                className="dialog"
                contentStyle={styles.dialogContentStyle}
                title={this.state.title}
                modal={false}
                open={this.state.open}
                onRequestClose={this.onCloseEvent}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 0 })}>{Lang.label('stepperStepUpload')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 1 })}>{Lang.label('stepperMapPreview')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 2 })}>{Lang.label('stepperWpPreprocess')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 3 })}>{Lang.label('stepperMapPreview')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 4 })}>{Lang.label('stepperStepProcessing')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 5 })}>{Lang.label('stepperStepParameters')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 6 })}>{Lang.label('stepperStepDescription')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 7 })}>{Lang.label('stepperStepPreview')}</StepButton>
                    </Step>
                </Stepper>
                <div className="stepper-container">
                    {this.getStepContent(stepIndex)}
                    <div style={{ marginTop: 12 }}>
                        <FlatButton
                            label={Lang.label('previous')}
                            disabled={stepIndex === 0}
                            onTouchTap={this.onHandlePrev}
                            style={{ marginRight: 12 }}
                        />
                        <RaisedButton
                            label={stepIndex === 7 ? Lang.label('save') : Lang.label('next')}
                            primary={true}
                            onTouchTap={this.state.finished ? this.onSaveAddedTrail : this.onHandleNext}
                        />
                    </div>
                </div>
            </Dialog>
        );
    }

    handleClose() {
        this.setState({
            open: false,
            stepIndex: 0,
            finished: false,
        });
    }

    saveAddedTrail() {
        this.emit(Enum.MapEvents.REBUILD_PATH_LAYERS);
        this.emit(Enum.AppEvents.ENABLE_TRAIL_SAVE);
        this.onCloseEvent();
    }

    handleNext() {
        this.setState({
            stepIndex: (this.state.stepIndex < 7) ? (this.state.stepIndex + 1) : this.state.stepIndex,
            finished: (this.state.stepIndex === 6),
        });
    }

    handlePrev() {
        if (this.state.stepIndex > 0) {
            this.setState({
                stepIndex: this.state.stepIndex - 1,
                finished: false,
            });
        }
    }
}

export default NewTrailContainer;
