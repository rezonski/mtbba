(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DragonflyDraw = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var runSetup = require('./src/setup');
var setupOptions = require('./src/options');
var setupAPI = require('./src/api');
var Constants = require('./src/constants');

var setupDraw = function setupDraw(options, api) {
  options = setupOptions(options);

  var ctx = {
    options: options
  };

  api = setupAPI(ctx, api);
  ctx.api = api;

  var setup = runSetup(ctx);

  api.onAdd = setup.onAdd;
  api.onRemove = setup.onRemove;
  api.types = Constants.types;
  api.options = options;

  return api;
};

module.exports = function (options) {
  setupDraw(options, this);
};

},{"./src/api":32,"./src/constants":33,"./src/options":79,"./src/setup":81}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
var wgs84 = require('wgs84');

module.exports.geometry = geometry;
module.exports.ring = ringArea;

function geometry(_) {
    var area = 0, i;
    switch (_.type) {
        case 'Polygon':
            return polygonArea(_.coordinates);
        case 'MultiPolygon':
            for (i = 0; i < _.coordinates.length; i++) {
                area += polygonArea(_.coordinates[i]);
            }
            return area;
        case 'Point':
        case 'MultiPoint':
        case 'LineString':
        case 'MultiLineString':
            return 0;
        case 'GeometryCollection':
            for (i = 0; i < _.geometries.length; i++) {
                area += geometry(_.geometries[i]);
            }
            return area;
    }
}

function polygonArea(coords) {
    var area = 0;
    if (coords && coords.length > 0) {
        area += Math.abs(ringArea(coords[0]));
        for (var i = 1; i < coords.length; i++) {
            area -= Math.abs(ringArea(coords[i]));
        }
    }
    return area;
}

/**
 * Calculate the approximate area of the polygon were it projected onto
 *     the earth.  Note that this area will be positive if ring is oriented
 *     clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 *     Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 *     Laboratory, Pasadena, CA, June 2007 http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
 *
 * Returns:
 * {float} The approximate signed geodesic area of the polygon in square
 *     meters.
 */

function ringArea(coords) {
    var p1, p2, p3, lowerIndex, middleIndex, upperIndex,
    area = 0,
    coordsLength = coords.length;

    if (coordsLength > 2) {
        for (i = 0; i < coordsLength; i++) {
            if (i === coordsLength - 2) {// i = N-2
                lowerIndex = coordsLength - 2;
                middleIndex = coordsLength -1;
                upperIndex = 0;
            } else if (i === coordsLength - 1) {// i = N-1
                lowerIndex = coordsLength - 1;
                middleIndex = 0;
                upperIndex = 1;
            } else { // i = 0 to N-3
                lowerIndex = i;
                middleIndex = i+1;
                upperIndex = i+2;
            }
            p1 = coords[lowerIndex];
            p2 = coords[middleIndex];
            p3 = coords[upperIndex];
            area += ( rad(p3[0]) - rad(p1[0]) ) * Math.sin( rad(p2[1]));
        }

        area = area * wgs84.RADIUS * wgs84.RADIUS / 2;
    }

    return area;
}

function rad(_) {
    return _ * Math.PI / 180;
}
},{"wgs84":6}],6:[function(require,module,exports){
module.exports.RADIUS = 6378137;
module.exports.FLATTENING = 1/298.257223563;
module.exports.POLAR_RADIUS = 6356752.3142;

},{}],7:[function(require,module,exports){
var geojsonCoords = require('geojson-coords'),
    traverse = require('traverse'),
    extent = require('extent');

module.exports = function(_) {
    return getExtent(_).bbox();
};

module.exports.polygon = function(_) {
    return getExtent(_).polygon();
};

module.exports.bboxify = function(_) {
    return traverse(_).map(function(value) {
        if (value && typeof value.type === 'string') {
            value.bbox = getExtent(value).bbox();
            this.update(value);
        }
    });
};

function getExtent(_) {
    var bbox = [Infinity, Infinity, -Infinity, -Infinity],
        ext = extent(),
        coords = geojsonCoords(_);
    for (var i = 0; i < coords.length; i++) ext.include(coords[i]);
    return ext;
}

},{"extent":8,"geojson-coords":10,"traverse":13}],8:[function(require,module,exports){
module.exports = Extent;

function Extent() {
    if (!(this instanceof Extent)) {
        return new Extent();
    }
    this._bbox = [Infinity, Infinity, -Infinity, -Infinity];
    this._valid = false;
}

Extent.prototype.include = function(ll) {
    this._valid = true;
    this._bbox[0] = Math.min(this._bbox[0], ll[0]);
    this._bbox[1] = Math.min(this._bbox[1], ll[1]);
    this._bbox[2] = Math.max(this._bbox[2], ll[0]);
    this._bbox[3] = Math.max(this._bbox[3], ll[1]);
    return this;
};

Extent.prototype.union = function(other) {
    this._valid = true;
    this._bbox[0] = Math.min(this._bbox[0], other[0]);
    this._bbox[1] = Math.min(this._bbox[1], other[1]);
    this._bbox[2] = Math.max(this._bbox[2], other[2]);
    this._bbox[3] = Math.max(this._bbox[3], other[3]);
    return this;
};

Extent.prototype.bbox = function() {
    if (!this._valid) return null;
    return this._bbox;
};

Extent.prototype.contains = function(ll) {
    if (!this._valid) return null;
    return this._bbox[0] <= ll[0] &&
        this._bbox[1] <= ll[1] &&
        this._bbox[2] >= ll[0] &&
        this._bbox[3] >= ll[1];
};

Extent.prototype.polygon = function() {
    if (!this._valid) return null;
    return {
        type: 'Polygon',
        coordinates: [
            [
                // W, S
                [this._bbox[0], this._bbox[1]],
                // E, S
                [this._bbox[2], this._bbox[1]],
                // E, N
                [this._bbox[2], this._bbox[3]],
                // W, N
                [this._bbox[0], this._bbox[3]],
                // W, S
                [this._bbox[0], this._bbox[1]]
            ]
        ]
    };
};

},{}],9:[function(require,module,exports){
module.exports = function flatten(list, depth) {
    return _flatten(list);

    function _flatten(list) {
        if (Array.isArray(list) && list.length &&
            typeof list[0] === 'number') {
            return [list];
        }
        return list.reduce(function (acc, item) {
            if (Array.isArray(item) && Array.isArray(item[0])) {
                return acc.concat(_flatten(item));
            } else {
                acc.push(item);
                return acc;
            }
        }, []);
    }
};

},{}],10:[function(require,module,exports){
var geojsonNormalize = require('geojson-normalize'),
    geojsonFlatten = require('geojson-flatten'),
    flatten = require('./flatten');

module.exports = function(_) {
    if (!_) return [];
    var normalized = geojsonFlatten(geojsonNormalize(_)),
        coordinates = [];
    normalized.features.forEach(function(feature) {
        if (!feature.geometry) return;
        coordinates = coordinates.concat(flatten(feature.geometry.coordinates));
    });
    return coordinates;
};

},{"./flatten":9,"geojson-flatten":11,"geojson-normalize":12}],11:[function(require,module,exports){
module.exports = flatten;

function flatten(gj, up) {
    switch ((gj && gj.type) || null) {
        case 'FeatureCollection':
            gj.features = gj.features.reduce(function(mem, feature) {
                return mem.concat(flatten(feature));
            }, []);
            return gj;
        case 'Feature':
            return flatten(gj.geometry).map(function(geom) {
                return {
                    type: 'Feature',
                    properties: JSON.parse(JSON.stringify(gj.properties)),
                    geometry: geom
                };
            });
        case 'MultiPoint':
            return gj.coordinates.map(function(_) {
                return { type: 'Point', coordinates: _ };
            });
        case 'MultiPolygon':
            return gj.coordinates.map(function(_) {
                return { type: 'Polygon', coordinates: _ };
            });
        case 'MultiLineString':
            return gj.coordinates.map(function(_) {
                return { type: 'LineString', coordinates: _ };
            });
        case 'GeometryCollection':
            return gj.geometries;
        case 'Point':
        case 'Polygon':
        case 'LineString':
            return [gj];
        default:
            return gj;
    }
}

},{}],12:[function(require,module,exports){
module.exports = normalize;

var types = {
    Point: 'geometry',
    MultiPoint: 'geometry',
    LineString: 'geometry',
    MultiLineString: 'geometry',
    Polygon: 'geometry',
    MultiPolygon: 'geometry',
    GeometryCollection: 'geometry',
    Feature: 'feature',
    FeatureCollection: 'featurecollection'
};

/**
 * Normalize a GeoJSON feature into a FeatureCollection.
 *
 * @param {object} gj geojson data
 * @returns {object} normalized geojson data
 */
function normalize(gj) {
    if (!gj || !gj.type) return null;
    var type = types[gj.type];
    if (!type) return null;

    if (type === 'geometry') {
        return {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                properties: {},
                geometry: gj
            }]
        };
    } else if (type === 'feature') {
        return {
            type: 'FeatureCollection',
            features: [gj]
        };
    } else if (type === 'featurecollection') {
        return gj;
    }
}

},{}],13:[function(require,module,exports){
var traverse = module.exports = function (obj) {
    return new Traverse(obj);
};

function Traverse (obj) {
    this.value = obj;
}

Traverse.prototype.get = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            node = undefined;
            break;
        }
        node = node[key];
    }
    return node;
};

Traverse.prototype.has = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            return false;
        }
        node = node[key];
    }
    return true;
};

Traverse.prototype.set = function (ps, value) {
    var node = this.value;
    for (var i = 0; i < ps.length - 1; i ++) {
        var key = ps[i];
        if (!hasOwnProperty.call(node, key)) node[key] = {};
        node = node[key];
    }
    node[ps[i]] = value;
    return value;
};

Traverse.prototype.map = function (cb) {
    return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
    var skip = arguments.length === 1;
    var acc = skip ? this.value : init;
    this.forEach(function (x) {
        if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
        }
    });
    return acc;
};

Traverse.prototype.paths = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.path); 
    });
    return acc;
};

Traverse.prototype.nodes = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.node);
    });
    return acc;
};

Traverse.prototype.clone = function () {
    var parents = [], nodes = [];
    
    return (function clone (src) {
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] === src) {
                return nodes[i];
            }
        }
        
        if (typeof src === 'object' && src !== null) {
            var dst = copy(src);
            
            parents.push(src);
            nodes.push(dst);
            
            forEach(objectKeys(src), function (key) {
                dst[key] = clone(src[key]);
            });
            
            parents.pop();
            nodes.pop();
            return dst;
        }
        else {
            return src;
        }
    })(this.value);
};

function walk (root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;
    
    return (function walker (node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};
        
        var keepGoing = true;
        
        var state = {
            node : node,
            node_ : node_,
            path : [].concat(path),
            parent : parents[parents.length - 1],
            parents : parents,
            key : path.slice(-1)[0],
            isRoot : path.length === 0,
            level : path.length,
            circular : null,
            update : function (x, stopHere) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
                if (stopHere) keepGoing = false;
            },
            'delete' : function (stopHere) {
                delete state.parent.node[state.key];
                if (stopHere) keepGoing = false;
            },
            remove : function (stopHere) {
                if (isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                }
                else {
                    delete state.parent.node[state.key];
                }
                if (stopHere) keepGoing = false;
            },
            keys : null,
            before : function (f) { modifiers.before = f },
            after : function (f) { modifiers.after = f },
            pre : function (f) { modifiers.pre = f },
            post : function (f) { modifiers.post = f },
            stop : function () { alive = false },
            block : function () { keepGoing = false }
        };
        
        if (!alive) return state;
        
        function updateState() {
            if (typeof state.node === 'object' && state.node !== null) {
                if (!state.keys || state.node_ !== state.node) {
                    state.keys = objectKeys(state.node)
                }
                
                state.isLeaf = state.keys.length == 0;
                
                for (var i = 0; i < parents.length; i++) {
                    if (parents[i].node_ === node_) {
                        state.circular = parents[i];
                        break;
                    }
                }
            }
            else {
                state.isLeaf = true;
                state.keys = null;
            }
            
            state.notLeaf = !state.isLeaf;
            state.notRoot = !state.isRoot;
        }
        
        updateState();
        
        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);
        
        if (modifiers.before) modifiers.before.call(state, state.node);
        
        if (!keepGoing) return state;
        
        if (typeof state.node == 'object'
        && state.node !== null && !state.circular) {
            parents.push(state);
            
            updateState();
            
            forEach(state.keys, function (key, i) {
                path.push(key);
                
                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
                
                var child = walker(state.node[key]);
                if (immutable && hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }
                
                child.isLast = i == state.keys.length - 1;
                child.isFirst = i == 0;
                
                if (modifiers.post) modifiers.post.call(state, child);
                
                path.pop();
            });
            parents.pop();
        }
        
        if (modifiers.after) modifiers.after.call(state, state.node);
        
        return state;
    })(root).node;
}

function copy (src) {
    if (typeof src === 'object' && src !== null) {
        var dst;
        
        if (isArray(src)) {
            dst = [];
        }
        else if (isDate(src)) {
            dst = new Date(src.getTime ? src.getTime() : src);
        }
        else if (isRegExp(src)) {
            dst = new RegExp(src);
        }
        else if (isError(src)) {
            dst = { message: src.message };
        }
        else if (isBoolean(src)) {
            dst = new Boolean(src);
        }
        else if (isNumber(src)) {
            dst = new Number(src);
        }
        else if (isString(src)) {
            dst = new String(src);
        }
        else if (Object.create && Object.getPrototypeOf) {
            dst = Object.create(Object.getPrototypeOf(src));
        }
        else if (src.constructor === Object) {
            dst = {};
        }
        else {
            var proto =
                (src.constructor && src.constructor.prototype)
                || src.__proto__
                || {}
            ;
            var T = function () {};
            T.prototype = proto;
            dst = new T;
        }
        
        forEach(objectKeys(src), function (key) {
            dst[key] = src[key];
        });
        return dst;
    }
    else return src;
}

var objectKeys = Object.keys || function keys (obj) {
    var res = [];
    for (var key in obj) res.push(key)
    return res;
};

function toS (obj) { return Object.prototype.toString.call(obj) }
function isDate (obj) { return toS(obj) === '[object Date]' }
function isRegExp (obj) { return toS(obj) === '[object RegExp]' }
function isError (obj) { return toS(obj) === '[object Error]' }
function isBoolean (obj) { return toS(obj) === '[object Boolean]' }
function isNumber (obj) { return toS(obj) === '[object Number]' }
function isString (obj) { return toS(obj) === '[object String]' }

