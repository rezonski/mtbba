/**
 * Wraps xhr file upload method with Promise
 * @param  {Object} options Options can contain: method, url, file, headers and
 *                          onFileUploadProgress method
 * @return {Promise}
 */
export function fileUpload(options) {
    const promise = new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url);
        xhr.onload = function() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        };
        xhr.onerror = function() {
            reject(this.statusText);
        };
        if (typeof options.onFileUploadProgress === 'function') {
            xhr.upload.onprogress = options.onFileUploadProgress;
        }
        if (options.headers) {
            const headers = options.headers;
            Object.keys(headers)
                .forEach(function(headerKey) {
                    xhr.setRequestHeader(headerKey, headers[headerKey]);
                });
        }
        xhr.send(options.file);
        if (typeof options.onXhrReady === 'function') {
            options.onXhrReady(xhr);
        }
    });
    return promise;
}
