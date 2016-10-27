! function e(t, n, o) {
    function i(r, u) {
        if (!n[r]) {
            if (!t[r]) {
                var c = "function" == typeof require && require;
                if (!u && c) return c(r, !0);
                if (s) return s(r, !0);
                var d = new Error("Cannot find module '" + r + "'");
                throw d.code = "MODULE_NOT_FOUND", d
            }
            var h = n[r] = {
                exports: {}
            };
            t[r][0].call(h.exports, function(e) {
                var n = t[r][1][e];
                return i(n ? n : e)
            }, h, h.exports, e, t, n, o)
        }
        return n[r].exports
    }
    for (var s = "function" == typeof require && require, r = 0; r < o.length; r++) i(o[r]);
    return i
}({
    1: [function(e, t, n) {
        "use strict";

        function o(e, t) {
            mapboxgl.util.bindHandlers(this);
            var n = document.createElement("div");
            n.className = "compare-swiper";
            n.addEventListener("mousedown", this._onDown);
            n.addEventListener("touchstart", this._onDown);
            this._container = document.createElement("div");
            this._container.className = "mapboxgl-compare";
            this._container.appendChild(n);
            e.getContainer().appendChild(this._container);
            this._clippedMap = t;
            this._bounds = t.getContainer().getBoundingClientRect();
            this._setPosition(this._bounds.width / 2), i(e, t), t.on("resize", function() {
                this._bounds = t.getContainer().getBoundingClientRect(), this._x && this._setPosition(this._x)
            }.bind(this))
        }
        var i = e("mapbox-gl-sync-move");
        o.prototype = {
            _onDown: function(e) {
                e.touches ? (document.addEventListener("touchmove", this._onMove), document.addEventListener("touchend", this._onTouchEnd)) : (document.addEventListener("mousemove", this._onMove), document.addEventListener("mouseup", this._onMouseUp))
            },
            _setPosition: function(e) {
                var t = "translate(" + e + "px, 0)";
                this._container.style.transform = t, this._container.style.WebkitTransform = t, this._clippedMap.getContainer().style.clip = "rect(0, 999em, " + this._bounds.height + "px," + e + "px)", this._x = e
            },
            _onMove: function(e) {
                this._setPosition(this._getX(e))
            },
            _onMouseUp: function() {
                document.removeEventListener("mousemove", this._onMove), document.removeEventListener("mouseup", this._onMouseUp)
            },
            _onTouchEnd: function() {
                document.removeEventListener("touchmove", this._onMove), document.removeEventListener("touchend", this._onTouchEnd)
            },
            _getX: function(e) {
                e = e.touches ? e.touches[0] : e;
                var t = e.clientX - this._bounds.left;
                return 0 > t && (t = 0), t > this._bounds.width && (t = this._bounds.width), t
            }
        }, window.mapboxgl ? mapboxgl.Compare = o : "undefined" != typeof t && (t.exports = o)
    }, {
        "mapbox-gl-sync-move": 2
    }],
    2: [function(e, t, n) {
        function o(e, t) {
            t.jumpTo({
                center: e.getCenter(),
                zoom: e.getZoom(),
                bearing: e.getBearing(),
                pitch: e.getPitch()
            })
        }

        function i(e, t) {
            function n() {
                e.on("move", s), t.on("move", r)
            }

            function i() {
                e.off("move", s), t.off("move", r)
            }

            function s() {
                i(), o(e, t), n()
            }

            function r() {
                i(), o(t, e), n()
            }
            n()
        }
        t.exports = i
    }, {}]
}, {}, [1]);