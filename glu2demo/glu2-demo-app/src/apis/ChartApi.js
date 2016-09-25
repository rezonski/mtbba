import GLU from '/../../glu2.js/src/index';

class ChartApi extends GLU.Api {
    constructor(endpoint) {
        super(endpoint);

        this.createApiActions({
            name: 'searchProjects',
            method: GLU.Api.Get,
            path: '/search/project',
            credentials: true,
        }, {
            name: 'createProject',
            method: GLU.Api.Post,
            path: '/project',
            credentials: true,
        }, {
            name: 'loadProject',
            method: GLU.Api.Get,
            path: '/project/{projectId}',
            credentials: true,
        }, {
            name: 'cloneProject',
            method: GLU.Api.Post,
            path: '/project/{projectId}/clone',
            credentials: true,
        }, {
            name: 'getTags',
            method: GLU.Api.Get,
            path: '/search/tag',
            credentials: true,
        }, {
            name: 'updateProject',
            method: GLU.Api.Post,
            path: '/project/{projectId}',
            credentials: true,
        }, {
            name: 'transferOwnership',
            method: GLU.Api.Post,
            path: '/project/{projectId}/transfer-ownership',
            credentials: true,
        }, {
            name: 'deleteProjects',
            method: GLU.Api.Post,
            path: '/bulk/project/delete',
            credentials: true,
        }, {
            name: 'jobImport',
            method: GLU.Api.Post,
            path: '/job',
            credentials: true,
        }, {
            name: 'signS3',
            method: GLU.Api.Post,
            path: '/job/{jobId}/sign-s3-put',
            credentials: true,
        }, {
            name: 'startProcessing',
            method: GLU.Api.Post,
            path: '/job/{jobId}/start-processing',
            credentials: true,
        }, {
            name: 'queryThemes',
            method: GLU.Api.Get,
            path: '/theme',
            credentials: true,
        }, {
            name: 'deleteTheme',
            method: GLU.Api.Delete,
            path: '/theme/{themeId}',
            credentials: true,
        }, {
            name: 'getNumOfProjectsForTheme',
            method: GLU.Api.Get,
            path: '/theme/{themeId}/count-projects',
            credentials: true,
        }, {
            name: 'getProjectsIdsForTheme',
            method: GLU.Api.Get,
            path: '/theme/{themeId}/projects',
            credentials: true,
        }, {
            name: 'bulkApply',
            method: GLU.Api.Post,
            path: '/theme/bulk/assign-projects',
            credentials: true,
        });
    }
}

export default ChartApi;
