import React from 'react';
import BasePage from '../BasePage';
import Enum from '/enums/Enum';
import Lang from '/helpers/Lang';
import InputTextBox from '../common/InputTextBox';
// import ImagePreview from '../common/ImagePreview';
// import ListSelection from '../common/ListSelection';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import LocationOn from 'material-ui/svg-icons/communication/location-on';

class WPEditorTray extends BasePage {
    constructor(props) {
        super(props);
        this.state = props;
        this.onLocateClickEvent = this.onLocateClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onLocateClick() {
        this.emit(Enum.MapEvents.FOCUS_POINT_ON_MAP, {
            coordinates: this.state.wp.geometry.coordinates,
        });
        this.emit(Enum.AppEvents.PREVIEW_PICTOGRAM, {
            wpIndex: this.state.wpIndex,
        });
    }

    render() {
        console.log('render WPEditorTray');
        return (<div className="flex-container row single-wp-edit-box">
                    <InputTextBox
                        fieldName={'waypoints'}
                        fieldIndex={this.state.wpIndex}
                        fieldProp={'name'}
                        inputBoxStyle={{ fontSize: '80%' }}
                        isMultiline={false}
                        noRows={1}
                        filedLabel={Lang.label('name')}
                        filedHintText={Lang.label('name')}
                        onClick={() => console.log('onClick')}
                    />
                    <InputTextBox
                        fieldName={'waypoints'}
                        fieldIndex={this.state.wpIndex}
                        fieldProp={'pictogram'}
                        inputBoxStyle={{ fontSize: '80%' }}
                        isMultiline={false}
                        noRows={1}
                        filedLabel={Lang.label('pictogram')}
                        filedHintText={Lang.label('pictogramHint')}
                        onClick={() => console.log('onClick')}
                    />
                </div>);
    }

    // render() {
    //     return (<div className="flex-container column single-wp-edit-box">
    //                 <div className="flex-container row">
    //                     <div className="flex-container column narower">
    //                         <div className="flex-element narower2">
    //                             <ListSelection
    //                                 key="pointTypes"
    //                                 fieldName={'waypoints'}
    //                                 sourceName="pointTypes"
    //                                 defaultValueIndex={0}
    //                                 fieldIndex={this.props.wpIndex}
    //                                 fieldProp={'symbol'}
    //                                 floatingLabelText={Lang.label('pointTypes')}
    //                             />
    //                         </div>
    //                         <div className="flex-element wider">
    //                             <ImagePreview
    //                                 fieldName={'waypoints'}
    //                                 fieldIndex={this.props.wpIndex}
    //                                 fieldProp={'pictureUrl'}
    //                             />
    //                         </div>
    //                     </div>
    //                     <div className="flex-container column narower">
    //                         <div className="flex-element narower2">
    //                             <InputTextBox
    //                                 fieldName={'waypoints'}
    //                                 fieldIndex={this.props.wpIndex}
    //                                 fieldProp={'pictogram'}
    //                                 inputBoxStyle={{ fontSize: '80%' }}
    //                                 isMultiline={false}
    //                                 noRows={1}
    //                                 filedLabel={Lang.label('pictogram')}
    //                                 filedHintText={Lang.label('pictogramHint')}
    //                             />
    //                         </div>
    //                         <div className="flex-element wider2">
    //                             <ImagePreview
    //                                 fieldName={'waypoints'}
    //                                 fieldIndex={this.props.wpIndex}
    //                                 fieldProp={'pictogram'}
    //                             />
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex-container row">
    //                     <InputTextBox
    //                         key={'waypoints'}
    //                         fieldName={'waypoints'}
    //                         fieldIndex={this.props.wpIndex}
    //                         fieldProp={'descgenerated'}
    //                         inputBoxStyle={{ fontSize: '80%' }}
    //                         isMultiline={true}
    //                         noRows={6}
    //                         filedLabel={Lang.label('wpDesc')}
    //                         filedHintText={Lang.label('trailDescHint')}
    //                     />
    //                 </div>
    //             </div>);
    // }
}

export default WPEditorTray;
