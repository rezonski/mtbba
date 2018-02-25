import { white, fullBlack } from 'material-ui/styles/colors';
import { lighten, emphasize } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import Typography from 'material-ui/styles/typography';

const spacingWithContentMaxWidth = Object.assign({
    contentMaxWidth: 1200,
}, spacing);

const typography = Object.assign({
    fontSizes: {
        display1: 32,
        title: 20,
        body: 14,
    },
    fontWeightBlack: 900,
}, Typography);

const primaryColor = '#3f3d48';
const accentColor = '#f16078';
const textColor = 'rgba(33, 33, 33, 0.87)';
const canvasColor = white;
const borderColor = '#d3d3d3';
const secondaryTextColor = 'rgba(33, 33, 33, 0.54)';
const fontFamily = 'Roboto, sans-serif';

export default {
    spacing: spacingWithContentMaxWidth,
    fontFamily,
    typography,
    palette: {
        primary1Color: primaryColor,
        primary2Color: lighten(primaryColor, 0.2),
        primary3Color: lighten(primaryColor, 0.4),
        accent1Color: accentColor,
        accent2Color: lighten(accentColor, 0.2),
        accent3Color: lighten(accentColor, 0.4),
        textColor,
        secondaryTextColor,
        alternateTextColor: 'rgba(255, 255, 255, 0.87)',
        canvasColor,
        borderColor,
        disabledColor: 'rgba(33, 33, 33, 0.38)',
        shadowColor: fullBlack,
    },
    dataTable: {
        headerHeight: 56,
        rowHeight: 48,
        lastRowHeight: 56,
        fistLastCellGutter: spacing.desktopGutter,
        betweenCellsGutter: 28,
        dataTextColor: textColor,
        headerTextColor: secondaryTextColor,
        headerSortedColor: textColor,
        backgroundColor: canvasColor,
        hoverBackgroundColor: emphasize(canvasColor, 0.07),
        selectedBackgroundColor: emphasize(canvasColor, 0.1),
        borderColor,
        headerFontSize: 12,
        dataFontSize: 13,
        fontFamily,
        sortIconSize: 16,
        sortIconMargin: spacing.desktopGutterMini,
    },
};
