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
        bos: 'Test',
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
    externalLink: {
        bos: 'Web adresa dodatnog opisa',
        eng: 'External web address link',
    },
    externalLinkHint: {
        bos: 'http://www.mtba.ba/...',
        eng: 'http://www.mtba.ba/...',
    },
    selectMountain: {
        bos: 'Odaberi planinu',
        eng: 'Select mountain',
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
    stepperStep0: {
        bos: 'Dodaj gpx/kml',
        eng: 'Add gpx/kml',
    },
    stepperStep1: {
        bos: 'Opis i slika',
        eng: 'Description',
    },
    stepperStep2: {
        bos: 'Parametri staze',
        eng: 'Trail parameters',
    },
    stepperStep3: {
        bos: 'Procesiranje',
        eng: 'Processing',
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
    fileLoadFailed: {
        bos: 'Greška u datoteci',
        eng: 'Failed to load file',
    },
    fileFormatUnsuported: {
        bos: 'Format datoteke nije podržan',
        eng: 'Unsuported file type',
    },
    startGeoFileReading: {
        bos: 'Počinje učitavanje gpx/kml datoteke',
        eng: 'Start loading gpx/kml file',
    },
    endGeoFileReading: {
        bos: 'Završeno učitavanje gpx/kml datoteke',
        eng: 'Gpx/kml file data loaded',
    },
    endGeoFileParsing: {
        bos: 'Završeno prva obrada gpx/kml datoteke',
        eng: 'Gpx/kml file data parsed',
    },
    endGeoFileSimplifying: {
        bos: 'Završeno reduciranje tačaka rute',
        eng: 'Trail simplifying completed',
    },
    endAddingElevation: {
        bos: 'Završeno dodavanje visinskih koordinata',
        eng: 'Elevation adding completed',
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
