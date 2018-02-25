import Api from '/apis/Api';
import GLU from '/../../glu2.js/src/index';

class Identities extends GLU.DataSource {
    constructor() {
        super();
        this._collection = [];
    }

    getIdentity(id) {
        const logic = (resolve, reject) => {
            const existingItem = this._collection.find(identity => identity.id === id);
            if (existingItem) {
                resolve([existingItem]);
            } else {
                Api.Accounts.getIdentity({ query: { identityId: id } })
                    .then(response => resolve([response.body]))
                    .catch(err => reject(err));
            }
        };
        return this.cacheRequest({ id }, logic, this._collection);
    }

    getIdentities(params) {
        const logic = (resolve, reject) => {
            if (params.forCurrentUser) {
                // only retrieve current user and hers organizations
                Api.Accounts.getSession()
                    .then(response => {
                        let userId = response.body.id;

                        if (userId === -1) {
                            reject('User not registered');
                            return;
                        }

                        Promise
                            .all([
                                Api.Accounts.getUser({ query: { userId } }),
                                Api.Accounts.getOrganizationsForCurrentUser({ query: { memberId: userId } }),
                            ])
                            .then(responses => {
                                const currentUser = responses[0].body;
                                const herOrganizations = responses[1].body;
                                resolve([currentUser].concat(herOrganizations));
                            })
                            .catch(err => {
                                reject(err);
                            });
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else if (params.ids) {
                Promise.all(params.ids.map(id => this.getIdentity(id)))
                    .then(responses => resolve(responses))
                    .catch(err => reject(err));
            }
        };
        return this.cacheRequest(params, logic, this._collection);
    }
}

export default new Identities();
