/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COLORS_1 = __webpack_require__(8);
const LineProperties_1 = __webpack_require__(17);
const Point_1 = __webpack_require__(1);
const configuration = {
    newLinePreviewProperties: new LineProperties_1.LineProperties(COLORS_1.COLORS.BLUE, 2),
    newPolygonLineProperties: new LineProperties_1.LineProperties(COLORS_1.COLORS.RED, 1),
    polygonLineProperties: LineProperties_1.LineProperties.getDefault(),
    applicationUIContainerID: 'application-ui',
    hitTolerance: 10,
    minPolygonPoints: 3,
    doubleClickMaxDelay: 500,
    displayPathGhostWhenDragging: false,
    epsilon: 10e-4,
    lineDeviationAllowanceInDegrees: 20,
    canvasFont: '30pt serif',
    lineConditionLabelOffset: new Point_1.Point(5, 0)
};
exports.configuration = configuration;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Octant_1 = __webpack_require__(15);
class Point {
    constructor(x, y) {
        this.moveCallback = null;
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    static add(p1, p2) {
        return new Point(p1.x + p2.x, p1.y + p2.y);
    }
    static subtract(p1, p2) {
        return new Point(p1.x - p2.x, p1.y - p2.y);
    }
    static getDistanceBetween(p1, p2) {
        return Math.sqrt(Point.getDistanceBetweenSquared(p1, p2));
    }
    static getDistanceBetweenSquared(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    static getAngle(p1, p2) {
        let angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x)) * 180 / Math.PI;
        if (angle < 0) {
            angle += 360;
        }
        return angle;
    }
    moveTo(pointOrX, y) {
        if (typeof pointOrX === 'number') {
            if (!y) {
                throw new Error('x is defined, but y is not defined');
            }
            return this.moveToCoordinates(pointOrX, y);
        }
        return this.moveToPoint(pointOrX);
    }
    getOctant() {
        const x = this.x;
        const y = this.y;
        let octant = Octant_1.Octant.First;
        if (y >= 0) {
            if (x >= 0) {
                // First quarter
                if (y <= x) {
                    octant = Octant_1.Octant.First;
                }
                else {
                    octant = Octant_1.Octant.Second;
                }
            }
            else {
                // Second quarter
                if (y >= -x) {
                    octant = Octant_1.Octant.Third;
                }
                else {
                    octant = Octant_1.Octant.Fourth;
                }
            }
        }
        else {
            if (x <= 0) {
                // Third quarter
                if (y >= x) {
                    octant = Octant_1.Octant.Fifth;
                }
                else {
                    octant = Octant_1.Octant.Sixth;
                }
            }
            else {
                // Fourth quarter
                if (y < -x) {
                    octant = Octant_1.Octant.Seventh;
                }
                else {
                    octant = Octant_1.Octant.Eighth;
                }
            }
        }
        return octant;
    }
    equals(point) {
        return this.x === point.x && this.y === point.y;
    }
    getDistanceTo(point) {
        return Point.getDistanceBetween(this, point);
    }
    getDistanceSquaredTo(point) {
        return Point.getDistanceBetweenSquared(this, point);
    }
    clone() {
        return new Point(this.x, this.y);
    }
    moveToPoint(point) {
        return this.moveToCoordinates(point.x, point.y);
    }
    moveToCoordinates(x, y) {
        this._x = x;
        this._y = y;
        if (this.moveCallback) {
            this.moveCallback();
        }
    }
}
exports.Point = Point;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Dictionary
const LEX = {
    POLYGON_LAYER_NAME: 'PolygonLayer',
    PATH_LAYER_NAME: 'PathLayer',
    PATH_GHOST_LAYER_NAME: 'PathGhostLayer',
    NEW_CONDITION_EVENT_NAME: 'new-condition',
    REMOVE_CONDITION_EVENT_NAME: 'remove-condition',
    KEY_CODE: {
        ESCAPE: 27
    }
};
exports.LEX = LEX;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(1);
class Line {
    constructor(p1, p2) {
        if (p1.equals(p2)) {
            throw new Error('Cannot create line between points at the same coordinates');
        }
        this.p1 = p1;
        this.p2 = p2;
    }
    distanceToPoint(p) {
        const p1 = this.p1;
        const p2 = this.p2;
        let t = ((p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y)) /
            Point_1.Point.getDistanceBetweenSquared(p1, p2);
        t = Math.max(0, Math.min(1, t));
        return p.getDistanceTo(new Point_1.Point(p1.x + t * (p2.x - p1.x), p1.y + t * (p2.y - p1.y)));
    }
    equals(line) {
        return ((this.p1.equals(line.p1) && this.p2.equals(line.p2)) ||
            (this.p1.equals(line.p2) && this.p2.equals(line.p1)));
    }
    getMiddlePoint() {
        return new Point_1.Point((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2);
    }
    getLength() {
        return Point_1.Point.getDistanceBetween(this.p1, this.p2);
    }
}
exports.Line = Line;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class RenderEvent {
    constructor() {
        this.payload = null;
        this.eventType = RenderEvent.eventType;
        this.handled = false;
    }
    static get eventType() {
        return 'RenderEvent';
    }
}
exports.RenderEvent = RenderEvent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SyncComponentsEvent {
    constructor() {
        this.payload = null;
        this.eventType = SyncComponentsEvent.eventType;
        this.handled = false;
    }
    static get eventType() {
        return 'SyncComponentsEvent';
    }
}
exports.SyncComponentsEvent = SyncComponentsEvent;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(28);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __webpack_require__(38);
exports.COLORS = {
    BLACK: new Color_1.Color(0, 0, 0),
    RED: new Color_1.Color(255, 0, 0),
    BLUE: new Color_1.Color(0, 255, 0),
    GREEN: new Color_1.Color(0, 0, 255)
};
Object.freeze(exports.COLORS);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = __webpack_require__(3);
const Path_1 = __webpack_require__(16);
const configuration_1 = __webpack_require__(0);
class Polygon extends Path_1.Path {
    constructor(pathOrVertices, lineProperties) {
        let vertices;
        if (pathOrVertices instanceof Path_1.Path) {
            const path = pathOrVertices;
            vertices = path.getVertices();
            lineProperties = path.lineProperties;
        }
        else {
            vertices = pathOrVertices;
            lineProperties = lineProperties;
        }
        Polygon.ensureVerticesLength(vertices);
        super(vertices, lineProperties);
        this.closed = true;
        this.lineConditions = [];
    }
    static ensureVerticesLength(vertices) {
        if (vertices.length >= configuration_1.configuration.minPolygonPoints) {
            return;
        }
        throw new Error(`Polygon must have at least ${configuration_1.configuration.minPolygonPoints} vertices`);
    }
    clone() {
        const polygon = new Polygon(super.clone());
        this.lineConditions.forEach(lineCondition => {
            const p1Index = this.findPointIndex(lineCondition.line.p1);
            const p2Index = this.findPointIndex(lineCondition.line.p2);
            const newLineCondition = lineCondition.duplicateForNewLine(new Line_1.Line(polygon.vertices[p1Index], polygon.vertices[p2Index]), polygon);
            polygon.lineConditions.push(newLineCondition);
        });
        return polygon;
    }
    insertVertex(point, index) {
        const previousPointIndex = this.getPreviousPointIndex(index);
        const previousLine = new Line_1.Line(this.getVertex(previousPointIndex), this.getVertex(index));
        const matchingConditions = this.lineConditions.filter(lineCondition => lineCondition.line.equals(previousLine));
        if (matchingConditions.length > 0) {
            throw new Error(`Cannot insert a point because of an existing condition (${matchingConditions[0].constructor
                .name})`);
        }
        super.insertVertex(point, index);
    }
    getNextPointIndex(index) {
        return (index + 1) % this.getVerticesCount();
    }
    getNextPoint(point) {
        const index = this.vertices.indexOf(point);
        const nextPointIndex = this.getNextPointIndex(index);
        return this.getVertex(nextPointIndex);
    }
    getPreviousPointIndex(index) {
        let previousPointIndex = index - 1;
        if (previousPointIndex < 0) {
            previousPointIndex = this.getVerticesCount() - 1;
        }
        return previousPointIndex;
    }
    getPreviousPoint(point) {
        const index = this.vertices.indexOf(point);
        const previousPointIndex = this.getPreviousPointIndex(index);
        return this.getVertex(previousPointIndex);
    }
    removeVertex(point) {
        if (this.getVerticesCount() === configuration_1.configuration.minPolygonPoints) {
            throw new Error('Cannot delete vertex');
        }
        super.removeVertex(point);
        const lineConditionsToRemove = this.lineConditions.filter(lineCondition => lineCondition.line.p1 === point || lineCondition.line.p2 === point);
        lineConditionsToRemove.forEach(lineCondition => this.removeLineCondition(lineCondition));
    }
    addLineCondition(lineCondition) {
        if (lineCondition.polygon !== this) {
            throw new Error('Line condition bound to wrong polygon');
        }
        const p1Index = this.findPointIndex(lineCondition.line.p1);
        const p2Index = this.findPointIndex(lineCondition.line.p2);
        if (p1Index === -1 || p2Index === -2) {
            throw new Error('Line condition bound to wrong line');
        }
        if (!lineCondition.isMet()) {
            throw new Error('Line condition is not met');
        }
        this.lineConditions.push(lineCondition);
    }
    removeLineCondition(lineCondition) {
        const index = this.lineConditions.indexOf(lineCondition);
        if (index === -1) {
            throw new Error('Line condition not found');
        }
        this.lineConditions.splice(index, 1);
    }
    getLineConditions() {
        return [...this.lineConditions];
    }
    moveTo(polygon) {
        if (this.getVerticesCount() !== polygon.getVerticesCount()) {
            throw new Error('The number of vertices does not match');
        }
        this.vertices.forEach((point, index) => point.moveTo(polygon.getVertex(index)));
    }
}
exports.Polygon = Polygon;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Layer {
    constructor(name) {
        this.paths = [];
        this.name = name;
    }
    render(renderer) {
        this.paths.forEach(path => renderer.drawPath(path));
    }
    removePath(path) {
        const index = this.paths.indexOf(path);
        if (index === -1) {
            return;
        }
        this.paths.splice(index, 1);
    }
    hitTest(point) {
        for (const path of this.paths) {
            const result = path.hitTest(point);
            if (!result) {
                continue;
            }
            result.layer = this;
            return result;
        }
        return null;
    }
}
exports.Layer = Layer;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LineCondition {
    constructor(line, polygon) {
        this.line = line;
        this.polygon = polygon;
    }
    isMet() {
        throw new Error('LineCondition.isMet not implemented');
    }
    fix(_lockedPoint) {
        throw new Error('LineCondition.fix not implemented');
    }
    duplicateForNewLine(_line, _polygon) {
        throw new Error('Not implemented');
    }
    verifyCanBeApplied() {
        throw new Error('Not implemented');
    }
    getLabel() {
        throw new Error('Not implemented');
    }
}
exports.LineCondition = LineCondition;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LEX_1 = __webpack_require__(2);
__webpack_require__(46);
const LINE_CONDITION_ACTIVE_CLASS = 'line-condition--active';
class LineConditionElement extends HTMLElement {
    constructor(dependencies) {
        super();
        this.selectedTarget = dependencies.selectedTarget;
        this.button = document.createElement('button');
        this.button.className = 'line-condition__button';
        this.button.addEventListener('click', this.onButtonClick.bind(this));
    }
    connectedCallback() {
        this.appendChild(this.button);
    }
    disconnectedCallback() {
        this.removeChild(this.button);
    }
    updateButton() {
        const targetConditions = this.getTargetConditions();
        const otherConditions = this.getOtherTargetConditions(targetConditions);
        this.button.disabled = otherConditions.length > 0;
        if (targetConditions.length - otherConditions.length === 1) {
            this.classList.add(LINE_CONDITION_ACTIVE_CLASS);
        }
        else {
            this.classList.remove(LINE_CONDITION_ACTIVE_CLASS);
        }
    }
    createNewCondition() {
        throw new Error('Not implemented');
    }
    getLineConditionConstructor() {
        throw new Error('Not implemented');
    }
    onButtonClick(event) {
        event.stopPropagation();
        const targetConditions = this.getTargetConditions();
        const otherConditions = this.getOtherTargetConditions(targetConditions);
        if (targetConditions.length - otherConditions.length === 1) {
            const condition = targetConditions[0];
            this.dispatchEvent(new CustomEvent(LEX_1.LEX.REMOVE_CONDITION_EVENT_NAME, { bubbles: true, detail: condition }));
        }
        else {
            const condition = this.createNewCondition();
            if (!condition) {
                return;
            }
            this.dispatchEvent(new CustomEvent(LEX_1.LEX.NEW_CONDITION_EVENT_NAME, { bubbles: true, detail: condition }));
        }
    }
    getTargetConditions() {
        if (!this.selectedTarget.line || !this.selectedTarget.polygon) {
            throw new Error('Target not selected');
        }
        const polygon = this.selectedTarget.polygon;
        const line = this.selectedTarget.line;
        const lineConditions = polygon.getLineConditions();
        return lineConditions.filter(lineCondition => lineCondition.line.equals(line));
    }
    getOtherTargetConditions(targetConditions) {
        const lineConditionConstructor = this.getLineConditionConstructor();
        return targetConditions.filter(lineCondition => !(lineCondition instanceof lineConditionConstructor));
    }
}
exports.LineConditionElement = LineConditionElement;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LineClickEvent {
    constructor(line, path, position) {
        this.eventType = LineClickEvent.eventType;
        this.handled = false;
        this.payload = {
            line,
            path,
            position
        };
    }
    static get eventType() {
        return 'LineClickEvent';
    }
}
exports.LineClickEvent = LineClickEvent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PointClickEvent {
    constructor(pathPointComponent) {
        this.eventType = PointClickEvent.eventType;
        this.handled = false;
        this.payload = pathPointComponent;
    }
    static get eventType() {
        return 'PointClickEvent';
    }
}
exports.PointClickEvent = PointClickEvent;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Octant;
(function (Octant) {
    Octant[Octant["First"] = 0] = "First";
    Octant[Octant["Second"] = 1] = "Second";
    Octant[Octant["Third"] = 2] = "Third";
    Octant[Octant["Fourth"] = 3] = "Fourth";
    Octant[Octant["Fifth"] = 4] = "Fifth";
    Octant[Octant["Sixth"] = 5] = "Sixth";
    Octant[Octant["Seventh"] = 6] = "Seventh";
    Octant[Octant["Eighth"] = 7] = "Eighth";
})(Octant = exports.Octant || (exports.Octant = {}));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HitTestResult_1 = __webpack_require__(39);
const Line_1 = __webpack_require__(3);
const configuration_1 = __webpack_require__(0);
class Path {
    constructor(vertices, lineProperties) {
        this.closed = false;
        this.vertices = vertices;
        this.lineProperties = lineProperties;
    }
    *getVerticesIterator() {
        const verticesCount = this.vertices.length;
        for (let i = 0; i < verticesCount; i += 1) {
            yield this.vertices[i];
        }
        if (this.closed && verticesCount > 0) {
            yield this.vertices[0];
        }
    }
    *getLineIterator() {
        let previousPoint;
        for (const point of this.getVerticesIterator()) {
            if (!previousPoint) {
                previousPoint = point;
                continue;
            }
            yield new Line_1.Line(previousPoint, point);
            previousPoint = point;
        }
    }
    getStartingPoint() {
        return this.vertices[0];
    }
    getVerticesCount() {
        return this.vertices.length;
    }
    getLineProperties() {
        return this.lineProperties;
    }
    hitTest(point) {
        for (const line of this.getLineIterator()) {
            if (line.distanceToPoint(point) <= configuration_1.configuration.hitTolerance) {
                return new HitTestResult_1.HitTestResult(line, this);
            }
        }
        return null;
    }
    getVertex(index) {
        return this.vertices[index];
    }
    getVertices() {
        return this.vertices;
    }
    addVertex(point) {
        this.vertices.push(point);
    }
    removeVertex(point) {
        const index = this.findPointIndex(point);
        if (index !== -1) {
            this.vertices.splice(index, 1);
        }
    }
    insertVertex(point, index) {
        this.vertices.splice(index, 0, point);
    }
    clone() {
        const vertices = [...this.getVertices().map(point => point.clone())];
        const lineProperties = this.lineProperties.clone();
        return new Path(vertices, lineProperties);
    }
    findPointIndex(point) {
        return this.vertices.indexOf(point);
    }
}
exports.Path = Path;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COLORS_1 = __webpack_require__(8);
class LineProperties {
    constructor(color, thickness) {
        this.color = color;
        this.thickness = thickness;
    }
    static getDefault() {
        return new LineProperties(COLORS_1.COLORS.BLACK, 1);
    }
    clone() {
        return new LineProperties(this.color, this.thickness);
    }
}
exports.LineProperties = LineProperties;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(1);
const LineCondition_1 = __webpack_require__(11);
const configuration_1 = __webpack_require__(0);
const maxDeviation = configuration_1.configuration.lineDeviationAllowanceInDegrees;
const allowedDegreeRanges = [
    [0, maxDeviation],
    [180 - maxDeviation, 180 + maxDeviation],
    [360 - maxDeviation, 360]
];
class HorizontalLineCondition extends LineCondition_1.LineCondition {
    isMet() {
        return this.line.p1.y === this.line.p2.y;
    }
    fix(lockedPoint) {
        if (lockedPoint === this.line.p1) {
            this.alignPointsHorizontally(this.line.p2, this.line.p1);
        }
        else if (lockedPoint === this.line.p2) {
            this.alignPointsHorizontally(this.line.p1, this.line.p2);
        }
        else {
            throw new Error('Locked point does not match either point on the line');
        }
    }
    duplicateForNewLine(line, polygon) {
        return new HorizontalLineCondition(line, polygon);
    }
    verifyCanBeApplied() {
        const angle = Point_1.Point.getAngle(this.line.p1, this.line.p2);
        if (!allowedDegreeRanges.some(degreeRange => angle >= degreeRange[0] && angle <= degreeRange[1])) {
            throw new Error('Line is not horizontal enough');
        }
    }
    getLabel() {
        return '-';
    }
    alignPointsHorizontally(subject, destination) {
        subject.moveTo(new Point_1.Point(subject.x, destination.y));
    }
}
exports.HorizontalLineCondition = HorizontalLineCondition;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(1);
const LineCondition_1 = __webpack_require__(11);
const configuration_1 = __webpack_require__(0);
const maxDeviation = configuration_1.configuration.lineDeviationAllowanceInDegrees;
const allowedDegreeRanges = [
    [90 - maxDeviation, 90 + maxDeviation],
    [270 - maxDeviation, 270 + maxDeviation]
];
class VerticalLineCondition extends LineCondition_1.LineCondition {
    isMet() {
        return this.line.p1.x === this.line.p2.x;
    }
    fix(lockedPoint) {
        if (lockedPoint === this.line.p1) {
            this.alignPointsVertically(this.line.p2, this.line.p1);
        }
        else if (lockedPoint === this.line.p2) {
            this.alignPointsVertically(this.line.p1, this.line.p2);
        }
        else {
            throw new Error('Locked point does not match either point on the line');
        }
    }
    duplicateForNewLine(line, polygon) {
        return new VerticalLineCondition(line, polygon);
    }
    verifyCanBeApplied() {
        const angle = Point_1.Point.getAngle(this.line.p1, this.line.p2);
        if (!allowedDegreeRanges.some(degreeRange => angle >= degreeRange[0] && angle <= degreeRange[1])) {
            throw new Error('Line is not vertical enough');
        }
    }
    getLabel() {
        return '|';
    }
    alignPointsVertically(subject, destination) {
        subject.moveTo(new Point_1.Point(destination.x, subject.y));
    }
}
exports.VerticalLineCondition = VerticalLineCondition;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = __webpack_require__(3);
var FixingDirection;
(function (FixingDirection) {
    FixingDirection[FixingDirection["Normal"] = 0] = "Normal";
    FixingDirection[FixingDirection["Reverse"] = 1] = "Reverse";
})(FixingDirection = exports.FixingDirection || (exports.FixingDirection = {}));
class ConditionFixer {
    constructor(polygon, startingPoint, additionalLineConditions = [], direction = FixingDirection.Normal) {
        this.polygon = polygon;
        this.startingPoint = startingPoint;
        this.additionalLineConditions = additionalLineConditions;
        this.direction = direction;
    }
    get fixSuccessful() {
        if (this._fixSuccessful === undefined) {
            throw new Error('tryFix needs to be called first');
        }
        return this._fixSuccessful;
    }
    tryFix() {
        if (this._fixSuccessful !== undefined) {
            throw new Error('ConditionFixer needs to be reset before fixing again');
        }
        const points = this.polygon.getVertices();
        const lineConditions = [...this.polygon.getLineConditions(), ...this.additionalLineConditions];
        const startingPointIndex = this.polygon.findPointIndex(this.startingPoint);
        let lockedPointIndex = startingPointIndex;
        let currentPointIndex = this.getNextPointIndex(lockedPointIndex);
        while (currentPointIndex !== startingPointIndex) {
            const currentLine = new Line_1.Line(points[lockedPointIndex], points[currentPointIndex]);
            const currentLineConditions = lineConditions.filter(lineCondition => lineCondition.line.equals(currentLine));
            currentLineConditions
                .filter(lineCondition => !lineCondition.isMet())
                .forEach(lineCondition => lineCondition.fix(points[lockedPointIndex]));
            lockedPointIndex = currentPointIndex;
            currentPointIndex = this.getNextPointIndex(currentPointIndex);
        }
        this._fixSuccessful = lineConditions.every(lineCondition => lineCondition.isMet());
    }
    reset() {
        this._fixSuccessful = undefined;
    }
    getNextPointIndex(currentPointIndex) {
        if (this.direction === FixingDirection.Reverse) {
            return this.polygon.getPreviousPointIndex(currentPointIndex);
        }
        return this.polygon.getNextPointIndex(currentPointIndex);
    }
}
exports.ConditionFixer = ConditionFixer;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FinishPointDragEvent {
    constructor(pathPointComponent) {
        this.eventType = FinishPointDragEvent.eventType;
        this.handled = false;
        this.payload = pathPointComponent;
    }
    static get eventType() {
        return 'FinishPointDragEvent';
    }
}
exports.FinishPointDragEvent = FinishPointDragEvent;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PointDragEvent {
    constructor(pathPointComponent, newPosition) {
        this.eventType = PointDragEvent.eventType;
        this.handled = false;
        this.payload = {
            component: pathPointComponent,
            newPosition
        };
    }
    static get eventType() {
        return 'PointDragEvent';
    }
}
exports.PointDragEvent = PointDragEvent;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class StartPointDragEvent {
    constructor(pathPointComponent) {
        this.eventType = StartPointDragEvent.eventType;
        this.handled = false;
        this.payload = pathPointComponent;
    }
    static get eventType() {
        return 'StartPointDragEvent';
    }
}
exports.StartPointDragEvent = StartPointDragEvent;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(64);
class InstructionsDialog extends HTMLElement {
    constructor() {
        super();
        this.className = 'instructions-dialog-wrapper';
        this.overlay = document.createElement('div');
        this.overlay.className = 'instructions-dialog__overlay';
        this.dialogContainer = document.createElement('div');
        this.dialogContainer.className = 'instructions-dialog';
        const title = document.createElement('h1');
        title.textContent = 'Instructions';
        title.className = 'instructions-dialog__title';
        this.dialogContainer.appendChild(title);
        this.dialogContainer.appendChild(this.createUsageList());
        this.dismissButton = document.createElement('button');
        this.dismissButton.textContent = 'Dismiss';
        this.dismissButton.className = 'instructions-dialog__dismiss-button';
        this.dialogContainer.appendChild(this.dismissButton);
        this.dismiss = this.dismiss.bind(this);
    }
    connectedCallback() {
        this.appendChild(this.overlay);
        this.appendChild(this.dialogContainer);
        this.dismissButton.addEventListener('click', this.dismiss);
        this.overlay.addEventListener('click', this.dismiss);
        requestAnimationFrame(() => {
            this.overlay.classList.add('instructions-dialog__overlay--active');
            this.dialogContainer.classList.add('instructions-dialog--active');
        });
    }
    disconnectedCallback() {
        this.removeChild(this.overlay);
        this.removeChild(this.dialogContainer);
        this.dismissButton.removeEventListener('click', this.dismiss);
        this.overlay.removeEventListener('click', this.dismiss);
        this.overlay.classList.remove('instructions-dialog__overlay--active');
        this.dialogContainer.classList.remove('instructions-dialog--active');
    }
    dismiss() {
        this.remove();
    }
    createUsageList() {
        const list = document.createElement('ul');
        const usage = [
            'Click on the free space in the canvas to start creating vertices',
            'Click on the initial vertex to close the path into a polygon',
            'Alternatively, you may press Escape to cancel adding a new path',
            'Click and drag the vertex to move it',
            'Double click on an edge to add a vertex in the middle of it',
            'Double click on a vertex to remove it',
            'Click an edge to add or remove an edge relation'
        ];
        usage.map(usageItemText => this.createUsageListItem(usageItemText))
            .forEach(usageListItem => list.appendChild(usageListItem));
        return list;
    }
    createUsageListItem(textContent) {
        const item = document.createElement('li');
        item.textContent = textContent;
        return item;
    }
}
exports.InstructionsDialog = InstructionsDialog;
window.customElements.define('app-instructions-dialog', InstructionsDialog);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(26);
__webpack_require__(29);
__webpack_require__(30);
const Application_1 = __webpack_require__(32);
window.addEventListener('load', bootstrap, false);
function bootstrap() {
    const canvasId = 'main-canvas';
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('Canvas with id', canvasId, 'not found');
        return;
    }
    const application = new Application_1.Application(canvas);
    application.init();
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "html, body {\n  box-sizing: border-box; }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  line-height: 1.5; }\n\n.main-canvas {\n  border: solid 1px black; }\n\n.main-container {\n  width: 100%;\n  margin: 0 1em; }\n\n.canvas-wrapper {\n  width: 100%;\n  position: relative; }\n\n.application-ui {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none; }\n  .application-ui * {\n    pointer-events: all; }\n\n.app-header {\n  margin-bottom: 1em;\n  margin-left: 1em; }\n\n.app-name {\n  margin: 0; }\n\n.footer {\n  margin: 1em 1em; }\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function(){/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';var J="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,Aa="function"==typeof Object.defineProperties?Object.defineProperty:function(g,q,N){g!=Array.prototype&&g!=Object.prototype&&(g[q]=N.value)};function sb(){sb=function(){};J.Symbol||(J.Symbol=tb)}var tb=function(){var g=0;return function(q){return"jscomp_symbol_"+(q||"")+g++}}();
function dd(){sb();var g=J.Symbol.iterator;g||(g=J.Symbol.iterator=J.Symbol("iterator"));"function"!=typeof Array.prototype[g]&&Aa(Array.prototype,g,{configurable:!0,writable:!0,value:function(){return ed(this)}});dd=function(){}}function ed(g){var q=0;return fd(function(){return q<g.length?{done:!1,value:g[q++]}:{done:!0}})}function fd(g){dd();g={next:g};g[J.Symbol.iterator]=function(){return this};return g}function gd(g){dd();var q=g[Symbol.iterator];return q?q.call(g):ed(g)}
function hd(g){for(var q,N=[];!(q=g.next()).done;)N.push(q.value);return N}
(function(){function g(){var a=this;this.m={};this.g=document.documentElement;var b=new Ba;b.rules=[];this.h=v.set(this.g,new v(b));this.i=!1;this.b=this.a=null;ub(function(){a.c()})}function q(){this.customStyles=[];this.enqueued=!1}function N(){}function ha(a){this.cache={};this.c=void 0===a?100:a}function n(){}function v(a,b,c,d,e){this.D=a||null;this.b=b||null;this.la=c||[];this.N=null;this.V=e||"";this.a=this.A=this.J=null}function u(){}function Ba(){this.end=this.start=0;this.rules=this.parent=
this.previous=null;this.cssText=this.parsedCssText="";this.atRule=!1;this.type=0;this.parsedSelector=this.selector=this.keyframesName=""}function id(a){function b(b,c){Object.defineProperty(b,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(b){var d=this,e=void 0;t(this)&&(e=[],O(this,function(a){a!==d&&e.push(a)}));c.set.call(this,b);if(e)for(var f=0;f<e.length;f++){var k=e[f];1===k.__CE_state&&a.disconnectedCallback(k)}this.ownerDocument.__CE_hasRegistry?a.f(this):a.l(this);
return b}})}function c(b,c){x(b,"insertAdjacentElement",function(b,d){var e=t(d);b=c.call(this,b,d);e&&a.a(d);t(b)&&a.b(d);return b})}vb&&x(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=vb.call(this,a)});if(Ca&&Ca.get)b(Element.prototype,Ca);else if(Da&&Da.get)b(HTMLElement.prototype,Da);else{var d=Ea.call(document,"div");a.s(function(a){b(a,{enumerable:!0,configurable:!0,get:function(){return wb.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName?
this.content:this;for(d.innerHTML=a;0<b.childNodes.length;)Fa.call(b,b.childNodes[0]);for(;0<d.childNodes.length;)ia.call(b,d.childNodes[0])}})})}x(Element.prototype,"setAttribute",function(b,c){if(1!==this.__CE_state)return xb.call(this,b,c);var d=Ga.call(this,b);xb.call(this,b,c);c=Ga.call(this,b);a.attributeChangedCallback(this,b,d,c,null)});x(Element.prototype,"setAttributeNS",function(b,c,d){if(1!==this.__CE_state)return yb.call(this,b,c,d);var e=ja.call(this,b,c);yb.call(this,b,c,d);d=ja.call(this,
b,c);a.attributeChangedCallback(this,c,e,d,b)});x(Element.prototype,"removeAttribute",function(b){if(1!==this.__CE_state)return zb.call(this,b);var c=Ga.call(this,b);zb.call(this,b);null!==c&&a.attributeChangedCallback(this,b,c,null,null)});x(Element.prototype,"removeAttributeNS",function(b,c){if(1!==this.__CE_state)return Ab.call(this,b,c);var d=ja.call(this,b,c);Ab.call(this,b,c);var e=ja.call(this,b,c);d!==e&&a.attributeChangedCallback(this,c,d,e,b)});Bb?c(HTMLElement.prototype,Bb):Cb?c(Element.prototype,
Cb):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Ha(a,Element.prototype,{Z:jd,append:kd});ld(a,{ja:md,Wa:nd,replaceWith:od,remove:pd})}function ld(a,b){var c=Element.prototype;function d(b){return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];e=[];for(var f=[],g=0;g<d.length;g++){var m=d[g];m instanceof Element&&t(m)&&f.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)e.push(m);else e.push(m)}b.apply(this,
d);for(d=0;d<f.length;d++)a.a(f[d]);if(t(this))for(d=0;d<e.length;d++)f=e[d],f instanceof Element&&a.b(f)}}void 0!==b.ja&&(c.before=d(b.ja));void 0!==b.ja&&(c.after=d(b.Wa));void 0!==b.replaceWith&&x(c,"replaceWith",function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];e=[];for(var h=[],w=0;w<d.length;w++){var g=d[w];g instanceof Element&&t(g)&&h.push(g);if(g instanceof DocumentFragment)for(g=g.firstChild;g;g=g.nextSibling)e.push(g);else e.push(g)}w=t(this);b.replaceWith.apply(this,
d);for(d=0;d<h.length;d++)a.a(h[d]);if(w)for(a.a(this),d=0;d<e.length;d++)h=e[d],h instanceof Element&&a.b(h)});void 0!==b.remove&&x(c,"remove",function(){var c=t(this);b.remove.call(this);c&&a.a(this)})}function qd(a){function b(b,d){Object.defineProperty(b,"textContent",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(b){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,b);else{var c=void 0;if(this.firstChild){var e=this.childNodes,h=e.length;if(0<h&&t(this)){c=Array(h);for(var w=
0;w<h;w++)c[w]=e[w]}}d.set.call(this,b);if(c)for(b=0;b<c.length;b++)a.a(c[b])}}})}x(Node.prototype,"insertBefore",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=Db.call(this,b,d);if(t(this))for(d=0;d<c.length;d++)a.b(c[d]);return b}c=t(b);d=Db.call(this,b,d);c&&a.a(b);t(this)&&a.b(b);return d});x(Node.prototype,"appendChild",function(b){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=ia.call(this,b);if(t(this))for(var e=
0;e<c.length;e++)a.b(c[e]);return b}c=t(b);e=ia.call(this,b);c&&a.a(b);t(this)&&a.b(b);return e});x(Node.prototype,"cloneNode",function(b){b=wb.call(this,b);this.ownerDocument.__CE_hasRegistry?a.f(b):a.l(b);return b});x(Node.prototype,"removeChild",function(b){var c=t(b),e=Fa.call(this,b);c&&a.a(b);return e});x(Node.prototype,"replaceChild",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=Eb.call(this,b,d);if(t(this))for(a.a(d),d=0;d<c.length;d++)a.b(c[d]);
return b}c=t(b);var f=Eb.call(this,b,d),k=t(this);k&&a.a(d);c&&a.a(b);k&&a.b(b);return f});Ia&&Ia.get?b(Node.prototype,Ia):a.s(function(a){b(a,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)Fa.call(this,this.firstChild);ia.call(this,document.createTextNode(a))}})})}function rd(a){x(Document.prototype,"createElement",function(b){if(this.__CE_hasRegistry){var c=
a.c(b);if(c)return new c.constructor}b=Ea.call(this,b);a.g(b);return b});x(Document.prototype,"importNode",function(b,c){b=sd.call(this,b,c);this.__CE_hasRegistry?a.f(b):a.l(b);return b});x(Document.prototype,"createElementNS",function(b,c){if(this.__CE_hasRegistry&&(null===b||"http://www.w3.org/1999/xhtml"===b)){var d=a.c(c);if(d)return new d.constructor}b=td.call(this,b,c);a.g(b);return b});Ha(a,Document.prototype,{Z:ud,append:vd})}function Ha(a,b,c){function d(b){return function(c){for(var d=[],
e=0;e<arguments.length;++e)d[e-0]=arguments[e];e=[];for(var f=[],g=0;g<d.length;g++){var m=d[g];m instanceof Element&&t(m)&&f.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)e.push(m);else e.push(m)}b.apply(this,d);for(d=0;d<f.length;d++)a.a(f[d]);if(t(this))for(d=0;d<e.length;d++)f=e[d],f instanceof Element&&a.b(f)}}void 0!==c.Z&&(b.prepend=d(c.Z));void 0!==c.append&&(b.append=d(c.append))}function wd(a){window.HTMLElement=function(){function b(){var b=this.constructor,
d=a.w(b);if(!d)throw Error("The custom element being constructed was not registered with `customElements`.");var e=d.constructionStack;if(0===e.length)return e=Ea.call(document,d.localName),Object.setPrototypeOf(e,b.prototype),e.__CE_state=1,e.__CE_definition=d,a.g(e),e;d=e.length-1;var f=e[d];if(f===Fb)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");e[d]=Fb;Object.setPrototypeOf(f,b.prototype);a.g(f);return f}b.prototype=xd.prototype;
return b}()}function y(a){this.c=!1;this.a=a;this.h=new Map;this.f=function(a){return a()};this.b=!1;this.g=[];this.i=new Ja(a,document)}function Gb(){var a=this;this.b=this.a=void 0;this.f=new Promise(function(b){a.b=b;a.a&&b(a.a)})}function Ja(a,b){this.b=a;this.a=b;this.M=void 0;this.b.f(this.a);"loading"===this.a.readyState&&(this.M=new MutationObserver(this.f.bind(this)),this.M.observe(this.a,{childList:!0,subtree:!0}))}function B(){this.o=new Map;this.m=new Map;this.j=[];this.h=!1}function l(a,
b,c){if(a!==Hb)throw new TypeError("Illegal constructor");a=document.createDocumentFragment();a.__proto__=l.prototype;a.F(b,c);return a}function ka(a){if(!a.__shady||void 0===a.__shady.firstChild){a.__shady=a.__shady||{};a.__shady.firstChild=Ka(a);a.__shady.lastChild=La(a);Ib(a);for(var b=a.__shady.childNodes=S(a),c=0,d;c<b.length&&(d=b[c]);c++)d.__shady=d.__shady||{},d.__shady.parentNode=a,d.__shady.nextSibling=b[c+1]||null,d.__shady.previousSibling=b[c-1]||null,Jb(d)}}function yd(a){var b=a&&a.M;
b&&(b.X.delete(a.Ra),b.X.size||(a.Sa.__shady.T=null))}function zd(a,b){a.__shady=a.__shady||{};a.__shady.T||(a.__shady.T=new la);a.__shady.T.X.add(b);var c=a.__shady.T;return{Ra:b,M:c,Sa:a,takeRecords:function(){return c.takeRecords()}}}function la(){this.a=!1;this.addedNodes=[];this.removedNodes=[];this.X=new Set}function T(a){return a.__shady&&void 0!==a.__shady.firstChild}function G(a){return"ShadyRoot"===a.Ma}function Z(a){a=a.getRootNode();if(G(a))return a}function Ma(a,b){if(a&&b)for(var c=
Object.getOwnPropertyNames(b),d=0,e;d<c.length&&(e=c[d]);d++){var f=Object.getOwnPropertyDescriptor(b,e);f&&Object.defineProperty(a,e,f)}}function Na(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(d=0;d<c.length;d++)Ma(a,c[d]);return a}function Ad(a,b){for(var c in b)a[c]=b[c]}function Kb(a){Oa.push(a);Pa.textContent=Lb++}function Mb(a,b){for(;b;){if(b==a)return!0;b=b.parentNode}return!1}function Nb(a){Qa||(Qa=!0,Kb(ma));aa.push(a)}function ma(){Qa=!1;for(var a=!!aa.length;aa.length;)aa.shift()();
return a}function Bd(a,b){var c=b.getRootNode();return a.map(function(a){var b=c===a.target.getRootNode();if(b&&a.addedNodes){if(b=Array.from(a.addedNodes).filter(function(a){return c===a.getRootNode()}),b.length)return a=Object.create(a),Object.defineProperty(a,"addedNodes",{value:b,configurable:!0}),a}else if(b)return a}).filter(function(a){return a})}function Ob(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case '"':return"&quot;";case "\u00a0":return"&nbsp;"}}
function Pb(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}function Ra(a,b){"template"===a.localName&&(a=a.content);for(var c="",d=b?b(a):a.childNodes,e=0,f=d.length,k;e<f&&(k=d[e]);e++){a:{var h=k;var w=a;var g=b;switch(h.nodeType){case Node.ELEMENT_NODE:for(var m=h.localName,l="<"+m,q=h.attributes,n=0;w=q[n];n++)l+=" "+w.name+'="'+w.value.replace(Cd,Ob)+'"';l+=">";h=Dd[m]?l:l+Ra(h,g)+"</"+m+">";break a;case Node.TEXT_NODE:h=h.data;h=w&&Ed[w.localName]?h:h.replace(Fd,Ob);break a;case Node.COMMENT_NODE:h=
"\x3c!--"+h.data+"--\x3e";break a;default:throw window.console.error(h),Error("not implemented");}}c+=h}return c}function U(a){C.currentNode=a;return C.parentNode()}function Ka(a){C.currentNode=a;return C.firstChild()}function La(a){C.currentNode=a;return C.lastChild()}function Qb(a){C.currentNode=a;return C.previousSibling()}function Rb(a){C.currentNode=a;return C.nextSibling()}function S(a){var b=[];C.currentNode=a;for(a=C.firstChild();a;)b.push(a),a=C.nextSibling();return b}function Sb(a){D.currentNode=
a;return D.parentNode()}function Tb(a){D.currentNode=a;return D.firstChild()}function Ub(a){D.currentNode=a;return D.lastChild()}function Vb(a){D.currentNode=a;return D.previousSibling()}function Wb(a){D.currentNode=a;return D.nextSibling()}function Xb(a){var b=[];D.currentNode=a;for(a=D.firstChild();a;)b.push(a),a=D.nextSibling();return b}function Yb(a){return Ra(a,function(a){return S(a)})}function Zb(a){switch(a.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:a=document.createTreeWalker(a,
NodeFilter.SHOW_TEXT,null,!1);for(var b="",c;c=a.nextNode();)b+=c.nodeValue;return b;default:return a.nodeValue}}function K(a,b,c){for(var d in b){var e=Object.getOwnPropertyDescriptor(a,d);e&&e.configurable||!e&&c?Object.defineProperty(a,d,b[d]):c&&console.warn("Could not define",d,"on",a)}}function P(a){K(a,$b);K(a,Sa);K(a,Ta)}function ac(a,b,c){Jb(a);c=c||null;a.__shady=a.__shady||{};b.__shady=b.__shady||{};c&&(c.__shady=c.__shady||{});a.__shady.previousSibling=c?c.__shady.previousSibling:b.lastChild;
var d=a.__shady.previousSibling;d&&d.__shady&&(d.__shady.nextSibling=a);(d=a.__shady.nextSibling=c)&&d.__shady&&(d.__shady.previousSibling=a);a.__shady.parentNode=b;c?c===b.__shady.firstChild&&(b.__shady.firstChild=a):(b.__shady.lastChild=a,b.__shady.firstChild||(b.__shady.firstChild=a));b.__shady.childNodes=null}function Ua(a,b,c){if(b===a)throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if(c){var d=c.__shady&&c.__shady.parentNode;if(void 0!==d&&
d!==a||void 0===d&&U(c)!==a)throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");}if(c===b)return b;b.parentNode&&Va(b.parentNode,b);d=Z(a);var e;if(e=d)a:{if(!b.__noInsertionPoint){var f;"slot"===b.localName?f=[b]:b.querySelectorAll&&(f=b.querySelectorAll("slot"));if(f&&f.length){e=f;break a}}e=void 0}(f=e)&&d.Qa(f);d&&("slot"===a.localName||f)&&d.L();if(T(a)){d=c;Ib(a);a.__shady=a.__shady||{};void 0!==a.__shady.firstChild&&
(a.__shady.childNodes=null);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){f=b.childNodes;for(e=0;e<f.length;e++)ac(f[e],a,d);b.__shady=b.__shady||{};d=void 0!==b.__shady.firstChild?null:void 0;b.__shady.firstChild=b.__shady.lastChild=d;b.__shady.childNodes=d}else ac(b,a,d);if(Wa(a)){a.__shady.root.L();var k=!0}else a.__shady.root&&(k=!0)}k||(k=G(a)?a.host:a,c?(c=bc(c),Xa.call(k,b,c)):cc.call(k,b));dc(a,b);return b}function Va(a,b){if(b.parentNode!==a)throw Error("The node to be removed is not a child of this node: "+
b);var c=Z(b);if(T(a)){b.__shady=b.__shady||{};a.__shady=a.__shady||{};b===a.__shady.firstChild&&(a.__shady.firstChild=b.__shady.nextSibling);b===a.__shady.lastChild&&(a.__shady.lastChild=b.__shady.previousSibling);var d=b.__shady.previousSibling;var e=b.__shady.nextSibling;d&&(d.__shady=d.__shady||{},d.__shady.nextSibling=e);e&&(e.__shady=e.__shady||{},e.__shady.previousSibling=d);b.__shady.parentNode=b.__shady.previousSibling=b.__shady.nextSibling=void 0;void 0!==a.__shady.childNodes&&(a.__shady.childNodes=
null);if(Wa(a)){a.__shady.root.L();var f=!0}}ec(b);c&&((e=a&&"slot"===a.localName)&&(f=!0),((d=c.Ta(b))||e)&&c.L());f||(f=G(a)?a.host:a,(!a.__shady.root&&"slot"!==b.localName||f===U(b))&&ba.call(f,b));dc(a,null,b);return b}function ec(a){if(a.__shady&&void 0!==a.__shady.ma)for(var b=a.childNodes,c=0,d=b.length,e;c<d&&(e=b[c]);c++)ec(e);a.__shady&&(a.__shady.ma=void 0)}function bc(a){var b=a;a&&"slot"===a.localName&&(b=(b=a.__shady&&a.__shady.R)&&b.length?b[0]:bc(a.nextSibling));return b}function Wa(a){return(a=
a&&a.__shady&&a.__shady.root)&&a.ta()}function fc(a,b){"slot"===b?(a=a.parentNode,Wa(a)&&a.__shady.root.L()):"slot"===a.localName&&"name"===b&&(b=Z(a))&&(b.Va(a),b.L())}function dc(a,b,c){if(a=a.__shady&&a.__shady.T)b&&a.addedNodes.push(b),c&&a.removedNodes.push(c),a.hb()}function gc(a){if(a&&a.nodeType){a.__shady=a.__shady||{};var b=a.__shady.ma;void 0===b&&(G(a)?b=a:b=(b=a.parentNode)?gc(b):a,ca.call(document.documentElement,a)&&(a.__shady.ma=b));return b}}function na(a,b,c){var d=[];hc(a.childNodes,
b,c,d);return d}function hc(a,b,c,d){for(var e=0,f=a.length,k;e<f&&(k=a[e]);e++){var h;if(h=k.nodeType===Node.ELEMENT_NODE){h=k;var w=b,g=c,m=d,l=w(h);l&&m.push(h);g&&g(l)?h=l:(hc(h.childNodes,w,g,m),h=void 0)}if(h)break}}function ic(a){a=a.getRootNode();G(a)&&a.va()}function jc(a,b,c){oa||(oa=window.ShadyCSS&&window.ShadyCSS.ScopingShim);oa&&"class"===b?oa.setElementClass(a,c):(kc.call(a,b,c),fc(a,b))}function lc(a,b){if(a.ownerDocument!==document)return Ya.call(document,a,b);var c=Ya.call(document,
a,!1);if(b){a=a.childNodes;b=0;for(var d;b<a.length;b++)d=lc(a[b],!0),c.appendChild(d)}return c}function Za(a,b){var c=[],d=a;for(a=a===window?window:a.getRootNode();d;)c.push(d),d=d.assignedSlot?d.assignedSlot:d.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&d.host&&(b||d!==a)?d.host:d.parentNode;c[c.length-1]===document&&c.push(window);return c}function mc(a,b){if(!G)return a;a=Za(a,!0);for(var c=0,d,e,f,k;c<b.length;c++)if(d=b[c],f=d===window?window:d.getRootNode(),f!==e&&(k=a.indexOf(f),e=f),!G(f)||
-1<k)return d}function $a(a){function b(b,d){b=new a(b,d);b.ea=d&&!!d.composed;return b}Ad(b,a);b.prototype=a.prototype;return b}function nc(a,b,c){if(c=b.__handlers&&b.__handlers[a.type]&&b.__handlers[a.type][c])for(var d=0,e;(e=c[d])&&a.target!==a.relatedTarget&&(e.call(b,a),!a.Ka);d++);}function Gd(a){var b=a.composedPath();Object.defineProperty(a,"currentTarget",{get:function(){return d},configurable:!0});for(var c=b.length-1;0<=c;c--){var d=b[c];nc(a,d,"capture");if(a.fa)return}Object.defineProperty(a,
"eventPhase",{get:function(){return Event.AT_TARGET}});var e;for(c=0;c<b.length;c++){d=b[c];var f=d.__shady&&d.__shady.root;if(0===c||f&&f===e)if(nc(a,d,"bubble"),d!==window&&(e=d.getRootNode()),a.fa)break}}function oc(a,b,c,d,e,f){for(var k=0;k<a.length;k++){var h=a[k],w=h.type,g=h.capture,m=h.once,l=h.passive;if(b===h.node&&c===w&&d===g&&e===m&&f===l)return k}return-1}function pc(a,b,c){if(b){if("object"===typeof c){var d=!!c.capture;var e=!!c.once;var f=!!c.passive}else d=!!c,f=e=!1;var k=c&&c.ga||
this,h=b[da];if(h){if(-1<oc(h,k,a,d,e,f))return}else b[da]=[];h=function(d){e&&this.removeEventListener(a,b,c);d.__target||qc(d);if(k!==this){var f=Object.getOwnPropertyDescriptor(d,"currentTarget");Object.defineProperty(d,"currentTarget",{get:function(){return k},configurable:!0})}if(d.composed||-1<d.composedPath().indexOf(k))if(d.target===d.relatedTarget)d.eventPhase===Event.BUBBLING_PHASE&&d.stopImmediatePropagation();else if(d.eventPhase===Event.CAPTURING_PHASE||d.bubbles||d.target===k){var h=
"object"===typeof b&&b.handleEvent?b.handleEvent(d):b.call(k,d);k!==this&&(f?(Object.defineProperty(d,"currentTarget",f),f=null):delete d.currentTarget);return h}};b[da].push({node:this,type:a,capture:d,once:e,passive:f,lb:h});ab[a]?(this.__handlers=this.__handlers||{},this.__handlers[a]=this.__handlers[a]||{capture:[],bubble:[]},this.__handlers[a][d?"capture":"bubble"].push(h)):(this instanceof Window?rc:sc).call(this,a,h,c)}}function tc(a,b,c){if(b){if("object"===typeof c){var d=!!c.capture;var e=
!!c.once;var f=!!c.passive}else d=!!c,f=e=!1;var k=c&&c.ga||this,h=void 0;var g=null;try{g=b[da]}catch(r){}g&&(e=oc(g,k,a,d,e,f),-1<e&&(h=g.splice(e,1)[0].lb,g.length||(b[da]=void 0)));(this instanceof Window?uc:vc).call(this,a,h||b,c);h&&ab[a]&&this.__handlers&&this.__handlers[a]&&(a=this.__handlers[a][d?"capture":"bubble"],h=a.indexOf(h),-1<h&&a.splice(h,1))}}function Hd(){for(var a in ab)window.addEventListener(a,function(a){a.__target||(qc(a),Gd(a))},!0)}function qc(a){a.__target=a.target;a.ra=
a.relatedTarget;if(E.S){var b=wc,c=Object.getPrototypeOf(a);if(!c.hasOwnProperty("__patchProto")){var d=Object.create(c);d.nb=c;Ma(d,b);c.__patchProto=d}a.__proto__=c.__patchProto}else Ma(a,wc)}function ea(a,b){return{index:a,U:[],W:b}}function Id(a,b,c,d){var e=0,f=0,k=0,h=0,g=Math.min(b-e,d-f);if(0==e&&0==f)a:{for(k=0;k<g;k++)if(a[k]!==c[k])break a;k=g}if(b==a.length&&d==c.length){h=a.length;for(var r=c.length,m=0;m<g-k&&Jd(a[--h],c[--r]);)m++;h=m}e+=k;f+=k;b-=h;d-=h;if(0==b-e&&0==d-f)return[];
if(e==b){for(b=ea(e,0);f<d;)b.U.push(c[f++]);return[b]}if(f==d)return[ea(e,b-e)];g=e;k=f;d=d-k+1;h=b-g+1;b=Array(d);for(r=0;r<d;r++)b[r]=Array(h),b[r][0]=r;for(r=0;r<h;r++)b[0][r]=r;for(r=1;r<d;r++)for(m=1;m<h;m++)if(a[g+m-1]===c[k+r-1])b[r][m]=b[r-1][m-1];else{var l=b[r-1][m]+1,n=b[r][m-1]+1;b[r][m]=l<n?l:n}g=b.length-1;k=b[0].length-1;d=b[g][k];for(a=[];0<g||0<k;)0==g?(a.push(2),k--):0==k?(a.push(3),g--):(h=b[g-1][k-1],r=b[g-1][k],m=b[g][k-1],l=r<m?r<h?r:h:m<h?m:h,l==h?(h==d?a.push(0):(a.push(1),
d=h),g--,k--):l==r?(a.push(3),g--,d=r):(a.push(2),k--,d=m));a.reverse();b=void 0;g=[];for(k=0;k<a.length;k++)switch(a[k]){case 0:b&&(g.push(b),b=void 0);e++;f++;break;case 1:b||(b=ea(e,0));b.W++;e++;b.U.push(c[f]);f++;break;case 2:b||(b=ea(e,0));b.W++;e++;break;case 3:b||(b=ea(e,0)),b.U.push(c[f]),f++}b&&g.push(b);return g}function Jd(a,b){return a===b}function xc(a){var b=[];do b.unshift(a);while(a=a.parentNode);return b}function yc(a){ic(a);return a.__shady&&a.__shady.assignedSlot||null}function L(a,
b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f.value?a[e]=f.value:Object.defineProperty(a,e,f)}}function Kd(){var a=window.customElements&&window.customElements.nativeHTMLElement||HTMLElement;L(window.Node.prototype,Ld);L(window.Window.prototype,Md);L(window.Text.prototype,Nd);L(window.DocumentFragment.prototype,bb);L(window.Element.prototype,zc);L(window.Document.prototype,Ac);window.HTMLSlotElement&&L(window.HTMLSlotElement.prototype,
Bc);L(a.prototype,Od);E.S&&(P(window.Node.prototype),P(window.Text.prototype),P(window.DocumentFragment.prototype),P(window.Element.prototype),P(a.prototype),P(window.Document.prototype),window.HTMLSlotElement&&P(window.HTMLSlotElement.prototype))}function Cc(a){var b=Pd.has(a);a=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return!b&&a}function t(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?
a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))}function cb(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}function O(a,b,c){c=c?c:new Set;for(var d=a;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d;b(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){d=e.import;if(d instanceof Node&&!c.has(d))for(c.add(d),d=d.firstChild;d;d=d.nextSibling)O(d,b,c);d=cb(a,e);continue}else if("template"===f){d=cb(a,e);continue}if(e=
e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)O(e,b,c)}d=d.firstChild?d.firstChild:cb(a,d)}}function x(a,b,c){a[b]=c}function db(a){a=a.replace(F.Ya,"").replace(F.port,"");var b=Dc,c=a,d=new Ba;d.start=0;d.end=c.length;for(var e=d,f=0,k=c.length;f<k;f++)if("{"===c[f]){e.rules||(e.rules=[]);var h=e,g=h.rules[h.rules.length-1]||null;e=new Ba;e.start=f+1;e.parent=h;e.previous=g;h.rules.push(e)}else"}"===c[f]&&(e.end=f+1,e=e.parent||d);return b(d,a)}function Dc(a,b){var c=b.substring(a.start,
a.end-1);a.parsedCssText=a.cssText=c.trim();a.parent&&(c=b.substring(a.previous?a.previous.end:a.parent.start,a.start-1),c=Qd(c),c=c.replace(F.Ba," "),c=c.substring(c.lastIndexOf(";")+1),c=a.parsedSelector=a.selector=c.trim(),a.atRule=0===c.indexOf("@"),a.atRule?0===c.indexOf("@media")?a.type=I.MEDIA_RULE:c.match(F.cb)&&(a.type=I.da,a.keyframesName=a.selector.split(F.Ba).pop()):a.type=0===c.indexOf("--")?I.na:I.STYLE_RULE);if(c=a.rules)for(var d=0,e=c.length,f;d<e&&(f=c[d]);d++)Dc(f,b);return a}function Qd(a){return a.replace(/\\([0-9a-f]{1,6})\s/gi,
function(a,c){a=c;for(c=6-a.length;c--;)a="0"+a;return"\\"+a})}function Ec(a,b,c){c=void 0===c?"":c;var d="";if(a.cssText||a.rules){var e=a.rules,f;if(f=e)f=e[0],f=!(f&&f.selector&&0===f.selector.indexOf("--"));if(f){f=0;for(var k=e.length,h;f<k&&(h=e[f]);f++)d=Ec(h,b,d)}else b?b=a.cssText:(b=a.cssText,b=b.replace(F.wa,"").replace(F.Aa,""),b=b.replace(F.eb,"").replace(F.jb,"")),(d=b.trim())&&(d="  "+d+"\n")}d&&(a.selector&&(c+=a.selector+" {\n"),c+=d,a.selector&&(c+="}\n\n"));return c}function Fc(a){A=
a&&a.shimcssproperties?!1:z||!(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)||!window.CSS||!CSS.supports||!CSS.supports("box-shadow","0 0 0 var(--foo)"))}function V(a,b){if(!a)return"";"string"===typeof a&&(a=db(a));b&&W(a,b);return Ec(a,A)}function pa(a){!a.__cssRules&&a.textContent&&(a.__cssRules=db(a.textContent));return a.__cssRules||null}function Gc(a){return!!a.parent&&a.parent.type===I.da}function W(a,b,c,d){if(a){var e=!1,f=a.type;if(d&&f===I.MEDIA_RULE){var k=a.selector.match(Rd);
k&&(window.matchMedia(k[1]).matches||(e=!0))}f===I.STYLE_RULE?b(a):c&&f===I.da?c(a):f===I.na&&(e=!0);if((a=a.rules)&&!e){e=0;f=a.length;for(var h;e<f&&(h=a[e]);e++)W(h,b,c,d)}}}function eb(a,b,c,d){var e=document.createElement("style");b&&e.setAttribute("scope",b);e.textContent=a;Hc(e,c,d);return e}function Hc(a,b,c){b=b||document.head;b.insertBefore(a,c&&c.nextSibling||b.firstChild);Q?a.compareDocumentPosition(Q)===Node.DOCUMENT_POSITION_PRECEDING&&(Q=a):Q=a}function Ic(a,b){var c=a.indexOf("var(");
if(-1===c)return b(a,"","","");a:{var d=0;var e=c+3;for(var f=a.length;e<f;e++)if("("===a[e])d++;else if(")"===a[e]&&0===--d)break a;e=-1}d=a.substring(c+4,e);c=a.substring(0,c);a=Ic(a.substring(e+1),b);e=d.indexOf(",");return-1===e?b(c,d.trim(),"",a):b(c,d.substring(0,e).trim(),d.substring(e+1).trim(),a)}function qa(a,b){z?a.setAttribute("class",b):window.ShadyDOM.nativeMethods.setAttribute.call(a,"class",b)}function R(a){var b=a.localName,c="";b?-1<b.indexOf("-")||(c=b,b=a.getAttribute&&a.getAttribute("is")||
""):(b=a.is,c=a.extends);return{is:b,V:c}}function Jc(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.target!==document.documentElement&&c.target!==document.head)for(var d=0;d<c.addedNodes.length;d++){var e=c.addedNodes[d];if(e.nodeType===Node.ELEMENT_NODE){var f=e.getRootNode();var k=e;var h=[];k.classList?h=Array.from(k.classList):k instanceof window.SVGElement&&k.hasAttribute("class")&&(h=k.getAttribute("class").split(/\s+/));k=h;h=k.indexOf(p.a);if((k=-1<h?k[h+1]:"")&&f===e.ownerDocument)p.b(e,
k,!0);else if(f.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(f=f.host))if(f=R(f).is,k===f)for(e=window.ShadyDOM.nativeMethods.querySelectorAll.call(e,":not(."+p.a+")"),f=0;f<e.length;f++)p.h(e[f],k);else k&&p.b(e,k,!0),p.b(e,f)}}}}function Sd(a){if(a=ra[a])a._applyShimCurrentVersion=a._applyShimCurrentVersion||0,a._applyShimValidatingVersion=a._applyShimValidatingVersion||0,a._applyShimNextVersion=(a._applyShimNextVersion||0)+1}function Kc(a){return a._applyShimCurrentVersion===a._applyShimNextVersion}
function Td(a){a._applyShimValidatingVersion=a._applyShimNextVersion;a.b||(a.b=!0,Ud.then(function(){a._applyShimCurrentVersion=a._applyShimNextVersion;a.b=!1}))}function ub(a){requestAnimationFrame(function(){Lc?Lc(a):(fb||(fb=new Promise(function(a){gb=a}),"complete"===document.readyState?gb():document.addEventListener("readystatechange",function(){"complete"===document.readyState&&gb()})),fb.then(function(){a&&a()}))})}(function(a){function b(a,b){if("function"===typeof window.CustomEvent)return new CustomEvent(a,
b);var c=document.createEvent("CustomEvent");c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c}function c(a){if(m)return a.ownerDocument!==document?a.ownerDocument:null;var b=a.__importDoc;if(!b&&a.parentNode){b=a.parentNode;if("function"===typeof b.closest)b=b.closest("link[rel=import]");else for(;!h(b)&&(b=b.parentNode););a.__importDoc=b}return b}function d(a){var b=document.querySelectorAll("link[rel=import]:not([import-dependency])"),c=b.length;c?l(b,function(b){return k(b,function(){0===
--c&&a()})}):a()}function e(a){function b(){"loading"!==document.readyState&&document.body&&(document.removeEventListener("readystatechange",b),a())}document.addEventListener("readystatechange",b);b()}function f(a){e(function(){return d(function(){return a&&a()})})}function k(a,b){if(a.__loaded)b&&b();else if("script"===a.localName&&!a.src||"style"===a.localName&&!a.firstChild)a.__loaded=!0,b&&b();else{var c=function(d){a.removeEventListener(d.type,c);a.__loaded=!0;b&&b()};a.addEventListener("load",
c);z&&"style"===a.localName||a.addEventListener("error",c)}}function h(a){return a.nodeType===Node.ELEMENT_NODE&&"link"===a.localName&&"import"===a.rel}function g(){var a=this;this.a={};this.b=0;this.f=new MutationObserver(function(b){return a.l(b)});this.f.observe(document.head,{childList:!0,subtree:!0});this.c(document)}function l(a,b,c){var d=a?a.length:0,e=c?-1:1;for(c=c?d-1:0;c<d&&0<=c;c+=e)b(a[c],c)}var m="import"in document.createElement("link"),n=null;!1==="currentScript"in document&&Object.defineProperty(document,
"currentScript",{get:function(){return n||("complete"!==document.readyState?document.scripts[document.scripts.length-1]:null)},configurable:!0});var q=/(url\()([^)]*)(\))/g,t=/(@import[\s]+(?!url\())([^;]*)(;)/g,u=/(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,p={Za:function(a,b){a.href&&a.setAttribute("href",p.$(a.getAttribute("href"),b));a.src&&a.setAttribute("src",p.$(a.getAttribute("src"),b));if("style"===a.localName){var c=p.Ca(a.textContent,b,q);a.textContent=p.Ca(c,b,t)}},Ca:function(a,
b,c){return a.replace(c,function(a,c,d,e){a=d.replace(/["']/g,"");b&&(a=p.$(a,b));return c+"'"+a+"'"+e})},$:function(a,b){if(void 0===p.ha){p.ha=!1;try{var c=new URL("b","http://a");c.pathname="c%20d";p.ha="http://a/c%20d"===c.href}catch(se){}}if(p.ha)return(new URL(a,b)).href;c=p.Pa;c||(c=document.implementation.createHTMLDocument("temp"),p.Pa=c,c.pa=c.createElement("base"),c.head.appendChild(c.pa),c.oa=c.createElement("a"));c.pa.href=b;c.oa.href=a;return c.oa.href||a}},v={async:!0,load:function(a,
b,c){if(a)if(a.match(/^data:/)){a=a.split(",");var d=a[1];d=-1<a[0].indexOf(";base64")?atob(d):decodeURIComponent(d);b(d)}else{var e=new XMLHttpRequest;e.open("GET",a,v.async);e.onload=function(){var a=e.responseURL||e.getResponseHeader("Location");a&&0===a.indexOf("/")&&(a=(location.origin||location.protocol+"//"+location.host)+a);var d=e.response||e.responseText;304===e.status||0===e.status||200<=e.status&&300>e.status?b(d,a):c(d)};e.send()}else c("error: href must be specified")}},z=/Trident/.test(navigator.userAgent)||
/Edge\/\d./i.test(navigator.userAgent);g.prototype.c=function(a){var b=this;a=a.querySelectorAll("link[rel=import]");l(a,function(a){return b.h(a)})};g.prototype.h=function(a){var b=this,c=a.href;if(void 0!==this.a[c]){var d=this.a[c];d&&d.__loaded&&(a.import=d,this.g(a))}else this.b++,this.a[c]="pending",v.load(c,function(a,d){a=b.m(a,d||c);b.a[c]=a;b.b--;b.c(a);b.i()},function(){b.a[c]=null;b.b--;b.i()})};g.prototype.m=function(a,b){if(!a)return document.createDocumentFragment();z&&(a=a.replace(u,
function(a,b,c){return-1===a.indexOf("type=")?b+" type=import-disable "+c:a}));var c=document.createElement("template");c.innerHTML=a;if(c.content)a=c.content;else for(a=document.createDocumentFragment();c.firstChild;)a.appendChild(c.firstChild);if(c=a.querySelector("base"))b=p.$(c.getAttribute("href"),b),c.removeAttribute("href");c=a.querySelectorAll('link[rel=import], link[rel=stylesheet][href][type=import-disable],\n    style:not([type]), link[rel=stylesheet][href]:not([type]),\n    script:not([type]), script[type="application/javascript"],\n    script[type="text/javascript"]');
var d=0;l(c,function(a){k(a);p.Za(a,b);a.setAttribute("import-dependency","");"script"===a.localName&&!a.src&&a.textContent&&(a.setAttribute("src","data:text/javascript;charset=utf-8,"+encodeURIComponent(a.textContent+("\n//# sourceURL="+b+(d?"-"+d:"")+".js\n"))),a.textContent="",d++)});return a};g.prototype.i=function(){var a=this;if(!this.b){this.f.disconnect();this.flatten(document);var b=!1,c=!1,d=function(){c&&b&&(a.c(document),a.b||(a.f.observe(document.head,{childList:!0,subtree:!0}),a.j()))};
this.s(function(){c=!0;d()});this.o(function(){b=!0;d()})}};g.prototype.flatten=function(a){var b=this;a=a.querySelectorAll("link[rel=import]");l(a,function(a){var c=b.a[a.href];(a.import=c)&&c.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(b.a[a.href]=a,a.readyState="loading",a.import=a,b.flatten(c),a.appendChild(c))})};g.prototype.o=function(a){function b(e){if(e<d){var f=c[e],g=document.createElement("script");f.removeAttribute("import-dependency");l(f.attributes,function(a){return g.setAttribute(a.name,
a.value)});n=g;f.parentNode.replaceChild(g,f);k(g,function(){n=null;b(e+1)})}else a()}var c=document.querySelectorAll("script[import-dependency]"),d=c.length;b(0)};g.prototype.s=function(a){var b=document.querySelectorAll("style[import-dependency],\n    link[rel=stylesheet][import-dependency]"),d=b.length;if(d){var e=z&&!!document.querySelector("link[rel=stylesheet][href][type=import-disable]");l(b,function(b){k(b,function(){b.removeAttribute("import-dependency");0===--d&&a()});if(e&&b.parentNode!==
document.head){var f=document.createElement(b.localName);f.__appliedElement=b;f.setAttribute("type","import-placeholder");b.parentNode.insertBefore(f,b.nextSibling);for(f=c(b);f&&c(f);)f=c(f);f.parentNode!==document.head&&(f=null);document.head.insertBefore(b,f);b.removeAttribute("type")}})}else a()};g.prototype.j=function(){var a=this,b=document.querySelectorAll("link[rel=import]");l(b,function(b){return a.g(b)},!0)};g.prototype.g=function(a){a.__loaded||(a.__loaded=!0,a.import&&(a.import.readyState=
"complete"),a.dispatchEvent(b(a.import?"load":"error",{bubbles:!1,cancelable:!1,detail:void 0})))};g.prototype.l=function(a){var b=this;l(a,function(a){return l(a.addedNodes,function(a){a&&a.nodeType===Node.ELEMENT_NODE&&(h(a)?b.h(a):b.c(a))})})};if(m){var x=document.querySelectorAll("link[rel=import]");l(x,function(a){a.import&&"loading"===a.import.readyState||(a.__loaded=!0)});x=function(a){a=a.target;h(a)&&(a.__loaded=!0)};document.addEventListener("load",x,!0);document.addEventListener("error",
x,!0)}else{var y=Object.getOwnPropertyDescriptor(Node.prototype,"baseURI");Object.defineProperty((!y||y.configurable?Node:Element).prototype,"baseURI",{get:function(){var a=h(this)?this:c(this);return a?a.href:y&&y.get?y.get.call(this):(document.querySelector("base")||window.location).href},configurable:!0,enumerable:!0});e(function(){return new g})}f(function(){return document.dispatchEvent(b("HTMLImportsLoaded",{cancelable:!0,bubbles:!0,detail:void 0}))});a.useNative=m;a.whenReady=f;a.importForElement=
c})(window.HTMLImports=window.HTMLImports||{});var E=window.ShadyDOM||{};E.$a=!(!Element.prototype.attachShadow||!Node.prototype.getRootNode);var hb=Object.getOwnPropertyDescriptor(Node.prototype,"firstChild");E.S=!!(hb&&hb.configurable&&hb.get);E.za=E.force||!E.$a;var X=Element.prototype,Mc=X.matches||X.matchesSelector||X.mozMatchesSelector||X.msMatchesSelector||X.oMatchesSelector||X.webkitMatchesSelector,Pa=document.createTextNode(""),Lb=0,Oa=[];(new MutationObserver(function(){for(;Oa.length;)try{Oa.shift()()}catch(a){throw Pa.textContent=
Lb++,a;}})).observe(Pa,{characterData:!0});var Vd=!!document.contains,aa=[],Qa;ma.list=aa;la.prototype.hb=function(){var a=this;this.a||(this.a=!0,Kb(function(){a.b()}))};la.prototype.b=function(){if(this.a){this.a=!1;var a=this.takeRecords();a.length&&this.X.forEach(function(b){b(a)})}};la.prototype.takeRecords=function(){if(this.addedNodes.length||this.removedNodes.length){var a=[{addedNodes:this.addedNodes,removedNodes:this.removedNodes}];this.addedNodes=[];this.removedNodes=[];return a}return[]};
var cc=Element.prototype.appendChild,Xa=Element.prototype.insertBefore,ba=Element.prototype.removeChild,kc=Element.prototype.setAttribute,Nc=Element.prototype.removeAttribute,ib=Element.prototype.cloneNode,Ya=Document.prototype.importNode,sc=Element.prototype.addEventListener,vc=Element.prototype.removeEventListener,rc=Window.prototype.addEventListener,uc=Window.prototype.removeEventListener,jb=Element.prototype.dispatchEvent,ca=Node.prototype.contains||HTMLElement.prototype.contains,Wd=Object.freeze({appendChild:cc,
insertBefore:Xa,removeChild:ba,setAttribute:kc,removeAttribute:Nc,cloneNode:ib,importNode:Ya,addEventListener:sc,removeEventListener:vc,rb:rc,sb:uc,dispatchEvent:jb,querySelector:Element.prototype.querySelector,querySelectorAll:Element.prototype.querySelectorAll,contains:ca}),Cd=/[&\u00A0"]/g,Fd=/[&\u00A0<>]/g,Dd=Pb("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),Ed=Pb("style script xmp iframe noembed noframes plaintext noscript".split(" ")),C=document.createTreeWalker(document,
NodeFilter.SHOW_ALL,null,!1),D=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,!1),Xd=Object.freeze({parentNode:U,firstChild:Ka,lastChild:La,previousSibling:Qb,nextSibling:Rb,childNodes:S,parentElement:Sb,firstElementChild:Tb,lastElementChild:Ub,previousElementSibling:Vb,nextElementSibling:Wb,children:Xb,innerHTML:Yb,textContent:Zb}),kb=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML")||Object.getOwnPropertyDescriptor(HTMLElement.prototype,"innerHTML"),sa=document.implementation.createHTMLDocument("inert").createElement("div"),
lb=Object.getOwnPropertyDescriptor(Document.prototype,"activeElement"),$b={parentElement:{get:function(){var a=this.__shady&&this.__shady.parentNode;a&&a.nodeType!==Node.ELEMENT_NODE&&(a=null);return void 0!==a?a:Sb(this)},configurable:!0},parentNode:{get:function(){var a=this.__shady&&this.__shady.parentNode;return void 0!==a?a:U(this)},configurable:!0},nextSibling:{get:function(){var a=this.__shady&&this.__shady.nextSibling;return void 0!==a?a:Rb(this)},configurable:!0},previousSibling:{get:function(){var a=
this.__shady&&this.__shady.previousSibling;return void 0!==a?a:Qb(this)},configurable:!0},className:{get:function(){return this.getAttribute("class")||""},set:function(a){this.setAttribute("class",a)},configurable:!0},nextElementSibling:{get:function(){if(this.__shady&&void 0!==this.__shady.nextSibling){for(var a=this.nextSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return Wb(this)},configurable:!0},previousElementSibling:{get:function(){if(this.__shady&&void 0!==this.__shady.previousSibling){for(var a=
this.previousSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return Vb(this)},configurable:!0}},Sa={childNodes:{get:function(){if(T(this)){if(!this.__shady.childNodes){this.__shady.childNodes=[];for(var a=this.firstChild;a;a=a.nextSibling)this.__shady.childNodes.push(a)}var b=this.__shady.childNodes}else b=S(this);b.item=function(a){return b[a]};return b},configurable:!0},childElementCount:{get:function(){return this.children.length},configurable:!0},firstChild:{get:function(){var a=
this.__shady&&this.__shady.firstChild;return void 0!==a?a:Ka(this)},configurable:!0},lastChild:{get:function(){var a=this.__shady&&this.__shady.lastChild;return void 0!==a?a:La(this)},configurable:!0},textContent:{get:function(){if(T(this)){for(var a=[],b=0,c=this.childNodes,d;d=c[b];b++)d.nodeType!==Node.COMMENT_NODE&&a.push(d.textContent);return a.join("")}return Zb(this)},set:function(a){switch(this.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:for(;this.firstChild;)this.removeChild(this.firstChild);
(0<a.length||this.nodeType===Node.ELEMENT_NODE)&&this.appendChild(document.createTextNode(a));break;default:this.nodeValue=a}},configurable:!0},firstElementChild:{get:function(){if(this.__shady&&void 0!==this.__shady.firstChild){for(var a=this.firstChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return Tb(this)},configurable:!0},lastElementChild:{get:function(){if(this.__shady&&void 0!==this.__shady.lastChild){for(var a=this.lastChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;
return a}return Ub(this)},configurable:!0},children:{get:function(){var a;T(this)?a=Array.prototype.filter.call(this.childNodes,function(a){return a.nodeType===Node.ELEMENT_NODE}):a=Xb(this);a.item=function(b){return a[b]};return a},configurable:!0},innerHTML:{get:function(){var a="template"===this.localName?this.content:this;return T(this)?Ra(a):Yb(a)},set:function(a){for(var b="template"===this.localName?this.content:this;b.firstChild;)b.removeChild(b.firstChild);for(kb&&kb.set?kb.set.call(sa,a):
sa.innerHTML=a;sa.firstChild;)b.appendChild(sa.firstChild)},configurable:!0}},Oc={shadowRoot:{get:function(){return this.__shady&&this.__shady.fb||null},configurable:!0}},Ta={activeElement:{get:function(){var a=lb&&lb.get?lb.get.call(document):E.S?void 0:document.activeElement;if(a&&a.nodeType){var b=!!G(this);if(this===document||b&&this.host!==a&&ca.call(this.host,a)){for(b=Z(a);b&&b!==this;)a=b.host,b=Z(a);a=this===document?b?null:a:b===this?a:null}else a=null}else a=null;return a},set:function(){},
configurable:!0}},Jb=E.S?function(){}:function(a){a.__shady&&a.__shady.Na||(a.__shady=a.__shady||{},a.__shady.Na=!0,K(a,$b,!0))},Ib=E.S?function(){}:function(a){a.__shady&&a.__shady.La||(a.__shady=a.__shady||{},a.__shady.La=!0,K(a,Sa,!0),K(a,Oc,!0))},oa=null,da="__eventWrappers"+Date.now(),Yd={blur:!0,focus:!0,focusin:!0,focusout:!0,click:!0,dblclick:!0,mousedown:!0,mouseenter:!0,mouseleave:!0,mousemove:!0,mouseout:!0,mouseover:!0,mouseup:!0,wheel:!0,beforeinput:!0,input:!0,keydown:!0,keyup:!0,compositionstart:!0,
compositionupdate:!0,compositionend:!0,touchstart:!0,touchend:!0,touchmove:!0,touchcancel:!0,pointerover:!0,pointerenter:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointercancel:!0,pointerout:!0,pointerleave:!0,gotpointercapture:!0,lostpointercapture:!0,dragstart:!0,drag:!0,dragenter:!0,dragleave:!0,dragover:!0,drop:!0,dragend:!0,DOMActivate:!0,DOMFocusIn:!0,DOMFocusOut:!0,keypress:!0},wc={get composed(){!1!==this.isTrusted&&void 0===this.ea&&(this.ea=Yd[this.type]);return this.ea||!1},composedPath:function(){this.qa||
(this.qa=Za(this.__target,this.composed));return this.qa},get target(){return mc(this.currentTarget,this.composedPath())},get relatedTarget(){if(!this.ra)return null;this.sa||(this.sa=Za(this.ra,!0));return mc(this.currentTarget,this.sa)},stopPropagation:function(){Event.prototype.stopPropagation.call(this);this.fa=!0},stopImmediatePropagation:function(){Event.prototype.stopImmediatePropagation.call(this);this.fa=this.Ka=!0}},ab={focus:!0,blur:!0},Zd=$a(window.Event),$d=$a(window.CustomEvent),ae=
$a(window.MouseEvent),Hb={};l.prototype=Object.create(DocumentFragment.prototype);l.prototype.F=function(a,b){this.Ma="ShadyRoot";ka(a);ka(this);this.host=a;this.H=b&&b.mode;a.__shady=a.__shady||{};a.__shady.root=this;a.__shady.fb="closed"!==this.H?this:null;this.P=!1;this.b=[];this.a={};this.c=[];b=S(a);for(var c=0,d=b.length;c<d;c++)ba.call(a,b[c])};l.prototype.L=function(){var a=this;this.P||(this.P=!0,Nb(function(){return a.va()}))};l.prototype.K=function(){for(var a=this,b=this;b;)b.P&&(a=b),
b=b.Ua();return a};l.prototype.Ua=function(){var a=this.host.getRootNode();if(G(a))for(var b=this.host.childNodes,c=0,d;c<b.length;c++)if(d=b[c],this.j(d))return a};l.prototype.va=function(){this.P&&this.K()._renderRoot()};l.prototype._renderRoot=function(){this.P=!1;this.B();this.s()};l.prototype.B=function(){this.f();for(var a=0,b;a<this.b.length;a++)b=this.b[a],this.o(b);for(b=this.host.firstChild;b;b=b.nextSibling)this.h(b);for(a=0;a<this.b.length;a++){b=this.b[a];if(!b.__shady.assignedNodes.length)for(var c=
b.firstChild;c;c=c.nextSibling)this.h(c,b);c=b.parentNode;(c=c.__shady&&c.__shady.root)&&c.ta()&&c._renderRoot();this.g(b.__shady.R,b.__shady.assignedNodes);if(c=b.__shady.ua){for(var d=0;d<c.length;d++)c[d].__shady.ia=null;b.__shady.ua=null;c.length>b.__shady.assignedNodes.length&&(b.__shady.ka=!0)}b.__shady.ka&&(b.__shady.ka=!1,this.i(b))}};l.prototype.h=function(a,b){a.__shady=a.__shady||{};var c=a.__shady.ia;a.__shady.ia=null;b||(b=(b=this.a[a.slot||"__catchall"])&&b[0]);b?(b.__shady.assignedNodes.push(a),
a.__shady.assignedSlot=b):a.__shady.assignedSlot=void 0;c!==a.__shady.assignedSlot&&a.__shady.assignedSlot&&(a.__shady.assignedSlot.__shady.ka=!0)};l.prototype.o=function(a){var b=a.__shady.assignedNodes;a.__shady.assignedNodes=[];a.__shady.R=[];if(a.__shady.ua=b)for(var c=0;c<b.length;c++){var d=b[c];d.__shady.ia=d.__shady.assignedSlot;d.__shady.assignedSlot===a&&(d.__shady.assignedSlot=null)}};l.prototype.g=function(a,b){for(var c=0,d;c<b.length&&(d=b[c]);c++)"slot"==d.localName?this.g(a,d.__shady.assignedNodes):
a.push(b[c])};l.prototype.i=function(a){jb.call(a,new Event("slotchange"));a.__shady.assignedSlot&&this.i(a.__shady.assignedSlot)};l.prototype.s=function(){for(var a=this.b,b=[],c=0;c<a.length;c++){var d=a[c].parentNode;d.__shady&&d.__shady.root||!(0>b.indexOf(d))||b.push(d)}for(a=0;a<b.length;a++)c=b[a],this.O(c===this?this.host:c,this.w(c))};l.prototype.w=function(a){var b=[];a=a.childNodes;for(var c=0;c<a.length;c++){var d=a[c];if(this.j(d)){d=d.__shady.R;for(var e=0;e<d.length;e++)b.push(d[e])}else b.push(d)}return b};
l.prototype.j=function(a){return"slot"==a.localName};l.prototype.O=function(a,b){for(var c=S(a),d=Id(b,b.length,c,c.length),e=0,f=0,k;e<d.length&&(k=d[e]);e++){for(var g=0,l;g<k.U.length&&(l=k.U[g]);g++)U(l)===a&&ba.call(a,l),c.splice(k.index+f,1);f-=k.W}for(e=0;e<d.length&&(k=d[e]);e++)for(f=c[k.index],g=k.index;g<k.index+k.W;g++)l=b[g],Xa.call(a,l,f),c.splice(g,0,l)};l.prototype.Qa=function(a){this.c.push.apply(this.c,[].concat(a instanceof Array?a:hd(gd(a))))};l.prototype.f=function(){this.c.length&&
(this.G(this.c),this.c=[])};l.prototype.G=function(a){for(var b,c=0;c<a.length;c++){var d=a[c];d.__shady=d.__shady||{};ka(d);ka(d.parentNode);var e=this.l(d);this.a[e]?(b=b||{},b[e]=!0,this.a[e].push(d)):this.a[e]=[d];this.b.push(d)}if(b)for(var f in b)this.a[f]=this.m(this.a[f])};l.prototype.l=function(a){var b=a.name||a.getAttribute("name")||"__catchall";return a.Oa=b};l.prototype.m=function(a){return a.sort(function(a,c){a=xc(a);for(var b=xc(c),e=0;e<a.length;e++){c=a[e];var f=b[e];if(c!==f)return a=
Array.from(c.parentNode.childNodes),a.indexOf(c)-a.indexOf(f)}})};l.prototype.Ta=function(a){this.f();var b=this.a,c;for(c in b)for(var d=b[c],e=0;e<d.length;e++){var f=d[e];if(Mb(a,f)){d.splice(e,1);var k=this.b.indexOf(f);0<=k&&this.b.splice(k,1);e--;this.I(f);k=!0}}return k};l.prototype.Va=function(a){var b=a.Oa,c=this.l(a);if(c!==b){b=this.a[b];var d=b.indexOf(a);0<=d&&b.splice(d,1);b=this.a[c]||(this.a[c]=[]);b.push(a);1<b.length&&(this.a[c]=this.m(b))}};l.prototype.I=function(a){if(a=a.__shady.R)for(var b=
0;b<a.length;b++){var c=a[b],d=U(c);d&&ba.call(d,c)}};l.prototype.ta=function(){this.f();return!!this.b.length};l.prototype.addEventListener=function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.ga=this;this.host.addEventListener(a,b,c)};l.prototype.removeEventListener=function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.ga=this;this.host.removeEventListener(a,b,c)};l.prototype.getElementById=function(a){return na(this,function(b){return b.id==a},function(a){return!!a})[0]||null};(function(a){K(a,
Sa,!0);K(a,Ta,!0)})(l.prototype);var Md={addEventListener:pc.bind(window),removeEventListener:tc.bind(window)},Ld={addEventListener:pc,removeEventListener:tc,appendChild:function(a){return Ua(this,a)},insertBefore:function(a,b){return Ua(this,a,b)},removeChild:function(a){return Va(this,a)},replaceChild:function(a,b){Ua(this,a,b);Va(this,b);return a},cloneNode:function(a){if("template"==this.localName)var b=ib.call(this,a);else if(b=ib.call(this,!1),a){a=this.childNodes;for(var c=0,d;c<a.length;c++)d=
a[c].cloneNode(!0),b.appendChild(d)}return b},getRootNode:function(){return gc(this)},contains:function(a){return Mb(this,a)},get isConnected(){var a=this.ownerDocument;if(Vd&&ca.call(a,this)||a.documentElement&&ca.call(a.documentElement,this))return!0;for(a=this;a&&!(a instanceof Document);)a=a.parentNode||(a instanceof l?a.host:void 0);return!!(a&&a instanceof Document)},dispatchEvent:function(a){ma();return jb.call(this,a)}},Nd={get assignedSlot(){return yc(this)}},bb={querySelector:function(a){return na(this,
function(b){return Mc.call(b,a)},function(a){return!!a})[0]||null},querySelectorAll:function(a){return na(this,function(b){return Mc.call(b,a)})}},Bc={assignedNodes:function(a){if("slot"===this.localName)return ic(this),this.__shady?(a&&a.flatten?this.__shady.R:this.__shady.assignedNodes)||[]:[]}},zc=Na({setAttribute:function(a,b){jc(this,a,b)},removeAttribute:function(a){Nc.call(this,a);fc(this,a)},attachShadow:function(a){if(!this)throw"Must provide a host.";if(!a)throw"Not enough arguments.";return new l(Hb,
this,a)},get slot(){return this.getAttribute("slot")},set slot(a){jc(this,"slot",a)},get assignedSlot(){return yc(this)}},bb,Bc);Object.defineProperties(zc,Oc);var Ac=Na({importNode:function(a,b){return lc(a,b)},getElementById:function(a){return na(this,function(b){return b.id==a},function(a){return!!a})[0]||null}},bb);Object.defineProperties(Ac,{_activeElement:Ta.activeElement});var be=HTMLElement.prototype.blur,Od=Na({blur:function(){var a=this.__shady&&this.__shady.root;(a=a&&a.activeElement)?
a.blur():be.call(this)}});E.za&&(window.ShadyDOM={inUse:E.za,patch:function(a){return a},isShadyRoot:G,enqueue:Nb,flush:ma,settings:E,filterMutations:Bd,observeChildren:zd,unobserveChildren:yd,nativeMethods:Wd,nativeTree:Xd},window.Event=Zd,window.CustomEvent=$d,window.MouseEvent=ae,Hd(),Kd(),window.ShadowRoot=l);var Pd=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));B.prototype.B=function(a,b){this.o.set(a,b);
this.m.set(b.constructor,b)};B.prototype.c=function(a){return this.o.get(a)};B.prototype.w=function(a){return this.m.get(a)};B.prototype.s=function(a){this.h=!0;this.j.push(a)};B.prototype.l=function(a){var b=this;this.h&&O(a,function(a){return b.g(a)})};B.prototype.g=function(a){if(this.h&&!a.__CE_patched){a.__CE_patched=!0;for(var b=0;b<this.j.length;b++)this.j[b](a)}};B.prototype.b=function(a){var b=[];O(a,function(a){return b.push(a)});for(a=0;a<b.length;a++){var c=b[a];1===c.__CE_state?this.connectedCallback(c):
this.i(c)}};B.prototype.a=function(a){var b=[];O(a,function(a){return b.push(a)});for(a=0;a<b.length;a++){var c=b[a];1===c.__CE_state&&this.disconnectedCallback(c)}};B.prototype.f=function(a,b){var c=this;b=b?b:{};var d=b.kb||new Set,e=b.Da||function(a){return c.i(a)},f=[];O(a,function(a){if("link"===a.localName&&"import"===a.getAttribute("rel")){var b=a.import;b instanceof Node&&"complete"===b.readyState?(b.__CE_isImportDocument=!0,b.__CE_hasRegistry=!0):a.addEventListener("load",function(){var b=
a.import;if(!b.__CE_documentLoadHandled){b.__CE_documentLoadHandled=!0;b.__CE_isImportDocument=!0;b.__CE_hasRegistry=!0;var f=new Set(d);f.delete(b);c.f(b,{kb:f,Da:e})}})}else f.push(a)},d);if(this.h)for(a=0;a<f.length;a++)this.g(f[a]);for(a=0;a<f.length;a++)e(f[a])};B.prototype.i=function(a){if(void 0===a.__CE_state){var b=this.c(a.localName);if(b){b.constructionStack.push(a);var c=b.constructor;try{try{if(new c!==a)throw Error("The custom element constructor did not produce the element being upgraded.");
}finally{b.constructionStack.pop()}}catch(f){throw a.__CE_state=2,f;}a.__CE_state=1;a.__CE_definition=b;if(b.attributeChangedCallback)for(b=b.observedAttributes,c=0;c<b.length;c++){var d=b[c],e=a.getAttribute(d);null!==e&&this.attributeChangedCallback(a,d,null,e,null)}t(a)&&this.connectedCallback(a)}}};B.prototype.connectedCallback=function(a){var b=a.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};B.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&
b.disconnectedCallback.call(a)};B.prototype.attributeChangedCallback=function(a,b,c,d,e){var f=a.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(b)&&f.attributeChangedCallback.call(a,b,c,d,e)};Ja.prototype.c=function(){this.M&&this.M.disconnect()};Ja.prototype.f=function(a){var b=this.a.readyState;"interactive"!==b&&"complete"!==b||this.c();for(b=0;b<a.length;b++)for(var c=a[b].addedNodes,d=0;d<c.length;d++)this.b.f(c[d])};Gb.prototype.c=function(){if(this.a)throw Error("Already resolved.");
this.a=void 0;this.b&&this.b(void 0)};y.prototype.define=function(a,b){var c=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!Cc(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(this.a.c(a))throw Error("A custom element with name '"+a+"' has already been defined.");if(this.c)throw Error("A custom element is already being defined.");this.c=!0;try{var d=function(a){var b=e[a];if(void 0!==b&&!(b instanceof Function))throw Error("The '"+
a+"' callback must be a function.");return b},e=b.prototype;if(!(e instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=d("connectedCallback");var g=d("disconnectedCallback");var h=d("adoptedCallback");var l=d("attributeChangedCallback");var n=b.observedAttributes||[]}catch(m){return}finally{this.c=!1}b={localName:a,constructor:b,connectedCallback:f,disconnectedCallback:g,adoptedCallback:h,attributeChangedCallback:l,observedAttributes:n,constructionStack:[]};
this.a.B(a,b);this.g.push(b);this.b||(this.b=!0,this.f(function(){return c.j()}))};y.prototype.j=function(){var a=this;if(!1!==this.b){this.b=!1;for(var b=this.g,c=[],d=new Map,e=0;e<b.length;e++)d.set(b[e].localName,[]);this.a.f(document,{Da:function(b){if(void 0===b.__CE_state){var e=b.localName,f=d.get(e);f?f.push(b):a.a.c(e)&&c.push(b)}}});for(e=0;e<c.length;e++)this.a.i(c[e]);for(;0<b.length;){var f=b.shift();e=f.localName;f=d.get(f.localName);for(var g=0;g<f.length;g++)this.a.i(f[g]);(e=this.h.get(e))&&
e.c()}}};y.prototype.get=function(a){if(a=this.a.c(a))return a.constructor};y.prototype.whenDefined=function(a){if(!Cc(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this.h.get(a);if(b)return b.f;b=new Gb;this.h.set(a,b);this.a.c(a)&&!this.g.some(function(b){return b.localName===a})&&b.c();return b.f};y.prototype.l=function(a){this.i.c();var b=this.f;this.f=function(c){return a(function(){return b(c)})}};window.CustomElementRegistry=y;y.prototype.define=
y.prototype.define;y.prototype.get=y.prototype.get;y.prototype.whenDefined=y.prototype.whenDefined;y.prototype.polyfillWrapFlushCallback=y.prototype.l;var Ea=window.Document.prototype.createElement,td=window.Document.prototype.createElementNS,sd=window.Document.prototype.importNode,ud=window.Document.prototype.prepend,vd=window.Document.prototype.append,ce=window.DocumentFragment.prototype.prepend,de=window.DocumentFragment.prototype.append,wb=window.Node.prototype.cloneNode,ia=window.Node.prototype.appendChild,
Db=window.Node.prototype.insertBefore,Fa=window.Node.prototype.removeChild,Eb=window.Node.prototype.replaceChild,Ia=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),vb=window.Element.prototype.attachShadow,Ca=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),Ga=window.Element.prototype.getAttribute,xb=window.Element.prototype.setAttribute,zb=window.Element.prototype.removeAttribute,ja=window.Element.prototype.getAttributeNS,yb=window.Element.prototype.setAttributeNS,
Ab=window.Element.prototype.removeAttributeNS,Cb=window.Element.prototype.insertAdjacentElement,jd=window.Element.prototype.prepend,kd=window.Element.prototype.append,md=window.Element.prototype.before,nd=window.Element.prototype.after,od=window.Element.prototype.replaceWith,pd=window.Element.prototype.remove,xd=window.HTMLElement,Da=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),Bb=window.HTMLElement.prototype.insertAdjacentElement,Fb=new function(){},ta=window.customElements;
if(!ta||ta.forcePolyfill||"function"!=typeof ta.define||"function"!=typeof ta.get){var Y=new B;wd(Y);rd(Y);Ha(Y,DocumentFragment.prototype,{Z:ce,append:de});qd(Y);id(Y);document.__CE_hasRegistry=!0;var ee=new y(Y);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:ee})}var I={STYLE_RULE:1,da:7,MEDIA_RULE:4,na:1E3},F={Ya:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,wa:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,Aa:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
eb:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,jb:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,cb:/^@[^\s]*keyframes/,Ba:/\s+/g},z=!(window.ShadyDOM&&window.ShadyDOM.inUse);if(window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss)var A=window.ShadyCSS.nativeCss;else window.ShadyCSS?(Fc(window.ShadyCSS),window.ShadyCSS=void 0):Fc(window.WebComponents&&window.WebComponents.flags);var ua=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
va=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,fe=/(--[\w-]+)\s*([:,;)]|$)/gi,ge=/(animation\s*:)|(animation-name\s*:)/,Rd=/@media\s(.*)/,he=/\{[^}]*\}/g,Q=null;u.prototype.b=function(a,b,c){a.__styleScoped?a.__styleScoped=null:this.j(a,b||"",c)};u.prototype.j=function(a,b,c){a.nodeType===Node.ELEMENT_NODE&&this.h(a,b,c);if(a="template"===a.localName?(a.content||a.ob).childNodes:a.children||a.childNodes)for(var d=0;d<a.length;d++)this.j(a[d],b,c)};u.prototype.h=function(a,b,c){if(b)if(a.classList)c?(a.classList.remove("style-scope"),
a.classList.remove(b)):(a.classList.add("style-scope"),a.classList.add(b));else if(a.getAttribute){var d=a.getAttribute(ie);c?d&&(b=d.replace("style-scope","").replace(b,""),qa(a,b)):qa(a,(d?d+" ":"")+"style-scope "+b)}};u.prototype.c=function(a,b,c){var d=a.__cssBuild;z||"shady"===d?b=V(b,c):(a=R(a),b=this.G(b,a.is,a.V,c)+"\n\n");return b.trim()};u.prototype.G=function(a,b,c,d){var e=this.f(b,c);b=this.i(b);var f=this;return V(a,function(a){a.c||(f.I(a,b,e),a.c=!0);d&&d(a,b,e)})};u.prototype.i=function(a){return a?
je+a:""};u.prototype.f=function(a,b){return b?"[is="+a+"]":a};u.prototype.I=function(a,b,c){this.l(a,this.g,b,c)};u.prototype.l=function(a,b,c,d){a.selector=a.v=this.m(a,b,c,d)};u.prototype.m=function(a,b,c,d){var e=a.selector.split(Pc);if(!Gc(a)){a=0;for(var f=e.length,g;a<f&&(g=e[a]);a++)e[a]=b.call(this,g,c,d)}return e.join(Pc)};u.prototype.s=function(a){return a.replace(mb,function(a,c,d){-1<d.indexOf("+")?d=d.replace(/\+/g,"___"):-1<d.indexOf("___")&&(d=d.replace(/___/g,"+"));return":"+c+"("+
d+")"})};u.prototype.g=function(a,b,c){var d=this,e=!1;a=a.trim();var f=mb.test(a);f&&(a=a.replace(mb,function(a,b,c){return":"+b+"("+c.replace(/\s/g,"")+")"}),a=this.s(a));a=a.replace(ke,nb+" $1");a=a.replace(le,function(a,f,g){e||(a=d.B(g,f,b,c),e=e||a.stop,f=a.Xa,g=a.value);return f+g});f&&(a=this.s(a));return a};u.prototype.B=function(a,b,c,d){var e=a.indexOf(ob);0<=a.indexOf(nb)?a=this.F(a,d):0!==e&&(a=c?this.o(a,c):a);c=!1;0<=e&&(b="",c=!0);if(c){var f=!0;c&&(a=a.replace(me,function(a,b){return" > "+
b}))}a=a.replace(ne,function(a,b,c){return'[dir="'+c+'"] '+b+", "+b+'[dir="'+c+'"]'});return{value:a,Xa:b,stop:f}};u.prototype.o=function(a,b){a=a.split(Qc);a[0]+=b;return a.join(Qc)};u.prototype.F=function(a,b){var c=a.match(Rc);return(c=c&&c[2].trim()||"")?c[0].match(Sc)?a.replace(Rc,function(a,c,f){return b+f}):c.split(Sc)[0]===b?c:oe:a.replace(nb,b)};u.prototype.H=function(a){a.selector=a.parsedSelector;this.w(a);this.l(a,this.K)};u.prototype.w=function(a){a.selector===pe&&(a.selector="html")};
u.prototype.K=function(a){return a.match(ob)?this.g(a,Tc):this.o(a.trim(),Tc)};J.Object.defineProperties(u.prototype,{a:{configurable:!0,enumerable:!0,get:function(){return"style-scope"}}});var mb=/:(nth[-\w]+)\(([^)]+)\)/,Tc=":not(.style-scope)",Pc=",",le=/(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,Sc=/[[.:#*]/,nb=":host",pe=":root",ob="::slotted",ke=new RegExp("^("+ob+")"),Rc=/(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,me=/(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,ne=/(.*):dir\((?:(ltr|rtl))\)/,
je=".",Qc=":",ie="class",oe="should_not_match",p=new u;v.get=function(a){return a?a.__styleInfo:null};v.set=function(a,b){return a.__styleInfo=b};v.prototype.c=function(){return this.D};v.prototype._getStyleRules=v.prototype.c;var Uc=function(a){return a.matches||a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector}(window.Element.prototype),qe=navigator.userAgent.match("Trident");n.prototype.H=function(a){var b=this,c={},d=[],e=0;W(a,function(a){b.c(a);
a.index=e++;b.G(a.u.cssText,c)},function(a){d.push(a)});a.b=d;a=[];for(var f in c)a.push(f);return a};n.prototype.c=function(a){if(!a.u){var b={},c={};this.b(a,c)&&(b.C=c,a.rules=null);b.cssText=this.F(a);a.u=b}};n.prototype.b=function(a,b){var c=a.u;if(c){if(c.C)return Object.assign(b,c.C),!0}else{c=a.parsedCssText;for(var d;a=ua.exec(c);){d=(a[2]||a[3]).trim();if("inherit"!==d||"unset"!==d)b[a[1].trim()]=d;d=!0}return d}};n.prototype.F=function(a){return this.K(a.parsedCssText)};n.prototype.K=function(a){return a.replace(he,
"").replace(ua,"")};n.prototype.G=function(a,b){for(var c;c=fe.exec(a);){var d=c[1];":"!==c[2]&&(b[d]=!0)}};n.prototype.aa=function(a){for(var b=Object.getOwnPropertyNames(a),c=0,d;c<b.length;c++)d=b[c],a[d]=this.a(a[d],a)};n.prototype.a=function(a,b){if(a)if(0<=a.indexOf(";"))a=this.f(a,b);else{var c=this;a=Ic(a,function(a,e,f,g){if(!e)return a+g;(e=c.a(b[e],b))&&"initial"!==e?"apply-shim-inherit"===e&&(e="inherit"):e=c.a(b[f]||f,b)||f;return a+(e||"")+g})}return a&&a.trim()||""};n.prototype.f=function(a,
b){a=a.split(";");for(var c=0,d,e;c<a.length;c++)if(d=a[c]){va.lastIndex=0;if(e=va.exec(d))d=this.a(b[e[1]],b);else if(e=d.indexOf(":"),-1!==e){var f=d.substring(e);f=f.trim();f=this.a(f,b)||f;d=d.substring(0,e)+f}a[c]=d&&d.lastIndexOf(";")===d.length-1?d.slice(0,-1):d||""}return a.join(";")};n.prototype.B=function(a,b){var c="";a.u||this.c(a);a.u.cssText&&(c=this.f(a.u.cssText,b));a.cssText=c};n.prototype.w=function(a,b){var c=a.cssText,d=a.cssText;null==a.ya&&(a.ya=ge.test(c));if(a.ya)if(null==
a.Y){a.Y=[];for(var e in b)d=b[e],d=d(c),c!==d&&(c=d,a.Y.push(e))}else{for(e=0;e<a.Y.length;++e)d=b[a.Y[e]],c=d(c);d=c}a.cssText=d};n.prototype.O=function(a,b){var c={},d=this,e=[];W(a,function(a){a.u||d.c(a);var f=a.v||a.parsedSelector;b&&a.u.C&&f&&Uc.call(b,f)&&(d.b(a,c),a=a.index,f=parseInt(a/32,10),e[f]=(e[f]||0)|1<<a%32)},null,!0);return{C:c,key:e}};n.prototype.ca=function(a,b,c,d){b.u||this.c(b);if(b.u.C){var e=R(a);a=e.is;e=e.V;e=a?p.f(a,e):"html";var f=b.parsedSelector,g=":host > *"===f||
"html"===f,h=0===f.indexOf(":host")&&!g;"shady"===c&&(g=f===e+" > *."+e||-1!==f.indexOf("html"),h=!g&&0===f.indexOf(e));"shadow"===c&&(g=":host > *"===f||"html"===f,h=h&&!g);if(g||h)c=e,h&&(z&&!b.v&&(b.v=p.m(b,p.g,p.i(a),e)),c=b.v||e),d({ib:c,bb:h,qb:g})}};n.prototype.I=function(a,b){var c={},d={},e=this,f=b&&b.__cssBuild;W(b,function(b){e.ca(a,b,f,function(f){Uc.call(a.pb||a,f.ib)&&(f.bb?e.b(b,c):e.b(b,d))})},null,!0);return{gb:d,ab:c}};n.prototype.ba=function(a,b,c){var d=this,e=R(a),f=p.f(e.is,
e.V),g=new RegExp("(?:^|[^.#[:])"+(a.extends?"\\"+f.slice(0,-1)+"\\]":f)+"($|[.:[\\s>+~])");e=v.get(a).D;var h=this.h(e,c);return p.c(a,e,function(a){d.B(a,b);z||Gc(a)||!a.cssText||(d.w(a,h),d.l(a,g,f,c))})};n.prototype.h=function(a,b){a=a.b;var c={};if(!z&&a)for(var d=0,e=a[d];d<a.length;e=a[++d])this.j(e,b),c[e.keyframesName]=this.i(e);return c};n.prototype.i=function(a){return function(b){return b.replace(a.f,a.a)}};n.prototype.j=function(a,b){a.f=new RegExp(a.keyframesName,"g");a.a=a.keyframesName+
"-"+b;a.v=a.v||a.selector;a.selector=a.v.replace(a.keyframesName,a.a)};n.prototype.l=function(a,b,c,d){a.v=a.v||a.selector;d="."+d;for(var e=a.v.split(","),f=0,g=e.length,h;f<g&&(h=e[f]);f++)e[f]=h.match(b)?h.replace(c,d):d+" "+h;a.selector=e.join(",")};n.prototype.o=function(a,b,c){var d=a.getAttribute("class")||"",e=d;c&&(e=d.replace(new RegExp("\\s*x-scope\\s*"+c+"\\s*","g")," "));e+=(e?" ":"")+"x-scope "+b;d!==e&&qa(a,e)};n.prototype.s=function(a,b,c,d){b=d?d.textContent||"":this.ba(a,b,c);var e=
v.get(a),f=e.a;f&&!z&&f!==d&&(f._useCount--,0>=f._useCount&&f.parentNode&&f.parentNode.removeChild(f));z?e.a?(e.a.textContent=b,d=e.a):b&&(d=eb(b,c,a.shadowRoot,e.b)):d?d.parentNode||(qe&&-1<b.indexOf("@media")&&(d.textContent=b),Hc(d,null,e.b)):b&&(d=eb(b,c,null,e.b));d&&(d._useCount=d._useCount||0,e.a!=d&&d._useCount++,e.a=d);return d};n.prototype.m=function(a,b){var c=pa(a),d=this;a.textContent=V(c,function(a){var c=a.cssText=a.parsedCssText;a.u&&a.u.cssText&&(c=c.replace(F.wa,"").replace(F.Aa,
""),a.cssText=d.f(c,b))})};J.Object.defineProperties(n.prototype,{g:{configurable:!0,enumerable:!0,get:function(){return"x-scope"}}});var M=new n,pb={},wa=window.customElements;if(wa&&!z){var re=wa.define;wa.define=function(a,b,c){var d=document.createComment(" Shady DOM styles for "+a+" "),e=document.head;e.insertBefore(d,(Q?Q.nextSibling:null)||e.firstChild);Q=d;pb[a]=d;return re.call(wa,a,b,c)}}ha.prototype.a=function(a,b,c){for(var d=0;d<c.length;d++){var e=c[d];if(a.C[e]!==b[e])return!1}return!0};
ha.prototype.b=function(a,b,c,d){var e=this.cache[a]||[];e.push({C:b,styleElement:c,A:d});e.length>this.c&&e.shift();this.cache[a]=e};ha.prototype.fetch=function(a,b,c){if(a=this.cache[a])for(var d=a.length-1;0<=d;d--){var e=a[d];if(this.a(e,b,c))return e}};if(!z){var Vc=new MutationObserver(Jc),Wc=function(a){Vc.observe(a,{childList:!0,subtree:!0})};if(window.customElements&&!window.customElements.polyfillWrapFlushCallback)Wc(document);else{var qb=function(){Wc(document.body)};window.HTMLImports?
window.HTMLImports.whenReady(qb):requestAnimationFrame(function(){if("loading"===document.readyState){var a=function(){qb();document.removeEventListener("readystatechange",a)};document.addEventListener("readystatechange",a)}else qb()})}N=function(){Jc(Vc.takeRecords())}}var ra={},Ud=Promise.resolve(),fb=null,Lc=window.HTMLImports&&window.HTMLImports.whenReady||null,gb,xa=null,fa=null;q.prototype.xa=function(){!this.enqueued&&fa&&(this.enqueued=!0,ub(fa))};q.prototype.b=function(a){a.__seenByShadyCSS||
(a.__seenByShadyCSS=!0,this.customStyles.push(a),this.xa())};q.prototype.a=function(a){return a.__shadyCSSCachedStyle?a.__shadyCSSCachedStyle:a.getStyle?a.getStyle():a};q.prototype.c=function(){for(var a=this.customStyles,b=0;b<a.length;b++){var c=a[b];if(!c.__shadyCSSCachedStyle){var d=this.a(c);d&&(d=d.__appliedElement||d,xa&&xa(d),c.__shadyCSSCachedStyle=d)}}return a};q.prototype.addCustomStyle=q.prototype.b;q.prototype.getStyleForCustomStyle=q.prototype.a;q.prototype.processStyles=q.prototype.c;
Object.defineProperties(q.prototype,{transformCallback:{get:function(){return xa},set:function(a){xa=a}},validateCallback:{get:function(){return fa},set:function(a){var b=!1;fa||(b=!0);fa=a;b&&this.xa()}}});var Xc=new ha;g.prototype.w=function(){N()};g.prototype.I=function(a){var b=this.m[a]=(this.m[a]||0)+1;return a+"-"+b};g.prototype.Ha=function(a){return pa(a)};g.prototype.Ja=function(a){return V(a)};g.prototype.H=function(a){a=a.content.querySelectorAll("style");for(var b=[],c=0;c<a.length;c++){var d=
a[c];b.push(d.textContent);d.parentNode.removeChild(d)}return b.join("").trim()};g.prototype.aa=function(a){return(a=a.content.querySelector("style"))?a.getAttribute("css-build")||"":""};g.prototype.prepareTemplate=function(a,b,c){if(!a.f){a.f=!0;a.name=b;a.extends=c;ra[b]=a;var d=this.aa(a),e=this.H(a);c={is:b,extends:c,mb:d};z||p.b(a.content,b);this.c();var f=va.test(e)||ua.test(e);va.lastIndex=0;ua.lastIndex=0;e=db(e);f&&A&&this.a&&this.a.transformRules(e,b);a._styleAst=e;a.g=d;d=[];A||(d=M.H(a._styleAst));
if(!d.length||A)b=this.O(c,a._styleAst,z?a.content:null,pb[b]),a.a=b;a.c=d}};g.prototype.O=function(a,b,c,d){b=p.c(a,b);if(b.length)return eb(b,a.is,c,d)};g.prototype.ca=function(a){var b=R(a),c=b.is;b=b.V;var d=pb[c];c=ra[c];if(c){var e=c._styleAst;var f=c.c}return v.set(a,new v(e,d,f,0,b))};g.prototype.F=function(){!this.a&&window.ShadyCSS&&window.ShadyCSS.ApplyShim&&(this.a=window.ShadyCSS.ApplyShim,this.a.invalidCallback=Sd)};g.prototype.G=function(){var a=this;!this.b&&window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface&&
(this.b=window.ShadyCSS.CustomStyleInterface,this.b.transformCallback=function(b){a.s(b)},this.b.validateCallback=function(){requestAnimationFrame(function(){(a.b.enqueued||a.i)&&a.f()})})};g.prototype.c=function(){this.F();this.G()};g.prototype.f=function(){this.c();if(this.b){var a=this.b.processStyles();this.b.enqueued&&(A?this.Fa(a):(this.o(this.g,this.h),this.B(a)),this.b.enqueued=!1,this.i&&!A&&this.styleDocument())}};g.prototype.styleElement=function(a,b){var c=R(a).is,d=v.get(a);d||(d=this.ca(a));
this.j(a)||(this.i=!0);b&&(d.N=d.N||{},Object.assign(d.N,b));if(A){if(d.N){b=d.N;for(var e in b)null===e?a.style.removeProperty(e):a.style.setProperty(e,b[e])}if(((e=ra[c])||this.j(a))&&e&&e.a&&!Kc(e)){if(Kc(e)||e._applyShimValidatingVersion!==e._applyShimNextVersion)this.c(),this.a&&this.a.transformRules(e._styleAst,c),e.a.textContent=p.c(a,d.D),Td(e);z&&(c=a.shadowRoot)&&(c.querySelector("style").textContent=p.c(a,d.D));d.D=e._styleAst}}else this.o(a,d),d.la&&d.la.length&&this.K(a,d)};g.prototype.l=
function(a){return(a=a.getRootNode().host)?v.get(a)?a:this.l(a):this.g};g.prototype.j=function(a){return a===this.g};g.prototype.K=function(a,b){var c=R(a).is,d=Xc.fetch(c,b.J,b.la),e=d?d.styleElement:null,f=b.A;b.A=d&&d.A||this.I(c);e=M.s(a,b.J,b.A,e);z||M.o(a,b.A,f);d||Xc.b(c,b.J,e,b.A)};g.prototype.o=function(a,b){var c=this.l(a),d=v.get(c);c=Object.create(d.J||null);var e=M.I(a,b.D);a=M.O(d.D,a).C;Object.assign(c,e.ab,a,e.gb);this.ba(c,b.N);M.aa(c);b.J=c};g.prototype.ba=function(a,b){for(var c in b){var d=
b[c];if(d||0===d)a[c]=d}};g.prototype.styleDocument=function(a){this.styleSubtree(this.g,a)};g.prototype.styleSubtree=function(a,b){var c=a.shadowRoot;(c||this.j(a))&&this.styleElement(a,b);if(b=c&&(c.children||c.childNodes))for(a=0;a<b.length;a++)this.styleSubtree(b[a]);else if(a=a.children||a.childNodes)for(b=0;b<a.length;b++)this.styleSubtree(a[b])};g.prototype.Fa=function(a){for(var b=0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);c&&this.Ea(c)}};g.prototype.B=function(a){for(var b=
0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);c&&M.m(c,this.h.J)}};g.prototype.s=function(a){var b=this,c=pa(a);W(c,function(a){z?p.w(a):p.H(a);A&&(b.c(),b.a&&b.a.transformRule(a))});A?a.textContent=V(c):this.h.D.rules.push(c)};g.prototype.Ea=function(a){if(A&&this.a){var b=pa(a);this.c();this.a.transformRules(b);a.textContent=V(b)}};g.prototype.getComputedStyleValue=function(a,b){var c;A||(c=(v.get(a)||v.get(this.l(a))).J[b]);return(c=c||window.getComputedStyle(a).getPropertyValue(b))?
c.trim():""};g.prototype.Ia=function(a,b){var c=a.getRootNode();b=b?b.split(/\s/):[];c=c.host&&c.host.localName;if(!c){var d=a.getAttribute("class");if(d){d=d.split(/\s/);for(var e=0;e<d.length;e++)if(d[e]===p.a){c=d[e+1];break}}}c&&b.push(p.a,c);A||(c=v.get(a))&&c.A&&b.push(M.g,c.A);qa(a,b.join(" "))};g.prototype.Ga=function(a){return v.get(a)};g.prototype.flush=g.prototype.w;g.prototype.prepareTemplate=g.prototype.prepareTemplate;g.prototype.styleElement=g.prototype.styleElement;g.prototype.styleDocument=
g.prototype.styleDocument;g.prototype.styleSubtree=g.prototype.styleSubtree;g.prototype.getComputedStyleValue=g.prototype.getComputedStyleValue;g.prototype.setElementClass=g.prototype.Ia;g.prototype._styleInfoForNode=g.prototype.Ga;g.prototype.transformCustomStyleForDocument=g.prototype.s;g.prototype.getStyleAst=g.prototype.Ha;g.prototype.styleAstToString=g.prototype.Ja;g.prototype.flushCustomStyles=g.prototype.f;Object.defineProperties(g.prototype,{nativeShadow:{get:function(){return z}},nativeCss:{get:function(){return A}}});
var H=new g;if(window.ShadyCSS){var Yc=window.ShadyCSS.ApplyShim;var Zc=window.ShadyCSS.CustomStyleInterface}window.ShadyCSS={ScopingShim:H,prepareTemplate:function(a,b,c){H.f();H.prepareTemplate(a,b,c)},styleSubtree:function(a,b){H.f();H.styleSubtree(a,b)},styleElement:function(a){H.f();H.styleElement(a)},styleDocument:function(a){H.f();H.styleDocument(a)},getComputedStyleValue:function(a,b){return H.getComputedStyleValue(a,b)},nativeCss:A,nativeShadow:z};Yc&&(window.ShadyCSS.ApplyShim=Yc);Zc&&(window.ShadyCSS.CustomStyleInterface=
Zc);var rb=window.customElements,ya=window.HTMLImports;window.WebComponents=window.WebComponents||{};if(rb&&rb.polyfillWrapFlushCallback){var za,$c=function(){if(za){var a=za;za=null;a();return!0}},ad=ya.whenReady;rb.polyfillWrapFlushCallback(function(a){za=a;ad($c)});ya.whenReady=function(a){ad(function(){$c()?ya.whenReady(a):a()})}}ya.whenReady(function(){requestAnimationFrame(function(){window.WebComponents.ready=!0;document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})});
var bd=document.createElement("style");bd.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var cd=document.querySelector("head");cd.insertBefore(bd,cd.firstChild)})();}).call(this);

//# sourceMappingURL=webcomponents-hi-sd-ce.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 31 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = __webpack_require__(10);
const EventAggregator_1 = __webpack_require__(33);
const LEX_1 = __webpack_require__(2);
const LineRasterizer_1 = __webpack_require__(35);
const Renderer_1 = __webpack_require__(37);
const Stage_1 = __webpack_require__(40);
const UIController_1 = __webpack_require__(41);
const RenderEvent_1 = __webpack_require__(4);
class Application {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderer = new Renderer_1.Renderer({ lineRasterizer: new LineRasterizer_1.LineRasterizer(), canvas: this.canvas });
        this.stage = new Stage_1.Stage();
        this.eventAggregator = new EventAggregator_1.EventAggregator();
        this.uiController = new UIController_1.UIController({
            renderer: this.renderer,
            stage: this.stage,
            canvas: this.canvas,
            eventAggregator: this.eventAggregator
        });
        this.render = this.render.bind(this);
    }
    init() {
        const polygonLayer = new Layer_1.Layer(LEX_1.LEX.POLYGON_LAYER_NAME);
        this.stage.layers.push(polygonLayer);
        this.uiController.init();
        this.addEventListeners();
    }
    destroy() {
        this.uiController.destroy();
        this.removeEventListeners();
    }
    render(event) {
        this.renderer.clear();
        this.stage.render(this.renderer);
        event.handled = true;
    }
    addEventListeners() {
        this.eventAggregator.addEventListener(RenderEvent_1.RenderEvent.eventType, this.render);
    }
    removeEventListeners() {
        this.eventAggregator.removeEventListener(RenderEvent_1.RenderEvent.eventType, this.render);
    }
}
exports.Application = Application;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventQueue_1 = __webpack_require__(34);
class EventAggregator {
    constructor() {
        this.listenerMap = new Map();
        this.eventQueue = new EventQueue_1.EventQueue();
        this.isDispatching = false;
    }
    addEventListener(eventType, listener) {
        const eventListeners = this.getEventListeners(eventType);
        if (eventListeners.indexOf(listener) === -1) {
            eventListeners.push(listener);
        }
        this.listenerMap.set(eventType, eventListeners);
    }
    removeEventListener(eventType, listener) {
        const eventListeners = this.getEventListeners(eventType);
        const listenerIndex = eventListeners.indexOf(listener);
        if (listenerIndex !== -1) {
            eventListeners.splice(listenerIndex, 1);
        }
        this.listenerMap.set(eventType, eventListeners);
    }
    dispatchEvent(event) {
        this.eventQueue.enqueue(event);
        if (!this.isDispatching) {
            this.dispatchEventFromQueue();
        }
    }
    dispatchEventFromQueue() {
        this.isDispatching = true;
        const event = this.eventQueue.dequeue();
        const eventListeners = this.getEventListeners(event.eventType);
        eventListeners.forEach(listener => listener(event));
        if (this.eventQueue.isEmpty()) {
            this.isDispatching = false;
        }
        else {
            this.dispatchEventFromQueue();
        }
    }
    getEventListeners(eventType) {
        return this.listenerMap.get(eventType) || [];
    }
}
exports.EventAggregator = EventAggregator;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EventQueue {
    constructor() {
        this._queue = [];
    }
    enqueue(event) {
        this._queue.push(event);
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this._queue.splice(0, 1)[0];
    }
    getLength() {
        return this._queue.length;
    }
    isEmpty() {
        return this.getLength() === 0;
    }
}
exports.EventQueue = EventQueue;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(1);
const octant_vector_transformations_1 = __webpack_require__(36);
class LineRasterizer {
    rasterizeLine(startPoint, endPoint, thickness) {
        const translationVector = Point_1.Point.subtract(endPoint, startPoint);
        const translationVectorOctant = translationVector.getOctant();
        const vectorTransformation = octant_vector_transformations_1.octantVectorTransformations[translationVectorOctant];
        const reverseVectorTransformation = octant_vector_transformations_1.reverseOctantVectorTransformations[translationVectorOctant];
        const rasterizedTransformedLine = this.rasterizeLineFirstQuadrant(vectorTransformation(translationVector), thickness);
        return rasterizedTransformedLine.map(point => Point_1.Point.add(reverseVectorTransformation(point), startPoint));
    }
    rasterizeLineFirstQuadrant(endPoint, thickness) {
        const rasterizedLine = [];
        const dx = endPoint.x;
        const dy = endPoint.y;
        const incrementE = 2 * dy;
        const incrementNE = 2 * (dy - dx);
        let d = 2 * dy - dx;
        let x = 0;
        let y = 0;
        for (const point of this.getThickPointsIteratorInFirstQuadrant(new Point_1.Point(x, y), thickness)) {
            rasterizedLine.push(point);
        }
        while (x < endPoint.x) {
            if (d < 0) {
                d += incrementE;
            }
            else {
                d += incrementNE;
                y += 1;
            }
            x += 1;
            for (const point of this.getThickPointsIteratorInFirstQuadrant(new Point_1.Point(x, y), thickness)) {
                rasterizedLine.push(point);
            }
        }
        return rasterizedLine;
    }
    *getThickPointsIteratorInFirstQuadrant(point, thickness) {
        let dy = 1;
        yield point;
        for (let currentThickness = 1; currentThickness < thickness; currentThickness += 1) {
            yield new Point_1.Point(point.x, point.y + dy);
            dy = -dy;
            if (dy > 0) {
                dy += 1;
            }
        }
    }
}
exports.LineRasterizer = LineRasterizer;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Octant_1 = __webpack_require__(15);
const Point_1 = __webpack_require__(1);
// Transformations from a specific octant to the first octant
const octantVectorTransformations = {
    [Octant_1.Octant.First]: (p) => p,
    [Octant_1.Octant.Second]: (p) => new Point_1.Point(p.y, p.x),
    [Octant_1.Octant.Third]: (p) => new Point_1.Point(p.y, -p.x),
    [Octant_1.Octant.Fourth]: (p) => new Point_1.Point(-p.x, p.y),
    [Octant_1.Octant.Fifth]: (p) => new Point_1.Point(-p.x, -p.y),
    [Octant_1.Octant.Sixth]: (p) => new Point_1.Point(-p.y, -p.x),
    [Octant_1.Octant.Seventh]: (p) => new Point_1.Point(-p.y, p.x),
    [Octant_1.Octant.Eighth]: (p) => new Point_1.Point(p.x, -p.y)
};
exports.octantVectorTransformations = octantVectorTransformations;
// Transformations from the first octant to a specific octant
const reverseOctantVectorTransformations = {
    [Octant_1.Octant.First]: (p) => p,
    [Octant_1.Octant.Second]: (p) => new Point_1.Point(p.y, p.x),
    [Octant_1.Octant.Third]: (p) => new Point_1.Point(-p.y, p.x),
    [Octant_1.Octant.Fourth]: (p) => new Point_1.Point(-p.x, p.y),
    [Octant_1.Octant.Fifth]: (p) => new Point_1.Point(-p.x, -p.y),
    [Octant_1.Octant.Sixth]: (p) => new Point_1.Point(-p.y, -p.x),
    [Octant_1.Octant.Seventh]: (p) => new Point_1.Point(p.y, -p.x),
    [Octant_1.Octant.Eighth]: (p) => new Point_1.Point(p.x, -p.y)
};
exports.reverseOctantVectorTransformations = reverseOctantVectorTransformations;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COLORS_1 = __webpack_require__(8);
const Line_1 = __webpack_require__(3);
const Point_1 = __webpack_require__(1);
const Polygon_1 = __webpack_require__(9);
const configuration_1 = __webpack_require__(0);
class Renderer {
    constructor(dependencies) {
        this.canvas = dependencies.canvas;
        const context = this.canvas.getContext('2d');
        if (context === null) {
            throw new Error('Cannot get canvas 2d rendering context');
        }
        this.renderingContext = context;
        this.renderingContext.font = configuration_1.configuration.canvasFont;
        this.lineRasterizer = dependencies.lineRasterizer;
        this.setFillColor(COLORS_1.COLORS.BLACK);
    }
    drawPoint(point) {
        this.drawPixel(point.x, point.y);
    }
    drawPixel(x, y) {
        this.renderingContext.fillRect(x, y, 1, 1);
    }
    // tslint:disable-next-line no-any
    drawLine(...args) {
        if (args[0] instanceof Line_1.Line) {
            return this.drawLineBetweenPoints(args[0].p1, args[0].p2, args[1]);
        }
        else {
            return this.drawLineBetweenPoints(args[0], args[1], args[2]);
        }
    }
    drawPath(path) {
        const pathLineProperties = path.getLineProperties();
        for (const line of path.getLineIterator()) {
            this.drawLine(line, pathLineProperties);
        }
        if (path instanceof Polygon_1.Polygon) {
            this.drawLineConditions(path.getLineConditions());
        }
    }
    fillText(text, pointOrX, y) {
        let x = pointOrX;
        if (typeof pointOrX === 'object' && pointOrX instanceof Point_1.Point) {
            x = pointOrX.x;
            y = pointOrX.y;
        }
        this.renderingContext.fillText(text, x, y);
    }
    clear() {
        this.renderingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    setFillColor(color) {
        this.renderingContext.fillStyle = color.fillStyle;
    }
    drawLineBetweenPoints(startPoint, endPoint, lineProperties) {
        const rasterizedLinePoints = this.lineRasterizer.rasterizeLine(startPoint, endPoint, lineProperties.thickness);
        this.setFillColor(lineProperties.color);
        rasterizedLinePoints.forEach(point => this.drawPoint(point));
    }
    drawLineConditions(lineConditions) {
        lineConditions.forEach(lineCondition => {
            this.fillText(lineCondition.getLabel(), Point_1.Point.add(lineCondition.line.getMiddlePoint(), configuration_1.configuration.lineConditionLabelOffset));
        });
    }
}
exports.Renderer = Renderer;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(r, b, g) {
        this.r = r;
        this.b = b;
        this.g = g;
        this.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}
exports.Color = Color;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HitTestResult {
    constructor(line, path, layer) {
        this.line = line;
        this.path = path;
        this.layer = layer;
    }
}
exports.HitTestResult = HitTestResult;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Stage {
    constructor() {
        this.layers = [];
    }
    render(renderer) {
        this.layers.forEach(layer => layer.render(renderer));
    }
    removeLayer(layer) {
        const index = this.layers.indexOf(layer);
        if (index === -1) {
            return;
        }
        this.layers.splice(index, 1);
    }
    hitTest(point) {
        for (const layer of this.layers) {
            const result = layer.hitTest(point);
            if (!result) {
                continue;
            }
            return result;
        }
        return null;
    }
    findLayerByName(name) {
        const foundLayer = this.layers.find(layer => layer.name === name);
        if (!foundLayer) {
            throw new Error(`Layer with name ${name} does not exist`);
        }
        return foundLayer;
    }
}
exports.Stage = Stage;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = __webpack_require__(0);
const LEX_1 = __webpack_require__(2);
const UIConditionController_1 = __webpack_require__(42);
const MousePositionTransformer_1 = __webpack_require__(52);
const NewPolygonUIController_1 = __webpack_require__(53);
const PointDraggingService_1 = __webpack_require__(54);
const PointInserterService_1 = __webpack_require__(56);
const PointRemoverService_1 = __webpack_require__(57);
const PointSyncService_1 = __webpack_require__(58);
const ConditionMatcher_1 = __webpack_require__(62);
const LineClickEvent_1 = __webpack_require__(13);
__webpack_require__(63);
__webpack_require__(24);
class UIController {
    constructor(dependencies) {
        this.uiServices = [];
        this.canvas = dependencies.canvas;
        this.renderer = dependencies.renderer;
        this.stage = dependencies.stage;
        this.eventAggregator = dependencies.eventAggregator;
        this.onClick = this.onClick.bind(this);
    }
    init() {
        const applicationUIContainer = document.getElementById(configuration_1.configuration.applicationUIContainerID);
        if (!applicationUIContainer) {
            throw new Error('Application UI container not found');
        }
        this.applicationUIContainer = applicationUIContainer;
        this.mousePositionTransformer = new MousePositionTransformer_1.MousePositionTransformer(this.canvas);
        this.canvas.addEventListener('click', this.onClick);
        this.createNewPolygonUIController();
        this.createPointDraggingService();
        this.createPointInserterService();
        this.createPointRemoverService();
        this.createPointSyncService();
        this.createUIConditionController();
        this.uiServices.forEach(uiService => uiService.init());
    }
    destroy() {
        this.canvas.removeEventListener('click', this.onClick);
        this.uiServices.forEach(uiService => uiService.destroy());
        this.uiServices.splice(0, this.uiServices.length);
    }
    onClick(event) {
        event.stopPropagation();
        const point = this.mousePositionTransformer.getPointFromMouseEvent(event);
        const hitTestResult = this.stage.hitTest(point);
        if (!hitTestResult) {
            return this.newPolygonUIController.addNewPoint(point);
        }
        if (!hitTestResult.path) {
            return;
        }
        event.stopPropagation();
        this.eventAggregator.dispatchEvent(new LineClickEvent_1.LineClickEvent(hitTestResult.line, hitTestResult.path, point));
    }
    createPointSyncService() {
        const pointSyncService = new PointSyncService_1.PointSyncService({
            container: this.applicationUIContainer,
            mousePositionTransformer: this.mousePositionTransformer,
            stage: this.stage,
            eventAggregator: this.eventAggregator
        });
        this.uiServices.push(pointSyncService);
    }
    createPointRemoverService() {
        const pointRemoverService = new PointRemoverService_1.PointRemoverService({
            eventAggregator: this.eventAggregator
        });
        this.uiServices.push(pointRemoverService);
    }
    createPointDraggingService() {
        const pointDraggingService = new PointDraggingService_1.PointDraggingService({
            eventAggregator: this.eventAggregator,
            stage: this.stage
        });
        this.uiServices.push(pointDraggingService);
    }
    createNewPolygonUIController() {
        this.newPolygonUIController = new NewPolygonUIController_1.NewPolygonUIController({
            applicationUIContainer: this.applicationUIContainer,
            canvas: this.canvas,
            stage: this.stage,
            polygonLayer: this.stage.findLayerByName(LEX_1.LEX.POLYGON_LAYER_NAME),
            renderer: this.renderer,
            mousePositionTransformer: this.mousePositionTransformer,
            eventAggregator: this.eventAggregator
        });
        this.uiServices.push(this.newPolygonUIController);
    }
    createPointInserterService() {
        const pointInserterService = new PointInserterService_1.PointInserterService({
            eventAggregator: this.eventAggregator
        });
        this.uiServices.push(pointInserterService);
    }
    createUIConditionController() {
        const uiConditionController = new UIConditionController_1.UIConditionController({
            eventAggregator: this.eventAggregator,
            applicationUIContainer: this.applicationUIContainer,
            conditionMatcher: new ConditionMatcher_1.ConditionMatcher()
        });
        this.uiServices.push(uiConditionController);
    }
}
exports.UIController = UIController;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConditionPicker_1 = __webpack_require__(43);
const Line_1 = __webpack_require__(3);
const Polygon_1 = __webpack_require__(9);
const configuration_1 = __webpack_require__(0);
const LineClickEvent_1 = __webpack_require__(13);
const LEX_1 = __webpack_require__(2);
const ConditionFixer_1 = __webpack_require__(20);
const RenderEvent_1 = __webpack_require__(4);
const SyncComponentsEvent_1 = __webpack_require__(5);
class UIConditionController {
    constructor(dependencies) {
        this.conditionPicker = new ConditionPicker_1.ConditionPicker();
        this.previousLineClickTimestamp = 0;
        this.eventAggregator = dependencies.eventAggregator;
        this.applicationUIContainer = dependencies.applicationUIContainer;
        this.conditionMatcher = dependencies.conditionMatcher;
        this.onLineClick = this.onLineClick.bind(this);
        this.onNewCondition = this.onNewCondition.bind(this);
        this.onRemoveCondition = this.onRemoveCondition.bind(this);
    }
    init() {
        this.eventAggregator.addEventListener(LineClickEvent_1.LineClickEvent.eventType, this.onLineClick);
        this.applicationUIContainer.appendChild(this.conditionPicker);
        this.conditionPicker.addEventListener(LEX_1.LEX.NEW_CONDITION_EVENT_NAME, this.onNewCondition);
        this.conditionPicker.addEventListener(LEX_1.LEX.REMOVE_CONDITION_EVENT_NAME, this.onRemoveCondition);
        this.conditionPicker.setAttribute('data-visible', 'false');
    }
    destroy() {
        this.eventAggregator.removeEventListener(LineClickEvent_1.LineClickEvent.eventType, this.onLineClick);
        this.conditionPicker.removeEventListener(LEX_1.LEX.NEW_CONDITION_EVENT_NAME, this.onNewCondition);
        this.conditionPicker.removeEventListener(LEX_1.LEX.REMOVE_CONDITION_EVENT_NAME, this.onRemoveCondition);
        this.applicationUIContainer.removeChild(this.conditionPicker);
    }
    onLineClick(event) {
        if (!(event.payload.path instanceof Polygon_1.Polygon)) {
            return;
        }
        const previousClickTimestamp = this.previousLineClickTimestamp;
        const currentTimestamp = Date.now();
        this.previousLineClickTimestamp = currentTimestamp;
        if (currentTimestamp - previousClickTimestamp <= configuration_1.configuration.doubleClickMaxDelay) {
            return this.conditionPicker.setAttribute('data-visible', 'false');
        }
        this.conditionPicker.setAttribute('data-x', event.payload.position.x.toString());
        this.conditionPicker.setAttribute('data-y', event.payload.position.y.toString());
        this.conditionPicker.updateSelectedLine(event.payload.line, event.payload.path);
        this.conditionPicker.setAttribute('data-visible', 'true');
    }
    onNewCondition(event) {
        const lineCondition = event.detail;
        try {
            lineCondition.verifyCanBeApplied();
            this.conditionMatcher.verifyConditionAllowed(lineCondition);
        }
        catch (error) {
            return alert(`Cannot apply condition: ${error.message}`);
        }
        if (!lineCondition.isMet()) {
            this.fixUnmetLineCondition(lineCondition);
        }
        lineCondition.polygon.addLineCondition(lineCondition);
        this.dispatchUpdate();
    }
    fixUnmetLineCondition(lineCondition) {
        const realPolygon = lineCondition.polygon;
        const p1Index = realPolygon.findPointIndex(lineCondition.line.p1);
        const p2Index = realPolygon.findPointIndex(lineCondition.line.p2);
        const polygonClone = realPolygon.clone();
        const conditionFixer = new ConditionFixer_1.ConditionFixer(polygonClone, polygonClone.getVertex(p1Index), [
            lineCondition.duplicateForNewLine(new Line_1.Line(polygonClone.getVertex(p1Index), polygonClone.getVertex(p2Index)), polygonClone)
        ]);
        conditionFixer.tryFix();
        if (conditionFixer.fixSuccessful) {
            return realPolygon.moveTo(polygonClone);
        }
        conditionFixer.reset();
        conditionFixer.direction = ConditionFixer_1.FixingDirection.Reverse;
        polygonClone.moveTo(realPolygon);
        conditionFixer.tryFix();
        if (!conditionFixer.fixSuccessful) {
            alert('Cannot add a condition');
        }
    }
    onRemoveCondition(event) {
        const lineCondition = event.detail;
        lineCondition.polygon.removeLineCondition(lineCondition);
        this.dispatchUpdate();
    }
    dispatchUpdate() {
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
        this.conditionPicker.updateButtons();
    }
}
exports.UIConditionController = UIConditionController;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FixedLengthConditionElement_1 = __webpack_require__(44);
const HorizontalLineConditionElement_1 = __webpack_require__(48);
const VerticalLineConditionElement_1 = __webpack_require__(49);
__webpack_require__(50);
class ConditionPicker extends HTMLElement {
    constructor() {
        super();
        this.selectedTarget = {
            line: null,
            polygon: null
        };
        this.onMouseDown = this.onMouseDown.bind(this);
        this.hide = this.hide.bind(this);
        this.closeButton = document.createElement('button');
        this.closeButton.className = 'condition-picker__close-button';
        this.closeButton.textContent = 'X';
        this.conditionElementsContainer = document.createElement('div');
        this.conditionElementsContainer.className = 'condition-elements-container';
        this.lineConditionElements = this.createLineConditionElements();
        this.lineConditionElements.forEach(element => this.conditionElementsContainer.appendChild(element));
        this.updatePosition();
    }
    static get observedAttributes() {
        return ['data-x', 'data-y', 'data-visible'];
    }
    connectedCallback() {
        this.appendChild(this.closeButton);
        this.appendChild(this.conditionElementsContainer);
        this.closeButton.addEventListener('click', this.hide);
        window.addEventListener('mousedown', this.onMouseDown);
    }
    disconnectedCallback() {
        this.removeChild(this.closeButton);
        this.removeChild(this.conditionElementsContainer);
        this.closeButton.removeEventListener('click', this.hide);
        window.removeEventListener('mousedown', this.onMouseDown);
    }
    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'data-x':
            case 'data-y':
                this.updatePosition();
                break;
            case 'data-visible':
                if (newValue === 'true') {
                    this.style.display = 'flex';
                }
                else {
                    this.style.display = 'none';
                }
                break;
            default:
                break;
        }
    }
    updateSelectedLine(line, polygon) {
        this.selectedTarget.line = line;
        this.selectedTarget.polygon = polygon;
        this.updateButtons();
    }
    updateButtons() {
        this.lineConditionElements.forEach(element => element.updateButton());
    }
    updatePosition() {
        this.style.left = `${this.getAttribute('data-x') || 0}px`;
        this.style.top = `${this.getAttribute('data-y') || 0}px`;
    }
    onMouseDown(event) {
        if (event && event.srcElement && this.contains(event.srcElement)) {
            return;
        }
        this.hide();
    }
    hide() {
        this.setAttribute('data-visible', 'false');
    }
    createLineConditionElements() {
        const lineConditionElementDependencies = {
            selectedTarget: this.selectedTarget
        };
        return [
            new FixedLengthConditionElement_1.FixedLengthConditionElement(lineConditionElementDependencies),
            new VerticalLineConditionElement_1.VerticalLineConditionElement(lineConditionElementDependencies),
            new HorizontalLineConditionElement_1.HorizontalLineConditionElement(lineConditionElementDependencies)
        ];
    }
}
exports.ConditionPicker = ConditionPicker;
customElements.define('app-condition-picker', ConditionPicker);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FixedLengthLineCondition_1 = __webpack_require__(45);
const LineConditionElement_1 = __webpack_require__(12);
class FixedLengthConditionElement extends LineConditionElement_1.LineConditionElement {
    constructor(dependencies) {
        super(dependencies);
        this.button.textContent = 'Fixed length';
    }
    getLineConditionConstructor() {
        return FixedLengthLineCondition_1.FixedLengthLineCondition;
    }
    createNewCondition() {
        if (!this.selectedTarget.line || !this.selectedTarget.polygon) {
            throw new Error('Target not selected');
        }
        let length = Number.NaN;
        const originalLineLength = this.selectedTarget.line.getLength().toFixed(1);
        while (Number.isNaN(length) || length === 0) {
            const value = prompt('Provide the fixed length', originalLineLength);
            if (!value) {
                return null;
            }
            length = parseFloat(value);
        }
        return new FixedLengthLineCondition_1.FixedLengthLineCondition(this.selectedTarget.line, this.selectedTarget.polygon, length);
    }
}
exports.FixedLengthConditionElement = FixedLengthConditionElement;
customElements.define('fixed-length-condition', FixedLengthConditionElement);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LineCondition_1 = __webpack_require__(11);
const Point_1 = __webpack_require__(1);
const configuration_1 = __webpack_require__(0);
class FixedLengthLineCondition extends LineCondition_1.LineCondition {
    constructor(line, polygon, length) {
        super(line, polygon);
        this.fixedLength = length;
        this.fixedLengthSquared = Math.pow(length, 2);
    }
    isMet() {
        const lengthSquared = Point_1.Point.getDistanceBetweenSquared(this.line.p1, this.line.p2);
        return Math.abs(lengthSquared - this.fixedLengthSquared) < configuration_1.configuration.epsilon;
    }
    fix(lockedPoint) {
        const freePoint = this.line.p1 === lockedPoint ? this.line.p2 : this.line.p1;
        const lengthBeforeFix = Point_1.Point.getDistanceBetween(lockedPoint, freePoint);
        const ratio = this.fixedLength / lengthBeforeFix;
        const xDelta = freePoint.x - lockedPoint.x;
        const yDelta = freePoint.y - lockedPoint.y;
        freePoint.moveTo(lockedPoint.x + xDelta * ratio, lockedPoint.y + yDelta * ratio);
    }
    duplicateForNewLine(line, polygon) {
        return new FixedLengthLineCondition(line, polygon, this.fixedLength);
    }
    getLabel() {
        return this.fixedLength.toFixed(1);
    }
    verifyCanBeApplied() {
        return;
    }
}
exports.FixedLengthLineCondition = FixedLengthLineCondition;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./LineConditionElement.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./LineConditionElement.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".line-condition--active .line-condition__button {\n  box-shadow: 0 0 5px 2px #1b97df; }\n", ""]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HorizontalLineCondition_1 = __webpack_require__(18);
const LineConditionElement_1 = __webpack_require__(12);
class HorizontalLineConditionElement extends LineConditionElement_1.LineConditionElement {
    constructor(dependencies) {
        super(dependencies);
        this.button.textContent = 'Horizontal';
    }
    getLineConditionConstructor() {
        return HorizontalLineCondition_1.HorizontalLineCondition;
    }
    createNewCondition() {
        if (!this.selectedTarget.line || !this.selectedTarget.polygon) {
            throw new Error('Target not selected');
        }
        return new HorizontalLineCondition_1.HorizontalLineCondition(this.selectedTarget.line, this.selectedTarget.polygon);
    }
}
exports.HorizontalLineConditionElement = HorizontalLineConditionElement;
customElements.define('horizontal-line-condition', HorizontalLineConditionElement);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VerticalLineCondition_1 = __webpack_require__(19);
const LineConditionElement_1 = __webpack_require__(12);
class VerticalLineConditionElement extends LineConditionElement_1.LineConditionElement {
    constructor(dependencies) {
        super(dependencies);
        this.button.textContent = 'Vertical';
    }
    getLineConditionConstructor() {
        return VerticalLineCondition_1.VerticalLineCondition;
    }
    createNewCondition() {
        if (!this.selectedTarget.line || !this.selectedTarget.polygon) {
            throw new Error('Target not selected');
        }
        return new VerticalLineCondition_1.VerticalLineCondition(this.selectedTarget.line, this.selectedTarget.polygon);
    }
}
exports.VerticalLineConditionElement = VerticalLineConditionElement;
customElements.define('vertical-line-condition', VerticalLineConditionElement);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./ConditionPicker.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./ConditionPicker.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "app-condition-picker {\n  transform: translate(5px, -50%);\n  position: absolute;\n  padding: 0.6em;\n  border: solid 1px #222;\n  border-radius: 10px;\n  background-color: #e2e2e2;\n  box-shadow: 2px 2px 5px black;\n  z-index: 1;\n  display: flex;\n  flex-direction: column; }\n\n.condition-elements-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  .condition-elements-container * {\n    margin-bottom: 5px; }\n    .condition-elements-container *:last-child {\n      margin-bottom: 0; }\n\n.condition-picker__close-button {\n  margin: -2px -2px 3px 0;\n  align-self: flex-end;\n  font-size: 10px; }\n", ""]);

// exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(1);
class MousePositionTransformer {
    constructor(canvas) {
        this.canvas = canvas;
        this.updateCanvasOffset();
    }
    updateCanvasOffset() {
        this.canvasClientRect = this.canvas.getBoundingClientRect();
    }
    getPointFromMouseEvent(event) {
        return new Point_1.Point(event.pageX - this.canvasClientRect.left, event.pageY - this.canvasClientRect.top);
    }
}
exports.MousePositionTransformer = MousePositionTransformer;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = __webpack_require__(10);
const Path_1 = __webpack_require__(16);
const Polygon_1 = __webpack_require__(9);
const configuration_1 = __webpack_require__(0);
const LEX_1 = __webpack_require__(2);
const PointClickEvent_1 = __webpack_require__(14);
const RenderEvent_1 = __webpack_require__(4);
const SyncComponentsEvent_1 = __webpack_require__(5);
class NewPolygonUIController {
    constructor(dependencies) {
        this.pathLayer = new Layer_1.Layer(LEX_1.LEX.PATH_LAYER_NAME);
        this.applicationUIContainer = dependencies.applicationUIContainer;
        this.canvas = dependencies.canvas;
        this.stage = dependencies.stage;
        this.polygonLayer = dependencies.polygonLayer;
        this.mousePositionTransformer = dependencies.mousePositionTransformer;
        this.renderer = dependencies.renderer;
        this.eventAggregator = dependencies.eventAggregator;
        this.closePath = this.closePath.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onPointClick = this.onPointClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    init() {
        this.stage.layers.push(this.pathLayer);
        this.startNewUnfinishedPath();
        this.canvas.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('keydown', this.onKeyDown);
        this.eventAggregator.addEventListener(PointClickEvent_1.PointClickEvent.eventType, this.onPointClick);
    }
    destroy() {
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('keydown', this.onKeyDown);
        this.eventAggregator.removeEventListener(PointClickEvent_1.PointClickEvent.eventType, this.onPointClick);
        this.stage.removeLayer(this.pathLayer);
    }
    addNewPoint(point) {
        this.unfinishedPath.addVertex(point);
        this.dispatchUpdateUIEvents();
    }
    onMouseMove(event) {
        const unfinishedPathVerticesCount = this.unfinishedPath.getVerticesCount();
        if (unfinishedPathVerticesCount === 0) {
            return;
        }
        const lastPoint = this.unfinishedPath.getVertex(unfinishedPathVerticesCount - 1);
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        const point = this.mousePositionTransformer.getPointFromMouseEvent(event);
        this.renderer.drawLine(lastPoint, point, configuration_1.configuration.newLinePreviewProperties);
    }
    onPointClick(event) {
        const pathPointComponent = event.payload;
        if (pathPointComponent.path === this.unfinishedPath && pathPointComponent.initial) {
            event.handled = true;
            try {
                this.closePath();
                pathPointComponent.initial = false;
            }
            catch (error) {
                alert(error.message);
            }
        }
    }
    startNewUnfinishedPath() {
        this.unfinishedPath = new Path_1.Path([], configuration_1.configuration.newPolygonLineProperties);
        this.pathLayer.paths.push(this.unfinishedPath);
    }
    closePath() {
        if (this.unfinishedPath.getVerticesCount() < configuration_1.configuration.minPolygonPoints) {
            throw new Error(`Polygon must have at least ${configuration_1.configuration.minPolygonPoints} vertices`);
        }
        this.unfinishedPath.lineProperties = configuration_1.configuration.polygonLineProperties;
        const polygon = new Polygon_1.Polygon(this.unfinishedPath);
        this.polygonLayer.paths.push(polygon);
        this.pathLayer.removePath(this.unfinishedPath);
        this.startNewUnfinishedPath();
        this.dispatchUpdateUIEvents();
    }
    dispatchUpdateUIEvents() {
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 27:
                this.pathLayer.removePath(this.unfinishedPath);
                this.startNewUnfinishedPath();
                this.dispatchUpdateUIEvents();
                break;
            default:
                break;
        }
    }
}
exports.NewPolygonUIController = NewPolygonUIController;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COLORS_1 = __webpack_require__(8);
const Layer_1 = __webpack_require__(10);
const LineProperties_1 = __webpack_require__(17);
const Polygon_1 = __webpack_require__(9);
const configuration_1 = __webpack_require__(0);
const LEX_1 = __webpack_require__(2);
const ContinuousConditionFixer_1 = __webpack_require__(55);
const FinishPointDragEvent_1 = __webpack_require__(21);
const PointDragEvent_1 = __webpack_require__(22);
const StartPointDragEvent_1 = __webpack_require__(23);
const RenderEvent_1 = __webpack_require__(4);
const SyncComponentsEvent_1 = __webpack_require__(5);
class PointDraggingService {
    constructor(dependencies) {
        this.eventAggregator = dependencies.eventAggregator;
        this.stage = dependencies.stage;
        this.onStartPointDrag = this.onStartPointDrag.bind(this);
        this.onFinishPointDrag = this.onFinishPointDrag.bind(this);
        this.onPointDrag = this.onPointDrag.bind(this);
    }
    init() {
        this.pathGhostLayer = new Layer_1.Layer(LEX_1.LEX.PATH_GHOST_LAYER_NAME);
        this.stage.layers.splice(0, 0, this.pathGhostLayer);
        this.eventAggregator.addEventListener(StartPointDragEvent_1.StartPointDragEvent.eventType, this.onStartPointDrag);
        this.eventAggregator.addEventListener(FinishPointDragEvent_1.FinishPointDragEvent.eventType, this.onFinishPointDrag);
        this.eventAggregator.addEventListener(PointDragEvent_1.PointDragEvent.eventType, this.onPointDrag);
    }
    destroy() {
        this.pathGhostLayer.paths = [];
        this.stage.removeLayer(this.pathGhostLayer);
        this.eventAggregator.removeEventListener(StartPointDragEvent_1.StartPointDragEvent.eventType, this.onStartPointDrag);
        this.eventAggregator.removeEventListener(FinishPointDragEvent_1.FinishPointDragEvent.eventType, this.onFinishPointDrag);
        this.eventAggregator.removeEventListener(PointDragEvent_1.PointDragEvent.eventType, this.onPointDrag);
    }
    onStartPointDrag(event) {
        event.handled = true;
        if (event.payload.path instanceof Polygon_1.Polygon) {
            this.continuousConditionFixer = new ContinuousConditionFixer_1.ContinuousConditionFixer(event.payload.path, event.payload.point);
        }
        if (!configuration_1.configuration.displayPathGhostWhenDragging) {
            return;
        }
        const path = event.payload.path.clone();
        path.lineProperties = new LineProperties_1.LineProperties(COLORS_1.COLORS.GREEN, 1);
        this.pathGhostLayer.paths.push(path);
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
    }
    onFinishPointDrag(event) {
        event.handled = true;
        this.continuousConditionFixer = null;
        if (!configuration_1.configuration.displayPathGhostWhenDragging) {
            return;
        }
        this.pathGhostLayer.paths = [];
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
    }
    onPointDrag(event) {
        const { component, newPosition } = event.payload;
        component.point.moveTo(newPosition);
        if (this.continuousConditionFixer) {
            this.continuousConditionFixer.fix();
            this.continuousConditionFixer.propagateChangesToOriginalPolygon();
        }
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        event.handled = true;
    }
}
exports.PointDraggingService = PointDraggingService;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(1);
const ConditionFixer_1 = __webpack_require__(20);
/**
 * Use when there is a need to fix conditions often (for instance when dragging).
 *
 * @export
 * @class ContinuousConditionFixer
 */
class ContinuousConditionFixer {
    constructor(polygon, startingPoint) {
        // TODO: inject ContinuousFixer constructor
        this.polygon = polygon;
        this.startingPoint = startingPoint;
        const startingPointIndex = polygon.findPointIndex(this.startingPoint);
        this.clonedPolygon = polygon.clone();
        this.clonedStartingPoint = this.clonedPolygon.getVertex(startingPointIndex);
    }
    fix() {
        const lastValidPosition = this.clonedStartingPoint.clone();
        this.clonedPolygon.moveTo(this.polygon);
        this.clonedStartingPoint.moveTo(this.startingPoint);
        const conditionFixer = new ConditionFixer_1.ConditionFixer(this.clonedPolygon, this.clonedStartingPoint, []);
        conditionFixer.tryFix();
        if (conditionFixer.fixSuccessful) {
            return;
        }
        this.clonedStartingPoint.moveTo(this.startingPoint);
        this.clonedPolygon.moveTo(this.polygon);
        conditionFixer.reset();
        conditionFixer.direction = ConditionFixer_1.FixingDirection.Reverse;
        conditionFixer.tryFix();
        if (conditionFixer.fixSuccessful) {
            return;
        }
        const translationVector = Point_1.Point.subtract(this.startingPoint, lastValidPosition);
        this.clonedPolygon.moveTo(this.polygon);
        this.clonedPolygon.getVertices().forEach(clonedPoint => {
            clonedPoint.moveTo(Point_1.Point.add(clonedPoint, translationVector));
        });
        this.clonedStartingPoint.moveTo(this.startingPoint);
    }
    propagateChangesToOriginalPolygon() {
        this.polygon.moveTo(this.clonedPolygon);
    }
}
exports.ContinuousConditionFixer = ContinuousConditionFixer;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LineClickEvent_1 = __webpack_require__(13);
const RenderEvent_1 = __webpack_require__(4);
const SyncComponentsEvent_1 = __webpack_require__(5);
const configuration_1 = __webpack_require__(0);
class PointInserterService {
    constructor(dependencies) {
        this.previousLineClickTimestamp = 0;
        this.eventAggregator = dependencies.eventAggregator;
        this.onLineClick = this.onLineClick.bind(this);
    }
    init() {
        this.eventAggregator.addEventListener(LineClickEvent_1.LineClickEvent.eventType, this.onLineClick);
    }
    destroy() {
        this.eventAggregator.removeEventListener(LineClickEvent_1.LineClickEvent.eventType, this.onLineClick);
    }
    onLineClick(event) {
        const previousLineHit = this.previousLineHit;
        const previousLineClickTimestamp = this.previousLineClickTimestamp;
        const currentTimestamp = Date.now();
        this.previousLineHit = event.payload.line;
        this.previousLineClickTimestamp = currentTimestamp;
        if (!previousLineHit ||
            currentTimestamp - previousLineClickTimestamp > configuration_1.configuration.doubleClickMaxDelay) {
            return;
        }
        if (previousLineHit.equals(event.payload.line)) {
            const index = event.payload.path.findPointIndex(event.payload.line.p2);
            const newPoint = event.payload.line.getMiddlePoint();
            try {
                event.payload.path.insertVertex(newPoint, index);
            }
            catch (error) {
                return alert(error.message);
            }
            this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
            this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
        }
    }
}
exports.PointInserterService = PointInserterService;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = __webpack_require__(0);
const PointClickEvent_1 = __webpack_require__(14);
const RenderEvent_1 = __webpack_require__(4);
const SyncComponentsEvent_1 = __webpack_require__(5);
class PointRemoverService {
    constructor(dependencies) {
        this.previousClickTimestamp = 0;
        this.eventAggregator = dependencies.eventAggregator;
        this.onPointClick = this.onPointClick.bind(this);
    }
    init() {
        this.eventAggregator.addEventListener(PointClickEvent_1.PointClickEvent.eventType, this.onPointClick);
    }
    destroy() {
        this.eventAggregator.removeEventListener(PointClickEvent_1.PointClickEvent.eventType, this.onPointClick);
    }
    onPointClick(event) {
        const currentTimestamp = Date.now();
        const pathPointComponent = event.payload;
        const previousPathPointComponent = this.previousPathPointComponent;
        const previousClickTimestamp = this.previousClickTimestamp;
        this.updatePreviousClickInformation(event, currentTimestamp);
        if (!previousPathPointComponent || previousPathPointComponent !== pathPointComponent) {
            return;
        }
        if (currentTimestamp - previousClickTimestamp > configuration_1.configuration.doubleClickMaxDelay) {
            return;
        }
        this.removePreviousClickedPoint();
        event.handled = true;
    }
    updatePreviousClickInformation(event, timestamp) {
        this.previousPathPointComponent = event.payload;
        this.previousClickTimestamp = timestamp;
    }
    removePreviousClickedPoint() {
        const path = this.previousPathPointComponent.path;
        const point = this.previousPathPointComponent.point;
        try {
            path.removeVertex(point);
        }
        catch (error) {
            return alert('Cannot remove vertex');
        }
        this.previousPathPointComponent.remove();
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
    }
}
exports.PointRemoverService = PointRemoverService;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PathPointComponent_1 = __webpack_require__(59);
const SyncComponentsEvent_1 = __webpack_require__(5);
class PointSyncService {
    constructor(dependencies) {
        this.pathPointComponents = [];
        this.stage = dependencies.stage;
        this.container = dependencies.container;
        this.mousePositionTransformer = dependencies.mousePositionTransformer;
        this.eventAggregator = dependencies.eventAggregator;
        this.synchronizeComponents = this.synchronizeComponents.bind(this);
    }
    init() {
        this.eventAggregator.addEventListener(SyncComponentsEvent_1.SyncComponentsEvent.eventType, this.synchronizeComponents);
    }
    destroy() {
        this.eventAggregator.removeEventListener(SyncComponentsEvent_1.SyncComponentsEvent.eventType, this.synchronizeComponents);
    }
    synchronizeComponents(event) {
        const componentsToRemove = this.getRedundantComponents();
        componentsToRemove.forEach(component => component.remove());
        const pathPoints = this.getPathPoints();
        const pointsWithoutComponents = this.getPointsWithoutComponents(pathPoints);
        const newComponents = this.createPathPointComponents(pointsWithoutComponents);
        const componentsNotRemoved = this.pathPointComponents.filter(component => componentsToRemove.indexOf(component) === -1);
        this.pathPointComponents = [...newComponents, ...componentsNotRemoved];
        event.handled = true;
    }
    getPathPoints() {
        const pathPoints = [];
        this.stage.layers.forEach(layer => {
            layer.paths.forEach(path => {
                path.getVertices().forEach(point => {
                    pathPoints.push({
                        path,
                        point
                    });
                });
            });
        });
        return pathPoints;
    }
    createPathPointComponents(pathPoints) {
        return pathPoints.map(pathPoint => new PathPointComponent_1.PathPointComponent(pathPoint.path, pathPoint.point, {
            applicationUIContainer: this.container,
            eventAggregator: this.eventAggregator,
            mousePositionTransformer: this.mousePositionTransformer
        }));
    }
    getRedundantComponents() {
        const activePaths = this.getActivePaths();
        return this.pathPointComponents.filter(component => activePaths.indexOf(component.path) === -1 ||
            component.path.getVertices().indexOf(component.point) === -1);
    }
    getPointsWithoutComponents(pathPoints) {
        return pathPoints.filter(pathPoint => !this.pathPointComponents.find(component => component.path === pathPoint.path && component.point === pathPoint.point));
    }
    getActivePaths() {
        const paths = [];
        this.stage.layers.map(layer => paths.push(...layer.paths));
        return paths;
    }
}
exports.PointSyncService = PointSyncService;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FinishPointDragEvent_1 = __webpack_require__(21);
const PointDragEvent_1 = __webpack_require__(22);
const StartPointDragEvent_1 = __webpack_require__(23);
const PointClickEvent_1 = __webpack_require__(14);
__webpack_require__(60);
const COMPONENT_CLASS_NAME = 'application-ui__vertex';
const INITIAL_CLASS_NAME = 'application-ui__vertex--initial';
class PathPointComponent {
    constructor(path, point, dependencies) {
        this.path = path;
        this.point = point;
        this.applicationUIContainer = dependencies.applicationUIContainer;
        this.mousePositionTransformer = dependencies.mousePositionTransformer;
        this.eventAggregator = dependencies.eventAggregator;
        this.updatePosition = this.updatePosition.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.stopDragging = this.stopDragging.bind(this);
        this.init();
    }
    remove() {
        this.point.moveCallback = null;
        this.element.removeEventListener('mousedown', this.onMouseDown);
        this.element.remove();
    }
    updatePosition() {
        this.element.style.backgroundColor = this.path.lineProperties.color.fillStyle;
        this.element.style.top = `${this.point.y}px`;
        this.element.style.left = `${this.point.x}px`;
    }
    get initial() {
        return this.element.classList.contains(INITIAL_CLASS_NAME);
    }
    set initial(isInitial) {
        if (isInitial) {
            this.element.classList.add(INITIAL_CLASS_NAME);
        }
        else {
            this.element.classList.remove(INITIAL_CLASS_NAME);
        }
    }
    init() {
        this.element = document.createElement('div');
        this.applicationUIContainer.appendChild(this.element);
        this.element.classList.add(COMPONENT_CLASS_NAME);
        this.updatePosition();
        if (this.path.getVerticesCount() === 1 ||
            (!this.path.closed && this.path.findPointIndex(this.point) === 0)) {
            this.initial = true;
        }
        this.element.addEventListener('mousedown', this.onMouseDown);
        this.point.moveCallback = this.updatePosition;
    }
    onMouseDown() {
        const event = new PointClickEvent_1.PointClickEvent(this);
        this.eventAggregator.dispatchEvent(event);
        if (event.handled) {
            return;
        }
        this.eventAggregator.dispatchEvent(new StartPointDragEvent_1.StartPointDragEvent(this));
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.stopDragging);
    }
    onMouseMove(event) {
        const mousePosition = this.mousePositionTransformer.getPointFromMouseEvent(event);
        this.eventAggregator.dispatchEvent(new PointDragEvent_1.PointDragEvent(this, mousePosition));
    }
    stopDragging() {
        this.eventAggregator.dispatchEvent(new FinishPointDragEvent_1.FinishPointDragEvent(this));
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.stopDragging);
    }
}
exports.PathPointComponent = PathPointComponent;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./PathPointComponent.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./PathPointComponent.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".application-ui__vertex {\n  border: solid 1px black;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  transform: translate(-50%, -50%); }\n  .application-ui__vertex:active {\n    border-color: red;\n    border-width: 2px; }\n\n.application-ui__vertex--initial {\n  background-color: #0051ff; }\n", ""]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HorizontalLineCondition_1 = __webpack_require__(18);
const VerticalLineCondition_1 = __webpack_require__(19);
const Line_1 = __webpack_require__(3);
const forbiddenConditionCombinations = [
    [HorizontalLineCondition_1.HorizontalLineCondition, HorizontalLineCondition_1.HorizontalLineCondition],
    [VerticalLineCondition_1.VerticalLineCondition, VerticalLineCondition_1.VerticalLineCondition]
];
class ConditionMatcher {
    verifyConditionAllowed(condition) {
        const polygon = condition.polygon;
        const line = condition.line;
        const p1Index = polygon.findPointIndex(line.p1);
        const previousPoint = polygon.getVertex(this.getPreviousPointIndex(p1Index, polygon));
        const p2Index = polygon.findPointIndex(line.p2);
        const nextPoint = polygon.getVertex(this.getNextPointIndex(p2Index, polygon));
        const previousLine = new Line_1.Line(previousPoint, line.p1);
        const nextLine = new Line_1.Line(line.p2, nextPoint);
        const lineConditions = polygon.getLineConditions();
        const previousLineConditions = lineConditions.filter(lineCondition => lineCondition.line.equals(previousLine));
        const nextLineConditions = lineConditions.filter(lineCondition => lineCondition.line.equals(nextLine));
        this.verifyNotForbiddenCombination(previousLineConditions, condition);
        this.verifyNotForbiddenCombination(nextLineConditions, condition);
    }
    checkForbiddenCombination(constructor1, constructor2) {
        return forbiddenConditionCombinations.find(combination => (constructor1 === combination[0] && constructor2 === combination[1]) ||
            (constructor1 === combination[1] && constructor2 === combination[0]));
    }
    verifyNotForbiddenCombination(lineConditions, singleCondition) {
        for (const lineCondition of lineConditions) {
            const forbiddenCondition = this.checkForbiddenCombination(lineCondition.constructor, singleCondition.constructor);
            if (forbiddenCondition) {
                throw new Error(`Forbidden combination: ${forbiddenCondition[0].name}, ${forbiddenCondition[1].name}`);
            }
        }
    }
    getPreviousPointIndex(currentIndex, polygon) {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = polygon.getVerticesCount() - 1;
        }
        return currentIndex;
    }
    getNextPointIndex(currentIndex, polygon) {
        return (currentIndex + 1) % polygon.getVerticesCount();
    }
}
exports.ConditionMatcher = ConditionMatcher;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InstructionsDialog_1 = __webpack_require__(24);
class InstructionsButton extends HTMLElement {
    constructor() {
        super();
        this.button = document.createElement('button');
        this.button.textContent = 'Instructions';
        this.button.className = 'instructions-button';
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    connectedCallback() {
        this.appendChild(this.button);
        this.button.addEventListener('click', this.onButtonClick);
    }
    disconnectedCallback() {
        this.removeChild(this.button);
        this.button.removeEventListener('click', this.onButtonClick);
    }
    onButtonClick() {
        const instructionsDialog = new InstructionsDialog_1.InstructionsDialog();
        this.appendChild(instructionsDialog);
    }
}
exports.InstructionsButton = InstructionsButton;
window.customElements.define('app-instructions-button', InstructionsButton);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./InstructionsDialog.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./InstructionsDialog.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".instructions-dialog-wrapper {\n  z-index: 2; }\n\n.instructions-dialog__overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000;\n  opacity: 0;\n  transition: opacity 250ms ease-in-out; }\n\n.instructions-dialog__overlay--active {\n  opacity: 0.5; }\n\n.instructions-dialog {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: 2;\n  transform: translate(-50%, -50%) scale(0, 0);\n  background-color: #1f350f;\n  border: solid 1px black;\n  color: #eee;\n  padding: 2em;\n  border-radius: 10px;\n  box-shadow: 2px 2px 5px black;\n  transition: transform 250ms ease-in-out; }\n\n.instructions-dialog--active {\n  transform: translate(-50%, -50%) scale(1, 1); }\n\n.instructions-dialog__title {\n  margin: 0; }\n", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGRmZTEyMTEyMmMyOTI2MDdhYWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9Qb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTEVYLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vTGluZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL1JlbmRlckV2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vQ09MT1JTLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0xheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0xpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvTGluZUNsaWNrRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy9Qb2ludENsaWNrRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9PY3RhbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9QYXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vTGluZVByb3BlcnRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0NvbmRpdGlvbkZpeGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy9wb2ludC1kcmFnL1N0YXJ0UG9pbnREcmFnRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3M/NDQ0NiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcy93ZWJjb21wb25lbnRzLWhpLXNkLWNlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvRXZlbnRBZ2dyZWdhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvRXZlbnRRdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGluZS1yYXN0ZXJpemVyL0xpbmVSYXN0ZXJpemVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saW5lLXJhc3Rlcml6ZXIvb2N0YW50LXZlY3Rvci10cmFuc2Zvcm1hdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vQ29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9IaXRUZXN0UmVzdWx0LnRzIiwid2VicGFjazovLy8uL3NyYy9TdGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvVUlDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb25kaXRpb25zL1VJQ29uZGl0aW9uQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0ZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy9GaXhlZExlbmd0aExpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3M/ZDM2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlci5zY3NzP2U0MzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvTmV3UG9seWdvblVJQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnREcmFnZ2luZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvQ29udGludW91c0NvbmRpdGlvbkZpeGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9Qb2ludEluc2VydGVyU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnRSZW1vdmVyU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnRTeW5jU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnNjc3M/NzI5YiIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy9Db25kaXRpb25NYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNCdXR0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzPzRlMmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNB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NkRBQTZEO0FBQzdELE1BQU0sMkJBQTJCLEdBQUc7SUFDbEMsQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxlQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxlQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDLGVBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFLLENB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RUFBRSxrQ0FBa0MsaURBQWlELEVBQUUsaUNBQWlDLGNBQWMsRUFBRTs7QUFFL3lCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4ZGZlMTIxMTIyYzI5MjYwN2FhYyIsImltcG9ydCB7IENPTE9SUyB9IGZyb20gJ2NvbW1vbi9DT0xPUlMnO1xyXG5pbXBvcnQgeyBMaW5lUHJvcGVydGllcyB9IGZyb20gJ2NvbW1vbi9MaW5lUHJvcGVydGllcyc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbmNvbnN0IGNvbmZpZ3VyYXRpb24gPSB7XHJcbiAgbmV3TGluZVByZXZpZXdQcm9wZXJ0aWVzOiBuZXcgTGluZVByb3BlcnRpZXMoQ09MT1JTLkJMVUUsIDIpLFxyXG4gIG5ld1BvbHlnb25MaW5lUHJvcGVydGllczogbmV3IExpbmVQcm9wZXJ0aWVzKENPTE9SUy5SRUQsIDEpLFxyXG4gIHBvbHlnb25MaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXMuZ2V0RGVmYXVsdCgpLFxyXG4gIGFwcGxpY2F0aW9uVUlDb250YWluZXJJRDogJ2FwcGxpY2F0aW9uLXVpJyxcclxuICBoaXRUb2xlcmFuY2U6IDEwLFxyXG4gIG1pblBvbHlnb25Qb2ludHM6IDMsXHJcbiAgZG91YmxlQ2xpY2tNYXhEZWxheTogNTAwLFxyXG4gIGRpc3BsYXlQYXRoR2hvc3RXaGVuRHJhZ2dpbmc6IGZhbHNlLFxyXG4gIGVwc2lsb246IDEwZS00LFxyXG4gIGxpbmVEZXZpYXRpb25BbGxvd2FuY2VJbkRlZ3JlZXM6IDIwLFxyXG4gIGNhbnZhc0ZvbnQ6ICczMHB0IHNlcmlmJyxcclxuICBsaW5lQ29uZGl0aW9uTGFiZWxPZmZzZXQ6IG5ldyBQb2ludCg1LCAwKVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBjb25maWd1cmF0aW9uXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbmZpZ3VyYXRpb24udHMiLCJpbXBvcnQgeyBPY3RhbnQgfSBmcm9tICdjb21tb24vT2N0YW50JztcclxuXHJcbnR5cGUgTW92ZUNhbGxiYWNrID0gKCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludCB7XHJcbiAgcHVibGljIG1vdmVDYWxsYmFjazogTW92ZUNhbGxiYWNrIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgX3g6IG51bWJlcjtcclxuICBwcml2YXRlIF95OiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBnZXQgeCgpIHtcclxuICAgIHJldHVybiB0aGlzLl94O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5feCA9IHg7XHJcbiAgICB0aGlzLl95ID0geTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KTogUG9pbnQge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludChwMS54ICsgcDIueCwgcDEueSArIHAyLnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBzdWJ0cmFjdChwMTogUG9pbnQsIHAyOiBQb2ludCk6IFBvaW50IHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQocDEueCAtIHAyLngsIHAxLnkgLSBwMi55KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGlzdGFuY2VCZXR3ZWVuKHAxOiBQb2ludCwgcDI6IFBvaW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZChwMSwgcDIpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZChwMTogUG9pbnQsIHAyOiBQb2ludCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5wb3cocDEueCAtIHAyLngsIDIpICsgTWF0aC5wb3cocDEueSAtIHAyLnksIDIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRBbmdsZShwMTogUG9pbnQsIHAyOiBQb2ludCk6IG51bWJlciB7XHJcbiAgICBsZXQgYW5nbGUgPSAoTWF0aC5hdGFuMihwMi55IC0gcDEueSwgcDIueCAtIHAxLngpKSAqIDE4MCAvIE1hdGguUEk7XHJcblxyXG4gICAgaWYgKGFuZ2xlIDwgMCkge1xyXG4gICAgICBhbmdsZSArPSAzNjA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFuZ2xlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVUbyhwb2ludDogUG9pbnQpOiB2b2lkO1xyXG4gIHB1YmxpYyBtb3ZlVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkO1xyXG4gIHB1YmxpYyBtb3ZlVG8ocG9pbnRPclg6IFBvaW50IHwgbnVtYmVyLCB5PzogbnVtYmVyKSB7XHJcbiAgICBpZiAodHlwZW9mIHBvaW50T3JYID09PSAnbnVtYmVyJykge1xyXG4gICAgICBpZiAoIXkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ggaXMgZGVmaW5lZCwgYnV0IHkgaXMgbm90IGRlZmluZWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMubW92ZVRvQ29vcmRpbmF0ZXMocG9pbnRPclgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLm1vdmVUb1BvaW50KHBvaW50T3JYKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPY3RhbnQoKTogT2N0YW50IHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG4gICAgbGV0IG9jdGFudCA9IE9jdGFudC5GaXJzdDtcclxuXHJcbiAgICBpZiAoeSA+PSAwKSB7XHJcbiAgICAgIGlmICh4ID49IDApIHtcclxuICAgICAgICAvLyBGaXJzdCBxdWFydGVyXHJcbiAgICAgICAgaWYgKHkgPD0geCkge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LkZpcnN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuU2Vjb25kO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBTZWNvbmQgcXVhcnRlclxyXG4gICAgICAgIGlmICh5ID49IC14KSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuVGhpcmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5Gb3VydGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeCA8PSAwKSB7XHJcbiAgICAgICAgLy8gVGhpcmQgcXVhcnRlclxyXG4gICAgICAgIGlmICh5ID49IHgpIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5GaWZ0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LlNpeHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBGb3VydGggcXVhcnRlclxyXG4gICAgICAgIGlmICh5IDwgLXgpIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5TZXZlbnRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuRWlnaHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvY3RhbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXF1YWxzKHBvaW50OiBQb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMueCA9PT0gcG9pbnQueCAmJiB0aGlzLnkgPT09IHBvaW50Lnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGlzdGFuY2VUbyhwb2ludDogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIFBvaW50LmdldERpc3RhbmNlQmV0d2Vlbih0aGlzLCBwb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGlzdGFuY2VTcXVhcmVkVG8ocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBQb2ludC5nZXREaXN0YW5jZUJldHdlZW5TcXVhcmVkKHRoaXMsIHBvaW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9uZSgpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtb3ZlVG9Qb2ludChwb2ludDogUG9pbnQpIHtcclxuICAgIHJldHVybiB0aGlzLm1vdmVUb0Nvb3JkaW5hdGVzKHBvaW50LngsIHBvaW50LnkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtb3ZlVG9Db29yZGluYXRlcyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5feCA9IHg7XHJcbiAgICB0aGlzLl95ID0geTtcclxuXHJcbiAgICBpZiAodGhpcy5tb3ZlQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5tb3ZlQ2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL1BvaW50LnRzIiwiLy8gRGljdGlvbmFyeVxyXG5jb25zdCBMRVggPSB7XHJcbiAgUE9MWUdPTl9MQVlFUl9OQU1FOiAnUG9seWdvbkxheWVyJyxcclxuICBQQVRIX0xBWUVSX05BTUU6ICdQYXRoTGF5ZXInLFxyXG4gIFBBVEhfR0hPU1RfTEFZRVJfTkFNRTogJ1BhdGhHaG9zdExheWVyJyxcclxuICBORVdfQ09ORElUSU9OX0VWRU5UX05BTUU6ICduZXctY29uZGl0aW9uJyxcclxuICBSRU1PVkVfQ09ORElUSU9OX0VWRU5UX05BTUU6ICdyZW1vdmUtY29uZGl0aW9uJyxcclxuICBLRVlfQ09ERToge1xyXG4gICAgRVNDQVBFOiAyN1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgTEVYXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL0xFWC50cyIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lIHtcclxuICBwdWJsaWMgcDE6IFBvaW50O1xyXG4gIHB1YmxpYyBwMjogUG9pbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XHJcbiAgICBpZiAocDEuZXF1YWxzKHAyKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgbGluZSBiZXR3ZWVuIHBvaW50cyBhdCB0aGUgc2FtZSBjb29yZGluYXRlcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucDEgPSBwMTtcclxuICAgIHRoaXMucDIgPSBwMjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXN0YW5jZVRvUG9pbnQocDogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgY29uc3QgcDEgPSB0aGlzLnAxO1xyXG4gICAgY29uc3QgcDIgPSB0aGlzLnAyO1xyXG5cclxuICAgIGxldCB0ID1cclxuICAgICAgKChwLnggLSBwMS54KSAqIChwMi54IC0gcDEueCkgKyAocC55IC0gcDEueSkgKiAocDIueSAtIHAxLnkpKSAvXHJcbiAgICAgIFBvaW50LmdldERpc3RhbmNlQmV0d2VlblNxdWFyZWQocDEsIHAyKTtcclxuICAgIHQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0KSk7XHJcblxyXG4gICAgcmV0dXJuIHAuZ2V0RGlzdGFuY2VUbyhuZXcgUG9pbnQocDEueCArIHQgKiAocDIueCAtIHAxLngpLCBwMS55ICsgdCAqIChwMi55IC0gcDEueSkpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlcXVhbHMobGluZTogTGluZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgKHRoaXMucDEuZXF1YWxzKGxpbmUucDEpICYmIHRoaXMucDIuZXF1YWxzKGxpbmUucDIpKSB8fFxyXG4gICAgICAodGhpcy5wMS5lcXVhbHMobGluZS5wMikgJiYgdGhpcy5wMi5lcXVhbHMobGluZS5wMSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1pZGRsZVBvaW50KCk6IFBvaW50IHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQoKHRoaXMucDEueCArIHRoaXMucDIueCkgLyAyLCAodGhpcy5wMS55ICsgdGhpcy5wMi55KSAvIDIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExlbmd0aCgpIHtcclxuICAgIHJldHVybiBQb2ludC5nZXREaXN0YW5jZUJldHdlZW4odGhpcy5wMSwgdGhpcy5wMik7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9MaW5lLnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlckV2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkID0gbnVsbDtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gUmVuZGVyRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnUmVuZGVyRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvUmVuZGVyRXZlbnQudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3luY0NvbXBvbmVudHNFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZCA9IG51bGw7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IFN5bmNDb21wb25lbnRzRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnU3luY0NvbXBvbmVudHNFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50LnRzIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29tbW9uL0NvbG9yJztcclxuXHJcbmV4cG9ydCBjb25zdCBDT0xPUlMgPSB7XHJcbiAgQkxBQ0s6IG5ldyBDb2xvcigwLCAwLCAwKSxcclxuICBSRUQ6IG5ldyBDb2xvcigyNTUsIDAsIDApLFxyXG4gIEJMVUU6IG5ldyBDb2xvcigwLCAyNTUsIDApLFxyXG4gIEdSRUVOOiBuZXcgQ29sb3IoMCwgMCwgMjU1KVxyXG59O1xyXG5cclxuT2JqZWN0LmZyZWV6ZShDT0xPUlMpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vQ09MT1JTLnRzIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgTGluZVByb3BlcnRpZXMgfSBmcm9tICdjb21tb24vTGluZVByb3BlcnRpZXMnO1xyXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnY29tbW9uL1BhdGgnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuXHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvbHlnb24gZXh0ZW5kcyBQYXRoIHtcclxuICBwcml2YXRlIGxpbmVDb25kaXRpb25zOiBMaW5lQ29uZGl0aW9uW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGg6IFBhdGgpO1xyXG4gIGNvbnN0cnVjdG9yKHZlcnRpY2VzOiBQb2ludFtdLCBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXMpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXRoT3JWZXJ0aWNlczogUGF0aCB8IFBvaW50W10sIGxpbmVQcm9wZXJ0aWVzPzogTGluZVByb3BlcnRpZXMpIHtcclxuICAgIGxldCB2ZXJ0aWNlczogUG9pbnRbXTtcclxuXHJcbiAgICBpZiAocGF0aE9yVmVydGljZXMgaW5zdGFuY2VvZiBQYXRoKSB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBwYXRoT3JWZXJ0aWNlcztcclxuICAgICAgdmVydGljZXMgPSBwYXRoLmdldFZlcnRpY2VzKCk7XHJcbiAgICAgIGxpbmVQcm9wZXJ0aWVzID0gcGF0aC5saW5lUHJvcGVydGllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZlcnRpY2VzID0gcGF0aE9yVmVydGljZXM7XHJcbiAgICAgIGxpbmVQcm9wZXJ0aWVzID0gPExpbmVQcm9wZXJ0aWVzPmxpbmVQcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG5cclxuICAgIFBvbHlnb24uZW5zdXJlVmVydGljZXNMZW5ndGgodmVydGljZXMpO1xyXG4gICAgc3VwZXIodmVydGljZXMsIGxpbmVQcm9wZXJ0aWVzKTtcclxuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgIHRoaXMubGluZUNvbmRpdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGVuc3VyZVZlcnRpY2VzTGVuZ3RoKHZlcnRpY2VzOiBQb2ludFtdKSB7XHJcbiAgICBpZiAodmVydGljZXMubGVuZ3RoID49IGNvbmZpZ3VyYXRpb24ubWluUG9seWdvblBvaW50cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBQb2x5Z29uIG11c3QgaGF2ZSBhdCBsZWFzdCAke2NvbmZpZ3VyYXRpb24ubWluUG9seWdvblBvaW50c30gdmVydGljZXNgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9uZSgpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbihzdXBlci5jbG9uZSgpKTtcclxuXHJcbiAgICB0aGlzLmxpbmVDb25kaXRpb25zLmZvckVhY2gobGluZUNvbmRpdGlvbiA9PiB7XHJcbiAgICAgIGNvbnN0IHAxSW5kZXggPSB0aGlzLmZpbmRQb2ludEluZGV4KGxpbmVDb25kaXRpb24ubGluZS5wMSk7XHJcbiAgICAgIGNvbnN0IHAySW5kZXggPSB0aGlzLmZpbmRQb2ludEluZGV4KGxpbmVDb25kaXRpb24ubGluZS5wMik7XHJcblxyXG4gICAgICBjb25zdCBuZXdMaW5lQ29uZGl0aW9uID0gbGluZUNvbmRpdGlvbi5kdXBsaWNhdGVGb3JOZXdMaW5lKFxyXG4gICAgICAgIG5ldyBMaW5lKHBvbHlnb24udmVydGljZXNbcDFJbmRleF0sIHBvbHlnb24udmVydGljZXNbcDJJbmRleF0pLFxyXG4gICAgICAgIHBvbHlnb25cclxuICAgICAgKTtcclxuICAgICAgcG9seWdvbi5saW5lQ29uZGl0aW9ucy5wdXNoKG5ld0xpbmVDb25kaXRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBvbHlnb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5zZXJ0VmVydGV4KHBvaW50OiBQb2ludCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgY29uc3QgcHJldmlvdXNQb2ludEluZGV4ID0gdGhpcy5nZXRQcmV2aW91c1BvaW50SW5kZXgoaW5kZXgpO1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzTGluZSA9IG5ldyBMaW5lKHRoaXMuZ2V0VmVydGV4KHByZXZpb3VzUG9pbnRJbmRleCksIHRoaXMuZ2V0VmVydGV4KGluZGV4KSk7XHJcbiAgICBjb25zdCBtYXRjaGluZ0NvbmRpdGlvbnMgPSB0aGlzLmxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+XHJcbiAgICAgIGxpbmVDb25kaXRpb24ubGluZS5lcXVhbHMocHJldmlvdXNMaW5lKVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAobWF0Y2hpbmdDb25kaXRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIGBDYW5ub3QgaW5zZXJ0IGEgcG9pbnQgYmVjYXVzZSBvZiBhbiBleGlzdGluZyBjb25kaXRpb24gKCR7bWF0Y2hpbmdDb25kaXRpb25zWzBdLmNvbnN0cnVjdG9yXHJcbiAgICAgICAgICAubmFtZX0pYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cGVyLmluc2VydFZlcnRleChwb2ludCwgaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE5leHRQb2ludEluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiAoaW5kZXggKyAxKSAlIHRoaXMuZ2V0VmVydGljZXNDb3VudCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE5leHRQb2ludChwb2ludDogUG9pbnQpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52ZXJ0aWNlcy5pbmRleE9mKHBvaW50KTtcclxuICAgIGNvbnN0IG5leHRQb2ludEluZGV4ID0gdGhpcy5nZXROZXh0UG9pbnRJbmRleChpbmRleCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VmVydGV4KG5leHRQb2ludEluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcmV2aW91c1BvaW50SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IHByZXZpb3VzUG9pbnRJbmRleCA9IGluZGV4IC0gMTtcclxuICAgIGlmIChwcmV2aW91c1BvaW50SW5kZXggPCAwKSB7XHJcbiAgICAgIHByZXZpb3VzUG9pbnRJbmRleCA9IHRoaXMuZ2V0VmVydGljZXNDb3VudCgpIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNQb2ludEluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByZXZpb3VzUG9pbnQocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmVydGljZXMuaW5kZXhPZihwb2ludCk7XHJcbiAgICBjb25zdCBwcmV2aW91c1BvaW50SW5kZXggPSB0aGlzLmdldFByZXZpb3VzUG9pbnRJbmRleChpbmRleCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VmVydGV4KHByZXZpb3VzUG9pbnRJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlVmVydGV4KHBvaW50OiBQb2ludCkge1xyXG4gICAgaWYgKHRoaXMuZ2V0VmVydGljZXNDb3VudCgpID09PSBjb25maWd1cmF0aW9uLm1pblBvbHlnb25Qb2ludHMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZGVsZXRlIHZlcnRleCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cGVyLnJlbW92ZVZlcnRleChwb2ludCk7XHJcblxyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbnNUb1JlbW92ZSA9IHRoaXMubGluZUNvbmRpdGlvbnMuZmlsdGVyKFxyXG4gICAgICBsaW5lQ29uZGl0aW9uID0+IGxpbmVDb25kaXRpb24ubGluZS5wMSA9PT0gcG9pbnQgfHwgbGluZUNvbmRpdGlvbi5saW5lLnAyID09PSBwb2ludFxyXG4gICAgKTtcclxuICAgIGxpbmVDb25kaXRpb25zVG9SZW1vdmUuZm9yRWFjaChsaW5lQ29uZGl0aW9uID0+IHRoaXMucmVtb3ZlTGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkTGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uKSB7XHJcbiAgICBpZiAobGluZUNvbmRpdGlvbi5wb2x5Z29uICE9PSB0aGlzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBjb25kaXRpb24gYm91bmQgdG8gd3JvbmcgcG9seWdvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHAxSW5kZXggPSB0aGlzLmZpbmRQb2ludEluZGV4KGxpbmVDb25kaXRpb24ubGluZS5wMSk7XHJcbiAgICBjb25zdCBwMkluZGV4ID0gdGhpcy5maW5kUG9pbnRJbmRleChsaW5lQ29uZGl0aW9uLmxpbmUucDIpO1xyXG4gICAgaWYgKHAxSW5kZXggPT09IC0xIHx8IHAySW5kZXggPT09IC0yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBjb25kaXRpb24gYm91bmQgdG8gd3JvbmcgbGluZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbGluZUNvbmRpdGlvbi5pc01ldCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBjb25kaXRpb24gaXMgbm90IG1ldCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGluZUNvbmRpdGlvbnMucHVzaChsaW5lQ29uZGl0aW9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb246IExpbmVDb25kaXRpb24pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saW5lQ29uZGl0aW9ucy5pbmRleE9mKGxpbmVDb25kaXRpb24pO1xyXG5cclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIGNvbmRpdGlvbiBub3QgZm91bmQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpbmVDb25kaXRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGluZUNvbmRpdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gWy4uLnRoaXMubGluZUNvbmRpdGlvbnNdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVUbyhwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICBpZiAodGhpcy5nZXRWZXJ0aWNlc0NvdW50KCkgIT09IHBvbHlnb24uZ2V0VmVydGljZXNDb3VudCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIG51bWJlciBvZiB2ZXJ0aWNlcyBkb2VzIG5vdCBtYXRjaCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmVydGljZXMuZm9yRWFjaCgocG9pbnQsIGluZGV4KSA9PiBwb2ludC5tb3ZlVG8ocG9seWdvbi5nZXRWZXJ0ZXgoaW5kZXgpKSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9Qb2x5Z29uLnRzIiwiaW1wb3J0IHsgSGl0VGVzdFJlc3VsdCB9IGZyb20gJ2NvbW1vbi9IaXRUZXN0UmVzdWx0JztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJ1JlbmRlcmVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXllciB7XHJcbiAgcHVibGljIHBhdGhzOiBQYXRoW10gPSBbXTtcclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVuZGVyKHJlbmRlcmVyOiBSZW5kZXJlcikge1xyXG4gICAgdGhpcy5wYXRocy5mb3JFYWNoKHBhdGggPT4gcmVuZGVyZXIuZHJhd1BhdGgocGF0aCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVBhdGgocGF0aDogUGF0aCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhdGhzLmluZGV4T2YocGF0aCk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBhdGhzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChwb2ludDogUG9pbnQpOiBIaXRUZXN0UmVzdWx0IHwgbnVsbCB7XHJcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgdGhpcy5wYXRocykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBwYXRoLmhpdFRlc3QocG9pbnQpO1xyXG4gICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXN1bHQubGF5ZXIgPSB0aGlzO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0xheWVyLnRzIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVDb25kaXRpb24ge1xyXG4gIHB1YmxpYyByZWFkb25seSBsaW5lOiBMaW5lO1xyXG4gIHB1YmxpYyByZWFkb25seSBwb2x5Z29uOiBQb2x5Z29uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xyXG4gICAgdGhpcy5wb2x5Z29uID0gcG9seWdvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc01ldCgpOiBib29sZWFuIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTGluZUNvbmRpdGlvbi5pc01ldCBub3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaXgoX2xvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lQ29uZGl0aW9uLmZpeCBub3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkdXBsaWNhdGVGb3JOZXdMaW5lKF9saW5lOiBMaW5lLCBfcG9seWdvbjogUG9seWdvbik6IExpbmVDb25kaXRpb24ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2ZXJpZnlDYW5CZUFwcGxpZWQoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExhYmVsKCk6IHN0cmluZyB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0xpbmVDb25kaXRpb24udHMiLCJpbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHtcclxuICBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyxcclxuICBTZWxlY3RlZFRhcmdldFxyXG59IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzJztcclxuXHJcbmltcG9ydCAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzcyc7XHJcblxyXG5jb25zdCBMSU5FX0NPTkRJVElPTl9BQ1RJVkVfQ0xBU1MgPSAnbGluZS1jb25kaXRpb24tLWFjdGl2ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUNvbmRpdGlvbkVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNlbGVjdGVkVGFyZ2V0OiBTZWxlY3RlZFRhcmdldDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcykge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYXJnZXQgPSBkZXBlbmRlbmNpZXMuc2VsZWN0ZWRUYXJnZXQ7XHJcblxyXG4gICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuYnV0dG9uLmNsYXNzTmFtZSA9ICdsaW5lLWNvbmRpdGlvbl9fYnV0dG9uJztcclxuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkJ1dHRvbkNsaWNrLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuYnV0dG9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVCdXR0b24oKSB7XHJcbiAgICBjb25zdCB0YXJnZXRDb25kaXRpb25zID0gdGhpcy5nZXRUYXJnZXRDb25kaXRpb25zKCk7XHJcbiAgICBjb25zdCBvdGhlckNvbmRpdGlvbnMgPSB0aGlzLmdldE90aGVyVGFyZ2V0Q29uZGl0aW9ucyh0YXJnZXRDb25kaXRpb25zKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbi5kaXNhYmxlZCA9IG90aGVyQ29uZGl0aW9ucy5sZW5ndGggPiAwO1xyXG5cclxuICAgIGlmICh0YXJnZXRDb25kaXRpb25zLmxlbmd0aCAtIG90aGVyQ29uZGl0aW9ucy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKExJTkVfQ09ORElUSU9OX0FDVElWRV9DTEFTUyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoTElORV9DT05ESVRJT05fQUNUSVZFX0NMQVNTKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVOZXdDb25kaXRpb24oKTogTGluZUNvbmRpdGlvbiB8IG51bGwge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRMaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IoKTogRnVuY3Rpb24ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25CdXR0b25DbGljayhldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0Q29uZGl0aW9ucyA9IHRoaXMuZ2V0VGFyZ2V0Q29uZGl0aW9ucygpO1xyXG4gICAgY29uc3Qgb3RoZXJDb25kaXRpb25zID0gdGhpcy5nZXRPdGhlclRhcmdldENvbmRpdGlvbnModGFyZ2V0Q29uZGl0aW9ucyk7XHJcblxyXG4gICAgaWYgKHRhcmdldENvbmRpdGlvbnMubGVuZ3RoIC0gb3RoZXJDb25kaXRpb25zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBjb25zdCBjb25kaXRpb24gPSB0YXJnZXRDb25kaXRpb25zWzBdO1xyXG5cclxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChMRVguUkVNT1ZFX0NPTkRJVElPTl9FVkVOVF9OQU1FLCB7IGJ1YmJsZXM6IHRydWUsIGRldGFpbDogY29uZGl0aW9uIH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjb25kaXRpb24gPSB0aGlzLmNyZWF0ZU5ld0NvbmRpdGlvbigpO1xyXG4gICAgICBpZiAoIWNvbmRpdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChMRVguTkVXX0NPTkRJVElPTl9FVkVOVF9OQU1FLCB7IGJ1YmJsZXM6IHRydWUsIGRldGFpbDogY29uZGl0aW9uIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFRhcmdldENvbmRpdGlvbnMoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSB8fCAhdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG5vdCBzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvbHlnb24gPSB0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb247XHJcbiAgICBjb25zdCBsaW5lID0gdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lO1xyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbnMgPSBwb2x5Z29uLmdldExpbmVDb25kaXRpb25zKCk7XHJcblxyXG4gICAgcmV0dXJuIGxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+IGxpbmVDb25kaXRpb24ubGluZS5lcXVhbHMobGluZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdGhlclRhcmdldENvbmRpdGlvbnModGFyZ2V0Q29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdKSB7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IgPSB0aGlzLmdldExpbmVDb25kaXRpb25Db25zdHJ1Y3RvcigpO1xyXG5cclxuICAgIHJldHVybiB0YXJnZXRDb25kaXRpb25zLmZpbHRlcihcclxuICAgICAgbGluZUNvbmRpdGlvbiA9PiAhKGxpbmVDb25kaXRpb24gaW5zdGFuY2VvZiBsaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudC50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbmludGVyZmFjZSBMaW5lQ2xpY2tFdmVudFBheWxvYWQge1xyXG4gIGxpbmU6IExpbmU7XHJcbiAgcGF0aDogUGF0aDtcclxuICBwb3NpdGlvbjogUG9pbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lQ2xpY2tFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiBMaW5lQ2xpY2tFdmVudFBheWxvYWQ7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IobGluZTogTGluZSwgcGF0aDogUGF0aCwgcG9zaXRpb246IFBvaW50KSB7XHJcbiAgICB0aGlzLnBheWxvYWQgPSB7XHJcbiAgICAgIGxpbmUsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIHBvc2l0aW9uXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdMaW5lQ2xpY2tFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9MaW5lQ2xpY2tFdmVudC50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50Q2xpY2tFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gUG9pbnRDbGlja0V2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZDogUGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGhQb2ludENvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50KSB7XHJcbiAgICB0aGlzLnBheWxvYWQgPSBwYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ1BvaW50Q2xpY2tFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9Qb2ludENsaWNrRXZlbnQudHMiLCJleHBvcnQgZW51bSBPY3RhbnQge1xyXG4gIEZpcnN0LFxyXG4gIFNlY29uZCxcclxuICBUaGlyZCxcclxuICBGb3VydGgsXHJcbiAgRmlmdGgsXHJcbiAgU2l4dGgsXHJcbiAgU2V2ZW50aCxcclxuICBFaWdodGhcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vT2N0YW50LnRzIiwiaW1wb3J0IHsgSGl0VGVzdFJlc3VsdCB9IGZyb20gJ2NvbW1vbi9IaXRUZXN0UmVzdWx0JztcclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgTGluZVByb3BlcnRpZXMgfSBmcm9tICdjb21tb24vTGluZVByb3BlcnRpZXMnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXRoIHtcclxuICBwdWJsaWMgY2xvc2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcztcclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdmVydGljZXM6IFBvaW50W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHZlcnRpY2VzOiBQb2ludFtdLCBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXMpIHtcclxuICAgIHRoaXMudmVydGljZXMgPSB2ZXJ0aWNlcztcclxuICAgIHRoaXMubGluZVByb3BlcnRpZXMgPSBsaW5lUHJvcGVydGllcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyAqZ2V0VmVydGljZXNJdGVyYXRvcigpIHtcclxuICAgIGNvbnN0IHZlcnRpY2VzQ291bnQgPSB0aGlzLnZlcnRpY2VzLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGljZXNDb3VudDsgaSArPSAxKSB7XHJcbiAgICAgIHlpZWxkIHRoaXMudmVydGljZXNbaV07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY2xvc2VkICYmIHZlcnRpY2VzQ291bnQgPiAwKSB7XHJcbiAgICAgIHlpZWxkIHRoaXMudmVydGljZXNbMF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgKmdldExpbmVJdGVyYXRvcigpIHtcclxuICAgIGxldCBwcmV2aW91c1BvaW50O1xyXG5cclxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgdGhpcy5nZXRWZXJ0aWNlc0l0ZXJhdG9yKCkpIHtcclxuICAgICAgaWYgKCFwcmV2aW91c1BvaW50KSB7XHJcbiAgICAgICAgcHJldmlvdXNQb2ludCA9IHBvaW50O1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB5aWVsZCBuZXcgTGluZShwcmV2aW91c1BvaW50LCBwb2ludCk7XHJcbiAgICAgIHByZXZpb3VzUG9pbnQgPSBwb2ludDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTdGFydGluZ1BvaW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXNbMF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmVydGljZXNDb3VudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZlcnRpY2VzLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMaW5lUHJvcGVydGllcygpIHtcclxuICAgIHJldHVybiB0aGlzLmxpbmVQcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpdFRlc3QocG9pbnQ6IFBvaW50KTogSGl0VGVzdFJlc3VsdCB8IG51bGwge1xyXG4gICAgZm9yIChjb25zdCBsaW5lIG9mIHRoaXMuZ2V0TGluZUl0ZXJhdG9yKCkpIHtcclxuICAgICAgaWYgKGxpbmUuZGlzdGFuY2VUb1BvaW50KHBvaW50KSA8PSBjb25maWd1cmF0aW9uLmhpdFRvbGVyYW5jZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgSGl0VGVzdFJlc3VsdChsaW5lLCB0aGlzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZlcnRleChpbmRleDogbnVtYmVyKTogUG9pbnQge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXNbaW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZlcnRpY2VzKCk6IFBvaW50W10ge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkVmVydGV4KHBvaW50OiBQb2ludCkge1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKHBvaW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVWZXJ0ZXgocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZFBvaW50SW5kZXgocG9pbnQpO1xyXG5cclxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgdGhpcy52ZXJ0aWNlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluc2VydFZlcnRleChwb2ludDogUG9pbnQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMudmVydGljZXMuc3BsaWNlKGluZGV4LCAwLCBwb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvbmUoKTogUGF0aCB7XHJcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IFsuLi50aGlzLmdldFZlcnRpY2VzKCkubWFwKHBvaW50ID0+IHBvaW50LmNsb25lKCkpXTtcclxuICAgIGNvbnN0IGxpbmVQcm9wZXJ0aWVzID0gdGhpcy5saW5lUHJvcGVydGllcy5jbG9uZSgpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUGF0aCh2ZXJ0aWNlcywgbGluZVByb3BlcnRpZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRQb2ludEluZGV4KHBvaW50OiBQb2ludCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXMuaW5kZXhPZihwb2ludCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9QYXRoLnRzIiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb21tb24vQ29sb3InO1xyXG5pbXBvcnQgeyBDT0xPUlMgfSBmcm9tICdjb21tb24vQ09MT1JTJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lUHJvcGVydGllcyB7XHJcbiAgcHVibGljIGNvbG9yOiBDb2xvcjtcclxuICBwdWJsaWMgdGhpY2tuZXNzOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbG9yOiBDb2xvciwgdGhpY2tuZXNzOiBudW1iZXIpIHtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXREZWZhdWx0KCk6IExpbmVQcm9wZXJ0aWVzIHtcclxuICAgIHJldHVybiBuZXcgTGluZVByb3BlcnRpZXMoQ09MT1JTLkJMQUNLLCAxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9uZSgpOiBMaW5lUHJvcGVydGllcyB7XHJcbiAgICByZXR1cm4gbmV3IExpbmVQcm9wZXJ0aWVzKHRoaXMuY29sb3IsIHRoaXMudGhpY2tuZXNzKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0xpbmVQcm9wZXJ0aWVzLnRzIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuY29uc3QgbWF4RGV2aWF0aW9uID0gY29uZmlndXJhdGlvbi5saW5lRGV2aWF0aW9uQWxsb3dhbmNlSW5EZWdyZWVzO1xyXG5cclxuY29uc3QgYWxsb3dlZERlZ3JlZVJhbmdlcyA9IFtcclxuICBbMCwgbWF4RGV2aWF0aW9uXSxcclxuICBbMTgwIC0gbWF4RGV2aWF0aW9uLCAxODAgKyBtYXhEZXZpYXRpb25dLFxyXG4gIFszNjAgLSBtYXhEZXZpYXRpb24sIDM2MF1cclxuXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbiBleHRlbmRzIExpbmVDb25kaXRpb24ge1xyXG4gIHB1YmxpYyBpc01ldCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxpbmUucDEueSA9PT0gdGhpcy5saW5lLnAyLnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KGxvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgaWYgKGxvY2tlZFBvaW50ID09PSB0aGlzLmxpbmUucDEpIHtcclxuICAgICAgdGhpcy5hbGlnblBvaW50c0hvcml6b250YWxseSh0aGlzLmxpbmUucDIsIHRoaXMubGluZS5wMSk7XHJcbiAgICB9IGVsc2UgaWYgKGxvY2tlZFBvaW50ID09PSB0aGlzLmxpbmUucDIpIHtcclxuICAgICAgdGhpcy5hbGlnblBvaW50c0hvcml6b250YWxseSh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvY2tlZCBwb2ludCBkb2VzIG5vdCBtYXRjaCBlaXRoZXIgcG9pbnQgb24gdGhlIGxpbmUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkdXBsaWNhdGVGb3JOZXdMaW5lKGxpbmU6IExpbmUsIHBvbHlnb246IFBvbHlnb24pIHtcclxuICAgIHJldHVybiBuZXcgSG9yaXpvbnRhbExpbmVDb25kaXRpb24obGluZSwgcG9seWdvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmVyaWZ5Q2FuQmVBcHBsaWVkKCkge1xyXG4gICAgY29uc3QgYW5nbGUgPSBQb2ludC5nZXRBbmdsZSh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcblxyXG4gICAgaWYgKCFhbGxvd2VkRGVncmVlUmFuZ2VzLnNvbWUoZGVncmVlUmFuZ2UgPT4gYW5nbGUgPj0gZGVncmVlUmFuZ2VbMF0gJiYgYW5nbGUgPD0gZGVncmVlUmFuZ2VbMV0pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBpcyBub3QgaG9yaXpvbnRhbCBlbm91Z2gnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMYWJlbCgpIHtcclxuICAgIHJldHVybiAnLSc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFsaWduUG9pbnRzSG9yaXpvbnRhbGx5KHN1YmplY3Q6IFBvaW50LCBkZXN0aW5hdGlvbjogUG9pbnQpIHtcclxuICAgIHN1YmplY3QubW92ZVRvKG5ldyBQb2ludChzdWJqZWN0LngsIGRlc3RpbmF0aW9uLnkpKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9Ib3Jpem9udGFsTGluZUNvbmRpdGlvbi50cyIsImltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuXHJcbmNvbnN0IG1heERldmlhdGlvbiA9IGNvbmZpZ3VyYXRpb24ubGluZURldmlhdGlvbkFsbG93YW5jZUluRGVncmVlcztcclxuXHJcbmNvbnN0IGFsbG93ZWREZWdyZWVSYW5nZXMgPSBbXHJcbiAgWzkwIC0gbWF4RGV2aWF0aW9uLCA5MCArIG1heERldmlhdGlvbl0sXHJcbiAgWzI3MCAtIG1heERldmlhdGlvbiwgMjcwICsgbWF4RGV2aWF0aW9uXVxyXG5dO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsTGluZUNvbmRpdGlvbiBleHRlbmRzIExpbmVDb25kaXRpb24ge1xyXG4gIHB1YmxpYyBpc01ldCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxpbmUucDEueCA9PT0gdGhpcy5saW5lLnAyLng7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KGxvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgaWYgKGxvY2tlZFBvaW50ID09PSB0aGlzLmxpbmUucDEpIHtcclxuICAgICAgdGhpcy5hbGlnblBvaW50c1ZlcnRpY2FsbHkodGhpcy5saW5lLnAyLCB0aGlzLmxpbmUucDEpO1xyXG4gICAgfSBlbHNlIGlmIChsb2NrZWRQb2ludCA9PT0gdGhpcy5saW5lLnAyKSB7XHJcbiAgICAgIHRoaXMuYWxpZ25Qb2ludHNWZXJ0aWNhbGx5KHRoaXMubGluZS5wMSwgdGhpcy5saW5lLnAyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTG9ja2VkIHBvaW50IGRvZXMgbm90IG1hdGNoIGVpdGhlciBwb2ludCBvbiB0aGUgbGluZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGR1cGxpY2F0ZUZvck5ld0xpbmUobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgcmV0dXJuIG5ldyBWZXJ0aWNhbExpbmVDb25kaXRpb24obGluZSwgcG9seWdvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmVyaWZ5Q2FuQmVBcHBsaWVkKCkge1xyXG4gICAgY29uc3QgYW5nbGUgPSBQb2ludC5nZXRBbmdsZSh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcblxyXG4gICAgaWYgKCFhbGxvd2VkRGVncmVlUmFuZ2VzLnNvbWUoZGVncmVlUmFuZ2UgPT4gYW5nbGUgPj0gZGVncmVlUmFuZ2VbMF0gJiYgYW5nbGUgPD0gZGVncmVlUmFuZ2VbMV0pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBpcyBub3QgdmVydGljYWwgZW5vdWdoJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFiZWwoKSB7XHJcbiAgICByZXR1cm4gJ3wnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhbGlnblBvaW50c1ZlcnRpY2FsbHkoc3ViamVjdDogUG9pbnQsIGRlc3RpbmF0aW9uOiBQb2ludCkge1xyXG4gICAgc3ViamVjdC5tb3ZlVG8obmV3IFBvaW50KGRlc3RpbmF0aW9uLngsIHN1YmplY3QueSkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL1ZlcnRpY2FsTGluZUNvbmRpdGlvbi50cyIsImltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcblxyXG5leHBvcnQgZW51bSBGaXhpbmdEaXJlY3Rpb24ge1xyXG4gIE5vcm1hbCxcclxuICBSZXZlcnNlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25GaXhlciB7XHJcbiAgcHVibGljIGRpcmVjdGlvbjogRml4aW5nRGlyZWN0aW9uO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHBvbHlnb246IFBvbHlnb247XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFydGluZ1BvaW50OiBQb2ludDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGFkZGl0aW9uYWxMaW5lQ29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdO1xyXG5cclxuICBwcml2YXRlIF9maXhTdWNjZXNzZnVsPzogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwb2x5Z29uOiBQb2x5Z29uLFxyXG4gICAgc3RhcnRpbmdQb2ludDogUG9pbnQsXHJcbiAgICBhZGRpdGlvbmFsTGluZUNvbmRpdGlvbnM6IExpbmVDb25kaXRpb25bXSA9IFtdLFxyXG4gICAgZGlyZWN0aW9uOiBGaXhpbmdEaXJlY3Rpb24gPSBGaXhpbmdEaXJlY3Rpb24uTm9ybWFsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBvbHlnb24gPSBwb2x5Z29uO1xyXG4gICAgdGhpcy5zdGFydGluZ1BvaW50ID0gc3RhcnRpbmdQb2ludDtcclxuICAgIHRoaXMuYWRkaXRpb25hbExpbmVDb25kaXRpb25zID0gYWRkaXRpb25hbExpbmVDb25kaXRpb25zO1xyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGZpeFN1Y2Nlc3NmdWwoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5fZml4U3VjY2Vzc2Z1bCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcigndHJ5Rml4IG5lZWRzIHRvIGJlIGNhbGxlZCBmaXJzdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9maXhTdWNjZXNzZnVsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRyeUZpeCgpIHtcclxuICAgIGlmICh0aGlzLl9maXhTdWNjZXNzZnVsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25kaXRpb25GaXhlciBuZWVkcyB0byBiZSByZXNldCBiZWZvcmUgZml4aW5nIGFnYWluJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2x5Z29uLmdldFZlcnRpY2VzKCk7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9ucyA9IFsuLi50aGlzLnBvbHlnb24uZ2V0TGluZUNvbmRpdGlvbnMoKSwgLi4udGhpcy5hZGRpdGlvbmFsTGluZUNvbmRpdGlvbnNdO1xyXG4gICAgY29uc3Qgc3RhcnRpbmdQb2ludEluZGV4ID0gdGhpcy5wb2x5Z29uLmZpbmRQb2ludEluZGV4KHRoaXMuc3RhcnRpbmdQb2ludCk7XHJcbiAgICBsZXQgbG9ja2VkUG9pbnRJbmRleCA9IHN0YXJ0aW5nUG9pbnRJbmRleDtcclxuICAgIGxldCBjdXJyZW50UG9pbnRJbmRleCA9IHRoaXMuZ2V0TmV4dFBvaW50SW5kZXgobG9ja2VkUG9pbnRJbmRleCk7XHJcblxyXG4gICAgd2hpbGUgKGN1cnJlbnRQb2ludEluZGV4ICE9PSBzdGFydGluZ1BvaW50SW5kZXgpIHtcclxuICAgICAgY29uc3QgY3VycmVudExpbmUgPSBuZXcgTGluZShwb2ludHNbbG9ja2VkUG9pbnRJbmRleF0sIHBvaW50c1tjdXJyZW50UG9pbnRJbmRleF0pO1xyXG4gICAgICBjb25zdCBjdXJyZW50TGluZUNvbmRpdGlvbnMgPSBsaW5lQ29uZGl0aW9ucy5maWx0ZXIobGluZUNvbmRpdGlvbiA9PlxyXG4gICAgICAgIGxpbmVDb25kaXRpb24ubGluZS5lcXVhbHMoY3VycmVudExpbmUpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjdXJyZW50TGluZUNvbmRpdGlvbnNcclxuICAgICAgICAuZmlsdGVyKGxpbmVDb25kaXRpb24gPT4gIWxpbmVDb25kaXRpb24uaXNNZXQoKSlcclxuICAgICAgICAuZm9yRWFjaChsaW5lQ29uZGl0aW9uID0+IGxpbmVDb25kaXRpb24uZml4KHBvaW50c1tsb2NrZWRQb2ludEluZGV4XSkpO1xyXG5cclxuICAgICAgbG9ja2VkUG9pbnRJbmRleCA9IGN1cnJlbnRQb2ludEluZGV4O1xyXG4gICAgICBjdXJyZW50UG9pbnRJbmRleCA9IHRoaXMuZ2V0TmV4dFBvaW50SW5kZXgoY3VycmVudFBvaW50SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgPSBsaW5lQ29uZGl0aW9ucy5ldmVyeShsaW5lQ29uZGl0aW9uID0+IGxpbmVDb25kaXRpb24uaXNNZXQoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICB0aGlzLl9maXhTdWNjZXNzZnVsID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXROZXh0UG9pbnRJbmRleChjdXJyZW50UG9pbnRJbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IEZpeGluZ0RpcmVjdGlvbi5SZXZlcnNlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBvbHlnb24uZ2V0UHJldmlvdXNQb2ludEluZGV4KGN1cnJlbnRQb2ludEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5wb2x5Z29uLmdldE5leHRQb2ludEluZGV4KGN1cnJlbnRQb2ludEluZGV4KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9Db25kaXRpb25GaXhlci50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbmlzaFBvaW50RHJhZ0V2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiBQYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IEZpbmlzaFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgaGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXRoUG9pbnRDb21wb25lbnQ6IFBhdGhQb2ludENvbXBvbmVudCkge1xyXG4gICAgdGhpcy5wYXlsb2FkID0gcGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdGaW5pc2hQb2ludERyYWdFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9wb2ludC1kcmFnL0ZpbmlzaFBvaW50RHJhZ0V2ZW50LnRzIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludERyYWdFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZDoge1xyXG4gICAgY29tcG9uZW50OiBQYXRoUG9pbnRDb21wb25lbnQsXHJcbiAgICBuZXdQb3NpdGlvbjogUG9pbnRcclxuICB9O1xyXG4gIHB1YmxpYyByZWFkb25seSBldmVudFR5cGUgPSBQb2ludERyYWdFdmVudC5ldmVudFR5cGU7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocGF0aFBvaW50Q29tcG9uZW50OiBQYXRoUG9pbnRDb21wb25lbnQsIG5ld1Bvc2l0aW9uOiBQb2ludCkge1xyXG4gICAgdGhpcy5wYXlsb2FkID0ge1xyXG4gICAgICBjb21wb25lbnQ6IHBhdGhQb2ludENvbXBvbmVudCxcclxuICAgICAgbmV3UG9zaXRpb25cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ1BvaW50RHJhZ0V2ZW50JztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFydFBvaW50RHJhZ0V2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiBQYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IFN0YXJ0UG9pbnREcmFnRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGhQb2ludENvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50KSB7XHJcbiAgICB0aGlzLnBheWxvYWQgPSBwYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ1N0YXJ0UG9pbnREcmFnRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvcG9pbnQtZHJhZy9TdGFydFBvaW50RHJhZ0V2ZW50LnRzIiwiaW1wb3J0ICd1aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5zdHJ1Y3Rpb25zRGlhbG9nIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIHByaXZhdGUgb3ZlcmxheTogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBkaWFsb2dDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgZGlzbWlzc0J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtZGlhbG9nLXdyYXBwZXInO1xyXG5cclxuICAgIHRoaXMub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtZGlhbG9nX19vdmVybGF5JztcclxuXHJcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIuY2xhc3NOYW1lID0gJ2luc3RydWN0aW9ucy1kaWFsb2cnO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0luc3RydWN0aW9ucyc7XHJcbiAgICB0aXRsZS5jbGFzc05hbWUgPSAnaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fdGl0bGUnO1xyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG5cclxuICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlVXNhZ2VMaXN0KCkpO1xyXG5cclxuICAgIHRoaXMuZGlzbWlzc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5kaXNtaXNzQnV0dG9uLnRleHRDb250ZW50ID0gJ0Rpc21pc3MnO1xyXG4gICAgdGhpcy5kaXNtaXNzQnV0dG9uLmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtZGlhbG9nX19kaXNtaXNzLWJ1dHRvbic7XHJcblxyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaXNtaXNzQnV0dG9uKTtcclxuXHJcbiAgICB0aGlzLmRpc21pc3MgPSB0aGlzLmRpc21pc3MuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2dDb250YWluZXIpO1xyXG4gICAgdGhpcy5kaXNtaXNzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kaXNtaXNzKTtcclxuICAgIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGlzbWlzcyk7XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2luc3RydWN0aW9ucy1kaWFsb2dfX292ZXJsYXktLWFjdGl2ZScpO1xyXG4gICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbnN0cnVjdGlvbnMtZGlhbG9nLS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXkpO1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmRpYWxvZ0NvbnRhaW5lcik7XHJcbiAgICB0aGlzLmRpc21pc3NCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRpc21pc3MpO1xyXG4gICAgdGhpcy5vdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kaXNtaXNzKTtcclxuXHJcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fb3ZlcmxheS0tYWN0aXZlJyk7XHJcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpbnN0cnVjdGlvbnMtZGlhbG9nLS1hY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGlzbWlzcygpIHtcclxuICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVVzYWdlTGlzdCgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cclxuICAgIGNvbnN0IHVzYWdlID0gW1xyXG4gICAgICAnQ2xpY2sgb24gdGhlIGZyZWUgc3BhY2UgaW4gdGhlIGNhbnZhcyB0byBzdGFydCBjcmVhdGluZyB2ZXJ0aWNlcycsXHJcbiAgICAgICdDbGljayBvbiB0aGUgaW5pdGlhbCB2ZXJ0ZXggdG8gY2xvc2UgdGhlIHBhdGggaW50byBhIHBvbHlnb24nLFxyXG4gICAgICAnQWx0ZXJuYXRpdmVseSwgeW91IG1heSBwcmVzcyBFc2NhcGUgdG8gY2FuY2VsIGFkZGluZyBhIG5ldyBwYXRoJyxcclxuICAgICAgJ0NsaWNrIGFuZCBkcmFnIHRoZSB2ZXJ0ZXggdG8gbW92ZSBpdCcsXHJcbiAgICAgICdEb3VibGUgY2xpY2sgb24gYW4gZWRnZSB0byBhZGQgYSB2ZXJ0ZXggaW4gdGhlIG1pZGRsZSBvZiBpdCcsXHJcbiAgICAgICdEb3VibGUgY2xpY2sgb24gYSB2ZXJ0ZXggdG8gcmVtb3ZlIGl0JyxcclxuICAgICAgJ0NsaWNrIGFuIGVkZ2UgdG8gYWRkIG9yIHJlbW92ZSBhbiBlZGdlIHJlbGF0aW9uJ1xyXG4gICAgXTtcclxuXHJcbiAgICB1c2FnZS5tYXAodXNhZ2VJdGVtVGV4dCA9PiB0aGlzLmNyZWF0ZVVzYWdlTGlzdEl0ZW0odXNhZ2VJdGVtVGV4dCkpXHJcbiAgICAgIC5mb3JFYWNoKHVzYWdlTGlzdEl0ZW0gPT4gbGlzdC5hcHBlbmRDaGlsZCh1c2FnZUxpc3RJdGVtKSk7XHJcblxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVVzYWdlTGlzdEl0ZW0odGV4dENvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBpdGVtLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XHJcblxyXG4gICAgcmV0dXJuIGl0ZW07XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtaW5zdHJ1Y3Rpb25zLWRpYWxvZycsIEluc3RydWN0aW9uc0RpYWxvZyk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy50cyIsImltcG9ydCAnaW5kZXguc2Nzcyc7XHJcbmltcG9ydCAnbm9ybWFsaXplLmNzcyc7XHJcblxyXG5pbXBvcnQgJ0B3ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcy93ZWJjb21wb25lbnRzLWhpLXNkLWNlJztcclxuXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnQXBwbGljYXRpb24nO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBib290c3RyYXAsIGZhbHNlKTtcclxuXHJcbmZ1bmN0aW9uIGJvb3RzdHJhcCgpOiB2b2lkIHtcclxuICBjb25zdCBjYW52YXNJZCA9ICdtYWluLWNhbnZhcyc7XHJcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xyXG4gIGlmICghY2FudmFzKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdDYW52YXMgd2l0aCBpZCcsIGNhbnZhc0lkLCAnbm90IGZvdW5kJyk7XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXBwbGljYXRpb24gPSBuZXcgQXBwbGljYXRpb24oPEhUTUxDYW52YXNFbGVtZW50PmNhbnZhcyk7XHJcbiAgYXBwbGljYXRpb24uaW5pdCgpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2luZGV4LnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9pbmRleC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHkge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdDsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDEuNTsgfVxcblxcbi5tYWluLWNhbnZhcyB7XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjazsgfVxcblxcbi5tYWluLWNvbnRhaW5lciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbjogMCAxZW07IH1cXG5cXG4uY2FudmFzLXdyYXBwZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uYXBwbGljYXRpb24tdWkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG4gIC5hcHBsaWNhdGlvbi11aSAqIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDsgfVxcblxcbi5hcHAtaGVhZGVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDFlbTtcXG4gIG1hcmdpbi1sZWZ0OiAxZW07IH1cXG5cXG4uYXBwLW5hbWUge1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLmZvb3RlciB7XFxuICBtYXJnaW46IDFlbSAxZW07IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvaW5kZXguc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oKXsvKlxuXG4gQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG5cbkNvcHlyaWdodCAoYykgMjAxNiBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcblxuQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuXG4gQ29weXJpZ2h0IChjKSAyMDE0IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4qL1xuJ3VzZSBzdHJpY3QnO3ZhciBKPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdz09PXRoaXM/dGhpczpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsJiZudWxsIT1nbG9iYWw/Z2xvYmFsOnRoaXMsQWE9XCJmdW5jdGlvblwiPT10eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnRpZXM/T2JqZWN0LmRlZmluZVByb3BlcnR5OmZ1bmN0aW9uKGcscSxOKXtnIT1BcnJheS5wcm90b3R5cGUmJmchPU9iamVjdC5wcm90b3R5cGUmJihnW3FdPU4udmFsdWUpfTtmdW5jdGlvbiBzYigpe3NiPWZ1bmN0aW9uKCl7fTtKLlN5bWJvbHx8KEouU3ltYm9sPXRiKX12YXIgdGI9ZnVuY3Rpb24oKXt2YXIgZz0wO3JldHVybiBmdW5jdGlvbihxKXtyZXR1cm5cImpzY29tcF9zeW1ib2xfXCIrKHF8fFwiXCIpK2crK319KCk7XG5mdW5jdGlvbiBkZCgpe3NiKCk7dmFyIGc9Si5TeW1ib2wuaXRlcmF0b3I7Z3x8KGc9Si5TeW1ib2wuaXRlcmF0b3I9Si5TeW1ib2woXCJpdGVyYXRvclwiKSk7XCJmdW5jdGlvblwiIT10eXBlb2YgQXJyYXkucHJvdG90eXBlW2ddJiZBYShBcnJheS5wcm90b3R5cGUsZyx7Y29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIGVkKHRoaXMpfX0pO2RkPWZ1bmN0aW9uKCl7fX1mdW5jdGlvbiBlZChnKXt2YXIgcT0wO3JldHVybiBmZChmdW5jdGlvbigpe3JldHVybiBxPGcubGVuZ3RoP3tkb25lOiExLHZhbHVlOmdbcSsrXX06e2RvbmU6ITB9fSl9ZnVuY3Rpb24gZmQoZyl7ZGQoKTtnPXtuZXh0Omd9O2dbSi5TeW1ib2wuaXRlcmF0b3JdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9O3JldHVybiBnfWZ1bmN0aW9uIGdkKGcpe2RkKCk7dmFyIHE9Z1tTeW1ib2wuaXRlcmF0b3JdO3JldHVybiBxP3EuY2FsbChnKTplZChnKX1cbmZ1bmN0aW9uIGhkKGcpe2Zvcih2YXIgcSxOPVtdOyEocT1nLm5leHQoKSkuZG9uZTspTi5wdXNoKHEudmFsdWUpO3JldHVybiBOfVxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZygpe3ZhciBhPXRoaXM7dGhpcy5tPXt9O3RoaXMuZz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7dmFyIGI9bmV3IEJhO2IucnVsZXM9W107dGhpcy5oPXYuc2V0KHRoaXMuZyxuZXcgdihiKSk7dGhpcy5pPSExO3RoaXMuYj10aGlzLmE9bnVsbDt1YihmdW5jdGlvbigpe2EuYygpfSl9ZnVuY3Rpb24gcSgpe3RoaXMuY3VzdG9tU3R5bGVzPVtdO3RoaXMuZW5xdWV1ZWQ9ITF9ZnVuY3Rpb24gTigpe31mdW5jdGlvbiBoYShhKXt0aGlzLmNhY2hlPXt9O3RoaXMuYz12b2lkIDA9PT1hPzEwMDphfWZ1bmN0aW9uIG4oKXt9ZnVuY3Rpb24gdihhLGIsYyxkLGUpe3RoaXMuRD1hfHxudWxsO3RoaXMuYj1ifHxudWxsO3RoaXMubGE9Y3x8W107dGhpcy5OPW51bGw7dGhpcy5WPWV8fFwiXCI7dGhpcy5hPXRoaXMuQT10aGlzLko9bnVsbH1mdW5jdGlvbiB1KCl7fWZ1bmN0aW9uIEJhKCl7dGhpcy5lbmQ9dGhpcy5zdGFydD0wO3RoaXMucnVsZXM9dGhpcy5wYXJlbnQ9XG50aGlzLnByZXZpb3VzPW51bGw7dGhpcy5jc3NUZXh0PXRoaXMucGFyc2VkQ3NzVGV4dD1cIlwiO3RoaXMuYXRSdWxlPSExO3RoaXMudHlwZT0wO3RoaXMucGFyc2VkU2VsZWN0b3I9dGhpcy5zZWxlY3Rvcj10aGlzLmtleWZyYW1lc05hbWU9XCJcIn1mdW5jdGlvbiBpZChhKXtmdW5jdGlvbiBiKGIsYyl7T2JqZWN0LmRlZmluZVByb3BlcnR5KGIsXCJpbm5lckhUTUxcIix7ZW51bWVyYWJsZTpjLmVudW1lcmFibGUsY29uZmlndXJhYmxlOiEwLGdldDpjLmdldCxzZXQ6ZnVuY3Rpb24oYil7dmFyIGQ9dGhpcyxlPXZvaWQgMDt0KHRoaXMpJiYoZT1bXSxPKHRoaXMsZnVuY3Rpb24oYSl7YSE9PWQmJmUucHVzaChhKX0pKTtjLnNldC5jYWxsKHRoaXMsYik7aWYoZSlmb3IodmFyIGY9MDtmPGUubGVuZ3RoO2YrKyl7dmFyIGs9ZVtmXTsxPT09ay5fX0NFX3N0YXRlJiZhLmRpc2Nvbm5lY3RlZENhbGxiYWNrKGspfXRoaXMub3duZXJEb2N1bWVudC5fX0NFX2hhc1JlZ2lzdHJ5P2EuZih0aGlzKTphLmwodGhpcyk7XG5yZXR1cm4gYn19KX1mdW5jdGlvbiBjKGIsYyl7eChiLFwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50XCIsZnVuY3Rpb24oYixkKXt2YXIgZT10KGQpO2I9Yy5jYWxsKHRoaXMsYixkKTtlJiZhLmEoZCk7dChiKSYmYS5iKGQpO3JldHVybiBifSl9dmImJngoRWxlbWVudC5wcm90b3R5cGUsXCJhdHRhY2hTaGFkb3dcIixmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5fX0NFX3NoYWRvd1Jvb3Q9YT12Yi5jYWxsKHRoaXMsYSl9KTtpZihDYSYmQ2EuZ2V0KWIoRWxlbWVudC5wcm90b3R5cGUsQ2EpO2Vsc2UgaWYoRGEmJkRhLmdldCliKEhUTUxFbGVtZW50LnByb3RvdHlwZSxEYSk7ZWxzZXt2YXIgZD1FYS5jYWxsKGRvY3VtZW50LFwiZGl2XCIpO2EucyhmdW5jdGlvbihhKXtiKGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB3Yi5jYWxsKHRoaXMsITApLmlubmVySFRNTH0sc2V0OmZ1bmN0aW9uKGEpe3ZhciBiPVwidGVtcGxhdGVcIj09PXRoaXMubG9jYWxOYW1lP1xudGhpcy5jb250ZW50OnRoaXM7Zm9yKGQuaW5uZXJIVE1MPWE7MDxiLmNoaWxkTm9kZXMubGVuZ3RoOylGYS5jYWxsKGIsYi5jaGlsZE5vZGVzWzBdKTtmb3IoOzA8ZC5jaGlsZE5vZGVzLmxlbmd0aDspaWEuY2FsbChiLGQuY2hpbGROb2Rlc1swXSl9fSl9KX14KEVsZW1lbnQucHJvdG90eXBlLFwic2V0QXR0cmlidXRlXCIsZnVuY3Rpb24oYixjKXtpZigxIT09dGhpcy5fX0NFX3N0YXRlKXJldHVybiB4Yi5jYWxsKHRoaXMsYixjKTt2YXIgZD1HYS5jYWxsKHRoaXMsYik7eGIuY2FsbCh0aGlzLGIsYyk7Yz1HYS5jYWxsKHRoaXMsYik7YS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodGhpcyxiLGQsYyxudWxsKX0pO3goRWxlbWVudC5wcm90b3R5cGUsXCJzZXRBdHRyaWJ1dGVOU1wiLGZ1bmN0aW9uKGIsYyxkKXtpZigxIT09dGhpcy5fX0NFX3N0YXRlKXJldHVybiB5Yi5jYWxsKHRoaXMsYixjLGQpO3ZhciBlPWphLmNhbGwodGhpcyxiLGMpO3liLmNhbGwodGhpcyxiLGMsZCk7ZD1qYS5jYWxsKHRoaXMsXG5iLGMpO2EuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsYyxlLGQsYil9KTt4KEVsZW1lbnQucHJvdG90eXBlLFwicmVtb3ZlQXR0cmlidXRlXCIsZnVuY3Rpb24oYil7aWYoMSE9PXRoaXMuX19DRV9zdGF0ZSlyZXR1cm4gemIuY2FsbCh0aGlzLGIpO3ZhciBjPUdhLmNhbGwodGhpcyxiKTt6Yi5jYWxsKHRoaXMsYik7bnVsbCE9PWMmJmEuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsYixjLG51bGwsbnVsbCl9KTt4KEVsZW1lbnQucHJvdG90eXBlLFwicmVtb3ZlQXR0cmlidXRlTlNcIixmdW5jdGlvbihiLGMpe2lmKDEhPT10aGlzLl9fQ0Vfc3RhdGUpcmV0dXJuIEFiLmNhbGwodGhpcyxiLGMpO3ZhciBkPWphLmNhbGwodGhpcyxiLGMpO0FiLmNhbGwodGhpcyxiLGMpO3ZhciBlPWphLmNhbGwodGhpcyxiLGMpO2QhPT1lJiZhLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0aGlzLGMsZCxlLGIpfSk7QmI/YyhIVE1MRWxlbWVudC5wcm90b3R5cGUsQmIpOkNiP2MoRWxlbWVudC5wcm90b3R5cGUsXG5DYik6Y29uc29sZS53YXJuKFwiQ3VzdG9tIEVsZW1lbnRzOiBgRWxlbWVudCNpbnNlcnRBZGphY2VudEVsZW1lbnRgIHdhcyBub3QgcGF0Y2hlZC5cIik7SGEoYSxFbGVtZW50LnByb3RvdHlwZSx7WjpqZCxhcHBlbmQ6a2R9KTtsZChhLHtqYTptZCxXYTpuZCxyZXBsYWNlV2l0aDpvZCxyZW1vdmU6cGR9KX1mdW5jdGlvbiBsZChhLGIpe3ZhciBjPUVsZW1lbnQucHJvdG90eXBlO2Z1bmN0aW9uIGQoYil7cmV0dXJuIGZ1bmN0aW9uKGMpe2Zvcih2YXIgZD1bXSxlPTA7ZTxhcmd1bWVudHMubGVuZ3RoOysrZSlkW2UtMF09YXJndW1lbnRzW2VdO2U9W107Zm9yKHZhciBmPVtdLGc9MDtnPGQubGVuZ3RoO2crKyl7dmFyIG09ZFtnXTttIGluc3RhbmNlb2YgRWxlbWVudCYmdChtKSYmZi5wdXNoKG0pO2lmKG0gaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KWZvcihtPW0uZmlyc3RDaGlsZDttO209bS5uZXh0U2libGluZyllLnB1c2gobSk7ZWxzZSBlLnB1c2gobSl9Yi5hcHBseSh0aGlzLFxuZCk7Zm9yKGQ9MDtkPGYubGVuZ3RoO2QrKylhLmEoZltkXSk7aWYodCh0aGlzKSlmb3IoZD0wO2Q8ZS5sZW5ndGg7ZCsrKWY9ZVtkXSxmIGluc3RhbmNlb2YgRWxlbWVudCYmYS5iKGYpfX12b2lkIDAhPT1iLmphJiYoYy5iZWZvcmU9ZChiLmphKSk7dm9pZCAwIT09Yi5qYSYmKGMuYWZ0ZXI9ZChiLldhKSk7dm9pZCAwIT09Yi5yZXBsYWNlV2l0aCYmeChjLFwicmVwbGFjZVdpdGhcIixmdW5jdGlvbihjKXtmb3IodmFyIGQ9W10sZT0wO2U8YXJndW1lbnRzLmxlbmd0aDsrK2UpZFtlLTBdPWFyZ3VtZW50c1tlXTtlPVtdO2Zvcih2YXIgaD1bXSx3PTA7dzxkLmxlbmd0aDt3Kyspe3ZhciBnPWRbd107ZyBpbnN0YW5jZW9mIEVsZW1lbnQmJnQoZykmJmgucHVzaChnKTtpZihnIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClmb3IoZz1nLmZpcnN0Q2hpbGQ7ZztnPWcubmV4dFNpYmxpbmcpZS5wdXNoKGcpO2Vsc2UgZS5wdXNoKGcpfXc9dCh0aGlzKTtiLnJlcGxhY2VXaXRoLmFwcGx5KHRoaXMsXG5kKTtmb3IoZD0wO2Q8aC5sZW5ndGg7ZCsrKWEuYShoW2RdKTtpZih3KWZvcihhLmEodGhpcyksZD0wO2Q8ZS5sZW5ndGg7ZCsrKWg9ZVtkXSxoIGluc3RhbmNlb2YgRWxlbWVudCYmYS5iKGgpfSk7dm9pZCAwIT09Yi5yZW1vdmUmJngoYyxcInJlbW92ZVwiLGZ1bmN0aW9uKCl7dmFyIGM9dCh0aGlzKTtiLnJlbW92ZS5jYWxsKHRoaXMpO2MmJmEuYSh0aGlzKX0pfWZ1bmN0aW9uIHFkKGEpe2Z1bmN0aW9uIGIoYixkKXtPYmplY3QuZGVmaW5lUHJvcGVydHkoYixcInRleHRDb250ZW50XCIse2VudW1lcmFibGU6ZC5lbnVtZXJhYmxlLGNvbmZpZ3VyYWJsZTohMCxnZXQ6ZC5nZXQsc2V0OmZ1bmN0aW9uKGIpe2lmKHRoaXMubm9kZVR5cGU9PT1Ob2RlLlRFWFRfTk9ERSlkLnNldC5jYWxsKHRoaXMsYik7ZWxzZXt2YXIgYz12b2lkIDA7aWYodGhpcy5maXJzdENoaWxkKXt2YXIgZT10aGlzLmNoaWxkTm9kZXMsaD1lLmxlbmd0aDtpZigwPGgmJnQodGhpcykpe2M9QXJyYXkoaCk7Zm9yKHZhciB3PVxuMDt3PGg7dysrKWNbd109ZVt3XX19ZC5zZXQuY2FsbCh0aGlzLGIpO2lmKGMpZm9yKGI9MDtiPGMubGVuZ3RoO2IrKylhLmEoY1tiXSl9fX0pfXgoTm9kZS5wcm90b3R5cGUsXCJpbnNlcnRCZWZvcmVcIixmdW5jdGlvbihiLGQpe2lmKGIgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KXt2YXIgYz1BcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYi5jaGlsZE5vZGVzKTtiPURiLmNhbGwodGhpcyxiLGQpO2lmKHQodGhpcykpZm9yKGQ9MDtkPGMubGVuZ3RoO2QrKylhLmIoY1tkXSk7cmV0dXJuIGJ9Yz10KGIpO2Q9RGIuY2FsbCh0aGlzLGIsZCk7YyYmYS5hKGIpO3QodGhpcykmJmEuYihiKTtyZXR1cm4gZH0pO3goTm9kZS5wcm90b3R5cGUsXCJhcHBlbmRDaGlsZFwiLGZ1bmN0aW9uKGIpe2lmKGIgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KXt2YXIgYz1BcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYi5jaGlsZE5vZGVzKTtiPWlhLmNhbGwodGhpcyxiKTtpZih0KHRoaXMpKWZvcih2YXIgZT1cbjA7ZTxjLmxlbmd0aDtlKyspYS5iKGNbZV0pO3JldHVybiBifWM9dChiKTtlPWlhLmNhbGwodGhpcyxiKTtjJiZhLmEoYik7dCh0aGlzKSYmYS5iKGIpO3JldHVybiBlfSk7eChOb2RlLnByb3RvdHlwZSxcImNsb25lTm9kZVwiLGZ1bmN0aW9uKGIpe2I9d2IuY2FsbCh0aGlzLGIpO3RoaXMub3duZXJEb2N1bWVudC5fX0NFX2hhc1JlZ2lzdHJ5P2EuZihiKTphLmwoYik7cmV0dXJuIGJ9KTt4KE5vZGUucHJvdG90eXBlLFwicmVtb3ZlQ2hpbGRcIixmdW5jdGlvbihiKXt2YXIgYz10KGIpLGU9RmEuY2FsbCh0aGlzLGIpO2MmJmEuYShiKTtyZXR1cm4gZX0pO3goTm9kZS5wcm90b3R5cGUsXCJyZXBsYWNlQ2hpbGRcIixmdW5jdGlvbihiLGQpe2lmKGIgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KXt2YXIgYz1BcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYi5jaGlsZE5vZGVzKTtiPUViLmNhbGwodGhpcyxiLGQpO2lmKHQodGhpcykpZm9yKGEuYShkKSxkPTA7ZDxjLmxlbmd0aDtkKyspYS5iKGNbZF0pO1xucmV0dXJuIGJ9Yz10KGIpO3ZhciBmPUViLmNhbGwodGhpcyxiLGQpLGs9dCh0aGlzKTtrJiZhLmEoZCk7YyYmYS5hKGIpO2smJmEuYihiKTtyZXR1cm4gZn0pO0lhJiZJYS5nZXQ/YihOb2RlLnByb3RvdHlwZSxJYSk6YS5zKGZ1bmN0aW9uKGEpe2IoYSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7Zm9yKHZhciBhPVtdLGI9MDtiPHRoaXMuY2hpbGROb2Rlcy5sZW5ndGg7YisrKWEucHVzaCh0aGlzLmNoaWxkTm9kZXNbYl0udGV4dENvbnRlbnQpO3JldHVybiBhLmpvaW4oXCJcIil9LHNldDpmdW5jdGlvbihhKXtmb3IoO3RoaXMuZmlyc3RDaGlsZDspRmEuY2FsbCh0aGlzLHRoaXMuZmlyc3RDaGlsZCk7aWEuY2FsbCh0aGlzLGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGEpKX19KX0pfWZ1bmN0aW9uIHJkKGEpe3goRG9jdW1lbnQucHJvdG90eXBlLFwiY3JlYXRlRWxlbWVudFwiLGZ1bmN0aW9uKGIpe2lmKHRoaXMuX19DRV9oYXNSZWdpc3RyeSl7dmFyIGM9XG5hLmMoYik7aWYoYylyZXR1cm4gbmV3IGMuY29uc3RydWN0b3J9Yj1FYS5jYWxsKHRoaXMsYik7YS5nKGIpO3JldHVybiBifSk7eChEb2N1bWVudC5wcm90b3R5cGUsXCJpbXBvcnROb2RlXCIsZnVuY3Rpb24oYixjKXtiPXNkLmNhbGwodGhpcyxiLGMpO3RoaXMuX19DRV9oYXNSZWdpc3RyeT9hLmYoYik6YS5sKGIpO3JldHVybiBifSk7eChEb2N1bWVudC5wcm90b3R5cGUsXCJjcmVhdGVFbGVtZW50TlNcIixmdW5jdGlvbihiLGMpe2lmKHRoaXMuX19DRV9oYXNSZWdpc3RyeSYmKG51bGw9PT1ifHxcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj09PWIpKXt2YXIgZD1hLmMoYyk7aWYoZClyZXR1cm4gbmV3IGQuY29uc3RydWN0b3J9Yj10ZC5jYWxsKHRoaXMsYixjKTthLmcoYik7cmV0dXJuIGJ9KTtIYShhLERvY3VtZW50LnByb3RvdHlwZSx7Wjp1ZCxhcHBlbmQ6dmR9KX1mdW5jdGlvbiBIYShhLGIsYyl7ZnVuY3Rpb24gZChiKXtyZXR1cm4gZnVuY3Rpb24oYyl7Zm9yKHZhciBkPVtdLFxuZT0wO2U8YXJndW1lbnRzLmxlbmd0aDsrK2UpZFtlLTBdPWFyZ3VtZW50c1tlXTtlPVtdO2Zvcih2YXIgZj1bXSxnPTA7ZzxkLmxlbmd0aDtnKyspe3ZhciBtPWRbZ107bSBpbnN0YW5jZW9mIEVsZW1lbnQmJnQobSkmJmYucHVzaChtKTtpZihtIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClmb3IobT1tLmZpcnN0Q2hpbGQ7bTttPW0ubmV4dFNpYmxpbmcpZS5wdXNoKG0pO2Vsc2UgZS5wdXNoKG0pfWIuYXBwbHkodGhpcyxkKTtmb3IoZD0wO2Q8Zi5sZW5ndGg7ZCsrKWEuYShmW2RdKTtpZih0KHRoaXMpKWZvcihkPTA7ZDxlLmxlbmd0aDtkKyspZj1lW2RdLGYgaW5zdGFuY2VvZiBFbGVtZW50JiZhLmIoZil9fXZvaWQgMCE9PWMuWiYmKGIucHJlcGVuZD1kKGMuWikpO3ZvaWQgMCE9PWMuYXBwZW5kJiYoYi5hcHBlbmQ9ZChjLmFwcGVuZCkpfWZ1bmN0aW9uIHdkKGEpe3dpbmRvdy5IVE1MRWxlbWVudD1mdW5jdGlvbigpe2Z1bmN0aW9uIGIoKXt2YXIgYj10aGlzLmNvbnN0cnVjdG9yLFxuZD1hLncoYik7aWYoIWQpdGhyb3cgRXJyb3IoXCJUaGUgY3VzdG9tIGVsZW1lbnQgYmVpbmcgY29uc3RydWN0ZWQgd2FzIG5vdCByZWdpc3RlcmVkIHdpdGggYGN1c3RvbUVsZW1lbnRzYC5cIik7dmFyIGU9ZC5jb25zdHJ1Y3Rpb25TdGFjaztpZigwPT09ZS5sZW5ndGgpcmV0dXJuIGU9RWEuY2FsbChkb2N1bWVudCxkLmxvY2FsTmFtZSksT2JqZWN0LnNldFByb3RvdHlwZU9mKGUsYi5wcm90b3R5cGUpLGUuX19DRV9zdGF0ZT0xLGUuX19DRV9kZWZpbml0aW9uPWQsYS5nKGUpLGU7ZD1lLmxlbmd0aC0xO3ZhciBmPWVbZF07aWYoZj09PUZiKXRocm93IEVycm9yKFwiVGhlIEhUTUxFbGVtZW50IGNvbnN0cnVjdG9yIHdhcyBlaXRoZXIgY2FsbGVkIHJlZW50cmFudGx5IGZvciB0aGlzIGNvbnN0cnVjdG9yIG9yIGNhbGxlZCBtdWx0aXBsZSB0aW1lcy5cIik7ZVtkXT1GYjtPYmplY3Quc2V0UHJvdG90eXBlT2YoZixiLnByb3RvdHlwZSk7YS5nKGYpO3JldHVybiBmfWIucHJvdG90eXBlPXhkLnByb3RvdHlwZTtcbnJldHVybiBifSgpfWZ1bmN0aW9uIHkoYSl7dGhpcy5jPSExO3RoaXMuYT1hO3RoaXMuaD1uZXcgTWFwO3RoaXMuZj1mdW5jdGlvbihhKXtyZXR1cm4gYSgpfTt0aGlzLmI9ITE7dGhpcy5nPVtdO3RoaXMuaT1uZXcgSmEoYSxkb2N1bWVudCl9ZnVuY3Rpb24gR2IoKXt2YXIgYT10aGlzO3RoaXMuYj10aGlzLmE9dm9pZCAwO3RoaXMuZj1uZXcgUHJvbWlzZShmdW5jdGlvbihiKXthLmI9YjthLmEmJmIoYS5hKX0pfWZ1bmN0aW9uIEphKGEsYil7dGhpcy5iPWE7dGhpcy5hPWI7dGhpcy5NPXZvaWQgMDt0aGlzLmIuZih0aGlzLmEpO1wibG9hZGluZ1wiPT09dGhpcy5hLnJlYWR5U3RhdGUmJih0aGlzLk09bmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5mLmJpbmQodGhpcykpLHRoaXMuTS5vYnNlcnZlKHRoaXMuYSx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KSl9ZnVuY3Rpb24gQigpe3RoaXMubz1uZXcgTWFwO3RoaXMubT1uZXcgTWFwO3RoaXMuaj1bXTt0aGlzLmg9ITF9ZnVuY3Rpb24gbChhLFxuYixjKXtpZihhIT09SGIpdGhyb3cgbmV3IFR5cGVFcnJvcihcIklsbGVnYWwgY29uc3RydWN0b3JcIik7YT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7YS5fX3Byb3RvX189bC5wcm90b3R5cGU7YS5GKGIsYyk7cmV0dXJuIGF9ZnVuY3Rpb24ga2EoYSl7aWYoIWEuX19zaGFkeXx8dm9pZCAwPT09YS5fX3NoYWR5LmZpcnN0Q2hpbGQpe2EuX19zaGFkeT1hLl9fc2hhZHl8fHt9O2EuX19zaGFkeS5maXJzdENoaWxkPUthKGEpO2EuX19zaGFkeS5sYXN0Q2hpbGQ9TGEoYSk7SWIoYSk7Zm9yKHZhciBiPWEuX19zaGFkeS5jaGlsZE5vZGVzPVMoYSksYz0wLGQ7YzxiLmxlbmd0aCYmKGQ9YltjXSk7YysrKWQuX19zaGFkeT1kLl9fc2hhZHl8fHt9LGQuX19zaGFkeS5wYXJlbnROb2RlPWEsZC5fX3NoYWR5Lm5leHRTaWJsaW5nPWJbYysxXXx8bnVsbCxkLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nPWJbYy0xXXx8bnVsbCxKYihkKX19ZnVuY3Rpb24geWQoYSl7dmFyIGI9YSYmYS5NO1xuYiYmKGIuWC5kZWxldGUoYS5SYSksYi5YLnNpemV8fChhLlNhLl9fc2hhZHkuVD1udWxsKSl9ZnVuY3Rpb24gemQoYSxiKXthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTthLl9fc2hhZHkuVHx8KGEuX19zaGFkeS5UPW5ldyBsYSk7YS5fX3NoYWR5LlQuWC5hZGQoYik7dmFyIGM9YS5fX3NoYWR5LlQ7cmV0dXJue1JhOmIsTTpjLFNhOmEsdGFrZVJlY29yZHM6ZnVuY3Rpb24oKXtyZXR1cm4gYy50YWtlUmVjb3JkcygpfX19ZnVuY3Rpb24gbGEoKXt0aGlzLmE9ITE7dGhpcy5hZGRlZE5vZGVzPVtdO3RoaXMucmVtb3ZlZE5vZGVzPVtdO3RoaXMuWD1uZXcgU2V0fWZ1bmN0aW9uIFQoYSl7cmV0dXJuIGEuX19zaGFkeSYmdm9pZCAwIT09YS5fX3NoYWR5LmZpcnN0Q2hpbGR9ZnVuY3Rpb24gRyhhKXtyZXR1cm5cIlNoYWR5Um9vdFwiPT09YS5NYX1mdW5jdGlvbiBaKGEpe2E9YS5nZXRSb290Tm9kZSgpO2lmKEcoYSkpcmV0dXJuIGF9ZnVuY3Rpb24gTWEoYSxiKXtpZihhJiZiKWZvcih2YXIgYz1cbk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGIpLGQ9MCxlO2Q8Yy5sZW5ndGgmJihlPWNbZF0pO2QrKyl7dmFyIGY9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiLGUpO2YmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLGUsZil9fWZ1bmN0aW9uIE5hKGEsYil7Zm9yKHZhciBjPVtdLGQ9MTtkPGFyZ3VtZW50cy5sZW5ndGg7KytkKWNbZC0xXT1hcmd1bWVudHNbZF07Zm9yKGQ9MDtkPGMubGVuZ3RoO2QrKylNYShhLGNbZF0pO3JldHVybiBhfWZ1bmN0aW9uIEFkKGEsYil7Zm9yKHZhciBjIGluIGIpYVtjXT1iW2NdfWZ1bmN0aW9uIEtiKGEpe09hLnB1c2goYSk7UGEudGV4dENvbnRlbnQ9TGIrK31mdW5jdGlvbiBNYihhLGIpe2Zvcig7Yjspe2lmKGI9PWEpcmV0dXJuITA7Yj1iLnBhcmVudE5vZGV9cmV0dXJuITF9ZnVuY3Rpb24gTmIoYSl7UWF8fChRYT0hMCxLYihtYSkpO2FhLnB1c2goYSl9ZnVuY3Rpb24gbWEoKXtRYT0hMTtmb3IodmFyIGE9ISFhYS5sZW5ndGg7YWEubGVuZ3RoOylhYS5zaGlmdCgpKCk7XG5yZXR1cm4gYX1mdW5jdGlvbiBCZChhLGIpe3ZhciBjPWIuZ2V0Um9vdE5vZGUoKTtyZXR1cm4gYS5tYXAoZnVuY3Rpb24oYSl7dmFyIGI9Yz09PWEudGFyZ2V0LmdldFJvb3ROb2RlKCk7aWYoYiYmYS5hZGRlZE5vZGVzKXtpZihiPUFycmF5LmZyb20oYS5hZGRlZE5vZGVzKS5maWx0ZXIoZnVuY3Rpb24oYSl7cmV0dXJuIGM9PT1hLmdldFJvb3ROb2RlKCl9KSxiLmxlbmd0aClyZXR1cm4gYT1PYmplY3QuY3JlYXRlKGEpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLFwiYWRkZWROb2Rlc1wiLHt2YWx1ZTpiLGNvbmZpZ3VyYWJsZTohMH0pLGF9ZWxzZSBpZihiKXJldHVybiBhfSkuZmlsdGVyKGZ1bmN0aW9uKGEpe3JldHVybiBhfSl9ZnVuY3Rpb24gT2IoYSl7c3dpdGNoKGEpe2Nhc2UgXCImXCI6cmV0dXJuXCImYW1wO1wiO2Nhc2UgXCI8XCI6cmV0dXJuXCImbHQ7XCI7Y2FzZSBcIj5cIjpyZXR1cm5cIiZndDtcIjtjYXNlICdcIic6cmV0dXJuXCImcXVvdDtcIjtjYXNlIFwiXFx1MDBhMFwiOnJldHVyblwiJm5ic3A7XCJ9fVxuZnVuY3Rpb24gUGIoYSl7Zm9yKHZhciBiPXt9LGM9MDtjPGEubGVuZ3RoO2MrKyliW2FbY11dPSEwO3JldHVybiBifWZ1bmN0aW9uIFJhKGEsYil7XCJ0ZW1wbGF0ZVwiPT09YS5sb2NhbE5hbWUmJihhPWEuY29udGVudCk7Zm9yKHZhciBjPVwiXCIsZD1iP2IoYSk6YS5jaGlsZE5vZGVzLGU9MCxmPWQubGVuZ3RoLGs7ZTxmJiYoaz1kW2VdKTtlKyspe2E6e3ZhciBoPWs7dmFyIHc9YTt2YXIgZz1iO3N3aXRjaChoLm5vZGVUeXBlKXtjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOmZvcih2YXIgbT1oLmxvY2FsTmFtZSxsPVwiPFwiK20scT1oLmF0dHJpYnV0ZXMsbj0wO3c9cVtuXTtuKyspbCs9XCIgXCIrdy5uYW1lKyc9XCInK3cudmFsdWUucmVwbGFjZShDZCxPYikrJ1wiJztsKz1cIj5cIjtoPURkW21dP2w6bCtSYShoLGcpK1wiPC9cIittK1wiPlwiO2JyZWFrIGE7Y2FzZSBOb2RlLlRFWFRfTk9ERTpoPWguZGF0YTtoPXcmJkVkW3cubG9jYWxOYW1lXT9oOmgucmVwbGFjZShGZCxPYik7YnJlYWsgYTtjYXNlIE5vZGUuQ09NTUVOVF9OT0RFOmg9XG5cIlxceDNjIS0tXCIraC5kYXRhK1wiLS1cXHgzZVwiO2JyZWFrIGE7ZGVmYXVsdDp0aHJvdyB3aW5kb3cuY29uc29sZS5lcnJvcihoKSxFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTt9fWMrPWh9cmV0dXJuIGN9ZnVuY3Rpb24gVShhKXtDLmN1cnJlbnROb2RlPWE7cmV0dXJuIEMucGFyZW50Tm9kZSgpfWZ1bmN0aW9uIEthKGEpe0MuY3VycmVudE5vZGU9YTtyZXR1cm4gQy5maXJzdENoaWxkKCl9ZnVuY3Rpb24gTGEoYSl7Qy5jdXJyZW50Tm9kZT1hO3JldHVybiBDLmxhc3RDaGlsZCgpfWZ1bmN0aW9uIFFiKGEpe0MuY3VycmVudE5vZGU9YTtyZXR1cm4gQy5wcmV2aW91c1NpYmxpbmcoKX1mdW5jdGlvbiBSYihhKXtDLmN1cnJlbnROb2RlPWE7cmV0dXJuIEMubmV4dFNpYmxpbmcoKX1mdW5jdGlvbiBTKGEpe3ZhciBiPVtdO0MuY3VycmVudE5vZGU9YTtmb3IoYT1DLmZpcnN0Q2hpbGQoKTthOyliLnB1c2goYSksYT1DLm5leHRTaWJsaW5nKCk7cmV0dXJuIGJ9ZnVuY3Rpb24gU2IoYSl7RC5jdXJyZW50Tm9kZT1cbmE7cmV0dXJuIEQucGFyZW50Tm9kZSgpfWZ1bmN0aW9uIFRiKGEpe0QuY3VycmVudE5vZGU9YTtyZXR1cm4gRC5maXJzdENoaWxkKCl9ZnVuY3Rpb24gVWIoYSl7RC5jdXJyZW50Tm9kZT1hO3JldHVybiBELmxhc3RDaGlsZCgpfWZ1bmN0aW9uIFZiKGEpe0QuY3VycmVudE5vZGU9YTtyZXR1cm4gRC5wcmV2aW91c1NpYmxpbmcoKX1mdW5jdGlvbiBXYihhKXtELmN1cnJlbnROb2RlPWE7cmV0dXJuIEQubmV4dFNpYmxpbmcoKX1mdW5jdGlvbiBYYihhKXt2YXIgYj1bXTtELmN1cnJlbnROb2RlPWE7Zm9yKGE9RC5maXJzdENoaWxkKCk7YTspYi5wdXNoKGEpLGE9RC5uZXh0U2libGluZygpO3JldHVybiBifWZ1bmN0aW9uIFliKGEpe3JldHVybiBSYShhLGZ1bmN0aW9uKGEpe3JldHVybiBTKGEpfSl9ZnVuY3Rpb24gWmIoYSl7c3dpdGNoKGEubm9kZVR5cGUpe2Nhc2UgTm9kZS5FTEVNRU5UX05PREU6Y2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6YT1kb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGEsXG5Ob2RlRmlsdGVyLlNIT1dfVEVYVCxudWxsLCExKTtmb3IodmFyIGI9XCJcIixjO2M9YS5uZXh0Tm9kZSgpOyliKz1jLm5vZGVWYWx1ZTtyZXR1cm4gYjtkZWZhdWx0OnJldHVybiBhLm5vZGVWYWx1ZX19ZnVuY3Rpb24gSyhhLGIsYyl7Zm9yKHZhciBkIGluIGIpe3ZhciBlPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYSxkKTtlJiZlLmNvbmZpZ3VyYWJsZXx8IWUmJmM/T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsZCxiW2RdKTpjJiZjb25zb2xlLndhcm4oXCJDb3VsZCBub3QgZGVmaW5lXCIsZCxcIm9uXCIsYSl9fWZ1bmN0aW9uIFAoYSl7SyhhLCRiKTtLKGEsU2EpO0soYSxUYSl9ZnVuY3Rpb24gYWMoYSxiLGMpe0piKGEpO2M9Y3x8bnVsbDthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTtiLl9fc2hhZHk9Yi5fX3NoYWR5fHx7fTtjJiYoYy5fX3NoYWR5PWMuX19zaGFkeXx8e30pO2EuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc9Yz9jLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nOmIubGFzdENoaWxkO1xudmFyIGQ9YS5fX3NoYWR5LnByZXZpb3VzU2libGluZztkJiZkLl9fc2hhZHkmJihkLl9fc2hhZHkubmV4dFNpYmxpbmc9YSk7KGQ9YS5fX3NoYWR5Lm5leHRTaWJsaW5nPWMpJiZkLl9fc2hhZHkmJihkLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nPWEpO2EuX19zaGFkeS5wYXJlbnROb2RlPWI7Yz9jPT09Yi5fX3NoYWR5LmZpcnN0Q2hpbGQmJihiLl9fc2hhZHkuZmlyc3RDaGlsZD1hKTooYi5fX3NoYWR5Lmxhc3RDaGlsZD1hLGIuX19zaGFkeS5maXJzdENoaWxkfHwoYi5fX3NoYWR5LmZpcnN0Q2hpbGQ9YSkpO2IuX19zaGFkeS5jaGlsZE5vZGVzPW51bGx9ZnVuY3Rpb24gVWEoYSxiLGMpe2lmKGI9PT1hKXRocm93IEVycm9yKFwiRmFpbGVkIHRvIGV4ZWN1dGUgJ2FwcGVuZENoaWxkJyBvbiAnTm9kZSc6IFRoZSBuZXcgY2hpbGQgZWxlbWVudCBjb250YWlucyB0aGUgcGFyZW50LlwiKTtpZihjKXt2YXIgZD1jLl9fc2hhZHkmJmMuX19zaGFkeS5wYXJlbnROb2RlO2lmKHZvaWQgMCE9PWQmJlxuZCE9PWF8fHZvaWQgMD09PWQmJlUoYykhPT1hKXRocm93IEVycm9yKFwiRmFpbGVkIHRvIGV4ZWN1dGUgJ2luc2VydEJlZm9yZScgb24gJ05vZGUnOiBUaGUgbm9kZSBiZWZvcmUgd2hpY2ggdGhlIG5ldyBub2RlIGlzIHRvIGJlIGluc2VydGVkIGlzIG5vdCBhIGNoaWxkIG9mIHRoaXMgbm9kZS5cIik7fWlmKGM9PT1iKXJldHVybiBiO2IucGFyZW50Tm9kZSYmVmEoYi5wYXJlbnROb2RlLGIpO2Q9WihhKTt2YXIgZTtpZihlPWQpYTp7aWYoIWIuX19ub0luc2VydGlvblBvaW50KXt2YXIgZjtcInNsb3RcIj09PWIubG9jYWxOYW1lP2Y9W2JdOmIucXVlcnlTZWxlY3RvckFsbCYmKGY9Yi5xdWVyeVNlbGVjdG9yQWxsKFwic2xvdFwiKSk7aWYoZiYmZi5sZW5ndGgpe2U9ZjticmVhayBhfX1lPXZvaWQgMH0oZj1lKSYmZC5RYShmKTtkJiYoXCJzbG90XCI9PT1hLmxvY2FsTmFtZXx8ZikmJmQuTCgpO2lmKFQoYSkpe2Q9YztJYihhKTthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTt2b2lkIDAhPT1hLl9fc2hhZHkuZmlyc3RDaGlsZCYmXG4oYS5fX3NoYWR5LmNoaWxkTm9kZXM9bnVsbCk7aWYoYi5ub2RlVHlwZT09PU5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSl7Zj1iLmNoaWxkTm9kZXM7Zm9yKGU9MDtlPGYubGVuZ3RoO2UrKylhYyhmW2VdLGEsZCk7Yi5fX3NoYWR5PWIuX19zaGFkeXx8e307ZD12b2lkIDAhPT1iLl9fc2hhZHkuZmlyc3RDaGlsZD9udWxsOnZvaWQgMDtiLl9fc2hhZHkuZmlyc3RDaGlsZD1iLl9fc2hhZHkubGFzdENoaWxkPWQ7Yi5fX3NoYWR5LmNoaWxkTm9kZXM9ZH1lbHNlIGFjKGIsYSxkKTtpZihXYShhKSl7YS5fX3NoYWR5LnJvb3QuTCgpO3ZhciBrPSEwfWVsc2UgYS5fX3NoYWR5LnJvb3QmJihrPSEwKX1rfHwoaz1HKGEpP2EuaG9zdDphLGM/KGM9YmMoYyksWGEuY2FsbChrLGIsYykpOmNjLmNhbGwoayxiKSk7ZGMoYSxiKTtyZXR1cm4gYn1mdW5jdGlvbiBWYShhLGIpe2lmKGIucGFyZW50Tm9kZSE9PWEpdGhyb3cgRXJyb3IoXCJUaGUgbm9kZSB0byBiZSByZW1vdmVkIGlzIG5vdCBhIGNoaWxkIG9mIHRoaXMgbm9kZTogXCIrXG5iKTt2YXIgYz1aKGIpO2lmKFQoYSkpe2IuX19zaGFkeT1iLl9fc2hhZHl8fHt9O2EuX19zaGFkeT1hLl9fc2hhZHl8fHt9O2I9PT1hLl9fc2hhZHkuZmlyc3RDaGlsZCYmKGEuX19zaGFkeS5maXJzdENoaWxkPWIuX19zaGFkeS5uZXh0U2libGluZyk7Yj09PWEuX19zaGFkeS5sYXN0Q2hpbGQmJihhLl9fc2hhZHkubGFzdENoaWxkPWIuX19zaGFkeS5wcmV2aW91c1NpYmxpbmcpO3ZhciBkPWIuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc7dmFyIGU9Yi5fX3NoYWR5Lm5leHRTaWJsaW5nO2QmJihkLl9fc2hhZHk9ZC5fX3NoYWR5fHx7fSxkLl9fc2hhZHkubmV4dFNpYmxpbmc9ZSk7ZSYmKGUuX19zaGFkeT1lLl9fc2hhZHl8fHt9LGUuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc9ZCk7Yi5fX3NoYWR5LnBhcmVudE5vZGU9Yi5fX3NoYWR5LnByZXZpb3VzU2libGluZz1iLl9fc2hhZHkubmV4dFNpYmxpbmc9dm9pZCAwO3ZvaWQgMCE9PWEuX19zaGFkeS5jaGlsZE5vZGVzJiYoYS5fX3NoYWR5LmNoaWxkTm9kZXM9XG5udWxsKTtpZihXYShhKSl7YS5fX3NoYWR5LnJvb3QuTCgpO3ZhciBmPSEwfX1lYyhiKTtjJiYoKGU9YSYmXCJzbG90XCI9PT1hLmxvY2FsTmFtZSkmJihmPSEwKSwoKGQ9Yy5UYShiKSl8fGUpJiZjLkwoKSk7Znx8KGY9RyhhKT9hLmhvc3Q6YSwoIWEuX19zaGFkeS5yb290JiZcInNsb3RcIiE9PWIubG9jYWxOYW1lfHxmPT09VShiKSkmJmJhLmNhbGwoZixiKSk7ZGMoYSxudWxsLGIpO3JldHVybiBifWZ1bmN0aW9uIGVjKGEpe2lmKGEuX19zaGFkeSYmdm9pZCAwIT09YS5fX3NoYWR5Lm1hKWZvcih2YXIgYj1hLmNoaWxkTm9kZXMsYz0wLGQ9Yi5sZW5ndGgsZTtjPGQmJihlPWJbY10pO2MrKyllYyhlKTthLl9fc2hhZHkmJihhLl9fc2hhZHkubWE9dm9pZCAwKX1mdW5jdGlvbiBiYyhhKXt2YXIgYj1hO2EmJlwic2xvdFwiPT09YS5sb2NhbE5hbWUmJihiPShiPWEuX19zaGFkeSYmYS5fX3NoYWR5LlIpJiZiLmxlbmd0aD9iWzBdOmJjKGEubmV4dFNpYmxpbmcpKTtyZXR1cm4gYn1mdW5jdGlvbiBXYShhKXtyZXR1cm4oYT1cbmEmJmEuX19zaGFkeSYmYS5fX3NoYWR5LnJvb3QpJiZhLnRhKCl9ZnVuY3Rpb24gZmMoYSxiKXtcInNsb3RcIj09PWI/KGE9YS5wYXJlbnROb2RlLFdhKGEpJiZhLl9fc2hhZHkucm9vdC5MKCkpOlwic2xvdFwiPT09YS5sb2NhbE5hbWUmJlwibmFtZVwiPT09YiYmKGI9WihhKSkmJihiLlZhKGEpLGIuTCgpKX1mdW5jdGlvbiBkYyhhLGIsYyl7aWYoYT1hLl9fc2hhZHkmJmEuX19zaGFkeS5UKWImJmEuYWRkZWROb2Rlcy5wdXNoKGIpLGMmJmEucmVtb3ZlZE5vZGVzLnB1c2goYyksYS5oYigpfWZ1bmN0aW9uIGdjKGEpe2lmKGEmJmEubm9kZVR5cGUpe2EuX19zaGFkeT1hLl9fc2hhZHl8fHt9O3ZhciBiPWEuX19zaGFkeS5tYTt2b2lkIDA9PT1iJiYoRyhhKT9iPWE6Yj0oYj1hLnBhcmVudE5vZGUpP2djKGIpOmEsY2EuY2FsbChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsYSkmJihhLl9fc2hhZHkubWE9YikpO3JldHVybiBifX1mdW5jdGlvbiBuYShhLGIsYyl7dmFyIGQ9W107aGMoYS5jaGlsZE5vZGVzLFxuYixjLGQpO3JldHVybiBkfWZ1bmN0aW9uIGhjKGEsYixjLGQpe2Zvcih2YXIgZT0wLGY9YS5sZW5ndGgsaztlPGYmJihrPWFbZV0pO2UrKyl7dmFyIGg7aWYoaD1rLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUpe2g9azt2YXIgdz1iLGc9YyxtPWQsbD13KGgpO2wmJm0ucHVzaChoKTtnJiZnKGwpP2g9bDooaGMoaC5jaGlsZE5vZGVzLHcsZyxtKSxoPXZvaWQgMCl9aWYoaClicmVha319ZnVuY3Rpb24gaWMoYSl7YT1hLmdldFJvb3ROb2RlKCk7RyhhKSYmYS52YSgpfWZ1bmN0aW9uIGpjKGEsYixjKXtvYXx8KG9hPXdpbmRvdy5TaGFkeUNTUyYmd2luZG93LlNoYWR5Q1NTLlNjb3BpbmdTaGltKTtvYSYmXCJjbGFzc1wiPT09Yj9vYS5zZXRFbGVtZW50Q2xhc3MoYSxjKTooa2MuY2FsbChhLGIsYyksZmMoYSxiKSl9ZnVuY3Rpb24gbGMoYSxiKXtpZihhLm93bmVyRG9jdW1lbnQhPT1kb2N1bWVudClyZXR1cm4gWWEuY2FsbChkb2N1bWVudCxhLGIpO3ZhciBjPVlhLmNhbGwoZG9jdW1lbnQsXG5hLCExKTtpZihiKXthPWEuY2hpbGROb2RlcztiPTA7Zm9yKHZhciBkO2I8YS5sZW5ndGg7YisrKWQ9bGMoYVtiXSwhMCksYy5hcHBlbmRDaGlsZChkKX1yZXR1cm4gY31mdW5jdGlvbiBaYShhLGIpe3ZhciBjPVtdLGQ9YTtmb3IoYT1hPT09d2luZG93P3dpbmRvdzphLmdldFJvb3ROb2RlKCk7ZDspYy5wdXNoKGQpLGQ9ZC5hc3NpZ25lZFNsb3Q/ZC5hc3NpZ25lZFNsb3Q6ZC5ub2RlVHlwZT09PU5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSYmZC5ob3N0JiYoYnx8ZCE9PWEpP2QuaG9zdDpkLnBhcmVudE5vZGU7Y1tjLmxlbmd0aC0xXT09PWRvY3VtZW50JiZjLnB1c2god2luZG93KTtyZXR1cm4gY31mdW5jdGlvbiBtYyhhLGIpe2lmKCFHKXJldHVybiBhO2E9WmEoYSwhMCk7Zm9yKHZhciBjPTAsZCxlLGYsaztjPGIubGVuZ3RoO2MrKylpZihkPWJbY10sZj1kPT09d2luZG93P3dpbmRvdzpkLmdldFJvb3ROb2RlKCksZiE9PWUmJihrPWEuaW5kZXhPZihmKSxlPWYpLCFHKGYpfHxcbi0xPGspcmV0dXJuIGR9ZnVuY3Rpb24gJGEoYSl7ZnVuY3Rpb24gYihiLGQpe2I9bmV3IGEoYixkKTtiLmVhPWQmJiEhZC5jb21wb3NlZDtyZXR1cm4gYn1BZChiLGEpO2IucHJvdG90eXBlPWEucHJvdG90eXBlO3JldHVybiBifWZ1bmN0aW9uIG5jKGEsYixjKXtpZihjPWIuX19oYW5kbGVycyYmYi5fX2hhbmRsZXJzW2EudHlwZV0mJmIuX19oYW5kbGVyc1thLnR5cGVdW2NdKWZvcih2YXIgZD0wLGU7KGU9Y1tkXSkmJmEudGFyZ2V0IT09YS5yZWxhdGVkVGFyZ2V0JiYoZS5jYWxsKGIsYSksIWEuS2EpO2QrKyk7fWZ1bmN0aW9uIEdkKGEpe3ZhciBiPWEuY29tcG9zZWRQYXRoKCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsXCJjdXJyZW50VGFyZ2V0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiBkfSxjb25maWd1cmFibGU6ITB9KTtmb3IodmFyIGM9Yi5sZW5ndGgtMTswPD1jO2MtLSl7dmFyIGQ9YltjXTtuYyhhLGQsXCJjYXB0dXJlXCIpO2lmKGEuZmEpcmV0dXJufU9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLFxuXCJldmVudFBoYXNlXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBFdmVudC5BVF9UQVJHRVR9fSk7dmFyIGU7Zm9yKGM9MDtjPGIubGVuZ3RoO2MrKyl7ZD1iW2NdO3ZhciBmPWQuX19zaGFkeSYmZC5fX3NoYWR5LnJvb3Q7aWYoMD09PWN8fGYmJmY9PT1lKWlmKG5jKGEsZCxcImJ1YmJsZVwiKSxkIT09d2luZG93JiYoZT1kLmdldFJvb3ROb2RlKCkpLGEuZmEpYnJlYWt9fWZ1bmN0aW9uIG9jKGEsYixjLGQsZSxmKXtmb3IodmFyIGs9MDtrPGEubGVuZ3RoO2srKyl7dmFyIGg9YVtrXSx3PWgudHlwZSxnPWguY2FwdHVyZSxtPWgub25jZSxsPWgucGFzc2l2ZTtpZihiPT09aC5ub2RlJiZjPT09dyYmZD09PWcmJmU9PT1tJiZmPT09bClyZXR1cm4ga31yZXR1cm4tMX1mdW5jdGlvbiBwYyhhLGIsYyl7aWYoYil7aWYoXCJvYmplY3RcIj09PXR5cGVvZiBjKXt2YXIgZD0hIWMuY2FwdHVyZTt2YXIgZT0hIWMub25jZTt2YXIgZj0hIWMucGFzc2l2ZX1lbHNlIGQ9ISFjLGY9ZT0hMTt2YXIgaz1jJiZjLmdhfHxcbnRoaXMsaD1iW2RhXTtpZihoKXtpZigtMTxvYyhoLGssYSxkLGUsZikpcmV0dXJufWVsc2UgYltkYV09W107aD1mdW5jdGlvbihkKXtlJiZ0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYSxiLGMpO2QuX190YXJnZXR8fHFjKGQpO2lmKGshPT10aGlzKXt2YXIgZj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGQsXCJjdXJyZW50VGFyZ2V0XCIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShkLFwiY3VycmVudFRhcmdldFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4ga30sY29uZmlndXJhYmxlOiEwfSl9aWYoZC5jb21wb3NlZHx8LTE8ZC5jb21wb3NlZFBhdGgoKS5pbmRleE9mKGspKWlmKGQudGFyZ2V0PT09ZC5yZWxhdGVkVGFyZ2V0KWQuZXZlbnRQaGFzZT09PUV2ZW50LkJVQkJMSU5HX1BIQVNFJiZkLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO2Vsc2UgaWYoZC5ldmVudFBoYXNlPT09RXZlbnQuQ0FQVFVSSU5HX1BIQVNFfHxkLmJ1YmJsZXN8fGQudGFyZ2V0PT09ayl7dmFyIGg9XG5cIm9iamVjdFwiPT09dHlwZW9mIGImJmIuaGFuZGxlRXZlbnQ/Yi5oYW5kbGVFdmVudChkKTpiLmNhbGwoayxkKTtrIT09dGhpcyYmKGY/KE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkLFwiY3VycmVudFRhcmdldFwiLGYpLGY9bnVsbCk6ZGVsZXRlIGQuY3VycmVudFRhcmdldCk7cmV0dXJuIGh9fTtiW2RhXS5wdXNoKHtub2RlOnRoaXMsdHlwZTphLGNhcHR1cmU6ZCxvbmNlOmUscGFzc2l2ZTpmLGxiOmh9KTthYlthXT8odGhpcy5fX2hhbmRsZXJzPXRoaXMuX19oYW5kbGVyc3x8e30sdGhpcy5fX2hhbmRsZXJzW2FdPXRoaXMuX19oYW5kbGVyc1thXXx8e2NhcHR1cmU6W10sYnViYmxlOltdfSx0aGlzLl9faGFuZGxlcnNbYV1bZD9cImNhcHR1cmVcIjpcImJ1YmJsZVwiXS5wdXNoKGgpKToodGhpcyBpbnN0YW5jZW9mIFdpbmRvdz9yYzpzYykuY2FsbCh0aGlzLGEsaCxjKX19ZnVuY3Rpb24gdGMoYSxiLGMpe2lmKGIpe2lmKFwib2JqZWN0XCI9PT10eXBlb2YgYyl7dmFyIGQ9ISFjLmNhcHR1cmU7dmFyIGU9XG4hIWMub25jZTt2YXIgZj0hIWMucGFzc2l2ZX1lbHNlIGQ9ISFjLGY9ZT0hMTt2YXIgaz1jJiZjLmdhfHx0aGlzLGg9dm9pZCAwO3ZhciBnPW51bGw7dHJ5e2c9YltkYV19Y2F0Y2gocil7fWcmJihlPW9jKGcsayxhLGQsZSxmKSwtMTxlJiYoaD1nLnNwbGljZShlLDEpWzBdLmxiLGcubGVuZ3RofHwoYltkYV09dm9pZCAwKSkpOyh0aGlzIGluc3RhbmNlb2YgV2luZG93P3VjOnZjKS5jYWxsKHRoaXMsYSxofHxiLGMpO2gmJmFiW2FdJiZ0aGlzLl9faGFuZGxlcnMmJnRoaXMuX19oYW5kbGVyc1thXSYmKGE9dGhpcy5fX2hhbmRsZXJzW2FdW2Q/XCJjYXB0dXJlXCI6XCJidWJibGVcIl0saD1hLmluZGV4T2YoaCksLTE8aCYmYS5zcGxpY2UoaCwxKSl9fWZ1bmN0aW9uIEhkKCl7Zm9yKHZhciBhIGluIGFiKXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGEsZnVuY3Rpb24oYSl7YS5fX3RhcmdldHx8KHFjKGEpLEdkKGEpKX0sITApfWZ1bmN0aW9uIHFjKGEpe2EuX190YXJnZXQ9YS50YXJnZXQ7YS5yYT1cbmEucmVsYXRlZFRhcmdldDtpZihFLlMpe3ZhciBiPXdjLGM9T2JqZWN0LmdldFByb3RvdHlwZU9mKGEpO2lmKCFjLmhhc093blByb3BlcnR5KFwiX19wYXRjaFByb3RvXCIpKXt2YXIgZD1PYmplY3QuY3JlYXRlKGMpO2QubmI9YztNYShkLGIpO2MuX19wYXRjaFByb3RvPWR9YS5fX3Byb3RvX189Yy5fX3BhdGNoUHJvdG99ZWxzZSBNYShhLHdjKX1mdW5jdGlvbiBlYShhLGIpe3JldHVybntpbmRleDphLFU6W10sVzpifX1mdW5jdGlvbiBJZChhLGIsYyxkKXt2YXIgZT0wLGY9MCxrPTAsaD0wLGc9TWF0aC5taW4oYi1lLGQtZik7aWYoMD09ZSYmMD09ZilhOntmb3Ioaz0wO2s8ZztrKyspaWYoYVtrXSE9PWNba10pYnJlYWsgYTtrPWd9aWYoYj09YS5sZW5ndGgmJmQ9PWMubGVuZ3RoKXtoPWEubGVuZ3RoO2Zvcih2YXIgcj1jLmxlbmd0aCxtPTA7bTxnLWsmJkpkKGFbLS1oXSxjWy0tcl0pOyltKys7aD1tfWUrPWs7Zis9aztiLT1oO2QtPWg7aWYoMD09Yi1lJiYwPT1kLWYpcmV0dXJuW107XG5pZihlPT1iKXtmb3IoYj1lYShlLDApO2Y8ZDspYi5VLnB1c2goY1tmKytdKTtyZXR1cm5bYl19aWYoZj09ZClyZXR1cm5bZWEoZSxiLWUpXTtnPWU7az1mO2Q9ZC1rKzE7aD1iLWcrMTtiPUFycmF5KGQpO2ZvcihyPTA7cjxkO3IrKyliW3JdPUFycmF5KGgpLGJbcl1bMF09cjtmb3Iocj0wO3I8aDtyKyspYlswXVtyXT1yO2ZvcihyPTE7cjxkO3IrKylmb3IobT0xO208aDttKyspaWYoYVtnK20tMV09PT1jW2srci0xXSliW3JdW21dPWJbci0xXVttLTFdO2Vsc2V7dmFyIGw9YltyLTFdW21dKzEsbj1iW3JdW20tMV0rMTtiW3JdW21dPWw8bj9sOm59Zz1iLmxlbmd0aC0xO2s9YlswXS5sZW5ndGgtMTtkPWJbZ11ba107Zm9yKGE9W107MDxnfHwwPGs7KTA9PWc/KGEucHVzaCgyKSxrLS0pOjA9PWs/KGEucHVzaCgzKSxnLS0pOihoPWJbZy0xXVtrLTFdLHI9YltnLTFdW2tdLG09YltnXVtrLTFdLGw9cjxtP3I8aD9yOmg6bTxoP206aCxsPT1oPyhoPT1kP2EucHVzaCgwKTooYS5wdXNoKDEpLFxuZD1oKSxnLS0say0tKTpsPT1yPyhhLnB1c2goMyksZy0tLGQ9cik6KGEucHVzaCgyKSxrLS0sZD1tKSk7YS5yZXZlcnNlKCk7Yj12b2lkIDA7Zz1bXTtmb3Ioaz0wO2s8YS5sZW5ndGg7aysrKXN3aXRjaChhW2tdKXtjYXNlIDA6YiYmKGcucHVzaChiKSxiPXZvaWQgMCk7ZSsrO2YrKzticmVhaztjYXNlIDE6Ynx8KGI9ZWEoZSwwKSk7Yi5XKys7ZSsrO2IuVS5wdXNoKGNbZl0pO2YrKzticmVhaztjYXNlIDI6Ynx8KGI9ZWEoZSwwKSk7Yi5XKys7ZSsrO2JyZWFrO2Nhc2UgMzpifHwoYj1lYShlLDApKSxiLlUucHVzaChjW2ZdKSxmKyt9YiYmZy5wdXNoKGIpO3JldHVybiBnfWZ1bmN0aW9uIEpkKGEsYil7cmV0dXJuIGE9PT1ifWZ1bmN0aW9uIHhjKGEpe3ZhciBiPVtdO2RvIGIudW5zaGlmdChhKTt3aGlsZShhPWEucGFyZW50Tm9kZSk7cmV0dXJuIGJ9ZnVuY3Rpb24geWMoYSl7aWMoYSk7cmV0dXJuIGEuX19zaGFkeSYmYS5fX3NoYWR5LmFzc2lnbmVkU2xvdHx8bnVsbH1mdW5jdGlvbiBMKGEsXG5iKXtmb3IodmFyIGM9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYiksZD0wO2Q8Yy5sZW5ndGg7ZCsrKXt2YXIgZT1jW2RdLGY9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiLGUpO2YudmFsdWU/YVtlXT1mLnZhbHVlOk9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLGUsZil9fWZ1bmN0aW9uIEtkKCl7dmFyIGE9d2luZG93LmN1c3RvbUVsZW1lbnRzJiZ3aW5kb3cuY3VzdG9tRWxlbWVudHMubmF0aXZlSFRNTEVsZW1lbnR8fEhUTUxFbGVtZW50O0wod2luZG93Lk5vZGUucHJvdG90eXBlLExkKTtMKHdpbmRvdy5XaW5kb3cucHJvdG90eXBlLE1kKTtMKHdpbmRvdy5UZXh0LnByb3RvdHlwZSxOZCk7TCh3aW5kb3cuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUsYmIpO0wod2luZG93LkVsZW1lbnQucHJvdG90eXBlLHpjKTtMKHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUsQWMpO3dpbmRvdy5IVE1MU2xvdEVsZW1lbnQmJkwod2luZG93LkhUTUxTbG90RWxlbWVudC5wcm90b3R5cGUsXG5CYyk7TChhLnByb3RvdHlwZSxPZCk7RS5TJiYoUCh3aW5kb3cuTm9kZS5wcm90b3R5cGUpLFAod2luZG93LlRleHQucHJvdG90eXBlKSxQKHdpbmRvdy5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZSksUCh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUpLFAoYS5wcm90b3R5cGUpLFAod2luZG93LkRvY3VtZW50LnByb3RvdHlwZSksd2luZG93LkhUTUxTbG90RWxlbWVudCYmUCh3aW5kb3cuSFRNTFNsb3RFbGVtZW50LnByb3RvdHlwZSkpfWZ1bmN0aW9uIENjKGEpe3ZhciBiPVBkLmhhcyhhKTthPS9eW2Etel1bLjAtOV9hLXpdKi1bXFwtLjAtOV9hLXpdKiQvLnRlc3QoYSk7cmV0dXJuIWImJmF9ZnVuY3Rpb24gdChhKXt2YXIgYj1hLmlzQ29ubmVjdGVkO2lmKHZvaWQgMCE9PWIpcmV0dXJuIGI7Zm9yKDthJiYhKGEuX19DRV9pc0ltcG9ydERvY3VtZW50fHxhIGluc3RhbmNlb2YgRG9jdW1lbnQpOylhPWEucGFyZW50Tm9kZXx8KHdpbmRvdy5TaGFkb3dSb290JiZhIGluc3RhbmNlb2YgU2hhZG93Um9vdD9cbmEuaG9zdDp2b2lkIDApO3JldHVybiEoIWF8fCEoYS5fX0NFX2lzSW1wb3J0RG9jdW1lbnR8fGEgaW5zdGFuY2VvZiBEb2N1bWVudCkpfWZ1bmN0aW9uIGNiKGEsYil7Zm9yKDtiJiZiIT09YSYmIWIubmV4dFNpYmxpbmc7KWI9Yi5wYXJlbnROb2RlO3JldHVybiBiJiZiIT09YT9iLm5leHRTaWJsaW5nOm51bGx9ZnVuY3Rpb24gTyhhLGIsYyl7Yz1jP2M6bmV3IFNldDtmb3IodmFyIGQ9YTtkOyl7aWYoZC5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFKXt2YXIgZT1kO2IoZSk7dmFyIGY9ZS5sb2NhbE5hbWU7aWYoXCJsaW5rXCI9PT1mJiZcImltcG9ydFwiPT09ZS5nZXRBdHRyaWJ1dGUoXCJyZWxcIikpe2Q9ZS5pbXBvcnQ7aWYoZCBpbnN0YW5jZW9mIE5vZGUmJiFjLmhhcyhkKSlmb3IoYy5hZGQoZCksZD1kLmZpcnN0Q2hpbGQ7ZDtkPWQubmV4dFNpYmxpbmcpTyhkLGIsYyk7ZD1jYihhLGUpO2NvbnRpbnVlfWVsc2UgaWYoXCJ0ZW1wbGF0ZVwiPT09Zil7ZD1jYihhLGUpO2NvbnRpbnVlfWlmKGU9XG5lLl9fQ0Vfc2hhZG93Um9vdClmb3IoZT1lLmZpcnN0Q2hpbGQ7ZTtlPWUubmV4dFNpYmxpbmcpTyhlLGIsYyl9ZD1kLmZpcnN0Q2hpbGQ/ZC5maXJzdENoaWxkOmNiKGEsZCl9fWZ1bmN0aW9uIHgoYSxiLGMpe2FbYl09Y31mdW5jdGlvbiBkYihhKXthPWEucmVwbGFjZShGLllhLFwiXCIpLnJlcGxhY2UoRi5wb3J0LFwiXCIpO3ZhciBiPURjLGM9YSxkPW5ldyBCYTtkLnN0YXJ0PTA7ZC5lbmQ9Yy5sZW5ndGg7Zm9yKHZhciBlPWQsZj0wLGs9Yy5sZW5ndGg7ZjxrO2YrKylpZihcIntcIj09PWNbZl0pe2UucnVsZXN8fChlLnJ1bGVzPVtdKTt2YXIgaD1lLGc9aC5ydWxlc1toLnJ1bGVzLmxlbmd0aC0xXXx8bnVsbDtlPW5ldyBCYTtlLnN0YXJ0PWYrMTtlLnBhcmVudD1oO2UucHJldmlvdXM9ZztoLnJ1bGVzLnB1c2goZSl9ZWxzZVwifVwiPT09Y1tmXSYmKGUuZW5kPWYrMSxlPWUucGFyZW50fHxkKTtyZXR1cm4gYihkLGEpfWZ1bmN0aW9uIERjKGEsYil7dmFyIGM9Yi5zdWJzdHJpbmcoYS5zdGFydCxcbmEuZW5kLTEpO2EucGFyc2VkQ3NzVGV4dD1hLmNzc1RleHQ9Yy50cmltKCk7YS5wYXJlbnQmJihjPWIuc3Vic3RyaW5nKGEucHJldmlvdXM/YS5wcmV2aW91cy5lbmQ6YS5wYXJlbnQuc3RhcnQsYS5zdGFydC0xKSxjPVFkKGMpLGM9Yy5yZXBsYWNlKEYuQmEsXCIgXCIpLGM9Yy5zdWJzdHJpbmcoYy5sYXN0SW5kZXhPZihcIjtcIikrMSksYz1hLnBhcnNlZFNlbGVjdG9yPWEuc2VsZWN0b3I9Yy50cmltKCksYS5hdFJ1bGU9MD09PWMuaW5kZXhPZihcIkBcIiksYS5hdFJ1bGU/MD09PWMuaW5kZXhPZihcIkBtZWRpYVwiKT9hLnR5cGU9SS5NRURJQV9SVUxFOmMubWF0Y2goRi5jYikmJihhLnR5cGU9SS5kYSxhLmtleWZyYW1lc05hbWU9YS5zZWxlY3Rvci5zcGxpdChGLkJhKS5wb3AoKSk6YS50eXBlPTA9PT1jLmluZGV4T2YoXCItLVwiKT9JLm5hOkkuU1RZTEVfUlVMRSk7aWYoYz1hLnJ1bGVzKWZvcih2YXIgZD0wLGU9Yy5sZW5ndGgsZjtkPGUmJihmPWNbZF0pO2QrKylEYyhmLGIpO3JldHVybiBhfWZ1bmN0aW9uIFFkKGEpe3JldHVybiBhLnJlcGxhY2UoL1xcXFwoWzAtOWEtZl17MSw2fSlcXHMvZ2ksXG5mdW5jdGlvbihhLGMpe2E9Yztmb3IoYz02LWEubGVuZ3RoO2MtLTspYT1cIjBcIithO3JldHVyblwiXFxcXFwiK2F9KX1mdW5jdGlvbiBFYyhhLGIsYyl7Yz12b2lkIDA9PT1jP1wiXCI6Yzt2YXIgZD1cIlwiO2lmKGEuY3NzVGV4dHx8YS5ydWxlcyl7dmFyIGU9YS5ydWxlcyxmO2lmKGY9ZSlmPWVbMF0sZj0hKGYmJmYuc2VsZWN0b3ImJjA9PT1mLnNlbGVjdG9yLmluZGV4T2YoXCItLVwiKSk7aWYoZil7Zj0wO2Zvcih2YXIgaz1lLmxlbmd0aCxoO2Y8ayYmKGg9ZVtmXSk7ZisrKWQ9RWMoaCxiLGQpfWVsc2UgYj9iPWEuY3NzVGV4dDooYj1hLmNzc1RleHQsYj1iLnJlcGxhY2UoRi53YSxcIlwiKS5yZXBsYWNlKEYuQWEsXCJcIiksYj1iLnJlcGxhY2UoRi5lYixcIlwiKS5yZXBsYWNlKEYuamIsXCJcIikpLChkPWIudHJpbSgpKSYmKGQ9XCIgIFwiK2QrXCJcXG5cIil9ZCYmKGEuc2VsZWN0b3ImJihjKz1hLnNlbGVjdG9yK1wiIHtcXG5cIiksYys9ZCxhLnNlbGVjdG9yJiYoYys9XCJ9XFxuXFxuXCIpKTtyZXR1cm4gY31mdW5jdGlvbiBGYyhhKXtBPVxuYSYmYS5zaGltY3NzcHJvcGVydGllcz8hMTp6fHwhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvNjAxfEVkZ2VcXC8xNS8pfHwhd2luZG93LkNTU3x8IUNTUy5zdXBwb3J0c3x8IUNTUy5zdXBwb3J0cyhcImJveC1zaGFkb3dcIixcIjAgMCAwIHZhcigtLWZvbylcIikpfWZ1bmN0aW9uIFYoYSxiKXtpZighYSlyZXR1cm5cIlwiO1wic3RyaW5nXCI9PT10eXBlb2YgYSYmKGE9ZGIoYSkpO2ImJlcoYSxiKTtyZXR1cm4gRWMoYSxBKX1mdW5jdGlvbiBwYShhKXshYS5fX2Nzc1J1bGVzJiZhLnRleHRDb250ZW50JiYoYS5fX2Nzc1J1bGVzPWRiKGEudGV4dENvbnRlbnQpKTtyZXR1cm4gYS5fX2Nzc1J1bGVzfHxudWxsfWZ1bmN0aW9uIEdjKGEpe3JldHVybiEhYS5wYXJlbnQmJmEucGFyZW50LnR5cGU9PT1JLmRhfWZ1bmN0aW9uIFcoYSxiLGMsZCl7aWYoYSl7dmFyIGU9ITEsZj1hLnR5cGU7aWYoZCYmZj09PUkuTUVESUFfUlVMRSl7dmFyIGs9YS5zZWxlY3Rvci5tYXRjaChSZCk7XG5rJiYod2luZG93Lm1hdGNoTWVkaWEoa1sxXSkubWF0Y2hlc3x8KGU9ITApKX1mPT09SS5TVFlMRV9SVUxFP2IoYSk6YyYmZj09PUkuZGE/YyhhKTpmPT09SS5uYSYmKGU9ITApO2lmKChhPWEucnVsZXMpJiYhZSl7ZT0wO2Y9YS5sZW5ndGg7Zm9yKHZhciBoO2U8ZiYmKGg9YVtlXSk7ZSsrKVcoaCxiLGMsZCl9fX1mdW5jdGlvbiBlYihhLGIsYyxkKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7YiYmZS5zZXRBdHRyaWJ1dGUoXCJzY29wZVwiLGIpO2UudGV4dENvbnRlbnQ9YTtIYyhlLGMsZCk7cmV0dXJuIGV9ZnVuY3Rpb24gSGMoYSxiLGMpe2I9Ynx8ZG9jdW1lbnQuaGVhZDtiLmluc2VydEJlZm9yZShhLGMmJmMubmV4dFNpYmxpbmd8fGIuZmlyc3RDaGlsZCk7UT9hLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKFEpPT09Tm9kZS5ET0NVTUVOVF9QT1NJVElPTl9QUkVDRURJTkcmJihRPWEpOlE9YX1mdW5jdGlvbiBJYyhhLGIpe3ZhciBjPWEuaW5kZXhPZihcInZhcihcIik7XG5pZigtMT09PWMpcmV0dXJuIGIoYSxcIlwiLFwiXCIsXCJcIik7YTp7dmFyIGQ9MDt2YXIgZT1jKzM7Zm9yKHZhciBmPWEubGVuZ3RoO2U8ZjtlKyspaWYoXCIoXCI9PT1hW2VdKWQrKztlbHNlIGlmKFwiKVwiPT09YVtlXSYmMD09PS0tZClicmVhayBhO2U9LTF9ZD1hLnN1YnN0cmluZyhjKzQsZSk7Yz1hLnN1YnN0cmluZygwLGMpO2E9SWMoYS5zdWJzdHJpbmcoZSsxKSxiKTtlPWQuaW5kZXhPZihcIixcIik7cmV0dXJuLTE9PT1lP2IoYyxkLnRyaW0oKSxcIlwiLGEpOmIoYyxkLnN1YnN0cmluZygwLGUpLnRyaW0oKSxkLnN1YnN0cmluZyhlKzEpLnRyaW0oKSxhKX1mdW5jdGlvbiBxYShhLGIpe3o/YS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGIpOndpbmRvdy5TaGFkeURPTS5uYXRpdmVNZXRob2RzLnNldEF0dHJpYnV0ZS5jYWxsKGEsXCJjbGFzc1wiLGIpfWZ1bmN0aW9uIFIoYSl7dmFyIGI9YS5sb2NhbE5hbWUsYz1cIlwiO2I/LTE8Yi5pbmRleE9mKFwiLVwiKXx8KGM9YixiPWEuZ2V0QXR0cmlidXRlJiZhLmdldEF0dHJpYnV0ZShcImlzXCIpfHxcblwiXCIpOihiPWEuaXMsYz1hLmV4dGVuZHMpO3JldHVybntpczpiLFY6Y319ZnVuY3Rpb24gSmMoYSl7Zm9yKHZhciBiPTA7YjxhLmxlbmd0aDtiKyspe3ZhciBjPWFbYl07aWYoYy50YXJnZXQhPT1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQmJmMudGFyZ2V0IT09ZG9jdW1lbnQuaGVhZClmb3IodmFyIGQ9MDtkPGMuYWRkZWROb2Rlcy5sZW5ndGg7ZCsrKXt2YXIgZT1jLmFkZGVkTm9kZXNbZF07aWYoZS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFKXt2YXIgZj1lLmdldFJvb3ROb2RlKCk7dmFyIGs9ZTt2YXIgaD1bXTtrLmNsYXNzTGlzdD9oPUFycmF5LmZyb20oay5jbGFzc0xpc3QpOmsgaW5zdGFuY2VvZiB3aW5kb3cuU1ZHRWxlbWVudCYmay5oYXNBdHRyaWJ1dGUoXCJjbGFzc1wiKSYmKGg9ay5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5zcGxpdCgvXFxzKy8pKTtrPWg7aD1rLmluZGV4T2YocC5hKTtpZigoaz0tMTxoP2tbaCsxXTpcIlwiKSYmZj09PWUub3duZXJEb2N1bWVudClwLmIoZSxcbmssITApO2Vsc2UgaWYoZi5ub2RlVHlwZT09PU5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSYmKGY9Zi5ob3N0KSlpZihmPVIoZikuaXMsaz09PWYpZm9yKGU9d2luZG93LlNoYWR5RE9NLm5hdGl2ZU1ldGhvZHMucXVlcnlTZWxlY3RvckFsbC5jYWxsKGUsXCI6bm90KC5cIitwLmErXCIpXCIpLGY9MDtmPGUubGVuZ3RoO2YrKylwLmgoZVtmXSxrKTtlbHNlIGsmJnAuYihlLGssITApLHAuYihlLGYpfX19fWZ1bmN0aW9uIFNkKGEpe2lmKGE9cmFbYV0pYS5fYXBwbHlTaGltQ3VycmVudFZlcnNpb249YS5fYXBwbHlTaGltQ3VycmVudFZlcnNpb258fDAsYS5fYXBwbHlTaGltVmFsaWRhdGluZ1ZlcnNpb249YS5fYXBwbHlTaGltVmFsaWRhdGluZ1ZlcnNpb258fDAsYS5fYXBwbHlTaGltTmV4dFZlcnNpb249KGEuX2FwcGx5U2hpbU5leHRWZXJzaW9ufHwwKSsxfWZ1bmN0aW9uIEtjKGEpe3JldHVybiBhLl9hcHBseVNoaW1DdXJyZW50VmVyc2lvbj09PWEuX2FwcGx5U2hpbU5leHRWZXJzaW9ufVxuZnVuY3Rpb24gVGQoYSl7YS5fYXBwbHlTaGltVmFsaWRhdGluZ1ZlcnNpb249YS5fYXBwbHlTaGltTmV4dFZlcnNpb247YS5ifHwoYS5iPSEwLFVkLnRoZW4oZnVuY3Rpb24oKXthLl9hcHBseVNoaW1DdXJyZW50VmVyc2lvbj1hLl9hcHBseVNoaW1OZXh0VmVyc2lvbjthLmI9ITF9KSl9ZnVuY3Rpb24gdWIoYSl7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7TGM/TGMoYSk6KGZifHwoZmI9bmV3IFByb21pc2UoZnVuY3Rpb24oYSl7Z2I9YX0pLFwiY29tcGxldGVcIj09PWRvY3VtZW50LnJlYWR5U3RhdGU/Z2IoKTpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGZ1bmN0aW9uKCl7XCJjb21wbGV0ZVwiPT09ZG9jdW1lbnQucmVhZHlTdGF0ZSYmZ2IoKX0pKSxmYi50aGVuKGZ1bmN0aW9uKCl7YSYmYSgpfSkpfSl9KGZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSxiKXtpZihcImZ1bmN0aW9uXCI9PT10eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50KXJldHVybiBuZXcgQ3VzdG9tRXZlbnQoYSxcbmIpO3ZhciBjPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7Yy5pbml0Q3VzdG9tRXZlbnQoYSwhIWIuYnViYmxlcywhIWIuY2FuY2VsYWJsZSxiLmRldGFpbCk7cmV0dXJuIGN9ZnVuY3Rpb24gYyhhKXtpZihtKXJldHVybiBhLm93bmVyRG9jdW1lbnQhPT1kb2N1bWVudD9hLm93bmVyRG9jdW1lbnQ6bnVsbDt2YXIgYj1hLl9faW1wb3J0RG9jO2lmKCFiJiZhLnBhcmVudE5vZGUpe2I9YS5wYXJlbnROb2RlO2lmKFwiZnVuY3Rpb25cIj09PXR5cGVvZiBiLmNsb3Nlc3QpYj1iLmNsb3Nlc3QoXCJsaW5rW3JlbD1pbXBvcnRdXCIpO2Vsc2UgZm9yKDshaChiKSYmKGI9Yi5wYXJlbnROb2RlKTspO2EuX19pbXBvcnREb2M9Yn1yZXR1cm4gYn1mdW5jdGlvbiBkKGEpe3ZhciBiPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rW3JlbD1pbXBvcnRdOm5vdChbaW1wb3J0LWRlcGVuZGVuY3ldKVwiKSxjPWIubGVuZ3RoO2M/bChiLGZ1bmN0aW9uKGIpe3JldHVybiBrKGIsZnVuY3Rpb24oKXswPT09XG4tLWMmJmEoKX0pfSk6YSgpfWZ1bmN0aW9uIGUoYSl7ZnVuY3Rpb24gYigpe1wibG9hZGluZ1wiIT09ZG9jdW1lbnQucmVhZHlTdGF0ZSYmZG9jdW1lbnQuYm9keSYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsYiksYSgpKX1kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGIpO2IoKX1mdW5jdGlvbiBmKGEpe2UoZnVuY3Rpb24oKXtyZXR1cm4gZChmdW5jdGlvbigpe3JldHVybiBhJiZhKCl9KX0pfWZ1bmN0aW9uIGsoYSxiKXtpZihhLl9fbG9hZGVkKWImJmIoKTtlbHNlIGlmKFwic2NyaXB0XCI9PT1hLmxvY2FsTmFtZSYmIWEuc3JjfHxcInN0eWxlXCI9PT1hLmxvY2FsTmFtZSYmIWEuZmlyc3RDaGlsZClhLl9fbG9hZGVkPSEwLGImJmIoKTtlbHNle3ZhciBjPWZ1bmN0aW9uKGQpe2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihkLnR5cGUsYyk7YS5fX2xvYWRlZD0hMDtiJiZiKCl9O2EuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixcbmMpO3omJlwic3R5bGVcIj09PWEubG9jYWxOYW1lfHxhLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGMpfX1mdW5jdGlvbiBoKGEpe3JldHVybiBhLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUmJlwibGlua1wiPT09YS5sb2NhbE5hbWUmJlwiaW1wb3J0XCI9PT1hLnJlbH1mdW5jdGlvbiBnKCl7dmFyIGE9dGhpczt0aGlzLmE9e307dGhpcy5iPTA7dGhpcy5mPW5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKGIpe3JldHVybiBhLmwoYil9KTt0aGlzLmYub2JzZXJ2ZShkb2N1bWVudC5oZWFkLHtjaGlsZExpc3Q6ITAsc3VidHJlZTohMH0pO3RoaXMuYyhkb2N1bWVudCl9ZnVuY3Rpb24gbChhLGIsYyl7dmFyIGQ9YT9hLmxlbmd0aDowLGU9Yz8tMToxO2ZvcihjPWM/ZC0xOjA7YzxkJiYwPD1jO2MrPWUpYihhW2NdLGMpfXZhciBtPVwiaW1wb3J0XCJpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKSxuPW51bGw7ITE9PT1cImN1cnJlbnRTY3JpcHRcImluIGRvY3VtZW50JiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZG9jdW1lbnQsXG5cImN1cnJlbnRTY3JpcHRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG58fChcImNvbXBsZXRlXCIhPT1kb2N1bWVudC5yZWFkeVN0YXRlP2RvY3VtZW50LnNjcmlwdHNbZG9jdW1lbnQuc2NyaXB0cy5sZW5ndGgtMV06bnVsbCl9LGNvbmZpZ3VyYWJsZTohMH0pO3ZhciBxPS8odXJsXFwoKShbXildKikoXFwpKS9nLHQ9LyhAaW1wb3J0W1xcc10rKD8hdXJsXFwoKSkoW147XSopKDspL2csdT0vKDxsaW5rW14+XSopKHJlbD1bJ3xcIl0/c3R5bGVzaGVldFsnfFwiXT9bXj5dKj4pL2cscD17WmE6ZnVuY3Rpb24oYSxiKXthLmhyZWYmJmEuc2V0QXR0cmlidXRlKFwiaHJlZlwiLHAuJChhLmdldEF0dHJpYnV0ZShcImhyZWZcIiksYikpO2Euc3JjJiZhLnNldEF0dHJpYnV0ZShcInNyY1wiLHAuJChhLmdldEF0dHJpYnV0ZShcInNyY1wiKSxiKSk7aWYoXCJzdHlsZVwiPT09YS5sb2NhbE5hbWUpe3ZhciBjPXAuQ2EoYS50ZXh0Q29udGVudCxiLHEpO2EudGV4dENvbnRlbnQ9cC5DYShjLGIsdCl9fSxDYTpmdW5jdGlvbihhLFxuYixjKXtyZXR1cm4gYS5yZXBsYWNlKGMsZnVuY3Rpb24oYSxjLGQsZSl7YT1kLnJlcGxhY2UoL1tcIiddL2csXCJcIik7YiYmKGE9cC4kKGEsYikpO3JldHVybiBjK1wiJ1wiK2ErXCInXCIrZX0pfSwkOmZ1bmN0aW9uKGEsYil7aWYodm9pZCAwPT09cC5oYSl7cC5oYT0hMTt0cnl7dmFyIGM9bmV3IFVSTChcImJcIixcImh0dHA6Ly9hXCIpO2MucGF0aG5hbWU9XCJjJTIwZFwiO3AuaGE9XCJodHRwOi8vYS9jJTIwZFwiPT09Yy5ocmVmfWNhdGNoKHNlKXt9fWlmKHAuaGEpcmV0dXJuKG5ldyBVUkwoYSxiKSkuaHJlZjtjPXAuUGE7Y3x8KGM9ZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KFwidGVtcFwiKSxwLlBhPWMsYy5wYT1jLmNyZWF0ZUVsZW1lbnQoXCJiYXNlXCIpLGMuaGVhZC5hcHBlbmRDaGlsZChjLnBhKSxjLm9hPWMuY3JlYXRlRWxlbWVudChcImFcIikpO2MucGEuaHJlZj1iO2Mub2EuaHJlZj1hO3JldHVybiBjLm9hLmhyZWZ8fGF9fSx2PXthc3luYzohMCxsb2FkOmZ1bmN0aW9uKGEsXG5iLGMpe2lmKGEpaWYoYS5tYXRjaCgvXmRhdGE6Lykpe2E9YS5zcGxpdChcIixcIik7dmFyIGQ9YVsxXTtkPS0xPGFbMF0uaW5kZXhPZihcIjtiYXNlNjRcIik/YXRvYihkKTpkZWNvZGVVUklDb21wb25lbnQoZCk7YihkKX1lbHNle3ZhciBlPW5ldyBYTUxIdHRwUmVxdWVzdDtlLm9wZW4oXCJHRVRcIixhLHYuYXN5bmMpO2Uub25sb2FkPWZ1bmN0aW9uKCl7dmFyIGE9ZS5yZXNwb25zZVVSTHx8ZS5nZXRSZXNwb25zZUhlYWRlcihcIkxvY2F0aW9uXCIpO2EmJjA9PT1hLmluZGV4T2YoXCIvXCIpJiYoYT0obG9jYXRpb24ub3JpZ2lufHxsb2NhdGlvbi5wcm90b2NvbCtcIi8vXCIrbG9jYXRpb24uaG9zdCkrYSk7dmFyIGQ9ZS5yZXNwb25zZXx8ZS5yZXNwb25zZVRleHQ7MzA0PT09ZS5zdGF0dXN8fDA9PT1lLnN0YXR1c3x8MjAwPD1lLnN0YXR1cyYmMzAwPmUuc3RhdHVzP2IoZCxhKTpjKGQpfTtlLnNlbmQoKX1lbHNlIGMoXCJlcnJvcjogaHJlZiBtdXN0IGJlIHNwZWNpZmllZFwiKX19LHo9L1RyaWRlbnQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCl8fFxuL0VkZ2VcXC9cXGQuL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtnLnByb3RvdHlwZS5jPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7YT1hLnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rW3JlbD1pbXBvcnRdXCIpO2woYSxmdW5jdGlvbihhKXtyZXR1cm4gYi5oKGEpfSl9O2cucHJvdG90eXBlLmg9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcyxjPWEuaHJlZjtpZih2b2lkIDAhPT10aGlzLmFbY10pe3ZhciBkPXRoaXMuYVtjXTtkJiZkLl9fbG9hZGVkJiYoYS5pbXBvcnQ9ZCx0aGlzLmcoYSkpfWVsc2UgdGhpcy5iKyssdGhpcy5hW2NdPVwicGVuZGluZ1wiLHYubG9hZChjLGZ1bmN0aW9uKGEsZCl7YT1iLm0oYSxkfHxjKTtiLmFbY109YTtiLmItLTtiLmMoYSk7Yi5pKCl9LGZ1bmN0aW9uKCl7Yi5hW2NdPW51bGw7Yi5iLS07Yi5pKCl9KX07Zy5wcm90b3R5cGUubT1mdW5jdGlvbihhLGIpe2lmKCFhKXJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7eiYmKGE9YS5yZXBsYWNlKHUsXG5mdW5jdGlvbihhLGIsYyl7cmV0dXJuLTE9PT1hLmluZGV4T2YoXCJ0eXBlPVwiKT9iK1wiIHR5cGU9aW1wb3J0LWRpc2FibGUgXCIrYzphfSkpO3ZhciBjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtjLmlubmVySFRNTD1hO2lmKGMuY29udGVudClhPWMuY29udGVudDtlbHNlIGZvcihhPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtjLmZpcnN0Q2hpbGQ7KWEuYXBwZW5kQ2hpbGQoYy5maXJzdENoaWxkKTtpZihjPWEucXVlcnlTZWxlY3RvcihcImJhc2VcIikpYj1wLiQoYy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLGIpLGMucmVtb3ZlQXR0cmlidXRlKFwiaHJlZlwiKTtjPWEucXVlcnlTZWxlY3RvckFsbCgnbGlua1tyZWw9aW1wb3J0XSwgbGlua1tyZWw9c3R5bGVzaGVldF1baHJlZl1bdHlwZT1pbXBvcnQtZGlzYWJsZV0sXFxuICAgIHN0eWxlOm5vdChbdHlwZV0pLCBsaW5rW3JlbD1zdHlsZXNoZWV0XVtocmVmXTpub3QoW3R5cGVdKSxcXG4gICAgc2NyaXB0Om5vdChbdHlwZV0pLCBzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIl0sXFxuICAgIHNjcmlwdFt0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCJdJyk7XG52YXIgZD0wO2woYyxmdW5jdGlvbihhKXtrKGEpO3AuWmEoYSxiKTthLnNldEF0dHJpYnV0ZShcImltcG9ydC1kZXBlbmRlbmN5XCIsXCJcIik7XCJzY3JpcHRcIj09PWEubG9jYWxOYW1lJiYhYS5zcmMmJmEudGV4dENvbnRlbnQmJihhLnNldEF0dHJpYnV0ZShcInNyY1wiLFwiZGF0YTp0ZXh0L2phdmFzY3JpcHQ7Y2hhcnNldD11dGYtOCxcIitlbmNvZGVVUklDb21wb25lbnQoYS50ZXh0Q29udGVudCsoXCJcXG4vLyMgc291cmNlVVJMPVwiK2IrKGQ/XCItXCIrZDpcIlwiKStcIi5qc1xcblwiKSkpLGEudGV4dENvbnRlbnQ9XCJcIixkKyspfSk7cmV0dXJuIGF9O2cucHJvdG90eXBlLmk9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2lmKCF0aGlzLmIpe3RoaXMuZi5kaXNjb25uZWN0KCk7dGhpcy5mbGF0dGVuKGRvY3VtZW50KTt2YXIgYj0hMSxjPSExLGQ9ZnVuY3Rpb24oKXtjJiZiJiYoYS5jKGRvY3VtZW50KSxhLmJ8fChhLmYub2JzZXJ2ZShkb2N1bWVudC5oZWFkLHtjaGlsZExpc3Q6ITAsc3VidHJlZTohMH0pLGEuaigpKSl9O1xudGhpcy5zKGZ1bmN0aW9uKCl7Yz0hMDtkKCl9KTt0aGlzLm8oZnVuY3Rpb24oKXtiPSEwO2QoKX0pfX07Zy5wcm90b3R5cGUuZmxhdHRlbj1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2E9YS5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1tyZWw9aW1wb3J0XVwiKTtsKGEsZnVuY3Rpb24oYSl7dmFyIGM9Yi5hW2EuaHJlZl07KGEuaW1wb3J0PWMpJiZjLm5vZGVUeXBlPT09Tm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFJiYoYi5hW2EuaHJlZl09YSxhLnJlYWR5U3RhdGU9XCJsb2FkaW5nXCIsYS5pbXBvcnQ9YSxiLmZsYXR0ZW4oYyksYS5hcHBlbmRDaGlsZChjKSl9KX07Zy5wcm90b3R5cGUubz1mdW5jdGlvbihhKXtmdW5jdGlvbiBiKGUpe2lmKGU8ZCl7dmFyIGY9Y1tlXSxnPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7Zi5yZW1vdmVBdHRyaWJ1dGUoXCJpbXBvcnQtZGVwZW5kZW5jeVwiKTtsKGYuYXR0cmlidXRlcyxmdW5jdGlvbihhKXtyZXR1cm4gZy5zZXRBdHRyaWJ1dGUoYS5uYW1lLFxuYS52YWx1ZSl9KTtuPWc7Zi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChnLGYpO2soZyxmdW5jdGlvbigpe249bnVsbDtiKGUrMSl9KX1lbHNlIGEoKX12YXIgYz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0W2ltcG9ydC1kZXBlbmRlbmN5XVwiKSxkPWMubGVuZ3RoO2IoMCl9O2cucHJvdG90eXBlLnM9ZnVuY3Rpb24oYSl7dmFyIGI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInN0eWxlW2ltcG9ydC1kZXBlbmRlbmN5XSxcXG4gICAgbGlua1tyZWw9c3R5bGVzaGVldF1baW1wb3J0LWRlcGVuZGVuY3ldXCIpLGQ9Yi5sZW5ndGg7aWYoZCl7dmFyIGU9eiYmISFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibGlua1tyZWw9c3R5bGVzaGVldF1baHJlZl1bdHlwZT1pbXBvcnQtZGlzYWJsZV1cIik7bChiLGZ1bmN0aW9uKGIpe2soYixmdW5jdGlvbigpe2IucmVtb3ZlQXR0cmlidXRlKFwiaW1wb3J0LWRlcGVuZGVuY3lcIik7MD09PS0tZCYmYSgpfSk7aWYoZSYmYi5wYXJlbnROb2RlIT09XG5kb2N1bWVudC5oZWFkKXt2YXIgZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KGIubG9jYWxOYW1lKTtmLl9fYXBwbGllZEVsZW1lbnQ9YjtmLnNldEF0dHJpYnV0ZShcInR5cGVcIixcImltcG9ydC1wbGFjZWhvbGRlclwiKTtiLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGYsYi5uZXh0U2libGluZyk7Zm9yKGY9YyhiKTtmJiZjKGYpOylmPWMoZik7Zi5wYXJlbnROb2RlIT09ZG9jdW1lbnQuaGVhZCYmKGY9bnVsbCk7ZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoYixmKTtiLnJlbW92ZUF0dHJpYnV0ZShcInR5cGVcIil9fSl9ZWxzZSBhKCl9O2cucHJvdG90eXBlLmo9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtbcmVsPWltcG9ydF1cIik7bChiLGZ1bmN0aW9uKGIpe3JldHVybiBhLmcoYil9LCEwKX07Zy5wcm90b3R5cGUuZz1mdW5jdGlvbihhKXthLl9fbG9hZGVkfHwoYS5fX2xvYWRlZD0hMCxhLmltcG9ydCYmKGEuaW1wb3J0LnJlYWR5U3RhdGU9XG5cImNvbXBsZXRlXCIpLGEuZGlzcGF0Y2hFdmVudChiKGEuaW1wb3J0P1wibG9hZFwiOlwiZXJyb3JcIix7YnViYmxlczohMSxjYW5jZWxhYmxlOiExLGRldGFpbDp2b2lkIDB9KSkpfTtnLnByb3RvdHlwZS5sPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7bChhLGZ1bmN0aW9uKGEpe3JldHVybiBsKGEuYWRkZWROb2RlcyxmdW5jdGlvbihhKXthJiZhLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUmJihoKGEpP2IuaChhKTpiLmMoYSkpfSl9KX07aWYobSl7dmFyIHg9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtbcmVsPWltcG9ydF1cIik7bCh4LGZ1bmN0aW9uKGEpe2EuaW1wb3J0JiZcImxvYWRpbmdcIj09PWEuaW1wb3J0LnJlYWR5U3RhdGV8fChhLl9fbG9hZGVkPSEwKX0pO3g9ZnVuY3Rpb24oYSl7YT1hLnRhcmdldDtoKGEpJiYoYS5fX2xvYWRlZD0hMCl9O2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIseCwhMCk7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsXG54LCEwKX1lbHNle3ZhciB5PU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTm9kZS5wcm90b3R5cGUsXCJiYXNlVVJJXCIpO09iamVjdC5kZWZpbmVQcm9wZXJ0eSgoIXl8fHkuY29uZmlndXJhYmxlP05vZGU6RWxlbWVudCkucHJvdG90eXBlLFwiYmFzZVVSSVwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1oKHRoaXMpP3RoaXM6Yyh0aGlzKTtyZXR1cm4gYT9hLmhyZWY6eSYmeS5nZXQ/eS5nZXQuY2FsbCh0aGlzKTooZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJhc2VcIil8fHdpbmRvdy5sb2NhdGlvbikuaHJlZn0sY29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITB9KTtlKGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBnfSl9ZihmdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGIoXCJIVE1MSW1wb3J0c0xvYWRlZFwiLHtjYW5jZWxhYmxlOiEwLGJ1YmJsZXM6ITAsZGV0YWlsOnZvaWQgMH0pKX0pO2EudXNlTmF0aXZlPW07YS53aGVuUmVhZHk9ZjthLmltcG9ydEZvckVsZW1lbnQ9XG5jfSkod2luZG93LkhUTUxJbXBvcnRzPXdpbmRvdy5IVE1MSW1wb3J0c3x8e30pO3ZhciBFPXdpbmRvdy5TaGFkeURPTXx8e307RS4kYT0hKCFFbGVtZW50LnByb3RvdHlwZS5hdHRhY2hTaGFkb3d8fCFOb2RlLnByb3RvdHlwZS5nZXRSb290Tm9kZSk7dmFyIGhiPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTm9kZS5wcm90b3R5cGUsXCJmaXJzdENoaWxkXCIpO0UuUz0hIShoYiYmaGIuY29uZmlndXJhYmxlJiZoYi5nZXQpO0UuemE9RS5mb3JjZXx8IUUuJGE7dmFyIFg9RWxlbWVudC5wcm90b3R5cGUsTWM9WC5tYXRjaGVzfHxYLm1hdGNoZXNTZWxlY3Rvcnx8WC5tb3pNYXRjaGVzU2VsZWN0b3J8fFgubXNNYXRjaGVzU2VsZWN0b3J8fFgub01hdGNoZXNTZWxlY3Rvcnx8WC53ZWJraXRNYXRjaGVzU2VsZWN0b3IsUGE9ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIiksTGI9MCxPYT1bXTsobmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oKXtmb3IoO09hLmxlbmd0aDspdHJ5e09hLnNoaWZ0KCkoKX1jYXRjaChhKXt0aHJvdyBQYS50ZXh0Q29udGVudD1cbkxiKyssYTt9fSkpLm9ic2VydmUoUGEse2NoYXJhY3RlckRhdGE6ITB9KTt2YXIgVmQ9ISFkb2N1bWVudC5jb250YWlucyxhYT1bXSxRYTttYS5saXN0PWFhO2xhLnByb3RvdHlwZS5oYj1mdW5jdGlvbigpe3ZhciBhPXRoaXM7dGhpcy5hfHwodGhpcy5hPSEwLEtiKGZ1bmN0aW9uKCl7YS5iKCl9KSl9O2xhLnByb3RvdHlwZS5iPWZ1bmN0aW9uKCl7aWYodGhpcy5hKXt0aGlzLmE9ITE7dmFyIGE9dGhpcy50YWtlUmVjb3JkcygpO2EubGVuZ3RoJiZ0aGlzLlguZm9yRWFjaChmdW5jdGlvbihiKXtiKGEpfSl9fTtsYS5wcm90b3R5cGUudGFrZVJlY29yZHM9ZnVuY3Rpb24oKXtpZih0aGlzLmFkZGVkTm9kZXMubGVuZ3RofHx0aGlzLnJlbW92ZWROb2Rlcy5sZW5ndGgpe3ZhciBhPVt7YWRkZWROb2Rlczp0aGlzLmFkZGVkTm9kZXMscmVtb3ZlZE5vZGVzOnRoaXMucmVtb3ZlZE5vZGVzfV07dGhpcy5hZGRlZE5vZGVzPVtdO3RoaXMucmVtb3ZlZE5vZGVzPVtdO3JldHVybiBhfXJldHVybltdfTtcbnZhciBjYz1FbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZCxYYT1FbGVtZW50LnByb3RvdHlwZS5pbnNlcnRCZWZvcmUsYmE9RWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQsa2M9RWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlLE5jPUVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZSxpYj1FbGVtZW50LnByb3RvdHlwZS5jbG9uZU5vZGUsWWE9RG9jdW1lbnQucHJvdG90eXBlLmltcG9ydE5vZGUsc2M9RWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcix2Yz1FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyLHJjPVdpbmRvdy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcix1Yz1XaW5kb3cucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIsamI9RWxlbWVudC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCxjYT1Ob2RlLnByb3RvdHlwZS5jb250YWluc3x8SFRNTEVsZW1lbnQucHJvdG90eXBlLmNvbnRhaW5zLFdkPU9iamVjdC5mcmVlemUoe2FwcGVuZENoaWxkOmNjLFxuaW5zZXJ0QmVmb3JlOlhhLHJlbW92ZUNoaWxkOmJhLHNldEF0dHJpYnV0ZTprYyxyZW1vdmVBdHRyaWJ1dGU6TmMsY2xvbmVOb2RlOmliLGltcG9ydE5vZGU6WWEsYWRkRXZlbnRMaXN0ZW5lcjpzYyxyZW1vdmVFdmVudExpc3RlbmVyOnZjLHJiOnJjLHNiOnVjLGRpc3BhdGNoRXZlbnQ6amIscXVlcnlTZWxlY3RvcjpFbGVtZW50LnByb3RvdHlwZS5xdWVyeVNlbGVjdG9yLHF1ZXJ5U2VsZWN0b3JBbGw6RWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3RvckFsbCxjb250YWluczpjYX0pLENkPS9bJlxcdTAwQTBcIl0vZyxGZD0vWyZcXHUwMEEwPD5dL2csRGQ9UGIoXCJhcmVhIGJhc2UgYnIgY29sIGNvbW1hbmQgZW1iZWQgaHIgaW1nIGlucHV0IGtleWdlbiBsaW5rIG1ldGEgcGFyYW0gc291cmNlIHRyYWNrIHdiclwiLnNwbGl0KFwiIFwiKSksRWQ9UGIoXCJzdHlsZSBzY3JpcHQgeG1wIGlmcmFtZSBub2VtYmVkIG5vZnJhbWVzIHBsYWludGV4dCBub3NjcmlwdFwiLnNwbGl0KFwiIFwiKSksQz1kb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGRvY3VtZW50LFxuTm9kZUZpbHRlci5TSE9XX0FMTCxudWxsLCExKSxEPWRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZG9jdW1lbnQsTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsbnVsbCwhMSksWGQ9T2JqZWN0LmZyZWV6ZSh7cGFyZW50Tm9kZTpVLGZpcnN0Q2hpbGQ6S2EsbGFzdENoaWxkOkxhLHByZXZpb3VzU2libGluZzpRYixuZXh0U2libGluZzpSYixjaGlsZE5vZGVzOlMscGFyZW50RWxlbWVudDpTYixmaXJzdEVsZW1lbnRDaGlsZDpUYixsYXN0RWxlbWVudENoaWxkOlViLHByZXZpb3VzRWxlbWVudFNpYmxpbmc6VmIsbmV4dEVsZW1lbnRTaWJsaW5nOldiLGNoaWxkcmVuOlhiLGlubmVySFRNTDpZYix0ZXh0Q29udGVudDpaYn0pLGtiPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudC5wcm90b3R5cGUsXCJpbm5lckhUTUxcIil8fE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoSFRNTEVsZW1lbnQucHJvdG90eXBlLFwiaW5uZXJIVE1MXCIpLHNhPWRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcImluZXJ0XCIpLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG5sYj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKERvY3VtZW50LnByb3RvdHlwZSxcImFjdGl2ZUVsZW1lbnRcIiksJGI9e3BhcmVudEVsZW1lbnQ6e2dldDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5LnBhcmVudE5vZGU7YSYmYS5ub2RlVHlwZSE9PU5vZGUuRUxFTUVOVF9OT0RFJiYoYT1udWxsKTtyZXR1cm4gdm9pZCAwIT09YT9hOlNiKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LHBhcmVudE5vZGU6e2dldDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5LnBhcmVudE5vZGU7cmV0dXJuIHZvaWQgMCE9PWE/YTpVKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LG5leHRTaWJsaW5nOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5uZXh0U2libGluZztyZXR1cm4gdm9pZCAwIT09YT9hOlJiKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LHByZXZpb3VzU2libGluZzp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9XG50aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc7cmV0dXJuIHZvaWQgMCE9PWE/YTpRYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxjbGFzc05hbWU6e2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwifSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGEpfSxjb25maWd1cmFibGU6ITB9LG5leHRFbGVtZW50U2libGluZzp7Z2V0OmZ1bmN0aW9uKCl7aWYodGhpcy5fX3NoYWR5JiZ2b2lkIDAhPT10aGlzLl9fc2hhZHkubmV4dFNpYmxpbmcpe2Zvcih2YXIgYT10aGlzLm5leHRTaWJsaW5nO2EmJmEubm9kZVR5cGUhPT1Ob2RlLkVMRU1FTlRfTk9ERTspYT1hLm5leHRTaWJsaW5nO3JldHVybiBhfXJldHVybiBXYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxwcmV2aW91c0VsZW1lbnRTaWJsaW5nOntnZXQ6ZnVuY3Rpb24oKXtpZih0aGlzLl9fc2hhZHkmJnZvaWQgMCE9PXRoaXMuX19zaGFkeS5wcmV2aW91c1NpYmxpbmcpe2Zvcih2YXIgYT1cbnRoaXMucHJldmlvdXNTaWJsaW5nO2EmJmEubm9kZVR5cGUhPT1Ob2RlLkVMRU1FTlRfTk9ERTspYT1hLnByZXZpb3VzU2libGluZztyZXR1cm4gYX1yZXR1cm4gVmIodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH19LFNhPXtjaGlsZE5vZGVzOntnZXQ6ZnVuY3Rpb24oKXtpZihUKHRoaXMpKXtpZighdGhpcy5fX3NoYWR5LmNoaWxkTm9kZXMpe3RoaXMuX19zaGFkeS5jaGlsZE5vZGVzPVtdO2Zvcih2YXIgYT10aGlzLmZpcnN0Q2hpbGQ7YTthPWEubmV4dFNpYmxpbmcpdGhpcy5fX3NoYWR5LmNoaWxkTm9kZXMucHVzaChhKX12YXIgYj10aGlzLl9fc2hhZHkuY2hpbGROb2Rlc31lbHNlIGI9Uyh0aGlzKTtiLml0ZW09ZnVuY3Rpb24oYSl7cmV0dXJuIGJbYV19O3JldHVybiBifSxjb25maWd1cmFibGU6ITB9LGNoaWxkRWxlbWVudENvdW50OntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGh9LGNvbmZpZ3VyYWJsZTohMH0sZmlyc3RDaGlsZDp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9XG50aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5maXJzdENoaWxkO3JldHVybiB2b2lkIDAhPT1hP2E6S2EodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sbGFzdENoaWxkOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5sYXN0Q2hpbGQ7cmV0dXJuIHZvaWQgMCE9PWE/YTpMYSh0aGlzKX0sY29uZmlndXJhYmxlOiEwfSx0ZXh0Q29udGVudDp7Z2V0OmZ1bmN0aW9uKCl7aWYoVCh0aGlzKSl7Zm9yKHZhciBhPVtdLGI9MCxjPXRoaXMuY2hpbGROb2RlcyxkO2Q9Y1tiXTtiKyspZC5ub2RlVHlwZSE9PU5vZGUuQ09NTUVOVF9OT0RFJiZhLnB1c2goZC50ZXh0Q29udGVudCk7cmV0dXJuIGEuam9pbihcIlwiKX1yZXR1cm4gWmIodGhpcyl9LHNldDpmdW5jdGlvbihhKXtzd2l0Y2godGhpcy5ub2RlVHlwZSl7Y2FzZSBOb2RlLkVMRU1FTlRfTk9ERTpjYXNlIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERTpmb3IoO3RoaXMuZmlyc3RDaGlsZDspdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpO1xuKDA8YS5sZW5ndGh8fHRoaXMubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSkmJnRoaXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYSkpO2JyZWFrO2RlZmF1bHQ6dGhpcy5ub2RlVmFsdWU9YX19LGNvbmZpZ3VyYWJsZTohMH0sZmlyc3RFbGVtZW50Q2hpbGQ6e2dldDpmdW5jdGlvbigpe2lmKHRoaXMuX19zaGFkeSYmdm9pZCAwIT09dGhpcy5fX3NoYWR5LmZpcnN0Q2hpbGQpe2Zvcih2YXIgYT10aGlzLmZpcnN0Q2hpbGQ7YSYmYS5ub2RlVHlwZSE9PU5vZGUuRUxFTUVOVF9OT0RFOylhPWEubmV4dFNpYmxpbmc7cmV0dXJuIGF9cmV0dXJuIFRiKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LGxhc3RFbGVtZW50Q2hpbGQ6e2dldDpmdW5jdGlvbigpe2lmKHRoaXMuX19zaGFkeSYmdm9pZCAwIT09dGhpcy5fX3NoYWR5Lmxhc3RDaGlsZCl7Zm9yKHZhciBhPXRoaXMubGFzdENoaWxkO2EmJmEubm9kZVR5cGUhPT1Ob2RlLkVMRU1FTlRfTk9ERTspYT1hLnByZXZpb3VzU2libGluZztcbnJldHVybiBhfXJldHVybiBVYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxjaGlsZHJlbjp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE7VCh0aGlzKT9hPUFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbCh0aGlzLmNoaWxkTm9kZXMsZnVuY3Rpb24oYSl7cmV0dXJuIGEubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERX0pOmE9WGIodGhpcyk7YS5pdGVtPWZ1bmN0aW9uKGIpe3JldHVybiBhW2JdfTtyZXR1cm4gYX0sY29uZmlndXJhYmxlOiEwfSxpbm5lckhUTUw6e2dldDpmdW5jdGlvbigpe3ZhciBhPVwidGVtcGxhdGVcIj09PXRoaXMubG9jYWxOYW1lP3RoaXMuY29udGVudDp0aGlzO3JldHVybiBUKHRoaXMpP1JhKGEpOlliKGEpfSxzZXQ6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVwidGVtcGxhdGVcIj09PXRoaXMubG9jYWxOYW1lP3RoaXMuY29udGVudDp0aGlzO2IuZmlyc3RDaGlsZDspYi5yZW1vdmVDaGlsZChiLmZpcnN0Q2hpbGQpO2ZvcihrYiYma2Iuc2V0P2tiLnNldC5jYWxsKHNhLGEpOlxuc2EuaW5uZXJIVE1MPWE7c2EuZmlyc3RDaGlsZDspYi5hcHBlbmRDaGlsZChzYS5maXJzdENoaWxkKX0sY29uZmlndXJhYmxlOiEwfX0sT2M9e3NoYWRvd1Jvb3Q6e2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5mYnx8bnVsbH0sY29uZmlndXJhYmxlOiEwfX0sVGE9e2FjdGl2ZUVsZW1lbnQ6e2dldDpmdW5jdGlvbigpe3ZhciBhPWxiJiZsYi5nZXQ/bGIuZ2V0LmNhbGwoZG9jdW1lbnQpOkUuUz92b2lkIDA6ZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtpZihhJiZhLm5vZGVUeXBlKXt2YXIgYj0hIUcodGhpcyk7aWYodGhpcz09PWRvY3VtZW50fHxiJiZ0aGlzLmhvc3QhPT1hJiZjYS5jYWxsKHRoaXMuaG9zdCxhKSl7Zm9yKGI9WihhKTtiJiZiIT09dGhpczspYT1iLmhvc3QsYj1aKGEpO2E9dGhpcz09PWRvY3VtZW50P2I/bnVsbDphOmI9PT10aGlzP2E6bnVsbH1lbHNlIGE9bnVsbH1lbHNlIGE9bnVsbDtyZXR1cm4gYX0sc2V0OmZ1bmN0aW9uKCl7fSxcbmNvbmZpZ3VyYWJsZTohMH19LEpiPUUuUz9mdW5jdGlvbigpe306ZnVuY3Rpb24oYSl7YS5fX3NoYWR5JiZhLl9fc2hhZHkuTmF8fChhLl9fc2hhZHk9YS5fX3NoYWR5fHx7fSxhLl9fc2hhZHkuTmE9ITAsSyhhLCRiLCEwKSl9LEliPUUuUz9mdW5jdGlvbigpe306ZnVuY3Rpb24oYSl7YS5fX3NoYWR5JiZhLl9fc2hhZHkuTGF8fChhLl9fc2hhZHk9YS5fX3NoYWR5fHx7fSxhLl9fc2hhZHkuTGE9ITAsSyhhLFNhLCEwKSxLKGEsT2MsITApKX0sb2E9bnVsbCxkYT1cIl9fZXZlbnRXcmFwcGVyc1wiK0RhdGUubm93KCksWWQ9e2JsdXI6ITAsZm9jdXM6ITAsZm9jdXNpbjohMCxmb2N1c291dDohMCxjbGljazohMCxkYmxjbGljazohMCxtb3VzZWRvd246ITAsbW91c2VlbnRlcjohMCxtb3VzZWxlYXZlOiEwLG1vdXNlbW92ZTohMCxtb3VzZW91dDohMCxtb3VzZW92ZXI6ITAsbW91c2V1cDohMCx3aGVlbDohMCxiZWZvcmVpbnB1dDohMCxpbnB1dDohMCxrZXlkb3duOiEwLGtleXVwOiEwLGNvbXBvc2l0aW9uc3RhcnQ6ITAsXG5jb21wb3NpdGlvbnVwZGF0ZTohMCxjb21wb3NpdGlvbmVuZDohMCx0b3VjaHN0YXJ0OiEwLHRvdWNoZW5kOiEwLHRvdWNobW92ZTohMCx0b3VjaGNhbmNlbDohMCxwb2ludGVyb3ZlcjohMCxwb2ludGVyZW50ZXI6ITAscG9pbnRlcmRvd246ITAscG9pbnRlcm1vdmU6ITAscG9pbnRlcnVwOiEwLHBvaW50ZXJjYW5jZWw6ITAscG9pbnRlcm91dDohMCxwb2ludGVybGVhdmU6ITAsZ290cG9pbnRlcmNhcHR1cmU6ITAsbG9zdHBvaW50ZXJjYXB0dXJlOiEwLGRyYWdzdGFydDohMCxkcmFnOiEwLGRyYWdlbnRlcjohMCxkcmFnbGVhdmU6ITAsZHJhZ292ZXI6ITAsZHJvcDohMCxkcmFnZW5kOiEwLERPTUFjdGl2YXRlOiEwLERPTUZvY3VzSW46ITAsRE9NRm9jdXNPdXQ6ITAsa2V5cHJlc3M6ITB9LHdjPXtnZXQgY29tcG9zZWQoKXshMSE9PXRoaXMuaXNUcnVzdGVkJiZ2b2lkIDA9PT10aGlzLmVhJiYodGhpcy5lYT1ZZFt0aGlzLnR5cGVdKTtyZXR1cm4gdGhpcy5lYXx8ITF9LGNvbXBvc2VkUGF0aDpmdW5jdGlvbigpe3RoaXMucWF8fFxuKHRoaXMucWE9WmEodGhpcy5fX3RhcmdldCx0aGlzLmNvbXBvc2VkKSk7cmV0dXJuIHRoaXMucWF9LGdldCB0YXJnZXQoKXtyZXR1cm4gbWModGhpcy5jdXJyZW50VGFyZ2V0LHRoaXMuY29tcG9zZWRQYXRoKCkpfSxnZXQgcmVsYXRlZFRhcmdldCgpe2lmKCF0aGlzLnJhKXJldHVybiBudWxsO3RoaXMuc2F8fCh0aGlzLnNhPVphKHRoaXMucmEsITApKTtyZXR1cm4gbWModGhpcy5jdXJyZW50VGFyZ2V0LHRoaXMuc2EpfSxzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oKXtFdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uLmNhbGwodGhpcyk7dGhpcy5mYT0hMH0sc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOmZ1bmN0aW9uKCl7RXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbi5jYWxsKHRoaXMpO3RoaXMuZmE9dGhpcy5LYT0hMH19LGFiPXtmb2N1czohMCxibHVyOiEwfSxaZD0kYSh3aW5kb3cuRXZlbnQpLCRkPSRhKHdpbmRvdy5DdXN0b21FdmVudCksYWU9XG4kYSh3aW5kb3cuTW91c2VFdmVudCksSGI9e307bC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZSk7bC5wcm90b3R5cGUuRj1mdW5jdGlvbihhLGIpe3RoaXMuTWE9XCJTaGFkeVJvb3RcIjtrYShhKTtrYSh0aGlzKTt0aGlzLmhvc3Q9YTt0aGlzLkg9YiYmYi5tb2RlO2EuX19zaGFkeT1hLl9fc2hhZHl8fHt9O2EuX19zaGFkeS5yb290PXRoaXM7YS5fX3NoYWR5LmZiPVwiY2xvc2VkXCIhPT10aGlzLkg/dGhpczpudWxsO3RoaXMuUD0hMTt0aGlzLmI9W107dGhpcy5hPXt9O3RoaXMuYz1bXTtiPVMoYSk7Zm9yKHZhciBjPTAsZD1iLmxlbmd0aDtjPGQ7YysrKWJhLmNhbGwoYSxiW2NdKX07bC5wcm90b3R5cGUuTD1mdW5jdGlvbigpe3ZhciBhPXRoaXM7dGhpcy5QfHwodGhpcy5QPSEwLE5iKGZ1bmN0aW9uKCl7cmV0dXJuIGEudmEoKX0pKX07bC5wcm90b3R5cGUuSz1mdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLGI9dGhpcztiOyliLlAmJihhPWIpLFxuYj1iLlVhKCk7cmV0dXJuIGF9O2wucHJvdG90eXBlLlVhPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5ob3N0LmdldFJvb3ROb2RlKCk7aWYoRyhhKSlmb3IodmFyIGI9dGhpcy5ob3N0LmNoaWxkTm9kZXMsYz0wLGQ7YzxiLmxlbmd0aDtjKyspaWYoZD1iW2NdLHRoaXMuaihkKSlyZXR1cm4gYX07bC5wcm90b3R5cGUudmE9ZnVuY3Rpb24oKXt0aGlzLlAmJnRoaXMuSygpLl9yZW5kZXJSb290KCl9O2wucHJvdG90eXBlLl9yZW5kZXJSb290PWZ1bmN0aW9uKCl7dGhpcy5QPSExO3RoaXMuQigpO3RoaXMucygpfTtsLnByb3RvdHlwZS5CPWZ1bmN0aW9uKCl7dGhpcy5mKCk7Zm9yKHZhciBhPTAsYjthPHRoaXMuYi5sZW5ndGg7YSsrKWI9dGhpcy5iW2FdLHRoaXMubyhiKTtmb3IoYj10aGlzLmhvc3QuZmlyc3RDaGlsZDtiO2I9Yi5uZXh0U2libGluZyl0aGlzLmgoYik7Zm9yKGE9MDthPHRoaXMuYi5sZW5ndGg7YSsrKXtiPXRoaXMuYlthXTtpZighYi5fX3NoYWR5LmFzc2lnbmVkTm9kZXMubGVuZ3RoKWZvcih2YXIgYz1cbmIuZmlyc3RDaGlsZDtjO2M9Yy5uZXh0U2libGluZyl0aGlzLmgoYyxiKTtjPWIucGFyZW50Tm9kZTsoYz1jLl9fc2hhZHkmJmMuX19zaGFkeS5yb290KSYmYy50YSgpJiZjLl9yZW5kZXJSb290KCk7dGhpcy5nKGIuX19zaGFkeS5SLGIuX19zaGFkeS5hc3NpZ25lZE5vZGVzKTtpZihjPWIuX19zaGFkeS51YSl7Zm9yKHZhciBkPTA7ZDxjLmxlbmd0aDtkKyspY1tkXS5fX3NoYWR5LmlhPW51bGw7Yi5fX3NoYWR5LnVhPW51bGw7Yy5sZW5ndGg+Yi5fX3NoYWR5LmFzc2lnbmVkTm9kZXMubGVuZ3RoJiYoYi5fX3NoYWR5LmthPSEwKX1iLl9fc2hhZHkua2EmJihiLl9fc2hhZHkua2E9ITEsdGhpcy5pKGIpKX19O2wucHJvdG90eXBlLmg9ZnVuY3Rpb24oYSxiKXthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTt2YXIgYz1hLl9fc2hhZHkuaWE7YS5fX3NoYWR5LmlhPW51bGw7Ynx8KGI9KGI9dGhpcy5hW2Euc2xvdHx8XCJfX2NhdGNoYWxsXCJdKSYmYlswXSk7Yj8oYi5fX3NoYWR5LmFzc2lnbmVkTm9kZXMucHVzaChhKSxcbmEuX19zaGFkeS5hc3NpZ25lZFNsb3Q9Yik6YS5fX3NoYWR5LmFzc2lnbmVkU2xvdD12b2lkIDA7YyE9PWEuX19zaGFkeS5hc3NpZ25lZFNsb3QmJmEuX19zaGFkeS5hc3NpZ25lZFNsb3QmJihhLl9fc2hhZHkuYXNzaWduZWRTbG90Ll9fc2hhZHkua2E9ITApfTtsLnByb3RvdHlwZS5vPWZ1bmN0aW9uKGEpe3ZhciBiPWEuX19zaGFkeS5hc3NpZ25lZE5vZGVzO2EuX19zaGFkeS5hc3NpZ25lZE5vZGVzPVtdO2EuX19zaGFkeS5SPVtdO2lmKGEuX19zaGFkeS51YT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZD1iW2NdO2QuX19zaGFkeS5pYT1kLl9fc2hhZHkuYXNzaWduZWRTbG90O2QuX19zaGFkeS5hc3NpZ25lZFNsb3Q9PT1hJiYoZC5fX3NoYWR5LmFzc2lnbmVkU2xvdD1udWxsKX19O2wucHJvdG90eXBlLmc9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MCxkO2M8Yi5sZW5ndGgmJihkPWJbY10pO2MrKylcInNsb3RcIj09ZC5sb2NhbE5hbWU/dGhpcy5nKGEsZC5fX3NoYWR5LmFzc2lnbmVkTm9kZXMpOlxuYS5wdXNoKGJbY10pfTtsLnByb3RvdHlwZS5pPWZ1bmN0aW9uKGEpe2piLmNhbGwoYSxuZXcgRXZlbnQoXCJzbG90Y2hhbmdlXCIpKTthLl9fc2hhZHkuYXNzaWduZWRTbG90JiZ0aGlzLmkoYS5fX3NoYWR5LmFzc2lnbmVkU2xvdCl9O2wucHJvdG90eXBlLnM9ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5iLGI9W10sYz0wO2M8YS5sZW5ndGg7YysrKXt2YXIgZD1hW2NdLnBhcmVudE5vZGU7ZC5fX3NoYWR5JiZkLl9fc2hhZHkucm9vdHx8ISgwPmIuaW5kZXhPZihkKSl8fGIucHVzaChkKX1mb3IoYT0wO2E8Yi5sZW5ndGg7YSsrKWM9YlthXSx0aGlzLk8oYz09PXRoaXM/dGhpcy5ob3N0OmMsdGhpcy53KGMpKX07bC5wcm90b3R5cGUudz1mdW5jdGlvbihhKXt2YXIgYj1bXTthPWEuY2hpbGROb2Rlcztmb3IodmFyIGM9MDtjPGEubGVuZ3RoO2MrKyl7dmFyIGQ9YVtjXTtpZih0aGlzLmooZCkpe2Q9ZC5fX3NoYWR5LlI7Zm9yKHZhciBlPTA7ZTxkLmxlbmd0aDtlKyspYi5wdXNoKGRbZV0pfWVsc2UgYi5wdXNoKGQpfXJldHVybiBifTtcbmwucHJvdG90eXBlLmo9ZnVuY3Rpb24oYSl7cmV0dXJuXCJzbG90XCI9PWEubG9jYWxOYW1lfTtsLnByb3RvdHlwZS5PPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPVMoYSksZD1JZChiLGIubGVuZ3RoLGMsYy5sZW5ndGgpLGU9MCxmPTAsaztlPGQubGVuZ3RoJiYoaz1kW2VdKTtlKyspe2Zvcih2YXIgZz0wLGw7ZzxrLlUubGVuZ3RoJiYobD1rLlVbZ10pO2crKylVKGwpPT09YSYmYmEuY2FsbChhLGwpLGMuc3BsaWNlKGsuaW5kZXgrZiwxKTtmLT1rLld9Zm9yKGU9MDtlPGQubGVuZ3RoJiYoaz1kW2VdKTtlKyspZm9yKGY9Y1trLmluZGV4XSxnPWsuaW5kZXg7ZzxrLmluZGV4K2suVztnKyspbD1iW2ddLFhhLmNhbGwoYSxsLGYpLGMuc3BsaWNlKGcsMCxsKX07bC5wcm90b3R5cGUuUWE9ZnVuY3Rpb24oYSl7dGhpcy5jLnB1c2guYXBwbHkodGhpcy5jLFtdLmNvbmNhdChhIGluc3RhbmNlb2YgQXJyYXk/YTpoZChnZChhKSkpKX07bC5wcm90b3R5cGUuZj1mdW5jdGlvbigpe3RoaXMuYy5sZW5ndGgmJlxuKHRoaXMuRyh0aGlzLmMpLHRoaXMuYz1bXSl9O2wucHJvdG90eXBlLkc9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGM9MDtjPGEubGVuZ3RoO2MrKyl7dmFyIGQ9YVtjXTtkLl9fc2hhZHk9ZC5fX3NoYWR5fHx7fTtrYShkKTtrYShkLnBhcmVudE5vZGUpO3ZhciBlPXRoaXMubChkKTt0aGlzLmFbZV0/KGI9Ynx8e30sYltlXT0hMCx0aGlzLmFbZV0ucHVzaChkKSk6dGhpcy5hW2VdPVtkXTt0aGlzLmIucHVzaChkKX1pZihiKWZvcih2YXIgZiBpbiBiKXRoaXMuYVtmXT10aGlzLm0odGhpcy5hW2ZdKX07bC5wcm90b3R5cGUubD1mdW5jdGlvbihhKXt2YXIgYj1hLm5hbWV8fGEuZ2V0QXR0cmlidXRlKFwibmFtZVwiKXx8XCJfX2NhdGNoYWxsXCI7cmV0dXJuIGEuT2E9Yn07bC5wcm90b3R5cGUubT1mdW5jdGlvbihhKXtyZXR1cm4gYS5zb3J0KGZ1bmN0aW9uKGEsYyl7YT14YyhhKTtmb3IodmFyIGI9eGMoYyksZT0wO2U8YS5sZW5ndGg7ZSsrKXtjPWFbZV07dmFyIGY9YltlXTtpZihjIT09ZilyZXR1cm4gYT1cbkFycmF5LmZyb20oYy5wYXJlbnROb2RlLmNoaWxkTm9kZXMpLGEuaW5kZXhPZihjKS1hLmluZGV4T2YoZil9fSl9O2wucHJvdG90eXBlLlRhPWZ1bmN0aW9uKGEpe3RoaXMuZigpO3ZhciBiPXRoaXMuYSxjO2ZvcihjIGluIGIpZm9yKHZhciBkPWJbY10sZT0wO2U8ZC5sZW5ndGg7ZSsrKXt2YXIgZj1kW2VdO2lmKE1iKGEsZikpe2Quc3BsaWNlKGUsMSk7dmFyIGs9dGhpcy5iLmluZGV4T2YoZik7MDw9ayYmdGhpcy5iLnNwbGljZShrLDEpO2UtLTt0aGlzLkkoZik7az0hMH19cmV0dXJuIGt9O2wucHJvdG90eXBlLlZhPWZ1bmN0aW9uKGEpe3ZhciBiPWEuT2EsYz10aGlzLmwoYSk7aWYoYyE9PWIpe2I9dGhpcy5hW2JdO3ZhciBkPWIuaW5kZXhPZihhKTswPD1kJiZiLnNwbGljZShkLDEpO2I9dGhpcy5hW2NdfHwodGhpcy5hW2NdPVtdKTtiLnB1c2goYSk7MTxiLmxlbmd0aCYmKHRoaXMuYVtjXT10aGlzLm0oYikpfX07bC5wcm90b3R5cGUuST1mdW5jdGlvbihhKXtpZihhPWEuX19zaGFkeS5SKWZvcih2YXIgYj1cbjA7YjxhLmxlbmd0aDtiKyspe3ZhciBjPWFbYl0sZD1VKGMpO2QmJmJhLmNhbGwoZCxjKX19O2wucHJvdG90eXBlLnRhPWZ1bmN0aW9uKCl7dGhpcy5mKCk7cmV0dXJuISF0aGlzLmIubGVuZ3RofTtsLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyPWZ1bmN0aW9uKGEsYixjKXtcIm9iamVjdFwiIT09dHlwZW9mIGMmJihjPXtjYXB0dXJlOiEhY30pO2MuZ2E9dGhpczt0aGlzLmhvc3QuYWRkRXZlbnRMaXN0ZW5lcihhLGIsYyl9O2wucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oYSxiLGMpe1wib2JqZWN0XCIhPT10eXBlb2YgYyYmKGM9e2NhcHR1cmU6ISFjfSk7Yy5nYT10aGlzO3RoaXMuaG9zdC5yZW1vdmVFdmVudExpc3RlbmVyKGEsYixjKX07bC5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQ9ZnVuY3Rpb24oYSl7cmV0dXJuIG5hKHRoaXMsZnVuY3Rpb24oYil7cmV0dXJuIGIuaWQ9PWF9LGZ1bmN0aW9uKGEpe3JldHVybiEhYX0pWzBdfHxudWxsfTsoZnVuY3Rpb24oYSl7SyhhLFxuU2EsITApO0soYSxUYSwhMCl9KShsLnByb3RvdHlwZSk7dmFyIE1kPXthZGRFdmVudExpc3RlbmVyOnBjLmJpbmQod2luZG93KSxyZW1vdmVFdmVudExpc3RlbmVyOnRjLmJpbmQod2luZG93KX0sTGQ9e2FkZEV2ZW50TGlzdGVuZXI6cGMscmVtb3ZlRXZlbnRMaXN0ZW5lcjp0YyxhcHBlbmRDaGlsZDpmdW5jdGlvbihhKXtyZXR1cm4gVWEodGhpcyxhKX0saW5zZXJ0QmVmb3JlOmZ1bmN0aW9uKGEsYil7cmV0dXJuIFVhKHRoaXMsYSxiKX0scmVtb3ZlQ2hpbGQ6ZnVuY3Rpb24oYSl7cmV0dXJuIFZhKHRoaXMsYSl9LHJlcGxhY2VDaGlsZDpmdW5jdGlvbihhLGIpe1VhKHRoaXMsYSxiKTtWYSh0aGlzLGIpO3JldHVybiBhfSxjbG9uZU5vZGU6ZnVuY3Rpb24oYSl7aWYoXCJ0ZW1wbGF0ZVwiPT10aGlzLmxvY2FsTmFtZSl2YXIgYj1pYi5jYWxsKHRoaXMsYSk7ZWxzZSBpZihiPWliLmNhbGwodGhpcywhMSksYSl7YT10aGlzLmNoaWxkTm9kZXM7Zm9yKHZhciBjPTAsZDtjPGEubGVuZ3RoO2MrKylkPVxuYVtjXS5jbG9uZU5vZGUoITApLGIuYXBwZW5kQ2hpbGQoZCl9cmV0dXJuIGJ9LGdldFJvb3ROb2RlOmZ1bmN0aW9uKCl7cmV0dXJuIGdjKHRoaXMpfSxjb250YWluczpmdW5jdGlvbihhKXtyZXR1cm4gTWIodGhpcyxhKX0sZ2V0IGlzQ29ubmVjdGVkKCl7dmFyIGE9dGhpcy5vd25lckRvY3VtZW50O2lmKFZkJiZjYS5jYWxsKGEsdGhpcyl8fGEuZG9jdW1lbnRFbGVtZW50JiZjYS5jYWxsKGEuZG9jdW1lbnRFbGVtZW50LHRoaXMpKXJldHVybiEwO2ZvcihhPXRoaXM7YSYmIShhIGluc3RhbmNlb2YgRG9jdW1lbnQpOylhPWEucGFyZW50Tm9kZXx8KGEgaW5zdGFuY2VvZiBsP2EuaG9zdDp2b2lkIDApO3JldHVybiEhKGEmJmEgaW5zdGFuY2VvZiBEb2N1bWVudCl9LGRpc3BhdGNoRXZlbnQ6ZnVuY3Rpb24oYSl7bWEoKTtyZXR1cm4gamIuY2FsbCh0aGlzLGEpfX0sTmQ9e2dldCBhc3NpZ25lZFNsb3QoKXtyZXR1cm4geWModGhpcyl9fSxiYj17cXVlcnlTZWxlY3RvcjpmdW5jdGlvbihhKXtyZXR1cm4gbmEodGhpcyxcbmZ1bmN0aW9uKGIpe3JldHVybiBNYy5jYWxsKGIsYSl9LGZ1bmN0aW9uKGEpe3JldHVybiEhYX0pWzBdfHxudWxsfSxxdWVyeVNlbGVjdG9yQWxsOmZ1bmN0aW9uKGEpe3JldHVybiBuYSh0aGlzLGZ1bmN0aW9uKGIpe3JldHVybiBNYy5jYWxsKGIsYSl9KX19LEJjPXthc3NpZ25lZE5vZGVzOmZ1bmN0aW9uKGEpe2lmKFwic2xvdFwiPT09dGhpcy5sb2NhbE5hbWUpcmV0dXJuIGljKHRoaXMpLHRoaXMuX19zaGFkeT8oYSYmYS5mbGF0dGVuP3RoaXMuX19zaGFkeS5SOnRoaXMuX19zaGFkeS5hc3NpZ25lZE5vZGVzKXx8W106W119fSx6Yz1OYSh7c2V0QXR0cmlidXRlOmZ1bmN0aW9uKGEsYil7amModGhpcyxhLGIpfSxyZW1vdmVBdHRyaWJ1dGU6ZnVuY3Rpb24oYSl7TmMuY2FsbCh0aGlzLGEpO2ZjKHRoaXMsYSl9LGF0dGFjaFNoYWRvdzpmdW5jdGlvbihhKXtpZighdGhpcyl0aHJvd1wiTXVzdCBwcm92aWRlIGEgaG9zdC5cIjtpZighYSl0aHJvd1wiTm90IGVub3VnaCBhcmd1bWVudHMuXCI7cmV0dXJuIG5ldyBsKEhiLFxudGhpcyxhKX0sZ2V0IHNsb3QoKXtyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJzbG90XCIpfSxzZXQgc2xvdChhKXtqYyh0aGlzLFwic2xvdFwiLGEpfSxnZXQgYXNzaWduZWRTbG90KCl7cmV0dXJuIHljKHRoaXMpfX0sYmIsQmMpO09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHpjLE9jKTt2YXIgQWM9TmEoe2ltcG9ydE5vZGU6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbGMoYSxiKX0sZ2V0RWxlbWVudEJ5SWQ6ZnVuY3Rpb24oYSl7cmV0dXJuIG5hKHRoaXMsZnVuY3Rpb24oYil7cmV0dXJuIGIuaWQ9PWF9LGZ1bmN0aW9uKGEpe3JldHVybiEhYX0pWzBdfHxudWxsfX0sYmIpO09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEFjLHtfYWN0aXZlRWxlbWVudDpUYS5hY3RpdmVFbGVtZW50fSk7dmFyIGJlPUhUTUxFbGVtZW50LnByb3RvdHlwZS5ibHVyLE9kPU5hKHtibHVyOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkucm9vdDsoYT1hJiZhLmFjdGl2ZUVsZW1lbnQpP1xuYS5ibHVyKCk6YmUuY2FsbCh0aGlzKX19KTtFLnphJiYod2luZG93LlNoYWR5RE9NPXtpblVzZTpFLnphLHBhdGNoOmZ1bmN0aW9uKGEpe3JldHVybiBhfSxpc1NoYWR5Um9vdDpHLGVucXVldWU6TmIsZmx1c2g6bWEsc2V0dGluZ3M6RSxmaWx0ZXJNdXRhdGlvbnM6QmQsb2JzZXJ2ZUNoaWxkcmVuOnpkLHVub2JzZXJ2ZUNoaWxkcmVuOnlkLG5hdGl2ZU1ldGhvZHM6V2QsbmF0aXZlVHJlZTpYZH0sd2luZG93LkV2ZW50PVpkLHdpbmRvdy5DdXN0b21FdmVudD0kZCx3aW5kb3cuTW91c2VFdmVudD1hZSxIZCgpLEtkKCksd2luZG93LlNoYWRvd1Jvb3Q9bCk7dmFyIFBkPW5ldyBTZXQoXCJhbm5vdGF0aW9uLXhtbCBjb2xvci1wcm9maWxlIGZvbnQtZmFjZSBmb250LWZhY2Utc3JjIGZvbnQtZmFjZS11cmkgZm9udC1mYWNlLWZvcm1hdCBmb250LWZhY2UtbmFtZSBtaXNzaW5nLWdseXBoXCIuc3BsaXQoXCIgXCIpKTtCLnByb3RvdHlwZS5CPWZ1bmN0aW9uKGEsYil7dGhpcy5vLnNldChhLGIpO1xudGhpcy5tLnNldChiLmNvbnN0cnVjdG9yLGIpfTtCLnByb3RvdHlwZS5jPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm8uZ2V0KGEpfTtCLnByb3RvdHlwZS53PWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm0uZ2V0KGEpfTtCLnByb3RvdHlwZS5zPWZ1bmN0aW9uKGEpe3RoaXMuaD0hMDt0aGlzLmoucHVzaChhKX07Qi5wcm90b3R5cGUubD1mdW5jdGlvbihhKXt2YXIgYj10aGlzO3RoaXMuaCYmTyhhLGZ1bmN0aW9uKGEpe3JldHVybiBiLmcoYSl9KX07Qi5wcm90b3R5cGUuZz1mdW5jdGlvbihhKXtpZih0aGlzLmgmJiFhLl9fQ0VfcGF0Y2hlZCl7YS5fX0NFX3BhdGNoZWQ9ITA7Zm9yKHZhciBiPTA7Yjx0aGlzLmoubGVuZ3RoO2IrKyl0aGlzLmpbYl0oYSl9fTtCLnByb3RvdHlwZS5iPWZ1bmN0aW9uKGEpe3ZhciBiPVtdO08oYSxmdW5jdGlvbihhKXtyZXR1cm4gYi5wdXNoKGEpfSk7Zm9yKGE9MDthPGIubGVuZ3RoO2ErKyl7dmFyIGM9YlthXTsxPT09Yy5fX0NFX3N0YXRlP3RoaXMuY29ubmVjdGVkQ2FsbGJhY2soYyk6XG50aGlzLmkoYyl9fTtCLnByb3RvdHlwZS5hPWZ1bmN0aW9uKGEpe3ZhciBiPVtdO08oYSxmdW5jdGlvbihhKXtyZXR1cm4gYi5wdXNoKGEpfSk7Zm9yKGE9MDthPGIubGVuZ3RoO2ErKyl7dmFyIGM9YlthXTsxPT09Yy5fX0NFX3N0YXRlJiZ0aGlzLmRpc2Nvbm5lY3RlZENhbGxiYWNrKGMpfX07Qi5wcm90b3R5cGUuZj1mdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7Yj1iP2I6e307dmFyIGQ9Yi5rYnx8bmV3IFNldCxlPWIuRGF8fGZ1bmN0aW9uKGEpe3JldHVybiBjLmkoYSl9LGY9W107TyhhLGZ1bmN0aW9uKGEpe2lmKFwibGlua1wiPT09YS5sb2NhbE5hbWUmJlwiaW1wb3J0XCI9PT1hLmdldEF0dHJpYnV0ZShcInJlbFwiKSl7dmFyIGI9YS5pbXBvcnQ7YiBpbnN0YW5jZW9mIE5vZGUmJlwiY29tcGxldGVcIj09PWIucmVhZHlTdGF0ZT8oYi5fX0NFX2lzSW1wb3J0RG9jdW1lbnQ9ITAsYi5fX0NFX2hhc1JlZ2lzdHJ5PSEwKTphLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXt2YXIgYj1cbmEuaW1wb3J0O2lmKCFiLl9fQ0VfZG9jdW1lbnRMb2FkSGFuZGxlZCl7Yi5fX0NFX2RvY3VtZW50TG9hZEhhbmRsZWQ9ITA7Yi5fX0NFX2lzSW1wb3J0RG9jdW1lbnQ9ITA7Yi5fX0NFX2hhc1JlZ2lzdHJ5PSEwO3ZhciBmPW5ldyBTZXQoZCk7Zi5kZWxldGUoYik7Yy5mKGIse2tiOmYsRGE6ZX0pfX0pfWVsc2UgZi5wdXNoKGEpfSxkKTtpZih0aGlzLmgpZm9yKGE9MDthPGYubGVuZ3RoO2ErKyl0aGlzLmcoZlthXSk7Zm9yKGE9MDthPGYubGVuZ3RoO2ErKyllKGZbYV0pfTtCLnByb3RvdHlwZS5pPWZ1bmN0aW9uKGEpe2lmKHZvaWQgMD09PWEuX19DRV9zdGF0ZSl7dmFyIGI9dGhpcy5jKGEubG9jYWxOYW1lKTtpZihiKXtiLmNvbnN0cnVjdGlvblN0YWNrLnB1c2goYSk7dmFyIGM9Yi5jb25zdHJ1Y3Rvcjt0cnl7dHJ5e2lmKG5ldyBjIT09YSl0aHJvdyBFcnJvcihcIlRoZSBjdXN0b20gZWxlbWVudCBjb25zdHJ1Y3RvciBkaWQgbm90IHByb2R1Y2UgdGhlIGVsZW1lbnQgYmVpbmcgdXBncmFkZWQuXCIpO1xufWZpbmFsbHl7Yi5jb25zdHJ1Y3Rpb25TdGFjay5wb3AoKX19Y2F0Y2goZil7dGhyb3cgYS5fX0NFX3N0YXRlPTIsZjt9YS5fX0NFX3N0YXRlPTE7YS5fX0NFX2RlZmluaXRpb249YjtpZihiLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaylmb3IoYj1iLm9ic2VydmVkQXR0cmlidXRlcyxjPTA7YzxiLmxlbmd0aDtjKyspe3ZhciBkPWJbY10sZT1hLmdldEF0dHJpYnV0ZShkKTtudWxsIT09ZSYmdGhpcy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYSxkLG51bGwsZSxudWxsKX10KGEpJiZ0aGlzLmNvbm5lY3RlZENhbGxiYWNrKGEpfX19O0IucHJvdG90eXBlLmNvbm5lY3RlZENhbGxiYWNrPWZ1bmN0aW9uKGEpe3ZhciBiPWEuX19DRV9kZWZpbml0aW9uO2IuY29ubmVjdGVkQ2FsbGJhY2smJmIuY29ubmVjdGVkQ2FsbGJhY2suY2FsbChhKX07Qi5wcm90b3R5cGUuZGlzY29ubmVjdGVkQ2FsbGJhY2s9ZnVuY3Rpb24oYSl7dmFyIGI9YS5fX0NFX2RlZmluaXRpb247Yi5kaXNjb25uZWN0ZWRDYWxsYmFjayYmXG5iLmRpc2Nvbm5lY3RlZENhbGxiYWNrLmNhbGwoYSl9O0IucHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaz1mdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPWEuX19DRV9kZWZpbml0aW9uO2YuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrJiYtMTxmLm9ic2VydmVkQXR0cmlidXRlcy5pbmRleE9mKGIpJiZmLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjay5jYWxsKGEsYixjLGQsZSl9O0phLnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7dGhpcy5NJiZ0aGlzLk0uZGlzY29ubmVjdCgpfTtKYS5wcm90b3R5cGUuZj1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmEucmVhZHlTdGF0ZTtcImludGVyYWN0aXZlXCIhPT1iJiZcImNvbXBsZXRlXCIhPT1ifHx0aGlzLmMoKTtmb3IoYj0wO2I8YS5sZW5ndGg7YisrKWZvcih2YXIgYz1hW2JdLmFkZGVkTm9kZXMsZD0wO2Q8Yy5sZW5ndGg7ZCsrKXRoaXMuYi5mKGNbZF0pfTtHYi5wcm90b3R5cGUuYz1mdW5jdGlvbigpe2lmKHRoaXMuYSl0aHJvdyBFcnJvcihcIkFscmVhZHkgcmVzb2x2ZWQuXCIpO1xudGhpcy5hPXZvaWQgMDt0aGlzLmImJnRoaXMuYih2b2lkIDApfTt5LnByb3RvdHlwZS5kZWZpbmU9ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzO2lmKCEoYiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3JzIG11c3QgYmUgZnVuY3Rpb25zLlwiKTtpZighQ2MoYSkpdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVGhlIGVsZW1lbnQgbmFtZSAnXCIrYStcIicgaXMgbm90IHZhbGlkLlwiKTtpZih0aGlzLmEuYyhhKSl0aHJvdyBFcnJvcihcIkEgY3VzdG9tIGVsZW1lbnQgd2l0aCBuYW1lICdcIithK1wiJyBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQuXCIpO2lmKHRoaXMuYyl0aHJvdyBFcnJvcihcIkEgY3VzdG9tIGVsZW1lbnQgaXMgYWxyZWFkeSBiZWluZyBkZWZpbmVkLlwiKTt0aGlzLmM9ITA7dHJ5e3ZhciBkPWZ1bmN0aW9uKGEpe3ZhciBiPWVbYV07aWYodm9pZCAwIT09YiYmIShiIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IEVycm9yKFwiVGhlICdcIitcbmErXCInIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi5cIik7cmV0dXJuIGJ9LGU9Yi5wcm90b3R5cGU7aWYoIShlIGluc3RhbmNlb2YgT2JqZWN0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIGN1c3RvbSBlbGVtZW50IGNvbnN0cnVjdG9yJ3MgcHJvdG90eXBlIGlzIG5vdCBhbiBvYmplY3QuXCIpO3ZhciBmPWQoXCJjb25uZWN0ZWRDYWxsYmFja1wiKTt2YXIgZz1kKFwiZGlzY29ubmVjdGVkQ2FsbGJhY2tcIik7dmFyIGg9ZChcImFkb3B0ZWRDYWxsYmFja1wiKTt2YXIgbD1kKFwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXCIpO3ZhciBuPWIub2JzZXJ2ZWRBdHRyaWJ1dGVzfHxbXX1jYXRjaChtKXtyZXR1cm59ZmluYWxseXt0aGlzLmM9ITF9Yj17bG9jYWxOYW1lOmEsY29uc3RydWN0b3I6Yixjb25uZWN0ZWRDYWxsYmFjazpmLGRpc2Nvbm5lY3RlZENhbGxiYWNrOmcsYWRvcHRlZENhbGxiYWNrOmgsYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrOmwsb2JzZXJ2ZWRBdHRyaWJ1dGVzOm4sY29uc3RydWN0aW9uU3RhY2s6W119O1xudGhpcy5hLkIoYSxiKTt0aGlzLmcucHVzaChiKTt0aGlzLmJ8fCh0aGlzLmI9ITAsdGhpcy5mKGZ1bmN0aW9uKCl7cmV0dXJuIGMuaigpfSkpfTt5LnByb3RvdHlwZS5qPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcztpZighMSE9PXRoaXMuYil7dGhpcy5iPSExO2Zvcih2YXIgYj10aGlzLmcsYz1bXSxkPW5ldyBNYXAsZT0wO2U8Yi5sZW5ndGg7ZSsrKWQuc2V0KGJbZV0ubG9jYWxOYW1lLFtdKTt0aGlzLmEuZihkb2N1bWVudCx7RGE6ZnVuY3Rpb24oYil7aWYodm9pZCAwPT09Yi5fX0NFX3N0YXRlKXt2YXIgZT1iLmxvY2FsTmFtZSxmPWQuZ2V0KGUpO2Y/Zi5wdXNoKGIpOmEuYS5jKGUpJiZjLnB1c2goYil9fX0pO2ZvcihlPTA7ZTxjLmxlbmd0aDtlKyspdGhpcy5hLmkoY1tlXSk7Zm9yKDswPGIubGVuZ3RoOyl7dmFyIGY9Yi5zaGlmdCgpO2U9Zi5sb2NhbE5hbWU7Zj1kLmdldChmLmxvY2FsTmFtZSk7Zm9yKHZhciBnPTA7ZzxmLmxlbmd0aDtnKyspdGhpcy5hLmkoZltnXSk7KGU9dGhpcy5oLmdldChlKSkmJlxuZS5jKCl9fX07eS5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGEpe2lmKGE9dGhpcy5hLmMoYSkpcmV0dXJuIGEuY29uc3RydWN0b3J9O3kucHJvdG90eXBlLndoZW5EZWZpbmVkPWZ1bmN0aW9uKGEpe2lmKCFDYyhhKSlyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFN5bnRheEVycm9yKFwiJ1wiK2ErXCInIGlzIG5vdCBhIHZhbGlkIGN1c3RvbSBlbGVtZW50IG5hbWUuXCIpKTt2YXIgYj10aGlzLmguZ2V0KGEpO2lmKGIpcmV0dXJuIGIuZjtiPW5ldyBHYjt0aGlzLmguc2V0KGEsYik7dGhpcy5hLmMoYSkmJiF0aGlzLmcuc29tZShmdW5jdGlvbihiKXtyZXR1cm4gYi5sb2NhbE5hbWU9PT1hfSkmJmIuYygpO3JldHVybiBiLmZ9O3kucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSl7dGhpcy5pLmMoKTt2YXIgYj10aGlzLmY7dGhpcy5mPWZ1bmN0aW9uKGMpe3JldHVybiBhKGZ1bmN0aW9uKCl7cmV0dXJuIGIoYyl9KX19O3dpbmRvdy5DdXN0b21FbGVtZW50UmVnaXN0cnk9eTt5LnByb3RvdHlwZS5kZWZpbmU9XG55LnByb3RvdHlwZS5kZWZpbmU7eS5wcm90b3R5cGUuZ2V0PXkucHJvdG90eXBlLmdldDt5LnByb3RvdHlwZS53aGVuRGVmaW5lZD15LnByb3RvdHlwZS53aGVuRGVmaW5lZDt5LnByb3RvdHlwZS5wb2x5ZmlsbFdyYXBGbHVzaENhbGxiYWNrPXkucHJvdG90eXBlLmw7dmFyIEVhPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCx0ZD13aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnROUyxzZD13aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLmltcG9ydE5vZGUsdWQ9d2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5wcmVwZW5kLHZkPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuYXBwZW5kLGNlPXdpbmRvdy5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5wcmVwZW5kLGRlPXdpbmRvdy5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5hcHBlbmQsd2I9d2luZG93Lk5vZGUucHJvdG90eXBlLmNsb25lTm9kZSxpYT13aW5kb3cuTm9kZS5wcm90b3R5cGUuYXBwZW5kQ2hpbGQsXG5EYj13aW5kb3cuTm9kZS5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlLEZhPXdpbmRvdy5Ob2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCxFYj13aW5kb3cuTm9kZS5wcm90b3R5cGUucmVwbGFjZUNoaWxkLElhPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93Lk5vZGUucHJvdG90eXBlLFwidGV4dENvbnRlbnRcIiksdmI9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvdyxDYT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSxcImlubmVySFRNTFwiKSxHYT13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuZ2V0QXR0cmlidXRlLHhiPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUsemI9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZSxqYT13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuZ2V0QXR0cmlidXRlTlMseWI9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZU5TLFxuQWI9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZU5TLENiPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5pbnNlcnRBZGphY2VudEVsZW1lbnQsamQ9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnByZXBlbmQsa2Q9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmFwcGVuZCxtZD13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuYmVmb3JlLG5kPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5hZnRlcixvZD13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVwbGFjZVdpdGgscGQ9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSx4ZD13aW5kb3cuSFRNTEVsZW1lbnQsRGE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLFwiaW5uZXJIVE1MXCIpLEJiPXdpbmRvdy5IVE1MRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50LEZiPW5ldyBmdW5jdGlvbigpe30sdGE9d2luZG93LmN1c3RvbUVsZW1lbnRzO1xuaWYoIXRhfHx0YS5mb3JjZVBvbHlmaWxsfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiB0YS5kZWZpbmV8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIHRhLmdldCl7dmFyIFk9bmV3IEI7d2QoWSk7cmQoWSk7SGEoWSxEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZSx7WjpjZSxhcHBlbmQ6ZGV9KTtxZChZKTtpZChZKTtkb2N1bWVudC5fX0NFX2hhc1JlZ2lzdHJ5PSEwO3ZhciBlZT1uZXcgeShZKTtPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LFwiY3VzdG9tRWxlbWVudHNcIix7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITAsdmFsdWU6ZWV9KX12YXIgST17U1RZTEVfUlVMRToxLGRhOjcsTUVESUFfUlVMRTo0LG5hOjFFM30sRj17WWE6L1xcL1xcKlteKl0qXFwqKyhbXi8qXVteKl0qXFwqKykqXFwvL2dpbSxwb3J0Oi9AaW1wb3J0W147XSo7L2dpbSx3YTovKD86XlteO1xcLVxcc31dKyk/LS1bXjt7fV0qPzpbXnt9O10qPyg/Ols7XFxuXXwkKS9naW0sQWE6Lyg/Ol5bXjtcXC1cXHN9XSspPy0tW147e31dKj86W157fTtdKj97W159XSo/fSg/Ols7XFxuXXwkKT8vZ2ltLFxuZWI6L0BhcHBseVxccypcXCg/W14pO10qXFwpP1xccyooPzpbO1xcbl18JCk/L2dpbSxqYjovW147Ol0qPzpbXjtdKj92YXJcXChbXjtdKlxcKSg/Ols7XFxuXXwkKT8vZ2ltLGNiOi9eQFteXFxzXSprZXlmcmFtZXMvLEJhOi9cXHMrL2d9LHo9ISh3aW5kb3cuU2hhZHlET00mJndpbmRvdy5TaGFkeURPTS5pblVzZSk7aWYod2luZG93LlNoYWR5Q1NTJiZ2b2lkIDAhPT13aW5kb3cuU2hhZHlDU1MubmF0aXZlQ3NzKXZhciBBPXdpbmRvdy5TaGFkeUNTUy5uYXRpdmVDc3M7ZWxzZSB3aW5kb3cuU2hhZHlDU1M/KEZjKHdpbmRvdy5TaGFkeUNTUyksd2luZG93LlNoYWR5Q1NTPXZvaWQgMCk6RmMod2luZG93LldlYkNvbXBvbmVudHMmJndpbmRvdy5XZWJDb21wb25lbnRzLmZsYWdzKTt2YXIgdWE9Lyg/Ol58WztcXHN7XVxccyopKC0tW1xcdy1dKj8pXFxzKjpcXHMqKD86KCg/OicoPzpcXFxcJ3wuKSo/J3xcIig/OlxcXFxcInwuKSo/XCJ8XFwoW14pXSo/XFwpfFtefTt7XSkrKXxcXHsoW159XSopXFx9KD86KD89WztcXHN9XSl8JCkpL2dpLFxudmE9Lyg/Ol58XFxXKylAYXBwbHlcXHMqXFwoPyhbXik7XFxuXSopXFwpPy9naSxmZT0vKC0tW1xcdy1dKylcXHMqKFs6LDspXXwkKS9naSxnZT0vKGFuaW1hdGlvblxccyo6KXwoYW5pbWF0aW9uLW5hbWVcXHMqOikvLFJkPS9AbWVkaWFcXHMoLiopLyxoZT0vXFx7W159XSpcXH0vZyxRPW51bGw7dS5wcm90b3R5cGUuYj1mdW5jdGlvbihhLGIsYyl7YS5fX3N0eWxlU2NvcGVkP2EuX19zdHlsZVNjb3BlZD1udWxsOnRoaXMuaihhLGJ8fFwiXCIsYyl9O3UucHJvdG90eXBlLmo9ZnVuY3Rpb24oYSxiLGMpe2Eubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSYmdGhpcy5oKGEsYixjKTtpZihhPVwidGVtcGxhdGVcIj09PWEubG9jYWxOYW1lPyhhLmNvbnRlbnR8fGEub2IpLmNoaWxkTm9kZXM6YS5jaGlsZHJlbnx8YS5jaGlsZE5vZGVzKWZvcih2YXIgZD0wO2Q8YS5sZW5ndGg7ZCsrKXRoaXMuaihhW2RdLGIsYyl9O3UucHJvdG90eXBlLmg9ZnVuY3Rpb24oYSxiLGMpe2lmKGIpaWYoYS5jbGFzc0xpc3QpYz8oYS5jbGFzc0xpc3QucmVtb3ZlKFwic3R5bGUtc2NvcGVcIiksXG5hLmNsYXNzTGlzdC5yZW1vdmUoYikpOihhLmNsYXNzTGlzdC5hZGQoXCJzdHlsZS1zY29wZVwiKSxhLmNsYXNzTGlzdC5hZGQoYikpO2Vsc2UgaWYoYS5nZXRBdHRyaWJ1dGUpe3ZhciBkPWEuZ2V0QXR0cmlidXRlKGllKTtjP2QmJihiPWQucmVwbGFjZShcInN0eWxlLXNjb3BlXCIsXCJcIikucmVwbGFjZShiLFwiXCIpLHFhKGEsYikpOnFhKGEsKGQ/ZCtcIiBcIjpcIlwiKStcInN0eWxlLXNjb3BlIFwiK2IpfX07dS5wcm90b3R5cGUuYz1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9YS5fX2Nzc0J1aWxkO3p8fFwic2hhZHlcIj09PWQ/Yj1WKGIsYyk6KGE9UihhKSxiPXRoaXMuRyhiLGEuaXMsYS5WLGMpK1wiXFxuXFxuXCIpO3JldHVybiBiLnRyaW0oKX07dS5wcm90b3R5cGUuRz1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZT10aGlzLmYoYixjKTtiPXRoaXMuaShiKTt2YXIgZj10aGlzO3JldHVybiBWKGEsZnVuY3Rpb24oYSl7YS5jfHwoZi5JKGEsYixlKSxhLmM9ITApO2QmJmQoYSxiLGUpfSl9O3UucHJvdG90eXBlLmk9ZnVuY3Rpb24oYSl7cmV0dXJuIGE/XG5qZSthOlwiXCJ9O3UucHJvdG90eXBlLmY9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYj9cIltpcz1cIithK1wiXVwiOmF9O3UucHJvdG90eXBlLkk9ZnVuY3Rpb24oYSxiLGMpe3RoaXMubChhLHRoaXMuZyxiLGMpfTt1LnByb3RvdHlwZS5sPWZ1bmN0aW9uKGEsYixjLGQpe2Euc2VsZWN0b3I9YS52PXRoaXMubShhLGIsYyxkKX07dS5wcm90b3R5cGUubT1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1hLnNlbGVjdG9yLnNwbGl0KFBjKTtpZighR2MoYSkpe2E9MDtmb3IodmFyIGY9ZS5sZW5ndGgsZzthPGYmJihnPWVbYV0pO2ErKyllW2FdPWIuY2FsbCh0aGlzLGcsYyxkKX1yZXR1cm4gZS5qb2luKFBjKX07dS5wcm90b3R5cGUucz1mdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKG1iLGZ1bmN0aW9uKGEsYyxkKXstMTxkLmluZGV4T2YoXCIrXCIpP2Q9ZC5yZXBsYWNlKC9cXCsvZyxcIl9fX1wiKTotMTxkLmluZGV4T2YoXCJfX19cIikmJihkPWQucmVwbGFjZSgvX19fL2csXCIrXCIpKTtyZXR1cm5cIjpcIitjK1wiKFwiK1xuZCtcIilcIn0pfTt1LnByb3RvdHlwZS5nPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLGU9ITE7YT1hLnRyaW0oKTt2YXIgZj1tYi50ZXN0KGEpO2YmJihhPWEucmVwbGFjZShtYixmdW5jdGlvbihhLGIsYyl7cmV0dXJuXCI6XCIrYitcIihcIitjLnJlcGxhY2UoL1xccy9nLFwiXCIpK1wiKVwifSksYT10aGlzLnMoYSkpO2E9YS5yZXBsYWNlKGtlLG5iK1wiICQxXCIpO2E9YS5yZXBsYWNlKGxlLGZ1bmN0aW9uKGEsZixnKXtlfHwoYT1kLkIoZyxmLGIsYyksZT1lfHxhLnN0b3AsZj1hLlhhLGc9YS52YWx1ZSk7cmV0dXJuIGYrZ30pO2YmJihhPXRoaXMucyhhKSk7cmV0dXJuIGF9O3UucHJvdG90eXBlLkI9ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9YS5pbmRleE9mKG9iKTswPD1hLmluZGV4T2YobmIpP2E9dGhpcy5GKGEsZCk6MCE9PWUmJihhPWM/dGhpcy5vKGEsYyk6YSk7Yz0hMTswPD1lJiYoYj1cIlwiLGM9ITApO2lmKGMpe3ZhciBmPSEwO2MmJihhPWEucmVwbGFjZShtZSxmdW5jdGlvbihhLGIpe3JldHVyblwiID4gXCIrXG5ifSkpfWE9YS5yZXBsYWNlKG5lLGZ1bmN0aW9uKGEsYixjKXtyZXR1cm4nW2Rpcj1cIicrYysnXCJdICcrYitcIiwgXCIrYisnW2Rpcj1cIicrYysnXCJdJ30pO3JldHVybnt2YWx1ZTphLFhhOmIsc3RvcDpmfX07dS5wcm90b3R5cGUubz1mdW5jdGlvbihhLGIpe2E9YS5zcGxpdChRYyk7YVswXSs9YjtyZXR1cm4gYS5qb2luKFFjKX07dS5wcm90b3R5cGUuRj1mdW5jdGlvbihhLGIpe3ZhciBjPWEubWF0Y2goUmMpO3JldHVybihjPWMmJmNbMl0udHJpbSgpfHxcIlwiKT9jWzBdLm1hdGNoKFNjKT9hLnJlcGxhY2UoUmMsZnVuY3Rpb24oYSxjLGYpe3JldHVybiBiK2Z9KTpjLnNwbGl0KFNjKVswXT09PWI/YzpvZTphLnJlcGxhY2UobmIsYil9O3UucHJvdG90eXBlLkg9ZnVuY3Rpb24oYSl7YS5zZWxlY3Rvcj1hLnBhcnNlZFNlbGVjdG9yO3RoaXMudyhhKTt0aGlzLmwoYSx0aGlzLkspfTt1LnByb3RvdHlwZS53PWZ1bmN0aW9uKGEpe2Euc2VsZWN0b3I9PT1wZSYmKGEuc2VsZWN0b3I9XCJodG1sXCIpfTtcbnUucHJvdG90eXBlLks9ZnVuY3Rpb24oYSl7cmV0dXJuIGEubWF0Y2gob2IpP3RoaXMuZyhhLFRjKTp0aGlzLm8oYS50cmltKCksVGMpfTtKLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHUucHJvdG90eXBlLHthOntjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm5cInN0eWxlLXNjb3BlXCJ9fX0pO3ZhciBtYj0vOihudGhbLVxcd10rKVxcKChbXildKylcXCkvLFRjPVwiOm5vdCguc3R5bGUtc2NvcGUpXCIsUGM9XCIsXCIsbGU9LyhefFtcXHM+K35dKykoKD86XFxbLis/XFxdfFteXFxzPit+PVtdKSspL2csU2M9L1tbLjojKl0vLG5iPVwiOmhvc3RcIixwZT1cIjpyb290XCIsb2I9XCI6OnNsb3R0ZWRcIixrZT1uZXcgUmVnRXhwKFwiXihcIitvYitcIilcIiksUmM9Lyg6aG9zdCkoPzpcXCgoKD86XFwoW14pKF0qXFwpfFteKShdKikrPylcXCkpLyxtZT0vKD86OjpzbG90dGVkKSg/OlxcKCgoPzpcXChbXikoXSpcXCl8W14pKF0qKSs/KVxcKSkvLG5lPS8oLiopOmRpclxcKCg/OihsdHJ8cnRsKSlcXCkvLFxuamU9XCIuXCIsUWM9XCI6XCIsaWU9XCJjbGFzc1wiLG9lPVwic2hvdWxkX25vdF9tYXRjaFwiLHA9bmV3IHU7di5nZXQ9ZnVuY3Rpb24oYSl7cmV0dXJuIGE/YS5fX3N0eWxlSW5mbzpudWxsfTt2LnNldD1mdW5jdGlvbihhLGIpe3JldHVybiBhLl9fc3R5bGVJbmZvPWJ9O3YucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5EfTt2LnByb3RvdHlwZS5fZ2V0U3R5bGVSdWxlcz12LnByb3RvdHlwZS5jO3ZhciBVYz1mdW5jdGlvbihhKXtyZXR1cm4gYS5tYXRjaGVzfHxhLm1hdGNoZXNTZWxlY3Rvcnx8YS5tb3pNYXRjaGVzU2VsZWN0b3J8fGEubXNNYXRjaGVzU2VsZWN0b3J8fGEub01hdGNoZXNTZWxlY3Rvcnx8YS53ZWJraXRNYXRjaGVzU2VsZWN0b3J9KHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSkscWU9bmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChcIlRyaWRlbnRcIik7bi5wcm90b3R5cGUuSD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLGM9e30sZD1bXSxlPTA7VyhhLGZ1bmN0aW9uKGEpe2IuYyhhKTtcbmEuaW5kZXg9ZSsrO2IuRyhhLnUuY3NzVGV4dCxjKX0sZnVuY3Rpb24oYSl7ZC5wdXNoKGEpfSk7YS5iPWQ7YT1bXTtmb3IodmFyIGYgaW4gYylhLnB1c2goZik7cmV0dXJuIGF9O24ucHJvdG90eXBlLmM9ZnVuY3Rpb24oYSl7aWYoIWEudSl7dmFyIGI9e30sYz17fTt0aGlzLmIoYSxjKSYmKGIuQz1jLGEucnVsZXM9bnVsbCk7Yi5jc3NUZXh0PXRoaXMuRihhKTthLnU9Yn19O24ucHJvdG90eXBlLmI9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLnU7aWYoYyl7aWYoYy5DKXJldHVybiBPYmplY3QuYXNzaWduKGIsYy5DKSwhMH1lbHNle2M9YS5wYXJzZWRDc3NUZXh0O2Zvcih2YXIgZDthPXVhLmV4ZWMoYyk7KXtkPShhWzJdfHxhWzNdKS50cmltKCk7aWYoXCJpbmhlcml0XCIhPT1kfHxcInVuc2V0XCIhPT1kKWJbYVsxXS50cmltKCldPWQ7ZD0hMH1yZXR1cm4gZH19O24ucHJvdG90eXBlLkY9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuSyhhLnBhcnNlZENzc1RleHQpfTtuLnByb3RvdHlwZS5LPWZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoaGUsXG5cIlwiKS5yZXBsYWNlKHVhLFwiXCIpfTtuLnByb3RvdHlwZS5HPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjO2M9ZmUuZXhlYyhhKTspe3ZhciBkPWNbMV07XCI6XCIhPT1jWzJdJiYoYltkXT0hMCl9fTtuLnByb3RvdHlwZS5hYT1mdW5jdGlvbihhKXtmb3IodmFyIGI9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYSksYz0wLGQ7YzxiLmxlbmd0aDtjKyspZD1iW2NdLGFbZF09dGhpcy5hKGFbZF0sYSl9O24ucHJvdG90eXBlLmE9ZnVuY3Rpb24oYSxiKXtpZihhKWlmKDA8PWEuaW5kZXhPZihcIjtcIikpYT10aGlzLmYoYSxiKTtlbHNle3ZhciBjPXRoaXM7YT1JYyhhLGZ1bmN0aW9uKGEsZSxmLGcpe2lmKCFlKXJldHVybiBhK2c7KGU9Yy5hKGJbZV0sYikpJiZcImluaXRpYWxcIiE9PWU/XCJhcHBseS1zaGltLWluaGVyaXRcIj09PWUmJihlPVwiaW5oZXJpdFwiKTplPWMuYShiW2ZdfHxmLGIpfHxmO3JldHVybiBhKyhlfHxcIlwiKStnfSl9cmV0dXJuIGEmJmEudHJpbSgpfHxcIlwifTtuLnByb3RvdHlwZS5mPWZ1bmN0aW9uKGEsXG5iKXthPWEuc3BsaXQoXCI7XCIpO2Zvcih2YXIgYz0wLGQsZTtjPGEubGVuZ3RoO2MrKylpZihkPWFbY10pe3ZhLmxhc3RJbmRleD0wO2lmKGU9dmEuZXhlYyhkKSlkPXRoaXMuYShiW2VbMV1dLGIpO2Vsc2UgaWYoZT1kLmluZGV4T2YoXCI6XCIpLC0xIT09ZSl7dmFyIGY9ZC5zdWJzdHJpbmcoZSk7Zj1mLnRyaW0oKTtmPXRoaXMuYShmLGIpfHxmO2Q9ZC5zdWJzdHJpbmcoMCxlKStmfWFbY109ZCYmZC5sYXN0SW5kZXhPZihcIjtcIik9PT1kLmxlbmd0aC0xP2Quc2xpY2UoMCwtMSk6ZHx8XCJcIn1yZXR1cm4gYS5qb2luKFwiO1wiKX07bi5wcm90b3R5cGUuQj1mdW5jdGlvbihhLGIpe3ZhciBjPVwiXCI7YS51fHx0aGlzLmMoYSk7YS51LmNzc1RleHQmJihjPXRoaXMuZihhLnUuY3NzVGV4dCxiKSk7YS5jc3NUZXh0PWN9O24ucHJvdG90eXBlLnc9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLmNzc1RleHQsZD1hLmNzc1RleHQ7bnVsbD09YS55YSYmKGEueWE9Z2UudGVzdChjKSk7aWYoYS55YSlpZihudWxsPT1cbmEuWSl7YS5ZPVtdO2Zvcih2YXIgZSBpbiBiKWQ9YltlXSxkPWQoYyksYyE9PWQmJihjPWQsYS5ZLnB1c2goZSkpfWVsc2V7Zm9yKGU9MDtlPGEuWS5sZW5ndGg7KytlKWQ9YlthLllbZV1dLGM9ZChjKTtkPWN9YS5jc3NUZXh0PWR9O24ucHJvdG90eXBlLk89ZnVuY3Rpb24oYSxiKXt2YXIgYz17fSxkPXRoaXMsZT1bXTtXKGEsZnVuY3Rpb24oYSl7YS51fHxkLmMoYSk7dmFyIGY9YS52fHxhLnBhcnNlZFNlbGVjdG9yO2ImJmEudS5DJiZmJiZVYy5jYWxsKGIsZikmJihkLmIoYSxjKSxhPWEuaW5kZXgsZj1wYXJzZUludChhLzMyLDEwKSxlW2ZdPShlW2ZdfHwwKXwxPDxhJTMyKX0sbnVsbCwhMCk7cmV0dXJue0M6YyxrZXk6ZX19O24ucHJvdG90eXBlLmNhPWZ1bmN0aW9uKGEsYixjLGQpe2IudXx8dGhpcy5jKGIpO2lmKGIudS5DKXt2YXIgZT1SKGEpO2E9ZS5pcztlPWUuVjtlPWE/cC5mKGEsZSk6XCJodG1sXCI7dmFyIGY9Yi5wYXJzZWRTZWxlY3RvcixnPVwiOmhvc3QgPiAqXCI9PT1mfHxcblwiaHRtbFwiPT09ZixoPTA9PT1mLmluZGV4T2YoXCI6aG9zdFwiKSYmIWc7XCJzaGFkeVwiPT09YyYmKGc9Zj09PWUrXCIgPiAqLlwiK2V8fC0xIT09Zi5pbmRleE9mKFwiaHRtbFwiKSxoPSFnJiYwPT09Zi5pbmRleE9mKGUpKTtcInNoYWRvd1wiPT09YyYmKGc9XCI6aG9zdCA+ICpcIj09PWZ8fFwiaHRtbFwiPT09ZixoPWgmJiFnKTtpZihnfHxoKWM9ZSxoJiYoeiYmIWIudiYmKGIudj1wLm0oYixwLmcscC5pKGEpLGUpKSxjPWIudnx8ZSksZCh7aWI6YyxiYjpoLHFiOmd9KX19O24ucHJvdG90eXBlLkk9ZnVuY3Rpb24oYSxiKXt2YXIgYz17fSxkPXt9LGU9dGhpcyxmPWImJmIuX19jc3NCdWlsZDtXKGIsZnVuY3Rpb24oYil7ZS5jYShhLGIsZixmdW5jdGlvbihmKXtVYy5jYWxsKGEucGJ8fGEsZi5pYikmJihmLmJiP2UuYihiLGMpOmUuYihiLGQpKX0pfSxudWxsLCEwKTtyZXR1cm57Z2I6ZCxhYjpjfX07bi5wcm90b3R5cGUuYmE9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMsZT1SKGEpLGY9cC5mKGUuaXMsXG5lLlYpLGc9bmV3IFJlZ0V4cChcIig/Ol58W14uI1s6XSlcIisoYS5leHRlbmRzP1wiXFxcXFwiK2Yuc2xpY2UoMCwtMSkrXCJcXFxcXVwiOmYpK1wiKCR8Wy46W1xcXFxzPit+XSlcIik7ZT12LmdldChhKS5EO3ZhciBoPXRoaXMuaChlLGMpO3JldHVybiBwLmMoYSxlLGZ1bmN0aW9uKGEpe2QuQihhLGIpO3p8fEdjKGEpfHwhYS5jc3NUZXh0fHwoZC53KGEsaCksZC5sKGEsZyxmLGMpKX0pfTtuLnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEsYil7YT1hLmI7dmFyIGM9e307aWYoIXomJmEpZm9yKHZhciBkPTAsZT1hW2RdO2Q8YS5sZW5ndGg7ZT1hWysrZF0pdGhpcy5qKGUsYiksY1tlLmtleWZyYW1lc05hbWVdPXRoaXMuaShlKTtyZXR1cm4gY307bi5wcm90b3R5cGUuaT1mdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuIGIucmVwbGFjZShhLmYsYS5hKX19O24ucHJvdG90eXBlLmo9ZnVuY3Rpb24oYSxiKXthLmY9bmV3IFJlZ0V4cChhLmtleWZyYW1lc05hbWUsXCJnXCIpO2EuYT1hLmtleWZyYW1lc05hbWUrXG5cIi1cIitiO2Eudj1hLnZ8fGEuc2VsZWN0b3I7YS5zZWxlY3Rvcj1hLnYucmVwbGFjZShhLmtleWZyYW1lc05hbWUsYS5hKX07bi5wcm90b3R5cGUubD1mdW5jdGlvbihhLGIsYyxkKXthLnY9YS52fHxhLnNlbGVjdG9yO2Q9XCIuXCIrZDtmb3IodmFyIGU9YS52LnNwbGl0KFwiLFwiKSxmPTAsZz1lLmxlbmd0aCxoO2Y8ZyYmKGg9ZVtmXSk7ZisrKWVbZl09aC5tYXRjaChiKT9oLnJlcGxhY2UoYyxkKTpkK1wiIFwiK2g7YS5zZWxlY3Rvcj1lLmpvaW4oXCIsXCIpfTtuLnByb3RvdHlwZS5vPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1hLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiLGU9ZDtjJiYoZT1kLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFxzKngtc2NvcGVcXFxccypcIitjK1wiXFxcXHMqXCIsXCJnXCIpLFwiIFwiKSk7ZSs9KGU/XCIgXCI6XCJcIikrXCJ4LXNjb3BlIFwiK2I7ZCE9PWUmJnFhKGEsZSl9O24ucHJvdG90eXBlLnM9ZnVuY3Rpb24oYSxiLGMsZCl7Yj1kP2QudGV4dENvbnRlbnR8fFwiXCI6dGhpcy5iYShhLGIsYyk7dmFyIGU9XG52LmdldChhKSxmPWUuYTtmJiYheiYmZiE9PWQmJihmLl91c2VDb3VudC0tLDA+PWYuX3VzZUNvdW50JiZmLnBhcmVudE5vZGUmJmYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmKSk7ej9lLmE/KGUuYS50ZXh0Q29udGVudD1iLGQ9ZS5hKTpiJiYoZD1lYihiLGMsYS5zaGFkb3dSb290LGUuYikpOmQ/ZC5wYXJlbnROb2RlfHwocWUmJi0xPGIuaW5kZXhPZihcIkBtZWRpYVwiKSYmKGQudGV4dENvbnRlbnQ9YiksSGMoZCxudWxsLGUuYikpOmImJihkPWViKGIsYyxudWxsLGUuYikpO2QmJihkLl91c2VDb3VudD1kLl91c2VDb3VudHx8MCxlLmEhPWQmJmQuX3VzZUNvdW50KyssZS5hPWQpO3JldHVybiBkfTtuLnByb3RvdHlwZS5tPWZ1bmN0aW9uKGEsYil7dmFyIGM9cGEoYSksZD10aGlzO2EudGV4dENvbnRlbnQ9VihjLGZ1bmN0aW9uKGEpe3ZhciBjPWEuY3NzVGV4dD1hLnBhcnNlZENzc1RleHQ7YS51JiZhLnUuY3NzVGV4dCYmKGM9Yy5yZXBsYWNlKEYud2EsXCJcIikucmVwbGFjZShGLkFhLFxuXCJcIiksYS5jc3NUZXh0PWQuZihjLGIpKX0pfTtKLk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG4ucHJvdG90eXBlLHtnOntjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm5cIngtc2NvcGVcIn19fSk7dmFyIE09bmV3IG4scGI9e30sd2E9d2luZG93LmN1c3RvbUVsZW1lbnRzO2lmKHdhJiYheil7dmFyIHJlPXdhLmRlZmluZTt3YS5kZWZpbmU9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCIgU2hhZHkgRE9NIHN0eWxlcyBmb3IgXCIrYStcIiBcIiksZT1kb2N1bWVudC5oZWFkO2UuaW5zZXJ0QmVmb3JlKGQsKFE/US5uZXh0U2libGluZzpudWxsKXx8ZS5maXJzdENoaWxkKTtRPWQ7cGJbYV09ZDtyZXR1cm4gcmUuY2FsbCh3YSxhLGIsYyl9fWhhLnByb3RvdHlwZS5hPWZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9MDtkPGMubGVuZ3RoO2QrKyl7dmFyIGU9Y1tkXTtpZihhLkNbZV0hPT1iW2VdKXJldHVybiExfXJldHVybiEwfTtcbmhhLnByb3RvdHlwZS5iPWZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXRoaXMuY2FjaGVbYV18fFtdO2UucHVzaCh7QzpiLHN0eWxlRWxlbWVudDpjLEE6ZH0pO2UubGVuZ3RoPnRoaXMuYyYmZS5zaGlmdCgpO3RoaXMuY2FjaGVbYV09ZX07aGEucHJvdG90eXBlLmZldGNoPWZ1bmN0aW9uKGEsYixjKXtpZihhPXRoaXMuY2FjaGVbYV0pZm9yKHZhciBkPWEubGVuZ3RoLTE7MDw9ZDtkLS0pe3ZhciBlPWFbZF07aWYodGhpcy5hKGUsYixjKSlyZXR1cm4gZX19O2lmKCF6KXt2YXIgVmM9bmV3IE11dGF0aW9uT2JzZXJ2ZXIoSmMpLFdjPWZ1bmN0aW9uKGEpe1ZjLm9ic2VydmUoYSx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KX07aWYod2luZG93LmN1c3RvbUVsZW1lbnRzJiYhd2luZG93LmN1c3RvbUVsZW1lbnRzLnBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2spV2MoZG9jdW1lbnQpO2Vsc2V7dmFyIHFiPWZ1bmN0aW9uKCl7V2MoZG9jdW1lbnQuYm9keSl9O3dpbmRvdy5IVE1MSW1wb3J0cz9cbndpbmRvdy5IVE1MSW1wb3J0cy53aGVuUmVhZHkocWIpOnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe2lmKFwibG9hZGluZ1wiPT09ZG9jdW1lbnQucmVhZHlTdGF0ZSl7dmFyIGE9ZnVuY3Rpb24oKXtxYigpO2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsYSl9O2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsYSl9ZWxzZSBxYigpfSl9Tj1mdW5jdGlvbigpe0pjKFZjLnRha2VSZWNvcmRzKCkpfX12YXIgcmE9e30sVWQ9UHJvbWlzZS5yZXNvbHZlKCksZmI9bnVsbCxMYz13aW5kb3cuSFRNTEltcG9ydHMmJndpbmRvdy5IVE1MSW1wb3J0cy53aGVuUmVhZHl8fG51bGwsZ2IseGE9bnVsbCxmYT1udWxsO3EucHJvdG90eXBlLnhhPWZ1bmN0aW9uKCl7IXRoaXMuZW5xdWV1ZWQmJmZhJiYodGhpcy5lbnF1ZXVlZD0hMCx1YihmYSkpfTtxLnByb3RvdHlwZS5iPWZ1bmN0aW9uKGEpe2EuX19zZWVuQnlTaGFkeUNTU3x8XG4oYS5fX3NlZW5CeVNoYWR5Q1NTPSEwLHRoaXMuY3VzdG9tU3R5bGVzLnB1c2goYSksdGhpcy54YSgpKX07cS5wcm90b3R5cGUuYT1mdW5jdGlvbihhKXtyZXR1cm4gYS5fX3NoYWR5Q1NTQ2FjaGVkU3R5bGU/YS5fX3NoYWR5Q1NTQ2FjaGVkU3R5bGU6YS5nZXRTdHlsZT9hLmdldFN0eWxlKCk6YX07cS5wcm90b3R5cGUuYz1mdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLmN1c3RvbVN0eWxlcyxiPTA7YjxhLmxlbmd0aDtiKyspe3ZhciBjPWFbYl07aWYoIWMuX19zaGFkeUNTU0NhY2hlZFN0eWxlKXt2YXIgZD10aGlzLmEoYyk7ZCYmKGQ9ZC5fX2FwcGxpZWRFbGVtZW50fHxkLHhhJiZ4YShkKSxjLl9fc2hhZHlDU1NDYWNoZWRTdHlsZT1kKX19cmV0dXJuIGF9O3EucHJvdG90eXBlLmFkZEN1c3RvbVN0eWxlPXEucHJvdG90eXBlLmI7cS5wcm90b3R5cGUuZ2V0U3R5bGVGb3JDdXN0b21TdHlsZT1xLnByb3RvdHlwZS5hO3EucHJvdG90eXBlLnByb2Nlc3NTdHlsZXM9cS5wcm90b3R5cGUuYztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHEucHJvdG90eXBlLHt0cmFuc2Zvcm1DYWxsYmFjazp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHhhfSxzZXQ6ZnVuY3Rpb24oYSl7eGE9YX19LHZhbGlkYXRlQ2FsbGJhY2s6e2dldDpmdW5jdGlvbigpe3JldHVybiBmYX0sc2V0OmZ1bmN0aW9uKGEpe3ZhciBiPSExO2ZhfHwoYj0hMCk7ZmE9YTtiJiZ0aGlzLnhhKCl9fX0pO3ZhciBYYz1uZXcgaGE7Zy5wcm90b3R5cGUudz1mdW5jdGlvbigpe04oKX07Zy5wcm90b3R5cGUuST1mdW5jdGlvbihhKXt2YXIgYj10aGlzLm1bYV09KHRoaXMubVthXXx8MCkrMTtyZXR1cm4gYStcIi1cIitifTtnLnByb3RvdHlwZS5IYT1mdW5jdGlvbihhKXtyZXR1cm4gcGEoYSl9O2cucHJvdG90eXBlLkphPWZ1bmN0aW9uKGEpe3JldHVybiBWKGEpfTtnLnByb3RvdHlwZS5IPWZ1bmN0aW9uKGEpe2E9YS5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdHlsZVwiKTtmb3IodmFyIGI9W10sYz0wO2M8YS5sZW5ndGg7YysrKXt2YXIgZD1cbmFbY107Yi5wdXNoKGQudGV4dENvbnRlbnQpO2QucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkKX1yZXR1cm4gYi5qb2luKFwiXCIpLnRyaW0oKX07Zy5wcm90b3R5cGUuYWE9ZnVuY3Rpb24oYSl7cmV0dXJuKGE9YS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCJzdHlsZVwiKSk/YS5nZXRBdHRyaWJ1dGUoXCJjc3MtYnVpbGRcIil8fFwiXCI6XCJcIn07Zy5wcm90b3R5cGUucHJlcGFyZVRlbXBsYXRlPWZ1bmN0aW9uKGEsYixjKXtpZighYS5mKXthLmY9ITA7YS5uYW1lPWI7YS5leHRlbmRzPWM7cmFbYl09YTt2YXIgZD10aGlzLmFhKGEpLGU9dGhpcy5IKGEpO2M9e2lzOmIsZXh0ZW5kczpjLG1iOmR9O3p8fHAuYihhLmNvbnRlbnQsYik7dGhpcy5jKCk7dmFyIGY9dmEudGVzdChlKXx8dWEudGVzdChlKTt2YS5sYXN0SW5kZXg9MDt1YS5sYXN0SW5kZXg9MDtlPWRiKGUpO2YmJkEmJnRoaXMuYSYmdGhpcy5hLnRyYW5zZm9ybVJ1bGVzKGUsYik7YS5fc3R5bGVBc3Q9ZTthLmc9ZDtkPVtdO0F8fChkPU0uSChhLl9zdHlsZUFzdCkpO1xuaWYoIWQubGVuZ3RofHxBKWI9dGhpcy5PKGMsYS5fc3R5bGVBc3Qsej9hLmNvbnRlbnQ6bnVsbCxwYltiXSksYS5hPWI7YS5jPWR9fTtnLnByb3RvdHlwZS5PPWZ1bmN0aW9uKGEsYixjLGQpe2I9cC5jKGEsYik7aWYoYi5sZW5ndGgpcmV0dXJuIGViKGIsYS5pcyxjLGQpfTtnLnByb3RvdHlwZS5jYT1mdW5jdGlvbihhKXt2YXIgYj1SKGEpLGM9Yi5pcztiPWIuVjt2YXIgZD1wYltjXTtjPXJhW2NdO2lmKGMpe3ZhciBlPWMuX3N0eWxlQXN0O3ZhciBmPWMuY31yZXR1cm4gdi5zZXQoYSxuZXcgdihlLGQsZiwwLGIpKX07Zy5wcm90b3R5cGUuRj1mdW5jdGlvbigpeyF0aGlzLmEmJndpbmRvdy5TaGFkeUNTUyYmd2luZG93LlNoYWR5Q1NTLkFwcGx5U2hpbSYmKHRoaXMuYT13aW5kb3cuU2hhZHlDU1MuQXBwbHlTaGltLHRoaXMuYS5pbnZhbGlkQ2FsbGJhY2s9U2QpfTtnLnByb3RvdHlwZS5HPWZ1bmN0aW9uKCl7dmFyIGE9dGhpczshdGhpcy5iJiZ3aW5kb3cuU2hhZHlDU1MmJndpbmRvdy5TaGFkeUNTUy5DdXN0b21TdHlsZUludGVyZmFjZSYmXG4odGhpcy5iPXdpbmRvdy5TaGFkeUNTUy5DdXN0b21TdHlsZUludGVyZmFjZSx0aGlzLmIudHJhbnNmb3JtQ2FsbGJhY2s9ZnVuY3Rpb24oYil7YS5zKGIpfSx0aGlzLmIudmFsaWRhdGVDYWxsYmFjaz1mdW5jdGlvbigpe3JlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpeyhhLmIuZW5xdWV1ZWR8fGEuaSkmJmEuZigpfSl9KX07Zy5wcm90b3R5cGUuYz1mdW5jdGlvbigpe3RoaXMuRigpO3RoaXMuRygpfTtnLnByb3RvdHlwZS5mPWZ1bmN0aW9uKCl7dGhpcy5jKCk7aWYodGhpcy5iKXt2YXIgYT10aGlzLmIucHJvY2Vzc1N0eWxlcygpO3RoaXMuYi5lbnF1ZXVlZCYmKEE/dGhpcy5GYShhKToodGhpcy5vKHRoaXMuZyx0aGlzLmgpLHRoaXMuQihhKSksdGhpcy5iLmVucXVldWVkPSExLHRoaXMuaSYmIUEmJnRoaXMuc3R5bGVEb2N1bWVudCgpKX19O2cucHJvdG90eXBlLnN0eWxlRWxlbWVudD1mdW5jdGlvbihhLGIpe3ZhciBjPVIoYSkuaXMsZD12LmdldChhKTtkfHwoZD10aGlzLmNhKGEpKTtcbnRoaXMuaihhKXx8KHRoaXMuaT0hMCk7YiYmKGQuTj1kLk58fHt9LE9iamVjdC5hc3NpZ24oZC5OLGIpKTtpZihBKXtpZihkLk4pe2I9ZC5OO2Zvcih2YXIgZSBpbiBiKW51bGw9PT1lP2Euc3R5bGUucmVtb3ZlUHJvcGVydHkoZSk6YS5zdHlsZS5zZXRQcm9wZXJ0eShlLGJbZV0pfWlmKCgoZT1yYVtjXSl8fHRoaXMuaihhKSkmJmUmJmUuYSYmIUtjKGUpKXtpZihLYyhlKXx8ZS5fYXBwbHlTaGltVmFsaWRhdGluZ1ZlcnNpb24hPT1lLl9hcHBseVNoaW1OZXh0VmVyc2lvbil0aGlzLmMoKSx0aGlzLmEmJnRoaXMuYS50cmFuc2Zvcm1SdWxlcyhlLl9zdHlsZUFzdCxjKSxlLmEudGV4dENvbnRlbnQ9cC5jKGEsZC5EKSxUZChlKTt6JiYoYz1hLnNoYWRvd1Jvb3QpJiYoYy5xdWVyeVNlbGVjdG9yKFwic3R5bGVcIikudGV4dENvbnRlbnQ9cC5jKGEsZC5EKSk7ZC5EPWUuX3N0eWxlQXN0fX1lbHNlIHRoaXMubyhhLGQpLGQubGEmJmQubGEubGVuZ3RoJiZ0aGlzLksoYSxkKX07Zy5wcm90b3R5cGUubD1cbmZ1bmN0aW9uKGEpe3JldHVybihhPWEuZ2V0Um9vdE5vZGUoKS5ob3N0KT92LmdldChhKT9hOnRoaXMubChhKTp0aGlzLmd9O2cucHJvdG90eXBlLmo9ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT10aGlzLmd9O2cucHJvdG90eXBlLks9ZnVuY3Rpb24oYSxiKXt2YXIgYz1SKGEpLmlzLGQ9WGMuZmV0Y2goYyxiLkosYi5sYSksZT1kP2Quc3R5bGVFbGVtZW50Om51bGwsZj1iLkE7Yi5BPWQmJmQuQXx8dGhpcy5JKGMpO2U9TS5zKGEsYi5KLGIuQSxlKTt6fHxNLm8oYSxiLkEsZik7ZHx8WGMuYihjLGIuSixlLGIuQSl9O2cucHJvdG90eXBlLm89ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmwoYSksZD12LmdldChjKTtjPU9iamVjdC5jcmVhdGUoZC5KfHxudWxsKTt2YXIgZT1NLkkoYSxiLkQpO2E9TS5PKGQuRCxhKS5DO09iamVjdC5hc3NpZ24oYyxlLmFiLGEsZS5nYik7dGhpcy5iYShjLGIuTik7TS5hYShjKTtiLko9Y307Zy5wcm90b3R5cGUuYmE9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGMgaW4gYil7dmFyIGQ9XG5iW2NdO2lmKGR8fDA9PT1kKWFbY109ZH19O2cucHJvdG90eXBlLnN0eWxlRG9jdW1lbnQ9ZnVuY3Rpb24oYSl7dGhpcy5zdHlsZVN1YnRyZWUodGhpcy5nLGEpfTtnLnByb3RvdHlwZS5zdHlsZVN1YnRyZWU9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLnNoYWRvd1Jvb3Q7KGN8fHRoaXMuaihhKSkmJnRoaXMuc3R5bGVFbGVtZW50KGEsYik7aWYoYj1jJiYoYy5jaGlsZHJlbnx8Yy5jaGlsZE5vZGVzKSlmb3IoYT0wO2E8Yi5sZW5ndGg7YSsrKXRoaXMuc3R5bGVTdWJ0cmVlKGJbYV0pO2Vsc2UgaWYoYT1hLmNoaWxkcmVufHxhLmNoaWxkTm9kZXMpZm9yKGI9MDtiPGEubGVuZ3RoO2IrKyl0aGlzLnN0eWxlU3VidHJlZShhW2JdKX07Zy5wcm90b3R5cGUuRmE9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPTA7YjxhLmxlbmd0aDtiKyspe3ZhciBjPXRoaXMuYi5nZXRTdHlsZUZvckN1c3RvbVN0eWxlKGFbYl0pO2MmJnRoaXMuRWEoYyl9fTtnLnByb3RvdHlwZS5CPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1cbjA7YjxhLmxlbmd0aDtiKyspe3ZhciBjPXRoaXMuYi5nZXRTdHlsZUZvckN1c3RvbVN0eWxlKGFbYl0pO2MmJk0ubShjLHRoaXMuaC5KKX19O2cucHJvdG90eXBlLnM9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcyxjPXBhKGEpO1coYyxmdW5jdGlvbihhKXt6P3AudyhhKTpwLkgoYSk7QSYmKGIuYygpLGIuYSYmYi5hLnRyYW5zZm9ybVJ1bGUoYSkpfSk7QT9hLnRleHRDb250ZW50PVYoYyk6dGhpcy5oLkQucnVsZXMucHVzaChjKX07Zy5wcm90b3R5cGUuRWE9ZnVuY3Rpb24oYSl7aWYoQSYmdGhpcy5hKXt2YXIgYj1wYShhKTt0aGlzLmMoKTt0aGlzLmEudHJhbnNmb3JtUnVsZXMoYik7YS50ZXh0Q29udGVudD1WKGIpfX07Zy5wcm90b3R5cGUuZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlPWZ1bmN0aW9uKGEsYil7dmFyIGM7QXx8KGM9KHYuZ2V0KGEpfHx2LmdldCh0aGlzLmwoYSkpKS5KW2JdKTtyZXR1cm4oYz1jfHx3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhKS5nZXRQcm9wZXJ0eVZhbHVlKGIpKT9cbmMudHJpbSgpOlwiXCJ9O2cucHJvdG90eXBlLklhPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5nZXRSb290Tm9kZSgpO2I9Yj9iLnNwbGl0KC9cXHMvKTpbXTtjPWMuaG9zdCYmYy5ob3N0LmxvY2FsTmFtZTtpZighYyl7dmFyIGQ9YS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKTtpZihkKXtkPWQuc3BsaXQoL1xccy8pO2Zvcih2YXIgZT0wO2U8ZC5sZW5ndGg7ZSsrKWlmKGRbZV09PT1wLmEpe2M9ZFtlKzFdO2JyZWFrfX19YyYmYi5wdXNoKHAuYSxjKTtBfHwoYz12LmdldChhKSkmJmMuQSYmYi5wdXNoKE0uZyxjLkEpO3FhKGEsYi5qb2luKFwiIFwiKSl9O2cucHJvdG90eXBlLkdhPWZ1bmN0aW9uKGEpe3JldHVybiB2LmdldChhKX07Zy5wcm90b3R5cGUuZmx1c2g9Zy5wcm90b3R5cGUudztnLnByb3RvdHlwZS5wcmVwYXJlVGVtcGxhdGU9Zy5wcm90b3R5cGUucHJlcGFyZVRlbXBsYXRlO2cucHJvdG90eXBlLnN0eWxlRWxlbWVudD1nLnByb3RvdHlwZS5zdHlsZUVsZW1lbnQ7Zy5wcm90b3R5cGUuc3R5bGVEb2N1bWVudD1cbmcucHJvdG90eXBlLnN0eWxlRG9jdW1lbnQ7Zy5wcm90b3R5cGUuc3R5bGVTdWJ0cmVlPWcucHJvdG90eXBlLnN0eWxlU3VidHJlZTtnLnByb3RvdHlwZS5nZXRDb21wdXRlZFN0eWxlVmFsdWU9Zy5wcm90b3R5cGUuZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlO2cucHJvdG90eXBlLnNldEVsZW1lbnRDbGFzcz1nLnByb3RvdHlwZS5JYTtnLnByb3RvdHlwZS5fc3R5bGVJbmZvRm9yTm9kZT1nLnByb3RvdHlwZS5HYTtnLnByb3RvdHlwZS50cmFuc2Zvcm1DdXN0b21TdHlsZUZvckRvY3VtZW50PWcucHJvdG90eXBlLnM7Zy5wcm90b3R5cGUuZ2V0U3R5bGVBc3Q9Zy5wcm90b3R5cGUuSGE7Zy5wcm90b3R5cGUuc3R5bGVBc3RUb1N0cmluZz1nLnByb3RvdHlwZS5KYTtnLnByb3RvdHlwZS5mbHVzaEN1c3RvbVN0eWxlcz1nLnByb3RvdHlwZS5mO09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGcucHJvdG90eXBlLHtuYXRpdmVTaGFkb3c6e2dldDpmdW5jdGlvbigpe3JldHVybiB6fX0sbmF0aXZlQ3NzOntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQX19fSk7XG52YXIgSD1uZXcgZztpZih3aW5kb3cuU2hhZHlDU1Mpe3ZhciBZYz13aW5kb3cuU2hhZHlDU1MuQXBwbHlTaGltO3ZhciBaYz13aW5kb3cuU2hhZHlDU1MuQ3VzdG9tU3R5bGVJbnRlcmZhY2V9d2luZG93LlNoYWR5Q1NTPXtTY29waW5nU2hpbTpILHByZXBhcmVUZW1wbGF0ZTpmdW5jdGlvbihhLGIsYyl7SC5mKCk7SC5wcmVwYXJlVGVtcGxhdGUoYSxiLGMpfSxzdHlsZVN1YnRyZWU6ZnVuY3Rpb24oYSxiKXtILmYoKTtILnN0eWxlU3VidHJlZShhLGIpfSxzdHlsZUVsZW1lbnQ6ZnVuY3Rpb24oYSl7SC5mKCk7SC5zdHlsZUVsZW1lbnQoYSl9LHN0eWxlRG9jdW1lbnQ6ZnVuY3Rpb24oYSl7SC5mKCk7SC5zdHlsZURvY3VtZW50KGEpfSxnZXRDb21wdXRlZFN0eWxlVmFsdWU6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gSC5nZXRDb21wdXRlZFN0eWxlVmFsdWUoYSxiKX0sbmF0aXZlQ3NzOkEsbmF0aXZlU2hhZG93Onp9O1ljJiYod2luZG93LlNoYWR5Q1NTLkFwcGx5U2hpbT1ZYyk7WmMmJih3aW5kb3cuU2hhZHlDU1MuQ3VzdG9tU3R5bGVJbnRlcmZhY2U9XG5aYyk7dmFyIHJiPXdpbmRvdy5jdXN0b21FbGVtZW50cyx5YT13aW5kb3cuSFRNTEltcG9ydHM7d2luZG93LldlYkNvbXBvbmVudHM9d2luZG93LldlYkNvbXBvbmVudHN8fHt9O2lmKHJiJiZyYi5wb2x5ZmlsbFdyYXBGbHVzaENhbGxiYWNrKXt2YXIgemEsJGM9ZnVuY3Rpb24oKXtpZih6YSl7dmFyIGE9emE7emE9bnVsbDthKCk7cmV0dXJuITB9fSxhZD15YS53aGVuUmVhZHk7cmIucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjayhmdW5jdGlvbihhKXt6YT1hO2FkKCRjKX0pO3lhLndoZW5SZWFkeT1mdW5jdGlvbihhKXthZChmdW5jdGlvbigpeyRjKCk/eWEud2hlblJlYWR5KGEpOmEoKX0pfX15YS53aGVuUmVhZHkoZnVuY3Rpb24oKXtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXt3aW5kb3cuV2ViQ29tcG9uZW50cy5yZWFkeT0hMDtkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIldlYkNvbXBvbmVudHNSZWFkeVwiLHtidWJibGVzOiEwfSkpfSl9KTtcbnZhciBiZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7YmQudGV4dENvbnRlbnQ9XCJib2R5IHt0cmFuc2l0aW9uOiBvcGFjaXR5IGVhc2UtaW4gMC4yczsgfSBcXG5ib2R5W3VucmVzb2x2ZWRdIHtvcGFjaXR5OiAwOyBkaXNwbGF5OiBibG9jazsgb3ZlcmZsb3c6IGhpZGRlbjsgcG9zaXRpb246IHJlbGF0aXZlOyB9IFxcblwiO3ZhciBjZD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZFwiKTtjZC5pbnNlcnRCZWZvcmUoYmQsY2QuZmlyc3RDaGlsZCl9KSgpO30pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYmNvbXBvbmVudHMtaGktc2QtY2UuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ad2ViY29tcG9uZW50cy93ZWJjb21wb25lbnRzanMvd2ViY29tcG9uZW50cy1oaS1zZC1jZS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBMYXllciB9IGZyb20gJ2NvbW1vbi9MYXllcic7XHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBMRVggfSBmcm9tICdMRVgnO1xyXG5pbXBvcnQgeyBMaW5lUmFzdGVyaXplciB9IGZyb20gJ2xpbmUtcmFzdGVyaXplci9MaW5lUmFzdGVyaXplcic7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gJ1N0YWdlJztcclxuaW1wb3J0IHsgVUlDb250cm9sbGVyIH0gZnJvbSAndWkvVUlDb250cm9sbGVyJztcclxuXHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiB7XHJcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gIHByaXZhdGUgdWlDb250cm9sbGVyOiBVSUNvbnRyb2xsZXI7XHJcbiAgcHJpdmF0ZSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHsgbGluZVJhc3Rlcml6ZXI6IG5ldyBMaW5lUmFzdGVyaXplcigpLCBjYW52YXM6IHRoaXMuY2FudmFzIH0pO1xyXG4gICAgdGhpcy5zdGFnZSA9IG5ldyBTdGFnZSgpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBuZXcgRXZlbnRBZ2dyZWdhdG9yKCk7XHJcblxyXG4gICAgdGhpcy51aUNvbnRyb2xsZXIgPSBuZXcgVUlDb250cm9sbGVyKHtcclxuICAgICAgcmVuZGVyZXI6IHRoaXMucmVuZGVyZXIsXHJcbiAgICAgIHN0YWdlOiB0aGlzLnN0YWdlLFxyXG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIGNvbnN0IHBvbHlnb25MYXllciA9IG5ldyBMYXllcihMRVguUE9MWUdPTl9MQVlFUl9OQU1FKTtcclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLnB1c2gocG9seWdvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLnVpQ29udHJvbGxlci5pbml0KCk7XHJcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMudWlDb250cm9sbGVyLmRlc3Ryb3koKTtcclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyKGV2ZW50OiBSZW5kZXJFdmVudCkge1xyXG4gICAgdGhpcy5yZW5kZXJlci5jbGVhcigpO1xyXG4gICAgdGhpcy5zdGFnZS5yZW5kZXIodGhpcy5yZW5kZXJlcik7XHJcbiAgICBldmVudC5oYW5kbGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFJlbmRlckV2ZW50LmV2ZW50VHlwZSwgdGhpcy5yZW5kZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoUmVuZGVyRXZlbnQuZXZlbnRUeXBlLCB0aGlzLnJlbmRlcik7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL0FwcGxpY2F0aW9uLnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5pbXBvcnQgeyBFdmVudFF1ZXVlIH0gZnJvbSAnZXZlbnRzL0V2ZW50UXVldWUnO1xyXG5cclxudHlwZSBFdmVudExpc3RlbmVyID0gKGV2ZW50OiBBcHBFdmVudCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudEFnZ3JlZ2F0b3Ige1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbGlzdGVuZXJNYXAgPSBuZXcgTWFwPHN0cmluZywgRXZlbnRMaXN0ZW5lcltdPigpO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRRdWV1ZSA9IG5ldyBFdmVudFF1ZXVlKCk7XHJcbiAgcHJpdmF0ZSBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmdldEV2ZW50TGlzdGVuZXJzKGV2ZW50VHlwZSk7XHJcblxyXG4gICAgaWYgKGV2ZW50TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpID09PSAtMSkge1xyXG4gICAgICBldmVudExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyTWFwLnNldChldmVudFR5cGUsIGV2ZW50TGlzdGVuZXJzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmdldEV2ZW50TGlzdGVuZXJzKGV2ZW50VHlwZSk7XHJcbiAgICBjb25zdCBsaXN0ZW5lckluZGV4ID0gZXZlbnRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XHJcblxyXG4gICAgaWYgKGxpc3RlbmVySW5kZXggIT09IC0xKSB7XHJcbiAgICAgIGV2ZW50TGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lckluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyTWFwLnNldChldmVudFR5cGUsIGV2ZW50TGlzdGVuZXJzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwYXRjaEV2ZW50KGV2ZW50OiBBcHBFdmVudCkge1xyXG4gICAgdGhpcy5ldmVudFF1ZXVlLmVucXVldWUoZXZlbnQpO1xyXG5cclxuICAgIGlmICghdGhpcy5pc0Rpc3BhdGNoaW5nKSB7XHJcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudEZyb21RdWV1ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaEV2ZW50RnJvbVF1ZXVlKCkge1xyXG4gICAgdGhpcy5pc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBldmVudCA9IHRoaXMuZXZlbnRRdWV1ZS5kZXF1ZXVlKCk7XHJcbiAgICBjb25zdCBldmVudExpc3RlbmVycyA9IHRoaXMuZ2V0RXZlbnRMaXN0ZW5lcnMoZXZlbnQuZXZlbnRUeXBlKTtcclxuICAgIGV2ZW50TGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoZXZlbnQpKTtcclxuXHJcbiAgICBpZiAodGhpcy5ldmVudFF1ZXVlLmlzRW1wdHkoKSkge1xyXG4gICAgICB0aGlzLmlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudEZyb21RdWV1ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRFdmVudExpc3RlbmVycyhldmVudFR5cGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJNYXAuZ2V0KGV2ZW50VHlwZSkgfHwgW107XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3IudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRRdWV1ZSB7XHJcbiAgcHJpdmF0ZSBfcXVldWU6IEFwcEV2ZW50W10gPSBbXTtcclxuXHJcbiAgcHVibGljIGVucXVldWUoZXZlbnQ6IEFwcEV2ZW50KSB7XHJcbiAgICB0aGlzLl9xdWV1ZS5wdXNoKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXF1ZXVlKCk6IEFwcEV2ZW50IHtcclxuICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1F1ZXVlIGlzIGVtcHR5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlLnNwbGljZSgwLCAxKVswXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcXVldWUubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRMZW5ndGgoKSA9PT0gMDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL0V2ZW50UXVldWUudHMiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IG9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9ucywgcmV2ZXJzZU9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9ucyB9IGZyb20gJ2xpbmUtcmFzdGVyaXplci9vY3RhbnQtdmVjdG9yLXRyYW5zZm9ybWF0aW9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZVJhc3Rlcml6ZXIge1xyXG4gIHB1YmxpYyByYXN0ZXJpemVMaW5lKFxyXG4gICAgc3RhcnRQb2ludDogUG9pbnQsXHJcbiAgICBlbmRQb2ludDogUG9pbnQsXHJcbiAgICB0aGlja25lc3M6IG51bWJlclxyXG4gICk6IFBvaW50W10ge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25WZWN0b3IgPSBQb2ludC5zdWJ0cmFjdChlbmRQb2ludCwgc3RhcnRQb2ludCk7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvblZlY3Rvck9jdGFudCA9IHRyYW5zbGF0aW9uVmVjdG9yLmdldE9jdGFudCgpO1xyXG4gICAgY29uc3QgdmVjdG9yVHJhbnNmb3JtYXRpb24gPVxyXG4gICAgICBvY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnNbdHJhbnNsYXRpb25WZWN0b3JPY3RhbnRdO1xyXG4gICAgY29uc3QgcmV2ZXJzZVZlY3RvclRyYW5zZm9ybWF0aW9uID1cclxuICAgICAgcmV2ZXJzZU9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9uc1t0cmFuc2xhdGlvblZlY3Rvck9jdGFudF07XHJcblxyXG4gICAgY29uc3QgcmFzdGVyaXplZFRyYW5zZm9ybWVkTGluZSA9IHRoaXMucmFzdGVyaXplTGluZUZpcnN0UXVhZHJhbnQoXHJcbiAgICAgIHZlY3RvclRyYW5zZm9ybWF0aW9uKHRyYW5zbGF0aW9uVmVjdG9yKSxcclxuICAgICAgdGhpY2tuZXNzXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiByYXN0ZXJpemVkVHJhbnNmb3JtZWRMaW5lLm1hcChwb2ludCA9PlxyXG4gICAgICBQb2ludC5hZGQocmV2ZXJzZVZlY3RvclRyYW5zZm9ybWF0aW9uKHBvaW50KSwgc3RhcnRQb2ludClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJhc3Rlcml6ZUxpbmVGaXJzdFF1YWRyYW50KGVuZFBvaW50OiBQb2ludCwgdGhpY2tuZXNzOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHJhc3Rlcml6ZWRMaW5lOiBQb2ludFtdID0gW107XHJcblxyXG4gICAgY29uc3QgZHggPSBlbmRQb2ludC54O1xyXG4gICAgY29uc3QgZHkgPSBlbmRQb2ludC55O1xyXG4gICAgY29uc3QgaW5jcmVtZW50RSA9IDIgKiBkeTtcclxuICAgIGNvbnN0IGluY3JlbWVudE5FID0gMiAqIChkeSAtIGR4KTtcclxuXHJcbiAgICBsZXQgZCA9IDIgKiBkeSAtIGR4O1xyXG4gICAgbGV0IHggPSAwO1xyXG4gICAgbGV0IHkgPSAwO1xyXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiB0aGlzLmdldFRoaWNrUG9pbnRzSXRlcmF0b3JJbkZpcnN0UXVhZHJhbnQoXHJcbiAgICAgIG5ldyBQb2ludCh4LCB5KSxcclxuICAgICAgdGhpY2tuZXNzXHJcbiAgICApKSB7XHJcbiAgICAgIHJhc3Rlcml6ZWRMaW5lLnB1c2gocG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICh4IDwgZW5kUG9pbnQueCkge1xyXG4gICAgICBpZiAoZCA8IDApIHtcclxuICAgICAgICBkICs9IGluY3JlbWVudEU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZCArPSBpbmNyZW1lbnRORTtcclxuICAgICAgICB5ICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgeCArPSAxO1xyXG5cclxuICAgICAgZm9yIChjb25zdCBwb2ludCBvZiB0aGlzLmdldFRoaWNrUG9pbnRzSXRlcmF0b3JJbkZpcnN0UXVhZHJhbnQoXHJcbiAgICAgICAgbmV3IFBvaW50KHgsIHkpLFxyXG4gICAgICAgIHRoaWNrbmVzc1xyXG4gICAgICApKSB7XHJcbiAgICAgICAgcmFzdGVyaXplZExpbmUucHVzaChwb2ludCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmFzdGVyaXplZExpbmU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlICpnZXRUaGlja1BvaW50c0l0ZXJhdG9ySW5GaXJzdFF1YWRyYW50KFxyXG4gICAgcG9pbnQ6IFBvaW50LFxyXG4gICAgdGhpY2tuZXNzOiBudW1iZXJcclxuICApIHtcclxuICAgIGxldCBkeSA9IDE7XHJcblxyXG4gICAgeWllbGQgcG9pbnQ7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGN1cnJlbnRUaGlja25lc3MgPSAxO1xyXG4gICAgICBjdXJyZW50VGhpY2tuZXNzIDwgdGhpY2tuZXNzO1xyXG4gICAgICBjdXJyZW50VGhpY2tuZXNzICs9IDFcclxuICAgICkge1xyXG4gICAgICB5aWVsZCBuZXcgUG9pbnQocG9pbnQueCwgcG9pbnQueSArIGR5KTtcclxuICAgICAgZHkgPSAtZHk7XHJcblxyXG4gICAgICBpZiAoZHkgPiAwKSB7XHJcbiAgICAgICAgZHkgKz0gMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9saW5lLXJhc3Rlcml6ZXIvTGluZVJhc3Rlcml6ZXIudHMiLCJpbXBvcnQgeyBPY3RhbnQgfSBmcm9tICdjb21tb24vT2N0YW50JztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuLy8gVHJhbnNmb3JtYXRpb25zIGZyb20gYSBzcGVjaWZpYyBvY3RhbnQgdG8gdGhlIGZpcnN0IG9jdGFudFxyXG5jb25zdCBvY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnMgPSB7XHJcbiAgW09jdGFudC5GaXJzdF06IChwOiBQb2ludCkgPT4gcCxcclxuICBbT2N0YW50LlNlY29uZF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueSwgcC54KSxcclxuICBbT2N0YW50LlRoaXJkXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQocC55LCAtcC54KSxcclxuICBbT2N0YW50LkZvdXJ0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLngsIHAueSksXHJcbiAgW09jdGFudC5GaWZ0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLngsIC1wLnkpLFxyXG4gIFtPY3RhbnQuU2l4dGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC55LCAtcC54KSxcclxuICBbT2N0YW50LlNldmVudGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC55LCBwLngpLFxyXG4gIFtPY3RhbnQuRWlnaHRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQocC54LCAtcC55KVxyXG59O1xyXG5cclxuLy8gVHJhbnNmb3JtYXRpb25zIGZyb20gdGhlIGZpcnN0IG9jdGFudCB0byBhIHNwZWNpZmljIG9jdGFudFxyXG5jb25zdCByZXZlcnNlT2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zID0ge1xyXG4gIFtPY3RhbnQuRmlyc3RdOiAocDogUG9pbnQpID0+IHAsXHJcbiAgW09jdGFudC5TZWNvbmRdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludChwLnksIHAueCksXHJcbiAgW09jdGFudC5UaGlyZF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLnksIHAueCksXHJcbiAgW09jdGFudC5Gb3VydGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC54LCBwLnkpLFxyXG4gIFtPY3RhbnQuRmlmdGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC54LCAtcC55KSxcclxuICBbT2N0YW50LlNpeHRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueSwgLXAueCksXHJcbiAgW09jdGFudC5TZXZlbnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQocC55LCAtcC54KSxcclxuICBbT2N0YW50LkVpZ2h0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueCwgLXAueSlcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgb2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zLFxyXG4gIHJldmVyc2VPY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnNcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbGluZS1yYXN0ZXJpemVyL29jdGFudC12ZWN0b3ItdHJhbnNmb3JtYXRpb25zLnRzIiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb21tb24vQ29sb3InO1xyXG5pbXBvcnQgeyBDT0xPUlMgfSBmcm9tICdjb21tb24vQ09MT1JTJztcclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgTGluZVByb3BlcnRpZXMgfSBmcm9tICdjb21tb24vTGluZVByb3BlcnRpZXMnO1xyXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnY29tbW9uL1BhdGgnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lUmFzdGVyaXplciB9IGZyb20gJ2xpbmUtcmFzdGVyaXplci9MaW5lUmFzdGVyaXplcic7XHJcblxyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcblxyXG5pbnRlcmZhY2UgUmVuZGVyZXJEZXBlbmRlbmNpZXMge1xyXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgbGluZVJhc3Rlcml6ZXI6IExpbmVSYXN0ZXJpemVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xyXG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBwcml2YXRlIHJlbmRlcmluZ0NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICBwcml2YXRlIGxpbmVSYXN0ZXJpemVyOiBMaW5lUmFzdGVyaXplcjtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBSZW5kZXJlckRlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkZXBlbmRlbmNpZXMuY2FudmFzO1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBpZiAoY29udGV4dCA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBnZXQgY2FudmFzIDJkIHJlbmRlcmluZyBjb250ZXh0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJpbmdDb250ZXh0ID0gY29udGV4dDtcclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dC5mb250ID0gY29uZmlndXJhdGlvbi5jYW52YXNGb250O1xyXG4gICAgdGhpcy5saW5lUmFzdGVyaXplciA9IGRlcGVuZGVuY2llcy5saW5lUmFzdGVyaXplcjtcclxuICAgIHRoaXMuc2V0RmlsbENvbG9yKENPTE9SUy5CTEFDSyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhd1BvaW50KHBvaW50OiBQb2ludCkge1xyXG4gICAgdGhpcy5kcmF3UGl4ZWwocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhd1BpeGVsKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbnRleHQuZmlsbFJlY3QoeCwgeSwgMSwgMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhd0xpbmUobGluZTogTGluZSwgbGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzKTogdm9pZDtcclxuICBwdWJsaWMgZHJhd0xpbmUoc3RhcnRQb2ludDogUG9pbnQsIGVuZFBvaW50OiBQb2ludCwgbGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzKTogdm9pZDtcclxuXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLWFueVxyXG4gIHB1YmxpYyBkcmF3TGluZSguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgaWYgKGFyZ3NbMF0gaW5zdGFuY2VvZiBMaW5lKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyYXdMaW5lQmV0d2VlblBvaW50cyhhcmdzWzBdLnAxLCBhcmdzWzBdLnAyLCBhcmdzWzFdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyYXdMaW5lQmV0d2VlblBvaW50cyhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3UGF0aChwYXRoOiBQYXRoKSB7XHJcbiAgICBjb25zdCBwYXRoTGluZVByb3BlcnRpZXMgPSBwYXRoLmdldExpbmVQcm9wZXJ0aWVzKCk7XHJcblxyXG4gICAgZm9yIChjb25zdCBsaW5lIG9mIHBhdGguZ2V0TGluZUl0ZXJhdG9yKCkpIHtcclxuICAgICAgdGhpcy5kcmF3TGluZShsaW5lLCBwYXRoTGluZVByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgUG9seWdvbikge1xyXG4gICAgICB0aGlzLmRyYXdMaW5lQ29uZGl0aW9ucyhwYXRoLmdldExpbmVDb25kaXRpb25zKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbGxUZXh0KHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkO1xyXG4gIHB1YmxpYyBmaWxsVGV4dCh0ZXh0OiBzdHJpbmcsIHBvaW50OiBQb2ludCk6IHZvaWQ7XHJcbiAgcHVibGljIGZpbGxUZXh0KHRleHQ6IHN0cmluZywgcG9pbnRPclg6IG51bWJlciB8IFBvaW50LCB5PzogbnVtYmVyKSB7XHJcbiAgICBsZXQgeCA9IHBvaW50T3JYO1xyXG4gICAgaWYgKHR5cGVvZiBwb2ludE9yWCA9PT0gJ29iamVjdCcgJiYgcG9pbnRPclggaW5zdGFuY2VvZiBQb2ludCkge1xyXG4gICAgICB4ID0gcG9pbnRPclgueDtcclxuICAgICAgeSA9IHBvaW50T3JYLnk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJpbmdDb250ZXh0LmZpbGxUZXh0KHRleHQsIDxudW1iZXI+eCwgPG51bWJlcj55KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpIHtcclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RmlsbENvbG9yKGNvbG9yOiBDb2xvcikge1xyXG4gICAgdGhpcy5yZW5kZXJpbmdDb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yLmZpbGxTdHlsZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZHJhd0xpbmVCZXR3ZWVuUG9pbnRzKFxyXG4gICAgc3RhcnRQb2ludDogUG9pbnQsXHJcbiAgICBlbmRQb2ludDogUG9pbnQsXHJcbiAgICBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXNcclxuICApIHtcclxuICAgIGNvbnN0IHJhc3Rlcml6ZWRMaW5lUG9pbnRzID0gdGhpcy5saW5lUmFzdGVyaXplci5yYXN0ZXJpemVMaW5lKFxyXG4gICAgICBzdGFydFBvaW50LFxyXG4gICAgICBlbmRQb2ludCxcclxuICAgICAgbGluZVByb3BlcnRpZXMudGhpY2tuZXNzXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2V0RmlsbENvbG9yKGxpbmVQcm9wZXJ0aWVzLmNvbG9yKTtcclxuICAgIHJhc3Rlcml6ZWRMaW5lUG9pbnRzLmZvckVhY2gocG9pbnQgPT4gdGhpcy5kcmF3UG9pbnQocG9pbnQpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZHJhd0xpbmVDb25kaXRpb25zKGxpbmVDb25kaXRpb25zOiBMaW5lQ29uZGl0aW9uW10pIHtcclxuICAgIGxpbmVDb25kaXRpb25zLmZvckVhY2gobGluZUNvbmRpdGlvbiA9PiB7XHJcbiAgICAgIHRoaXMuZmlsbFRleHQoXHJcbiAgICAgICAgbGluZUNvbmRpdGlvbi5nZXRMYWJlbCgpLFxyXG4gICAgICAgIFBvaW50LmFkZChsaW5lQ29uZGl0aW9uLmxpbmUuZ2V0TWlkZGxlUG9pbnQoKSwgY29uZmlndXJhdGlvbi5saW5lQ29uZGl0aW9uTGFiZWxPZmZzZXQpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvUmVuZGVyZXIudHMiLCJleHBvcnQgY2xhc3MgQ29sb3Ige1xyXG4gIHB1YmxpYyByZWFkb25seSByOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGc6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgYjogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBmaWxsU3R5bGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocjogbnVtYmVyLCBiOiBudW1iZXIsIGc6IG51bWJlcikge1xyXG4gICAgdGhpcy5yID0gcjtcclxuICAgIHRoaXMuYiA9IGI7XHJcbiAgICB0aGlzLmcgPSBnO1xyXG5cclxuICAgIHRoaXMuZmlsbFN0eWxlID0gYHJnYigke3RoaXMucn0sICR7dGhpcy5nfSwgJHt0aGlzLmJ9KWA7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9Db2xvci50cyIsImltcG9ydCB7IExheWVyIH0gZnJvbSAnY29tbW9uL0xheWVyJztcclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRUZXN0UmVzdWx0IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgbGluZTogTGluZTtcclxuICBwdWJsaWMgcGF0aD86IFBhdGg7XHJcbiAgcHVibGljIGxheWVyPzogTGF5ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxpbmU6IExpbmUsIHBhdGg/OiBQYXRoLCBsYXllcj86IExheWVyKSB7XHJcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0hpdFRlc3RSZXN1bHQudHMiLCJpbXBvcnQgeyBIaXRUZXN0UmVzdWx0IH0gZnJvbSAnY29tbW9uL0hpdFRlc3RSZXN1bHQnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJ2NvbW1vbi9MYXllcic7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdSZW5kZXJlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhZ2Uge1xyXG4gIHB1YmxpYyBsYXllcnM6IExheWVyW10gPSBbXTtcclxuXHJcbiAgcHVibGljIHJlbmRlcihyZW5kZXJlcjogUmVuZGVyZXIpIHtcclxuICAgIHRoaXMubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4gbGF5ZXIucmVuZGVyKHJlbmRlcmVyKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubGF5ZXJzLmluZGV4T2YobGF5ZXIpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaXRUZXN0KHBvaW50OiBQb2ludCk6IEhpdFRlc3RSZXN1bHQgfCBudWxsIHtcclxuICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGhpcy5sYXllcnMpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gbGF5ZXIuaGl0VGVzdChwb2ludCk7XHJcbiAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZExheWVyQnlOYW1lKG5hbWU6IHN0cmluZyk6IExheWVyIHtcclxuICAgIGNvbnN0IGZvdW5kTGF5ZXIgPSB0aGlzLmxheWVycy5maW5kKGxheWVyID0+IGxheWVyLm5hbWUgPT09IG5hbWUpO1xyXG5cclxuICAgIGlmICghZm91bmRMYXllcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYExheWVyIHdpdGggbmFtZSAke25hbWV9IGRvZXMgbm90IGV4aXN0YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvdW5kTGF5ZXI7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL1N0YWdlLnRzIiwiaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBMRVggfSBmcm9tICdMRVgnO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJ1JlbmRlcmVyJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdTdGFnZSc7XHJcblxyXG5pbXBvcnQgeyBVSUNvbmRpdGlvbkNvbnRyb2xsZXIgfSBmcm9tICd1aS9jb25kaXRpb25zL1VJQ29uZGl0aW9uQ29udHJvbGxlcic7XHJcbmltcG9ydCB7IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciB9IGZyb20gJ3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcic7XHJcbmltcG9ydCB7IE5ld1BvbHlnb25VSUNvbnRyb2xsZXIgfSBmcm9tICd1aS9OZXdQb2x5Z29uVUlDb250cm9sbGVyJztcclxuaW1wb3J0IHsgUG9pbnREcmFnZ2luZ1NlcnZpY2UgfSBmcm9tICd1aS9Qb2ludERyYWdnaW5nU2VydmljZSc7XHJcbmltcG9ydCB7IFBvaW50SW5zZXJ0ZXJTZXJ2aWNlIH0gZnJvbSAndWkvUG9pbnRJbnNlcnRlclNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2ludFJlbW92ZXJTZXJ2aWNlIH0gZnJvbSAndWkvUG9pbnRSZW1vdmVyU2VydmljZSc7XHJcbmltcG9ydCB7IFBvaW50U3luY1NlcnZpY2UgfSBmcm9tICd1aS9Qb2ludFN5bmNTZXJ2aWNlJztcclxuaW1wb3J0IHsgVUlTZXJ2aWNlIH0gZnJvbSAndWkvVUlTZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IENvbmRpdGlvbk1hdGNoZXIgfSBmcm9tICdjb25kaXRpb25zL0NvbmRpdGlvbk1hdGNoZXInO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IExpbmVDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL0xpbmVDbGlja0V2ZW50JztcclxuXHJcbmltcG9ydCAndWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zQnV0dG9uJztcclxuaW1wb3J0ICd1aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cnO1xyXG5cclxuaW50ZXJmYWNlIFVJQ29udHJvbGxlckRlcGVuZGVuY2llcyB7XHJcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVUlDb250cm9sbGVyIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICBwcml2YXRlIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHVpU2VydmljZXM6IFVJU2VydmljZVtdID0gW107XHJcbiAgcHJpdmF0ZSBuZXdQb2x5Z29uVUlDb250cm9sbGVyOiBOZXdQb2x5Z29uVUlDb250cm9sbGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFVJQ29udHJvbGxlckRlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkZXBlbmRlbmNpZXMuY2FudmFzO1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IGRlcGVuZGVuY2llcy5yZW5kZXJlcjtcclxuICAgIHRoaXMuc3RhZ2UgPSBkZXBlbmRlbmNpZXMuc3RhZ2U7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIGNvbnN0IGFwcGxpY2F0aW9uVUlDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25maWd1cmF0aW9uLmFwcGxpY2F0aW9uVUlDb250YWluZXJJRCk7XHJcbiAgICBpZiAoIWFwcGxpY2F0aW9uVUlDb250YWluZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcHBsaWNhdGlvbiBVSSBjb250YWluZXIgbm90IGZvdW5kJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyID0gYXBwbGljYXRpb25VSUNvbnRhaW5lcjtcclxuXHJcbiAgICB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciA9IG5ldyBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIodGhpcy5jYW52YXMpO1xyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlTmV3UG9seWdvblVJQ29udHJvbGxlcigpO1xyXG4gICAgdGhpcy5jcmVhdGVQb2ludERyYWdnaW5nU2VydmljZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVQb2ludEluc2VydGVyU2VydmljZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVQb2ludFJlbW92ZXJTZXJ2aWNlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVBvaW50U3luY1NlcnZpY2UoKTtcclxuICAgIHRoaXMuY3JlYXRlVUlDb25kaXRpb25Db250cm9sbGVyKCk7XHJcblxyXG4gICAgdGhpcy51aVNlcnZpY2VzLmZvckVhY2godWlTZXJ2aWNlID0+IHVpU2VydmljZS5pbml0KCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XHJcblxyXG4gICAgdGhpcy51aVNlcnZpY2VzLmZvckVhY2godWlTZXJ2aWNlID0+IHVpU2VydmljZS5kZXN0cm95KCkpO1xyXG4gICAgdGhpcy51aVNlcnZpY2VzLnNwbGljZSgwLCB0aGlzLnVpU2VydmljZXMubGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lci5nZXRQb2ludEZyb21Nb3VzZUV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICBjb25zdCBoaXRUZXN0UmVzdWx0ID0gdGhpcy5zdGFnZS5oaXRUZXN0KHBvaW50KTtcclxuXHJcbiAgICBpZiAoIWhpdFRlc3RSZXN1bHQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubmV3UG9seWdvblVJQ29udHJvbGxlci5hZGROZXdQb2ludChwb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFoaXRUZXN0UmVzdWx0LnBhdGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgTGluZUNsaWNrRXZlbnQoaGl0VGVzdFJlc3VsdC5saW5lLCBoaXRUZXN0UmVzdWx0LnBhdGgsIHBvaW50KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBvaW50U3luY1NlcnZpY2UoKSB7XHJcbiAgICBjb25zdCBwb2ludFN5bmNTZXJ2aWNlID0gbmV3IFBvaW50U3luY1NlcnZpY2Uoe1xyXG4gICAgICBjb250YWluZXI6IHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lcixcclxuICAgICAgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcixcclxuICAgICAgc3RhZ2U6IHRoaXMuc3RhZ2UsXHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHBvaW50U3luY1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVQb2ludFJlbW92ZXJTZXJ2aWNlKCkge1xyXG4gICAgY29uc3QgcG9pbnRSZW1vdmVyU2VydmljZSA9IG5ldyBQb2ludFJlbW92ZXJTZXJ2aWNlKHtcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvclxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51aVNlcnZpY2VzLnB1c2gocG9pbnRSZW1vdmVyU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBvaW50RHJhZ2dpbmdTZXJ2aWNlKCkge1xyXG4gICAgY29uc3QgcG9pbnREcmFnZ2luZ1NlcnZpY2UgPSBuZXcgUG9pbnREcmFnZ2luZ1NlcnZpY2Uoe1xyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yLFxyXG4gICAgICBzdGFnZTogdGhpcy5zdGFnZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51aVNlcnZpY2VzLnB1c2gocG9pbnREcmFnZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVOZXdQb2x5Z29uVUlDb250cm9sbGVyKCkge1xyXG4gICAgdGhpcy5uZXdQb2x5Z29uVUlDb250cm9sbGVyID0gbmV3IE5ld1BvbHlnb25VSUNvbnRyb2xsZXIoe1xyXG4gICAgICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIsXHJcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXHJcbiAgICAgIHN0YWdlOiB0aGlzLnN0YWdlLFxyXG4gICAgICBwb2x5Z29uTGF5ZXI6IHRoaXMuc3RhZ2UuZmluZExheWVyQnlOYW1lKExFWC5QT0xZR09OX0xBWUVSX05BTUUpLFxyXG4gICAgICByZW5kZXJlcjogdGhpcy5yZW5kZXJlcixcclxuICAgICAgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcixcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvclxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51aVNlcnZpY2VzLnB1c2godGhpcy5uZXdQb2x5Z29uVUlDb250cm9sbGVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUG9pbnRJbnNlcnRlclNlcnZpY2UoKSB7XHJcbiAgICBjb25zdCBwb2ludEluc2VydGVyU2VydmljZSA9IG5ldyBQb2ludEluc2VydGVyU2VydmljZSh7XHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHBvaW50SW5zZXJ0ZXJTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVUlDb25kaXRpb25Db250cm9sbGVyKCkge1xyXG4gICAgY29uc3QgdWlDb25kaXRpb25Db250cm9sbGVyID0gbmV3IFVJQ29uZGl0aW9uQ29udHJvbGxlcih7XHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3IsXHJcbiAgICAgIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lcixcclxuICAgICAgY29uZGl0aW9uTWF0Y2hlcjogbmV3IENvbmRpdGlvbk1hdGNoZXIoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51aVNlcnZpY2VzLnB1c2godWlDb25kaXRpb25Db250cm9sbGVyKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvVUlDb250cm9sbGVyLnRzIiwiaW1wb3J0IHsgQ29uZGl0aW9uUGlja2VyIH0gZnJvbSAndWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXInO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IExpbmVDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL0xpbmVDbGlja0V2ZW50JztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuXHJcbmltcG9ydCB7IENvbmRpdGlvbkZpeGVyLCBGaXhpbmdEaXJlY3Rpb24gfSBmcm9tICdjb25kaXRpb25zL0NvbmRpdGlvbkZpeGVyJztcclxuaW1wb3J0IHsgQ29uZGl0aW9uTWF0Y2hlciB9IGZyb20gJ2NvbmRpdGlvbnMvQ29uZGl0aW9uTWF0Y2hlcic7XHJcblxyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcblxyXG5pbnRlcmZhY2UgVUlDb25kaXRpb25Db250cm9sbGVyRGVwZW5kZW5jaWVzIHtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBjb25kaXRpb25NYXRjaGVyOiBDb25kaXRpb25NYXRjaGVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVUlDb25kaXRpb25Db250cm9sbGVyIGltcGxlbWVudHMgVUlTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjb25kaXRpb25NYXRjaGVyOiBDb25kaXRpb25NYXRjaGVyO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmRpdGlvblBpY2tlcjogQ29uZGl0aW9uUGlja2VyID0gbmV3IENvbmRpdGlvblBpY2tlcigpO1xyXG4gIHByaXZhdGUgcHJldmlvdXNMaW5lQ2xpY2tUaW1lc3RhbXAgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFVJQ29uZGl0aW9uQ29udHJvbGxlckRlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyID0gZGVwZW5kZW5jaWVzLmFwcGxpY2F0aW9uVUlDb250YWluZXI7XHJcbiAgICB0aGlzLmNvbmRpdGlvbk1hdGNoZXIgPSBkZXBlbmRlbmNpZXMuY29uZGl0aW9uTWF0Y2hlcjtcclxuXHJcbiAgICB0aGlzLm9uTGluZUNsaWNrID0gdGhpcy5vbkxpbmVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbk5ld0NvbmRpdGlvbiA9IHRoaXMub25OZXdDb25kaXRpb24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25SZW1vdmVDb25kaXRpb24gPSB0aGlzLm9uUmVtb3ZlQ29uZGl0aW9uLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uTGluZUNsaWNrKTtcclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNvbmRpdGlvblBpY2tlcik7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5hZGRFdmVudExpc3RlbmVyKExFWC5ORVdfQ09ORElUSU9OX0VWRU5UX05BTUUsIHRoaXMub25OZXdDb25kaXRpb24pO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihMRVguUkVNT1ZFX0NPTkRJVElPTl9FVkVOVF9OQU1FLCB0aGlzLm9uUmVtb3ZlQ29uZGl0aW9uKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgJ2ZhbHNlJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uTGluZUNsaWNrKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoTEVYLk5FV19DT05ESVRJT05fRVZFTlRfTkFNRSwgdGhpcy5vbk5ld0NvbmRpdGlvbik7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICBMRVguUkVNT1ZFX0NPTkRJVElPTl9FVkVOVF9OQU1FLFxyXG4gICAgICB0aGlzLm9uUmVtb3ZlQ29uZGl0aW9uXHJcbiAgICApO1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuY29uZGl0aW9uUGlja2VyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25MaW5lQ2xpY2soZXZlbnQ6IExpbmVDbGlja0V2ZW50KSB7XHJcbiAgICBpZiAoIShldmVudC5wYXlsb2FkLnBhdGggaW5zdGFuY2VvZiBQb2x5Z29uKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNDbGlja1RpbWVzdGFtcCA9IHRoaXMucHJldmlvdXNMaW5lQ2xpY2tUaW1lc3RhbXA7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMucHJldmlvdXNMaW5lQ2xpY2tUaW1lc3RhbXAgPSBjdXJyZW50VGltZXN0YW1wO1xyXG5cclxuICAgIGlmIChjdXJyZW50VGltZXN0YW1wIC0gcHJldmlvdXNDbGlja1RpbWVzdGFtcCA8PSBjb25maWd1cmF0aW9uLmRvdWJsZUNsaWNrTWF4RGVsYXkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uUGlja2VyLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgJ2ZhbHNlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCBldmVudC5wYXlsb2FkLnBvc2l0aW9uLngudG9TdHJpbmcoKSk7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIGV2ZW50LnBheWxvYWQucG9zaXRpb24ueS50b1N0cmluZygpKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnVwZGF0ZVNlbGVjdGVkTGluZShldmVudC5wYXlsb2FkLmxpbmUsIGV2ZW50LnBheWxvYWQucGF0aCk7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScsICd0cnVlJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTmV3Q29uZGl0aW9uKGV2ZW50OiBDdXN0b21FdmVudCkge1xyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvbiA9IGV2ZW50LmRldGFpbDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsaW5lQ29uZGl0aW9uLnZlcmlmeUNhbkJlQXBwbGllZCgpO1xyXG4gICAgICB0aGlzLmNvbmRpdGlvbk1hdGNoZXIudmVyaWZ5Q29uZGl0aW9uQWxsb3dlZChsaW5lQ29uZGl0aW9uKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBhbGVydChgQ2Fubm90IGFwcGx5IGNvbmRpdGlvbjogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbGluZUNvbmRpdGlvbi5pc01ldCgpKSB7XHJcbiAgICAgIHRoaXMuZml4VW5tZXRMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGxpbmVDb25kaXRpb24ucG9seWdvbi5hZGRMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb24pO1xyXG4gICAgdGhpcy5kaXNwYXRjaFVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaXhVbm1ldExpbmVDb25kaXRpb24obGluZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgcmVhbFBvbHlnb24gPSBsaW5lQ29uZGl0aW9uLnBvbHlnb247XHJcbiAgICBjb25zdCBwMUluZGV4ID0gcmVhbFBvbHlnb24uZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAxKTtcclxuICAgIGNvbnN0IHAySW5kZXggPSByZWFsUG9seWdvbi5maW5kUG9pbnRJbmRleChsaW5lQ29uZGl0aW9uLmxpbmUucDIpO1xyXG4gICAgY29uc3QgcG9seWdvbkNsb25lID0gcmVhbFBvbHlnb24uY2xvbmUoKTtcclxuXHJcbiAgICBjb25zdCBjb25kaXRpb25GaXhlciA9IG5ldyBDb25kaXRpb25GaXhlcihwb2x5Z29uQ2xvbmUsIHBvbHlnb25DbG9uZS5nZXRWZXJ0ZXgocDFJbmRleCksIFtcclxuICAgICAgbGluZUNvbmRpdGlvbi5kdXBsaWNhdGVGb3JOZXdMaW5lKFxyXG4gICAgICAgIG5ldyBMaW5lKHBvbHlnb25DbG9uZS5nZXRWZXJ0ZXgocDFJbmRleCksIHBvbHlnb25DbG9uZS5nZXRWZXJ0ZXgocDJJbmRleCkpLFxyXG4gICAgICAgIHBvbHlnb25DbG9uZVxyXG4gICAgICApXHJcbiAgICBdKTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLnRyeUZpeCgpO1xyXG5cclxuICAgIGlmIChjb25kaXRpb25GaXhlci5maXhTdWNjZXNzZnVsKSB7XHJcbiAgICAgIHJldHVybiByZWFsUG9seWdvbi5tb3ZlVG8ocG9seWdvbkNsb25lKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25kaXRpb25GaXhlci5yZXNldCgpO1xyXG4gICAgY29uZGl0aW9uRml4ZXIuZGlyZWN0aW9uID0gRml4aW5nRGlyZWN0aW9uLlJldmVyc2U7XHJcbiAgICBwb2x5Z29uQ2xvbmUubW92ZVRvKHJlYWxQb2x5Z29uKTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLnRyeUZpeCgpO1xyXG5cclxuICAgIGlmICghY29uZGl0aW9uRml4ZXIuZml4U3VjY2Vzc2Z1bCkge1xyXG4gICAgICBhbGVydCgnQ2Fubm90IGFkZCBhIGNvbmRpdGlvbicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblJlbW92ZUNvbmRpdGlvbihldmVudDogQ3VzdG9tRXZlbnQpIHtcclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb246IExpbmVDb25kaXRpb24gPSBldmVudC5kZXRhaWw7XHJcblxyXG4gICAgbGluZUNvbmRpdGlvbi5wb2x5Z29uLnJlbW92ZUxpbmVDb25kaXRpb24obGluZUNvbmRpdGlvbik7XHJcbiAgICB0aGlzLmRpc3BhdGNoVXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc3BhdGNoVXBkYXRlKCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBTeW5jQ29tcG9uZW50c0V2ZW50KCkpO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIudXBkYXRlQnV0dG9ucygpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb25kaXRpb25zL1VJQ29uZGl0aW9uQ29udHJvbGxlci50cyIsImltcG9ydCB7IEZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0ZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IEhvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0hvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IFZlcnRpY2FsTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50JztcclxuXHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQge1xyXG4gIExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzLFxyXG4gIFNlbGVjdGVkVGFyZ2V0XHJcbn0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMnO1xyXG5cclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuXHJcbmltcG9ydCAndWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIuc2Nzcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uUGlja2VyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0ZWRUYXJnZXQ6IFNlbGVjdGVkVGFyZ2V0ID0ge1xyXG4gICAgbGluZTogbnVsbCxcclxuICAgIHBvbHlnb246IG51bGxcclxuICB9O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbGluZUNvbmRpdGlvbkVsZW1lbnRzOiBMaW5lQ29uZGl0aW9uRWxlbWVudFtdO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZGl0aW9uRWxlbWVudHNDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2xvc2VCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm9uTW91c2VEb3duID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oaWRlID0gdGhpcy5oaWRlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY29uZGl0aW9uLXBpY2tlcl9fY2xvc2UtYnV0dG9uJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSAnWCc7XHJcblxyXG4gICAgdGhpcy5jb25kaXRpb25FbGVtZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb25kaXRpb25FbGVtZW50c0NvbnRhaW5lci5jbGFzc05hbWUgPSAnY29uZGl0aW9uLWVsZW1lbnRzLWNvbnRhaW5lcic7XHJcblxyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9uRWxlbWVudHMgPSB0aGlzLmNyZWF0ZUxpbmVDb25kaXRpb25FbGVtZW50cygpO1xyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9uRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHRoaXMuY29uZGl0aW9uRWxlbWVudHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuICAgIHJldHVybiBbJ2RhdGEteCcsICdkYXRhLXknLCAnZGF0YS12aXNpYmxlJ107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLmNvbmRpdGlvbkVsZW1lbnRzQ29udGFpbmVyKTtcclxuXHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY29uZGl0aW9uRWxlbWVudHNDb250YWluZXIpO1xyXG5cclxuICAgIHRoaXMuY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIF9vbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgY2FzZSAnZGF0YS14JzpcclxuICAgICAgY2FzZSAnZGF0YS15JzpcclxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdkYXRhLXZpc2libGUnOlxyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZVNlbGVjdGVkTGluZShsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUgPSBsaW5lO1xyXG4gICAgdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uID0gcG9seWdvbjtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVCdXR0b25zKCkge1xyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9uRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQudXBkYXRlQnV0dG9uKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVQb3NpdGlvbigpIHtcclxuICAgIHRoaXMuc3R5bGUubGVmdCA9IGAke3RoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSB8fCAwfXB4YDtcclxuICAgIHRoaXMuc3R5bGUudG9wID0gYCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpIHx8IDB9cHhgO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnNyY0VsZW1lbnQgJiYgdGhpcy5jb250YWlucyhldmVudC5zcmNFbGVtZW50KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGUoKSB7XHJcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgJ2ZhbHNlJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUxpbmVDb25kaXRpb25FbGVtZW50cygpIHtcclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzOiBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyA9IHtcclxuICAgICAgc2VsZWN0ZWRUYXJnZXQ6IHRoaXMuc2VsZWN0ZWRUYXJnZXRcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgbmV3IEZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudChsaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyksXHJcbiAgICAgIG5ldyBWZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50KGxpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzKSxcclxuICAgICAgbmV3IEhvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudChsaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcylcclxuICAgIF07XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1jb25kaXRpb24tcGlja2VyJywgQ29uZGl0aW9uUGlja2VyKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIudHMiLCJpbXBvcnQgeyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0ZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50JztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRml4ZWRMZW5ndGhDb25kaXRpb25FbGVtZW50IGV4dGVuZHMgTGluZUNvbmRpdGlvbkVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpIHtcclxuICAgIHN1cGVyKGRlcGVuZGVuY2llcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b24udGV4dENvbnRlbnQgPSAnRml4ZWQgbGVuZ3RoJztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRMaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IoKSB7XHJcbiAgICByZXR1cm4gRml4ZWRMZW5ndGhMaW5lQ29uZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU5ld0NvbmRpdGlvbigpOiBMaW5lQ29uZGl0aW9uIHwgbnVsbCB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSB8fCAhdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG5vdCBzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsZW5ndGggPSBOdW1iZXIuTmFOO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxMaW5lTGVuZ3RoID0gdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lLmdldExlbmd0aCgpLnRvRml4ZWQoMSk7XHJcblxyXG4gICAgd2hpbGUgKE51bWJlci5pc05hTihsZW5ndGgpIHx8IGxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHByb21wdCgnUHJvdmlkZSB0aGUgZml4ZWQgbGVuZ3RoJywgb3JpZ2luYWxMaW5lTGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGVuZ3RoID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24oXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSxcclxuICAgICAgdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uLFxyXG4gICAgICBsZW5ndGhcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2ZpeGVkLWxlbmd0aC1jb25kaXRpb24nLCBGaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9GaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQudHMiLCJpbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuXHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24gZXh0ZW5kcyBMaW5lQ29uZGl0aW9uIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGZpeGVkTGVuZ3RoOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBmaXhlZExlbmd0aFNxdWFyZWQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbiwgbGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKGxpbmUsIHBvbHlnb24pO1xyXG5cclxuICAgIHRoaXMuZml4ZWRMZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmZpeGVkTGVuZ3RoU3F1YXJlZCA9IE1hdGgucG93KGxlbmd0aCwgMik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNNZXQoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBsZW5ndGhTcXVhcmVkID0gUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZCh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguYWJzKGxlbmd0aFNxdWFyZWQgLSB0aGlzLmZpeGVkTGVuZ3RoU3F1YXJlZCkgPCBjb25maWd1cmF0aW9uLmVwc2lsb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KGxvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgY29uc3QgZnJlZVBvaW50ID0gdGhpcy5saW5lLnAxID09PSBsb2NrZWRQb2ludCA/IHRoaXMubGluZS5wMiA6IHRoaXMubGluZS5wMTtcclxuXHJcbiAgICBjb25zdCBsZW5ndGhCZWZvcmVGaXggPSBQb2ludC5nZXREaXN0YW5jZUJldHdlZW4obG9ja2VkUG9pbnQsIGZyZWVQb2ludCk7XHJcbiAgICBjb25zdCByYXRpbyA9IHRoaXMuZml4ZWRMZW5ndGggLyBsZW5ndGhCZWZvcmVGaXg7XHJcblxyXG4gICAgY29uc3QgeERlbHRhID0gZnJlZVBvaW50LnggLSBsb2NrZWRQb2ludC54O1xyXG4gICAgY29uc3QgeURlbHRhID0gZnJlZVBvaW50LnkgLSBsb2NrZWRQb2ludC55O1xyXG5cclxuICAgIGZyZWVQb2ludC5tb3ZlVG8obG9ja2VkUG9pbnQueCArIHhEZWx0YSAqIHJhdGlvLCBsb2NrZWRQb2ludC55ICsgeURlbHRhICogcmF0aW8pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGR1cGxpY2F0ZUZvck5ld0xpbmUobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgcmV0dXJuIG5ldyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24obGluZSwgcG9seWdvbiwgdGhpcy5maXhlZExlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFiZWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maXhlZExlbmd0aC50b0ZpeGVkKDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZlcmlmeUNhbkJlQXBwbGllZCgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9GaXhlZExlbmd0aExpbmVDb25kaXRpb24udHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9MaW5lQ29uZGl0aW9uRWxlbWVudC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmxpbmUtY29uZGl0aW9uLS1hY3RpdmUgLmxpbmUtY29uZGl0aW9uX19idXR0b24ge1xcbiAgYm94LXNoYWRvdzogMCAwIDVweCAycHggIzFiOTdkZjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzIH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudCBleHRlbmRzIExpbmVDb25kaXRpb25FbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzKSB7XHJcbiAgICBzdXBlcihkZXBlbmRlbmNpZXMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uLnRleHRDb250ZW50ID0gJ0hvcml6b250YWwnO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldExpbmVDb25kaXRpb25Db25zdHJ1Y3RvcigpIHtcclxuICAgIHJldHVybiBIb3Jpem9udGFsTGluZUNvbmRpdGlvbjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVOZXdDb25kaXRpb24oKTogTGluZUNvbmRpdGlvbiB8IG51bGwge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUgfHwgIXRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBub3Qgc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEhvcml6b250YWxMaW5lQ29uZGl0aW9uKHRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSwgdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaG9yaXpvbnRhbC1saW5lLWNvbmRpdGlvbicsIEhvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0hvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudC50cyIsImltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBWZXJ0aWNhbExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL1ZlcnRpY2FsTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50IGV4dGVuZHMgTGluZUNvbmRpdGlvbkVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpIHtcclxuICAgIHN1cGVyKGRlcGVuZGVuY2llcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b24udGV4dENvbnRlbnQgPSAnVmVydGljYWwnO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldExpbmVDb25kaXRpb25Db25zdHJ1Y3RvcigpIHtcclxuICAgIHJldHVybiBWZXJ0aWNhbExpbmVDb25kaXRpb247XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlTmV3Q29uZGl0aW9uKCk6IExpbmVDb25kaXRpb24gfCBudWxsIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lIHx8ICF0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb24pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgbm90IHNlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZXJ0aWNhbExpbmVDb25kaXRpb24odGhpcy5zZWxlY3RlZFRhcmdldC5saW5lLCB0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb24pO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2ZXJ0aWNhbC1saW5lLWNvbmRpdGlvbicsIFZlcnRpY2FsTGluZUNvbmRpdGlvbkVsZW1lbnQpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vQ29uZGl0aW9uUGlja2VyLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vQ29uZGl0aW9uUGlja2VyLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vQ29uZGl0aW9uUGlja2VyLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImFwcC1jb25kaXRpb24tcGlja2VyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDVweCwgLTUwJSk7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBwYWRkaW5nOiAwLjZlbTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICMyMjI7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UyZTJlMjtcXG4gIGJveC1zaGFkb3c6IDJweCAycHggNXB4IGJsYWNrO1xcbiAgei1pbmRleDogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XFxuXFxuLmNvbmRpdGlvbi1lbGVtZW50cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuY29uZGl0aW9uLWVsZW1lbnRzLWNvbnRhaW5lciAqIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4OyB9XFxuICAgIC5jb25kaXRpb24tZWxlbWVudHMtY29udGFpbmVyICo6bGFzdC1jaGlsZCB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMDsgfVxcblxcbi5jb25kaXRpb24tcGlja2VyX19jbG9zZS1idXR0b24ge1xcbiAgbWFyZ2luOiAtMnB4IC0ycHggM3B4IDA7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIGZvbnQtc2l6ZTogMTBweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy91aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyIHtcclxuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjYW52YXNDbGllbnRSZWN0OiBDbGllbnRSZWN0O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMudXBkYXRlQ2FudmFzT2Zmc2V0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQ2FudmFzT2Zmc2V0KCkge1xyXG4gICAgdGhpcy5jYW52YXNDbGllbnRSZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UG9pbnRGcm9tTW91c2VFdmVudChldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludChcclxuICAgICAgZXZlbnQucGFnZVggLSB0aGlzLmNhbnZhc0NsaWVudFJlY3QubGVmdCxcclxuICAgICAgZXZlbnQucGFnZVkgLSB0aGlzLmNhbnZhc0NsaWVudFJlY3QudG9wXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9Nb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIudHMiLCJpbXBvcnQgeyBMYXllciB9IGZyb20gJ2NvbW1vbi9MYXllcic7XHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBMRVggfSBmcm9tICdMRVgnO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJ1JlbmRlcmVyJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdTdGFnZSc7XHJcbmltcG9ydCB7IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciB9IGZyb20gJ3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcic7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgUG9pbnRDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL1BvaW50Q2xpY2tFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuXHJcbmludGVyZmFjZSBOZXdQb2x5Z29uVUlDb250cm9sbGVyRGVwZW5kZW5jaWVzIHtcclxuICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIHBvbHlnb25MYXllcjogTGF5ZXI7XHJcbiAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gIHN0YWdlOiBTdGFnZTtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5ld1BvbHlnb25VSUNvbnRyb2xsZXIgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSB1bmZpbmlzaGVkUGF0aDogUGF0aDtcclxuICBwcml2YXRlIHJlYWRvbmx5IHBhdGhMYXllciA9IG5ldyBMYXllcihMRVguUEFUSF9MQVlFUl9OQU1FKTtcclxuICBwcml2YXRlIHJlYWRvbmx5IHBvbHlnb25MYXllcjogTGF5ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTmV3UG9seWdvblVJQ29udHJvbGxlckRlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyID0gZGVwZW5kZW5jaWVzLmFwcGxpY2F0aW9uVUlDb250YWluZXI7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRlcGVuZGVuY2llcy5jYW52YXM7XHJcbiAgICB0aGlzLnN0YWdlID0gZGVwZW5kZW5jaWVzLnN0YWdlO1xyXG4gICAgdGhpcy5wb2x5Z29uTGF5ZXIgPSBkZXBlbmRlbmNpZXMucG9seWdvbkxheWVyO1xyXG4gICAgdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgPSBkZXBlbmRlbmNpZXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IGRlcGVuZGVuY2llcy5yZW5kZXJlcjtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLmNsb3NlUGF0aCA9IHRoaXMuY2xvc2VQYXRoLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vblBvaW50Q2xpY2sgPSB0aGlzLm9uUG9pbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbktleURvd24gPSB0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLnN0YWdlLmxheWVycy5wdXNoKHRoaXMucGF0aExheWVyKTtcclxuICAgIHRoaXMuc3RhcnROZXdVbmZpbmlzaGVkUGF0aCgpO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFBvaW50Q2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25Qb2ludENsaWNrKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9pbnRDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50Q2xpY2spO1xyXG4gICAgdGhpcy5zdGFnZS5yZW1vdmVMYXllcih0aGlzLnBhdGhMYXllcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkTmV3UG9pbnQocG9pbnQ6IFBvaW50KSB7XHJcbiAgICB0aGlzLnVuZmluaXNoZWRQYXRoLmFkZFZlcnRleChwb2ludCk7XHJcbiAgICB0aGlzLmRpc3BhdGNoVXBkYXRlVUlFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGNvbnN0IHVuZmluaXNoZWRQYXRoVmVydGljZXNDb3VudCA9IHRoaXMudW5maW5pc2hlZFBhdGguZ2V0VmVydGljZXNDb3VudCgpO1xyXG4gICAgaWYgKHVuZmluaXNoZWRQYXRoVmVydGljZXNDb3VudCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGFzdFBvaW50ID0gdGhpcy51bmZpbmlzaGVkUGF0aC5nZXRWZXJ0ZXgodW5maW5pc2hlZFBhdGhWZXJ0aWNlc0NvdW50IC0gMSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuXHJcbiAgICBjb25zdCBwb2ludCA9IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyLmdldFBvaW50RnJvbU1vdXNlRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5kcmF3TGluZShsYXN0UG9pbnQsIHBvaW50LCBjb25maWd1cmF0aW9uLm5ld0xpbmVQcmV2aWV3UHJvcGVydGllcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUG9pbnRDbGljayhldmVudDogUG9pbnRDbGlja0V2ZW50KSB7XHJcbiAgICBjb25zdCBwYXRoUG9pbnRDb21wb25lbnQgPSBldmVudC5wYXlsb2FkO1xyXG5cclxuICAgIGlmIChwYXRoUG9pbnRDb21wb25lbnQucGF0aCA9PT0gdGhpcy51bmZpbmlzaGVkUGF0aCAmJiBwYXRoUG9pbnRDb21wb25lbnQuaW5pdGlhbCkge1xyXG4gICAgICBldmVudC5oYW5kbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZVBhdGgoKTtcclxuICAgICAgICBwYXRoUG9pbnRDb21wb25lbnQuaW5pdGlhbCA9IGZhbHNlO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0TmV3VW5maW5pc2hlZFBhdGgoKSB7XHJcbiAgICB0aGlzLnVuZmluaXNoZWRQYXRoID0gbmV3IFBhdGgoW10sIGNvbmZpZ3VyYXRpb24ubmV3UG9seWdvbkxpbmVQcm9wZXJ0aWVzKTtcclxuICAgIHRoaXMucGF0aExheWVyLnBhdGhzLnB1c2godGhpcy51bmZpbmlzaGVkUGF0aCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsb3NlUGF0aCgpIHtcclxuICAgIGlmICh0aGlzLnVuZmluaXNoZWRQYXRoLmdldFZlcnRpY2VzQ291bnQoKSA8IGNvbmZpZ3VyYXRpb24ubWluUG9seWdvblBvaW50cykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBvbHlnb24gbXVzdCBoYXZlIGF0IGxlYXN0ICR7Y29uZmlndXJhdGlvbi5taW5Qb2x5Z29uUG9pbnRzfSB2ZXJ0aWNlc2ApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudW5maW5pc2hlZFBhdGgubGluZVByb3BlcnRpZXMgPSBjb25maWd1cmF0aW9uLnBvbHlnb25MaW5lUHJvcGVydGllcztcclxuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbih0aGlzLnVuZmluaXNoZWRQYXRoKTtcclxuICAgIHRoaXMucG9seWdvbkxheWVyLnBhdGhzLnB1c2gocG9seWdvbik7XHJcbiAgICB0aGlzLnBhdGhMYXllci5yZW1vdmVQYXRoKHRoaXMudW5maW5pc2hlZFBhdGgpO1xyXG5cclxuICAgIHRoaXMuc3RhcnROZXdVbmZpbmlzaGVkUGF0aCgpO1xyXG4gICAgdGhpcy5kaXNwYXRjaFVwZGF0ZVVJRXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc3BhdGNoVXBkYXRlVUlFdmVudHMoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgMjc6XHJcbiAgICAgICAgdGhpcy5wYXRoTGF5ZXIucmVtb3ZlUGF0aCh0aGlzLnVuZmluaXNoZWRQYXRoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0TmV3VW5maW5pc2hlZFBhdGgoKTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoVXBkYXRlVUlFdmVudHMoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL05ld1BvbHlnb25VSUNvbnRyb2xsZXIudHMiLCJpbXBvcnQgeyBDT0xPUlMgfSBmcm9tICdjb21tb24vQ09MT1JTJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdjb21tb24vTGF5ZXInO1xyXG5pbXBvcnQgeyBMaW5lUHJvcGVydGllcyB9IGZyb20gJ2NvbW1vbi9MaW5lUHJvcGVydGllcyc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IExFWCB9IGZyb20gJ0xFWCc7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29udGludW91c0NvbmRpdGlvbkZpeGVyIH0gZnJvbSAnY29uZGl0aW9ucy9Db250aW51b3VzQ29uZGl0aW9uRml4ZXInO1xyXG5cclxuaW1wb3J0IHsgRmluaXNoUG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQnO1xyXG5pbXBvcnQgeyBTdGFydFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvU3RhcnRQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuXHJcbmludGVyZmFjZSBQb2ludERyYWdnaW5nU2VydmljZURlcGVuZGVuY2llcyB7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnREcmFnZ2luZ1NlcnZpY2UgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSBwYXRoR2hvc3RMYXllcjogTGF5ZXI7XHJcbiAgcHJpdmF0ZSBjb250aW51b3VzQ29uZGl0aW9uRml4ZXI6IENvbnRpbnVvdXNDb25kaXRpb25GaXhlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnREcmFnZ2luZ1NlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuICAgIHRoaXMuc3RhZ2UgPSBkZXBlbmRlbmNpZXMuc3RhZ2U7XHJcblxyXG4gICAgdGhpcy5vblN0YXJ0UG9pbnREcmFnID0gdGhpcy5vblN0YXJ0UG9pbnREcmFnLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uRmluaXNoUG9pbnREcmFnID0gdGhpcy5vbkZpbmlzaFBvaW50RHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vblBvaW50RHJhZyA9IHRoaXMub25Qb2ludERyYWcuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5wYXRoR2hvc3RMYXllciA9IG5ldyBMYXllcihMRVguUEFUSF9HSE9TVF9MQVlFUl9OQU1FKTtcclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLnNwbGljZSgwLCAwLCB0aGlzLnBhdGhHaG9zdExheWVyKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFN0YXJ0UG9pbnREcmFnRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uU3RhcnRQb2ludERyYWcpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihGaW5pc2hQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25GaW5pc2hQb2ludERyYWcpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25Qb2ludERyYWcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnBhdGhHaG9zdExheWVyLnBhdGhzID0gW107XHJcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUxheWVyKHRoaXMucGF0aEdob3N0TGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoU3RhcnRQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25TdGFydFBvaW50RHJhZyk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICBGaW5pc2hQb2ludERyYWdFdmVudC5ldmVudFR5cGUsXHJcbiAgICAgIHRoaXMub25GaW5pc2hQb2ludERyYWdcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50RHJhZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU3RhcnRQb2ludERyYWcoZXZlbnQ6IFN0YXJ0UG9pbnREcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG5cclxuICAgIGlmIChldmVudC5wYXlsb2FkLnBhdGggaW5zdGFuY2VvZiBQb2x5Z29uKSB7XHJcbiAgICAgIHRoaXMuY29udGludW91c0NvbmRpdGlvbkZpeGVyID0gbmV3IENvbnRpbnVvdXNDb25kaXRpb25GaXhlcihldmVudC5wYXlsb2FkLnBhdGgsIGV2ZW50LnBheWxvYWQucG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29uZmlndXJhdGlvbi5kaXNwbGF5UGF0aEdob3N0V2hlbkRyYWdnaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXRoID0gZXZlbnQucGF5bG9hZC5wYXRoLmNsb25lKCk7XHJcbiAgICBwYXRoLmxpbmVQcm9wZXJ0aWVzID0gbmV3IExpbmVQcm9wZXJ0aWVzKENPTE9SUy5HUkVFTiwgMSk7XHJcbiAgICB0aGlzLnBhdGhHaG9zdExheWVyLnBhdGhzLnB1c2gocGF0aCk7XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBTeW5jQ29tcG9uZW50c0V2ZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbmlzaFBvaW50RHJhZyhldmVudDogRmluaXNoUG9pbnREcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5jb250aW51b3VzQ29uZGl0aW9uRml4ZXIgPSBudWxsO1xyXG4gICAgaWYgKCFjb25maWd1cmF0aW9uLmRpc3BsYXlQYXRoR2hvc3RXaGVuRHJhZ2dpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF0aEdob3N0TGF5ZXIucGF0aHMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUG9pbnREcmFnKGV2ZW50OiBQb2ludERyYWdFdmVudCkge1xyXG4gICAgY29uc3QgeyBjb21wb25lbnQsIG5ld1Bvc2l0aW9uIH0gPSBldmVudC5wYXlsb2FkO1xyXG5cclxuICAgIGNvbXBvbmVudC5wb2ludC5tb3ZlVG8obmV3UG9zaXRpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbnRpbnVvdXNDb25kaXRpb25GaXhlcikge1xyXG4gICAgICB0aGlzLmNvbnRpbnVvdXNDb25kaXRpb25GaXhlci5maXgoKTtcclxuICAgICAgdGhpcy5jb250aW51b3VzQ29uZGl0aW9uRml4ZXIucHJvcGFnYXRlQ2hhbmdlc1RvT3JpZ2luYWxQb2x5Z29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICBldmVudC5oYW5kbGVkID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvUG9pbnREcmFnZ2luZ1NlcnZpY2UudHMiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IENvbmRpdGlvbkZpeGVyLCBGaXhpbmdEaXJlY3Rpb24gfSBmcm9tICdjb25kaXRpb25zL0NvbmRpdGlvbkZpeGVyJztcclxuXHJcbi8qKlxyXG4gKiBVc2Ugd2hlbiB0aGVyZSBpcyBhIG5lZWQgdG8gZml4IGNvbmRpdGlvbnMgb2Z0ZW4gKGZvciBpbnN0YW5jZSB3aGVuIGRyYWdnaW5nKS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ29udGludW91c0NvbmRpdGlvbkZpeGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29udGludW91c0NvbmRpdGlvbkZpeGVyIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHBvbHlnb246IFBvbHlnb247XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjbG9uZWRQb2x5Z29uOiBQb2x5Z29uO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHN0YXJ0aW5nUG9pbnQ6IFBvaW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2xvbmVkU3RhcnRpbmdQb2ludDogUG9pbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBvbHlnb246IFBvbHlnb24sIHN0YXJ0aW5nUG9pbnQ6IFBvaW50KSB7XHJcbiAgICAvLyBUT0RPOiBpbmplY3QgQ29udGludW91c0ZpeGVyIGNvbnN0cnVjdG9yXHJcbiAgICB0aGlzLnBvbHlnb24gPSBwb2x5Z29uO1xyXG4gICAgdGhpcy5zdGFydGluZ1BvaW50ID0gc3RhcnRpbmdQb2ludDtcclxuICAgIGNvbnN0IHN0YXJ0aW5nUG9pbnRJbmRleCA9IHBvbHlnb24uZmluZFBvaW50SW5kZXgodGhpcy5zdGFydGluZ1BvaW50KTtcclxuXHJcbiAgICB0aGlzLmNsb25lZFBvbHlnb24gPSBwb2x5Z29uLmNsb25lKCk7XHJcbiAgICB0aGlzLmNsb25lZFN0YXJ0aW5nUG9pbnQgPSB0aGlzLmNsb25lZFBvbHlnb24uZ2V0VmVydGV4KHN0YXJ0aW5nUG9pbnRJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KCkge1xyXG4gICAgY29uc3QgbGFzdFZhbGlkUG9zaXRpb24gPSB0aGlzLmNsb25lZFN0YXJ0aW5nUG9pbnQuY2xvbmUoKTtcclxuICAgIHRoaXMuY2xvbmVkUG9seWdvbi5tb3ZlVG8odGhpcy5wb2x5Z29uKTtcclxuICAgIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludC5tb3ZlVG8odGhpcy5zdGFydGluZ1BvaW50KTtcclxuXHJcbiAgICBjb25zdCBjb25kaXRpb25GaXhlciA9IG5ldyBDb25kaXRpb25GaXhlcih0aGlzLmNsb25lZFBvbHlnb24sIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludCwgW10pO1xyXG4gICAgY29uZGl0aW9uRml4ZXIudHJ5Rml4KCk7XHJcblxyXG4gICAgaWYgKGNvbmRpdGlvbkZpeGVyLmZpeFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludC5tb3ZlVG8odGhpcy5zdGFydGluZ1BvaW50KTtcclxuICAgIHRoaXMuY2xvbmVkUG9seWdvbi5tb3ZlVG8odGhpcy5wb2x5Z29uKTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLnJlc2V0KCk7XHJcbiAgICBjb25kaXRpb25GaXhlci5kaXJlY3Rpb24gPSBGaXhpbmdEaXJlY3Rpb24uUmV2ZXJzZTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLnRyeUZpeCgpO1xyXG5cclxuICAgIGlmIChjb25kaXRpb25GaXhlci5maXhTdWNjZXNzZnVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0cmFuc2xhdGlvblZlY3RvciA9IFBvaW50LnN1YnRyYWN0KHRoaXMuc3RhcnRpbmdQb2ludCwgbGFzdFZhbGlkUG9zaXRpb24pO1xyXG5cclxuICAgIHRoaXMuY2xvbmVkUG9seWdvbi5tb3ZlVG8odGhpcy5wb2x5Z29uKTtcclxuICAgIHRoaXMuY2xvbmVkUG9seWdvbi5nZXRWZXJ0aWNlcygpLmZvckVhY2goY2xvbmVkUG9pbnQgPT4ge1xyXG4gICAgICBjbG9uZWRQb2ludC5tb3ZlVG8oUG9pbnQuYWRkKGNsb25lZFBvaW50LCB0cmFuc2xhdGlvblZlY3RvcikpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNsb25lZFN0YXJ0aW5nUG9pbnQubW92ZVRvKHRoaXMuc3RhcnRpbmdQb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcHJvcGFnYXRlQ2hhbmdlc1RvT3JpZ2luYWxQb2x5Z29uKCkge1xyXG4gICAgdGhpcy5wb2x5Z29uLm1vdmVUbyh0aGlzLmNsb25lZFBvbHlnb24pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0NvbnRpbnVvdXNDb25kaXRpb25GaXhlci50cyIsImltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBMaW5lQ2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9MaW5lQ2xpY2tFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgVUlTZXJ2aWNlIH0gZnJvbSAndWkvVUlTZXJ2aWNlJztcclxuXHJcbmludGVyZmFjZSBQb2ludEluc2VydGVyU2VydmljZURlcGVuZGVuY2llcyB7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludEluc2VydGVyU2VydmljZSBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSBwcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcCA9IDA7XHJcbiAgcHJpdmF0ZSBwcmV2aW91c0xpbmVIaXQ6IExpbmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnRJbnNlcnRlclNlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLm9uTGluZUNsaWNrID0gdGhpcy5vbkxpbmVDbGljay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKExpbmVDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vbkxpbmVDbGljayk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uTGluZUNsaWNrKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25MaW5lQ2xpY2soZXZlbnQ6IExpbmVDbGlja0V2ZW50KSB7XHJcbiAgICBjb25zdCBwcmV2aW91c0xpbmVIaXQgPSB0aGlzLnByZXZpb3VzTGluZUhpdDtcclxuICAgIGNvbnN0IHByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID0gdGhpcy5wcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcDtcclxuXHJcbiAgICBjb25zdCBjdXJyZW50VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMucHJldmlvdXNMaW5lSGl0ID0gZXZlbnQucGF5bG9hZC5saW5lO1xyXG4gICAgdGhpcy5wcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcCA9IGN1cnJlbnRUaW1lc3RhbXA7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhcHJldmlvdXNMaW5lSGl0IHx8XHJcbiAgICAgIGN1cnJlbnRUaW1lc3RhbXAgLSBwcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcCA+IGNvbmZpZ3VyYXRpb24uZG91YmxlQ2xpY2tNYXhEZWxheVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJldmlvdXNMaW5lSGl0LmVxdWFscyhldmVudC5wYXlsb2FkLmxpbmUpKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gZXZlbnQucGF5bG9hZC5wYXRoLmZpbmRQb2ludEluZGV4KGV2ZW50LnBheWxvYWQubGluZS5wMik7XHJcbiAgICAgIGNvbnN0IG5ld1BvaW50ID0gZXZlbnQucGF5bG9hZC5saW5lLmdldE1pZGRsZVBvaW50KCk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGV2ZW50LnBheWxvYWQucGF0aC5pbnNlcnRWZXJ0ZXgobmV3UG9pbnQsIGluZGV4KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gYWxlcnQoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL1BvaW50SW5zZXJ0ZXJTZXJ2aWNlLnRzIiwiaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IFBvaW50Q2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9Qb2ludENsaWNrRXZlbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuXHJcbmludGVyZmFjZSBQb2ludFJlbW92ZXJTZXJ2aWNlRGVwZW5kZW5jaWVzIHtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50UmVtb3ZlclNlcnZpY2UgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIHByaXZhdGUgcHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQ6IFBhdGhQb2ludENvbXBvbmVudDtcclxuICBwcml2YXRlIHByZXZpb3VzQ2xpY2tUaW1lc3RhbXAgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFBvaW50UmVtb3ZlclNlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuICAgIHRoaXMub25Qb2ludENsaWNrID0gdGhpcy5vblBvaW50Q2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihQb2ludENsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uUG9pbnRDbGljayk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9pbnRDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50Q2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblBvaW50Q2xpY2soZXZlbnQ6IFBvaW50Q2xpY2tFdmVudCkge1xyXG4gICAgY29uc3QgY3VycmVudFRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcblxyXG4gICAgY29uc3QgcGF0aFBvaW50Q29tcG9uZW50ID0gZXZlbnQucGF5bG9hZDtcclxuICAgIGNvbnN0IHByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50ID0gdGhpcy5wcmV2aW91c1BhdGhQb2ludENvbXBvbmVudDtcclxuICAgIGNvbnN0IHByZXZpb3VzQ2xpY2tUaW1lc3RhbXAgPSB0aGlzLnByZXZpb3VzQ2xpY2tUaW1lc3RhbXA7XHJcblxyXG4gICAgdGhpcy51cGRhdGVQcmV2aW91c0NsaWNrSW5mb3JtYXRpb24oZXZlbnQsIGN1cnJlbnRUaW1lc3RhbXApO1xyXG5cclxuICAgIGlmICghcHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQgfHwgcHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQgIT09IHBhdGhQb2ludENvbXBvbmVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbnRUaW1lc3RhbXAgLSBwcmV2aW91c0NsaWNrVGltZXN0YW1wID4gY29uZmlndXJhdGlvbi5kb3VibGVDbGlja01heERlbGF5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbW92ZVByZXZpb3VzQ2xpY2tlZFBvaW50KCk7XHJcbiAgICBldmVudC5oYW5kbGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUHJldmlvdXNDbGlja0luZm9ybWF0aW9uKGV2ZW50OiBQb2ludENsaWNrRXZlbnQsIHRpbWVzdGFtcDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50ID0gZXZlbnQucGF5bG9hZDtcclxuICAgIHRoaXMucHJldmlvdXNDbGlja1RpbWVzdGFtcCA9IHRpbWVzdGFtcDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlUHJldmlvdXNDbGlja2VkUG9pbnQoKSB7XHJcbiAgICBjb25zdCBwYXRoID0gdGhpcy5wcmV2aW91c1BhdGhQb2ludENvbXBvbmVudC5wYXRoO1xyXG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50LnBvaW50O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHBhdGgucmVtb3ZlVmVydGV4KHBvaW50KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBhbGVydCgnQ2Fubm90IHJlbW92ZSB2ZXJ0ZXgnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50LnJlbW92ZSgpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBTeW5jQ29tcG9uZW50c0V2ZW50KCkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9Qb2ludFJlbW92ZXJTZXJ2aWNlLnRzIiwiaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gJ1N0YWdlJztcclxuaW1wb3J0IHsgVUlTZXJ2aWNlIH0gZnJvbSAndWkvVUlTZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuaW1wb3J0IHsgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyIH0gZnJvbSAndWkvTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyJztcclxuXHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50c0V2ZW50IH0gZnJvbSAnZXZlbnRzL3VpL1N5bmNDb21wb25lbnRzRXZlbnQnO1xyXG5cclxuaW50ZXJmYWNlIFBvaW50U3luY1NlcnZpY2VEZXBlbmRlbmNpZXMge1xyXG4gIHN0YWdlOiBTdGFnZTtcclxuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUGF0aFBvaW50IHtcclxuICBwYXRoOiBQYXRoO1xyXG4gIHBvaW50OiBQb2ludDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50U3luY1NlcnZpY2UgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgcGF0aFBvaW50Q29tcG9uZW50czogUGF0aFBvaW50Q29tcG9uZW50W10gPSBbXTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFBvaW50U3luY1NlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuc3RhZ2UgPSBkZXBlbmRlbmNpZXMuc3RhZ2U7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRlcGVuZGVuY2llcy5jb250YWluZXI7XHJcbiAgICB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciA9IGRlcGVuZGVuY2llcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gICAgdGhpcy5zeW5jaHJvbml6ZUNvbXBvbmVudHMgPSB0aGlzLnN5bmNocm9uaXplQ29tcG9uZW50cy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFN5bmNDb21wb25lbnRzRXZlbnQuZXZlbnRUeXBlLCB0aGlzLnN5bmNocm9uaXplQ29tcG9uZW50cyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoU3luY0NvbXBvbmVudHNFdmVudC5ldmVudFR5cGUsIHRoaXMuc3luY2hyb25pemVDb21wb25lbnRzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzeW5jaHJvbml6ZUNvbXBvbmVudHMoZXZlbnQ6IFN5bmNDb21wb25lbnRzRXZlbnQpIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudHNUb1JlbW92ZSA9IHRoaXMuZ2V0UmVkdW5kYW50Q29tcG9uZW50cygpO1xyXG4gICAgY29tcG9uZW50c1RvUmVtb3ZlLmZvckVhY2goY29tcG9uZW50ID0+IGNvbXBvbmVudC5yZW1vdmUoKSk7XHJcblxyXG4gICAgY29uc3QgcGF0aFBvaW50cyA9IHRoaXMuZ2V0UGF0aFBvaW50cygpO1xyXG4gICAgY29uc3QgcG9pbnRzV2l0aG91dENvbXBvbmVudHMgPSB0aGlzLmdldFBvaW50c1dpdGhvdXRDb21wb25lbnRzKHBhdGhQb2ludHMpO1xyXG4gICAgY29uc3QgbmV3Q29tcG9uZW50cyA9IHRoaXMuY3JlYXRlUGF0aFBvaW50Q29tcG9uZW50cyhwb2ludHNXaXRob3V0Q29tcG9uZW50cyk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50c05vdFJlbW92ZWQgPSB0aGlzLnBhdGhQb2ludENvbXBvbmVudHMuZmlsdGVyKFxyXG4gICAgICBjb21wb25lbnQgPT4gY29tcG9uZW50c1RvUmVtb3ZlLmluZGV4T2YoY29tcG9uZW50KSA9PT0gLTFcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5wYXRoUG9pbnRDb21wb25lbnRzID0gWy4uLm5ld0NvbXBvbmVudHMsIC4uLmNvbXBvbmVudHNOb3RSZW1vdmVkXTtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXRoUG9pbnRzKCkge1xyXG4gICAgY29uc3QgcGF0aFBvaW50czogUGF0aFBvaW50W10gPSBbXTtcclxuXHJcbiAgICB0aGlzLnN0YWdlLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgbGF5ZXIucGF0aHMuZm9yRWFjaChwYXRoID0+IHtcclxuICAgICAgICBwYXRoLmdldFZlcnRpY2VzKCkuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICBwYXRoUG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBwYXRoLFxyXG4gICAgICAgICAgICBwb2ludFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBhdGhQb2ludHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBhdGhQb2ludENvbXBvbmVudHMocGF0aFBvaW50czogUGF0aFBvaW50W10pIHtcclxuICAgIHJldHVybiBwYXRoUG9pbnRzLm1hcChcclxuICAgICAgcGF0aFBvaW50ID0+XHJcbiAgICAgICAgbmV3IFBhdGhQb2ludENvbXBvbmVudChwYXRoUG9pbnQucGF0aCwgcGF0aFBvaW50LnBvaW50LCB7XHJcbiAgICAgICAgICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcclxuICAgICAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3IsXHJcbiAgICAgICAgICBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlZHVuZGFudENvbXBvbmVudHMoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVQYXRocyA9IHRoaXMuZ2V0QWN0aXZlUGF0aHMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5wYXRoUG9pbnRDb21wb25lbnRzLmZpbHRlcihcclxuICAgICAgY29tcG9uZW50ID0+XHJcbiAgICAgICAgYWN0aXZlUGF0aHMuaW5kZXhPZihjb21wb25lbnQucGF0aCkgPT09IC0xIHx8XHJcbiAgICAgICAgY29tcG9uZW50LnBhdGguZ2V0VmVydGljZXMoKS5pbmRleE9mKGNvbXBvbmVudC5wb2ludCkgPT09IC0xXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQb2ludHNXaXRob3V0Q29tcG9uZW50cyhwYXRoUG9pbnRzOiBQYXRoUG9pbnRbXSkge1xyXG4gICAgcmV0dXJuIHBhdGhQb2ludHMuZmlsdGVyKFxyXG4gICAgICBwYXRoUG9pbnQgPT5cclxuICAgICAgICAhdGhpcy5wYXRoUG9pbnRDb21wb25lbnRzLmZpbmQoXHJcbiAgICAgICAgICBjb21wb25lbnQgPT4gY29tcG9uZW50LnBhdGggPT09IHBhdGhQb2ludC5wYXRoICYmIGNvbXBvbmVudC5wb2ludCA9PT0gcGF0aFBvaW50LnBvaW50XHJcbiAgICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWN0aXZlUGF0aHMoKSB7XHJcbiAgICBjb25zdCBwYXRoczogUGF0aFtdID0gW107XHJcbiAgICB0aGlzLnN0YWdlLmxheWVycy5tYXAobGF5ZXIgPT4gcGF0aHMucHVzaCguLi5sYXllci5wYXRocykpO1xyXG5cclxuICAgIHJldHVybiBwYXRocztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvUG9pbnRTeW5jU2VydmljZS50cyIsImltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbmltcG9ydCB7IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciB9IGZyb20gJ3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcic7XHJcblxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgRmluaXNoUG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQnO1xyXG5pbXBvcnQgeyBTdGFydFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvU3RhcnRQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFBvaW50Q2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9Qb2ludENsaWNrRXZlbnQnO1xyXG5cclxuaW1wb3J0ICd1aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudC5zY3NzJztcclxuXHJcbmNvbnN0IENPTVBPTkVOVF9DTEFTU19OQU1FID0gJ2FwcGxpY2F0aW9uLXVpX192ZXJ0ZXgnO1xyXG5jb25zdCBJTklUSUFMX0NMQVNTX05BTUUgPSAnYXBwbGljYXRpb24tdWlfX3ZlcnRleC0taW5pdGlhbCc7XHJcblxyXG5pbnRlcmZhY2UgUGF0aFBvaW50Q29tcG9uZW50RGVwZW5kZW5jaWVzIHtcclxuICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhdGhQb2ludENvbXBvbmVudCB7XHJcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHB1YmxpYyBwYXRoOiBQYXRoO1xyXG4gIHB1YmxpYyBwb2ludDogUG9pbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGF0aDogUGF0aCxcclxuICAgIHBvaW50OiBQb2ludCxcclxuICAgIGRlcGVuZGVuY2llczogUGF0aFBvaW50Q29tcG9uZW50RGVwZW5kZW5jaWVzXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgdGhpcy5wb2ludCA9IHBvaW50O1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyID0gZGVwZW5kZW5jaWVzLmFwcGxpY2F0aW9uVUlDb250YWluZXI7XHJcbiAgICB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciA9IGRlcGVuZGVuY2llcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbiA9IHRoaXMudXBkYXRlUG9zaXRpb24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Nb3VzZURvd24gPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5zdG9wRHJhZ2dpbmcgPSB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlKCkge1xyXG4gICAgdGhpcy5wb2ludC5tb3ZlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pO1xyXG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMucGF0aC5saW5lUHJvcGVydGllcy5jb2xvci5maWxsU3R5bGU7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gYCR7dGhpcy5wb2ludC55fXB4YDtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5wb2ludC54fXB4YDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaW5pdGlhbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKElOSVRJQUxfQ0xBU1NfTkFNRSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGluaXRpYWwoaXNJbml0aWFsOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNJbml0aWFsKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKElOSVRJQUxfQ0xBU1NfTkFNRSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShJTklUSUFMX0NMQVNTX05BTUUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChDT01QT05FTlRfQ0xBU1NfTkFNRSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnBhdGguZ2V0VmVydGljZXNDb3VudCgpID09PSAxIHx8XHJcbiAgICAgICghdGhpcy5wYXRoLmNsb3NlZCAmJiB0aGlzLnBhdGguZmluZFBvaW50SW5kZXgodGhpcy5wb2ludCkgPT09IDApXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbml0aWFsID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICB0aGlzLnBvaW50Lm1vdmVDYWxsYmFjayA9IHRoaXMudXBkYXRlUG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTW91c2VEb3duKCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgUG9pbnRDbGlja0V2ZW50KHRoaXMpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG4gICAgaWYgKGV2ZW50LmhhbmRsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN0YXJ0UG9pbnREcmFnRXZlbnQodGhpcykpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5zdG9wRHJhZ2dpbmcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgY29uc3QgbW91c2VQb3NpdGlvbiA9IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyLmdldFBvaW50RnJvbU1vdXNlRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUG9pbnREcmFnRXZlbnQodGhpcywgbW91c2VQb3NpdGlvbikpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmcoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBGaW5pc2hQb2ludERyYWdFdmVudCh0aGlzKSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuc3RvcERyYWdnaW5nKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQudHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmFwcGxpY2F0aW9uLXVpX192ZXJ0ZXgge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxuICB3aWR0aDogMTBweDtcXG4gIGhlaWdodDogMTBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpOyB9XFxuICAuYXBwbGljYXRpb24tdWlfX3ZlcnRleDphY3RpdmUge1xcbiAgICBib3JkZXItY29sb3I6IHJlZDtcXG4gICAgYm9yZGVyLXdpZHRoOiAycHg7IH1cXG5cXG4uYXBwbGljYXRpb24tdWlfX3ZlcnRleC0taW5pdGlhbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1MWZmOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEhvcml6b250YWxMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9Ib3Jpem9udGFsTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBWZXJ0aWNhbExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL1ZlcnRpY2FsTGluZUNvbmRpdGlvbic7XHJcblxyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5cclxuY29uc3QgZm9yYmlkZGVuQ29uZGl0aW9uQ29tYmluYXRpb25zID0gW1xyXG4gIFtIb3Jpem9udGFsTGluZUNvbmRpdGlvbiwgSG9yaXpvbnRhbExpbmVDb25kaXRpb25dLFxyXG4gIFtWZXJ0aWNhbExpbmVDb25kaXRpb24sIFZlcnRpY2FsTGluZUNvbmRpdGlvbl1cclxuXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25NYXRjaGVyIHtcclxuICBwdWJsaWMgdmVyaWZ5Q29uZGl0aW9uQWxsb3dlZChjb25kaXRpb246IExpbmVDb25kaXRpb24pIHtcclxuICAgIGNvbnN0IHBvbHlnb24gPSBjb25kaXRpb24ucG9seWdvbjtcclxuICAgIGNvbnN0IGxpbmUgPSBjb25kaXRpb24ubGluZTtcclxuXHJcbiAgICBjb25zdCBwMUluZGV4ID0gcG9seWdvbi5maW5kUG9pbnRJbmRleChsaW5lLnAxKTtcclxuICAgIGNvbnN0IHByZXZpb3VzUG9pbnQgPSBwb2x5Z29uLmdldFZlcnRleCh0aGlzLmdldFByZXZpb3VzUG9pbnRJbmRleChwMUluZGV4LCBwb2x5Z29uKSk7XHJcbiAgICBjb25zdCBwMkluZGV4ID0gcG9seWdvbi5maW5kUG9pbnRJbmRleChsaW5lLnAyKTtcclxuICAgIGNvbnN0IG5leHRQb2ludCA9IHBvbHlnb24uZ2V0VmVydGV4KHRoaXMuZ2V0TmV4dFBvaW50SW5kZXgocDJJbmRleCwgcG9seWdvbikpO1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzTGluZSA9IG5ldyBMaW5lKHByZXZpb3VzUG9pbnQsIGxpbmUucDEpO1xyXG4gICAgY29uc3QgbmV4dExpbmUgPSBuZXcgTGluZShsaW5lLnAyLCBuZXh0UG9pbnQpO1xyXG5cclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb25zID0gcG9seWdvbi5nZXRMaW5lQ29uZGl0aW9ucygpO1xyXG4gICAgY29uc3QgcHJldmlvdXNMaW5lQ29uZGl0aW9ucyA9IGxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+XHJcbiAgICAgIGxpbmVDb25kaXRpb24ubGluZS5lcXVhbHMocHJldmlvdXNMaW5lKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG5leHRMaW5lQ29uZGl0aW9ucyA9IGxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+XHJcbiAgICAgIGxpbmVDb25kaXRpb24ubGluZS5lcXVhbHMobmV4dExpbmUpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMudmVyaWZ5Tm90Rm9yYmlkZGVuQ29tYmluYXRpb24ocHJldmlvdXNMaW5lQ29uZGl0aW9ucywgY29uZGl0aW9uKTtcclxuICAgIHRoaXMudmVyaWZ5Tm90Rm9yYmlkZGVuQ29tYmluYXRpb24obmV4dExpbmVDb25kaXRpb25zLCBjb25kaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoZWNrRm9yYmlkZGVuQ29tYmluYXRpb24oY29uc3RydWN0b3IxOiBGdW5jdGlvbiwgY29uc3RydWN0b3IyOiBGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGZvcmJpZGRlbkNvbmRpdGlvbkNvbWJpbmF0aW9ucy5maW5kKFxyXG4gICAgICBjb21iaW5hdGlvbiA9PlxyXG4gICAgICAgIChjb25zdHJ1Y3RvcjEgPT09IGNvbWJpbmF0aW9uWzBdICYmIGNvbnN0cnVjdG9yMiA9PT0gY29tYmluYXRpb25bMV0pIHx8XHJcbiAgICAgICAgKGNvbnN0cnVjdG9yMSA9PT0gY29tYmluYXRpb25bMV0gJiYgY29uc3RydWN0b3IyID09PSBjb21iaW5hdGlvblswXSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZlcmlmeU5vdEZvcmJpZGRlbkNvbWJpbmF0aW9uKFxyXG4gICAgbGluZUNvbmRpdGlvbnM6IExpbmVDb25kaXRpb25bXSxcclxuICAgIHNpbmdsZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvblxyXG4gICkge1xyXG4gICAgZm9yIChjb25zdCBsaW5lQ29uZGl0aW9uIG9mIGxpbmVDb25kaXRpb25zKSB7XHJcbiAgICAgIGNvbnN0IGZvcmJpZGRlbkNvbmRpdGlvbiA9IHRoaXMuY2hlY2tGb3JiaWRkZW5Db21iaW5hdGlvbihcclxuICAgICAgICBsaW5lQ29uZGl0aW9uLmNvbnN0cnVjdG9yLFxyXG4gICAgICAgIHNpbmdsZUNvbmRpdGlvbi5jb25zdHJ1Y3RvclxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKGZvcmJpZGRlbkNvbmRpdGlvbikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgIGBGb3JiaWRkZW4gY29tYmluYXRpb246ICR7Zm9yYmlkZGVuQ29uZGl0aW9uWzBdLm5hbWV9LCAke2ZvcmJpZGRlbkNvbmRpdGlvblsxXS5uYW1lfWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFByZXZpb3VzUG9pbnRJbmRleChjdXJyZW50SW5kZXg6IG51bWJlciwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgY3VycmVudEluZGV4IC09IDE7XHJcbiAgICBpZiAoY3VycmVudEluZGV4IDwgMCkge1xyXG4gICAgICBjdXJyZW50SW5kZXggPSBwb2x5Z29uLmdldFZlcnRpY2VzQ291bnQoKSAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TmV4dFBvaW50SW5kZXgoY3VycmVudEluZGV4OiBudW1iZXIsIHBvbHlnb246IFBvbHlnb24pIHtcclxuICAgIHJldHVybiAoY3VycmVudEluZGV4ICsgMSkgJSBwb2x5Z29uLmdldFZlcnRpY2VzQ291bnQoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9Db25kaXRpb25NYXRjaGVyLnRzIiwiaW1wb3J0IHsgSW5zdHJ1Y3Rpb25zRGlhbG9nIH0gZnJvbSAndWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnN0cnVjdGlvbnNCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgcHJpdmF0ZSBidXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuYnV0dG9uLnRleHRDb250ZW50ID0gJ0luc3RydWN0aW9ucyc7XHJcbiAgICB0aGlzLmJ1dHRvbi5jbGFzc05hbWUgPSAnaW5zdHJ1Y3Rpb25zLWJ1dHRvbic7XHJcblxyXG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrID0gdGhpcy5vbkJ1dHRvbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uKTtcclxuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkJ1dHRvbkNsaWNrKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5idXR0b24pO1xyXG4gICAgdGhpcy5idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQnV0dG9uQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkJ1dHRvbkNsaWNrKCkge1xyXG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zRGlhbG9nID0gbmV3IEluc3RydWN0aW9uc0RpYWxvZygpO1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbnNEaWFsb2cpO1xyXG4gIH1cclxufVxyXG5cclxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLWluc3RydWN0aW9ucy1idXR0b24nLCBJbnN0cnVjdGlvbnNCdXR0b24pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNCdXR0b24udHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5pbnN0cnVjdGlvbnMtZGlhbG9nLXdyYXBwZXIge1xcbiAgei1pbmRleDogMjsgfVxcblxcbi5pbnN0cnVjdGlvbnMtZGlhbG9nX19vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiAyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAyNTBtcyBlYXNlLWluLW91dDsgfVxcblxcbi5pbnN0cnVjdGlvbnMtZGlhbG9nX19vdmVybGF5LS1hY3RpdmUge1xcbiAgb3BhY2l0eTogMC41OyB9XFxuXFxuLmluc3RydWN0aW9ucy1kaWFsb2cge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB6LWluZGV4OiAyO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCwgMCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWYzNTBmO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxuICBjb2xvcjogI2VlZTtcXG4gIHBhZGRpbmc6IDJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBib3gtc2hhZG93OiAycHggMnB4IDVweCBibGFjaztcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dDsgfVxcblxcbi5pbnN0cnVjdGlvbnMtZGlhbG9nLS1hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSwgMSk7IH1cXG5cXG4uaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fdGl0bGUge1xcbiAgbWFyZ2luOiAwOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9