import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
    spacing: Spacing,
    zIndex,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.blue800,
        primary2Color: Colors.blue700,
        primary3Color: Colors.blue900,
        accent1Color: Colors.red700,
        accent2Color: Colors.red500,
        accent3Color: Colors.red900,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: fade(Colors.darkBlack, 0.3),
        pickerHeaderColor: Colors.cyan500,
    },
    slider: {
        trackSize: 4,
        trackColor: Colors.grey300,
        trackColorSelected: Colors.grey300,
        handleSize: 22,
        handleSizeDisabled: 22,
        handleSizeActive: 22,
        handleColorZero: Colors.blue700,
        handleFillColor: Colors.blue700,
    },
};