var isArray = Array.isArray || function isArray (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

forEach(objectKeys(Traverse.prototype), function (key) {
    traverse[key] = function (obj) {
        var args = [].slice.call(arguments, 1);
        var t = new Traverse(obj);
        return t[key].apply(t, args);
    };
});

var hasOwnProperty = Object.hasOwnProperty || function (obj, key) {
    return key in obj;
};

},{}],14:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"dup":12}],15:[function(require,module,exports){
var jsonlint = require('jsonlint-lines'),
  geojsonHintObject = require('./object');

/**
 * @alias geojsonhint
 * @param {(string|object)} GeoJSON given as a string or as an object
 * @param {Object} options
 * @param {boolean} [options.noDuplicateMembers=true] forbid repeated
 * properties. This is only available for string input, becaused parsed
 * Objects cannot have duplicate properties.
 * @param {boolean} [options.precisionWarning=true] warn if GeoJSON contains
 * unnecessary coordinate precision.
 * @returns {Array<Object>} an array of errors
 */
function hint(str, options) {

    var gj, errors = [];

    if (typeof str === 'object') {
        gj = str;
    } else if (typeof str === 'string') {
        try {
            gj = jsonlint.parse(str);
        } catch(e) {
            var match = e.message.match(/line (\d+)/);
            var lineNumber = parseInt(match[1], 10);
            return [{
                line: lineNumber - 1,
                message: e.message,
                error: e
            }];
        }
    } else {
        return [{
            message: 'Expected string or object as input',
            line: 0
        }];
    }

    errors = errors.concat(geojsonHintObject.hint(gj, options));

    return errors;
}

module.exports.hint = hint;

},{"./object":16,"jsonlint-lines":18}],16:[function(require,module,exports){
var rightHandRule = require('./rhr');

/**
 * @alias geojsonhint
 * @param {(string|object)} GeoJSON given as a string or as an object
 * @param {Object} options
 * @param {boolean} [options.noDuplicateMembers=true] forbid repeated
 * properties. This is only available for string input, becaused parsed
 * Objects cannot have duplicate properties.
 * @param {boolean} [options.precisionWarning=true] warn if GeoJSON contains
 * unnecessary coordinate precision.
 * @returns {Array<Object>} an array of errors
 */
function hint(gj, options) {

    var errors = [];
    var precisionWarningCount = 0;
    var maxPrecisionWarnings = 10;
    var maxPrecision = 6;

    function root(_) {

        if ((!options || options.noDuplicateMembers !== false) &&
           _.__duplicateProperties__) {
            errors.push({
                message: 'An object contained duplicate members, making parsing ambigous: ' + _.__duplicateProperties__.join(', '),
                line: _.__line__
            });
        }

        if (requiredProperty(_, 'type', 'string')) {
            return;
        }

        if (!types[_.type]) {
            var expectedType = typesLower[_.type.toLowerCase()];
            if (expectedType !== undefined) {
                errors.push({
                    message: 'Expected ' + expectedType + ' but got ' + _.type + ' (case sensitive)',
                    line: _.__line__
                });
            } else {
                errors.push({
                    message: 'The type ' + _.type + ' is unknown',
                    line: _.__line__
                });
            }
        } else if (_) {
            types[_.type](_);
        }
    }

    function everyIs(_, type) {
        // make a single exception because typeof null === 'object'
        return _.every(function(x) {
            return x !== null && typeof x === type;
        });
    }

    function requiredProperty(_, name, type) {
        if (typeof _[name] === 'undefined') {
            return errors.push({
                message: '"' + name + '" member required',
                line: _.__line__
            });
        } else if (type === 'array') {
            if (!Array.isArray(_[name])) {
                return errors.push({
                    message: '"' + name +
                        '" member should be an array, but is an ' +
                        (typeof _[name]) + ' instead',
                    line: _.__line__
                });
            }
        } else if (type === 'object' && _[name] && _[name].constructor.name !== 'Object') {
            return errors.push({
                message: '"' + name +
                    '" member should be ' + (type) +
                    ', but is an ' + (_[name].constructor.name) + ' instead',
                line: _.__line__
            });
        } else if (type && typeof _[name] !== type) {
            return errors.push({
                message: '"' + name +
                    '" member should be ' + (type) +
                    ', but is an ' + (typeof _[name]) + ' instead',
                line: _.__line__
            });
        }
    }

    // http://geojson.org/geojson-spec.html#feature-collection-objects
    function FeatureCollection(featureCollection) {
        crs(featureCollection);
        bbox(featureCollection);
        if (featureCollection.properties !== undefined) {
            errors.push({
                message: 'FeatureCollection object cannot contain a "properties" member',
                line: featureCollection.__line__
            });
        }
        if (featureCollection.coordinates !== undefined) {
            errors.push({
                message: 'FeatureCollection object cannot contain a "coordinates" member',
                line: featureCollection.__line__
            });
        }
        if (!requiredProperty(featureCollection, 'features', 'array')) {
            if (!everyIs(featureCollection.features, 'object')) {
                return errors.push({
                    message: 'Every feature must be an object',
                    line: featureCollection.__line__
                });
            }
            featureCollection.features.forEach(Feature);
        }
    }

    // http://geojson.org/geojson-spec.html#positions
    function position(_, line) {
        if (!Array.isArray(_)) {
            return errors.push({
                message: 'position should be an array, is a ' + (typeof _) +
                    ' instead',
                line: _.__line__ || line
            });
        }
        if (_.length < 2) {
            return errors.push({
                message: 'position must have 2 or more elements',
                line: _.__line__ || line
            });
        }
        if (_.length > 3) {
            return errors.push({
                message: 'position should not have more than 3 elements',
                line: _.__line__ || line
            });
        }
        if (!everyIs(_, 'number')) {
            return errors.push({
                message: 'each element in a position must be a number',
                line: _.__line__ || line
            });
        }

        if (options && options.precisionWarning) {
            if (precisionWarningCount === maxPrecisionWarnings) {
                precisionWarningCount += 1;
                return errors.push({
                    message: 'truncated warnings: we\'ve encountered coordinate precision warning ' + maxPrecisionWarnings + ' times, no more warnings will be reported',
                    level: 'message',
                    line: _.__line__ || line
                });
            } else if (precisionWarningCount < maxPrecisionWarnings) {
                _.forEach(function(num) {
                    var precision = 0;
                    var decimalStr = String(num).split('.')[1];
                    if (decimalStr !== undefined)
                        precision = decimalStr.length;
                    if (precision > maxPrecision) {
                        precisionWarningCount += 1;
                        return errors.push({
                            message: 'precision of coordinates should be reduced',
                            level: 'message',
                            line: _.__line__ || line
                        });
                    }
                });
            }
        }
    }

    function positionArray(coords, type, depth, line) {
        if (line === undefined && coords.__line__ !== undefined) {
            line = coords.__line__;
        }
        if (depth === 0) {
            return position(coords, line);
        }
        if (depth === 1 && type) {
            if (type === 'LinearRing') {
                if (!Array.isArray(coords[coords.length - 1])) {
                    errors.push({
                        message: 'a number was found where a coordinate array should have been found: this needs to be nested more deeply',
                        line: line
                    });
                    return true;
                }
                if (coords.length < 4) {
                    errors.push({
                        message: 'a LinearRing of coordinates needs to have four or more positions',
                        line: line
                    });
                }
                if (coords.length &&
                    (coords[coords.length - 1].length !== coords[0].length ||
                    !coords[coords.length - 1].every(function(pos, index) {
                        return coords[0][index] === pos;
                }))) {
                    errors.push({
                        message: 'the first and last positions in a LinearRing of coordinates must be the same',
                        line: line
                    });
                }
            } else if (type === 'Line' && coords.length < 2) {
                return errors.push({
                    message: 'a line needs to have two or more coordinates to be valid',
                    line: line
                });
            }
        }
        if (!Array.isArray(coords)) {
            errors.push({
                message: 'a number was found where a coordinate array should have been found: this needs to be nested more deeply',
                line: line
            });
        } else {
            coords.forEach(function(c) {
                positionArray(c, type, depth - 1, c.__line__ || line);
            });
        }
    }

    function crs(_) {
        if (!_.crs) return;
        var defaultCRSName = 'urn:ogc:def:crs:OGC:1.3:CRS84';
        if (typeof _.crs === 'object' && _.crs.properties && _.crs.properties.name === defaultCRSName) {
            errors.push({
                message: 'old-style crs member is not recommended, this object is equivalent to the default and should be removed',
                line: _.__line__
            });
        } else {
            errors.push({
                message: 'old-style crs member is not recommended',
                line: _.__line__
            });
        }
    }

    function bbox(_) {
        if (!_.bbox) {
            return;
        }
        if (Array.isArray(_.bbox)) {
            if (!everyIs(_.bbox, 'number')) {
                errors.push({
                    message: 'each element in a bbox member must be a number',
                    line: _.bbox.__line__
                });
            }
            if (!(_.bbox.length === 4 || _.bbox.length === 6)) {
                errors.push({
                    message: 'bbox must contain 4 elements (for 2D) or 6 elements (for 3D)',
                    line: _.bbox.__line__
                });
            }
            return errors.length;
        }
        errors.push({
            message: 'bbox member must be an array of numbers, but is a ' + (typeof _.bbox),
            line: _.__line__
        });
    }

    function geometrySemantics(geom) {
        if (geom.properties !== undefined) {
            errors.push({
                message: 'geometry object cannot contain a "properties" member',
                line: geom.__line__
            });
        }
        if (geom.geometry !== undefined) {
            errors.push({
                message: 'geometry object cannot contain a "geometry" member',
                line: geom.__line__
            });
        }
        if (geom.features !== undefined) {
            errors.push({
                message: 'geometry object cannot contain a "features" member',
                line: geom.__line__
            });
        }
    }

    // http://geojson.org/geojson-spec.html#point
    function Point(point) {
        crs(point);
        bbox(point);
        geometrySemantics(point);
        if (!requiredProperty(point, 'coordinates', 'array')) {
            position(point.coordinates);
        }
    }

    // http://geojson.org/geojson-spec.html#polygon
    function Polygon(polygon) {
        crs(polygon);
        bbox(polygon);
        if (!requiredProperty(polygon, 'coordinates', 'array')) {
            if (!positionArray(polygon.coordinates, 'LinearRing', 2)) {
                rightHandRule(polygon, errors);
            }
        }
    }

    // http://geojson.org/geojson-spec.html#multipolygon
    function MultiPolygon(multiPolygon) {
        crs(multiPolygon);
        bbox(multiPolygon);
        if (!requiredProperty(multiPolygon, 'coordinates', 'array')) {
            if (!positionArray(multiPolygon.coordinates, 'LinearRing', 3)) {
                rightHandRule(multiPolygon, errors);
            }
        }
    }

    // http://geojson.org/geojson-spec.html#linestring
    function LineString(lineString) {
        crs(lineString);
        bbox(lineString);
        if (!requiredProperty(lineString, 'coordinates', 'array')) {
            positionArray(lineString.coordinates, 'Line', 1);
        }
    }

    // http://geojson.org/geojson-spec.html#multilinestring
    function MultiLineString(multiLineString) {
        crs(multiLineString);
        bbox(multiLineString);
        if (!requiredProperty(multiLineString, 'coordinates', 'array')) {
            positionArray(multiLineString.coordinates, 'Line', 2);
        }
    }

    // http://geojson.org/geojson-spec.html#multipoint
    function MultiPoint(multiPoint) {
        crs(multiPoint);
        bbox(multiPoint);
        if (!requiredProperty(multiPoint, 'coordinates', 'array')) {
            positionArray(multiPoint.coordinates, '', 1);
        }
    }

    function GeometryCollection(geometryCollection) {
        crs(geometryCollection);
        bbox(geometryCollection);
        if (!requiredProperty(geometryCollection, 'geometries', 'array')) {
            if (!everyIs(geometryCollection.geometries, 'object')) {
                errors.push({
                    message: 'The geometries array in a GeometryCollection must contain only geometry objects',
                    line: geometryCollection.__line__
                });
            }
            if (geometryCollection.geometries.length === 1) {
                errors.push({
                    message: 'GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type',
                    line: geometryCollection.geometries.__line__
                });
            }
            geometryCollection.geometries.forEach(function(geometry) {
                if (geometry) {
                    if (geometry.type === 'GeometryCollection') {
                        errors.push({
                            message: 'GeometryCollection should avoid nested geometry collections',
                            line: geometryCollection.geometries.__line__
                        });
                    }
                    root(geometry);
                }
            });
        }
    }

    function Feature(feature) {
        crs(feature);
        bbox(feature);
        // https://github.com/geojson/draft-geojson/blob/master/middle.mkd#feature-object
        if (feature.id !== undefined &&
            typeof feature.id !== 'string' &&
            typeof feature.id !== 'number') {
            errors.push({
                message: 'Feature "id" member must have a string or number value',
                line: feature.__line__
            });
        }
        if (feature.features !== undefined) {
            errors.push({
                message: 'Feature object cannot contain a "features" member',
                line: feature.__line__
            });
        }
        if (feature.coordinates !== undefined) {
            errors.push({
                message: 'Feature object cannot contain a "coordinates" member',
                line: feature.__line__
            });
        }
        if (feature.type !== 'Feature') {
            errors.push({
                message: 'GeoJSON features must have a type=feature member',
                line: feature.__line__
            });
        }
        requiredProperty(feature, 'properties', 'object');
        if (!requiredProperty(feature, 'geometry', 'object')) {
            // http://geojson.org/geojson-spec.html#feature-objects
            // tolerate null geometry
            if (feature.geometry) root(feature.geometry);
        }
    }

    var types = {
        Point: Point,
        Feature: Feature,
        MultiPoint: MultiPoint,
        LineString: LineString,
        MultiLineString: MultiLineString,
        FeatureCollection: FeatureCollection,
        GeometryCollection: GeometryCollection,
        Polygon: Polygon,
        MultiPolygon: MultiPolygon
    };

    var typesLower = Object.keys(types).reduce(function(prev, curr) {
        prev[curr.toLowerCase()] = curr;
        return prev;
    }, {});

    if (typeof gj !== 'object' ||
        gj === null ||
        gj === undefined) {
        errors.push({
            message: 'The root of a GeoJSON object must be an object.',
            line: 0
        });
        return errors;
    }

    root(gj);

    errors.forEach(function(err) {
        if ({}.hasOwnProperty.call(err, 'line') && err.line === undefined) {
            delete err.line;
        }
    });

    return errors;
}

module.exports.hint = hint;

},{"./rhr":17}],17:[function(require,module,exports){
function rad(x) {
    return x * Math.PI / 180;
}

function isRingClockwise (coords) {
    var area = 0;
    if (coords.length > 2) {
        var p1, p2;
        for (var i = 0; i < coords.length - 1; i++) {
            p1 = coords[i];
            p2 = coords[i + 1];
            area += rad(p2[0] - p1[0]) * (2 + Math.sin(rad(p1[1])) + Math.sin(rad(p2[1])));
        }
    }

    return area >= 0;
}

function isPolyRHR (coords) {
    if (coords && coords.length > 0) {
        if (!isRingClockwise(coords[0]))
            return false;
        var interiorCoords = coords.slice(1, coords.length);
        if (interiorCoords.some(isRingClockwise))
            return false;
    }
    return true;
}

function rightHandRule (geometry) {
    if (geometry.type === 'Polygon') {
        return isPolyRHR(geometry.coordinates);
    } else if (geometry.type === 'MultiPolygon') {
        return geometry.coordinates.every(isPolyRHR);
    }
}

module.exports = function validateRightHandRule(geometry, errors) {
    if (!rightHandRule(geometry)) {
        errors.push({
            message: 'Polygons and MultiPolygons should follow the right-hand rule',
            level: 'message',
            line: geometry.__line__
        });
    }
};

},{}],18:[function(require,module,exports){
(function (process){
/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var jsonlint = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,12],$V1=[1,13],$V2=[1,9],$V3=[1,10],$V4=[1,11],$V5=[1,14],$V6=[1,15],$V7=[14,18,22,24],$V8=[18,22],$V9=[22,24];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"JSONString":3,"STRING":4,"JSONNumber":5,"NUMBER":6,"JSONNullLiteral":7,"NULL":8,"JSONBooleanLiteral":9,"TRUE":10,"FALSE":11,"JSONText":12,"JSONValue":13,"EOF":14,"JSONObject":15,"JSONArray":16,"{":17,"}":18,"JSONMemberList":19,"JSONMember":20,":":21,",":22,"[":23,"]":24,"JSONElementList":25,"$accept":0,"$end":1},
terminals_: {2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"{",18:"}",21:":",22:",",23:"[",24:"]"},
productions_: [0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 // replace escaped characters with actual character
          this.$ = yytext.replace(/\\(\\|")/g, "$"+"1")
                     .replace(/\\n/g,'\n')
                     .replace(/\\r/g,'\r')
                     .replace(/\\t/g,'\t')
                     .replace(/\\v/g,'\v')
                     .replace(/\\f/g,'\f')
                     .replace(/\\b/g,'\b');
        
break;
case 2:
this.$ = Number(yytext);
break;
case 3:
this.$ = null;
break;
case 4:
this.$ = true;
break;
case 5:
this.$ = false;
break;
case 6:
return this.$ = $$[$0-1];
break;
case 13:
this.$ = {}; Object.defineProperty(this.$, '__line__', {
            value: this._$.first_line,
            enumerable: false
        })
break;
case 14: case 19:
this.$ = $$[$0-1]; Object.defineProperty(this.$, '__line__', {
            value: this._$.first_line,
            enumerable: false
        })
break;
case 15:
this.$ = [$$[$0-2], $$[$0]];
break;
case 16:
this.$ = {}; this.$[$$[$0][0]] = $$[$0][1];
break;
case 17:

            this.$ = $$[$0-2];
            if ($$[$0-2][$$[$0][0]] !== undefined) {
                if (!this.$.__duplicateProperties__) {
                    Object.defineProperty(this.$, '__duplicateProperties__', {
                        value: [],
                        enumerable: false
                    });
                }
                this.$.__duplicateProperties__.push($$[$0][0]);
            }
            $$[$0-2][$$[$0][0]] = $$[$0][1];
        
break;
case 18:
this.$ = []; Object.defineProperty(this.$, '__line__', {
            value: this._$.first_line,
            enumerable: false
        })
break;
case 20:
this.$ = [$$[$0]];
break;
case 21:
this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
break;
}
},
table: [{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,12:1,13:2,15:7,16:8,17:$V5,23:$V6},{1:[3]},{14:[1,16]},o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),o($V7,[2,12]),o($V7,[2,3]),o($V7,[2,4]),o($V7,[2,5]),o([14,18,21,22,24],[2,1]),o($V7,[2,2]),{3:20,4:$V0,18:[1,17],19:18,20:19},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:23,15:7,16:8,17:$V5,23:$V6,24:[1,21],25:22},{1:[2,6]},o($V7,[2,13]),{18:[1,24],22:[1,25]},o($V8,[2,16]),{21:[1,26]},o($V7,[2,18]),{22:[1,28],24:[1,27]},o($V9,[2,20]),o($V7,[2,14]),{3:20,4:$V0,20:29},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:30,15:7,16:8,17:$V5,23:$V6},o($V7,[2,19]),{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:31,15:7,16:8,17:$V5,23:$V6},o($V8,[2,17]),o($V8,[2,15]),o($V9,[2,21])],
defaultActions: {16:[2,6]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 6
break;
case 2:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 4
break;
case 3:return 17
break;
case 4:return 18
break;
case 5:return 23
break;
case 6:return 24
break;
case 7:return 22
break;
case 8:return 21
break;
case 9:return 10
break;
case 10:return 11
break;
case 11:return 8
break;
case 12:return 14
break;
case 13:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = jsonlint;
exports.Parser = jsonlint.Parser;
exports.parse = function () { return jsonlint.parse.apply(jsonlint, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this,require('_process'))
},{"_process":4,"fs":2,"path":3}],19:[function(require,module,exports){
var hat = module.exports = function (bits, base) {
    if (!base) base = 16;
    if (bits === undefined) bits = 128;
    if (bits <= 0) return '0';
    
    var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
    for (var i = 2; digits === Infinity; i *= 2) {
        digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
    }
    
    var rem = digits - Math.floor(digits);
    
    var res = '';
    
    for (var i = 0; i < Math.floor(digits); i++) {
        var x = Math.floor(Math.random() * base).toString(base);
        res = x + res;
    }
    
    if (rem) {
        var b = Math.pow(base, rem);
        var x = Math.floor(Math.random() * b).toString(base);
        res = x + res;
    }
    
    var parsed = parseInt(res, base);
    if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
        return hat(bits, base)
    }
    else return res;
};

hat.rack = function (bits, base, expandBy) {
    var fn = function (data) {
        var iters = 0;
        do {
            if (iters ++ > 10) {
                if (expandBy) bits += expandBy;
                else throw new Error('too many ID collisions, use more bits')
            }
            
            var id = hat(bits, base);
        } while (Object.hasOwnProperty.call(hats, id));
        
        hats[id] = data;
        return id;
    };
    var hats = fn.hats = {};
    
    fn.get = function (id) {
        return fn.hats[id];
    };
    
    fn.set = function (id, value) {
        fn.hats[id] = value;
        return fn;
    };
    
    fn.bits = bits || 128;
    fn.base = base || 16;
    return fn;
};

},{}],20:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are **not** supported.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = isEqual;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],21:[function(require,module,exports){
'use strict';

module.exports = Point;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {
    clone: function() { return new Point(this.x, this.y); },

    add:     function(p) { return this.clone()._add(p);     },
    sub:     function(p) { return this.clone()._sub(p);     },
    mult:    function(k) { return this.clone()._mult(k);    },
    div:     function(k) { return this.clone()._div(k);     },
    rotate:  function(a) { return this.clone()._rotate(a);  },
    matMult: function(m) { return this.clone()._matMult(m); },
    unit:    function() { return this.clone()._unit(); },
    perp:    function() { return this.clone()._perp(); },
    round:   function() { return this.clone()._round(); },

    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    equals: function(p) {
        return this.x === p.x &&
               this.y === p.y;
    },

    dist: function(p) {
        return Math.sqrt(this.distSqr(p));
    },

    distSqr: function(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return dx * dx + dy * dy;
    },

    angle: function() {
        return Math.atan2(this.y, this.x);
    },

    angleTo: function(b) {
        return Math.atan2(this.y - b.y, this.x - b.x);
    },

    angleWith: function(b) {
        return this.angleWithSep(b.x, b.y);
    },

    // Find the angle of the two vectors, solving the formula for the cross product a x b = |a||b|sin(θ) for θ.
    angleWithSep: function(x, y) {
        return Math.atan2(
            this.x * y - this.y * x,
            this.x * x + this.y * y);
    },

    _matMult: function(m) {
        var x = m[0] * this.x + m[1] * this.y,
            y = m[2] * this.x + m[3] * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _add: function(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },

    _sub: function(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },

    _mult: function(k) {
        this.x *= k;
        this.y *= k;
        return this;
    },

    _div: function(k) {
        this.x /= k;
        this.y /= k;
        return this;
    },

    _unit: function() {
        this._div(this.mag());
        return this;
    },

    _perp: function() {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    },

    _rotate: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = cos * this.x - sin * this.y,
            y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
};

// constructs Point from an array if necessary
Point.convert = function (a) {
    if (a instanceof Point) {
        return a;
    }
    if (Array.isArray(a)) {
        return new Point(a[0], a[1]);
    }
    return a;
};

},{}],22:[function(require,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            Function(['require','module','exports'], '(' + fn + ')(self)'),
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        Function(['require'], (
            // try to call default if defined to also support babel esmodule
            // exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);'
        )),
        scache
    ];

    var workerSources = {};
    resolveSources(skey);

    function resolveSources(key) {
        workerSources[key] = true;

        for (var depPath in sources[key][1]) {
            var depKey = sources[key][1][depPath];
            if (!workerSources[depKey]) {
                resolveSources(depKey);
            }
        }
    }

    var src = '(' + bundleFn + ')({'
        + Object.keys(workerSources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

},{}],23:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],24:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//!
module.exports = function generateStyle(feature) {
  var styles = [];
  var polygonFillActive = {
    id: 'polygon_fill_' + feature.id + '_active',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static']],
    paint: {
      'fill-color': feature.paint['fill-color'],
      'fill-outline-color': feature.paint['fill-outline-color'],
      'fill-opacity': feature.paint['fill-opacity'] ? feature.paint['fill-opacity'] : 1
    }
  };

  var polygonStrokeActive = {
    id: 'polygon_stroke_' + feature.id + '_active',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'false']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': feature.paint['line-color'],
      'line-width': feature.paint['line-width'],
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1
    }
  };

  var polygonStrokeActiveSelected = {
    id: 'polygon_stroke_' + feature.id + '_active_selected',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'true']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': feature.paint['line-color'],
      'line-dasharray': [0.2, 2],
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1,
      'line-width': feature.paint['line-width']
    }
  };

  var polygonFillStatic = {
    id: 'polygon_fill_' + feature.id + '_static',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['==', 'mode', 'static']],
    paint: _defineProperty({
      'fill-color': feature.paint['fill-color'],
      'fill-outline-color': feature.paint['fill-color'],
      'fill-opacity': feature.paint['fill-opacity']
    }, 'fill-opacity', feature.paint['fill-opacity'] ? feature.paint['fill-opacity'] : 1)
  };

  var polygonStrokeStatic = {
    id: 'polygon_stroke_' + feature.id + '_static',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1,
      'line-color': feature.paint['line-color'],
      'line-width': feature.paint['line-width']
    }
  };

  if (feature.minzoom !== undefined && !isNaN(feature.minzoom)) {
    polygonFillActive.minzoom = feature.minzoom;
    polygonStrokeActive.minzoom = feature.minzoom;
    polygonStrokeActiveSelected.minzoom = feature.minzoom;
    polygonFillStatic.minzoom = feature.minzoom;
    polygonStrokeStatic.minzoom = feature.minzoom;
  }
  if (feature.maxzoom !== undefined && !isNaN(feature.maxzoom)) {
    polygonFillActive.maxzoom = feature.maxzoom;
    polygonStrokeActive.maxzoom = feature.maxzoom;
    polygonStrokeActiveSelected.maxzoom = feature.maxzoom;
    polygonFillStatic.maxzoom = feature.maxzoom;
    polygonStrokeStatic.maxzoom = feature.maxzoom;
  }

  styles.push(polygonFillActive);
  styles.push(polygonStrokeActive);
  styles.push(polygonStrokeActiveSelected);
  styles.push(polygonFillStatic);
  styles.push(polygonStrokeStatic);
  return styles;
};

},{}],25:[function(require,module,exports){
'use strict';

//!

/**
 * @param feature
 * @param properties
 * {
 *    layout: [property1, property2 ...]
 *    paint: [property1, property2 ...]
 *    ...
 * }
 */

module.exports = function addStyleProperties(feature, style, properties) {
  if (properties === undefined) {
    console.error('You must provide properties');
    return;
  }
  var propertyTypes = Object.keys(properties);
  propertyTypes.forEach(function (pt) {
    if (properties[pt].constructor !== Array) {
      console.error('Property value must be array');
      return;
    };
    properties[pt].forEach(function (p) {
      if (feature[pt] && feature[pt][p] !== undefined) style[pt][p] = feature[pt][p];
    });
  });
};

},{}],26:[function(require,module,exports){
'use strict';

//!
var addStyleProperties = require('./helper');
module.exports = function generateStyle(feature) {
  var styles = [];

  var polylineStrokeActive = {
    id: 'polyline_hotspot_delegate_stroke_' + feature.id + '_active',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['any', ['==', 'id', feature.id + '_topLeft'], ['==', 'id', feature.id + '_topRight'], ['==', 'id', feature.id + '_bottomRight'], ['==', 'id', feature.id + '_bottomLeft']], ['!=', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#000',
      'line-width': 3,
      'line-query-as-fill': false,
      'line-opacity': 1
    }
  };
  var polylineStrokeStatic = {
    id: 'polyline_hotspot_delegate_stroke_' + feature.id + '_static',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['any', ['==', 'id', feature.id + '_topLeft'], ['==', 'id', feature.id + '_topRight'], ['==', 'id', feature.id + '_bottomRight'], ['==', 'id', feature.id + '_bottomLeft']], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#000',
      'line-width': 3,
      'line-query-as-fill': false,
      'line-opacity': 1
    }
  };

  var polygonStyleFill = {
    id: 'polygon_hotspot_delegate_' + feature.id + '_active',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id]],
    paint: {
      'fill-color': '#fff',
      'fill-outline-color': '#fff',
      'fill-opacity': 0
    }
  };

  var polygonStyleStrokeActive = {
    id: 'polygon_hotspot_delegate_' + feature.id + '_active_selected',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'true']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#000',
      'line-dasharray': [0.2, 2],
      'line-opacity': 1,
      'line-width': 1
    }
  };

  var polygonVertexActive = {
    id: 'polygon_hotspot_delegate_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 6,
      'circle-color': '#f00',
      'circle-opacity': 1
    }
  };

  var polygonVertexHaloActive = {
    id: 'polygon_hotspot_delegate_halo_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 7,
      'circle-color': '#000',
      'circle-opacity': 1
    }
  };

  var polygonStrokeActive = {
    id: 'polygon_hotspot_delegate_stroke_' + feature.id + '_active',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'false']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-opacity': 1,
      'line-color': '#000',
      'line-width': 1
    }
  };

  var polygonStrokeStatic = {
    id: 'polygon_hotspot_delegate_' + feature.id + '_static',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-opacity': 1,
      'line-color': '#000',
      'line-width': 1
    }
  };

  addStyleProperties(feature, polylineStrokeActive, {
    paint: ['line-color', 'line-opacity', 'line-width']
  });

  addStyleProperties(feature, polylineStrokeStatic, {
    paint: ['line-color', 'line-opacity', 'line-width']
  });

  addStyleProperties(feature, polygonStrokeActive, {
    paint: ['line-color', 'line-opacity']
  });

  addStyleProperties(feature, polygonStrokeStatic, {
    paint: ['line-color', 'line-opacity']
  });

  if (feature.minzoom !== undefined && !isNaN(feature.minzoom)) {
    polygonStyleFill.minzoom = feature.minzoom;
    polygonStyleStrokeActive.minzoom = feature.minzoom;
    polygonVertexActive.minzoom = feature.minzoom;
    polygonVertexHaloActive.minzoom = feature.minzoom;
    polygonStrokeActive.minzoom = feature.minzoom;
    polygonStrokeStatic.minzoom = feature.minzoom;
    polylineStrokeActive.minzoom = feature.minzoom;
    polylineStrokeStatic.minzoom = feature.minzoom;
  }

  if (feature.maxzoom !== undefined && !isNaN(feature.maxzoom)) {
    polygonStyleFill.maxzoom = feature.maxzoom;
    polygonStyleStrokeActive.maxzoom = feature.maxzoom;
    polygonVertexActive.maxzoom = feature.maxzoom;
    polygonVertexHaloActive.maxzoom = feature.maxzoom;
    polygonStrokeActive.maxzoom = feature.maxzoom;
    polygonStrokeStatic.maxzoom = feature.maxzoom;
    polylineStrokeActive.maxzoom = feature.maxzoom;
    polylineStrokeStatic.maxzoom = feature.maxzoom;
  }

  styles.push(polygonStyleFill);
  styles.push(polygonStyleStrokeActive);
  styles.push(polygonVertexActive);
  styles.push(polygonVertexHaloActive);
  styles.push(polygonStrokeActive);
  styles.push(polygonStrokeStatic);
  styles.push(polylineStrokeActive);
  styles.push(polylineStrokeStatic);

  return styles;
};

},{"./helper":25}],27:[function(require,module,exports){
'use strict';

//!
var addStyleProperties = require('./helper');
module.exports = function generateStyle(feature) {
  var styles = [];
  var image = {
    id: 'image_' + feature.id,
    source: 'image_' + feature.id,
    type: 'raster',
    paint: {}
  };

  var polygonStyleFill = {
    id: 'polygon_image_delegate_' + feature.id + '_active',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static']],
    paint: {
      'fill-color': '#fff',
      'fill-outline-color': '#fff',
      'fill-opacity': 0
    }
  };

  var polygonStyleStrokeActive = {
    id: 'polygon_image_delegate_' + feature.id + '_active_selected',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'true']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#000',
      'line-dasharray': [0.2, 2],
      'line-opacity': 1,
      'line-width': 1
    }
  };

  var polygonVertexActive = {
    id: 'polygon_image_delegate_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 6,
      'circle-color': '#f00',
      'circle-opacity': 1
    }
  };

  var polygonVertexHaloActive = {
    id: 'polygon_image_delegate_halo_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 7,
      'circle-color': '#000',
      'circle-opacity': 1
    }
  };

  addStyleProperties(feature, image, {
    paint: ['raster-opacity']
  });

  if (feature.minzoom !== undefined && !isNaN(feature.minzoom)) {
    image.minzoom = feature.minzoom;
    polygonStyleFill.minzoom = feature.minzoom;
    polygonStyleStrokeActive.minzoom = feature.minzoom;
    polygonVertexActive.minzoom = feature.minzoom;
    polygonVertexHaloActive.minzoom = feature.minzoom;
  }
  if (feature.maxzoom !== undefined && !isNaN(feature.maxzoom)) {
    image.maxzoom = feature.maxzoom;
    polygonStyleFill.maxzoom = feature.maxzoom;
    polygonStyleStrokeActive.maxzoom = feature.maxzoom;
    polygonVertexActive.maxzoom = feature.maxzoom;
    polygonVertexHaloActive.maxzoom = feature.maxzoom;
  }

  styles.push(image);
  styles.push(polygonStyleFill);
  styles.push(polygonStyleStrokeActive);
  styles.push(polygonVertexActive);
  styles.push(polygonVertexHaloActive);

  return styles;
};

},{"./helper":25}],28:[function(require,module,exports){
'use strict';

//!
var addStyleProperties = require('./helper');
module.exports = function generateStyle(feature) {
  var styles = [];

  var labelFillActive = {
    'id': 'label_' + feature.id + '_active',
    'type': 'symbol',
    'filter': ['all', ['!=', 'meta', 'vertex'], ['!=', 'meta', 'midpoint'], ['==', 'id', feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static'], ['==', 'active', 'false'], ['==', 'source_for', 'label']],
    'layout': {
      'text-font': ['Arial Regular'],
      'text-allow-overlap': true
    },
    'paint': {}
  };

  var labelFillSelected = {
    'id': 'label_' + feature.id + '_selected',
    'type': 'symbol',
    'filter': ['all', ['!=', 'meta', 'vertex'], ['!=', 'meta', 'midpoint'], ['==', 'id', feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static'], ['==', 'active', 'true'], ['==', 'source_for', 'label']],
    'layout': {
      'text-font': ['Arial Regular'],
      'text-allow-overlap': true
    },
    'paint': {}
  };

  var labelFillStatic = {
    'id': 'label_' + feature.id + '_static',
    'type': 'symbol',
    'filter': ['all', ['!=', 'meta', 'vertex'], ['!=', 'meta', 'midpoint'], ['==', 'id', feature.id], ['==', '$type', 'Point'], ['==', 'mode', 'static'], ['==', 'source_for', 'label']],
    'layout': {
      'text-font': ['Arial Regular'],
      'text-allow-overlap': true
    },
    'paint': {}
  };

  addStyleProperties(feature, labelFillActive, {
    layout: ['visibility', 'text-field', 'text-rotate', 'text-size', 'text-anchor'],
    paint: ['text-color', 'text-opacity', 'text-halo-color', 'text-halo-width', 'text-halo-blur', 'text-translate']
  });

  addStyleProperties(feature, labelFillSelected, {
    layout: ['visibility', 'text-field', 'text-rotate', 'text-size', 'text-anchor'],
    paint: ['text-color', 'text-opacity', 'text-halo-color', 'text-halo-width', 'text-halo-blur', 'text-translate']
  });

  addStyleProperties(feature, labelFillStatic, {
    layout: ['visibility', 'text-field', 'text-rotate', 'text-size', 'text-anchor'],
    paint: ['text-color', 'text-opacity', 'text-halo-color', 'text-halo-width', 'text-halo-blur', 'text-translate']
  });

  if (feature.minzoom !== undefined && !isNaN(feature.minzoom)) {
    labelFillActive.minzoom = feature.minzoom;
    labelFillSelected.minzoom = feature.minzoom;
    labelFillStatic.minzoom = feature.minzoom;
  }
  if (feature.maxzoom !== undefined && !isNaN(feature.maxzoom)) {
    labelFillActive.maxzoom = feature.maxzoom;
    labelFillSelected.maxzoom = feature.maxzoom;
    labelFillStatic.maxzoom = feature.maxzoom;
  }

  styles.push(labelFillActive);
  styles.push(labelFillSelected);
  styles.push(labelFillStatic);
  return styles;
};

},{"./helper":25}],29:[function(require,module,exports){
'use strict';

//!
var addStyleProperties = require('./helper');
module.exports = function generateStyle(feature) {
  var styles = [];

  var markerFillActive = {
    'id': 'marker_' + feature.id + '_active',
    'type': 'symbol',
    'filter': ['all', ['!=', 'meta', 'vertex'], ['!=', 'meta', 'midpoint'], ['==', 'id', feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static'], ['==', 'active', 'false'], ['==', 'source_for', 'marker']],
    'layout': {
      'text-font': ['Arial Regular'],
      'text-allow-overlap': true
    },
    'paint': {
      'text-halo-color': 'rgba(255,255,255,0.5)',
      'text-halo-width': 1,
      'text-halo-blur': 1
    }
  };

  var markerFillSelected = {
    'id': 'marker_' + feature.id + '_selected',
    'type': 'symbol',
    'filter': ['all', ['!=', 'meta', 'vertex'], ['!=', 'meta', 'midpoint'], ['==', 'id', feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static'], ['==', 'active', 'true'], ['==', 'source_for', 'marker']],
    'layout': {
      'text-font': ['Arial Regular'],
      'text-allow-overlap': true
    },
    'paint': {
      'text-halo-color': 'rgba(255,0,0,0.5)',
      'text-halo-width': 1,
      'text-halo-blur': 1
    }
  };

  var markerFillStatic = {
    'id': 'marker_' + feature.id + '_static',
    'type': 'symbol',
    'filter': ['all', ['!=', 'meta', 'vertex'], ['!=', 'meta', 'midpoint'], ['==', 'id', feature.id], ['==', '$type', 'Point'], ['==', 'mode', 'static'], ['==', 'source_for', 'marker']],
    'layout': {
      'text-font': ['Arial Regular'],
      'text-allow-overlap': true
    },
    'paint': {
      'text-halo-color': 'rgba(255,255,255,0.5)',
      'text-halo-width': 1,
      'text-halo-blur': 1
    }
  };

  addStyleProperties(feature, markerFillActive, {
    layout: ['text-field', 'text-rotate', 'text-size'],
    paint: ['text-color', 'text-opacity']
  });

  addStyleProperties(feature, markerFillSelected, {
    layout: ['text-field', 'text-rotate', 'text-size'],
    paint: ['text-color', 'text-opacity']
  });

  addStyleProperties(feature, markerFillStatic, {
    layout: ['text-field', 'text-rotate', 'text-size'],
    paint: ['text-color', 'text-opacity']
  });

  if (feature.minzoom !== undefined && !isNaN(feature.minzoom)) {
    markerFillActive.minzoom = feature.minzoom;
    markerFillSelected.minzoom = feature.minzoom;
    markerFillStatic.minzoom = feature.minzoom;
  }
  if (feature.maxzoom !== undefined && !isNaN(feature.maxzoom)) {
    markerFillActive.maxzoom = feature.maxzoom;
    markerFillSelected.maxzoom = feature.maxzoom;
    markerFillStatic.maxzoom = feature.maxzoom;
  }

  styles.push(markerFillActive);
  styles.push(markerFillSelected);
  styles.push(markerFillStatic);
  return styles;
};

},{"./helper":25}],30:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//!
module.exports = function generateStyle(feature) {
  var styles = [];
  var polygonFillActive = {
    id: 'polygon_fill_' + feature.id + '_active',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static']],
    paint: {
      'fill-color': feature.paint['fill-color'],
      'fill-outline-color': feature.paint['fill-outline-color'],
      'fill-opacity': feature.paint['fill-opacity'] ? feature.paint['fill-opacity'] : 1
    }
  };

  var polygonStrokeActive = {
    id: 'polygon_stroke_' + feature.id + '_active',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'false']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': feature.paint['line-color'],
      'line-width': feature.paint['line-width'],
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1
    }
  };

  var polygonStrokeActiveSelected = {
    id: 'polygon_stroke_' + feature.id + '_active_selected',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'true']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': feature.paint['line-color'],
      'line-dasharray': [0.2, 2],
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1,
      'line-width': feature.paint['line-width']
    }
  };

  var polygonFillStatic = {
    id: 'polygon_fill_' + feature.id + '_static',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['==', 'mode', 'static']],
    paint: _defineProperty({
      'fill-color': feature.paint['fill-color'],
      'fill-outline-color': feature.paint['fill-color'],
      'fill-opacity': feature.paint['fill-opacity']
    }, 'fill-opacity', feature.paint['fill-opacity'] ? feature.paint['fill-opacity'] : 1)
  };

  var polygonStrokeStatic = {
    id: 'polygon_stroke_' + feature.id + '_static',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', '' + feature.id], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1,
      'line-color': feature.paint['line-color'],
      'line-width': feature.paint['line-width']
    }
  };

  var polygonVertexActive = {
    id: 'polygon_vertex_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 3,
      'circle-color': '#f00',
      'circle-opacity': feature.paint['circle-opacity'] ? feature.paint['circle-opacity'] : 1
    }
  };

  var polygonVertexHaloActive = {
    id: 'polygon_vertex_halo_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#000',
      'circle-opacity': feature.paint['circle-opacity'] ? feature.paint['circle-opacity'] : 1
    }
  };

  var polygonMidPointActive = {
    id: 'polygon_mid_point_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'midpoint'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 4,
      'circle-color': '#f00',
      'circle-opacity': feature.paint['circle-opacity'] ? feature.paint['circle-opacity'] : 1
    }
  };

  if (feature.minzoom !== undefined && !isNaN(feature.minzoom)) {
    polygonFillActive.minzoom = feature.minzoom;
    polygonStrokeActive.minzoom = feature.minzoom;
    polygonStrokeActiveSelected.minzoom = feature.minzoom;
    polygonFillStatic.minzoom = feature.minzoom;
    polygonStrokeStatic.minzoom = feature.minzoom;
    polygonVertexActive.minzoom = feature.minzoom;
    polygonVertexHaloActive.minzoom = feature.minzoom;
    polygonMidPointActive.minzoom = feature.minzoom;
  }
  if (feature.maxzoom !== undefined && !isNaN(feature.maxzoom)) {
    polygonFillActive.maxzoom = feature.maxzoom;
    polygonStrokeActive.maxzoom = feature.maxzoom;
    polygonStrokeActiveSelected.maxzoom = feature.maxzoom;
    polygonFillStatic.maxzoom = feature.maxzoom;
    polygonStrokeStatic.maxzoom = feature.maxzoom;
    polygonVertexActive.maxzoom = feature.maxzoom;
    polygonVertexHaloActive.maxzoom = feature.maxzoom;
    polygonMidPointActive.maxzoom = feature.maxzoom;
  }

  styles.push(polygonFillActive);
  styles.push(polygonStrokeActive);
  styles.push(polygonStrokeActiveSelected);
  styles.push(polygonFillStatic);
  styles.push(polygonStrokeStatic);
  styles.push(polygonVertexActive);
  styles.push(polygonVertexHaloActive);
  styles.push(polygonMidPointActive);
  return styles;
};

},{}],31:[function(require,module,exports){
'use strict';

//!
module.exports = function generateStyle(feature) {
  var styles = [];

  var polylineStrokeActive = {
    id: 'polyline_stroke_' + feature.id + '_active',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'false']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': feature.paint['line-color'],
      'line-width': feature.paint['line-width'],
      'line-query-as-fill': false,
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1
    }
  };

  var polylineStrokeActiveSelected = {
    id: 'polyline_stroke_' + feature.id + '_active_selected',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'id', '' + feature.id], ['!=', 'mode', 'static'], ['==', 'active', 'true']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': feature.paint['line-color'],
      'line-dasharray': [0.2, 2],
      'line-width': feature.paint['line-width'],
      'line-query-as-fill': false,
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1
    }
  };

  var polylineStrokeStatic = {
    id: 'polyline_stroke_' + feature.id + '_static',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'id', '' + feature.id], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': feature.paint['line-color'],
      'line-width': feature.paint['line-width'],
      'line-query-as-fill': false,
      'line-opacity': feature.paint['line-opacity'] ? feature.paint['line-opacity'] : 1
    }
  };

  var polylineVertexActive = {
    id: 'polyline_vertex_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 3,
      'circle-color': '#f00',
      'circle-opacity': feature.paint['circle-opacity'] ? feature.paint['circle-opacity'] : 1
    }
  };

  var polylineVertexHaloActive = {
    id: 'polyline_vertex_halo_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#000',
      'circle-opacity': feature.paint['circle-opacity'] ? feature.paint['circle-opacity'] : 1
    }
  };

  var polylineMidPointActive = {
    id: 'polyline_mid_point_' + feature.id + '_active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'midpoint'], ['==', 'parent', '' + feature.id], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 4,
      'circle-color': '#f00',
      'circle-opacity': feature.paint['circle-opacity'] ? feature.paint['circle-opacity'] : 1
    }
  };

  if (feature.minzoom !== undefined && !isNaN(feature.minzoom)) {
    polylineStrokeActive.minzoom = feature.minzoom;
    polylineStrokeActiveSelected.minzoom = feature.minzoom;
    polylineStrokeStatic.minzoom = feature.minzoom;
    polylineVertexActive.minzoom = feature.minzoom;
    polylineVertexHaloActive.minzoom = feature.minzoom;
    polylineMidPointActive.minzoom = feature.minzoom;
  }
  if (feature.maxzoom !== undefined && !isNaN(feature.maxzoom)) {
    polylineStrokeActive.maxzoom = feature.maxzoom;
    polylineStrokeActiveSelected.maxzoom = feature.maxzoom;
    polylineStrokeStatic.maxzoom = feature.maxzoom;
    polylineVertexActive.maxzoom = feature.maxzoom;
    polylineVertexHaloActive.maxzoom = feature.maxzoom;
    polylineMidPointActive.maxzoom = feature.maxzoom;
  }

  styles.push(polylineStrokeActive);
  styles.push(polylineStrokeActiveSelected);
  styles.push(polylineStrokeStatic);
  styles.push(polylineVertexActive);
  styles.push(polylineVertexHaloActive);
  styles.push(polylineMidPointActive);
  return styles;
};

},{}],32:[function(require,module,exports){
'use strict';

var isEqual = require('lodash.isequal');
var normalize = require('geojson-normalize');
var hat = require('hat');
var featuresAt = require('./lib/features_at');
var stringSetsAreEqual = require('./lib/string_sets_are_equal');
var geojsonhint = require('geojsonhint');
var Constants = require('./constants');
var StringSet = require('./lib/string_set');
var generatePolygonStyle = require('./annotations/polygon'); //!
var generatePolylineStyle = require('./annotations/polyline'); //!
var generateMarkerStyle = require('./annotations/marker'); //!
var generateImageStyles = require('./annotations/image'); //!
var generateLabelStyle = require('./annotations/label'); //!
var generateHotspotStyle = require('./annotations/hotspot'); //!
var generateFlowArrowStyle = require('./annotations/flow_arrow'); //!
var extendedApi = require('./extended_api/main'); //!

var featureTypes = {
  Polygon: require('./feature_types/polygon'),
  LineString: require('./feature_types/line_string'),
  Point: require('./feature_types/point'),
  MultiPolygon: require('./feature_types/multi_feature'),
  MultiLineString: require('./feature_types/multi_feature'),
  MultiPoint: require('./feature_types/multi_feature')
};

module.exports = function (ctx, api) {

  api.modes = Constants.modes;

  api.getFeatureIdsAt = function (point) {
    var features = featuresAt({ point: point }, null, ctx);
    return features.map(function (feature) {
      return feature.properties.id;
    });
  };

  api.getSelectedIds = function () {
    return ctx.store.getSelectedIds();
  };

  api.getSelected = function () {
    return {
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getSelectedIds().map(function (id) {
        return ctx.store.get(id);
      }).map(function (feature) {
        return feature.toGeoJSON();
      })
    };
  };

  api.getSelectedPoints = function () {
    return {
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getSelectedCoordinates().map(function (coordinate) {
        return {
          type: Constants.geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: Constants.geojsonTypes.POINT,
            coordinates: coordinate.coordinates
          }
        };
      })
    };
  };

  api.set = function (featureCollection) {
    if (featureCollection.type === undefined || featureCollection.type !== Constants.geojsonTypes.FEATURE_COLLECTION || !Array.isArray(featureCollection.features)) {
      throw new Error('Invalid FeatureCollection');
    }
    var renderBatch = ctx.store.createRenderBatch();
    var toDelete = ctx.store.getAllIds().slice();
    var newIds = api.add(featureCollection);
    var newIdsLookup = new StringSet(newIds);

    toDelete = toDelete.filter(function (id) {
      return !newIdsLookup.has(id);
    });
    if (toDelete.length) {
      api.delete(toDelete);
    }

    renderBatch();
    return newIds;
  };

  api.add = function (geojson) {
    var errors = geojsonhint.hint(geojson, { precisionWarning: false }).filter(function (e) {
      return e.level !== 'message';
    });
    if (errors.length) {
      throw new Error(errors[0].message);
    }
    var featureCollection = JSON.parse(JSON.stringify(normalize(geojson)));

    var ids = featureCollection.features.map(function (feature) {
      feature.id = feature.id || hat();

      if (feature.geometry === null) {
        throw new Error('Invalid geometry: null');
      }

      if (ctx.store.get(feature.id) === undefined || ctx.store.get(feature.id).type !== feature.geometry.type) {
        // If the feature has not yet been created ...
        var Model = featureTypes[feature.geometry.type];
        if (Model === undefined) {
          throw new Error('Invalid geometry type: ' + feature.geometry.type + '.');
        }
        var internalFeature = new Model(ctx, feature);
        ctx.store.add(internalFeature);
      } else {
        // If a feature of that id has already been created, and we are swapping it out ...
        var _internalFeature = ctx.store.get(feature.id);
        _internalFeature.properties = feature.properties;
        if (!isEqual(_internalFeature.getCoordinates(), feature.geometry.coordinates)) {
          _internalFeature.incomingCoords(feature.geometry.coordinates);
        }
      }
      return feature.id;
    });

    ctx.store.render();
    return ids;
  };

  api.get = function (id) {
    var feature = ctx.store.get(id);
    if (feature) {
      return feature.toGeoJSON();
    }
  };

  api.getAll = function () {
    return {
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getAll().map(function (feature) {
        return feature.toGeoJSON();
      })
    };
  };

  api.delete = function (featureIds) {
    ctx.store.delete(featureIds, { silent: true });
    // If we were in direct select mode and our selected feature no longer exists
    // (because it was deleted), we need to get out of that mode.
    if (api.getMode() === Constants.modes.DIRECT_SELECT && !ctx.store.getSelectedIds().length) {
      ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, undefined, { silent: true });
    } else {
      ctx.store.render();
    }

    return api;
  };

  api.sortAnnotations = function (annotationIds) {
    //!
    if (!(annotationIds.constructor === Array)) return; //!
    var annotations = {}; //!
    annotationIds.forEach(function (ai) {
      //!
      annotations[ai] = []; //!
      ctx.map.style._order.slice(0).forEach(function (l, i) {
        //!
        if (l.indexOf(ai) > -1) {
          //!
          annotations[ai].push(ctx.map.getLayer(l)); //!
          ctx.map.removeLayer(l); //!
        } //!
      }); //!
    }); //!
    annotationIds.reverse().forEach(function (ai) {
      return annotations[ai].forEach(function (l) {
        return ctx.map.addLayer(l, 'draw_polygon_polyline_active.hot');
      });
    }); //!
  }; //!

  api.swapAnnotations = function (annotationIds) {
    //!
    if (!(annotationIds.constructor === Array) && annotationIds.length !== 2) return; //!
    var firstCeilingIndex = -1; //!
    var secondCeilingIndex = -1; //!
    var firstAnnotationLayers = []; //!
    var secondAnnotationLayers = []; //!
    ctx.map.style._order.forEach(function (l, i) {
      //!
      if (l.indexOf(annotationIds[0]) > -1) {
        //!
        firstCeilingIndex = i; //!
        firstAnnotationLayers.push(ctx.map.getLayer(l)); //!
      } //!
      if (l.indexOf(annotationIds[1]) > -1) {
        //!
        secondCeilingIndex = i; //!
        secondAnnotationLayers.push(ctx.map.getLayer(l)); //!
      } //!
    }); //!

    var upperCeilingLayer = firstCeilingIndex > secondCeilingIndex ? ctx.map.getLayer(ctx.map.style._order[firstCeilingIndex + 1]) : ctx.map.getLayer(ctx.map.style._order[secondCeilingIndex + 1]);
    var bottomCeilingLayer = firstCeilingIndex > secondCeilingIndex ? ctx.map.getLayer(ctx.map.style._order[secondCeilingIndex + 1]) : ctx.map.getLayer(ctx.map.style._order[firstCeilingIndex + 1]);

    var upperLayers = firstCeilingIndex > secondCeilingIndex ? firstAnnotationLayers : secondAnnotationLayers;
    var bottomLayers = firstCeilingIndex > secondCeilingIndex ? secondAnnotationLayers : firstAnnotationLayers;

    var middleLayer = bottomCeilingLayer.serialize();
    middleLayer.id = 'middle';
    middleLayer.paint = {};
    middleLayer.layout = {};
    middleLayer.filter = ['any'];
    ctx.map.addLayer(middleLayer, bottomCeilingLayer.id);
    bottomLayers.forEach(function (l) {
      return ctx.map.removeLayer(l.id);
    });
    bottomLayers.forEach(function (l) {
      return ctx.map.addLayer(l, upperCeilingLayer.id);
    });
    upperLayers.forEach(function (l) {
      return ctx.map.removeLayer(l.id);
    });
    upperLayers.forEach(function (l) {
      return ctx.map.addLayer(l, middleLayer.id);
    });
    ctx.map.removeLayer(middleLayer.id);
  };

  api.updateFeatureStyle = function (feature) {
    //!
    var featureLayers = {};
    // Handle special cases
    if (feature.type === 'Image') {
      featureLayers['image_' + feature.id] = ctx.map.getLayer('image_' + feature.id);
    } else {
      featureLayers = ctx.store.get(feature.id).layers;
    }
    if (feature.type === 'Hotspot' && feature.paint['line-width']) {
      featureLayers = JSON.parse(JSON.stringify(featureLayers));
      Object.keys(featureLayers).filter(function (l) {
        return l.indexOf('polyline_hotspot_delegate_stroke') !== 0;
      }).forEach(function (l) {
        return delete featureLayers[l];
      });
    }

    Object.keys(featureLayers).forEach(function (layerId) {
      //!
      var layer = featureLayers[layerId]; //!
      if (layer.type === 'fill') {
        if (feature.paint['fill-color'] !== undefined) {
          //!
          ctx.map.setPaintProperty(layerId, 'fill-color', feature.paint['fill-color']); //!
          ctx.map.setPaintProperty(layerId, 'fill-outline-color', feature.paint['fill-color']); //!
        } //!
        if (feature.paint['fill-opacity'] !== undefined) ctx.map.setPaintProperty(layerId, 'fill-opacity', feature.paint['fill-opacity']); //!
      } //!
      if (layer.type === 'line' && feature.paint) {
        //!
        if (feature.paint['line-color'] !== undefined) ctx.map.setPaintProperty(layerId, 'line-color', feature.paint['line-color']); //!
        if (feature.paint['line-width'] !== undefined) ctx.map.setPaintProperty(layerId, 'line-width', feature.paint['line-width']); //!
        if (feature.paint['line-opacity'] !== undefined) ctx.map.setPaintProperty(layerId, 'line-opacity', feature.paint['line-opacity']); //!
      } //!
      if (layer.type === 'circle') {
        //!
        if (feature.paint['circle-opacity'] !== undefined) ctx.map.setPaintProperty(layerId, 'circle-opacity', feature.paint['circle-opacity']); //!
      } //!
      if (layer.type === 'raster') {
        //!
        if (feature.paint['raster-opacity'] !== undefined) ctx.map.setPaintProperty(layerId, 'raster-opacity', feature.paint['raster-opacity']); //!
        if (feature.url !== undefined) {
          //!
          ctx.map.removeSource(layer.source); //!
          var imageSource = { //!
            type: "image", //!
            url: feature.url, //!
            coordinates: feature.coordinates }; //!
          ctx.map.addSource(layer.source, imageSource);
          var polygonCoordinates = feature.coordinates.slice(0);
          polygonCoordinates.push(polygonCoordinates[0]);
          ctx.store.get(feature.id).setCoordinates([polygonCoordinates]);
        } //!
        if (feature.url === undefined && feature.coordinates !== undefined) {
          var _polygonCoordinates = feature.coordinates.slice(0);
          _polygonCoordinates.push(_polygonCoordinates[0]);
          ctx.store.get(feature.id).incomingCoords([_polygonCoordinates]);
        }
      } //!
      if (layer.type === 'symbol') {
        //!
        if (feature.paint) {
          //!
          if (feature.paint['text-color'] !== undefined) ctx.map.setPaintProperty(layerId, 'text-color', feature.paint['text-color']); //!
          if (feature.paint['text-opacity'] !== undefined) ctx.map.setPaintProperty(layerId, 'text-opacity', feature.paint['text-opacity']); //!
          if (feature.paint['text-halo-color'] !== undefined) ctx.map.setPaintProperty(layerId, 'text-halo-color', feature.paint['text-halo-color']); //!
          if (feature.paint['text-halo-width'] !== undefined) ctx.map.setPaintProperty(layerId, 'text-halo-width', feature.paint['text-halo-width']); //!
          if (feature.paint['text-halo-blur'] !== undefined) ctx.map.setPaintProperty(layerId, 'text-halo-blur', feature.paint['text-halo-blur']); //!
          if (feature.paint['text-translate'] !== undefined) ctx.map.setPaintProperty(layerId, 'text-translate', feature.paint['text-translate']); //!
        } //!
        if (feature.layout) {
          //!
          if (feature.layout['text-field'] !== undefined) ctx.map.setLayoutProperty(layerId, 'text-field', feature.layout['text-field']); //!
          if (feature.layout['text-rotate'] !== undefined) ctx.map.setLayoutProperty(layerId, 'text-rotate', feature.layout['text-rotate']); //!
          if (feature.layout['text-size'] !== undefined) ctx.map.setLayoutProperty(layerId, 'text-size', feature.layout['text-size']); //!
          if (feature.layout['text-anchor'] !== undefined) ctx.map.setLayoutProperty(layerId, 'text-anchor', feature.layout['text-anchor']); //!
          if (feature.layout['visibility'] !== undefined) ctx.map.setLayoutProperty(layerId, 'visibility', feature.layout['visibility']); //!
        } //!
      } //!
      if (feature['minzoom'] !== undefined && !isNaN(feature['minzoom'])) ctx.map.setLayerZoomRange(layerId, feature['minzoom']); //!
      if (feature['maxzoom'] !== undefined && !isNaN(feature['maxzoom'])) ctx.map.setLayerZoomRange(layerId, undefined, feature['maxzoom']); ///!
    }); //!
  }; //!

  function generateHotAndColdLayers(styles, featureId) {
    var layerBefore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'draw_polygon_polyline_active.hot';
    //!
    var hotStyles = styles.map(function (hs) {
      //!
      var hotObject = JSON.parse(JSON.stringify(hs)); //!
      hotObject.id = hotObject.id + '.hot'; //!
      hotObject.source = 'dragonfly-draw-hot'; //!
      return hotObject; //!
    }); //!

    var coldStyles = styles.map(function (cs) {
      //!
      var coldObject = JSON.parse(JSON.stringify(cs)); //!
      coldObject.id = coldObject.id + '.cold'; //!
      coldObject.source = 'dragonfly-draw-cold'; //!
      return coldObject; //!
    }); //!

    var combinedStyles = hotStyles.concat(coldStyles); //!
    combinedStyles.forEach(function (style) {
      //!
      var existingStyle = ctx.options.styles.find(function (s) {
        return s.id === style.id;
      }); //!
      if (existingStyle !== undefined) {
        //!
        ctx.options.styles[ctx.options.styles.indexOf(existingStyle)] = style; //!
      } else {
        //!
        ctx.options.styles.push(style); //!
      } //!
      if (!ctx.map.getLayer(style.id)) {
        //!
        ctx.map.addLayer(style, layerBefore); //!
      } //!
      if (featureId !== undefined) ctx.store.assignFeatureLayer(featureId, style.id); //!
    }, this); //!
  } //!

  api.setInitialFeatureStyle = function (feature) {
    //!
    switch (feature.type) {//!
      case 'Polygon':
        //!
        {
          //!
          var styles = generatePolygonStyle(feature); //!
          generateHotAndColdLayers(styles, feature.id); //!
          break; //!
        } //!
      case 'Polyline':
        //!
        {
          //!
          var _styles = generatePolylineStyle(feature); //!
          generateHotAndColdLayers(_styles, feature.id); //!
          break; //!
        } //!
      case 'Marker':
        //!
        {
          //!
          var _styles2 = generateMarkerStyle(feature); //!
          generateHotAndColdLayers(_styles2, feature.id); //!
          if (feature.label) {
            feature.label.id = feature.id + '_label';
            var labelStyles = generateLabelStyle(feature.label); //!
            generateHotAndColdLayers(labelStyles, feature.label.id); //!
          }
          break; //!
        } //!
      case 'Label':
        //!
        {
          //!
          var _styles3 = generateLabelStyle(feature); //!
          generateHotAndColdLayers(_styles3, feature.id); //!
          break; //!
        } //!
    } //!
  }; //!

  api.setupCommonStyles = function () {
    //!
    var styles = []; //!
    var drawPolygonPolylineActive = { //!
      id: 'draw_polygon_polyline_active', //!
      type: 'line', //!
      filter: ['any', ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'draw_polygon']], ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'draw_line_string']], ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'draw_smooth_line_string']], ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'draw_regular_polygon']]], //!
      layout: { //!
        'line-cap': 'round', //!
        'line-join': 'round' }, //!
      paint: { //!
        'line-dasharray': [0.2, 2],
        'line-color': '#000', //!
        'line-width': 3 } }; //!
    styles.push(drawPolygonPolylineActive); //!
    generateHotAndColdLayers(styles, undefined, ''); //!
  }; //!

  api.drawPolygon = function (feature) {
    //!
    var polygonJson = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.POLYGON, //!
        coordinates: [feature.coordinates] }, //!
      properties: {}, //!
      id: '' + feature.id }; //!
    var featureId = api.add(polygonJson); //!
    var styles = generatePolygonStyle(feature); //!
    generateHotAndColdLayers(styles, feature.id); //!
    return featureId; //!
  }; //!

  api.drawPolyline = function (feature) {
    //!
    var lineStringJson = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.LINE_STRING, //!
        coordinates: feature.coordinates }, //!
      properties: {}, //!
      id: '' + feature.id }; //!
    var featureId = api.add(lineStringJson); //!
    var styles = generatePolylineStyle(feature); //!
    generateHotAndColdLayers(styles, feature.id); //!
    return featureId; //!
  }; //!

  api.drawMarker = function (feature) {
    //!
    var point = { //!
      id: feature.id, //!
      type: Constants.geojsonTypes.FEATURE, //!
      properties: { //!
        source_for: Constants.sourceForTypes.MARKER }, //!
      geometry: { //!
        coordinates: feature.coordinates[0], //!
        type: Constants.geojsonTypes.POINT } }; //!
    var markerId = api.add(point); //!
    var styles = generateMarkerStyle(feature); //!
    generateHotAndColdLayers(styles, feature.id); //!
    if (feature.label) {
      feature.label.id = feature.id + '_label';
      feature.label.compound = true;
      return { markerId: markerId, labelId: api.drawLabel(feature.label) }; //!
    }
    return { markerId: markerId }; //!
  }; //!

  api.drawLabel = function (feature) {
    //!
    var pointJson = { //!
      id: feature.id, //!
      type: Constants.geojsonTypes.FEATURE, //!
      properties: { //!
        source_for: Constants.sourceForTypes.LABEL, //!
        compound: feature.compound }, //!
      geometry: { //!
        coordinates: feature.coordinates[0], //!
        type: Constants.geojsonTypes.POINT } }; //!
    var featureId = api.add(pointJson); //!
    var styles = generateLabelStyle(feature); //!
    generateHotAndColdLayers(styles, feature.id); //!
    return featureId; //!
  }; //!


  api.drawFlowArrow = function (feature) {
    //!
    var polygonJson = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.POLYGON, //!
        coordinates: [feature.coordinates] }, //!
      properties: {
        source_for: Constants.sourceForTypes.FLOW_ARROW }, //!
      id: '' + feature.id }; //!
    var featureId = api.add(polygonJson); //!
    var styles = generateFlowArrowStyle(feature); //!
    generateHotAndColdLayers(styles, feature.id); //!
    return featureId; //!
  }; //!

  api.drawFreehand = function (feature) {
    //!
    var lineStringJson = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.LINE_STRING, //!
        coordinates: feature.coordinates }, //!
      properties: {
        source_for: Constants.sourceForTypes.FREEHAND }, //!
      id: '' + feature.id }; //!
    var featureId = api.add(lineStringJson); //!
    var styles = generatePolylineStyle(feature); //!
    generateHotAndColdLayers(styles, feature.id); //!
    return featureId; //!
  }; //!

  api.drawShape = function (feature) {
    //!
    var polygonJson = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.POLYGON, //!
        coordinates: [feature.coordinates] }, //!
      properties: {
        source_for: Constants.sourceForTypes.SHAPE }, //!
      id: '' + feature.id }; //!
    var featureId = api.add(polygonJson); //!
    var styles = generatePolygonStyle(feature); //!
    generateHotAndColdLayers(styles, feature.id); //!
    return featureId; //!
  }; //!

  api.drawImage = function (feature) {
    //!
    var imageSource = {
      type: 'image', //!
      url: feature.url, //!
      coordinates: feature.coordinates }; //!

    var imageStyles = generateImageStyles(feature); //!

    var polygonCoordinates = feature.coordinates.slice(0);
    polygonCoordinates.push(feature.coordinates[0]);

    var polygonJson = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.POLYGON, //!
        coordinates: [polygonCoordinates] }, //!
      properties: {
        source_for: 'image'
      }, //!
      id: '' + feature.id }; //!
    api.add(polygonJson); //!
    generateHotAndColdLayers(imageStyles.slice(1), feature.id); //!

    ctx.map.addSource('image_' + feature.id, imageSource); //!
    ctx.map.addLayer(imageStyles[0], 'polygon_image_delegate_' + feature.id + '_active.hot'); //!
    var existingStyle = ctx.options.styles.find(function (s) {
      return s.id === imageStyles[0].id;
    }); //!
    if (existingStyle !== undefined) {
      //!
      ctx.options.styles[ctx.options.styles.indexOf(existingStyle)] = imageStyle; //!
    } else {
      //!
      ctx.options.styles.push(imageStyles[0]); //!
    } //!
  }; //!

  api.drawHotspot = function (feature) {
    var hotspotOutline = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.POLYGON, //!
        coordinates: [feature.coordinates] }, //!
      properties: {
        source_for: 'hotspot',
        bounds: [feature.coordinates[6], feature.coordinates[2]],
        child_ids: [feature.id + '_topLeft', feature.id + '_topRight', feature.id + '_bottomRight', feature.id + '_bottomLeft']
      }, //!
      id: '' + feature.id }; //!
    var styles = generateHotspotStyle(feature); //!
    api.add(hotspotOutline); //!

    var projectedTopLeft = ctx.map.project(feature.coordinates[0]); //!
    var projectedTopRight = ctx.map.project(feature.coordinates[2]); //!
    var projectedBottomRight = ctx.map.project(feature.coordinates[4]); //!
    var projectedBottomLeft = ctx.map.project(feature.coordinates[6]); //!

    var cornerLineLength = Math.min((projectedTopRight.x - projectedTopLeft.x) * 0.25, (projectedBottomLeft.y - projectedTopLeft.y) * 0.3); //!

    var topLeftCoordinates = [//!
    ctx.map.unproject({ x: projectedTopLeft.x, y: projectedTopLeft.y + cornerLineLength }).toArray(), //!
    ctx.map.unproject({ x: projectedTopLeft.x, y: projectedTopLeft.y }).toArray(), //!
    ctx.map.unproject({ x: projectedTopLeft.x + cornerLineLength, y: projectedTopLeft.y }).toArray()]; //!

    var topLeftCorner = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.LINE_STRING, //!
        coordinates: topLeftCoordinates }, //!
      properties: { //!
        source_for: 'hotspot', //!
        parent_id: feature.id, //!
        compound: true }, //!
      id: feature.id + '_topLeft' }; //!
    api.add(topLeftCorner); //!

    var topRightCoordinates = [//!
    ctx.map.unproject({ x: projectedTopRight.x - cornerLineLength, y: projectedTopRight.y }).toArray(), //!
    ctx.map.unproject({ x: projectedTopRight.x, y: projectedTopRight.y }).toArray(), //!
    ctx.map.unproject({ x: projectedTopRight.x, y: projectedTopRight.y + cornerLineLength }).toArray()];

    var topRightCorner = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.LINE_STRING, //!
        coordinates: topRightCoordinates }, //!
      properties: { //!
        source_for: 'hotspot', //!
        parent_id: feature.id, //!
        compound: true }, //!
      id: feature.id + '_topRight' }; //!
    api.add(topRightCorner); //!

    var bottomRightCoordinates = [//!
    ctx.map.unproject({ x: projectedBottomRight.x, y: projectedBottomRight.y - cornerLineLength }).toArray(), //!
    ctx.map.unproject({ x: projectedBottomRight.x, y: projectedBottomRight.y }).toArray(), //!
    ctx.map.unproject({ x: projectedBottomRight.x - cornerLineLength, y: projectedBottomRight.y }).toArray()]; //!

    var bottomRightCorner = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.LINE_STRING, //!
        coordinates: bottomRightCoordinates }, //!
      properties: { //!
        source_for: 'hotspot', //!
        parent_id: feature.id, //!
        compound: true }, //!
      id: feature.id + '_bottomRight' }; //!
    api.add(bottomRightCorner); //!

    var bottomLeftCoordinates = [//!
    ctx.map.unproject({ x: projectedBottomLeft.x + cornerLineLength, y: projectedBottomLeft.y }).toArray(), //!
    ctx.map.unproject({ x: projectedBottomLeft.x, y: projectedBottomLeft.y }).toArray(), //!
    ctx.map.unproject({ x: projectedBottomLeft.x, y: projectedBottomLeft.y - cornerLineLength }).toArray()]; //!

    var bottomLeftCorner = { //!
      type: Constants.geojsonTypes.FEATURE, //!
      geometry: { //!
        type: Constants.geojsonTypes.LINE_STRING, //!
        coordinates: bottomLeftCoordinates }, //!
      properties: { //!
        source_for: 'hotspot', //!
        parent_id: feature.id, //!
        compound: true }, //!
      id: feature.id + '_bottomLeft' }; //!
    api.add(bottomLeftCorner); //!

    generateHotAndColdLayers(styles, feature.id); //!
  };

  api.enableExtendedApi = function () {
    api.extendedApi = extendedApi(this, ctx.map);
  };

  api.deleteAll = function () {
    ctx.store.delete(ctx.store.getAllIds(), { silent: true });
    // If we were in direct select mode, now our selected feature no longer exists,
    // so escape that mode.
    if (api.getMode() === Constants.modes.DIRECT_SELECT) {
      ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, undefined, { silent: true });
    } else {
      ctx.store.render();
    }

    return api;
  };

  api.changeMode = function (mode) {
    var modeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // Avoid changing modes just to re-select what's already selected
    if (mode === Constants.modes.SIMPLE_SELECT && api.getMode() === Constants.modes.SIMPLE_SELECT) {
      if (stringSetsAreEqual(modeOptions.featureIds || [], ctx.store.getSelectedIds())) return api;
      // And if we are changing the selection within simple_select mode, just change the selection,
      // instead of stopping and re-starting the mode
      ctx.store.setSelected(modeOptions.featureIds, { silent: true });
      ctx.store.render();
      return api;
    }

    if (mode === Constants.modes.DIRECT_SELECT && api.getMode() === Constants.modes.DIRECT_SELECT && modeOptions.featureId === ctx.store.getSelectedIds()[0]) {
      return api;
    }

    ctx.events.changeMode(mode, modeOptions, { silent: true });
    return api;
  };

  api.getMode = function () {
    return ctx.events.getMode();
  };

  api.trash = function () {
    ctx.events.trash({ silent: true });
    return api;
  };

  api.combineFeatures = function () {
    ctx.events.combineFeatures({ silent: true });
    return api;
  };

  api.uncombineFeatures = function () {
    ctx.events.uncombineFeatures({ silent: true });
    return api;
  };

  api.setFeatureProperty = function (featureId, property, value) {
    ctx.store.setFeatureProperty(featureId, property, value);
    return api;
  };

  return api;
};

},{"./annotations/flow_arrow":24,"./annotations/hotspot":26,"./annotations/image":27,"./annotations/label":28,"./annotations/marker":29,"./annotations/polygon":30,"./annotations/polyline":31,"./constants":33,"./extended_api/main":40,"./feature_types/line_string":45,"./feature_types/multi_feature":46,"./feature_types/point":47,"./feature_types/polygon":48,"./lib/features_at":57,"./lib/string_set":66,"./lib/string_sets_are_equal":67,"geojson-normalize":14,"geojsonhint":15,"hat":19,"lodash.isequal":20}],33:[function(require,module,exports){
'use strict';

module.exports = {
  classes: {
    CONTROL_BASE: 'dragonfly-ctrl',
    CONTROL_PREFIX: 'dragonfly-ctrl-',
    CONTROL_BUTTON: 'dragonfly-draw_ctrl-draw-btn',
    CONTROL_BUTTON_LINE: 'dragonfly-draw_line',
    CONTROL_BUTTON_POLYGON: 'dragonfly-draw_polygon',
    CONTROL_BUTTON_POINT: 'dragonfly-draw_point',
    CONTROL_BUTTON_FLOW_ARROW: 'dragonfly-draw_flow_arrow', //!
    CONTROL_BUTTON_FREEHAND: 'dragonfly-draw_freehand', //!
    CONTROL_BUTTON_MARKER: 'dragonfly-draw_marker', //!
    CONTROL_BUTTON_LABEL: 'dragonfly-draw_label', //!
    CONTROL_BUTTON_SHAPE: 'dragonfly-draw_shape', //!
    CONTROL_BUTTON_TO_JSON: 'dragonfly-to_json', //!
    CONTROL_BUTTON_TRASH: 'dragonfly-draw_trash',
    CONTROL_BUTTON_COMBINE_FEATURES: 'dragonfly-draw_combine',
    CONTROL_BUTTON_UNCOMBINE_FEATURES: 'dragonfly-draw_uncombine',
    CONTROL_GROUP: 'dragonfly-ctrl-group',
    ATTRIBUTION: 'dragonfly-ctrl-attrib',
    ACTIVE_BUTTON: 'active',
    BOX_SELECT: 'dragonfly-draw_boxselect'
  },
  sources: {
    HOT: 'dragonfly-draw-hot',
    COLD: 'dragonfly-draw-cold'
  },
  cursors: {
    ADD: 'add',
    MOVE: 'move',
    DRAG: 'drag',
    POINTER: 'pointer',
    NONE: 'none'
  },
  types: {
    POLYGON: 'polygon',
    LINE: 'line_string',
    SMOOTH_LINE: 'smooth_line_string', //!
    POINT: 'point', //!
    FLOW_ARROW: 'flow_arrow', //!
    MARKER: 'marker', //!
    FREEHAND: 'freehand', //!
    LABEL: 'label', //!
    SHAPE: 'shape', //!
    TO_JSON: 'to_json' },

  sourceForTypes: {
    FLOW_ARROW: 'flowarrow', //!
    MARKER: 'marker', //!
    LABEL: 'label', //!
    SHAPE: 'shape', //!
    FREEHAND: 'freehand' },

  geojsonTypes: {
    FEATURE: 'Feature',
    POLYGON: 'Polygon',
    LINE_STRING: 'LineString',
    POINT: 'Point',
    FEATURE_COLLECTION: 'FeatureCollection',
    MULTI_PREFIX: 'Multi',
    MULTI_POINT: 'MultiPoint',
    MULTI_LINE_STRING: 'MultiLineString',
    MULTI_POLYGON: 'MultiPolygon'
  },
  modes: {
    DRAW_LINE_STRING: 'draw_line_string',
    DRAW_SMOOTH_LINE_STRING: 'draw_smooth_line_string', //!
    DRAW_POLYGON: 'draw_polygon',
    DRAW_REGULAR_POLYGON: 'draw_regular_polygon', //!
    DRAW_POINT: 'draw_point',
    SIMPLE_SELECT: 'simple_select',
    DIRECT_SELECT: 'direct_select',
    STATIC: 'static'
  },
  events: {
    CREATE: 'draw.create',
    DELETE: 'draw.delete',
    UPDATE: 'draw.update',
    SELECTION_CHANGE: 'draw.selectionchange',
    MODE_CHANGE: 'draw.modechange',
    ACTIONABLE: 'draw.actionable',
    RENDER: 'draw.render',
    COMBINE_FEATURES: 'draw.combine',
    UNCOMBINE_FEATURES: 'draw.uncombine',
    FEATURE_INTERACTION: 'draw.featureinteraction'
  },
  updateActions: {
    MOVE: 'move',
    CHANGE_COORDINATES: 'change_coordinates'
  },
  meta: {
    FEATURE: 'feature',
    MIDPOINT: 'midpoint',
    VERTEX: 'vertex'
  },
  activeStates: {
    ACTIVE: 'true',
    INACTIVE: 'false'
  },
  LAT_MIN: -90,
  LAT_RENDERED_MIN: -85,
  LAT_MAX: 90,
  LAT_RENDERED_MAX: 85,
  LNG_MIN: -270,
  LNG_MAX: 270
};

},{}],34:[function(require,module,exports){
'use strict';

var _modes;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setupModeHandler = require('./lib/mode_handler');
var getFeaturesAndSetCursor = require('./lib/get_features_and_set_cursor');
var isClick = require('./lib/is_click');
var Constants = require('./constants');

var modes = (_modes = {}, _defineProperty(_modes, Constants.modes.SIMPLE_SELECT, require('./modes/simple_select')), _defineProperty(_modes, Constants.modes.DIRECT_SELECT, require('./modes/direct_select')), _defineProperty(_modes, Constants.modes.DRAW_POINT, require('./modes/draw_point')), _defineProperty(_modes, Constants.modes.DRAW_LINE_STRING, require('./modes/draw_line_string')), _defineProperty(_modes, Constants.modes.DRAW_SMOOTH_LINE_STRING, require('./modes/draw_smooth_line_string')), _defineProperty(_modes, Constants.modes.DRAW_REGULAR_POLYGON, require('./modes/draw_regular_polygon')), _defineProperty(_modes, Constants.modes.DRAW_POLYGON, require('./modes/draw_polygon')), _defineProperty(_modes, Constants.modes.STATIC, require('./modes/static')), _modes);

module.exports = function (ctx) {

  var mouseDownInfo = {};
  var events = {};
  var _currentModeName = Constants.modes.SIMPLE_SELECT;
  var currentMode = setupModeHandler(modes.simple_select(ctx), ctx);

  events.drag = function (event) {
    if (isClick(mouseDownInfo, {
      point: event.point,
      time: new Date().getTime()
    })) {
      event.originalEvent.stopPropagation();
    } else {
      ctx.ui.queueMapClasses({ mouse: Constants.cursors.DRAG });
      currentMode.drag(event);
    }
  };

  events.mousemove = function (event) {
    var button = event.originalEvent.buttons !== undefined ? event.originalEvent.buttons : event.originalEvent.which;
    if (button === 1) {
      return events.drag(event);
    }
    var target = getFeaturesAndSetCursor(event, ctx);
    event.featureTarget = target;
    currentMode.mousemove(event);
  };

  events.mousedown = function (event) {
    mouseDownInfo = {
      time: new Date().getTime(),
      point: event.point
    };
    var target = getFeaturesAndSetCursor(event, ctx);
    event.featureTarget = target;
    currentMode.mousedown(event);
  };

  events.mouseup = function (event) {
    var target = getFeaturesAndSetCursor(event, ctx);
    event.featureTarget = target;

    if (isClick(mouseDownInfo, {
      point: event.point,
      time: new Date().getTime()
    })) {
      currentMode.click(event);
    } else {
      currentMode.mouseup(event);
    }
  };

  events.mouseout = function (event) {
    currentMode.mouseout(event);
  };

  // 8 - Backspace
  // 46 - Delete
  var isKeyModeValid = function isKeyModeValid(code) {
    return !(code === 8 || code === 46 || code >= 48 && code <= 57);
  };

  events.keydown = function (event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      //!
      event.preventDefault();
      currentMode.trash();
    } else if (isKeyModeValid(event.keyCode)) {
      currentMode.keydown(event);
    }
    // removed the ability to create features with keyboard //!
  };

  events.keyup = function (event) {
    if (isKeyModeValid(event.keyCode)) {
      currentMode.keyup(event);
    }
  };

  events.zoomend = function () {
    ctx.store.changeZoom();
  };

  events.data = function (event) {
    if (event.dataType === 'style') {
      (function () {
        var setup = ctx.setup,
            map = ctx.map,
            options = ctx.options,
            store = ctx.store;

        var hasLayers = !!options.styles.find(function (style) {
          return map.getLayer(style.id);
        });
        if (!hasLayers) {
          setup.addLayers();
          store.setDirty();
          store.render();
        }
      })();
    }
  };

  function changeMode(modename, nextModeOptions) {
    var eventOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    currentMode.stop();

    var modebuilder = modes[modename];
    if (modebuilder === undefined) {
      throw new Error(modename + ' is not valid');
    }
    _currentModeName = modename;
    var mode = modebuilder(ctx, nextModeOptions);
    currentMode = setupModeHandler(mode, ctx);

    if (!eventOptions.silent) {
      ctx.map.fire(Constants.events.MODE_CHANGE, { mode: modename });
    }

    ctx.store.setDirty();
    ctx.store.render();
  }

  var actionState = {
    trash: false,
    combineFeatures: false,
    uncombineFeatures: false
  };

  function actionable(actions) {
    var changed = false;
    Object.keys(actions).forEach(function (action) {
      if (actionState[action] === undefined) throw new Error('Invalid action type');
      if (actionState[action] !== actions[action]) changed = true;
      actionState[action] = actions[action];
    });
    if (changed) ctx.map.fire(Constants.events.ACTIONABLE, { actions: actionState });
  }

  var api = {
    changeMode: changeMode,
    actionable: actionable,
    currentModeName: function currentModeName() {
      return _currentModeName;
    },
    currentModeRender: function currentModeRender(geojson, push) {
      return currentMode.render(geojson, push);
    },
    fire: function fire(name, event) {
      if (events[name]) {
        events[name](event);
      }
    },
    addEventListeners: function addEventListeners() {
      ctx.map.on('mousemove', events.mousemove);
      ctx.map.on('mousedown', events.mousedown);
      ctx.map.on('mouseup', events.mouseup);
      ctx.map.on('data', events.data);

      ctx.container.addEventListener('mouseout', events.mouseout);

      if (ctx.options.keybindings) {
        ctx.container.addEventListener('keydown', events.keydown);
        ctx.container.addEventListener('keyup', events.keyup);
      }
    },
    removeEventListeners: function removeEventListeners() {
      ctx.map.off('mousemove', events.mousemove);
      ctx.map.off('mousedown', events.mousedown);
      ctx.map.off('mouseup', events.mouseup);
      ctx.map.off('data', events.data);

      ctx.container.removeEventListener('mouseout', events.mouseout);

      if (ctx.options.keybindings) {
        ctx.container.removeEventListener('keydown', events.keydown);
        ctx.container.removeEventListener('keyup', events.keyup);
      }
    },
    trash: function trash(options) {
      currentMode.trash(options);
    },
    combineFeatures: function combineFeatures() {
      currentMode.combineFeatures();
    },
    uncombineFeatures: function uncombineFeatures() {
      currentMode.uncombineFeatures();
    },
    getMode: function getMode() {
      return _currentModeName;
    }
  };

  return api;
};

},{"./constants":33,"./lib/get_features_and_set_cursor":58,"./lib/is_click":59,"./lib/mode_handler":62,"./modes/direct_select":71,"./modes/draw_line_string":72,"./modes/draw_point":73,"./modes/draw_polygon":74,"./modes/draw_regular_polygon":75,"./modes/draw_smooth_line_string":76,"./modes/simple_select":77,"./modes/static":78}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.project = project;
exports.unproject = unproject;
exports.getArrowFromCurves = getArrowFromCurves;
exports.getFlowArrowCurves = getFlowArrowCurves;

