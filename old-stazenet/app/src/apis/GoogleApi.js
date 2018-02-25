import GLU from '/../../glu2.js/src/index';

class GoogleApi extends GLU.Api {
    constructor(endpoint) {
        super(endpoint);

        this.createApiActions({
            name: 'search4Point',
            method: GLU.Api.Get,
            path: 'place/nearbysearch/json',
            credentials: false,
        });
    }
}

export default GoogleApi;
