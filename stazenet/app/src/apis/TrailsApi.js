import GLU from '/../../glu2.js/src/index';

class TrailsApi extends GLU.Api {
    constructor(endpoint) {
        super(endpoint);

        this.createApiActions(
        {
            name: 'getInitialSetup',
            method: GLU.Api.Get,
            path: 'db/getmnts.php',
            credentials: false,
        },
        {
            name: 'getTrailsList',
            method: GLU.Api.Get,
            path: 'db/getactivetrails.php',
            credentials: false,
        },
        {
            name: 'getTrail',
            method: GLU.Api.Get,
            path: 'db/gettrail.php',
            credentials: false,
        },
        {
            name: 'getToken',
            method: GLU.Api.Get,
            path: 'db/gettoken.php',
            credentials: false,
        },
        {
            name: 'uploadImage',
            method: GLU.Api.Post,
            path: 'file/upload.php',
            credentials: false,
        },
        {
            name: 'getTrailThumbnail',
            method: GLU.Api.Get,
            path: 'file/getTrailThumbnail.php',
            credentials: false,
        },
        {
            name: 'getWPThumbnail',
            method: GLU.Api.Get,
            path: 'file/getWPThumbnail.php',
            credentials: false,
        } /* ,{
            name: 'getIdentity',
            method: GLU.Api.Get,
            path: '/identity/{identityId}',
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
        }*/);
    }
}

export default TrailsApi;