//!

var _require = require('./bezier_utils'),
    createBezierResult = _require.createBezierResult,
    douglasPeuckerReduction = _require.douglasPeuckerReduction,
    bezierFitCubic = _require.bezierFitCubic;

var simplify = require('./simplify');

function lngX(lng, worldSize) {
    return (180 + lng) * worldSize / 360;
}
function latY(lat, worldSize) {
    var y = 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
    return (180 - y) * worldSize / 360;
}

function xLng(x, worldSize) {
    return x * 360 / worldSize - 180;
}

function yLat(y, worldSize) {
    var y2 = 180 - y * 360 / worldSize;
    return 360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90;
}

function project(lnglat, worldSize) {
    return {
        x: lngX(lnglat.lng, worldSize),
        y: latY(lnglat.lat, worldSize)
    };
}

function unproject(point, worldSize) {
    return [xLng(point.x, worldSize), yLat(point.y, worldSize)];
}

function createParallelLine(pointA, pointB, difference) {
    var perpendicularX = -(pointA.y - pointB.y);
    var perpendicularY = pointA.x - pointB.x;
    var length = Math.sqrt(perpendicularX * perpendicularX + perpendicularY * perpendicularY);
    // some trigonometry magic
    var distanceX = perpendicularX / length * difference;
    var distanceY = perpendicularY / length * difference;

    return {
        p1: {
            x: pointA.x - distanceX,
            y: pointA.y - distanceY
        },
        p2: {
            x: pointB.x - distanceX,
            y: pointB.y - distanceY
        }
    };
}

function lerp(t, a, b) {
    return a + (b - a) * t;
}

function offsetCurve(be) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

    var tt = 0;
    var ttInterval = 1 / be.straightLines().length;
    var bezierOffsetResult = {
        newSl1Points: [],
        newSl2Points: []
    };
    be.straightLines().forEach(function (sl) {
        var topSl = createParallelLine(sl.p1, sl.p2, lerp(tt, from, to));
        var bottomSl = createParallelLine(sl.p1, sl.p2, lerp(tt, -from, -to));

        bezierOffsetResult.newSl1Points.push(topSl.p1);
        bezierOffsetResult.newSl1Points.push(topSl.p2);

        bezierOffsetResult.newSl2Points.push(bottomSl.p1);
        bezierOffsetResult.newSl2Points.push(bottomSl.p2);

        tt += ttInterval;
    });

    return bezierOffsetResult;
}

function multiplyMatrices(a, b) {
    var aNumRows = a.length,
        aNumCols = a[0].length,
        bNumCols = b[0].length,
        m = new Array(aNumRows); // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0; // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}

function rotatePoint(p, angleRadians) {
    var rotationMatrix = [[Math.cos(angleRadians), -Math.sin(angleRadians)], [Math.sin(angleRadians), Math.cos(angleRadians)]];
    return multiplyMatrices(rotationMatrix, [[p.x], [p.y]]);
}

function normalArrow(p, angleRadians, offset1, offset2) {
    var arrowWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 40;

    var arrowPoints = [];
    var arrowHeight = arrowWidth * Math.sqrt(3) / 2;
    var baseTip = { x: arrowHeight, y: 0 };
    var baseLeft = { x: 0, y: -arrowWidth };
    var baseRight = { x: 0, y: arrowWidth };

    var rotatedTip = rotatePoint(baseTip, angleRadians);
    var rotatedLeft = rotatePoint(baseLeft, angleRadians);
    var rotatedRight = rotatePoint(baseRight, angleRadians);
    arrowPoints.push({ x: rotatedRight[0][0] + p.x, y: rotatedRight[1][0] + p.y });
    arrowPoints.push({ x: rotatedTip[0][0] + p.x, y: rotatedTip[1][0] + p.y });
    arrowPoints.push({ x: rotatedLeft[0][0] + p.x, y: rotatedLeft[1][0] + p.y });
    return arrowPoints;
}

function calcAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}

// a1 = 0, cp1 = 1, a2 = 2, cp2 = 3
function cubicBezier(curve) {
    var numberOfSteps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

    // purposely swapped
    var anchorPoint1 = curve[0];
    var anchorPoint2 = curve[3];
    var controlPoint1 = curve[1];
    var controlPoint2 = curve[2];
    var points = [];
    var posx = void 0,
        posy = void 0,
        counter = 0,
        x1 = void 0,
        x2 = void 0,
        y1 = void 0,
        y2 = void 0;

    for (var u = 0; u <= 1; u += 1 / numberOfSteps) {
        posx = Math.pow(u, 3) * (anchorPoint2.x + 3 * (controlPoint1.x - controlPoint2.x) - anchorPoint1.x) + 3 * Math.pow(u, 2) * (anchorPoint1.x - 2 * controlPoint1.x + controlPoint2.x) + 3 * u * (controlPoint1.x - anchorPoint1.x) + anchorPoint1.x;

        posy = Math.pow(u, 3) * (anchorPoint2.y + 3 * (controlPoint1.y - controlPoint2.y) - anchorPoint1.y) + 3 * Math.pow(u, 2) * (anchorPoint1.y - 2 * controlPoint1.y + controlPoint2.y) + 3 * u * (controlPoint1.y - anchorPoint1.y) + anchorPoint1.y;

        points.push({ x: posx, y: posy });
        if (counter === numberOfSteps - 2) {
            x1 = posx;
            y1 = posy;
        } else if (counter === numberOfSteps - 1) {
            x2 = posx;
            y2 = posy;
        }
        counter++;
    }

    var angleRadians = calcAngle(x1, y1, x2, y2);
    return { points: points, angleRadians: angleRadians };
}

// curves in pixels
function cubicBeziers(curves, nrOfSteps) {
    var tempPoints = void 0;
    var multiCubicBezierInfo = {
        lastCurveAngleRadians: [],
        curves: []
    };
    curves.forEach(function (c) {
        var cubicBezierObject = cubicBezier(c, nrOfSteps);
        multiCubicBezierInfo.lastCurveAngleRadians = cubicBezierObject.angleRadians;
        tempPoints = cubicBezierObject.points;
        var cbi = {
            lines: [],
            allPoints: []
        };
        for (var i = 0; i < tempPoints.length - 1; i++) {
            cbi.lines.push({ p1: tempPoints[i], p2: tempPoints[i + 1] });
        }
        cbi.anchor1 = c[0];
        cbi.anchor2 = c[3];
        cbi.controlPoint1 = c[1];
        cbi.controlPoint2 = c[2];
        cbi.allPoints = tempPoints;
        multiCubicBezierInfo.curves.push(cbi);
        multiCubicBezierInfo.allPoints = function () {
            var points = [];
            multiCubicBezierInfo.curves.forEach(function (ci) {
                ci.allPoints.forEach(function (p) {
                    points.push(p);
                });
            });
            return points;
        };

        multiCubicBezierInfo.straightLines = function () {
            var lines = [];
            multiCubicBezierInfo.curves.forEach(function (ci) {
                ci.lines.forEach(function (p) {
                    lines.push(p);
                });
            });

            return lines;
        };
    });
    return multiCubicBezierInfo;
}

function getArrowFromCurves(curves, fromWidth, toWidth, arrowWidth, createdAtZoomLevel) {
    var coordinates = [];
    var worldSize = 512 * Math.pow(2, createdAtZoomLevel);
    var curvesInPixels = curves.map(function (c) {
        return [project({ lng: c.anchorPoint1[0], lat: c.anchorPoint1[1] }, worldSize), project({ lng: c.controlPoint1[0], lat: c.controlPoint1[1] }, worldSize), project({ lng: c.anchorPoint2[0], lat: c.anchorPoint2[1] }, worldSize), project({ lng: c.controlPoint2[0], lat: c.controlPoint2[1] }, worldSize)];
    });
    var ret = void 0;
    var multiCubicBezier = cubicBeziers(curvesInPixels, 1000);

    multiCubicBezier.allPoints = function () {
        var points = [];
        multiCubicBezier.curves.forEach(function (c) {
            c.allPoints.forEach(function (p) {
                points.push(p);
            });
        });
        return points;
    };

    multiCubicBezier.straightLines = function () {
        var lines = [];
        multiCubicBezier.curves.forEach(function (c) {
            c.lines.forEach(function (p) {
                lines.push(p);
            });
        });

        return lines;
    };

    var bor = offsetCurve(multiCubicBezier, fromWidth, toWidth);

    var beziersTwo = createBezierResult();

    bor.newSl1Points = simplify(bor.newSl1Points);
    bor.newSl2Points = simplify(bor.newSl2Points);
    ret = bezierFitCubic(beziersTwo, bor.newSl1Points, bor.newSl1Points.length, 80);

    var offsettedB1 = cubicBeziers(ret.curves);

    var beziersThree = createBezierResult();
    ret = bezierFitCubic(beziersThree, bor.newSl2Points, bor.newSl2Points.length, 80);

    var offsettedB2 = cubicBeziers(ret.curves);

    var objPoints = [];

    objPoints = objPoints.concat(offsettedB1.allPoints());
    var arrowPoints = normalArrow(multiCubicBezier.allPoints()[multiCubicBezier.allPoints().length - 1], multiCubicBezier.lastCurveAngleRadians, offsettedB1.allPoints[offsettedB1.allPoints().length - 1], offsettedB2.allPoints[offsettedB2.allPoints().length - 1], arrowWidth);
    objPoints = objPoints.concat(arrowPoints);
    objPoints = objPoints.concat(offsettedB2.allPoints().reverse());

    objPoints.push(offsettedB1.allPoints()[0]);

    objPoints.forEach(function (p) {
        coordinates.push(unproject(p, worldSize));
    });

    var simpleCoordinatesXY = [];
    var simpleCoordinates = [];
    simpleCoordinatesXY = simpleCoordinatesXY.concat(bor.newSl1Points);
    simpleCoordinatesXY = simpleCoordinatesXY.concat(arrowPoints);
    simpleCoordinatesXY = simpleCoordinatesXY.concat(bor.newSl2Points.reverse());
    simpleCoordinatesXY.push(bor.newSl1Points[0]);
    simpleCoordinatesXY.forEach(function (p) {
        simpleCoordinates.push(unproject(p, worldSize));
    });

    return { simpleCoordinates: simpleCoordinates, complexCoordinates: coordinates };
}

