import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

const primaryDarkBlue = '#003057';
const accentBrightBlue = '#1cb0da';
const accentPearsonBlue = '#007fa3';
const grayLightBack = '#F1F3F5';

export default {
    themeClass: null,
    logo: 'assets/pearson_logo.svg',
    logoAlt: 'Pearson',
    spacing: Spacing,
    zIndex,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: primaryDarkBlue,
        primary2Color: primaryDarkBlue,
        primary3Color: primaryDarkBlue,
        accent1Color: fade(accentBrightBlue, 0.9),
        accent2Color: fade(accentPearsonBlue, 0.8),
        accent3Color: accentPearsonBlue,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: fade(primaryDarkBlue, 0.3),
        pickerHeaderColor: Colors.cyan500,
    },
    tabs: {
        backgroundColor: grayLightBack,
        textColor: Colors.lightBlack,
        selectedTextColor: Colors.darkBlack,
    },
    refreshIndicator: {
        loadingStrokeColor: accentPearsonBlue,
    },
    checkbox: {
        checkedColor: fade(accentBrightBlue, 0.9),
    },
    radioButton: {
        checkedColor: fade(accentBrightBlue, 0.9),
    },
    slider: {
        trackSize: 4,
        trackColor: Colors.grey300,
        trackColorSelected: Colors.grey300,
        handleSize: 22,
        handleSizeDisabled: 22,
        handleSizeActive: 22,
        handleColorZero: primaryDarkBlue,
        handleFillColor: primaryDarkBlue,
    },
};
