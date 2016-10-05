import Config from '/config';

class AppConfig {
    constructor() {
    }

    get constants() {
        return Config;
    }

    // loginURL(returnLink) {
    //     return Config.accounts.baseURL + Config.accounts.loginPart + Config.accounts.continuePart + encodeURIComponent(returnLink);
    // }

    // signupURL(returnLink) {
    //     return Config.accounts.baseURL + Config.accounts.signupPart + Config.accounts.continuePart + encodeURIComponent(returnLink);
    // }

    // profileURL() {
    //     return Config.accounts.baseURL + Config.accounts.profilePart;
    // }
}

export default new AppConfig();