function getFlowArrowCurves(points) {
    var doSimplification = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var simplifierFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.8;
    var fitterTolerance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;

    var simplifiedPoints = void 0;
    if (doSimplification) simplifiedPoints = douglasPeuckerReduction(points, simplifierFactor);

    if (simplifiedPoints.length < 2) return null;

    var beziers = createBezierResult();
    var ret = bezierFitCubic(beziers, simplifiedPoints, simplifiedPoints.length, fitterTolerance);

    return ret.curves;
}

},{"./bezier_utils":36,"./simplify":42}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createBezierResult = createBezierResult;
exports.bezierFitCubic = bezierFitCubic;
exports.douglasPeuckerReduction = douglasPeuckerReduction;
exports.simplify = simplify;
exports.visvalingamWhyattReduction = visvalingamWhyattReduction;
/* eslint-disable */
var unconstrainedTangent = { x: 0, y: 0 };

function createPointVector(len) {
    var vec = [];
    for (var i = 0; i < len; i++) {
        vec.push({ x: 0, y: 0 });
    }

    return vec;
}

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function cubicBezier(curves, anchor1, anchor2, control1, control2) {
    var curve = [];
    curve.push(anchor1, control1, control2, anchor2);
    curves.push(curve);
}

function negate(v) {
    return { x: -v.x, y: -v.y };
}

function rot90(p) {
    return { x: -p.y, y: p.x };
}

function isZero(v) {
    return v.x === 0 && v.y === 0;
}

function divide(_pt, s) {
    return { x: _pt.x / s, y: _pt.y / s };
}

function scale(v, s) {
    return { x: v.x * s, y: v.y * s };
}

function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}

function subtract(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}

function createNumberVector(len) {
    var c = [];
    for (var j = 0; j < len; j++) {
        c.push(0.0);
    }
    return c;
}

function b0(u) {
    var tmp = 1.0 - u;
    return tmp * tmp * tmp;
}

function b1(u) {
    var tmp = 1.0 - u;
    return 3 * u * (tmp * tmp);
}

function b2(u) {
    var tmp = 1.0 - u;
    return 3 * u * u * tmp;
}

function b3(u) {
    return u * u * u;
}

function isFinite(n) {
    return !isNaN(n) && Number.isFinite(n);
}

function v2SquaredLength(a) {
    return a.x * a.x + a.y * a.y;
}

function v2Length(a) {
    return Math.sqrt(v2SquaredLength(a));
}

function normalize(v) {
    // var newV:Vector2 = new Vector2(v.x,v.y);
    var len = v2Length(v);
    if (len !== 0.0) {
        v.x /= len;
        v.y /= len;
    }
    return v;
}

function unitVector(a) {
    var ret = JSON.parse(JSON.stringify(a));
    normalize(ret);
    return ret;
}

function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}

function lensq(p) {
    return dot(p, p);
}

function darrayLeftTangent(d) {
    return unitVector(subtract(d[1], d[0]));
}

function createBezierResult() {
    var maxNumberOfBeziers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var pointsPerBezier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var beziers = [];

    for (var i = 0; i < maxNumberOfBeziers * pointsPerBezier; i++) {
        beziers.push({ x: 0, y: 0 });
    }
    return beziers;
}

function darrayCenterTangent(d, center) {
    var ret = void 0;
    if (d[center + 1] === d[center - 1]) {
        /* Rotate 90 degrees in an arbitrary direction. */
        var diff = subtract(d[center], d[center - 1]);
        ret = rot90(diff);
    } else {
        ret = subtract(d[center - 1], d[center + 1]);
    }
    normalize(ret); // ret.normalize();
    return ret;
}

function bezierPt(degree, V, t) {
    /** Pascal's triangle. */

    var pascal = [];

    for (var j = 0; j < 4; j++) {
        var values = [];
        for (var k = 0; k < 4; k++) {
            values.push(0.0);
        }
        pascal.push(values);
    }

    pascal[0][0] = 1;

    pascal[1][0] = 1;
    pascal[1][1] = 1;

    pascal[2][0] = 1;
    pascal[2][1] = 2;
    pascal[2][2] = 1;

    pascal[3][0] = 1;
    pascal[3][1] = 3;
    pascal[3][2] = 3;
    pascal[3][3] = 1;

    var s = 1.0 - t;

    /* Calculate powers of t and s. */
    var spow = createNumberVector(4);
    var tpow = createNumberVector(4);
    spow[0] = 1.0;
    spow[1] = s;
    tpow[0] = 1.0;
    tpow[1] = t;
    for (var i = 1; i < degree; ++i) {
        spow[i + 1] = spow[i] * s;
        tpow[i + 1] = tpow[i] * t;
    }

    var ret = scale(V[0], spow[degree]); // * V[0];
    for (var _i = 1; _i <= degree; ++_i) {
        ret = add(ret, scale(V[_i], pascal[degree][_i] * spow[degree - _i] * tpow[_i])); // pascal[degree][i] * spow[degree - i] * tpow[i] * V[i];
    }
    return ret;
}

function newtonRaphsonRootFind(q, p, u) {
    /* Generate control vertices for Q'. */
    var q1 = createPointVector(3);
    for (var i = 0; i < 3; i++) {
        q1[i] = scale(subtract(q[i + 1], q[i]), 3.0); // 3.0 * ( Q[i+1] - Q[i] );
    }

    /* Generate control vertices for Q''. */
    var q2 = createPointVector(2);
    for (var _i2 = 0; _i2 < 2; _i2++) {
        q2[_i2] = scale(subtract(q1[_i2 + 1], q1[_i2]), 2.0); // 2.0 * ( Q1[i+1] - Q1[i] );
    }

    /* Compute Q(u), Q'(u) and Q''(u). */
    var qU = bezierPt(3, q, u);
    var q1u = bezierPt(2, q1, u);
    var q2u = bezierPt(1, q2, u);

    /* Compute f(u)/f'(u), where f is the derivative wrt u of distsq(u) = 0.5 * the square of the
     distance from P to Q(u).  Here we're using Newton-Raphson to find a stationary point in the
     distsq(u), hopefully corresponding to a local minimum in distsq (and hence a local minimum
     distance from P to Q(u)). */
    var diff = subtract(qU, p);
    var numerator = dot(diff, q1u);
    var denominator = dot(q1u, q1u) + dot(diff, q2u);

    var improvedU = void 0;
    if (denominator > 0) {
        /* One iteration of Newton-Raphson:
         improved_u = u - f(u)/f'(u) */
        improvedU = u - numerator / denominator;
    } else {
        /* Using Newton-Raphson would move in the wrong direction (towards a local maximum rather
         than local minimum), so we move an arbitrary amount in the right direction. */
        if (numerator > 0.0) {
            improvedU = u * 0.98 - 0.01;
        } else if (numerator < 0.0) {
            /* Deliberately asymmetrical, to reduce the chance of cycling. */
            improvedU = 0.031 + u * 0.98;
        } else {
            improvedU = u;
        }
    }

    if (!isFinite(improvedU)) {
        improvedU = u;
    } else if (improvedU < 0.0) {
        improvedU = 0.0;
    } else if (improvedU > 1.0) {
        improvedU = 1.0;
    }

    /* Ensure that improved_u isn't actually worse. */
    {
        var diffLensq = lensq(diff);
        for (var proportion = 0.125;; proportion += 0.125) {
            if (lensq(subtract(bezierPt(3, q, improvedU), p)) > diffLensq) {
                if (proportion > 1.0) {
                    // g_warning("found proportion %g", proportion);
                    //						trace("found proportion %g");
                    improvedU = u;
                    break;
                }
                improvedU = (1 - proportion) * improvedU + proportion * u;
            } else {
                break;
            }
        }
    }
    return improvedU;
}

function darrayLeftTangent3(d, len, toleranceSq) {
    var i = 1;
    while (true) {
        var pi = JSON.parse(JSON.stringify(d[i]));
        var t = subtract(pi, d[0]); // problem ???
        var distsq = dot(t, t);
        if (toleranceSq < distsq) {
            return unitVector(t);
        }
        ++i;
        if (i === len) {
            return distsq === 0 ? darrayLeftTangent(d, len) : unitVector(t);
        }
    }

    return null;
}

function darrayRightTangent3(d, len, toleranceSq) {
    var last = len - 1;
    var i = last - 1;
    while (true) {
        var pi = JSON.parse(JSON.stringify(d[i]));
        var t = JSON.parse(JSON.stringify(subtract(pi, d[last])));
        var distsq = dot(t, t);
        if (toleranceSq < distsq) {
            return unitVector(t);
        }
        if (i === 0) {
            return distsq === 0 ? darrayRightTangent3(d, len) : unitVector(t);
        }
        i--;
    }

    return null;
}

function reparameterize(d, len, u, bezCurve) {
    var last = len - 1;
    for (var i = 1; i < last; i++) {
        u[i] = newtonRaphsonRootFind(bezCurve, d[i], u[i]);
    }
}

function estimateBi(bezier, ei, data, u, len) {
    if (!(ei >= 1 && ei <= 2)) return;
    var oi = 3 - ei;
    var num = createNumberVector(2);
    var den = 0.0;
    for (var i = 0; i < len; ++i) {
        var ui = u[i];
        var b = createNumberVector(4);
        b[0] = b0(ui);
        b[1] = b1(ui);
        b[2] = b2(ui);
        b[3] = b3(ui);

        for (var d = 0; d < 2; ++d) {
            var prop = 'x';
            if (d === 1) prop = 'y';
            num[d] += b[ei] * (b[0] * bezier[0][prop] + b[oi] * bezier[oi][prop] + b[3] * bezier[3][prop] + -data[i][prop]);
        }
        den -= b[ei] * b[ei];
    }

    if (den !== 0.0) {
        for (var _d = 0; _d < 2; ++_d) {
            var _prop = 'x';
            if (_d === 1) _prop = 'y';
            bezier[ei][_prop] = num[_d] / den;
        }
        //			trace('NOT tricky');
    } else {
        //				trace('tricky');
        bezier[ei] = divide(add(scale(bezier[0], oi), scale(bezier[3], ei)), 3.0); // ( oi * bezier[0] + ei * bezier[3] ) / 3.;
    }
}

function estimateLengths(bezier, data, uPrime, len, tHat1, tHat2) {
    var c = [];
    for (var j = 0; j < 2; j++) {
        c[j] = [];
        for (var jj = 0; jj < 2; jj++) {
            c[j][jj] = 0;
        }
    }

    var x = createNumberVector(2);

    /* Create the C and X matrices. */
    c[0][0] = 0.0;
    c[0][1] = 0.0;
    c[1][0] = 0.0;
    c[1][1] = 0.0;
    x[0] = 0.0;
    x[1] = 0.0;

    /* First and last control points of the Bezier curve are positioned exactly at the first and
     last data points. */
    bezier[0] = data[0];
    bezier[3] = data[len - 1];

    for (var i = 0; i < len; i++) {
        /* Bezier control point coefficients. */
        var b0v = b0(uPrime[i]);
        var b1v = b1(uPrime[i]);
        var b2v = b2(uPrime[i]);
        var b3v = b3(uPrime[i]);

        /* rhs for eqn */
        var a1 = scale(tHat1, b1v); // b1 * tHat1;
        var a2 = scale(tHat2, b2v); // b2 * tHat2;

        c[0][0] += dot(a1, a1);
        c[0][1] += dot(a1, a2);
        c[1][0] = c[0][1];
        c[1][1] += dot(a2, a2);

        /* Additional offset to the data point from the predicted point if we were to set bezier[1]
         to bezier[0] and bezier[2] to bezier[3]. */
        //				const shortfall :Point
        //				= ( data[i]
        //					- ( ( b0 + b1 ) * bezier[0] )
        //					- ( ( b2 + b3 ) * bezier[3] ) );

        var shortfall = subtract(subtract(data[i], scale(bezier[0], b0v + b1v)), scale(bezier[3], b2v + b3v));

        x[0] += dot(a1, shortfall);
        x[1] += dot(a2, shortfall);
    }

    /* We've constructed a pair of equations in the form of a matrix product C * alpha = X.
     Now solve for alpha. */
    var alphaL = void 0,
        alphaR = void 0;

    /* Compute the determinants of C and X. */
    var detC0C1 = c[0][0] * c[1][1] - c[1][0] * c[0][1];
    if (detC0C1 !== 0) {
        /* Apparently Kramer's rule. */
        var detC0X = c[0][0] * x[1] - c[0][1] * x[0];
        var detXC1 = x[0] * c[1][1] - x[1] * c[0][1];
        alphaL = detXC1 / detC0C1;
        alphaR = detC0X / detC0C1;
    } else {
        /* The matrix is under-determined.  Try requiring alpha_l == alpha_r.
         *
         * One way of implementing the constraint alpha_l == alpha_r is to treat them as the same
         * constiable in the equations.  We can do this by adding the columns of C to form a single
         * column, to be multiplied by alpha to give the column vector X.
         *
         * We try each row in turn.
         */
        var c0 = c[0][0] + c[0][1];
        if (c0 !== 0) {
            alphaL = alphaR = x[0] / c0;
        } else {
            var c1 = c[1][0] + c[1][1];
            if (c1 !== 0) {
                alphaL = alphaR = x[1] / c1;
            } else {
                /* Let the below code handle  */
                alphaL = alphaR = 0.0;
            }
        }
    }

    /* If alpha negative, use the Wu/Barsky heuristic (see text).  (If alpha is 0, you get
     coincident control points that lead to divide by zero in any subsequent
     NewtonRaphsonRootFind() call.) */
    if (alphaL < 1.0e-6 || alphaR < 1.0e-6) {
        //		trace('alpha_r = alpha_l');
        alphaL = alphaR = distance(data[0], data[len - 1]) / 3.0;
    }

    /* Control points 1 and 2 are positioned an alpha distance out on the tangent vectors, left and
     right, respectively.
     bezier[1] = alpha_l * tHat1 + bezier[0];
     bezier[2] = alpha_r * tHat2 + bezier[3];
     */
    bezier[1] = add(scale(tHat1, alphaL), bezier[0]);
    bezier[2] = add(scale(tHat2, alphaR), bezier[3]);
}

function generateBezier(bezier, data, u, len, tHat1, tHat2, toleranceSq) {
    var est1 = isZero(tHat1);
    var est2 = isZero(tHat2);
    var estHat1 = void 0;

    if (est1) {
        estHat1 = JSON.parse(JSON.stringify(darrayLeftTangent3(data, len, toleranceSq)));
    } else {
        estHat1 = JSON.parse(JSON.stringify(tHat1));
    }

    var estThat2 = void 0;

    if (est2) {
        estThat2 = JSON.parse(JSON.stringify(darrayRightTangent3(data, len, toleranceSq)));
    } else {
        estThat2 = JSON.parse(JSON.stringify(tHat2));
    }

    estimateLengths(bezier, data, u, len, estHat1, estThat2);
    /* We find that darray_right_tangent tends to produce better results
     for our current freehand tool than full estimation. */
    if (est1) {
        estimateBi(bezier, 1, data, u, len);
        if (bezier[1] !== bezier[0]) {
            estHat1 = unitVector(subtract(bezier[1], bezier[0]));
        }
        estimateLengths(bezier, data, u, len, estHat1, estThat2);
    }
}

function chordLengthParameterize(d, u, len) {
    if (!(len >= 2)) return;

    /* First let u[i] equal the distance travelled along the path from d[0] to d[i]. */
    u[0] = 0.0;
    for (var i = 1; i < len; i++) {
        var dist = distance(d[i], d[i - 1]);
        u[i] = u[i - 1] + dist;
    }

    /* Then scale to [0.0 .. 1.0]. */
    var totLen = u[len - 1];
    if (!(totLen !== 0)) return;
    if (isFinite(totLen)) {
        for (var _i3 = 1; _i3 < len; ++_i3) {
            u[_i3] /= totLen;
        }
    } else {
        /* We could do better, but this probably never happens anyway. */
        for (var _i4 = 1; _i4 < len; ++_i4) {
            u[_i4] = _i4 / Number(len - 1);
        }
    }

    if (u[len - 1] !== 1) {
        u[len - 1] = 1;
    }
}

function computeHook(a, b, u, bezCurve, tolerance) {
    var p = bezierPt(3, bezCurve, u);
    var dist = distance(scale(add(a, b), 0.5), p);
    if (dist < tolerance) {
        return 0;
    }
    var allowed = distance(a, b) + tolerance;
    return dist / allowed;
    /**
     * effic: Hooks are very rare.  We could start by comparing
     * distsq, only resorting to the more expensive L2 in cases of
     * uncertainty.
     */
}

function computeMaxErrorRatio(d, u, len, bezCurve, tolerance, splitPoint) {
    var last = len - 1;
    /* I.e. assert that the error for the first & last points is zero.
     * Otherwise we should include those points in the below loop.
     * The assertion is also necessary to ensure 0 < splitPoint < last.
     */

    var maxDistsq = 0.0;
    /* Maximum error */
    var maxHookRatio = 0.0;
    var snapEnd = 0;
    var prev = bezCurve[0];
    for (var i = 1; i <= last; i++) {
        var curr = bezierPt(3, bezCurve, u[i]);
        var distsq = lensq(subtract(curr, d[i]));
        if (distsq > maxDistsq) {
            maxDistsq = distsq;
            splitPoint[0] = i; // *splitPoint = i;
        }
        var hookRatio = computeHook(prev, curr, 0.5 * (u[i - 1] + u[i]), bezCurve, tolerance);
        if (maxHookRatio < hookRatio) {
            maxHookRatio = hookRatio;
            snapEnd = i;
        }
        prev = curr;
    }

    var distRatio = Math.sqrt(maxDistsq) / tolerance;
    var ret = void 0;
    if (maxHookRatio <= distRatio) {
        ret = distRatio;
    } else {
        ret = -maxHookRatio;
        splitPoint[0] = snapEnd - 1; // *splitPoint = snap_end - 1;
    }
    return ret;
}

function bezierFitCubicFull(bezier, splitPoints, data, len, tHat1, tHat2, error, maxBeziers, targetCurves) {
    var maxIterations = 4;
    /* std::max times to try iterating */

    if (!(bezier !== null) || !(data !== null) || !(len > 0) || !(maxBeziers >= 1) || !(error >= 0.0)) return -1;

    if (len < 2) return 0;

    if (len === 2) {
        /* We have 2 points, which can be fitted trivially. */
        bezier[0] = data[0];
        bezier[3] = data[len - 1];
        var dist = distance(bezier[0], bezier[3]) / 3.0;
        if (isNaN(dist)) {
            /* Numerical problem, fall back to straight line segment. */
            //					trace('first control points - line segment');
            bezier[1] = bezier[0];
            bezier[2] = bezier[3];
        } else {
            bezier[1] = isZero(tHat1) ? divide(add(scale(bezier[0], 2), bezier[3]), 3.0) : add(bezier[0], scale(tHat1, dist));

            bezier[2] = isZero(tHat2) ? divide(add(bezier[0], scale(bezier[3], 2)), 3.0) : add(bezier[3], scale(tHat2, dist));
        }
        cubicBezier(targetCurves, bezier[0], bezier[3], bezier[1], bezier[2]);

        return 1;
    }

    /*  Parameterize points, and attempt to fit curve */
    var splitPoint = [0];
    /* Point to split point set at. */
    var isCorner = void 0;
    {
        var u = createNumberVector(len); // new double[len];
        chordLengthParameterize(data, u, len);
        if (u[len - 1] === 0.0) {
            /* Zero-length path: every point in data[] is the same.
             *
             * (Clients aren't allowed to pass such data; handling the case is defensive
             * programming.)
             */
            return 0;
        }

        generateBezier(bezier, data, u, len, tHat1, tHat2, error);
        reparameterize(data, len, u, bezier);

        /* Find max deviation of points to fitted curve. */
        var tolerance = Math.sqrt(error + 1e-9);
        var maxErrorRatio = computeMaxErrorRatio(data, u, len, bezier, tolerance, splitPoint); // split point ref ????

        if (Math.abs(maxErrorRatio) <= 1.0) {
            cubicBezier(targetCurves, bezier[0], bezier[3], bezier[1], bezier[2]);
            return 1;
        }

        /* If error not too large, then try some reparameterization and iteration. */
        if (maxErrorRatio >= 0.0 && maxErrorRatio <= 3.0) {
            for (var i = 0; i < maxIterations; i++) {
                generateBezier(bezier, data, u, len, tHat1, tHat2, error);
                reparameterize(data, len, u, bezier);
                maxErrorRatio = computeMaxErrorRatio(data, u, len, bezier, tolerance, splitPoint); // split point ref ????
                if (Math.abs(maxErrorRatio) <= 1.0) {
                    cubicBezier(targetCurves, bezier[0], bezier[3], bezier[1], bezier[2]);
                    return 1;
                }
            }
        }
        // delete[] u;
        isCorner = maxErrorRatio < 0;
    }

    if (isCorner) {
        if (splitPoint[0] === 0) {
            if (isZero(tHat1)) {
                /* Got spike even with unconstrained initial tangent. */
                ++splitPoint[0];
            } else {
                return bezierFitCubicFull(bezier, splitPoints, data, len, unconstrainedTangent, tHat2, error, maxBeziers, targetCurves);
            }
        } else if (splitPoint[0] === len - 1) {
            if (isZero(tHat2)) {
                /* Got spike even with unconstrained final tangent. */
                --splitPoint[0];
            } else {
                return bezierFitCubicFull(bezier, splitPoints, data, len, tHat1, unconstrainedTangent, error, maxBeziers, targetCurves);
            }
        }
    }

    if (maxBeziers > 1) {
        var recMaxBeziers1 = maxBeziers - 1;

        var recTHat2 = void 0,
            recTHat1 = void 0;
        if (isCorner) {
            if (!(splitPoint[0] > 0 && splitPoint[0] < len - 1)) return -1;
            recTHat1 = recTHat2 = unconstrainedTangent;
        } else {
            recTHat2 = darrayCenterTangent(data, splitPoint[0], len);
            recTHat1 = negate(recTHat2);
        }
        var nsegs1 = bezierFitCubicFull(bezier, splitPoints, data, splitPoint[0] + 1, tHat1, recTHat2, error, recMaxBeziers1, targetCurves);
        if (nsegs1 < 0) return -1;
        if (splitPoints !== null) {
            splitPoints[nsegs1 - 1] = splitPoint[0];
        }
        var recMaxBeziers2 = maxBeziers - nsegs1;
        var nsegs2 = bezierFitCubicFull(bezier.slice(nsegs1 * 4), splitPoints === null ? null : splitPoints + nsegs1, data.slice(splitPoint[0]), len - splitPoint[0], recTHat1, tHat2, error, recMaxBeziers2, targetCurves);
        if (nsegs2 < 0) {
            return -1;
        }
        return nsegs1 + nsegs2;
    }
    return -1;
}

function copyWithoutNansOrAdjacentDuplicates(src, srcLen, dest) {
    var si = 0;
    while (true) {
        if (si === srcLen) {
            return 0;
        }
        if (!isNaN(src[si].x) && !isNaN(src[si].y)) {
            dest[0] = JSON.parse(JSON.stringify(src[si]));
            ++si;
            break;
        }
        si++;
    }
    var di = 0;
    for (; si < srcLen; ++si) {
        var srcPt = JSON.parse(JSON.stringify(src[si]));
        if (srcPt !== dest[di] && !isNaN(srcPt.x) && !isNaN(srcPt.y)) {
            dest[++di] = srcPt;
        }
    }
    var destLen = di + 1;
    return destLen;
}

function bezierFitCubicR(bezier, data, len, error, maxBeziers) {
    var retObj = {};

    if (bezier === null || data === null || len <= 0 || maxBeziers >= 1 << 31 - 2 - 1 - 3) {
        retObj.numberOfCurves = -1;
        return retObj;
    }
    var uniquedData = createPointVector(len); // new Point[len];
    var uniquedLen = copyWithoutNansOrAdjacentDuplicates(data, len, uniquedData);

    if (uniquedLen < 2) {
        return retObj;
    }
    var targetCurves = [];

    /* Call fit-cubic function with recursion. */
    var ret = bezierFitCubicFull(bezier, null, uniquedData, uniquedLen, unconstrainedTangent, unconstrainedTangent, error, maxBeziers, targetCurves);

    retObj.numberOfCurves = ret;
    retObj.curves = targetCurves;
    return retObj;
}

function bezierFitCubic(bezier, data, len, error) {
    return bezierFitCubicR(bezier, data, len, error, 10);
}

function perpendicularDistance(point1, point2, pointX) {
    // Area = |(1/2)(x1y2 + x2y3 + x3y1 - x2y1 - x3y2 - x1y3)|   *Area of triangle
    // Base = v((x1-x2)²+(x1-x2)²)                               *Base of Triangle*
    // Area = .5*Base*H                                          *Solve for height
    // Height = Area/.5/Base

    var areaV = Math.abs(0.5 * (point1.x * point2.y + point2.x * pointX.y + pointX.x * point1.y - point2.x * point1.y - pointX.x * point2.y - point1.x * pointX.y));
    var bottom = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    var height = areaV / bottom * 2;

    return height;
}

// <summary>
// Douglases the peucker reduction.
// </summary>
// <param name="points">The points.</param>
// <param name="firstPoint">The first point.</param>
// <param name="lastPoint">The last point.</param>
// <param name="tolerance">The tolerance.</param>
// <param name="pointIndexsToKeep">The point index to keep.</param>
function douglasPeuckerReductionX(points, firstPoint, lastPoint, tolerance, pointIndexsToKeep) {
    var maxDistance = 0;
    var indexFarthest = 0;
    for (var index = firstPoint; index < lastPoint; index++) {
        var d = perpendicularDistance(points[firstPoint], points[lastPoint], points[index]);
        if (d > maxDistance) {
            maxDistance = d;
            indexFarthest = index;
        }
    }

    if (maxDistance > tolerance && indexFarthest !== 0) {
        // Add the largest point that exceeds the tolerance
        pointIndexsToKeep.push(indexFarthest);

        douglasPeuckerReductionX(points, firstPoint, indexFarthest, tolerance, pointIndexsToKeep);
        douglasPeuckerReductionX(points, indexFarthest, lastPoint, tolerance, pointIndexsToKeep);
    }
}

// <summary>
// Uses the Douglas Peucker algorithm to reduce the number of points.
// </summary>
// <param name="Points">The points.</param>
// <param name="Tolerance">The tolerance.</param>
// <returns></returns>
function douglasPeuckerReduction(points, tolerance) {
    if (points === null || points.length < 3) return points;
    var firstPoint = 0;
    var lastPoint = points.length - 1;
    var pointIndexsToKeep = [];

    // Add the first and last index to the keepers
    pointIndexsToKeep.push(firstPoint);
    pointIndexsToKeep.push(lastPoint);

    // The first and the last point cannot be the same
    while (points[firstPoint] === points[lastPoint]) {
        lastPoint--;
    }

    douglasPeuckerReductionX(points, firstPoint, lastPoint, tolerance, pointIndexsToKeep); // ref

    var returnPoints = [];
    pointIndexsToKeep.sort(function (a, b) {
        return a - b;
    });

    pointIndexsToKeep.forEach(function (index) {
        returnPoints.push(points[index]);
    });

    return returnPoints;
}

function compare(a, b) {
    return a[1].area - b[1].area;
}

function area(t) {
    return Math.abs((t[0].x - t[2].x) * (t[1].y - t[0].y) - (t[0].x - t[1].x) * (t[2].y - t[0].y));
}

function minHeap() {
    var heap = {},
        array = [];

    heap.push = function () {
        for (var i = 0, n = arguments.length; i < n; ++i) {
            var object = arguments[i];
            up(object.index = array.push(object) - 1);
        }
        return array.length;
    };

    heap.pop = function () {
        var removed = array[0],
            object = array.pop();
        if (array.length) {
            array[object.index = 0] = object;
            down(0);
        }
        return removed;
    };

    heap.remove = function (removed) {
        var i = removed.index,
            object = array.pop();
        if (i !== array.length) {
            array[object.index = i] = object;
            (compare(object, removed) < 0 ? up : down)(i);
        }
        return i;
    };

    function up(i) {
        var object = array[i];
        while (i > 0) {
            var up = (i + 1 >> 1) - 1,
                parent = array[up];
            if (compare(object, parent) >= 0) break;
            array[parent.index = i] = parent;
            array[object.index = i = up] = object;
        }
    }

    function down(i) {
        var object = array[i];
        while (true) {
            var right = i + 1 << 1,
                left = right - 1,
                down = i,
                child = array[down];
            if (left < array.length && compare(array[left], child) < 0) child = array[down = left];
            if (right < array.length && compare(array[right], child) < 0) child = array[down = right];
            if (down === i) break;
            array[child.index = i] = child;
            array[object.index = i = down] = object;
        }
    }

    return heap;
}

function simplify(points) {
    var heap = minHeap(),
        maxArea = 0,
        triangle = void 0;

    var triangles = [];

    for (var i = 1, n = points.length - 1; i < n; ++i) {
        triangle = points.slice(i - 1, i + 2);
        triangle[1].area = area(triangle);
        if (triangle[1].area) {
            triangles.push(triangle);
            heap.push(triangle);
        }
    }

    for (var _i5 = 0, _n = triangles.length; _i5 < _n; ++_i5) {
        triangle = triangles[_i5];
        triangle.previous = triangles[_i5 - 1];
        triangle.next = triangles[_i5 + 1];
    }

    while (triangle = heap.pop()) {
        // If the area of the current point is less than that of the previous point
        // to be eliminated, use the latter’s area instead. This ensures that the
        // current point cannot be eliminated without eliminating previously-
        // eliminated points.
        if (triangle[1].area < maxArea) triangle[1].area = maxArea;else maxArea = triangle[1].area;

        if (triangle.previous) {
            triangle.previous.next = triangle.next;
            triangle.previous[2] = triangle[2];
            update(triangle.previous);
        } else {
            triangle[0].area = triangle[1].area;
        }

        if (triangle.next) {
            triangle.next.previous = triangle.previous;
            triangle.next[0] = triangle[0];
            update(triangle.next);
        } else {
            triangle[2].area = triangle[1].area;
        }
    }

    function update(triangle) {
        heap.remove(triangle);
        triangle[1].area = area(triangle);
        heap.push(triangle);
    }

    return points.filter(function (p, i) {
        return p.area > 0.03 || i === 0 || i === points.length - 1;
    });
}

function visvalingamWhyattReduction(points) {
    return simplify(points);
}

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var baseSize = 25;

var labelSize = {
    EXTRASMALL: { value: baseSize * 0.65, label: 'Extra small' },
    SMALL: { value: baseSize * 0.85, label: 'Small' },
    MEDIUM: { value: baseSize * 1.1, label: 'Medium' },
    LARGE: { value: baseSize * 1.4, label: 'Large' },
    EXTRALARGE: { value: baseSize * 1.8, label: 'Extra large' }
};

exports.default = labelSize;

},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var baseSize = 90;

var markerSize = {
    EXTRASMALL: { value: baseSize * 0.65, label: 'Extra small' },
    SMALL: { value: baseSize * 0.85, label: 'Small' },
    MEDIUM: { value: baseSize * 1.1, label: 'Medium' },
    LARGE: { value: baseSize * 1.4, label: 'Large' },
    EXTRALARGE: { value: baseSize * 1.8, label: 'Extra large' }
};

exports.default = markerSize;

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var strokeWeight = {
    NONE: { value: 0, label: 'None' },
    EXTRATHIN: { value: 1, label: 'Extra thin' },
    THIN: { value: 2, label: 'Thin' },
    NORMAL: { value: 3, label: 'Normal' },
    THICK: { value: 4, label: 'Thick' },
    EXTRATHICK: { value: 5, label: 'Extra thick' }
};

