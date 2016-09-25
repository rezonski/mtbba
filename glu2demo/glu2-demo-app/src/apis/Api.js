import Accounts from '/apis/AccountsApi';
import Chart from '/apis/ChartApi';

import AppConfig from '/appConfig';

let Api = {
    Accounts: new Accounts(AppConfig.constants.backends.accounts),
    Chart: new Chart(AppConfig.constants.backends.chart),
};

export default Api;
