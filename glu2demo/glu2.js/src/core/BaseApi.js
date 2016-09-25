import Constants from './Constants';
import request from 'superagent';

function isArrayOfFunctions(obj) {
    // check if array
    if (!Array.isArray(obj)) {
        return false;
    }
    // check if all elements are functions
    for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] !== 'function') {
            return false;
        }
    }
    return true;
}

function isValidMethod(method) {
    switch (method) {
    case Constants.GET:
        return true;
    case Constants.POST:
        return true;
    case Constants.DELETE:
        return true;
    default:
        return false;
    }
}

function isObject(value) {
    const type = typeof value;
    return !!value && (type === 'object' || type === 'function');
}

function apiActionHasRequiredFields(action) {
    return action &&
           action.hasOwnProperty('name') &&
           action.hasOwnProperty('method') &&
           action.hasOwnProperty('path') &&
           action.hasOwnProperty('credentials');
}

function apiActionHasFieldsOfValidType(action) {
    return typeof action.name === 'string' &&
           typeof action.path === 'string' &&
           isValidMethod(action.method) &&
           typeof action.credentials === 'boolean';
}

// Helper function to determine if provided object has all the fields neccessary to be a valid Api action.
function isValidApiAction(action) {
    // Check if all fields are present.
    if (!apiActionHasRequiredFields(action)) {
        this._log('API action definition does not have all the required fields.', action);
        return false;
    }
    // Check if all fields are of correct type.
    if (!apiActionHasFieldsOfValidType(action)) {
        this._log('API action definition does not have all the required fields in correct type/format.', action);
        return false;
    }
    // because before & after functions are optional, we validate them differently
    if (action.hasOwnProperty('before') && !isArrayOfFunctions(action.before)) {
        this._log('API action definition before interceptor definition is not array of functions.', action.before);
        return false;
    }
    if (action.hasOwnProperty('after') && !isArrayOfFunctions(action.after)) {
        this._log('API action definition after interceptor definition is not array of functions.', action.after);
        return false;
    }
    // all checks passed, api action definition is valid
    return true;
}

function appendQuery(req, name, value) {
    // check if property value is an array or a value
    if (Array.isArray(value)) {
        // each value becomes query property
        for (let i = 0; i < value.length; i++) {
            let obj = {};
            obj[`${name}[]`] = value[i];
            req.query(obj);
        }
    } else {
        // check if req url contains property and interpolate
        if (req.url.indexOf('{' + name + '}') > -1) {
            req.url = req.url.replace('{' + name + '}', value);
        } else {
            // otherwise, append value as query parameter
            let obj = {};
            obj[name] = value;
            req.query(obj);
        }
    }
    return req;
}

function setupContext(targetRequest, context, headers) {
    let req = targetRequest;
    // build path and query params
    if (context && context.hasOwnProperty('query') && isObject(context.query)) {
        // iterate over properties of the context object
        for (let property in context.query) {
            if (context.query.hasOwnProperty(property)) {
                req = appendQuery(req, property, context.query[property]);
            }
        }
    }

    // build payload, if any
    if (context && context.hasOwnProperty('payload')) {
        req.send(context.payload);
    }

    // build files, if any
    if (context && context.hasOwnProperty('files') && Array.isArray(context.files)) {
        for (let i = 0; i < context.files.length; i++) {
            req.attach(context.files[i].name, context.files[i].path, context.files[i].filename);
        }
    }

    // build global headers, if any
    for (let i = 0; i < headers.length; i++) {
        req.set(headers[i].name, headers[i].value);
    }

    // build one-off headers, if any
    if (context && context.hasOwnProperty('headers') && Array.isArray(context.headers)) {
        for (let i = 0; i < context.headers.length; i++) {
            req.set(context.headers[i].name, context.headers[i].value);
        }
    }

    return req;
}


// Api instance class, represents web Api.
class BaseApi {
    // supported http verbs
    static get Get() {
        return Constants.GET;
    }

    static get Post() {
        return Constants.POST;
    }

    static get Delete() {
        return Constants.DELETE;
    }