exports.default = strokeWeight;

},{}],40:[function(require,module,exports){
'use strict';

var MarkerMapping = require('./mapping');
var StrokeWeight = require('./enums/StrokeWeight');
var MarkerSize = require('./enums/MarkerSize');
var LabelSize = require('./enums/LabelSize');
var AnnotationsWorker = require('./workers/annotations_worker');

var _require = require('./bezier'),
    getFlowArrowCurves = _require.getFlowArrowCurves,
    project = _require.project,
    unproject = _require.unproject;

var work = require('webworkify');

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

module.exports = function (dragonflyDrawInstance, dragonflyMapInstance) {
  var w = work(AnnotationsWorker);
  var mode = 'complex';
  w.addEventListener('message', function (ev) {
    dragonflyDrawInstance[ev.data[1]](ev.data[0]);
  });

  // Update the image but preserve the user defined width.
  var calculateImageCoordinates = function calculateImageCoordinates(url, annotation) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        var worldSize = 512 * Math.pow(2, annotation.createdAtZoomLevel);
        var projectedTopLeft = project({
          lng: annotation.topLeftPoint[0],
          lat: annotation.topLeftPoint[1]
        }, worldSize);
        var projectedBottomRight = project({
          lng: annotation.bottomRightPoint[0],
          lat: annotation.bottomRightPoint[1]
        }, worldSize);
        var desiredWidth = projectedBottomRight.x - projectedTopLeft.x;
        var middle = (projectedBottomRight.y - projectedTopLeft.y) / 2 + projectedTopLeft.y;
        var height = img.height;
        var width = img.width;
        var aspectRatio = width / height;
        var calculatedHeight = desiredWidth / aspectRatio;

        var projectedTopRight = {
          x: projectedBottomRight.x,
          y: middle - calculatedHeight / 2
        };
        var projectedBottomLeft = {
          x: projectedTopLeft.x,
          y: middle + calculatedHeight / 2
        };
        projectedTopLeft.y = middle - calculatedHeight / 2;

        projectedBottomRight.y = middle + calculatedHeight / 2;

        annotation.topLeftPoint = unproject(projectedTopLeft, worldSize);
        annotation.bottomRightPoint = unproject(projectedBottomRight, worldSize);
        resolve([unproject(projectedTopLeft, worldSize), unproject(projectedTopRight, worldSize), unproject(projectedBottomRight, worldSize), unproject(projectedBottomLeft, worldSize)]);
      };
      img.src = url;
    });
  };

  var updateFlowArrowCoordinates = function updateFlowArrowCoordinates(e) {
    this.drawFlowArrow(e);
  };

  var generateCurves = function generateCurves(coordinates) {
    var points = coordinates.map(function (c) {
      return dragonflyMapInstance.project(c);
    });
    var curves = getFlowArrowCurves(points);
    return curves.map(function (c) {
      return {
        anchorPoint1: dragonflyMapInstance.unproject(c[0]).toArray(),
        controlPoint1: dragonflyMapInstance.unproject(c[1]).toArray(),
        anchorPoint2: dragonflyMapInstance.unproject(c[2]).toArray(),
        controlPoint2: dragonflyMapInstance.unproject(c[3]).toArray()
      };
    });
  };

  var drawMarker = function drawMarker(marker) {
    w.postMessage([marker, mode, 'drawMarker']);
  };

  var drawLabel = function drawLabel(label) {
    w.postMessage([label, mode, 'drawLabel']);
  };

  var drawPolyline = function drawPolyline(polyline) {
    w.postMessage([polyline, mode, 'drawPolyline']);
  };

  var drawFlowArrow = function drawFlowArrow(flowArrow) {
    w.postMessage([flowArrow, mode, 'drawFlowArrow']);
  };

  var drawFreehand = function drawFreehand(freehand) {
    w.postMessage([freehand, mode, 'drawFreehand']);
  };

  var drawHotspot = function drawHotspot(hotspot) {
    // Add all 8 control points
    var coordinate = [hotspot.topLeftPoint, [(hotspot.topLeftPoint[0] + hotspot.bottomRightPoint[0]) / 2, hotspot.topLeftPoint[1]], [hotspot.bottomRightPoint[0], hotspot.topLeftPoint[1]], [hotspot.bottomRightPoint[0], (hotspot.topLeftPoint[1] + hotspot.bottomRightPoint[1]) / 2], hotspot.bottomRightPoint, [(hotspot.topLeftPoint[0] + hotspot.bottomRightPoint[0]) / 2, hotspot.bottomRightPoint[1]], [hotspot.topLeftPoint[0], hotspot.bottomRightPoint[1]], [hotspot.topLeftPoint[0], (hotspot.topLeftPoint[1] + hotspot.bottomRightPoint[1]) / 2], hotspot.topLeftPoint];
    hotspot.coordinates = coordinates;
    w.postMessage([hotspot, mode, 'drawHotspot']);
  };

  var drawImage = function drawImage(image) {
    w.postMessage([image, mode, 'drawImage']);
  };

  var drawShape = function drawShape(shape) {
    if (shape.coordinates[0] !== shape.coordinates[shape.coordinates.length - 1]) {
      var _coordinates = shape.coordinates.slice(0);
      _coordinates.push(_coordinates[0]);
      shape.coordinates = _coordinates;
    }
    w.postMessage([shape, mode, 'drawShape']);
  };

  var drawPolygon = function drawPolygon(polygon) {
    if (polygon.coordinates[0] !== polygon.coordinates[polygon.coordinates.length - 1]) {
      var _coordinates2 = polygon.coordinates.slice(0);
      _coordinates2.push(_coordinates2[0]);
      polygon.coordinates = _coordinates2;
    }
    w.postMessage([polygon, mode, 'drawPolygon']);
  };

  var updateAnnotationStyle = function updateAnnotationStyle(e) {
    var drawStyle = {
      id: e.id,
      type: e.type,
      paint: {},
      layout: {}
    };
    if (e.minZoom !== undefined) drawStyle.minzoom = e.minZoom;
    if (e.maxZoom !== undefined) drawStyle.maxzoom = e.maxZoom;
    switch (e.type) {
      case 'Polyline':
      case 'Polygon':
      case 'Shape':
      case 'Freehand':
      case 'FlowArrow':
        if (e.toWidth !== undefined && e.fromWidth !== undefined && e.tipWidth !== undefined) updateFlowArrowCoordinates(e);
        if (e.fillColor !== undefined) drawStyle.paint['fill-color'] = e.fillColor;
        if (e.strokeColor !== undefined) drawStyle.paint['line-color'] = e.strokeColor;
        if (e.strokeWeight !== undefined) drawStyle.paint['line-width'] = StrokeWeight[e.strokeWeight.toUpperCase()].value;
        if (e.fillOpacity !== undefined) drawStyle.paint['fill-opacity'] = e.fillOpacity;
        if (e.opacity !== undefined) {
          drawStyle.paint['line-opacity'] = e.opacity;
          if (e.useFill) drawStyle.paint['fill-opacity'] = e.opacity;
          drawStyle.paint['circle-opacity'] = e.opacity;
        }
        break;
      case 'Marker':
        if (e.fillColor !== undefined) drawStyle.paint['text-color'] = e.fillColor;
        if (e.size !== undefined) drawStyle.layout['text-size'] = MarkerSize[e.size.toUpperCase()].value;
        if (e.markerPathId !== undefined) drawStyle.layout['text-field'] = MarkerMapping['map_annotation_marker_' + e.markerPathId.replace('-', '_')];
        /* handle marker label opacity and min max zoom */
        if (e.title !== undefined) {
          var labelStyle = {
            id: e.id + '_label',
            type: 'Label',
            title: e.title
          };
          updateAnnotationStyle(labelStyle);
        }
        if (e.opacity !== undefined) {
          drawStyle.paint['text-opacity'] = e.opacity;
          var _labelStyle = {
            id: e.id + '_label',
            type: 'Label',
            opacity: e.opacity
          };
          updateAnnotationStyle(_labelStyle);
        }
        if (e.minZoom !== undefined) {
          var _labelStyle2 = {
            id: e.id + '_label',
            type: 'Label',
            minZoom: e.minZoom
          };
          updateAnnotationStyle(_labelStyle2);
        }

        if (e.maxZoom !== undefined) {
          var _labelStyle3 = {
            id: e.id + '_label',
            type: 'Label',
            maxZoom: e.maxZoom
          };
          updateAnnotationStyle(_labelStyle3);
        }
        break;
      case 'Label':
        if (e.labelPosition !== undefined) {
          switch (e.labelPosition) {
            case 'bottom':
              drawStyle.paint['text-translate'] = [0, MarkerSize[e.helperMarkerSize.toUpperCase()].value * 0.5];
              drawStyle.layout['text-anchor'] = 'center';
              break;
            case 'top':
              drawStyle.paint['text-translate'] = [0, -MarkerSize[e.helperMarkerSize.toUpperCase()].value * 0.5];
              drawStyle.layout['text-anchor'] = 'center';
              break;
            case 'left':
              drawStyle.paint['text-translate'] = [-MarkerSize[e.helperMarkerSize.toUpperCase()].value * 0.4, 0];
              drawStyle.layout['text-anchor'] = 'right';
              break;
            case 'right':
              drawStyle.paint['text-translate'] = [MarkerSize[e.helperMarkerSize.toUpperCase()].value * 0.4, 0];
              drawStyle.layout['text-anchor'] = 'left';
              break;
          }
        }
        if (e.textColor !== undefined) drawStyle.paint['text-color'] = e.textColor;
        if (e.textSize !== undefined) drawStyle.layout['text-size'] = LabelSize[e.textSize.toUpperCase()].value;
        if (e.opacity !== undefined) drawStyle.paint['text-opacity'] = e.opacity;
        if (e.title !== undefined) drawStyle.layout['text-field'] = e.title;
        if (e.rotationAngle !== undefined) drawStyle.layout['text-rotate'] = e.rotationAngle;
        if (e.fillColor !== undefined) drawStyle.paint['text-halo-color'] = e.fillColor;
        if (e.haloWidth !== undefined) drawStyle.paint['text-halo-width'] = e.haloWidth;
        if (e.haloBlur !== undefined) drawStyle.paint['text-halo-blur'] = e.haloBlur;
        if (e.labelVisible !== undefined) drawStyle.layout.visibility = e.labelVisible ? 'visible' : 'none';
        if (e.fillOpacity !== undefined) {
          var rgbColors = hexToRgb(e.fillColor);
          drawStyle.paint['text-halo-color'] = 'rgba(' + rgbColors.r + ', ' + rgbColors.g + ', ' + rgbColors.b + ', ' + e.fillOpacity + ')';
        }
        break;
      case 'Image':
        if (e.opacity !== undefined) drawStyle.paint['raster-opacity'] = e.opacity;
        if (e.imagePath !== undefined) {
          drawStyle.url = e.imagePath;
          calculateImageCoordinates(drawStyle.url, e.annotation).then(function (coordinates) {
            drawStyle.coordinates = coordinates;
            dragonflyDrawInstance.updateFeatureStyle(drawStyle);
          });
          return;
        }
        if (e.rotationAngle !== undefined) {
          var s = Math.sin(e.rotationAngle / 180 * Math.PI);
          var c = Math.cos(e.rotationAngle / 180 * Math.PI);

          var projectedTopLeft = dragonflyMapInstance.project(e.topLeftPoint);
          var projectedBottomRight = dragonflyMapInstance.project(e.bottomRightPoint);
          var projectedTopRight = {
            x: projectedBottomRight.x,
            y: projectedTopLeft.y
          };
          var projectedBottomLeft = {
            x: projectedTopLeft.x,
            y: projectedBottomRight.y
          };

          var center = {
            x: (projectedTopLeft.x + projectedTopRight.x) / 2,
            y: (projectedTopLeft.y + projectedBottomLeft.y) / 2
          };

          // Center the coordinates
          projectedTopLeft.x -= center.x;
          projectedTopLeft.y -= center.y;

          projectedBottomRight.x -= center.x;
          projectedBottomRight.y -= center.y;

          projectedTopRight.x -= center.x;
          projectedTopRight.y -= center.y;

          projectedBottomLeft.x -= center.x;
          projectedBottomLeft.y -= center.y;

          drawStyle.coordinates = [dragonflyMapInstance.unproject({
            x: projectedTopLeft.x * c - projectedTopLeft.y * s + center.x,
            y: projectedTopLeft.x * s + projectedTopLeft.y * c + center.y
          }).toArray(), dragonflyMapInstance.unproject({
            x: projectedTopRight.x * c - projectedTopRight.y * s + center.x,
            y: projectedTopRight.x * s + projectedTopRight.y * c + center.y
          }).toArray(), dragonflyMapInstance.unproject({
            x: projectedBottomRight.x * c - projectedBottomRight.y * s + center.x,
            y: projectedBottomRight.x * s + projectedBottomRight.y * c + center.y
          }).toArray(), dragonflyMapInstance.unproject({
            x: projectedBottomLeft.x * c - projectedBottomLeft.y * s + center.x,
            y: projectedBottomLeft.x * s + projectedBottomLeft.y * c + center.y
          }).toArray()];
        }
        break;
      case 'Hotspot':
        if (e.strokeColor !== undefined) drawStyle.paint['line-color'] = e.strokeColor;
        if (e.strokeWeight !== undefined) drawStyle.paint['line-width'] = StrokeWeight[e.strokeWeight.toUpperCase()].value;
        if (e.opacity !== undefined) {
          drawStyle.paint['line-opacity'] = e.opacity;
          drawStyle.paint['circle-opacity'] = e.opacity;
        }

    }
    dragonflyDrawInstance.updateFeatureStyle(drawStyle);
  };

  var setInitialFeatureStyle = function setInitialFeatureStyle(feature) {
    w.postMessage([feature, mode, 'setInitialFeatureStyle']);
  };

  return {
    drawMarker: drawMarker,
    drawLabel: drawLabel,
    drawPolyline: drawPolyline,
    drawFlowArrow: drawFlowArrow,
    drawFreehand: drawFreehand,
    drawHotspot: drawHotspot,
    drawImage: drawImage,
    drawShape: drawShape,
    drawPolygon: drawPolygon,
    generateCurves: generateCurves,
    updateAnnotationStyle: updateAnnotationStyle,
    setInitialFeatureStyle: setInitialFeatureStyle
  };
};

},{"./bezier":35,"./enums/LabelSize":37,"./enums/MarkerSize":38,"./enums/StrokeWeight":39,"./mapping":41,"./workers/annotations_worker":43,"webworkify":22}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Mapping = {
    map_marker_parking: '\uE900',
    map_marker_picnic: '\uE901',
    map_marker_place: '\uE902',
    map_marker_police: '\uE903',
    map_marker_pool: '\uE904',
    map_marker_post: '\uE905',
    map_marker_power_plant: '\uE906',
    map_marker_power_station: '\uE907',
    map_marker_preschool: '\uE908',
    map_marker_pub: '\uE909',
    map_marker_truck: '\uE90A',
    map_marker_water_tower: '\uE90B',
    map_marker_windsurfing: '\uE90C',
    map_marker_wine_bar: '\uE90D',
    map_marker_winter_resort: '\uE90E',
    map_marker_workshop: '\uE90F',
    map_marker_ski_lift: '\uE910',
    map_marker_ski_touring: '\uE911',
    map_marker_small_city: '\uE912',
    map_marker_standpipe: '\uE913',
    map_marker_swimming: '\uE914',
    map_marker_synagogue: '\uE915',
    map_marker_tenisball: '\uE916',
    map_marker_tent: '\uE917',
    map_marker_train: '\uE918',
    map_marker_tram: '\uE919',
    map_marker_restaurant: '\uE91A',
    map_marker_retirement_home: '\uE91B',
    map_marker_school: '\uE91C',
    map_marker_seal: '\uE91D',
    map_marker_seaplane: '\uE91E',
    map_marker_searchmarker: '\uE91F',
    map_marker_ship: '\uE920',
    map_marker_shoping_center: '\uE921',
    map_marker_skating: '\uE922',
    map_marker_ski_jump: '\uE923',
    map_marker_library: '\uE924',
    map_marker_major_city: '\uE925',
    map_marker_medium_city: '\uE926',
    map_marker_metro: '\uE927',
    map_marker_mosque: '\uE928',
    map_marker_motorboat: '\uE929',
    map_marker_motorcycle: '\uE92A',
    map_marker_mountain_climbing: '\uE92B',
    map_marker_museum: '\uE92C',
    map_marker_nature_watching: '\uE92D',
    map_marker_forest: '\uE92E',
    map_marker_gas_station: '\uE92F',
    map_marker_golf_course: '\uE930',
    map_marker_horse_riding: '\uE931',
    map_marker_hospital: '\uE932',
    map_marker_hotel: '\uE933',
    map_marker_ice_cream_shop: '\uE934',
    map_marker_jet_ski: '\uE935',
    map_marker_kayaking: '\uE936',
    map_marker_laundry: '\uE937',
    map_marker_cocktail_bar: '\uE938',
    map_marker_coffeehouse: '\uE939',
    map_marker_construction_site: '\uE93A',
    map_marker_dear: '\uE93B',
    map_marker_default_poi: '\uE93C',
    map_marker_diving: '\uE93D',
    map_marker_dock: '\uE93E',
    map_marker_factory: '\uE93F',
    map_marker_fish: '\uE940',
    map_marker_football: '\uE941',
    map_marker_bonfire: '\uE942',
    map_marker_bus: '\uE943',
    map_marker_campsite: '\uE944',
    map_marker_capital_city: '\uE945',
    map_marker_car: '\uE946',
    map_marker_caravan: '\uE947',
    map_marker_cemetery: '\uE948',
    map_marker_church: '\uE949',
    map_marker_cinema: '\uE94A',
    map_marker_city: '\uE94B',
    map_marker_aerial_lift: '\uE94C',
    map_marker_airplane: '\uE94D',
    map_marker_archery: '\uE94E',
    map_marker_art: '\uE94F',
    map_marker_bank: '\uE950',
    map_marker_baseball: '\uE951',
    map_marker_baseballer: '\uE952',
    map_marker_basketball: '\uE953',
    map_marker_bear: '\uE954',
    map_marker_bicycle: '\uE955',
    map_annotation_marker_wetland: '\uE9F0',
    map_annotation_marker_water: '\uE9F1',
    map_annotation_marker_waste_basket: '\uE9F2',
    map_annotation_marker_warehouse: '\uE9F3',
    map_annotation_marker_village: '\uE9F4',
    map_annotation_marker_triangle_stroked: '\uE9F5',
    map_annotation_marker_triangle: '\uE9F6',
    map_annotation_marker_town_hall: '\uE9F7',
    map_annotation_marker_town: '\uE9F8',
    map_annotation_marker_toilets: '\uE9F9',
    map_annotation_marker_theatre: '\uE9FA',
    map_annotation_marker_tennis: '\uE9FB',
    map_annotation_marker_telephone: '\uE9FC',
    map_annotation_marker_swimming: '\uE9FD',
    map_annotation_marker_suitcase: '\uE9FE',
    map_annotation_marker_star_stroked: '\uE9FF',
    map_annotation_marker_star: '\uEA00',
    map_annotation_marker_square_stroked: '\uEA01',
    map_annotation_marker_square: '\uEA02',
    map_annotation_marker_soccer: '\uEA03',
    map_annotation_marker_slaughterhouse: '\uEA04',
    map_annotation_marker_skins: '\uEA05',
    map_annotation_marker_skiing: '\uEA06',
    map_annotation_marker_shop: '\uEA12',
    map_annotation_marker_shells: '\uEA15',
    map_annotation_marker_scooter: '\uEA16',
    map_annotation_marker_school: '\uEA17',
    map_annotation_marker_rocket: '\uEA18',
    map_annotation_marker_road_block: '\uEA19',
    map_annotation_marker_restaurant: '\uEA1A',
    map_annotation_marker_religious_muslim: '\uEA1B',
    map_annotation_marker_religious_jewish: '\uEA1C',
    map_annotation_marker_religious_christian: '\uEA1D',
    map_annotation_marker_rail: '\uEA1E',
    map_annotation_marker_prison: '\uEA1F',
    map_annotation_marker_post: '\uEA20',
    map_annotation_marker_polling_place: '\uEA21',
    map_annotation_marker_police: '\uEA22',
    map_annotation_marker_point: '\uEA23',
    map_annotation_marker_playground: '\uEA24',
    map_annotation_marker_place_of_workship: '\uEA25',
    map_annotation_marker_pitch: '\uEA26',
    map_annotation_marker_pharmacy: '\uEA27',
    map_annotation_marker_parking_garage: '\uEA28',
    map_annotation_marker_parking: '\uEA29',
    map_annotation_marker_park: '\uEA2A',
    map_annotation_marker_oil_well: '\uEA2B',
    map_annotation_marker_music: '\uEA2C',
    map_annotation_marker_museum: '\uEA2D',
    map_annotation_marker_monument: '\uEA2E',
    map_annotation_marker_mobile_phone: '\uEA2F',
    map_annotation_marker_minerals: '\uEA30',
    map_annotation_marker_minefield: '\uEA45',
    map_annotation_marker_marker_default: '\uEA46',
    map_annotation_marker_logging: '\uEA47',
    map_annotation_marker_lodging: '\uEA48',
    map_annotation_marker_liquor_store: '\uEA49',
    map_annotation_marker_lighthouse: '\uEA4A',
    map_annotation_marker_library: '\uEA4B',
    map_annotation_marker_land_use: '\uEA4C',
    map_annotation_marker_industrial: '\uEA4D',
    map_annotation_marker_hospital: '\uEA4E',
    map_annotation_marker_helioport: '\uEA4F',
    map_annotation_marker_heart: '\uEA50',
    map_annotation_marker_harbor: '\uEA51',
    map_annotation_marker_hairdresser: '\uEA52',
    map_annotation_marker_grocery: '\uEA53',
    map_annotation_marker_grapes: '\uEA54',
    map_annotation_marker_golf: '\uEA55',
    map_annotation_marker_garden: '\uEA56',
    map_annotation_marker_cemetery: '\uEA57',
    map_annotation_marker_car: '\uEA58',
    map_annotation_marker_campsite: '\uEA59',
    map_annotation_marker_camera: '\uEA5A',
    map_annotation_marker_cafe: '\uEA5B',
    map_annotation_marker_fuel: '\uEA5C',
    map_annotation_marker_fish: '\uEA5D',
    map_annotation_marker_fire_station: '\uEA5E',
    map_annotation_marker_ferry: '\uEA5F',
    map_annotation_marker_feathers: '\uEA60',
    map_annotation_marker_fast_food: '\uEA61',
    map_annotation_marker_farm: '\uEA62',
    map_annotation_marker_explosion: '\uEA63',
    map_annotation_marker_entrance: '\uEA64',
    map_annotation_marker_emergency_telephone: '\uEA65',
    map_annotation_marker_embassy: '\uEA66',
    map_annotation_marker_dog_park: '\uEA67',
    map_annotation_marker_disability: '\uEA68',
    map_annotation_marker_danger: '\uEA69',
    map_annotation_marker_dam: '\uEA6A',
    map_annotation_marker_cross: '\uEA6B',
    map_annotation_marker_corn: '\uEA6C',
    map_annotation_marker_commercial: '\uEA6D',
    map_annotation_marker_college: '\uEA6E',
    map_annotation_marker_clothing_store: '\uEA6F',
    map_annotation_marker_city: '\uEA72',
    map_annotation_marker_chemist: '\uEA79',
    map_annotation_marker_bus: '\uEA7E',
    map_annotation_marker_building: '\uEA7F',
    map_annotation_marker_boom: '\uEA80',
    map_annotation_marker_bicycle: '\uEA81',
    map_annotation_marker_beer: '\uEA83',
    map_annotation_marker_basketball: '\uEA84',
    map_annotation_marker_baseball: '\uEA85',
    map_annotation_marker_bar: '\uEA86',
    map_annotation_marker_bank: '\uEA87',
    map_annotation_marker_bakery: '\uEA8A',
    map_annotation_marker_art_gallery: '\uEA8B',
    map_annotation_marker_america_football: '\uEA8C',
    map_annotation_marker_airport: '\uEA8E',
    map_annotation_marker_airfield: '\uEA8F',
    map_annotation_marker_annotation: '\uE9E7'
};

