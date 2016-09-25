import GLU from '/../../glu2.js/src/index';

import Identities from '/dataSources/Identities';

class IdentitiesController extends GLU.Controller {
    onActivate() {
        this.bindGluBusEvents({
            RETRIEVE_IDENTITIES: this.getIdentities,
        });
    }

    getIdentities(params) {
        Identities.getIdentities(params)
            .then(identities => GLU.bus.emit('IDENTITIES_RETRIEVED', identities));
    }

    onDeactivate() {
        this.unbindGluBusEvents();
    }
}

export default new IdentitiesController();