    // Constructor for web Api instance, requires endpoint to be specified.
    constructor(endpoint, debug = false) {
        if (endpoint !== undefined) {
            // endpoint passed and not undefined
            this._endpoint = endpoint;
        } else {
            // endpoint not passed or undefined
            this._log('No endpoint specified for API instance.');
            throw new Error('Cannot create GLU.Api instance without specifying the endpoint.');
        }
        // headers are initially empty
        this._headers = [];
        // set up debug context
        this.debug = debug;
    }

    // Logger in debug context
    _log() {
        if (this.debug) {
            console.log.apply(console, ['[ Glu.js Api Helper ] [' + this.constructor.name + ']'].concat(arguments));
        }
    }

    // Helper function to generate Api action based on the action specification object.
    generateApiAction(action) {
        // now we have request object with (possibly templated) url and credentials
        let r = function(context) {
            // wrap superagent request into a promise. Bind it to api instance so it gets updated when neccessary.
            return new Promise(function(resolve, reject) {
                // apply before functions to request context object
                if (action && action.hasOwnProperty('before')) {
                    this._log('Executing before interceptors for action.', action, action.before);
                    for (let i = 0; i < action.before.length; i++) {
                        action.before[i](context);
                    }
                }

                // request instance
                let rq = null;

                // full Url
                let url = this._endpoint + action.path;

                // set action type
                switch (action.method) {
                case Constants.GET:
                    rq = request.get(url);
                    break;
                case Constants.POST:
                    rq = request.post(url);
                    break;
                case Constants.DELETE:
                    rq = request.del(url);
                    break;
                }

                // setup credentials if possible
                if (action.credentials) {
                    rq = rq.withCredentials();
                }

                // we have request model, now we have to inject context from request
                rq = setupContext(rq, context, this._headers);

                // finally, we start executing the request
                rq.end((err, res) => {
                    // execute after interceptors one by one and change err/res values, if any
                    if (action && action.hasOwnProperty('after')) {
                        this._log('Executing after interceptors for action.', action, action.after);
                        for (let i = 0; i < action.after.length; i++) {
                            action.after[i](err, res);
                        }
                    }

                    // reject or resolve
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            }.bind(this));
        };
        return r;
    }

    // Creates api functions and binds them to this object. This is a variadic function.
    // Url params are given like this: /object/{objectID}
    // You can create array of before and after functions that can chain in provided order.
    // Before functions do work on request context object and return request context object.
    // After functions do work on err and res objects and return err and res objects.
    // Resulting API actions are API object methods that receive request context object and return a promise.
    // All request context object's fields are optional.
    // Input = {
    //    query: {x: 'x', y: 'y'},
    //     payload: {a:'a',b:'b'},
    //    headers: [{name: 'header', value: 'h-value'}],
    //    files: [{name: '', path: '', filename: ''}]
    // }
    createApiActions() {
        // Get variadic arguments
        let apiActions = Array.prototype.slice.call(arguments);

        // For each api action specified, create and register function
        apiActions.forEach(apiAction => {
            // If action is not given as object
            if (!isObject(apiAction)) {
                this._log('Passed non-object value as API action definition: ', apiAction);
                throw new Error('Cannot create api action from non-object value: ' + JSON.stringify(apiAction));
            }

            // If action is not given in required format
            if (!isValidApiAction(apiAction)) {
                this._log('Invalid API action definition: ', apiAction);
                throw new Error('Cannot create api action from invalid object: ' + JSON.stringify(apiAction));
            }

            // action is okay, prepare the function and append it to this object
            let fun = this.generateApiAction(apiAction);
            this[apiAction.name] = fun;
            this._log('Created API action from definition.', this._endpoint, apiAction);
        });
    }

    // Sets header given as {name: 'name', value:'value'}
    setHeader(header) {
        this._log('Setting global header for API: ', header);
        // remove header if already exists
        this.removeHeader(header.name);
        // push the new one
        this._headers.push(header);
    }

    // Removes header with name provided
    removeHeader(headerName) {
        this._log('Removing global header for API: ', headerName);
        for (let i = 0; i < this._headers.length; i++) {
            if (this._headers[i].name === headerName) {
                this._headers.splice(i, 1);
                i--;
            }
        }
    }

    // Sets API endpoint
    setEndpoint(endpoint) {
        this._log('Setting global endpoint for API: ', endpoint);
        if (typeof endpoint !== 'string') {
            throw new Error('API endpoint must be a string value.');
        }
        this._endpoint = endpoint;
    }
}

export default BaseApi;
