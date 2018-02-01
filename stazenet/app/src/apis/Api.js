import AppConfig from '/appConfig';
import Trails from '/apis/TrailsApi';
import Google from '/apis/GoogleApi';

let Api = {
    Trails: new Trails(AppConfig.constants.server),
    Google: new Google('https://maps.googleapis.com/maps/api/'),
};

export default Api;
