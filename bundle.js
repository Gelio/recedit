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
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
        this.conditionPicker.updateButtons();
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
            length = parseInt(value, 10);
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
        this.clonedStartingPoint.moveTo(this.startingPoint);
        const conditionFixer = new ConditionFixer_1.ConditionFixer(this.clonedPolygon, this.clonedStartingPoint, []);
        conditionFixer.tryFix();
        if (conditionFixer.fixSuccessful) {
            return;
        }
        this.clonedStartingPoint.moveTo(this.startingPoint);
        conditionFixer.reset();
        conditionFixer.direction = ConditionFixer_1.FixingDirection.Reverse;
        conditionFixer.tryFix();
        if (conditionFixer.fixSuccessful) {
            return;
        }
        const translationVector = Point_1.Point.subtract(this.startingPoint, lastValidPosition);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmI0MDZkZTE1OTVkOWIwODRjNzEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9Qb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTEVYLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vTGluZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL1JlbmRlckV2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vQ09MT1JTLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0xheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0xpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvTGluZUNsaWNrRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy9Qb2ludENsaWNrRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9PY3RhbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9QYXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vTGluZVByb3BlcnRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0NvbmRpdGlvbkZpeGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy9wb2ludC1kcmFnL1N0YXJ0UG9pbnREcmFnRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3M/NDQ0NiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcy93ZWJjb21wb25lbnRzLWhpLXNkLWNlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvRXZlbnRBZ2dyZWdhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvRXZlbnRRdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGluZS1yYXN0ZXJpemVyL0xpbmVSYXN0ZXJpemVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saW5lLXJhc3Rlcml6ZXIvb2N0YW50LXZlY3Rvci10cmFuc2Zvcm1hdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vQ29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9IaXRUZXN0UmVzdWx0LnRzIiwid2VicGFjazovLy8uL3NyYy9TdGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvVUlDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb25kaXRpb25zL1VJQ29uZGl0aW9uQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0ZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy9GaXhlZExlbmd0aExpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3M/ZDM2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlci5zY3NzP2U0MzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvTmV3UG9seWdvblVJQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnREcmFnZ2luZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvQ29udGludW91c0NvbmRpdGlvbkZpeGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9Qb2ludEluc2VydGVyU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnRSZW1vdmVyU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnRTeW5jU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnNjc3M/NzI5YiIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy9Db25kaXRpb25NYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNCdXR0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzPzRlMmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNB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NkRBQTZEO0FBQzdELE1BQU0sMkJBQTJCLEdBQUc7SUFDbEMsQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxlQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxlQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDLGVBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFLLENB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QUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sYUFBYTtRQUNuQixNQUFNLGtCQUFrQixHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGO0FBM0JELGdEQTJCQztBQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLGtCQUFrQixDQUFDLENBQUM7Ozs7Ozs7QUMvQjVFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7QUN6QkE7QUFDQTs7O0FBR0E7QUFDQSx1REFBd0QsZUFBZSxFQUFFLG1DQUFtQyxvQkFBb0IsV0FBVyxZQUFZLGVBQWUsaUJBQWlCLGtCQUFrQiwyQkFBMkIsZUFBZSwwQ0FBMEMsRUFBRSwyQ0FBMkMsaUJBQWlCLEVBQUUsMEJBQTBCLG9CQUFvQixhQUFhLGNBQWMsZUFBZSxpREFBaUQsOEJBQThCLDRCQUE0QixnQkFBZ0IsaUJBQWlCLHdCQUF3QixrQ0FBa0MsNENBQTRDLEVBQUUsa0NBQWtDLGlEQUFpRCxFQUFFLGlDQUFpQyxjQUFjLEVBQUU7O0FBRS95QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmI0MDZkZTE1OTVkOWIwODRjNzEiLCJpbXBvcnQgeyBDT0xPUlMgfSBmcm9tICdjb21tb24vQ09MT1JTJztcclxuaW1wb3J0IHsgTGluZVByb3BlcnRpZXMgfSBmcm9tICdjb21tb24vTGluZVByb3BlcnRpZXMnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcblxyXG5jb25zdCBjb25maWd1cmF0aW9uID0ge1xyXG4gIG5ld0xpbmVQcmV2aWV3UHJvcGVydGllczogbmV3IExpbmVQcm9wZXJ0aWVzKENPTE9SUy5CTFVFLCAyKSxcclxuICBuZXdQb2x5Z29uTGluZVByb3BlcnRpZXM6IG5ldyBMaW5lUHJvcGVydGllcyhDT0xPUlMuUkVELCAxKSxcclxuICBwb2x5Z29uTGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzLmdldERlZmF1bHQoKSxcclxuICBhcHBsaWNhdGlvblVJQ29udGFpbmVySUQ6ICdhcHBsaWNhdGlvbi11aScsXHJcbiAgaGl0VG9sZXJhbmNlOiAxMCxcclxuICBtaW5Qb2x5Z29uUG9pbnRzOiAzLFxyXG4gIGRvdWJsZUNsaWNrTWF4RGVsYXk6IDUwMCxcclxuICBkaXNwbGF5UGF0aEdob3N0V2hlbkRyYWdnaW5nOiBmYWxzZSxcclxuICBlcHNpbG9uOiAxMGUtNCxcclxuICBsaW5lRGV2aWF0aW9uQWxsb3dhbmNlSW5EZWdyZWVzOiAyMCxcclxuICBjYW52YXNGb250OiAnMzBwdCBzZXJpZicsXHJcbiAgbGluZUNvbmRpdGlvbkxhYmVsT2Zmc2V0OiBuZXcgUG9pbnQoNSwgMClcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgY29uZmlndXJhdGlvblxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25maWd1cmF0aW9uLnRzIiwiaW1wb3J0IHsgT2N0YW50IH0gZnJvbSAnY29tbW9uL09jdGFudCc7XHJcblxyXG50eXBlIE1vdmVDYWxsYmFjayA9ICgpID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnQge1xyXG4gIHB1YmxpYyBtb3ZlQ2FsbGJhY2s6IE1vdmVDYWxsYmFjayB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIF94OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfeTogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgZ2V0IHgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl95O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3ggPSB4O1xyXG4gICAgdGhpcy5feSA9IHk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFkZChwMTogUG9pbnQsIHAyOiBQb2ludCk6IFBvaW50IHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQocDEueCArIHAyLngsIHAxLnkgKyBwMi55KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc3VidHJhY3QocDE6IFBvaW50LCBwMjogUG9pbnQpOiBQb2ludCB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHAxLnggLSBwMi54LCBwMS55IC0gcDIueSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldERpc3RhbmNlQmV0d2VlbihwMTogUG9pbnQsIHAyOiBQb2ludCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFBvaW50LmdldERpc3RhbmNlQmV0d2VlblNxdWFyZWQocDEsIHAyKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldERpc3RhbmNlQmV0d2VlblNxdWFyZWQocDE6IFBvaW50LCBwMjogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGgucG93KHAxLnggLSBwMi54LCAyKSArIE1hdGgucG93KHAxLnkgLSBwMi55LCAyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0QW5nbGUocDE6IFBvaW50LCBwMjogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgbGV0IGFuZ2xlID0gKE1hdGguYXRhbjIocDIueSAtIHAxLnksIHAyLnggLSBwMS54KSkgKiAxODAgLyBNYXRoLlBJO1xyXG5cclxuICAgIGlmIChhbmdsZSA8IDApIHtcclxuICAgICAgYW5nbGUgKz0gMzYwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhbmdsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlVG8ocG9pbnQ6IFBvaW50KTogdm9pZDtcclxuICBwdWJsaWMgbW92ZVRvKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZDtcclxuICBwdWJsaWMgbW92ZVRvKHBvaW50T3JYOiBQb2ludCB8IG51bWJlciwgeT86IG51bWJlcikge1xyXG4gICAgaWYgKHR5cGVvZiBwb2ludE9yWCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgaWYgKCF5KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd4IGlzIGRlZmluZWQsIGJ1dCB5IGlzIG5vdCBkZWZpbmVkJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLm1vdmVUb0Nvb3JkaW5hdGVzKHBvaW50T3JYLCB5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5tb3ZlVG9Qb2ludChwb2ludE9yWCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0T2N0YW50KCk6IE9jdGFudCB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy54O1xyXG4gICAgY29uc3QgeSA9IHRoaXMueTtcclxuICAgIGxldCBvY3RhbnQgPSBPY3RhbnQuRmlyc3Q7XHJcblxyXG4gICAgaWYgKHkgPj0gMCkge1xyXG4gICAgICBpZiAoeCA+PSAwKSB7XHJcbiAgICAgICAgLy8gRmlyc3QgcXVhcnRlclxyXG4gICAgICAgIGlmICh5IDw9IHgpIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5GaXJzdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LlNlY29uZDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gU2Vjb25kIHF1YXJ0ZXJcclxuICAgICAgICBpZiAoeSA+PSAteCkge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LlRoaXJkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuRm91cnRoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHggPD0gMCkge1xyXG4gICAgICAgIC8vIFRoaXJkIHF1YXJ0ZXJcclxuICAgICAgICBpZiAoeSA+PSB4KSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuRmlmdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5TaXh0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRm91cnRoIHF1YXJ0ZXJcclxuICAgICAgICBpZiAoeSA8IC14KSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuU2V2ZW50aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LkVpZ2h0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2N0YW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVxdWFscyhwb2ludDogUG9pbnQpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnggPT09IHBvaW50LnggJiYgdGhpcy55ID09PSBwb2ludC55O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERpc3RhbmNlVG8ocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBQb2ludC5nZXREaXN0YW5jZUJldHdlZW4odGhpcywgcG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERpc3RhbmNlU3F1YXJlZFRvKHBvaW50OiBQb2ludCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZCh0aGlzLCBwb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbW92ZVRvUG9pbnQocG9pbnQ6IFBvaW50KSB7XHJcbiAgICByZXR1cm4gdGhpcy5tb3ZlVG9Db29yZGluYXRlcyhwb2ludC54LCBwb2ludC55KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbW92ZVRvQ29vcmRpbmF0ZXMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3ggPSB4O1xyXG4gICAgdGhpcy5feSA9IHk7XHJcblxyXG4gICAgaWYgKHRoaXMubW92ZUNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMubW92ZUNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9Qb2ludC50cyIsIi8vIERpY3Rpb25hcnlcclxuY29uc3QgTEVYID0ge1xyXG4gIFBPTFlHT05fTEFZRVJfTkFNRTogJ1BvbHlnb25MYXllcicsXHJcbiAgUEFUSF9MQVlFUl9OQU1FOiAnUGF0aExheWVyJyxcclxuICBQQVRIX0dIT1NUX0xBWUVSX05BTUU6ICdQYXRoR2hvc3RMYXllcicsXHJcbiAgTkVXX0NPTkRJVElPTl9FVkVOVF9OQU1FOiAnbmV3LWNvbmRpdGlvbicsXHJcbiAgUkVNT1ZFX0NPTkRJVElPTl9FVkVOVF9OQU1FOiAncmVtb3ZlLWNvbmRpdGlvbicsXHJcbiAgS0VZX0NPREU6IHtcclxuICAgIEVTQ0FQRTogMjdcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIExFWFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9MRVgudHMiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZSB7XHJcbiAgcHVibGljIHAxOiBQb2ludDtcclxuICBwdWJsaWMgcDI6IFBvaW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwMTogUG9pbnQsIHAyOiBQb2ludCkge1xyXG4gICAgaWYgKHAxLmVxdWFscyhwMikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIGxpbmUgYmV0d2VlbiBwb2ludHMgYXQgdGhlIHNhbWUgY29vcmRpbmF0ZXMnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnAxID0gcDE7XHJcbiAgICB0aGlzLnAyID0gcDI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzdGFuY2VUb1BvaW50KHA6IFBvaW50KTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHAxID0gdGhpcy5wMTtcclxuICAgIGNvbnN0IHAyID0gdGhpcy5wMjtcclxuXHJcbiAgICBsZXQgdCA9XHJcbiAgICAgICgocC54IC0gcDEueCkgKiAocDIueCAtIHAxLngpICsgKHAueSAtIHAxLnkpICogKHAyLnkgLSBwMS55KSkgL1xyXG4gICAgICBQb2ludC5nZXREaXN0YW5jZUJldHdlZW5TcXVhcmVkKHAxLCBwMik7XHJcbiAgICB0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdCkpO1xyXG5cclxuICAgIHJldHVybiBwLmdldERpc3RhbmNlVG8obmV3IFBvaW50KHAxLnggKyB0ICogKHAyLnggLSBwMS54KSwgcDEueSArIHQgKiAocDIueSAtIHAxLnkpKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXF1YWxzKGxpbmU6IExpbmUpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICh0aGlzLnAxLmVxdWFscyhsaW5lLnAxKSAmJiB0aGlzLnAyLmVxdWFscyhsaW5lLnAyKSkgfHxcclxuICAgICAgKHRoaXMucDEuZXF1YWxzKGxpbmUucDIpICYmIHRoaXMucDIuZXF1YWxzKGxpbmUucDEpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNaWRkbGVQb2ludCgpOiBQb2ludCB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KCh0aGlzLnAxLnggKyB0aGlzLnAyLngpIC8gMiwgKHRoaXMucDEueSArIHRoaXMucDIueSkgLyAyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuKHRoaXMucDEsIHRoaXMucDIpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vTGluZS50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZCA9IG51bGw7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IFJlbmRlckV2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgaGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ1JlbmRlckV2ZW50JztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL1JlbmRlckV2ZW50LnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN5bmNDb21wb25lbnRzRXZlbnQgaW1wbGVtZW50cyBBcHBFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQgPSBudWxsO1xyXG4gIHB1YmxpYyByZWFkb25seSBldmVudFR5cGUgPSBTeW5jQ29tcG9uZW50c0V2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgaGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ1N5bmNDb21wb25lbnRzRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudC50cyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbW1vbi9Db2xvcic7XHJcblxyXG5leHBvcnQgY29uc3QgQ09MT1JTID0ge1xyXG4gIEJMQUNLOiBuZXcgQ29sb3IoMCwgMCwgMCksXHJcbiAgUkVEOiBuZXcgQ29sb3IoMjU1LCAwLCAwKSxcclxuICBCTFVFOiBuZXcgQ29sb3IoMCwgMjU1LCAwKSxcclxuICBHUkVFTjogbmV3IENvbG9yKDAsIDAsIDI1NSlcclxufTtcclxuXHJcbk9iamVjdC5mcmVlemUoQ09MT1JTKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0NPTE9SUy50cyIsImltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcblxyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2x5Z29uIGV4dGVuZHMgUGF0aCB7XHJcbiAgcHJpdmF0ZSBsaW5lQ29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXRoOiBQYXRoKTtcclxuICBjb25zdHJ1Y3Rvcih2ZXJ0aWNlczogUG9pbnRbXSwgbGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzKTtcclxuXHJcbiAgY29uc3RydWN0b3IocGF0aE9yVmVydGljZXM6IFBhdGggfCBQb2ludFtdLCBsaW5lUHJvcGVydGllcz86IExpbmVQcm9wZXJ0aWVzKSB7XHJcbiAgICBsZXQgdmVydGljZXM6IFBvaW50W107XHJcblxyXG4gICAgaWYgKHBhdGhPclZlcnRpY2VzIGluc3RhbmNlb2YgUGF0aCkge1xyXG4gICAgICBjb25zdCBwYXRoID0gcGF0aE9yVmVydGljZXM7XHJcbiAgICAgIHZlcnRpY2VzID0gcGF0aC5nZXRWZXJ0aWNlcygpO1xyXG4gICAgICBsaW5lUHJvcGVydGllcyA9IHBhdGgubGluZVByb3BlcnRpZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2ZXJ0aWNlcyA9IHBhdGhPclZlcnRpY2VzO1xyXG4gICAgICBsaW5lUHJvcGVydGllcyA9IDxMaW5lUHJvcGVydGllcz5saW5lUHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICBQb2x5Z29uLmVuc3VyZVZlcnRpY2VzTGVuZ3RoKHZlcnRpY2VzKTtcclxuICAgIHN1cGVyKHZlcnRpY2VzLCBsaW5lUHJvcGVydGllcyk7XHJcbiAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICB0aGlzLmxpbmVDb25kaXRpb25zID0gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBlbnN1cmVWZXJ0aWNlc0xlbmd0aCh2ZXJ0aWNlczogUG9pbnRbXSkge1xyXG4gICAgaWYgKHZlcnRpY2VzLmxlbmd0aCA+PSBjb25maWd1cmF0aW9uLm1pblBvbHlnb25Qb2ludHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IG5ldyBFcnJvcihgUG9seWdvbiBtdXN0IGhhdmUgYXQgbGVhc3QgJHtjb25maWd1cmF0aW9uLm1pblBvbHlnb25Qb2ludHN9IHZlcnRpY2VzYCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvbmUoKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24oc3VwZXIuY2xvbmUoKSk7XHJcblxyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9ucy5mb3JFYWNoKGxpbmVDb25kaXRpb24gPT4ge1xyXG4gICAgICBjb25zdCBwMUluZGV4ID0gdGhpcy5maW5kUG9pbnRJbmRleChsaW5lQ29uZGl0aW9uLmxpbmUucDEpO1xyXG4gICAgICBjb25zdCBwMkluZGV4ID0gdGhpcy5maW5kUG9pbnRJbmRleChsaW5lQ29uZGl0aW9uLmxpbmUucDIpO1xyXG5cclxuICAgICAgY29uc3QgbmV3TGluZUNvbmRpdGlvbiA9IGxpbmVDb25kaXRpb24uZHVwbGljYXRlRm9yTmV3TGluZShcclxuICAgICAgICBuZXcgTGluZShwb2x5Z29uLnZlcnRpY2VzW3AxSW5kZXhdLCBwb2x5Z29uLnZlcnRpY2VzW3AySW5kZXhdKSxcclxuICAgICAgICBwb2x5Z29uXHJcbiAgICAgICk7XHJcbiAgICAgIHBvbHlnb24ubGluZUNvbmRpdGlvbnMucHVzaChuZXdMaW5lQ29uZGl0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBwb2x5Z29uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluc2VydFZlcnRleChwb2ludDogUG9pbnQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHByZXZpb3VzUG9pbnRJbmRleCA9IHRoaXMuZ2V0UHJldmlvdXNQb2ludEluZGV4KGluZGV4KTtcclxuXHJcbiAgICBjb25zdCBwcmV2aW91c0xpbmUgPSBuZXcgTGluZSh0aGlzLmdldFZlcnRleChwcmV2aW91c1BvaW50SW5kZXgpLCB0aGlzLmdldFZlcnRleChpbmRleCkpO1xyXG4gICAgY29uc3QgbWF0Y2hpbmdDb25kaXRpb25zID0gdGhpcy5saW5lQ29uZGl0aW9ucy5maWx0ZXIobGluZUNvbmRpdGlvbiA9PlxyXG4gICAgICBsaW5lQ29uZGl0aW9uLmxpbmUuZXF1YWxzKHByZXZpb3VzTGluZSlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKG1hdGNoaW5nQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgQ2Fubm90IGluc2VydCBhIHBvaW50IGJlY2F1c2Ugb2YgYW4gZXhpc3RpbmcgY29uZGl0aW9uICgke21hdGNoaW5nQ29uZGl0aW9uc1swXS5jb25zdHJ1Y3RvclxyXG4gICAgICAgICAgLm5hbWV9KWBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzdXBlci5pbnNlcnRWZXJ0ZXgocG9pbnQsIGluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXROZXh0UG9pbnRJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKGluZGV4ICsgMSkgJSB0aGlzLmdldFZlcnRpY2VzQ291bnQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXROZXh0UG9pbnQocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmVydGljZXMuaW5kZXhPZihwb2ludCk7XHJcbiAgICBjb25zdCBuZXh0UG9pbnRJbmRleCA9IHRoaXMuZ2V0TmV4dFBvaW50SW5kZXgoaW5kZXgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmdldFZlcnRleChuZXh0UG9pbnRJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJldmlvdXNQb2ludEluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgIGxldCBwcmV2aW91c1BvaW50SW5kZXggPSBpbmRleCAtIDE7XHJcbiAgICBpZiAocHJldmlvdXNQb2ludEluZGV4IDwgMCkge1xyXG4gICAgICBwcmV2aW91c1BvaW50SW5kZXggPSB0aGlzLmdldFZlcnRpY2VzQ291bnQoKSAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzUG9pbnRJbmRleDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcmV2aW91c1BvaW50KHBvaW50OiBQb2ludCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZlcnRpY2VzLmluZGV4T2YocG9pbnQpO1xyXG4gICAgY29uc3QgcHJldmlvdXNQb2ludEluZGV4ID0gdGhpcy5nZXRQcmV2aW91c1BvaW50SW5kZXgoaW5kZXgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmdldFZlcnRleChwcmV2aW91c1BvaW50SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVZlcnRleChwb2ludDogUG9pbnQpIHtcclxuICAgIGlmICh0aGlzLmdldFZlcnRpY2VzQ291bnQoKSA9PT0gY29uZmlndXJhdGlvbi5taW5Qb2x5Z29uUG9pbnRzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGRlbGV0ZSB2ZXJ0ZXgnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdXBlci5yZW1vdmVWZXJ0ZXgocG9pbnQpO1xyXG5cclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb25zVG9SZW1vdmUgPSB0aGlzLmxpbmVDb25kaXRpb25zLmZpbHRlcihcclxuICAgICAgbGluZUNvbmRpdGlvbiA9PiBsaW5lQ29uZGl0aW9uLmxpbmUucDEgPT09IHBvaW50IHx8IGxpbmVDb25kaXRpb24ubGluZS5wMiA9PT0gcG9pbnRcclxuICAgICk7XHJcbiAgICBsaW5lQ29uZGl0aW9uc1RvUmVtb3ZlLmZvckVhY2gobGluZUNvbmRpdGlvbiA9PiB0aGlzLnJlbW92ZUxpbmVDb25kaXRpb24obGluZUNvbmRpdGlvbikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZExpbmVDb25kaXRpb24obGluZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvbikge1xyXG4gICAgaWYgKGxpbmVDb25kaXRpb24ucG9seWdvbiAhPT0gdGhpcykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgY29uZGl0aW9uIGJvdW5kIHRvIHdyb25nIHBvbHlnb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwMUluZGV4ID0gdGhpcy5maW5kUG9pbnRJbmRleChsaW5lQ29uZGl0aW9uLmxpbmUucDEpO1xyXG4gICAgY29uc3QgcDJJbmRleCA9IHRoaXMuZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAyKTtcclxuICAgIGlmIChwMUluZGV4ID09PSAtMSB8fCBwMkluZGV4ID09PSAtMikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgY29uZGl0aW9uIGJvdW5kIHRvIHdyb25nIGxpbmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxpbmVDb25kaXRpb24uaXNNZXQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgY29uZGl0aW9uIGlzIG5vdCBtZXQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpbmVDb25kaXRpb25zLnB1c2gobGluZUNvbmRpdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlTGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubGluZUNvbmRpdGlvbnMuaW5kZXhPZihsaW5lQ29uZGl0aW9uKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBjb25kaXRpb24gbm90IGZvdW5kJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExpbmVDb25kaXRpb25zKCkge1xyXG4gICAgcmV0dXJuIFsuLi50aGlzLmxpbmVDb25kaXRpb25zXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlVG8ocG9seWdvbjogUG9seWdvbikge1xyXG4gICAgaWYgKHRoaXMuZ2V0VmVydGljZXNDb3VudCgpICE9PSBwb2x5Z29uLmdldFZlcnRpY2VzQ291bnQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBudW1iZXIgb2YgdmVydGljZXMgZG9lcyBub3QgbWF0Y2gnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZlcnRpY2VzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4gcG9pbnQubW92ZVRvKHBvbHlnb24uZ2V0VmVydGV4KGluZGV4KSkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vUG9seWdvbi50cyIsImltcG9ydCB7IEhpdFRlc3RSZXN1bHQgfSBmcm9tICdjb21tb24vSGl0VGVzdFJlc3VsdCc7XHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdSZW5kZXJlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgTGF5ZXIge1xyXG4gIHB1YmxpYyBwYXRoczogUGF0aFtdID0gW107XHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbmRlcihyZW5kZXJlcjogUmVuZGVyZXIpIHtcclxuICAgIHRoaXMucGF0aHMuZm9yRWFjaChwYXRoID0+IHJlbmRlcmVyLmRyYXdQYXRoKHBhdGgpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVQYXRoKHBhdGg6IFBhdGgpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXRocy5pbmRleE9mKHBhdGgpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wYXRocy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpdFRlc3QocG9pbnQ6IFBvaW50KTogSGl0VGVzdFJlc3VsdCB8IG51bGwge1xyXG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHRoaXMucGF0aHMpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gcGF0aC5oaXRUZXN0KHBvaW50KTtcclxuICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVzdWx0LmxheWVyID0gdGhpcztcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9MYXllci50cyIsImltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lQ29uZGl0aW9uIHtcclxuICBwdWJsaWMgcmVhZG9ubHkgbGluZTogTGluZTtcclxuICBwdWJsaWMgcmVhZG9ubHkgcG9seWdvbjogUG9seWdvbjtcclxuXHJcbiAgY29uc3RydWN0b3IobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgdGhpcy5saW5lID0gbGluZTtcclxuICAgIHRoaXMucG9seWdvbiA9IHBvbHlnb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNNZXQoKTogYm9vbGVhbiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmVDb25kaXRpb24uaXNNZXQgbm90IGltcGxlbWVudGVkJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KF9sb2NrZWRQb2ludDogUG9pbnQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTGluZUNvbmRpdGlvbi5maXggbm90IGltcGxlbWVudGVkJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHVwbGljYXRlRm9yTmV3TGluZShfbGluZTogTGluZSwgX3BvbHlnb246IFBvbHlnb24pOiBMaW5lQ29uZGl0aW9uIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmVyaWZ5Q2FuQmVBcHBsaWVkKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uLnRzIiwiaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExFWCB9IGZyb20gJ0xFWCc7XHJcbmltcG9ydCB7XHJcbiAgTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMsXHJcbiAgU2VsZWN0ZWRUYXJnZXRcclxufSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyc7XHJcblxyXG5pbXBvcnQgJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3MnO1xyXG5cclxuY29uc3QgTElORV9DT05ESVRJT05fQUNUSVZFX0NMQVNTID0gJ2xpbmUtY29uZGl0aW9uLS1hY3RpdmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVDb25kaXRpb25FbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIHByb3RlY3RlZCByZWFkb25seSBidXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIHByb3RlY3RlZCByZWFkb25seSBzZWxlY3RlZFRhcmdldDogU2VsZWN0ZWRUYXJnZXQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGFyZ2V0ID0gZGVwZW5kZW5jaWVzLnNlbGVjdGVkVGFyZ2V0O1xyXG5cclxuICAgIHRoaXMuYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmJ1dHRvbi5jbGFzc05hbWUgPSAnbGluZS1jb25kaXRpb25fX2J1dHRvbic7XHJcbiAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25CdXR0b25DbGljay5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5idXR0b24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQnV0dG9uKCkge1xyXG4gICAgY29uc3QgdGFyZ2V0Q29uZGl0aW9ucyA9IHRoaXMuZ2V0VGFyZ2V0Q29uZGl0aW9ucygpO1xyXG4gICAgY29uc3Qgb3RoZXJDb25kaXRpb25zID0gdGhpcy5nZXRPdGhlclRhcmdldENvbmRpdGlvbnModGFyZ2V0Q29uZGl0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5idXR0b24uZGlzYWJsZWQgPSBvdGhlckNvbmRpdGlvbnMubGVuZ3RoID4gMDtcclxuXHJcbiAgICBpZiAodGFyZ2V0Q29uZGl0aW9ucy5sZW5ndGggLSBvdGhlckNvbmRpdGlvbnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChMSU5FX0NPTkRJVElPTl9BQ1RJVkVfQ0xBU1MpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKExJTkVfQ09ORElUSU9OX0FDVElWRV9DTEFTUyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlTmV3Q29uZGl0aW9uKCk6IExpbmVDb25kaXRpb24gfCBudWxsIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0TGluZUNvbmRpdGlvbkNvbnN0cnVjdG9yKCk6IEZ1bmN0aW9uIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQnV0dG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldENvbmRpdGlvbnMgPSB0aGlzLmdldFRhcmdldENvbmRpdGlvbnMoKTtcclxuICAgIGNvbnN0IG90aGVyQ29uZGl0aW9ucyA9IHRoaXMuZ2V0T3RoZXJUYXJnZXRDb25kaXRpb25zKHRhcmdldENvbmRpdGlvbnMpO1xyXG5cclxuICAgIGlmICh0YXJnZXRDb25kaXRpb25zLmxlbmd0aCAtIG90aGVyQ29uZGl0aW9ucy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uID0gdGFyZ2V0Q29uZGl0aW9uc1swXTtcclxuXHJcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoTEVYLlJFTU9WRV9DT05ESVRJT05fRVZFTlRfTkFNRSwgeyBidWJibGVzOiB0cnVlLCBkZXRhaWw6IGNvbmRpdGlvbiB9KVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uID0gdGhpcy5jcmVhdGVOZXdDb25kaXRpb24oKTtcclxuICAgICAgaWYgKCFjb25kaXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoTEVYLk5FV19DT05ESVRJT05fRVZFTlRfTkFNRSwgeyBidWJibGVzOiB0cnVlLCBkZXRhaWw6IGNvbmRpdGlvbiB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRUYXJnZXRDb25kaXRpb25zKCkge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUgfHwgIXRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBub3Qgc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwb2x5Z29uID0gdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uO1xyXG4gICAgY29uc3QgbGluZSA9IHRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZTtcclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb25zID0gcG9seWdvbi5nZXRMaW5lQ29uZGl0aW9ucygpO1xyXG5cclxuICAgIHJldHVybiBsaW5lQ29uZGl0aW9ucy5maWx0ZXIobGluZUNvbmRpdGlvbiA9PiBsaW5lQ29uZGl0aW9uLmxpbmUuZXF1YWxzKGxpbmUpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3RoZXJUYXJnZXRDb25kaXRpb25zKHRhcmdldENvbmRpdGlvbnM6IExpbmVDb25kaXRpb25bXSkge1xyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbkNvbnN0cnVjdG9yID0gdGhpcy5nZXRMaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IoKTtcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0Q29uZGl0aW9ucy5maWx0ZXIoXHJcbiAgICAgIGxpbmVDb25kaXRpb24gPT4gIShsaW5lQ29uZGl0aW9uIGluc3RhbmNlb2YgbGluZUNvbmRpdGlvbkNvbnN0cnVjdG9yKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcblxyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnY29tbW9uL1BhdGgnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcblxyXG5pbnRlcmZhY2UgTGluZUNsaWNrRXZlbnRQYXlsb2FkIHtcclxuICBsaW5lOiBMaW5lO1xyXG4gIHBhdGg6IFBhdGg7XHJcbiAgcG9zaXRpb246IFBvaW50O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUNsaWNrRXZlbnQgaW1wbGVtZW50cyBBcHBFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IExpbmVDbGlja0V2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZDogTGluZUNsaWNrRXZlbnRQYXlsb2FkO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxpbmU6IExpbmUsIHBhdGg6IFBhdGgsIHBvc2l0aW9uOiBQb2ludCkge1xyXG4gICAgdGhpcy5wYXlsb2FkID0ge1xyXG4gICAgICBsaW5lLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBwb3NpdGlvblxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnTGluZUNsaWNrRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvTGluZUNsaWNrRXZlbnQudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludENsaWNrRXZlbnQgaW1wbGVtZW50cyBBcHBFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IFBvaW50Q2xpY2tFdmVudC5ldmVudFR5cGU7XHJcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQ6IFBhdGhQb2ludENvbXBvbmVudDtcclxuICBwdWJsaWMgaGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXRoUG9pbnRDb21wb25lbnQ6IFBhdGhQb2ludENvbXBvbmVudCkge1xyXG4gICAgdGhpcy5wYXlsb2FkID0gcGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdQb2ludENsaWNrRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvUG9pbnRDbGlja0V2ZW50LnRzIiwiZXhwb3J0IGVudW0gT2N0YW50IHtcclxuICBGaXJzdCxcclxuICBTZWNvbmQsXHJcbiAgVGhpcmQsXHJcbiAgRm91cnRoLFxyXG4gIEZpZnRoLFxyXG4gIFNpeHRoLFxyXG4gIFNldmVudGgsXHJcbiAgRWlnaHRoXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL09jdGFudC50cyIsImltcG9ydCB7IEhpdFRlc3RSZXN1bHQgfSBmcm9tICdjb21tb24vSGl0VGVzdFJlc3VsdCc7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgUGF0aCB7XHJcbiAgcHVibGljIGNsb3NlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXM7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHZlcnRpY2VzOiBQb2ludFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih2ZXJ0aWNlczogUG9pbnRbXSwgbGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzKSB7XHJcbiAgICB0aGlzLnZlcnRpY2VzID0gdmVydGljZXM7XHJcbiAgICB0aGlzLmxpbmVQcm9wZXJ0aWVzID0gbGluZVByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgKmdldFZlcnRpY2VzSXRlcmF0b3IoKSB7XHJcbiAgICBjb25zdCB2ZXJ0aWNlc0NvdW50ID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRpY2VzQ291bnQ7IGkgKz0gMSkge1xyXG4gICAgICB5aWVsZCB0aGlzLnZlcnRpY2VzW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNsb3NlZCAmJiB2ZXJ0aWNlc0NvdW50ID4gMCkge1xyXG4gICAgICB5aWVsZCB0aGlzLnZlcnRpY2VzWzBdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljICpnZXRMaW5lSXRlcmF0b3IoKSB7XHJcbiAgICBsZXQgcHJldmlvdXNQb2ludDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHRoaXMuZ2V0VmVydGljZXNJdGVyYXRvcigpKSB7XHJcbiAgICAgIGlmICghcHJldmlvdXNQb2ludCkge1xyXG4gICAgICAgIHByZXZpb3VzUG9pbnQgPSBwb2ludDtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgeWllbGQgbmV3IExpbmUocHJldmlvdXNQb2ludCwgcG9pbnQpO1xyXG4gICAgICBwcmV2aW91c1BvaW50ID0gcG9pbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3RhcnRpbmdQb2ludCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZlcnRpY2VzWzBdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZlcnRpY2VzQ291bnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGluZVByb3BlcnRpZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5saW5lUHJvcGVydGllcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaXRUZXN0KHBvaW50OiBQb2ludCk6IEhpdFRlc3RSZXN1bHQgfCBudWxsIHtcclxuICAgIGZvciAoY29uc3QgbGluZSBvZiB0aGlzLmdldExpbmVJdGVyYXRvcigpKSB7XHJcbiAgICAgIGlmIChsaW5lLmRpc3RhbmNlVG9Qb2ludChwb2ludCkgPD0gY29uZmlndXJhdGlvbi5oaXRUb2xlcmFuY2UpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEhpdFRlc3RSZXN1bHQobGluZSwgdGhpcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRWZXJ0ZXgoaW5kZXg6IG51bWJlcik6IFBvaW50IHtcclxuICAgIHJldHVybiB0aGlzLnZlcnRpY2VzW2luZGV4XTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRWZXJ0aWNlcygpOiBQb2ludFtdIHtcclxuICAgIHJldHVybiB0aGlzLnZlcnRpY2VzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZFZlcnRleChwb2ludDogUG9pbnQpIHtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChwb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlVmVydGV4KHBvaW50OiBQb2ludCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbmRQb2ludEluZGV4KHBvaW50KTtcclxuXHJcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgIHRoaXMudmVydGljZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnNlcnRWZXJ0ZXgocG9pbnQ6IFBvaW50LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnZlcnRpY2VzLnNwbGljZShpbmRleCwgMCwgcG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb25lKCk6IFBhdGgge1xyXG4gICAgY29uc3QgdmVydGljZXMgPSBbLi4udGhpcy5nZXRWZXJ0aWNlcygpLm1hcChwb2ludCA9PiBwb2ludC5jbG9uZSgpKV07XHJcbiAgICBjb25zdCBsaW5lUHJvcGVydGllcyA9IHRoaXMubGluZVByb3BlcnRpZXMuY2xvbmUoKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBhdGgodmVydGljZXMsIGxpbmVQcm9wZXJ0aWVzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kUG9pbnRJbmRleChwb2ludDogUG9pbnQpIHtcclxuICAgIHJldHVybiB0aGlzLnZlcnRpY2VzLmluZGV4T2YocG9pbnQpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vUGF0aC50cyIsImltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29tbW9uL0NvbG9yJztcclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnY29tbW9uL0NPTE9SUyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZVByb3BlcnRpZXMge1xyXG4gIHB1YmxpYyBjb2xvcjogQ29sb3I7XHJcbiAgcHVibGljIHRoaWNrbmVzczogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb2xvcjogQ29sb3IsIHRoaWNrbmVzczogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGVmYXVsdCgpOiBMaW5lUHJvcGVydGllcyB7XHJcbiAgICByZXR1cm4gbmV3IExpbmVQcm9wZXJ0aWVzKENPTE9SUy5CTEFDSywgMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvbmUoKTogTGluZVByb3BlcnRpZXMge1xyXG4gICAgcmV0dXJuIG5ldyBMaW5lUHJvcGVydGllcyh0aGlzLmNvbG9yLCB0aGlzLnRoaWNrbmVzcyk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9MaW5lUHJvcGVydGllcy50cyIsImltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuXHJcbmNvbnN0IG1heERldmlhdGlvbiA9IGNvbmZpZ3VyYXRpb24ubGluZURldmlhdGlvbkFsbG93YW5jZUluRGVncmVlcztcclxuXHJcbmNvbnN0IGFsbG93ZWREZWdyZWVSYW5nZXMgPSBbXHJcbiAgWzAsIG1heERldmlhdGlvbl0sXHJcbiAgWzE4MCAtIG1heERldmlhdGlvbiwgMTgwICsgbWF4RGV2aWF0aW9uXSxcclxuICBbMzYwIC0gbWF4RGV2aWF0aW9uLCAzNjBdXHJcbl07XHJcblxyXG5leHBvcnQgY2xhc3MgSG9yaXpvbnRhbExpbmVDb25kaXRpb24gZXh0ZW5kcyBMaW5lQ29uZGl0aW9uIHtcclxuICBwdWJsaWMgaXNNZXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5saW5lLnAxLnkgPT09IHRoaXMubGluZS5wMi55O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpeChsb2NrZWRQb2ludDogUG9pbnQpIHtcclxuICAgIGlmIChsb2NrZWRQb2ludCA9PT0gdGhpcy5saW5lLnAxKSB7XHJcbiAgICAgIHRoaXMuYWxpZ25Qb2ludHNIb3Jpem9udGFsbHkodGhpcy5saW5lLnAyLCB0aGlzLmxpbmUucDEpO1xyXG4gICAgfSBlbHNlIGlmIChsb2NrZWRQb2ludCA9PT0gdGhpcy5saW5lLnAyKSB7XHJcbiAgICAgIHRoaXMuYWxpZ25Qb2ludHNIb3Jpem9udGFsbHkodGhpcy5saW5lLnAxLCB0aGlzLmxpbmUucDIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMb2NrZWQgcG9pbnQgZG9lcyBub3QgbWF0Y2ggZWl0aGVyIHBvaW50IG9uIHRoZSBsaW5lJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHVwbGljYXRlRm9yTmV3TGluZShsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICByZXR1cm4gbmV3IEhvcml6b250YWxMaW5lQ29uZGl0aW9uKGxpbmUsIHBvbHlnb24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZlcmlmeUNhbkJlQXBwbGllZCgpIHtcclxuICAgIGNvbnN0IGFuZ2xlID0gUG9pbnQuZ2V0QW5nbGUodGhpcy5saW5lLnAxLCB0aGlzLmxpbmUucDIpO1xyXG5cclxuICAgIGlmICghYWxsb3dlZERlZ3JlZVJhbmdlcy5zb21lKGRlZ3JlZVJhbmdlID0+IGFuZ2xlID49IGRlZ3JlZVJhbmdlWzBdICYmIGFuZ2xlIDw9IGRlZ3JlZVJhbmdlWzFdKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgaXMgbm90IGhvcml6b250YWwgZW5vdWdoJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFiZWwoKSB7XHJcbiAgICByZXR1cm4gJy0nO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhbGlnblBvaW50c0hvcml6b250YWxseShzdWJqZWN0OiBQb2ludCwgZGVzdGluYXRpb246IFBvaW50KSB7XHJcbiAgICBzdWJqZWN0Lm1vdmVUbyhuZXcgUG9pbnQoc3ViamVjdC54LCBkZXN0aW5hdGlvbi55KSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb24udHMiLCJpbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcblxyXG5jb25zdCBtYXhEZXZpYXRpb24gPSBjb25maWd1cmF0aW9uLmxpbmVEZXZpYXRpb25BbGxvd2FuY2VJbkRlZ3JlZXM7XHJcblxyXG5jb25zdCBhbGxvd2VkRGVncmVlUmFuZ2VzID0gW1xyXG4gIFs5MCAtIG1heERldmlhdGlvbiwgOTAgKyBtYXhEZXZpYXRpb25dLFxyXG4gIFsyNzAgLSBtYXhEZXZpYXRpb24sIDI3MCArIG1heERldmlhdGlvbl1cclxuXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbExpbmVDb25kaXRpb24gZXh0ZW5kcyBMaW5lQ29uZGl0aW9uIHtcclxuICBwdWJsaWMgaXNNZXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5saW5lLnAxLnggPT09IHRoaXMubGluZS5wMi54O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpeChsb2NrZWRQb2ludDogUG9pbnQpIHtcclxuICAgIGlmIChsb2NrZWRQb2ludCA9PT0gdGhpcy5saW5lLnAxKSB7XHJcbiAgICAgIHRoaXMuYWxpZ25Qb2ludHNWZXJ0aWNhbGx5KHRoaXMubGluZS5wMiwgdGhpcy5saW5lLnAxKTtcclxuICAgIH0gZWxzZSBpZiAobG9ja2VkUG9pbnQgPT09IHRoaXMubGluZS5wMikge1xyXG4gICAgICB0aGlzLmFsaWduUG9pbnRzVmVydGljYWxseSh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvY2tlZCBwb2ludCBkb2VzIG5vdCBtYXRjaCBlaXRoZXIgcG9pbnQgb24gdGhlIGxpbmUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkdXBsaWNhdGVGb3JOZXdMaW5lKGxpbmU6IExpbmUsIHBvbHlnb246IFBvbHlnb24pIHtcclxuICAgIHJldHVybiBuZXcgVmVydGljYWxMaW5lQ29uZGl0aW9uKGxpbmUsIHBvbHlnb24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZlcmlmeUNhbkJlQXBwbGllZCgpIHtcclxuICAgIGNvbnN0IGFuZ2xlID0gUG9pbnQuZ2V0QW5nbGUodGhpcy5saW5lLnAxLCB0aGlzLmxpbmUucDIpO1xyXG5cclxuICAgIGlmICghYWxsb3dlZERlZ3JlZVJhbmdlcy5zb21lKGRlZ3JlZVJhbmdlID0+IGFuZ2xlID49IGRlZ3JlZVJhbmdlWzBdICYmIGFuZ2xlIDw9IGRlZ3JlZVJhbmdlWzFdKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgaXMgbm90IHZlcnRpY2FsIGVub3VnaCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExhYmVsKCkge1xyXG4gICAgcmV0dXJuICd8JztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWxpZ25Qb2ludHNWZXJ0aWNhbGx5KHN1YmplY3Q6IFBvaW50LCBkZXN0aW5hdGlvbjogUG9pbnQpIHtcclxuICAgIHN1YmplY3QubW92ZVRvKG5ldyBQb2ludChkZXN0aW5hdGlvbi54LCBzdWJqZWN0LnkpKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb24udHMiLCJpbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5cclxuZXhwb3J0IGVudW0gRml4aW5nRGlyZWN0aW9uIHtcclxuICBOb3JtYWwsXHJcbiAgUmV2ZXJzZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uRml4ZXIge1xyXG4gIHB1YmxpYyBkaXJlY3Rpb246IEZpeGluZ0RpcmVjdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBwb2x5Z29uOiBQb2x5Z29uO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhcnRpbmdQb2ludDogUG9pbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBhZGRpdGlvbmFsTGluZUNvbmRpdGlvbnM6IExpbmVDb25kaXRpb25bXTtcclxuXHJcbiAgcHJpdmF0ZSBfZml4U3VjY2Vzc2Z1bD86IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcG9seWdvbjogUG9seWdvbixcclxuICAgIHN0YXJ0aW5nUG9pbnQ6IFBvaW50LFxyXG4gICAgYWRkaXRpb25hbExpbmVDb25kaXRpb25zOiBMaW5lQ29uZGl0aW9uW10gPSBbXSxcclxuICAgIGRpcmVjdGlvbjogRml4aW5nRGlyZWN0aW9uID0gRml4aW5nRGlyZWN0aW9uLk5vcm1hbFxyXG4gICkge1xyXG4gICAgdGhpcy5wb2x5Z29uID0gcG9seWdvbjtcclxuICAgIHRoaXMuc3RhcnRpbmdQb2ludCA9IHN0YXJ0aW5nUG9pbnQ7XHJcbiAgICB0aGlzLmFkZGl0aW9uYWxMaW5lQ29uZGl0aW9ucyA9IGFkZGl0aW9uYWxMaW5lQ29uZGl0aW9ucztcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmaXhTdWNjZXNzZnVsKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RyeUZpeCBuZWVkcyB0byBiZSBjYWxsZWQgZmlyc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZml4U3VjY2Vzc2Z1bDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cnlGaXgoKSB7XHJcbiAgICBpZiAodGhpcy5fZml4U3VjY2Vzc2Z1bCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZGl0aW9uRml4ZXIgbmVlZHMgdG8gYmUgcmVzZXQgYmVmb3JlIGZpeGluZyBhZ2FpbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9seWdvbi5nZXRWZXJ0aWNlcygpO1xyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbnMgPSBbLi4udGhpcy5wb2x5Z29uLmdldExpbmVDb25kaXRpb25zKCksIC4uLnRoaXMuYWRkaXRpb25hbExpbmVDb25kaXRpb25zXTtcclxuICAgIGNvbnN0IHN0YXJ0aW5nUG9pbnRJbmRleCA9IHRoaXMucG9seWdvbi5maW5kUG9pbnRJbmRleCh0aGlzLnN0YXJ0aW5nUG9pbnQpO1xyXG4gICAgbGV0IGxvY2tlZFBvaW50SW5kZXggPSBzdGFydGluZ1BvaW50SW5kZXg7XHJcbiAgICBsZXQgY3VycmVudFBvaW50SW5kZXggPSB0aGlzLmdldE5leHRQb2ludEluZGV4KGxvY2tlZFBvaW50SW5kZXgpO1xyXG5cclxuICAgIHdoaWxlIChjdXJyZW50UG9pbnRJbmRleCAhPT0gc3RhcnRpbmdQb2ludEluZGV4KSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRMaW5lID0gbmV3IExpbmUocG9pbnRzW2xvY2tlZFBvaW50SW5kZXhdLCBwb2ludHNbY3VycmVudFBvaW50SW5kZXhdKTtcclxuICAgICAgY29uc3QgY3VycmVudExpbmVDb25kaXRpb25zID0gbGluZUNvbmRpdGlvbnMuZmlsdGVyKGxpbmVDb25kaXRpb24gPT5cclxuICAgICAgICBsaW5lQ29uZGl0aW9uLmxpbmUuZXF1YWxzKGN1cnJlbnRMaW5lKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgY3VycmVudExpbmVDb25kaXRpb25zXHJcbiAgICAgICAgLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+ICFsaW5lQ29uZGl0aW9uLmlzTWV0KCkpXHJcbiAgICAgICAgLmZvckVhY2gobGluZUNvbmRpdGlvbiA9PiBsaW5lQ29uZGl0aW9uLmZpeChwb2ludHNbbG9ja2VkUG9pbnRJbmRleF0pKTtcclxuXHJcbiAgICAgIGxvY2tlZFBvaW50SW5kZXggPSBjdXJyZW50UG9pbnRJbmRleDtcclxuICAgICAgY3VycmVudFBvaW50SW5kZXggPSB0aGlzLmdldE5leHRQb2ludEluZGV4KGN1cnJlbnRQb2ludEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9maXhTdWNjZXNzZnVsID0gbGluZUNvbmRpdGlvbnMuZXZlcnkobGluZUNvbmRpdGlvbiA9PiBsaW5lQ29uZGl0aW9uLmlzTWV0KCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgdGhpcy5fZml4U3VjY2Vzc2Z1bCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TmV4dFBvaW50SW5kZXgoY3VycmVudFBvaW50SW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBGaXhpbmdEaXJlY3Rpb24uUmV2ZXJzZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wb2x5Z29uLmdldFByZXZpb3VzUG9pbnRJbmRleChjdXJyZW50UG9pbnRJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucG9seWdvbi5nZXROZXh0UG9pbnRJbmRleChjdXJyZW50UG9pbnRJbmRleCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbmRpdGlvbnMvQ29uZGl0aW9uRml4ZXIudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaW5pc2hQb2ludERyYWdFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZDogUGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIHB1YmxpYyByZWFkb25seSBldmVudFR5cGUgPSBGaW5pc2hQb2ludERyYWdFdmVudC5ldmVudFR5cGU7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocGF0aFBvaW50Q29tcG9uZW50OiBQYXRoUG9pbnRDb21wb25lbnQpIHtcclxuICAgIHRoaXMucGF5bG9hZCA9IHBhdGhQb2ludENvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnRmluaXNoUG9pbnREcmFnRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudC50cyIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5pbXBvcnQgeyBQYXRoUG9pbnRDb21wb25lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnREcmFnRXZlbnQgaW1wbGVtZW50cyBBcHBFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQ6IHtcclxuICAgIGNvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50LFxyXG4gICAgbmV3UG9zaXRpb246IFBvaW50XHJcbiAgfTtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gUG9pbnREcmFnRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGhQb2ludENvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50LCBuZXdQb3NpdGlvbjogUG9pbnQpIHtcclxuICAgIHRoaXMucGF5bG9hZCA9IHtcclxuICAgICAgY29tcG9uZW50OiBwYXRoUG9pbnRDb21wb25lbnQsXHJcbiAgICAgIG5ld1Bvc2l0aW9uXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdQb2ludERyYWdFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9wb2ludC1kcmFnL1BvaW50RHJhZ0V2ZW50LnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5pbXBvcnQgeyBQYXRoUG9pbnRDb21wb25lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhcnRQb2ludERyYWdFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZDogUGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIHB1YmxpYyByZWFkb25seSBldmVudFR5cGUgPSBTdGFydFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgaGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXRoUG9pbnRDb21wb25lbnQ6IFBhdGhQb2ludENvbXBvbmVudCkge1xyXG4gICAgdGhpcy5wYXlsb2FkID0gcGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdTdGFydFBvaW50RHJhZ0V2ZW50JztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL3BvaW50LWRyYWcvU3RhcnRQb2ludERyYWdFdmVudC50cyIsImltcG9ydCAndWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nLnNjc3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluc3RydWN0aW9uc0RpYWxvZyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIG92ZXJsYXk6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgZGlhbG9nQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIGRpc21pc3NCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5jbGFzc05hbWUgPSAnaW5zdHJ1Y3Rpb25zLWRpYWxvZy13cmFwcGVyJztcclxuXHJcbiAgICB0aGlzLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMub3ZlcmxheS5jbGFzc05hbWUgPSAnaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fb3ZlcmxheSc7XHJcblxyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtZGlhbG9nJztcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdJbnN0cnVjdGlvbnMnO1xyXG4gICAgdGl0bGUuY2xhc3NOYW1lID0gJ2luc3RydWN0aW9ucy1kaWFsb2dfX3RpdGxlJztcclxuICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVVzYWdlTGlzdCgpKTtcclxuXHJcbiAgICB0aGlzLmRpc21pc3NCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuZGlzbWlzc0J1dHRvbi50ZXh0Q29udGVudCA9ICdEaXNtaXNzJztcclxuICAgIHRoaXMuZGlzbWlzc0J1dHRvbi5jbGFzc05hbWUgPSAnaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fZGlzbWlzcy1idXR0b24nO1xyXG5cclxuICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlzbWlzc0J1dHRvbik7XHJcblxyXG4gICAgdGhpcy5kaXNtaXNzID0gdGhpcy5kaXNtaXNzLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nQ29udGFpbmVyKTtcclxuICAgIHRoaXMuZGlzbWlzc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGlzbWlzcyk7XHJcbiAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRpc21pc3MpO1xyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdpbnN0cnVjdGlvbnMtZGlhbG9nX19vdmVybGF5LS1hY3RpdmUnKTtcclxuICAgICAgdGhpcy5kaWFsb2dDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5zdHJ1Y3Rpb25zLWRpYWxvZy0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5vdmVybGF5KTtcclxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5kaWFsb2dDb250YWluZXIpO1xyXG4gICAgdGhpcy5kaXNtaXNzQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kaXNtaXNzKTtcclxuICAgIHRoaXMub3ZlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGlzbWlzcyk7XHJcblxyXG4gICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2luc3RydWN0aW9ucy1kaWFsb2dfX292ZXJsYXktLWFjdGl2ZScpO1xyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW5zdHJ1Y3Rpb25zLWRpYWxvZy0tYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc21pc3MoKSB7XHJcbiAgICB0aGlzLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVVc2FnZUxpc3QoKSB7XHJcbiAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuXHJcbiAgICBjb25zdCB1c2FnZSA9IFtcclxuICAgICAgJ0NsaWNrIG9uIHRoZSBmcmVlIHNwYWNlIGluIHRoZSBjYW52YXMgdG8gc3RhcnQgY3JlYXRpbmcgdmVydGljZXMnLFxyXG4gICAgICAnQ2xpY2sgb24gdGhlIGluaXRpYWwgdmVydGV4IHRvIGNsb3NlIHRoZSBwYXRoIGludG8gYSBwb2x5Z29uJyxcclxuICAgICAgJ0FsdGVybmF0aXZlbHksIHlvdSBtYXkgcHJlc3MgRXNjYXBlIHRvIGNhbmNlbCBhZGRpbmcgYSBuZXcgcGF0aCcsXHJcbiAgICAgICdDbGljayBhbmQgZHJhZyB0aGUgdmVydGV4IHRvIG1vdmUgaXQnLFxyXG4gICAgICAnRG91YmxlIGNsaWNrIG9uIGFuIGVkZ2UgdG8gYWRkIGEgdmVydGV4IGluIHRoZSBtaWRkbGUgb2YgaXQnLFxyXG4gICAgICAnRG91YmxlIGNsaWNrIG9uIGEgdmVydGV4IHRvIHJlbW92ZSBpdCcsXHJcbiAgICAgICdDbGljayBhbiBlZGdlIHRvIGFkZCBvciByZW1vdmUgYW4gZWRnZSByZWxhdGlvbidcclxuICAgIF07XHJcblxyXG4gICAgdXNhZ2UubWFwKHVzYWdlSXRlbVRleHQgPT4gdGhpcy5jcmVhdGVVc2FnZUxpc3RJdGVtKHVzYWdlSXRlbVRleHQpKVxyXG4gICAgICAuZm9yRWFjaCh1c2FnZUxpc3RJdGVtID0+IGxpc3QuYXBwZW5kQ2hpbGQodXNhZ2VMaXN0SXRlbSkpO1xyXG5cclxuICAgIHJldHVybiBsaXN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVVc2FnZUxpc3RJdGVtKHRleHRDb250ZW50OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgaXRlbS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG5cclxuICAgIHJldHVybiBpdGVtO1xyXG4gIH1cclxufVxyXG5cclxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLWluc3RydWN0aW9ucy1kaWFsb2cnLCBJbnN0cnVjdGlvbnNEaWFsb2cpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cudHMiLCJpbXBvcnQgJ2luZGV4LnNjc3MnO1xyXG5pbXBvcnQgJ25vcm1hbGl6ZS5jc3MnO1xyXG5cclxuaW1wb3J0ICdAd2ViY29tcG9uZW50cy93ZWJjb21wb25lbnRzanMvd2ViY29tcG9uZW50cy1oaS1zZC1jZSc7XHJcblxyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gJ0FwcGxpY2F0aW9uJztcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYm9vdHN0cmFwLCBmYWxzZSk7XHJcblxyXG5mdW5jdGlvbiBib290c3RyYXAoKTogdm9pZCB7XHJcbiAgY29uc3QgY2FudmFzSWQgPSAnbWFpbi1jYW52YXMnO1xyXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcclxuICBpZiAoIWNhbnZhcykge1xyXG4gICAgY29uc29sZS5lcnJvcignQ2FudmFzIHdpdGggaWQnLCBjYW52YXNJZCwgJ25vdCBmb3VuZCcpO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFwcGxpY2F0aW9uID0gbmV3IEFwcGxpY2F0aW9uKDxIVE1MQ2FudmFzRWxlbWVudD5jYW52YXMpO1xyXG4gIGFwcGxpY2F0aW9uLmluaXQoKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9pbmRleC50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9pbmRleC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLCBib2R5IHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7IH1cXG5cXG4ubWFpbi1jYW52YXMge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7IH1cXG5cXG4ubWFpbi1jb250YWluZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDAgMWVtOyB9XFxuXFxuLmNhbnZhcy13cmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmFwcGxpY2F0aW9uLXVpIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XFxuICAuYXBwbGljYXRpb24tdWkgKiB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7IH1cXG5cXG4uYXBwLWhlYWRlciB7XFxuICBtYXJnaW4tYm90dG9tOiAxZW07XFxuICBtYXJnaW4tbGVmdDogMWVtOyB9XFxuXFxuLmFwcC1uYW1lIHtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5mb290ZXIge1xcbiAgbWFyZ2luOiAxZW0gMWVtOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2luZGV4LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKCl7LypcblxuIENvcHlyaWdodCAoYykgMjAxNiBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuXG5Db3B5cmlnaHQgKGMpIDIwMTYgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbnN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG5cbkNvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcblxuIENvcHlyaWdodCAoYykgMjAxNCBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbid1c2Ugc3RyaWN0Jzt2YXIgSj1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3c9PT10aGlzP3RoaXM6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbCYmbnVsbCE9Z2xvYmFsP2dsb2JhbDp0aGlzLEFhPVwiZnVuY3Rpb25cIj09dHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzP09iamVjdC5kZWZpbmVQcm9wZXJ0eTpmdW5jdGlvbihnLHEsTil7ZyE9QXJyYXkucHJvdG90eXBlJiZnIT1PYmplY3QucHJvdG90eXBlJiYoZ1txXT1OLnZhbHVlKX07ZnVuY3Rpb24gc2IoKXtzYj1mdW5jdGlvbigpe307Si5TeW1ib2x8fChKLlN5bWJvbD10Yil9dmFyIHRiPWZ1bmN0aW9uKCl7dmFyIGc9MDtyZXR1cm4gZnVuY3Rpb24ocSl7cmV0dXJuXCJqc2NvbXBfc3ltYm9sX1wiKyhxfHxcIlwiKStnKyt9fSgpO1xuZnVuY3Rpb24gZGQoKXtzYigpO3ZhciBnPUouU3ltYm9sLml0ZXJhdG9yO2d8fChnPUouU3ltYm9sLml0ZXJhdG9yPUouU3ltYm9sKFwiaXRlcmF0b3JcIikpO1wiZnVuY3Rpb25cIiE9dHlwZW9mIEFycmF5LnByb3RvdHlwZVtnXSYmQWEoQXJyYXkucHJvdG90eXBlLGcse2NvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBlZCh0aGlzKX19KTtkZD1mdW5jdGlvbigpe319ZnVuY3Rpb24gZWQoZyl7dmFyIHE9MDtyZXR1cm4gZmQoZnVuY3Rpb24oKXtyZXR1cm4gcTxnLmxlbmd0aD97ZG9uZTohMSx2YWx1ZTpnW3ErK119Ontkb25lOiEwfX0pfWZ1bmN0aW9uIGZkKGcpe2RkKCk7Zz17bmV4dDpnfTtnW0ouU3ltYm9sLml0ZXJhdG9yXT1mdW5jdGlvbigpe3JldHVybiB0aGlzfTtyZXR1cm4gZ31mdW5jdGlvbiBnZChnKXtkZCgpO3ZhciBxPWdbU3ltYm9sLml0ZXJhdG9yXTtyZXR1cm4gcT9xLmNhbGwoZyk6ZWQoZyl9XG5mdW5jdGlvbiBoZChnKXtmb3IodmFyIHEsTj1bXTshKHE9Zy5uZXh0KCkpLmRvbmU7KU4ucHVzaChxLnZhbHVlKTtyZXR1cm4gTn1cbihmdW5jdGlvbigpe2Z1bmN0aW9uIGcoKXt2YXIgYT10aGlzO3RoaXMubT17fTt0aGlzLmc9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O3ZhciBiPW5ldyBCYTtiLnJ1bGVzPVtdO3RoaXMuaD12LnNldCh0aGlzLmcsbmV3IHYoYikpO3RoaXMuaT0hMTt0aGlzLmI9dGhpcy5hPW51bGw7dWIoZnVuY3Rpb24oKXthLmMoKX0pfWZ1bmN0aW9uIHEoKXt0aGlzLmN1c3RvbVN0eWxlcz1bXTt0aGlzLmVucXVldWVkPSExfWZ1bmN0aW9uIE4oKXt9ZnVuY3Rpb24gaGEoYSl7dGhpcy5jYWNoZT17fTt0aGlzLmM9dm9pZCAwPT09YT8xMDA6YX1mdW5jdGlvbiBuKCl7fWZ1bmN0aW9uIHYoYSxiLGMsZCxlKXt0aGlzLkQ9YXx8bnVsbDt0aGlzLmI9Ynx8bnVsbDt0aGlzLmxhPWN8fFtdO3RoaXMuTj1udWxsO3RoaXMuVj1lfHxcIlwiO3RoaXMuYT10aGlzLkE9dGhpcy5KPW51bGx9ZnVuY3Rpb24gdSgpe31mdW5jdGlvbiBCYSgpe3RoaXMuZW5kPXRoaXMuc3RhcnQ9MDt0aGlzLnJ1bGVzPXRoaXMucGFyZW50PVxudGhpcy5wcmV2aW91cz1udWxsO3RoaXMuY3NzVGV4dD10aGlzLnBhcnNlZENzc1RleHQ9XCJcIjt0aGlzLmF0UnVsZT0hMTt0aGlzLnR5cGU9MDt0aGlzLnBhcnNlZFNlbGVjdG9yPXRoaXMuc2VsZWN0b3I9dGhpcy5rZXlmcmFtZXNOYW1lPVwiXCJ9ZnVuY3Rpb24gaWQoYSl7ZnVuY3Rpb24gYihiLGMpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShiLFwiaW5uZXJIVE1MXCIse2VudW1lcmFibGU6Yy5lbnVtZXJhYmxlLGNvbmZpZ3VyYWJsZTohMCxnZXQ6Yy5nZXQsc2V0OmZ1bmN0aW9uKGIpe3ZhciBkPXRoaXMsZT12b2lkIDA7dCh0aGlzKSYmKGU9W10sTyh0aGlzLGZ1bmN0aW9uKGEpe2EhPT1kJiZlLnB1c2goYSl9KSk7Yy5zZXQuY2FsbCh0aGlzLGIpO2lmKGUpZm9yKHZhciBmPTA7ZjxlLmxlbmd0aDtmKyspe3ZhciBrPWVbZl07MT09PWsuX19DRV9zdGF0ZSYmYS5kaXNjb25uZWN0ZWRDYWxsYmFjayhrKX10aGlzLm93bmVyRG9jdW1lbnQuX19DRV9oYXNSZWdpc3RyeT9hLmYodGhpcyk6YS5sKHRoaXMpO1xucmV0dXJuIGJ9fSl9ZnVuY3Rpb24gYyhiLGMpe3goYixcImluc2VydEFkamFjZW50RWxlbWVudFwiLGZ1bmN0aW9uKGIsZCl7dmFyIGU9dChkKTtiPWMuY2FsbCh0aGlzLGIsZCk7ZSYmYS5hKGQpO3QoYikmJmEuYihkKTtyZXR1cm4gYn0pfXZiJiZ4KEVsZW1lbnQucHJvdG90eXBlLFwiYXR0YWNoU2hhZG93XCIsZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuX19DRV9zaGFkb3dSb290PWE9dmIuY2FsbCh0aGlzLGEpfSk7aWYoQ2EmJkNhLmdldCliKEVsZW1lbnQucHJvdG90eXBlLENhKTtlbHNlIGlmKERhJiZEYS5nZXQpYihIVE1MRWxlbWVudC5wcm90b3R5cGUsRGEpO2Vsc2V7dmFyIGQ9RWEuY2FsbChkb2N1bWVudCxcImRpdlwiKTthLnMoZnVuY3Rpb24oYSl7YihhLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gd2IuY2FsbCh0aGlzLCEwKS5pbm5lckhUTUx9LHNldDpmdW5jdGlvbihhKXt2YXIgYj1cInRlbXBsYXRlXCI9PT10aGlzLmxvY2FsTmFtZT9cbnRoaXMuY29udGVudDp0aGlzO2ZvcihkLmlubmVySFRNTD1hOzA8Yi5jaGlsZE5vZGVzLmxlbmd0aDspRmEuY2FsbChiLGIuY2hpbGROb2Rlc1swXSk7Zm9yKDswPGQuY2hpbGROb2Rlcy5sZW5ndGg7KWlhLmNhbGwoYixkLmNoaWxkTm9kZXNbMF0pfX0pfSl9eChFbGVtZW50LnByb3RvdHlwZSxcInNldEF0dHJpYnV0ZVwiLGZ1bmN0aW9uKGIsYyl7aWYoMSE9PXRoaXMuX19DRV9zdGF0ZSlyZXR1cm4geGIuY2FsbCh0aGlzLGIsYyk7dmFyIGQ9R2EuY2FsbCh0aGlzLGIpO3hiLmNhbGwodGhpcyxiLGMpO2M9R2EuY2FsbCh0aGlzLGIpO2EuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsYixkLGMsbnVsbCl9KTt4KEVsZW1lbnQucHJvdG90eXBlLFwic2V0QXR0cmlidXRlTlNcIixmdW5jdGlvbihiLGMsZCl7aWYoMSE9PXRoaXMuX19DRV9zdGF0ZSlyZXR1cm4geWIuY2FsbCh0aGlzLGIsYyxkKTt2YXIgZT1qYS5jYWxsKHRoaXMsYixjKTt5Yi5jYWxsKHRoaXMsYixjLGQpO2Q9amEuY2FsbCh0aGlzLFxuYixjKTthLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0aGlzLGMsZSxkLGIpfSk7eChFbGVtZW50LnByb3RvdHlwZSxcInJlbW92ZUF0dHJpYnV0ZVwiLGZ1bmN0aW9uKGIpe2lmKDEhPT10aGlzLl9fQ0Vfc3RhdGUpcmV0dXJuIHpiLmNhbGwodGhpcyxiKTt2YXIgYz1HYS5jYWxsKHRoaXMsYik7emIuY2FsbCh0aGlzLGIpO251bGwhPT1jJiZhLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0aGlzLGIsYyxudWxsLG51bGwpfSk7eChFbGVtZW50LnByb3RvdHlwZSxcInJlbW92ZUF0dHJpYnV0ZU5TXCIsZnVuY3Rpb24oYixjKXtpZigxIT09dGhpcy5fX0NFX3N0YXRlKXJldHVybiBBYi5jYWxsKHRoaXMsYixjKTt2YXIgZD1qYS5jYWxsKHRoaXMsYixjKTtBYi5jYWxsKHRoaXMsYixjKTt2YXIgZT1qYS5jYWxsKHRoaXMsYixjKTtkIT09ZSYmYS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodGhpcyxjLGQsZSxiKX0pO0JiP2MoSFRNTEVsZW1lbnQucHJvdG90eXBlLEJiKTpDYj9jKEVsZW1lbnQucHJvdG90eXBlLFxuQ2IpOmNvbnNvbGUud2FybihcIkN1c3RvbSBFbGVtZW50czogYEVsZW1lbnQjaW5zZXJ0QWRqYWNlbnRFbGVtZW50YCB3YXMgbm90IHBhdGNoZWQuXCIpO0hhKGEsRWxlbWVudC5wcm90b3R5cGUse1o6amQsYXBwZW5kOmtkfSk7bGQoYSx7amE6bWQsV2E6bmQscmVwbGFjZVdpdGg6b2QscmVtb3ZlOnBkfSl9ZnVuY3Rpb24gbGQoYSxiKXt2YXIgYz1FbGVtZW50LnByb3RvdHlwZTtmdW5jdGlvbiBkKGIpe3JldHVybiBmdW5jdGlvbihjKXtmb3IodmFyIGQ9W10sZT0wO2U8YXJndW1lbnRzLmxlbmd0aDsrK2UpZFtlLTBdPWFyZ3VtZW50c1tlXTtlPVtdO2Zvcih2YXIgZj1bXSxnPTA7ZzxkLmxlbmd0aDtnKyspe3ZhciBtPWRbZ107bSBpbnN0YW5jZW9mIEVsZW1lbnQmJnQobSkmJmYucHVzaChtKTtpZihtIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClmb3IobT1tLmZpcnN0Q2hpbGQ7bTttPW0ubmV4dFNpYmxpbmcpZS5wdXNoKG0pO2Vsc2UgZS5wdXNoKG0pfWIuYXBwbHkodGhpcyxcbmQpO2ZvcihkPTA7ZDxmLmxlbmd0aDtkKyspYS5hKGZbZF0pO2lmKHQodGhpcykpZm9yKGQ9MDtkPGUubGVuZ3RoO2QrKylmPWVbZF0sZiBpbnN0YW5jZW9mIEVsZW1lbnQmJmEuYihmKX19dm9pZCAwIT09Yi5qYSYmKGMuYmVmb3JlPWQoYi5qYSkpO3ZvaWQgMCE9PWIuamEmJihjLmFmdGVyPWQoYi5XYSkpO3ZvaWQgMCE9PWIucmVwbGFjZVdpdGgmJngoYyxcInJlcGxhY2VXaXRoXCIsZnVuY3Rpb24oYyl7Zm9yKHZhciBkPVtdLGU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7KytlKWRbZS0wXT1hcmd1bWVudHNbZV07ZT1bXTtmb3IodmFyIGg9W10sdz0wO3c8ZC5sZW5ndGg7dysrKXt2YXIgZz1kW3ddO2cgaW5zdGFuY2VvZiBFbGVtZW50JiZ0KGcpJiZoLnB1c2goZyk7aWYoZyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpZm9yKGc9Zy5maXJzdENoaWxkO2c7Zz1nLm5leHRTaWJsaW5nKWUucHVzaChnKTtlbHNlIGUucHVzaChnKX13PXQodGhpcyk7Yi5yZXBsYWNlV2l0aC5hcHBseSh0aGlzLFxuZCk7Zm9yKGQ9MDtkPGgubGVuZ3RoO2QrKylhLmEoaFtkXSk7aWYodylmb3IoYS5hKHRoaXMpLGQ9MDtkPGUubGVuZ3RoO2QrKyloPWVbZF0saCBpbnN0YW5jZW9mIEVsZW1lbnQmJmEuYihoKX0pO3ZvaWQgMCE9PWIucmVtb3ZlJiZ4KGMsXCJyZW1vdmVcIixmdW5jdGlvbigpe3ZhciBjPXQodGhpcyk7Yi5yZW1vdmUuY2FsbCh0aGlzKTtjJiZhLmEodGhpcyl9KX1mdW5jdGlvbiBxZChhKXtmdW5jdGlvbiBiKGIsZCl7T2JqZWN0LmRlZmluZVByb3BlcnR5KGIsXCJ0ZXh0Q29udGVudFwiLHtlbnVtZXJhYmxlOmQuZW51bWVyYWJsZSxjb25maWd1cmFibGU6ITAsZ2V0OmQuZ2V0LHNldDpmdW5jdGlvbihiKXtpZih0aGlzLm5vZGVUeXBlPT09Tm9kZS5URVhUX05PREUpZC5zZXQuY2FsbCh0aGlzLGIpO2Vsc2V7dmFyIGM9dm9pZCAwO2lmKHRoaXMuZmlyc3RDaGlsZCl7dmFyIGU9dGhpcy5jaGlsZE5vZGVzLGg9ZS5sZW5ndGg7aWYoMDxoJiZ0KHRoaXMpKXtjPUFycmF5KGgpO2Zvcih2YXIgdz1cbjA7dzxoO3crKyljW3ddPWVbd119fWQuc2V0LmNhbGwodGhpcyxiKTtpZihjKWZvcihiPTA7YjxjLmxlbmd0aDtiKyspYS5hKGNbYl0pfX19KX14KE5vZGUucHJvdG90eXBlLFwiaW5zZXJ0QmVmb3JlXCIsZnVuY3Rpb24oYixkKXtpZihiIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGIuY2hpbGROb2Rlcyk7Yj1EYi5jYWxsKHRoaXMsYixkKTtpZih0KHRoaXMpKWZvcihkPTA7ZDxjLmxlbmd0aDtkKyspYS5iKGNbZF0pO3JldHVybiBifWM9dChiKTtkPURiLmNhbGwodGhpcyxiLGQpO2MmJmEuYShiKTt0KHRoaXMpJiZhLmIoYik7cmV0dXJuIGR9KTt4KE5vZGUucHJvdG90eXBlLFwiYXBwZW5kQ2hpbGRcIixmdW5jdGlvbihiKXtpZihiIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGIuY2hpbGROb2Rlcyk7Yj1pYS5jYWxsKHRoaXMsYik7aWYodCh0aGlzKSlmb3IodmFyIGU9XG4wO2U8Yy5sZW5ndGg7ZSsrKWEuYihjW2VdKTtyZXR1cm4gYn1jPXQoYik7ZT1pYS5jYWxsKHRoaXMsYik7YyYmYS5hKGIpO3QodGhpcykmJmEuYihiKTtyZXR1cm4gZX0pO3goTm9kZS5wcm90b3R5cGUsXCJjbG9uZU5vZGVcIixmdW5jdGlvbihiKXtiPXdiLmNhbGwodGhpcyxiKTt0aGlzLm93bmVyRG9jdW1lbnQuX19DRV9oYXNSZWdpc3RyeT9hLmYoYik6YS5sKGIpO3JldHVybiBifSk7eChOb2RlLnByb3RvdHlwZSxcInJlbW92ZUNoaWxkXCIsZnVuY3Rpb24oYil7dmFyIGM9dChiKSxlPUZhLmNhbGwodGhpcyxiKTtjJiZhLmEoYik7cmV0dXJuIGV9KTt4KE5vZGUucHJvdG90eXBlLFwicmVwbGFjZUNoaWxkXCIsZnVuY3Rpb24oYixkKXtpZihiIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGIuY2hpbGROb2Rlcyk7Yj1FYi5jYWxsKHRoaXMsYixkKTtpZih0KHRoaXMpKWZvcihhLmEoZCksZD0wO2Q8Yy5sZW5ndGg7ZCsrKWEuYihjW2RdKTtcbnJldHVybiBifWM9dChiKTt2YXIgZj1FYi5jYWxsKHRoaXMsYixkKSxrPXQodGhpcyk7ayYmYS5hKGQpO2MmJmEuYShiKTtrJiZhLmIoYik7cmV0dXJuIGZ9KTtJYSYmSWEuZ2V0P2IoTm9kZS5wcm90b3R5cGUsSWEpOmEucyhmdW5jdGlvbihhKXtiKGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxiPTA7Yjx0aGlzLmNoaWxkTm9kZXMubGVuZ3RoO2IrKylhLnB1c2godGhpcy5jaGlsZE5vZGVzW2JdLnRleHRDb250ZW50KTtyZXR1cm4gYS5qb2luKFwiXCIpfSxzZXQ6ZnVuY3Rpb24oYSl7Zm9yKDt0aGlzLmZpcnN0Q2hpbGQ7KUZhLmNhbGwodGhpcyx0aGlzLmZpcnN0Q2hpbGQpO2lhLmNhbGwodGhpcyxkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhKSl9fSl9KX1mdW5jdGlvbiByZChhKXt4KERvY3VtZW50LnByb3RvdHlwZSxcImNyZWF0ZUVsZW1lbnRcIixmdW5jdGlvbihiKXtpZih0aGlzLl9fQ0VfaGFzUmVnaXN0cnkpe3ZhciBjPVxuYS5jKGIpO2lmKGMpcmV0dXJuIG5ldyBjLmNvbnN0cnVjdG9yfWI9RWEuY2FsbCh0aGlzLGIpO2EuZyhiKTtyZXR1cm4gYn0pO3goRG9jdW1lbnQucHJvdG90eXBlLFwiaW1wb3J0Tm9kZVwiLGZ1bmN0aW9uKGIsYyl7Yj1zZC5jYWxsKHRoaXMsYixjKTt0aGlzLl9fQ0VfaGFzUmVnaXN0cnk/YS5mKGIpOmEubChiKTtyZXR1cm4gYn0pO3goRG9jdW1lbnQucHJvdG90eXBlLFwiY3JlYXRlRWxlbWVudE5TXCIsZnVuY3Rpb24oYixjKXtpZih0aGlzLl9fQ0VfaGFzUmVnaXN0cnkmJihudWxsPT09Ynx8XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI9PT1iKSl7dmFyIGQ9YS5jKGMpO2lmKGQpcmV0dXJuIG5ldyBkLmNvbnN0cnVjdG9yfWI9dGQuY2FsbCh0aGlzLGIsYyk7YS5nKGIpO3JldHVybiBifSk7SGEoYSxEb2N1bWVudC5wcm90b3R5cGUse1o6dWQsYXBwZW5kOnZkfSl9ZnVuY3Rpb24gSGEoYSxiLGMpe2Z1bmN0aW9uIGQoYil7cmV0dXJuIGZ1bmN0aW9uKGMpe2Zvcih2YXIgZD1bXSxcbmU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7KytlKWRbZS0wXT1hcmd1bWVudHNbZV07ZT1bXTtmb3IodmFyIGY9W10sZz0wO2c8ZC5sZW5ndGg7ZysrKXt2YXIgbT1kW2ddO20gaW5zdGFuY2VvZiBFbGVtZW50JiZ0KG0pJiZmLnB1c2gobSk7aWYobSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpZm9yKG09bS5maXJzdENoaWxkO207bT1tLm5leHRTaWJsaW5nKWUucHVzaChtKTtlbHNlIGUucHVzaChtKX1iLmFwcGx5KHRoaXMsZCk7Zm9yKGQ9MDtkPGYubGVuZ3RoO2QrKylhLmEoZltkXSk7aWYodCh0aGlzKSlmb3IoZD0wO2Q8ZS5sZW5ndGg7ZCsrKWY9ZVtkXSxmIGluc3RhbmNlb2YgRWxlbWVudCYmYS5iKGYpfX12b2lkIDAhPT1jLlomJihiLnByZXBlbmQ9ZChjLlopKTt2b2lkIDAhPT1jLmFwcGVuZCYmKGIuYXBwZW5kPWQoYy5hcHBlbmQpKX1mdW5jdGlvbiB3ZChhKXt3aW5kb3cuSFRNTEVsZW1lbnQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBiKCl7dmFyIGI9dGhpcy5jb25zdHJ1Y3RvcixcbmQ9YS53KGIpO2lmKCFkKXRocm93IEVycm9yKFwiVGhlIGN1c3RvbSBlbGVtZW50IGJlaW5nIGNvbnN0cnVjdGVkIHdhcyBub3QgcmVnaXN0ZXJlZCB3aXRoIGBjdXN0b21FbGVtZW50c2AuXCIpO3ZhciBlPWQuY29uc3RydWN0aW9uU3RhY2s7aWYoMD09PWUubGVuZ3RoKXJldHVybiBlPUVhLmNhbGwoZG9jdW1lbnQsZC5sb2NhbE5hbWUpLE9iamVjdC5zZXRQcm90b3R5cGVPZihlLGIucHJvdG90eXBlKSxlLl9fQ0Vfc3RhdGU9MSxlLl9fQ0VfZGVmaW5pdGlvbj1kLGEuZyhlKSxlO2Q9ZS5sZW5ndGgtMTt2YXIgZj1lW2RdO2lmKGY9PT1GYil0aHJvdyBFcnJvcihcIlRoZSBIVE1MRWxlbWVudCBjb25zdHJ1Y3RvciB3YXMgZWl0aGVyIGNhbGxlZCByZWVudHJhbnRseSBmb3IgdGhpcyBjb25zdHJ1Y3RvciBvciBjYWxsZWQgbXVsdGlwbGUgdGltZXMuXCIpO2VbZF09RmI7T2JqZWN0LnNldFByb3RvdHlwZU9mKGYsYi5wcm90b3R5cGUpO2EuZyhmKTtyZXR1cm4gZn1iLnByb3RvdHlwZT14ZC5wcm90b3R5cGU7XG5yZXR1cm4gYn0oKX1mdW5jdGlvbiB5KGEpe3RoaXMuYz0hMTt0aGlzLmE9YTt0aGlzLmg9bmV3IE1hcDt0aGlzLmY9ZnVuY3Rpb24oYSl7cmV0dXJuIGEoKX07dGhpcy5iPSExO3RoaXMuZz1bXTt0aGlzLmk9bmV3IEphKGEsZG9jdW1lbnQpfWZ1bmN0aW9uIEdiKCl7dmFyIGE9dGhpczt0aGlzLmI9dGhpcy5hPXZvaWQgMDt0aGlzLmY9bmV3IFByb21pc2UoZnVuY3Rpb24oYil7YS5iPWI7YS5hJiZiKGEuYSl9KX1mdW5jdGlvbiBKYShhLGIpe3RoaXMuYj1hO3RoaXMuYT1iO3RoaXMuTT12b2lkIDA7dGhpcy5iLmYodGhpcy5hKTtcImxvYWRpbmdcIj09PXRoaXMuYS5yZWFkeVN0YXRlJiYodGhpcy5NPW5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuZi5iaW5kKHRoaXMpKSx0aGlzLk0ub2JzZXJ2ZSh0aGlzLmEse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSkpfWZ1bmN0aW9uIEIoKXt0aGlzLm89bmV3IE1hcDt0aGlzLm09bmV3IE1hcDt0aGlzLmo9W107dGhpcy5oPSExfWZ1bmN0aW9uIGwoYSxcbmIsYyl7aWYoYSE9PUhiKXRocm93IG5ldyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGNvbnN0cnVjdG9yXCIpO2E9ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2EuX19wcm90b19fPWwucHJvdG90eXBlO2EuRihiLGMpO3JldHVybiBhfWZ1bmN0aW9uIGthKGEpe2lmKCFhLl9fc2hhZHl8fHZvaWQgMD09PWEuX19zaGFkeS5maXJzdENoaWxkKXthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTthLl9fc2hhZHkuZmlyc3RDaGlsZD1LYShhKTthLl9fc2hhZHkubGFzdENoaWxkPUxhKGEpO0liKGEpO2Zvcih2YXIgYj1hLl9fc2hhZHkuY2hpbGROb2Rlcz1TKGEpLGM9MCxkO2M8Yi5sZW5ndGgmJihkPWJbY10pO2MrKylkLl9fc2hhZHk9ZC5fX3NoYWR5fHx7fSxkLl9fc2hhZHkucGFyZW50Tm9kZT1hLGQuX19zaGFkeS5uZXh0U2libGluZz1iW2MrMV18fG51bGwsZC5fX3NoYWR5LnByZXZpb3VzU2libGluZz1iW2MtMV18fG51bGwsSmIoZCl9fWZ1bmN0aW9uIHlkKGEpe3ZhciBiPWEmJmEuTTtcbmImJihiLlguZGVsZXRlKGEuUmEpLGIuWC5zaXplfHwoYS5TYS5fX3NoYWR5LlQ9bnVsbCkpfWZ1bmN0aW9uIHpkKGEsYil7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307YS5fX3NoYWR5LlR8fChhLl9fc2hhZHkuVD1uZXcgbGEpO2EuX19zaGFkeS5ULlguYWRkKGIpO3ZhciBjPWEuX19zaGFkeS5UO3JldHVybntSYTpiLE06YyxTYTphLHRha2VSZWNvcmRzOmZ1bmN0aW9uKCl7cmV0dXJuIGMudGFrZVJlY29yZHMoKX19fWZ1bmN0aW9uIGxhKCl7dGhpcy5hPSExO3RoaXMuYWRkZWROb2Rlcz1bXTt0aGlzLnJlbW92ZWROb2Rlcz1bXTt0aGlzLlg9bmV3IFNldH1mdW5jdGlvbiBUKGEpe3JldHVybiBhLl9fc2hhZHkmJnZvaWQgMCE9PWEuX19zaGFkeS5maXJzdENoaWxkfWZ1bmN0aW9uIEcoYSl7cmV0dXJuXCJTaGFkeVJvb3RcIj09PWEuTWF9ZnVuY3Rpb24gWihhKXthPWEuZ2V0Um9vdE5vZGUoKTtpZihHKGEpKXJldHVybiBhfWZ1bmN0aW9uIE1hKGEsYil7aWYoYSYmYilmb3IodmFyIGM9XG5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiKSxkPTAsZTtkPGMubGVuZ3RoJiYoZT1jW2RdKTtkKyspe3ZhciBmPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYixlKTtmJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxlLGYpfX1mdW5jdGlvbiBOYShhLGIpe2Zvcih2YXIgYz1bXSxkPTE7ZDxhcmd1bWVudHMubGVuZ3RoOysrZCljW2QtMV09YXJndW1lbnRzW2RdO2ZvcihkPTA7ZDxjLmxlbmd0aDtkKyspTWEoYSxjW2RdKTtyZXR1cm4gYX1mdW5jdGlvbiBBZChhLGIpe2Zvcih2YXIgYyBpbiBiKWFbY109YltjXX1mdW5jdGlvbiBLYihhKXtPYS5wdXNoKGEpO1BhLnRleHRDb250ZW50PUxiKyt9ZnVuY3Rpb24gTWIoYSxiKXtmb3IoO2I7KXtpZihiPT1hKXJldHVybiEwO2I9Yi5wYXJlbnROb2RlfXJldHVybiExfWZ1bmN0aW9uIE5iKGEpe1FhfHwoUWE9ITAsS2IobWEpKTthYS5wdXNoKGEpfWZ1bmN0aW9uIG1hKCl7UWE9ITE7Zm9yKHZhciBhPSEhYWEubGVuZ3RoO2FhLmxlbmd0aDspYWEuc2hpZnQoKSgpO1xucmV0dXJuIGF9ZnVuY3Rpb24gQmQoYSxiKXt2YXIgYz1iLmdldFJvb3ROb2RlKCk7cmV0dXJuIGEubWFwKGZ1bmN0aW9uKGEpe3ZhciBiPWM9PT1hLnRhcmdldC5nZXRSb290Tm9kZSgpO2lmKGImJmEuYWRkZWROb2Rlcyl7aWYoYj1BcnJheS5mcm9tKGEuYWRkZWROb2RlcykuZmlsdGVyKGZ1bmN0aW9uKGEpe3JldHVybiBjPT09YS5nZXRSb290Tm9kZSgpfSksYi5sZW5ndGgpcmV0dXJuIGE9T2JqZWN0LmNyZWF0ZShhKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcImFkZGVkTm9kZXNcIix7dmFsdWU6Yixjb25maWd1cmFibGU6ITB9KSxhfWVsc2UgaWYoYilyZXR1cm4gYX0pLmZpbHRlcihmdW5jdGlvbihhKXtyZXR1cm4gYX0pfWZ1bmN0aW9uIE9iKGEpe3N3aXRjaChhKXtjYXNlIFwiJlwiOnJldHVyblwiJmFtcDtcIjtjYXNlIFwiPFwiOnJldHVyblwiJmx0O1wiO2Nhc2UgXCI+XCI6cmV0dXJuXCImZ3Q7XCI7Y2FzZSAnXCInOnJldHVyblwiJnF1b3Q7XCI7Y2FzZSBcIlxcdTAwYTBcIjpyZXR1cm5cIiZuYnNwO1wifX1cbmZ1bmN0aW9uIFBiKGEpe2Zvcih2YXIgYj17fSxjPTA7YzxhLmxlbmd0aDtjKyspYlthW2NdXT0hMDtyZXR1cm4gYn1mdW5jdGlvbiBSYShhLGIpe1widGVtcGxhdGVcIj09PWEubG9jYWxOYW1lJiYoYT1hLmNvbnRlbnQpO2Zvcih2YXIgYz1cIlwiLGQ9Yj9iKGEpOmEuY2hpbGROb2RlcyxlPTAsZj1kLmxlbmd0aCxrO2U8ZiYmKGs9ZFtlXSk7ZSsrKXthOnt2YXIgaD1rO3ZhciB3PWE7dmFyIGc9Yjtzd2l0Y2goaC5ub2RlVHlwZSl7Y2FzZSBOb2RlLkVMRU1FTlRfTk9ERTpmb3IodmFyIG09aC5sb2NhbE5hbWUsbD1cIjxcIittLHE9aC5hdHRyaWJ1dGVzLG49MDt3PXFbbl07bisrKWwrPVwiIFwiK3cubmFtZSsnPVwiJyt3LnZhbHVlLnJlcGxhY2UoQ2QsT2IpKydcIic7bCs9XCI+XCI7aD1EZFttXT9sOmwrUmEoaCxnKStcIjwvXCIrbStcIj5cIjticmVhayBhO2Nhc2UgTm9kZS5URVhUX05PREU6aD1oLmRhdGE7aD13JiZFZFt3LmxvY2FsTmFtZV0/aDpoLnJlcGxhY2UoRmQsT2IpO2JyZWFrIGE7Y2FzZSBOb2RlLkNPTU1FTlRfTk9ERTpoPVxuXCJcXHgzYyEtLVwiK2guZGF0YStcIi0tXFx4M2VcIjticmVhayBhO2RlZmF1bHQ6dGhyb3cgd2luZG93LmNvbnNvbGUuZXJyb3IoaCksRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7fX1jKz1ofXJldHVybiBjfWZ1bmN0aW9uIFUoYSl7Qy5jdXJyZW50Tm9kZT1hO3JldHVybiBDLnBhcmVudE5vZGUoKX1mdW5jdGlvbiBLYShhKXtDLmN1cnJlbnROb2RlPWE7cmV0dXJuIEMuZmlyc3RDaGlsZCgpfWZ1bmN0aW9uIExhKGEpe0MuY3VycmVudE5vZGU9YTtyZXR1cm4gQy5sYXN0Q2hpbGQoKX1mdW5jdGlvbiBRYihhKXtDLmN1cnJlbnROb2RlPWE7cmV0dXJuIEMucHJldmlvdXNTaWJsaW5nKCl9ZnVuY3Rpb24gUmIoYSl7Qy5jdXJyZW50Tm9kZT1hO3JldHVybiBDLm5leHRTaWJsaW5nKCl9ZnVuY3Rpb24gUyhhKXt2YXIgYj1bXTtDLmN1cnJlbnROb2RlPWE7Zm9yKGE9Qy5maXJzdENoaWxkKCk7YTspYi5wdXNoKGEpLGE9Qy5uZXh0U2libGluZygpO3JldHVybiBifWZ1bmN0aW9uIFNiKGEpe0QuY3VycmVudE5vZGU9XG5hO3JldHVybiBELnBhcmVudE5vZGUoKX1mdW5jdGlvbiBUYihhKXtELmN1cnJlbnROb2RlPWE7cmV0dXJuIEQuZmlyc3RDaGlsZCgpfWZ1bmN0aW9uIFViKGEpe0QuY3VycmVudE5vZGU9YTtyZXR1cm4gRC5sYXN0Q2hpbGQoKX1mdW5jdGlvbiBWYihhKXtELmN1cnJlbnROb2RlPWE7cmV0dXJuIEQucHJldmlvdXNTaWJsaW5nKCl9ZnVuY3Rpb24gV2IoYSl7RC5jdXJyZW50Tm9kZT1hO3JldHVybiBELm5leHRTaWJsaW5nKCl9ZnVuY3Rpb24gWGIoYSl7dmFyIGI9W107RC5jdXJyZW50Tm9kZT1hO2ZvcihhPUQuZmlyc3RDaGlsZCgpO2E7KWIucHVzaChhKSxhPUQubmV4dFNpYmxpbmcoKTtyZXR1cm4gYn1mdW5jdGlvbiBZYihhKXtyZXR1cm4gUmEoYSxmdW5jdGlvbihhKXtyZXR1cm4gUyhhKX0pfWZ1bmN0aW9uIFpiKGEpe3N3aXRjaChhLm5vZGVUeXBlKXtjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOmNhc2UgTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFOmE9ZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihhLFxuTm9kZUZpbHRlci5TSE9XX1RFWFQsbnVsbCwhMSk7Zm9yKHZhciBiPVwiXCIsYztjPWEubmV4dE5vZGUoKTspYis9Yy5ub2RlVmFsdWU7cmV0dXJuIGI7ZGVmYXVsdDpyZXR1cm4gYS5ub2RlVmFsdWV9fWZ1bmN0aW9uIEsoYSxiLGMpe2Zvcih2YXIgZCBpbiBiKXt2YXIgZT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGEsZCk7ZSYmZS5jb25maWd1cmFibGV8fCFlJiZjP09iamVjdC5kZWZpbmVQcm9wZXJ0eShhLGQsYltkXSk6YyYmY29uc29sZS53YXJuKFwiQ291bGQgbm90IGRlZmluZVwiLGQsXCJvblwiLGEpfX1mdW5jdGlvbiBQKGEpe0soYSwkYik7SyhhLFNhKTtLKGEsVGEpfWZ1bmN0aW9uIGFjKGEsYixjKXtKYihhKTtjPWN8fG51bGw7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307Yi5fX3NoYWR5PWIuX19zaGFkeXx8e307YyYmKGMuX19zaGFkeT1jLl9fc2hhZHl8fHt9KTthLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nPWM/Yy5fX3NoYWR5LnByZXZpb3VzU2libGluZzpiLmxhc3RDaGlsZDtcbnZhciBkPWEuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc7ZCYmZC5fX3NoYWR5JiYoZC5fX3NoYWR5Lm5leHRTaWJsaW5nPWEpOyhkPWEuX19zaGFkeS5uZXh0U2libGluZz1jKSYmZC5fX3NoYWR5JiYoZC5fX3NoYWR5LnByZXZpb3VzU2libGluZz1hKTthLl9fc2hhZHkucGFyZW50Tm9kZT1iO2M/Yz09PWIuX19zaGFkeS5maXJzdENoaWxkJiYoYi5fX3NoYWR5LmZpcnN0Q2hpbGQ9YSk6KGIuX19zaGFkeS5sYXN0Q2hpbGQ9YSxiLl9fc2hhZHkuZmlyc3RDaGlsZHx8KGIuX19zaGFkeS5maXJzdENoaWxkPWEpKTtiLl9fc2hhZHkuY2hpbGROb2Rlcz1udWxsfWZ1bmN0aW9uIFVhKGEsYixjKXtpZihiPT09YSl0aHJvdyBFcnJvcihcIkZhaWxlZCB0byBleGVjdXRlICdhcHBlbmRDaGlsZCcgb24gJ05vZGUnOiBUaGUgbmV3IGNoaWxkIGVsZW1lbnQgY29udGFpbnMgdGhlIHBhcmVudC5cIik7aWYoYyl7dmFyIGQ9Yy5fX3NoYWR5JiZjLl9fc2hhZHkucGFyZW50Tm9kZTtpZih2b2lkIDAhPT1kJiZcbmQhPT1hfHx2b2lkIDA9PT1kJiZVKGMpIT09YSl0aHJvdyBFcnJvcihcIkZhaWxlZCB0byBleGVjdXRlICdpbnNlcnRCZWZvcmUnIG9uICdOb2RlJzogVGhlIG5vZGUgYmVmb3JlIHdoaWNoIHRoZSBuZXcgbm9kZSBpcyB0byBiZSBpbnNlcnRlZCBpcyBub3QgYSBjaGlsZCBvZiB0aGlzIG5vZGUuXCIpO31pZihjPT09YilyZXR1cm4gYjtiLnBhcmVudE5vZGUmJlZhKGIucGFyZW50Tm9kZSxiKTtkPVooYSk7dmFyIGU7aWYoZT1kKWE6e2lmKCFiLl9fbm9JbnNlcnRpb25Qb2ludCl7dmFyIGY7XCJzbG90XCI9PT1iLmxvY2FsTmFtZT9mPVtiXTpiLnF1ZXJ5U2VsZWN0b3JBbGwmJihmPWIucXVlcnlTZWxlY3RvckFsbChcInNsb3RcIikpO2lmKGYmJmYubGVuZ3RoKXtlPWY7YnJlYWsgYX19ZT12b2lkIDB9KGY9ZSkmJmQuUWEoZik7ZCYmKFwic2xvdFwiPT09YS5sb2NhbE5hbWV8fGYpJiZkLkwoKTtpZihUKGEpKXtkPWM7SWIoYSk7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307dm9pZCAwIT09YS5fX3NoYWR5LmZpcnN0Q2hpbGQmJlxuKGEuX19zaGFkeS5jaGlsZE5vZGVzPW51bGwpO2lmKGIubm9kZVR5cGU9PT1Ob2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpe2Y9Yi5jaGlsZE5vZGVzO2ZvcihlPTA7ZTxmLmxlbmd0aDtlKyspYWMoZltlXSxhLGQpO2IuX19zaGFkeT1iLl9fc2hhZHl8fHt9O2Q9dm9pZCAwIT09Yi5fX3NoYWR5LmZpcnN0Q2hpbGQ/bnVsbDp2b2lkIDA7Yi5fX3NoYWR5LmZpcnN0Q2hpbGQ9Yi5fX3NoYWR5Lmxhc3RDaGlsZD1kO2IuX19zaGFkeS5jaGlsZE5vZGVzPWR9ZWxzZSBhYyhiLGEsZCk7aWYoV2EoYSkpe2EuX19zaGFkeS5yb290LkwoKTt2YXIgaz0hMH1lbHNlIGEuX19zaGFkeS5yb290JiYoaz0hMCl9a3x8KGs9RyhhKT9hLmhvc3Q6YSxjPyhjPWJjKGMpLFhhLmNhbGwoayxiLGMpKTpjYy5jYWxsKGssYikpO2RjKGEsYik7cmV0dXJuIGJ9ZnVuY3Rpb24gVmEoYSxiKXtpZihiLnBhcmVudE5vZGUhPT1hKXRocm93IEVycm9yKFwiVGhlIG5vZGUgdG8gYmUgcmVtb3ZlZCBpcyBub3QgYSBjaGlsZCBvZiB0aGlzIG5vZGU6IFwiK1xuYik7dmFyIGM9WihiKTtpZihUKGEpKXtiLl9fc2hhZHk9Yi5fX3NoYWR5fHx7fTthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTtiPT09YS5fX3NoYWR5LmZpcnN0Q2hpbGQmJihhLl9fc2hhZHkuZmlyc3RDaGlsZD1iLl9fc2hhZHkubmV4dFNpYmxpbmcpO2I9PT1hLl9fc2hhZHkubGFzdENoaWxkJiYoYS5fX3NoYWR5Lmxhc3RDaGlsZD1iLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nKTt2YXIgZD1iLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nO3ZhciBlPWIuX19zaGFkeS5uZXh0U2libGluZztkJiYoZC5fX3NoYWR5PWQuX19zaGFkeXx8e30sZC5fX3NoYWR5Lm5leHRTaWJsaW5nPWUpO2UmJihlLl9fc2hhZHk9ZS5fX3NoYWR5fHx7fSxlLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nPWQpO2IuX19zaGFkeS5wYXJlbnROb2RlPWIuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc9Yi5fX3NoYWR5Lm5leHRTaWJsaW5nPXZvaWQgMDt2b2lkIDAhPT1hLl9fc2hhZHkuY2hpbGROb2RlcyYmKGEuX19zaGFkeS5jaGlsZE5vZGVzPVxubnVsbCk7aWYoV2EoYSkpe2EuX19zaGFkeS5yb290LkwoKTt2YXIgZj0hMH19ZWMoYik7YyYmKChlPWEmJlwic2xvdFwiPT09YS5sb2NhbE5hbWUpJiYoZj0hMCksKChkPWMuVGEoYikpfHxlKSYmYy5MKCkpO2Z8fChmPUcoYSk/YS5ob3N0OmEsKCFhLl9fc2hhZHkucm9vdCYmXCJzbG90XCIhPT1iLmxvY2FsTmFtZXx8Zj09PVUoYikpJiZiYS5jYWxsKGYsYikpO2RjKGEsbnVsbCxiKTtyZXR1cm4gYn1mdW5jdGlvbiBlYyhhKXtpZihhLl9fc2hhZHkmJnZvaWQgMCE9PWEuX19zaGFkeS5tYSlmb3IodmFyIGI9YS5jaGlsZE5vZGVzLGM9MCxkPWIubGVuZ3RoLGU7YzxkJiYoZT1iW2NdKTtjKyspZWMoZSk7YS5fX3NoYWR5JiYoYS5fX3NoYWR5Lm1hPXZvaWQgMCl9ZnVuY3Rpb24gYmMoYSl7dmFyIGI9YTthJiZcInNsb3RcIj09PWEubG9jYWxOYW1lJiYoYj0oYj1hLl9fc2hhZHkmJmEuX19zaGFkeS5SKSYmYi5sZW5ndGg/YlswXTpiYyhhLm5leHRTaWJsaW5nKSk7cmV0dXJuIGJ9ZnVuY3Rpb24gV2EoYSl7cmV0dXJuKGE9XG5hJiZhLl9fc2hhZHkmJmEuX19zaGFkeS5yb290KSYmYS50YSgpfWZ1bmN0aW9uIGZjKGEsYil7XCJzbG90XCI9PT1iPyhhPWEucGFyZW50Tm9kZSxXYShhKSYmYS5fX3NoYWR5LnJvb3QuTCgpKTpcInNsb3RcIj09PWEubG9jYWxOYW1lJiZcIm5hbWVcIj09PWImJihiPVooYSkpJiYoYi5WYShhKSxiLkwoKSl9ZnVuY3Rpb24gZGMoYSxiLGMpe2lmKGE9YS5fX3NoYWR5JiZhLl9fc2hhZHkuVCliJiZhLmFkZGVkTm9kZXMucHVzaChiKSxjJiZhLnJlbW92ZWROb2Rlcy5wdXNoKGMpLGEuaGIoKX1mdW5jdGlvbiBnYyhhKXtpZihhJiZhLm5vZGVUeXBlKXthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTt2YXIgYj1hLl9fc2hhZHkubWE7dm9pZCAwPT09YiYmKEcoYSk/Yj1hOmI9KGI9YS5wYXJlbnROb2RlKT9nYyhiKTphLGNhLmNhbGwoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LGEpJiYoYS5fX3NoYWR5Lm1hPWIpKTtyZXR1cm4gYn19ZnVuY3Rpb24gbmEoYSxiLGMpe3ZhciBkPVtdO2hjKGEuY2hpbGROb2RlcyxcbmIsYyxkKTtyZXR1cm4gZH1mdW5jdGlvbiBoYyhhLGIsYyxkKXtmb3IodmFyIGU9MCxmPWEubGVuZ3RoLGs7ZTxmJiYoaz1hW2VdKTtlKyspe3ZhciBoO2lmKGg9ay5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFKXtoPWs7dmFyIHc9YixnPWMsbT1kLGw9dyhoKTtsJiZtLnB1c2goaCk7ZyYmZyhsKT9oPWw6KGhjKGguY2hpbGROb2Rlcyx3LGcsbSksaD12b2lkIDApfWlmKGgpYnJlYWt9fWZ1bmN0aW9uIGljKGEpe2E9YS5nZXRSb290Tm9kZSgpO0coYSkmJmEudmEoKX1mdW5jdGlvbiBqYyhhLGIsYyl7b2F8fChvYT13aW5kb3cuU2hhZHlDU1MmJndpbmRvdy5TaGFkeUNTUy5TY29waW5nU2hpbSk7b2EmJlwiY2xhc3NcIj09PWI/b2Euc2V0RWxlbWVudENsYXNzKGEsYyk6KGtjLmNhbGwoYSxiLGMpLGZjKGEsYikpfWZ1bmN0aW9uIGxjKGEsYil7aWYoYS5vd25lckRvY3VtZW50IT09ZG9jdW1lbnQpcmV0dXJuIFlhLmNhbGwoZG9jdW1lbnQsYSxiKTt2YXIgYz1ZYS5jYWxsKGRvY3VtZW50LFxuYSwhMSk7aWYoYil7YT1hLmNoaWxkTm9kZXM7Yj0wO2Zvcih2YXIgZDtiPGEubGVuZ3RoO2IrKylkPWxjKGFbYl0sITApLGMuYXBwZW5kQ2hpbGQoZCl9cmV0dXJuIGN9ZnVuY3Rpb24gWmEoYSxiKXt2YXIgYz1bXSxkPWE7Zm9yKGE9YT09PXdpbmRvdz93aW5kb3c6YS5nZXRSb290Tm9kZSgpO2Q7KWMucHVzaChkKSxkPWQuYXNzaWduZWRTbG90P2QuYXNzaWduZWRTbG90OmQubm9kZVR5cGU9PT1Ob2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUmJmQuaG9zdCYmKGJ8fGQhPT1hKT9kLmhvc3Q6ZC5wYXJlbnROb2RlO2NbYy5sZW5ndGgtMV09PT1kb2N1bWVudCYmYy5wdXNoKHdpbmRvdyk7cmV0dXJuIGN9ZnVuY3Rpb24gbWMoYSxiKXtpZighRylyZXR1cm4gYTthPVphKGEsITApO2Zvcih2YXIgYz0wLGQsZSxmLGs7YzxiLmxlbmd0aDtjKyspaWYoZD1iW2NdLGY9ZD09PXdpbmRvdz93aW5kb3c6ZC5nZXRSb290Tm9kZSgpLGYhPT1lJiYoaz1hLmluZGV4T2YoZiksZT1mKSwhRyhmKXx8XG4tMTxrKXJldHVybiBkfWZ1bmN0aW9uICRhKGEpe2Z1bmN0aW9uIGIoYixkKXtiPW5ldyBhKGIsZCk7Yi5lYT1kJiYhIWQuY29tcG9zZWQ7cmV0dXJuIGJ9QWQoYixhKTtiLnByb3RvdHlwZT1hLnByb3RvdHlwZTtyZXR1cm4gYn1mdW5jdGlvbiBuYyhhLGIsYyl7aWYoYz1iLl9faGFuZGxlcnMmJmIuX19oYW5kbGVyc1thLnR5cGVdJiZiLl9faGFuZGxlcnNbYS50eXBlXVtjXSlmb3IodmFyIGQ9MCxlOyhlPWNbZF0pJiZhLnRhcmdldCE9PWEucmVsYXRlZFRhcmdldCYmKGUuY2FsbChiLGEpLCFhLkthKTtkKyspO31mdW5jdGlvbiBHZChhKXt2YXIgYj1hLmNvbXBvc2VkUGF0aCgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShhLFwiY3VycmVudFRhcmdldFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZH0sY29uZmlndXJhYmxlOiEwfSk7Zm9yKHZhciBjPWIubGVuZ3RoLTE7MDw9YztjLS0pe3ZhciBkPWJbY107bmMoYSxkLFwiY2FwdHVyZVwiKTtpZihhLmZhKXJldHVybn1PYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcblwiZXZlbnRQaGFzZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gRXZlbnQuQVRfVEFSR0VUfX0pO3ZhciBlO2ZvcihjPTA7YzxiLmxlbmd0aDtjKyspe2Q9YltjXTt2YXIgZj1kLl9fc2hhZHkmJmQuX19zaGFkeS5yb290O2lmKDA9PT1jfHxmJiZmPT09ZSlpZihuYyhhLGQsXCJidWJibGVcIiksZCE9PXdpbmRvdyYmKGU9ZC5nZXRSb290Tm9kZSgpKSxhLmZhKWJyZWFrfX1mdW5jdGlvbiBvYyhhLGIsYyxkLGUsZil7Zm9yKHZhciBrPTA7azxhLmxlbmd0aDtrKyspe3ZhciBoPWFba10sdz1oLnR5cGUsZz1oLmNhcHR1cmUsbT1oLm9uY2UsbD1oLnBhc3NpdmU7aWYoYj09PWgubm9kZSYmYz09PXcmJmQ9PT1nJiZlPT09bSYmZj09PWwpcmV0dXJuIGt9cmV0dXJuLTF9ZnVuY3Rpb24gcGMoYSxiLGMpe2lmKGIpe2lmKFwib2JqZWN0XCI9PT10eXBlb2YgYyl7dmFyIGQ9ISFjLmNhcHR1cmU7dmFyIGU9ISFjLm9uY2U7dmFyIGY9ISFjLnBhc3NpdmV9ZWxzZSBkPSEhYyxmPWU9ITE7dmFyIGs9YyYmYy5nYXx8XG50aGlzLGg9YltkYV07aWYoaCl7aWYoLTE8b2MoaCxrLGEsZCxlLGYpKXJldHVybn1lbHNlIGJbZGFdPVtdO2g9ZnVuY3Rpb24oZCl7ZSYmdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGEsYixjKTtkLl9fdGFyZ2V0fHxxYyhkKTtpZihrIT09dGhpcyl7dmFyIGY9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkLFwiY3VycmVudFRhcmdldFwiKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZCxcImN1cnJlbnRUYXJnZXRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGt9LGNvbmZpZ3VyYWJsZTohMH0pfWlmKGQuY29tcG9zZWR8fC0xPGQuY29tcG9zZWRQYXRoKCkuaW5kZXhPZihrKSlpZihkLnRhcmdldD09PWQucmVsYXRlZFRhcmdldClkLmV2ZW50UGhhc2U9PT1FdmVudC5CVUJCTElOR19QSEFTRSYmZC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtlbHNlIGlmKGQuZXZlbnRQaGFzZT09PUV2ZW50LkNBUFRVUklOR19QSEFTRXx8ZC5idWJibGVzfHxkLnRhcmdldD09PWspe3ZhciBoPVxuXCJvYmplY3RcIj09PXR5cGVvZiBiJiZiLmhhbmRsZUV2ZW50P2IuaGFuZGxlRXZlbnQoZCk6Yi5jYWxsKGssZCk7ayE9PXRoaXMmJihmPyhPYmplY3QuZGVmaW5lUHJvcGVydHkoZCxcImN1cnJlbnRUYXJnZXRcIixmKSxmPW51bGwpOmRlbGV0ZSBkLmN1cnJlbnRUYXJnZXQpO3JldHVybiBofX07YltkYV0ucHVzaCh7bm9kZTp0aGlzLHR5cGU6YSxjYXB0dXJlOmQsb25jZTplLHBhc3NpdmU6ZixsYjpofSk7YWJbYV0/KHRoaXMuX19oYW5kbGVycz10aGlzLl9faGFuZGxlcnN8fHt9LHRoaXMuX19oYW5kbGVyc1thXT10aGlzLl9faGFuZGxlcnNbYV18fHtjYXB0dXJlOltdLGJ1YmJsZTpbXX0sdGhpcy5fX2hhbmRsZXJzW2FdW2Q/XCJjYXB0dXJlXCI6XCJidWJibGVcIl0ucHVzaChoKSk6KHRoaXMgaW5zdGFuY2VvZiBXaW5kb3c/cmM6c2MpLmNhbGwodGhpcyxhLGgsYyl9fWZ1bmN0aW9uIHRjKGEsYixjKXtpZihiKXtpZihcIm9iamVjdFwiPT09dHlwZW9mIGMpe3ZhciBkPSEhYy5jYXB0dXJlO3ZhciBlPVxuISFjLm9uY2U7dmFyIGY9ISFjLnBhc3NpdmV9ZWxzZSBkPSEhYyxmPWU9ITE7dmFyIGs9YyYmYy5nYXx8dGhpcyxoPXZvaWQgMDt2YXIgZz1udWxsO3RyeXtnPWJbZGFdfWNhdGNoKHIpe31nJiYoZT1vYyhnLGssYSxkLGUsZiksLTE8ZSYmKGg9Zy5zcGxpY2UoZSwxKVswXS5sYixnLmxlbmd0aHx8KGJbZGFdPXZvaWQgMCkpKTsodGhpcyBpbnN0YW5jZW9mIFdpbmRvdz91Yzp2YykuY2FsbCh0aGlzLGEsaHx8YixjKTtoJiZhYlthXSYmdGhpcy5fX2hhbmRsZXJzJiZ0aGlzLl9faGFuZGxlcnNbYV0mJihhPXRoaXMuX19oYW5kbGVyc1thXVtkP1wiY2FwdHVyZVwiOlwiYnViYmxlXCJdLGg9YS5pbmRleE9mKGgpLC0xPGgmJmEuc3BsaWNlKGgsMSkpfX1mdW5jdGlvbiBIZCgpe2Zvcih2YXIgYSBpbiBhYil3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihhLGZ1bmN0aW9uKGEpe2EuX190YXJnZXR8fChxYyhhKSxHZChhKSl9LCEwKX1mdW5jdGlvbiBxYyhhKXthLl9fdGFyZ2V0PWEudGFyZ2V0O2EucmE9XG5hLnJlbGF0ZWRUYXJnZXQ7aWYoRS5TKXt2YXIgYj13YyxjPU9iamVjdC5nZXRQcm90b3R5cGVPZihhKTtpZighYy5oYXNPd25Qcm9wZXJ0eShcIl9fcGF0Y2hQcm90b1wiKSl7dmFyIGQ9T2JqZWN0LmNyZWF0ZShjKTtkLm5iPWM7TWEoZCxiKTtjLl9fcGF0Y2hQcm90bz1kfWEuX19wcm90b19fPWMuX19wYXRjaFByb3RvfWVsc2UgTWEoYSx3Yyl9ZnVuY3Rpb24gZWEoYSxiKXtyZXR1cm57aW5kZXg6YSxVOltdLFc6Yn19ZnVuY3Rpb24gSWQoYSxiLGMsZCl7dmFyIGU9MCxmPTAsaz0wLGg9MCxnPU1hdGgubWluKGItZSxkLWYpO2lmKDA9PWUmJjA9PWYpYTp7Zm9yKGs9MDtrPGc7aysrKWlmKGFba10hPT1jW2tdKWJyZWFrIGE7az1nfWlmKGI9PWEubGVuZ3RoJiZkPT1jLmxlbmd0aCl7aD1hLmxlbmd0aDtmb3IodmFyIHI9Yy5sZW5ndGgsbT0wO208Zy1rJiZKZChhWy0taF0sY1stLXJdKTspbSsrO2g9bX1lKz1rO2YrPWs7Yi09aDtkLT1oO2lmKDA9PWItZSYmMD09ZC1mKXJldHVybltdO1xuaWYoZT09Yil7Zm9yKGI9ZWEoZSwwKTtmPGQ7KWIuVS5wdXNoKGNbZisrXSk7cmV0dXJuW2JdfWlmKGY9PWQpcmV0dXJuW2VhKGUsYi1lKV07Zz1lO2s9ZjtkPWQtaysxO2g9Yi1nKzE7Yj1BcnJheShkKTtmb3Iocj0wO3I8ZDtyKyspYltyXT1BcnJheShoKSxiW3JdWzBdPXI7Zm9yKHI9MDtyPGg7cisrKWJbMF1bcl09cjtmb3Iocj0xO3I8ZDtyKyspZm9yKG09MTttPGg7bSsrKWlmKGFbZyttLTFdPT09Y1trK3ItMV0pYltyXVttXT1iW3ItMV1bbS0xXTtlbHNle3ZhciBsPWJbci0xXVttXSsxLG49YltyXVttLTFdKzE7YltyXVttXT1sPG4/bDpufWc9Yi5sZW5ndGgtMTtrPWJbMF0ubGVuZ3RoLTE7ZD1iW2ddW2tdO2ZvcihhPVtdOzA8Z3x8MDxrOykwPT1nPyhhLnB1c2goMiksay0tKTowPT1rPyhhLnB1c2goMyksZy0tKTooaD1iW2ctMV1bay0xXSxyPWJbZy0xXVtrXSxtPWJbZ11bay0xXSxsPXI8bT9yPGg/cjpoOm08aD9tOmgsbD09aD8oaD09ZD9hLnB1c2goMCk6KGEucHVzaCgxKSxcbmQ9aCksZy0tLGstLSk6bD09cj8oYS5wdXNoKDMpLGctLSxkPXIpOihhLnB1c2goMiksay0tLGQ9bSkpO2EucmV2ZXJzZSgpO2I9dm9pZCAwO2c9W107Zm9yKGs9MDtrPGEubGVuZ3RoO2srKylzd2l0Y2goYVtrXSl7Y2FzZSAwOmImJihnLnB1c2goYiksYj12b2lkIDApO2UrKztmKys7YnJlYWs7Y2FzZSAxOmJ8fChiPWVhKGUsMCkpO2IuVysrO2UrKztiLlUucHVzaChjW2ZdKTtmKys7YnJlYWs7Y2FzZSAyOmJ8fChiPWVhKGUsMCkpO2IuVysrO2UrKzticmVhaztjYXNlIDM6Ynx8KGI9ZWEoZSwwKSksYi5VLnB1c2goY1tmXSksZisrfWImJmcucHVzaChiKTtyZXR1cm4gZ31mdW5jdGlvbiBKZChhLGIpe3JldHVybiBhPT09Yn1mdW5jdGlvbiB4YyhhKXt2YXIgYj1bXTtkbyBiLnVuc2hpZnQoYSk7d2hpbGUoYT1hLnBhcmVudE5vZGUpO3JldHVybiBifWZ1bmN0aW9uIHljKGEpe2ljKGEpO3JldHVybiBhLl9fc2hhZHkmJmEuX19zaGFkeS5hc3NpZ25lZFNsb3R8fG51bGx9ZnVuY3Rpb24gTChhLFxuYil7Zm9yKHZhciBjPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGIpLGQ9MDtkPGMubGVuZ3RoO2QrKyl7dmFyIGU9Y1tkXSxmPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYixlKTtmLnZhbHVlP2FbZV09Zi52YWx1ZTpPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxlLGYpfX1mdW5jdGlvbiBLZCgpe3ZhciBhPXdpbmRvdy5jdXN0b21FbGVtZW50cyYmd2luZG93LmN1c3RvbUVsZW1lbnRzLm5hdGl2ZUhUTUxFbGVtZW50fHxIVE1MRWxlbWVudDtMKHdpbmRvdy5Ob2RlLnByb3RvdHlwZSxMZCk7TCh3aW5kb3cuV2luZG93LnByb3RvdHlwZSxNZCk7TCh3aW5kb3cuVGV4dC5wcm90b3R5cGUsTmQpO0wod2luZG93LkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLGJiKTtMKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSx6Yyk7TCh3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLEFjKTt3aW5kb3cuSFRNTFNsb3RFbGVtZW50JiZMKHdpbmRvdy5IVE1MU2xvdEVsZW1lbnQucHJvdG90eXBlLFxuQmMpO0woYS5wcm90b3R5cGUsT2QpO0UuUyYmKFAod2luZG93Lk5vZGUucHJvdG90eXBlKSxQKHdpbmRvdy5UZXh0LnByb3RvdHlwZSksUCh3aW5kb3cuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUpLFAod2luZG93LkVsZW1lbnQucHJvdG90eXBlKSxQKGEucHJvdG90eXBlKSxQKHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUpLHdpbmRvdy5IVE1MU2xvdEVsZW1lbnQmJlAod2luZG93LkhUTUxTbG90RWxlbWVudC5wcm90b3R5cGUpKX1mdW5jdGlvbiBDYyhhKXt2YXIgYj1QZC5oYXMoYSk7YT0vXlthLXpdWy4wLTlfYS16XSotW1xcLS4wLTlfYS16XSokLy50ZXN0KGEpO3JldHVybiFiJiZhfWZ1bmN0aW9uIHQoYSl7dmFyIGI9YS5pc0Nvbm5lY3RlZDtpZih2b2lkIDAhPT1iKXJldHVybiBiO2Zvcig7YSYmIShhLl9fQ0VfaXNJbXBvcnREb2N1bWVudHx8YSBpbnN0YW5jZW9mIERvY3VtZW50KTspYT1hLnBhcmVudE5vZGV8fCh3aW5kb3cuU2hhZG93Um9vdCYmYSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q/XG5hLmhvc3Q6dm9pZCAwKTtyZXR1cm4hKCFhfHwhKGEuX19DRV9pc0ltcG9ydERvY3VtZW50fHxhIGluc3RhbmNlb2YgRG9jdW1lbnQpKX1mdW5jdGlvbiBjYihhLGIpe2Zvcig7YiYmYiE9PWEmJiFiLm5leHRTaWJsaW5nOyliPWIucGFyZW50Tm9kZTtyZXR1cm4gYiYmYiE9PWE/Yi5uZXh0U2libGluZzpudWxsfWZ1bmN0aW9uIE8oYSxiLGMpe2M9Yz9jOm5ldyBTZXQ7Zm9yKHZhciBkPWE7ZDspe2lmKGQubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSl7dmFyIGU9ZDtiKGUpO3ZhciBmPWUubG9jYWxOYW1lO2lmKFwibGlua1wiPT09ZiYmXCJpbXBvcnRcIj09PWUuZ2V0QXR0cmlidXRlKFwicmVsXCIpKXtkPWUuaW1wb3J0O2lmKGQgaW5zdGFuY2VvZiBOb2RlJiYhYy5oYXMoZCkpZm9yKGMuYWRkKGQpLGQ9ZC5maXJzdENoaWxkO2Q7ZD1kLm5leHRTaWJsaW5nKU8oZCxiLGMpO2Q9Y2IoYSxlKTtjb250aW51ZX1lbHNlIGlmKFwidGVtcGxhdGVcIj09PWYpe2Q9Y2IoYSxlKTtjb250aW51ZX1pZihlPVxuZS5fX0NFX3NoYWRvd1Jvb3QpZm9yKGU9ZS5maXJzdENoaWxkO2U7ZT1lLm5leHRTaWJsaW5nKU8oZSxiLGMpfWQ9ZC5maXJzdENoaWxkP2QuZmlyc3RDaGlsZDpjYihhLGQpfX1mdW5jdGlvbiB4KGEsYixjKXthW2JdPWN9ZnVuY3Rpb24gZGIoYSl7YT1hLnJlcGxhY2UoRi5ZYSxcIlwiKS5yZXBsYWNlKEYucG9ydCxcIlwiKTt2YXIgYj1EYyxjPWEsZD1uZXcgQmE7ZC5zdGFydD0wO2QuZW5kPWMubGVuZ3RoO2Zvcih2YXIgZT1kLGY9MCxrPWMubGVuZ3RoO2Y8aztmKyspaWYoXCJ7XCI9PT1jW2ZdKXtlLnJ1bGVzfHwoZS5ydWxlcz1bXSk7dmFyIGg9ZSxnPWgucnVsZXNbaC5ydWxlcy5sZW5ndGgtMV18fG51bGw7ZT1uZXcgQmE7ZS5zdGFydD1mKzE7ZS5wYXJlbnQ9aDtlLnByZXZpb3VzPWc7aC5ydWxlcy5wdXNoKGUpfWVsc2VcIn1cIj09PWNbZl0mJihlLmVuZD1mKzEsZT1lLnBhcmVudHx8ZCk7cmV0dXJuIGIoZCxhKX1mdW5jdGlvbiBEYyhhLGIpe3ZhciBjPWIuc3Vic3RyaW5nKGEuc3RhcnQsXG5hLmVuZC0xKTthLnBhcnNlZENzc1RleHQ9YS5jc3NUZXh0PWMudHJpbSgpO2EucGFyZW50JiYoYz1iLnN1YnN0cmluZyhhLnByZXZpb3VzP2EucHJldmlvdXMuZW5kOmEucGFyZW50LnN0YXJ0LGEuc3RhcnQtMSksYz1RZChjKSxjPWMucmVwbGFjZShGLkJhLFwiIFwiKSxjPWMuc3Vic3RyaW5nKGMubGFzdEluZGV4T2YoXCI7XCIpKzEpLGM9YS5wYXJzZWRTZWxlY3Rvcj1hLnNlbGVjdG9yPWMudHJpbSgpLGEuYXRSdWxlPTA9PT1jLmluZGV4T2YoXCJAXCIpLGEuYXRSdWxlPzA9PT1jLmluZGV4T2YoXCJAbWVkaWFcIik/YS50eXBlPUkuTUVESUFfUlVMRTpjLm1hdGNoKEYuY2IpJiYoYS50eXBlPUkuZGEsYS5rZXlmcmFtZXNOYW1lPWEuc2VsZWN0b3Iuc3BsaXQoRi5CYSkucG9wKCkpOmEudHlwZT0wPT09Yy5pbmRleE9mKFwiLS1cIik/SS5uYTpJLlNUWUxFX1JVTEUpO2lmKGM9YS5ydWxlcylmb3IodmFyIGQ9MCxlPWMubGVuZ3RoLGY7ZDxlJiYoZj1jW2RdKTtkKyspRGMoZixiKTtyZXR1cm4gYX1mdW5jdGlvbiBRZChhKXtyZXR1cm4gYS5yZXBsYWNlKC9cXFxcKFswLTlhLWZdezEsNn0pXFxzL2dpLFxuZnVuY3Rpb24oYSxjKXthPWM7Zm9yKGM9Ni1hLmxlbmd0aDtjLS07KWE9XCIwXCIrYTtyZXR1cm5cIlxcXFxcIithfSl9ZnVuY3Rpb24gRWMoYSxiLGMpe2M9dm9pZCAwPT09Yz9cIlwiOmM7dmFyIGQ9XCJcIjtpZihhLmNzc1RleHR8fGEucnVsZXMpe3ZhciBlPWEucnVsZXMsZjtpZihmPWUpZj1lWzBdLGY9IShmJiZmLnNlbGVjdG9yJiYwPT09Zi5zZWxlY3Rvci5pbmRleE9mKFwiLS1cIikpO2lmKGYpe2Y9MDtmb3IodmFyIGs9ZS5sZW5ndGgsaDtmPGsmJihoPWVbZl0pO2YrKylkPUVjKGgsYixkKX1lbHNlIGI/Yj1hLmNzc1RleHQ6KGI9YS5jc3NUZXh0LGI9Yi5yZXBsYWNlKEYud2EsXCJcIikucmVwbGFjZShGLkFhLFwiXCIpLGI9Yi5yZXBsYWNlKEYuZWIsXCJcIikucmVwbGFjZShGLmpiLFwiXCIpKSwoZD1iLnRyaW0oKSkmJihkPVwiICBcIitkK1wiXFxuXCIpfWQmJihhLnNlbGVjdG9yJiYoYys9YS5zZWxlY3RvcitcIiB7XFxuXCIpLGMrPWQsYS5zZWxlY3RvciYmKGMrPVwifVxcblxcblwiKSk7cmV0dXJuIGN9ZnVuY3Rpb24gRmMoYSl7QT1cbmEmJmEuc2hpbWNzc3Byb3BlcnRpZXM/ITE6enx8IShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLzYwMXxFZGdlXFwvMTUvKXx8IXdpbmRvdy5DU1N8fCFDU1Muc3VwcG9ydHN8fCFDU1Muc3VwcG9ydHMoXCJib3gtc2hhZG93XCIsXCIwIDAgMCB2YXIoLS1mb28pXCIpKX1mdW5jdGlvbiBWKGEsYil7aWYoIWEpcmV0dXJuXCJcIjtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPWRiKGEpKTtiJiZXKGEsYik7cmV0dXJuIEVjKGEsQSl9ZnVuY3Rpb24gcGEoYSl7IWEuX19jc3NSdWxlcyYmYS50ZXh0Q29udGVudCYmKGEuX19jc3NSdWxlcz1kYihhLnRleHRDb250ZW50KSk7cmV0dXJuIGEuX19jc3NSdWxlc3x8bnVsbH1mdW5jdGlvbiBHYyhhKXtyZXR1cm4hIWEucGFyZW50JiZhLnBhcmVudC50eXBlPT09SS5kYX1mdW5jdGlvbiBXKGEsYixjLGQpe2lmKGEpe3ZhciBlPSExLGY9YS50eXBlO2lmKGQmJmY9PT1JLk1FRElBX1JVTEUpe3ZhciBrPWEuc2VsZWN0b3IubWF0Y2goUmQpO1xuayYmKHdpbmRvdy5tYXRjaE1lZGlhKGtbMV0pLm1hdGNoZXN8fChlPSEwKSl9Zj09PUkuU1RZTEVfUlVMRT9iKGEpOmMmJmY9PT1JLmRhP2MoYSk6Zj09PUkubmEmJihlPSEwKTtpZigoYT1hLnJ1bGVzKSYmIWUpe2U9MDtmPWEubGVuZ3RoO2Zvcih2YXIgaDtlPGYmJihoPWFbZV0pO2UrKylXKGgsYixjLGQpfX19ZnVuY3Rpb24gZWIoYSxiLGMsZCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO2ImJmUuc2V0QXR0cmlidXRlKFwic2NvcGVcIixiKTtlLnRleHRDb250ZW50PWE7SGMoZSxjLGQpO3JldHVybiBlfWZ1bmN0aW9uIEhjKGEsYixjKXtiPWJ8fGRvY3VtZW50LmhlYWQ7Yi5pbnNlcnRCZWZvcmUoYSxjJiZjLm5leHRTaWJsaW5nfHxiLmZpcnN0Q2hpbGQpO1E/YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihRKT09PU5vZGUuRE9DVU1FTlRfUE9TSVRJT05fUFJFQ0VESU5HJiYoUT1hKTpRPWF9ZnVuY3Rpb24gSWMoYSxiKXt2YXIgYz1hLmluZGV4T2YoXCJ2YXIoXCIpO1xuaWYoLTE9PT1jKXJldHVybiBiKGEsXCJcIixcIlwiLFwiXCIpO2E6e3ZhciBkPTA7dmFyIGU9YyszO2Zvcih2YXIgZj1hLmxlbmd0aDtlPGY7ZSsrKWlmKFwiKFwiPT09YVtlXSlkKys7ZWxzZSBpZihcIilcIj09PWFbZV0mJjA9PT0tLWQpYnJlYWsgYTtlPS0xfWQ9YS5zdWJzdHJpbmcoYys0LGUpO2M9YS5zdWJzdHJpbmcoMCxjKTthPUljKGEuc3Vic3RyaW5nKGUrMSksYik7ZT1kLmluZGV4T2YoXCIsXCIpO3JldHVybi0xPT09ZT9iKGMsZC50cmltKCksXCJcIixhKTpiKGMsZC5zdWJzdHJpbmcoMCxlKS50cmltKCksZC5zdWJzdHJpbmcoZSsxKS50cmltKCksYSl9ZnVuY3Rpb24gcWEoYSxiKXt6P2Euc2V0QXR0cmlidXRlKFwiY2xhc3NcIixiKTp3aW5kb3cuU2hhZHlET00ubmF0aXZlTWV0aG9kcy5zZXRBdHRyaWJ1dGUuY2FsbChhLFwiY2xhc3NcIixiKX1mdW5jdGlvbiBSKGEpe3ZhciBiPWEubG9jYWxOYW1lLGM9XCJcIjtiPy0xPGIuaW5kZXhPZihcIi1cIil8fChjPWIsYj1hLmdldEF0dHJpYnV0ZSYmYS5nZXRBdHRyaWJ1dGUoXCJpc1wiKXx8XG5cIlwiKTooYj1hLmlzLGM9YS5leHRlbmRzKTtyZXR1cm57aXM6YixWOmN9fWZ1bmN0aW9uIEpjKGEpe2Zvcih2YXIgYj0wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz1hW2JdO2lmKGMudGFyZ2V0IT09ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50JiZjLnRhcmdldCE9PWRvY3VtZW50LmhlYWQpZm9yKHZhciBkPTA7ZDxjLmFkZGVkTm9kZXMubGVuZ3RoO2QrKyl7dmFyIGU9Yy5hZGRlZE5vZGVzW2RdO2lmKGUubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSl7dmFyIGY9ZS5nZXRSb290Tm9kZSgpO3ZhciBrPWU7dmFyIGg9W107ay5jbGFzc0xpc3Q/aD1BcnJheS5mcm9tKGsuY2xhc3NMaXN0KTprIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnQmJmsuaGFzQXR0cmlidXRlKFwiY2xhc3NcIikmJihoPWsuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuc3BsaXQoL1xccysvKSk7az1oO2g9ay5pbmRleE9mKHAuYSk7aWYoKGs9LTE8aD9rW2grMV06XCJcIikmJmY9PT1lLm93bmVyRG9jdW1lbnQpcC5iKGUsXG5rLCEwKTtlbHNlIGlmKGYubm9kZVR5cGU9PT1Ob2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUmJihmPWYuaG9zdCkpaWYoZj1SKGYpLmlzLGs9PT1mKWZvcihlPXdpbmRvdy5TaGFkeURPTS5uYXRpdmVNZXRob2RzLnF1ZXJ5U2VsZWN0b3JBbGwuY2FsbChlLFwiOm5vdCguXCIrcC5hK1wiKVwiKSxmPTA7ZjxlLmxlbmd0aDtmKyspcC5oKGVbZl0sayk7ZWxzZSBrJiZwLmIoZSxrLCEwKSxwLmIoZSxmKX19fX1mdW5jdGlvbiBTZChhKXtpZihhPXJhW2FdKWEuX2FwcGx5U2hpbUN1cnJlbnRWZXJzaW9uPWEuX2FwcGx5U2hpbUN1cnJlbnRWZXJzaW9ufHwwLGEuX2FwcGx5U2hpbVZhbGlkYXRpbmdWZXJzaW9uPWEuX2FwcGx5U2hpbVZhbGlkYXRpbmdWZXJzaW9ufHwwLGEuX2FwcGx5U2hpbU5leHRWZXJzaW9uPShhLl9hcHBseVNoaW1OZXh0VmVyc2lvbnx8MCkrMX1mdW5jdGlvbiBLYyhhKXtyZXR1cm4gYS5fYXBwbHlTaGltQ3VycmVudFZlcnNpb249PT1hLl9hcHBseVNoaW1OZXh0VmVyc2lvbn1cbmZ1bmN0aW9uIFRkKGEpe2EuX2FwcGx5U2hpbVZhbGlkYXRpbmdWZXJzaW9uPWEuX2FwcGx5U2hpbU5leHRWZXJzaW9uO2EuYnx8KGEuYj0hMCxVZC50aGVuKGZ1bmN0aW9uKCl7YS5fYXBwbHlTaGltQ3VycmVudFZlcnNpb249YS5fYXBwbHlTaGltTmV4dFZlcnNpb247YS5iPSExfSkpfWZ1bmN0aW9uIHViKGEpe3JlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe0xjP0xjKGEpOihmYnx8KGZiPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGEpe2diPWF9KSxcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlP2diKCk6ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixmdW5jdGlvbigpe1wiY29tcGxldGVcIj09PWRvY3VtZW50LnJlYWR5U3RhdGUmJmdiKCl9KSksZmIudGhlbihmdW5jdGlvbigpe2EmJmEoKX0pKX0pfShmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEsYil7aWYoXCJmdW5jdGlvblwiPT09dHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudClyZXR1cm4gbmV3IEN1c3RvbUV2ZW50KGEsXG5iKTt2YXIgYz1kb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO2MuaW5pdEN1c3RvbUV2ZW50KGEsISFiLmJ1YmJsZXMsISFiLmNhbmNlbGFibGUsYi5kZXRhaWwpO3JldHVybiBjfWZ1bmN0aW9uIGMoYSl7aWYobSlyZXR1cm4gYS5vd25lckRvY3VtZW50IT09ZG9jdW1lbnQ/YS5vd25lckRvY3VtZW50Om51bGw7dmFyIGI9YS5fX2ltcG9ydERvYztpZighYiYmYS5wYXJlbnROb2RlKXtiPWEucGFyZW50Tm9kZTtpZihcImZ1bmN0aW9uXCI9PT10eXBlb2YgYi5jbG9zZXN0KWI9Yi5jbG9zZXN0KFwibGlua1tyZWw9aW1wb3J0XVwiKTtlbHNlIGZvcig7IWgoYikmJihiPWIucGFyZW50Tm9kZSk7KTthLl9faW1wb3J0RG9jPWJ9cmV0dXJuIGJ9ZnVuY3Rpb24gZChhKXt2YXIgYj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1tyZWw9aW1wb3J0XTpub3QoW2ltcG9ydC1kZXBlbmRlbmN5XSlcIiksYz1iLmxlbmd0aDtjP2woYixmdW5jdGlvbihiKXtyZXR1cm4gayhiLGZ1bmN0aW9uKCl7MD09PVxuLS1jJiZhKCl9KX0pOmEoKX1mdW5jdGlvbiBlKGEpe2Z1bmN0aW9uIGIoKXtcImxvYWRpbmdcIiE9PWRvY3VtZW50LnJlYWR5U3RhdGUmJmRvY3VtZW50LmJvZHkmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGIpLGEoKSl9ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixiKTtiKCl9ZnVuY3Rpb24gZihhKXtlKGZ1bmN0aW9uKCl7cmV0dXJuIGQoZnVuY3Rpb24oKXtyZXR1cm4gYSYmYSgpfSl9KX1mdW5jdGlvbiBrKGEsYil7aWYoYS5fX2xvYWRlZCliJiZiKCk7ZWxzZSBpZihcInNjcmlwdFwiPT09YS5sb2NhbE5hbWUmJiFhLnNyY3x8XCJzdHlsZVwiPT09YS5sb2NhbE5hbWUmJiFhLmZpcnN0Q2hpbGQpYS5fX2xvYWRlZD0hMCxiJiZiKCk7ZWxzZXt2YXIgYz1mdW5jdGlvbihkKXthLnJlbW92ZUV2ZW50TGlzdGVuZXIoZC50eXBlLGMpO2EuX19sb2FkZWQ9ITA7YiYmYigpfTthLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsXG5jKTt6JiZcInN0eWxlXCI9PT1hLmxvY2FsTmFtZXx8YS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixjKX19ZnVuY3Rpb24gaChhKXtyZXR1cm4gYS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFJiZcImxpbmtcIj09PWEubG9jYWxOYW1lJiZcImltcG9ydFwiPT09YS5yZWx9ZnVuY3Rpb24gZygpe3ZhciBhPXRoaXM7dGhpcy5hPXt9O3RoaXMuYj0wO3RoaXMuZj1uZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihiKXtyZXR1cm4gYS5sKGIpfSk7dGhpcy5mLm9ic2VydmUoZG9jdW1lbnQuaGVhZCx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KTt0aGlzLmMoZG9jdW1lbnQpfWZ1bmN0aW9uIGwoYSxiLGMpe3ZhciBkPWE/YS5sZW5ndGg6MCxlPWM/LTE6MTtmb3IoYz1jP2QtMTowO2M8ZCYmMDw9YztjKz1lKWIoYVtjXSxjKX12YXIgbT1cImltcG9ydFwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIiksbj1udWxsOyExPT09XCJjdXJyZW50U2NyaXB0XCJpbiBkb2N1bWVudCYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGRvY3VtZW50LFxuXCJjdXJyZW50U2NyaXB0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiBufHwoXCJjb21wbGV0ZVwiIT09ZG9jdW1lbnQucmVhZHlTdGF0ZT9kb2N1bWVudC5zY3JpcHRzW2RvY3VtZW50LnNjcmlwdHMubGVuZ3RoLTFdOm51bGwpfSxjb25maWd1cmFibGU6ITB9KTt2YXIgcT0vKHVybFxcKCkoW14pXSopKFxcKSkvZyx0PS8oQGltcG9ydFtcXHNdKyg/IXVybFxcKCkpKFteO10qKSg7KS9nLHU9Lyg8bGlua1tePl0qKShyZWw9Wyd8XCJdP3N0eWxlc2hlZXRbJ3xcIl0/W14+XSo+KS9nLHA9e1phOmZ1bmN0aW9uKGEsYil7YS5ocmVmJiZhLnNldEF0dHJpYnV0ZShcImhyZWZcIixwLiQoYS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLGIpKTthLnNyYyYmYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIixwLiQoYS5nZXRBdHRyaWJ1dGUoXCJzcmNcIiksYikpO2lmKFwic3R5bGVcIj09PWEubG9jYWxOYW1lKXt2YXIgYz1wLkNhKGEudGV4dENvbnRlbnQsYixxKTthLnRleHRDb250ZW50PXAuQ2EoYyxiLHQpfX0sQ2E6ZnVuY3Rpb24oYSxcbmIsYyl7cmV0dXJuIGEucmVwbGFjZShjLGZ1bmN0aW9uKGEsYyxkLGUpe2E9ZC5yZXBsYWNlKC9bXCInXS9nLFwiXCIpO2ImJihhPXAuJChhLGIpKTtyZXR1cm4gYytcIidcIithK1wiJ1wiK2V9KX0sJDpmdW5jdGlvbihhLGIpe2lmKHZvaWQgMD09PXAuaGEpe3AuaGE9ITE7dHJ5e3ZhciBjPW5ldyBVUkwoXCJiXCIsXCJodHRwOi8vYVwiKTtjLnBhdGhuYW1lPVwiYyUyMGRcIjtwLmhhPVwiaHR0cDovL2EvYyUyMGRcIj09PWMuaHJlZn1jYXRjaChzZSl7fX1pZihwLmhhKXJldHVybihuZXcgVVJMKGEsYikpLmhyZWY7Yz1wLlBhO2N8fChjPWRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcInRlbXBcIikscC5QYT1jLGMucGE9Yy5jcmVhdGVFbGVtZW50KFwiYmFzZVwiKSxjLmhlYWQuYXBwZW5kQ2hpbGQoYy5wYSksYy5vYT1jLmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTtjLnBhLmhyZWY9YjtjLm9hLmhyZWY9YTtyZXR1cm4gYy5vYS5ocmVmfHxhfX0sdj17YXN5bmM6ITAsbG9hZDpmdW5jdGlvbihhLFxuYixjKXtpZihhKWlmKGEubWF0Y2goL15kYXRhOi8pKXthPWEuc3BsaXQoXCIsXCIpO3ZhciBkPWFbMV07ZD0tMTxhWzBdLmluZGV4T2YoXCI7YmFzZTY0XCIpP2F0b2IoZCk6ZGVjb2RlVVJJQ29tcG9uZW50KGQpO2IoZCl9ZWxzZXt2YXIgZT1uZXcgWE1MSHR0cFJlcXVlc3Q7ZS5vcGVuKFwiR0VUXCIsYSx2LmFzeW5jKTtlLm9ubG9hZD1mdW5jdGlvbigpe3ZhciBhPWUucmVzcG9uc2VVUkx8fGUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJMb2NhdGlvblwiKTthJiYwPT09YS5pbmRleE9mKFwiL1wiKSYmKGE9KGxvY2F0aW9uLm9yaWdpbnx8bG9jYXRpb24ucHJvdG9jb2wrXCIvL1wiK2xvY2F0aW9uLmhvc3QpK2EpO3ZhciBkPWUucmVzcG9uc2V8fGUucmVzcG9uc2VUZXh0OzMwND09PWUuc3RhdHVzfHwwPT09ZS5zdGF0dXN8fDIwMDw9ZS5zdGF0dXMmJjMwMD5lLnN0YXR1cz9iKGQsYSk6YyhkKX07ZS5zZW5kKCl9ZWxzZSBjKFwiZXJyb3I6IGhyZWYgbXVzdCBiZSBzcGVjaWZpZWRcIil9fSx6PS9UcmlkZW50Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpfHxcbi9FZGdlXFwvXFxkLi9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7Zy5wcm90b3R5cGUuYz1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2E9YS5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1tyZWw9aW1wb3J0XVwiKTtsKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGIuaChhKX0pfTtnLnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsYz1hLmhyZWY7aWYodm9pZCAwIT09dGhpcy5hW2NdKXt2YXIgZD10aGlzLmFbY107ZCYmZC5fX2xvYWRlZCYmKGEuaW1wb3J0PWQsdGhpcy5nKGEpKX1lbHNlIHRoaXMuYisrLHRoaXMuYVtjXT1cInBlbmRpbmdcIix2LmxvYWQoYyxmdW5jdGlvbihhLGQpe2E9Yi5tKGEsZHx8Yyk7Yi5hW2NdPWE7Yi5iLS07Yi5jKGEpO2IuaSgpfSxmdW5jdGlvbigpe2IuYVtjXT1udWxsO2IuYi0tO2IuaSgpfSl9O2cucHJvdG90eXBlLm09ZnVuY3Rpb24oYSxiKXtpZighYSlyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO3omJihhPWEucmVwbGFjZSh1LFxuZnVuY3Rpb24oYSxiLGMpe3JldHVybi0xPT09YS5pbmRleE9mKFwidHlwZT1cIik/YitcIiB0eXBlPWltcG9ydC1kaXNhYmxlIFwiK2M6YX0pKTt2YXIgYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7Yy5pbm5lckhUTUw9YTtpZihjLmNvbnRlbnQpYT1jLmNvbnRlbnQ7ZWxzZSBmb3IoYT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7Yy5maXJzdENoaWxkOylhLmFwcGVuZENoaWxkKGMuZmlyc3RDaGlsZCk7aWYoYz1hLnF1ZXJ5U2VsZWN0b3IoXCJiYXNlXCIpKWI9cC4kKGMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSxiKSxjLnJlbW92ZUF0dHJpYnV0ZShcImhyZWZcIik7Yz1hLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPWltcG9ydF0sIGxpbmtbcmVsPXN0eWxlc2hlZXRdW2hyZWZdW3R5cGU9aW1wb3J0LWRpc2FibGVdLFxcbiAgICBzdHlsZTpub3QoW3R5cGVdKSwgbGlua1tyZWw9c3R5bGVzaGVldF1baHJlZl06bm90KFt0eXBlXSksXFxuICAgIHNjcmlwdDpub3QoW3R5cGVdKSwgc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCJdLFxcbiAgICBzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXScpO1xudmFyIGQ9MDtsKGMsZnVuY3Rpb24oYSl7ayhhKTtwLlphKGEsYik7YS5zZXRBdHRyaWJ1dGUoXCJpbXBvcnQtZGVwZW5kZW5jeVwiLFwiXCIpO1wic2NyaXB0XCI9PT1hLmxvY2FsTmFtZSYmIWEuc3JjJiZhLnRleHRDb250ZW50JiYoYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIixcImRhdGE6dGV4dC9qYXZhc2NyaXB0O2NoYXJzZXQ9dXRmLTgsXCIrZW5jb2RlVVJJQ29tcG9uZW50KGEudGV4dENvbnRlbnQrKFwiXFxuLy8jIHNvdXJjZVVSTD1cIitiKyhkP1wiLVwiK2Q6XCJcIikrXCIuanNcXG5cIikpKSxhLnRleHRDb250ZW50PVwiXCIsZCsrKX0pO3JldHVybiBhfTtnLnByb3RvdHlwZS5pPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcztpZighdGhpcy5iKXt0aGlzLmYuZGlzY29ubmVjdCgpO3RoaXMuZmxhdHRlbihkb2N1bWVudCk7dmFyIGI9ITEsYz0hMSxkPWZ1bmN0aW9uKCl7YyYmYiYmKGEuYyhkb2N1bWVudCksYS5ifHwoYS5mLm9ic2VydmUoZG9jdW1lbnQuaGVhZCx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KSxhLmooKSkpfTtcbnRoaXMucyhmdW5jdGlvbigpe2M9ITA7ZCgpfSk7dGhpcy5vKGZ1bmN0aW9uKCl7Yj0hMDtkKCl9KX19O2cucHJvdG90eXBlLmZsYXR0ZW49ZnVuY3Rpb24oYSl7dmFyIGI9dGhpczthPWEucXVlcnlTZWxlY3RvckFsbChcImxpbmtbcmVsPWltcG9ydF1cIik7bChhLGZ1bmN0aW9uKGEpe3ZhciBjPWIuYVthLmhyZWZdOyhhLmltcG9ydD1jKSYmYy5ub2RlVHlwZT09PU5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSYmKGIuYVthLmhyZWZdPWEsYS5yZWFkeVN0YXRlPVwibG9hZGluZ1wiLGEuaW1wb3J0PWEsYi5mbGF0dGVuKGMpLGEuYXBwZW5kQ2hpbGQoYykpfSl9O2cucHJvdG90eXBlLm89ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihlKXtpZihlPGQpe3ZhciBmPWNbZV0sZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2YucmVtb3ZlQXR0cmlidXRlKFwiaW1wb3J0LWRlcGVuZGVuY3lcIik7bChmLmF0dHJpYnV0ZXMsZnVuY3Rpb24oYSl7cmV0dXJuIGcuc2V0QXR0cmlidXRlKGEubmFtZSxcbmEudmFsdWUpfSk7bj1nO2YucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZyxmKTtrKGcsZnVuY3Rpb24oKXtuPW51bGw7YihlKzEpfSl9ZWxzZSBhKCl9dmFyIGM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFtpbXBvcnQtZGVwZW5kZW5jeV1cIiksZD1jLmxlbmd0aDtiKDApfTtnLnByb3RvdHlwZS5zPWZ1bmN0aW9uKGEpe3ZhciBiPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdHlsZVtpbXBvcnQtZGVwZW5kZW5jeV0sXFxuICAgIGxpbmtbcmVsPXN0eWxlc2hlZXRdW2ltcG9ydC1kZXBlbmRlbmN5XVwiKSxkPWIubGVuZ3RoO2lmKGQpe3ZhciBlPXomJiEhZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpbmtbcmVsPXN0eWxlc2hlZXRdW2hyZWZdW3R5cGU9aW1wb3J0LWRpc2FibGVdXCIpO2woYixmdW5jdGlvbihiKXtrKGIsZnVuY3Rpb24oKXtiLnJlbW92ZUF0dHJpYnV0ZShcImltcG9ydC1kZXBlbmRlbmN5XCIpOzA9PT0tLWQmJmEoKX0pO2lmKGUmJmIucGFyZW50Tm9kZSE9PVxuZG9jdW1lbnQuaGVhZCl7dmFyIGY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChiLmxvY2FsTmFtZSk7Zi5fX2FwcGxpZWRFbGVtZW50PWI7Zi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJpbXBvcnQtcGxhY2Vob2xkZXJcIik7Yi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmLGIubmV4dFNpYmxpbmcpO2ZvcihmPWMoYik7ZiYmYyhmKTspZj1jKGYpO2YucGFyZW50Tm9kZSE9PWRvY3VtZW50LmhlYWQmJihmPW51bGwpO2RvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGIsZik7Yi5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpfX0pfWVsc2UgYSgpfTtnLnByb3RvdHlwZS5qPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxiPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rW3JlbD1pbXBvcnRdXCIpO2woYixmdW5jdGlvbihiKXtyZXR1cm4gYS5nKGIpfSwhMCl9O2cucHJvdG90eXBlLmc9ZnVuY3Rpb24oYSl7YS5fX2xvYWRlZHx8KGEuX19sb2FkZWQ9ITAsYS5pbXBvcnQmJihhLmltcG9ydC5yZWFkeVN0YXRlPVxuXCJjb21wbGV0ZVwiKSxhLmRpc3BhdGNoRXZlbnQoYihhLmltcG9ydD9cImxvYWRcIjpcImVycm9yXCIse2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMSxkZXRhaWw6dm9pZCAwfSkpKX07Zy5wcm90b3R5cGUubD1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2woYSxmdW5jdGlvbihhKXtyZXR1cm4gbChhLmFkZGVkTm9kZXMsZnVuY3Rpb24oYSl7YSYmYS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFJiYoaChhKT9iLmgoYSk6Yi5jKGEpKX0pfSl9O2lmKG0pe3ZhciB4PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rW3JlbD1pbXBvcnRdXCIpO2woeCxmdW5jdGlvbihhKXthLmltcG9ydCYmXCJsb2FkaW5nXCI9PT1hLmltcG9ydC5yZWFkeVN0YXRlfHwoYS5fX2xvYWRlZD0hMCl9KTt4PWZ1bmN0aW9uKGEpe2E9YS50YXJnZXQ7aChhKSYmKGEuX19sb2FkZWQ9ITApfTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLHgsITApO2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLFxueCwhMCl9ZWxzZXt2YXIgeT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE5vZGUucHJvdG90eXBlLFwiYmFzZVVSSVwiKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoKCF5fHx5LmNvbmZpZ3VyYWJsZT9Ob2RlOkVsZW1lbnQpLnByb3RvdHlwZSxcImJhc2VVUklcIix7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9aCh0aGlzKT90aGlzOmModGhpcyk7cmV0dXJuIGE/YS5ocmVmOnkmJnkuZ2V0P3kuZ2V0LmNhbGwodGhpcyk6KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJiYXNlXCIpfHx3aW5kb3cubG9jYXRpb24pLmhyZWZ9LGNvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwfSk7ZShmdW5jdGlvbigpe3JldHVybiBuZXcgZ30pfWYoZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChiKFwiSFRNTEltcG9ydHNMb2FkZWRcIix7Y2FuY2VsYWJsZTohMCxidWJibGVzOiEwLGRldGFpbDp2b2lkIDB9KSl9KTthLnVzZU5hdGl2ZT1tO2Eud2hlblJlYWR5PWY7YS5pbXBvcnRGb3JFbGVtZW50PVxuY30pKHdpbmRvdy5IVE1MSW1wb3J0cz13aW5kb3cuSFRNTEltcG9ydHN8fHt9KTt2YXIgRT13aW5kb3cuU2hhZHlET018fHt9O0UuJGE9ISghRWxlbWVudC5wcm90b3R5cGUuYXR0YWNoU2hhZG93fHwhTm9kZS5wcm90b3R5cGUuZ2V0Um9vdE5vZGUpO3ZhciBoYj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE5vZGUucHJvdG90eXBlLFwiZmlyc3RDaGlsZFwiKTtFLlM9ISEoaGImJmhiLmNvbmZpZ3VyYWJsZSYmaGIuZ2V0KTtFLnphPUUuZm9yY2V8fCFFLiRhO3ZhciBYPUVsZW1lbnQucHJvdG90eXBlLE1jPVgubWF0Y2hlc3x8WC5tYXRjaGVzU2VsZWN0b3J8fFgubW96TWF0Y2hlc1NlbGVjdG9yfHxYLm1zTWF0Y2hlc1NlbGVjdG9yfHxYLm9NYXRjaGVzU2VsZWN0b3J8fFgud2Via2l0TWF0Y2hlc1NlbGVjdG9yLFBhPWRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpLExiPTAsT2E9W107KG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKCl7Zm9yKDtPYS5sZW5ndGg7KXRyeXtPYS5zaGlmdCgpKCl9Y2F0Y2goYSl7dGhyb3cgUGEudGV4dENvbnRlbnQ9XG5MYisrLGE7fX0pKS5vYnNlcnZlKFBhLHtjaGFyYWN0ZXJEYXRhOiEwfSk7dmFyIFZkPSEhZG9jdW1lbnQuY29udGFpbnMsYWE9W10sUWE7bWEubGlzdD1hYTtsYS5wcm90b3R5cGUuaGI9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO3RoaXMuYXx8KHRoaXMuYT0hMCxLYihmdW5jdGlvbigpe2EuYigpfSkpfTtsYS5wcm90b3R5cGUuYj1mdW5jdGlvbigpe2lmKHRoaXMuYSl7dGhpcy5hPSExO3ZhciBhPXRoaXMudGFrZVJlY29yZHMoKTthLmxlbmd0aCYmdGhpcy5YLmZvckVhY2goZnVuY3Rpb24oYil7YihhKX0pfX07bGEucHJvdG90eXBlLnRha2VSZWNvcmRzPWZ1bmN0aW9uKCl7aWYodGhpcy5hZGRlZE5vZGVzLmxlbmd0aHx8dGhpcy5yZW1vdmVkTm9kZXMubGVuZ3RoKXt2YXIgYT1be2FkZGVkTm9kZXM6dGhpcy5hZGRlZE5vZGVzLHJlbW92ZWROb2Rlczp0aGlzLnJlbW92ZWROb2Rlc31dO3RoaXMuYWRkZWROb2Rlcz1bXTt0aGlzLnJlbW92ZWROb2Rlcz1bXTtyZXR1cm4gYX1yZXR1cm5bXX07XG52YXIgY2M9RWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQsWGE9RWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlLGJhPUVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkLGtjPUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZSxOYz1FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGUsaWI9RWxlbWVudC5wcm90b3R5cGUuY2xvbmVOb2RlLFlhPURvY3VtZW50LnByb3RvdHlwZS5pbXBvcnROb2RlLHNjPUVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIsdmM9RWxlbWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcixyYz1XaW5kb3cucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIsdWM9V2luZG93LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyLGpiPUVsZW1lbnQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQsY2E9Tm9kZS5wcm90b3R5cGUuY29udGFpbnN8fEhUTUxFbGVtZW50LnByb3RvdHlwZS5jb250YWlucyxXZD1PYmplY3QuZnJlZXplKHthcHBlbmRDaGlsZDpjYyxcbmluc2VydEJlZm9yZTpYYSxyZW1vdmVDaGlsZDpiYSxzZXRBdHRyaWJ1dGU6a2MscmVtb3ZlQXR0cmlidXRlOk5jLGNsb25lTm9kZTppYixpbXBvcnROb2RlOllhLGFkZEV2ZW50TGlzdGVuZXI6c2MscmVtb3ZlRXZlbnRMaXN0ZW5lcjp2YyxyYjpyYyxzYjp1YyxkaXNwYXRjaEV2ZW50OmpiLHF1ZXJ5U2VsZWN0b3I6RWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3RvcixxdWVyeVNlbGVjdG9yQWxsOkVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwsY29udGFpbnM6Y2F9KSxDZD0vWyZcXHUwMEEwXCJdL2csRmQ9L1smXFx1MDBBMDw+XS9nLERkPVBiKFwiYXJlYSBiYXNlIGJyIGNvbCBjb21tYW5kIGVtYmVkIGhyIGltZyBpbnB1dCBrZXlnZW4gbGluayBtZXRhIHBhcmFtIHNvdXJjZSB0cmFjayB3YnJcIi5zcGxpdChcIiBcIikpLEVkPVBiKFwic3R5bGUgc2NyaXB0IHhtcCBpZnJhbWUgbm9lbWJlZCBub2ZyYW1lcyBwbGFpbnRleHQgbm9zY3JpcHRcIi5zcGxpdChcIiBcIikpLEM9ZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihkb2N1bWVudCxcbk5vZGVGaWx0ZXIuU0hPV19BTEwsbnVsbCwhMSksRD1kb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGRvY3VtZW50LE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULG51bGwsITEpLFhkPU9iamVjdC5mcmVlemUoe3BhcmVudE5vZGU6VSxmaXJzdENoaWxkOkthLGxhc3RDaGlsZDpMYSxwcmV2aW91c1NpYmxpbmc6UWIsbmV4dFNpYmxpbmc6UmIsY2hpbGROb2RlczpTLHBhcmVudEVsZW1lbnQ6U2IsZmlyc3RFbGVtZW50Q2hpbGQ6VGIsbGFzdEVsZW1lbnRDaGlsZDpVYixwcmV2aW91c0VsZW1lbnRTaWJsaW5nOlZiLG5leHRFbGVtZW50U2libGluZzpXYixjaGlsZHJlbjpYYixpbm5lckhUTUw6WWIsdGV4dENvbnRlbnQ6WmJ9KSxrYj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnQucHJvdG90eXBlLFwiaW5uZXJIVE1MXCIpfHxPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEhUTUxFbGVtZW50LnByb3RvdHlwZSxcImlubmVySFRNTFwiKSxzYT1kb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJpbmVydFwiKS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxubGI9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihEb2N1bWVudC5wcm90b3R5cGUsXCJhY3RpdmVFbGVtZW50XCIpLCRiPXtwYXJlbnRFbGVtZW50OntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5wYXJlbnROb2RlO2EmJmEubm9kZVR5cGUhPT1Ob2RlLkVMRU1FTlRfTk9ERSYmKGE9bnVsbCk7cmV0dXJuIHZvaWQgMCE9PWE/YTpTYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxwYXJlbnROb2RlOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5wYXJlbnROb2RlO3JldHVybiB2b2lkIDAhPT1hP2E6VSh0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxuZXh0U2libGluZzp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkubmV4dFNpYmxpbmc7cmV0dXJuIHZvaWQgMCE9PWE/YTpSYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxwcmV2aW91c1NpYmxpbmc6e2dldDpmdW5jdGlvbigpe3ZhciBhPVxudGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nO3JldHVybiB2b2lkIDAhPT1hP2E6UWIodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sY2xhc3NOYW1lOntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKXx8XCJcIn0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixhKX0sY29uZmlndXJhYmxlOiEwfSxuZXh0RWxlbWVudFNpYmxpbmc6e2dldDpmdW5jdGlvbigpe2lmKHRoaXMuX19zaGFkeSYmdm9pZCAwIT09dGhpcy5fX3NoYWR5Lm5leHRTaWJsaW5nKXtmb3IodmFyIGE9dGhpcy5uZXh0U2libGluZzthJiZhLm5vZGVUeXBlIT09Tm9kZS5FTEVNRU5UX05PREU7KWE9YS5uZXh0U2libGluZztyZXR1cm4gYX1yZXR1cm4gV2IodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0scHJldmlvdXNFbGVtZW50U2libGluZzp7Z2V0OmZ1bmN0aW9uKCl7aWYodGhpcy5fX3NoYWR5JiZ2b2lkIDAhPT10aGlzLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nKXtmb3IodmFyIGE9XG50aGlzLnByZXZpb3VzU2libGluZzthJiZhLm5vZGVUeXBlIT09Tm9kZS5FTEVNRU5UX05PREU7KWE9YS5wcmV2aW91c1NpYmxpbmc7cmV0dXJuIGF9cmV0dXJuIFZiKHRoaXMpfSxjb25maWd1cmFibGU6ITB9fSxTYT17Y2hpbGROb2Rlczp7Z2V0OmZ1bmN0aW9uKCl7aWYoVCh0aGlzKSl7aWYoIXRoaXMuX19zaGFkeS5jaGlsZE5vZGVzKXt0aGlzLl9fc2hhZHkuY2hpbGROb2Rlcz1bXTtmb3IodmFyIGE9dGhpcy5maXJzdENoaWxkO2E7YT1hLm5leHRTaWJsaW5nKXRoaXMuX19zaGFkeS5jaGlsZE5vZGVzLnB1c2goYSl9dmFyIGI9dGhpcy5fX3NoYWR5LmNoaWxkTm9kZXN9ZWxzZSBiPVModGhpcyk7Yi5pdGVtPWZ1bmN0aW9uKGEpe3JldHVybiBiW2FdfTtyZXR1cm4gYn0sY29uZmlndXJhYmxlOiEwfSxjaGlsZEVsZW1lbnRDb3VudDp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RofSxjb25maWd1cmFibGU6ITB9LGZpcnN0Q2hpbGQ6e2dldDpmdW5jdGlvbigpe3ZhciBhPVxudGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkuZmlyc3RDaGlsZDtyZXR1cm4gdm9pZCAwIT09YT9hOkthKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LGxhc3RDaGlsZDp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkubGFzdENoaWxkO3JldHVybiB2b2lkIDAhPT1hP2E6TGEodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sdGV4dENvbnRlbnQ6e2dldDpmdW5jdGlvbigpe2lmKFQodGhpcykpe2Zvcih2YXIgYT1bXSxiPTAsYz10aGlzLmNoaWxkTm9kZXMsZDtkPWNbYl07YisrKWQubm9kZVR5cGUhPT1Ob2RlLkNPTU1FTlRfTk9ERSYmYS5wdXNoKGQudGV4dENvbnRlbnQpO3JldHVybiBhLmpvaW4oXCJcIil9cmV0dXJuIFpiKHRoaXMpfSxzZXQ6ZnVuY3Rpb24oYSl7c3dpdGNoKHRoaXMubm9kZVR5cGUpe2Nhc2UgTm9kZS5FTEVNRU5UX05PREU6Y2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6Zm9yKDt0aGlzLmZpcnN0Q2hpbGQ7KXRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKTtcbigwPGEubGVuZ3RofHx0aGlzLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUpJiZ0aGlzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGEpKTticmVhaztkZWZhdWx0OnRoaXMubm9kZVZhbHVlPWF9fSxjb25maWd1cmFibGU6ITB9LGZpcnN0RWxlbWVudENoaWxkOntnZXQ6ZnVuY3Rpb24oKXtpZih0aGlzLl9fc2hhZHkmJnZvaWQgMCE9PXRoaXMuX19zaGFkeS5maXJzdENoaWxkKXtmb3IodmFyIGE9dGhpcy5maXJzdENoaWxkO2EmJmEubm9kZVR5cGUhPT1Ob2RlLkVMRU1FTlRfTk9ERTspYT1hLm5leHRTaWJsaW5nO3JldHVybiBhfXJldHVybiBUYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxsYXN0RWxlbWVudENoaWxkOntnZXQ6ZnVuY3Rpb24oKXtpZih0aGlzLl9fc2hhZHkmJnZvaWQgMCE9PXRoaXMuX19zaGFkeS5sYXN0Q2hpbGQpe2Zvcih2YXIgYT10aGlzLmxhc3RDaGlsZDthJiZhLm5vZGVUeXBlIT09Tm9kZS5FTEVNRU5UX05PREU7KWE9YS5wcmV2aW91c1NpYmxpbmc7XG5yZXR1cm4gYX1yZXR1cm4gVWIodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sY2hpbGRyZW46e2dldDpmdW5jdGlvbigpe3ZhciBhO1QodGhpcyk/YT1BcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwodGhpcy5jaGlsZE5vZGVzLGZ1bmN0aW9uKGEpe3JldHVybiBhLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREV9KTphPVhiKHRoaXMpO2EuaXRlbT1mdW5jdGlvbihiKXtyZXR1cm4gYVtiXX07cmV0dXJuIGF9LGNvbmZpZ3VyYWJsZTohMH0saW5uZXJIVE1MOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1cInRlbXBsYXRlXCI9PT10aGlzLmxvY2FsTmFtZT90aGlzLmNvbnRlbnQ6dGhpcztyZXR1cm4gVCh0aGlzKT9SYShhKTpZYihhKX0sc2V0OmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1cInRlbXBsYXRlXCI9PT10aGlzLmxvY2FsTmFtZT90aGlzLmNvbnRlbnQ6dGhpcztiLmZpcnN0Q2hpbGQ7KWIucmVtb3ZlQ2hpbGQoYi5maXJzdENoaWxkKTtmb3Ioa2ImJmtiLnNldD9rYi5zZXQuY2FsbChzYSxhKTpcbnNhLmlubmVySFRNTD1hO3NhLmZpcnN0Q2hpbGQ7KWIuYXBwZW5kQ2hpbGQoc2EuZmlyc3RDaGlsZCl9LGNvbmZpZ3VyYWJsZTohMH19LE9jPXtzaGFkb3dSb290OntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkuZmJ8fG51bGx9LGNvbmZpZ3VyYWJsZTohMH19LFRhPXthY3RpdmVFbGVtZW50OntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1sYiYmbGIuZ2V0P2xiLmdldC5jYWxsKGRvY3VtZW50KTpFLlM/dm9pZCAwOmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7aWYoYSYmYS5ub2RlVHlwZSl7dmFyIGI9ISFHKHRoaXMpO2lmKHRoaXM9PT1kb2N1bWVudHx8YiYmdGhpcy5ob3N0IT09YSYmY2EuY2FsbCh0aGlzLmhvc3QsYSkpe2ZvcihiPVooYSk7YiYmYiE9PXRoaXM7KWE9Yi5ob3N0LGI9WihhKTthPXRoaXM9PT1kb2N1bWVudD9iP251bGw6YTpiPT09dGhpcz9hOm51bGx9ZWxzZSBhPW51bGx9ZWxzZSBhPW51bGw7cmV0dXJuIGF9LHNldDpmdW5jdGlvbigpe30sXG5jb25maWd1cmFibGU6ITB9fSxKYj1FLlM/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKGEpe2EuX19zaGFkeSYmYS5fX3NoYWR5Lk5hfHwoYS5fX3NoYWR5PWEuX19zaGFkeXx8e30sYS5fX3NoYWR5Lk5hPSEwLEsoYSwkYiwhMCkpfSxJYj1FLlM/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKGEpe2EuX19zaGFkeSYmYS5fX3NoYWR5LkxhfHwoYS5fX3NoYWR5PWEuX19zaGFkeXx8e30sYS5fX3NoYWR5LkxhPSEwLEsoYSxTYSwhMCksSyhhLE9jLCEwKSl9LG9hPW51bGwsZGE9XCJfX2V2ZW50V3JhcHBlcnNcIitEYXRlLm5vdygpLFlkPXtibHVyOiEwLGZvY3VzOiEwLGZvY3VzaW46ITAsZm9jdXNvdXQ6ITAsY2xpY2s6ITAsZGJsY2xpY2s6ITAsbW91c2Vkb3duOiEwLG1vdXNlZW50ZXI6ITAsbW91c2VsZWF2ZTohMCxtb3VzZW1vdmU6ITAsbW91c2VvdXQ6ITAsbW91c2VvdmVyOiEwLG1vdXNldXA6ITAsd2hlZWw6ITAsYmVmb3JlaW5wdXQ6ITAsaW5wdXQ6ITAsa2V5ZG93bjohMCxrZXl1cDohMCxjb21wb3NpdGlvbnN0YXJ0OiEwLFxuY29tcG9zaXRpb251cGRhdGU6ITAsY29tcG9zaXRpb25lbmQ6ITAsdG91Y2hzdGFydDohMCx0b3VjaGVuZDohMCx0b3VjaG1vdmU6ITAsdG91Y2hjYW5jZWw6ITAscG9pbnRlcm92ZXI6ITAscG9pbnRlcmVudGVyOiEwLHBvaW50ZXJkb3duOiEwLHBvaW50ZXJtb3ZlOiEwLHBvaW50ZXJ1cDohMCxwb2ludGVyY2FuY2VsOiEwLHBvaW50ZXJvdXQ6ITAscG9pbnRlcmxlYXZlOiEwLGdvdHBvaW50ZXJjYXB0dXJlOiEwLGxvc3Rwb2ludGVyY2FwdHVyZTohMCxkcmFnc3RhcnQ6ITAsZHJhZzohMCxkcmFnZW50ZXI6ITAsZHJhZ2xlYXZlOiEwLGRyYWdvdmVyOiEwLGRyb3A6ITAsZHJhZ2VuZDohMCxET01BY3RpdmF0ZTohMCxET01Gb2N1c0luOiEwLERPTUZvY3VzT3V0OiEwLGtleXByZXNzOiEwfSx3Yz17Z2V0IGNvbXBvc2VkKCl7ITEhPT10aGlzLmlzVHJ1c3RlZCYmdm9pZCAwPT09dGhpcy5lYSYmKHRoaXMuZWE9WWRbdGhpcy50eXBlXSk7cmV0dXJuIHRoaXMuZWF8fCExfSxjb21wb3NlZFBhdGg6ZnVuY3Rpb24oKXt0aGlzLnFhfHxcbih0aGlzLnFhPVphKHRoaXMuX190YXJnZXQsdGhpcy5jb21wb3NlZCkpO3JldHVybiB0aGlzLnFhfSxnZXQgdGFyZ2V0KCl7cmV0dXJuIG1jKHRoaXMuY3VycmVudFRhcmdldCx0aGlzLmNvbXBvc2VkUGF0aCgpKX0sZ2V0IHJlbGF0ZWRUYXJnZXQoKXtpZighdGhpcy5yYSlyZXR1cm4gbnVsbDt0aGlzLnNhfHwodGhpcy5zYT1aYSh0aGlzLnJhLCEwKSk7cmV0dXJuIG1jKHRoaXMuY3VycmVudFRhcmdldCx0aGlzLnNhKX0sc3RvcFByb3BhZ2F0aW9uOmZ1bmN0aW9uKCl7RXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbi5jYWxsKHRoaXMpO3RoaXMuZmE9ITB9LHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpmdW5jdGlvbigpe0V2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24uY2FsbCh0aGlzKTt0aGlzLmZhPXRoaXMuS2E9ITB9fSxhYj17Zm9jdXM6ITAsYmx1cjohMH0sWmQ9JGEod2luZG93LkV2ZW50KSwkZD0kYSh3aW5kb3cuQ3VzdG9tRXZlbnQpLGFlPVxuJGEod2luZG93Lk1vdXNlRXZlbnQpLEhiPXt9O2wucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUpO2wucHJvdG90eXBlLkY9ZnVuY3Rpb24oYSxiKXt0aGlzLk1hPVwiU2hhZHlSb290XCI7a2EoYSk7a2EodGhpcyk7dGhpcy5ob3N0PWE7dGhpcy5IPWImJmIubW9kZTthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTthLl9fc2hhZHkucm9vdD10aGlzO2EuX19zaGFkeS5mYj1cImNsb3NlZFwiIT09dGhpcy5IP3RoaXM6bnVsbDt0aGlzLlA9ITE7dGhpcy5iPVtdO3RoaXMuYT17fTt0aGlzLmM9W107Yj1TKGEpO2Zvcih2YXIgYz0wLGQ9Yi5sZW5ndGg7YzxkO2MrKyliYS5jYWxsKGEsYltjXSl9O2wucHJvdG90eXBlLkw9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO3RoaXMuUHx8KHRoaXMuUD0hMCxOYihmdW5jdGlvbigpe3JldHVybiBhLnZhKCl9KSl9O2wucHJvdG90eXBlLks9ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcyxiPXRoaXM7YjspYi5QJiYoYT1iKSxcbmI9Yi5VYSgpO3JldHVybiBhfTtsLnByb3RvdHlwZS5VYT1mdW5jdGlvbigpe3ZhciBhPXRoaXMuaG9zdC5nZXRSb290Tm9kZSgpO2lmKEcoYSkpZm9yKHZhciBiPXRoaXMuaG9zdC5jaGlsZE5vZGVzLGM9MCxkO2M8Yi5sZW5ndGg7YysrKWlmKGQ9YltjXSx0aGlzLmooZCkpcmV0dXJuIGF9O2wucHJvdG90eXBlLnZhPWZ1bmN0aW9uKCl7dGhpcy5QJiZ0aGlzLksoKS5fcmVuZGVyUm9vdCgpfTtsLnByb3RvdHlwZS5fcmVuZGVyUm9vdD1mdW5jdGlvbigpe3RoaXMuUD0hMTt0aGlzLkIoKTt0aGlzLnMoKX07bC5wcm90b3R5cGUuQj1mdW5jdGlvbigpe3RoaXMuZigpO2Zvcih2YXIgYT0wLGI7YTx0aGlzLmIubGVuZ3RoO2ErKyliPXRoaXMuYlthXSx0aGlzLm8oYik7Zm9yKGI9dGhpcy5ob3N0LmZpcnN0Q2hpbGQ7YjtiPWIubmV4dFNpYmxpbmcpdGhpcy5oKGIpO2ZvcihhPTA7YTx0aGlzLmIubGVuZ3RoO2ErKyl7Yj10aGlzLmJbYV07aWYoIWIuX19zaGFkeS5hc3NpZ25lZE5vZGVzLmxlbmd0aClmb3IodmFyIGM9XG5iLmZpcnN0Q2hpbGQ7YztjPWMubmV4dFNpYmxpbmcpdGhpcy5oKGMsYik7Yz1iLnBhcmVudE5vZGU7KGM9Yy5fX3NoYWR5JiZjLl9fc2hhZHkucm9vdCkmJmMudGEoKSYmYy5fcmVuZGVyUm9vdCgpO3RoaXMuZyhiLl9fc2hhZHkuUixiLl9fc2hhZHkuYXNzaWduZWROb2Rlcyk7aWYoYz1iLl9fc2hhZHkudWEpe2Zvcih2YXIgZD0wO2Q8Yy5sZW5ndGg7ZCsrKWNbZF0uX19zaGFkeS5pYT1udWxsO2IuX19zaGFkeS51YT1udWxsO2MubGVuZ3RoPmIuX19zaGFkeS5hc3NpZ25lZE5vZGVzLmxlbmd0aCYmKGIuX19zaGFkeS5rYT0hMCl9Yi5fX3NoYWR5LmthJiYoYi5fX3NoYWR5LmthPSExLHRoaXMuaShiKSl9fTtsLnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEsYil7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307dmFyIGM9YS5fX3NoYWR5LmlhO2EuX19zaGFkeS5pYT1udWxsO2J8fChiPShiPXRoaXMuYVthLnNsb3R8fFwiX19jYXRjaGFsbFwiXSkmJmJbMF0pO2I/KGIuX19zaGFkeS5hc3NpZ25lZE5vZGVzLnB1c2goYSksXG5hLl9fc2hhZHkuYXNzaWduZWRTbG90PWIpOmEuX19zaGFkeS5hc3NpZ25lZFNsb3Q9dm9pZCAwO2MhPT1hLl9fc2hhZHkuYXNzaWduZWRTbG90JiZhLl9fc2hhZHkuYXNzaWduZWRTbG90JiYoYS5fX3NoYWR5LmFzc2lnbmVkU2xvdC5fX3NoYWR5LmthPSEwKX07bC5wcm90b3R5cGUubz1mdW5jdGlvbihhKXt2YXIgYj1hLl9fc2hhZHkuYXNzaWduZWROb2RlczthLl9fc2hhZHkuYXNzaWduZWROb2Rlcz1bXTthLl9fc2hhZHkuUj1bXTtpZihhLl9fc2hhZHkudWE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl7dmFyIGQ9YltjXTtkLl9fc2hhZHkuaWE9ZC5fX3NoYWR5LmFzc2lnbmVkU2xvdDtkLl9fc2hhZHkuYXNzaWduZWRTbG90PT09YSYmKGQuX19zaGFkeS5hc3NpZ25lZFNsb3Q9bnVsbCl9fTtsLnByb3RvdHlwZS5nPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPTAsZDtjPGIubGVuZ3RoJiYoZD1iW2NdKTtjKyspXCJzbG90XCI9PWQubG9jYWxOYW1lP3RoaXMuZyhhLGQuX19zaGFkeS5hc3NpZ25lZE5vZGVzKTpcbmEucHVzaChiW2NdKX07bC5wcm90b3R5cGUuaT1mdW5jdGlvbihhKXtqYi5jYWxsKGEsbmV3IEV2ZW50KFwic2xvdGNoYW5nZVwiKSk7YS5fX3NoYWR5LmFzc2lnbmVkU2xvdCYmdGhpcy5pKGEuX19zaGFkeS5hc3NpZ25lZFNsb3QpfTtsLnByb3RvdHlwZS5zPWZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuYixiPVtdLGM9MDtjPGEubGVuZ3RoO2MrKyl7dmFyIGQ9YVtjXS5wYXJlbnROb2RlO2QuX19zaGFkeSYmZC5fX3NoYWR5LnJvb3R8fCEoMD5iLmluZGV4T2YoZCkpfHxiLnB1c2goZCl9Zm9yKGE9MDthPGIubGVuZ3RoO2ErKyljPWJbYV0sdGhpcy5PKGM9PT10aGlzP3RoaXMuaG9zdDpjLHRoaXMudyhjKSl9O2wucHJvdG90eXBlLnc9ZnVuY3Rpb24oYSl7dmFyIGI9W107YT1hLmNoaWxkTm9kZXM7Zm9yKHZhciBjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWFbY107aWYodGhpcy5qKGQpKXtkPWQuX19zaGFkeS5SO2Zvcih2YXIgZT0wO2U8ZC5sZW5ndGg7ZSsrKWIucHVzaChkW2VdKX1lbHNlIGIucHVzaChkKX1yZXR1cm4gYn07XG5sLnByb3RvdHlwZS5qPWZ1bmN0aW9uKGEpe3JldHVyblwic2xvdFwiPT1hLmxvY2FsTmFtZX07bC5wcm90b3R5cGUuTz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1TKGEpLGQ9SWQoYixiLmxlbmd0aCxjLGMubGVuZ3RoKSxlPTAsZj0wLGs7ZTxkLmxlbmd0aCYmKGs9ZFtlXSk7ZSsrKXtmb3IodmFyIGc9MCxsO2c8ay5VLmxlbmd0aCYmKGw9ay5VW2ddKTtnKyspVShsKT09PWEmJmJhLmNhbGwoYSxsKSxjLnNwbGljZShrLmluZGV4K2YsMSk7Zi09ay5XfWZvcihlPTA7ZTxkLmxlbmd0aCYmKGs9ZFtlXSk7ZSsrKWZvcihmPWNbay5pbmRleF0sZz1rLmluZGV4O2c8ay5pbmRleCtrLlc7ZysrKWw9YltnXSxYYS5jYWxsKGEsbCxmKSxjLnNwbGljZShnLDAsbCl9O2wucHJvdG90eXBlLlFhPWZ1bmN0aW9uKGEpe3RoaXMuYy5wdXNoLmFwcGx5KHRoaXMuYyxbXS5jb25jYXQoYSBpbnN0YW5jZW9mIEFycmF5P2E6aGQoZ2QoYSkpKSl9O2wucHJvdG90eXBlLmY9ZnVuY3Rpb24oKXt0aGlzLmMubGVuZ3RoJiZcbih0aGlzLkcodGhpcy5jKSx0aGlzLmM9W10pfTtsLnByb3RvdHlwZS5HPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYixjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWFbY107ZC5fX3NoYWR5PWQuX19zaGFkeXx8e307a2EoZCk7a2EoZC5wYXJlbnROb2RlKTt2YXIgZT10aGlzLmwoZCk7dGhpcy5hW2VdPyhiPWJ8fHt9LGJbZV09ITAsdGhpcy5hW2VdLnB1c2goZCkpOnRoaXMuYVtlXT1bZF07dGhpcy5iLnB1c2goZCl9aWYoYilmb3IodmFyIGYgaW4gYil0aGlzLmFbZl09dGhpcy5tKHRoaXMuYVtmXSl9O2wucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSl7dmFyIGI9YS5uYW1lfHxhLmdldEF0dHJpYnV0ZShcIm5hbWVcIil8fFwiX19jYXRjaGFsbFwiO3JldHVybiBhLk9hPWJ9O2wucHJvdG90eXBlLm09ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc29ydChmdW5jdGlvbihhLGMpe2E9eGMoYSk7Zm9yKHZhciBiPXhjKGMpLGU9MDtlPGEubGVuZ3RoO2UrKyl7Yz1hW2VdO3ZhciBmPWJbZV07aWYoYyE9PWYpcmV0dXJuIGE9XG5BcnJheS5mcm9tKGMucGFyZW50Tm9kZS5jaGlsZE5vZGVzKSxhLmluZGV4T2YoYyktYS5pbmRleE9mKGYpfX0pfTtsLnByb3RvdHlwZS5UYT1mdW5jdGlvbihhKXt0aGlzLmYoKTt2YXIgYj10aGlzLmEsYztmb3IoYyBpbiBiKWZvcih2YXIgZD1iW2NdLGU9MDtlPGQubGVuZ3RoO2UrKyl7dmFyIGY9ZFtlXTtpZihNYihhLGYpKXtkLnNwbGljZShlLDEpO3ZhciBrPXRoaXMuYi5pbmRleE9mKGYpOzA8PWsmJnRoaXMuYi5zcGxpY2UoaywxKTtlLS07dGhpcy5JKGYpO2s9ITB9fXJldHVybiBrfTtsLnByb3RvdHlwZS5WYT1mdW5jdGlvbihhKXt2YXIgYj1hLk9hLGM9dGhpcy5sKGEpO2lmKGMhPT1iKXtiPXRoaXMuYVtiXTt2YXIgZD1iLmluZGV4T2YoYSk7MDw9ZCYmYi5zcGxpY2UoZCwxKTtiPXRoaXMuYVtjXXx8KHRoaXMuYVtjXT1bXSk7Yi5wdXNoKGEpOzE8Yi5sZW5ndGgmJih0aGlzLmFbY109dGhpcy5tKGIpKX19O2wucHJvdG90eXBlLkk9ZnVuY3Rpb24oYSl7aWYoYT1hLl9fc2hhZHkuUilmb3IodmFyIGI9XG4wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz1hW2JdLGQ9VShjKTtkJiZiYS5jYWxsKGQsYyl9fTtsLnByb3RvdHlwZS50YT1mdW5jdGlvbigpe3RoaXMuZigpO3JldHVybiEhdGhpcy5iLmxlbmd0aH07bC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihhLGIsYyl7XCJvYmplY3RcIiE9PXR5cGVvZiBjJiYoYz17Y2FwdHVyZTohIWN9KTtjLmdhPXRoaXM7dGhpcy5ob3N0LmFkZEV2ZW50TGlzdGVuZXIoYSxiLGMpfTtsLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyPWZ1bmN0aW9uKGEsYixjKXtcIm9iamVjdFwiIT09dHlwZW9mIGMmJihjPXtjYXB0dXJlOiEhY30pO2MuZ2E9dGhpczt0aGlzLmhvc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGIsYyl9O2wucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkPWZ1bmN0aW9uKGEpe3JldHVybiBuYSh0aGlzLGZ1bmN0aW9uKGIpe3JldHVybiBiLmlkPT1hfSxmdW5jdGlvbihhKXtyZXR1cm4hIWF9KVswXXx8bnVsbH07KGZ1bmN0aW9uKGEpe0soYSxcblNhLCEwKTtLKGEsVGEsITApfSkobC5wcm90b3R5cGUpO3ZhciBNZD17YWRkRXZlbnRMaXN0ZW5lcjpwYy5iaW5kKHdpbmRvdykscmVtb3ZlRXZlbnRMaXN0ZW5lcjp0Yy5iaW5kKHdpbmRvdyl9LExkPXthZGRFdmVudExpc3RlbmVyOnBjLHJlbW92ZUV2ZW50TGlzdGVuZXI6dGMsYXBwZW5kQ2hpbGQ6ZnVuY3Rpb24oYSl7cmV0dXJuIFVhKHRoaXMsYSl9LGluc2VydEJlZm9yZTpmdW5jdGlvbihhLGIpe3JldHVybiBVYSh0aGlzLGEsYil9LHJlbW92ZUNoaWxkOmZ1bmN0aW9uKGEpe3JldHVybiBWYSh0aGlzLGEpfSxyZXBsYWNlQ2hpbGQ6ZnVuY3Rpb24oYSxiKXtVYSh0aGlzLGEsYik7VmEodGhpcyxiKTtyZXR1cm4gYX0sY2xvbmVOb2RlOmZ1bmN0aW9uKGEpe2lmKFwidGVtcGxhdGVcIj09dGhpcy5sb2NhbE5hbWUpdmFyIGI9aWIuY2FsbCh0aGlzLGEpO2Vsc2UgaWYoYj1pYi5jYWxsKHRoaXMsITEpLGEpe2E9dGhpcy5jaGlsZE5vZGVzO2Zvcih2YXIgYz0wLGQ7YzxhLmxlbmd0aDtjKyspZD1cbmFbY10uY2xvbmVOb2RlKCEwKSxiLmFwcGVuZENoaWxkKGQpfXJldHVybiBifSxnZXRSb290Tm9kZTpmdW5jdGlvbigpe3JldHVybiBnYyh0aGlzKX0sY29udGFpbnM6ZnVuY3Rpb24oYSl7cmV0dXJuIE1iKHRoaXMsYSl9LGdldCBpc0Nvbm5lY3RlZCgpe3ZhciBhPXRoaXMub3duZXJEb2N1bWVudDtpZihWZCYmY2EuY2FsbChhLHRoaXMpfHxhLmRvY3VtZW50RWxlbWVudCYmY2EuY2FsbChhLmRvY3VtZW50RWxlbWVudCx0aGlzKSlyZXR1cm4hMDtmb3IoYT10aGlzO2EmJiEoYSBpbnN0YW5jZW9mIERvY3VtZW50KTspYT1hLnBhcmVudE5vZGV8fChhIGluc3RhbmNlb2YgbD9hLmhvc3Q6dm9pZCAwKTtyZXR1cm4hIShhJiZhIGluc3RhbmNlb2YgRG9jdW1lbnQpfSxkaXNwYXRjaEV2ZW50OmZ1bmN0aW9uKGEpe21hKCk7cmV0dXJuIGpiLmNhbGwodGhpcyxhKX19LE5kPXtnZXQgYXNzaWduZWRTbG90KCl7cmV0dXJuIHljKHRoaXMpfX0sYmI9e3F1ZXJ5U2VsZWN0b3I6ZnVuY3Rpb24oYSl7cmV0dXJuIG5hKHRoaXMsXG5mdW5jdGlvbihiKXtyZXR1cm4gTWMuY2FsbChiLGEpfSxmdW5jdGlvbihhKXtyZXR1cm4hIWF9KVswXXx8bnVsbH0scXVlcnlTZWxlY3RvckFsbDpmdW5jdGlvbihhKXtyZXR1cm4gbmEodGhpcyxmdW5jdGlvbihiKXtyZXR1cm4gTWMuY2FsbChiLGEpfSl9fSxCYz17YXNzaWduZWROb2RlczpmdW5jdGlvbihhKXtpZihcInNsb3RcIj09PXRoaXMubG9jYWxOYW1lKXJldHVybiBpYyh0aGlzKSx0aGlzLl9fc2hhZHk/KGEmJmEuZmxhdHRlbj90aGlzLl9fc2hhZHkuUjp0aGlzLl9fc2hhZHkuYXNzaWduZWROb2Rlcyl8fFtdOltdfX0semM9TmEoe3NldEF0dHJpYnV0ZTpmdW5jdGlvbihhLGIpe2pjKHRoaXMsYSxiKX0scmVtb3ZlQXR0cmlidXRlOmZ1bmN0aW9uKGEpe05jLmNhbGwodGhpcyxhKTtmYyh0aGlzLGEpfSxhdHRhY2hTaGFkb3c6ZnVuY3Rpb24oYSl7aWYoIXRoaXMpdGhyb3dcIk11c3QgcHJvdmlkZSBhIGhvc3QuXCI7aWYoIWEpdGhyb3dcIk5vdCBlbm91Z2ggYXJndW1lbnRzLlwiO3JldHVybiBuZXcgbChIYixcbnRoaXMsYSl9LGdldCBzbG90KCl7cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwic2xvdFwiKX0sc2V0IHNsb3QoYSl7amModGhpcyxcInNsb3RcIixhKX0sZ2V0IGFzc2lnbmVkU2xvdCgpe3JldHVybiB5Yyh0aGlzKX19LGJiLEJjKTtPYmplY3QuZGVmaW5lUHJvcGVydGllcyh6YyxPYyk7dmFyIEFjPU5hKHtpbXBvcnROb2RlOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGxjKGEsYil9LGdldEVsZW1lbnRCeUlkOmZ1bmN0aW9uKGEpe3JldHVybiBuYSh0aGlzLGZ1bmN0aW9uKGIpe3JldHVybiBiLmlkPT1hfSxmdW5jdGlvbihhKXtyZXR1cm4hIWF9KVswXXx8bnVsbH19LGJiKTtPYmplY3QuZGVmaW5lUHJvcGVydGllcyhBYyx7X2FjdGl2ZUVsZW1lbnQ6VGEuYWN0aXZlRWxlbWVudH0pO3ZhciBiZT1IVE1MRWxlbWVudC5wcm90b3R5cGUuYmx1cixPZD1OYSh7Ymx1cjpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5LnJvb3Q7KGE9YSYmYS5hY3RpdmVFbGVtZW50KT9cbmEuYmx1cigpOmJlLmNhbGwodGhpcyl9fSk7RS56YSYmKHdpbmRvdy5TaGFkeURPTT17aW5Vc2U6RS56YSxwYXRjaDpmdW5jdGlvbihhKXtyZXR1cm4gYX0saXNTaGFkeVJvb3Q6RyxlbnF1ZXVlOk5iLGZsdXNoOm1hLHNldHRpbmdzOkUsZmlsdGVyTXV0YXRpb25zOkJkLG9ic2VydmVDaGlsZHJlbjp6ZCx1bm9ic2VydmVDaGlsZHJlbjp5ZCxuYXRpdmVNZXRob2RzOldkLG5hdGl2ZVRyZWU6WGR9LHdpbmRvdy5FdmVudD1aZCx3aW5kb3cuQ3VzdG9tRXZlbnQ9JGQsd2luZG93Lk1vdXNlRXZlbnQ9YWUsSGQoKSxLZCgpLHdpbmRvdy5TaGFkb3dSb290PWwpO3ZhciBQZD1uZXcgU2V0KFwiYW5ub3RhdGlvbi14bWwgY29sb3ItcHJvZmlsZSBmb250LWZhY2UgZm9udC1mYWNlLXNyYyBmb250LWZhY2UtdXJpIGZvbnQtZmFjZS1mb3JtYXQgZm9udC1mYWNlLW5hbWUgbWlzc2luZy1nbHlwaFwiLnNwbGl0KFwiIFwiKSk7Qi5wcm90b3R5cGUuQj1mdW5jdGlvbihhLGIpe3RoaXMuby5zZXQoYSxiKTtcbnRoaXMubS5zZXQoYi5jb25zdHJ1Y3RvcixiKX07Qi5wcm90b3R5cGUuYz1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5vLmdldChhKX07Qi5wcm90b3R5cGUudz1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5tLmdldChhKX07Qi5wcm90b3R5cGUucz1mdW5jdGlvbihhKXt0aGlzLmg9ITA7dGhpcy5qLnB1c2goYSl9O0IucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpczt0aGlzLmgmJk8oYSxmdW5jdGlvbihhKXtyZXR1cm4gYi5nKGEpfSl9O0IucHJvdG90eXBlLmc9ZnVuY3Rpb24oYSl7aWYodGhpcy5oJiYhYS5fX0NFX3BhdGNoZWQpe2EuX19DRV9wYXRjaGVkPSEwO2Zvcih2YXIgYj0wO2I8dGhpcy5qLmxlbmd0aDtiKyspdGhpcy5qW2JdKGEpfX07Qi5wcm90b3R5cGUuYj1mdW5jdGlvbihhKXt2YXIgYj1bXTtPKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGIucHVzaChhKX0pO2ZvcihhPTA7YTxiLmxlbmd0aDthKyspe3ZhciBjPWJbYV07MT09PWMuX19DRV9zdGF0ZT90aGlzLmNvbm5lY3RlZENhbGxiYWNrKGMpOlxudGhpcy5pKGMpfX07Qi5wcm90b3R5cGUuYT1mdW5jdGlvbihhKXt2YXIgYj1bXTtPKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGIucHVzaChhKX0pO2ZvcihhPTA7YTxiLmxlbmd0aDthKyspe3ZhciBjPWJbYV07MT09PWMuX19DRV9zdGF0ZSYmdGhpcy5kaXNjb25uZWN0ZWRDYWxsYmFjayhjKX19O0IucHJvdG90eXBlLmY9ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzO2I9Yj9iOnt9O3ZhciBkPWIua2J8fG5ldyBTZXQsZT1iLkRhfHxmdW5jdGlvbihhKXtyZXR1cm4gYy5pKGEpfSxmPVtdO08oYSxmdW5jdGlvbihhKXtpZihcImxpbmtcIj09PWEubG9jYWxOYW1lJiZcImltcG9ydFwiPT09YS5nZXRBdHRyaWJ1dGUoXCJyZWxcIikpe3ZhciBiPWEuaW1wb3J0O2IgaW5zdGFuY2VvZiBOb2RlJiZcImNvbXBsZXRlXCI9PT1iLnJlYWR5U3RhdGU/KGIuX19DRV9pc0ltcG9ydERvY3VtZW50PSEwLGIuX19DRV9oYXNSZWdpc3RyeT0hMCk6YS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGZ1bmN0aW9uKCl7dmFyIGI9XG5hLmltcG9ydDtpZighYi5fX0NFX2RvY3VtZW50TG9hZEhhbmRsZWQpe2IuX19DRV9kb2N1bWVudExvYWRIYW5kbGVkPSEwO2IuX19DRV9pc0ltcG9ydERvY3VtZW50PSEwO2IuX19DRV9oYXNSZWdpc3RyeT0hMDt2YXIgZj1uZXcgU2V0KGQpO2YuZGVsZXRlKGIpO2MuZihiLHtrYjpmLERhOmV9KX19KX1lbHNlIGYucHVzaChhKX0sZCk7aWYodGhpcy5oKWZvcihhPTA7YTxmLmxlbmd0aDthKyspdGhpcy5nKGZbYV0pO2ZvcihhPTA7YTxmLmxlbmd0aDthKyspZShmW2FdKX07Qi5wcm90b3R5cGUuaT1mdW5jdGlvbihhKXtpZih2b2lkIDA9PT1hLl9fQ0Vfc3RhdGUpe3ZhciBiPXRoaXMuYyhhLmxvY2FsTmFtZSk7aWYoYil7Yi5jb25zdHJ1Y3Rpb25TdGFjay5wdXNoKGEpO3ZhciBjPWIuY29uc3RydWN0b3I7dHJ5e3RyeXtpZihuZXcgYyE9PWEpdGhyb3cgRXJyb3IoXCJUaGUgY3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3IgZGlkIG5vdCBwcm9kdWNlIHRoZSBlbGVtZW50IGJlaW5nIHVwZ3JhZGVkLlwiKTtcbn1maW5hbGx5e2IuY29uc3RydWN0aW9uU3RhY2sucG9wKCl9fWNhdGNoKGYpe3Rocm93IGEuX19DRV9zdGF0ZT0yLGY7fWEuX19DRV9zdGF0ZT0xO2EuX19DRV9kZWZpbml0aW9uPWI7aWYoYi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2spZm9yKGI9Yi5vYnNlcnZlZEF0dHJpYnV0ZXMsYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZD1iW2NdLGU9YS5nZXRBdHRyaWJ1dGUoZCk7bnVsbCE9PWUmJnRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGEsZCxudWxsLGUsbnVsbCl9dChhKSYmdGhpcy5jb25uZWN0ZWRDYWxsYmFjayhhKX19fTtCLnByb3RvdHlwZS5jb25uZWN0ZWRDYWxsYmFjaz1mdW5jdGlvbihhKXt2YXIgYj1hLl9fQ0VfZGVmaW5pdGlvbjtiLmNvbm5lY3RlZENhbGxiYWNrJiZiLmNvbm5lY3RlZENhbGxiYWNrLmNhbGwoYSl9O0IucHJvdG90eXBlLmRpc2Nvbm5lY3RlZENhbGxiYWNrPWZ1bmN0aW9uKGEpe3ZhciBiPWEuX19DRV9kZWZpbml0aW9uO2IuZGlzY29ubmVjdGVkQ2FsbGJhY2smJlxuYi5kaXNjb25uZWN0ZWRDYWxsYmFjay5jYWxsKGEpfTtCLnByb3RvdHlwZS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2s9ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1hLl9fQ0VfZGVmaW5pdGlvbjtmLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayYmLTE8Zi5vYnNlcnZlZEF0dHJpYnV0ZXMuaW5kZXhPZihiKSYmZi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suY2FsbChhLGIsYyxkLGUpfTtKYS5wcm90b3R5cGUuYz1mdW5jdGlvbigpe3RoaXMuTSYmdGhpcy5NLmRpc2Nvbm5lY3QoKX07SmEucHJvdG90eXBlLmY9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5hLnJlYWR5U3RhdGU7XCJpbnRlcmFjdGl2ZVwiIT09YiYmXCJjb21wbGV0ZVwiIT09Ynx8dGhpcy5jKCk7Zm9yKGI9MDtiPGEubGVuZ3RoO2IrKylmb3IodmFyIGM9YVtiXS5hZGRlZE5vZGVzLGQ9MDtkPGMubGVuZ3RoO2QrKyl0aGlzLmIuZihjW2RdKX07R2IucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXtpZih0aGlzLmEpdGhyb3cgRXJyb3IoXCJBbHJlYWR5IHJlc29sdmVkLlwiKTtcbnRoaXMuYT12b2lkIDA7dGhpcy5iJiZ0aGlzLmIodm9pZCAwKX07eS5wcm90b3R5cGUuZGVmaW5lPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcztpZighKGIgaW5zdGFuY2VvZiBGdW5jdGlvbikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkN1c3RvbSBlbGVtZW50IGNvbnN0cnVjdG9ycyBtdXN0IGJlIGZ1bmN0aW9ucy5cIik7aWYoIUNjKGEpKXRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSBlbGVtZW50IG5hbWUgJ1wiK2ErXCInIGlzIG5vdCB2YWxpZC5cIik7aWYodGhpcy5hLmMoYSkpdGhyb3cgRXJyb3IoXCJBIGN1c3RvbSBlbGVtZW50IHdpdGggbmFtZSAnXCIrYStcIicgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLlwiKTtpZih0aGlzLmMpdGhyb3cgRXJyb3IoXCJBIGN1c3RvbSBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgZGVmaW5lZC5cIik7dGhpcy5jPSEwO3RyeXt2YXIgZD1mdW5jdGlvbihhKXt2YXIgYj1lW2FdO2lmKHZvaWQgMCE9PWImJiEoYiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSl0aHJvdyBFcnJvcihcIlRoZSAnXCIrXG5hK1wiJyBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpO3JldHVybiBifSxlPWIucHJvdG90eXBlO2lmKCEoZSBpbnN0YW5jZW9mIE9iamVjdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBjdXN0b20gZWxlbWVudCBjb25zdHJ1Y3RvcidzIHByb3RvdHlwZSBpcyBub3QgYW4gb2JqZWN0LlwiKTt2YXIgZj1kKFwiY29ubmVjdGVkQ2FsbGJhY2tcIik7dmFyIGc9ZChcImRpc2Nvbm5lY3RlZENhbGxiYWNrXCIpO3ZhciBoPWQoXCJhZG9wdGVkQ2FsbGJhY2tcIik7dmFyIGw9ZChcImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja1wiKTt2YXIgbj1iLm9ic2VydmVkQXR0cmlidXRlc3x8W119Y2F0Y2gobSl7cmV0dXJufWZpbmFsbHl7dGhpcy5jPSExfWI9e2xvY2FsTmFtZTphLGNvbnN0cnVjdG9yOmIsY29ubmVjdGVkQ2FsbGJhY2s6ZixkaXNjb25uZWN0ZWRDYWxsYmFjazpnLGFkb3B0ZWRDYWxsYmFjazpoLGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjazpsLG9ic2VydmVkQXR0cmlidXRlczpuLGNvbnN0cnVjdGlvblN0YWNrOltdfTtcbnRoaXMuYS5CKGEsYik7dGhpcy5nLnB1c2goYik7dGhpcy5ifHwodGhpcy5iPSEwLHRoaXMuZihmdW5jdGlvbigpe3JldHVybiBjLmooKX0pKX07eS5wcm90b3R5cGUuaj1mdW5jdGlvbigpe3ZhciBhPXRoaXM7aWYoITEhPT10aGlzLmIpe3RoaXMuYj0hMTtmb3IodmFyIGI9dGhpcy5nLGM9W10sZD1uZXcgTWFwLGU9MDtlPGIubGVuZ3RoO2UrKylkLnNldChiW2VdLmxvY2FsTmFtZSxbXSk7dGhpcy5hLmYoZG9jdW1lbnQse0RhOmZ1bmN0aW9uKGIpe2lmKHZvaWQgMD09PWIuX19DRV9zdGF0ZSl7dmFyIGU9Yi5sb2NhbE5hbWUsZj1kLmdldChlKTtmP2YucHVzaChiKTphLmEuYyhlKSYmYy5wdXNoKGIpfX19KTtmb3IoZT0wO2U8Yy5sZW5ndGg7ZSsrKXRoaXMuYS5pKGNbZV0pO2Zvcig7MDxiLmxlbmd0aDspe3ZhciBmPWIuc2hpZnQoKTtlPWYubG9jYWxOYW1lO2Y9ZC5nZXQoZi5sb2NhbE5hbWUpO2Zvcih2YXIgZz0wO2c8Zi5sZW5ndGg7ZysrKXRoaXMuYS5pKGZbZ10pOyhlPXRoaXMuaC5nZXQoZSkpJiZcbmUuYygpfX19O3kucHJvdG90eXBlLmdldD1mdW5jdGlvbihhKXtpZihhPXRoaXMuYS5jKGEpKXJldHVybiBhLmNvbnN0cnVjdG9yfTt5LnByb3RvdHlwZS53aGVuRGVmaW5lZD1mdW5jdGlvbihhKXtpZighQ2MoYSkpcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTeW50YXhFcnJvcihcIidcIithK1wiJyBpcyBub3QgYSB2YWxpZCBjdXN0b20gZWxlbWVudCBuYW1lLlwiKSk7dmFyIGI9dGhpcy5oLmdldChhKTtpZihiKXJldHVybiBiLmY7Yj1uZXcgR2I7dGhpcy5oLnNldChhLGIpO3RoaXMuYS5jKGEpJiYhdGhpcy5nLnNvbWUoZnVuY3Rpb24oYil7cmV0dXJuIGIubG9jYWxOYW1lPT09YX0pJiZiLmMoKTtyZXR1cm4gYi5mfTt5LnByb3RvdHlwZS5sPWZ1bmN0aW9uKGEpe3RoaXMuaS5jKCk7dmFyIGI9dGhpcy5mO3RoaXMuZj1mdW5jdGlvbihjKXtyZXR1cm4gYShmdW5jdGlvbigpe3JldHVybiBiKGMpfSl9fTt3aW5kb3cuQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5PXk7eS5wcm90b3R5cGUuZGVmaW5lPVxueS5wcm90b3R5cGUuZGVmaW5lO3kucHJvdG90eXBlLmdldD15LnByb3RvdHlwZS5nZXQ7eS5wcm90b3R5cGUud2hlbkRlZmluZWQ9eS5wcm90b3R5cGUud2hlbkRlZmluZWQ7eS5wcm90b3R5cGUucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjaz15LnByb3RvdHlwZS5sO3ZhciBFYT13aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQsdGQ9d2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50TlMsc2Q9d2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5pbXBvcnROb2RlLHVkPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUucHJlcGVuZCx2ZD13aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLmFwcGVuZCxjZT13aW5kb3cuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUucHJlcGVuZCxkZT13aW5kb3cuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuYXBwZW5kLHdiPXdpbmRvdy5Ob2RlLnByb3RvdHlwZS5jbG9uZU5vZGUsaWE9d2luZG93Lk5vZGUucHJvdG90eXBlLmFwcGVuZENoaWxkLFxuRGI9d2luZG93Lk5vZGUucHJvdG90eXBlLmluc2VydEJlZm9yZSxGYT13aW5kb3cuTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQsRWI9d2luZG93Lk5vZGUucHJvdG90eXBlLnJlcGxhY2VDaGlsZCxJYT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5Ob2RlLnByb3RvdHlwZSxcInRleHRDb250ZW50XCIpLHZiPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5hdHRhY2hTaGFkb3csQ2E9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUsXCJpbm5lckhUTUxcIiksR2E9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZSx4Yj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlLHpiPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGUsamE9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZU5TLHliPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVOUyxcbkFiPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGVOUyxDYj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50LGpkPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5wcmVwZW5kLGtkPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5hcHBlbmQsbWQ9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmJlZm9yZSxuZD13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuYWZ0ZXIsb2Q9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnJlcGxhY2VXaXRoLHBkPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmUseGQ9d2luZG93LkhUTUxFbGVtZW50LERhPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZSxcImlubmVySFRNTFwiKSxCYj13aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLmluc2VydEFkamFjZW50RWxlbWVudCxGYj1uZXcgZnVuY3Rpb24oKXt9LHRhPXdpbmRvdy5jdXN0b21FbGVtZW50cztcbmlmKCF0YXx8dGEuZm9yY2VQb2x5ZmlsbHx8XCJmdW5jdGlvblwiIT10eXBlb2YgdGEuZGVmaW5lfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiB0YS5nZXQpe3ZhciBZPW5ldyBCO3dkKFkpO3JkKFkpO0hhKFksRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUse1o6Y2UsYXBwZW5kOmRlfSk7cWQoWSk7aWQoWSk7ZG9jdW1lbnQuX19DRV9oYXNSZWdpc3RyeT0hMDt2YXIgZWU9bmV3IHkoWSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdyxcImN1c3RvbUVsZW1lbnRzXCIse2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwLHZhbHVlOmVlfSl9dmFyIEk9e1NUWUxFX1JVTEU6MSxkYTo3LE1FRElBX1JVTEU6NCxuYToxRTN9LEY9e1lhOi9cXC9cXCpbXipdKlxcKisoW14vKl1bXipdKlxcKispKlxcLy9naW0scG9ydDovQGltcG9ydFteO10qOy9naW0sd2E6Lyg/Ol5bXjtcXC1cXHN9XSspPy0tW147e31dKj86W157fTtdKj8oPzpbO1xcbl18JCkvZ2ltLEFhOi8oPzpeW147XFwtXFxzfV0rKT8tLVteO3t9XSo/Oltee307XSo/e1tefV0qP30oPzpbO1xcbl18JCk/L2dpbSxcbmViOi9AYXBwbHlcXHMqXFwoP1teKTtdKlxcKT9cXHMqKD86WztcXG5dfCQpPy9naW0samI6L1teOzpdKj86W147XSo/dmFyXFwoW147XSpcXCkoPzpbO1xcbl18JCk/L2dpbSxjYjovXkBbXlxcc10qa2V5ZnJhbWVzLyxCYTovXFxzKy9nfSx6PSEod2luZG93LlNoYWR5RE9NJiZ3aW5kb3cuU2hhZHlET00uaW5Vc2UpO2lmKHdpbmRvdy5TaGFkeUNTUyYmdm9pZCAwIT09d2luZG93LlNoYWR5Q1NTLm5hdGl2ZUNzcyl2YXIgQT13aW5kb3cuU2hhZHlDU1MubmF0aXZlQ3NzO2Vsc2Ugd2luZG93LlNoYWR5Q1NTPyhGYyh3aW5kb3cuU2hhZHlDU1MpLHdpbmRvdy5TaGFkeUNTUz12b2lkIDApOkZjKHdpbmRvdy5XZWJDb21wb25lbnRzJiZ3aW5kb3cuV2ViQ29tcG9uZW50cy5mbGFncyk7dmFyIHVhPS8oPzpefFs7XFxze11cXHMqKSgtLVtcXHctXSo/KVxccyo6XFxzKig/OigoPzonKD86XFxcXCd8LikqPyd8XCIoPzpcXFxcXCJ8LikqP1wifFxcKFteKV0qP1xcKXxbXn07e10pKyl8XFx7KFtefV0qKVxcfSg/Oig/PVs7XFxzfV0pfCQpKS9naSxcbnZhPS8oPzpefFxcVyspQGFwcGx5XFxzKlxcKD8oW14pO1xcbl0qKVxcKT8vZ2ksZmU9LygtLVtcXHctXSspXFxzKihbOiw7KV18JCkvZ2ksZ2U9LyhhbmltYXRpb25cXHMqOil8KGFuaW1hdGlvbi1uYW1lXFxzKjopLyxSZD0vQG1lZGlhXFxzKC4qKS8saGU9L1xce1tefV0qXFx9L2csUT1udWxsO3UucHJvdG90eXBlLmI9ZnVuY3Rpb24oYSxiLGMpe2EuX19zdHlsZVNjb3BlZD9hLl9fc3R5bGVTY29wZWQ9bnVsbDp0aGlzLmooYSxifHxcIlwiLGMpfTt1LnByb3RvdHlwZS5qPWZ1bmN0aW9uKGEsYixjKXthLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUmJnRoaXMuaChhLGIsYyk7aWYoYT1cInRlbXBsYXRlXCI9PT1hLmxvY2FsTmFtZT8oYS5jb250ZW50fHxhLm9iKS5jaGlsZE5vZGVzOmEuY2hpbGRyZW58fGEuY2hpbGROb2Rlcylmb3IodmFyIGQ9MDtkPGEubGVuZ3RoO2QrKyl0aGlzLmooYVtkXSxiLGMpfTt1LnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEsYixjKXtpZihiKWlmKGEuY2xhc3NMaXN0KWM/KGEuY2xhc3NMaXN0LnJlbW92ZShcInN0eWxlLXNjb3BlXCIpLFxuYS5jbGFzc0xpc3QucmVtb3ZlKGIpKTooYS5jbGFzc0xpc3QuYWRkKFwic3R5bGUtc2NvcGVcIiksYS5jbGFzc0xpc3QuYWRkKGIpKTtlbHNlIGlmKGEuZ2V0QXR0cmlidXRlKXt2YXIgZD1hLmdldEF0dHJpYnV0ZShpZSk7Yz9kJiYoYj1kLnJlcGxhY2UoXCJzdHlsZS1zY29wZVwiLFwiXCIpLnJlcGxhY2UoYixcIlwiKSxxYShhLGIpKTpxYShhLChkP2QrXCIgXCI6XCJcIikrXCJzdHlsZS1zY29wZSBcIitiKX19O3UucHJvdG90eXBlLmM9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWEuX19jc3NCdWlsZDt6fHxcInNoYWR5XCI9PT1kP2I9VihiLGMpOihhPVIoYSksYj10aGlzLkcoYixhLmlzLGEuVixjKStcIlxcblxcblwiKTtyZXR1cm4gYi50cmltKCl9O3UucHJvdG90eXBlLkc9ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9dGhpcy5mKGIsYyk7Yj10aGlzLmkoYik7dmFyIGY9dGhpcztyZXR1cm4gVihhLGZ1bmN0aW9uKGEpe2EuY3x8KGYuSShhLGIsZSksYS5jPSEwKTtkJiZkKGEsYixlKX0pfTt1LnByb3RvdHlwZS5pPWZ1bmN0aW9uKGEpe3JldHVybiBhP1xuamUrYTpcIlwifTt1LnByb3RvdHlwZS5mPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGI/XCJbaXM9XCIrYStcIl1cIjphfTt1LnByb3RvdHlwZS5JPWZ1bmN0aW9uKGEsYixjKXt0aGlzLmwoYSx0aGlzLmcsYixjKX07dS5wcm90b3R5cGUubD1mdW5jdGlvbihhLGIsYyxkKXthLnNlbGVjdG9yPWEudj10aGlzLm0oYSxiLGMsZCl9O3UucHJvdG90eXBlLm09ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9YS5zZWxlY3Rvci5zcGxpdChQYyk7aWYoIUdjKGEpKXthPTA7Zm9yKHZhciBmPWUubGVuZ3RoLGc7YTxmJiYoZz1lW2FdKTthKyspZVthXT1iLmNhbGwodGhpcyxnLGMsZCl9cmV0dXJuIGUuam9pbihQYyl9O3UucHJvdG90eXBlLnM9ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZShtYixmdW5jdGlvbihhLGMsZCl7LTE8ZC5pbmRleE9mKFwiK1wiKT9kPWQucmVwbGFjZSgvXFwrL2csXCJfX19cIik6LTE8ZC5pbmRleE9mKFwiX19fXCIpJiYoZD1kLnJlcGxhY2UoL19fXy9nLFwiK1wiKSk7cmV0dXJuXCI6XCIrYytcIihcIitcbmQrXCIpXCJ9KX07dS5wcm90b3R5cGUuZz1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcyxlPSExO2E9YS50cmltKCk7dmFyIGY9bWIudGVzdChhKTtmJiYoYT1hLnJlcGxhY2UobWIsZnVuY3Rpb24oYSxiLGMpe3JldHVyblwiOlwiK2IrXCIoXCIrYy5yZXBsYWNlKC9cXHMvZyxcIlwiKStcIilcIn0pLGE9dGhpcy5zKGEpKTthPWEucmVwbGFjZShrZSxuYitcIiAkMVwiKTthPWEucmVwbGFjZShsZSxmdW5jdGlvbihhLGYsZyl7ZXx8KGE9ZC5CKGcsZixiLGMpLGU9ZXx8YS5zdG9wLGY9YS5YYSxnPWEudmFsdWUpO3JldHVybiBmK2d9KTtmJiYoYT10aGlzLnMoYSkpO3JldHVybiBhfTt1LnByb3RvdHlwZS5CPWZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPWEuaW5kZXhPZihvYik7MDw9YS5pbmRleE9mKG5iKT9hPXRoaXMuRihhLGQpOjAhPT1lJiYoYT1jP3RoaXMubyhhLGMpOmEpO2M9ITE7MDw9ZSYmKGI9XCJcIixjPSEwKTtpZihjKXt2YXIgZj0hMDtjJiYoYT1hLnJlcGxhY2UobWUsZnVuY3Rpb24oYSxiKXtyZXR1cm5cIiA+IFwiK1xuYn0pKX1hPWEucmVwbGFjZShuZSxmdW5jdGlvbihhLGIsYyl7cmV0dXJuJ1tkaXI9XCInK2MrJ1wiXSAnK2IrXCIsIFwiK2IrJ1tkaXI9XCInK2MrJ1wiXSd9KTtyZXR1cm57dmFsdWU6YSxYYTpiLHN0b3A6Zn19O3UucHJvdG90eXBlLm89ZnVuY3Rpb24oYSxiKXthPWEuc3BsaXQoUWMpO2FbMF0rPWI7cmV0dXJuIGEuam9pbihRYyl9O3UucHJvdG90eXBlLkY9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLm1hdGNoKFJjKTtyZXR1cm4oYz1jJiZjWzJdLnRyaW0oKXx8XCJcIik/Y1swXS5tYXRjaChTYyk/YS5yZXBsYWNlKFJjLGZ1bmN0aW9uKGEsYyxmKXtyZXR1cm4gYitmfSk6Yy5zcGxpdChTYylbMF09PT1iP2M6b2U6YS5yZXBsYWNlKG5iLGIpfTt1LnByb3RvdHlwZS5IPWZ1bmN0aW9uKGEpe2Euc2VsZWN0b3I9YS5wYXJzZWRTZWxlY3Rvcjt0aGlzLncoYSk7dGhpcy5sKGEsdGhpcy5LKX07dS5wcm90b3R5cGUudz1mdW5jdGlvbihhKXthLnNlbGVjdG9yPT09cGUmJihhLnNlbGVjdG9yPVwiaHRtbFwiKX07XG51LnByb3RvdHlwZS5LPWZ1bmN0aW9uKGEpe3JldHVybiBhLm1hdGNoKG9iKT90aGlzLmcoYSxUYyk6dGhpcy5vKGEudHJpbSgpLFRjKX07Si5PYmplY3QuZGVmaW5lUHJvcGVydGllcyh1LnByb3RvdHlwZSx7YTp7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuXCJzdHlsZS1zY29wZVwifX19KTt2YXIgbWI9LzoobnRoWy1cXHddKylcXCgoW14pXSspXFwpLyxUYz1cIjpub3QoLnN0eWxlLXNjb3BlKVwiLFBjPVwiLFwiLGxlPS8oXnxbXFxzPit+XSspKCg/OlxcWy4rP1xcXXxbXlxccz4rfj1bXSkrKS9nLFNjPS9bWy46IypdLyxuYj1cIjpob3N0XCIscGU9XCI6cm9vdFwiLG9iPVwiOjpzbG90dGVkXCIsa2U9bmV3IFJlZ0V4cChcIl4oXCIrb2IrXCIpXCIpLFJjPS8oOmhvc3QpKD86XFwoKCg/OlxcKFteKShdKlxcKXxbXikoXSopKz8pXFwpKS8sbWU9Lyg/Ojo6c2xvdHRlZCkoPzpcXCgoKD86XFwoW14pKF0qXFwpfFteKShdKikrPylcXCkpLyxuZT0vKC4qKTpkaXJcXCgoPzoobHRyfHJ0bCkpXFwpLyxcbmplPVwiLlwiLFFjPVwiOlwiLGllPVwiY2xhc3NcIixvZT1cInNob3VsZF9ub3RfbWF0Y2hcIixwPW5ldyB1O3YuZ2V0PWZ1bmN0aW9uKGEpe3JldHVybiBhP2EuX19zdHlsZUluZm86bnVsbH07di5zZXQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS5fX3N0eWxlSW5mbz1ifTt2LnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuRH07di5wcm90b3R5cGUuX2dldFN0eWxlUnVsZXM9di5wcm90b3R5cGUuYzt2YXIgVWM9ZnVuY3Rpb24oYSl7cmV0dXJuIGEubWF0Y2hlc3x8YS5tYXRjaGVzU2VsZWN0b3J8fGEubW96TWF0Y2hlc1NlbGVjdG9yfHxhLm1zTWF0Y2hlc1NlbGVjdG9yfHxhLm9NYXRjaGVzU2VsZWN0b3J8fGEud2Via2l0TWF0Y2hlc1NlbGVjdG9yfSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUpLHFlPW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goXCJUcmlkZW50XCIpO24ucHJvdG90eXBlLkg9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcyxjPXt9LGQ9W10sZT0wO1coYSxmdW5jdGlvbihhKXtiLmMoYSk7XG5hLmluZGV4PWUrKztiLkcoYS51LmNzc1RleHQsYyl9LGZ1bmN0aW9uKGEpe2QucHVzaChhKX0pO2EuYj1kO2E9W107Zm9yKHZhciBmIGluIGMpYS5wdXNoKGYpO3JldHVybiBhfTtuLnByb3RvdHlwZS5jPWZ1bmN0aW9uKGEpe2lmKCFhLnUpe3ZhciBiPXt9LGM9e307dGhpcy5iKGEsYykmJihiLkM9YyxhLnJ1bGVzPW51bGwpO2IuY3NzVGV4dD10aGlzLkYoYSk7YS51PWJ9fTtuLnByb3RvdHlwZS5iPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS51O2lmKGMpe2lmKGMuQylyZXR1cm4gT2JqZWN0LmFzc2lnbihiLGMuQyksITB9ZWxzZXtjPWEucGFyc2VkQ3NzVGV4dDtmb3IodmFyIGQ7YT11YS5leGVjKGMpOyl7ZD0oYVsyXXx8YVszXSkudHJpbSgpO2lmKFwiaW5oZXJpdFwiIT09ZHx8XCJ1bnNldFwiIT09ZCliW2FbMV0udHJpbSgpXT1kO2Q9ITB9cmV0dXJuIGR9fTtuLnByb3RvdHlwZS5GPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLksoYS5wYXJzZWRDc3NUZXh0KX07bi5wcm90b3R5cGUuSz1mdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKGhlLFxuXCJcIikucmVwbGFjZSh1YSxcIlwiKX07bi5wcm90b3R5cGUuRz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYztjPWZlLmV4ZWMoYSk7KXt2YXIgZD1jWzFdO1wiOlwiIT09Y1syXSYmKGJbZF09ITApfX07bi5wcm90b3R5cGUuYWE9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGEpLGM9MCxkO2M8Yi5sZW5ndGg7YysrKWQ9YltjXSxhW2RdPXRoaXMuYShhW2RdLGEpfTtuLnByb3RvdHlwZS5hPWZ1bmN0aW9uKGEsYil7aWYoYSlpZigwPD1hLmluZGV4T2YoXCI7XCIpKWE9dGhpcy5mKGEsYik7ZWxzZXt2YXIgYz10aGlzO2E9SWMoYSxmdW5jdGlvbihhLGUsZixnKXtpZighZSlyZXR1cm4gYStnOyhlPWMuYShiW2VdLGIpKSYmXCJpbml0aWFsXCIhPT1lP1wiYXBwbHktc2hpbS1pbmhlcml0XCI9PT1lJiYoZT1cImluaGVyaXRcIik6ZT1jLmEoYltmXXx8ZixiKXx8ZjtyZXR1cm4gYSsoZXx8XCJcIikrZ30pfXJldHVybiBhJiZhLnRyaW0oKXx8XCJcIn07bi5wcm90b3R5cGUuZj1mdW5jdGlvbihhLFxuYil7YT1hLnNwbGl0KFwiO1wiKTtmb3IodmFyIGM9MCxkLGU7YzxhLmxlbmd0aDtjKyspaWYoZD1hW2NdKXt2YS5sYXN0SW5kZXg9MDtpZihlPXZhLmV4ZWMoZCkpZD10aGlzLmEoYltlWzFdXSxiKTtlbHNlIGlmKGU9ZC5pbmRleE9mKFwiOlwiKSwtMSE9PWUpe3ZhciBmPWQuc3Vic3RyaW5nKGUpO2Y9Zi50cmltKCk7Zj10aGlzLmEoZixiKXx8ZjtkPWQuc3Vic3RyaW5nKDAsZSkrZn1hW2NdPWQmJmQubGFzdEluZGV4T2YoXCI7XCIpPT09ZC5sZW5ndGgtMT9kLnNsaWNlKDAsLTEpOmR8fFwiXCJ9cmV0dXJuIGEuam9pbihcIjtcIil9O24ucHJvdG90eXBlLkI9ZnVuY3Rpb24oYSxiKXt2YXIgYz1cIlwiO2EudXx8dGhpcy5jKGEpO2EudS5jc3NUZXh0JiYoYz10aGlzLmYoYS51LmNzc1RleHQsYikpO2EuY3NzVGV4dD1jfTtuLnByb3RvdHlwZS53PWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5jc3NUZXh0LGQ9YS5jc3NUZXh0O251bGw9PWEueWEmJihhLnlhPWdlLnRlc3QoYykpO2lmKGEueWEpaWYobnVsbD09XG5hLlkpe2EuWT1bXTtmb3IodmFyIGUgaW4gYilkPWJbZV0sZD1kKGMpLGMhPT1kJiYoYz1kLGEuWS5wdXNoKGUpKX1lbHNle2ZvcihlPTA7ZTxhLlkubGVuZ3RoOysrZSlkPWJbYS5ZW2VdXSxjPWQoYyk7ZD1jfWEuY3NzVGV4dD1kfTtuLnByb3RvdHlwZS5PPWZ1bmN0aW9uKGEsYil7dmFyIGM9e30sZD10aGlzLGU9W107VyhhLGZ1bmN0aW9uKGEpe2EudXx8ZC5jKGEpO3ZhciBmPWEudnx8YS5wYXJzZWRTZWxlY3RvcjtiJiZhLnUuQyYmZiYmVWMuY2FsbChiLGYpJiYoZC5iKGEsYyksYT1hLmluZGV4LGY9cGFyc2VJbnQoYS8zMiwxMCksZVtmXT0oZVtmXXx8MCl8MTw8YSUzMil9LG51bGwsITApO3JldHVybntDOmMsa2V5OmV9fTtuLnByb3RvdHlwZS5jYT1mdW5jdGlvbihhLGIsYyxkKXtiLnV8fHRoaXMuYyhiKTtpZihiLnUuQyl7dmFyIGU9UihhKTthPWUuaXM7ZT1lLlY7ZT1hP3AuZihhLGUpOlwiaHRtbFwiO3ZhciBmPWIucGFyc2VkU2VsZWN0b3IsZz1cIjpob3N0ID4gKlwiPT09Znx8XG5cImh0bWxcIj09PWYsaD0wPT09Zi5pbmRleE9mKFwiOmhvc3RcIikmJiFnO1wic2hhZHlcIj09PWMmJihnPWY9PT1lK1wiID4gKi5cIitlfHwtMSE9PWYuaW5kZXhPZihcImh0bWxcIiksaD0hZyYmMD09PWYuaW5kZXhPZihlKSk7XCJzaGFkb3dcIj09PWMmJihnPVwiOmhvc3QgPiAqXCI9PT1mfHxcImh0bWxcIj09PWYsaD1oJiYhZyk7aWYoZ3x8aCljPWUsaCYmKHomJiFiLnYmJihiLnY9cC5tKGIscC5nLHAuaShhKSxlKSksYz1iLnZ8fGUpLGQoe2liOmMsYmI6aCxxYjpnfSl9fTtuLnByb3RvdHlwZS5JPWZ1bmN0aW9uKGEsYil7dmFyIGM9e30sZD17fSxlPXRoaXMsZj1iJiZiLl9fY3NzQnVpbGQ7VyhiLGZ1bmN0aW9uKGIpe2UuY2EoYSxiLGYsZnVuY3Rpb24oZil7VWMuY2FsbChhLnBifHxhLGYuaWIpJiYoZi5iYj9lLmIoYixjKTplLmIoYixkKSl9KX0sbnVsbCwhMCk7cmV0dXJue2diOmQsYWI6Y319O24ucHJvdG90eXBlLmJhPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLGU9UihhKSxmPXAuZihlLmlzLFxuZS5WKSxnPW5ldyBSZWdFeHAoXCIoPzpefFteLiNbOl0pXCIrKGEuZXh0ZW5kcz9cIlxcXFxcIitmLnNsaWNlKDAsLTEpK1wiXFxcXF1cIjpmKStcIigkfFsuOltcXFxccz4rfl0pXCIpO2U9di5nZXQoYSkuRDt2YXIgaD10aGlzLmgoZSxjKTtyZXR1cm4gcC5jKGEsZSxmdW5jdGlvbihhKXtkLkIoYSxiKTt6fHxHYyhhKXx8IWEuY3NzVGV4dHx8KGQudyhhLGgpLGQubChhLGcsZixjKSl9KX07bi5wcm90b3R5cGUuaD1mdW5jdGlvbihhLGIpe2E9YS5iO3ZhciBjPXt9O2lmKCF6JiZhKWZvcih2YXIgZD0wLGU9YVtkXTtkPGEubGVuZ3RoO2U9YVsrK2RdKXRoaXMuaihlLGIpLGNbZS5rZXlmcmFtZXNOYW1lXT10aGlzLmkoZSk7cmV0dXJuIGN9O24ucHJvdG90eXBlLmk9ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVybiBiLnJlcGxhY2UoYS5mLGEuYSl9fTtuLnByb3RvdHlwZS5qPWZ1bmN0aW9uKGEsYil7YS5mPW5ldyBSZWdFeHAoYS5rZXlmcmFtZXNOYW1lLFwiZ1wiKTthLmE9YS5rZXlmcmFtZXNOYW1lK1xuXCItXCIrYjthLnY9YS52fHxhLnNlbGVjdG9yO2Euc2VsZWN0b3I9YS52LnJlcGxhY2UoYS5rZXlmcmFtZXNOYW1lLGEuYSl9O24ucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSxiLGMsZCl7YS52PWEudnx8YS5zZWxlY3RvcjtkPVwiLlwiK2Q7Zm9yKHZhciBlPWEudi5zcGxpdChcIixcIiksZj0wLGc9ZS5sZW5ndGgsaDtmPGcmJihoPWVbZl0pO2YrKyllW2ZdPWgubWF0Y2goYik/aC5yZXBsYWNlKGMsZCk6ZCtcIiBcIitoO2Euc2VsZWN0b3I9ZS5qb2luKFwiLFwiKX07bi5wcm90b3R5cGUubz1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9YS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKXx8XCJcIixlPWQ7YyYmKGU9ZC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxccyp4LXNjb3BlXFxcXHMqXCIrYytcIlxcXFxzKlwiLFwiZ1wiKSxcIiBcIikpO2UrPShlP1wiIFwiOlwiXCIpK1wieC1zY29wZSBcIitiO2QhPT1lJiZxYShhLGUpfTtuLnByb3RvdHlwZS5zPWZ1bmN0aW9uKGEsYixjLGQpe2I9ZD9kLnRleHRDb250ZW50fHxcIlwiOnRoaXMuYmEoYSxiLGMpO3ZhciBlPVxudi5nZXQoYSksZj1lLmE7ZiYmIXomJmYhPT1kJiYoZi5fdXNlQ291bnQtLSwwPj1mLl91c2VDb3VudCYmZi5wYXJlbnROb2RlJiZmLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZikpO3o/ZS5hPyhlLmEudGV4dENvbnRlbnQ9YixkPWUuYSk6YiYmKGQ9ZWIoYixjLGEuc2hhZG93Um9vdCxlLmIpKTpkP2QucGFyZW50Tm9kZXx8KHFlJiYtMTxiLmluZGV4T2YoXCJAbWVkaWFcIikmJihkLnRleHRDb250ZW50PWIpLEhjKGQsbnVsbCxlLmIpKTpiJiYoZD1lYihiLGMsbnVsbCxlLmIpKTtkJiYoZC5fdXNlQ291bnQ9ZC5fdXNlQ291bnR8fDAsZS5hIT1kJiZkLl91c2VDb3VudCsrLGUuYT1kKTtyZXR1cm4gZH07bi5wcm90b3R5cGUubT1mdW5jdGlvbihhLGIpe3ZhciBjPXBhKGEpLGQ9dGhpczthLnRleHRDb250ZW50PVYoYyxmdW5jdGlvbihhKXt2YXIgYz1hLmNzc1RleHQ9YS5wYXJzZWRDc3NUZXh0O2EudSYmYS51LmNzc1RleHQmJihjPWMucmVwbGFjZShGLndhLFwiXCIpLnJlcGxhY2UoRi5BYSxcblwiXCIpLGEuY3NzVGV4dD1kLmYoYyxiKSl9KX07Si5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhuLnByb3RvdHlwZSx7Zzp7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuXCJ4LXNjb3BlXCJ9fX0pO3ZhciBNPW5ldyBuLHBiPXt9LHdhPXdpbmRvdy5jdXN0b21FbGVtZW50cztpZih3YSYmIXope3ZhciByZT13YS5kZWZpbmU7d2EuZGVmaW5lPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1kb2N1bWVudC5jcmVhdGVDb21tZW50KFwiIFNoYWR5IERPTSBzdHlsZXMgZm9yIFwiK2ErXCIgXCIpLGU9ZG9jdW1lbnQuaGVhZDtlLmluc2VydEJlZm9yZShkLChRP1EubmV4dFNpYmxpbmc6bnVsbCl8fGUuZmlyc3RDaGlsZCk7UT1kO3BiW2FdPWQ7cmV0dXJuIHJlLmNhbGwod2EsYSxiLGMpfX1oYS5wcm90b3R5cGUuYT1mdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPTA7ZDxjLmxlbmd0aDtkKyspe3ZhciBlPWNbZF07aWYoYS5DW2VdIT09YltlXSlyZXR1cm4hMX1yZXR1cm4hMH07XG5oYS5wcm90b3R5cGUuYj1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZT10aGlzLmNhY2hlW2FdfHxbXTtlLnB1c2goe0M6YixzdHlsZUVsZW1lbnQ6YyxBOmR9KTtlLmxlbmd0aD50aGlzLmMmJmUuc2hpZnQoKTt0aGlzLmNhY2hlW2FdPWV9O2hhLnByb3RvdHlwZS5mZXRjaD1mdW5jdGlvbihhLGIsYyl7aWYoYT10aGlzLmNhY2hlW2FdKWZvcih2YXIgZD1hLmxlbmd0aC0xOzA8PWQ7ZC0tKXt2YXIgZT1hW2RdO2lmKHRoaXMuYShlLGIsYykpcmV0dXJuIGV9fTtpZigheil7dmFyIFZjPW5ldyBNdXRhdGlvbk9ic2VydmVyKEpjKSxXYz1mdW5jdGlvbihhKXtWYy5vYnNlcnZlKGEse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSl9O2lmKHdpbmRvdy5jdXN0b21FbGVtZW50cyYmIXdpbmRvdy5jdXN0b21FbGVtZW50cy5wb2x5ZmlsbFdyYXBGbHVzaENhbGxiYWNrKVdjKGRvY3VtZW50KTtlbHNle3ZhciBxYj1mdW5jdGlvbigpe1djKGRvY3VtZW50LmJvZHkpfTt3aW5kb3cuSFRNTEltcG9ydHM/XG53aW5kb3cuSFRNTEltcG9ydHMud2hlblJlYWR5KHFiKTpyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtpZihcImxvYWRpbmdcIj09PWRvY3VtZW50LnJlYWR5U3RhdGUpe3ZhciBhPWZ1bmN0aW9uKCl7cWIoKTtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGEpfTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGEpfWVsc2UgcWIoKX0pfU49ZnVuY3Rpb24oKXtKYyhWYy50YWtlUmVjb3JkcygpKX19dmFyIHJhPXt9LFVkPVByb21pc2UucmVzb2x2ZSgpLGZiPW51bGwsTGM9d2luZG93LkhUTUxJbXBvcnRzJiZ3aW5kb3cuSFRNTEltcG9ydHMud2hlblJlYWR5fHxudWxsLGdiLHhhPW51bGwsZmE9bnVsbDtxLnByb3RvdHlwZS54YT1mdW5jdGlvbigpeyF0aGlzLmVucXVldWVkJiZmYSYmKHRoaXMuZW5xdWV1ZWQ9ITAsdWIoZmEpKX07cS5wcm90b3R5cGUuYj1mdW5jdGlvbihhKXthLl9fc2VlbkJ5U2hhZHlDU1N8fFxuKGEuX19zZWVuQnlTaGFkeUNTUz0hMCx0aGlzLmN1c3RvbVN0eWxlcy5wdXNoKGEpLHRoaXMueGEoKSl9O3EucHJvdG90eXBlLmE9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuX19zaGFkeUNTU0NhY2hlZFN0eWxlP2EuX19zaGFkeUNTU0NhY2hlZFN0eWxlOmEuZ2V0U3R5bGU/YS5nZXRTdHlsZSgpOmF9O3EucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5jdXN0b21TdHlsZXMsYj0wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz1hW2JdO2lmKCFjLl9fc2hhZHlDU1NDYWNoZWRTdHlsZSl7dmFyIGQ9dGhpcy5hKGMpO2QmJihkPWQuX19hcHBsaWVkRWxlbWVudHx8ZCx4YSYmeGEoZCksYy5fX3NoYWR5Q1NTQ2FjaGVkU3R5bGU9ZCl9fXJldHVybiBhfTtxLnByb3RvdHlwZS5hZGRDdXN0b21TdHlsZT1xLnByb3RvdHlwZS5iO3EucHJvdG90eXBlLmdldFN0eWxlRm9yQ3VzdG9tU3R5bGU9cS5wcm90b3R5cGUuYTtxLnByb3RvdHlwZS5wcm9jZXNzU3R5bGVzPXEucHJvdG90eXBlLmM7XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhxLnByb3RvdHlwZSx7dHJhbnNmb3JtQ2FsbGJhY2s6e2dldDpmdW5jdGlvbigpe3JldHVybiB4YX0sc2V0OmZ1bmN0aW9uKGEpe3hhPWF9fSx2YWxpZGF0ZUNhbGxiYWNrOntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZmF9LHNldDpmdW5jdGlvbihhKXt2YXIgYj0hMTtmYXx8KGI9ITApO2ZhPWE7YiYmdGhpcy54YSgpfX19KTt2YXIgWGM9bmV3IGhhO2cucHJvdG90eXBlLnc9ZnVuY3Rpb24oKXtOKCl9O2cucHJvdG90eXBlLkk9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5tW2FdPSh0aGlzLm1bYV18fDApKzE7cmV0dXJuIGErXCItXCIrYn07Zy5wcm90b3R5cGUuSGE9ZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGEpfTtnLnByb3RvdHlwZS5KYT1mdW5jdGlvbihhKXtyZXR1cm4gVihhKX07Zy5wcm90b3R5cGUuSD1mdW5jdGlvbihhKXthPWEuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3R5bGVcIik7Zm9yKHZhciBiPVtdLGM9MDtjPGEubGVuZ3RoO2MrKyl7dmFyIGQ9XG5hW2NdO2IucHVzaChkLnRleHRDb250ZW50KTtkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZCl9cmV0dXJuIGIuam9pbihcIlwiKS50cmltKCl9O2cucHJvdG90eXBlLmFhPWZ1bmN0aW9uKGEpe3JldHVybihhPWEuY29udGVudC5xdWVyeVNlbGVjdG9yKFwic3R5bGVcIikpP2EuZ2V0QXR0cmlidXRlKFwiY3NzLWJ1aWxkXCIpfHxcIlwiOlwiXCJ9O2cucHJvdG90eXBlLnByZXBhcmVUZW1wbGF0ZT1mdW5jdGlvbihhLGIsYyl7aWYoIWEuZil7YS5mPSEwO2EubmFtZT1iO2EuZXh0ZW5kcz1jO3JhW2JdPWE7dmFyIGQ9dGhpcy5hYShhKSxlPXRoaXMuSChhKTtjPXtpczpiLGV4dGVuZHM6YyxtYjpkfTt6fHxwLmIoYS5jb250ZW50LGIpO3RoaXMuYygpO3ZhciBmPXZhLnRlc3QoZSl8fHVhLnRlc3QoZSk7dmEubGFzdEluZGV4PTA7dWEubGFzdEluZGV4PTA7ZT1kYihlKTtmJiZBJiZ0aGlzLmEmJnRoaXMuYS50cmFuc2Zvcm1SdWxlcyhlLGIpO2EuX3N0eWxlQXN0PWU7YS5nPWQ7ZD1bXTtBfHwoZD1NLkgoYS5fc3R5bGVBc3QpKTtcbmlmKCFkLmxlbmd0aHx8QSliPXRoaXMuTyhjLGEuX3N0eWxlQXN0LHo/YS5jb250ZW50Om51bGwscGJbYl0pLGEuYT1iO2EuYz1kfX07Zy5wcm90b3R5cGUuTz1mdW5jdGlvbihhLGIsYyxkKXtiPXAuYyhhLGIpO2lmKGIubGVuZ3RoKXJldHVybiBlYihiLGEuaXMsYyxkKX07Zy5wcm90b3R5cGUuY2E9ZnVuY3Rpb24oYSl7dmFyIGI9UihhKSxjPWIuaXM7Yj1iLlY7dmFyIGQ9cGJbY107Yz1yYVtjXTtpZihjKXt2YXIgZT1jLl9zdHlsZUFzdDt2YXIgZj1jLmN9cmV0dXJuIHYuc2V0KGEsbmV3IHYoZSxkLGYsMCxiKSl9O2cucHJvdG90eXBlLkY9ZnVuY3Rpb24oKXshdGhpcy5hJiZ3aW5kb3cuU2hhZHlDU1MmJndpbmRvdy5TaGFkeUNTUy5BcHBseVNoaW0mJih0aGlzLmE9d2luZG93LlNoYWR5Q1NTLkFwcGx5U2hpbSx0aGlzLmEuaW52YWxpZENhbGxiYWNrPVNkKX07Zy5wcm90b3R5cGUuRz1mdW5jdGlvbigpe3ZhciBhPXRoaXM7IXRoaXMuYiYmd2luZG93LlNoYWR5Q1NTJiZ3aW5kb3cuU2hhZHlDU1MuQ3VzdG9tU3R5bGVJbnRlcmZhY2UmJlxuKHRoaXMuYj13aW5kb3cuU2hhZHlDU1MuQ3VzdG9tU3R5bGVJbnRlcmZhY2UsdGhpcy5iLnRyYW5zZm9ybUNhbGxiYWNrPWZ1bmN0aW9uKGIpe2EucyhiKX0sdGhpcy5iLnZhbGlkYXRlQ2FsbGJhY2s9ZnVuY3Rpb24oKXtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXsoYS5iLmVucXVldWVkfHxhLmkpJiZhLmYoKX0pfSl9O2cucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt0aGlzLkYoKTt0aGlzLkcoKX07Zy5wcm90b3R5cGUuZj1mdW5jdGlvbigpe3RoaXMuYygpO2lmKHRoaXMuYil7dmFyIGE9dGhpcy5iLnByb2Nlc3NTdHlsZXMoKTt0aGlzLmIuZW5xdWV1ZWQmJihBP3RoaXMuRmEoYSk6KHRoaXMubyh0aGlzLmcsdGhpcy5oKSx0aGlzLkIoYSkpLHRoaXMuYi5lbnF1ZXVlZD0hMSx0aGlzLmkmJiFBJiZ0aGlzLnN0eWxlRG9jdW1lbnQoKSl9fTtnLnByb3RvdHlwZS5zdHlsZUVsZW1lbnQ9ZnVuY3Rpb24oYSxiKXt2YXIgYz1SKGEpLmlzLGQ9di5nZXQoYSk7ZHx8KGQ9dGhpcy5jYShhKSk7XG50aGlzLmooYSl8fCh0aGlzLmk9ITApO2ImJihkLk49ZC5OfHx7fSxPYmplY3QuYXNzaWduKGQuTixiKSk7aWYoQSl7aWYoZC5OKXtiPWQuTjtmb3IodmFyIGUgaW4gYiludWxsPT09ZT9hLnN0eWxlLnJlbW92ZVByb3BlcnR5KGUpOmEuc3R5bGUuc2V0UHJvcGVydHkoZSxiW2VdKX1pZigoKGU9cmFbY10pfHx0aGlzLmooYSkpJiZlJiZlLmEmJiFLYyhlKSl7aWYoS2MoZSl8fGUuX2FwcGx5U2hpbVZhbGlkYXRpbmdWZXJzaW9uIT09ZS5fYXBwbHlTaGltTmV4dFZlcnNpb24pdGhpcy5jKCksdGhpcy5hJiZ0aGlzLmEudHJhbnNmb3JtUnVsZXMoZS5fc3R5bGVBc3QsYyksZS5hLnRleHRDb250ZW50PXAuYyhhLGQuRCksVGQoZSk7eiYmKGM9YS5zaGFkb3dSb290KSYmKGMucXVlcnlTZWxlY3RvcihcInN0eWxlXCIpLnRleHRDb250ZW50PXAuYyhhLGQuRCkpO2QuRD1lLl9zdHlsZUFzdH19ZWxzZSB0aGlzLm8oYSxkKSxkLmxhJiZkLmxhLmxlbmd0aCYmdGhpcy5LKGEsZCl9O2cucHJvdG90eXBlLmw9XG5mdW5jdGlvbihhKXtyZXR1cm4oYT1hLmdldFJvb3ROb2RlKCkuaG9zdCk/di5nZXQoYSk/YTp0aGlzLmwoYSk6dGhpcy5nfTtnLnByb3RvdHlwZS5qPWZ1bmN0aW9uKGEpe3JldHVybiBhPT09dGhpcy5nfTtnLnByb3RvdHlwZS5LPWZ1bmN0aW9uKGEsYil7dmFyIGM9UihhKS5pcyxkPVhjLmZldGNoKGMsYi5KLGIubGEpLGU9ZD9kLnN0eWxlRWxlbWVudDpudWxsLGY9Yi5BO2IuQT1kJiZkLkF8fHRoaXMuSShjKTtlPU0ucyhhLGIuSixiLkEsZSk7enx8TS5vKGEsYi5BLGYpO2R8fFhjLmIoYyxiLkosZSxiLkEpfTtnLnByb3RvdHlwZS5vPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5sKGEpLGQ9di5nZXQoYyk7Yz1PYmplY3QuY3JlYXRlKGQuSnx8bnVsbCk7dmFyIGU9TS5JKGEsYi5EKTthPU0uTyhkLkQsYSkuQztPYmplY3QuYXNzaWduKGMsZS5hYixhLGUuZ2IpO3RoaXMuYmEoYyxiLk4pO00uYWEoYyk7Yi5KPWN9O2cucHJvdG90eXBlLmJhPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjIGluIGIpe3ZhciBkPVxuYltjXTtpZihkfHwwPT09ZClhW2NdPWR9fTtnLnByb3RvdHlwZS5zdHlsZURvY3VtZW50PWZ1bmN0aW9uKGEpe3RoaXMuc3R5bGVTdWJ0cmVlKHRoaXMuZyxhKX07Zy5wcm90b3R5cGUuc3R5bGVTdWJ0cmVlPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5zaGFkb3dSb290OyhjfHx0aGlzLmooYSkpJiZ0aGlzLnN0eWxlRWxlbWVudChhLGIpO2lmKGI9YyYmKGMuY2hpbGRyZW58fGMuY2hpbGROb2RlcykpZm9yKGE9MDthPGIubGVuZ3RoO2ErKyl0aGlzLnN0eWxlU3VidHJlZShiW2FdKTtlbHNlIGlmKGE9YS5jaGlsZHJlbnx8YS5jaGlsZE5vZGVzKWZvcihiPTA7YjxhLmxlbmd0aDtiKyspdGhpcy5zdHlsZVN1YnRyZWUoYVtiXSl9O2cucHJvdG90eXBlLkZhPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj0wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz10aGlzLmIuZ2V0U3R5bGVGb3JDdXN0b21TdHlsZShhW2JdKTtjJiZ0aGlzLkVhKGMpfX07Zy5wcm90b3R5cGUuQj1mdW5jdGlvbihhKXtmb3IodmFyIGI9XG4wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz10aGlzLmIuZ2V0U3R5bGVGb3JDdXN0b21TdHlsZShhW2JdKTtjJiZNLm0oYyx0aGlzLmguSil9fTtnLnByb3RvdHlwZS5zPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsYz1wYShhKTtXKGMsZnVuY3Rpb24oYSl7ej9wLncoYSk6cC5IKGEpO0EmJihiLmMoKSxiLmEmJmIuYS50cmFuc2Zvcm1SdWxlKGEpKX0pO0E/YS50ZXh0Q29udGVudD1WKGMpOnRoaXMuaC5ELnJ1bGVzLnB1c2goYyl9O2cucHJvdG90eXBlLkVhPWZ1bmN0aW9uKGEpe2lmKEEmJnRoaXMuYSl7dmFyIGI9cGEoYSk7dGhpcy5jKCk7dGhpcy5hLnRyYW5zZm9ybVJ1bGVzKGIpO2EudGV4dENvbnRlbnQ9VihiKX19O2cucHJvdG90eXBlLmdldENvbXB1dGVkU3R5bGVWYWx1ZT1mdW5jdGlvbihhLGIpe3ZhciBjO0F8fChjPSh2LmdldChhKXx8di5nZXQodGhpcy5sKGEpKSkuSltiXSk7cmV0dXJuKGM9Y3x8d2luZG93LmdldENvbXB1dGVkU3R5bGUoYSkuZ2V0UHJvcGVydHlWYWx1ZShiKSk/XG5jLnRyaW0oKTpcIlwifTtnLnByb3RvdHlwZS5JYT1mdW5jdGlvbihhLGIpe3ZhciBjPWEuZ2V0Um9vdE5vZGUoKTtiPWI/Yi5zcGxpdCgvXFxzLyk6W107Yz1jLmhvc3QmJmMuaG9zdC5sb2NhbE5hbWU7aWYoIWMpe3ZhciBkPWEuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIik7aWYoZCl7ZD1kLnNwbGl0KC9cXHMvKTtmb3IodmFyIGU9MDtlPGQubGVuZ3RoO2UrKylpZihkW2VdPT09cC5hKXtjPWRbZSsxXTticmVha319fWMmJmIucHVzaChwLmEsYyk7QXx8KGM9di5nZXQoYSkpJiZjLkEmJmIucHVzaChNLmcsYy5BKTtxYShhLGIuam9pbihcIiBcIikpfTtnLnByb3RvdHlwZS5HYT1mdW5jdGlvbihhKXtyZXR1cm4gdi5nZXQoYSl9O2cucHJvdG90eXBlLmZsdXNoPWcucHJvdG90eXBlLnc7Zy5wcm90b3R5cGUucHJlcGFyZVRlbXBsYXRlPWcucHJvdG90eXBlLnByZXBhcmVUZW1wbGF0ZTtnLnByb3RvdHlwZS5zdHlsZUVsZW1lbnQ9Zy5wcm90b3R5cGUuc3R5bGVFbGVtZW50O2cucHJvdG90eXBlLnN0eWxlRG9jdW1lbnQ9XG5nLnByb3RvdHlwZS5zdHlsZURvY3VtZW50O2cucHJvdG90eXBlLnN0eWxlU3VidHJlZT1nLnByb3RvdHlwZS5zdHlsZVN1YnRyZWU7Zy5wcm90b3R5cGUuZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlPWcucHJvdG90eXBlLmdldENvbXB1dGVkU3R5bGVWYWx1ZTtnLnByb3RvdHlwZS5zZXRFbGVtZW50Q2xhc3M9Zy5wcm90b3R5cGUuSWE7Zy5wcm90b3R5cGUuX3N0eWxlSW5mb0Zvck5vZGU9Zy5wcm90b3R5cGUuR2E7Zy5wcm90b3R5cGUudHJhbnNmb3JtQ3VzdG9tU3R5bGVGb3JEb2N1bWVudD1nLnByb3RvdHlwZS5zO2cucHJvdG90eXBlLmdldFN0eWxlQXN0PWcucHJvdG90eXBlLkhhO2cucHJvdG90eXBlLnN0eWxlQXN0VG9TdHJpbmc9Zy5wcm90b3R5cGUuSmE7Zy5wcm90b3R5cGUuZmx1c2hDdXN0b21TdHlsZXM9Zy5wcm90b3R5cGUuZjtPYmplY3QuZGVmaW5lUHJvcGVydGllcyhnLnByb3RvdHlwZSx7bmF0aXZlU2hhZG93OntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gen19LG5hdGl2ZUNzczp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIEF9fX0pO1xudmFyIEg9bmV3IGc7aWYod2luZG93LlNoYWR5Q1NTKXt2YXIgWWM9d2luZG93LlNoYWR5Q1NTLkFwcGx5U2hpbTt2YXIgWmM9d2luZG93LlNoYWR5Q1NTLkN1c3RvbVN0eWxlSW50ZXJmYWNlfXdpbmRvdy5TaGFkeUNTUz17U2NvcGluZ1NoaW06SCxwcmVwYXJlVGVtcGxhdGU6ZnVuY3Rpb24oYSxiLGMpe0guZigpO0gucHJlcGFyZVRlbXBsYXRlKGEsYixjKX0sc3R5bGVTdWJ0cmVlOmZ1bmN0aW9uKGEsYil7SC5mKCk7SC5zdHlsZVN1YnRyZWUoYSxiKX0sc3R5bGVFbGVtZW50OmZ1bmN0aW9uKGEpe0guZigpO0guc3R5bGVFbGVtZW50KGEpfSxzdHlsZURvY3VtZW50OmZ1bmN0aW9uKGEpe0guZigpO0guc3R5bGVEb2N1bWVudChhKX0sZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlOmZ1bmN0aW9uKGEsYil7cmV0dXJuIEguZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKGEsYil9LG5hdGl2ZUNzczpBLG5hdGl2ZVNoYWRvdzp6fTtZYyYmKHdpbmRvdy5TaGFkeUNTUy5BcHBseVNoaW09WWMpO1pjJiYod2luZG93LlNoYWR5Q1NTLkN1c3RvbVN0eWxlSW50ZXJmYWNlPVxuWmMpO3ZhciByYj13aW5kb3cuY3VzdG9tRWxlbWVudHMseWE9d2luZG93LkhUTUxJbXBvcnRzO3dpbmRvdy5XZWJDb21wb25lbnRzPXdpbmRvdy5XZWJDb21wb25lbnRzfHx7fTtpZihyYiYmcmIucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjayl7dmFyIHphLCRjPWZ1bmN0aW9uKCl7aWYoemEpe3ZhciBhPXphO3phPW51bGw7YSgpO3JldHVybiEwfX0sYWQ9eWEud2hlblJlYWR5O3JiLnBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2soZnVuY3Rpb24oYSl7emE9YTthZCgkYyl9KTt5YS53aGVuUmVhZHk9ZnVuY3Rpb24oYSl7YWQoZnVuY3Rpb24oKXskYygpP3lhLndoZW5SZWFkeShhKTphKCl9KX19eWEud2hlblJlYWR5KGZ1bmN0aW9uKCl7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7d2luZG93LldlYkNvbXBvbmVudHMucmVhZHk9ITA7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJXZWJDb21wb25lbnRzUmVhZHlcIix7YnViYmxlczohMH0pKX0pfSk7XG52YXIgYmQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO2JkLnRleHRDb250ZW50PVwiYm9keSB7dHJhbnNpdGlvbjogb3BhY2l0eSBlYXNlLWluIDAuMnM7IH0gXFxuYm9keVt1bnJlc29sdmVkXSB7b3BhY2l0eTogMDsgZGlzcGxheTogYmxvY2s7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsgfSBcXG5cIjt2YXIgY2Q9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRcIik7Y2QuaW5zZXJ0QmVmb3JlKGJkLGNkLmZpcnN0Q2hpbGQpfSkoKTt9KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJjb21wb25lbnRzLWhpLXNkLWNlLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHdlYmNvbXBvbmVudHMvd2ViY29tcG9uZW50c2pzL3dlYmNvbXBvbmVudHMtaGktc2QtY2UuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdjb21tb24vTGF5ZXInO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHsgTGluZVJhc3Rlcml6ZXIgfSBmcm9tICdsaW5lLXJhc3Rlcml6ZXIvTGluZVJhc3Rlcml6ZXInO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJ1JlbmRlcmVyJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdTdGFnZSc7XHJcbmltcG9ydCB7IFVJQ29udHJvbGxlciB9IGZyb20gJ3VpL1VJQ29udHJvbGxlcic7XHJcblxyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb24ge1xyXG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICBwcml2YXRlIHVpQ29udHJvbGxlcjogVUlDb250cm9sbGVyO1xyXG4gIHByaXZhdGUgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih7IGxpbmVSYXN0ZXJpemVyOiBuZXcgTGluZVJhc3Rlcml6ZXIoKSwgY2FudmFzOiB0aGlzLmNhbnZhcyB9KTtcclxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgU3RhZ2UoKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gbmV3IEV2ZW50QWdncmVnYXRvcigpO1xyXG5cclxuICAgIHRoaXMudWlDb250cm9sbGVyID0gbmV3IFVJQ29udHJvbGxlcih7XHJcbiAgICAgIHJlbmRlcmVyOiB0aGlzLnJlbmRlcmVyLFxyXG4gICAgICBzdGFnZTogdGhpcy5zdGFnZSxcclxuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvclxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICBjb25zdCBwb2x5Z29uTGF5ZXIgPSBuZXcgTGF5ZXIoTEVYLlBPTFlHT05fTEFZRVJfTkFNRSk7XHJcbiAgICB0aGlzLnN0YWdlLmxheWVycy5wdXNoKHBvbHlnb25MYXllcik7XHJcblxyXG4gICAgdGhpcy51aUNvbnRyb2xsZXIuaW5pdCgpO1xyXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnVpQ29udHJvbGxlci5kZXN0cm95KCk7XHJcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlcihldmVudDogUmVuZGVyRXZlbnQpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuY2xlYXIoKTtcclxuICAgIHRoaXMuc3RhZ2UucmVuZGVyKHRoaXMucmVuZGVyZXIpO1xyXG4gICAgZXZlbnQuaGFuZGxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihSZW5kZXJFdmVudC5ldmVudFR5cGUsIHRoaXMucmVuZGVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFJlbmRlckV2ZW50LmV2ZW50VHlwZSwgdGhpcy5yZW5kZXIpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9BcHBsaWNhdGlvbi50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuaW1wb3J0IHsgRXZlbnRRdWV1ZSB9IGZyb20gJ2V2ZW50cy9FdmVudFF1ZXVlJztcclxuXHJcbnR5cGUgRXZlbnRMaXN0ZW5lciA9IChldmVudDogQXBwRXZlbnQpID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRBZ2dyZWdhdG9yIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGxpc3RlbmVyTWFwID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50TGlzdGVuZXJbXT4oKTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UXVldWUgPSBuZXcgRXZlbnRRdWV1ZSgpO1xyXG4gIHByaXZhdGUgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gdGhpcy5nZXRFdmVudExpc3RlbmVycyhldmVudFR5cGUpO1xyXG5cclxuICAgIGlmIChldmVudExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSA9PT0gLTEpIHtcclxuICAgICAgZXZlbnRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1hcC5zZXQoZXZlbnRUeXBlLCBldmVudExpc3RlbmVycyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gdGhpcy5nZXRFdmVudExpc3RlbmVycyhldmVudFR5cGUpO1xyXG4gICAgY29uc3QgbGlzdGVuZXJJbmRleCA9IGV2ZW50TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG5cclxuICAgIGlmIChsaXN0ZW5lckluZGV4ICE9PSAtMSkge1xyXG4gICAgICBldmVudExpc3RlbmVycy5zcGxpY2UobGlzdGVuZXJJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1hcC5zZXQoZXZlbnRUeXBlLCBldmVudExpc3RlbmVycyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcGF0Y2hFdmVudChldmVudDogQXBwRXZlbnQpIHtcclxuICAgIHRoaXMuZXZlbnRRdWV1ZS5lbnF1ZXVlKGV2ZW50KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNEaXNwYXRjaGluZykge1xyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnRGcm9tUXVldWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGlzcGF0Y2hFdmVudEZyb21RdWV1ZSgpIHtcclxuICAgIHRoaXMuaXNEaXNwYXRjaGluZyA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50UXVldWUuZGVxdWV1ZSgpO1xyXG4gICAgY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmdldEV2ZW50TGlzdGVuZXJzKGV2ZW50LmV2ZW50VHlwZSk7XHJcbiAgICBldmVudExpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKGV2ZW50KSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZXZlbnRRdWV1ZS5pc0VtcHR5KCkpIHtcclxuICAgICAgdGhpcy5pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnRGcm9tUXVldWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RXZlbnRMaXN0ZW5lcnMoZXZlbnRUeXBlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyTWFwLmdldChldmVudFR5cGUpIHx8IFtdO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvRXZlbnRBZ2dyZWdhdG9yLnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50UXVldWUge1xyXG4gIHByaXZhdGUgX3F1ZXVlOiBBcHBFdmVudFtdID0gW107XHJcblxyXG4gIHB1YmxpYyBlbnF1ZXVlKGV2ZW50OiBBcHBFdmVudCkge1xyXG4gICAgdGhpcy5fcXVldWUucHVzaChldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVxdWV1ZSgpOiBBcHBFdmVudCB7XHJcbiAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdRdWV1ZSBpcyBlbXB0eScpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9xdWV1ZS5zcGxpY2UoMCwgMSlbMF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0VtcHR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TGVuZ3RoKCkgPT09IDA7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9FdmVudFF1ZXVlLnRzIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBvY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnMsIHJldmVyc2VPY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnMgfSBmcm9tICdsaW5lLXJhc3Rlcml6ZXIvb2N0YW50LXZlY3Rvci10cmFuc2Zvcm1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVSYXN0ZXJpemVyIHtcclxuICBwdWJsaWMgcmFzdGVyaXplTGluZShcclxuICAgIHN0YXJ0UG9pbnQ6IFBvaW50LFxyXG4gICAgZW5kUG9pbnQ6IFBvaW50LFxyXG4gICAgdGhpY2tuZXNzOiBudW1iZXJcclxuICApOiBQb2ludFtdIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uVmVjdG9yID0gUG9pbnQuc3VidHJhY3QoZW5kUG9pbnQsIHN0YXJ0UG9pbnQpO1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25WZWN0b3JPY3RhbnQgPSB0cmFuc2xhdGlvblZlY3Rvci5nZXRPY3RhbnQoKTtcclxuICAgIGNvbnN0IHZlY3RvclRyYW5zZm9ybWF0aW9uID1cclxuICAgICAgb2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zW3RyYW5zbGF0aW9uVmVjdG9yT2N0YW50XTtcclxuICAgIGNvbnN0IHJldmVyc2VWZWN0b3JUcmFuc2Zvcm1hdGlvbiA9XHJcbiAgICAgIHJldmVyc2VPY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnNbdHJhbnNsYXRpb25WZWN0b3JPY3RhbnRdO1xyXG5cclxuICAgIGNvbnN0IHJhc3Rlcml6ZWRUcmFuc2Zvcm1lZExpbmUgPSB0aGlzLnJhc3Rlcml6ZUxpbmVGaXJzdFF1YWRyYW50KFxyXG4gICAgICB2ZWN0b3JUcmFuc2Zvcm1hdGlvbih0cmFuc2xhdGlvblZlY3RvciksXHJcbiAgICAgIHRoaWNrbmVzc1xyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gcmFzdGVyaXplZFRyYW5zZm9ybWVkTGluZS5tYXAocG9pbnQgPT5cclxuICAgICAgUG9pbnQuYWRkKHJldmVyc2VWZWN0b3JUcmFuc2Zvcm1hdGlvbihwb2ludCksIHN0YXJ0UG9pbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByYXN0ZXJpemVMaW5lRmlyc3RRdWFkcmFudChlbmRQb2ludDogUG9pbnQsIHRoaWNrbmVzczogbnVtYmVyKSB7XHJcbiAgICBjb25zdCByYXN0ZXJpemVkTGluZTogUG9pbnRbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGR4ID0gZW5kUG9pbnQueDtcclxuICAgIGNvbnN0IGR5ID0gZW5kUG9pbnQueTtcclxuICAgIGNvbnN0IGluY3JlbWVudEUgPSAyICogZHk7XHJcbiAgICBjb25zdCBpbmNyZW1lbnRORSA9IDIgKiAoZHkgLSBkeCk7XHJcblxyXG4gICAgbGV0IGQgPSAyICogZHkgLSBkeDtcclxuICAgIGxldCB4ID0gMDtcclxuICAgIGxldCB5ID0gMDtcclxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgdGhpcy5nZXRUaGlja1BvaW50c0l0ZXJhdG9ySW5GaXJzdFF1YWRyYW50KFxyXG4gICAgICBuZXcgUG9pbnQoeCwgeSksXHJcbiAgICAgIHRoaWNrbmVzc1xyXG4gICAgKSkge1xyXG4gICAgICByYXN0ZXJpemVkTGluZS5wdXNoKHBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoeCA8IGVuZFBvaW50LngpIHtcclxuICAgICAgaWYgKGQgPCAwKSB7XHJcbiAgICAgICAgZCArPSBpbmNyZW1lbnRFO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQgKz0gaW5jcmVtZW50TkU7XHJcbiAgICAgICAgeSArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHggKz0gMTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgdGhpcy5nZXRUaGlja1BvaW50c0l0ZXJhdG9ySW5GaXJzdFF1YWRyYW50KFxyXG4gICAgICAgIG5ldyBQb2ludCh4LCB5KSxcclxuICAgICAgICB0aGlja25lc3NcclxuICAgICAgKSkge1xyXG4gICAgICAgIHJhc3Rlcml6ZWRMaW5lLnB1c2gocG9pbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJhc3Rlcml6ZWRMaW5lO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSAqZ2V0VGhpY2tQb2ludHNJdGVyYXRvckluRmlyc3RRdWFkcmFudChcclxuICAgIHBvaW50OiBQb2ludCxcclxuICAgIHRoaWNrbmVzczogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgZHkgPSAxO1xyXG5cclxuICAgIHlpZWxkIHBvaW50O1xyXG5cclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBjdXJyZW50VGhpY2tuZXNzID0gMTtcclxuICAgICAgY3VycmVudFRoaWNrbmVzcyA8IHRoaWNrbmVzcztcclxuICAgICAgY3VycmVudFRoaWNrbmVzcyArPSAxXHJcbiAgICApIHtcclxuICAgICAgeWllbGQgbmV3IFBvaW50KHBvaW50LngsIHBvaW50LnkgKyBkeSk7XHJcbiAgICAgIGR5ID0gLWR5O1xyXG5cclxuICAgICAgaWYgKGR5ID4gMCkge1xyXG4gICAgICAgIGR5ICs9IDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbGluZS1yYXN0ZXJpemVyL0xpbmVSYXN0ZXJpemVyLnRzIiwiaW1wb3J0IHsgT2N0YW50IH0gZnJvbSAnY29tbW9uL09jdGFudCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbi8vIFRyYW5zZm9ybWF0aW9ucyBmcm9tIGEgc3BlY2lmaWMgb2N0YW50IHRvIHRoZSBmaXJzdCBvY3RhbnRcclxuY29uc3Qgb2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zID0ge1xyXG4gIFtPY3RhbnQuRmlyc3RdOiAocDogUG9pbnQpID0+IHAsXHJcbiAgW09jdGFudC5TZWNvbmRdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludChwLnksIHAueCksXHJcbiAgW09jdGFudC5UaGlyZF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueSwgLXAueCksXHJcbiAgW09jdGFudC5Gb3VydGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC54LCBwLnkpLFxyXG4gIFtPY3RhbnQuRmlmdGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC54LCAtcC55KSxcclxuICBbT2N0YW50LlNpeHRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueSwgLXAueCksXHJcbiAgW09jdGFudC5TZXZlbnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueSwgcC54KSxcclxuICBbT2N0YW50LkVpZ2h0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueCwgLXAueSlcclxufTtcclxuXHJcbi8vIFRyYW5zZm9ybWF0aW9ucyBmcm9tIHRoZSBmaXJzdCBvY3RhbnQgdG8gYSBzcGVjaWZpYyBvY3RhbnRcclxuY29uc3QgcmV2ZXJzZU9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9ucyA9IHtcclxuICBbT2N0YW50LkZpcnN0XTogKHA6IFBvaW50KSA9PiBwLFxyXG4gIFtPY3RhbnQuU2Vjb25kXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQocC55LCBwLngpLFxyXG4gIFtPY3RhbnQuVGhpcmRdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC55LCBwLngpLFxyXG4gIFtPY3RhbnQuRm91cnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueCwgcC55KSxcclxuICBbT2N0YW50LkZpZnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueCwgLXAueSksXHJcbiAgW09jdGFudC5TaXh0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLnksIC1wLngpLFxyXG4gIFtPY3RhbnQuU2V2ZW50aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueSwgLXAueCksXHJcbiAgW09jdGFudC5FaWdodGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludChwLngsIC1wLnkpXHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIG9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9ucyxcclxuICByZXZlcnNlT2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2xpbmUtcmFzdGVyaXplci9vY3RhbnQtdmVjdG9yLXRyYW5zZm9ybWF0aW9ucy50cyIsImltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29tbW9uL0NvbG9yJztcclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnY29tbW9uL0NPTE9SUyc7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZVJhc3Rlcml6ZXIgfSBmcm9tICdsaW5lLXJhc3Rlcml6ZXIvTGluZVJhc3Rlcml6ZXInO1xyXG5cclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuaW50ZXJmYWNlIFJlbmRlcmVyRGVwZW5kZW5jaWVzIHtcclxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIGxpbmVSYXN0ZXJpemVyOiBMaW5lUmFzdGVyaXplcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcclxuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZW5kZXJpbmdDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgcHJpdmF0ZSBsaW5lUmFzdGVyaXplcjogTGluZVJhc3Rlcml6ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUmVuZGVyZXJEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuY2FudmFzID0gZGVwZW5kZW5jaWVzLmNhbnZhcztcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgaWYgKGNvbnRleHQgPT09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZ2V0IGNhbnZhcyAyZCByZW5kZXJpbmcgY29udGV4dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbnRleHQuZm9udCA9IGNvbmZpZ3VyYXRpb24uY2FudmFzRm9udDtcclxuICAgIHRoaXMubGluZVJhc3Rlcml6ZXIgPSBkZXBlbmRlbmNpZXMubGluZVJhc3Rlcml6ZXI7XHJcbiAgICB0aGlzLnNldEZpbGxDb2xvcihDT0xPUlMuQkxBQ0spO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXdQb2ludChwb2ludDogUG9pbnQpIHtcclxuICAgIHRoaXMuZHJhd1BpeGVsKHBvaW50LngsIHBvaW50LnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXdQaXhlbCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5yZW5kZXJpbmdDb250ZXh0LmZpbGxSZWN0KHgsIHksIDEsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXdMaW5lKGxpbmU6IExpbmUsIGxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcyk6IHZvaWQ7XHJcbiAgcHVibGljIGRyYXdMaW5lKHN0YXJ0UG9pbnQ6IFBvaW50LCBlbmRQb2ludDogUG9pbnQsIGxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcyk6IHZvaWQ7XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby1hbnlcclxuICBwdWJsaWMgZHJhd0xpbmUoLi4uYXJnczogYW55W10pIHtcclxuICAgIGlmIChhcmdzWzBdIGluc3RhbmNlb2YgTGluZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kcmF3TGluZUJldHdlZW5Qb2ludHMoYXJnc1swXS5wMSwgYXJnc1swXS5wMiwgYXJnc1sxXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5kcmF3TGluZUJldHdlZW5Qb2ludHMoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhd1BhdGgocGF0aDogUGF0aCkge1xyXG4gICAgY29uc3QgcGF0aExpbmVQcm9wZXJ0aWVzID0gcGF0aC5nZXRMaW5lUHJvcGVydGllcygpO1xyXG5cclxuICAgIGZvciAoY29uc3QgbGluZSBvZiBwYXRoLmdldExpbmVJdGVyYXRvcigpKSB7XHJcbiAgICAgIHRoaXMuZHJhd0xpbmUobGluZSwgcGF0aExpbmVQcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIFBvbHlnb24pIHtcclxuICAgICAgdGhpcy5kcmF3TGluZUNvbmRpdGlvbnMocGF0aC5nZXRMaW5lQ29uZGl0aW9ucygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaWxsVGV4dCh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZDtcclxuICBwdWJsaWMgZmlsbFRleHQodGV4dDogc3RyaW5nLCBwb2ludDogUG9pbnQpOiB2b2lkO1xyXG4gIHB1YmxpYyBmaWxsVGV4dCh0ZXh0OiBzdHJpbmcsIHBvaW50T3JYOiBudW1iZXIgfCBQb2ludCwgeT86IG51bWJlcikge1xyXG4gICAgbGV0IHggPSBwb2ludE9yWDtcclxuICAgIGlmICh0eXBlb2YgcG9pbnRPclggPT09ICdvYmplY3QnICYmIHBvaW50T3JYIGluc3RhbmNlb2YgUG9pbnQpIHtcclxuICAgICAgeCA9IHBvaW50T3JYLng7XHJcbiAgICAgIHkgPSBwb2ludE9yWC55O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dC5maWxsVGV4dCh0ZXh0LCA8bnVtYmVyPngsIDxudW1iZXI+eSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEZpbGxDb2xvcihjb2xvcjogQ29sb3IpIHtcclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dC5maWxsU3R5bGUgPSBjb2xvci5maWxsU3R5bGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYXdMaW5lQmV0d2VlblBvaW50cyhcclxuICAgIHN0YXJ0UG9pbnQ6IFBvaW50LFxyXG4gICAgZW5kUG9pbnQ6IFBvaW50LFxyXG4gICAgbGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzXHJcbiAgKSB7XHJcbiAgICBjb25zdCByYXN0ZXJpemVkTGluZVBvaW50cyA9IHRoaXMubGluZVJhc3Rlcml6ZXIucmFzdGVyaXplTGluZShcclxuICAgICAgc3RhcnRQb2ludCxcclxuICAgICAgZW5kUG9pbnQsXHJcbiAgICAgIGxpbmVQcm9wZXJ0aWVzLnRoaWNrbmVzc1xyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNldEZpbGxDb2xvcihsaW5lUHJvcGVydGllcy5jb2xvcik7XHJcbiAgICByYXN0ZXJpemVkTGluZVBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHRoaXMuZHJhd1BvaW50KHBvaW50KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYXdMaW5lQ29uZGl0aW9ucyhsaW5lQ29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdKSB7XHJcbiAgICBsaW5lQ29uZGl0aW9ucy5mb3JFYWNoKGxpbmVDb25kaXRpb24gPT4ge1xyXG4gICAgICB0aGlzLmZpbGxUZXh0KFxyXG4gICAgICAgIGxpbmVDb25kaXRpb24uZ2V0TGFiZWwoKSxcclxuICAgICAgICBQb2ludC5hZGQobGluZUNvbmRpdGlvbi5saW5lLmdldE1pZGRsZVBvaW50KCksIGNvbmZpZ3VyYXRpb24ubGluZUNvbmRpdGlvbkxhYmVsT2Zmc2V0KVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL1JlbmRlcmVyLnRzIiwiZXhwb3J0IGNsYXNzIENvbG9yIHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcjogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBnOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGI6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgZmlsbFN0eWxlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHI6IG51bWJlciwgYjogbnVtYmVyLCBnOiBudW1iZXIpIHtcclxuICAgIHRoaXMuciA9IHI7XHJcbiAgICB0aGlzLmIgPSBiO1xyXG4gICAgdGhpcy5nID0gZztcclxuXHJcbiAgICB0aGlzLmZpbGxTdHlsZSA9IGByZ2IoJHt0aGlzLnJ9LCAke3RoaXMuZ30sICR7dGhpcy5ifSlgO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vQ29sb3IudHMiLCJpbXBvcnQgeyBMYXllciB9IGZyb20gJ2NvbW1vbi9MYXllcic7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcblxyXG5leHBvcnQgY2xhc3MgSGl0VGVzdFJlc3VsdCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGxpbmU6IExpbmU7XHJcbiAgcHVibGljIHBhdGg/OiBQYXRoO1xyXG4gIHB1YmxpYyBsYXllcj86IExheWVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsaW5lOiBMaW5lLCBwYXRoPzogUGF0aCwgbGF5ZXI/OiBMYXllcikge1xyXG4gICAgdGhpcy5saW5lID0gbGluZTtcclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICB0aGlzLmxheWVyID0gbGF5ZXI7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9IaXRUZXN0UmVzdWx0LnRzIiwiaW1wb3J0IHsgSGl0VGVzdFJlc3VsdCB9IGZyb20gJ2NvbW1vbi9IaXRUZXN0UmVzdWx0JztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdjb21tb24vTGF5ZXInO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnUmVuZGVyZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YWdlIHtcclxuICBwdWJsaWMgbGF5ZXJzOiBMYXllcltdID0gW107XHJcblxyXG4gIHB1YmxpYyByZW5kZXIocmVuZGVyZXI6IFJlbmRlcmVyKSB7XHJcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IGxheWVyLnJlbmRlcihyZW5kZXJlcikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmxheWVycy5pbmRleE9mKGxheWVyKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChwb2ludDogUG9pbnQpOiBIaXRUZXN0UmVzdWx0IHwgbnVsbCB7XHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGxheWVyLmhpdFRlc3QocG9pbnQpO1xyXG4gICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRMYXllckJ5TmFtZShuYW1lOiBzdHJpbmcpOiBMYXllciB7XHJcbiAgICBjb25zdCBmb3VuZExheWVyID0gdGhpcy5sYXllcnMuZmluZChsYXllciA9PiBsYXllci5uYW1lID09PSBuYW1lKTtcclxuXHJcbiAgICBpZiAoIWZvdW5kTGF5ZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBMYXllciB3aXRoIG5hbWUgJHtuYW1lfSBkb2VzIG5vdCBleGlzdGApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3VuZExheWVyO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9TdGFnZS50cyIsImltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdSZW5kZXJlcic7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5cclxuaW1wb3J0IHsgVUlDb25kaXRpb25Db250cm9sbGVyIH0gZnJvbSAndWkvY29uZGl0aW9ucy9VSUNvbmRpdGlvbkNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgfSBmcm9tICd1aS9Nb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXInO1xyXG5pbXBvcnQgeyBOZXdQb2x5Z29uVUlDb250cm9sbGVyIH0gZnJvbSAndWkvTmV3UG9seWdvblVJQ29udHJvbGxlcic7XHJcbmltcG9ydCB7IFBvaW50RHJhZ2dpbmdTZXJ2aWNlIH0gZnJvbSAndWkvUG9pbnREcmFnZ2luZ1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2ludEluc2VydGVyU2VydmljZSB9IGZyb20gJ3VpL1BvaW50SW5zZXJ0ZXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9pbnRSZW1vdmVyU2VydmljZSB9IGZyb20gJ3VpL1BvaW50UmVtb3ZlclNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2ludFN5bmNTZXJ2aWNlIH0gZnJvbSAndWkvUG9pbnRTeW5jU2VydmljZSc7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDb25kaXRpb25NYXRjaGVyIH0gZnJvbSAnY29uZGl0aW9ucy9Db25kaXRpb25NYXRjaGVyJztcclxuXHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBMaW5lQ2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9MaW5lQ2xpY2tFdmVudCc7XHJcblxyXG5pbXBvcnQgJ3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0J1dHRvbic7XHJcbmltcG9ydCAndWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nJztcclxuXHJcbmludGVyZmFjZSBVSUNvbnRyb2xsZXJEZXBlbmRlbmNpZXMge1xyXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gIHN0YWdlOiBTdGFnZTtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVJQ29udHJvbGxlciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIHByaXZhdGUgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgcHJpdmF0ZSBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSB1aVNlcnZpY2VzOiBVSVNlcnZpY2VbXSA9IFtdO1xyXG4gIHByaXZhdGUgbmV3UG9seWdvblVJQ29udHJvbGxlcjogTmV3UG9seWdvblVJQ29udHJvbGxlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBVSUNvbnRyb2xsZXJEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuY2FudmFzID0gZGVwZW5kZW5jaWVzLmNhbnZhcztcclxuICAgIHRoaXMucmVuZGVyZXIgPSBkZXBlbmRlbmNpZXMucmVuZGVyZXI7XHJcbiAgICB0aGlzLnN0YWdlID0gZGVwZW5kZW5jaWVzLnN0YWdlO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICBjb25zdCBhcHBsaWNhdGlvblVJQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uZmlndXJhdGlvbi5hcHBsaWNhdGlvblVJQ29udGFpbmVySUQpO1xyXG4gICAgaWYgKCFhcHBsaWNhdGlvblVJQ29udGFpbmVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXBwbGljYXRpb24gVUkgY29udGFpbmVyIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lciA9IGFwcGxpY2F0aW9uVUlDb250YWluZXI7XHJcblxyXG4gICAgdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgPSBuZXcgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyKHRoaXMuY2FudmFzKTtcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZU5ld1BvbHlnb25VSUNvbnRyb2xsZXIoKTtcclxuICAgIHRoaXMuY3JlYXRlUG9pbnREcmFnZ2luZ1NlcnZpY2UoKTtcclxuICAgIHRoaXMuY3JlYXRlUG9pbnRJbnNlcnRlclNlcnZpY2UoKTtcclxuICAgIHRoaXMuY3JlYXRlUG9pbnRSZW1vdmVyU2VydmljZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVQb2ludFN5bmNTZXJ2aWNlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVVJQ29uZGl0aW9uQ29udHJvbGxlcigpO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5mb3JFYWNoKHVpU2VydmljZSA9PiB1aVNlcnZpY2UuaW5pdCgpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5mb3JFYWNoKHVpU2VydmljZSA9PiB1aVNlcnZpY2UuZGVzdHJveSgpKTtcclxuICAgIHRoaXMudWlTZXJ2aWNlcy5zcGxpY2UoMCwgdGhpcy51aVNlcnZpY2VzLmxlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIuZ2V0UG9pbnRGcm9tTW91c2VFdmVudChldmVudCk7XHJcblxyXG4gICAgY29uc3QgaGl0VGVzdFJlc3VsdCA9IHRoaXMuc3RhZ2UuaGl0VGVzdChwb2ludCk7XHJcblxyXG4gICAgaWYgKCFoaXRUZXN0UmVzdWx0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5ld1BvbHlnb25VSUNvbnRyb2xsZXIuYWRkTmV3UG9pbnQocG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaGl0VGVzdFJlc3VsdC5wYXRoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IExpbmVDbGlja0V2ZW50KGhpdFRlc3RSZXN1bHQubGluZSwgaGl0VGVzdFJlc3VsdC5wYXRoLCBwb2ludCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVQb2ludFN5bmNTZXJ2aWNlKCkge1xyXG4gICAgY29uc3QgcG9pbnRTeW5jU2VydmljZSA9IG5ldyBQb2ludFN5bmNTZXJ2aWNlKHtcclxuICAgICAgY29udGFpbmVyOiB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIsXHJcbiAgICAgIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIsXHJcbiAgICAgIHN0YWdlOiB0aGlzLnN0YWdlLFxyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaChwb2ludFN5bmNTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUG9pbnRSZW1vdmVyU2VydmljZSgpIHtcclxuICAgIGNvbnN0IHBvaW50UmVtb3ZlclNlcnZpY2UgPSBuZXcgUG9pbnRSZW1vdmVyU2VydmljZSh7XHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHBvaW50UmVtb3ZlclNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVQb2ludERyYWdnaW5nU2VydmljZSgpIHtcclxuICAgIGNvbnN0IHBvaW50RHJhZ2dpbmdTZXJ2aWNlID0gbmV3IFBvaW50RHJhZ2dpbmdTZXJ2aWNlKHtcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvcixcclxuICAgICAgc3RhZ2U6IHRoaXMuc3RhZ2VcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHBvaW50RHJhZ2dpbmdTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTmV3UG9seWdvblVJQ29udHJvbGxlcigpIHtcclxuICAgIHRoaXMubmV3UG9seWdvblVJQ29udHJvbGxlciA9IG5ldyBOZXdQb2x5Z29uVUlDb250cm9sbGVyKHtcclxuICAgICAgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyLFxyXG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxyXG4gICAgICBzdGFnZTogdGhpcy5zdGFnZSxcclxuICAgICAgcG9seWdvbkxheWVyOiB0aGlzLnN0YWdlLmZpbmRMYXllckJ5TmFtZShMRVguUE9MWUdPTl9MQVlFUl9OQU1FKSxcclxuICAgICAgcmVuZGVyZXI6IHRoaXMucmVuZGVyZXIsXHJcbiAgICAgIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIsXHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHRoaXMubmV3UG9seWdvblVJQ29udHJvbGxlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBvaW50SW5zZXJ0ZXJTZXJ2aWNlKCkge1xyXG4gICAgY29uc3QgcG9pbnRJbnNlcnRlclNlcnZpY2UgPSBuZXcgUG9pbnRJbnNlcnRlclNlcnZpY2Uoe1xyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaChwb2ludEluc2VydGVyU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVVJQ29uZGl0aW9uQ29udHJvbGxlcigpIHtcclxuICAgIGNvbnN0IHVpQ29uZGl0aW9uQ29udHJvbGxlciA9IG5ldyBVSUNvbmRpdGlvbkNvbnRyb2xsZXIoe1xyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yLFxyXG4gICAgICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIsXHJcbiAgICAgIGNvbmRpdGlvbk1hdGNoZXI6IG5ldyBDb25kaXRpb25NYXRjaGVyKClcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHVpQ29uZGl0aW9uQ29udHJvbGxlcik7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL1VJQ29udHJvbGxlci50cyIsImltcG9ydCB7IENvbmRpdGlvblBpY2tlciB9IGZyb20gJ3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyJztcclxuaW1wb3J0IHsgVUlTZXJ2aWNlIH0gZnJvbSAndWkvVUlTZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBMaW5lQ2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9MaW5lQ2xpY2tFdmVudCc7XHJcbmltcG9ydCB7IExFWCB9IGZyb20gJ0xFWCc7XHJcblxyXG5pbXBvcnQgeyBDb25kaXRpb25GaXhlciwgRml4aW5nRGlyZWN0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9Db25kaXRpb25GaXhlcic7XHJcbmltcG9ydCB7IENvbmRpdGlvbk1hdGNoZXIgfSBmcm9tICdjb25kaXRpb25zL0NvbmRpdGlvbk1hdGNoZXInO1xyXG5cclxuaW1wb3J0IHsgUmVuZGVyRXZlbnQgfSBmcm9tICdldmVudHMvUmVuZGVyRXZlbnQnO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50c0V2ZW50IH0gZnJvbSAnZXZlbnRzL3VpL1N5bmNDb21wb25lbnRzRXZlbnQnO1xyXG5cclxuaW50ZXJmYWNlIFVJQ29uZGl0aW9uQ29udHJvbGxlckRlcGVuZGVuY2llcyB7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZGl0aW9uTWF0Y2hlcjogQ29uZGl0aW9uTWF0Y2hlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVJQ29uZGl0aW9uQ29udHJvbGxlciBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZGl0aW9uTWF0Y2hlcjogQ29uZGl0aW9uTWF0Y2hlcjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjb25kaXRpb25QaWNrZXI6IENvbmRpdGlvblBpY2tlciA9IG5ldyBDb25kaXRpb25QaWNrZXIoKTtcclxuICBwcml2YXRlIHByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID0gMDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBVSUNvbmRpdGlvbkNvbnRyb2xsZXJEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lciA9IGRlcGVuZGVuY2llcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyO1xyXG4gICAgdGhpcy5jb25kaXRpb25NYXRjaGVyID0gZGVwZW5kZW5jaWVzLmNvbmRpdGlvbk1hdGNoZXI7XHJcblxyXG4gICAgdGhpcy5vbkxpbmVDbGljayA9IHRoaXMub25MaW5lQ2xpY2suYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25OZXdDb25kaXRpb24gPSB0aGlzLm9uTmV3Q29uZGl0aW9uLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uUmVtb3ZlQ29uZGl0aW9uID0gdGhpcy5vblJlbW92ZUNvbmRpdGlvbi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKExpbmVDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vbkxpbmVDbGljayk7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb25kaXRpb25QaWNrZXIpO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihMRVguTkVXX0NPTkRJVElPTl9FVkVOVF9OQU1FLCB0aGlzLm9uTmV3Q29uZGl0aW9uKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoTEVYLlJFTU9WRV9DT05ESVRJT05fRVZFTlRfTkFNRSwgdGhpcy5vblJlbW92ZUNvbmRpdGlvbik7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScsICdmYWxzZScpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKExpbmVDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vbkxpbmVDbGljayk7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKExFWC5ORVdfQ09ORElUSU9OX0VWRU5UX05BTUUsIHRoaXMub25OZXdDb25kaXRpb24pO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgTEVYLlJFTU9WRV9DT05ESVRJT05fRVZFTlRfTkFNRSxcclxuICAgICAgdGhpcy5vblJlbW92ZUNvbmRpdGlvblxyXG4gICAgKTtcclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmNvbmRpdGlvblBpY2tlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTGluZUNsaWNrKGV2ZW50OiBMaW5lQ2xpY2tFdmVudCkge1xyXG4gICAgaWYgKCEoZXZlbnQucGF5bG9hZC5wYXRoIGluc3RhbmNlb2YgUG9seWdvbikpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzQ2xpY2tUaW1lc3RhbXAgPSB0aGlzLnByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wO1xyXG4gICAgY29uc3QgY3VycmVudFRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICB0aGlzLnByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID0gY3VycmVudFRpbWVzdGFtcDtcclxuXHJcbiAgICBpZiAoY3VycmVudFRpbWVzdGFtcCAtIHByZXZpb3VzQ2xpY2tUaW1lc3RhbXAgPD0gY29uZmlndXJhdGlvbi5kb3VibGVDbGlja01heERlbGF5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvblBpY2tlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScsICdmYWxzZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnNldEF0dHJpYnV0ZSgnZGF0YS14JywgZXZlbnQucGF5bG9hZC5wb3NpdGlvbi54LnRvU3RyaW5nKCkpO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIuc2V0QXR0cmlidXRlKCdkYXRhLXknLCBldmVudC5wYXlsb2FkLnBvc2l0aW9uLnkudG9TdHJpbmcoKSk7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci51cGRhdGVTZWxlY3RlZExpbmUoZXZlbnQucGF5bG9hZC5saW5lLCBldmVudC5wYXlsb2FkLnBhdGgpO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIuc2V0QXR0cmlidXRlKCdkYXRhLXZpc2libGUnLCAndHJ1ZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk5ld0NvbmRpdGlvbihldmVudDogQ3VzdG9tRXZlbnQpIHtcclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb246IExpbmVDb25kaXRpb24gPSBldmVudC5kZXRhaWw7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbGluZUNvbmRpdGlvbi52ZXJpZnlDYW5CZUFwcGxpZWQoKTtcclxuICAgICAgdGhpcy5jb25kaXRpb25NYXRjaGVyLnZlcmlmeUNvbmRpdGlvbkFsbG93ZWQobGluZUNvbmRpdGlvbik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gYWxlcnQoYENhbm5vdCBhcHBseSBjb25kaXRpb246ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxpbmVDb25kaXRpb24uaXNNZXQoKSkge1xyXG4gICAgICB0aGlzLmZpeFVubWV0TGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lQ29uZGl0aW9uLnBvbHlnb24uYWRkTGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFJlbmRlckV2ZW50KCkpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgU3luY0NvbXBvbmVudHNFdmVudCgpKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnVwZGF0ZUJ1dHRvbnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZml4VW5tZXRMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb246IExpbmVDb25kaXRpb24pIHtcclxuICAgIGNvbnN0IHJlYWxQb2x5Z29uID0gbGluZUNvbmRpdGlvbi5wb2x5Z29uO1xyXG4gICAgY29uc3QgcDFJbmRleCA9IHJlYWxQb2x5Z29uLmZpbmRQb2ludEluZGV4KGxpbmVDb25kaXRpb24ubGluZS5wMSk7XHJcbiAgICBjb25zdCBwMkluZGV4ID0gcmVhbFBvbHlnb24uZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAyKTtcclxuICAgIGNvbnN0IHBvbHlnb25DbG9uZSA9IHJlYWxQb2x5Z29uLmNsb25lKCk7XHJcblxyXG4gICAgY29uc3QgY29uZGl0aW9uRml4ZXIgPSBuZXcgQ29uZGl0aW9uRml4ZXIocG9seWdvbkNsb25lLCBwb2x5Z29uQ2xvbmUuZ2V0VmVydGV4KHAxSW5kZXgpLCBbXHJcbiAgICAgIGxpbmVDb25kaXRpb24uZHVwbGljYXRlRm9yTmV3TGluZShcclxuICAgICAgICBuZXcgTGluZShwb2x5Z29uQ2xvbmUuZ2V0VmVydGV4KHAxSW5kZXgpLCBwb2x5Z29uQ2xvbmUuZ2V0VmVydGV4KHAySW5kZXgpKSxcclxuICAgICAgICBwb2x5Z29uQ2xvbmVcclxuICAgICAgKVxyXG4gICAgXSk7XHJcbiAgICBjb25kaXRpb25GaXhlci50cnlGaXgoKTtcclxuXHJcbiAgICBpZiAoY29uZGl0aW9uRml4ZXIuZml4U3VjY2Vzc2Z1bCkge1xyXG4gICAgICByZXR1cm4gcmVhbFBvbHlnb24ubW92ZVRvKHBvbHlnb25DbG9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uZGl0aW9uRml4ZXIucmVzZXQoKTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLmRpcmVjdGlvbiA9IEZpeGluZ0RpcmVjdGlvbi5SZXZlcnNlO1xyXG4gICAgcG9seWdvbkNsb25lLm1vdmVUbyhyZWFsUG9seWdvbik7XHJcbiAgICBjb25kaXRpb25GaXhlci50cnlGaXgoKTtcclxuXHJcbiAgICBpZiAoIWNvbmRpdGlvbkZpeGVyLmZpeFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgYWxlcnQoJ0Nhbm5vdCBhZGQgYSBjb25kaXRpb24nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SZW1vdmVDb25kaXRpb24oZXZlbnQ6IEN1c3RvbUV2ZW50KSB7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uID0gZXZlbnQuZGV0YWlsO1xyXG5cclxuICAgIGxpbmVDb25kaXRpb24ucG9seWdvbi5yZW1vdmVMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb24pO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIudXBkYXRlQnV0dG9ucygpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb25kaXRpb25zL1VJQ29uZGl0aW9uQ29udHJvbGxlci50cyIsImltcG9ydCB7IEZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0ZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IEhvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0hvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IFZlcnRpY2FsTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50JztcclxuXHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQge1xyXG4gIExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzLFxyXG4gIFNlbGVjdGVkVGFyZ2V0XHJcbn0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMnO1xyXG5cclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuXHJcbmltcG9ydCAndWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIuc2Nzcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uUGlja2VyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0ZWRUYXJnZXQ6IFNlbGVjdGVkVGFyZ2V0ID0ge1xyXG4gICAgbGluZTogbnVsbCxcclxuICAgIHBvbHlnb246IG51bGxcclxuICB9O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbGluZUNvbmRpdGlvbkVsZW1lbnRzOiBMaW5lQ29uZGl0aW9uRWxlbWVudFtdO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZGl0aW9uRWxlbWVudHNDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2xvc2VCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm9uTW91c2VEb3duID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oaWRlID0gdGhpcy5oaWRlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY29uZGl0aW9uLXBpY2tlcl9fY2xvc2UtYnV0dG9uJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSAnWCc7XHJcblxyXG4gICAgdGhpcy5jb25kaXRpb25FbGVtZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb25kaXRpb25FbGVtZW50c0NvbnRhaW5lci5jbGFzc05hbWUgPSAnY29uZGl0aW9uLWVsZW1lbnRzLWNvbnRhaW5lcic7XHJcblxyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9uRWxlbWVudHMgPSB0aGlzLmNyZWF0ZUxpbmVDb25kaXRpb25FbGVtZW50cygpO1xyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9uRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHRoaXMuY29uZGl0aW9uRWxlbWVudHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuICAgIHJldHVybiBbJ2RhdGEteCcsICdkYXRhLXknLCAnZGF0YS12aXNpYmxlJ107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLmNvbmRpdGlvbkVsZW1lbnRzQ29udGFpbmVyKTtcclxuXHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY29uZGl0aW9uRWxlbWVudHNDb250YWluZXIpO1xyXG5cclxuICAgIHRoaXMuY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIF9vbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgY2FzZSAnZGF0YS14JzpcclxuICAgICAgY2FzZSAnZGF0YS15JzpcclxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdkYXRhLXZpc2libGUnOlxyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZVNlbGVjdGVkTGluZShsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUgPSBsaW5lO1xyXG4gICAgdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uID0gcG9seWdvbjtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVCdXR0b25zKCkge1xyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9uRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQudXBkYXRlQnV0dG9uKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVQb3NpdGlvbigpIHtcclxuICAgIHRoaXMuc3R5bGUubGVmdCA9IGAke3RoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSB8fCAwfXB4YDtcclxuICAgIHRoaXMuc3R5bGUudG9wID0gYCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpIHx8IDB9cHhgO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnNyY0VsZW1lbnQgJiYgdGhpcy5jb250YWlucyhldmVudC5zcmNFbGVtZW50KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGUoKSB7XHJcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgJ2ZhbHNlJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUxpbmVDb25kaXRpb25FbGVtZW50cygpIHtcclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzOiBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyA9IHtcclxuICAgICAgc2VsZWN0ZWRUYXJnZXQ6IHRoaXMuc2VsZWN0ZWRUYXJnZXRcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgbmV3IEZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudChsaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyksXHJcbiAgICAgIG5ldyBWZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50KGxpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzKSxcclxuICAgICAgbmV3IEhvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudChsaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcylcclxuICAgIF07XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1jb25kaXRpb24tcGlja2VyJywgQ29uZGl0aW9uUGlja2VyKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIudHMiLCJpbXBvcnQgeyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0ZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50JztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRml4ZWRMZW5ndGhDb25kaXRpb25FbGVtZW50IGV4dGVuZHMgTGluZUNvbmRpdGlvbkVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpIHtcclxuICAgIHN1cGVyKGRlcGVuZGVuY2llcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b24udGV4dENvbnRlbnQgPSAnRml4ZWQgbGVuZ3RoJztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRMaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IoKSB7XHJcbiAgICByZXR1cm4gRml4ZWRMZW5ndGhMaW5lQ29uZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU5ld0NvbmRpdGlvbigpOiBMaW5lQ29uZGl0aW9uIHwgbnVsbCB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSB8fCAhdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG5vdCBzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsZW5ndGggPSBOdW1iZXIuTmFOO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxMaW5lTGVuZ3RoID0gdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lLmdldExlbmd0aCgpLnRvRml4ZWQoMSk7XHJcblxyXG4gICAgd2hpbGUgKE51bWJlci5pc05hTihsZW5ndGgpIHx8IGxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHByb21wdCgnUHJvdmlkZSB0aGUgZml4ZWQgbGVuZ3RoJywgb3JpZ2luYWxMaW5lTGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGVuZ3RoID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbihcclxuICAgICAgdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lLFxyXG4gICAgICB0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb24sXHJcbiAgICAgIGxlbmd0aFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZml4ZWQtbGVuZ3RoLWNvbmRpdGlvbicsIEZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0ZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudC50cyIsImltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5cclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5cclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbiBleHRlbmRzIExpbmVDb25kaXRpb24ge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZml4ZWRMZW5ndGg6IG51bWJlcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGZpeGVkTGVuZ3RoU3F1YXJlZDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uLCBsZW5ndGg6IG51bWJlcikge1xyXG4gICAgc3VwZXIobGluZSwgcG9seWdvbik7XHJcblxyXG4gICAgdGhpcy5maXhlZExlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuZml4ZWRMZW5ndGhTcXVhcmVkID0gTWF0aC5wb3cobGVuZ3RoLCAyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc01ldCgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGxlbmd0aFNxdWFyZWQgPSBQb2ludC5nZXREaXN0YW5jZUJldHdlZW5TcXVhcmVkKHRoaXMubGluZS5wMSwgdGhpcy5saW5lLnAyKTtcclxuXHJcbiAgICByZXR1cm4gTWF0aC5hYnMobGVuZ3RoU3F1YXJlZCAtIHRoaXMuZml4ZWRMZW5ndGhTcXVhcmVkKSA8IGNvbmZpZ3VyYXRpb24uZXBzaWxvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaXgobG9ja2VkUG9pbnQ6IFBvaW50KSB7XHJcbiAgICBjb25zdCBmcmVlUG9pbnQgPSB0aGlzLmxpbmUucDEgPT09IGxvY2tlZFBvaW50ID8gdGhpcy5saW5lLnAyIDogdGhpcy5saW5lLnAxO1xyXG5cclxuICAgIGNvbnN0IGxlbmd0aEJlZm9yZUZpeCA9IFBvaW50LmdldERpc3RhbmNlQmV0d2Vlbihsb2NrZWRQb2ludCwgZnJlZVBvaW50KTtcclxuICAgIGNvbnN0IHJhdGlvID0gdGhpcy5maXhlZExlbmd0aCAvIGxlbmd0aEJlZm9yZUZpeDtcclxuXHJcbiAgICBjb25zdCB4RGVsdGEgPSBmcmVlUG9pbnQueCAtIGxvY2tlZFBvaW50Lng7XHJcbiAgICBjb25zdCB5RGVsdGEgPSBmcmVlUG9pbnQueSAtIGxvY2tlZFBvaW50Lnk7XHJcblxyXG4gICAgZnJlZVBvaW50Lm1vdmVUbyhsb2NrZWRQb2ludC54ICsgeERlbHRhICogcmF0aW8sIGxvY2tlZFBvaW50LnkgKyB5RGVsdGEgKiByYXRpbyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHVwbGljYXRlRm9yTmV3TGluZShsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICByZXR1cm4gbmV3IEZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbihsaW5lLCBwb2x5Z29uLCB0aGlzLmZpeGVkTGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMYWJlbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpeGVkTGVuZ3RoLnRvRml4ZWQoMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmVyaWZ5Q2FuQmVBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0ZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbi50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9MaW5lQ29uZGl0aW9uRWxlbWVudC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubGluZS1jb25kaXRpb24tLWFjdGl2ZSAubGluZS1jb25kaXRpb25fX2J1dHRvbiB7XFxuICBib3gtc2hhZG93OiAwIDAgNXB4IDJweCAjMWI5N2RmOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEhvcml6b250YWxMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9Ib3Jpem9udGFsTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50JztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgSG9yaXpvbnRhbExpbmVDb25kaXRpb25FbGVtZW50IGV4dGVuZHMgTGluZUNvbmRpdGlvbkVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpIHtcclxuICAgIHN1cGVyKGRlcGVuZGVuY2llcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b24udGV4dENvbnRlbnQgPSAnSG9yaXpvbnRhbCc7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0TGluZUNvbmRpdGlvbkNvbnN0cnVjdG9yKCkge1xyXG4gICAgcmV0dXJuIEhvcml6b250YWxMaW5lQ29uZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU5ld0NvbmRpdGlvbigpOiBMaW5lQ29uZGl0aW9uIHwgbnVsbCB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSB8fCAhdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG5vdCBzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgSG9yaXpvbnRhbExpbmVDb25kaXRpb24odGhpcy5zZWxlY3RlZFRhcmdldC5saW5lLCB0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb24pO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdob3Jpem9udGFsLWxpbmUtY29uZGl0aW9uJywgSG9yaXpvbnRhbExpbmVDb25kaXRpb25FbGVtZW50KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwiaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IFZlcnRpY2FsTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzIH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsTGluZUNvbmRpdGlvbkVsZW1lbnQgZXh0ZW5kcyBMaW5lQ29uZGl0aW9uRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcykge1xyXG4gICAgc3VwZXIoZGVwZW5kZW5jaWVzKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbi50ZXh0Q29udGVudCA9ICdWZXJ0aWNhbCc7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0TGluZUNvbmRpdGlvbkNvbnN0cnVjdG9yKCkge1xyXG4gICAgcmV0dXJuIFZlcnRpY2FsTGluZUNvbmRpdGlvbjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVOZXdDb25kaXRpb24oKTogTGluZUNvbmRpdGlvbiB8IG51bGwge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUgfHwgIXRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBub3Qgc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlcnRpY2FsTGluZUNvbmRpdGlvbih0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUsIHRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbik7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZlcnRpY2FsLWxpbmUtY29uZGl0aW9uJywgVmVydGljYWxMaW5lQ29uZGl0aW9uRWxlbWVudCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL1ZlcnRpY2FsTGluZUNvbmRpdGlvbkVsZW1lbnQudHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9Db25kaXRpb25QaWNrZXIuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9Db25kaXRpb25QaWNrZXIuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9Db25kaXRpb25QaWNrZXIuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYXBwLWNvbmRpdGlvbi1waWNrZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNXB4LCAtNTAlKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHBhZGRpbmc6IDAuNmVtO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzIyMjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTJlMmUyO1xcbiAgYm94LXNoYWRvdzogMnB4IDJweCA1cHggYmxhY2s7XFxuICB6LWluZGV4OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cXG5cXG4uY29uZGl0aW9uLWVsZW1lbnRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5jb25kaXRpb24tZWxlbWVudHMtY29udGFpbmVyICoge1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7IH1cXG4gICAgLmNvbmRpdGlvbi1lbGVtZW50cy1jb250YWluZXIgKjpsYXN0LWNoaWxkIHtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAwOyB9XFxuXFxuLmNvbmRpdGlvbi1waWNrZXJfX2Nsb3NlLWJ1dHRvbiB7XFxuICBtYXJnaW46IC0ycHggLTJweCAzcHggMDtcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcbiAgZm9udC1zaXplOiAxMHB4OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIge1xyXG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBwcml2YXRlIGNhbnZhc0NsaWVudFJlY3Q6IENsaWVudFJlY3Q7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy51cGRhdGVDYW52YXNPZmZzZXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVDYW52YXNPZmZzZXQoKSB7XHJcbiAgICB0aGlzLmNhbnZhc0NsaWVudFJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQb2ludEZyb21Nb3VzZUV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KFxyXG4gICAgICBldmVudC5wYWdlWCAtIHRoaXMuY2FudmFzQ2xpZW50UmVjdC5sZWZ0LFxyXG4gICAgICBldmVudC5wYWdlWSAtIHRoaXMuY2FudmFzQ2xpZW50UmVjdC50b3BcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lci50cyIsImltcG9ydCB7IExheWVyIH0gZnJvbSAnY29tbW9uL0xheWVyJztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IExFWCB9IGZyb20gJ0xFWCc7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gJ1N0YWdlJztcclxuaW1wb3J0IHsgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyIH0gZnJvbSAndWkvTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyJztcclxuaW1wb3J0IHsgVUlTZXJ2aWNlIH0gZnJvbSAndWkvVUlTZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBQb2ludENsaWNrRXZlbnQgfSBmcm9tICdldmVudHMvUG9pbnRDbGlja0V2ZW50JztcclxuaW1wb3J0IHsgUmVuZGVyRXZlbnQgfSBmcm9tICdldmVudHMvUmVuZGVyRXZlbnQnO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50c0V2ZW50IH0gZnJvbSAnZXZlbnRzL3VpL1N5bmNDb21wb25lbnRzRXZlbnQnO1xyXG5cclxuaW50ZXJmYWNlIE5ld1BvbHlnb25VSUNvbnRyb2xsZXJEZXBlbmRlbmNpZXMge1xyXG4gIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgcG9seWdvbkxheWVyOiBMYXllcjtcclxuICByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmV3UG9seWdvblVJQ29udHJvbGxlciBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICBwcml2YXRlIHVuZmluaXNoZWRQYXRoOiBQYXRoO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcGF0aExheWVyID0gbmV3IExheWVyKExFWC5QQVRIX0xBWUVSX05BTUUpO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcG9seWdvbkxheWVyOiBMYXllcjtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBOZXdQb2x5Z29uVUlDb250cm9sbGVyRGVwZW5kZW5jaWVzKSB7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIgPSBkZXBlbmRlbmNpZXMuYXBwbGljYXRpb25VSUNvbnRhaW5lcjtcclxuICAgIHRoaXMuY2FudmFzID0gZGVwZW5kZW5jaWVzLmNhbnZhcztcclxuICAgIHRoaXMuc3RhZ2UgPSBkZXBlbmRlbmNpZXMuc3RhZ2U7XHJcbiAgICB0aGlzLnBvbHlnb25MYXllciA9IGRlcGVuZGVuY2llcy5wb2x5Z29uTGF5ZXI7XHJcbiAgICB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciA9IGRlcGVuZGVuY2llcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgICB0aGlzLnJlbmRlcmVyID0gZGVwZW5kZW5jaWVzLnJlbmRlcmVyO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICAgIHRoaXMuY2xvc2VQYXRoID0gdGhpcy5jbG9zZVBhdGguYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uUG9pbnRDbGljayA9IHRoaXMub25Qb2ludENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uS2V5RG93biA9IHRoaXMub25LZXlEb3duLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLnB1c2godGhpcy5wYXRoTGF5ZXIpO1xyXG4gICAgdGhpcy5zdGFydE5ld1VuZmluaXNoZWRQYXRoKCk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoUG9pbnRDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50Q2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihQb2ludENsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uUG9pbnRDbGljayk7XHJcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUxheWVyKHRoaXMucGF0aExheWVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGROZXdQb2ludChwb2ludDogUG9pbnQpIHtcclxuICAgIHRoaXMudW5maW5pc2hlZFBhdGguYWRkVmVydGV4KHBvaW50KTtcclxuICAgIHRoaXMuZGlzcGF0Y2hVcGRhdGVVSUV2ZW50cygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgY29uc3QgdW5maW5pc2hlZFBhdGhWZXJ0aWNlc0NvdW50ID0gdGhpcy51bmZpbmlzaGVkUGF0aC5nZXRWZXJ0aWNlc0NvdW50KCk7XHJcbiAgICBpZiAodW5maW5pc2hlZFBhdGhWZXJ0aWNlc0NvdW50ID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXN0UG9pbnQgPSB0aGlzLnVuZmluaXNoZWRQYXRoLmdldFZlcnRleCh1bmZpbmlzaGVkUGF0aFZlcnRpY2VzQ291bnQgLSAxKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFJlbmRlckV2ZW50KCkpO1xyXG5cclxuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIuZ2V0UG9pbnRGcm9tTW91c2VFdmVudChldmVudCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmRyYXdMaW5lKGxhc3RQb2ludCwgcG9pbnQsIGNvbmZpZ3VyYXRpb24ubmV3TGluZVByZXZpZXdQcm9wZXJ0aWVzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Qb2ludENsaWNrKGV2ZW50OiBQb2ludENsaWNrRXZlbnQpIHtcclxuICAgIGNvbnN0IHBhdGhQb2ludENvbXBvbmVudCA9IGV2ZW50LnBheWxvYWQ7XHJcblxyXG4gICAgaWYgKHBhdGhQb2ludENvbXBvbmVudC5wYXRoID09PSB0aGlzLnVuZmluaXNoZWRQYXRoICYmIHBhdGhQb2ludENvbXBvbmVudC5pbml0aWFsKSB7XHJcbiAgICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIHBhdGhQb2ludENvbXBvbmVudC5pbml0aWFsID0gZmFsc2U7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYWxlcnQoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhcnROZXdVbmZpbmlzaGVkUGF0aCgpIHtcclxuICAgIHRoaXMudW5maW5pc2hlZFBhdGggPSBuZXcgUGF0aChbXSwgY29uZmlndXJhdGlvbi5uZXdQb2x5Z29uTGluZVByb3BlcnRpZXMpO1xyXG4gICAgdGhpcy5wYXRoTGF5ZXIucGF0aHMucHVzaCh0aGlzLnVuZmluaXNoZWRQYXRoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VQYXRoKCkge1xyXG4gICAgaWYgKHRoaXMudW5maW5pc2hlZFBhdGguZ2V0VmVydGljZXNDb3VudCgpIDwgY29uZmlndXJhdGlvbi5taW5Qb2x5Z29uUG9pbnRzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUG9seWdvbiBtdXN0IGhhdmUgYXQgbGVhc3QgJHtjb25maWd1cmF0aW9uLm1pblBvbHlnb25Qb2ludHN9IHZlcnRpY2VzYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51bmZpbmlzaGVkUGF0aC5saW5lUHJvcGVydGllcyA9IGNvbmZpZ3VyYXRpb24ucG9seWdvbkxpbmVQcm9wZXJ0aWVzO1xyXG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uKHRoaXMudW5maW5pc2hlZFBhdGgpO1xyXG4gICAgdGhpcy5wb2x5Z29uTGF5ZXIucGF0aHMucHVzaChwb2x5Z29uKTtcclxuICAgIHRoaXMucGF0aExheWVyLnJlbW92ZVBhdGgodGhpcy51bmZpbmlzaGVkUGF0aCk7XHJcblxyXG4gICAgdGhpcy5zdGFydE5ld1VuZmluaXNoZWRQYXRoKCk7XHJcbiAgICB0aGlzLmRpc3BhdGNoVXBkYXRlVUlFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGlzcGF0Y2hVcGRhdGVVSUV2ZW50cygpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFJlbmRlckV2ZW50KCkpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgU3luY0NvbXBvbmVudHNFdmVudCgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgY2FzZSAyNzpcclxuICAgICAgICB0aGlzLnBhdGhMYXllci5yZW1vdmVQYXRoKHRoaXMudW5maW5pc2hlZFBhdGgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnROZXdVbmZpbmlzaGVkUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hVcGRhdGVVSUV2ZW50cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvTmV3UG9seWdvblVJQ29udHJvbGxlci50cyIsImltcG9ydCB7IENPTE9SUyB9IGZyb20gJ2NvbW1vbi9DT0xPUlMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJ2NvbW1vbi9MYXllcic7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdTdGFnZSc7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDb250aW51b3VzQ29uZGl0aW9uRml4ZXIgfSBmcm9tICdjb25kaXRpb25zL0NvbnRpbnVvdXNDb25kaXRpb25GaXhlcic7XHJcblxyXG5pbXBvcnQgeyBGaW5pc2hQb2ludERyYWdFdmVudCB9IGZyb20gJ2V2ZW50cy9wb2ludC1kcmFnL0ZpbmlzaFBvaW50RHJhZ0V2ZW50JztcclxuaW1wb3J0IHsgUG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9Qb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFN0YXJ0UG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9TdGFydFBvaW50RHJhZ0V2ZW50JztcclxuaW1wb3J0IHsgUmVuZGVyRXZlbnQgfSBmcm9tICdldmVudHMvUmVuZGVyRXZlbnQnO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50c0V2ZW50IH0gZnJvbSAnZXZlbnRzL3VpL1N5bmNDb21wb25lbnRzRXZlbnQnO1xyXG5cclxuaW50ZXJmYWNlIFBvaW50RHJhZ2dpbmdTZXJ2aWNlRGVwZW5kZW5jaWVzIHtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuICBzdGFnZTogU3RhZ2U7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludERyYWdnaW5nU2VydmljZSBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0YWdlOiBTdGFnZTtcclxuICBwcml2YXRlIHBhdGhHaG9zdExheWVyOiBMYXllcjtcclxuICBwcml2YXRlIGNvbnRpbnVvdXNDb25kaXRpb25GaXhlcjogQ29udGludW91c0NvbmRpdGlvbkZpeGVyIHwgbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBQb2ludERyYWdnaW5nU2VydmljZURlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy5zdGFnZSA9IGRlcGVuZGVuY2llcy5zdGFnZTtcclxuXHJcbiAgICB0aGlzLm9uU3RhcnRQb2ludERyYWcgPSB0aGlzLm9uU3RhcnRQb2ludERyYWcuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25GaW5pc2hQb2ludERyYWcgPSB0aGlzLm9uRmluaXNoUG9pbnREcmFnLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uUG9pbnREcmFnID0gdGhpcy5vblBvaW50RHJhZy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLnBhdGhHaG9zdExheWVyID0gbmV3IExheWVyKExFWC5QQVRIX0dIT1NUX0xBWUVSX05BTUUpO1xyXG4gICAgdGhpcy5zdGFnZS5sYXllcnMuc3BsaWNlKDAsIDAsIHRoaXMucGF0aEdob3N0TGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoU3RhcnRQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25TdGFydFBvaW50RHJhZyk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKEZpbmlzaFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vbkZpbmlzaFBvaW50RHJhZyk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50RHJhZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMucGF0aEdob3N0TGF5ZXIucGF0aHMgPSBbXTtcclxuICAgIHRoaXMuc3RhZ2UucmVtb3ZlTGF5ZXIodGhpcy5wYXRoR2hvc3RMYXllcik7XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihTdGFydFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblN0YXJ0UG9pbnREcmFnKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIEZpbmlzaFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZSxcclxuICAgICAgdGhpcy5vbkZpbmlzaFBvaW50RHJhZ1xyXG4gICAgKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9pbnREcmFnRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uUG9pbnREcmFnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TdGFydFBvaW50RHJhZyhldmVudDogU3RhcnRQb2ludERyYWdFdmVudCkge1xyXG4gICAgZXZlbnQuaGFuZGxlZCA9IHRydWU7XHJcblxyXG4gICAgaWYgKGV2ZW50LnBheWxvYWQucGF0aCBpbnN0YW5jZW9mIFBvbHlnb24pIHtcclxuICAgICAgdGhpcy5jb250aW51b3VzQ29uZGl0aW9uRml4ZXIgPSBuZXcgQ29udGludW91c0NvbmRpdGlvbkZpeGVyKGV2ZW50LnBheWxvYWQucGF0aCwgZXZlbnQucGF5bG9hZC5wb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjb25maWd1cmF0aW9uLmRpc3BsYXlQYXRoR2hvc3RXaGVuRHJhZ2dpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhdGggPSBldmVudC5wYXlsb2FkLnBhdGguY2xvbmUoKTtcclxuICAgIHBhdGgubGluZVByb3BlcnRpZXMgPSBuZXcgTGluZVByb3BlcnRpZXMoQ09MT1JTLkdSRUVOLCAxKTtcclxuICAgIHRoaXMucGF0aEdob3N0TGF5ZXIucGF0aHMucHVzaChwYXRoKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmluaXNoUG9pbnREcmFnKGV2ZW50OiBGaW5pc2hQb2ludERyYWdFdmVudCkge1xyXG4gICAgZXZlbnQuaGFuZGxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmNvbnRpbnVvdXNDb25kaXRpb25GaXhlciA9IG51bGw7XHJcbiAgICBpZiAoIWNvbmZpZ3VyYXRpb24uZGlzcGxheVBhdGhHaG9zdFdoZW5EcmFnZ2luZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wYXRoR2hvc3RMYXllci5wYXRocyA9IFtdO1xyXG5cclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFJlbmRlckV2ZW50KCkpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgU3luY0NvbXBvbmVudHNFdmVudCgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Qb2ludERyYWcoZXZlbnQ6IFBvaW50RHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zdCB7IGNvbXBvbmVudCwgbmV3UG9zaXRpb24gfSA9IGV2ZW50LnBheWxvYWQ7XHJcblxyXG4gICAgY29tcG9uZW50LnBvaW50Lm1vdmVUbyhuZXdQb3NpdGlvbik7XHJcblxyXG4gICAgaWYgKHRoaXMuY29udGludW91c0NvbmRpdGlvbkZpeGVyKSB7XHJcbiAgICAgIHRoaXMuY29udGludW91c0NvbmRpdGlvbkZpeGVyLmZpeCgpO1xyXG4gICAgICB0aGlzLmNvbnRpbnVvdXNDb25kaXRpb25GaXhlci5wcm9wYWdhdGVDaGFuZ2VzVG9PcmlnaW5hbFBvbHlnb24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9Qb2ludERyYWdnaW5nU2VydmljZS50cyIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgQ29uZGl0aW9uRml4ZXIsIEZpeGluZ0RpcmVjdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvQ29uZGl0aW9uRml4ZXInO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB3aGVuIHRoZXJlIGlzIGEgbmVlZCB0byBmaXggY29uZGl0aW9ucyBvZnRlbiAoZm9yIGluc3RhbmNlIHdoZW4gZHJhZ2dpbmcpLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDb250aW51b3VzQ29uZGl0aW9uRml4ZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb250aW51b3VzQ29uZGl0aW9uRml4ZXIge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcG9seWdvbjogUG9seWdvbjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNsb25lZFBvbHlnb246IFBvbHlnb247XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhcnRpbmdQb2ludDogUG9pbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjbG9uZWRTdGFydGluZ1BvaW50OiBQb2ludDtcclxuXHJcbiAgY29uc3RydWN0b3IocG9seWdvbjogUG9seWdvbiwgc3RhcnRpbmdQb2ludDogUG9pbnQpIHtcclxuICAgIC8vIFRPRE86IGluamVjdCBDb250aW51b3VzRml4ZXIgY29uc3RydWN0b3JcclxuICAgIHRoaXMucG9seWdvbiA9IHBvbHlnb247XHJcbiAgICB0aGlzLnN0YXJ0aW5nUG9pbnQgPSBzdGFydGluZ1BvaW50O1xyXG4gICAgY29uc3Qgc3RhcnRpbmdQb2ludEluZGV4ID0gcG9seWdvbi5maW5kUG9pbnRJbmRleCh0aGlzLnN0YXJ0aW5nUG9pbnQpO1xyXG5cclxuICAgIHRoaXMuY2xvbmVkUG9seWdvbiA9IHBvbHlnb24uY2xvbmUoKTtcclxuICAgIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludCA9IHRoaXMuY2xvbmVkUG9seWdvbi5nZXRWZXJ0ZXgoc3RhcnRpbmdQb2ludEluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaXgoKSB7XHJcbiAgICBjb25zdCBsYXN0VmFsaWRQb3NpdGlvbiA9IHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludC5jbG9uZSgpO1xyXG4gICAgdGhpcy5jbG9uZWRTdGFydGluZ1BvaW50Lm1vdmVUbyh0aGlzLnN0YXJ0aW5nUG9pbnQpO1xyXG5cclxuICAgIGNvbnN0IGNvbmRpdGlvbkZpeGVyID0gbmV3IENvbmRpdGlvbkZpeGVyKHRoaXMuY2xvbmVkUG9seWdvbiwgdGhpcy5jbG9uZWRTdGFydGluZ1BvaW50LCBbXSk7XHJcbiAgICBjb25kaXRpb25GaXhlci50cnlGaXgoKTtcclxuXHJcbiAgICBpZiAoY29uZGl0aW9uRml4ZXIuZml4U3VjY2Vzc2Z1bCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jbG9uZWRTdGFydGluZ1BvaW50Lm1vdmVUbyh0aGlzLnN0YXJ0aW5nUG9pbnQpO1xyXG4gICAgY29uZGl0aW9uRml4ZXIucmVzZXQoKTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLmRpcmVjdGlvbiA9IEZpeGluZ0RpcmVjdGlvbi5SZXZlcnNlO1xyXG4gICAgY29uZGl0aW9uRml4ZXIudHJ5Rml4KCk7XHJcblxyXG4gICAgaWYgKGNvbmRpdGlvbkZpeGVyLmZpeFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uVmVjdG9yID0gUG9pbnQuc3VidHJhY3QodGhpcy5zdGFydGluZ1BvaW50LCBsYXN0VmFsaWRQb3NpdGlvbik7XHJcblxyXG4gICAgdGhpcy5jbG9uZWRQb2x5Z29uLmdldFZlcnRpY2VzKCkuZm9yRWFjaChjbG9uZWRQb2ludCA9PiB7XHJcbiAgICAgIGNsb25lZFBvaW50Lm1vdmVUbyhQb2ludC5hZGQoY2xvbmVkUG9pbnQsIHRyYW5zbGF0aW9uVmVjdG9yKSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludC5tb3ZlVG8odGhpcy5zdGFydGluZ1BvaW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcm9wYWdhdGVDaGFuZ2VzVG9PcmlnaW5hbFBvbHlnb24oKSB7XHJcbiAgICB0aGlzLnBvbHlnb24ubW92ZVRvKHRoaXMuY2xvbmVkUG9seWdvbik7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbmRpdGlvbnMvQ29udGludW91c0NvbmRpdGlvbkZpeGVyLnRzIiwiaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IExpbmVDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL0xpbmVDbGlja0V2ZW50JztcclxuaW1wb3J0IHsgUmVuZGVyRXZlbnQgfSBmcm9tICdldmVudHMvUmVuZGVyRXZlbnQnO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50c0V2ZW50IH0gZnJvbSAnZXZlbnRzL3VpL1N5bmNDb21wb25lbnRzRXZlbnQnO1xyXG5cclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW50ZXJmYWNlIFBvaW50SW5zZXJ0ZXJTZXJ2aWNlRGVwZW5kZW5jaWVzIHtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50SW5zZXJ0ZXJTZXJ2aWNlIGltcGxlbWVudHMgVUlTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICBwcml2YXRlIHByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID0gMDtcclxuICBwcml2YXRlIHByZXZpb3VzTGluZUhpdDogTGluZTtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBQb2ludEluc2VydGVyU2VydmljZURlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICAgIHRoaXMub25MaW5lQ2xpY2sgPSB0aGlzLm9uTGluZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uTGluZUNsaWNrKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihMaW5lQ2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25MaW5lQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkxpbmVDbGljayhldmVudDogTGluZUNsaWNrRXZlbnQpIHtcclxuICAgIGNvbnN0IHByZXZpb3VzTGluZUhpdCA9IHRoaXMucHJldmlvdXNMaW5lSGl0O1xyXG4gICAgY29uc3QgcHJldmlvdXNMaW5lQ2xpY2tUaW1lc3RhbXAgPSB0aGlzLnByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5wcmV2aW91c0xpbmVIaXQgPSBldmVudC5wYXlsb2FkLmxpbmU7XHJcbiAgICB0aGlzLnByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID0gY3VycmVudFRpbWVzdGFtcDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICFwcmV2aW91c0xpbmVIaXQgfHxcclxuICAgICAgY3VycmVudFRpbWVzdGFtcCAtIHByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID4gY29uZmlndXJhdGlvbi5kb3VibGVDbGlja01heERlbGF5XHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmV2aW91c0xpbmVIaXQuZXF1YWxzKGV2ZW50LnBheWxvYWQubGluZSkpIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBldmVudC5wYXlsb2FkLnBhdGguZmluZFBvaW50SW5kZXgoZXZlbnQucGF5bG9hZC5saW5lLnAyKTtcclxuICAgICAgY29uc3QgbmV3UG9pbnQgPSBldmVudC5wYXlsb2FkLmxpbmUuZ2V0TWlkZGxlUG9pbnQoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZXZlbnQucGF5bG9hZC5wYXRoLmluc2VydFZlcnRleChuZXdQb2ludCwgaW5kZXgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBhbGVydChlcnJvci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgU3luY0NvbXBvbmVudHNFdmVudCgpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvUG9pbnRJbnNlcnRlclNlcnZpY2UudHMiLCJpbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgUG9pbnRDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL1BvaW50Q2xpY2tFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5cclxuaW50ZXJmYWNlIFBvaW50UmVtb3ZlclNlcnZpY2VEZXBlbmRlbmNpZXMge1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnRSZW1vdmVyU2VydmljZSBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSBwcmV2aW91c1BhdGhQb2ludENvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIHByaXZhdGUgcHJldmlvdXNDbGlja1RpbWVzdGFtcCA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnRSZW1vdmVyU2VydmljZURlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy5vblBvaW50Q2xpY2sgPSB0aGlzLm9uUG9pbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFBvaW50Q2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25Qb2ludENsaWNrKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihQb2ludENsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uUG9pbnRDbGljayk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUG9pbnRDbGljayhldmVudDogUG9pbnRDbGlja0V2ZW50KSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBjb25zdCBwYXRoUG9pbnRDb21wb25lbnQgPSBldmVudC5wYXlsb2FkO1xyXG4gICAgY29uc3QgcHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQgPSB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50O1xyXG4gICAgY29uc3QgcHJldmlvdXNDbGlja1RpbWVzdGFtcCA9IHRoaXMucHJldmlvdXNDbGlja1RpbWVzdGFtcDtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVByZXZpb3VzQ2xpY2tJbmZvcm1hdGlvbihldmVudCwgY3VycmVudFRpbWVzdGFtcCk7XHJcblxyXG4gICAgaWYgKCFwcmV2aW91c1BhdGhQb2ludENvbXBvbmVudCB8fCBwcmV2aW91c1BhdGhQb2ludENvbXBvbmVudCAhPT0gcGF0aFBvaW50Q29tcG9uZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudFRpbWVzdGFtcCAtIHByZXZpb3VzQ2xpY2tUaW1lc3RhbXAgPiBjb25maWd1cmF0aW9uLmRvdWJsZUNsaWNrTWF4RGVsYXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVtb3ZlUHJldmlvdXNDbGlja2VkUG9pbnQoKTtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVQcmV2aW91c0NsaWNrSW5mb3JtYXRpb24oZXZlbnQ6IFBvaW50Q2xpY2tFdmVudCwgdGltZXN0YW1wOiBudW1iZXIpIHtcclxuICAgIHRoaXMucHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQgPSBldmVudC5wYXlsb2FkO1xyXG4gICAgdGhpcy5wcmV2aW91c0NsaWNrVGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVQcmV2aW91c0NsaWNrZWRQb2ludCgpIHtcclxuICAgIGNvbnN0IHBhdGggPSB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50LnBhdGg7XHJcbiAgICBjb25zdCBwb2ludCA9IHRoaXMucHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQucG9pbnQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgcGF0aC5yZW1vdmVWZXJ0ZXgocG9pbnQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGFsZXJ0KCdDYW5ub3QgcmVtb3ZlIHZlcnRleCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQucmVtb3ZlKCk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL1BvaW50UmVtb3ZlclNlcnZpY2UudHMiLCJpbXBvcnQgeyBQYXRoIH0gZnJvbSAnY29tbW9uL1BhdGgnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgfSBmcm9tICd1aS9Nb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXInO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcblxyXG5pbnRlcmZhY2UgUG9pbnRTeW5jU2VydmljZURlcGVuZGVuY2llcyB7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQYXRoUG9pbnQge1xyXG4gIHBhdGg6IFBhdGg7XHJcbiAgcG9pbnQ6IFBvaW50O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnRTeW5jU2VydmljZSBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSBwYXRoUG9pbnRDb21wb25lbnRzOiBQYXRoUG9pbnRDb21wb25lbnRbXSA9IFtdO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnRTeW5jU2VydmljZURlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5zdGFnZSA9IGRlcGVuZGVuY2llcy5zdGFnZTtcclxuICAgIHRoaXMuY29udGFpbmVyID0gZGVwZW5kZW5jaWVzLmNvbnRhaW5lcjtcclxuICAgIHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyID0gZGVwZW5kZW5jaWVzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLnN5bmNocm9uaXplQ29tcG9uZW50cyA9IHRoaXMuc3luY2hyb25pemVDb21wb25lbnRzLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoU3luY0NvbXBvbmVudHNFdmVudC5ldmVudFR5cGUsIHRoaXMuc3luY2hyb25pemVDb21wb25lbnRzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihTeW5jQ29tcG9uZW50c0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5zeW5jaHJvbml6ZUNvbXBvbmVudHMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN5bmNocm9uaXplQ29tcG9uZW50cyhldmVudDogU3luY0NvbXBvbmVudHNFdmVudCkge1xyXG4gICAgY29uc3QgY29tcG9uZW50c1RvUmVtb3ZlID0gdGhpcy5nZXRSZWR1bmRhbnRDb21wb25lbnRzKCk7XHJcbiAgICBjb21wb25lbnRzVG9SZW1vdmUuZm9yRWFjaChjb21wb25lbnQgPT4gY29tcG9uZW50LnJlbW92ZSgpKTtcclxuXHJcbiAgICBjb25zdCBwYXRoUG9pbnRzID0gdGhpcy5nZXRQYXRoUG9pbnRzKCk7XHJcbiAgICBjb25zdCBwb2ludHNXaXRob3V0Q29tcG9uZW50cyA9IHRoaXMuZ2V0UG9pbnRzV2l0aG91dENvbXBvbmVudHMocGF0aFBvaW50cyk7XHJcbiAgICBjb25zdCBuZXdDb21wb25lbnRzID0gdGhpcy5jcmVhdGVQYXRoUG9pbnRDb21wb25lbnRzKHBvaW50c1dpdGhvdXRDb21wb25lbnRzKTtcclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRzTm90UmVtb3ZlZCA9IHRoaXMucGF0aFBvaW50Q29tcG9uZW50cy5maWx0ZXIoXHJcbiAgICAgIGNvbXBvbmVudCA9PiBjb21wb25lbnRzVG9SZW1vdmUuaW5kZXhPZihjb21wb25lbnQpID09PSAtMVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnBhdGhQb2ludENvbXBvbmVudHMgPSBbLi4ubmV3Q29tcG9uZW50cywgLi4uY29tcG9uZW50c05vdFJlbW92ZWRdO1xyXG4gICAgZXZlbnQuaGFuZGxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhdGhQb2ludHMoKSB7XHJcbiAgICBjb25zdCBwYXRoUG9pbnRzOiBQYXRoUG9pbnRbXSA9IFtdO1xyXG5cclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICBsYXllci5wYXRocy5mb3JFYWNoKHBhdGggPT4ge1xyXG4gICAgICAgIHBhdGguZ2V0VmVydGljZXMoKS5mb3JFYWNoKHBvaW50ID0+IHtcclxuICAgICAgICAgIHBhdGhQb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgIHBvaW50XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcGF0aFBvaW50cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUGF0aFBvaW50Q29tcG9uZW50cyhwYXRoUG9pbnRzOiBQYXRoUG9pbnRbXSkge1xyXG4gICAgcmV0dXJuIHBhdGhQb2ludHMubWFwKFxyXG4gICAgICBwYXRoUG9pbnQgPT5cclxuICAgICAgICBuZXcgUGF0aFBvaW50Q29tcG9uZW50KHBhdGhQb2ludC5wYXRoLCBwYXRoUG9pbnQucG9pbnQsIHtcclxuICAgICAgICAgIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IHRoaXMuY29udGFpbmVyLFxyXG4gICAgICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvcixcclxuICAgICAgICAgIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXJcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVkdW5kYW50Q29tcG9uZW50cygpIHtcclxuICAgIGNvbnN0IGFjdGl2ZVBhdGhzID0gdGhpcy5nZXRBY3RpdmVQYXRocygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnBhdGhQb2ludENvbXBvbmVudHMuZmlsdGVyKFxyXG4gICAgICBjb21wb25lbnQgPT5cclxuICAgICAgICBhY3RpdmVQYXRocy5pbmRleE9mKGNvbXBvbmVudC5wYXRoKSA9PT0gLTEgfHxcclxuICAgICAgICBjb21wb25lbnQucGF0aC5nZXRWZXJ0aWNlcygpLmluZGV4T2YoY29tcG9uZW50LnBvaW50KSA9PT0gLTFcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBvaW50c1dpdGhvdXRDb21wb25lbnRzKHBhdGhQb2ludHM6IFBhdGhQb2ludFtdKSB7XHJcbiAgICByZXR1cm4gcGF0aFBvaW50cy5maWx0ZXIoXHJcbiAgICAgIHBhdGhQb2ludCA9PlxyXG4gICAgICAgICF0aGlzLnBhdGhQb2ludENvbXBvbmVudHMuZmluZChcclxuICAgICAgICAgIGNvbXBvbmVudCA9PiBjb21wb25lbnQucGF0aCA9PT0gcGF0aFBvaW50LnBhdGggJiYgY29tcG9uZW50LnBvaW50ID09PSBwYXRoUG9pbnQucG9pbnRcclxuICAgICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBY3RpdmVQYXRocygpIHtcclxuICAgIGNvbnN0IHBhdGhzOiBQYXRoW10gPSBbXTtcclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLm1hcChsYXllciA9PiBwYXRocy5wdXNoKC4uLmxheWVyLnBhdGhzKSk7XHJcblxyXG4gICAgcmV0dXJuIHBhdGhzO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9Qb2ludFN5bmNTZXJ2aWNlLnRzIiwiaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuaW1wb3J0IHsgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyIH0gZnJvbSAndWkvTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyJztcclxuXHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBGaW5pc2hQb2ludERyYWdFdmVudCB9IGZyb20gJ2V2ZW50cy9wb2ludC1kcmFnL0ZpbmlzaFBvaW50RHJhZ0V2ZW50JztcclxuaW1wb3J0IHsgUG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9Qb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFN0YXJ0UG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9TdGFydFBvaW50RHJhZ0V2ZW50JztcclxuaW1wb3J0IHsgUG9pbnRDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL1BvaW50Q2xpY2tFdmVudCc7XHJcblxyXG5pbXBvcnQgJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnNjc3MnO1xyXG5cclxuY29uc3QgQ09NUE9ORU5UX0NMQVNTX05BTUUgPSAnYXBwbGljYXRpb24tdWlfX3ZlcnRleCc7XHJcbmNvbnN0IElOSVRJQUxfQ0xBU1NfTkFNRSA9ICdhcHBsaWNhdGlvbi11aV9fdmVydGV4LS1pbml0aWFsJztcclxuXHJcbmludGVyZmFjZSBQYXRoUG9pbnRDb21wb25lbnREZXBlbmRlbmNpZXMge1xyXG4gIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGF0aFBvaW50Q29tcG9uZW50IHtcclxuICBwdWJsaWMgZWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHVibGljIHBhdGg6IFBhdGg7XHJcbiAgcHVibGljIHBvaW50OiBQb2ludDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwYXRoOiBQYXRoLFxyXG4gICAgcG9pbnQ6IFBvaW50LFxyXG4gICAgZGVwZW5kZW5jaWVzOiBQYXRoUG9pbnRDb21wb25lbnREZXBlbmRlbmNpZXNcclxuICApIHtcclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIgPSBkZXBlbmRlbmNpZXMuYXBwbGljYXRpb25VSUNvbnRhaW5lcjtcclxuICAgIHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyID0gZGVwZW5kZW5jaWVzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uID0gdGhpcy51cGRhdGVQb3NpdGlvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbk1vdXNlRG93biA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnN0b3BEcmFnZ2luZyA9IHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmUoKSB7XHJcbiAgICB0aGlzLnBvaW50Lm1vdmVDYWxsYmFjayA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5wYXRoLmxpbmVQcm9wZXJ0aWVzLmNvbG9yLmZpbGxTdHlsZTtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSBgJHt0aGlzLnBvaW50Lnl9cHhgO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBgJHt0aGlzLnBvaW50Lnh9cHhgO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpbml0aWFsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoSU5JVElBTF9DTEFTU19OQU1FKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgaW5pdGlhbChpc0luaXRpYWw6IGJvb2xlYW4pIHtcclxuICAgIGlmIChpc0luaXRpYWwpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoSU5JVElBTF9DTEFTU19OQU1FKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKElOSVRJQUxfQ0xBU1NfTkFNRSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKENPTVBPTkVOVF9DTEFTU19OQU1FKTtcclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucGF0aC5nZXRWZXJ0aWNlc0NvdW50KCkgPT09IDEgfHxcclxuICAgICAgKCF0aGlzLnBhdGguY2xvc2VkICYmIHRoaXMucGF0aC5maW5kUG9pbnRJbmRleCh0aGlzLnBvaW50KSA9PT0gMClcclxuICAgICkge1xyXG4gICAgICB0aGlzLmluaXRpYWwgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICAgIHRoaXMucG9pbnQubW92ZUNhbGxiYWNrID0gdGhpcy51cGRhdGVQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBQb2ludENsaWNrRXZlbnQodGhpcyk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICBpZiAoZXZlbnQuaGFuZGxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgU3RhcnRQb2ludERyYWdFdmVudCh0aGlzKSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnN0b3BEcmFnZ2luZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBjb25zdCBtb3VzZVBvc2l0aW9uID0gdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIuZ2V0UG9pbnRGcm9tTW91c2VFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBQb2ludERyYWdFdmVudCh0aGlzLCBtb3VzZVBvc2l0aW9uKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BEcmFnZ2luZygpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IEZpbmlzaFBvaW50RHJhZ0V2ZW50KHRoaXMpKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5zdG9wRHJhZ2dpbmcpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudC50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL1BhdGhQb2ludENvbXBvbmVudC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL1BhdGhQb2ludENvbXBvbmVudC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL1BhdGhQb2ludENvbXBvbmVudC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYXBwbGljYXRpb24tdWlfX3ZlcnRleCB7XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXG4gIHdpZHRoOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7IH1cXG4gIC5hcHBsaWNhdGlvbi11aV9fdmVydGV4OmFjdGl2ZSB7XFxuICAgIGJvcmRlci1jb2xvcjogcmVkO1xcbiAgICBib3JkZXItd2lkdGg6IDJweDsgfVxcblxcbi5hcHBsaWNhdGlvbi11aV9fdmVydGV4LS1pbml0aWFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDUxZmY7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgSG9yaXpvbnRhbExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0hvcml6b250YWxMaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IFZlcnRpY2FsTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uJztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcblxyXG5jb25zdCBmb3JiaWRkZW5Db25kaXRpb25Db21iaW5hdGlvbnMgPSBbXHJcbiAgW0hvcml6b250YWxMaW5lQ29uZGl0aW9uLCBIb3Jpem9udGFsTGluZUNvbmRpdGlvbl0sXHJcbiAgW1ZlcnRpY2FsTGluZUNvbmRpdGlvbiwgVmVydGljYWxMaW5lQ29uZGl0aW9uXVxyXG5dO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbk1hdGNoZXIge1xyXG4gIHB1YmxpYyB2ZXJpZnlDb25kaXRpb25BbGxvd2VkKGNvbmRpdGlvbjogTGluZUNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgcG9seWdvbiA9IGNvbmRpdGlvbi5wb2x5Z29uO1xyXG4gICAgY29uc3QgbGluZSA9IGNvbmRpdGlvbi5saW5lO1xyXG5cclxuICAgIGNvbnN0IHAxSW5kZXggPSBwb2x5Z29uLmZpbmRQb2ludEluZGV4KGxpbmUucDEpO1xyXG4gICAgY29uc3QgcHJldmlvdXNQb2ludCA9IHBvbHlnb24uZ2V0VmVydGV4KHRoaXMuZ2V0UHJldmlvdXNQb2ludEluZGV4KHAxSW5kZXgsIHBvbHlnb24pKTtcclxuICAgIGNvbnN0IHAySW5kZXggPSBwb2x5Z29uLmZpbmRQb2ludEluZGV4KGxpbmUucDIpO1xyXG4gICAgY29uc3QgbmV4dFBvaW50ID0gcG9seWdvbi5nZXRWZXJ0ZXgodGhpcy5nZXROZXh0UG9pbnRJbmRleChwMkluZGV4LCBwb2x5Z29uKSk7XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNMaW5lID0gbmV3IExpbmUocHJldmlvdXNQb2ludCwgbGluZS5wMSk7XHJcbiAgICBjb25zdCBuZXh0TGluZSA9IG5ldyBMaW5lKGxpbmUucDIsIG5leHRQb2ludCk7XHJcblxyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbnMgPSBwb2x5Z29uLmdldExpbmVDb25kaXRpb25zKCk7XHJcbiAgICBjb25zdCBwcmV2aW91c0xpbmVDb25kaXRpb25zID0gbGluZUNvbmRpdGlvbnMuZmlsdGVyKGxpbmVDb25kaXRpb24gPT5cclxuICAgICAgbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhwcmV2aW91c0xpbmUpXHJcbiAgICApO1xyXG4gICAgY29uc3QgbmV4dExpbmVDb25kaXRpb25zID0gbGluZUNvbmRpdGlvbnMuZmlsdGVyKGxpbmVDb25kaXRpb24gPT5cclxuICAgICAgbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhuZXh0TGluZSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy52ZXJpZnlOb3RGb3JiaWRkZW5Db21iaW5hdGlvbihwcmV2aW91c0xpbmVDb25kaXRpb25zLCBjb25kaXRpb24pO1xyXG4gICAgdGhpcy52ZXJpZnlOb3RGb3JiaWRkZW5Db21iaW5hdGlvbihuZXh0TGluZUNvbmRpdGlvbnMsIGNvbmRpdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hlY2tGb3JiaWRkZW5Db21iaW5hdGlvbihjb25zdHJ1Y3RvcjE6IEZ1bmN0aW9uLCBjb25zdHJ1Y3RvcjI6IEZ1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gZm9yYmlkZGVuQ29uZGl0aW9uQ29tYmluYXRpb25zLmZpbmQoXHJcbiAgICAgIGNvbWJpbmF0aW9uID0+XHJcbiAgICAgICAgKGNvbnN0cnVjdG9yMSA9PT0gY29tYmluYXRpb25bMF0gJiYgY29uc3RydWN0b3IyID09PSBjb21iaW5hdGlvblsxXSkgfHxcclxuICAgICAgICAoY29uc3RydWN0b3IxID09PSBjb21iaW5hdGlvblsxXSAmJiBjb25zdHJ1Y3RvcjIgPT09IGNvbWJpbmF0aW9uWzBdKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmVyaWZ5Tm90Rm9yYmlkZGVuQ29tYmluYXRpb24oXHJcbiAgICBsaW5lQ29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdLFxyXG4gICAgc2luZ2xlQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uXHJcbiAgKSB7XHJcbiAgICBmb3IgKGNvbnN0IGxpbmVDb25kaXRpb24gb2YgbGluZUNvbmRpdGlvbnMpIHtcclxuICAgICAgY29uc3QgZm9yYmlkZGVuQ29uZGl0aW9uID0gdGhpcy5jaGVja0ZvcmJpZGRlbkNvbWJpbmF0aW9uKFxyXG4gICAgICAgIGxpbmVDb25kaXRpb24uY29uc3RydWN0b3IsXHJcbiAgICAgICAgc2luZ2xlQ29uZGl0aW9uLmNvbnN0cnVjdG9yXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoZm9yYmlkZGVuQ29uZGl0aW9uKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgYEZvcmJpZGRlbiBjb21iaW5hdGlvbjogJHtmb3JiaWRkZW5Db25kaXRpb25bMF0ubmFtZX0sICR7Zm9yYmlkZGVuQ29uZGl0aW9uWzFdLm5hbWV9YFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UHJldmlvdXNQb2ludEluZGV4KGN1cnJlbnRJbmRleDogbnVtYmVyLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICBjdXJyZW50SW5kZXggLT0gMTtcclxuICAgIGlmIChjdXJyZW50SW5kZXggPCAwKSB7XHJcbiAgICAgIGN1cnJlbnRJbmRleCA9IHBvbHlnb24uZ2V0VmVydGljZXNDb3VudCgpIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudEluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXROZXh0UG9pbnRJbmRleChjdXJyZW50SW5kZXg6IG51bWJlciwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgcmV0dXJuIChjdXJyZW50SW5kZXggKyAxKSAlIHBvbHlnb24uZ2V0VmVydGljZXNDb3VudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0NvbmRpdGlvbk1hdGNoZXIudHMiLCJpbXBvcnQgeyBJbnN0cnVjdGlvbnNEaWFsb2cgfSBmcm9tICd1aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluc3RydWN0aW9uc0J1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIGJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5idXR0b24udGV4dENvbnRlbnQgPSAnSW5zdHJ1Y3Rpb25zJztcclxuICAgIHRoaXMuYnV0dG9uLmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtYnV0dG9uJztcclxuXHJcbiAgICB0aGlzLm9uQnV0dG9uQ2xpY2sgPSB0aGlzLm9uQnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5idXR0b24pO1xyXG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQnV0dG9uQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmJ1dHRvbik7XHJcbiAgICB0aGlzLmJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25CdXR0b25DbGljayk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQnV0dG9uQ2xpY2soKSB7XHJcbiAgICBjb25zdCBpbnN0cnVjdGlvbnNEaWFsb2cgPSBuZXcgSW5zdHJ1Y3Rpb25zRGlhbG9nKCk7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKGluc3RydWN0aW9uc0RpYWxvZyk7XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtaW5zdHJ1Y3Rpb25zLWJ1dHRvbicsIEluc3RydWN0aW9uc0J1dHRvbik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0J1dHRvbi50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmluc3RydWN0aW9ucy1kaWFsb2ctd3JhcHBlciB7XFxuICB6LWluZGV4OiAyOyB9XFxuXFxuLmluc3RydWN0aW9ucy1kaWFsb2dfX292ZXJsYXkge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0OyB9XFxuXFxuLmluc3RydWN0aW9ucy1kaWFsb2dfX292ZXJsYXktLWFjdGl2ZSB7XFxuICBvcGFjaXR5OiAwLjU7IH1cXG5cXG4uaW5zdHJ1Y3Rpb25zLWRpYWxvZyB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHotaW5kZXg6IDI7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwLCAwKTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjM1MGY7XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXG4gIGNvbG9yOiAjZWVlO1xcbiAgcGFkZGluZzogMmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJveC1zaGFkb3c6IDJweCAycHggNXB4IGJsYWNrO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0OyB9XFxuXFxuLmluc3RydWN0aW9ucy1kaWFsb2ctLWFjdGl2ZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxLCAxKTsgfVxcblxcbi5pbnN0cnVjdGlvbnMtZGlhbG9nX190aXRsZSB7XFxuICBtYXJnaW46IDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvdWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=