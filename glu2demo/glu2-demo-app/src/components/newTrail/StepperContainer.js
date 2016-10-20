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
import Step0 from '../newTrail/Step0';
import Step1 from '../newTrail/Step1';
import Step2 from '../newTrail/Step2';


class StepperContainer extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedFile: '',
            title: Lang.label('newTrail'),
            finished: false,
            stepIndex: 0,
        };
        this.onCloseEvent = this.handleClose.bind(this);
        this.onSaveAddedTrail = this.saveAddedTrail.bind(this);

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
                return (<Step0/>);
            case 1:
                return (<Step1/>);
            case 2:
                return (<Step2/>);
            case 3:
                return (
                    <p>
                    Try out different ad text to see what brings in the most customers, and learn how to
                    enhance your ads using features like ad extensions. If you run into any problems with your
                    ads, find out how to tell if they're running and how to resolve approval issues.
                    </p>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const stepIndex = this.state.stepIndex;

        const styles = {
            block: {
                maxWidth: 250,
            },
            dialogContentStyle: {
                width: '70%',
                maxWidth: 'none',
            },
        };

        const actions = [
          <RaisedButton
            label={Lang.label('save')}
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.onSaveAddedTrail}
          />,
          <FlatButton
            label={Lang.label('cancel')}
            primary={true}
            keyboardFocused={false}
            onTouchTap={this.onCloseEvent}
          />,
        ];

        return (
            <Dialog
                className="dialog"
                contentStyle={styles.dialogContentStyle}
                title={this.state.title}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.onCloseEvent}>
                <Stepper linear={false} activeStep={stepIndex}>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 0 })}>{Lang.label('stepperStep0')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 1 })}>{Lang.label('stepperStep1')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 2 })}>{Lang.label('stepperStep2')}</StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 3 })}>{Lang.label('stepperStep3')}</StepButton>
                    </Step>
                </Stepper>
                <div className="stepper-container">
                    {this.getStepContent(stepIndex)}
                </div>
            </Dialog>
        );
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    saveAddedTrail() {
        console.info('spasi');
        console.info(this.refs);
    }
}

export default StepperContainer;