exports.default = Mapping;

},{}],42:[function(require,module,exports){
'use strict';

/* eslint-disable */
/*
 (c) 2013, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
 */

(function () {
    'use strict';

    // to suit your point format, run search/replace for '.x' and '.y';
    // for 3D version, see 3d branch (configurability would draw significant performance overhead)

    // square distance between 2 points

    function getSqDist(p1, p2) {

        var dx = p1.x - p2.x,
            dy = p1.y - p2.y;

        return dx * dx + dy * dy;
    }

    // square distance from a point to a segment
    function getSqSegDist(p, p1, p2) {

        var x = p1.x,
            y = p1.y,
            dx = p2.x - x,
            dy = p2.y - y;

        if (dx !== 0 || dy !== 0) {

            var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

            if (t > 1) {
                x = p2.x;
                y = p2.y;
            } else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }

        dx = p.x - x;
        dy = p.y - y;

        return dx * dx + dy * dy;
    }
    // rest of the code doesn't care about point format

    // basic distance-based simplification
    function simplifyRadialDist(points, sqTolerance) {

        var prevPoint = points[0],
            newPoints = [prevPoint],
            point;

        for (var i = 1, len = points.length; i < len; i++) {
            point = points[i];

            if (getSqDist(point, prevPoint) > sqTolerance) {
                newPoints.push(point);
                prevPoint = point;
            }
        }

        if (prevPoint !== point) newPoints.push(point);

        return newPoints;
    }

    function simplifyDPStep(points, first, last, sqTolerance, simplified) {
        var maxSqDist = sqTolerance,
            index;

        for (var i = first + 1; i < last; i++) {
            var sqDist = getSqSegDist(points[i], points[first], points[last]);

            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }

        if (maxSqDist > sqTolerance) {
            if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
            simplified.push(points[index]);
            if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
        }
    }

    // simplification using Ramer-Douglas-Peucker algorithm
    function simplifyDouglasPeucker(points, sqTolerance) {
        var last = points.length - 1;

        var simplified = [points[0]];
        simplifyDPStep(points, 0, last, sqTolerance, simplified);
        simplified.push(points[last]);

        return simplified;
    }

    // both algorithms combined for awesome performance
    function simplify(points, tolerance, highestQuality) {

        if (points.length <= 2) return points;

        var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

        points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
        points = simplifyDouglasPeucker(points, sqTolerance);

        return points;
    }

    // export as AMD module / Node module / browser or worker variable
    if (typeof define === 'function' && define.amd) define(function () {
        return simplify;
    });else if (typeof module !== 'undefined') module.exports = simplify;else if (typeof self !== 'undefined') self.simplify = simplify;else window.simplify = simplify;
})();

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (self) {
    self.addEventListener('message', function (ev) {
        self.postMessage([generateFeatureStyle(ev.data[0], ev.data[1]), ev.data[2]]);
    });
};

var _mapping = require('../mapping');

var _mapping2 = _interopRequireDefault(_mapping);

var _StrokeWeight = require('../enums/StrokeWeight');

var _StrokeWeight2 = _interopRequireDefault(_StrokeWeight);

var _MarkerSize = require('../enums/MarkerSize');

var _MarkerSize2 = _interopRequireDefault(_MarkerSize);

var _LabelSize = require('../enums/LabelSize');

var _LabelSize2 = _interopRequireDefault(_LabelSize);

var _bezier = require('../bezier');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
} /* eslint-disable */
;

function calculateCurvePoints(feature, mode) {
    var result = (0, _bezier.getArrowFromCurves)(feature.curves, feature.fromWidth, feature.toWidth, feature.tipWidth, feature.createdAtZoomLevel);
    var coordinates = mode === 'simple' ? result.simpleCoordinates : result.complexCoordinates;
    if (coordinates[0] !== coordinates[coordinates.length - 1]) coordinates[coordinates.length - 1] = coordinates[0];
    return coordinates;
}

function generateFeatureStyle(feature, mode) {
    var drawStyle = {
        id: feature.id,
        paint: {},
        layout: {},
        type: feature.type
    };
    if (feature.minZoom !== undefined) drawStyle.minzoom = feature.minZoom;
    if (feature.maxZoom !== undefined) drawStyle.maxzoom = feature.maxZoom;
    if (feature.coordinates) drawStyle.coordinates = feature.coordinates;
    if (feature.curves) drawStyle.coordinates = calculateCurvePoints(feature, mode);
    switch (feature.type) {
        case 'Polyline':
        case 'Freehand':
        case 'Shape':
        case 'Hotspot':
        case 'Polygon':
            if (feature.fillColor !== undefined) drawStyle.paint['fill-color'] = feature.fillColor;
            if (feature.strokeColor !== undefined) drawStyle.paint['line-color'] = feature.strokeColor;
            if (feature.strokeWeight !== undefined) drawStyle.paint['line-width'] = _StrokeWeight2.default[feature.strokeWeight.toUpperCase()].value;
            if (feature.opacity !== undefined) {
                drawStyle.paint['line-opacity'] = feature.opacity;
                if (feature.useFill) drawStyle.paint['fill-opacity'] = feature.useFill ? feature.opacity : 0;
                drawStyle.paint['circle-opacity'] = feature.opacity;
            }
            break;
        case 'Marker':
            drawStyle.label = {
                id: feature.id + '_label'
            };
            drawStyle.label.paint = {};
            drawStyle.label.layout = {};
            drawStyle.layout['text-field'] = _mapping2.default['map_annotation_marker_' + feature.markerPathId.replace('-', '_')];
            drawStyle.layout['text-size'] = _MarkerSize2.default[feature.size.toUpperCase()].value;
            drawStyle.paint['text-color'] = feature.fillColor;
            if (feature.opacity !== undefined) drawStyle.paint['text-opacity'] = feature.opacity;
            drawStyle.label.paint = {
                'text-halo-color': 'rgba(255,255,255,0.5)',
                'text-halo-width': 1,
                'text-halo-blur': 1
            };
            drawStyle.label.paint['text-color'] = feature.textColor;
            drawStyle.label.paint['text-opacity'] = feature.opacity;
            drawStyle.label.layout['text-size'] = _LabelSize2.default[feature.textSize.toUpperCase()].value;
            drawStyle.label.layout.visibility = feature.labelVisible ? 'visible' : 'none';
            drawStyle.label.layout['text-field'] = feature.title;
            drawStyle.label.coordinates = [feature.coordinates[0]];
            switch (feature.labelPosition) {
                case 'bottom':
                    drawStyle.label.paint['text-translate'] = [0, _MarkerSize2.default[feature.size.toUpperCase()].value * 0.5];
                    drawStyle.label.layout['text-anchor'] = 'center';
                    break;
                case 'top':
                    drawStyle.label.paint['text-translate'] = [0, -_MarkerSize2.default[feature.size.toUpperCase()].value * 0.5];
                    drawStyle.label.layout['text-anchor'] = 'center';
                    break;
                case 'left':
                    drawStyle.label.paint['text-translate'] = [-_MarkerSize2.default[feature.size.toUpperCase()].value * 0.4, 0];
                    drawStyle.label.layout['text-anchor'] = 'right';
                    break;
                case 'right':
                    drawStyle.label.paint['text-translate'] = [_MarkerSize2.default[feature.size.toUpperCase()].value * 0.4, 0];
                    drawStyle.label.layout['text-anchor'] = 'left';
                    break;
            }
            break;
        case 'Label':
            drawStyle.layout['text-field'] = feature.title;
            drawStyle.layout['text-size'] = _LabelSize2.default[feature.textSize.toUpperCase()].value;
            drawStyle.paint['text-color'] = feature.textColor;
            drawStyle.layout['text-rotate'] = feature.rotationAngle;
            if (feature.useFill) {
                var rgbColors = hexToRgb(feature.fillColor);
                drawStyle.paint['text-halo-color'] = 'rgba(' + rgbColors.r + ', ' + rgbColors.g + ', ' + rgbColors.b + ', 1)';
                drawStyle.paint['text-halo-width'] = feature.haloWidth;
                drawStyle.paint['text-halo-blur'] = feature.haloBlur;
            } else {
                drawStyle.paint['text-halo-color'] = '#fff';
                drawStyle.paint['text-halo-width'] = 0;
                drawStyle.paint['text-halo-blur'] = 0;
            }
            break;
        case 'FlowArrow':
            if (feature.fillColor !== undefined) drawStyle.paint['fill-color'] = feature.fillColor;
            if (feature.strokeColor !== undefined) drawStyle.paint['line-color'] = feature.strokeColor;
            if (feature.strokeWeight !== undefined) drawStyle.paint['line-width'] = _StrokeWeight2.default[feature.strokeWeight.toUpperCase()].value;
            if (feature.opacity !== undefined) {
                drawStyle.paint['line-opacity'] = feature.opacity;
                if (feature.useFill) drawStyle.paint['fill-opacity'] = feature.useFill ? feature.opacity : 0;
                drawStyle.paint['circle-opacity'] = feature.opacity;
            }
            break;
        case 'Image':
            var worldSize = 512 * Math.pow(2, feature.createdAtZoomLevel);
            var projectedTopLeft = (0, _bezier.project)({
                lng: feature.topLeftPoint[0],
                lat: feature.topLeftPoint[1]
            }, worldSize);
            var projectedBottomRight = (0, _bezier.project)({
                lng: feature.bottomRightPoint[0],
                lat: feature.bottomRightPoint[1]
            }, worldSize);
            var projectedTopRight = {
                x: projectedBottomRight.x,
                y: projectedTopLeft.y
            };
            var projectedBottomLeft = {
                x: projectedTopLeft.x,
                y: projectedBottomRight.y
            };
            var center = {
                x: (projectedTopLeft.x + projectedTopRight.x) / 2,
                y: (projectedTopLeft.y + projectedBottomLeft.y) / 2
            };

            drawStyle.url = feature.fileUrl;

            var s = Math.sin(feature.rotationAngle / 180 * Math.PI);

            var c = Math.cos(feature.rotationAngle / 180 * Math.PI);

            // Center the coordinates
            projectedTopLeft.x -= center.x;
            projectedTopLeft.y -= center.y;

            projectedBottomRight.x -= center.x;
            projectedBottomRight.y -= center.y;

            projectedTopRight.x -= center.x;
            projectedTopRight.y -= center.y;

            projectedBottomLeft.x -= center.x;
            projectedBottomLeft.y -= center.y;

            drawStyle.coordinates = [(0, _bezier.unproject)({
                x: projectedTopLeft.x * c - projectedTopLeft.y * s + center.x,
                y: projectedTopLeft.x * s + projectedTopLeft.y * c + center.y
            }, worldSize), (0, _bezier.unproject)({
                x: projectedTopRight.x * c - projectedTopRight.y * s + center.x,
                y: projectedTopRight.x * s + projectedTopRight.y * c + center.y
            }, worldSize), (0, _bezier.unproject)({
                x: projectedBottomRight.x * c - projectedBottomRight.y * s + center.x,
                y: projectedBottomRight.x * s + projectedBottomRight.y * c + center.y
            }, worldSize), (0, _bezier.unproject)({
                x: projectedBottomLeft.x * c - projectedBottomLeft.y * s + center.x,
                y: projectedBottomLeft.x * s + projectedBottomLeft.y * c + center.y
            }, worldSize)];
            break;
    }
    return drawStyle;
}

},{"../bezier":35,"../enums/LabelSize":37,"../enums/MarkerSize":38,"../enums/StrokeWeight":39,"../mapping":41}],44:[function(require,module,exports){
'use strict';

var hat = require('hat');
var Constants = require('../constants');

var Feature = function Feature(ctx, geojson) {
  this.ctx = ctx;
  this.properties = geojson.properties || {};
  this.coordinates = geojson.geometry.coordinates;
  this.id = geojson.id || hat();
  this.type = geojson.geometry.type;
  this.layers = {}; //!
};

Feature.prototype.changed = function () {
  this.ctx.store.featureChanged(this.id);
};

Feature.prototype.incomingCoords = function (coords) {
  this.setCoordinates(coords);
};

Feature.prototype.setCoordinates = function (coords) {
  this.coordinates = coords;
  this.changed();
};

Feature.prototype.getCoordinates = function () {
  return JSON.parse(JSON.stringify(this.coordinates));
};

Feature.prototype.setProperty = function (property, value) {
  this.properties[property] = value;
};

Feature.prototype.toGeoJSON = function () {
  return JSON.parse(JSON.stringify({
    id: this.id,
    type: Constants.geojsonTypes.FEATURE,
    properties: this.properties,
    geometry: {
      coordinates: this.getCoordinates(),
      type: this.type
    }
  }));
};

Feature.prototype.internal = function (mode) {
  var properties = {
    id: this.id,
    meta: Constants.meta.FEATURE,
    'meta:type': this.type,
    source_for: this.properties.source_for, //!
    bounds: this.properties.bounds, //!
    active: Constants.activeStates.INACTIVE,
    mode: mode
  };

  if (this.ctx.options.userProperties) {
    for (var name in this.properties) {
      properties['user_' + name] = this.properties[name];
    }
  }

  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: properties,
    geometry: {
      coordinates: this.getCoordinates(),
      type: this.type
    }
  };
};

module.exports = Feature;

},{"../constants":33,"hat":19}],45:[function(require,module,exports){
'use strict';

var Feature = require('./feature');

var LineString = function LineString(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

LineString.prototype = Object.create(Feature.prototype);

LineString.prototype.isValid = function () {
  return this.coordinates.length > 1;
};

LineString.prototype.addCoordinate = function (path, lng, lat) {
  this.changed();
  var id = parseInt(path, 10);
  this.coordinates.splice(id, 0, [lng, lat]);
};

LineString.prototype.getCoordinate = function (path) {
  var id = parseInt(path, 10);
  return JSON.parse(JSON.stringify(this.coordinates[id]));
};

LineString.prototype.removeCoordinate = function (path) {
  this.changed();
  this.coordinates.splice(parseInt(path, 10), 1);
};

LineString.prototype.updateCoordinate = function (path, lng, lat) {
  var id = parseInt(path, 10);
  this.coordinates[id] = [lng, lat];
  this.changed();
};

module.exports = LineString;

},{"./feature":44}],46:[function(require,module,exports){
'use strict';

var Feature = require('./feature');
var Constants = require('../constants');
var hat = require('hat');

var models = {
  MultiPoint: require('./point'),
  MultiLineString: require('./line_string'),
  MultiPolygon: require('./polygon')
};

var takeAction = function takeAction(features, action, path, lng, lat) {
  var parts = path.split('.');
  var idx = parseInt(parts[0], 10);
  var tail = !parts[1] ? null : parts.slice(1).join('.');
  return features[idx][action](tail, lng, lat);
};

var MultiFeature = function MultiFeature(ctx, geojson) {
  Feature.call(this, ctx, geojson);

  delete this.coordinates;
  this.model = models[geojson.geometry.type];
  if (this.model === undefined) throw new TypeError(geojson.geometry.type + ' is not a valid type');
  this.features = this._coordinatesToFeatures(geojson.geometry.coordinates);
};

MultiFeature.prototype = Object.create(Feature.prototype);

MultiFeature.prototype._coordinatesToFeatures = function (coordinates) {
  var _this = this;

  var Model = this.model.bind(this);
  return coordinates.map(function (coords) {
    return new Model(_this.ctx, {
      id: hat(),
      type: Constants.geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        coordinates: coords,
        type: _this.type.replace('Multi', '')
      }
    });
  });
};

MultiFeature.prototype.isValid = function () {
  return this.features.every(function (f) {
    return f.isValid();
  });
};

MultiFeature.prototype.setCoordinates = function (coords) {
  this.features = this._coordinatesToFeatures(coords);
  this.changed();
};

MultiFeature.prototype.getCoordinate = function (path) {
  return takeAction(this.features, 'getCoordinate', path);
};

MultiFeature.prototype.getCoordinates = function () {
  return JSON.parse(JSON.stringify(this.features.map(function (f) {
    if (f.type === Constants.geojsonTypes.POLYGON) return f.getCoordinates();
    return f.coordinates;
  })));
};

MultiFeature.prototype.updateCoordinate = function (path, lng, lat) {
  takeAction(this.features, 'updateCoordinate', path, lng, lat);
  this.changed();
};

MultiFeature.prototype.addCoordinate = function (path, lng, lat) {
  takeAction(this.features, 'addCoordinate', path, lng, lat);
  this.changed();
};

MultiFeature.prototype.removeCoordinate = function (path) {
  takeAction(this.features, 'removeCoordinate', path);
  this.changed();
};

MultiFeature.prototype.getFeatures = function () {
  return this.features;
};

module.exports = MultiFeature;

},{"../constants":33,"./feature":44,"./line_string":45,"./point":47,"./polygon":48,"hat":19}],47:[function(require,module,exports){
'use strict';

var Feature = require('./feature');

var Point = function Point(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

Point.prototype = Object.create(Feature.prototype);

Point.prototype.isValid = function () {
  return typeof this.coordinates[0] === 'number' && typeof this.coordinates[1] === 'number';
};

Point.prototype.updateCoordinate = function (pathOrLng, lngOrLat, lat) {
  if (arguments.length === 3) {
    this.coordinates = [lngOrLat, lat];
  } else {
    this.coordinates = [pathOrLng, lngOrLat];
  }
  this.changed();
};

Point.prototype.getCoordinate = function () {
  return this.getCoordinates();
};

module.exports = Point;

},{"./feature":44}],48:[function(require,module,exports){
'use strict';

var Feature = require('./feature');

var Polygon = function Polygon(ctx, geojson) {
  Feature.call(this, ctx, geojson);
  this.coordinates = this.coordinates.map(function (ring) {
    return ring.slice(0, -1);
  });
};

Polygon.prototype = Object.create(Feature.prototype);

Polygon.prototype.isValid = function () {
  if (this.coordinates.length === 0) return false;
  return this.coordinates.every(function (ring) {
    return ring.length > 2;
  });
};

// Expects valid geoJSON polygon geometry: first and last positions must be equivalent.
Polygon.prototype.incomingCoords = function (coords) {
  this.coordinates = coords.map(function (ring) {
    return ring.slice(0, -1);
  });
  if (this.properties.source_for === 'image') this.ctx.map.getSource('image_' + this.id).setCoordinates(coords[0].slice(0, -1)); //!
  this.changed();
};

// Does NOT expect valid geoJSON polygon geometry: first and last positions should not be equivalent.
Polygon.prototype.setCoordinates = function (coords) {
  this.coordinates = coords;
  this.changed();
};

Polygon.prototype.addCoordinate = function (path, lng, lat) {
  this.changed();
  var ids = path.split('.').map(function (x) {
    return parseInt(x, 10);
  });

  var ring = this.coordinates[ids[0]];

  ring.splice(ids[1], 0, [lng, lat]);
};

Polygon.prototype.removeCoordinate = function (path) {
  this.changed();
  var ids = path.split('.').map(function (x) {
    return parseInt(x, 10);
  });
  var ring = this.coordinates[ids[0]];
  if (ring) {
    ring.splice(ids[1], 1);
    if (ring.length < 3) {
      this.coordinates.splice(ids[0], 1);
    }
  }
};

Polygon.prototype.getCoordinate = function (path) {
  var ids = path.split('.').map(function (x) {
    return parseInt(x, 10);
  });
  var ring = this.coordinates[ids[0]];
  return JSON.parse(JSON.stringify(ring[ids[1]]));
};

Polygon.prototype.getCoordinates = function () {
  return this.coordinates.map(function (coords) {
    return coords.concat([coords[0]]);
  });
};

Polygon.prototype.updateCoordinate = function (path, lng, lat) {
  this.changed();
  var parts = path.split('.');
  var ringId = parseInt(parts[0], 10);
  var coordId = parseInt(parts[1], 10);

  if (this.coordinates[ringId] === undefined) {
    this.coordinates[ringId] = [];
  }

  this.coordinates[ringId][coordId] = [lng, lat];
};

module.exports = Polygon;

},{"./feature":44}],49:[function(require,module,exports){
'use strict';

var Constants = require('../constants');

module.exports = {
  isOfMetaType: function isOfMetaType(type) {
    return function (e) {
      var featureTarget = e.featureTarget;
      if (!featureTarget) return false;
      if (!featureTarget.properties) return false;
      return featureTarget.properties.meta === type;
    };
  },
  isShiftMousedown: function isShiftMousedown(e) {
    if (!e.originalEvent) return false;
    if (!e.originalEvent.shiftKey) return false;
    return e.originalEvent.button === 0;
  },
  isActiveFeature: function isActiveFeature(e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.active === Constants.activeStates.ACTIVE && e.featureTarget.properties.meta === Constants.meta.FEATURE;
  },
  isInactiveFeature: function isInactiveFeature(e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.active === Constants.activeStates.INACTIVE && e.featureTarget.properties.meta === Constants.meta.FEATURE;
  },
  noTarget: function noTarget(e) {
    return e.featureTarget === undefined;
  },
  isFeature: function isFeature(e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.meta === Constants.meta.FEATURE;
  },
  isVertex: function isVertex(e) {
    var featureTarget = e.featureTarget;
    if (!featureTarget) return false;
    if (!featureTarget.properties) return false;
    return featureTarget.properties.meta === Constants.meta.VERTEX;
  },
  isShiftDown: function isShiftDown(e) {
    if (!e.originalEvent) return false;
    return e.originalEvent.shiftKey === true;
  },
  isEscapeKey: function isEscapeKey(e) {
    return e.keyCode === 27;
  },
  isEnterKey: function isEnterKey(e) {
    return e.keyCode === 13;
  },
  true: function _true() {
    return true;
  }
};

},{"../constants":33}],50:[function(require,module,exports){
'use strict';

var extent = require('geojson-extent');
var Constants = require('../constants');

var LAT_MIN = Constants.LAT_MIN,
    LAT_MAX = Constants.LAT_MAX,
    LAT_RENDERED_MIN = Constants.LAT_RENDERED_MIN,
    LAT_RENDERED_MAX = Constants.LAT_RENDERED_MAX,
    LNG_MIN = Constants.LNG_MIN,
    LNG_MAX = Constants.LNG_MAX;

// Ensure that we do not drag north-south far enough for
// - any part of any feature to exceed the poles
// - any feature to be completely lost in the space between the projection's
//   edge and the poles, such that it couldn't be re-selected and moved back

module.exports = function (geojsonFeatures, delta, ctx) {
  // "inner edge" = a feature's latitude closest to the equator
  var northInnerEdge = LAT_MIN;
  var southInnerEdge = LAT_MAX;
  // "outer edge" = a feature's latitude furthest from the equator
  var northOuterEdge = LAT_MIN;
  var southOuterEdge = LAT_MAX;

  var westEdge = LNG_MAX;
  var eastEdge = LNG_MIN;

  geojsonFeatures.forEach(function (feature) {
    var bounds = extent(feature);
    var featureSouthEdge = bounds[1];
    var featureNorthEdge = bounds[3];
    var featureWestEdge = bounds[0];
    var featureEastEdge = bounds[2];
    if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
    if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
    if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
    if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
    if (featureWestEdge < westEdge) westEdge = featureWestEdge;
    if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
  });

  // These changes are not mutually exclusive: we might hit the inner
  // edge but also have hit the outer edge and therefore need
  // another readjustment
  var constrainedDelta = delta;
  if (ctx) {
    var northInnerEdgeXy = ctx.map.project([0, northInnerEdge]);
    var northOuterEdgeXy = ctx.map.project([0, northOuterEdge]);
    var LAT_RENDERED_MAX_XY = ctx.map.project([0, LAT_RENDERED_MAX]);
    var LAT_MAX_XY = ctx.map.project([0, 85.05]);
    var southInnerEdgeXy = ctx.map.project([0, southInnerEdge]);
    var southOuterEdgeXy = ctx.map.project([0, southOuterEdge]);
    var LAT_RENDERED_MIN_XY = ctx.map.project([0, LAT_RENDERED_MIN]);
    var LAT_MIN_XY = ctx.map.project([0, -85.05]);
    if (northInnerEdgeXy.y + constrainedDelta.y < LAT_RENDERED_MAX_XY.y) {
      constrainedDelta.y = northInnerEdgeXy.y;
    }
    if (northOuterEdgeXy.y + constrainedDelta.y < LAT_MAX_XY.y) {
      constrainedDelta.y = northOuterEdgeXy.y;
    }
    if (southInnerEdgeXy.y + constrainedDelta.y > LAT_RENDERED_MIN_XY.y) {
      constrainedDelta.y = LAT_RENDERED_MIN_XY.y - southInnerEdgeXy.y;
    }
    if (southOuterEdgeXy.y + constrainedDelta.y > LAT_MIN_XY.y) {
      constrainedDelta.y = LAT_MIN_XY.y - southOuterEdgeXy.y;
    }
  } else {
    constrainedDelta = delta;
    if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX) {
      constrainedDelta.lat = LAT_RENDERED_MAX - northInnerEdge;
    }
    if (northOuterEdge + constrainedDelta.lat > LAT_MAX) {
      constrainedDelta.lat = LAT_MAX - northOuterEdge;
    }
    if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN) {
      constrainedDelta.lat = LAT_RENDERED_MIN - southInnerEdge;
    }
    if (southOuterEdge + constrainedDelta.lat < LAT_MIN) {
      constrainedDelta.lat = LAT_MIN - southOuterEdge;
    }
    if (westEdge + constrainedDelta.lng <= LNG_MIN) {
      constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
    }
    if (eastEdge + constrainedDelta.lng >= LNG_MAX) {
      constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
    }
  }

  return constrainedDelta;
};

},{"../constants":33,"geojson-extent":7}],51:[function(require,module,exports){
'use strict';

var Constants = require('../constants');

module.exports = function (parent, startVertex, endVertex, map) {
  var startCoord = startVertex.geometry.coordinates;
  var endCoord = endVertex.geometry.coordinates;

  // If a coordinate exceeds the projection, we can't calculate a midpoint,
  // so run away
  if (startCoord[1] > Constants.LAT_RENDERED_MAX || startCoord[1] < Constants.LAT_RENDERED_MIN || endCoord[1] > Constants.LAT_RENDERED_MAX || endCoord[1] < Constants.LAT_RENDERED_MIN) {
    return null;
  }

  var ptA = map.project([startCoord[0], startCoord[1]]);
  var ptB = map.project([endCoord[0], endCoord[1]]);
  var mid = map.unproject([(ptA.x + ptB.x) / 2, (ptA.y + ptB.y) / 2]);

  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: {
      meta: Constants.meta.MIDPOINT,
      parent: parent,
      lng: mid.lng,
      lat: mid.lat,
      coord_path: endVertex.properties.coord_path
    },
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates: [mid.lng, mid.lat]
    }
  };
};

},{"../constants":33}],52:[function(require,module,exports){
'use strict';

var createVertex = require('./create_vertex');
var createMidpoint = require('./create_midpoint');
var Constants = require('../constants');

function createSupplementaryPoints(geojson) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var basePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var _geojson$geometry = geojson.geometry,
      type = _geojson$geometry.type,
      coordinates = _geojson$geometry.coordinates;

  var featureId = geojson.properties && geojson.properties.id;

  var supplementaryPoints = [];

  if (type === Constants.geojsonTypes.POINT) {
    // For points, just create a vertex
    supplementaryPoints.push(createVertex(featureId, coordinates, basePath, isSelectedPath(basePath)));
  } else if (type === Constants.geojsonTypes.POLYGON) {
    // Cycle through a Polygon's rings and
    // process each line
    coordinates.forEach(function (line, lineIndex) {
      processLine(line, basePath !== null ? basePath + '.' + lineIndex : String(lineIndex));
    });
  } else if (type === Constants.geojsonTypes.LINE_STRING) {
    processLine(coordinates, basePath);
  } else if (type.indexOf(Constants.geojsonTypes.MULTI_PREFIX) === 0) {
    processMultiGeometry();
  }

  function processLine(line, lineBasePath) {
    var firstPointString = '';
    var lastVertex = null;
    line.forEach(function (point, pointIndex) {
      var pointPath = lineBasePath !== undefined && lineBasePath !== null ? lineBasePath + '.' + pointIndex : String(pointIndex);
      var vertex = createVertex(featureId, point, pointPath, isSelectedPath(pointPath));

      // If we're creating midpoints, check if there was a
      // vertex before this one. If so, add a midpoint
      // between that vertex and this one.
      if (options.midpoints && lastVertex) {
        var midpoint = createMidpoint(featureId, lastVertex, vertex, options.map);
        if (midpoint) {
          supplementaryPoints.push(midpoint);
        }
      }
      lastVertex = vertex;

      // A Polygon line's last point is the same as the first point. If we're on the last
      // point, we want to draw a midpoint before it but not another vertex on it
      // (since we already a vertex there, from the first point).
      var stringifiedPoint = JSON.stringify(point);
      if (firstPointString !== stringifiedPoint) {
        supplementaryPoints.push(vertex);
      }
      if (pointIndex === 0) {
        firstPointString = stringifiedPoint;
      }
    });
  }

  function isSelectedPath(path) {
    if (!options.selectedPaths) return false;
    return options.selectedPaths.indexOf(path) !== -1;
  }

  // Split a multi-geometry into constituent
  // geometries, and accumulate the supplementary points
  // for each of those constituents
  function processMultiGeometry() {
    var subType = type.replace(Constants.geojsonTypes.MULTI_PREFIX, '');
    coordinates.forEach(function (subCoordinates, index) {
      var subFeature = {
        type: Constants.geojsonTypes.FEATURE,
        properties: geojson.properties,
        geometry: {
          type: subType,
          coordinates: subCoordinates
        }
      };
      supplementaryPoints = supplementaryPoints.concat(createSupplementaryPoints(subFeature, options, index));
    });
  }

  return supplementaryPoints;
}

module.exports = createSupplementaryPoints;

},{"../constants":33,"./create_midpoint":51,"./create_vertex":53}],53:[function(require,module,exports){
'use strict';

var Constants = require('../constants');

/**
 * Returns GeoJSON for a Point representing the
 * vertex of another feature.
 *
 * @param {string} parentId
 * @param {Array<number>} coordinates
 * @param {string} path - Dot-separated numbers indicating exactly
 *   where the point exists within its parent feature's coordinates.
 * @param {boolean} selected
 * @return {GeoJSON} Point
 */
module.exports = function (parentId, coordinates, path, selected) {
  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: {
      meta: Constants.meta.VERTEX,
      parent: parentId,
      coord_path: path,
      active: selected ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE
    },
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates: coordinates
    }
  };
};

},{"../constants":33}],54:[function(require,module,exports){
"use strict";

module.exports = {
  enable: function enable(ctx) {
    setTimeout(function () {
      if (!ctx.map || !ctx.map.doubleClickZoom) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
  disable: function disable(ctx) {
    setTimeout(function () {
      if (!ctx.map || !ctx.map.doubleClickZoom) return;
      ctx.map.doubleClickZoom.disable();
    }, 0);
  }
};

},{}],55:[function(require,module,exports){
"use strict";

module.exports = {
  enable: function enable(ctx) {
    setTimeout(function () {
      if (!ctx.map || !ctx.map.dragPan) return;
      ctx.map.dragPan.enable();
    }, 0);
  },
  disable: function disable(ctx) {
    setTimeout(function () {
      if (!ctx.map || !ctx.map.dragPan) return;
      ctx.map.dragPan.disable();
    }, 0);
  }
};

},{}],56:[function(require,module,exports){
"use strict";

module.exports = function (a, b) {
  var x = a.x - b.x;
  var y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
};

},{}],57:[function(require,module,exports){
'use strict';

var sortFeatures = require('./sort_features');
var mapEventToBoundingBox = require('./map_event_to_bounding_box');
var Constants = require('../constants');
var StringSet = require('./string_set');

var META_TYPES = [Constants.meta.FEATURE, Constants.meta.MIDPOINT, Constants.meta.VERTEX];

// Requires either event or bbox
module.exports = function (event, bbox, ctx) {
  if (ctx.map === null) return [];

  var box = event ? mapEventToBoundingBox(event, ctx.options.clickBuffer) : bbox;

  var queryParams = {};
  if (ctx.options.styles) queryParams.layers = ctx.options.styles.map(function (s) {
    return s.id;
  });

  var features = ctx.map.queryRenderedFeatures(box, queryParams).filter(function (feature) {
    return META_TYPES.indexOf(feature.properties.meta) !== -1;
  });

  var featureIds = new StringSet();
  var uniqueFeatures = [];
  features.forEach(function (feature) {
    var featureId = feature.properties.id;
    if (featureIds.has(featureId)) return;
    featureIds.add(featureId);
    uniqueFeatures.push(feature);
  });

  return sortFeatures(uniqueFeatures);
};

},{"../constants":33,"./map_event_to_bounding_box":61,"./sort_features":65,"./string_set":66}],58:[function(require,module,exports){
'use strict';

var featuresAt = require('./features_at');
var Constants = require('../constants');

module.exports = function getFeatureAtAndSetCursors(event, ctx) {
  var features = featuresAt(event, null, ctx);
  var classes = { mouse: Constants.cursors.NONE };

  if (features[0]) {
    classes.mouse = features[0].properties.active === Constants.activeStates.ACTIVE ? Constants.cursors.MOVE : Constants.cursors.POINTER;
    classes.feature = features[0].properties.meta;
  }

  if (ctx.events.currentModeName().indexOf('draw') !== -1) {
    classes.mouse = Constants.cursors.ADD;
  }

  ctx.ui.queueMapClasses(classes);
  ctx.ui.updateMapClasses();

  return features[0];
};

},{"../constants":33,"./features_at":57}],59:[function(require,module,exports){
'use strict';

var euclideanDistance = require('./euclidean_distance');

var FINE_TOLERANCE = 4;
var GROSS_TOLERANCE = 12;
var INTERVAL = 500;

module.exports = function isClick(start, end) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var fineTolerance = options.fineTolerance != null ? options.fineTolerance : FINE_TOLERANCE;
  var grossTolerance = options.grossTolerance != null ? options.grossTolerance : GROSS_TOLERANCE;
  var interval = options.interval != null ? options.interval : INTERVAL;

  start.point = start.point || end.point;
  start.time = start.time || end.time;
  var moveDistance = euclideanDistance(start.point, end.point);

  return moveDistance < fineTolerance || moveDistance < grossTolerance && end.time - start.time < interval;
};

},{"./euclidean_distance":56}],60:[function(require,module,exports){
"use strict";

function isEventAtCoordinates(event, coordinates) {
  if (!event.lngLat) return false;
  return event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1];
}

module.exports = isEventAtCoordinates;

},{}],61:[function(require,module,exports){
"use strict";

/**
 * Returns a bounding box representing the event's location.
 *
 * @param {Event} mapEvent - Mapbox GL JS map event, with a point properties.
 * @return {Array<Array<number>>} Bounding box.
 */
function mapEventToBoundingBox(mapEvent) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return [[mapEvent.point.x - buffer, mapEvent.point.y - buffer], [mapEvent.point.x + buffer, mapEvent.point.y + buffer]];
}

module.exports = mapEventToBoundingBox;

},{}],62:[function(require,module,exports){
'use strict';

var ModeHandler = function ModeHandler(mode, DrawContext) {

  var handlers = {
    drag: [],
    click: [],
    mousemove: [],
    mousedown: [],
    mouseup: [],
    mouseout: [],
    keydown: [],
    keyup: []
  };

  var ctx = {
    on: function on(event, selector, fn) {
      if (handlers[event] === undefined) {
        throw new Error('Invalid event type: ' + event);
      }
      handlers[event].push({
        selector: selector,
        fn: fn
      });
    },
    render: function render(id) {
      DrawContext.store.featureChanged(id);
    }
  };

  var delegate = function delegate(eventName, event) {
    var handles = handlers[eventName];
    var iHandle = handles.length;
    while (iHandle--) {
      var handle = handles[iHandle];
      if (handle.selector(event)) {
        handle.fn.call(ctx, event);
        DrawContext.store.render();
        DrawContext.ui.updateMapClasses();

        // ensure an event is only handled once
        // we do this to let modes have multiple overlapping selectors
        // and relay on order of oppertations to filter
        break;
      }
    }
  };

  mode.start.call(ctx);

  return {
    render: mode.render,
    stop: function stop() {
      if (mode.stop) mode.stop();
    },
    trash: function trash() {
      if (mode.trash) {
        mode.trash();
        DrawContext.store.render();
      }
    },
    combineFeatures: function combineFeatures() {
      if (mode.combineFeatures) {
        mode.combineFeatures();
      }
    },
    uncombineFeatures: function uncombineFeatures() {
      if (mode.uncombineFeatures) {
        mode.uncombineFeatures();
      }
    },
    drag: function drag(event) {
      delegate('drag', event);
    },
    click: function click(event) {
      delegate('click', event);
    },
    mousemove: function mousemove(event) {
      delegate('mousemove', event);
    },
    mousedown: function mousedown(event) {
      delegate('mousedown', event);
    },
    mouseup: function mouseup(event) {
      delegate('mouseup', event);
    },
    mouseout: function mouseout(event) {
      delegate('mouseout', event);
    },
    keydown: function keydown(event) {
      delegate('keydown', event);
    },
    keyup: function keyup(event) {
      delegate('keyup', event);
    }
  };
};

module.exports = ModeHandler;

},{}],63:[function(require,module,exports){
'use strict';

var Point = require('point-geometry');

/**
 * Returns a Point representing a mouse event's position
 * relative to a containing element.
 *
 * @param {MouseEvent} mouseEvent
 * @param {Node} container
 * @returns {Point}
 */
function mouseEventPoint(mouseEvent, container) {
  var rect = container.getBoundingClientRect();
  return new Point(mouseEvent.clientX - rect.left - container.clientLeft, mouseEvent.clientY - rect.top - container.clientTop);
}

module.exports = mouseEventPoint;

},{"point-geometry":21}],64:[function(require,module,exports){
'use strict';

var constrainFeatureMovement = require('./constrain_feature_movement');
var Constants = require('../constants');

module.exports = function (features, delta, ctx, xyDelta) {

  var constrainedDelta = constrainFeatureMovement(features.map(function (feature) {
    return feature.toGeoJSON();
  }), delta);
  features.forEach(function (feature) {

    var currentCoordinates = feature.getCoordinates();

    var moveCoordinate = function moveCoordinate(coord) {
      var point = {
        lng: coord[0] + constrainedDelta.lng,
        lat: coord[1] + constrainedDelta.lat
      };
      return [point.lng, point.lat];
    };
    var moveRing = function moveRing(ring) {
      return ring.map(function (coord) {
        return moveCoordinate(coord);
      });
    };
    var moveMultiPolygon = function moveMultiPolygon(multi) {
      return multi.map(function (ring) {
        return moveRing(ring);
      });
    };

    var nextCoordinates = void 0;
    if (feature.type === Constants.geojsonTypes.POINT) {
      nextCoordinates = moveCoordinate(currentCoordinates);
    } else if (feature.type === Constants.geojsonTypes.LINE_STRING || feature.type === Constants.geojsonTypes.MULTI_POINT) {
      nextCoordinates = currentCoordinates.map(moveCoordinate);
    } else if (feature.type === Constants.geojsonTypes.POLYGON || feature.type === Constants.geojsonTypes.MULTI_LINE_STRING) {
      if (feature.properties.source_for === 'image') {
        (function () {
          //!
          //! Move the polygon through regular XY coordinates instead of Lat/Lon, because Lat/Lon coordinates are not
          //! equally distributed through space, which leads to distortion when features are moved.
          var constrainedDeltaXy = constrainFeatureMovement(features.map(function (feature) {
            return feature.toGeoJSON();
          }), xyDelta, ctx); //!
          var flag = 0; //!
          var moveXy = function moveXy(xy) {
            //!
            var projected = ctx.map.project(xy); //!
            projected.x += constrainedDeltaXy.x; //!
            projected.y += constrainedDeltaXy.y; //!
            var unprojected = ctx.map.unproject(projected).toArray(); //!
            if (unprojected[0] < -270) flag = 1; //!
            else if (unprojected[0] > 270) flag = -1; //!
            return unprojected; //!
          }; //!
          var moveRingXy = function moveRingXy(ring) {
            return ring.map(function (xy) {
              return moveXy(xy);
            });
          }; //!
          nextCoordinates = currentCoordinates.map(moveRingXy); //!
          if (flag) {
            //!
            nextCoordinates[0].forEach(function (c) {
              return c[0] += flag * 360;
            }); //!
          } //!
        })();
      } else if (feature.properties.source_for === 'hotspot') {
        //!
        var topLeftCornerLine = ctx.store.get(feature.id + '_topLeft'); //!
        var topRightCornerLine = ctx.store.get(feature.id + '_topRight'); //!
        var bottomRightCornerLine = ctx.store.get(feature.id + '_bottomRight'); //!
        var bottomLiftCornerLine = ctx.store.get(feature.id + '_bottomLeft'); //!


        topLeftCornerLine.incomingCoords(topLeftCornerLine.getCoordinates().map(moveCoordinate)); //!
        topRightCornerLine.incomingCoords(topRightCornerLine.getCoordinates().map(moveCoordinate)); //!
        bottomRightCornerLine.incomingCoords(bottomRightCornerLine.getCoordinates().map(moveCoordinate)); //!
        bottomLiftCornerLine.incomingCoords(bottomLiftCornerLine.getCoordinates().map(moveCoordinate)); //!

        nextCoordinates = currentCoordinates.map(moveRing); //!
        feature.properties.bounds = [[nextCoordinates[6]], [nextCoordinates[2]]]; //!
      } else {
        //!
        nextCoordinates = currentCoordinates.map(moveRing);
      } //!
    } else if (feature.type === Constants.geojsonTypes.MULTI_POLYGON) {
      nextCoordinates = currentCoordinates.map(moveMultiPolygon);
    }
    feature.incomingCoords(nextCoordinates);
  });
};

},{"../constants":33,"./constrain_feature_movement":50}],65:[function(require,module,exports){
'use strict';

var area = require('geojson-area');
var Constants = require('../constants');

var FEATURE_SORT_RANKS = {
  Point: 0,
  LineString: 1,
  Polygon: 2
};

function comparator(a, b) {
  var score = FEATURE_SORT_RANKS[a.geometry.type] - FEATURE_SORT_RANKS[b.geometry.type];

  if (score === 0 && a.geometry.type === Constants.geojsonTypes.POLYGON) {
    return a.area - b.area;
  }

  return score;
}

// Sort in the order above, then sort polygons by area ascending.
function sortFeatures(features) {
  return features.map(function (feature) {
    if (feature.geometry.type === Constants.geojsonTypes.POLYGON) {
      feature.area = area.geometry({
        type: Constants.geojsonTypes.FEATURE,
        property: {},
        geometry: feature.geometry
      });
    }
    return feature;
  }).sort(comparator).map(function (feature) {
    delete feature.area;
    return feature;
  });
}

module.exports = sortFeatures;

},{"../constants":33,"geojson-area":5}],66:[function(require,module,exports){
"use strict";

function StringSet(items) {
  this._items = {};
  this._length = items ? items.length : 0;
  if (!items) return;
  for (var i = 0, l = items.length; i < l; i++) {
    if (items[i] === undefined) continue;
    this._items[items[i]] = i;
  }
}

StringSet.prototype.add = function (x) {
  this._length = this._items[x] ? this._length : this._length + 1;
  this._items[x] = this._items[x] ? this._items[x] : this._length;
  return this;
};

StringSet.prototype.delete = function (x) {
  this._length = this._items[x] ? this._length - 1 : this._length;
  delete this._items[x];
  return this;
};

StringSet.prototype.has = function (x) {
  return this._items[x] !== undefined;
};

StringSet.prototype.values = function () {
  var _this = this;

  var orderedKeys = Object.keys(this._items).sort(function (a, b) {
    return _this._items[a] - _this._items[b];
  });
  return orderedKeys;
};

StringSet.prototype.clear = function () {
  this._length = 0;
  this._items = {};
  return this;
};

module.exports = StringSet;

},{}],67:[function(require,module,exports){
"use strict";

module.exports = function (a, b) {
  if (a.length !== b.length) return false;
  return JSON.stringify(a.map(function (id) {
    return id;
  }).sort()) === JSON.stringify(b.map(function (id) {
    return id;
  }).sort());
};

},{}],68:[function(require,module,exports){
'use strict';

module.exports = [{
  'id': 'gl-draw-polygon-fill-inactive',
  'type': 'fill',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
  'paint': {
    'fill-color': '#3bb2d0',
    'fill-outline-color': '#3bb2d0',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-fill-active',
  'type': 'fill',
  'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
  'paint': {
    'fill-color': '#fbb03b',
    'fill-outline-color': '#fbb03b',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-midpoint',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-polygon-stroke-inactive',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#3bb2d0',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-polygon-stroke-active',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#fbb03b',
    'line-dasharray': [0.2, 2],
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-inactive',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#3bb2d0',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-active',
  'type': 'line',
  'filter': ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#fbb03b',
    'line-dasharray': [0.2, 2],
    'line-width': 2
  }
}, {
  'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-polygon-and-line-vertex-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-point-point-stroke-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 5,
    'circle-opacity': 1,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-point-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#3bb2d0'
  }
}, {
  'id': 'gl-draw-point-stroke-active',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['==', 'active', 'true'], ['!=', 'meta', 'midpoint']],
  'paint': {
    'circle-radius': 7,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-point-active',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['!=', 'meta', 'midpoint'], ['==', 'active', 'true']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-polygon-fill-static',
  'type': 'fill',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
  'paint': {
    'fill-color': '#404040',
    'fill-outline-color': '#404040',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-stroke-static',
  'type': 'line',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#404040',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-static',
  'type': 'line',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#404040',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-point-static',
  'type': 'circle',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#404040'
  }
}];

},{}],69:[function(require,module,exports){
"use strict";

function throttle(fn, time, context) {
  var lock = void 0,
      args = void 0;

  function later() {
    // reset lock and call if queued
    lock = false;
    if (args) {
      wrapperFn.apply(context, args);
      args = false;
    }
  }

  function wrapperFn() {
    if (lock) {
      // called too soon, queue to call later
      args = arguments;
    } else {
      // lock until later then call
      lock = true;
      fn.apply(context, arguments);
      setTimeout(later, time);
    }
  }

  return wrapperFn;
}

module.exports = throttle;

},{}],70:[function(require,module,exports){
"use strict";

/**
 * Derive a dense array (no `undefined`s) from a single value or array.
 *
 * @param {any} x
 * @return {Array<any>}
 */
function toDenseArray(x) {
  return [].concat(x).filter(function (y) {
    return y !== undefined;
  });
}

module.exports = toDenseArray;

},{}],71:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require('../lib/common_selectors'),
    noTarget = _require.noTarget,
    isOfMetaType = _require.isOfMetaType,
    isInactiveFeature = _require.isInactiveFeature,
    isShiftDown = _require.isShiftDown;

var createSupplementaryPoints = require('../lib/create_supplementary_points');
var constrainFeatureMovement = require('../lib/constrain_feature_movement');
var doubleClickZoom = require('../lib/double_click_zoom');
var Constants = require('../constants');
var CommonSelectors = require('../lib/common_selectors');
var moveFeatures = require('../lib/move_features');
var euclideanDistance = require('../lib/euclidean_distance');

var isVertex = isOfMetaType(Constants.meta.VERTEX);
var isMidpoint = isOfMetaType(Constants.meta.MIDPOINT);

