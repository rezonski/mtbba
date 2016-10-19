import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import Dialog from 'material-ui/Dialog';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';

// import MountainMultiSelection from '../newTrail/MountainMultiSelection';
// import InputTextBox from '../newTrail/InputTextBox';
// import ListSelection from '../newTrail/ListSelection';
// import UploadImage from '../newTrail/UploadImage';
// import UploadGeoFile from '../newTrail/UploadGeoFile';
// import StatusProgress from '../newTrail/StatusProgress';

class StepperContainer extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedFile: '',
            title: Lang.label('newTrail'),
            loading: false,
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
                return (
                  <p>
                    Select campaign settings. Campaign settings can include your budget, network, bidding
                    options and adjustments, location targeting, campaign end date, and other settings that
                    affect an entire campaign.
                  </p>
                );
            case 1:
                return (
                  <div>
                    <TextField style={{ marginTop: 0 }} floatingLabelText="Ad group name" />
                    <p>
                      Ad group status is different than the statuses for campaigns, ads, and keywords, though the
                      statuses can affect each other. Ad groups are contained within a campaign, and each campaign can
                      have one or more ad groups. Within each ad group are ads, keywords, and bids.
                    </p>
                    <p>Something something whatever cool</p>
                  </div>
                );
            case 2:
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

    renderContent() {
        const finished = this.state.finished;
        const stepIndex = this.state.stepIndex;
        const contentStyle = { margin: '0 16px', overflow: 'hidden' };

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>
                        <a href="#" onClick={(event) => {
                            event.preventDefault();
                            this.setState({
                                stepIndex: 0,
                                finished: false,
                            });
                        }}>Click here</a> to reset the example.
                    </p>
                </div>
            );
        }
        return (
            <div style={contentStyle}>
                <div>{ this.getStepContent(stepIndex) }</div>
                <div style={{ marginTop: 24, marginBottom: 12 }}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onTouchTap={ this.handlePrev.bind(this) }
                        style={{ marginRight: 12 }} />
                    <RaisedButton
                        label={ stepIndex === 2 ? 'Finish' : 'Next' }
                        primary={ true }
                        onTouchTap={ this.handleNext.bind(this) }/>
                </div>
            </div>
        );
    }

    render() {
        const { loading, stepIndex } = this.state;

        const styles = {
            block: {
                maxWidth: 250,
            },
            dialogContentStyle: {
                width: '80%',
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
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Select campaign settings</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad group</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                    </Step>
                </Stepper>
                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
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

    dummyAsync(cb) {
        this.setState({
            loading: true,
        }, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    }

    handleNext() {
        const stepIndex = this.state.stepIndex;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                    loading: false,
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 2,
                })
            );
        }
    }

    handlePrev() {
        const stepIndex = this.state.stepIndex;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                    loading: false,
                    stepIndex: stepIndex - 1,
                })
            );
        }
    }
}

export default StepperContainer;
