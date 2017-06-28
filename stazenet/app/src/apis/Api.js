import AppConfig from '/appConfig';
import Trails from '/apis/TrailsApi';

let Api = {
    Trails: new Trails(AppConfig.constants.server),
};

export default Api;
