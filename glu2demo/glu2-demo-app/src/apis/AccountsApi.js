import GLU from '/../../glu2.js/src/index';

class AccountsApi extends GLU.Api {
    constructor(endpoint) {
        super(endpoint);

        this.createApiActions({
            name: 'getIdentity',
            method: GLU.Api.Get,
            path: '/identity/{identityId}',
            credentials: true,
        }, {
            name: 'getUser',
            method: GLU.Api.Get,
            path: '/user/{userId}',
            credentials: true,
        }, {
            name: 'getSession',
            method: GLU.Api.Get,
            path: '/session',
            credentials: true,
        }, {
            name: 'getOrganizationsForCurrentUser',
            method: GLU.Api.Get,
            path: '/group-membership',
            credentials: true,
        }, {
            name: 'getOrganizationMembers',
            method: GLU.Api.Get,
            path: '/group-membership',
            credentials: true,
        }, {
            name: 'createOrganization',
            method: GLU.Api.Post,
            path: '/group',
            credentials: true,
        }, {
            name: 'signOut',
            method: GLU.Api.Delete,
            path: '/session',
            credentials: true,
        }, {
            name: 'searchUsersForInvitation',
            method: GLU.Api.Get,
            path: '/user-invitation/group/search-user',
            credentials: true,
        }, {
            name: 'addOrganizationMember',
            method: GLU.Api.Post,
            path: '/group-membership',
            credentials: true,
        }, {
            name: 'removeOrganizationMember',
            method: GLU.Api.Delete,
            path: '/group-membership',
            credentials: true,
        }, {
            name: 'updateOrganizationMember',
            method: GLU.Api.Post,
            path: '/group-membership/update',
            credentials: true,
        });
    }
}

export default AccountsApi;