module.exports = function (ctx, opts) {
  var featureId = opts.featureId;
  var feature = ctx.store.get(featureId);
  var dragFeature = opts.dragFeature || true;

  if (!feature) {
    throw new Error('You must provide a featureId to enter direct_select mode');
  }

  if (feature.type === Constants.geojsonTypes.POINT) {
    throw new TypeError('direct_select mode doesn\'t handle point features');
  }

  var dragMoveLocation = opts.startPos || null;
  var dragMoving = false;
  var canDragMove = false;
  var xyDragMoveLocation = void 0; //!
  var dragMode = null; //!
  var selectedCoordPaths = opts.coordPath ? [opts.coordPath] : [];
  var selectedCoordinates = pathsToCoordinates(featureId, selectedCoordPaths);
  ctx.store.setSelectedCoordinates(selectedCoordinates);

  var fireUpdate = function fireUpdate() {
    ctx.map.fire(Constants.events.UPDATE, {
      action: Constants.updateActions.CHANGE_COORDINATES,
      features: ctx.store.getSelected().map(function (f) {
        return f.toGeoJSON();
      })
    });
  };

  var fireActionable = function fireActionable() {
    return ctx.events.actionable({
      combineFeatures: false,
      uncombineFeatures: false,
      trash: selectedCoordPaths.length > 0
    });
  };

  var startDragging = function startDragging(e) {
    ctx.map.dragPan.disable();
    canDragMove = true;
    dragMoveLocation = e.lngLat;
    xyDragMoveLocation = e.originalEvent;
  };

  var stopDragging = function stopDragging() {
    ctx.map.dragPan.enable();
    dragMoving = false;
    canDragMove = false;
    dragMoveLocation = null;
  };

  var onVertex = function onVertex(e) {
    startDragging(e);
    dragMode = 'vertex';
    var about = e.featureTarget.properties;
    var selectedIndex = selectedCoordPaths.indexOf(about.coord_path);
    if (!isShiftDown(e) && selectedIndex === -1) {
      selectedCoordPaths = [about.coord_path];
    } else if (isShiftDown(e) && selectedIndex === -1) {
      selectedCoordPaths.push(about.coord_path);
    }
    var selectedCoordinates = pathsToCoordinates(featureId, selectedCoordPaths);
    ctx.store.setSelectedCoordinates(selectedCoordinates);
    feature.changed();
  };

  var onMidpoint = function onMidpoint(e) {
    startDragging(e);
    dragMode = 'midpoint';
    var about = e.featureTarget.properties;
    feature.addCoordinate(about.coord_path, about.lng, about.lat);
    fireUpdate();
    selectedCoordPaths = [about.coord_path];
  };

  function pathsToCoordinates(featureId, paths) {
    return paths.map(function (coord_path) {
      return { feature_id: featureId, coord_path: coord_path, coordinates: feature.getCoordinate(coord_path) };
    });
  }

  var onFeature = function onFeature(e) {
    if (selectedCoordPaths.length === 0) startDragging(e);else stopDragging();
  };

  return {
    start: function start() {
      ctx.store.setSelected(featureId);
      doubleClickZoom.disable(ctx);

      // On mousemove that is not a drag, stop vertex movement.
      this.on('mousemove', CommonSelectors.true, function (e) {
        var isFeature = CommonSelectors.isActiveFeature(e);
        var onVertex = isVertex(e);
        var noCoords = selectedCoordPaths.length === 0;
        if (isFeature && noCoords) ctx.ui.queueMapClasses({ mouse: Constants.cursors.MOVE });else if (onVertex && !noCoords) ctx.ui.queueMapClasses({ mouse: Constants.cursors.MOVE });else ctx.ui.queueMapClasses({ mouse: Constants.cursors.NONE });
        stopDragging(e);
      });

      // As soon as you mouse leaves the canvas, update the feature
      this.on('mouseout', function () {
        return dragMoving;
      }, fireUpdate);

      this.on('mousedown', isVertex, onVertex);
      this.on('mousedown', CommonSelectors.isActiveFeature, onFeature);
      this.on('mousedown', isMidpoint, onMidpoint);

      if (dragFeature) {

        this.on('mousedown', CommonSelectors.isActiveFeature, function (e) {
          dragMode = 'feature';

          startDragging(e);
          dragMoving = false;

          this.render(e.featureTarget.properties.id);
        });
      }

      this.on('drag', function () {
        return canDragMove;
      }, function (e) {
        if (dragFeature && dragMode === 'feature') {

          dragMoving = true;
          e.originalEvent.stopPropagation();

          var delta = {
            lng: e.lngLat.lng - dragMoveLocation.lng,
            lat: e.lngLat.lat - dragMoveLocation.lat
          };

          var xyDelta = { //!
            x: e.originalEvent.x - xyDragMoveLocation.x, //!
            y: e.originalEvent.y - xyDragMoveLocation.y //!
          }; //!

          moveFeatures(ctx.store.getSelected(), delta, ctx, xyDelta);

          dragMoveLocation = e.lngLat;
          xyDragMoveLocation = e.originalEvent; //!
        } else {

          dragMoving = true;
          e.originalEvent.stopPropagation();

          var selectedCoords = selectedCoordPaths.map(function (coord_path) {
            return feature.getCoordinate(coord_path);
          });
          var selectedCoordPoints = selectedCoords.map(function (coords) {
            return {
              type: Constants.geojsonTypes.FEATURE,
              properties: {},
              geometry: {
                type: Constants.geojsonTypes.POINT,
                coordinates: coords
              }
            };
          });

          if (feature.properties.source_for === 'image') {
            //!
            var projectedCoordinates = feature.getCoordinates()[0].map(function (c) {
              return ctx.map.project(c);
            }); //!
            var topLeftCorner = projectedCoordinates[0]; //!
            var topRightCorner = projectedCoordinates[1]; //!
            var bottomRightCorner = projectedCoordinates[2]; //!

            var width = euclideanDistance(topLeftCorner, topRightCorner);

            var center = { //!
              x: (topLeftCorner.x + bottomRightCorner.x) / 2, //!
              y: (bottomRightCorner.y + topLeftCorner.y) / 2 //!
            }; //!

            var rotAngle = Math.atan2(topRightCorner.x - topLeftCorner.x, topRightCorner.y - topLeftCorner.y); //!

            var rotAngleDegrees = 90 - rotAngle / Math.PI * 180; //!
            rotAngleDegrees = rotAngleDegrees <= 270 && rotAngleDegrees > 180 ? rotAngleDegrees - 360 : rotAngleDegrees; //!

            var oldRadius = euclideanDistance(topLeftCorner, center); //!
            var newRadius = euclideanDistance(center, e.originalEvent); //!

            var slope = (topLeftCorner.y - center.y) / (topLeftCorner.x - center.x); //!
            var angle = Math.atan(slope); //!
            var radiusDifference = newRadius - oldRadius; //!
            var scaledTopLeft = void 0; //!
            var scaledBottomRight = void 0; //!
            var degrees = angle / Math.PI * 180; //!

            // TODO reduce this ifology to few math expressions...

            if (rotAngleDegrees >= 0 && rotAngleDegrees <= 90) {
              //!
              if (degrees >= 0 && degrees <= 90) {
                //!
                scaledTopLeft = {
                  x: topLeftCorner.x - radiusDifference * Math.cos(angle), //!
                  y: topLeftCorner.y - radiusDifference * Math.sin(angle) }; //!

                scaledBottomRight = { //!
                  x: bottomRightCorner.x + radiusDifference * Math.cos(angle), //!
                  y: bottomRightCorner.y + radiusDifference * Math.sin(angle) }; //!
              } else if (degrees < 0 && degrees >= -90) {
                //!
                scaledTopLeft = { //!
                  x: topLeftCorner.x + radiusDifference * Math.cos(angle), //!
                  y: topLeftCorner.y + radiusDifference * Math.sin(angle) }; //!

                scaledBottomRight = { //!
                  x: bottomRightCorner.x - radiusDifference * Math.cos(angle), //!
                  y: bottomRightCorner.y - radiusDifference * Math.sin(angle) }; //!
              } //!
            } else if (rotAngleDegrees <= 180 && rotAngleDegrees > 90) {
              //!
              if (degrees >= 0 && degrees <= 90) {
                //!
                scaledTopLeft = { //!
                  x: topLeftCorner.x + radiusDifference * Math.cos(angle), //!
                  y: topLeftCorner.y + radiusDifference * Math.sin(angle) }; //!

                scaledBottomRight = { //!
                  x: bottomRightCorner.x - radiusDifference * Math.cos(angle), //!
                  y: bottomRightCorner.y - radiusDifference * Math.sin(angle) }; //!
              } else if (degrees < 0 && degrees >= -90) {
                //!
                scaledTopLeft = { //!
                  x: topLeftCorner.x + radiusDifference * Math.cos(angle), //!
                  y: topLeftCorner.y + radiusDifference * Math.sin(angle) }; //!

                scaledBottomRight = { //!
                  x: bottomRightCorner.x - radiusDifference * Math.cos(angle), //!
                  y: bottomRightCorner.y - radiusDifference * Math.sin(angle) }; //!
              } //!
            } else if (rotAngleDegrees >= -180 && rotAngleDegrees < -90) {
              //!
              if (degrees >= 0 && degrees <= 90) {
                //!
                scaledTopLeft = { //!
                  x: topLeftCorner.x + radiusDifference * Math.cos(angle), //!
                  y: topLeftCorner.y + radiusDifference * Math.sin(angle) }; //!

                scaledBottomRight = { //!
                  x: bottomRightCorner.x - radiusDifference * Math.cos(angle), //!
                  y: bottomRightCorner.y - radiusDifference * Math.sin(angle) }; //!
              } else if (degrees < 0 && degrees >= -90) {
                //!
                scaledTopLeft = { //!
                  x: topLeftCorner.x - radiusDifference * Math.cos(angle), //!
                  y: topLeftCorner.y - radiusDifference * Math.sin(angle) }; //!

                scaledBottomRight = { //!
                  x: bottomRightCorner.x + radiusDifference * Math.cos(angle), //!
                  y: bottomRightCorner.y + radiusDifference * Math.sin(angle) }; //!
              } //!
            } else if (rotAngleDegrees < 0 && rotAngleDegrees >= -90) {
              //!
              if (degrees >= 0 && degrees <= 90) {
                //!
                scaledTopLeft = { //!
                  x: topLeftCorner.x - radiusDifference * Math.cos(angle), //!
                  y: topLeftCorner.y - radiusDifference * Math.sin(angle) }; //!

                scaledBottomRight = { //!
                  x: bottomRightCorner.x + radiusDifference * Math.cos(angle), //!
                  y: bottomRightCorner.y + radiusDifference * Math.sin(angle) }; //!
              } else if (degrees < 0 && degrees >= -90) {
                //!
                scaledTopLeft = { //!
                  x: topLeftCorner.x - radiusDifference * Math.cos(angle), //!
                  y: topLeftCorner.y - radiusDifference * Math.sin(angle) }; //!

                scaledBottomRight = { //!
                  x: bottomRightCorner.x + radiusDifference * Math.cos(angle), //!
                  y: bottomRightCorner.y + radiusDifference * Math.sin(angle) }; //!
              } //!
            } //!

            var scaledTopRight = { //!
              x: scaledTopLeft.x + Math.cos(Math.PI / 2 - rotAngle) * width * (newRadius / oldRadius), //!
              y: scaledTopLeft.y + Math.sin(Math.PI / 2 - rotAngle) * width * (newRadius / oldRadius) }; //!

            var scaledBottomLeft = { //!
              x: scaledBottomRight.x - Math.cos(Math.PI / 2 - rotAngle) * width * (newRadius / oldRadius), //!
              y: scaledBottomRight.y - Math.sin(Math.PI / 2 - rotAngle) * width * (newRadius / oldRadius) }; //!


            var coordinates = [//!
            ctx.map.unproject(scaledTopLeft).toArray(), //!
            ctx.map.unproject(scaledTopRight).toArray(), //!
            ctx.map.unproject(scaledBottomRight).toArray(), //!
            ctx.map.unproject(scaledBottomLeft).toArray() //!
            ]; //!

            // TODO handle out of bounds case

            ctx.map.getSource('image_' + feature.id).setCoordinates(coordinates.slice(0)); //!
            coordinates.push = coordinates[0]; //!
            feature.setCoordinates([coordinates]); //!
          } else if (feature.properties.source_for === 'hotspot') {
            var _ret = function () {
              //!
              if (selectedCoordPoints.length > 1) {
                //!
                ctx.api.changeMode('simple_select'); //!
                return {
                  v: void 0
                }; //!
              } //!
              var ids = selectedCoordPaths[0].split('.').map(function (x) {
                return parseInt(x, 10);
              }); //!

              var projectedCoordinates = feature.getCoordinates()[0].map(function (c) {
                return ctx.map.project(c);
              }); //!
              var topLeftCorner = projectedCoordinates.find(function (c) {
                return projectedCoordinates.every(function (oc) {
                  return c.x <= oc.x && c.y <= oc.y;
                });
              }); //!
              var bottomRightCorner = projectedCoordinates.find(function (c) {
                return projectedCoordinates.every(function (oc) {
                  return c.x >= oc.x && c.y >= oc.y;
                });
              }); //!

              var scaledTopLeft = void 0; //!
              var scaledBottomRight = void 0; //!
              switch (ids[1]) {//!
                // top //!
                case 1:
                  //!
                  var newTopLeftY = Math.min(bottomRightCorner.y - 10, e.originalEvent.y - 35); //!
                  scaledTopLeft = { x: topLeftCorner.x, y: newTopLeftY }; //!
                  scaledBottomRight = bottomRightCorner; //!
                  break; //!
                // right //!
                case 3:
                  //!
                  var newBottomRightX = Math.max(topLeftCorner.x + 10, e.originalEvent.x); //!
                  scaledBottomRight = { x: newBottomRightX, y: bottomRightCorner.y }; //!
                  scaledTopLeft = topLeftCorner; //!
                  break; //!
                // bottom //!
                case 5:
                  //!
                  var newBottomRightY = Math.max(topLeftCorner.y + 10, e.originalEvent.y - 35); //!
                  scaledBottomRight = { x: bottomRightCorner.x, y: newBottomRightY }; //!
                  scaledTopLeft = topLeftCorner; //!
                  break; //!
                // left //!
                case 7:
                  //!
                  var newTopLeftX = Math.min(bottomRightCorner.x - 10, e.originalEvent.x); //!
                  scaledTopLeft = { x: newTopLeftX, y: topLeftCorner.y }; //!
                  scaledBottomRight = bottomRightCorner; //!
                  break; //!
                default:
                  //!
                  var _center = { //!
                    x: (topLeftCorner.x + bottomRightCorner.x) / 2, //!
                    y: (bottomRightCorner.y + topLeftCorner.y) / 2 //!
                  }; //!

                  var _oldRadius = euclideanDistance(topLeftCorner, _center); //!
                  var _newRadius = euclideanDistance(_center, e.originalEvent); //!

                  var _slope = (topLeftCorner.y - _center.y) / (topLeftCorner.x - _center.x); //!
                  var _angle = Math.atan(_slope); //!
                  var _radiusDifference = _newRadius - _oldRadius; //!

                  scaledTopLeft = { //!
                    x: topLeftCorner.x - _radiusDifference * Math.cos(_angle), //!
                    y: topLeftCorner.y - _radiusDifference * Math.sin(_angle) }; //!

                  scaledBottomRight = { //!
                    x: bottomRightCorner.x + _radiusDifference * Math.cos(_angle), //!
                    y: bottomRightCorner.y + _radiusDifference * Math.sin(_angle) }; //!
              } //!

              var topLeft = ctx.map.unproject(scaledTopLeft).toArray(); //!
              var topMiddle = ctx.map.unproject({ //!
                x: (scaledTopLeft.x + scaledBottomRight.x) / 2, //!
                y: scaledTopLeft.y }).toArray(); //!
              var topRight = ctx.map.unproject({ x: scaledBottomRight.x, y: scaledTopLeft.y }).toArray(); //!
              var rightMiddle = ctx.map.unproject({ //!
                x: scaledBottomRight.x, //!
                y: (scaledTopLeft.y + scaledBottomRight.y) / 2 }).toArray(); //!
              var bottomRight = ctx.map.unproject(scaledBottomRight).toArray(); //!
              var bottomMiddle = ctx.map.unproject({ //!
                x: (scaledTopLeft.x + scaledBottomRight.x) / 2, //!
                y: scaledBottomRight.y }).toArray(); //!
              var bottomLeft = ctx.map.unproject({ x: scaledTopLeft.x, y: scaledBottomRight.y }).toArray(); //!
              var leftMiddle = ctx.map.unproject({ //!
                x: scaledTopLeft.x, //!
                y: (scaledTopLeft.y + scaledBottomRight.y) / 2 }).toArray(); //!

              var coordinates = [//!
              topLeft, //!
              topMiddle, //!
              topRight, //!
              rightMiddle, //!
              bottomRight, //!
              bottomMiddle, //!
              bottomLeft, //!
              leftMiddle, //!
              topLeft]; //!

              feature.setCoordinates([coordinates]); //!

              var cornerLineLength = Math.min((scaledBottomRight.x - scaledTopLeft.x) * 0.25, (scaledBottomRight.y - scaledTopLeft.y) * 0.3); //!

              // update corner line strings
              var topLeftCornerLine = ctx.store.get(feature.id + '_topLeft'); //!
              var topRightCornerLine = ctx.store.get(feature.id + '_topRight'); //!
              var bottomRightCornerLine = ctx.store.get(feature.id + '_bottomRight'); //!
              var bottomLiftCornerLine = ctx.store.get(feature.id + '_bottomLeft'); //!

              var topLeftCoordinates = [//!
              ctx.map.unproject({ x: scaledTopLeft.x, y: scaledTopLeft.y + cornerLineLength }).toArray(), //!
              ctx.map.unproject({ x: scaledTopLeft.x, y: scaledTopLeft.y }).toArray(), //!
              ctx.map.unproject({ x: scaledTopLeft.x + cornerLineLength, y: scaledTopLeft.y }).toArray()]; //!

              var topRightCoordinates = [//!
              ctx.map.unproject({ x: scaledBottomRight.x - cornerLineLength, y: scaledTopLeft.y }).toArray(), //!
              ctx.map.unproject({ x: scaledBottomRight.x, y: scaledTopLeft.y }).toArray(), //!
              ctx.map.unproject({ x: scaledBottomRight.x, y: scaledTopLeft.y + cornerLineLength }).toArray()];

              var bottomRightCoordinates = [//!
              ctx.map.unproject({ x: scaledBottomRight.x, y: scaledBottomRight.y - cornerLineLength }).toArray(), //!
              ctx.map.unproject({ x: scaledBottomRight.x, y: scaledBottomRight.y }).toArray(), //!
              ctx.map.unproject({ x: scaledBottomRight.x - cornerLineLength, y: scaledBottomRight.y }).toArray()]; //!

              var bottomLeftCoordinates = [//!
              ctx.map.unproject({ x: scaledTopLeft.x + cornerLineLength, y: scaledBottomRight.y }).toArray(), //!
              ctx.map.unproject({ x: scaledTopLeft.x, y: scaledBottomRight.y }).toArray(), //!
              ctx.map.unproject({ x: scaledTopLeft.x, y: scaledBottomRight.y - cornerLineLength }).toArray()]; //!

              feature.properties.bounds = [bottomLeft, topRight];

              topLeftCornerLine.setCoordinates(topLeftCoordinates); //!
              topRightCornerLine.setCoordinates(topRightCoordinates); //!
              bottomRightCornerLine.setCoordinates(bottomRightCoordinates); //!
              bottomLiftCornerLine.setCoordinates(bottomLeftCoordinates); //!
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          } else {
            var _delta = {
              lng: e.lngLat.lng - dragMoveLocation.lng,
              lat: e.lngLat.lat - dragMoveLocation.lat
            };
            var constrainedDelta = constrainFeatureMovement(selectedCoordPoints, _delta);

            for (var i = 0; i < selectedCoords.length; i++) {
              var coord = selectedCoords[i];
              feature.updateCoordinate(selectedCoordPaths[i], coord[0] + constrainedDelta.lng, coord[1] + constrainedDelta.lat);
            }
          }

          dragMoveLocation = e.lngLat;
          xyDragMoveLocation = e.originalEvent; //!
        }
      });
      this.on('click', CommonSelectors.true, stopDragging);
      this.on('mouseup', CommonSelectors.true, function () {
        if (dragMoving) {
          ctx.map.fire(Constants.events.UPDATE, {
            action: Constants.updateActions.CHANGE_COORDINATES,
            features: ctx.store.getSelected().map(function (f) {
              return f.toGeoJSON();
            })
          });
        }
        stopDragging();
      });
      this.on('click', noTarget, function () {
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
      });
      this.on('click', isInactiveFeature, function () {
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
      });
      this.on('click', CommonSelectors.isActiveFeature, function () {
        selectedCoordPaths = [];
        ctx.store.clearSelectedCoordinates();
        feature.changed();
      });
    },
    stop: function stop() {
      doubleClickZoom.enable(ctx);
      ctx.store.clearSelectedCoordinates();
    },
    render: function render(geojson, push) {
      if (featureId === geojson.properties.id) {
        geojson.properties.active = Constants.activeStates.ACTIVE;
        push(geojson);
        createSupplementaryPoints(geojson, {
          map: ctx.map,
          midpoints: true,
          selectedPaths: selectedCoordPaths
        }).forEach(push);
      } else {
        geojson.properties.active = Constants.activeStates.INACTIVE;
        push(geojson);
      }
      fireActionable();
    },
    trash: function trash() {
      selectedCoordPaths.sort().reverse().forEach(function (id) {
        return feature.removeCoordinate(id);
      });
      ctx.map.fire(Constants.events.UPDATE, {
        action: Constants.updateActions.CHANGE_COORDINATES,
        features: ctx.store.getSelected().map(function (f) {
          return f.toGeoJSON();
        })
      });
      selectedCoordPaths = [];
      ctx.store.clearSelectedCoordinates();
      fireActionable();
      if (feature.isValid() === false) {
        ctx.store.delete([featureId]);
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {});
      }
    }
  };
};

},{"../constants":33,"../lib/common_selectors":49,"../lib/constrain_feature_movement":50,"../lib/create_supplementary_points":52,"../lib/double_click_zoom":54,"../lib/euclidean_distance":56,"../lib/move_features":64}],72:[function(require,module,exports){
'use strict';

var CommonSelectors = require('../lib/common_selectors');
var LineString = require('../feature_types/line_string');
var isEventAtCoordinates = require('../lib/is_event_at_coordinates');
var doubleClickZoom = require('../lib/double_click_zoom');
var Constants = require('../constants');
var createVertex = require('../lib/create_vertex');

module.exports = function (ctx) {
  var line = new LineString(ctx, {
    type: Constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: Constants.geojsonTypes.LINE_STRING,
      coordinates: []
    }
  });
  var currentVertexPosition = 0;

  if (ctx._test) ctx._test.line = line;

  ctx.store.add(line);

  return {
    start: function start() {
      ctx.store.clearSelected();
      doubleClickZoom.disable(ctx);
      ctx.ui.queueMapClasses({ mouse: Constants.cursors.ADD });
      ctx.ui.setActiveButton(Constants.types.LINE);
      this.on('mousemove', CommonSelectors.true, function (e) {
        line.updateCoordinate(currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
        if (CommonSelectors.isVertex(e)) {
          ctx.ui.queueMapClasses({ mouse: Constants.cursors.POINTER });
        }
      });
      this.on('click', CommonSelectors.true, function (e) {
        if (currentVertexPosition > 0 && isEventAtCoordinates(e, line.coordinates[currentVertexPosition - 1])) {
          return ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [line.id] });
        }
        ctx.ui.queueMapClasses({ mouse: Constants.cursors.ADD });
        line.updateCoordinate(currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
        currentVertexPosition++;
      });
      this.on('click', CommonSelectors.isVertex, function () {
        return ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [line.id] });
      });
      this.on('keyup', CommonSelectors.isEscapeKey, function () {
        ctx.store.delete([line.id], { silent: true });
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
      });
      this.on('keyup', CommonSelectors.isEnterKey, function () {
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [line.id] });
      });
      ctx.events.actionable({
        combineFeatures: false,
        uncombineFeatures: false,
        trash: true
      });
    },

    stop: function stop() {
      doubleClickZoom.enable(ctx);
      ctx.ui.setActiveButton();

      // check to see if we've deleted this feature
      if (ctx.store.get(line.id) === undefined) return;

      //remove last added coordinate
      line.removeCoordinate('' + currentVertexPosition);
      if (line.isValid()) {
        ctx.map.fire(Constants.events.CREATE, {
          features: [line.toGeoJSON()]
        });
      } else {
        ctx.store.delete([line.id], { silent: true });
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {}, { silent: true });
      }
    },
    render: function render(geojson, callback) {
      var isActiveLine = geojson.properties.id === line.id;
      geojson.properties.active = isActiveLine ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
      if (!isActiveLine) return callback(geojson);

      // Only render the line if it has at least one real coordinate
      if (geojson.geometry.coordinates.length < 2) return;
      geojson.properties.meta = Constants.meta.FEATURE;

      if (geojson.geometry.coordinates.length >= 3) {
        callback(createVertex(line.id, geojson.geometry.coordinates[geojson.geometry.coordinates.length - 2], '' + (geojson.geometry.coordinates.length - 2), false));
      }

      callback(geojson);
    },
    trash: function trash() {
      ctx.store.delete([line.id], { silent: true });
      ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
    }
  };
};

},{"../constants":33,"../feature_types/line_string":45,"../lib/common_selectors":49,"../lib/create_vertex":53,"../lib/double_click_zoom":54,"../lib/is_event_at_coordinates":60}],73:[function(require,module,exports){
'use strict';

var CommonSelectors = require('../lib/common_selectors');
var Point = require('../feature_types/point');
var Constants = require('../constants');

module.exports = function (ctx) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  //!

  var point = new Point(ctx, {
    type: Constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates: []
    }
  });

  if (options.source_for !== undefined) point.properties.source_for = options.source_for; //!

  if (ctx._test) ctx._test.point = point;

  var labelPoint = void 0; //!
  if (point.properties.source_for === 'marker') {
    //!
    labelPoint = new Point(ctx, { //!
      id: point.id + '_label', //!
      type: Constants.geojsonTypes.FEATURE, //!
      properties: { //!
        source_for: Constants.sourceForTypes.LABEL, //!
        compound: true }, //!
      geometry: { //!
        coordinates: [], //!
        type: Constants.geojsonTypes.POINT } }); //!
    ctx.store.add(labelPoint); //!
  } //!

  ctx.store.add(point);

  function stopDrawingAndRemove() {
    ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
    ctx.store.delete([point.id], { silent: true });
    if (labelPoint) ctx.store.delete([labelPoint.id], { silent: true }); //!
  }

  function handleClick(e) {
    ctx.ui.queueMapClasses({ mouse: Constants.cursors.MOVE });
    point.updateCoordinate('', e.lngLat.lng, e.lngLat.lat);
    if (labelPoint) labelPoint.updateCoordinate('', e.lngLat.lng, e.lngLat.lat); //!
    ctx.map.fire(Constants.events.CREATE, {
      features: [point.toGeoJSON()]
    });
    if (labelPoint) ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [point.id, labelPoint.id] }); //!
    else ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [point.id] }); //!
  }

  return {
    start: function start() {
      ctx.store.clearSelected();
      ctx.ui.queueMapClasses({ mouse: Constants.cursors.ADD });
      ctx.ui.setActiveButton(Constants.types.POINT);
      this.on('click', CommonSelectors.true, handleClick);
      this.on('keyup', CommonSelectors.isEscapeKey, stopDrawingAndRemove);
      this.on('keyup', CommonSelectors.isEnterKey, stopDrawingAndRemove);
      ctx.events.actionable({
        combineFeatures: false,
        uncombineFeatures: false,
        trash: true
      });
    },
    stop: function stop() {
      ctx.ui.setActiveButton();
      if (!point.getCoordinate().length) {
        ctx.store.delete([point.id], { silent: true });
        if (labelPoint) ctx.store.delete([labelPoint.id], { silent: true }); //!
      }
    },
    render: function render(geojson, callback) {
      var isActivePoint = geojson.properties.id === point.id;
      geojson.properties.active = isActivePoint ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
      if (!isActivePoint) return callback(geojson);
      // Never render the point we're drawing
    },
    trash: function trash() {
      stopDrawingAndRemove();
    }
  };
};

},{"../constants":33,"../feature_types/point":47,"../lib/common_selectors":49}],74:[function(require,module,exports){
'use strict';

var CommonSelectors = require('../lib/common_selectors');
var Polygon = require('../feature_types/polygon');
var doubleClickZoom = require('../lib/double_click_zoom');
var Constants = require('../constants');
var isEventAtCoordinates = require('../lib/is_event_at_coordinates');
var createVertex = require('../lib/create_vertex');

module.exports = function (ctx) {

  var polygon = new Polygon(ctx, {
    type: Constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: Constants.geojsonTypes.POLYGON,
      coordinates: [[]]
    }
  });
  var currentVertexPosition = 0;

  if (ctx._test) ctx._test.polygon = polygon;

  ctx.store.add(polygon);

  return {
    start: function start() {
      ctx.store.clearSelected();
      doubleClickZoom.disable(ctx);
      ctx.ui.queueMapClasses({ mouse: Constants.cursors.ADD });
      ctx.ui.setActiveButton(Constants.types.POLYGON);
      this.on('mousemove', CommonSelectors.true, function (e) {
        polygon.updateCoordinate('0.' + currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
        if (CommonSelectors.isVertex(e)) {
          ctx.ui.queueMapClasses({ mouse: Constants.cursors.POINTER });
        }
      });
      this.on('click', CommonSelectors.true, function (e) {
        if (currentVertexPosition > 0 && isEventAtCoordinates(e, polygon.coordinates[0][currentVertexPosition - 1])) {
          return ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [polygon.id] });
        }
        ctx.ui.queueMapClasses({ mouse: Constants.cursors.ADD });
        polygon.updateCoordinate('0.' + currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
        currentVertexPosition++;
      });
      this.on('click', CommonSelectors.isVertex, function () {
        return ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [polygon.id] });
      });
      this.on('keyup', CommonSelectors.isEscapeKey, function () {
        ctx.store.delete([polygon.id], { silent: true });
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
      });
      this.on('keyup', CommonSelectors.isEnterKey, function () {
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [polygon.id] });
      });
      ctx.events.actionable({
        combineFeatures: false,
        uncombineFeatures: false,
        trash: true
      });
    },


    stop: function stop() {
      ctx.ui.queueMapClasses({ mouse: Constants.cursors.NONE });
      doubleClickZoom.enable(ctx);
      ctx.ui.setActiveButton();

      // check to see if we've deleted this feature
      if (ctx.store.get(polygon.id) === undefined) return;

      //remove last added coordinate
      polygon.removeCoordinate('0.' + currentVertexPosition);
      if (polygon.isValid()) {
        ctx.map.fire(Constants.events.CREATE, {
          features: [polygon.toGeoJSON()]
        });
      } else {
        ctx.store.delete([polygon.id], { silent: true });
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {}, { silent: true });
      }
    },

    render: function render(geojson, callback) {
      var isActivePolygon = geojson.properties.id === polygon.id;
      geojson.properties.active = isActivePolygon ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
      if (!isActivePolygon) return callback(geojson);

      // Don't render a polygon until it has two positions
      // (and a 3rd which is just the first repeated)
      if (geojson.geometry.coordinates.length === 0) return;

      var coordinateCount = geojson.geometry.coordinates[0].length;

      // If we have fewer than two positions (plus the closer),
      // it's not yet a shape to render
      if (coordinateCount < 3) return;

      geojson.properties.meta = Constants.meta.FEATURE;

      if (coordinateCount > 4) {
        // Add a start position marker to the map, clicking on this will finish the feature
        // This should only be shown when we're in a valid spot
        callback(createVertex(polygon.id, geojson.geometry.coordinates[0][0], '0.0', false));
        var endPos = geojson.geometry.coordinates[0].length - 3;
        callback(createVertex(polygon.id, geojson.geometry.coordinates[0][endPos], '0.' + endPos, false));
      }

      // If we have more than two positions (plus the closer),
      // render the Polygon
      if (coordinateCount > 3) {
        return callback(geojson);
      }

      // If we've only drawn two positions (plus the closer),
      // make a LineString instead of a Polygon
      var lineCoordinates = [[geojson.geometry.coordinates[0][0][0], geojson.geometry.coordinates[0][0][1]], [geojson.geometry.coordinates[0][1][0], geojson.geometry.coordinates[0][1][1]]];
      return callback({
        type: Constants.geojsonTypes.FEATURE,
        properties: geojson.properties,
        geometry: {
          coordinates: lineCoordinates,
          type: Constants.geojsonTypes.LINE_STRING
        }
      });
    },
    trash: function trash() {
      ctx.store.delete([polygon.id], { silent: true });
      ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
    }
  };
};

},{"../constants":33,"../feature_types/polygon":48,"../lib/common_selectors":49,"../lib/create_vertex":53,"../lib/double_click_zoom":54,"../lib/is_event_at_coordinates":60}],75:[function(require,module,exports){
'use strict';

var CommonSelectors = require('../lib/common_selectors');
var Polygon = require('../feature_types/polygon');
var doubleClickZoom = require('../lib/double_click_zoom');
var dragPan = require('../lib/drag_pan');
var Constants = require('../constants');

module.exports = function (ctx) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  //!

  var polygon = new Polygon(ctx, {
    type: Constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: Constants.geojsonTypes.POLYGON,
      coordinates: [[]]
    }
  });

  var dragging = false;
  if (options.source_for !== undefined) polygon.properties.source_for = options.source_for; //!
  if (ctx._test) ctx._test.polygon = polygon;
  var firstCorner = void 0;
  ctx.store.add(polygon);

  return {
    start: function start() {
      ctx.store.clearSelected();
      doubleClickZoom.disable(ctx);
      dragPan.disable(ctx);
      ctx.ui.queueMapClasses({ mouse: Constants.cursors.ADD });
      ctx.ui.setActiveButton(Constants.types.POLYGON);

      this.on('mousedown', CommonSelectors.true, function (e) {
        firstCorner = e.lngLat;
        dragging = true;
      });

      this.on('mouseup', CommonSelectors.true, function () {
        if (dragging) {
          dragging = false;
          return ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [polygon.id] });
        }
      });

      this.on('drag', CommonSelectors.true, function (e) {
        var minLng = Math.min(firstCorner.lng, e.lngLat.lng);
        var maxLng = Math.max(firstCorner.lng, e.lngLat.lng);
        var minLat = Math.min(firstCorner.lat, e.lngLat.lat);
        var maxLat = Math.max(firstCorner.lat, e.lngLat.lat);
        var width = maxLng - minLng;
        var height = maxLat - minLat;

        var coordinates = [[minLng, minLat], [minLng + width, minLat], [minLng + width, minLat + height], [minLng, minLat + height]];

        coordinates.push(coordinates[0]);
        polygon.incomingCoords([coordinates]);
      });

      this.on('keyup', CommonSelectors.isEscapeKey, function () {
        ctx.store.delete([polygon.id], { silent: true });
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
      });
    },


    stop: function stop() {
      ctx.ui.queueMapClasses({ mouse: Constants.cursors.NONE });
      doubleClickZoom.enable(ctx);
      ctx.ui.setActiveButton();
      dragPan.enable(ctx);

      // check to see if we've deleted this feature
      if (ctx.store.get(polygon.id) === undefined) return;

      if (polygon.isValid()) {
        ctx.map.fire(Constants.events.CREATE, {
          features: [polygon.toGeoJSON()]
        });
      } else {
        ctx.store.delete([polygon.id], { silent: true });
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {}, { silent: true });
      }
    },

    render: function render(geojson, callback) {
      var isActivePolygon = geojson.properties.id === polygon.id;
      geojson.properties.active = isActivePolygon ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
      if (!isActivePolygon) return callback(geojson);

      // Don't render a polygon until it has two positions
      // (and a 3rd which is just the first repeated)
      if (geojson.geometry.coordinates.length === 0) return;

      var coordinateCount = geojson.geometry.coordinates[0].length;

      geojson.properties.meta = Constants.meta.FEATURE;

      // If we have more than two positions (plus the closer),
      // render the Polygon
      if (coordinateCount > 3) {
        return callback(geojson);
      }
    },
    trash: function trash() {
      ctx.store.delete([polygon.id], { silent: true });
      ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
    }
  };
};

},{"../constants":33,"../feature_types/polygon":48,"../lib/common_selectors":49,"../lib/double_click_zoom":54,"../lib/drag_pan":55}],76:[function(require,module,exports){
'use strict';

var CommonSelectors = require('../lib/common_selectors');
var LineString = require('../feature_types/line_string');
var dragPan = require('../lib/drag_pan');
var Constants = require('../constants');
var createVertex = require('../lib/create_vertex');

module.exports = function (ctx) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  //!
  var line = new LineString(ctx, {
    type: Constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: Constants.geojsonTypes.LINE_STRING,
      coordinates: []
    }
  });

  if (options.source_for !== undefined) line.properties.source_for = options.source_for; //!

  var currentVertexPosition = 0;
  if (ctx._test) ctx._test.line = line;

  var dragging = false;

  ctx.store.add(line);

  return {
    start: function start() {
      ctx.store.clearSelected();
      dragPan.disable(ctx);
      ctx.ui.queueMapClasses({ mouse: Constants.cursors.ADD });
      ctx.ui.setActiveButton(Constants.types.LINE);
      this.on('drag', CommonSelectors.true, function (e) {
        line.updateCoordinate(currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
        currentVertexPosition++;
      });

      this.on('mousedown', CommonSelectors.true, function () {
        dragging = true;
      });

      this.on('mouseup', CommonSelectors.true, function () {
        if (dragging) {
          dragging = false;
          return ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [line.id] });
        }
      });

      this.on('keyup', CommonSelectors.isEscapeKey, function () {
        ctx.store.delete([line.id], { silent: true });
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
      });
      this.on('keyup', CommonSelectors.isEnterKey, function () {
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [line.id] });
      });
    },

    stop: function stop() {
      dragPan.enable(ctx);
      ctx.ui.setActiveButton();

      // check to see if we've deleted this feature
      if (ctx.store.get(line.id) === undefined) return;

      //remove last added coordinate
      line.removeCoordinate('' + currentVertexPosition);
      if (line.isValid()) {
        ctx.map.fire(Constants.events.CREATE, {
          features: [line.toGeoJSON()]
        });
      } else {
        ctx.store.delete([line.id], { silent: true });
        ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, {}, { silent: true });
      }
    },
    render: function render(geojson, callback) {
      var isActiveLine = geojson.properties.id === line.id;
      geojson.properties.active = isActiveLine ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
      if (!isActiveLine) return callback(geojson);

      // Only render the line if it has at least one real coordinate
      if (geojson.geometry.coordinates.length < 2) return;
      geojson.properties.meta = Constants.meta.FEATURE;

      if (geojson.geometry.coordinates.length >= 3) {
        callback(createVertex(line.id, geojson.geometry.coordinates[geojson.geometry.coordinates.length - 2], '' + (geojson.geometry.coordinates.length - 2), false));
      }

      callback(geojson);
    },
    trash: function trash() {
      ctx.store.delete([line.id], { silent: true });
      ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
    }
  };
};

},{"../constants":33,"../feature_types/line_string":45,"../lib/common_selectors":49,"../lib/create_vertex":53,"../lib/drag_pan":55}],77:[function(require,module,exports){
'use strict';

var CommonSelectors = require('../lib/common_selectors');
var mouseEventPoint = require('../lib/mouse_event_point');
var featuresAt = require('../lib/features_at');
var createSupplementaryPoints = require('../lib/create_supplementary_points');
var StringSet = require('../lib/string_set');
var doubleClickZoom = require('../lib/double_click_zoom');
var moveFeatures = require('../lib/move_features');
var Constants = require('../constants');
var MultiFeature = require('../feature_types/multi_feature');

module.exports = function (ctx) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var dragMoveLocation = null;
  var boxSelectStartLocation = null;
  var boxSelectElement = void 0;
  var boxSelecting = false;
  var canBoxSelect = false;
  var dragMoving = false;
  var canDragMove = false;
  var difference = void 0; //!
  var dragStartLocation = void 0; //!
  var xyDragMoveLocation = void 0; //!
  var initiallySelectedFeatureIds = options.featureIds || [];

  var fireUpdate = function fireUpdate(delta) {
    ctx.map.fire(Constants.events.UPDATE, {
      delta: delta,
      action: Constants.updateActions.MOVE,
      features: ctx.store.getSelected().map(function (f) {
        return f.toGeoJSON();
      })
    });
  };

  var fireActionable = function fireActionable() {
    var selectedFeatures = ctx.store.getSelected();

    var multiFeatures = selectedFeatures.filter(function (feature) {
      return feature instanceof MultiFeature;
    });

    var combineFeatures = false;

    if (selectedFeatures.length > 1) {
      (function () {
        combineFeatures = true;
        var featureType = selectedFeatures[0].type.replace('Multi', '');
        selectedFeatures.forEach(function (feature) {
          if (feature.type.replace('Multi', '') !== featureType) {
            combineFeatures = false;
          }
        });
      })();
    }

    var uncombineFeatures = multiFeatures.length > 0;
    var trash = selectedFeatures.length > 0;

    ctx.events.actionable({
      combineFeatures: combineFeatures, uncombineFeatures: uncombineFeatures, trash: trash
    });
  };

  var getUniqueIds = function getUniqueIds(allFeatures) {
    if (!allFeatures.length) return [];
    var ids = allFeatures.map(function (s) {
      return s.properties.id;
    }).filter(function (id) {
      return id !== undefined;
    }).reduce(function (memo, id) {
      memo.add(id);
      return memo;
    }, new StringSet());

    return ids.values();
  };

  var stopExtendedInteractions = function stopExtendedInteractions() {
    if (boxSelectElement) {
      if (boxSelectElement.parentNode) boxSelectElement.parentNode.removeChild(boxSelectElement);
      boxSelectElement = null;
    }

    ctx.map.dragPan.enable();

    boxSelecting = false;
    canBoxSelect = false;
    dragMoving = false;
    canDragMove = false;
  };

  return {
    stop: function stop() {
      doubleClickZoom.enable(ctx);
    },
    start: function start() {
      // Select features that should start selected,
      // probably passed in from a `draw_*` mode
      if (ctx.store) {
        ctx.store.setSelected(initiallySelectedFeatureIds.filter(function (id) {
          return ctx.store.get(id) !== undefined;
        }));
        fireActionable();
      }

      // Any mouseup should stop box selecting and dragMoving
      this.on('mouseup', CommonSelectors.true, stopExtendedInteractions);

      // On mousemove that is not a drag, stop extended interactions.
      // This is useful if you drag off the canvas, release the button,
      // then move the mouse back over the canvas --- we don't allow the
      // interaction to continue then, but we do let it continue if you held
      // the mouse button that whole time
      this.on('mousemove', CommonSelectors.true, stopExtendedInteractions);

      // As soon as you mouse leaves the canvas, update the feature
      this.on('mouseout', function () {
        return dragMoving;
      }, fireUpdate);

      // Click (with or without shift) on no feature
      this.on('click', CommonSelectors.noTarget, function () {
        var _this = this;

        // Clear the re-render selection
        var wasSelected = ctx.store.getSelectedIds();
        if (wasSelected.length) {
          ctx.store.clearSelected();
          wasSelected.forEach(function (id) {
            return _this.render(id);
          });
        }
        doubleClickZoom.enable(ctx);
        stopExtendedInteractions();
      });

      // Click (with or without shift) on a vertex
      this.on('click', CommonSelectors.isOfMetaType(Constants.meta.VERTEX), function (e) {
        // Enter direct select mode
        ctx.events.changeMode(Constants.modes.DIRECT_SELECT, {
          featureId: e.featureTarget.properties.parent,
          coordPath: e.featureTarget.properties.coord_path,
          startPos: e.lngLat
        });
        ctx.ui.queueMapClasses({ mouse: Constants.cursors.MOVE });
      });

      // Mousedown on a selected feature
      this.on('mousedown', CommonSelectors.isActiveFeature, function (e) {
        // Stop any already-underway extended interactions
        stopExtendedInteractions();

        // Disable map.dragPan immediately so it can't start
        ctx.map.dragPan.disable();

        // Re-render it and enable drag move
        this.render(e.featureTarget.properties.id);

        // Set up the state for drag moving
        canDragMove = true;
        dragStartLocation = e.lngLat; //!
        xyDragMoveLocation = e.originalEvent;
        dragMoveLocation = e.lngLat;
      });

      // Click (with or without shift) on any feature
      this.on('click', CommonSelectors.isFeature, function (e) {
        // Stop everything
        doubleClickZoom.disable(ctx);
        stopExtendedInteractions();

        var isShiftClick = CommonSelectors.isShiftDown(e);
        var selectedFeatureIds = ctx.store.getSelectedIds();
        var featureId = e.featureTarget.properties.id;
        var isFeatureSelected = ctx.store.isSelected(featureId);

        // Click (without shift) on any selected feature but a point
        if (!isShiftClick && isFeatureSelected && ctx.store.get(featureId).type !== Constants.geojsonTypes.POINT && ctx.store.get(featureId).properties.source_for !== Constants.sourceForTypes.FLOW_ARROW) {
          //!
          // Enter direct select mode
          return ctx.events.changeMode(Constants.modes.DIRECT_SELECT, {
            featureId: featureId
          });
        }

        // Shift-click on a selected feature
        if (isFeatureSelected && isShiftClick) {
          // Deselect it
          ctx.store.deselect(featureId);
          ctx.ui.queueMapClasses({ mouse: Constants.cursors.POINTER });
          if (selectedFeatureIds.length === 1) {
            doubleClickZoom.enable(ctx);
          }
          // Shift-click on an unselected feature
        } else if (!isFeatureSelected && isShiftClick) {
          // Add it to the selection
          ctx.store.select(featureId);
          ctx.ui.queueMapClasses({ mouse: Constants.cursors.MOVE });
          // Click (without shift) on an unselected feature
        } else if (!isFeatureSelected && !isShiftClick) {
          // Make it the only selected feature
          selectedFeatureIds.forEach(this.render);
          ctx.store.setSelected(featureId);
          ctx.ui.queueMapClasses({ mouse: Constants.cursors.MOVE });
        }

        // No matter what, re-render the clicked feature
        this.render(featureId);
      });

      // Dragging when drag move is enabled
      this.on('drag', function () {
        return canDragMove;
      }, function (e) {
        dragMoving = true;
        e.originalEvent.stopPropagation();

        var delta = {
          lng: e.lngLat.lng - dragMoveLocation.lng,
          lat: e.lngLat.lat - dragMoveLocation.lat
        };

        var xyDelta = {
          x: e.originalEvent.x - xyDragMoveLocation.x,
          y: e.originalEvent.y - xyDragMoveLocation.y
        };

        moveFeatures(ctx.store.getSelected(), delta, ctx, xyDelta);

        // Information passed to parent
        difference = { //!
          lng: e.lngLat.lng - dragStartLocation.lng, //!
          lat: e.lngLat.lat - dragStartLocation.lat //!
        }; //!
        dragMoveLocation = e.lngLat;
        xyDragMoveLocation = e.originalEvent;
      });

      // Mouseup, always
      this.on('mouseup', CommonSelectors.true, function (e) {
        // End any extended interactions
        if (dragMoving) {
          fireUpdate(difference); //!
        } else if (boxSelecting) {
          var bbox = [boxSelectStartLocation, mouseEventPoint(e.originalEvent, ctx.container)];
          var featuresInBox = featuresAt(null, bbox, ctx);
          var idsToSelect = getUniqueIds(featuresInBox).filter(function (id) {
            return !ctx.store.isSelected(id);
          });

          if (idsToSelect.length) {
            ctx.store.select(idsToSelect);
            idsToSelect.forEach(this.render);
            ctx.ui.queueMapClasses({ mouse: Constants.cursors.MOVE });
          }
        }
        stopExtendedInteractions();
      });

      if (ctx.options.boxSelect) {
        // Shift-mousedown anywhere
        this.on('mousedown', CommonSelectors.isShiftMousedown, function (e) {
          stopExtendedInteractions();
          ctx.map.dragPan.disable();
          // Enable box select
          boxSelectStartLocation = mouseEventPoint(e.originalEvent, ctx.container);
          canBoxSelect = true;
        });

        // Drag when box select is enabled
        this.on('drag', function () {
          return canBoxSelect;
        }, function (e) {
          boxSelecting = true;
          ctx.ui.queueMapClasses({ mouse: Constants.cursors.ADD });

          // Create the box node if it doesn't exist
          if (!boxSelectElement) {
            boxSelectElement = document.createElement('div');
            boxSelectElement.classList.add(Constants.classes.BOX_SELECT);
            ctx.container.appendChild(boxSelectElement);
          }

          // Adjust the box node's width and xy position
          var current = mouseEventPoint(e.originalEvent, ctx.container);
          var minX = Math.min(boxSelectStartLocation.x, current.x);
          var maxX = Math.max(boxSelectStartLocation.x, current.x);
          var minY = Math.min(boxSelectStartLocation.y, current.y);
          var maxY = Math.max(boxSelectStartLocation.y, current.y);
          var translateValue = 'translate(' + minX + 'px, ' + minY + 'px)';
          boxSelectElement.style.transform = translateValue;
          boxSelectElement.style.WebkitTransform = translateValue;
          boxSelectElement.style.width = maxX - minX + 'px';
          boxSelectElement.style.height = maxY - minY + 'px';
        });
      }
    },
    render: function render(geojson, push) {
      geojson.properties.active = ctx.store.isSelected(geojson.properties.id) ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
      push(geojson);
      fireActionable();
      if (geojson.properties.active !== Constants.activeStates.ACTIVE || geojson.geometry.type === Constants.geojsonTypes.POINT) return;
      createSupplementaryPoints(geojson).forEach(push);
    },
    trash: function trash() {
      ctx.store.delete(ctx.store.getSelectedIds());
      fireActionable();
    },
    combineFeatures: function combineFeatures() {
      var selectedFeatures = ctx.store.getSelected();

      if (selectedFeatures.length === 0 || selectedFeatures.length < 2) return;

      var coordinates = [],
          featuresCombined = [];
      var featureType = selectedFeatures[0].type.replace('Multi', '');

      for (var i = 0; i < selectedFeatures.length; i++) {
        var feature = selectedFeatures[i];

        if (feature.type.replace('Multi', '') !== featureType) {
          return;
        }
        if (feature.type.includes('Multi')) {
          feature.getCoordinates().forEach(function (subcoords) {
            coordinates.push(subcoords);
          });
        } else {
          coordinates.push(feature.getCoordinates());
        }

        featuresCombined.push(feature.toGeoJSON());
      }

      if (featuresCombined.length > 1) {

        var multiFeature = new MultiFeature(ctx, {
          type: Constants.geojsonTypes.FEATURE,
          properties: featuresCombined[0].properties,
          geometry: {
            type: 'Multi' + featureType,
            coordinates: coordinates
          }
        });

        ctx.store.add(multiFeature);
        ctx.store.delete(ctx.store.getSelectedIds(), { silent: true });
        ctx.store.setSelected([multiFeature.id]);

        ctx.map.fire(Constants.events.COMBINE_FEATURES, {
          createdFeatures: [multiFeature.toGeoJSON()],
          deletedFeatures: featuresCombined
        });
      }
      fireActionable();
    },
    uncombineFeatures: function uncombineFeatures() {
      var selectedFeatures = ctx.store.getSelected();
      if (selectedFeatures.length === 0) return;

      var createdFeatures = [];
      var featuresUncombined = [];

      var _loop = function _loop(i) {
        var feature = selectedFeatures[i];

        if (feature instanceof MultiFeature) {
          feature.getFeatures().forEach(function (subFeature) {
            ctx.store.add(subFeature);
            subFeature.properties = feature.properties;
            createdFeatures.push(subFeature.toGeoJSON());
            ctx.store.select([subFeature.id]);
          });
          ctx.store.delete(feature.id, { silent: true });
          featuresUncombined.push(feature.toGeoJSON());
        }
      };

      for (var i = 0; i < selectedFeatures.length; i++) {
        _loop(i);
      }

      if (createdFeatures.length > 1) {
        ctx.map.fire(Constants.events.UNCOMBINE_FEATURES, {
          createdFeatures: createdFeatures,
          deletedFeatures: featuresUncombined
        });
      }
      fireActionable();
    }
  };
};

},{"../constants":33,"../feature_types/multi_feature":46,"../lib/common_selectors":49,"../lib/create_supplementary_points":52,"../lib/double_click_zoom":54,"../lib/features_at":57,"../lib/mouse_event_point":63,"../lib/move_features":64,"../lib/string_set":66}],78:[function(require,module,exports){
'use strict';

var CommonSelectors = require('../lib/common_selectors');
var doubleClickZoom = require('../lib/double_click_zoom');
var Constants = require('../constants');

module.exports = function (ctx) {
  return {
    stop: function stop() {
      //!
      doubleClickZoom.enable(ctx); //!
    }, //!
    start: function start() {
      //!
      ctx.events.actionable({
        combineFeatures: false,
        uncombineFeatures: false,
        trash: false
      });
      this.on('click', CommonSelectors.isFeature, function (e) {
        doubleClickZoom.disable(ctx); //!
        ctx.map.dragPan.enable(); //!
        var featureId = e.featureTarget.properties.id; //!
        if (e.featureTarget.geometry.type === Constants.geojsonTypes.POLYGON && e.featureTarget.properties.source_for === 'hotspot') {
          //!
          ctx.map.fire(Constants.events.FEATURE_INTERACTION, { //!
            action: Constants.events.FEATURE_INTERACTION, //!
            feature: e.featureTarget }); //!
        } //!

        this.render(featureId); //!
      }); //!
    },
    render: function render(geojson, push) {
      push(geojson);
    }
  };
};

},{"../constants":33,"../lib/common_selectors":49,"../lib/double_click_zoom":54}],79:[function(require,module,exports){
'use strict';

var xtend = require('xtend');
var Constants = require('./constants');

var defaultOptions = {
  defaultMode: Constants.modes.SIMPLE_SELECT,
  keybindings: true,
  clickBuffer: 2,
  boxSelect: true,
  displayControlsDefault: true,
  styles: require('./lib/theme'),
  controls: {},
  userProperties: false
};

var showControls = {
  point: true,
  line_string: true,
  polygon: true,
  flow_arrow: true,
  marker: true,
  freehand: true,
  label: true,
  shape: true,
  trash: true,
  combine_features: true,
  uncombine_features: true
};

var hideControls = {
  point: false,
  line_string: false,
  polygon: false,
  flow_arrow: false,
  marker: false,
  freehand: false,
  label: false,
  shape: false,
  trash: false,
  combine_features: false,
  uncombine_features: false
};

function addSources(styles, sourceBucket) {
  return styles.map(function (style) {
    if (style.source) return style;
    return xtend(style, {
      id: style.id + '.' + sourceBucket,
      source: sourceBucket === 'hot' ? Constants.sources.HOT : Constants.sources.COLD
    });
  });
}

module.exports = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var withDefaults = xtend(options);

  if (!options.controls) {
    withDefaults.controls = {};
  }

  if (options.displayControlsDefault === false) {
    withDefaults.controls = xtend(hideControls, options.controls);
  } else {
    withDefaults.controls = xtend(showControls, options.controls);
  }

  withDefaults = xtend(defaultOptions, withDefaults);

  // Layers with a shared source should be adjacent for performance reasons
  withDefaults.styles = addSources(withDefaults.styles, 'cold').concat(addSources(withDefaults.styles, 'hot'));

  return withDefaults;
};

},{"./constants":33,"./lib/theme":68,"xtend":23}],80:[function(require,module,exports){
'use strict';

var Constants = require('./constants');

module.exports = function render() {
  var store = this;
  var mapExists = store.ctx.map && store.ctx.map.getSource(Constants.sources.HOT) !== undefined;
  if (!mapExists) return cleanup();

  var mode = store.ctx.events.currentModeName();

  store.ctx.ui.queueMapClasses({ mode: mode });

  var newHotIds = [];
  var newColdIds = [];

  if (store.isDirty) {
    newColdIds = store.getAllIds();
  } else {
    // if not, we are in 'edit mode'. Transfer all selected ids to hot ids//!
    newHotIds = store.getChangedIds().filter(function (id) {
      return store.get(id) !== undefined;
    });
    newColdIds = store.sources.hot.filter(function (geojson) {
      return geojson.properties.id && newHotIds.indexOf(geojson.properties.id) === -1 && store.get(geojson.properties.id) !== undefined;
    }).map(function (geojson) {
      return geojson.properties.id;
    });
  }

  store.sources.hot = [];
  var lastColdCount = store.sources.cold.length;
  store.sources.cold = store.isDirty ? [] : store.sources.cold.filter(function (geojson) {
    var id = geojson.properties.id || geojson.properties.parent;
    return newHotIds.indexOf(id) === -1;
  });

  var coldChanged = lastColdCount !== store.sources.cold.length || newColdIds.length > 0;

  // render only changed stores //!
  newHotIds.forEach(function (id) {
    return renderFeature(id, 'hot');
  });
  newColdIds.forEach(function (id) {
    return renderFeature(id, 'cold');
  });

  function renderFeature(id, source) {
    var feature = store.get(id);
    var featureInternal = feature.internal(mode);
    store.ctx.events.currentModeRender(featureInternal, function (geojson) {
      store.sources[source].push(geojson);
    });
  }

  if (coldChanged) {
    store.ctx.map.getSource(Constants.sources.COLD).setData({
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: store.sources.cold
    });
  }

  store.ctx.map.getSource(Constants.sources.HOT).setData({
    type: Constants.geojsonTypes.FEATURE_COLLECTION,
    features: store.sources.hot
  });

  if (store._emitSelectionChange) {
    store.ctx.map.fire(Constants.events.SELECTION_CHANGE, {
      features: store.getSelected().map(function (feature) {
        return feature.toGeoJSON();
      }),
      points: store.getSelectedCoordinates().map(function (coordinate) {
        return {
          type: Constants.geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: Constants.geojsonTypes.POINT,
            coordinates: coordinate.coordinates
          }
        };
      })
    });
    store._emitSelectionChange = false;
  }

  if (store._deletedFeaturesToEmit.length) {
    var geojsonToEmit = store._deletedFeaturesToEmit.map(function (feature) {
      return feature.toGeoJSON();
    });

    store._deletedFeaturesToEmit = [];

    store.ctx.map.fire(Constants.events.DELETE, {
      features: geojsonToEmit
    });
  }

  store.ctx.map.fire(Constants.events.RENDER, {});
  cleanup();

  function cleanup() {
    store.isDirty = false;
    store.clearChangedIds();
  }
};

},{"./constants":33}],81:[function(require,module,exports){
'use strict';

var events = require('./events');
var Store = require('./store');
var ui = require('./ui');
var Constants = require('./constants');

module.exports = function (ctx) {

  ctx.events = events(ctx);

  ctx.map = null;
  ctx.container = null;
  ctx.store = null;
  ctx.ui = ui(ctx);

  var controlContainer = null;

  var setup = {
    onRemove: function onRemove() {
      setup.removeLayers();
      ctx.ui.removeButtons();
      ctx.events.removeEventListeners();
      ctx.map = null;
      ctx.container = null;
      ctx.store = null;

      if (controlContainer && controlContainer.parentNode) controlContainer.parentNode.removeChild(controlContainer);
      controlContainer = null;

      return this;
    },
    onAdd: function onAdd(map) {
      ctx.map = map;
      ctx.container = map.getContainer();
      ctx.store = new Store(ctx);

      controlContainer = ctx.ui.addButtons();

      if (ctx.options.boxSelect) {
        map.boxZoom.disable();
        // Need to toggle dragPan on and off or else first
        // dragPan disable attempt in simple_select doesn't work
        map.dragPan.disable();
        map.dragPan.enable();
      }

      var intervalId = null;

      var connect = function connect() {
        map.off('load', connect);
        clearInterval(intervalId);
        setup.addLayers();
        ctx.events.addEventListeners();
      };

      if (map.loaded()) {
        connect();
      } else {
        map.on('load', connect);
        intervalId = setInterval(function () {
          if (map.loaded()) connect();
        }, 16);
      }

      return controlContainer;
    },
    addLayers: function addLayers() {
      // drawn features style
      ctx.map.addSource(Constants.sources.COLD, {
        buffer: 384, //!
        data: {
          type: Constants.geojsonTypes.FEATURE_COLLECTION,
          features: []
        },
        type: 'geojson'
      });

      // hot features style
      ctx.map.addSource(Constants.sources.HOT, {
        buffer: 384, //!
        data: {
          type: Constants.geojsonTypes.FEATURE_COLLECTION,
          features: []
        },
        type: 'geojson'
      });

      ctx.options.styles.forEach(function (style) {
        ctx.map.addLayer(style);
      });

      ctx.store.render();
    },
    removeLayers: function removeLayers() {
      ctx.options.styles.forEach(function (style) {
        ctx.map.removeLayer(style.id);
      });

      ctx.map.removeSource(Constants.sources.COLD);
      ctx.map.removeSource(Constants.sources.HOT);
    }
  };

  ctx.setup = setup;

  return setup;
};

},{"./constants":33,"./events":34,"./store":82,"./ui":83}],82:[function(require,module,exports){
'use strict';

var throttle = require('./lib/throttle');
var toDenseArray = require('./lib/to_dense_array');
var StringSet = require('./lib/string_set');
var render = require('./render');

var Store = module.exports = function (ctx) {
  this._features = {};
  this._featureIds = new StringSet();
  this._selectedFeatureIds = new StringSet();
  this._selectedCoordinates = [];
  this._changedFeatureIds = new StringSet();
  this._deletedFeaturesToEmit = [];
  this._emitSelectionChange = false;
  this.ctx = ctx;
  this.sources = {
    hot: [],
    cold: []
  };
  this.render = throttle(render, 16, this);
  this.isDirty = false;
};

/**
 * Delays all rendering until the returned function is invoked
 * @return {Function} renderBatch
 */
Store.prototype.createRenderBatch = function () {
  var _this = this;

  var holdRender = this.render;
  var numRenders = 0;
  this.render = function () {
    numRenders++;
  };

  return function () {
    _this.render = holdRender;
    if (numRenders > 0) {
      _this.render();
    }
  };
};

/**
 * Sets the store's state to dirty.
 * @return {Store} this
 */
Store.prototype.setDirty = function () {
  this.isDirty = true;
  return this;
};

/**
 * Sets a feature's state to changed.
 * @param {string} featureId
 * @return {Store} this
 */
Store.prototype.featureChanged = function (featureId) {
  this._changedFeatureIds.add(featureId);
  return this;
};

/**
 * Gets the ids of all features currently in changed state.
 * @return {Store} this
 */
Store.prototype.getChangedIds = function () {
  return this._changedFeatureIds.values();
};

/**
 * Sets all features to unchanged state.
 * @return {Store} this
 */
Store.prototype.clearChangedIds = function () {
  this._changedFeatureIds.clear();
  return this;
};

/**
 * Gets the ids of all features in the store.
 * @return {Store} this
 */
Store.prototype.getAllIds = function () {
  return this._featureIds.values();
};

/**
 * Adds a feature to the store.
 * @param {Object} feature
 *
 * @return {Store} this
 */
Store.prototype.add = function (feature) {
  this.featureChanged(feature.id);
  this._features[feature.id] = feature;
  this._featureIds.add(feature.id);
  return this;
};

/**  //!
 * Assigns layer associated with the feature,  //!
 * to layers object within the feature.  //!
 * This enables styling functions to easily  //!
 * see which layers it needs to update in order  //!
 * to update the whole feature style. //!
 * @param {Object} [id] //!
 * @return {Store} this //!
 */
Store.prototype.assignFeatureLayer = function (id, layer) {
  //!
  var feature = this._features[id]; //!
  feature.layers[layer] = feature.ctx.map.getLayer(layer); //!
  return this; //!
}; //!

/**
 * Deletes a feature or array of features from the store.
 * Cleans up after the deletion by deselecting the features.
 * If changes were made, sets the state to the dirty
 * and fires an event.
 * @param {string | Array<string>} featureIds
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */
Store.prototype.delete = function (featureIds) {
  var _this2 = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  toDenseArray(featureIds).forEach(function (id) {
    if (!_this2._featureIds.has(id)) return;
    _this2._featureIds.delete(id);
    _this2._selectedFeatureIds.delete(id);
    if (!options.silent) {
      if (_this2._deletedFeaturesToEmit.indexOf(_this2._features[id]) === -1) {
        _this2._deletedFeaturesToEmit.push(_this2._features[id]);
      }
    }
    delete _this2._features[id];
    _this2.isDirty = true;
  });
  refreshSelectedCoordinates.call(this, options);
  return this;
};

/**
 * Returns a feature in the store matching the specified value.
 * @return {Object | undefined} feature
 */
Store.prototype.get = function (id) {
  return this._features[id];
};

/**
 * Returns all features in the store.
 * @return {Array<Object>}
 */
Store.prototype.getAll = function () {
  var _this3 = this;

  return Object.keys(this._features).map(function (id) {
    return _this3._features[id];
  });
};

/**
 * Adds features to the current selection.
 * @param {string | Array<string>} featureIds
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */
Store.prototype.select = function (featureIds) {
  var _this4 = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  toDenseArray(featureIds).forEach(function (id) {
    if (_this4._selectedFeatureIds.has(id)) return;
    _this4._selectedFeatureIds.add(id);
    _this4._changedFeatureIds.add(id);
    if (!options.silent) {
      _this4._emitSelectionChange = true;
    }
  });
  return this;
};

/**
 * Deletes features from the current selection.
 * @param {string | Array<string>} featureIds
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */
Store.prototype.deselect = function (featureIds) {
  var _this5 = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  toDenseArray(featureIds).forEach(function (id) {
    if (!_this5._selectedFeatureIds.has(id)) return;
    _this5._selectedFeatureIds.delete(id);
    _this5._changedFeatureIds.add(id);
    if (!options.silent) {
      _this5._emitSelectionChange = true;
    }
  });
  refreshSelectedCoordinates.call(this, options);
  return this;
};

/**
 * Clears the current selection.
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */
Store.prototype.clearSelected = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this.deselect(this._selectedFeatureIds.values(), { silent: options.silent });
  return this;
};

/**
 * Sets the store's selection, clearing any prior values.
 * If no feature ids are passed, the store is just cleared.
 * @param {string | Array<string> | undefined} featureIds
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */
Store.prototype.setSelected = function (featureIds) {
  var _this6 = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  featureIds = toDenseArray(featureIds);

  // Deselect any features not in the new selection
  this.deselect(this._selectedFeatureIds.values().filter(function (id) {
    return featureIds.indexOf(id) === -1;
  }), { silent: options.silent });

  // Select any features in the new selection that were not already selected
  this.select(featureIds.filter(function (id) {
    return !_this6._selectedFeatureIds.has(id);
  }), { silent: options.silent });

  return this;
};

/**
 * Sets the store's coordinates selection, clearing any prior values.
 * @param {Array<Array<string>>} coordinates
 * @return {Store} this
 */
Store.prototype.setSelectedCoordinates = function (coordinates) {
  this._selectedCoordinates = coordinates;
  this._emitSelectionChange = true;
  return this;
};

/**
 * Clears the current coordinates selection.
 * @param {Object} [options]
 * @return {Store} this
 */
Store.prototype.clearSelectedCoordinates = function () {
  this._selectedCoordinates = [];
  this._emitSelectionChange = true;
  return this;
};

/**
 * Returns the ids of features in the current selection.
 * @return {Array<string>} Selected feature ids.
 */
Store.prototype.getSelectedIds = function () {
  return this._selectedFeatureIds.values();
};

/**
 * Returns features in the current selection.
 * @return {Array<Object>} Selected features.
 */
Store.prototype.getSelected = function () {
  var _this7 = this;

  return this._selectedFeatureIds.values().map(function (id) {
    return _this7.get(id);
  });
};

/**
 * Returns selected coordinates in the currently selected feature.
 * @return {Array<Object>} Selected coordinates.
 */
Store.prototype.getSelectedCoordinates = function () {
  return this._selectedCoordinates;
};

/**
 * Indicates whether a feature is selected.
 * @param {string} featureId
 * @return {boolean} `true` if the feature is selected, `false` if not.
 */
Store.prototype.isSelected = function (featureId) {
  return this._selectedFeatureIds.has(featureId);
};

/**
 * Sets a property on the given feature
 * @param {string} featureId
 * @param {string} property property
 * @param {string} property value
*/
Store.prototype.setFeatureProperty = function (featureId, property, value) {
  this.get(featureId).setProperty(property, value);
  this.featureChanged(featureId);
};

function refreshSelectedCoordinates(options) {
  var _this8 = this;

  var newSelectedCoordinates = this._selectedCoordinates.filter(function (point) {
    return _this8._selectedFeatureIds.has(point.feature_id);
  });
  if (this._selectedCoordinates.length !== newSelectedCoordinates.length && !options.silent) {
    this._emitSelectionChange = true;
  }
  this._selectedCoordinates = newSelectedCoordinates;
}

},{"./lib/string_set":66,"./lib/throttle":69,"./lib/to_dense_array":70,"./render":80}],83:[function(require,module,exports){
'use strict';

var xtend = require('xtend');
var Constants = require('./constants');

var classTypes = ['mode', 'feature', 'mouse'];

module.exports = function (ctx) {

  var buttonElements = {};
  var activeButton = null;

  var currentMapClasses = {
    mode: null, // e.g. mode-direct_select
    feature: null, // e.g. feature-vertex
    mouse: null // e.g. mouse-move
  };

  var nextMapClasses = {
    mode: null,
    feature: null,
    mouse: null
  };

  function queueMapClasses(options) {
    nextMapClasses = xtend(nextMapClasses, options);
  }

  function updateMapClasses() {
    if (!ctx.container) return;

    var classesToRemove = [];
    var classesToAdd = [];

    classTypes.forEach(function (type) {
      if (nextMapClasses[type] === currentMapClasses[type]) return;

      classesToRemove.push(type + '-' + currentMapClasses[type]);
      if (nextMapClasses[type] !== null) {
        classesToAdd.push(type + '-' + nextMapClasses[type]);
      }
    });

    if (classesToRemove.length > 0) {
      ctx.container.classList.remove.apply(ctx.container.classList, classesToRemove);
    }

    if (classesToAdd.length > 0) {
      ctx.container.classList.add.apply(ctx.container.classList, classesToAdd);
    }

    currentMapClasses = xtend(currentMapClasses, nextMapClasses);
  }

  function createControlButton(id) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var button = document.createElement('button');
    button.className = Constants.classes.CONTROL_BUTTON + ' ' + options.className;
    button.setAttribute('title', options.title);
    options.container.appendChild(button);

    button.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var clickedButton = e.target;
      if (clickedButton === activeButton) {
        deactivateButtons();
        return;
      }

      setActiveButton(id);
      options.onActivate();
    }, true);

    return button;
  }

  function deactivateButtons() {
    if (!activeButton) return;
    activeButton.classList.remove(Constants.classes.ACTIVE_BUTTON);
    activeButton = null;
  }

  function setActiveButton(id) {
    deactivateButtons();

    var button = buttonElements[id];
    if (!button) return;

    if (button && id !== 'trash') {
      button.classList.add(Constants.classes.ACTIVE_BUTTON);
      activeButton = button;
    }
  }

  function addButtons() {
    var controls = ctx.options.controls;
    var controlGroup = document.createElement('div');
    controlGroup.className = Constants.classes.CONTROL_GROUP + ' ' + Constants.classes.CONTROL_BASE;

    if (!controls) return controlGroup;

    if (controls[Constants.types.LINE]) {
      buttonElements[Constants.types.LINE] = createControlButton(Constants.types.LINE, {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_LINE,
        title: 'LineString tool ' + (ctx.options.keybindings && '(l)'),
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_LINE_STRING);
        }
      });
    }

    if (controls[Constants.types.POLYGON]) {
      buttonElements[Constants.types.POLYGON] = createControlButton(Constants.types.POLYGON, {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_POLYGON,
        title: 'Polygon tool ' + (ctx.options.keybindings && '(p)'),
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_POLYGON);
        }
      });
    }

    if (controls[Constants.types.FLOW_ARROW]) {
      //!
      buttonElements[Constants.types.FLOW_ARROW] = createControlButton(Constants.types.FLOW_ARROW, { //!
        container: controlGroup, //!
        className: Constants.classes.CONTROL_BUTTON_FLOW_ARROW, //!
        title: 'Flow arrow tool ' + (ctx.options.keybindings && '(a)'), //!
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_SMOOTH_LINE_STRING, { source_for: 'flowarrow' });
        } //!
      }); //!
    } //!

    if (controls[Constants.types.MARKER]) {
      //!
      buttonElements[Constants.types.MARKER] = createControlButton(Constants.types.MARKER, { //!
        container: controlGroup, //!
        className: Constants.classes.CONTROL_BUTTON_MARKER, //!
        title: 'Marker tool ' + (ctx.options.keybindings && '(m)'), //!
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_POINT, { source_for: 'marker' });
        } //!
      }); //!
    } //!

    if (controls[Constants.types.FREEHAND]) {
      //!
      buttonElements[Constants.types.FREEHAND] = createControlButton(Constants.types.FREEHAND, { //!
        container: controlGroup, //!
        className: Constants.classes.CONTROL_BUTTON_FREEHAND, //!
        title: 'Freehand tool ' + (ctx.options.keybindings && '(f)'), //!
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_SMOOTH_LINE_STRING, { source_for: 'freehand' });
        } //!
      }); //!
    } //!

    if (controls[Constants.types.LABEL]) {
      //!
      buttonElements[Constants.types.LABEL] = createControlButton(Constants.types.LABEL, { //!
        container: controlGroup, //!
        className: Constants.classes.CONTROL_BUTTON_LABEL, //!
        title: 'Label tool ' + (ctx.options.keybindings && '(t)'), //!
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_POINT, { source_for: 'label' });
        } //!
      }); //!
    } //!

    if (controls[Constants.types.SHAPE]) {
      //!
      buttonElements[Constants.types.SHAPE] = createControlButton(Constants.types.SHAPE, { //!
        container: controlGroup, //!
        className: Constants.classes.CONTROL_BUTTON_SHAPE, //!
        title: 'Shape tool ' + (ctx.options.keybindings && '(s)'), //!
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_SMOOTH_LINE_STRING, { source_for: 'shape' });
        } //!
      }); //!
    } //!

    buttonElements[Constants.types.TO_JSON] = createControlButton(Constants.types.TO_JSON, { //!
      container: controlGroup, //!
      className: Constants.classes.CONTROL_BUTTON_TO_JSON, //!
      title: 'Get GeoJSON of all features', //!
      onActivate: function onActivate() {
        var output = JSON.stringify(ctx.api.getAll().features);
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummy_id");
        document.getElementById("dummy_id").value = output;
        dummy.select();
        document.execCommand("copy");
        // Remove it as its not needed anymore
        document.body.removeChild(dummy);
        // console.log(output);
        console.log('prepare to save');
        var pointsFeatures = [];
        var linesFeatures = [];
        var polygonsFeatures = [];
        ctx.api.getAll().features.forEach(feature => {
          switch (feature.geometry.type) {
            case 'Point':
              pointsFeatures.push(feature);
              break;
            case 'LineString':
              linesFeatures.push(feature);
              break;
            case 'Polygon':
              polygonsFeatures.push(feature);
              break;
            default:
              console.log(feature);
          }
        });
        
        var pointsFeatureCollection = {
          "type": "FeatureCollection",
          "features": pointsFeatures
        };
        var linesFeatureCollection = {
          "type": "FeatureCollection",
          "features": linesFeatures
        };
        var polygonsFeatureCollection = {
          "type": "FeatureCollection",
          "features": polygonsFeatures
        };

        var anotations = {
          "points": pointsFeatureCollection,
          "lines": linesFeatureCollection,
          "polygons": polygonsFeatureCollection
        }

        var stringified = JSON.stringify(anotations);

        // console.log('stringified: ' + stringified);

        localStorage.setItem('anotations', stringified);

        console.log('saved to localStorage');

        alert("saved");

        /*console.log('Points');
        if (pointsFeatures.length > 0) {
          var a = document.createElement('a');
          a.setAttribute('href', 'data:text/plain;charset=utf-u,'+ encodeURIComponent(JSON.stringify(pointsFeatureCollection)));
          a.setAttribute('download', 'data_points.geojson');
          a.click();
          // $.ajax({
          //   url : 'data_points.geojson',
          //   //  method : 'post',
          //   type : 'POST',
          //   data : {
          //     jsonStr: polygonsFeatures
          //   },
          //   success : function(data){
          //     alert("success");
          //   }
          // });
        }

        console.log('Lines');
        if (linesFeatures.length > 0) {
          var b = document.createElement('a');
          b.setAttribute('href', 'data:text/plain;charset=utf-u,'+ encodeURIComponent(JSON.stringify(linesFeatureCollection)));
          b.setAttribute('download', 'data_lines.geojson');
          b.click();
          // $.ajax({
          //   url : 'data_lines.geojson',
          //   //  method : 'post',
          //   type : 'POST',
          //   data : {
          //     jsonStr: polygonsFeatures
          //   },
          //   success : function(data){
          //     alert("success");
          //   }
          // });
        }

        console.log('Polygons');
        if (polygonsFeatures.length > 0) {
          var c = document.createElement('a');
          c.setAttribute('href', 'data:text/plain;charset=utf-u,'+ encodeURIComponent(JSON.stringify(polygonsFeatureCollection)));
          c.setAttribute('download', 'data_polygons.geojson');
          c.click();
          // $.ajax({
          //   url : 'data_polygons.geojson',
          //   //  method : 'post',
          //   type : 'POST',
          //   data : {
          //     jsonStr: polygonsFeatures
          //   },
          //   success : function(data){
          //     alert("success");
          //   }
          // });
        }*/

      } //!
    }); //!

    if (controls.trash) {
      buttonElements.trash = createControlButton('trash', {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_TRASH,
        title: 'Delete',
        onActivate: function onActivate() {
          ctx.events.trash();
        }
      });
    }

    // if (controls.combine_features) {
    //   buttonElements.combine_features = createControlButton('combineFeatures', {
    //     container: controlGroup,
    //     className: Constants.classes.CONTROL_BUTTON_COMBINE_FEATURES,
    //     title: 'Combine',
    //     onActivate: () => {
    //       ctx.events.combineFeatures();
    //     }
    //   });
    // }
    //
    // if (controls.uncombine_features) {
    //   buttonElements.uncombine_features = createControlButton('uncombineFeatures', {
    //     container: controlGroup,
    //     className: Constants.classes.CONTROL_BUTTON_UNCOMBINE_FEATURES,
    //     title: 'Uncombine',
    //     onActivate: () => {
    //       ctx.events.uncombineFeatures();
    //     }
    //   });
    // }

    return controlGroup;
  }

  function removeButtons() {
    Object.keys(buttonElements).forEach(function (buttonId) {
      var button = buttonElements[buttonId];
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
      delete buttonElements[buttonId];
    });
  }

  return {
    setActiveButton: setActiveButton,
    queueMapClasses: queueMapClasses,
    updateMapClasses: updateMapClasses,
    addButtons: addButtons,
    removeButtons: removeButtons
  };
};

},{"./constants":33,"xtend":23}]},{},[1])(1)
});