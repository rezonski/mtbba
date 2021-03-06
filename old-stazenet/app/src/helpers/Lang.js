import GLU from '/../../glu2.js/src/index';
import Enum from '/enums/Enum';

const labels = {
    next: {
        bos: 'Sljedeće',
        eng: 'Next',
    },
    previous: {
        bos: 'Prethodno',
        eng: 'Previous',
    },
    finish: {
        bos: 'Završi',
        eng: 'Finish',
    },
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
        bos: 'Lorem ipsum',
        eng: 'Lorem ipsum',
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
    },
    chooseFitnessLevel: {
        bos: 'Odaberi nivo potrebne fizičke kondicije',
        eng: 'Choose required fitness level',
    },
    chooseTechniqueLevel: {
        bos: 'Odaberi nivo potrebne tehničke vještine',
        eng: 'Choose required riding technique level',
    },
    reviewLandscape: {
        bos: 'Ocjena krajolika (1-5)',
        eng: 'Landscape (1-5)',
    },
    reviewFun: {
        bos: 'Zanimljivo (1-5)',
        eng: 'Fun factor (1-5)',
    },
    listSelectionHint: {
        bos: 'Odaberi jednu od ponuđenih opcija',
        eng: 'Choose only one from list',
    },
    stepperStepUpload: {
        bos: 'Dodaj gpx/kml',
        eng: 'Add gpx/kml',
    },
    stepperMapPreview: {
        bos: 'Pregled staze',
        eng: 'Trail Preview',
    },
    stepperWpPreprocess: {
        bos: 'Putne tacke',
        eng: 'Waypoints',
    },
    stepperStepDescription: {
        bos: 'Opis i slika',
        eng: 'Description',
    },
    stepperStepParameters: {
        bos: 'Parametri staze',
        eng: 'Trail parameters',
    },
    stepperStepProcessing: {
        bos: 'Procesiranje',
        eng: 'Processing',
    },
    stepperStepPreview: {
        bos: 'Pregled',
        eng: 'Preview',
    },
    startProcessing: {
        bos: 'Započni procesiranje',
        eng: 'Start processing',
    },
    manualEditPath: {
        bos: 'Rucna popravka staze',
        eng: 'Manualy edit path',
    },
    showPreviewPath: {
        bos: 'Pregledaj ucitanu stazu',
        eng: 'Show preview path',
    },
    hidePreviewPath: {
        bos: 'Sakrij ucitanu stazu',
        eng: 'Hide preview path',
    },
    generalProcesProgres: {
        bos: 'Generalni progres',
        eng: 'General progress',
    },
    simplifyingPathProgres: {
        bos: 'Čišćenje putanje',
        eng: 'Simplifying',
    },
    addingElevationProgres: {
        bos: 'Dodavanje visine',
        eng: 'Elevation data',
    },
    flattenPathProgres: {
        bos: 'Ujednačavanje profila',
        eng: 'Flattening',
    },
    WPFixProgres: {
        bos: 'Obrada putnih tačaka',
        eng: 'Waypoints',
    },
    imageUploadProgres: {
        bos: 'Progres podizanja slike',
        eng: 'Uploading data',
    },
    generalFactsDistance: {
        bos: 'Dužina staze [km]',
        eng: 'Trail length [km]',
    },
    generalElevationGain: {
        bos: 'Visinski uspon [m]',
        eng: 'Elevation gain [m]',
    },
    generalElevationLoss: {
        bos: 'Visinski uspon [m]',
        eng: 'Elevation oss [m]',
    },
    odometer: {
        bos: 'Distanca',
        eng: 'Distance',
    },
    surfaceDesc: {
        bos: 'Opis podloge',
        eng: 'Surface description',
    },
    deleteSegment: {
        bos: 'Obriši segment',
        eng: 'Delete segment',
    },
    leftMap: {
        bos: 'Lijeva mapa',
        eng: 'Left map',
    },
    rightMap: {
        bos: 'Desna mapa',
        eng: 'Right map',
    },
    waypoints: {
        bos: 'Tačke',
        eng: 'Waypoints',
    },
    maplayers: {
        bos: 'Slojevi',
        eng: 'Map layers',
    },
    savetrail: {
        bos: 'Spasi',
        eng: 'Save',
    },
    publishtrail: {
        bos: 'Objavi',
        eng: 'Publish',
    },
    opentrail: {
        bos: 'Otvori',
        eng: 'Open',
    },
    name: {
        bos: 'Naziv',
        eng: 'Name',
    },
    distance: {
        bos: 'Dužina',
        eng: 'Distance',
    },
    elevationgain: {
        bos: 'V.uspon',
        eng: 'El.gain',
    },
    trailtype: {
        bos: 'Tip',
        eng: 'Type',
    },
    newWaypoint: {
        bos: 'Nova tačaka',
        eng: 'New waypoint',
    },
    wpDesc: {
        bos: 'Opis tačke',
        eng: 'Waypoint description',
    },
    pictogram: {
        bos: 'Shema raskrsnice',
        eng: 'Pictogram',
    },
    pictogramHint: {
        bos: 'npr. 90-v135-z30',
        eng: 'eg. 90-v135-z30',
    },
    pointTypes: {
        bos: 'Vrsta tacke puta',
        eng: 'Waypoint type',
    },
    overrideThumbnails: {
        bos: 'Ponovo generisi slicice',
        eng: 'Override Thumbnails',
    },
    snapWPsToPath: {
        bos: 'Vezi tacke puta za putanju',
        eng: 'Snap waypoints to path',
    },
    elevationThreshold: {
        bos: 'Visinska i tolerancija nagiba',
        eng: 'Elevation and slope threshold',
    },
    absoluteElevationThreshold: {
        bos: 'Apsolutna',
        eng: 'Absolute',
    },
    absoluteElevationThresholdHint: {
        bos: 'visinski metri',
        eng: 'elevation meters',
    },
    relativeElevationThreshold: {
        bos: 'Relativna',
        eng: 'Relative',
    },
    relativeElevationThresholdHint: {
        bos: 'visinski metri',
        eng: 'elevation meters',
    },
    slopeTreshlod: {
        bos: 'Nagib',
        eng: 'Slope',
    },
    slopeTreshlodHint: {
        bos: 'Max. procenat',
        eng: 'Max Percent',
    },
    wpName: {
        bos: 'Naziv lokacije',
        eng: 'Waypoint name',
    },
    suggestion: {
        bos: 'Prijedlozi',
        eng: 'Suggestions',
    },
    showOnElevationProfile: {
        bos: 'Profil',
        eng: 'Elev',
    },
    yes: {
        bos: 'Da',
        eng: 'Yes',
    },
    no: {
        bos: 'Ne',
        eng: 'No',
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
    startTrailsListLoading: {
        bos: 'Počinje učitavanje liste staza',
        eng: 'Start loading trails list',
    },
    endTrailsListLoading: {
        bos: 'Završeno učitavanje liste staza',
        eng: 'Trails list loaded',
    },
    startDownloadingTrailLoading: {
        bos: 'Počinje učitavanje staze ID ',
        eng: 'Start loading trail ID ',
    },
    endDownloadingTrailLoading: {
        bos: 'Završeno učitavanje staze ID ',
        eng: 'Loaded trail ID ',
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
    previewMapLoaded: {
        bos: 'Učitana pregledna mapa',
        eng: 'Loaded preview map',
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
    trailLoadFailed: {
        bos: 'Greška u podacima',
        eng: 'Failed to load',
    },
    trailThumbnailGetFailed: {
        bos: 'Greška u generisanju pregledne slike staze',
        eng: 'Failed to generate trail thumbnail',
    },
    wpThumbnailGetFailed: {
        bos: 'Greška u generisanju pregledne slike tacke puta',
        eng: 'Failed to generate waypoint thumbnail',
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
    changesSaved: {
        bos: 'Snimljene izmjene',
        eng: 'Changes saved',
    },
    endGeoFileParsing: {
        bos: 'Završeno prva obrada gpx/kml datoteke',
        eng: 'Gpx/kml file data parsed',
    },
    endGeoFileSimplifying: {
        bos: 'Završeno reduciranje tačaka rute',
        eng: 'Trail simplifying completed',
    },
    totalBadElevatedPoints: {
        bos: 'Ukupno nekompletnih visinskih koordinata: ',
        eng: 'Total number of points missing elevation: ',
    },
    endAddingElevation: {
        bos: 'Završeno dodavanje visinskih koordinata',
        eng: 'Elevation adding completed',
    },
    endPathNivelating: {
        bos: 'Završeno čišćenje i peglanje putanje',
        eng: 'Nivelating path line completed',
    },
    endPathInterpolating: {
        bos: 'Završeno čišćenje i peglanje putanje',
        eng: 'Interpolating path line completed',
    },
    endGeneralFactsGenerating: {
        bos: 'Završeno definisanje parametara staze',
        eng: 'Trail general facts computed',
    },
    endPathlineEnriching: {
        bos: 'Završeno obogacivanje tacaka puta',
        eng: 'Trail path points enriched',
    },
    endWaypointsGenerating: {
        bos: 'Završena obrada putnih tačaka',
        eng: 'Waypoints generating completed',
    },
    keypress4surfaceType: {
        bos: 'Pritisni A - asfalt / M - makadam / S - staza / N - nevozljivo',
        eng: 'Press A - asphalt / M - macadam / S - trail / N - hiking',
    },
    mapPathLayersRebuilt: {
        bos: 'Slojevi osvježeni',
        eng: 'Path layers rebuilt',
    },
    clickFirstCoordinate: {
        bos: 'Za translatiranje staze kliknite na prvu tacku',
        eng: 'To translate trail click on first point',
    },
    clickSecondCoordinate: {
        bos: 'Kliknite na drugu tacku',
        eng: 'Click on second point',
    },
    tooManyPointsSelected: {
        bos: 'Odaberite manji broj tačaka',
        eng: 'Select a smaller number of features',
    },
    search4PointsFailed: {
        bos: 'Greska prilikom pretrage Google tacaka',
        eng: 'Search for Google Points failed',
    },
};

class Lang extends GLU.Controller {
    constructor(props) {
        super(props);
        this.lang = 'eng';
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
