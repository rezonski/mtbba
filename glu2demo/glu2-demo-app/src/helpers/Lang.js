import GLU from '/../../glu2.js/src/index';
import Enum from '/enums/Enum';

const labels = {
    new: {
        bos: 'Nova',
        eng: 'New',
    },
    edit: {
        bos: 'Izmjeni',
        eng: 'Edit',
    },
    save: {
        bos: 'Spasi',
        eng: 'Save',
    },
    cancel: {
        bos: 'Poništi',
        eng: 'Cancel',
    },
    newTrail: {
        bos: 'Nova staza',
        eng: 'Nova staza',
    },
    addGeoFile: {
        bos: 'Dodaj .gpx /.kml',
        eng: 'Add .gpx /.kml',
    },
    addImageFile: {
        bos: 'Dodaj sliku',
        eng: 'Add image',
    },
    trailName: {
        bos: 'Naziv staze',
        eng: 'Trail name',
    },
    trailNameHint: {
        bos: 'Npr. Sarajevo-Nahorevo-Skakavac',
        eng: 'E.g. Sarajevo-Nahorevo-Skakavac',
    },
    trailDesc: {
        bos: 'Opis staze',
        eng: 'Trail description',
    },
    trailDescHint: {
        bos: 'Poruka od 300 do 600 slova',
        eng: 'Between 300 and 600 character',
    },
    chooseTrailType: {
        bos: 'Odaberi tip staze',
        eng: 'Choose trail type',
    },
    chooseFitnessLevel: {
        bos: 'Odaberi nivo potrebne fizičke kondicije',
        eng: 'Choose required fitness level',
    },
    chooseTechniqueLevel: {
        bos: 'Odaberi nivo potrebne tehničke vještine',
        eng: 'Choose required riding technique level',
    },
    listSelectionHint: {
        bos: 'Odaberi jednu od ponuđenih opcija',
        eng: 'Choose only one from list',
    },
};

const messages = {
    startInitialDataLoading: {
        bos: 'Počinje učitavanje inicijalnih postavki',
        eng: 'Start loading initial data',
    },
    endInitialDataLoading: {
        bos: 'Završeno učitavanje inicijalnih postavki',
        eng: 'Initial data loaded',
    },
    startLoadingMap: {
        bos: 'Počinje učitavanje mape',
        eng: 'Start loading map',
    },
    firstMapLoaded: {
        bos: 'Učitana prva mapa',
        eng: 'Loaded first map',
    },
    secondMapLoaded: {
        bos: 'Učitana druga mapa',
        eng: 'Loaded second map',
    },
    startSimplifyingRoute: {
        bos: 'Počinje reduciranje tačaka',
        eng: 'Start simplifying route',
    },
    endSimplifyingRoute: {
        bos: 'Završeno reduciranje tačaka',
        eng: 'End simplifying route',
    },
};

class Lang extends GLU.Controller {
    constructor(props) {
        super(props);
        this.lang = 'bos';
        this.bindGluBusEvents({
            [Enum.AppEvents.CHANGE_LANGUAGE]: this.onLanguageChanged,
        });
    }

    onLanguageChanged(lang) {
        this.lang = lang;
    }

    label(propName) {
        return labels[propName][this.lang];
    }

    msg(propName) {
        return messages[propName][this.lang];
    }
}
export default new Lang();
