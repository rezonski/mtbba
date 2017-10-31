import React from 'react';
import BasePage from '../BasePage';
// import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import InputTextBox from '../common/InputTextBox';
import ImagePreview from '../common/ImagePreview';
import ListSelection from '../common/ListSelection';

class WPEditorTray extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.bindGluBusEvents({
            // [Enum.AppEvents.OPEN_FORM_NEW_TRAIL]: this.onOpenFormRequest,
        });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }


    render() {
        return (<div className="flex-container column single-wp-edit-box">
                    <div className="flex-container row">
                        <div className="flex-container column narower">
                            <div className="flex-element narower2">
                                <ListSelection
                                    key="pointTypes"
                                    fieldName={'waypoints'}
                                    sourceName="pointTypes"
                                    defaultValueIndex={0}
                                    fieldIndex={this.props.wpIndex}
                                    fieldProp={'symbol'}
                                    floatingLabelText={Lang.label('pointTypes')}
                                />
                            </div>
                            <div className="flex-element wider">
                                <ImagePreview
                                    fieldName={'waypoints'}
                                    fieldIndex={this.props.wpIndex}
                                    fieldProp={'pictureUrl'}
                                />
                            </div>
                        </div>
                        <div className="flex-container column narower">
                            <div className="flex-element narower2">
                                <InputTextBox
                                    fieldName={'waypoints'}
                                    fieldIndex={this.props.wpIndex}
                                    fieldProp={'pictogram'}
                                    inputBoxStyle={{ fontSize: '80%' }}
                                    isMultiline={false}
                                    noRows={1}
                                    filedLabel={Lang.label('pictogram')}
                                    filedHintText={Lang.label('pictogramHint')}
                                />
                            </div>
                            <div className="flex-element wider2">
                                <ImagePreview
                                    fieldName={'waypoints'}
                                    fieldIndex={this.props.wpIndex}
                                    fieldProp={'pictogram'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-container row">
                        <InputTextBox
                            key={'waypoints'}
                            fieldName={'waypoints'}
                            fieldIndex={this.props.wpIndex}
                            fieldProp={'descgenerated'}
                            inputBoxStyle={{ fontSize: '80%' }}
                            isMultiline={true}
                            noRows={6}
                            filedLabel={Lang.label('wpDesc')}
                            filedHintText={Lang.label('trailDescHint')}
                        />
                    </div>
                </div>);
    }
}

export default WPEditorTray;
