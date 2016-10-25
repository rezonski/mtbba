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
import StepDescription from '../newTrail/StepDescription';
import StepParameters from '../newTrail/StepParameters';
import StepProcessing from '../newTrail/StepProcessing';
import StepChartPreview from '../newTrail/StepChartPreview';


class StepperContainer extends BasePage {
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
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onOpenFormRequest() {
        this.setState({
            open: true,
        });
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (<StepUpload/>);
            case 1:
                return (<StepProcessing/>);
            case 2:
                return (<StepParameters/>);
            case 3:
                return (<StepDescription/>);
            case 4:
                return (<StepChartPreview/>);
            default:
                return 'Ouuuooops!';
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
                        <StepButton onClick={() => this.setState({ stepIndex: 1 })}>{Lang.label('stepperStepProcessing')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 2 })}>{Lang.label('stepperStepParameters')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 3 })}>{Lang.label('stepperStepDescription')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 4 })}>{Lang.label('stepperStepPreview')}</StepButton>
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
                            label={stepIndex === 4 ? Lang.label('save') : Lang.label('next')}
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
        console.info('spasi');
        console.info(this.refs);
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

export default StepperContainer;