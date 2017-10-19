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
exports.push([module.i, "html, body {\n  box-sizing: border-box; }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  line-height: 1.5; }\n\n.main-canvas {\n  border: solid 1px black; }\n\n.main-container {\n  width: 100%;\n  padding: 0 1em; }\n\n.canvas-wrapper {\n  width: 100%;\n  position: relative; }\n\n.application-ui {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none; }\n  .application-ui * {\n    pointer-events: all; }\n\n.app-header {\n  margin-bottom: 1em;\n  padding-left: 1em; }\n\n.app-name {\n  margin: 0; }\n", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzAyN2VlMWJkNzIwYjA1MTVmNmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9Qb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTEVYLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vTGluZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL1JlbmRlckV2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vQ09MT1JTLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0xheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0xpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvTGluZUNsaWNrRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy9Qb2ludENsaWNrRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9PY3RhbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9QYXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vTGluZVByb3BlcnRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0NvbmRpdGlvbkZpeGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy9wb2ludC1kcmFnL1N0YXJ0UG9pbnREcmFnRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3M/NDQ0NiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcy93ZWJjb21wb25lbnRzLWhpLXNkLWNlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvRXZlbnRBZ2dyZWdhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvRXZlbnRRdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGluZS1yYXN0ZXJpemVyL0xpbmVSYXN0ZXJpemVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saW5lLXJhc3Rlcml6ZXIvb2N0YW50LXZlY3Rvci10cmFuc2Zvcm1hdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vQ29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9IaXRUZXN0UmVzdWx0LnRzIiwid2VicGFjazovLy8uL3NyYy9TdGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvVUlDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb25kaXRpb25zL1VJQ29uZGl0aW9uQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0ZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy9GaXhlZExlbmd0aExpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3M/ZDM2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlci5zY3NzP2U0MzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvTmV3UG9seWdvblVJQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnREcmFnZ2luZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvQ29udGludW91c0NvbmRpdGlvbkZpeGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9Qb2ludEluc2VydGVyU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnRSZW1vdmVyU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnRTeW5jU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnNjc3M/NzI5YiIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy9Db25kaXRpb25NYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNCdXR0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzPzRlMmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNB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LDJCQUEyQixHQUFHO0lBQ2xDLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUMsZUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUMsZUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxlQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFD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QyxNQUFNLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLGFBQWE7UUFDbkIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHVDQUFrQixFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRjtBQTNCRCxnREEyQkM7QUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOzs7Ozs7O0FDL0I1RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7O0FDekJBO0FBQ0E7OztBQUdBO0FBQ0EsdURBQXdELGVBQWUsRUFBRSxtQ0FBbUMsb0JBQW9CLFdBQVcsWUFBWSxlQUFlLGlCQUFpQixrQkFBa0IsMkJBQTJCLGVBQWUsMENBQTBDLEVBQUUsMkNBQTJDLGlCQUFpQixFQUFFLDBCQUEwQixvQkFBb0IsYUFBYSxjQUFjLGVBQWUsaURBQWlELDhCQUE4Qiw0QkFBNEIsZ0JBQWdCLGlCQUFpQix3QkFBd0Isa0NBQWtDLDRDQUE0QyxFQUFFLGtDQUFrQyxpREFBaUQsRUFBRSxpQ0FBaUMsY0FBYyxFQUFFOztBQUUveUIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcwMjdlZTFiZDcyMGIwNTE1ZjZmIiwiaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnY29tbW9uL0NPTE9SUyc7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuY29uc3QgY29uZmlndXJhdGlvbiA9IHtcclxuICBuZXdMaW5lUHJldmlld1Byb3BlcnRpZXM6IG5ldyBMaW5lUHJvcGVydGllcyhDT0xPUlMuQkxVRSwgMiksXHJcbiAgbmV3UG9seWdvbkxpbmVQcm9wZXJ0aWVzOiBuZXcgTGluZVByb3BlcnRpZXMoQ09MT1JTLlJFRCwgMSksXHJcbiAgcG9seWdvbkxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcy5nZXREZWZhdWx0KCksXHJcbiAgYXBwbGljYXRpb25VSUNvbnRhaW5lcklEOiAnYXBwbGljYXRpb24tdWknLFxyXG4gIGhpdFRvbGVyYW5jZTogMTAsXHJcbiAgbWluUG9seWdvblBvaW50czogMyxcclxuICBkb3VibGVDbGlja01heERlbGF5OiA1MDAsXHJcbiAgZGlzcGxheVBhdGhHaG9zdFdoZW5EcmFnZ2luZzogZmFsc2UsXHJcbiAgZXBzaWxvbjogMTBlLTQsXHJcbiAgbGluZURldmlhdGlvbkFsbG93YW5jZUluRGVncmVlczogMjAsXHJcbiAgY2FudmFzRm9udDogJzMwcHQgc2VyaWYnLFxyXG4gIGxpbmVDb25kaXRpb25MYWJlbE9mZnNldDogbmV3IFBvaW50KDUsIDApXHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIGNvbmZpZ3VyYXRpb25cclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZmlndXJhdGlvbi50cyIsImltcG9ydCB7IE9jdGFudCB9IGZyb20gJ2NvbW1vbi9PY3RhbnQnO1xyXG5cclxudHlwZSBNb3ZlQ2FsbGJhY2sgPSAoKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50IHtcclxuICBwdWJsaWMgbW92ZUNhbGxiYWNrOiBNb3ZlQ2FsbGJhY2sgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfeDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX3k6IG51bWJlcjtcclxuXHJcbiAgcHVibGljIGdldCB4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl94ID0geDtcclxuICAgIHRoaXMuX3kgPSB5O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhZGQocDE6IFBvaW50LCBwMjogUG9pbnQpOiBQb2ludCB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHAxLnggKyBwMi54LCBwMS55ICsgcDIueSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0KHAxOiBQb2ludCwgcDI6IFBvaW50KTogUG9pbnQge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludChwMS54IC0gcDIueCwgcDEueSAtIHAyLnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXREaXN0YW5jZUJldHdlZW4ocDE6IFBvaW50LCBwMjogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydChQb2ludC5nZXREaXN0YW5jZUJldHdlZW5TcXVhcmVkKHAxLCBwMikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXREaXN0YW5jZUJldHdlZW5TcXVhcmVkKHAxOiBQb2ludCwgcDI6IFBvaW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnBvdyhwMS54IC0gcDIueCwgMikgKyBNYXRoLnBvdyhwMS55IC0gcDIueSwgMik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEFuZ2xlKHAxOiBQb2ludCwgcDI6IFBvaW50KTogbnVtYmVyIHtcclxuICAgIGxldCBhbmdsZSA9IChNYXRoLmF0YW4yKHAyLnkgLSBwMS55LCBwMi54IC0gcDEueCkpICogMTgwIC8gTWF0aC5QSTtcclxuXHJcbiAgICBpZiAoYW5nbGUgPCAwKSB7XHJcbiAgICAgIGFuZ2xlICs9IDM2MDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYW5nbGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbW92ZVRvKHBvaW50OiBQb2ludCk6IHZvaWQ7XHJcbiAgcHVibGljIG1vdmVUbyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQ7XHJcbiAgcHVibGljIG1vdmVUbyhwb2ludE9yWDogUG9pbnQgfCBudW1iZXIsIHk/OiBudW1iZXIpIHtcclxuICAgIGlmICh0eXBlb2YgcG9pbnRPclggPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGlmICgheSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigneCBpcyBkZWZpbmVkLCBidXQgeSBpcyBub3QgZGVmaW5lZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5tb3ZlVG9Db29yZGluYXRlcyhwb2ludE9yWCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubW92ZVRvUG9pbnQocG9pbnRPclgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9jdGFudCgpOiBPY3RhbnQge1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcbiAgICBsZXQgb2N0YW50ID0gT2N0YW50LkZpcnN0O1xyXG5cclxuICAgIGlmICh5ID49IDApIHtcclxuICAgICAgaWYgKHggPj0gMCkge1xyXG4gICAgICAgIC8vIEZpcnN0IHF1YXJ0ZXJcclxuICAgICAgICBpZiAoeSA8PSB4KSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuRmlyc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5TZWNvbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFNlY29uZCBxdWFydGVyXHJcbiAgICAgICAgaWYgKHkgPj0gLXgpIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5UaGlyZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LkZvdXJ0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh4IDw9IDApIHtcclxuICAgICAgICAvLyBUaGlyZCBxdWFydGVyXHJcbiAgICAgICAgaWYgKHkgPj0geCkge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LkZpZnRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuU2l4dGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEZvdXJ0aCBxdWFydGVyXHJcbiAgICAgICAgaWYgKHkgPCAteCkge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LlNldmVudGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5FaWdodGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9jdGFudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlcXVhbHMocG9pbnQ6IFBvaW50KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy54ID09PSBwb2ludC54ICYmIHRoaXMueSA9PT0gcG9pbnQueTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREaXN0YW5jZVRvKHBvaW50OiBQb2ludCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuKHRoaXMsIHBvaW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREaXN0YW5jZVNxdWFyZWRUbyhwb2ludDogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIFBvaW50LmdldERpc3RhbmNlQmV0d2VlblNxdWFyZWQodGhpcywgcG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1vdmVUb1BvaW50KHBvaW50OiBQb2ludCkge1xyXG4gICAgcmV0dXJuIHRoaXMubW92ZVRvQ29vcmRpbmF0ZXMocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1vdmVUb0Nvb3JkaW5hdGVzKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl94ID0geDtcclxuICAgIHRoaXMuX3kgPSB5O1xyXG5cclxuICAgIGlmICh0aGlzLm1vdmVDYWxsYmFjaykge1xyXG4gICAgICB0aGlzLm1vdmVDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vUG9pbnQudHMiLCIvLyBEaWN0aW9uYXJ5XHJcbmNvbnN0IExFWCA9IHtcclxuICBQT0xZR09OX0xBWUVSX05BTUU6ICdQb2x5Z29uTGF5ZXInLFxyXG4gIFBBVEhfTEFZRVJfTkFNRTogJ1BhdGhMYXllcicsXHJcbiAgUEFUSF9HSE9TVF9MQVlFUl9OQU1FOiAnUGF0aEdob3N0TGF5ZXInLFxyXG4gIE5FV19DT05ESVRJT05fRVZFTlRfTkFNRTogJ25ldy1jb25kaXRpb24nLFxyXG4gIFJFTU9WRV9DT05ESVRJT05fRVZFTlRfTkFNRTogJ3JlbW92ZS1jb25kaXRpb24nLFxyXG4gIEtFWV9DT0RFOiB7XHJcbiAgICBFU0NBUEU6IDI3XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBMRVhcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvTEVYLnRzIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmUge1xyXG4gIHB1YmxpYyBwMTogUG9pbnQ7XHJcbiAgcHVibGljIHAyOiBQb2ludDtcclxuXHJcbiAgY29uc3RydWN0b3IocDE6IFBvaW50LCBwMjogUG9pbnQpIHtcclxuICAgIGlmIChwMS5lcXVhbHMocDIpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNyZWF0ZSBsaW5lIGJldHdlZW4gcG9pbnRzIGF0IHRoZSBzYW1lIGNvb3JkaW5hdGVzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wMSA9IHAxO1xyXG4gICAgdGhpcy5wMiA9IHAyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3RhbmNlVG9Qb2ludChwOiBQb2ludCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBwMSA9IHRoaXMucDE7XHJcbiAgICBjb25zdCBwMiA9IHRoaXMucDI7XHJcblxyXG4gICAgbGV0IHQgPVxyXG4gICAgICAoKHAueCAtIHAxLngpICogKHAyLnggLSBwMS54KSArIChwLnkgLSBwMS55KSAqIChwMi55IC0gcDEueSkpIC9cclxuICAgICAgUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZChwMSwgcDIpO1xyXG4gICAgdCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHQpKTtcclxuXHJcbiAgICByZXR1cm4gcC5nZXREaXN0YW5jZVRvKG5ldyBQb2ludChwMS54ICsgdCAqIChwMi54IC0gcDEueCksIHAxLnkgKyB0ICogKHAyLnkgLSBwMS55KSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVxdWFscyhsaW5lOiBMaW5lKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAodGhpcy5wMS5lcXVhbHMobGluZS5wMSkgJiYgdGhpcy5wMi5lcXVhbHMobGluZS5wMikpIHx8XHJcbiAgICAgICh0aGlzLnAxLmVxdWFscyhsaW5lLnAyKSAmJiB0aGlzLnAyLmVxdWFscyhsaW5lLnAxKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TWlkZGxlUG9pbnQoKTogUG9pbnQge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCgodGhpcy5wMS54ICsgdGhpcy5wMi54KSAvIDIsICh0aGlzLnAxLnkgKyB0aGlzLnAyLnkpIC8gMik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIFBvaW50LmdldERpc3RhbmNlQmV0d2Vlbih0aGlzLnAxLCB0aGlzLnAyKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0xpbmUudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyRXZlbnQgaW1wbGVtZW50cyBBcHBFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQgPSBudWxsO1xyXG4gIHB1YmxpYyByZWFkb25seSBldmVudFR5cGUgPSBSZW5kZXJFdmVudC5ldmVudFR5cGU7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdSZW5kZXJFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9SZW5kZXJFdmVudC50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTeW5jQ29tcG9uZW50c0V2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkID0gbnVsbDtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gU3luY0NvbXBvbmVudHNFdmVudC5ldmVudFR5cGU7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdTeW5jQ29tcG9uZW50c0V2ZW50JztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL3VpL1N5bmNDb21wb25lbnRzRXZlbnQudHMiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb21tb24vQ29sb3InO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTE9SUyA9IHtcclxuICBCTEFDSzogbmV3IENvbG9yKDAsIDAsIDApLFxyXG4gIFJFRDogbmV3IENvbG9yKDI1NSwgMCwgMCksXHJcbiAgQkxVRTogbmV3IENvbG9yKDAsIDI1NSwgMCksXHJcbiAgR1JFRU46IG5ldyBDb2xvcigwLCAwLCAyNTUpXHJcbn07XHJcblxyXG5PYmplY3QuZnJlZXplKENPTE9SUyk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9DT0xPUlMudHMiLCJpbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBMaW5lUHJvcGVydGllcyB9IGZyb20gJ2NvbW1vbi9MaW5lUHJvcGVydGllcyc7XHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9seWdvbiBleHRlbmRzIFBhdGgge1xyXG4gIHByaXZhdGUgbGluZUNvbmRpdGlvbnM6IExpbmVDb25kaXRpb25bXTtcclxuXHJcbiAgY29uc3RydWN0b3IocGF0aDogUGF0aCk7XHJcbiAgY29uc3RydWN0b3IodmVydGljZXM6IFBvaW50W10sIGxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcyk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGhPclZlcnRpY2VzOiBQYXRoIHwgUG9pbnRbXSwgbGluZVByb3BlcnRpZXM/OiBMaW5lUHJvcGVydGllcykge1xyXG4gICAgbGV0IHZlcnRpY2VzOiBQb2ludFtdO1xyXG5cclxuICAgIGlmIChwYXRoT3JWZXJ0aWNlcyBpbnN0YW5jZW9mIFBhdGgpIHtcclxuICAgICAgY29uc3QgcGF0aCA9IHBhdGhPclZlcnRpY2VzO1xyXG4gICAgICB2ZXJ0aWNlcyA9IHBhdGguZ2V0VmVydGljZXMoKTtcclxuICAgICAgbGluZVByb3BlcnRpZXMgPSBwYXRoLmxpbmVQcm9wZXJ0aWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmVydGljZXMgPSBwYXRoT3JWZXJ0aWNlcztcclxuICAgICAgbGluZVByb3BlcnRpZXMgPSA8TGluZVByb3BlcnRpZXM+bGluZVByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgUG9seWdvbi5lbnN1cmVWZXJ0aWNlc0xlbmd0aCh2ZXJ0aWNlcyk7XHJcbiAgICBzdXBlcih2ZXJ0aWNlcywgbGluZVByb3BlcnRpZXMpO1xyXG4gICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZW5zdXJlVmVydGljZXNMZW5ndGgodmVydGljZXM6IFBvaW50W10pIHtcclxuICAgIGlmICh2ZXJ0aWNlcy5sZW5ndGggPj0gY29uZmlndXJhdGlvbi5taW5Qb2x5Z29uUG9pbnRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFBvbHlnb24gbXVzdCBoYXZlIGF0IGxlYXN0ICR7Y29uZmlndXJhdGlvbi5taW5Qb2x5Z29uUG9pbnRzfSB2ZXJ0aWNlc2ApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb25lKCk6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uKHN1cGVyLmNsb25lKCkpO1xyXG5cclxuICAgIHRoaXMubGluZUNvbmRpdGlvbnMuZm9yRWFjaChsaW5lQ29uZGl0aW9uID0+IHtcclxuICAgICAgY29uc3QgcDFJbmRleCA9IHRoaXMuZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAxKTtcclxuICAgICAgY29uc3QgcDJJbmRleCA9IHRoaXMuZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAyKTtcclxuXHJcbiAgICAgIGNvbnN0IG5ld0xpbmVDb25kaXRpb24gPSBsaW5lQ29uZGl0aW9uLmR1cGxpY2F0ZUZvck5ld0xpbmUoXHJcbiAgICAgICAgbmV3IExpbmUocG9seWdvbi52ZXJ0aWNlc1twMUluZGV4XSwgcG9seWdvbi52ZXJ0aWNlc1twMkluZGV4XSksXHJcbiAgICAgICAgcG9seWdvblxyXG4gICAgICApO1xyXG4gICAgICBwb2x5Z29uLmxpbmVDb25kaXRpb25zLnB1c2gobmV3TGluZUNvbmRpdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcG9seWdvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnNlcnRWZXJ0ZXgocG9pbnQ6IFBvaW50LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBwcmV2aW91c1BvaW50SW5kZXggPSB0aGlzLmdldFByZXZpb3VzUG9pbnRJbmRleChpbmRleCk7XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNMaW5lID0gbmV3IExpbmUodGhpcy5nZXRWZXJ0ZXgocHJldmlvdXNQb2ludEluZGV4KSwgdGhpcy5nZXRWZXJ0ZXgoaW5kZXgpKTtcclxuICAgIGNvbnN0IG1hdGNoaW5nQ29uZGl0aW9ucyA9IHRoaXMubGluZUNvbmRpdGlvbnMuZmlsdGVyKGxpbmVDb25kaXRpb24gPT5cclxuICAgICAgbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhwcmV2aW91c0xpbmUpXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChtYXRjaGluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYENhbm5vdCBpbnNlcnQgYSBwb2ludCBiZWNhdXNlIG9mIGFuIGV4aXN0aW5nIGNvbmRpdGlvbiAoJHttYXRjaGluZ0NvbmRpdGlvbnNbMF0uY29uc3RydWN0b3JcclxuICAgICAgICAgIC5uYW1lfSlgXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwZXIuaW5zZXJ0VmVydGV4KHBvaW50LCBpbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TmV4dFBvaW50SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIChpbmRleCArIDEpICUgdGhpcy5nZXRWZXJ0aWNlc0NvdW50KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TmV4dFBvaW50KHBvaW50OiBQb2ludCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZlcnRpY2VzLmluZGV4T2YocG9pbnQpO1xyXG4gICAgY29uc3QgbmV4dFBvaW50SW5kZXggPSB0aGlzLmdldE5leHRQb2ludEluZGV4KGluZGV4KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRWZXJ0ZXgobmV4dFBvaW50SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByZXZpb3VzUG9pbnRJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcHJldmlvdXNQb2ludEluZGV4ID0gaW5kZXggLSAxO1xyXG4gICAgaWYgKHByZXZpb3VzUG9pbnRJbmRleCA8IDApIHtcclxuICAgICAgcHJldmlvdXNQb2ludEluZGV4ID0gdGhpcy5nZXRWZXJ0aWNlc0NvdW50KCkgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcmV2aW91c1BvaW50SW5kZXg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJldmlvdXNQb2ludChwb2ludDogUG9pbnQpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52ZXJ0aWNlcy5pbmRleE9mKHBvaW50KTtcclxuICAgIGNvbnN0IHByZXZpb3VzUG9pbnRJbmRleCA9IHRoaXMuZ2V0UHJldmlvdXNQb2ludEluZGV4KGluZGV4KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRWZXJ0ZXgocHJldmlvdXNQb2ludEluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVWZXJ0ZXgocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBpZiAodGhpcy5nZXRWZXJ0aWNlc0NvdW50KCkgPT09IGNvbmZpZ3VyYXRpb24ubWluUG9seWdvblBvaW50cykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBkZWxldGUgdmVydGV4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwZXIucmVtb3ZlVmVydGV4KHBvaW50KTtcclxuXHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9uc1RvUmVtb3ZlID0gdGhpcy5saW5lQ29uZGl0aW9ucy5maWx0ZXIoXHJcbiAgICAgIGxpbmVDb25kaXRpb24gPT4gbGluZUNvbmRpdGlvbi5saW5lLnAxID09PSBwb2ludCB8fCBsaW5lQ29uZGl0aW9uLmxpbmUucDIgPT09IHBvaW50XHJcbiAgICApO1xyXG4gICAgbGluZUNvbmRpdGlvbnNUb1JlbW92ZS5mb3JFYWNoKGxpbmVDb25kaXRpb24gPT4gdGhpcy5yZW1vdmVMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb24pKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb246IExpbmVDb25kaXRpb24pIHtcclxuICAgIGlmIChsaW5lQ29uZGl0aW9uLnBvbHlnb24gIT09IHRoaXMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIGNvbmRpdGlvbiBib3VuZCB0byB3cm9uZyBwb2x5Z29uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcDFJbmRleCA9IHRoaXMuZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAxKTtcclxuICAgIGNvbnN0IHAySW5kZXggPSB0aGlzLmZpbmRQb2ludEluZGV4KGxpbmVDb25kaXRpb24ubGluZS5wMik7XHJcbiAgICBpZiAocDFJbmRleCA9PT0gLTEgfHwgcDJJbmRleCA9PT0gLTIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIGNvbmRpdGlvbiBib3VuZCB0byB3cm9uZyBsaW5lJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsaW5lQ29uZGl0aW9uLmlzTWV0KCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIGNvbmRpdGlvbiBpcyBub3QgbWV0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saW5lQ29uZGl0aW9ucy5wdXNoKGxpbmVDb25kaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUxpbmVDb25kaXRpb24obGluZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmxpbmVDb25kaXRpb25zLmluZGV4T2YobGluZUNvbmRpdGlvbik7XHJcblxyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmUgY29uZGl0aW9uIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGluZUNvbmRpdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMaW5lQ29uZGl0aW9ucygpIHtcclxuICAgIHJldHVybiBbLi4udGhpcy5saW5lQ29uZGl0aW9uc107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbW92ZVRvKHBvbHlnb246IFBvbHlnb24pIHtcclxuICAgIGlmICh0aGlzLmdldFZlcnRpY2VzQ291bnQoKSAhPT0gcG9seWdvbi5nZXRWZXJ0aWNlc0NvdW50KCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgbnVtYmVyIG9mIHZlcnRpY2VzIGRvZXMgbm90IG1hdGNoJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52ZXJ0aWNlcy5mb3JFYWNoKChwb2ludCwgaW5kZXgpID0+IHBvaW50Lm1vdmVUbyhwb2x5Z29uLmdldFZlcnRleChpbmRleCkpKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL1BvbHlnb24udHMiLCJpbXBvcnQgeyBIaXRUZXN0UmVzdWx0IH0gZnJvbSAnY29tbW9uL0hpdFRlc3RSZXN1bHQnO1xyXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnY29tbW9uL1BhdGgnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnUmVuZGVyZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIExheWVyIHtcclxuICBwdWJsaWMgcGF0aHM6IFBhdGhbXSA9IFtdO1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW5kZXIocmVuZGVyZXI6IFJlbmRlcmVyKSB7XHJcbiAgICB0aGlzLnBhdGhzLmZvckVhY2gocGF0aCA9PiByZW5kZXJlci5kcmF3UGF0aChwYXRoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlUGF0aChwYXRoOiBQYXRoKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGF0aHMuaW5kZXhPZihwYXRoKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF0aHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaXRUZXN0KHBvaW50OiBQb2ludCk6IEhpdFRlc3RSZXN1bHQgfCBudWxsIHtcclxuICAgIGZvciAoY29uc3QgcGF0aCBvZiB0aGlzLnBhdGhzKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHBhdGguaGl0VGVzdChwb2ludCk7XHJcbiAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlc3VsdC5sYXllciA9IHRoaXM7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vTGF5ZXIudHMiLCJpbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUNvbmRpdGlvbiB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGxpbmU6IExpbmU7XHJcbiAgcHVibGljIHJlYWRvbmx5IHBvbHlnb246IFBvbHlnb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxpbmU6IExpbmUsIHBvbHlnb246IFBvbHlnb24pIHtcclxuICAgIHRoaXMubGluZSA9IGxpbmU7XHJcbiAgICB0aGlzLnBvbHlnb24gPSBwb2x5Z29uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzTWV0KCk6IGJvb2xlYW4ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lQ29uZGl0aW9uLmlzTWV0IG5vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpeChfbG9ja2VkUG9pbnQ6IFBvaW50KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmVDb25kaXRpb24uZml4IG5vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGR1cGxpY2F0ZUZvck5ld0xpbmUoX2xpbmU6IExpbmUsIF9wb2x5Z29uOiBQb2x5Z29uKTogTGluZUNvbmRpdGlvbiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZlcmlmeUNhbkJlQXBwbGllZCgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFiZWwoKTogc3RyaW5nIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbi50cyIsImltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMRVggfSBmcm9tICdMRVgnO1xyXG5pbXBvcnQge1xyXG4gIExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzLFxyXG4gIFNlbGVjdGVkVGFyZ2V0XHJcbn0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMnO1xyXG5cclxuaW1wb3J0ICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudC5zY3NzJztcclxuXHJcbmNvbnN0IExJTkVfQ09ORElUSU9OX0FDVElWRV9DTEFTUyA9ICdsaW5lLWNvbmRpdGlvbi0tYWN0aXZlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lQ29uZGl0aW9uRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2VsZWN0ZWRUYXJnZXQ6IFNlbGVjdGVkVGFyZ2V0O1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zZWxlY3RlZFRhcmdldCA9IGRlcGVuZGVuY2llcy5zZWxlY3RlZFRhcmdldDtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5idXR0b24uY2xhc3NOYW1lID0gJ2xpbmUtY29uZGl0aW9uX19idXR0b24nO1xyXG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQnV0dG9uQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5idXR0b24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZUJ1dHRvbigpIHtcclxuICAgIGNvbnN0IHRhcmdldENvbmRpdGlvbnMgPSB0aGlzLmdldFRhcmdldENvbmRpdGlvbnMoKTtcclxuICAgIGNvbnN0IG90aGVyQ29uZGl0aW9ucyA9IHRoaXMuZ2V0T3RoZXJUYXJnZXRDb25kaXRpb25zKHRhcmdldENvbmRpdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uLmRpc2FibGVkID0gb3RoZXJDb25kaXRpb25zLmxlbmd0aCA+IDA7XHJcblxyXG4gICAgaWYgKHRhcmdldENvbmRpdGlvbnMubGVuZ3RoIC0gb3RoZXJDb25kaXRpb25zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoTElORV9DT05ESVRJT05fQUNUSVZFX0NMQVNTKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShMSU5FX0NPTkRJVElPTl9BQ1RJVkVfQ0xBU1MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU5ld0NvbmRpdGlvbigpOiBMaW5lQ29uZGl0aW9uIHwgbnVsbCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldExpbmVDb25kaXRpb25Db25zdHJ1Y3RvcigpOiBGdW5jdGlvbiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkJ1dHRvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRDb25kaXRpb25zID0gdGhpcy5nZXRUYXJnZXRDb25kaXRpb25zKCk7XHJcbiAgICBjb25zdCBvdGhlckNvbmRpdGlvbnMgPSB0aGlzLmdldE90aGVyVGFyZ2V0Q29uZGl0aW9ucyh0YXJnZXRDb25kaXRpb25zKTtcclxuXHJcbiAgICBpZiAodGFyZ2V0Q29uZGl0aW9ucy5sZW5ndGggLSBvdGhlckNvbmRpdGlvbnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IHRhcmdldENvbmRpdGlvbnNbMF07XHJcblxyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KExFWC5SRU1PVkVfQ09ORElUSU9OX0VWRU5UX05BTUUsIHsgYnViYmxlczogdHJ1ZSwgZGV0YWlsOiBjb25kaXRpb24gfSlcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuY3JlYXRlTmV3Q29uZGl0aW9uKCk7XHJcbiAgICAgIGlmICghY29uZGl0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KExFWC5ORVdfQ09ORElUSU9OX0VWRU5UX05BTUUsIHsgYnViYmxlczogdHJ1ZSwgZGV0YWlsOiBjb25kaXRpb24gfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0VGFyZ2V0Q29uZGl0aW9ucygpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lIHx8ICF0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb24pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgbm90IHNlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcG9seWdvbiA9IHRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbjtcclxuICAgIGNvbnN0IGxpbmUgPSB0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmU7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9ucyA9IHBvbHlnb24uZ2V0TGluZUNvbmRpdGlvbnMoKTtcclxuXHJcbiAgICByZXR1cm4gbGluZUNvbmRpdGlvbnMuZmlsdGVyKGxpbmVDb25kaXRpb24gPT4gbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhsaW5lKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE90aGVyVGFyZ2V0Q29uZGl0aW9ucyh0YXJnZXRDb25kaXRpb25zOiBMaW5lQ29uZGl0aW9uW10pIHtcclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb25Db25zdHJ1Y3RvciA9IHRoaXMuZ2V0TGluZUNvbmRpdGlvbkNvbnN0cnVjdG9yKCk7XHJcblxyXG4gICAgcmV0dXJuIHRhcmdldENvbmRpdGlvbnMuZmlsdGVyKFxyXG4gICAgICBsaW5lQ29uZGl0aW9uID0+ICEobGluZUNvbmRpdGlvbiBpbnN0YW5jZW9mIGxpbmVDb25kaXRpb25Db25zdHJ1Y3RvcilcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5cclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuaW50ZXJmYWNlIExpbmVDbGlja0V2ZW50UGF5bG9hZCB7XHJcbiAgbGluZTogTGluZTtcclxuICBwYXRoOiBQYXRoO1xyXG4gIHBvc2l0aW9uOiBQb2ludDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVDbGlja0V2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBldmVudFR5cGUgPSBMaW5lQ2xpY2tFdmVudC5ldmVudFR5cGU7XHJcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQ6IExpbmVDbGlja0V2ZW50UGF5bG9hZDtcclxuICBwdWJsaWMgaGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsaW5lOiBMaW5lLCBwYXRoOiBQYXRoLCBwb3NpdGlvbjogUG9pbnQpIHtcclxuICAgIHRoaXMucGF5bG9hZCA9IHtcclxuICAgICAgbGluZSxcclxuICAgICAgcGF0aCxcclxuICAgICAgcG9zaXRpb25cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ0xpbmVDbGlja0V2ZW50JztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL0xpbmVDbGlja0V2ZW50LnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5pbXBvcnQgeyBQYXRoUG9pbnRDb21wb25lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnRDbGlja0V2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBldmVudFR5cGUgPSBQb2ludENsaWNrRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiBQYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocGF0aFBvaW50Q29tcG9uZW50OiBQYXRoUG9pbnRDb21wb25lbnQpIHtcclxuICAgIHRoaXMucGF5bG9hZCA9IHBhdGhQb2ludENvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnUG9pbnRDbGlja0V2ZW50JztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL1BvaW50Q2xpY2tFdmVudC50cyIsImV4cG9ydCBlbnVtIE9jdGFudCB7XHJcbiAgRmlyc3QsXHJcbiAgU2Vjb25kLFxyXG4gIFRoaXJkLFxyXG4gIEZvdXJ0aCxcclxuICBGaWZ0aCxcclxuICBTaXh0aCxcclxuICBTZXZlbnRoLFxyXG4gIEVpZ2h0aFxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9PY3RhbnQudHMiLCJpbXBvcnQgeyBIaXRUZXN0UmVzdWx0IH0gZnJvbSAnY29tbW9uL0hpdFRlc3RSZXN1bHQnO1xyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBMaW5lUHJvcGVydGllcyB9IGZyb20gJ2NvbW1vbi9MaW5lUHJvcGVydGllcyc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhdGgge1xyXG4gIHB1YmxpYyBjbG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgbGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzO1xyXG4gIHByb3RlY3RlZCByZWFkb25seSB2ZXJ0aWNlczogUG9pbnRbXTtcclxuXHJcbiAgY29uc3RydWN0b3IodmVydGljZXM6IFBvaW50W10sIGxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcykge1xyXG4gICAgdGhpcy52ZXJ0aWNlcyA9IHZlcnRpY2VzO1xyXG4gICAgdGhpcy5saW5lUHJvcGVydGllcyA9IGxpbmVQcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljICpnZXRWZXJ0aWNlc0l0ZXJhdG9yKCkge1xyXG4gICAgY29uc3QgdmVydGljZXNDb3VudCA9IHRoaXMudmVydGljZXMubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0aWNlc0NvdW50OyBpICs9IDEpIHtcclxuICAgICAgeWllbGQgdGhpcy52ZXJ0aWNlc1tpXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jbG9zZWQgJiYgdmVydGljZXNDb3VudCA+IDApIHtcclxuICAgICAgeWllbGQgdGhpcy52ZXJ0aWNlc1swXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyAqZ2V0TGluZUl0ZXJhdG9yKCkge1xyXG4gICAgbGV0IHByZXZpb3VzUG9pbnQ7XHJcblxyXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiB0aGlzLmdldFZlcnRpY2VzSXRlcmF0b3IoKSkge1xyXG4gICAgICBpZiAoIXByZXZpb3VzUG9pbnQpIHtcclxuICAgICAgICBwcmV2aW91c1BvaW50ID0gcG9pbnQ7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHlpZWxkIG5ldyBMaW5lKHByZXZpb3VzUG9pbnQsIHBvaW50KTtcclxuICAgICAgcHJldmlvdXNQb2ludCA9IHBvaW50O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN0YXJ0aW5nUG9pbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJ0aWNlc1swXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRWZXJ0aWNlc0NvdW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExpbmVQcm9wZXJ0aWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGluZVByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChwb2ludDogUG9pbnQpOiBIaXRUZXN0UmVzdWx0IHwgbnVsbCB7XHJcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgdGhpcy5nZXRMaW5lSXRlcmF0b3IoKSkge1xyXG4gICAgICBpZiAobGluZS5kaXN0YW5jZVRvUG9pbnQocG9pbnQpIDw9IGNvbmZpZ3VyYXRpb24uaGl0VG9sZXJhbmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBIaXRUZXN0UmVzdWx0KGxpbmUsIHRoaXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmVydGV4KGluZGV4OiBudW1iZXIpOiBQb2ludCB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJ0aWNlc1tpbmRleF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmVydGljZXMoKTogUG9pbnRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJ0aWNlcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRWZXJ0ZXgocG9pbnQ6IFBvaW50KSB7XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gocG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVZlcnRleChwb2ludDogUG9pbnQpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kUG9pbnRJbmRleChwb2ludCk7XHJcblxyXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICB0aGlzLnZlcnRpY2VzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5zZXJ0VmVydGV4KHBvaW50OiBQb2ludCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5zcGxpY2UoaW5kZXgsIDAsIHBvaW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9uZSgpOiBQYXRoIHtcclxuICAgIGNvbnN0IHZlcnRpY2VzID0gWy4uLnRoaXMuZ2V0VmVydGljZXMoKS5tYXAocG9pbnQgPT4gcG9pbnQuY2xvbmUoKSldO1xyXG4gICAgY29uc3QgbGluZVByb3BlcnRpZXMgPSB0aGlzLmxpbmVQcm9wZXJ0aWVzLmNsb25lKCk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQYXRoKHZlcnRpY2VzLCBsaW5lUHJvcGVydGllcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZFBvaW50SW5kZXgocG9pbnQ6IFBvaW50KSB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJ0aWNlcy5pbmRleE9mKHBvaW50KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL1BhdGgudHMiLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbW1vbi9Db2xvcic7XHJcbmltcG9ydCB7IENPTE9SUyB9IGZyb20gJ2NvbW1vbi9DT0xPUlMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVQcm9wZXJ0aWVzIHtcclxuICBwdWJsaWMgY29sb3I6IENvbG9yO1xyXG4gIHB1YmxpYyB0aGlja25lc3M6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoY29sb3I6IENvbG9yLCB0aGlja25lc3M6IG51bWJlcikge1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgdGhpcy50aGlja25lc3MgPSB0aGlja25lc3M7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldERlZmF1bHQoKTogTGluZVByb3BlcnRpZXMge1xyXG4gICAgcmV0dXJuIG5ldyBMaW5lUHJvcGVydGllcyhDT0xPUlMuQkxBQ0ssIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb25lKCk6IExpbmVQcm9wZXJ0aWVzIHtcclxuICAgIHJldHVybiBuZXcgTGluZVByb3BlcnRpZXModGhpcy5jb2xvciwgdGhpcy50aGlja25lc3MpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vTGluZVByb3BlcnRpZXMudHMiLCJpbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcblxyXG5jb25zdCBtYXhEZXZpYXRpb24gPSBjb25maWd1cmF0aW9uLmxpbmVEZXZpYXRpb25BbGxvd2FuY2VJbkRlZ3JlZXM7XHJcblxyXG5jb25zdCBhbGxvd2VkRGVncmVlUmFuZ2VzID0gW1xyXG4gIFswLCBtYXhEZXZpYXRpb25dLFxyXG4gIFsxODAgLSBtYXhEZXZpYXRpb24sIDE4MCArIG1heERldmlhdGlvbl0sXHJcbiAgWzM2MCAtIG1heERldmlhdGlvbiwgMzYwXVxyXG5dO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvcml6b250YWxMaW5lQ29uZGl0aW9uIGV4dGVuZHMgTGluZUNvbmRpdGlvbiB7XHJcbiAgcHVibGljIGlzTWV0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGluZS5wMS55ID09PSB0aGlzLmxpbmUucDIueTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaXgobG9ja2VkUG9pbnQ6IFBvaW50KSB7XHJcbiAgICBpZiAobG9ja2VkUG9pbnQgPT09IHRoaXMubGluZS5wMSkge1xyXG4gICAgICB0aGlzLmFsaWduUG9pbnRzSG9yaXpvbnRhbGx5KHRoaXMubGluZS5wMiwgdGhpcy5saW5lLnAxKTtcclxuICAgIH0gZWxzZSBpZiAobG9ja2VkUG9pbnQgPT09IHRoaXMubGluZS5wMikge1xyXG4gICAgICB0aGlzLmFsaWduUG9pbnRzSG9yaXpvbnRhbGx5KHRoaXMubGluZS5wMSwgdGhpcy5saW5lLnAyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTG9ja2VkIHBvaW50IGRvZXMgbm90IG1hdGNoIGVpdGhlciBwb2ludCBvbiB0aGUgbGluZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGR1cGxpY2F0ZUZvck5ld0xpbmUobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgcmV0dXJuIG5ldyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbihsaW5lLCBwb2x5Z29uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2ZXJpZnlDYW5CZUFwcGxpZWQoKSB7XHJcbiAgICBjb25zdCBhbmdsZSA9IFBvaW50LmdldEFuZ2xlKHRoaXMubGluZS5wMSwgdGhpcy5saW5lLnAyKTtcclxuXHJcbiAgICBpZiAoIWFsbG93ZWREZWdyZWVSYW5nZXMuc29tZShkZWdyZWVSYW5nZSA9PiBhbmdsZSA+PSBkZWdyZWVSYW5nZVswXSAmJiBhbmdsZSA8PSBkZWdyZWVSYW5nZVsxXSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIGlzIG5vdCBob3Jpem9udGFsIGVub3VnaCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExhYmVsKCkge1xyXG4gICAgcmV0dXJuICctJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWxpZ25Qb2ludHNIb3Jpem9udGFsbHkoc3ViamVjdDogUG9pbnQsIGRlc3RpbmF0aW9uOiBQb2ludCkge1xyXG4gICAgc3ViamVjdC5tb3ZlVG8obmV3IFBvaW50KHN1YmplY3QueCwgZGVzdGluYXRpb24ueSkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0hvcml6b250YWxMaW5lQ29uZGl0aW9uLnRzIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuY29uc3QgbWF4RGV2aWF0aW9uID0gY29uZmlndXJhdGlvbi5saW5lRGV2aWF0aW9uQWxsb3dhbmNlSW5EZWdyZWVzO1xyXG5cclxuY29uc3QgYWxsb3dlZERlZ3JlZVJhbmdlcyA9IFtcclxuICBbOTAgLSBtYXhEZXZpYXRpb24sIDkwICsgbWF4RGV2aWF0aW9uXSxcclxuICBbMjcwIC0gbWF4RGV2aWF0aW9uLCAyNzAgKyBtYXhEZXZpYXRpb25dXHJcbl07XHJcblxyXG5leHBvcnQgY2xhc3MgVmVydGljYWxMaW5lQ29uZGl0aW9uIGV4dGVuZHMgTGluZUNvbmRpdGlvbiB7XHJcbiAgcHVibGljIGlzTWV0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGluZS5wMS54ID09PSB0aGlzLmxpbmUucDIueDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaXgobG9ja2VkUG9pbnQ6IFBvaW50KSB7XHJcbiAgICBpZiAobG9ja2VkUG9pbnQgPT09IHRoaXMubGluZS5wMSkge1xyXG4gICAgICB0aGlzLmFsaWduUG9pbnRzVmVydGljYWxseSh0aGlzLmxpbmUucDIsIHRoaXMubGluZS5wMSk7XHJcbiAgICB9IGVsc2UgaWYgKGxvY2tlZFBvaW50ID09PSB0aGlzLmxpbmUucDIpIHtcclxuICAgICAgdGhpcy5hbGlnblBvaW50c1ZlcnRpY2FsbHkodGhpcy5saW5lLnAxLCB0aGlzLmxpbmUucDIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMb2NrZWQgcG9pbnQgZG9lcyBub3QgbWF0Y2ggZWl0aGVyIHBvaW50IG9uIHRoZSBsaW5lJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHVwbGljYXRlRm9yTmV3TGluZShsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlcnRpY2FsTGluZUNvbmRpdGlvbihsaW5lLCBwb2x5Z29uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2ZXJpZnlDYW5CZUFwcGxpZWQoKSB7XHJcbiAgICBjb25zdCBhbmdsZSA9IFBvaW50LmdldEFuZ2xlKHRoaXMubGluZS5wMSwgdGhpcy5saW5lLnAyKTtcclxuXHJcbiAgICBpZiAoIWFsbG93ZWREZWdyZWVSYW5nZXMuc29tZShkZWdyZWVSYW5nZSA9PiBhbmdsZSA+PSBkZWdyZWVSYW5nZVswXSAmJiBhbmdsZSA8PSBkZWdyZWVSYW5nZVsxXSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIGlzIG5vdCB2ZXJ0aWNhbCBlbm91Z2gnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMYWJlbCgpIHtcclxuICAgIHJldHVybiAnfCc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFsaWduUG9pbnRzVmVydGljYWxseShzdWJqZWN0OiBQb2ludCwgZGVzdGluYXRpb246IFBvaW50KSB7XHJcbiAgICBzdWJqZWN0Lm1vdmVUbyhuZXcgUG9pbnQoZGVzdGluYXRpb24ueCwgc3ViamVjdC55KSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uLnRzIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuXHJcbmV4cG9ydCBlbnVtIEZpeGluZ0RpcmVjdGlvbiB7XHJcbiAgTm9ybWFsLFxyXG4gIFJldmVyc2VcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbkZpeGVyIHtcclxuICBwdWJsaWMgZGlyZWN0aW9uOiBGaXhpbmdEaXJlY3Rpb247XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgcG9seWdvbjogUG9seWdvbjtcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0YXJ0aW5nUG9pbnQ6IFBvaW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYWRkaXRpb25hbExpbmVDb25kaXRpb25zOiBMaW5lQ29uZGl0aW9uW107XHJcblxyXG4gIHByaXZhdGUgX2ZpeFN1Y2Nlc3NmdWw/OiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBvbHlnb246IFBvbHlnb24sXHJcbiAgICBzdGFydGluZ1BvaW50OiBQb2ludCxcclxuICAgIGFkZGl0aW9uYWxMaW5lQ29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdID0gW10sXHJcbiAgICBkaXJlY3Rpb246IEZpeGluZ0RpcmVjdGlvbiA9IEZpeGluZ0RpcmVjdGlvbi5Ob3JtYWxcclxuICApIHtcclxuICAgIHRoaXMucG9seWdvbiA9IHBvbHlnb247XHJcbiAgICB0aGlzLnN0YXJ0aW5nUG9pbnQgPSBzdGFydGluZ1BvaW50O1xyXG4gICAgdGhpcy5hZGRpdGlvbmFsTGluZUNvbmRpdGlvbnMgPSBhZGRpdGlvbmFsTGluZUNvbmRpdGlvbnM7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZml4U3VjY2Vzc2Z1bCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLl9maXhTdWNjZXNzZnVsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0cnlGaXggbmVlZHMgdG8gYmUgY2FsbGVkIGZpcnN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2ZpeFN1Y2Nlc3NmdWw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJ5Rml4KCkge1xyXG4gICAgaWYgKHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmRpdGlvbkZpeGVyIG5lZWRzIHRvIGJlIHJlc2V0IGJlZm9yZSBmaXhpbmcgYWdhaW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvbHlnb24uZ2V0VmVydGljZXMoKTtcclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb25zID0gWy4uLnRoaXMucG9seWdvbi5nZXRMaW5lQ29uZGl0aW9ucygpLCAuLi50aGlzLmFkZGl0aW9uYWxMaW5lQ29uZGl0aW9uc107XHJcbiAgICBjb25zdCBzdGFydGluZ1BvaW50SW5kZXggPSB0aGlzLnBvbHlnb24uZmluZFBvaW50SW5kZXgodGhpcy5zdGFydGluZ1BvaW50KTtcclxuICAgIGxldCBsb2NrZWRQb2ludEluZGV4ID0gc3RhcnRpbmdQb2ludEluZGV4O1xyXG4gICAgbGV0IGN1cnJlbnRQb2ludEluZGV4ID0gdGhpcy5nZXROZXh0UG9pbnRJbmRleChsb2NrZWRQb2ludEluZGV4KTtcclxuXHJcbiAgICB3aGlsZSAoY3VycmVudFBvaW50SW5kZXggIT09IHN0YXJ0aW5nUG9pbnRJbmRleCkge1xyXG4gICAgICBjb25zdCBjdXJyZW50TGluZSA9IG5ldyBMaW5lKHBvaW50c1tsb2NrZWRQb2ludEluZGV4XSwgcG9pbnRzW2N1cnJlbnRQb2ludEluZGV4XSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRMaW5lQ29uZGl0aW9ucyA9IGxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+XHJcbiAgICAgICAgbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhjdXJyZW50TGluZSlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGN1cnJlbnRMaW5lQ29uZGl0aW9uc1xyXG4gICAgICAgIC5maWx0ZXIobGluZUNvbmRpdGlvbiA9PiAhbGluZUNvbmRpdGlvbi5pc01ldCgpKVxyXG4gICAgICAgIC5mb3JFYWNoKGxpbmVDb25kaXRpb24gPT4gbGluZUNvbmRpdGlvbi5maXgocG9pbnRzW2xvY2tlZFBvaW50SW5kZXhdKSk7XHJcblxyXG4gICAgICBsb2NrZWRQb2ludEluZGV4ID0gY3VycmVudFBvaW50SW5kZXg7XHJcbiAgICAgIGN1cnJlbnRQb2ludEluZGV4ID0gdGhpcy5nZXROZXh0UG9pbnRJbmRleChjdXJyZW50UG9pbnRJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZml4U3VjY2Vzc2Z1bCA9IGxpbmVDb25kaXRpb25zLmV2ZXJ5KGxpbmVDb25kaXRpb24gPT4gbGluZUNvbmRpdGlvbi5pc01ldCgpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpIHtcclxuICAgIHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE5leHRQb2ludEluZGV4KGN1cnJlbnRQb2ludEluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRml4aW5nRGlyZWN0aW9uLlJldmVyc2UpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucG9seWdvbi5nZXRQcmV2aW91c1BvaW50SW5kZXgoY3VycmVudFBvaW50SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnBvbHlnb24uZ2V0TmV4dFBvaW50SW5kZXgoY3VycmVudFBvaW50SW5kZXgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0NvbmRpdGlvbkZpeGVyLnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5pbXBvcnQgeyBQYXRoUG9pbnRDb21wb25lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmluaXNoUG9pbnREcmFnRXZlbnQgaW1wbGVtZW50cyBBcHBFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQ6IFBhdGhQb2ludENvbXBvbmVudDtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gRmluaXNoUG9pbnREcmFnRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGhQb2ludENvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50KSB7XHJcbiAgICB0aGlzLnBheWxvYWQgPSBwYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ0ZpbmlzaFBvaW50RHJhZ0V2ZW50JztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL3BvaW50LWRyYWcvRmluaXNoUG9pbnREcmFnRXZlbnQudHMiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50RHJhZ0V2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiB7XHJcbiAgICBjb21wb25lbnQ6IFBhdGhQb2ludENvbXBvbmVudCxcclxuICAgIG5ld1Bvc2l0aW9uOiBQb2ludFxyXG4gIH07XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgaGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXRoUG9pbnRDb21wb25lbnQ6IFBhdGhQb2ludENvbXBvbmVudCwgbmV3UG9zaXRpb246IFBvaW50KSB7XHJcbiAgICB0aGlzLnBheWxvYWQgPSB7XHJcbiAgICAgIGNvbXBvbmVudDogcGF0aFBvaW50Q29tcG9uZW50LFxyXG4gICAgICBuZXdQb3NpdGlvblxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnUG9pbnREcmFnRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvcG9pbnQtZHJhZy9Qb2ludERyYWdFdmVudC50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXJ0UG9pbnREcmFnRXZlbnQgaW1wbGVtZW50cyBBcHBFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHBheWxvYWQ6IFBhdGhQb2ludENvbXBvbmVudDtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gU3RhcnRQb2ludERyYWdFdmVudC5ldmVudFR5cGU7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocGF0aFBvaW50Q29tcG9uZW50OiBQYXRoUG9pbnRDb21wb25lbnQpIHtcclxuICAgIHRoaXMucGF5bG9hZCA9IHBhdGhQb2ludENvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnU3RhcnRQb2ludERyYWdFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9wb2ludC1kcmFnL1N0YXJ0UG9pbnREcmFnRXZlbnQudHMiLCJpbXBvcnQgJ3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnN0cnVjdGlvbnNEaWFsb2cgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgcHJpdmF0ZSBvdmVybGF5OiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGRpYWxvZ0NvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBkaXNtaXNzQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuY2xhc3NOYW1lID0gJ2luc3RydWN0aW9ucy1kaWFsb2ctd3JhcHBlcic7XHJcblxyXG4gICAgdGhpcy5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lID0gJ2luc3RydWN0aW9ucy1kaWFsb2dfX292ZXJsYXknO1xyXG5cclxuICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc05hbWUgPSAnaW5zdHJ1Y3Rpb25zLWRpYWxvZyc7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnSW5zdHJ1Y3Rpb25zJztcclxuICAgIHRpdGxlLmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtZGlhbG9nX190aXRsZSc7XHJcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcblxyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVVc2FnZUxpc3QoKSk7XHJcblxyXG4gICAgdGhpcy5kaXNtaXNzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmRpc21pc3NCdXR0b24udGV4dENvbnRlbnQgPSAnRGlzbWlzcyc7XHJcbiAgICB0aGlzLmRpc21pc3NCdXR0b24uY2xhc3NOYW1lID0gJ2luc3RydWN0aW9ucy1kaWFsb2dfX2Rpc21pc3MtYnV0dG9uJztcclxuXHJcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpc21pc3NCdXR0b24pO1xyXG5cclxuICAgIHRoaXMuZGlzbWlzcyA9IHRoaXMuZGlzbWlzcy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZ0NvbnRhaW5lcik7XHJcbiAgICB0aGlzLmRpc21pc3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRpc21pc3MpO1xyXG4gICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kaXNtaXNzKTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fb3ZlcmxheS0tYWN0aXZlJyk7XHJcbiAgICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luc3RydWN0aW9ucy1kaWFsb2ctLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMub3ZlcmxheSk7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZGlhbG9nQ29udGFpbmVyKTtcclxuICAgIHRoaXMuZGlzbWlzc0J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGlzbWlzcyk7XHJcbiAgICB0aGlzLm92ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRpc21pc3MpO1xyXG5cclxuICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdpbnN0cnVjdGlvbnMtZGlhbG9nX19vdmVybGF5LS1hY3RpdmUnKTtcclxuICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2luc3RydWN0aW9ucy1kaWFsb2ctLWFjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNtaXNzKCkge1xyXG4gICAgdGhpcy5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVXNhZ2VMaXN0KCkge1xyXG4gICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblxyXG4gICAgY29uc3QgdXNhZ2UgPSBbXHJcbiAgICAgICdDbGljayBvbiB0aGUgZnJlZSBzcGFjZSBpbiB0aGUgY2FudmFzIHRvIHN0YXJ0IGNyZWF0aW5nIHZlcnRpY2VzJyxcclxuICAgICAgJ0NsaWNrIG9uIHRoZSBpbml0aWFsIHZlcnRleCB0byBjbG9zZSB0aGUgcGF0aCBpbnRvIGEgcG9seWdvbicsXHJcbiAgICAgICdBbHRlcm5hdGl2ZWx5LCB5b3UgbWF5IHByZXNzIEVzY2FwZSB0byBjYW5jZWwgYWRkaW5nIGEgbmV3IHBhdGgnLFxyXG4gICAgICAnQ2xpY2sgYW5kIGRyYWcgdGhlIHZlcnRleCB0byBtb3ZlIGl0JyxcclxuICAgICAgJ0RvdWJsZSBjbGljayBvbiBhbiBlZGdlIHRvIGFkZCBhIHZlcnRleCBpbiB0aGUgbWlkZGxlIG9mIGl0JyxcclxuICAgICAgJ0RvdWJsZSBjbGljayBvbiBhIHZlcnRleCB0byByZW1vdmUgaXQnLFxyXG4gICAgICAnQ2xpY2sgYW4gZWRnZSB0byBhZGQgb3IgcmVtb3ZlIGFuIGVkZ2UgcmVsYXRpb24nXHJcbiAgICBdO1xyXG5cclxuICAgIHVzYWdlLm1hcCh1c2FnZUl0ZW1UZXh0ID0+IHRoaXMuY3JlYXRlVXNhZ2VMaXN0SXRlbSh1c2FnZUl0ZW1UZXh0KSlcclxuICAgICAgLmZvckVhY2godXNhZ2VMaXN0SXRlbSA9PiBsaXN0LmFwcGVuZENoaWxkKHVzYWdlTGlzdEl0ZW0pKTtcclxuXHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVXNhZ2VMaXN0SXRlbSh0ZXh0Q29udGVudDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGl0ZW0udGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcclxuXHJcbiAgICByZXR1cm4gaXRlbTtcclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1pbnN0cnVjdGlvbnMtZGlhbG9nJywgSW5zdHJ1Y3Rpb25zRGlhbG9nKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nLnRzIiwiaW1wb3J0ICdpbmRleC5zY3NzJztcclxuaW1wb3J0ICdub3JtYWxpemUuY3NzJztcclxuXHJcbmltcG9ydCAnQHdlYmNvbXBvbmVudHMvd2ViY29tcG9uZW50c2pzL3dlYmNvbXBvbmVudHMtaGktc2QtY2UnO1xyXG5cclxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICdBcHBsaWNhdGlvbic7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGJvb3RzdHJhcCwgZmFsc2UpO1xyXG5cclxuZnVuY3Rpb24gYm9vdHN0cmFwKCk6IHZvaWQge1xyXG4gIGNvbnN0IGNhbnZhc0lkID0gJ21haW4tY2FudmFzJztcclxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XHJcbiAgaWYgKCFjYW52YXMpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0NhbnZhcyB3aXRoIGlkJywgY2FudmFzSWQsICdub3QgZm91bmQnKTtcclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBhcHBsaWNhdGlvbiA9IG5ldyBBcHBsaWNhdGlvbig8SFRNTENhbnZhc0VsZW1lbnQ+Y2FudmFzKTtcclxuICBhcHBsaWNhdGlvbi5pbml0KCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvaW5kZXgudHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9pbmRleC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0OyB9XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMS41OyB9XFxuXFxuLm1haW4tY2FudmFzIHtcXG4gIGJvcmRlcjogc29saWQgMXB4IGJsYWNrOyB9XFxuXFxuLm1haW4tY29udGFpbmVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMCAxZW07IH1cXG5cXG4uY2FudmFzLXdyYXBwZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uYXBwbGljYXRpb24tdWkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG4gIC5hcHBsaWNhdGlvbi11aSAqIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDsgfVxcblxcbi5hcHAtaGVhZGVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDFlbTtcXG4gIHBhZGRpbmctbGVmdDogMWVtOyB9XFxuXFxuLmFwcC1uYW1lIHtcXG4gIG1hcmdpbjogMDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9pbmRleC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbigpey8qXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcblxuQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuXG5Db3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbnN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG5cbiBDb3B5cmlnaHQgKGMpIDIwMTQgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiovXG4ndXNlIHN0cmljdCc7dmFyIEo9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93PT09dGhpcz90aGlzOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWwmJm51bGwhPWdsb2JhbD9nbG9iYWw6dGhpcyxBYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydGllcz9PYmplY3QuZGVmaW5lUHJvcGVydHk6ZnVuY3Rpb24oZyxxLE4pe2chPUFycmF5LnByb3RvdHlwZSYmZyE9T2JqZWN0LnByb3RvdHlwZSYmKGdbcV09Ti52YWx1ZSl9O2Z1bmN0aW9uIHNiKCl7c2I9ZnVuY3Rpb24oKXt9O0ouU3ltYm9sfHwoSi5TeW1ib2w9dGIpfXZhciB0Yj1mdW5jdGlvbigpe3ZhciBnPTA7cmV0dXJuIGZ1bmN0aW9uKHEpe3JldHVyblwianNjb21wX3N5bWJvbF9cIisocXx8XCJcIikrZysrfX0oKTtcbmZ1bmN0aW9uIGRkKCl7c2IoKTt2YXIgZz1KLlN5bWJvbC5pdGVyYXRvcjtnfHwoZz1KLlN5bWJvbC5pdGVyYXRvcj1KLlN5bWJvbChcIml0ZXJhdG9yXCIpKTtcImZ1bmN0aW9uXCIhPXR5cGVvZiBBcnJheS5wcm90b3R5cGVbZ10mJkFhKEFycmF5LnByb3RvdHlwZSxnLHtjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gZWQodGhpcyl9fSk7ZGQ9ZnVuY3Rpb24oKXt9fWZ1bmN0aW9uIGVkKGcpe3ZhciBxPTA7cmV0dXJuIGZkKGZ1bmN0aW9uKCl7cmV0dXJuIHE8Zy5sZW5ndGg/e2RvbmU6ITEsdmFsdWU6Z1txKytdfTp7ZG9uZTohMH19KX1mdW5jdGlvbiBmZChnKXtkZCgpO2c9e25leHQ6Z307Z1tKLlN5bWJvbC5pdGVyYXRvcl09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc307cmV0dXJuIGd9ZnVuY3Rpb24gZ2QoZyl7ZGQoKTt2YXIgcT1nW1N5bWJvbC5pdGVyYXRvcl07cmV0dXJuIHE/cS5jYWxsKGcpOmVkKGcpfVxuZnVuY3Rpb24gaGQoZyl7Zm9yKHZhciBxLE49W107IShxPWcubmV4dCgpKS5kb25lOylOLnB1c2gocS52YWx1ZSk7cmV0dXJuIE59XG4oZnVuY3Rpb24oKXtmdW5jdGlvbiBnKCl7dmFyIGE9dGhpczt0aGlzLm09e307dGhpcy5nPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudDt2YXIgYj1uZXcgQmE7Yi5ydWxlcz1bXTt0aGlzLmg9di5zZXQodGhpcy5nLG5ldyB2KGIpKTt0aGlzLmk9ITE7dGhpcy5iPXRoaXMuYT1udWxsO3ViKGZ1bmN0aW9uKCl7YS5jKCl9KX1mdW5jdGlvbiBxKCl7dGhpcy5jdXN0b21TdHlsZXM9W107dGhpcy5lbnF1ZXVlZD0hMX1mdW5jdGlvbiBOKCl7fWZ1bmN0aW9uIGhhKGEpe3RoaXMuY2FjaGU9e307dGhpcy5jPXZvaWQgMD09PWE/MTAwOmF9ZnVuY3Rpb24gbigpe31mdW5jdGlvbiB2KGEsYixjLGQsZSl7dGhpcy5EPWF8fG51bGw7dGhpcy5iPWJ8fG51bGw7dGhpcy5sYT1jfHxbXTt0aGlzLk49bnVsbDt0aGlzLlY9ZXx8XCJcIjt0aGlzLmE9dGhpcy5BPXRoaXMuSj1udWxsfWZ1bmN0aW9uIHUoKXt9ZnVuY3Rpb24gQmEoKXt0aGlzLmVuZD10aGlzLnN0YXJ0PTA7dGhpcy5ydWxlcz10aGlzLnBhcmVudD1cbnRoaXMucHJldmlvdXM9bnVsbDt0aGlzLmNzc1RleHQ9dGhpcy5wYXJzZWRDc3NUZXh0PVwiXCI7dGhpcy5hdFJ1bGU9ITE7dGhpcy50eXBlPTA7dGhpcy5wYXJzZWRTZWxlY3Rvcj10aGlzLnNlbGVjdG9yPXRoaXMua2V5ZnJhbWVzTmFtZT1cIlwifWZ1bmN0aW9uIGlkKGEpe2Z1bmN0aW9uIGIoYixjKXtPYmplY3QuZGVmaW5lUHJvcGVydHkoYixcImlubmVySFRNTFwiLHtlbnVtZXJhYmxlOmMuZW51bWVyYWJsZSxjb25maWd1cmFibGU6ITAsZ2V0OmMuZ2V0LHNldDpmdW5jdGlvbihiKXt2YXIgZD10aGlzLGU9dm9pZCAwO3QodGhpcykmJihlPVtdLE8odGhpcyxmdW5jdGlvbihhKXthIT09ZCYmZS5wdXNoKGEpfSkpO2Muc2V0LmNhbGwodGhpcyxiKTtpZihlKWZvcih2YXIgZj0wO2Y8ZS5sZW5ndGg7ZisrKXt2YXIgaz1lW2ZdOzE9PT1rLl9fQ0Vfc3RhdGUmJmEuZGlzY29ubmVjdGVkQ2FsbGJhY2soayl9dGhpcy5vd25lckRvY3VtZW50Ll9fQ0VfaGFzUmVnaXN0cnk/YS5mKHRoaXMpOmEubCh0aGlzKTtcbnJldHVybiBifX0pfWZ1bmN0aW9uIGMoYixjKXt4KGIsXCJpbnNlcnRBZGphY2VudEVsZW1lbnRcIixmdW5jdGlvbihiLGQpe3ZhciBlPXQoZCk7Yj1jLmNhbGwodGhpcyxiLGQpO2UmJmEuYShkKTt0KGIpJiZhLmIoZCk7cmV0dXJuIGJ9KX12YiYmeChFbGVtZW50LnByb3RvdHlwZSxcImF0dGFjaFNoYWRvd1wiLGZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLl9fQ0Vfc2hhZG93Um9vdD1hPXZiLmNhbGwodGhpcyxhKX0pO2lmKENhJiZDYS5nZXQpYihFbGVtZW50LnByb3RvdHlwZSxDYSk7ZWxzZSBpZihEYSYmRGEuZ2V0KWIoSFRNTEVsZW1lbnQucHJvdG90eXBlLERhKTtlbHNle3ZhciBkPUVhLmNhbGwoZG9jdW1lbnQsXCJkaXZcIik7YS5zKGZ1bmN0aW9uKGEpe2IoYSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHdiLmNhbGwodGhpcywhMCkuaW5uZXJIVE1MfSxzZXQ6ZnVuY3Rpb24oYSl7dmFyIGI9XCJ0ZW1wbGF0ZVwiPT09dGhpcy5sb2NhbE5hbWU/XG50aGlzLmNvbnRlbnQ6dGhpcztmb3IoZC5pbm5lckhUTUw9YTswPGIuY2hpbGROb2Rlcy5sZW5ndGg7KUZhLmNhbGwoYixiLmNoaWxkTm9kZXNbMF0pO2Zvcig7MDxkLmNoaWxkTm9kZXMubGVuZ3RoOylpYS5jYWxsKGIsZC5jaGlsZE5vZGVzWzBdKX19KX0pfXgoRWxlbWVudC5wcm90b3R5cGUsXCJzZXRBdHRyaWJ1dGVcIixmdW5jdGlvbihiLGMpe2lmKDEhPT10aGlzLl9fQ0Vfc3RhdGUpcmV0dXJuIHhiLmNhbGwodGhpcyxiLGMpO3ZhciBkPUdhLmNhbGwodGhpcyxiKTt4Yi5jYWxsKHRoaXMsYixjKTtjPUdhLmNhbGwodGhpcyxiKTthLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0aGlzLGIsZCxjLG51bGwpfSk7eChFbGVtZW50LnByb3RvdHlwZSxcInNldEF0dHJpYnV0ZU5TXCIsZnVuY3Rpb24oYixjLGQpe2lmKDEhPT10aGlzLl9fQ0Vfc3RhdGUpcmV0dXJuIHliLmNhbGwodGhpcyxiLGMsZCk7dmFyIGU9amEuY2FsbCh0aGlzLGIsYyk7eWIuY2FsbCh0aGlzLGIsYyxkKTtkPWphLmNhbGwodGhpcyxcbmIsYyk7YS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodGhpcyxjLGUsZCxiKX0pO3goRWxlbWVudC5wcm90b3R5cGUsXCJyZW1vdmVBdHRyaWJ1dGVcIixmdW5jdGlvbihiKXtpZigxIT09dGhpcy5fX0NFX3N0YXRlKXJldHVybiB6Yi5jYWxsKHRoaXMsYik7dmFyIGM9R2EuY2FsbCh0aGlzLGIpO3piLmNhbGwodGhpcyxiKTtudWxsIT09YyYmYS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodGhpcyxiLGMsbnVsbCxudWxsKX0pO3goRWxlbWVudC5wcm90b3R5cGUsXCJyZW1vdmVBdHRyaWJ1dGVOU1wiLGZ1bmN0aW9uKGIsYyl7aWYoMSE9PXRoaXMuX19DRV9zdGF0ZSlyZXR1cm4gQWIuY2FsbCh0aGlzLGIsYyk7dmFyIGQ9amEuY2FsbCh0aGlzLGIsYyk7QWIuY2FsbCh0aGlzLGIsYyk7dmFyIGU9amEuY2FsbCh0aGlzLGIsYyk7ZCE9PWUmJmEuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsYyxkLGUsYil9KTtCYj9jKEhUTUxFbGVtZW50LnByb3RvdHlwZSxCYik6Q2I/YyhFbGVtZW50LnByb3RvdHlwZSxcbkNiKTpjb25zb2xlLndhcm4oXCJDdXN0b20gRWxlbWVudHM6IGBFbGVtZW50I2luc2VydEFkamFjZW50RWxlbWVudGAgd2FzIG5vdCBwYXRjaGVkLlwiKTtIYShhLEVsZW1lbnQucHJvdG90eXBlLHtaOmpkLGFwcGVuZDprZH0pO2xkKGEse2phOm1kLFdhOm5kLHJlcGxhY2VXaXRoOm9kLHJlbW92ZTpwZH0pfWZ1bmN0aW9uIGxkKGEsYil7dmFyIGM9RWxlbWVudC5wcm90b3R5cGU7ZnVuY3Rpb24gZChiKXtyZXR1cm4gZnVuY3Rpb24oYyl7Zm9yKHZhciBkPVtdLGU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7KytlKWRbZS0wXT1hcmd1bWVudHNbZV07ZT1bXTtmb3IodmFyIGY9W10sZz0wO2c8ZC5sZW5ndGg7ZysrKXt2YXIgbT1kW2ddO20gaW5zdGFuY2VvZiBFbGVtZW50JiZ0KG0pJiZmLnB1c2gobSk7aWYobSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpZm9yKG09bS5maXJzdENoaWxkO207bT1tLm5leHRTaWJsaW5nKWUucHVzaChtKTtlbHNlIGUucHVzaChtKX1iLmFwcGx5KHRoaXMsXG5kKTtmb3IoZD0wO2Q8Zi5sZW5ndGg7ZCsrKWEuYShmW2RdKTtpZih0KHRoaXMpKWZvcihkPTA7ZDxlLmxlbmd0aDtkKyspZj1lW2RdLGYgaW5zdGFuY2VvZiBFbGVtZW50JiZhLmIoZil9fXZvaWQgMCE9PWIuamEmJihjLmJlZm9yZT1kKGIuamEpKTt2b2lkIDAhPT1iLmphJiYoYy5hZnRlcj1kKGIuV2EpKTt2b2lkIDAhPT1iLnJlcGxhY2VXaXRoJiZ4KGMsXCJyZXBsYWNlV2l0aFwiLGZ1bmN0aW9uKGMpe2Zvcih2YXIgZD1bXSxlPTA7ZTxhcmd1bWVudHMubGVuZ3RoOysrZSlkW2UtMF09YXJndW1lbnRzW2VdO2U9W107Zm9yKHZhciBoPVtdLHc9MDt3PGQubGVuZ3RoO3crKyl7dmFyIGc9ZFt3XTtnIGluc3RhbmNlb2YgRWxlbWVudCYmdChnKSYmaC5wdXNoKGcpO2lmKGcgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KWZvcihnPWcuZmlyc3RDaGlsZDtnO2c9Zy5uZXh0U2libGluZyllLnB1c2goZyk7ZWxzZSBlLnB1c2goZyl9dz10KHRoaXMpO2IucmVwbGFjZVdpdGguYXBwbHkodGhpcyxcbmQpO2ZvcihkPTA7ZDxoLmxlbmd0aDtkKyspYS5hKGhbZF0pO2lmKHcpZm9yKGEuYSh0aGlzKSxkPTA7ZDxlLmxlbmd0aDtkKyspaD1lW2RdLGggaW5zdGFuY2VvZiBFbGVtZW50JiZhLmIoaCl9KTt2b2lkIDAhPT1iLnJlbW92ZSYmeChjLFwicmVtb3ZlXCIsZnVuY3Rpb24oKXt2YXIgYz10KHRoaXMpO2IucmVtb3ZlLmNhbGwodGhpcyk7YyYmYS5hKHRoaXMpfSl9ZnVuY3Rpb24gcWQoYSl7ZnVuY3Rpb24gYihiLGQpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShiLFwidGV4dENvbnRlbnRcIix7ZW51bWVyYWJsZTpkLmVudW1lcmFibGUsY29uZmlndXJhYmxlOiEwLGdldDpkLmdldCxzZXQ6ZnVuY3Rpb24oYil7aWYodGhpcy5ub2RlVHlwZT09PU5vZGUuVEVYVF9OT0RFKWQuc2V0LmNhbGwodGhpcyxiKTtlbHNle3ZhciBjPXZvaWQgMDtpZih0aGlzLmZpcnN0Q2hpbGQpe3ZhciBlPXRoaXMuY2hpbGROb2RlcyxoPWUubGVuZ3RoO2lmKDA8aCYmdCh0aGlzKSl7Yz1BcnJheShoKTtmb3IodmFyIHc9XG4wO3c8aDt3KyspY1t3XT1lW3ddfX1kLnNldC5jYWxsKHRoaXMsYik7aWYoYylmb3IoYj0wO2I8Yy5sZW5ndGg7YisrKWEuYShjW2JdKX19fSl9eChOb2RlLnByb3RvdHlwZSxcImluc2VydEJlZm9yZVwiLGZ1bmN0aW9uKGIsZCl7aWYoYiBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpe3ZhciBjPUFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShiLmNoaWxkTm9kZXMpO2I9RGIuY2FsbCh0aGlzLGIsZCk7aWYodCh0aGlzKSlmb3IoZD0wO2Q8Yy5sZW5ndGg7ZCsrKWEuYihjW2RdKTtyZXR1cm4gYn1jPXQoYik7ZD1EYi5jYWxsKHRoaXMsYixkKTtjJiZhLmEoYik7dCh0aGlzKSYmYS5iKGIpO3JldHVybiBkfSk7eChOb2RlLnByb3RvdHlwZSxcImFwcGVuZENoaWxkXCIsZnVuY3Rpb24oYil7aWYoYiBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpe3ZhciBjPUFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShiLmNoaWxkTm9kZXMpO2I9aWEuY2FsbCh0aGlzLGIpO2lmKHQodGhpcykpZm9yKHZhciBlPVxuMDtlPGMubGVuZ3RoO2UrKylhLmIoY1tlXSk7cmV0dXJuIGJ9Yz10KGIpO2U9aWEuY2FsbCh0aGlzLGIpO2MmJmEuYShiKTt0KHRoaXMpJiZhLmIoYik7cmV0dXJuIGV9KTt4KE5vZGUucHJvdG90eXBlLFwiY2xvbmVOb2RlXCIsZnVuY3Rpb24oYil7Yj13Yi5jYWxsKHRoaXMsYik7dGhpcy5vd25lckRvY3VtZW50Ll9fQ0VfaGFzUmVnaXN0cnk/YS5mKGIpOmEubChiKTtyZXR1cm4gYn0pO3goTm9kZS5wcm90b3R5cGUsXCJyZW1vdmVDaGlsZFwiLGZ1bmN0aW9uKGIpe3ZhciBjPXQoYiksZT1GYS5jYWxsKHRoaXMsYik7YyYmYS5hKGIpO3JldHVybiBlfSk7eChOb2RlLnByb3RvdHlwZSxcInJlcGxhY2VDaGlsZFwiLGZ1bmN0aW9uKGIsZCl7aWYoYiBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpe3ZhciBjPUFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShiLmNoaWxkTm9kZXMpO2I9RWIuY2FsbCh0aGlzLGIsZCk7aWYodCh0aGlzKSlmb3IoYS5hKGQpLGQ9MDtkPGMubGVuZ3RoO2QrKylhLmIoY1tkXSk7XG5yZXR1cm4gYn1jPXQoYik7dmFyIGY9RWIuY2FsbCh0aGlzLGIsZCksaz10KHRoaXMpO2smJmEuYShkKTtjJiZhLmEoYik7ayYmYS5iKGIpO3JldHVybiBmfSk7SWEmJklhLmdldD9iKE5vZGUucHJvdG90eXBlLElhKTphLnMoZnVuY3Rpb24oYSl7YihhLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtmb3IodmFyIGE9W10sYj0wO2I8dGhpcy5jaGlsZE5vZGVzLmxlbmd0aDtiKyspYS5wdXNoKHRoaXMuY2hpbGROb2Rlc1tiXS50ZXh0Q29udGVudCk7cmV0dXJuIGEuam9pbihcIlwiKX0sc2V0OmZ1bmN0aW9uKGEpe2Zvcig7dGhpcy5maXJzdENoaWxkOylGYS5jYWxsKHRoaXMsdGhpcy5maXJzdENoaWxkKTtpYS5jYWxsKHRoaXMsZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYSkpfX0pfSl9ZnVuY3Rpb24gcmQoYSl7eChEb2N1bWVudC5wcm90b3R5cGUsXCJjcmVhdGVFbGVtZW50XCIsZnVuY3Rpb24oYil7aWYodGhpcy5fX0NFX2hhc1JlZ2lzdHJ5KXt2YXIgYz1cbmEuYyhiKTtpZihjKXJldHVybiBuZXcgYy5jb25zdHJ1Y3Rvcn1iPUVhLmNhbGwodGhpcyxiKTthLmcoYik7cmV0dXJuIGJ9KTt4KERvY3VtZW50LnByb3RvdHlwZSxcImltcG9ydE5vZGVcIixmdW5jdGlvbihiLGMpe2I9c2QuY2FsbCh0aGlzLGIsYyk7dGhpcy5fX0NFX2hhc1JlZ2lzdHJ5P2EuZihiKTphLmwoYik7cmV0dXJuIGJ9KTt4KERvY3VtZW50LnByb3RvdHlwZSxcImNyZWF0ZUVsZW1lbnROU1wiLGZ1bmN0aW9uKGIsYyl7aWYodGhpcy5fX0NFX2hhc1JlZ2lzdHJ5JiYobnVsbD09PWJ8fFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPT09Yikpe3ZhciBkPWEuYyhjKTtpZihkKXJldHVybiBuZXcgZC5jb25zdHJ1Y3Rvcn1iPXRkLmNhbGwodGhpcyxiLGMpO2EuZyhiKTtyZXR1cm4gYn0pO0hhKGEsRG9jdW1lbnQucHJvdG90eXBlLHtaOnVkLGFwcGVuZDp2ZH0pfWZ1bmN0aW9uIEhhKGEsYixjKXtmdW5jdGlvbiBkKGIpe3JldHVybiBmdW5jdGlvbihjKXtmb3IodmFyIGQ9W10sXG5lPTA7ZTxhcmd1bWVudHMubGVuZ3RoOysrZSlkW2UtMF09YXJndW1lbnRzW2VdO2U9W107Zm9yKHZhciBmPVtdLGc9MDtnPGQubGVuZ3RoO2crKyl7dmFyIG09ZFtnXTttIGluc3RhbmNlb2YgRWxlbWVudCYmdChtKSYmZi5wdXNoKG0pO2lmKG0gaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KWZvcihtPW0uZmlyc3RDaGlsZDttO209bS5uZXh0U2libGluZyllLnB1c2gobSk7ZWxzZSBlLnB1c2gobSl9Yi5hcHBseSh0aGlzLGQpO2ZvcihkPTA7ZDxmLmxlbmd0aDtkKyspYS5hKGZbZF0pO2lmKHQodGhpcykpZm9yKGQ9MDtkPGUubGVuZ3RoO2QrKylmPWVbZF0sZiBpbnN0YW5jZW9mIEVsZW1lbnQmJmEuYihmKX19dm9pZCAwIT09Yy5aJiYoYi5wcmVwZW5kPWQoYy5aKSk7dm9pZCAwIT09Yy5hcHBlbmQmJihiLmFwcGVuZD1kKGMuYXBwZW5kKSl9ZnVuY3Rpb24gd2QoYSl7d2luZG93LkhUTUxFbGVtZW50PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYigpe3ZhciBiPXRoaXMuY29uc3RydWN0b3IsXG5kPWEudyhiKTtpZighZCl0aHJvdyBFcnJvcihcIlRoZSBjdXN0b20gZWxlbWVudCBiZWluZyBjb25zdHJ1Y3RlZCB3YXMgbm90IHJlZ2lzdGVyZWQgd2l0aCBgY3VzdG9tRWxlbWVudHNgLlwiKTt2YXIgZT1kLmNvbnN0cnVjdGlvblN0YWNrO2lmKDA9PT1lLmxlbmd0aClyZXR1cm4gZT1FYS5jYWxsKGRvY3VtZW50LGQubG9jYWxOYW1lKSxPYmplY3Quc2V0UHJvdG90eXBlT2YoZSxiLnByb3RvdHlwZSksZS5fX0NFX3N0YXRlPTEsZS5fX0NFX2RlZmluaXRpb249ZCxhLmcoZSksZTtkPWUubGVuZ3RoLTE7dmFyIGY9ZVtkXTtpZihmPT09RmIpdGhyb3cgRXJyb3IoXCJUaGUgSFRNTEVsZW1lbnQgY29uc3RydWN0b3Igd2FzIGVpdGhlciBjYWxsZWQgcmVlbnRyYW50bHkgZm9yIHRoaXMgY29uc3RydWN0b3Igb3IgY2FsbGVkIG11bHRpcGxlIHRpbWVzLlwiKTtlW2RdPUZiO09iamVjdC5zZXRQcm90b3R5cGVPZihmLGIucHJvdG90eXBlKTthLmcoZik7cmV0dXJuIGZ9Yi5wcm90b3R5cGU9eGQucHJvdG90eXBlO1xucmV0dXJuIGJ9KCl9ZnVuY3Rpb24geShhKXt0aGlzLmM9ITE7dGhpcy5hPWE7dGhpcy5oPW5ldyBNYXA7dGhpcy5mPWZ1bmN0aW9uKGEpe3JldHVybiBhKCl9O3RoaXMuYj0hMTt0aGlzLmc9W107dGhpcy5pPW5ldyBKYShhLGRvY3VtZW50KX1mdW5jdGlvbiBHYigpe3ZhciBhPXRoaXM7dGhpcy5iPXRoaXMuYT12b2lkIDA7dGhpcy5mPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGIpe2EuYj1iO2EuYSYmYihhLmEpfSl9ZnVuY3Rpb24gSmEoYSxiKXt0aGlzLmI9YTt0aGlzLmE9Yjt0aGlzLk09dm9pZCAwO3RoaXMuYi5mKHRoaXMuYSk7XCJsb2FkaW5nXCI9PT10aGlzLmEucmVhZHlTdGF0ZSYmKHRoaXMuTT1uZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLmYuYmluZCh0aGlzKSksdGhpcy5NLm9ic2VydmUodGhpcy5hLHtjaGlsZExpc3Q6ITAsc3VidHJlZTohMH0pKX1mdW5jdGlvbiBCKCl7dGhpcy5vPW5ldyBNYXA7dGhpcy5tPW5ldyBNYXA7dGhpcy5qPVtdO3RoaXMuaD0hMX1mdW5jdGlvbiBsKGEsXG5iLGMpe2lmKGEhPT1IYil0aHJvdyBuZXcgVHlwZUVycm9yKFwiSWxsZWdhbCBjb25zdHJ1Y3RvclwiKTthPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTthLl9fcHJvdG9fXz1sLnByb3RvdHlwZTthLkYoYixjKTtyZXR1cm4gYX1mdW5jdGlvbiBrYShhKXtpZighYS5fX3NoYWR5fHx2b2lkIDA9PT1hLl9fc2hhZHkuZmlyc3RDaGlsZCl7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307YS5fX3NoYWR5LmZpcnN0Q2hpbGQ9S2EoYSk7YS5fX3NoYWR5Lmxhc3RDaGlsZD1MYShhKTtJYihhKTtmb3IodmFyIGI9YS5fX3NoYWR5LmNoaWxkTm9kZXM9UyhhKSxjPTAsZDtjPGIubGVuZ3RoJiYoZD1iW2NdKTtjKyspZC5fX3NoYWR5PWQuX19zaGFkeXx8e30sZC5fX3NoYWR5LnBhcmVudE5vZGU9YSxkLl9fc2hhZHkubmV4dFNpYmxpbmc9YltjKzFdfHxudWxsLGQuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc9YltjLTFdfHxudWxsLEpiKGQpfX1mdW5jdGlvbiB5ZChhKXt2YXIgYj1hJiZhLk07XG5iJiYoYi5YLmRlbGV0ZShhLlJhKSxiLlguc2l6ZXx8KGEuU2EuX19zaGFkeS5UPW51bGwpKX1mdW5jdGlvbiB6ZChhLGIpe2EuX19zaGFkeT1hLl9fc2hhZHl8fHt9O2EuX19zaGFkeS5UfHwoYS5fX3NoYWR5LlQ9bmV3IGxhKTthLl9fc2hhZHkuVC5YLmFkZChiKTt2YXIgYz1hLl9fc2hhZHkuVDtyZXR1cm57UmE6YixNOmMsU2E6YSx0YWtlUmVjb3JkczpmdW5jdGlvbigpe3JldHVybiBjLnRha2VSZWNvcmRzKCl9fX1mdW5jdGlvbiBsYSgpe3RoaXMuYT0hMTt0aGlzLmFkZGVkTm9kZXM9W107dGhpcy5yZW1vdmVkTm9kZXM9W107dGhpcy5YPW5ldyBTZXR9ZnVuY3Rpb24gVChhKXtyZXR1cm4gYS5fX3NoYWR5JiZ2b2lkIDAhPT1hLl9fc2hhZHkuZmlyc3RDaGlsZH1mdW5jdGlvbiBHKGEpe3JldHVyblwiU2hhZHlSb290XCI9PT1hLk1hfWZ1bmN0aW9uIFooYSl7YT1hLmdldFJvb3ROb2RlKCk7aWYoRyhhKSlyZXR1cm4gYX1mdW5jdGlvbiBNYShhLGIpe2lmKGEmJmIpZm9yKHZhciBjPVxuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYiksZD0wLGU7ZDxjLmxlbmd0aCYmKGU9Y1tkXSk7ZCsrKXt2YXIgZj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGIsZSk7ZiYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsZSxmKX19ZnVuY3Rpb24gTmEoYSxiKXtmb3IodmFyIGM9W10sZD0xO2Q8YXJndW1lbnRzLmxlbmd0aDsrK2QpY1tkLTFdPWFyZ3VtZW50c1tkXTtmb3IoZD0wO2Q8Yy5sZW5ndGg7ZCsrKU1hKGEsY1tkXSk7cmV0dXJuIGF9ZnVuY3Rpb24gQWQoYSxiKXtmb3IodmFyIGMgaW4gYilhW2NdPWJbY119ZnVuY3Rpb24gS2IoYSl7T2EucHVzaChhKTtQYS50ZXh0Q29udGVudD1MYisrfWZ1bmN0aW9uIE1iKGEsYil7Zm9yKDtiOyl7aWYoYj09YSlyZXR1cm4hMDtiPWIucGFyZW50Tm9kZX1yZXR1cm4hMX1mdW5jdGlvbiBOYihhKXtRYXx8KFFhPSEwLEtiKG1hKSk7YWEucHVzaChhKX1mdW5jdGlvbiBtYSgpe1FhPSExO2Zvcih2YXIgYT0hIWFhLmxlbmd0aDthYS5sZW5ndGg7KWFhLnNoaWZ0KCkoKTtcbnJldHVybiBhfWZ1bmN0aW9uIEJkKGEsYil7dmFyIGM9Yi5nZXRSb290Tm9kZSgpO3JldHVybiBhLm1hcChmdW5jdGlvbihhKXt2YXIgYj1jPT09YS50YXJnZXQuZ2V0Um9vdE5vZGUoKTtpZihiJiZhLmFkZGVkTm9kZXMpe2lmKGI9QXJyYXkuZnJvbShhLmFkZGVkTm9kZXMpLmZpbHRlcihmdW5jdGlvbihhKXtyZXR1cm4gYz09PWEuZ2V0Um9vdE5vZGUoKX0pLGIubGVuZ3RoKXJldHVybiBhPU9iamVjdC5jcmVhdGUoYSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsXCJhZGRlZE5vZGVzXCIse3ZhbHVlOmIsY29uZmlndXJhYmxlOiEwfSksYX1lbHNlIGlmKGIpcmV0dXJuIGF9KS5maWx0ZXIoZnVuY3Rpb24oYSl7cmV0dXJuIGF9KX1mdW5jdGlvbiBPYihhKXtzd2l0Y2goYSl7Y2FzZSBcIiZcIjpyZXR1cm5cIiZhbXA7XCI7Y2FzZSBcIjxcIjpyZXR1cm5cIiZsdDtcIjtjYXNlIFwiPlwiOnJldHVyblwiJmd0O1wiO2Nhc2UgJ1wiJzpyZXR1cm5cIiZxdW90O1wiO2Nhc2UgXCJcXHUwMGEwXCI6cmV0dXJuXCImbmJzcDtcIn19XG5mdW5jdGlvbiBQYihhKXtmb3IodmFyIGI9e30sYz0wO2M8YS5sZW5ndGg7YysrKWJbYVtjXV09ITA7cmV0dXJuIGJ9ZnVuY3Rpb24gUmEoYSxiKXtcInRlbXBsYXRlXCI9PT1hLmxvY2FsTmFtZSYmKGE9YS5jb250ZW50KTtmb3IodmFyIGM9XCJcIixkPWI/YihhKTphLmNoaWxkTm9kZXMsZT0wLGY9ZC5sZW5ndGgsaztlPGYmJihrPWRbZV0pO2UrKyl7YTp7dmFyIGg9azt2YXIgdz1hO3ZhciBnPWI7c3dpdGNoKGgubm9kZVR5cGUpe2Nhc2UgTm9kZS5FTEVNRU5UX05PREU6Zm9yKHZhciBtPWgubG9jYWxOYW1lLGw9XCI8XCIrbSxxPWguYXR0cmlidXRlcyxuPTA7dz1xW25dO24rKylsKz1cIiBcIit3Lm5hbWUrJz1cIicrdy52YWx1ZS5yZXBsYWNlKENkLE9iKSsnXCInO2wrPVwiPlwiO2g9RGRbbV0/bDpsK1JhKGgsZykrXCI8L1wiK20rXCI+XCI7YnJlYWsgYTtjYXNlIE5vZGUuVEVYVF9OT0RFOmg9aC5kYXRhO2g9dyYmRWRbdy5sb2NhbE5hbWVdP2g6aC5yZXBsYWNlKEZkLE9iKTticmVhayBhO2Nhc2UgTm9kZS5DT01NRU5UX05PREU6aD1cblwiXFx4M2MhLS1cIitoLmRhdGErXCItLVxceDNlXCI7YnJlYWsgYTtkZWZhdWx0OnRocm93IHdpbmRvdy5jb25zb2xlLmVycm9yKGgpLEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO319Yys9aH1yZXR1cm4gY31mdW5jdGlvbiBVKGEpe0MuY3VycmVudE5vZGU9YTtyZXR1cm4gQy5wYXJlbnROb2RlKCl9ZnVuY3Rpb24gS2EoYSl7Qy5jdXJyZW50Tm9kZT1hO3JldHVybiBDLmZpcnN0Q2hpbGQoKX1mdW5jdGlvbiBMYShhKXtDLmN1cnJlbnROb2RlPWE7cmV0dXJuIEMubGFzdENoaWxkKCl9ZnVuY3Rpb24gUWIoYSl7Qy5jdXJyZW50Tm9kZT1hO3JldHVybiBDLnByZXZpb3VzU2libGluZygpfWZ1bmN0aW9uIFJiKGEpe0MuY3VycmVudE5vZGU9YTtyZXR1cm4gQy5uZXh0U2libGluZygpfWZ1bmN0aW9uIFMoYSl7dmFyIGI9W107Qy5jdXJyZW50Tm9kZT1hO2ZvcihhPUMuZmlyc3RDaGlsZCgpO2E7KWIucHVzaChhKSxhPUMubmV4dFNpYmxpbmcoKTtyZXR1cm4gYn1mdW5jdGlvbiBTYihhKXtELmN1cnJlbnROb2RlPVxuYTtyZXR1cm4gRC5wYXJlbnROb2RlKCl9ZnVuY3Rpb24gVGIoYSl7RC5jdXJyZW50Tm9kZT1hO3JldHVybiBELmZpcnN0Q2hpbGQoKX1mdW5jdGlvbiBVYihhKXtELmN1cnJlbnROb2RlPWE7cmV0dXJuIEQubGFzdENoaWxkKCl9ZnVuY3Rpb24gVmIoYSl7RC5jdXJyZW50Tm9kZT1hO3JldHVybiBELnByZXZpb3VzU2libGluZygpfWZ1bmN0aW9uIFdiKGEpe0QuY3VycmVudE5vZGU9YTtyZXR1cm4gRC5uZXh0U2libGluZygpfWZ1bmN0aW9uIFhiKGEpe3ZhciBiPVtdO0QuY3VycmVudE5vZGU9YTtmb3IoYT1ELmZpcnN0Q2hpbGQoKTthOyliLnB1c2goYSksYT1ELm5leHRTaWJsaW5nKCk7cmV0dXJuIGJ9ZnVuY3Rpb24gWWIoYSl7cmV0dXJuIFJhKGEsZnVuY3Rpb24oYSl7cmV0dXJuIFMoYSl9KX1mdW5jdGlvbiBaYihhKXtzd2l0Y2goYS5ub2RlVHlwZSl7Y2FzZSBOb2RlLkVMRU1FTlRfTk9ERTpjYXNlIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERTphPWRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoYSxcbk5vZGVGaWx0ZXIuU0hPV19URVhULG51bGwsITEpO2Zvcih2YXIgYj1cIlwiLGM7Yz1hLm5leHROb2RlKCk7KWIrPWMubm9kZVZhbHVlO3JldHVybiBiO2RlZmF1bHQ6cmV0dXJuIGEubm9kZVZhbHVlfX1mdW5jdGlvbiBLKGEsYixjKXtmb3IodmFyIGQgaW4gYil7dmFyIGU9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhLGQpO2UmJmUuY29uZmlndXJhYmxlfHwhZSYmYz9PYmplY3QuZGVmaW5lUHJvcGVydHkoYSxkLGJbZF0pOmMmJmNvbnNvbGUud2FybihcIkNvdWxkIG5vdCBkZWZpbmVcIixkLFwib25cIixhKX19ZnVuY3Rpb24gUChhKXtLKGEsJGIpO0soYSxTYSk7SyhhLFRhKX1mdW5jdGlvbiBhYyhhLGIsYyl7SmIoYSk7Yz1jfHxudWxsO2EuX19zaGFkeT1hLl9fc2hhZHl8fHt9O2IuX19zaGFkeT1iLl9fc2hhZHl8fHt9O2MmJihjLl9fc2hhZHk9Yy5fX3NoYWR5fHx7fSk7YS5fX3NoYWR5LnByZXZpb3VzU2libGluZz1jP2MuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc6Yi5sYXN0Q2hpbGQ7XG52YXIgZD1hLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nO2QmJmQuX19zaGFkeSYmKGQuX19zaGFkeS5uZXh0U2libGluZz1hKTsoZD1hLl9fc2hhZHkubmV4dFNpYmxpbmc9YykmJmQuX19zaGFkeSYmKGQuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc9YSk7YS5fX3NoYWR5LnBhcmVudE5vZGU9YjtjP2M9PT1iLl9fc2hhZHkuZmlyc3RDaGlsZCYmKGIuX19zaGFkeS5maXJzdENoaWxkPWEpOihiLl9fc2hhZHkubGFzdENoaWxkPWEsYi5fX3NoYWR5LmZpcnN0Q2hpbGR8fChiLl9fc2hhZHkuZmlyc3RDaGlsZD1hKSk7Yi5fX3NoYWR5LmNoaWxkTm9kZXM9bnVsbH1mdW5jdGlvbiBVYShhLGIsYyl7aWYoYj09PWEpdGhyb3cgRXJyb3IoXCJGYWlsZWQgdG8gZXhlY3V0ZSAnYXBwZW5kQ2hpbGQnIG9uICdOb2RlJzogVGhlIG5ldyBjaGlsZCBlbGVtZW50IGNvbnRhaW5zIHRoZSBwYXJlbnQuXCIpO2lmKGMpe3ZhciBkPWMuX19zaGFkeSYmYy5fX3NoYWR5LnBhcmVudE5vZGU7aWYodm9pZCAwIT09ZCYmXG5kIT09YXx8dm9pZCAwPT09ZCYmVShjKSE9PWEpdGhyb3cgRXJyb3IoXCJGYWlsZWQgdG8gZXhlY3V0ZSAnaW5zZXJ0QmVmb3JlJyBvbiAnTm9kZSc6IFRoZSBub2RlIGJlZm9yZSB3aGljaCB0aGUgbmV3IG5vZGUgaXMgdG8gYmUgaW5zZXJ0ZWQgaXMgbm90IGEgY2hpbGQgb2YgdGhpcyBub2RlLlwiKTt9aWYoYz09PWIpcmV0dXJuIGI7Yi5wYXJlbnROb2RlJiZWYShiLnBhcmVudE5vZGUsYik7ZD1aKGEpO3ZhciBlO2lmKGU9ZClhOntpZighYi5fX25vSW5zZXJ0aW9uUG9pbnQpe3ZhciBmO1wic2xvdFwiPT09Yi5sb2NhbE5hbWU/Zj1bYl06Yi5xdWVyeVNlbGVjdG9yQWxsJiYoZj1iLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzbG90XCIpKTtpZihmJiZmLmxlbmd0aCl7ZT1mO2JyZWFrIGF9fWU9dm9pZCAwfShmPWUpJiZkLlFhKGYpO2QmJihcInNsb3RcIj09PWEubG9jYWxOYW1lfHxmKSYmZC5MKCk7aWYoVChhKSl7ZD1jO0liKGEpO2EuX19zaGFkeT1hLl9fc2hhZHl8fHt9O3ZvaWQgMCE9PWEuX19zaGFkeS5maXJzdENoaWxkJiZcbihhLl9fc2hhZHkuY2hpbGROb2Rlcz1udWxsKTtpZihiLm5vZGVUeXBlPT09Tm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKXtmPWIuY2hpbGROb2Rlcztmb3IoZT0wO2U8Zi5sZW5ndGg7ZSsrKWFjKGZbZV0sYSxkKTtiLl9fc2hhZHk9Yi5fX3NoYWR5fHx7fTtkPXZvaWQgMCE9PWIuX19zaGFkeS5maXJzdENoaWxkP251bGw6dm9pZCAwO2IuX19zaGFkeS5maXJzdENoaWxkPWIuX19zaGFkeS5sYXN0Q2hpbGQ9ZDtiLl9fc2hhZHkuY2hpbGROb2Rlcz1kfWVsc2UgYWMoYixhLGQpO2lmKFdhKGEpKXthLl9fc2hhZHkucm9vdC5MKCk7dmFyIGs9ITB9ZWxzZSBhLl9fc2hhZHkucm9vdCYmKGs9ITApfWt8fChrPUcoYSk/YS5ob3N0OmEsYz8oYz1iYyhjKSxYYS5jYWxsKGssYixjKSk6Y2MuY2FsbChrLGIpKTtkYyhhLGIpO3JldHVybiBifWZ1bmN0aW9uIFZhKGEsYil7aWYoYi5wYXJlbnROb2RlIT09YSl0aHJvdyBFcnJvcihcIlRoZSBub2RlIHRvIGJlIHJlbW92ZWQgaXMgbm90IGEgY2hpbGQgb2YgdGhpcyBub2RlOiBcIitcbmIpO3ZhciBjPVooYik7aWYoVChhKSl7Yi5fX3NoYWR5PWIuX19zaGFkeXx8e307YS5fX3NoYWR5PWEuX19zaGFkeXx8e307Yj09PWEuX19zaGFkeS5maXJzdENoaWxkJiYoYS5fX3NoYWR5LmZpcnN0Q2hpbGQ9Yi5fX3NoYWR5Lm5leHRTaWJsaW5nKTtiPT09YS5fX3NoYWR5Lmxhc3RDaGlsZCYmKGEuX19zaGFkeS5sYXN0Q2hpbGQ9Yi5fX3NoYWR5LnByZXZpb3VzU2libGluZyk7dmFyIGQ9Yi5fX3NoYWR5LnByZXZpb3VzU2libGluZzt2YXIgZT1iLl9fc2hhZHkubmV4dFNpYmxpbmc7ZCYmKGQuX19zaGFkeT1kLl9fc2hhZHl8fHt9LGQuX19zaGFkeS5uZXh0U2libGluZz1lKTtlJiYoZS5fX3NoYWR5PWUuX19zaGFkeXx8e30sZS5fX3NoYWR5LnByZXZpb3VzU2libGluZz1kKTtiLl9fc2hhZHkucGFyZW50Tm9kZT1iLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nPWIuX19zaGFkeS5uZXh0U2libGluZz12b2lkIDA7dm9pZCAwIT09YS5fX3NoYWR5LmNoaWxkTm9kZXMmJihhLl9fc2hhZHkuY2hpbGROb2Rlcz1cbm51bGwpO2lmKFdhKGEpKXthLl9fc2hhZHkucm9vdC5MKCk7dmFyIGY9ITB9fWVjKGIpO2MmJigoZT1hJiZcInNsb3RcIj09PWEubG9jYWxOYW1lKSYmKGY9ITApLCgoZD1jLlRhKGIpKXx8ZSkmJmMuTCgpKTtmfHwoZj1HKGEpP2EuaG9zdDphLCghYS5fX3NoYWR5LnJvb3QmJlwic2xvdFwiIT09Yi5sb2NhbE5hbWV8fGY9PT1VKGIpKSYmYmEuY2FsbChmLGIpKTtkYyhhLG51bGwsYik7cmV0dXJuIGJ9ZnVuY3Rpb24gZWMoYSl7aWYoYS5fX3NoYWR5JiZ2b2lkIDAhPT1hLl9fc2hhZHkubWEpZm9yKHZhciBiPWEuY2hpbGROb2RlcyxjPTAsZD1iLmxlbmd0aCxlO2M8ZCYmKGU9YltjXSk7YysrKWVjKGUpO2EuX19zaGFkeSYmKGEuX19zaGFkeS5tYT12b2lkIDApfWZ1bmN0aW9uIGJjKGEpe3ZhciBiPWE7YSYmXCJzbG90XCI9PT1hLmxvY2FsTmFtZSYmKGI9KGI9YS5fX3NoYWR5JiZhLl9fc2hhZHkuUikmJmIubGVuZ3RoP2JbMF06YmMoYS5uZXh0U2libGluZykpO3JldHVybiBifWZ1bmN0aW9uIFdhKGEpe3JldHVybihhPVxuYSYmYS5fX3NoYWR5JiZhLl9fc2hhZHkucm9vdCkmJmEudGEoKX1mdW5jdGlvbiBmYyhhLGIpe1wic2xvdFwiPT09Yj8oYT1hLnBhcmVudE5vZGUsV2EoYSkmJmEuX19zaGFkeS5yb290LkwoKSk6XCJzbG90XCI9PT1hLmxvY2FsTmFtZSYmXCJuYW1lXCI9PT1iJiYoYj1aKGEpKSYmKGIuVmEoYSksYi5MKCkpfWZ1bmN0aW9uIGRjKGEsYixjKXtpZihhPWEuX19zaGFkeSYmYS5fX3NoYWR5LlQpYiYmYS5hZGRlZE5vZGVzLnB1c2goYiksYyYmYS5yZW1vdmVkTm9kZXMucHVzaChjKSxhLmhiKCl9ZnVuY3Rpb24gZ2MoYSl7aWYoYSYmYS5ub2RlVHlwZSl7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307dmFyIGI9YS5fX3NoYWR5Lm1hO3ZvaWQgMD09PWImJihHKGEpP2I9YTpiPShiPWEucGFyZW50Tm9kZSk/Z2MoYik6YSxjYS5jYWxsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxhKSYmKGEuX19zaGFkeS5tYT1iKSk7cmV0dXJuIGJ9fWZ1bmN0aW9uIG5hKGEsYixjKXt2YXIgZD1bXTtoYyhhLmNoaWxkTm9kZXMsXG5iLGMsZCk7cmV0dXJuIGR9ZnVuY3Rpb24gaGMoYSxiLGMsZCl7Zm9yKHZhciBlPTAsZj1hLmxlbmd0aCxrO2U8ZiYmKGs9YVtlXSk7ZSsrKXt2YXIgaDtpZihoPWsubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSl7aD1rO3ZhciB3PWIsZz1jLG09ZCxsPXcoaCk7bCYmbS5wdXNoKGgpO2cmJmcobCk/aD1sOihoYyhoLmNoaWxkTm9kZXMsdyxnLG0pLGg9dm9pZCAwKX1pZihoKWJyZWFrfX1mdW5jdGlvbiBpYyhhKXthPWEuZ2V0Um9vdE5vZGUoKTtHKGEpJiZhLnZhKCl9ZnVuY3Rpb24gamMoYSxiLGMpe29hfHwob2E9d2luZG93LlNoYWR5Q1NTJiZ3aW5kb3cuU2hhZHlDU1MuU2NvcGluZ1NoaW0pO29hJiZcImNsYXNzXCI9PT1iP29hLnNldEVsZW1lbnRDbGFzcyhhLGMpOihrYy5jYWxsKGEsYixjKSxmYyhhLGIpKX1mdW5jdGlvbiBsYyhhLGIpe2lmKGEub3duZXJEb2N1bWVudCE9PWRvY3VtZW50KXJldHVybiBZYS5jYWxsKGRvY3VtZW50LGEsYik7dmFyIGM9WWEuY2FsbChkb2N1bWVudCxcbmEsITEpO2lmKGIpe2E9YS5jaGlsZE5vZGVzO2I9MDtmb3IodmFyIGQ7YjxhLmxlbmd0aDtiKyspZD1sYyhhW2JdLCEwKSxjLmFwcGVuZENoaWxkKGQpfXJldHVybiBjfWZ1bmN0aW9uIFphKGEsYil7dmFyIGM9W10sZD1hO2ZvcihhPWE9PT13aW5kb3c/d2luZG93OmEuZ2V0Um9vdE5vZGUoKTtkOyljLnB1c2goZCksZD1kLmFzc2lnbmVkU2xvdD9kLmFzc2lnbmVkU2xvdDpkLm5vZGVUeXBlPT09Tm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFJiZkLmhvc3QmJihifHxkIT09YSk/ZC5ob3N0OmQucGFyZW50Tm9kZTtjW2MubGVuZ3RoLTFdPT09ZG9jdW1lbnQmJmMucHVzaCh3aW5kb3cpO3JldHVybiBjfWZ1bmN0aW9uIG1jKGEsYil7aWYoIUcpcmV0dXJuIGE7YT1aYShhLCEwKTtmb3IodmFyIGM9MCxkLGUsZixrO2M8Yi5sZW5ndGg7YysrKWlmKGQ9YltjXSxmPWQ9PT13aW5kb3c/d2luZG93OmQuZ2V0Um9vdE5vZGUoKSxmIT09ZSYmKGs9YS5pbmRleE9mKGYpLGU9ZiksIUcoZil8fFxuLTE8aylyZXR1cm4gZH1mdW5jdGlvbiAkYShhKXtmdW5jdGlvbiBiKGIsZCl7Yj1uZXcgYShiLGQpO2IuZWE9ZCYmISFkLmNvbXBvc2VkO3JldHVybiBifUFkKGIsYSk7Yi5wcm90b3R5cGU9YS5wcm90b3R5cGU7cmV0dXJuIGJ9ZnVuY3Rpb24gbmMoYSxiLGMpe2lmKGM9Yi5fX2hhbmRsZXJzJiZiLl9faGFuZGxlcnNbYS50eXBlXSYmYi5fX2hhbmRsZXJzW2EudHlwZV1bY10pZm9yKHZhciBkPTAsZTsoZT1jW2RdKSYmYS50YXJnZXQhPT1hLnJlbGF0ZWRUYXJnZXQmJihlLmNhbGwoYixhKSwhYS5LYSk7ZCsrKTt9ZnVuY3Rpb24gR2QoYSl7dmFyIGI9YS5jb21wb3NlZFBhdGgoKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcImN1cnJlbnRUYXJnZXRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGR9LGNvbmZpZ3VyYWJsZTohMH0pO2Zvcih2YXIgYz1iLmxlbmd0aC0xOzA8PWM7Yy0tKXt2YXIgZD1iW2NdO25jKGEsZCxcImNhcHR1cmVcIik7aWYoYS5mYSlyZXR1cm59T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsXG5cImV2ZW50UGhhc2VcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIEV2ZW50LkFUX1RBUkdFVH19KTt2YXIgZTtmb3IoYz0wO2M8Yi5sZW5ndGg7YysrKXtkPWJbY107dmFyIGY9ZC5fX3NoYWR5JiZkLl9fc2hhZHkucm9vdDtpZigwPT09Y3x8ZiYmZj09PWUpaWYobmMoYSxkLFwiYnViYmxlXCIpLGQhPT13aW5kb3cmJihlPWQuZ2V0Um9vdE5vZGUoKSksYS5mYSlicmVha319ZnVuY3Rpb24gb2MoYSxiLGMsZCxlLGYpe2Zvcih2YXIgaz0wO2s8YS5sZW5ndGg7aysrKXt2YXIgaD1hW2tdLHc9aC50eXBlLGc9aC5jYXB0dXJlLG09aC5vbmNlLGw9aC5wYXNzaXZlO2lmKGI9PT1oLm5vZGUmJmM9PT13JiZkPT09ZyYmZT09PW0mJmY9PT1sKXJldHVybiBrfXJldHVybi0xfWZ1bmN0aW9uIHBjKGEsYixjKXtpZihiKXtpZihcIm9iamVjdFwiPT09dHlwZW9mIGMpe3ZhciBkPSEhYy5jYXB0dXJlO3ZhciBlPSEhYy5vbmNlO3ZhciBmPSEhYy5wYXNzaXZlfWVsc2UgZD0hIWMsZj1lPSExO3ZhciBrPWMmJmMuZ2F8fFxudGhpcyxoPWJbZGFdO2lmKGgpe2lmKC0xPG9jKGgsayxhLGQsZSxmKSlyZXR1cm59ZWxzZSBiW2RhXT1bXTtoPWZ1bmN0aW9uKGQpe2UmJnRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGIsYyk7ZC5fX3RhcmdldHx8cWMoZCk7aWYoayE9PXRoaXMpe3ZhciBmPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZCxcImN1cnJlbnRUYXJnZXRcIik7T2JqZWN0LmRlZmluZVByb3BlcnR5KGQsXCJjdXJyZW50VGFyZ2V0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiBrfSxjb25maWd1cmFibGU6ITB9KX1pZihkLmNvbXBvc2VkfHwtMTxkLmNvbXBvc2VkUGF0aCgpLmluZGV4T2YoaykpaWYoZC50YXJnZXQ9PT1kLnJlbGF0ZWRUYXJnZXQpZC5ldmVudFBoYXNlPT09RXZlbnQuQlVCQkxJTkdfUEhBU0UmJmQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7ZWxzZSBpZihkLmV2ZW50UGhhc2U9PT1FdmVudC5DQVBUVVJJTkdfUEhBU0V8fGQuYnViYmxlc3x8ZC50YXJnZXQ9PT1rKXt2YXIgaD1cblwib2JqZWN0XCI9PT10eXBlb2YgYiYmYi5oYW5kbGVFdmVudD9iLmhhbmRsZUV2ZW50KGQpOmIuY2FsbChrLGQpO2shPT10aGlzJiYoZj8oT2JqZWN0LmRlZmluZVByb3BlcnR5KGQsXCJjdXJyZW50VGFyZ2V0XCIsZiksZj1udWxsKTpkZWxldGUgZC5jdXJyZW50VGFyZ2V0KTtyZXR1cm4gaH19O2JbZGFdLnB1c2goe25vZGU6dGhpcyx0eXBlOmEsY2FwdHVyZTpkLG9uY2U6ZSxwYXNzaXZlOmYsbGI6aH0pO2FiW2FdPyh0aGlzLl9faGFuZGxlcnM9dGhpcy5fX2hhbmRsZXJzfHx7fSx0aGlzLl9faGFuZGxlcnNbYV09dGhpcy5fX2hhbmRsZXJzW2FdfHx7Y2FwdHVyZTpbXSxidWJibGU6W119LHRoaXMuX19oYW5kbGVyc1thXVtkP1wiY2FwdHVyZVwiOlwiYnViYmxlXCJdLnB1c2goaCkpOih0aGlzIGluc3RhbmNlb2YgV2luZG93P3JjOnNjKS5jYWxsKHRoaXMsYSxoLGMpfX1mdW5jdGlvbiB0YyhhLGIsYyl7aWYoYil7aWYoXCJvYmplY3RcIj09PXR5cGVvZiBjKXt2YXIgZD0hIWMuY2FwdHVyZTt2YXIgZT1cbiEhYy5vbmNlO3ZhciBmPSEhYy5wYXNzaXZlfWVsc2UgZD0hIWMsZj1lPSExO3ZhciBrPWMmJmMuZ2F8fHRoaXMsaD12b2lkIDA7dmFyIGc9bnVsbDt0cnl7Zz1iW2RhXX1jYXRjaChyKXt9ZyYmKGU9b2MoZyxrLGEsZCxlLGYpLC0xPGUmJihoPWcuc3BsaWNlKGUsMSlbMF0ubGIsZy5sZW5ndGh8fChiW2RhXT12b2lkIDApKSk7KHRoaXMgaW5zdGFuY2VvZiBXaW5kb3c/dWM6dmMpLmNhbGwodGhpcyxhLGh8fGIsYyk7aCYmYWJbYV0mJnRoaXMuX19oYW5kbGVycyYmdGhpcy5fX2hhbmRsZXJzW2FdJiYoYT10aGlzLl9faGFuZGxlcnNbYV1bZD9cImNhcHR1cmVcIjpcImJ1YmJsZVwiXSxoPWEuaW5kZXhPZihoKSwtMTxoJiZhLnNwbGljZShoLDEpKX19ZnVuY3Rpb24gSGQoKXtmb3IodmFyIGEgaW4gYWIpd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYSxmdW5jdGlvbihhKXthLl9fdGFyZ2V0fHwocWMoYSksR2QoYSkpfSwhMCl9ZnVuY3Rpb24gcWMoYSl7YS5fX3RhcmdldD1hLnRhcmdldDthLnJhPVxuYS5yZWxhdGVkVGFyZ2V0O2lmKEUuUyl7dmFyIGI9d2MsYz1PYmplY3QuZ2V0UHJvdG90eXBlT2YoYSk7aWYoIWMuaGFzT3duUHJvcGVydHkoXCJfX3BhdGNoUHJvdG9cIikpe3ZhciBkPU9iamVjdC5jcmVhdGUoYyk7ZC5uYj1jO01hKGQsYik7Yy5fX3BhdGNoUHJvdG89ZH1hLl9fcHJvdG9fXz1jLl9fcGF0Y2hQcm90b31lbHNlIE1hKGEsd2MpfWZ1bmN0aW9uIGVhKGEsYil7cmV0dXJue2luZGV4OmEsVTpbXSxXOmJ9fWZ1bmN0aW9uIElkKGEsYixjLGQpe3ZhciBlPTAsZj0wLGs9MCxoPTAsZz1NYXRoLm1pbihiLWUsZC1mKTtpZigwPT1lJiYwPT1mKWE6e2ZvcihrPTA7azxnO2srKylpZihhW2tdIT09Y1trXSlicmVhayBhO2s9Z31pZihiPT1hLmxlbmd0aCYmZD09Yy5sZW5ndGgpe2g9YS5sZW5ndGg7Zm9yKHZhciByPWMubGVuZ3RoLG09MDttPGctayYmSmQoYVstLWhdLGNbLS1yXSk7KW0rKztoPW19ZSs9aztmKz1rO2ItPWg7ZC09aDtpZigwPT1iLWUmJjA9PWQtZilyZXR1cm5bXTtcbmlmKGU9PWIpe2ZvcihiPWVhKGUsMCk7ZjxkOyliLlUucHVzaChjW2YrK10pO3JldHVybltiXX1pZihmPT1kKXJldHVybltlYShlLGItZSldO2c9ZTtrPWY7ZD1kLWsrMTtoPWItZysxO2I9QXJyYXkoZCk7Zm9yKHI9MDtyPGQ7cisrKWJbcl09QXJyYXkoaCksYltyXVswXT1yO2ZvcihyPTA7cjxoO3IrKyliWzBdW3JdPXI7Zm9yKHI9MTtyPGQ7cisrKWZvcihtPTE7bTxoO20rKylpZihhW2crbS0xXT09PWNbaytyLTFdKWJbcl1bbV09YltyLTFdW20tMV07ZWxzZXt2YXIgbD1iW3ItMV1bbV0rMSxuPWJbcl1bbS0xXSsxO2Jbcl1bbV09bDxuP2w6bn1nPWIubGVuZ3RoLTE7az1iWzBdLmxlbmd0aC0xO2Q9YltnXVtrXTtmb3IoYT1bXTswPGd8fDA8azspMD09Zz8oYS5wdXNoKDIpLGstLSk6MD09az8oYS5wdXNoKDMpLGctLSk6KGg9YltnLTFdW2stMV0scj1iW2ctMV1ba10sbT1iW2ddW2stMV0sbD1yPG0/cjxoP3I6aDptPGg/bTpoLGw9PWg/KGg9PWQ/YS5wdXNoKDApOihhLnB1c2goMSksXG5kPWgpLGctLSxrLS0pOmw9PXI/KGEucHVzaCgzKSxnLS0sZD1yKTooYS5wdXNoKDIpLGstLSxkPW0pKTthLnJldmVyc2UoKTtiPXZvaWQgMDtnPVtdO2ZvcihrPTA7azxhLmxlbmd0aDtrKyspc3dpdGNoKGFba10pe2Nhc2UgMDpiJiYoZy5wdXNoKGIpLGI9dm9pZCAwKTtlKys7ZisrO2JyZWFrO2Nhc2UgMTpifHwoYj1lYShlLDApKTtiLlcrKztlKys7Yi5VLnB1c2goY1tmXSk7ZisrO2JyZWFrO2Nhc2UgMjpifHwoYj1lYShlLDApKTtiLlcrKztlKys7YnJlYWs7Y2FzZSAzOmJ8fChiPWVhKGUsMCkpLGIuVS5wdXNoKGNbZl0pLGYrK31iJiZnLnB1c2goYik7cmV0dXJuIGd9ZnVuY3Rpb24gSmQoYSxiKXtyZXR1cm4gYT09PWJ9ZnVuY3Rpb24geGMoYSl7dmFyIGI9W107ZG8gYi51bnNoaWZ0KGEpO3doaWxlKGE9YS5wYXJlbnROb2RlKTtyZXR1cm4gYn1mdW5jdGlvbiB5YyhhKXtpYyhhKTtyZXR1cm4gYS5fX3NoYWR5JiZhLl9fc2hhZHkuYXNzaWduZWRTbG90fHxudWxsfWZ1bmN0aW9uIEwoYSxcbmIpe2Zvcih2YXIgYz1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiKSxkPTA7ZDxjLmxlbmd0aDtkKyspe3ZhciBlPWNbZF0sZj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGIsZSk7Zi52YWx1ZT9hW2VdPWYudmFsdWU6T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsZSxmKX19ZnVuY3Rpb24gS2QoKXt2YXIgYT13aW5kb3cuY3VzdG9tRWxlbWVudHMmJndpbmRvdy5jdXN0b21FbGVtZW50cy5uYXRpdmVIVE1MRWxlbWVudHx8SFRNTEVsZW1lbnQ7TCh3aW5kb3cuTm9kZS5wcm90b3R5cGUsTGQpO0wod2luZG93LldpbmRvdy5wcm90b3R5cGUsTWQpO0wod2luZG93LlRleHQucHJvdG90eXBlLE5kKTtMKHdpbmRvdy5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZSxiYik7TCh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUsemMpO0wod2luZG93LkRvY3VtZW50LnByb3RvdHlwZSxBYyk7d2luZG93LkhUTUxTbG90RWxlbWVudCYmTCh3aW5kb3cuSFRNTFNsb3RFbGVtZW50LnByb3RvdHlwZSxcbkJjKTtMKGEucHJvdG90eXBlLE9kKTtFLlMmJihQKHdpbmRvdy5Ob2RlLnByb3RvdHlwZSksUCh3aW5kb3cuVGV4dC5wcm90b3R5cGUpLFAod2luZG93LkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlKSxQKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSksUChhLnByb3RvdHlwZSksUCh3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlKSx3aW5kb3cuSFRNTFNsb3RFbGVtZW50JiZQKHdpbmRvdy5IVE1MU2xvdEVsZW1lbnQucHJvdG90eXBlKSl9ZnVuY3Rpb24gQ2MoYSl7dmFyIGI9UGQuaGFzKGEpO2E9L15bYS16XVsuMC05X2Etel0qLVtcXC0uMC05X2Etel0qJC8udGVzdChhKTtyZXR1cm4hYiYmYX1mdW5jdGlvbiB0KGEpe3ZhciBiPWEuaXNDb25uZWN0ZWQ7aWYodm9pZCAwIT09YilyZXR1cm4gYjtmb3IoO2EmJiEoYS5fX0NFX2lzSW1wb3J0RG9jdW1lbnR8fGEgaW5zdGFuY2VvZiBEb2N1bWVudCk7KWE9YS5wYXJlbnROb2RlfHwod2luZG93LlNoYWRvd1Jvb3QmJmEgaW5zdGFuY2VvZiBTaGFkb3dSb290P1xuYS5ob3N0OnZvaWQgMCk7cmV0dXJuISghYXx8IShhLl9fQ0VfaXNJbXBvcnREb2N1bWVudHx8YSBpbnN0YW5jZW9mIERvY3VtZW50KSl9ZnVuY3Rpb24gY2IoYSxiKXtmb3IoO2ImJmIhPT1hJiYhYi5uZXh0U2libGluZzspYj1iLnBhcmVudE5vZGU7cmV0dXJuIGImJmIhPT1hP2IubmV4dFNpYmxpbmc6bnVsbH1mdW5jdGlvbiBPKGEsYixjKXtjPWM/YzpuZXcgU2V0O2Zvcih2YXIgZD1hO2Q7KXtpZihkLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUpe3ZhciBlPWQ7YihlKTt2YXIgZj1lLmxvY2FsTmFtZTtpZihcImxpbmtcIj09PWYmJlwiaW1wb3J0XCI9PT1lLmdldEF0dHJpYnV0ZShcInJlbFwiKSl7ZD1lLmltcG9ydDtpZihkIGluc3RhbmNlb2YgTm9kZSYmIWMuaGFzKGQpKWZvcihjLmFkZChkKSxkPWQuZmlyc3RDaGlsZDtkO2Q9ZC5uZXh0U2libGluZylPKGQsYixjKTtkPWNiKGEsZSk7Y29udGludWV9ZWxzZSBpZihcInRlbXBsYXRlXCI9PT1mKXtkPWNiKGEsZSk7Y29udGludWV9aWYoZT1cbmUuX19DRV9zaGFkb3dSb290KWZvcihlPWUuZmlyc3RDaGlsZDtlO2U9ZS5uZXh0U2libGluZylPKGUsYixjKX1kPWQuZmlyc3RDaGlsZD9kLmZpcnN0Q2hpbGQ6Y2IoYSxkKX19ZnVuY3Rpb24geChhLGIsYyl7YVtiXT1jfWZ1bmN0aW9uIGRiKGEpe2E9YS5yZXBsYWNlKEYuWWEsXCJcIikucmVwbGFjZShGLnBvcnQsXCJcIik7dmFyIGI9RGMsYz1hLGQ9bmV3IEJhO2Quc3RhcnQ9MDtkLmVuZD1jLmxlbmd0aDtmb3IodmFyIGU9ZCxmPTAsaz1jLmxlbmd0aDtmPGs7ZisrKWlmKFwie1wiPT09Y1tmXSl7ZS5ydWxlc3x8KGUucnVsZXM9W10pO3ZhciBoPWUsZz1oLnJ1bGVzW2gucnVsZXMubGVuZ3RoLTFdfHxudWxsO2U9bmV3IEJhO2Uuc3RhcnQ9ZisxO2UucGFyZW50PWg7ZS5wcmV2aW91cz1nO2gucnVsZXMucHVzaChlKX1lbHNlXCJ9XCI9PT1jW2ZdJiYoZS5lbmQ9ZisxLGU9ZS5wYXJlbnR8fGQpO3JldHVybiBiKGQsYSl9ZnVuY3Rpb24gRGMoYSxiKXt2YXIgYz1iLnN1YnN0cmluZyhhLnN0YXJ0LFxuYS5lbmQtMSk7YS5wYXJzZWRDc3NUZXh0PWEuY3NzVGV4dD1jLnRyaW0oKTthLnBhcmVudCYmKGM9Yi5zdWJzdHJpbmcoYS5wcmV2aW91cz9hLnByZXZpb3VzLmVuZDphLnBhcmVudC5zdGFydCxhLnN0YXJ0LTEpLGM9UWQoYyksYz1jLnJlcGxhY2UoRi5CYSxcIiBcIiksYz1jLnN1YnN0cmluZyhjLmxhc3RJbmRleE9mKFwiO1wiKSsxKSxjPWEucGFyc2VkU2VsZWN0b3I9YS5zZWxlY3Rvcj1jLnRyaW0oKSxhLmF0UnVsZT0wPT09Yy5pbmRleE9mKFwiQFwiKSxhLmF0UnVsZT8wPT09Yy5pbmRleE9mKFwiQG1lZGlhXCIpP2EudHlwZT1JLk1FRElBX1JVTEU6Yy5tYXRjaChGLmNiKSYmKGEudHlwZT1JLmRhLGEua2V5ZnJhbWVzTmFtZT1hLnNlbGVjdG9yLnNwbGl0KEYuQmEpLnBvcCgpKTphLnR5cGU9MD09PWMuaW5kZXhPZihcIi0tXCIpP0kubmE6SS5TVFlMRV9SVUxFKTtpZihjPWEucnVsZXMpZm9yKHZhciBkPTAsZT1jLmxlbmd0aCxmO2Q8ZSYmKGY9Y1tkXSk7ZCsrKURjKGYsYik7cmV0dXJuIGF9ZnVuY3Rpb24gUWQoYSl7cmV0dXJuIGEucmVwbGFjZSgvXFxcXChbMC05YS1mXXsxLDZ9KVxccy9naSxcbmZ1bmN0aW9uKGEsYyl7YT1jO2ZvcihjPTYtYS5sZW5ndGg7Yy0tOylhPVwiMFwiK2E7cmV0dXJuXCJcXFxcXCIrYX0pfWZ1bmN0aW9uIEVjKGEsYixjKXtjPXZvaWQgMD09PWM/XCJcIjpjO3ZhciBkPVwiXCI7aWYoYS5jc3NUZXh0fHxhLnJ1bGVzKXt2YXIgZT1hLnJ1bGVzLGY7aWYoZj1lKWY9ZVswXSxmPSEoZiYmZi5zZWxlY3RvciYmMD09PWYuc2VsZWN0b3IuaW5kZXhPZihcIi0tXCIpKTtpZihmKXtmPTA7Zm9yKHZhciBrPWUubGVuZ3RoLGg7ZjxrJiYoaD1lW2ZdKTtmKyspZD1FYyhoLGIsZCl9ZWxzZSBiP2I9YS5jc3NUZXh0OihiPWEuY3NzVGV4dCxiPWIucmVwbGFjZShGLndhLFwiXCIpLnJlcGxhY2UoRi5BYSxcIlwiKSxiPWIucmVwbGFjZShGLmViLFwiXCIpLnJlcGxhY2UoRi5qYixcIlwiKSksKGQ9Yi50cmltKCkpJiYoZD1cIiAgXCIrZCtcIlxcblwiKX1kJiYoYS5zZWxlY3RvciYmKGMrPWEuc2VsZWN0b3IrXCIge1xcblwiKSxjKz1kLGEuc2VsZWN0b3ImJihjKz1cIn1cXG5cXG5cIikpO3JldHVybiBjfWZ1bmN0aW9uIEZjKGEpe0E9XG5hJiZhLnNoaW1jc3Nwcm9wZXJ0aWVzPyExOnp8fCEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC82MDF8RWRnZVxcLzE1Lyl8fCF3aW5kb3cuQ1NTfHwhQ1NTLnN1cHBvcnRzfHwhQ1NTLnN1cHBvcnRzKFwiYm94LXNoYWRvd1wiLFwiMCAwIDAgdmFyKC0tZm9vKVwiKSl9ZnVuY3Rpb24gVihhLGIpe2lmKCFhKXJldHVyblwiXCI7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT1kYihhKSk7YiYmVyhhLGIpO3JldHVybiBFYyhhLEEpfWZ1bmN0aW9uIHBhKGEpeyFhLl9fY3NzUnVsZXMmJmEudGV4dENvbnRlbnQmJihhLl9fY3NzUnVsZXM9ZGIoYS50ZXh0Q29udGVudCkpO3JldHVybiBhLl9fY3NzUnVsZXN8fG51bGx9ZnVuY3Rpb24gR2MoYSl7cmV0dXJuISFhLnBhcmVudCYmYS5wYXJlbnQudHlwZT09PUkuZGF9ZnVuY3Rpb24gVyhhLGIsYyxkKXtpZihhKXt2YXIgZT0hMSxmPWEudHlwZTtpZihkJiZmPT09SS5NRURJQV9SVUxFKXt2YXIgaz1hLnNlbGVjdG9yLm1hdGNoKFJkKTtcbmsmJih3aW5kb3cubWF0Y2hNZWRpYShrWzFdKS5tYXRjaGVzfHwoZT0hMCkpfWY9PT1JLlNUWUxFX1JVTEU/YihhKTpjJiZmPT09SS5kYT9jKGEpOmY9PT1JLm5hJiYoZT0hMCk7aWYoKGE9YS5ydWxlcykmJiFlKXtlPTA7Zj1hLmxlbmd0aDtmb3IodmFyIGg7ZTxmJiYoaD1hW2VdKTtlKyspVyhoLGIsYyxkKX19fWZ1bmN0aW9uIGViKGEsYixjLGQpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtiJiZlLnNldEF0dHJpYnV0ZShcInNjb3BlXCIsYik7ZS50ZXh0Q29udGVudD1hO0hjKGUsYyxkKTtyZXR1cm4gZX1mdW5jdGlvbiBIYyhhLGIsYyl7Yj1ifHxkb2N1bWVudC5oZWFkO2IuaW5zZXJ0QmVmb3JlKGEsYyYmYy5uZXh0U2libGluZ3x8Yi5maXJzdENoaWxkKTtRP2EuY29tcGFyZURvY3VtZW50UG9zaXRpb24oUSk9PT1Ob2RlLkRPQ1VNRU5UX1BPU0lUSU9OX1BSRUNFRElORyYmKFE9YSk6UT1hfWZ1bmN0aW9uIEljKGEsYil7dmFyIGM9YS5pbmRleE9mKFwidmFyKFwiKTtcbmlmKC0xPT09YylyZXR1cm4gYihhLFwiXCIsXCJcIixcIlwiKTthOnt2YXIgZD0wO3ZhciBlPWMrMztmb3IodmFyIGY9YS5sZW5ndGg7ZTxmO2UrKylpZihcIihcIj09PWFbZV0pZCsrO2Vsc2UgaWYoXCIpXCI9PT1hW2VdJiYwPT09LS1kKWJyZWFrIGE7ZT0tMX1kPWEuc3Vic3RyaW5nKGMrNCxlKTtjPWEuc3Vic3RyaW5nKDAsYyk7YT1JYyhhLnN1YnN0cmluZyhlKzEpLGIpO2U9ZC5pbmRleE9mKFwiLFwiKTtyZXR1cm4tMT09PWU/YihjLGQudHJpbSgpLFwiXCIsYSk6YihjLGQuc3Vic3RyaW5nKDAsZSkudHJpbSgpLGQuc3Vic3RyaW5nKGUrMSkudHJpbSgpLGEpfWZ1bmN0aW9uIHFhKGEsYil7ej9hLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsYik6d2luZG93LlNoYWR5RE9NLm5hdGl2ZU1ldGhvZHMuc2V0QXR0cmlidXRlLmNhbGwoYSxcImNsYXNzXCIsYil9ZnVuY3Rpb24gUihhKXt2YXIgYj1hLmxvY2FsTmFtZSxjPVwiXCI7Yj8tMTxiLmluZGV4T2YoXCItXCIpfHwoYz1iLGI9YS5nZXRBdHRyaWJ1dGUmJmEuZ2V0QXR0cmlidXRlKFwiaXNcIil8fFxuXCJcIik6KGI9YS5pcyxjPWEuZXh0ZW5kcyk7cmV0dXJue2lzOmIsVjpjfX1mdW5jdGlvbiBKYyhhKXtmb3IodmFyIGI9MDtiPGEubGVuZ3RoO2IrKyl7dmFyIGM9YVtiXTtpZihjLnRhcmdldCE9PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCYmYy50YXJnZXQhPT1kb2N1bWVudC5oZWFkKWZvcih2YXIgZD0wO2Q8Yy5hZGRlZE5vZGVzLmxlbmd0aDtkKyspe3ZhciBlPWMuYWRkZWROb2Rlc1tkXTtpZihlLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUpe3ZhciBmPWUuZ2V0Um9vdE5vZGUoKTt2YXIgaz1lO3ZhciBoPVtdO2suY2xhc3NMaXN0P2g9QXJyYXkuZnJvbShrLmNsYXNzTGlzdCk6ayBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50JiZrLmhhc0F0dHJpYnV0ZShcImNsYXNzXCIpJiYoaD1rLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLnNwbGl0KC9cXHMrLykpO2s9aDtoPWsuaW5kZXhPZihwLmEpO2lmKChrPS0xPGg/a1toKzFdOlwiXCIpJiZmPT09ZS5vd25lckRvY3VtZW50KXAuYihlLFxuaywhMCk7ZWxzZSBpZihmLm5vZGVUeXBlPT09Tm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFJiYoZj1mLmhvc3QpKWlmKGY9UihmKS5pcyxrPT09Zilmb3IoZT13aW5kb3cuU2hhZHlET00ubmF0aXZlTWV0aG9kcy5xdWVyeVNlbGVjdG9yQWxsLmNhbGwoZSxcIjpub3QoLlwiK3AuYStcIilcIiksZj0wO2Y8ZS5sZW5ndGg7ZisrKXAuaChlW2ZdLGspO2Vsc2UgayYmcC5iKGUsaywhMCkscC5iKGUsZil9fX19ZnVuY3Rpb24gU2QoYSl7aWYoYT1yYVthXSlhLl9hcHBseVNoaW1DdXJyZW50VmVyc2lvbj1hLl9hcHBseVNoaW1DdXJyZW50VmVyc2lvbnx8MCxhLl9hcHBseVNoaW1WYWxpZGF0aW5nVmVyc2lvbj1hLl9hcHBseVNoaW1WYWxpZGF0aW5nVmVyc2lvbnx8MCxhLl9hcHBseVNoaW1OZXh0VmVyc2lvbj0oYS5fYXBwbHlTaGltTmV4dFZlcnNpb258fDApKzF9ZnVuY3Rpb24gS2MoYSl7cmV0dXJuIGEuX2FwcGx5U2hpbUN1cnJlbnRWZXJzaW9uPT09YS5fYXBwbHlTaGltTmV4dFZlcnNpb259XG5mdW5jdGlvbiBUZChhKXthLl9hcHBseVNoaW1WYWxpZGF0aW5nVmVyc2lvbj1hLl9hcHBseVNoaW1OZXh0VmVyc2lvbjthLmJ8fChhLmI9ITAsVWQudGhlbihmdW5jdGlvbigpe2EuX2FwcGx5U2hpbUN1cnJlbnRWZXJzaW9uPWEuX2FwcGx5U2hpbU5leHRWZXJzaW9uO2EuYj0hMX0pKX1mdW5jdGlvbiB1YihhKXtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtMYz9MYyhhKTooZmJ8fChmYj1uZXcgUHJvbWlzZShmdW5jdGlvbihhKXtnYj1hfSksXCJjb21wbGV0ZVwiPT09ZG9jdW1lbnQucmVhZHlTdGF0ZT9nYigpOmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsZnVuY3Rpb24oKXtcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlJiZnYigpfSkpLGZiLnRoZW4oZnVuY3Rpb24oKXthJiZhKCl9KSl9KX0oZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhLGIpe2lmKFwiZnVuY3Rpb25cIj09PXR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQpcmV0dXJuIG5ldyBDdXN0b21FdmVudChhLFxuYik7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtjLmluaXRDdXN0b21FdmVudChhLCEhYi5idWJibGVzLCEhYi5jYW5jZWxhYmxlLGIuZGV0YWlsKTtyZXR1cm4gY31mdW5jdGlvbiBjKGEpe2lmKG0pcmV0dXJuIGEub3duZXJEb2N1bWVudCE9PWRvY3VtZW50P2Eub3duZXJEb2N1bWVudDpudWxsO3ZhciBiPWEuX19pbXBvcnREb2M7aWYoIWImJmEucGFyZW50Tm9kZSl7Yj1hLnBhcmVudE5vZGU7aWYoXCJmdW5jdGlvblwiPT09dHlwZW9mIGIuY2xvc2VzdCliPWIuY2xvc2VzdChcImxpbmtbcmVsPWltcG9ydF1cIik7ZWxzZSBmb3IoOyFoKGIpJiYoYj1iLnBhcmVudE5vZGUpOyk7YS5fX2ltcG9ydERvYz1ifXJldHVybiBifWZ1bmN0aW9uIGQoYSl7dmFyIGI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtbcmVsPWltcG9ydF06bm90KFtpbXBvcnQtZGVwZW5kZW5jeV0pXCIpLGM9Yi5sZW5ndGg7Yz9sKGIsZnVuY3Rpb24oYil7cmV0dXJuIGsoYixmdW5jdGlvbigpezA9PT1cbi0tYyYmYSgpfSl9KTphKCl9ZnVuY3Rpb24gZShhKXtmdW5jdGlvbiBiKCl7XCJsb2FkaW5nXCIhPT1kb2N1bWVudC5yZWFkeVN0YXRlJiZkb2N1bWVudC5ib2R5JiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixiKSxhKCkpfWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsYik7YigpfWZ1bmN0aW9uIGYoYSl7ZShmdW5jdGlvbigpe3JldHVybiBkKGZ1bmN0aW9uKCl7cmV0dXJuIGEmJmEoKX0pfSl9ZnVuY3Rpb24gayhhLGIpe2lmKGEuX19sb2FkZWQpYiYmYigpO2Vsc2UgaWYoXCJzY3JpcHRcIj09PWEubG9jYWxOYW1lJiYhYS5zcmN8fFwic3R5bGVcIj09PWEubG9jYWxOYW1lJiYhYS5maXJzdENoaWxkKWEuX19sb2FkZWQ9ITAsYiYmYigpO2Vsc2V7dmFyIGM9ZnVuY3Rpb24oZCl7YS5yZW1vdmVFdmVudExpc3RlbmVyKGQudHlwZSxjKTthLl9fbG9hZGVkPSEwO2ImJmIoKX07YS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLFxuYyk7eiYmXCJzdHlsZVwiPT09YS5sb2NhbE5hbWV8fGEuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsYyl9fWZ1bmN0aW9uIGgoYSl7cmV0dXJuIGEubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSYmXCJsaW5rXCI9PT1hLmxvY2FsTmFtZSYmXCJpbXBvcnRcIj09PWEucmVsfWZ1bmN0aW9uIGcoKXt2YXIgYT10aGlzO3RoaXMuYT17fTt0aGlzLmI9MDt0aGlzLmY9bmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oYil7cmV0dXJuIGEubChiKX0pO3RoaXMuZi5vYnNlcnZlKGRvY3VtZW50LmhlYWQse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSk7dGhpcy5jKGRvY3VtZW50KX1mdW5jdGlvbiBsKGEsYixjKXt2YXIgZD1hP2EubGVuZ3RoOjAsZT1jPy0xOjE7Zm9yKGM9Yz9kLTE6MDtjPGQmJjA8PWM7Yys9ZSliKGFbY10sYyl9dmFyIG09XCJpbXBvcnRcImluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpLG49bnVsbDshMT09PVwiY3VycmVudFNjcmlwdFwiaW4gZG9jdW1lbnQmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShkb2N1bWVudCxcblwiY3VycmVudFNjcmlwdFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gbnx8KFwiY29tcGxldGVcIiE9PWRvY3VtZW50LnJlYWR5U3RhdGU/ZG9jdW1lbnQuc2NyaXB0c1tkb2N1bWVudC5zY3JpcHRzLmxlbmd0aC0xXTpudWxsKX0sY29uZmlndXJhYmxlOiEwfSk7dmFyIHE9Lyh1cmxcXCgpKFteKV0qKShcXCkpL2csdD0vKEBpbXBvcnRbXFxzXSsoPyF1cmxcXCgpKShbXjtdKikoOykvZyx1PS8oPGxpbmtbXj5dKikocmVsPVsnfFwiXT9zdHlsZXNoZWV0Wyd8XCJdP1tePl0qPikvZyxwPXtaYTpmdW5jdGlvbihhLGIpe2EuaHJlZiYmYS5zZXRBdHRyaWJ1dGUoXCJocmVmXCIscC4kKGEuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSxiKSk7YS5zcmMmJmEuc2V0QXR0cmlidXRlKFwic3JjXCIscC4kKGEuZ2V0QXR0cmlidXRlKFwic3JjXCIpLGIpKTtpZihcInN0eWxlXCI9PT1hLmxvY2FsTmFtZSl7dmFyIGM9cC5DYShhLnRleHRDb250ZW50LGIscSk7YS50ZXh0Q29udGVudD1wLkNhKGMsYix0KX19LENhOmZ1bmN0aW9uKGEsXG5iLGMpe3JldHVybiBhLnJlcGxhY2UoYyxmdW5jdGlvbihhLGMsZCxlKXthPWQucmVwbGFjZSgvW1wiJ10vZyxcIlwiKTtiJiYoYT1wLiQoYSxiKSk7cmV0dXJuIGMrXCInXCIrYStcIidcIitlfSl9LCQ6ZnVuY3Rpb24oYSxiKXtpZih2b2lkIDA9PT1wLmhhKXtwLmhhPSExO3RyeXt2YXIgYz1uZXcgVVJMKFwiYlwiLFwiaHR0cDovL2FcIik7Yy5wYXRobmFtZT1cImMlMjBkXCI7cC5oYT1cImh0dHA6Ly9hL2MlMjBkXCI9PT1jLmhyZWZ9Y2F0Y2goc2Upe319aWYocC5oYSlyZXR1cm4obmV3IFVSTChhLGIpKS5ocmVmO2M9cC5QYTtjfHwoYz1kb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJ0ZW1wXCIpLHAuUGE9YyxjLnBhPWMuY3JlYXRlRWxlbWVudChcImJhc2VcIiksYy5oZWFkLmFwcGVuZENoaWxkKGMucGEpLGMub2E9Yy5jcmVhdGVFbGVtZW50KFwiYVwiKSk7Yy5wYS5ocmVmPWI7Yy5vYS5ocmVmPWE7cmV0dXJuIGMub2EuaHJlZnx8YX19LHY9e2FzeW5jOiEwLGxvYWQ6ZnVuY3Rpb24oYSxcbmIsYyl7aWYoYSlpZihhLm1hdGNoKC9eZGF0YTovKSl7YT1hLnNwbGl0KFwiLFwiKTt2YXIgZD1hWzFdO2Q9LTE8YVswXS5pbmRleE9mKFwiO2Jhc2U2NFwiKT9hdG9iKGQpOmRlY29kZVVSSUNvbXBvbmVudChkKTtiKGQpfWVsc2V7dmFyIGU9bmV3IFhNTEh0dHBSZXF1ZXN0O2Uub3BlbihcIkdFVFwiLGEsdi5hc3luYyk7ZS5vbmxvYWQ9ZnVuY3Rpb24oKXt2YXIgYT1lLnJlc3BvbnNlVVJMfHxlLmdldFJlc3BvbnNlSGVhZGVyKFwiTG9jYXRpb25cIik7YSYmMD09PWEuaW5kZXhPZihcIi9cIikmJihhPShsb2NhdGlvbi5vcmlnaW58fGxvY2F0aW9uLnByb3RvY29sK1wiLy9cIitsb2NhdGlvbi5ob3N0KSthKTt2YXIgZD1lLnJlc3BvbnNlfHxlLnJlc3BvbnNlVGV4dDszMDQ9PT1lLnN0YXR1c3x8MD09PWUuc3RhdHVzfHwyMDA8PWUuc3RhdHVzJiYzMDA+ZS5zdGF0dXM/YihkLGEpOmMoZCl9O2Uuc2VuZCgpfWVsc2UgYyhcImVycm9yOiBocmVmIG11c3QgYmUgc3BlY2lmaWVkXCIpfX0sej0vVHJpZGVudC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KXx8XG4vRWRnZVxcL1xcZC4vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO2cucHJvdG90eXBlLmM9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpczthPWEucXVlcnlTZWxlY3RvckFsbChcImxpbmtbcmVsPWltcG9ydF1cIik7bChhLGZ1bmN0aW9uKGEpe3JldHVybiBiLmgoYSl9KX07Zy5wcm90b3R5cGUuaD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLGM9YS5ocmVmO2lmKHZvaWQgMCE9PXRoaXMuYVtjXSl7dmFyIGQ9dGhpcy5hW2NdO2QmJmQuX19sb2FkZWQmJihhLmltcG9ydD1kLHRoaXMuZyhhKSl9ZWxzZSB0aGlzLmIrKyx0aGlzLmFbY109XCJwZW5kaW5nXCIsdi5sb2FkKGMsZnVuY3Rpb24oYSxkKXthPWIubShhLGR8fGMpO2IuYVtjXT1hO2IuYi0tO2IuYyhhKTtiLmkoKX0sZnVuY3Rpb24oKXtiLmFbY109bnVsbDtiLmItLTtiLmkoKX0pfTtnLnByb3RvdHlwZS5tPWZ1bmN0aW9uKGEsYil7aWYoIWEpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTt6JiYoYT1hLnJlcGxhY2UodSxcbmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4tMT09PWEuaW5kZXhPZihcInR5cGU9XCIpP2IrXCIgdHlwZT1pbXBvcnQtZGlzYWJsZSBcIitjOmF9KSk7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO2MuaW5uZXJIVE1MPWE7aWYoYy5jb250ZW50KWE9Yy5jb250ZW50O2Vsc2UgZm9yKGE9ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2MuZmlyc3RDaGlsZDspYS5hcHBlbmRDaGlsZChjLmZpcnN0Q2hpbGQpO2lmKGM9YS5xdWVyeVNlbGVjdG9yKFwiYmFzZVwiKSliPXAuJChjLmdldEF0dHJpYnV0ZShcImhyZWZcIiksYiksYy5yZW1vdmVBdHRyaWJ1dGUoXCJocmVmXCIpO2M9YS5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1pbXBvcnRdLCBsaW5rW3JlbD1zdHlsZXNoZWV0XVtocmVmXVt0eXBlPWltcG9ydC1kaXNhYmxlXSxcXG4gICAgc3R5bGU6bm90KFt0eXBlXSksIGxpbmtbcmVsPXN0eWxlc2hlZXRdW2hyZWZdOm5vdChbdHlwZV0pLFxcbiAgICBzY3JpcHQ6bm90KFt0eXBlXSksIHNjcmlwdFt0eXBlPVwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiXSxcXG4gICAgc2NyaXB0W3R5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIl0nKTtcbnZhciBkPTA7bChjLGZ1bmN0aW9uKGEpe2soYSk7cC5aYShhLGIpO2Euc2V0QXR0cmlidXRlKFwiaW1wb3J0LWRlcGVuZGVuY3lcIixcIlwiKTtcInNjcmlwdFwiPT09YS5sb2NhbE5hbWUmJiFhLnNyYyYmYS50ZXh0Q29udGVudCYmKGEuc2V0QXR0cmlidXRlKFwic3JjXCIsXCJkYXRhOnRleHQvamF2YXNjcmlwdDtjaGFyc2V0PXV0Zi04LFwiK2VuY29kZVVSSUNvbXBvbmVudChhLnRleHRDb250ZW50KyhcIlxcbi8vIyBzb3VyY2VVUkw9XCIrYisoZD9cIi1cIitkOlwiXCIpK1wiLmpzXFxuXCIpKSksYS50ZXh0Q29udGVudD1cIlwiLGQrKyl9KTtyZXR1cm4gYX07Zy5wcm90b3R5cGUuaT1mdW5jdGlvbigpe3ZhciBhPXRoaXM7aWYoIXRoaXMuYil7dGhpcy5mLmRpc2Nvbm5lY3QoKTt0aGlzLmZsYXR0ZW4oZG9jdW1lbnQpO3ZhciBiPSExLGM9ITEsZD1mdW5jdGlvbigpe2MmJmImJihhLmMoZG9jdW1lbnQpLGEuYnx8KGEuZi5vYnNlcnZlKGRvY3VtZW50LmhlYWQse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSksYS5qKCkpKX07XG50aGlzLnMoZnVuY3Rpb24oKXtjPSEwO2QoKX0pO3RoaXMubyhmdW5jdGlvbigpe2I9ITA7ZCgpfSl9fTtnLnByb3RvdHlwZS5mbGF0dGVuPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7YT1hLnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rW3JlbD1pbXBvcnRdXCIpO2woYSxmdW5jdGlvbihhKXt2YXIgYz1iLmFbYS5ocmVmXTsoYS5pbXBvcnQ9YykmJmMubm9kZVR5cGU9PT1Ob2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUmJihiLmFbYS5ocmVmXT1hLGEucmVhZHlTdGF0ZT1cImxvYWRpbmdcIixhLmltcG9ydD1hLGIuZmxhdHRlbihjKSxhLmFwcGVuZENoaWxkKGMpKX0pfTtnLnByb3RvdHlwZS5vPWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoZSl7aWYoZTxkKXt2YXIgZj1jW2VdLGc9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtmLnJlbW92ZUF0dHJpYnV0ZShcImltcG9ydC1kZXBlbmRlbmN5XCIpO2woZi5hdHRyaWJ1dGVzLGZ1bmN0aW9uKGEpe3JldHVybiBnLnNldEF0dHJpYnV0ZShhLm5hbWUsXG5hLnZhbHVlKX0pO249ZztmLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGcsZik7ayhnLGZ1bmN0aW9uKCl7bj1udWxsO2IoZSsxKX0pfWVsc2UgYSgpfXZhciBjPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRbaW1wb3J0LWRlcGVuZGVuY3ldXCIpLGQ9Yy5sZW5ndGg7YigwKX07Zy5wcm90b3R5cGUucz1mdW5jdGlvbihhKXt2YXIgYj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3R5bGVbaW1wb3J0LWRlcGVuZGVuY3ldLFxcbiAgICBsaW5rW3JlbD1zdHlsZXNoZWV0XVtpbXBvcnQtZGVwZW5kZW5jeV1cIiksZD1iLmxlbmd0aDtpZihkKXt2YXIgZT16JiYhIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD1zdHlsZXNoZWV0XVtocmVmXVt0eXBlPWltcG9ydC1kaXNhYmxlXVwiKTtsKGIsZnVuY3Rpb24oYil7ayhiLGZ1bmN0aW9uKCl7Yi5yZW1vdmVBdHRyaWJ1dGUoXCJpbXBvcnQtZGVwZW5kZW5jeVwiKTswPT09LS1kJiZhKCl9KTtpZihlJiZiLnBhcmVudE5vZGUhPT1cbmRvY3VtZW50LmhlYWQpe3ZhciBmPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYi5sb2NhbE5hbWUpO2YuX19hcHBsaWVkRWxlbWVudD1iO2Yuc2V0QXR0cmlidXRlKFwidHlwZVwiLFwiaW1wb3J0LXBsYWNlaG9sZGVyXCIpO2IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZixiLm5leHRTaWJsaW5nKTtmb3IoZj1jKGIpO2YmJmMoZik7KWY9YyhmKTtmLnBhcmVudE5vZGUhPT1kb2N1bWVudC5oZWFkJiYoZj1udWxsKTtkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShiLGYpO2IucmVtb3ZlQXR0cmlidXRlKFwidHlwZVwiKX19KX1lbHNlIGEoKX07Zy5wcm90b3R5cGUuaj1mdW5jdGlvbigpe3ZhciBhPXRoaXMsYj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1tyZWw9aW1wb3J0XVwiKTtsKGIsZnVuY3Rpb24oYil7cmV0dXJuIGEuZyhiKX0sITApfTtnLnByb3RvdHlwZS5nPWZ1bmN0aW9uKGEpe2EuX19sb2FkZWR8fChhLl9fbG9hZGVkPSEwLGEuaW1wb3J0JiYoYS5pbXBvcnQucmVhZHlTdGF0ZT1cblwiY29tcGxldGVcIiksYS5kaXNwYXRjaEV2ZW50KGIoYS5pbXBvcnQ/XCJsb2FkXCI6XCJlcnJvclwiLHtidWJibGVzOiExLGNhbmNlbGFibGU6ITEsZGV0YWlsOnZvaWQgMH0pKSl9O2cucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcztsKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGwoYS5hZGRlZE5vZGVzLGZ1bmN0aW9uKGEpe2EmJmEubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSYmKGgoYSk/Yi5oKGEpOmIuYyhhKSl9KX0pfTtpZihtKXt2YXIgeD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1tyZWw9aW1wb3J0XVwiKTtsKHgsZnVuY3Rpb24oYSl7YS5pbXBvcnQmJlwibG9hZGluZ1wiPT09YS5pbXBvcnQucmVhZHlTdGF0ZXx8KGEuX19sb2FkZWQ9ITApfSk7eD1mdW5jdGlvbihhKXthPWEudGFyZ2V0O2goYSkmJihhLl9fbG9hZGVkPSEwKX07ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIix4LCEwKTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixcbngsITApfWVsc2V7dmFyIHk9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihOb2RlLnByb3RvdHlwZSxcImJhc2VVUklcIik7T2JqZWN0LmRlZmluZVByb3BlcnR5KCgheXx8eS5jb25maWd1cmFibGU/Tm9kZTpFbGVtZW50KS5wcm90b3R5cGUsXCJiYXNlVVJJXCIse2dldDpmdW5jdGlvbigpe3ZhciBhPWgodGhpcyk/dGhpczpjKHRoaXMpO3JldHVybiBhP2EuaHJlZjp5JiZ5LmdldD95LmdldC5jYWxsKHRoaXMpOihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYmFzZVwiKXx8d2luZG93LmxvY2F0aW9uKS5ocmVmfSxjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMH0pO2UoZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGd9KX1mKGZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoYihcIkhUTUxJbXBvcnRzTG9hZGVkXCIse2NhbmNlbGFibGU6ITAsYnViYmxlczohMCxkZXRhaWw6dm9pZCAwfSkpfSk7YS51c2VOYXRpdmU9bTthLndoZW5SZWFkeT1mO2EuaW1wb3J0Rm9yRWxlbWVudD1cbmN9KSh3aW5kb3cuSFRNTEltcG9ydHM9d2luZG93LkhUTUxJbXBvcnRzfHx7fSk7dmFyIEU9d2luZG93LlNoYWR5RE9NfHx7fTtFLiRhPSEoIUVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvd3x8IU5vZGUucHJvdG90eXBlLmdldFJvb3ROb2RlKTt2YXIgaGI9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihOb2RlLnByb3RvdHlwZSxcImZpcnN0Q2hpbGRcIik7RS5TPSEhKGhiJiZoYi5jb25maWd1cmFibGUmJmhiLmdldCk7RS56YT1FLmZvcmNlfHwhRS4kYTt2YXIgWD1FbGVtZW50LnByb3RvdHlwZSxNYz1YLm1hdGNoZXN8fFgubWF0Y2hlc1NlbGVjdG9yfHxYLm1vek1hdGNoZXNTZWxlY3Rvcnx8WC5tc01hdGNoZXNTZWxlY3Rvcnx8WC5vTWF0Y2hlc1NlbGVjdG9yfHxYLndlYmtpdE1hdGNoZXNTZWxlY3RvcixQYT1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSxMYj0wLE9hPVtdOyhuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpe2Zvcig7T2EubGVuZ3RoOyl0cnl7T2Euc2hpZnQoKSgpfWNhdGNoKGEpe3Rocm93IFBhLnRleHRDb250ZW50PVxuTGIrKyxhO319KSkub2JzZXJ2ZShQYSx7Y2hhcmFjdGVyRGF0YTohMH0pO3ZhciBWZD0hIWRvY3VtZW50LmNvbnRhaW5zLGFhPVtdLFFhO21hLmxpc3Q9YWE7bGEucHJvdG90eXBlLmhiPWZ1bmN0aW9uKCl7dmFyIGE9dGhpczt0aGlzLmF8fCh0aGlzLmE9ITAsS2IoZnVuY3Rpb24oKXthLmIoKX0pKX07bGEucHJvdG90eXBlLmI9ZnVuY3Rpb24oKXtpZih0aGlzLmEpe3RoaXMuYT0hMTt2YXIgYT10aGlzLnRha2VSZWNvcmRzKCk7YS5sZW5ndGgmJnRoaXMuWC5mb3JFYWNoKGZ1bmN0aW9uKGIpe2IoYSl9KX19O2xhLnByb3RvdHlwZS50YWtlUmVjb3Jkcz1mdW5jdGlvbigpe2lmKHRoaXMuYWRkZWROb2Rlcy5sZW5ndGh8fHRoaXMucmVtb3ZlZE5vZGVzLmxlbmd0aCl7dmFyIGE9W3thZGRlZE5vZGVzOnRoaXMuYWRkZWROb2RlcyxyZW1vdmVkTm9kZXM6dGhpcy5yZW1vdmVkTm9kZXN9XTt0aGlzLmFkZGVkTm9kZXM9W107dGhpcy5yZW1vdmVkTm9kZXM9W107cmV0dXJuIGF9cmV0dXJuW119O1xudmFyIGNjPUVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkLFhhPUVsZW1lbnQucHJvdG90eXBlLmluc2VydEJlZm9yZSxiYT1FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCxrYz1FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUsTmM9RWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlLGliPUVsZW1lbnQucHJvdG90eXBlLmNsb25lTm9kZSxZYT1Eb2N1bWVudC5wcm90b3R5cGUuaW1wb3J0Tm9kZSxzYz1FbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyLHZjPUVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIscmM9V2luZG93LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyLHVjPVdpbmRvdy5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcixqYj1FbGVtZW50LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50LGNhPU5vZGUucHJvdG90eXBlLmNvbnRhaW5zfHxIVE1MRWxlbWVudC5wcm90b3R5cGUuY29udGFpbnMsV2Q9T2JqZWN0LmZyZWV6ZSh7YXBwZW5kQ2hpbGQ6Y2MsXG5pbnNlcnRCZWZvcmU6WGEscmVtb3ZlQ2hpbGQ6YmEsc2V0QXR0cmlidXRlOmtjLHJlbW92ZUF0dHJpYnV0ZTpOYyxjbG9uZU5vZGU6aWIsaW1wb3J0Tm9kZTpZYSxhZGRFdmVudExpc3RlbmVyOnNjLHJlbW92ZUV2ZW50TGlzdGVuZXI6dmMscmI6cmMsc2I6dWMsZGlzcGF0Y2hFdmVudDpqYixxdWVyeVNlbGVjdG9yOkVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3IscXVlcnlTZWxlY3RvckFsbDpFbGVtZW50LnByb3RvdHlwZS5xdWVyeVNlbGVjdG9yQWxsLGNvbnRhaW5zOmNhfSksQ2Q9L1smXFx1MDBBMFwiXS9nLEZkPS9bJlxcdTAwQTA8Pl0vZyxEZD1QYihcImFyZWEgYmFzZSBiciBjb2wgY29tbWFuZCBlbWJlZCBociBpbWcgaW5wdXQga2V5Z2VuIGxpbmsgbWV0YSBwYXJhbSBzb3VyY2UgdHJhY2sgd2JyXCIuc3BsaXQoXCIgXCIpKSxFZD1QYihcInN0eWxlIHNjcmlwdCB4bXAgaWZyYW1lIG5vZW1iZWQgbm9mcmFtZXMgcGxhaW50ZXh0IG5vc2NyaXB0XCIuc3BsaXQoXCIgXCIpKSxDPWRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZG9jdW1lbnQsXG5Ob2RlRmlsdGVyLlNIT1dfQUxMLG51bGwsITEpLEQ9ZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihkb2N1bWVudCxOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCxudWxsLCExKSxYZD1PYmplY3QuZnJlZXplKHtwYXJlbnROb2RlOlUsZmlyc3RDaGlsZDpLYSxsYXN0Q2hpbGQ6TGEscHJldmlvdXNTaWJsaW5nOlFiLG5leHRTaWJsaW5nOlJiLGNoaWxkTm9kZXM6UyxwYXJlbnRFbGVtZW50OlNiLGZpcnN0RWxlbWVudENoaWxkOlRiLGxhc3RFbGVtZW50Q2hpbGQ6VWIscHJldmlvdXNFbGVtZW50U2libGluZzpWYixuZXh0RWxlbWVudFNpYmxpbmc6V2IsY2hpbGRyZW46WGIsaW5uZXJIVE1MOlliLHRleHRDb250ZW50OlpifSksa2I9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSxcImlubmVySFRNTFwiKXx8T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihIVE1MRWxlbWVudC5wcm90b3R5cGUsXCJpbm5lckhUTUxcIiksc2E9ZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KFwiaW5lcnRcIikuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbmxiPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRG9jdW1lbnQucHJvdG90eXBlLFwiYWN0aXZlRWxlbWVudFwiKSwkYj17cGFyZW50RWxlbWVudDp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkucGFyZW50Tm9kZTthJiZhLm5vZGVUeXBlIT09Tm9kZS5FTEVNRU5UX05PREUmJihhPW51bGwpO3JldHVybiB2b2lkIDAhPT1hP2E6U2IodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0scGFyZW50Tm9kZTp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkucGFyZW50Tm9kZTtyZXR1cm4gdm9pZCAwIT09YT9hOlUodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sbmV4dFNpYmxpbmc6e2dldDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5Lm5leHRTaWJsaW5nO3JldHVybiB2b2lkIDAhPT1hP2E6UmIodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0scHJldmlvdXNTaWJsaW5nOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1cbnRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5LnByZXZpb3VzU2libGluZztyZXR1cm4gdm9pZCAwIT09YT9hOlFiKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LGNsYXNzTmFtZTp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCJ9LHNldDpmdW5jdGlvbihhKXt0aGlzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsYSl9LGNvbmZpZ3VyYWJsZTohMH0sbmV4dEVsZW1lbnRTaWJsaW5nOntnZXQ6ZnVuY3Rpb24oKXtpZih0aGlzLl9fc2hhZHkmJnZvaWQgMCE9PXRoaXMuX19zaGFkeS5uZXh0U2libGluZyl7Zm9yKHZhciBhPXRoaXMubmV4dFNpYmxpbmc7YSYmYS5ub2RlVHlwZSE9PU5vZGUuRUxFTUVOVF9OT0RFOylhPWEubmV4dFNpYmxpbmc7cmV0dXJuIGF9cmV0dXJuIFdiKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LHByZXZpb3VzRWxlbWVudFNpYmxpbmc6e2dldDpmdW5jdGlvbigpe2lmKHRoaXMuX19zaGFkeSYmdm9pZCAwIT09dGhpcy5fX3NoYWR5LnByZXZpb3VzU2libGluZyl7Zm9yKHZhciBhPVxudGhpcy5wcmV2aW91c1NpYmxpbmc7YSYmYS5ub2RlVHlwZSE9PU5vZGUuRUxFTUVOVF9OT0RFOylhPWEucHJldmlvdXNTaWJsaW5nO3JldHVybiBhfXJldHVybiBWYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfX0sU2E9e2NoaWxkTm9kZXM6e2dldDpmdW5jdGlvbigpe2lmKFQodGhpcykpe2lmKCF0aGlzLl9fc2hhZHkuY2hpbGROb2Rlcyl7dGhpcy5fX3NoYWR5LmNoaWxkTm9kZXM9W107Zm9yKHZhciBhPXRoaXMuZmlyc3RDaGlsZDthO2E9YS5uZXh0U2libGluZyl0aGlzLl9fc2hhZHkuY2hpbGROb2Rlcy5wdXNoKGEpfXZhciBiPXRoaXMuX19zaGFkeS5jaGlsZE5vZGVzfWVsc2UgYj1TKHRoaXMpO2IuaXRlbT1mdW5jdGlvbihhKXtyZXR1cm4gYlthXX07cmV0dXJuIGJ9LGNvbmZpZ3VyYWJsZTohMH0sY2hpbGRFbGVtZW50Q291bnQ6e2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aH0sY29uZmlndXJhYmxlOiEwfSxmaXJzdENoaWxkOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1cbnRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5LmZpcnN0Q2hpbGQ7cmV0dXJuIHZvaWQgMCE9PWE/YTpLYSh0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxsYXN0Q2hpbGQ6e2dldDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5Lmxhc3RDaGlsZDtyZXR1cm4gdm9pZCAwIT09YT9hOkxhKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LHRleHRDb250ZW50OntnZXQ6ZnVuY3Rpb24oKXtpZihUKHRoaXMpKXtmb3IodmFyIGE9W10sYj0wLGM9dGhpcy5jaGlsZE5vZGVzLGQ7ZD1jW2JdO2IrKylkLm5vZGVUeXBlIT09Tm9kZS5DT01NRU5UX05PREUmJmEucHVzaChkLnRleHRDb250ZW50KTtyZXR1cm4gYS5qb2luKFwiXCIpfXJldHVybiBaYih0aGlzKX0sc2V0OmZ1bmN0aW9uKGEpe3N3aXRjaCh0aGlzLm5vZGVUeXBlKXtjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOmNhc2UgTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFOmZvcig7dGhpcy5maXJzdENoaWxkOyl0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZCk7XG4oMDxhLmxlbmd0aHx8dGhpcy5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFKSYmdGhpcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhKSk7YnJlYWs7ZGVmYXVsdDp0aGlzLm5vZGVWYWx1ZT1hfX0sY29uZmlndXJhYmxlOiEwfSxmaXJzdEVsZW1lbnRDaGlsZDp7Z2V0OmZ1bmN0aW9uKCl7aWYodGhpcy5fX3NoYWR5JiZ2b2lkIDAhPT10aGlzLl9fc2hhZHkuZmlyc3RDaGlsZCl7Zm9yKHZhciBhPXRoaXMuZmlyc3RDaGlsZDthJiZhLm5vZGVUeXBlIT09Tm9kZS5FTEVNRU5UX05PREU7KWE9YS5uZXh0U2libGluZztyZXR1cm4gYX1yZXR1cm4gVGIodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sbGFzdEVsZW1lbnRDaGlsZDp7Z2V0OmZ1bmN0aW9uKCl7aWYodGhpcy5fX3NoYWR5JiZ2b2lkIDAhPT10aGlzLl9fc2hhZHkubGFzdENoaWxkKXtmb3IodmFyIGE9dGhpcy5sYXN0Q2hpbGQ7YSYmYS5ub2RlVHlwZSE9PU5vZGUuRUxFTUVOVF9OT0RFOylhPWEucHJldmlvdXNTaWJsaW5nO1xucmV0dXJuIGF9cmV0dXJuIFViKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LGNoaWxkcmVuOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYTtUKHRoaXMpP2E9QXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHRoaXMuY2hpbGROb2RlcyxmdW5jdGlvbihhKXtyZXR1cm4gYS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFfSk6YT1YYih0aGlzKTthLml0ZW09ZnVuY3Rpb24oYil7cmV0dXJuIGFbYl19O3JldHVybiBhfSxjb25maWd1cmFibGU6ITB9LGlubmVySFRNTDp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9XCJ0ZW1wbGF0ZVwiPT09dGhpcy5sb2NhbE5hbWU/dGhpcy5jb250ZW50OnRoaXM7cmV0dXJuIFQodGhpcyk/UmEoYSk6WWIoYSl9LHNldDpmdW5jdGlvbihhKXtmb3IodmFyIGI9XCJ0ZW1wbGF0ZVwiPT09dGhpcy5sb2NhbE5hbWU/dGhpcy5jb250ZW50OnRoaXM7Yi5maXJzdENoaWxkOyliLnJlbW92ZUNoaWxkKGIuZmlyc3RDaGlsZCk7Zm9yKGtiJiZrYi5zZXQ/a2Iuc2V0LmNhbGwoc2EsYSk6XG5zYS5pbm5lckhUTUw9YTtzYS5maXJzdENoaWxkOyliLmFwcGVuZENoaWxkKHNhLmZpcnN0Q2hpbGQpfSxjb25maWd1cmFibGU6ITB9fSxPYz17c2hhZG93Um9vdDp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5LmZifHxudWxsfSxjb25maWd1cmFibGU6ITB9fSxUYT17YWN0aXZlRWxlbWVudDp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9bGImJmxiLmdldD9sYi5nZXQuY2FsbChkb2N1bWVudCk6RS5TP3ZvaWQgMDpkb2N1bWVudC5hY3RpdmVFbGVtZW50O2lmKGEmJmEubm9kZVR5cGUpe3ZhciBiPSEhRyh0aGlzKTtpZih0aGlzPT09ZG9jdW1lbnR8fGImJnRoaXMuaG9zdCE9PWEmJmNhLmNhbGwodGhpcy5ob3N0LGEpKXtmb3IoYj1aKGEpO2ImJmIhPT10aGlzOylhPWIuaG9zdCxiPVooYSk7YT10aGlzPT09ZG9jdW1lbnQ/Yj9udWxsOmE6Yj09PXRoaXM/YTpudWxsfWVsc2UgYT1udWxsfWVsc2UgYT1udWxsO3JldHVybiBhfSxzZXQ6ZnVuY3Rpb24oKXt9LFxuY29uZmlndXJhYmxlOiEwfX0sSmI9RS5TP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbihhKXthLl9fc2hhZHkmJmEuX19zaGFkeS5OYXx8KGEuX19zaGFkeT1hLl9fc2hhZHl8fHt9LGEuX19zaGFkeS5OYT0hMCxLKGEsJGIsITApKX0sSWI9RS5TP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbihhKXthLl9fc2hhZHkmJmEuX19zaGFkeS5MYXx8KGEuX19zaGFkeT1hLl9fc2hhZHl8fHt9LGEuX19zaGFkeS5MYT0hMCxLKGEsU2EsITApLEsoYSxPYywhMCkpfSxvYT1udWxsLGRhPVwiX19ldmVudFdyYXBwZXJzXCIrRGF0ZS5ub3coKSxZZD17Ymx1cjohMCxmb2N1czohMCxmb2N1c2luOiEwLGZvY3Vzb3V0OiEwLGNsaWNrOiEwLGRibGNsaWNrOiEwLG1vdXNlZG93bjohMCxtb3VzZWVudGVyOiEwLG1vdXNlbGVhdmU6ITAsbW91c2Vtb3ZlOiEwLG1vdXNlb3V0OiEwLG1vdXNlb3ZlcjohMCxtb3VzZXVwOiEwLHdoZWVsOiEwLGJlZm9yZWlucHV0OiEwLGlucHV0OiEwLGtleWRvd246ITAsa2V5dXA6ITAsY29tcG9zaXRpb25zdGFydDohMCxcbmNvbXBvc2l0aW9udXBkYXRlOiEwLGNvbXBvc2l0aW9uZW5kOiEwLHRvdWNoc3RhcnQ6ITAsdG91Y2hlbmQ6ITAsdG91Y2htb3ZlOiEwLHRvdWNoY2FuY2VsOiEwLHBvaW50ZXJvdmVyOiEwLHBvaW50ZXJlbnRlcjohMCxwb2ludGVyZG93bjohMCxwb2ludGVybW92ZTohMCxwb2ludGVydXA6ITAscG9pbnRlcmNhbmNlbDohMCxwb2ludGVyb3V0OiEwLHBvaW50ZXJsZWF2ZTohMCxnb3Rwb2ludGVyY2FwdHVyZTohMCxsb3N0cG9pbnRlcmNhcHR1cmU6ITAsZHJhZ3N0YXJ0OiEwLGRyYWc6ITAsZHJhZ2VudGVyOiEwLGRyYWdsZWF2ZTohMCxkcmFnb3ZlcjohMCxkcm9wOiEwLGRyYWdlbmQ6ITAsRE9NQWN0aXZhdGU6ITAsRE9NRm9jdXNJbjohMCxET01Gb2N1c091dDohMCxrZXlwcmVzczohMH0sd2M9e2dldCBjb21wb3NlZCgpeyExIT09dGhpcy5pc1RydXN0ZWQmJnZvaWQgMD09PXRoaXMuZWEmJih0aGlzLmVhPVlkW3RoaXMudHlwZV0pO3JldHVybiB0aGlzLmVhfHwhMX0sY29tcG9zZWRQYXRoOmZ1bmN0aW9uKCl7dGhpcy5xYXx8XG4odGhpcy5xYT1aYSh0aGlzLl9fdGFyZ2V0LHRoaXMuY29tcG9zZWQpKTtyZXR1cm4gdGhpcy5xYX0sZ2V0IHRhcmdldCgpe3JldHVybiBtYyh0aGlzLmN1cnJlbnRUYXJnZXQsdGhpcy5jb21wb3NlZFBhdGgoKSl9LGdldCByZWxhdGVkVGFyZ2V0KCl7aWYoIXRoaXMucmEpcmV0dXJuIG51bGw7dGhpcy5zYXx8KHRoaXMuc2E9WmEodGhpcy5yYSwhMCkpO3JldHVybiBtYyh0aGlzLmN1cnJlbnRUYXJnZXQsdGhpcy5zYSl9LHN0b3BQcm9wYWdhdGlvbjpmdW5jdGlvbigpe0V2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24uY2FsbCh0aGlzKTt0aGlzLmZhPSEwfSxzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246ZnVuY3Rpb24oKXtFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uLmNhbGwodGhpcyk7dGhpcy5mYT10aGlzLkthPSEwfX0sYWI9e2ZvY3VzOiEwLGJsdXI6ITB9LFpkPSRhKHdpbmRvdy5FdmVudCksJGQ9JGEod2luZG93LkN1c3RvbUV2ZW50KSxhZT1cbiRhKHdpbmRvdy5Nb3VzZUV2ZW50KSxIYj17fTtsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKERvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlKTtsLnByb3RvdHlwZS5GPWZ1bmN0aW9uKGEsYil7dGhpcy5NYT1cIlNoYWR5Um9vdFwiO2thKGEpO2thKHRoaXMpO3RoaXMuaG9zdD1hO3RoaXMuSD1iJiZiLm1vZGU7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307YS5fX3NoYWR5LnJvb3Q9dGhpczthLl9fc2hhZHkuZmI9XCJjbG9zZWRcIiE9PXRoaXMuSD90aGlzOm51bGw7dGhpcy5QPSExO3RoaXMuYj1bXTt0aGlzLmE9e307dGhpcy5jPVtdO2I9UyhhKTtmb3IodmFyIGM9MCxkPWIubGVuZ3RoO2M8ZDtjKyspYmEuY2FsbChhLGJbY10pfTtsLnByb3RvdHlwZS5MPWZ1bmN0aW9uKCl7dmFyIGE9dGhpczt0aGlzLlB8fCh0aGlzLlA9ITAsTmIoZnVuY3Rpb24oKXtyZXR1cm4gYS52YSgpfSkpfTtsLnByb3RvdHlwZS5LPWZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMsYj10aGlzO2I7KWIuUCYmKGE9YiksXG5iPWIuVWEoKTtyZXR1cm4gYX07bC5wcm90b3R5cGUuVWE9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmhvc3QuZ2V0Um9vdE5vZGUoKTtpZihHKGEpKWZvcih2YXIgYj10aGlzLmhvc3QuY2hpbGROb2RlcyxjPTAsZDtjPGIubGVuZ3RoO2MrKylpZihkPWJbY10sdGhpcy5qKGQpKXJldHVybiBhfTtsLnByb3RvdHlwZS52YT1mdW5jdGlvbigpe3RoaXMuUCYmdGhpcy5LKCkuX3JlbmRlclJvb3QoKX07bC5wcm90b3R5cGUuX3JlbmRlclJvb3Q9ZnVuY3Rpb24oKXt0aGlzLlA9ITE7dGhpcy5CKCk7dGhpcy5zKCl9O2wucHJvdG90eXBlLkI9ZnVuY3Rpb24oKXt0aGlzLmYoKTtmb3IodmFyIGE9MCxiO2E8dGhpcy5iLmxlbmd0aDthKyspYj10aGlzLmJbYV0sdGhpcy5vKGIpO2ZvcihiPXRoaXMuaG9zdC5maXJzdENoaWxkO2I7Yj1iLm5leHRTaWJsaW5nKXRoaXMuaChiKTtmb3IoYT0wO2E8dGhpcy5iLmxlbmd0aDthKyspe2I9dGhpcy5iW2FdO2lmKCFiLl9fc2hhZHkuYXNzaWduZWROb2Rlcy5sZW5ndGgpZm9yKHZhciBjPVxuYi5maXJzdENoaWxkO2M7Yz1jLm5leHRTaWJsaW5nKXRoaXMuaChjLGIpO2M9Yi5wYXJlbnROb2RlOyhjPWMuX19zaGFkeSYmYy5fX3NoYWR5LnJvb3QpJiZjLnRhKCkmJmMuX3JlbmRlclJvb3QoKTt0aGlzLmcoYi5fX3NoYWR5LlIsYi5fX3NoYWR5LmFzc2lnbmVkTm9kZXMpO2lmKGM9Yi5fX3NoYWR5LnVhKXtmb3IodmFyIGQ9MDtkPGMubGVuZ3RoO2QrKyljW2RdLl9fc2hhZHkuaWE9bnVsbDtiLl9fc2hhZHkudWE9bnVsbDtjLmxlbmd0aD5iLl9fc2hhZHkuYXNzaWduZWROb2Rlcy5sZW5ndGgmJihiLl9fc2hhZHkua2E9ITApfWIuX19zaGFkeS5rYSYmKGIuX19zaGFkeS5rYT0hMSx0aGlzLmkoYikpfX07bC5wcm90b3R5cGUuaD1mdW5jdGlvbihhLGIpe2EuX19zaGFkeT1hLl9fc2hhZHl8fHt9O3ZhciBjPWEuX19zaGFkeS5pYTthLl9fc2hhZHkuaWE9bnVsbDtifHwoYj0oYj10aGlzLmFbYS5zbG90fHxcIl9fY2F0Y2hhbGxcIl0pJiZiWzBdKTtiPyhiLl9fc2hhZHkuYXNzaWduZWROb2Rlcy5wdXNoKGEpLFxuYS5fX3NoYWR5LmFzc2lnbmVkU2xvdD1iKTphLl9fc2hhZHkuYXNzaWduZWRTbG90PXZvaWQgMDtjIT09YS5fX3NoYWR5LmFzc2lnbmVkU2xvdCYmYS5fX3NoYWR5LmFzc2lnbmVkU2xvdCYmKGEuX19zaGFkeS5hc3NpZ25lZFNsb3QuX19zaGFkeS5rYT0hMCl9O2wucHJvdG90eXBlLm89ZnVuY3Rpb24oYSl7dmFyIGI9YS5fX3NoYWR5LmFzc2lnbmVkTm9kZXM7YS5fX3NoYWR5LmFzc2lnbmVkTm9kZXM9W107YS5fX3NoYWR5LlI9W107aWYoYS5fX3NoYWR5LnVhPWIpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspe3ZhciBkPWJbY107ZC5fX3NoYWR5LmlhPWQuX19zaGFkeS5hc3NpZ25lZFNsb3Q7ZC5fX3NoYWR5LmFzc2lnbmVkU2xvdD09PWEmJihkLl9fc2hhZHkuYXNzaWduZWRTbG90PW51bGwpfX07bC5wcm90b3R5cGUuZz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz0wLGQ7YzxiLmxlbmd0aCYmKGQ9YltjXSk7YysrKVwic2xvdFwiPT1kLmxvY2FsTmFtZT90aGlzLmcoYSxkLl9fc2hhZHkuYXNzaWduZWROb2Rlcyk6XG5hLnB1c2goYltjXSl9O2wucHJvdG90eXBlLmk9ZnVuY3Rpb24oYSl7amIuY2FsbChhLG5ldyBFdmVudChcInNsb3RjaGFuZ2VcIikpO2EuX19zaGFkeS5hc3NpZ25lZFNsb3QmJnRoaXMuaShhLl9fc2hhZHkuYXNzaWduZWRTbG90KX07bC5wcm90b3R5cGUucz1mdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLmIsYj1bXSxjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWFbY10ucGFyZW50Tm9kZTtkLl9fc2hhZHkmJmQuX19zaGFkeS5yb290fHwhKDA+Yi5pbmRleE9mKGQpKXx8Yi5wdXNoKGQpfWZvcihhPTA7YTxiLmxlbmd0aDthKyspYz1iW2FdLHRoaXMuTyhjPT09dGhpcz90aGlzLmhvc3Q6Yyx0aGlzLncoYykpfTtsLnByb3RvdHlwZS53PWZ1bmN0aW9uKGEpe3ZhciBiPVtdO2E9YS5jaGlsZE5vZGVzO2Zvcih2YXIgYz0wO2M8YS5sZW5ndGg7YysrKXt2YXIgZD1hW2NdO2lmKHRoaXMuaihkKSl7ZD1kLl9fc2hhZHkuUjtmb3IodmFyIGU9MDtlPGQubGVuZ3RoO2UrKyliLnB1c2goZFtlXSl9ZWxzZSBiLnB1c2goZCl9cmV0dXJuIGJ9O1xubC5wcm90b3R5cGUuaj1mdW5jdGlvbihhKXtyZXR1cm5cInNsb3RcIj09YS5sb2NhbE5hbWV9O2wucHJvdG90eXBlLk89ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9UyhhKSxkPUlkKGIsYi5sZW5ndGgsYyxjLmxlbmd0aCksZT0wLGY9MCxrO2U8ZC5sZW5ndGgmJihrPWRbZV0pO2UrKyl7Zm9yKHZhciBnPTAsbDtnPGsuVS5sZW5ndGgmJihsPWsuVVtnXSk7ZysrKVUobCk9PT1hJiZiYS5jYWxsKGEsbCksYy5zcGxpY2Uoay5pbmRleCtmLDEpO2YtPWsuV31mb3IoZT0wO2U8ZC5sZW5ndGgmJihrPWRbZV0pO2UrKylmb3IoZj1jW2suaW5kZXhdLGc9ay5pbmRleDtnPGsuaW5kZXgray5XO2crKylsPWJbZ10sWGEuY2FsbChhLGwsZiksYy5zcGxpY2UoZywwLGwpfTtsLnByb3RvdHlwZS5RYT1mdW5jdGlvbihhKXt0aGlzLmMucHVzaC5hcHBseSh0aGlzLmMsW10uY29uY2F0KGEgaW5zdGFuY2VvZiBBcnJheT9hOmhkKGdkKGEpKSkpfTtsLnByb3RvdHlwZS5mPWZ1bmN0aW9uKCl7dGhpcy5jLmxlbmd0aCYmXG4odGhpcy5HKHRoaXMuYyksdGhpcy5jPVtdKX07bC5wcm90b3R5cGUuRz1mdW5jdGlvbihhKXtmb3IodmFyIGIsYz0wO2M8YS5sZW5ndGg7YysrKXt2YXIgZD1hW2NdO2QuX19zaGFkeT1kLl9fc2hhZHl8fHt9O2thKGQpO2thKGQucGFyZW50Tm9kZSk7dmFyIGU9dGhpcy5sKGQpO3RoaXMuYVtlXT8oYj1ifHx7fSxiW2VdPSEwLHRoaXMuYVtlXS5wdXNoKGQpKTp0aGlzLmFbZV09W2RdO3RoaXMuYi5wdXNoKGQpfWlmKGIpZm9yKHZhciBmIGluIGIpdGhpcy5hW2ZdPXRoaXMubSh0aGlzLmFbZl0pfTtsLnByb3RvdHlwZS5sPWZ1bmN0aW9uKGEpe3ZhciBiPWEubmFtZXx8YS5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpfHxcIl9fY2F0Y2hhbGxcIjtyZXR1cm4gYS5PYT1ifTtsLnByb3RvdHlwZS5tPWZ1bmN0aW9uKGEpe3JldHVybiBhLnNvcnQoZnVuY3Rpb24oYSxjKXthPXhjKGEpO2Zvcih2YXIgYj14YyhjKSxlPTA7ZTxhLmxlbmd0aDtlKyspe2M9YVtlXTt2YXIgZj1iW2VdO2lmKGMhPT1mKXJldHVybiBhPVxuQXJyYXkuZnJvbShjLnBhcmVudE5vZGUuY2hpbGROb2RlcyksYS5pbmRleE9mKGMpLWEuaW5kZXhPZihmKX19KX07bC5wcm90b3R5cGUuVGE9ZnVuY3Rpb24oYSl7dGhpcy5mKCk7dmFyIGI9dGhpcy5hLGM7Zm9yKGMgaW4gYilmb3IodmFyIGQ9YltjXSxlPTA7ZTxkLmxlbmd0aDtlKyspe3ZhciBmPWRbZV07aWYoTWIoYSxmKSl7ZC5zcGxpY2UoZSwxKTt2YXIgaz10aGlzLmIuaW5kZXhPZihmKTswPD1rJiZ0aGlzLmIuc3BsaWNlKGssMSk7ZS0tO3RoaXMuSShmKTtrPSEwfX1yZXR1cm4ga307bC5wcm90b3R5cGUuVmE9ZnVuY3Rpb24oYSl7dmFyIGI9YS5PYSxjPXRoaXMubChhKTtpZihjIT09Yil7Yj10aGlzLmFbYl07dmFyIGQ9Yi5pbmRleE9mKGEpOzA8PWQmJmIuc3BsaWNlKGQsMSk7Yj10aGlzLmFbY118fCh0aGlzLmFbY109W10pO2IucHVzaChhKTsxPGIubGVuZ3RoJiYodGhpcy5hW2NdPXRoaXMubShiKSl9fTtsLnByb3RvdHlwZS5JPWZ1bmN0aW9uKGEpe2lmKGE9YS5fX3NoYWR5LlIpZm9yKHZhciBiPVxuMDtiPGEubGVuZ3RoO2IrKyl7dmFyIGM9YVtiXSxkPVUoYyk7ZCYmYmEuY2FsbChkLGMpfX07bC5wcm90b3R5cGUudGE9ZnVuY3Rpb24oKXt0aGlzLmYoKTtyZXR1cm4hIXRoaXMuYi5sZW5ndGh9O2wucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oYSxiLGMpe1wib2JqZWN0XCIhPT10eXBlb2YgYyYmKGM9e2NhcHR1cmU6ISFjfSk7Yy5nYT10aGlzO3RoaXMuaG9zdC5hZGRFdmVudExpc3RlbmVyKGEsYixjKX07bC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihhLGIsYyl7XCJvYmplY3RcIiE9PXR5cGVvZiBjJiYoYz17Y2FwdHVyZTohIWN9KTtjLmdhPXRoaXM7dGhpcy5ob3N0LnJlbW92ZUV2ZW50TGlzdGVuZXIoYSxiLGMpfTtsLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZD1mdW5jdGlvbihhKXtyZXR1cm4gbmEodGhpcyxmdW5jdGlvbihiKXtyZXR1cm4gYi5pZD09YX0sZnVuY3Rpb24oYSl7cmV0dXJuISFhfSlbMF18fG51bGx9OyhmdW5jdGlvbihhKXtLKGEsXG5TYSwhMCk7SyhhLFRhLCEwKX0pKGwucHJvdG90eXBlKTt2YXIgTWQ9e2FkZEV2ZW50TGlzdGVuZXI6cGMuYmluZCh3aW5kb3cpLHJlbW92ZUV2ZW50TGlzdGVuZXI6dGMuYmluZCh3aW5kb3cpfSxMZD17YWRkRXZlbnRMaXN0ZW5lcjpwYyxyZW1vdmVFdmVudExpc3RlbmVyOnRjLGFwcGVuZENoaWxkOmZ1bmN0aW9uKGEpe3JldHVybiBVYSh0aGlzLGEpfSxpbnNlcnRCZWZvcmU6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gVWEodGhpcyxhLGIpfSxyZW1vdmVDaGlsZDpmdW5jdGlvbihhKXtyZXR1cm4gVmEodGhpcyxhKX0scmVwbGFjZUNoaWxkOmZ1bmN0aW9uKGEsYil7VWEodGhpcyxhLGIpO1ZhKHRoaXMsYik7cmV0dXJuIGF9LGNsb25lTm9kZTpmdW5jdGlvbihhKXtpZihcInRlbXBsYXRlXCI9PXRoaXMubG9jYWxOYW1lKXZhciBiPWliLmNhbGwodGhpcyxhKTtlbHNlIGlmKGI9aWIuY2FsbCh0aGlzLCExKSxhKXthPXRoaXMuY2hpbGROb2Rlcztmb3IodmFyIGM9MCxkO2M8YS5sZW5ndGg7YysrKWQ9XG5hW2NdLmNsb25lTm9kZSghMCksYi5hcHBlbmRDaGlsZChkKX1yZXR1cm4gYn0sZ2V0Um9vdE5vZGU6ZnVuY3Rpb24oKXtyZXR1cm4gZ2ModGhpcyl9LGNvbnRhaW5zOmZ1bmN0aW9uKGEpe3JldHVybiBNYih0aGlzLGEpfSxnZXQgaXNDb25uZWN0ZWQoKXt2YXIgYT10aGlzLm93bmVyRG9jdW1lbnQ7aWYoVmQmJmNhLmNhbGwoYSx0aGlzKXx8YS5kb2N1bWVudEVsZW1lbnQmJmNhLmNhbGwoYS5kb2N1bWVudEVsZW1lbnQsdGhpcykpcmV0dXJuITA7Zm9yKGE9dGhpczthJiYhKGEgaW5zdGFuY2VvZiBEb2N1bWVudCk7KWE9YS5wYXJlbnROb2RlfHwoYSBpbnN0YW5jZW9mIGw/YS5ob3N0OnZvaWQgMCk7cmV0dXJuISEoYSYmYSBpbnN0YW5jZW9mIERvY3VtZW50KX0sZGlzcGF0Y2hFdmVudDpmdW5jdGlvbihhKXttYSgpO3JldHVybiBqYi5jYWxsKHRoaXMsYSl9fSxOZD17Z2V0IGFzc2lnbmVkU2xvdCgpe3JldHVybiB5Yyh0aGlzKX19LGJiPXtxdWVyeVNlbGVjdG9yOmZ1bmN0aW9uKGEpe3JldHVybiBuYSh0aGlzLFxuZnVuY3Rpb24oYil7cmV0dXJuIE1jLmNhbGwoYixhKX0sZnVuY3Rpb24oYSl7cmV0dXJuISFhfSlbMF18fG51bGx9LHF1ZXJ5U2VsZWN0b3JBbGw6ZnVuY3Rpb24oYSl7cmV0dXJuIG5hKHRoaXMsZnVuY3Rpb24oYil7cmV0dXJuIE1jLmNhbGwoYixhKX0pfX0sQmM9e2Fzc2lnbmVkTm9kZXM6ZnVuY3Rpb24oYSl7aWYoXCJzbG90XCI9PT10aGlzLmxvY2FsTmFtZSlyZXR1cm4gaWModGhpcyksdGhpcy5fX3NoYWR5PyhhJiZhLmZsYXR0ZW4/dGhpcy5fX3NoYWR5LlI6dGhpcy5fX3NoYWR5LmFzc2lnbmVkTm9kZXMpfHxbXTpbXX19LHpjPU5hKHtzZXRBdHRyaWJ1dGU6ZnVuY3Rpb24oYSxiKXtqYyh0aGlzLGEsYil9LHJlbW92ZUF0dHJpYnV0ZTpmdW5jdGlvbihhKXtOYy5jYWxsKHRoaXMsYSk7ZmModGhpcyxhKX0sYXR0YWNoU2hhZG93OmZ1bmN0aW9uKGEpe2lmKCF0aGlzKXRocm93XCJNdXN0IHByb3ZpZGUgYSBob3N0LlwiO2lmKCFhKXRocm93XCJOb3QgZW5vdWdoIGFyZ3VtZW50cy5cIjtyZXR1cm4gbmV3IGwoSGIsXG50aGlzLGEpfSxnZXQgc2xvdCgpe3JldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNsb3RcIil9LHNldCBzbG90KGEpe2pjKHRoaXMsXCJzbG90XCIsYSl9LGdldCBhc3NpZ25lZFNsb3QoKXtyZXR1cm4geWModGhpcyl9fSxiYixCYyk7T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoemMsT2MpO3ZhciBBYz1OYSh7aW1wb3J0Tm9kZTpmdW5jdGlvbihhLGIpe3JldHVybiBsYyhhLGIpfSxnZXRFbGVtZW50QnlJZDpmdW5jdGlvbihhKXtyZXR1cm4gbmEodGhpcyxmdW5jdGlvbihiKXtyZXR1cm4gYi5pZD09YX0sZnVuY3Rpb24oYSl7cmV0dXJuISFhfSlbMF18fG51bGx9fSxiYik7T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQWMse19hY3RpdmVFbGVtZW50OlRhLmFjdGl2ZUVsZW1lbnR9KTt2YXIgYmU9SFRNTEVsZW1lbnQucHJvdG90eXBlLmJsdXIsT2Q9TmEoe2JsdXI6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5yb290OyhhPWEmJmEuYWN0aXZlRWxlbWVudCk/XG5hLmJsdXIoKTpiZS5jYWxsKHRoaXMpfX0pO0UuemEmJih3aW5kb3cuU2hhZHlET009e2luVXNlOkUuemEscGF0Y2g6ZnVuY3Rpb24oYSl7cmV0dXJuIGF9LGlzU2hhZHlSb290OkcsZW5xdWV1ZTpOYixmbHVzaDptYSxzZXR0aW5nczpFLGZpbHRlck11dGF0aW9uczpCZCxvYnNlcnZlQ2hpbGRyZW46emQsdW5vYnNlcnZlQ2hpbGRyZW46eWQsbmF0aXZlTWV0aG9kczpXZCxuYXRpdmVUcmVlOlhkfSx3aW5kb3cuRXZlbnQ9WmQsd2luZG93LkN1c3RvbUV2ZW50PSRkLHdpbmRvdy5Nb3VzZUV2ZW50PWFlLEhkKCksS2QoKSx3aW5kb3cuU2hhZG93Um9vdD1sKTt2YXIgUGQ9bmV3IFNldChcImFubm90YXRpb24teG1sIGNvbG9yLXByb2ZpbGUgZm9udC1mYWNlIGZvbnQtZmFjZS1zcmMgZm9udC1mYWNlLXVyaSBmb250LWZhY2UtZm9ybWF0IGZvbnQtZmFjZS1uYW1lIG1pc3NpbmctZ2x5cGhcIi5zcGxpdChcIiBcIikpO0IucHJvdG90eXBlLkI9ZnVuY3Rpb24oYSxiKXt0aGlzLm8uc2V0KGEsYik7XG50aGlzLm0uc2V0KGIuY29uc3RydWN0b3IsYil9O0IucHJvdG90eXBlLmM9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuby5nZXQoYSl9O0IucHJvdG90eXBlLnc9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMubS5nZXQoYSl9O0IucHJvdG90eXBlLnM9ZnVuY3Rpb24oYSl7dGhpcy5oPSEwO3RoaXMuai5wdXNoKGEpfTtCLnByb3RvdHlwZS5sPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7dGhpcy5oJiZPKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGIuZyhhKX0pfTtCLnByb3RvdHlwZS5nPWZ1bmN0aW9uKGEpe2lmKHRoaXMuaCYmIWEuX19DRV9wYXRjaGVkKXthLl9fQ0VfcGF0Y2hlZD0hMDtmb3IodmFyIGI9MDtiPHRoaXMuai5sZW5ndGg7YisrKXRoaXMualtiXShhKX19O0IucHJvdG90eXBlLmI9ZnVuY3Rpb24oYSl7dmFyIGI9W107TyhhLGZ1bmN0aW9uKGEpe3JldHVybiBiLnB1c2goYSl9KTtmb3IoYT0wO2E8Yi5sZW5ndGg7YSsrKXt2YXIgYz1iW2FdOzE9PT1jLl9fQ0Vfc3RhdGU/dGhpcy5jb25uZWN0ZWRDYWxsYmFjayhjKTpcbnRoaXMuaShjKX19O0IucHJvdG90eXBlLmE9ZnVuY3Rpb24oYSl7dmFyIGI9W107TyhhLGZ1bmN0aW9uKGEpe3JldHVybiBiLnB1c2goYSl9KTtmb3IoYT0wO2E8Yi5sZW5ndGg7YSsrKXt2YXIgYz1iW2FdOzE9PT1jLl9fQ0Vfc3RhdGUmJnRoaXMuZGlzY29ubmVjdGVkQ2FsbGJhY2soYyl9fTtCLnByb3RvdHlwZS5mPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcztiPWI/Yjp7fTt2YXIgZD1iLmtifHxuZXcgU2V0LGU9Yi5EYXx8ZnVuY3Rpb24oYSl7cmV0dXJuIGMuaShhKX0sZj1bXTtPKGEsZnVuY3Rpb24oYSl7aWYoXCJsaW5rXCI9PT1hLmxvY2FsTmFtZSYmXCJpbXBvcnRcIj09PWEuZ2V0QXR0cmlidXRlKFwicmVsXCIpKXt2YXIgYj1hLmltcG9ydDtiIGluc3RhbmNlb2YgTm9kZSYmXCJjb21wbGV0ZVwiPT09Yi5yZWFkeVN0YXRlPyhiLl9fQ0VfaXNJbXBvcnREb2N1bWVudD0hMCxiLl9fQ0VfaGFzUmVnaXN0cnk9ITApOmEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixmdW5jdGlvbigpe3ZhciBiPVxuYS5pbXBvcnQ7aWYoIWIuX19DRV9kb2N1bWVudExvYWRIYW5kbGVkKXtiLl9fQ0VfZG9jdW1lbnRMb2FkSGFuZGxlZD0hMDtiLl9fQ0VfaXNJbXBvcnREb2N1bWVudD0hMDtiLl9fQ0VfaGFzUmVnaXN0cnk9ITA7dmFyIGY9bmV3IFNldChkKTtmLmRlbGV0ZShiKTtjLmYoYix7a2I6ZixEYTplfSl9fSl9ZWxzZSBmLnB1c2goYSl9LGQpO2lmKHRoaXMuaClmb3IoYT0wO2E8Zi5sZW5ndGg7YSsrKXRoaXMuZyhmW2FdKTtmb3IoYT0wO2E8Zi5sZW5ndGg7YSsrKWUoZlthXSl9O0IucHJvdG90eXBlLmk9ZnVuY3Rpb24oYSl7aWYodm9pZCAwPT09YS5fX0NFX3N0YXRlKXt2YXIgYj10aGlzLmMoYS5sb2NhbE5hbWUpO2lmKGIpe2IuY29uc3RydWN0aW9uU3RhY2sucHVzaChhKTt2YXIgYz1iLmNvbnN0cnVjdG9yO3RyeXt0cnl7aWYobmV3IGMhPT1hKXRocm93IEVycm9yKFwiVGhlIGN1c3RvbSBlbGVtZW50IGNvbnN0cnVjdG9yIGRpZCBub3QgcHJvZHVjZSB0aGUgZWxlbWVudCBiZWluZyB1cGdyYWRlZC5cIik7XG59ZmluYWxseXtiLmNvbnN0cnVjdGlvblN0YWNrLnBvcCgpfX1jYXRjaChmKXt0aHJvdyBhLl9fQ0Vfc3RhdGU9MixmO31hLl9fQ0Vfc3RhdGU9MTthLl9fQ0VfZGVmaW5pdGlvbj1iO2lmKGIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKWZvcihiPWIub2JzZXJ2ZWRBdHRyaWJ1dGVzLGM9MDtjPGIubGVuZ3RoO2MrKyl7dmFyIGQ9YltjXSxlPWEuZ2V0QXR0cmlidXRlKGQpO251bGwhPT1lJiZ0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhLGQsbnVsbCxlLG51bGwpfXQoYSkmJnRoaXMuY29ubmVjdGVkQ2FsbGJhY2soYSl9fX07Qi5wcm90b3R5cGUuY29ubmVjdGVkQ2FsbGJhY2s9ZnVuY3Rpb24oYSl7dmFyIGI9YS5fX0NFX2RlZmluaXRpb247Yi5jb25uZWN0ZWRDYWxsYmFjayYmYi5jb25uZWN0ZWRDYWxsYmFjay5jYWxsKGEpfTtCLnByb3RvdHlwZS5kaXNjb25uZWN0ZWRDYWxsYmFjaz1mdW5jdGlvbihhKXt2YXIgYj1hLl9fQ0VfZGVmaW5pdGlvbjtiLmRpc2Nvbm5lY3RlZENhbGxiYWNrJiZcbmIuZGlzY29ubmVjdGVkQ2FsbGJhY2suY2FsbChhKX07Qi5wcm90b3R5cGUuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrPWZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9YS5fX0NFX2RlZmluaXRpb247Zi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2smJi0xPGYub2JzZXJ2ZWRBdHRyaWJ1dGVzLmluZGV4T2YoYikmJmYuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrLmNhbGwoYSxiLGMsZCxlKX07SmEucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt0aGlzLk0mJnRoaXMuTS5kaXNjb25uZWN0KCl9O0phLnByb3RvdHlwZS5mPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuYS5yZWFkeVN0YXRlO1wiaW50ZXJhY3RpdmVcIiE9PWImJlwiY29tcGxldGVcIiE9PWJ8fHRoaXMuYygpO2ZvcihiPTA7YjxhLmxlbmd0aDtiKyspZm9yKHZhciBjPWFbYl0uYWRkZWROb2RlcyxkPTA7ZDxjLmxlbmd0aDtkKyspdGhpcy5iLmYoY1tkXSl9O0diLnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7aWYodGhpcy5hKXRocm93IEVycm9yKFwiQWxyZWFkeSByZXNvbHZlZC5cIik7XG50aGlzLmE9dm9pZCAwO3RoaXMuYiYmdGhpcy5iKHZvaWQgMCl9O3kucHJvdG90eXBlLmRlZmluZT1mdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7aWYoIShiIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDdXN0b20gZWxlbWVudCBjb25zdHJ1Y3RvcnMgbXVzdCBiZSBmdW5jdGlvbnMuXCIpO2lmKCFDYyhhKSl0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJUaGUgZWxlbWVudCBuYW1lICdcIithK1wiJyBpcyBub3QgdmFsaWQuXCIpO2lmKHRoaXMuYS5jKGEpKXRocm93IEVycm9yKFwiQSBjdXN0b20gZWxlbWVudCB3aXRoIG5hbWUgJ1wiK2ErXCInIGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZC5cIik7aWYodGhpcy5jKXRocm93IEVycm9yKFwiQSBjdXN0b20gZWxlbWVudCBpcyBhbHJlYWR5IGJlaW5nIGRlZmluZWQuXCIpO3RoaXMuYz0hMDt0cnl7dmFyIGQ9ZnVuY3Rpb24oYSl7dmFyIGI9ZVthXTtpZih2b2lkIDAhPT1iJiYhKGIgaW5zdGFuY2VvZiBGdW5jdGlvbikpdGhyb3cgRXJyb3IoXCJUaGUgJ1wiK1xuYStcIicgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLlwiKTtyZXR1cm4gYn0sZT1iLnByb3RvdHlwZTtpZighKGUgaW5zdGFuY2VvZiBPYmplY3QpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgY3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3IncyBwcm90b3R5cGUgaXMgbm90IGFuIG9iamVjdC5cIik7dmFyIGY9ZChcImNvbm5lY3RlZENhbGxiYWNrXCIpO3ZhciBnPWQoXCJkaXNjb25uZWN0ZWRDYWxsYmFja1wiKTt2YXIgaD1kKFwiYWRvcHRlZENhbGxiYWNrXCIpO3ZhciBsPWQoXCJhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tcIik7dmFyIG49Yi5vYnNlcnZlZEF0dHJpYnV0ZXN8fFtdfWNhdGNoKG0pe3JldHVybn1maW5hbGx5e3RoaXMuYz0hMX1iPXtsb2NhbE5hbWU6YSxjb25zdHJ1Y3RvcjpiLGNvbm5lY3RlZENhbGxiYWNrOmYsZGlzY29ubmVjdGVkQ2FsbGJhY2s6ZyxhZG9wdGVkQ2FsbGJhY2s6aCxhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2s6bCxvYnNlcnZlZEF0dHJpYnV0ZXM6bixjb25zdHJ1Y3Rpb25TdGFjazpbXX07XG50aGlzLmEuQihhLGIpO3RoaXMuZy5wdXNoKGIpO3RoaXMuYnx8KHRoaXMuYj0hMCx0aGlzLmYoZnVuY3Rpb24oKXtyZXR1cm4gYy5qKCl9KSl9O3kucHJvdG90eXBlLmo9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2lmKCExIT09dGhpcy5iKXt0aGlzLmI9ITE7Zm9yKHZhciBiPXRoaXMuZyxjPVtdLGQ9bmV3IE1hcCxlPTA7ZTxiLmxlbmd0aDtlKyspZC5zZXQoYltlXS5sb2NhbE5hbWUsW10pO3RoaXMuYS5mKGRvY3VtZW50LHtEYTpmdW5jdGlvbihiKXtpZih2b2lkIDA9PT1iLl9fQ0Vfc3RhdGUpe3ZhciBlPWIubG9jYWxOYW1lLGY9ZC5nZXQoZSk7Zj9mLnB1c2goYik6YS5hLmMoZSkmJmMucHVzaChiKX19fSk7Zm9yKGU9MDtlPGMubGVuZ3RoO2UrKyl0aGlzLmEuaShjW2VdKTtmb3IoOzA8Yi5sZW5ndGg7KXt2YXIgZj1iLnNoaWZ0KCk7ZT1mLmxvY2FsTmFtZTtmPWQuZ2V0KGYubG9jYWxOYW1lKTtmb3IodmFyIGc9MDtnPGYubGVuZ3RoO2crKyl0aGlzLmEuaShmW2ddKTsoZT10aGlzLmguZ2V0KGUpKSYmXG5lLmMoKX19fTt5LnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oYSl7aWYoYT10aGlzLmEuYyhhKSlyZXR1cm4gYS5jb25zdHJ1Y3Rvcn07eS5wcm90b3R5cGUud2hlbkRlZmluZWQ9ZnVuY3Rpb24oYSl7aWYoIUNjKGEpKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU3ludGF4RXJyb3IoXCInXCIrYStcIicgaXMgbm90IGEgdmFsaWQgY3VzdG9tIGVsZW1lbnQgbmFtZS5cIikpO3ZhciBiPXRoaXMuaC5nZXQoYSk7aWYoYilyZXR1cm4gYi5mO2I9bmV3IEdiO3RoaXMuaC5zZXQoYSxiKTt0aGlzLmEuYyhhKSYmIXRoaXMuZy5zb21lKGZ1bmN0aW9uKGIpe3JldHVybiBiLmxvY2FsTmFtZT09PWF9KSYmYi5jKCk7cmV0dXJuIGIuZn07eS5wcm90b3R5cGUubD1mdW5jdGlvbihhKXt0aGlzLmkuYygpO3ZhciBiPXRoaXMuZjt0aGlzLmY9ZnVuY3Rpb24oYyl7cmV0dXJuIGEoZnVuY3Rpb24oKXtyZXR1cm4gYihjKX0pfX07d2luZG93LkN1c3RvbUVsZW1lbnRSZWdpc3RyeT15O3kucHJvdG90eXBlLmRlZmluZT1cbnkucHJvdG90eXBlLmRlZmluZTt5LnByb3RvdHlwZS5nZXQ9eS5wcm90b3R5cGUuZ2V0O3kucHJvdG90eXBlLndoZW5EZWZpbmVkPXkucHJvdG90eXBlLndoZW5EZWZpbmVkO3kucHJvdG90eXBlLnBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2s9eS5wcm90b3R5cGUubDt2YXIgRWE9d2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50LHRkPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudE5TLHNkPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuaW1wb3J0Tm9kZSx1ZD13aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLnByZXBlbmQsdmQ9d2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5hcHBlbmQsY2U9d2luZG93LkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLnByZXBlbmQsZGU9d2luZG93LkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLmFwcGVuZCx3Yj13aW5kb3cuTm9kZS5wcm90b3R5cGUuY2xvbmVOb2RlLGlhPXdpbmRvdy5Ob2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCxcbkRiPXdpbmRvdy5Ob2RlLnByb3RvdHlwZS5pbnNlcnRCZWZvcmUsRmE9d2luZG93Lk5vZGUucHJvdG90eXBlLnJlbW92ZUNoaWxkLEViPXdpbmRvdy5Ob2RlLnByb3RvdHlwZS5yZXBsYWNlQ2hpbGQsSWE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuTm9kZS5wcm90b3R5cGUsXCJ0ZXh0Q29udGVudFwiKSx2Yj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuYXR0YWNoU2hhZG93LENhPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkVsZW1lbnQucHJvdG90eXBlLFwiaW5uZXJIVE1MXCIpLEdhPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5nZXRBdHRyaWJ1dGUseGI9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZSx6Yj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlLGphPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5nZXRBdHRyaWJ1dGVOUyx5Yj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlTlMsXG5BYj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlTlMsQ2I9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmluc2VydEFkamFjZW50RWxlbWVudCxqZD13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucHJlcGVuZCxrZD13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kLG1kPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5iZWZvcmUsbmQ9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmFmdGVyLG9kPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZXBsYWNlV2l0aCxwZD13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlLHhkPXdpbmRvdy5IVE1MRWxlbWVudCxEYT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5IVE1MRWxlbWVudC5wcm90b3R5cGUsXCJpbm5lckhUTUxcIiksQmI9d2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZS5pbnNlcnRBZGphY2VudEVsZW1lbnQsRmI9bmV3IGZ1bmN0aW9uKCl7fSx0YT13aW5kb3cuY3VzdG9tRWxlbWVudHM7XG5pZighdGF8fHRhLmZvcmNlUG9seWZpbGx8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIHRhLmRlZmluZXx8XCJmdW5jdGlvblwiIT10eXBlb2YgdGEuZ2V0KXt2YXIgWT1uZXcgQjt3ZChZKTtyZChZKTtIYShZLERvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLHtaOmNlLGFwcGVuZDpkZX0pO3FkKFkpO2lkKFkpO2RvY3VtZW50Ll9fQ0VfaGFzUmVnaXN0cnk9ITA7dmFyIGVlPW5ldyB5KFkpO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csXCJjdXN0b21FbGVtZW50c1wiLHtjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMCx2YWx1ZTplZX0pfXZhciBJPXtTVFlMRV9SVUxFOjEsZGE6NyxNRURJQV9SVUxFOjQsbmE6MUUzfSxGPXtZYTovXFwvXFwqW14qXSpcXCorKFteLypdW14qXSpcXCorKSpcXC8vZ2ltLHBvcnQ6L0BpbXBvcnRbXjtdKjsvZ2ltLHdhOi8oPzpeW147XFwtXFxzfV0rKT8tLVteO3t9XSo/Oltee307XSo/KD86WztcXG5dfCQpL2dpbSxBYTovKD86XlteO1xcLVxcc31dKyk/LS1bXjt7fV0qPzpbXnt9O10qP3tbXn1dKj99KD86WztcXG5dfCQpPy9naW0sXG5lYjovQGFwcGx5XFxzKlxcKD9bXik7XSpcXCk/XFxzKig/Ols7XFxuXXwkKT8vZ2ltLGpiOi9bXjs6XSo/OlteO10qP3ZhclxcKFteO10qXFwpKD86WztcXG5dfCQpPy9naW0sY2I6L15AW15cXHNdKmtleWZyYW1lcy8sQmE6L1xccysvZ30sej0hKHdpbmRvdy5TaGFkeURPTSYmd2luZG93LlNoYWR5RE9NLmluVXNlKTtpZih3aW5kb3cuU2hhZHlDU1MmJnZvaWQgMCE9PXdpbmRvdy5TaGFkeUNTUy5uYXRpdmVDc3MpdmFyIEE9d2luZG93LlNoYWR5Q1NTLm5hdGl2ZUNzcztlbHNlIHdpbmRvdy5TaGFkeUNTUz8oRmMod2luZG93LlNoYWR5Q1NTKSx3aW5kb3cuU2hhZHlDU1M9dm9pZCAwKTpGYyh3aW5kb3cuV2ViQ29tcG9uZW50cyYmd2luZG93LldlYkNvbXBvbmVudHMuZmxhZ3MpO3ZhciB1YT0vKD86XnxbO1xcc3tdXFxzKikoLS1bXFx3LV0qPylcXHMqOlxccyooPzooKD86Jyg/OlxcXFwnfC4pKj8nfFwiKD86XFxcXFwifC4pKj9cInxcXChbXildKj9cXCl8W159O3tdKSspfFxceyhbXn1dKilcXH0oPzooPz1bO1xcc31dKXwkKSkvZ2ksXG52YT0vKD86XnxcXFcrKUBhcHBseVxccypcXCg/KFteKTtcXG5dKilcXCk/L2dpLGZlPS8oLS1bXFx3LV0rKVxccyooWzosOyldfCQpL2dpLGdlPS8oYW5pbWF0aW9uXFxzKjopfChhbmltYXRpb24tbmFtZVxccyo6KS8sUmQ9L0BtZWRpYVxccyguKikvLGhlPS9cXHtbXn1dKlxcfS9nLFE9bnVsbDt1LnByb3RvdHlwZS5iPWZ1bmN0aW9uKGEsYixjKXthLl9fc3R5bGVTY29wZWQ/YS5fX3N0eWxlU2NvcGVkPW51bGw6dGhpcy5qKGEsYnx8XCJcIixjKX07dS5wcm90b3R5cGUuaj1mdW5jdGlvbihhLGIsYyl7YS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFJiZ0aGlzLmgoYSxiLGMpO2lmKGE9XCJ0ZW1wbGF0ZVwiPT09YS5sb2NhbE5hbWU/KGEuY29udGVudHx8YS5vYikuY2hpbGROb2RlczphLmNoaWxkcmVufHxhLmNoaWxkTm9kZXMpZm9yKHZhciBkPTA7ZDxhLmxlbmd0aDtkKyspdGhpcy5qKGFbZF0sYixjKX07dS5wcm90b3R5cGUuaD1mdW5jdGlvbihhLGIsYyl7aWYoYilpZihhLmNsYXNzTGlzdCljPyhhLmNsYXNzTGlzdC5yZW1vdmUoXCJzdHlsZS1zY29wZVwiKSxcbmEuY2xhc3NMaXN0LnJlbW92ZShiKSk6KGEuY2xhc3NMaXN0LmFkZChcInN0eWxlLXNjb3BlXCIpLGEuY2xhc3NMaXN0LmFkZChiKSk7ZWxzZSBpZihhLmdldEF0dHJpYnV0ZSl7dmFyIGQ9YS5nZXRBdHRyaWJ1dGUoaWUpO2M/ZCYmKGI9ZC5yZXBsYWNlKFwic3R5bGUtc2NvcGVcIixcIlwiKS5yZXBsYWNlKGIsXCJcIikscWEoYSxiKSk6cWEoYSwoZD9kK1wiIFwiOlwiXCIpK1wic3R5bGUtc2NvcGUgXCIrYil9fTt1LnByb3RvdHlwZS5jPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1hLl9fY3NzQnVpbGQ7enx8XCJzaGFkeVwiPT09ZD9iPVYoYixjKTooYT1SKGEpLGI9dGhpcy5HKGIsYS5pcyxhLlYsYykrXCJcXG5cXG5cIik7cmV0dXJuIGIudHJpbSgpfTt1LnByb3RvdHlwZS5HPWZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXRoaXMuZihiLGMpO2I9dGhpcy5pKGIpO3ZhciBmPXRoaXM7cmV0dXJuIFYoYSxmdW5jdGlvbihhKXthLmN8fChmLkkoYSxiLGUpLGEuYz0hMCk7ZCYmZChhLGIsZSl9KX07dS5wcm90b3R5cGUuaT1mdW5jdGlvbihhKXtyZXR1cm4gYT9cbmplK2E6XCJcIn07dS5wcm90b3R5cGUuZj1mdW5jdGlvbihhLGIpe3JldHVybiBiP1wiW2lzPVwiK2ErXCJdXCI6YX07dS5wcm90b3R5cGUuST1mdW5jdGlvbihhLGIsYyl7dGhpcy5sKGEsdGhpcy5nLGIsYyl9O3UucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSxiLGMsZCl7YS5zZWxlY3Rvcj1hLnY9dGhpcy5tKGEsYixjLGQpfTt1LnByb3RvdHlwZS5tPWZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPWEuc2VsZWN0b3Iuc3BsaXQoUGMpO2lmKCFHYyhhKSl7YT0wO2Zvcih2YXIgZj1lLmxlbmd0aCxnO2E8ZiYmKGc9ZVthXSk7YSsrKWVbYV09Yi5jYWxsKHRoaXMsZyxjLGQpfXJldHVybiBlLmpvaW4oUGMpfTt1LnByb3RvdHlwZS5zPWZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UobWIsZnVuY3Rpb24oYSxjLGQpey0xPGQuaW5kZXhPZihcIitcIik/ZD1kLnJlcGxhY2UoL1xcKy9nLFwiX19fXCIpOi0xPGQuaW5kZXhPZihcIl9fX1wiKSYmKGQ9ZC5yZXBsYWNlKC9fX18vZyxcIitcIikpO3JldHVyblwiOlwiK2MrXCIoXCIrXG5kK1wiKVwifSl9O3UucHJvdG90eXBlLmc9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMsZT0hMTthPWEudHJpbSgpO3ZhciBmPW1iLnRlc3QoYSk7ZiYmKGE9YS5yZXBsYWNlKG1iLGZ1bmN0aW9uKGEsYixjKXtyZXR1cm5cIjpcIitiK1wiKFwiK2MucmVwbGFjZSgvXFxzL2csXCJcIikrXCIpXCJ9KSxhPXRoaXMucyhhKSk7YT1hLnJlcGxhY2Uoa2UsbmIrXCIgJDFcIik7YT1hLnJlcGxhY2UobGUsZnVuY3Rpb24oYSxmLGcpe2V8fChhPWQuQihnLGYsYixjKSxlPWV8fGEuc3RvcCxmPWEuWGEsZz1hLnZhbHVlKTtyZXR1cm4gZitnfSk7ZiYmKGE9dGhpcy5zKGEpKTtyZXR1cm4gYX07dS5wcm90b3R5cGUuQj1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1hLmluZGV4T2Yob2IpOzA8PWEuaW5kZXhPZihuYik/YT10aGlzLkYoYSxkKTowIT09ZSYmKGE9Yz90aGlzLm8oYSxjKTphKTtjPSExOzA8PWUmJihiPVwiXCIsYz0hMCk7aWYoYyl7dmFyIGY9ITA7YyYmKGE9YS5yZXBsYWNlKG1lLGZ1bmN0aW9uKGEsYil7cmV0dXJuXCIgPiBcIitcbmJ9KSl9YT1hLnJlcGxhY2UobmUsZnVuY3Rpb24oYSxiLGMpe3JldHVybidbZGlyPVwiJytjKydcIl0gJytiK1wiLCBcIitiKydbZGlyPVwiJytjKydcIl0nfSk7cmV0dXJue3ZhbHVlOmEsWGE6YixzdG9wOmZ9fTt1LnByb3RvdHlwZS5vPWZ1bmN0aW9uKGEsYil7YT1hLnNwbGl0KFFjKTthWzBdKz1iO3JldHVybiBhLmpvaW4oUWMpfTt1LnByb3RvdHlwZS5GPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5tYXRjaChSYyk7cmV0dXJuKGM9YyYmY1syXS50cmltKCl8fFwiXCIpP2NbMF0ubWF0Y2goU2MpP2EucmVwbGFjZShSYyxmdW5jdGlvbihhLGMsZil7cmV0dXJuIGIrZn0pOmMuc3BsaXQoU2MpWzBdPT09Yj9jOm9lOmEucmVwbGFjZShuYixiKX07dS5wcm90b3R5cGUuSD1mdW5jdGlvbihhKXthLnNlbGVjdG9yPWEucGFyc2VkU2VsZWN0b3I7dGhpcy53KGEpO3RoaXMubChhLHRoaXMuSyl9O3UucHJvdG90eXBlLnc9ZnVuY3Rpb24oYSl7YS5zZWxlY3Rvcj09PXBlJiYoYS5zZWxlY3Rvcj1cImh0bWxcIil9O1xudS5wcm90b3R5cGUuSz1mdW5jdGlvbihhKXtyZXR1cm4gYS5tYXRjaChvYik/dGhpcy5nKGEsVGMpOnRoaXMubyhhLnRyaW0oKSxUYyl9O0ouT2JqZWN0LmRlZmluZVByb3BlcnRpZXModS5wcm90b3R5cGUse2E6e2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVyblwic3R5bGUtc2NvcGVcIn19fSk7dmFyIG1iPS86KG50aFstXFx3XSspXFwoKFteKV0rKVxcKS8sVGM9XCI6bm90KC5zdHlsZS1zY29wZSlcIixQYz1cIixcIixsZT0vKF58W1xccz4rfl0rKSgoPzpcXFsuKz9cXF18W15cXHM+K349W10pKykvZyxTYz0vW1suOiMqXS8sbmI9XCI6aG9zdFwiLHBlPVwiOnJvb3RcIixvYj1cIjo6c2xvdHRlZFwiLGtlPW5ldyBSZWdFeHAoXCJeKFwiK29iK1wiKVwiKSxSYz0vKDpob3N0KSg/OlxcKCgoPzpcXChbXikoXSpcXCl8W14pKF0qKSs/KVxcKSkvLG1lPS8oPzo6OnNsb3R0ZWQpKD86XFwoKCg/OlxcKFteKShdKlxcKXxbXikoXSopKz8pXFwpKS8sbmU9LyguKik6ZGlyXFwoKD86KGx0cnxydGwpKVxcKS8sXG5qZT1cIi5cIixRYz1cIjpcIixpZT1cImNsYXNzXCIsb2U9XCJzaG91bGRfbm90X21hdGNoXCIscD1uZXcgdTt2LmdldD1mdW5jdGlvbihhKXtyZXR1cm4gYT9hLl9fc3R5bGVJbmZvOm51bGx9O3Yuc2V0PWZ1bmN0aW9uKGEsYil7cmV0dXJuIGEuX19zdHlsZUluZm89Yn07di5wcm90b3R5cGUuYz1mdW5jdGlvbigpe3JldHVybiB0aGlzLkR9O3YucHJvdG90eXBlLl9nZXRTdHlsZVJ1bGVzPXYucHJvdG90eXBlLmM7dmFyIFVjPWZ1bmN0aW9uKGEpe3JldHVybiBhLm1hdGNoZXN8fGEubWF0Y2hlc1NlbGVjdG9yfHxhLm1vek1hdGNoZXNTZWxlY3Rvcnx8YS5tc01hdGNoZXNTZWxlY3Rvcnx8YS5vTWF0Y2hlc1NlbGVjdG9yfHxhLndlYmtpdE1hdGNoZXNTZWxlY3Rvcn0od2luZG93LkVsZW1lbnQucHJvdG90eXBlKSxxZT1uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKFwiVHJpZGVudFwiKTtuLnByb3RvdHlwZS5IPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsYz17fSxkPVtdLGU9MDtXKGEsZnVuY3Rpb24oYSl7Yi5jKGEpO1xuYS5pbmRleD1lKys7Yi5HKGEudS5jc3NUZXh0LGMpfSxmdW5jdGlvbihhKXtkLnB1c2goYSl9KTthLmI9ZDthPVtdO2Zvcih2YXIgZiBpbiBjKWEucHVzaChmKTtyZXR1cm4gYX07bi5wcm90b3R5cGUuYz1mdW5jdGlvbihhKXtpZighYS51KXt2YXIgYj17fSxjPXt9O3RoaXMuYihhLGMpJiYoYi5DPWMsYS5ydWxlcz1udWxsKTtiLmNzc1RleHQ9dGhpcy5GKGEpO2EudT1ifX07bi5wcm90b3R5cGUuYj1mdW5jdGlvbihhLGIpe3ZhciBjPWEudTtpZihjKXtpZihjLkMpcmV0dXJuIE9iamVjdC5hc3NpZ24oYixjLkMpLCEwfWVsc2V7Yz1hLnBhcnNlZENzc1RleHQ7Zm9yKHZhciBkO2E9dWEuZXhlYyhjKTspe2Q9KGFbMl18fGFbM10pLnRyaW0oKTtpZihcImluaGVyaXRcIiE9PWR8fFwidW5zZXRcIiE9PWQpYlthWzFdLnRyaW0oKV09ZDtkPSEwfXJldHVybiBkfX07bi5wcm90b3R5cGUuRj1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5LKGEucGFyc2VkQ3NzVGV4dCl9O24ucHJvdG90eXBlLks9ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZShoZSxcblwiXCIpLnJlcGxhY2UodWEsXCJcIil9O24ucHJvdG90eXBlLkc9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM7Yz1mZS5leGVjKGEpOyl7dmFyIGQ9Y1sxXTtcIjpcIiE9PWNbMl0mJihiW2RdPSEwKX19O24ucHJvdG90eXBlLmFhPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhKSxjPTAsZDtjPGIubGVuZ3RoO2MrKylkPWJbY10sYVtkXT10aGlzLmEoYVtkXSxhKX07bi5wcm90b3R5cGUuYT1mdW5jdGlvbihhLGIpe2lmKGEpaWYoMDw9YS5pbmRleE9mKFwiO1wiKSlhPXRoaXMuZihhLGIpO2Vsc2V7dmFyIGM9dGhpczthPUljKGEsZnVuY3Rpb24oYSxlLGYsZyl7aWYoIWUpcmV0dXJuIGErZzsoZT1jLmEoYltlXSxiKSkmJlwiaW5pdGlhbFwiIT09ZT9cImFwcGx5LXNoaW0taW5oZXJpdFwiPT09ZSYmKGU9XCJpbmhlcml0XCIpOmU9Yy5hKGJbZl18fGYsYil8fGY7cmV0dXJuIGErKGV8fFwiXCIpK2d9KX1yZXR1cm4gYSYmYS50cmltKCl8fFwiXCJ9O24ucHJvdG90eXBlLmY9ZnVuY3Rpb24oYSxcbmIpe2E9YS5zcGxpdChcIjtcIik7Zm9yKHZhciBjPTAsZCxlO2M8YS5sZW5ndGg7YysrKWlmKGQ9YVtjXSl7dmEubGFzdEluZGV4PTA7aWYoZT12YS5leGVjKGQpKWQ9dGhpcy5hKGJbZVsxXV0sYik7ZWxzZSBpZihlPWQuaW5kZXhPZihcIjpcIiksLTEhPT1lKXt2YXIgZj1kLnN1YnN0cmluZyhlKTtmPWYudHJpbSgpO2Y9dGhpcy5hKGYsYil8fGY7ZD1kLnN1YnN0cmluZygwLGUpK2Z9YVtjXT1kJiZkLmxhc3RJbmRleE9mKFwiO1wiKT09PWQubGVuZ3RoLTE/ZC5zbGljZSgwLC0xKTpkfHxcIlwifXJldHVybiBhLmpvaW4oXCI7XCIpfTtuLnByb3RvdHlwZS5CPWZ1bmN0aW9uKGEsYil7dmFyIGM9XCJcIjthLnV8fHRoaXMuYyhhKTthLnUuY3NzVGV4dCYmKGM9dGhpcy5mKGEudS5jc3NUZXh0LGIpKTthLmNzc1RleHQ9Y307bi5wcm90b3R5cGUudz1mdW5jdGlvbihhLGIpe3ZhciBjPWEuY3NzVGV4dCxkPWEuY3NzVGV4dDtudWxsPT1hLnlhJiYoYS55YT1nZS50ZXN0KGMpKTtpZihhLnlhKWlmKG51bGw9PVxuYS5ZKXthLlk9W107Zm9yKHZhciBlIGluIGIpZD1iW2VdLGQ9ZChjKSxjIT09ZCYmKGM9ZCxhLlkucHVzaChlKSl9ZWxzZXtmb3IoZT0wO2U8YS5ZLmxlbmd0aDsrK2UpZD1iW2EuWVtlXV0sYz1kKGMpO2Q9Y31hLmNzc1RleHQ9ZH07bi5wcm90b3R5cGUuTz1mdW5jdGlvbihhLGIpe3ZhciBjPXt9LGQ9dGhpcyxlPVtdO1coYSxmdW5jdGlvbihhKXthLnV8fGQuYyhhKTt2YXIgZj1hLnZ8fGEucGFyc2VkU2VsZWN0b3I7YiYmYS51LkMmJmYmJlVjLmNhbGwoYixmKSYmKGQuYihhLGMpLGE9YS5pbmRleCxmPXBhcnNlSW50KGEvMzIsMTApLGVbZl09KGVbZl18fDApfDE8PGElMzIpfSxudWxsLCEwKTtyZXR1cm57QzpjLGtleTplfX07bi5wcm90b3R5cGUuY2E9ZnVuY3Rpb24oYSxiLGMsZCl7Yi51fHx0aGlzLmMoYik7aWYoYi51LkMpe3ZhciBlPVIoYSk7YT1lLmlzO2U9ZS5WO2U9YT9wLmYoYSxlKTpcImh0bWxcIjt2YXIgZj1iLnBhcnNlZFNlbGVjdG9yLGc9XCI6aG9zdCA+ICpcIj09PWZ8fFxuXCJodG1sXCI9PT1mLGg9MD09PWYuaW5kZXhPZihcIjpob3N0XCIpJiYhZztcInNoYWR5XCI9PT1jJiYoZz1mPT09ZStcIiA+ICouXCIrZXx8LTEhPT1mLmluZGV4T2YoXCJodG1sXCIpLGg9IWcmJjA9PT1mLmluZGV4T2YoZSkpO1wic2hhZG93XCI9PT1jJiYoZz1cIjpob3N0ID4gKlwiPT09Znx8XCJodG1sXCI9PT1mLGg9aCYmIWcpO2lmKGd8fGgpYz1lLGgmJih6JiYhYi52JiYoYi52PXAubShiLHAuZyxwLmkoYSksZSkpLGM9Yi52fHxlKSxkKHtpYjpjLGJiOmgscWI6Z30pfX07bi5wcm90b3R5cGUuST1mdW5jdGlvbihhLGIpe3ZhciBjPXt9LGQ9e30sZT10aGlzLGY9YiYmYi5fX2Nzc0J1aWxkO1coYixmdW5jdGlvbihiKXtlLmNhKGEsYixmLGZ1bmN0aW9uKGYpe1VjLmNhbGwoYS5wYnx8YSxmLmliKSYmKGYuYmI/ZS5iKGIsYyk6ZS5iKGIsZCkpfSl9LG51bGwsITApO3JldHVybntnYjpkLGFiOmN9fTtuLnByb3RvdHlwZS5iYT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcyxlPVIoYSksZj1wLmYoZS5pcyxcbmUuViksZz1uZXcgUmVnRXhwKFwiKD86XnxbXi4jWzpdKVwiKyhhLmV4dGVuZHM/XCJcXFxcXCIrZi5zbGljZSgwLC0xKStcIlxcXFxdXCI6ZikrXCIoJHxbLjpbXFxcXHM+K35dKVwiKTtlPXYuZ2V0KGEpLkQ7dmFyIGg9dGhpcy5oKGUsYyk7cmV0dXJuIHAuYyhhLGUsZnVuY3Rpb24oYSl7ZC5CKGEsYik7enx8R2MoYSl8fCFhLmNzc1RleHR8fChkLncoYSxoKSxkLmwoYSxnLGYsYykpfSl9O24ucHJvdG90eXBlLmg9ZnVuY3Rpb24oYSxiKXthPWEuYjt2YXIgYz17fTtpZigheiYmYSlmb3IodmFyIGQ9MCxlPWFbZF07ZDxhLmxlbmd0aDtlPWFbKytkXSl0aGlzLmooZSxiKSxjW2Uua2V5ZnJhbWVzTmFtZV09dGhpcy5pKGUpO3JldHVybiBjfTtuLnByb3RvdHlwZS5pPWZ1bmN0aW9uKGEpe3JldHVybiBmdW5jdGlvbihiKXtyZXR1cm4gYi5yZXBsYWNlKGEuZixhLmEpfX07bi5wcm90b3R5cGUuaj1mdW5jdGlvbihhLGIpe2EuZj1uZXcgUmVnRXhwKGEua2V5ZnJhbWVzTmFtZSxcImdcIik7YS5hPWEua2V5ZnJhbWVzTmFtZStcblwiLVwiK2I7YS52PWEudnx8YS5zZWxlY3RvcjthLnNlbGVjdG9yPWEudi5yZXBsYWNlKGEua2V5ZnJhbWVzTmFtZSxhLmEpfTtuLnByb3RvdHlwZS5sPWZ1bmN0aW9uKGEsYixjLGQpe2Eudj1hLnZ8fGEuc2VsZWN0b3I7ZD1cIi5cIitkO2Zvcih2YXIgZT1hLnYuc3BsaXQoXCIsXCIpLGY9MCxnPWUubGVuZ3RoLGg7ZjxnJiYoaD1lW2ZdKTtmKyspZVtmXT1oLm1hdGNoKGIpP2gucmVwbGFjZShjLGQpOmQrXCIgXCIraDthLnNlbGVjdG9yPWUuam9pbihcIixcIil9O24ucHJvdG90eXBlLm89ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWEuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCIsZT1kO2MmJihlPWQucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXHMqeC1zY29wZVxcXFxzKlwiK2MrXCJcXFxccypcIixcImdcIiksXCIgXCIpKTtlKz0oZT9cIiBcIjpcIlwiKStcIngtc2NvcGUgXCIrYjtkIT09ZSYmcWEoYSxlKX07bi5wcm90b3R5cGUucz1mdW5jdGlvbihhLGIsYyxkKXtiPWQ/ZC50ZXh0Q29udGVudHx8XCJcIjp0aGlzLmJhKGEsYixjKTt2YXIgZT1cbnYuZ2V0KGEpLGY9ZS5hO2YmJiF6JiZmIT09ZCYmKGYuX3VzZUNvdW50LS0sMD49Zi5fdXNlQ291bnQmJmYucGFyZW50Tm9kZSYmZi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGYpKTt6P2UuYT8oZS5hLnRleHRDb250ZW50PWIsZD1lLmEpOmImJihkPWViKGIsYyxhLnNoYWRvd1Jvb3QsZS5iKSk6ZD9kLnBhcmVudE5vZGV8fChxZSYmLTE8Yi5pbmRleE9mKFwiQG1lZGlhXCIpJiYoZC50ZXh0Q29udGVudD1iKSxIYyhkLG51bGwsZS5iKSk6YiYmKGQ9ZWIoYixjLG51bGwsZS5iKSk7ZCYmKGQuX3VzZUNvdW50PWQuX3VzZUNvdW50fHwwLGUuYSE9ZCYmZC5fdXNlQ291bnQrKyxlLmE9ZCk7cmV0dXJuIGR9O24ucHJvdG90eXBlLm09ZnVuY3Rpb24oYSxiKXt2YXIgYz1wYShhKSxkPXRoaXM7YS50ZXh0Q29udGVudD1WKGMsZnVuY3Rpb24oYSl7dmFyIGM9YS5jc3NUZXh0PWEucGFyc2VkQ3NzVGV4dDthLnUmJmEudS5jc3NUZXh0JiYoYz1jLnJlcGxhY2UoRi53YSxcIlwiKS5yZXBsYWNlKEYuQWEsXG5cIlwiKSxhLmNzc1RleHQ9ZC5mKGMsYikpfSl9O0ouT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobi5wcm90b3R5cGUse2c6e2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVyblwieC1zY29wZVwifX19KTt2YXIgTT1uZXcgbixwYj17fSx3YT13aW5kb3cuY3VzdG9tRWxlbWVudHM7aWYod2EmJiF6KXt2YXIgcmU9d2EuZGVmaW5lO3dhLmRlZmluZT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9ZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIiBTaGFkeSBET00gc3R5bGVzIGZvciBcIithK1wiIFwiKSxlPWRvY3VtZW50LmhlYWQ7ZS5pbnNlcnRCZWZvcmUoZCwoUT9RLm5leHRTaWJsaW5nOm51bGwpfHxlLmZpcnN0Q2hpbGQpO1E9ZDtwYlthXT1kO3JldHVybiByZS5jYWxsKHdhLGEsYixjKX19aGEucHJvdG90eXBlLmE9ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD0wO2Q8Yy5sZW5ndGg7ZCsrKXt2YXIgZT1jW2RdO2lmKGEuQ1tlXSE9PWJbZV0pcmV0dXJuITF9cmV0dXJuITB9O1xuaGEucHJvdG90eXBlLmI9ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9dGhpcy5jYWNoZVthXXx8W107ZS5wdXNoKHtDOmIsc3R5bGVFbGVtZW50OmMsQTpkfSk7ZS5sZW5ndGg+dGhpcy5jJiZlLnNoaWZ0KCk7dGhpcy5jYWNoZVthXT1lfTtoYS5wcm90b3R5cGUuZmV0Y2g9ZnVuY3Rpb24oYSxiLGMpe2lmKGE9dGhpcy5jYWNoZVthXSlmb3IodmFyIGQ9YS5sZW5ndGgtMTswPD1kO2QtLSl7dmFyIGU9YVtkXTtpZih0aGlzLmEoZSxiLGMpKXJldHVybiBlfX07aWYoIXope3ZhciBWYz1uZXcgTXV0YXRpb25PYnNlcnZlcihKYyksV2M9ZnVuY3Rpb24oYSl7VmMub2JzZXJ2ZShhLHtjaGlsZExpc3Q6ITAsc3VidHJlZTohMH0pfTtpZih3aW5kb3cuY3VzdG9tRWxlbWVudHMmJiF3aW5kb3cuY3VzdG9tRWxlbWVudHMucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjaylXYyhkb2N1bWVudCk7ZWxzZXt2YXIgcWI9ZnVuY3Rpb24oKXtXYyhkb2N1bWVudC5ib2R5KX07d2luZG93LkhUTUxJbXBvcnRzP1xud2luZG93LkhUTUxJbXBvcnRzLndoZW5SZWFkeShxYik6cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7aWYoXCJsb2FkaW5nXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlKXt2YXIgYT1mdW5jdGlvbigpe3FiKCk7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixhKX07ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixhKX1lbHNlIHFiKCl9KX1OPWZ1bmN0aW9uKCl7SmMoVmMudGFrZVJlY29yZHMoKSl9fXZhciByYT17fSxVZD1Qcm9taXNlLnJlc29sdmUoKSxmYj1udWxsLExjPXdpbmRvdy5IVE1MSW1wb3J0cyYmd2luZG93LkhUTUxJbXBvcnRzLndoZW5SZWFkeXx8bnVsbCxnYix4YT1udWxsLGZhPW51bGw7cS5wcm90b3R5cGUueGE9ZnVuY3Rpb24oKXshdGhpcy5lbnF1ZXVlZCYmZmEmJih0aGlzLmVucXVldWVkPSEwLHViKGZhKSl9O3EucHJvdG90eXBlLmI9ZnVuY3Rpb24oYSl7YS5fX3NlZW5CeVNoYWR5Q1NTfHxcbihhLl9fc2VlbkJ5U2hhZHlDU1M9ITAsdGhpcy5jdXN0b21TdHlsZXMucHVzaChhKSx0aGlzLnhhKCkpfTtxLnByb3RvdHlwZS5hPWZ1bmN0aW9uKGEpe3JldHVybiBhLl9fc2hhZHlDU1NDYWNoZWRTdHlsZT9hLl9fc2hhZHlDU1NDYWNoZWRTdHlsZTphLmdldFN0eWxlP2EuZ2V0U3R5bGUoKTphfTtxLnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuY3VzdG9tU3R5bGVzLGI9MDtiPGEubGVuZ3RoO2IrKyl7dmFyIGM9YVtiXTtpZighYy5fX3NoYWR5Q1NTQ2FjaGVkU3R5bGUpe3ZhciBkPXRoaXMuYShjKTtkJiYoZD1kLl9fYXBwbGllZEVsZW1lbnR8fGQseGEmJnhhKGQpLGMuX19zaGFkeUNTU0NhY2hlZFN0eWxlPWQpfX1yZXR1cm4gYX07cS5wcm90b3R5cGUuYWRkQ3VzdG9tU3R5bGU9cS5wcm90b3R5cGUuYjtxLnByb3RvdHlwZS5nZXRTdHlsZUZvckN1c3RvbVN0eWxlPXEucHJvdG90eXBlLmE7cS5wcm90b3R5cGUucHJvY2Vzc1N0eWxlcz1xLnByb3RvdHlwZS5jO1xuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocS5wcm90b3R5cGUse3RyYW5zZm9ybUNhbGxiYWNrOntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4geGF9LHNldDpmdW5jdGlvbihhKXt4YT1hfX0sdmFsaWRhdGVDYWxsYmFjazp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGZhfSxzZXQ6ZnVuY3Rpb24oYSl7dmFyIGI9ITE7ZmF8fChiPSEwKTtmYT1hO2ImJnRoaXMueGEoKX19fSk7dmFyIFhjPW5ldyBoYTtnLnByb3RvdHlwZS53PWZ1bmN0aW9uKCl7TigpfTtnLnByb3RvdHlwZS5JPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMubVthXT0odGhpcy5tW2FdfHwwKSsxO3JldHVybiBhK1wiLVwiK2J9O2cucHJvdG90eXBlLkhhPWZ1bmN0aW9uKGEpe3JldHVybiBwYShhKX07Zy5wcm90b3R5cGUuSmE9ZnVuY3Rpb24oYSl7cmV0dXJuIFYoYSl9O2cucHJvdG90eXBlLkg9ZnVuY3Rpb24oYSl7YT1hLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbChcInN0eWxlXCIpO2Zvcih2YXIgYj1bXSxjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPVxuYVtjXTtiLnB1c2goZC50ZXh0Q29udGVudCk7ZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGQpfXJldHVybiBiLmpvaW4oXCJcIikudHJpbSgpfTtnLnByb3RvdHlwZS5hYT1mdW5jdGlvbihhKXtyZXR1cm4oYT1hLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcInN0eWxlXCIpKT9hLmdldEF0dHJpYnV0ZShcImNzcy1idWlsZFwiKXx8XCJcIjpcIlwifTtnLnByb3RvdHlwZS5wcmVwYXJlVGVtcGxhdGU9ZnVuY3Rpb24oYSxiLGMpe2lmKCFhLmYpe2EuZj0hMDthLm5hbWU9YjthLmV4dGVuZHM9YztyYVtiXT1hO3ZhciBkPXRoaXMuYWEoYSksZT10aGlzLkgoYSk7Yz17aXM6YixleHRlbmRzOmMsbWI6ZH07enx8cC5iKGEuY29udGVudCxiKTt0aGlzLmMoKTt2YXIgZj12YS50ZXN0KGUpfHx1YS50ZXN0KGUpO3ZhLmxhc3RJbmRleD0wO3VhLmxhc3RJbmRleD0wO2U9ZGIoZSk7ZiYmQSYmdGhpcy5hJiZ0aGlzLmEudHJhbnNmb3JtUnVsZXMoZSxiKTthLl9zdHlsZUFzdD1lO2EuZz1kO2Q9W107QXx8KGQ9TS5IKGEuX3N0eWxlQXN0KSk7XG5pZighZC5sZW5ndGh8fEEpYj10aGlzLk8oYyxhLl9zdHlsZUFzdCx6P2EuY29udGVudDpudWxsLHBiW2JdKSxhLmE9YjthLmM9ZH19O2cucHJvdG90eXBlLk89ZnVuY3Rpb24oYSxiLGMsZCl7Yj1wLmMoYSxiKTtpZihiLmxlbmd0aClyZXR1cm4gZWIoYixhLmlzLGMsZCl9O2cucHJvdG90eXBlLmNhPWZ1bmN0aW9uKGEpe3ZhciBiPVIoYSksYz1iLmlzO2I9Yi5WO3ZhciBkPXBiW2NdO2M9cmFbY107aWYoYyl7dmFyIGU9Yy5fc3R5bGVBc3Q7dmFyIGY9Yy5jfXJldHVybiB2LnNldChhLG5ldyB2KGUsZCxmLDAsYikpfTtnLnByb3RvdHlwZS5GPWZ1bmN0aW9uKCl7IXRoaXMuYSYmd2luZG93LlNoYWR5Q1NTJiZ3aW5kb3cuU2hhZHlDU1MuQXBwbHlTaGltJiYodGhpcy5hPXdpbmRvdy5TaGFkeUNTUy5BcHBseVNoaW0sdGhpcy5hLmludmFsaWRDYWxsYmFjaz1TZCl9O2cucHJvdG90eXBlLkc9ZnVuY3Rpb24oKXt2YXIgYT10aGlzOyF0aGlzLmImJndpbmRvdy5TaGFkeUNTUyYmd2luZG93LlNoYWR5Q1NTLkN1c3RvbVN0eWxlSW50ZXJmYWNlJiZcbih0aGlzLmI9d2luZG93LlNoYWR5Q1NTLkN1c3RvbVN0eWxlSW50ZXJmYWNlLHRoaXMuYi50cmFuc2Zvcm1DYWxsYmFjaz1mdW5jdGlvbihiKXthLnMoYil9LHRoaXMuYi52YWxpZGF0ZUNhbGxiYWNrPWZ1bmN0aW9uKCl7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7KGEuYi5lbnF1ZXVlZHx8YS5pKSYmYS5mKCl9KX0pfTtnLnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7dGhpcy5GKCk7dGhpcy5HKCl9O2cucHJvdG90eXBlLmY9ZnVuY3Rpb24oKXt0aGlzLmMoKTtpZih0aGlzLmIpe3ZhciBhPXRoaXMuYi5wcm9jZXNzU3R5bGVzKCk7dGhpcy5iLmVucXVldWVkJiYoQT90aGlzLkZhKGEpOih0aGlzLm8odGhpcy5nLHRoaXMuaCksdGhpcy5CKGEpKSx0aGlzLmIuZW5xdWV1ZWQ9ITEsdGhpcy5pJiYhQSYmdGhpcy5zdHlsZURvY3VtZW50KCkpfX07Zy5wcm90b3R5cGUuc3R5bGVFbGVtZW50PWZ1bmN0aW9uKGEsYil7dmFyIGM9UihhKS5pcyxkPXYuZ2V0KGEpO2R8fChkPXRoaXMuY2EoYSkpO1xudGhpcy5qKGEpfHwodGhpcy5pPSEwKTtiJiYoZC5OPWQuTnx8e30sT2JqZWN0LmFzc2lnbihkLk4sYikpO2lmKEEpe2lmKGQuTil7Yj1kLk47Zm9yKHZhciBlIGluIGIpbnVsbD09PWU/YS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShlKTphLnN0eWxlLnNldFByb3BlcnR5KGUsYltlXSl9aWYoKChlPXJhW2NdKXx8dGhpcy5qKGEpKSYmZSYmZS5hJiYhS2MoZSkpe2lmKEtjKGUpfHxlLl9hcHBseVNoaW1WYWxpZGF0aW5nVmVyc2lvbiE9PWUuX2FwcGx5U2hpbU5leHRWZXJzaW9uKXRoaXMuYygpLHRoaXMuYSYmdGhpcy5hLnRyYW5zZm9ybVJ1bGVzKGUuX3N0eWxlQXN0LGMpLGUuYS50ZXh0Q29udGVudD1wLmMoYSxkLkQpLFRkKGUpO3omJihjPWEuc2hhZG93Um9vdCkmJihjLnF1ZXJ5U2VsZWN0b3IoXCJzdHlsZVwiKS50ZXh0Q29udGVudD1wLmMoYSxkLkQpKTtkLkQ9ZS5fc3R5bGVBc3R9fWVsc2UgdGhpcy5vKGEsZCksZC5sYSYmZC5sYS5sZW5ndGgmJnRoaXMuSyhhLGQpfTtnLnByb3RvdHlwZS5sPVxuZnVuY3Rpb24oYSl7cmV0dXJuKGE9YS5nZXRSb290Tm9kZSgpLmhvc3QpP3YuZ2V0KGEpP2E6dGhpcy5sKGEpOnRoaXMuZ307Zy5wcm90b3R5cGUuaj1mdW5jdGlvbihhKXtyZXR1cm4gYT09PXRoaXMuZ307Zy5wcm90b3R5cGUuSz1mdW5jdGlvbihhLGIpe3ZhciBjPVIoYSkuaXMsZD1YYy5mZXRjaChjLGIuSixiLmxhKSxlPWQ/ZC5zdHlsZUVsZW1lbnQ6bnVsbCxmPWIuQTtiLkE9ZCYmZC5BfHx0aGlzLkkoYyk7ZT1NLnMoYSxiLkosYi5BLGUpO3p8fE0ubyhhLGIuQSxmKTtkfHxYYy5iKGMsYi5KLGUsYi5BKX07Zy5wcm90b3R5cGUubz1mdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMubChhKSxkPXYuZ2V0KGMpO2M9T2JqZWN0LmNyZWF0ZShkLkp8fG51bGwpO3ZhciBlPU0uSShhLGIuRCk7YT1NLk8oZC5ELGEpLkM7T2JqZWN0LmFzc2lnbihjLGUuYWIsYSxlLmdiKTt0aGlzLmJhKGMsYi5OKTtNLmFhKGMpO2IuSj1jfTtnLnByb3RvdHlwZS5iYT1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYyBpbiBiKXt2YXIgZD1cbmJbY107aWYoZHx8MD09PWQpYVtjXT1kfX07Zy5wcm90b3R5cGUuc3R5bGVEb2N1bWVudD1mdW5jdGlvbihhKXt0aGlzLnN0eWxlU3VidHJlZSh0aGlzLmcsYSl9O2cucHJvdG90eXBlLnN0eWxlU3VidHJlZT1mdW5jdGlvbihhLGIpe3ZhciBjPWEuc2hhZG93Um9vdDsoY3x8dGhpcy5qKGEpKSYmdGhpcy5zdHlsZUVsZW1lbnQoYSxiKTtpZihiPWMmJihjLmNoaWxkcmVufHxjLmNoaWxkTm9kZXMpKWZvcihhPTA7YTxiLmxlbmd0aDthKyspdGhpcy5zdHlsZVN1YnRyZWUoYlthXSk7ZWxzZSBpZihhPWEuY2hpbGRyZW58fGEuY2hpbGROb2Rlcylmb3IoYj0wO2I8YS5sZW5ndGg7YisrKXRoaXMuc3R5bGVTdWJ0cmVlKGFbYl0pfTtnLnByb3RvdHlwZS5GYT1mdW5jdGlvbihhKXtmb3IodmFyIGI9MDtiPGEubGVuZ3RoO2IrKyl7dmFyIGM9dGhpcy5iLmdldFN0eWxlRm9yQ3VzdG9tU3R5bGUoYVtiXSk7YyYmdGhpcy5FYShjKX19O2cucHJvdG90eXBlLkI9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVxuMDtiPGEubGVuZ3RoO2IrKyl7dmFyIGM9dGhpcy5iLmdldFN0eWxlRm9yQ3VzdG9tU3R5bGUoYVtiXSk7YyYmTS5tKGMsdGhpcy5oLkopfX07Zy5wcm90b3R5cGUucz1mdW5jdGlvbihhKXt2YXIgYj10aGlzLGM9cGEoYSk7VyhjLGZ1bmN0aW9uKGEpe3o/cC53KGEpOnAuSChhKTtBJiYoYi5jKCksYi5hJiZiLmEudHJhbnNmb3JtUnVsZShhKSl9KTtBP2EudGV4dENvbnRlbnQ9VihjKTp0aGlzLmguRC5ydWxlcy5wdXNoKGMpfTtnLnByb3RvdHlwZS5FYT1mdW5jdGlvbihhKXtpZihBJiZ0aGlzLmEpe3ZhciBiPXBhKGEpO3RoaXMuYygpO3RoaXMuYS50cmFuc2Zvcm1SdWxlcyhiKTthLnRleHRDb250ZW50PVYoYil9fTtnLnByb3RvdHlwZS5nZXRDb21wdXRlZFN0eWxlVmFsdWU9ZnVuY3Rpb24oYSxiKXt2YXIgYztBfHwoYz0odi5nZXQoYSl8fHYuZ2V0KHRoaXMubChhKSkpLkpbYl0pO3JldHVybihjPWN8fHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGEpLmdldFByb3BlcnR5VmFsdWUoYikpP1xuYy50cmltKCk6XCJcIn07Zy5wcm90b3R5cGUuSWE9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLmdldFJvb3ROb2RlKCk7Yj1iP2Iuc3BsaXQoL1xccy8pOltdO2M9Yy5ob3N0JiZjLmhvc3QubG9jYWxOYW1lO2lmKCFjKXt2YXIgZD1hLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpO2lmKGQpe2Q9ZC5zcGxpdCgvXFxzLyk7Zm9yKHZhciBlPTA7ZTxkLmxlbmd0aDtlKyspaWYoZFtlXT09PXAuYSl7Yz1kW2UrMV07YnJlYWt9fX1jJiZiLnB1c2gocC5hLGMpO0F8fChjPXYuZ2V0KGEpKSYmYy5BJiZiLnB1c2goTS5nLGMuQSk7cWEoYSxiLmpvaW4oXCIgXCIpKX07Zy5wcm90b3R5cGUuR2E9ZnVuY3Rpb24oYSl7cmV0dXJuIHYuZ2V0KGEpfTtnLnByb3RvdHlwZS5mbHVzaD1nLnByb3RvdHlwZS53O2cucHJvdG90eXBlLnByZXBhcmVUZW1wbGF0ZT1nLnByb3RvdHlwZS5wcmVwYXJlVGVtcGxhdGU7Zy5wcm90b3R5cGUuc3R5bGVFbGVtZW50PWcucHJvdG90eXBlLnN0eWxlRWxlbWVudDtnLnByb3RvdHlwZS5zdHlsZURvY3VtZW50PVxuZy5wcm90b3R5cGUuc3R5bGVEb2N1bWVudDtnLnByb3RvdHlwZS5zdHlsZVN1YnRyZWU9Zy5wcm90b3R5cGUuc3R5bGVTdWJ0cmVlO2cucHJvdG90eXBlLmdldENvbXB1dGVkU3R5bGVWYWx1ZT1nLnByb3RvdHlwZS5nZXRDb21wdXRlZFN0eWxlVmFsdWU7Zy5wcm90b3R5cGUuc2V0RWxlbWVudENsYXNzPWcucHJvdG90eXBlLklhO2cucHJvdG90eXBlLl9zdHlsZUluZm9Gb3JOb2RlPWcucHJvdG90eXBlLkdhO2cucHJvdG90eXBlLnRyYW5zZm9ybUN1c3RvbVN0eWxlRm9yRG9jdW1lbnQ9Zy5wcm90b3R5cGUucztnLnByb3RvdHlwZS5nZXRTdHlsZUFzdD1nLnByb3RvdHlwZS5IYTtnLnByb3RvdHlwZS5zdHlsZUFzdFRvU3RyaW5nPWcucHJvdG90eXBlLkphO2cucHJvdG90eXBlLmZsdXNoQ3VzdG9tU3R5bGVzPWcucHJvdG90eXBlLmY7T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZy5wcm90b3R5cGUse25hdGl2ZVNoYWRvdzp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHp9fSxuYXRpdmVDc3M6e2dldDpmdW5jdGlvbigpe3JldHVybiBBfX19KTtcbnZhciBIPW5ldyBnO2lmKHdpbmRvdy5TaGFkeUNTUyl7dmFyIFljPXdpbmRvdy5TaGFkeUNTUy5BcHBseVNoaW07dmFyIFpjPXdpbmRvdy5TaGFkeUNTUy5DdXN0b21TdHlsZUludGVyZmFjZX13aW5kb3cuU2hhZHlDU1M9e1Njb3BpbmdTaGltOkgscHJlcGFyZVRlbXBsYXRlOmZ1bmN0aW9uKGEsYixjKXtILmYoKTtILnByZXBhcmVUZW1wbGF0ZShhLGIsYyl9LHN0eWxlU3VidHJlZTpmdW5jdGlvbihhLGIpe0guZigpO0guc3R5bGVTdWJ0cmVlKGEsYil9LHN0eWxlRWxlbWVudDpmdW5jdGlvbihhKXtILmYoKTtILnN0eWxlRWxlbWVudChhKX0sc3R5bGVEb2N1bWVudDpmdW5jdGlvbihhKXtILmYoKTtILnN0eWxlRG9jdW1lbnQoYSl9LGdldENvbXB1dGVkU3R5bGVWYWx1ZTpmdW5jdGlvbihhLGIpe3JldHVybiBILmdldENvbXB1dGVkU3R5bGVWYWx1ZShhLGIpfSxuYXRpdmVDc3M6QSxuYXRpdmVTaGFkb3c6en07WWMmJih3aW5kb3cuU2hhZHlDU1MuQXBwbHlTaGltPVljKTtaYyYmKHdpbmRvdy5TaGFkeUNTUy5DdXN0b21TdHlsZUludGVyZmFjZT1cblpjKTt2YXIgcmI9d2luZG93LmN1c3RvbUVsZW1lbnRzLHlhPXdpbmRvdy5IVE1MSW1wb3J0czt3aW5kb3cuV2ViQ29tcG9uZW50cz13aW5kb3cuV2ViQ29tcG9uZW50c3x8e307aWYocmImJnJiLnBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2spe3ZhciB6YSwkYz1mdW5jdGlvbigpe2lmKHphKXt2YXIgYT16YTt6YT1udWxsO2EoKTtyZXR1cm4hMH19LGFkPXlhLndoZW5SZWFkeTtyYi5wb2x5ZmlsbFdyYXBGbHVzaENhbGxiYWNrKGZ1bmN0aW9uKGEpe3phPWE7YWQoJGMpfSk7eWEud2hlblJlYWR5PWZ1bmN0aW9uKGEpe2FkKGZ1bmN0aW9uKCl7JGMoKT95YS53aGVuUmVhZHkoYSk6YSgpfSl9fXlhLndoZW5SZWFkeShmdW5jdGlvbigpe3JlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe3dpbmRvdy5XZWJDb21wb25lbnRzLnJlYWR5PSEwO2RvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiV2ViQ29tcG9uZW50c1JlYWR5XCIse2J1YmJsZXM6ITB9KSl9KX0pO1xudmFyIGJkPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtiZC50ZXh0Q29udGVudD1cImJvZHkge3RyYW5zaXRpb246IG9wYWNpdHkgZWFzZS1pbiAwLjJzOyB9IFxcbmJvZHlbdW5yZXNvbHZlZF0ge29wYWNpdHk6IDA7IGRpc3BsYXk6IGJsb2NrOyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7IH0gXFxuXCI7dmFyIGNkPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkXCIpO2NkLmluc2VydEJlZm9yZShiZCxjZC5maXJzdENoaWxkKX0pKCk7fSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViY29tcG9uZW50cy1oaS1zZC1jZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0B3ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcy93ZWJjb21wb25lbnRzLWhpLXNkLWNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IExheWVyIH0gZnJvbSAnY29tbW9uL0xheWVyJztcclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IExFWCB9IGZyb20gJ0xFWCc7XHJcbmltcG9ydCB7IExpbmVSYXN0ZXJpemVyIH0gZnJvbSAnbGluZS1yYXN0ZXJpemVyL0xpbmVSYXN0ZXJpemVyJztcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdSZW5kZXJlcic7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5pbXBvcnQgeyBVSUNvbnRyb2xsZXIgfSBmcm9tICd1aS9VSUNvbnRyb2xsZXInO1xyXG5cclxuaW1wb3J0IHsgUmVuZGVyRXZlbnQgfSBmcm9tICdldmVudHMvUmVuZGVyRXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uIHtcclxuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgcHJpdmF0ZSB1aUNvbnRyb2xsZXI6IFVJQ29udHJvbGxlcjtcclxuICBwcml2YXRlIHN0YWdlOiBTdGFnZTtcclxuICBwcml2YXRlIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoeyBsaW5lUmFzdGVyaXplcjogbmV3IExpbmVSYXN0ZXJpemVyKCksIGNhbnZhczogdGhpcy5jYW52YXMgfSk7XHJcbiAgICB0aGlzLnN0YWdlID0gbmV3IFN0YWdlKCk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IG5ldyBFdmVudEFnZ3JlZ2F0b3IoKTtcclxuXHJcbiAgICB0aGlzLnVpQ29udHJvbGxlciA9IG5ldyBVSUNvbnRyb2xsZXIoe1xyXG4gICAgICByZW5kZXJlcjogdGhpcy5yZW5kZXJlcixcclxuICAgICAgc3RhZ2U6IHRoaXMuc3RhZ2UsXHJcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgY29uc3QgcG9seWdvbkxheWVyID0gbmV3IExheWVyKExFWC5QT0xZR09OX0xBWUVSX05BTUUpO1xyXG4gICAgdGhpcy5zdGFnZS5sYXllcnMucHVzaChwb2x5Z29uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMudWlDb250cm9sbGVyLmluaXQoKTtcclxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy51aUNvbnRyb2xsZXIuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW5kZXIoZXZlbnQ6IFJlbmRlckV2ZW50KSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmNsZWFyKCk7XHJcbiAgICB0aGlzLnN0YWdlLnJlbmRlcih0aGlzLnJlbmRlcmVyKTtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoUmVuZGVyRXZlbnQuZXZlbnRUeXBlLCB0aGlzLnJlbmRlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihSZW5kZXJFdmVudC5ldmVudFR5cGUsIHRoaXMucmVuZGVyKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvQXBwbGljYXRpb24udHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcbmltcG9ydCB7IEV2ZW50UXVldWUgfSBmcm9tICdldmVudHMvRXZlbnRRdWV1ZSc7XHJcblxyXG50eXBlIEV2ZW50TGlzdGVuZXIgPSAoZXZlbnQ6IEFwcEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50QWdncmVnYXRvciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBsaXN0ZW5lck1hcCA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudExpc3RlbmVyW10+KCk7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudFF1ZXVlID0gbmV3IEV2ZW50UXVldWUoKTtcclxuICBwcml2YXRlIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyKSB7XHJcbiAgICBjb25zdCBldmVudExpc3RlbmVycyA9IHRoaXMuZ2V0RXZlbnRMaXN0ZW5lcnMoZXZlbnRUeXBlKTtcclxuXHJcbiAgICBpZiAoZXZlbnRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgPT09IC0xKSB7XHJcbiAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlzdGVuZXJNYXAuc2V0KGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyKSB7XHJcbiAgICBjb25zdCBldmVudExpc3RlbmVycyA9IHRoaXMuZ2V0RXZlbnRMaXN0ZW5lcnMoZXZlbnRUeXBlKTtcclxuICAgIGNvbnN0IGxpc3RlbmVySW5kZXggPSBldmVudExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuXHJcbiAgICBpZiAobGlzdGVuZXJJbmRleCAhPT0gLTEpIHtcclxuICAgICAgZXZlbnRMaXN0ZW5lcnMuc3BsaWNlKGxpc3RlbmVySW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlzdGVuZXJNYXAuc2V0KGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3BhdGNoRXZlbnQoZXZlbnQ6IEFwcEV2ZW50KSB7XHJcbiAgICB0aGlzLmV2ZW50UXVldWUuZW5xdWV1ZShldmVudCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzRGlzcGF0Y2hpbmcpIHtcclxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50RnJvbVF1ZXVlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc3BhdGNoRXZlbnRGcm9tUXVldWUoKSB7XHJcbiAgICB0aGlzLmlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudFF1ZXVlLmRlcXVldWUoKTtcclxuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gdGhpcy5nZXRFdmVudExpc3RlbmVycyhldmVudC5ldmVudFR5cGUpO1xyXG4gICAgZXZlbnRMaXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lcihldmVudCkpO1xyXG5cclxuICAgIGlmICh0aGlzLmV2ZW50UXVldWUuaXNFbXB0eSgpKSB7XHJcbiAgICAgIHRoaXMuaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50RnJvbVF1ZXVlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEV2ZW50TGlzdGVuZXJzKGV2ZW50VHlwZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lck1hcC5nZXQoZXZlbnRUeXBlKSB8fCBbXTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL0V2ZW50QWdncmVnYXRvci50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudFF1ZXVlIHtcclxuICBwcml2YXRlIF9xdWV1ZTogQXBwRXZlbnRbXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgZW5xdWV1ZShldmVudDogQXBwRXZlbnQpIHtcclxuICAgIHRoaXMuX3F1ZXVlLnB1c2goZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlcXVldWUoKTogQXBwRXZlbnQge1xyXG4gICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUXVldWUgaXMgZW1wdHknKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fcXVldWUuc3BsaWNlKDAsIDEpWzBdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExlbmd0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9xdWV1ZS5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNFbXB0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldExlbmd0aCgpID09PSAwO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvRXZlbnRRdWV1ZS50cyIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgb2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zLCByZXZlcnNlT2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zIH0gZnJvbSAnbGluZS1yYXN0ZXJpemVyL29jdGFudC12ZWN0b3ItdHJhbnNmb3JtYXRpb25zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lUmFzdGVyaXplciB7XHJcbiAgcHVibGljIHJhc3Rlcml6ZUxpbmUoXHJcbiAgICBzdGFydFBvaW50OiBQb2ludCxcclxuICAgIGVuZFBvaW50OiBQb2ludCxcclxuICAgIHRoaWNrbmVzczogbnVtYmVyXHJcbiAgKTogUG9pbnRbXSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvblZlY3RvciA9IFBvaW50LnN1YnRyYWN0KGVuZFBvaW50LCBzdGFydFBvaW50KTtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uVmVjdG9yT2N0YW50ID0gdHJhbnNsYXRpb25WZWN0b3IuZ2V0T2N0YW50KCk7XHJcbiAgICBjb25zdCB2ZWN0b3JUcmFuc2Zvcm1hdGlvbiA9XHJcbiAgICAgIG9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9uc1t0cmFuc2xhdGlvblZlY3Rvck9jdGFudF07XHJcbiAgICBjb25zdCByZXZlcnNlVmVjdG9yVHJhbnNmb3JtYXRpb24gPVxyXG4gICAgICByZXZlcnNlT2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zW3RyYW5zbGF0aW9uVmVjdG9yT2N0YW50XTtcclxuXHJcbiAgICBjb25zdCByYXN0ZXJpemVkVHJhbnNmb3JtZWRMaW5lID0gdGhpcy5yYXN0ZXJpemVMaW5lRmlyc3RRdWFkcmFudChcclxuICAgICAgdmVjdG9yVHJhbnNmb3JtYXRpb24odHJhbnNsYXRpb25WZWN0b3IpLFxyXG4gICAgICB0aGlja25lc3NcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHJhc3Rlcml6ZWRUcmFuc2Zvcm1lZExpbmUubWFwKHBvaW50ID0+XHJcbiAgICAgIFBvaW50LmFkZChyZXZlcnNlVmVjdG9yVHJhbnNmb3JtYXRpb24ocG9pbnQpLCBzdGFydFBvaW50KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmFzdGVyaXplTGluZUZpcnN0UXVhZHJhbnQoZW5kUG9pbnQ6IFBvaW50LCB0aGlja25lc3M6IG51bWJlcikge1xyXG4gICAgY29uc3QgcmFzdGVyaXplZExpbmU6IFBvaW50W10gPSBbXTtcclxuXHJcbiAgICBjb25zdCBkeCA9IGVuZFBvaW50Lng7XHJcbiAgICBjb25zdCBkeSA9IGVuZFBvaW50Lnk7XHJcbiAgICBjb25zdCBpbmNyZW1lbnRFID0gMiAqIGR5O1xyXG4gICAgY29uc3QgaW5jcmVtZW50TkUgPSAyICogKGR5IC0gZHgpO1xyXG5cclxuICAgIGxldCBkID0gMiAqIGR5IC0gZHg7XHJcbiAgICBsZXQgeCA9IDA7XHJcbiAgICBsZXQgeSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHRoaXMuZ2V0VGhpY2tQb2ludHNJdGVyYXRvckluRmlyc3RRdWFkcmFudChcclxuICAgICAgbmV3IFBvaW50KHgsIHkpLFxyXG4gICAgICB0aGlja25lc3NcclxuICAgICkpIHtcclxuICAgICAgcmFzdGVyaXplZExpbmUucHVzaChwb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKHggPCBlbmRQb2ludC54KSB7XHJcbiAgICAgIGlmIChkIDwgMCkge1xyXG4gICAgICAgIGQgKz0gaW5jcmVtZW50RTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkICs9IGluY3JlbWVudE5FO1xyXG4gICAgICAgIHkgKz0gMTtcclxuICAgICAgfVxyXG4gICAgICB4ICs9IDE7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHRoaXMuZ2V0VGhpY2tQb2ludHNJdGVyYXRvckluRmlyc3RRdWFkcmFudChcclxuICAgICAgICBuZXcgUG9pbnQoeCwgeSksXHJcbiAgICAgICAgdGhpY2tuZXNzXHJcbiAgICAgICkpIHtcclxuICAgICAgICByYXN0ZXJpemVkTGluZS5wdXNoKHBvaW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByYXN0ZXJpemVkTGluZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgKmdldFRoaWNrUG9pbnRzSXRlcmF0b3JJbkZpcnN0UXVhZHJhbnQoXHJcbiAgICBwb2ludDogUG9pbnQsXHJcbiAgICB0aGlja25lc3M6IG51bWJlclxyXG4gICkge1xyXG4gICAgbGV0IGR5ID0gMTtcclxuXHJcbiAgICB5aWVsZCBwb2ludDtcclxuXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgY3VycmVudFRoaWNrbmVzcyA9IDE7XHJcbiAgICAgIGN1cnJlbnRUaGlja25lc3MgPCB0aGlja25lc3M7XHJcbiAgICAgIGN1cnJlbnRUaGlja25lc3MgKz0gMVxyXG4gICAgKSB7XHJcbiAgICAgIHlpZWxkIG5ldyBQb2ludChwb2ludC54LCBwb2ludC55ICsgZHkpO1xyXG4gICAgICBkeSA9IC1keTtcclxuXHJcbiAgICAgIGlmIChkeSA+IDApIHtcclxuICAgICAgICBkeSArPSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2xpbmUtcmFzdGVyaXplci9MaW5lUmFzdGVyaXplci50cyIsImltcG9ydCB7IE9jdGFudCB9IGZyb20gJ2NvbW1vbi9PY3RhbnQnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcblxyXG4vLyBUcmFuc2Zvcm1hdGlvbnMgZnJvbSBhIHNwZWNpZmljIG9jdGFudCB0byB0aGUgZmlyc3Qgb2N0YW50XHJcbmNvbnN0IG9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9ucyA9IHtcclxuICBbT2N0YW50LkZpcnN0XTogKHA6IFBvaW50KSA9PiBwLFxyXG4gIFtPY3RhbnQuU2Vjb25kXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQocC55LCBwLngpLFxyXG4gIFtPY3RhbnQuVGhpcmRdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludChwLnksIC1wLngpLFxyXG4gIFtPY3RhbnQuRm91cnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueCwgcC55KSxcclxuICBbT2N0YW50LkZpZnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueCwgLXAueSksXHJcbiAgW09jdGFudC5TaXh0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLnksIC1wLngpLFxyXG4gIFtPY3RhbnQuU2V2ZW50aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLnksIHAueCksXHJcbiAgW09jdGFudC5FaWdodGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludChwLngsIC1wLnkpXHJcbn07XHJcblxyXG4vLyBUcmFuc2Zvcm1hdGlvbnMgZnJvbSB0aGUgZmlyc3Qgb2N0YW50IHRvIGEgc3BlY2lmaWMgb2N0YW50XHJcbmNvbnN0IHJldmVyc2VPY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnMgPSB7XHJcbiAgW09jdGFudC5GaXJzdF06IChwOiBQb2ludCkgPT4gcCxcclxuICBbT2N0YW50LlNlY29uZF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueSwgcC54KSxcclxuICBbT2N0YW50LlRoaXJkXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueSwgcC54KSxcclxuICBbT2N0YW50LkZvdXJ0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLngsIHAueSksXHJcbiAgW09jdGFudC5GaWZ0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLngsIC1wLnkpLFxyXG4gIFtPY3RhbnQuU2l4dGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC55LCAtcC54KSxcclxuICBbT2N0YW50LlNldmVudGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludChwLnksIC1wLngpLFxyXG4gIFtPY3RhbnQuRWlnaHRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQocC54LCAtcC55KVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBvY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnMsXHJcbiAgcmV2ZXJzZU9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9uc1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9saW5lLXJhc3Rlcml6ZXIvb2N0YW50LXZlY3Rvci10cmFuc2Zvcm1hdGlvbnMudHMiLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbW1vbi9Db2xvcic7XHJcbmltcG9ydCB7IENPTE9SUyB9IGZyb20gJ2NvbW1vbi9DT0xPUlMnO1xyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBMaW5lUHJvcGVydGllcyB9IGZyb20gJ2NvbW1vbi9MaW5lUHJvcGVydGllcyc7XHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVSYXN0ZXJpemVyIH0gZnJvbSAnbGluZS1yYXN0ZXJpemVyL0xpbmVSYXN0ZXJpemVyJztcclxuXHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuXHJcbmludGVyZmFjZSBSZW5kZXJlckRlcGVuZGVuY2llcyB7XHJcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBsaW5lUmFzdGVyaXplcjogTGluZVJhc3Rlcml6ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XHJcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVuZGVyaW5nQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIHByaXZhdGUgbGluZVJhc3Rlcml6ZXI6IExpbmVSYXN0ZXJpemVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFJlbmRlcmVyRGVwZW5kZW5jaWVzKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRlcGVuZGVuY2llcy5jYW52YXM7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGlmIChjb250ZXh0ID09PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGdldCBjYW52YXMgMmQgcmVuZGVyaW5nIGNvbnRleHQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5yZW5kZXJpbmdDb250ZXh0LmZvbnQgPSBjb25maWd1cmF0aW9uLmNhbnZhc0ZvbnQ7XHJcbiAgICB0aGlzLmxpbmVSYXN0ZXJpemVyID0gZGVwZW5kZW5jaWVzLmxpbmVSYXN0ZXJpemVyO1xyXG4gICAgdGhpcy5zZXRGaWxsQ29sb3IoQ09MT1JTLkJMQUNLKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3UG9pbnQocG9pbnQ6IFBvaW50KSB7XHJcbiAgICB0aGlzLmRyYXdQaXhlbChwb2ludC54LCBwb2ludC55KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3UGl4ZWwoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dC5maWxsUmVjdCh4LCB5LCAxLCAxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcmF3TGluZShsaW5lOiBMaW5lLCBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXMpOiB2b2lkO1xyXG4gIHB1YmxpYyBkcmF3TGluZShzdGFydFBvaW50OiBQb2ludCwgZW5kUG9pbnQ6IFBvaW50LCBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXMpOiB2b2lkO1xyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tYW55XHJcbiAgcHVibGljIGRyYXdMaW5lKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICBpZiAoYXJnc1swXSBpbnN0YW5jZW9mIExpbmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZHJhd0xpbmVCZXR3ZWVuUG9pbnRzKGFyZ3NbMF0ucDEsIGFyZ3NbMF0ucDIsIGFyZ3NbMV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZHJhd0xpbmVCZXR3ZWVuUG9pbnRzKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXdQYXRoKHBhdGg6IFBhdGgpIHtcclxuICAgIGNvbnN0IHBhdGhMaW5lUHJvcGVydGllcyA9IHBhdGguZ2V0TGluZVByb3BlcnRpZXMoKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcGF0aC5nZXRMaW5lSXRlcmF0b3IoKSkge1xyXG4gICAgICB0aGlzLmRyYXdMaW5lKGxpbmUsIHBhdGhMaW5lUHJvcGVydGllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBQb2x5Z29uKSB7XHJcbiAgICAgIHRoaXMuZHJhd0xpbmVDb25kaXRpb25zKHBhdGguZ2V0TGluZUNvbmRpdGlvbnMoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmlsbFRleHQodGV4dDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQ7XHJcbiAgcHVibGljIGZpbGxUZXh0KHRleHQ6IHN0cmluZywgcG9pbnQ6IFBvaW50KTogdm9pZDtcclxuICBwdWJsaWMgZmlsbFRleHQodGV4dDogc3RyaW5nLCBwb2ludE9yWDogbnVtYmVyIHwgUG9pbnQsIHk/OiBudW1iZXIpIHtcclxuICAgIGxldCB4ID0gcG9pbnRPclg7XHJcbiAgICBpZiAodHlwZW9mIHBvaW50T3JYID09PSAnb2JqZWN0JyAmJiBwb2ludE9yWCBpbnN0YW5jZW9mIFBvaW50KSB7XHJcbiAgICAgIHggPSBwb2ludE9yWC54O1xyXG4gICAgICB5ID0gcG9pbnRPclgueTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbnRleHQuZmlsbFRleHQodGV4dCwgPG51bWJlcj54LCA8bnVtYmVyPnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgdGhpcy5yZW5kZXJpbmdDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRGaWxsQ29sb3IoY29sb3I6IENvbG9yKSB7XHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbnRleHQuZmlsbFN0eWxlID0gY29sb3IuZmlsbFN0eWxlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkcmF3TGluZUJldHdlZW5Qb2ludHMoXHJcbiAgICBzdGFydFBvaW50OiBQb2ludCxcclxuICAgIGVuZFBvaW50OiBQb2ludCxcclxuICAgIGxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllc1xyXG4gICkge1xyXG4gICAgY29uc3QgcmFzdGVyaXplZExpbmVQb2ludHMgPSB0aGlzLmxpbmVSYXN0ZXJpemVyLnJhc3Rlcml6ZUxpbmUoXHJcbiAgICAgIHN0YXJ0UG9pbnQsXHJcbiAgICAgIGVuZFBvaW50LFxyXG4gICAgICBsaW5lUHJvcGVydGllcy50aGlja25lc3NcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5zZXRGaWxsQ29sb3IobGluZVByb3BlcnRpZXMuY29sb3IpO1xyXG4gICAgcmFzdGVyaXplZExpbmVQb2ludHMuZm9yRWFjaChwb2ludCA9PiB0aGlzLmRyYXdQb2ludChwb2ludCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkcmF3TGluZUNvbmRpdGlvbnMobGluZUNvbmRpdGlvbnM6IExpbmVDb25kaXRpb25bXSkge1xyXG4gICAgbGluZUNvbmRpdGlvbnMuZm9yRWFjaChsaW5lQ29uZGl0aW9uID0+IHtcclxuICAgICAgdGhpcy5maWxsVGV4dChcclxuICAgICAgICBsaW5lQ29uZGl0aW9uLmdldExhYmVsKCksXHJcbiAgICAgICAgUG9pbnQuYWRkKGxpbmVDb25kaXRpb24ubGluZS5nZXRNaWRkbGVQb2ludCgpLCBjb25maWd1cmF0aW9uLmxpbmVDb25kaXRpb25MYWJlbE9mZnNldClcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9SZW5kZXJlci50cyIsImV4cG9ydCBjbGFzcyBDb2xvciB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHI6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgZzogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBiOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGZpbGxTdHlsZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyOiBudW1iZXIsIGI6IG51bWJlciwgZzogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnIgPSByO1xyXG4gICAgdGhpcy5iID0gYjtcclxuICAgIHRoaXMuZyA9IGc7XHJcblxyXG4gICAgdGhpcy5maWxsU3R5bGUgPSBgcmdiKCR7dGhpcy5yfSwgJHt0aGlzLmd9LCAke3RoaXMuYn0pYDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0NvbG9yLnRzIiwiaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdjb21tb24vTGF5ZXInO1xyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnY29tbW9uL1BhdGgnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpdFRlc3RSZXN1bHQge1xyXG4gIHB1YmxpYyByZWFkb25seSBsaW5lOiBMaW5lO1xyXG4gIHB1YmxpYyBwYXRoPzogUGF0aDtcclxuICBwdWJsaWMgbGF5ZXI/OiBMYXllcjtcclxuXHJcbiAgY29uc3RydWN0b3IobGluZTogTGluZSwgcGF0aD86IFBhdGgsIGxheWVyPzogTGF5ZXIpIHtcclxuICAgIHRoaXMubGluZSA9IGxpbmU7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vSGl0VGVzdFJlc3VsdC50cyIsImltcG9ydCB7IEhpdFRlc3RSZXN1bHQgfSBmcm9tICdjb21tb24vSGl0VGVzdFJlc3VsdCc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnY29tbW9uL0xheWVyJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJ1JlbmRlcmVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFnZSB7XHJcbiAgcHVibGljIGxheWVyczogTGF5ZXJbXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgcmVuZGVyKHJlbmRlcmVyOiBSZW5kZXJlcikge1xyXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaChsYXllciA9PiBsYXllci5yZW5kZXIocmVuZGVyZXIpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sYXllcnMuaW5kZXhPZihsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpdFRlc3QocG9pbnQ6IFBvaW50KTogSGl0VGVzdFJlc3VsdCB8IG51bGwge1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLmxheWVycykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBsYXllci5oaXRUZXN0KHBvaW50KTtcclxuICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kTGF5ZXJCeU5hbWUobmFtZTogc3RyaW5nKTogTGF5ZXIge1xyXG4gICAgY29uc3QgZm91bmRMYXllciA9IHRoaXMubGF5ZXJzLmZpbmQobGF5ZXIgPT4gbGF5ZXIubmFtZSA9PT0gbmFtZSk7XHJcblxyXG4gICAgaWYgKCFmb3VuZExheWVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBuYW1lICR7bmFtZX0gZG9lcyBub3QgZXhpc3RgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm91bmRMYXllcjtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvU3RhZ2UudHMiLCJpbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IExFWCB9IGZyb20gJ0xFWCc7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gJ1N0YWdlJztcclxuXHJcbmltcG9ydCB7IFVJQ29uZGl0aW9uQ29udHJvbGxlciB9IGZyb20gJ3VpL2NvbmRpdGlvbnMvVUlDb25kaXRpb25Db250cm9sbGVyJztcclxuaW1wb3J0IHsgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyIH0gZnJvbSAndWkvTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyJztcclxuaW1wb3J0IHsgTmV3UG9seWdvblVJQ29udHJvbGxlciB9IGZyb20gJ3VpL05ld1BvbHlnb25VSUNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBQb2ludERyYWdnaW5nU2VydmljZSB9IGZyb20gJ3VpL1BvaW50RHJhZ2dpbmdTZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9pbnRJbnNlcnRlclNlcnZpY2UgfSBmcm9tICd1aS9Qb2ludEluc2VydGVyU2VydmljZSc7XHJcbmltcG9ydCB7IFBvaW50UmVtb3ZlclNlcnZpY2UgfSBmcm9tICd1aS9Qb2ludFJlbW92ZXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9pbnRTeW5jU2VydmljZSB9IGZyb20gJ3VpL1BvaW50U3luY1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZGl0aW9uTWF0Y2hlciB9IGZyb20gJ2NvbmRpdGlvbnMvQ29uZGl0aW9uTWF0Y2hlcic7XHJcblxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgTGluZUNsaWNrRXZlbnQgfSBmcm9tICdldmVudHMvTGluZUNsaWNrRXZlbnQnO1xyXG5cclxuaW1wb3J0ICd1aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNCdXR0b24nO1xyXG5pbXBvcnQgJ3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZyc7XHJcblxyXG5pbnRlcmZhY2UgVUlDb250cm9sbGVyRGVwZW5kZW5jaWVzIHtcclxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICBzdGFnZTogU3RhZ2U7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVSUNvbnRyb2xsZXIge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0YWdlOiBTdGFnZTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICBwcml2YXRlIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIHByaXZhdGUgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgdWlTZXJ2aWNlczogVUlTZXJ2aWNlW10gPSBbXTtcclxuICBwcml2YXRlIG5ld1BvbHlnb25VSUNvbnRyb2xsZXI6IE5ld1BvbHlnb25VSUNvbnRyb2xsZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogVUlDb250cm9sbGVyRGVwZW5kZW5jaWVzKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRlcGVuZGVuY2llcy5jYW52YXM7XHJcbiAgICB0aGlzLnJlbmRlcmVyID0gZGVwZW5kZW5jaWVzLnJlbmRlcmVyO1xyXG4gICAgdGhpcy5zdGFnZSA9IGRlcGVuZGVuY2llcy5zdGFnZTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgY29uc3QgYXBwbGljYXRpb25VSUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25VSUNvbnRhaW5lcklEKTtcclxuICAgIGlmICghYXBwbGljYXRpb25VSUNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FwcGxpY2F0aW9uIFVJIGNvbnRhaW5lciBub3QgZm91bmQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIgPSBhcHBsaWNhdGlvblVJQ29udGFpbmVyO1xyXG5cclxuICAgIHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyID0gbmV3IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcih0aGlzLmNhbnZhcyk7XHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVOZXdQb2x5Z29uVUlDb250cm9sbGVyKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVBvaW50RHJhZ2dpbmdTZXJ2aWNlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVBvaW50SW5zZXJ0ZXJTZXJ2aWNlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVBvaW50UmVtb3ZlclNlcnZpY2UoKTtcclxuICAgIHRoaXMuY3JlYXRlUG9pbnRTeW5jU2VydmljZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVVSUNvbmRpdGlvbkNvbnRyb2xsZXIoKTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMuZm9yRWFjaCh1aVNlcnZpY2UgPT4gdWlTZXJ2aWNlLmluaXQoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMuZm9yRWFjaCh1aVNlcnZpY2UgPT4gdWlTZXJ2aWNlLmRlc3Ryb3koKSk7XHJcbiAgICB0aGlzLnVpU2VydmljZXMuc3BsaWNlKDAsIHRoaXMudWlTZXJ2aWNlcy5sZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICBjb25zdCBwb2ludCA9IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyLmdldFBvaW50RnJvbU1vdXNlRXZlbnQoZXZlbnQpO1xyXG5cclxuICAgIGNvbnN0IGhpdFRlc3RSZXN1bHQgPSB0aGlzLnN0YWdlLmhpdFRlc3QocG9pbnQpO1xyXG5cclxuICAgIGlmICghaGl0VGVzdFJlc3VsdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5uZXdQb2x5Z29uVUlDb250cm9sbGVyLmFkZE5ld1BvaW50KHBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWhpdFRlc3RSZXN1bHQucGF0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBMaW5lQ2xpY2tFdmVudChoaXRUZXN0UmVzdWx0LmxpbmUsIGhpdFRlc3RSZXN1bHQucGF0aCwgcG9pbnQpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUG9pbnRTeW5jU2VydmljZSgpIHtcclxuICAgIGNvbnN0IHBvaW50U3luY1NlcnZpY2UgPSBuZXcgUG9pbnRTeW5jU2VydmljZSh7XHJcbiAgICAgIGNvbnRhaW5lcjogdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyLFxyXG4gICAgICBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyLFxyXG4gICAgICBzdGFnZTogdGhpcy5zdGFnZSxcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvclxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51aVNlcnZpY2VzLnB1c2gocG9pbnRTeW5jU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBvaW50UmVtb3ZlclNlcnZpY2UoKSB7XHJcbiAgICBjb25zdCBwb2ludFJlbW92ZXJTZXJ2aWNlID0gbmV3IFBvaW50UmVtb3ZlclNlcnZpY2Uoe1xyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaChwb2ludFJlbW92ZXJTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUG9pbnREcmFnZ2luZ1NlcnZpY2UoKSB7XHJcbiAgICBjb25zdCBwb2ludERyYWdnaW5nU2VydmljZSA9IG5ldyBQb2ludERyYWdnaW5nU2VydmljZSh7XHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3IsXHJcbiAgICAgIHN0YWdlOiB0aGlzLnN0YWdlXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaChwb2ludERyYWdnaW5nU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU5ld1BvbHlnb25VSUNvbnRyb2xsZXIoKSB7XHJcbiAgICB0aGlzLm5ld1BvbHlnb25VSUNvbnRyb2xsZXIgPSBuZXcgTmV3UG9seWdvblVJQ29udHJvbGxlcih7XHJcbiAgICAgIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lcixcclxuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcclxuICAgICAgc3RhZ2U6IHRoaXMuc3RhZ2UsXHJcbiAgICAgIHBvbHlnb25MYXllcjogdGhpcy5zdGFnZS5maW5kTGF5ZXJCeU5hbWUoTEVYLlBPTFlHT05fTEFZRVJfTkFNRSksXHJcbiAgICAgIHJlbmRlcmVyOiB0aGlzLnJlbmRlcmVyLFxyXG4gICAgICBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyLFxyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaCh0aGlzLm5ld1BvbHlnb25VSUNvbnRyb2xsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVQb2ludEluc2VydGVyU2VydmljZSgpIHtcclxuICAgIGNvbnN0IHBvaW50SW5zZXJ0ZXJTZXJ2aWNlID0gbmV3IFBvaW50SW5zZXJ0ZXJTZXJ2aWNlKHtcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvclxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51aVNlcnZpY2VzLnB1c2gocG9pbnRJbnNlcnRlclNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVVSUNvbmRpdGlvbkNvbnRyb2xsZXIoKSB7XHJcbiAgICBjb25zdCB1aUNvbmRpdGlvbkNvbnRyb2xsZXIgPSBuZXcgVUlDb25kaXRpb25Db250cm9sbGVyKHtcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvcixcclxuICAgICAgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyLFxyXG4gICAgICBjb25kaXRpb25NYXRjaGVyOiBuZXcgQ29uZGl0aW9uTWF0Y2hlcigpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaCh1aUNvbmRpdGlvbkNvbnRyb2xsZXIpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9VSUNvbnRyb2xsZXIudHMiLCJpbXBvcnQgeyBDb25kaXRpb25QaWNrZXIgfSBmcm9tICd1aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlcic7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgTGluZUNsaWNrRXZlbnQgfSBmcm9tICdldmVudHMvTGluZUNsaWNrRXZlbnQnO1xyXG5pbXBvcnQgeyBMRVggfSBmcm9tICdMRVgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZGl0aW9uRml4ZXIsIEZpeGluZ0RpcmVjdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvQ29uZGl0aW9uRml4ZXInO1xyXG5pbXBvcnQgeyBDb25kaXRpb25NYXRjaGVyIH0gZnJvbSAnY29uZGl0aW9ucy9Db25kaXRpb25NYXRjaGVyJztcclxuXHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuXHJcbmludGVyZmFjZSBVSUNvbmRpdGlvbkNvbnRyb2xsZXJEZXBlbmRlbmNpZXMge1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG4gIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNvbmRpdGlvbk1hdGNoZXI6IENvbmRpdGlvbk1hdGNoZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVSUNvbmRpdGlvbkNvbnRyb2xsZXIgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmRpdGlvbk1hdGNoZXI6IENvbmRpdGlvbk1hdGNoZXI7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZGl0aW9uUGlja2VyOiBDb25kaXRpb25QaWNrZXIgPSBuZXcgQ29uZGl0aW9uUGlja2VyKCk7XHJcbiAgcHJpdmF0ZSBwcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcCA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogVUlDb25kaXRpb25Db250cm9sbGVyRGVwZW5kZW5jaWVzKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIgPSBkZXBlbmRlbmNpZXMuYXBwbGljYXRpb25VSUNvbnRhaW5lcjtcclxuICAgIHRoaXMuY29uZGl0aW9uTWF0Y2hlciA9IGRlcGVuZGVuY2llcy5jb25kaXRpb25NYXRjaGVyO1xyXG5cclxuICAgIHRoaXMub25MaW5lQ2xpY2sgPSB0aGlzLm9uTGluZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTmV3Q29uZGl0aW9uID0gdGhpcy5vbk5ld0NvbmRpdGlvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vblJlbW92ZUNvbmRpdGlvbiA9IHRoaXMub25SZW1vdmVDb25kaXRpb24uYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihMaW5lQ2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25MaW5lQ2xpY2spO1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29uZGl0aW9uUGlja2VyKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoTEVYLk5FV19DT05ESVRJT05fRVZFTlRfTkFNRSwgdGhpcy5vbk5ld0NvbmRpdGlvbik7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5hZGRFdmVudExpc3RlbmVyKExFWC5SRU1PVkVfQ09ORElUSU9OX0VWRU5UX05BTUUsIHRoaXMub25SZW1vdmVDb25kaXRpb24pO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIuc2V0QXR0cmlidXRlKCdkYXRhLXZpc2libGUnLCAnZmFsc2UnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihMaW5lQ2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25MaW5lQ2xpY2spO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihMRVguTkVXX0NPTkRJVElPTl9FVkVOVF9OQU1FLCB0aGlzLm9uTmV3Q29uZGl0aW9uKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIExFWC5SRU1PVkVfQ09ORElUSU9OX0VWRU5UX05BTUUsXHJcbiAgICAgIHRoaXMub25SZW1vdmVDb25kaXRpb25cclxuICAgICk7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5jb25kaXRpb25QaWNrZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkxpbmVDbGljayhldmVudDogTGluZUNsaWNrRXZlbnQpIHtcclxuICAgIGlmICghKGV2ZW50LnBheWxvYWQucGF0aCBpbnN0YW5jZW9mIFBvbHlnb24pKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcmV2aW91c0NsaWNrVGltZXN0YW1wID0gdGhpcy5wcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcDtcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5wcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcCA9IGN1cnJlbnRUaW1lc3RhbXA7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRUaW1lc3RhbXAgLSBwcmV2aW91c0NsaWNrVGltZXN0YW1wIDw9IGNvbmZpZ3VyYXRpb24uZG91YmxlQ2xpY2tNYXhEZWxheSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25kaXRpb25QaWNrZXIuc2V0QXR0cmlidXRlKCdkYXRhLXZpc2libGUnLCAnZmFsc2UnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIGV2ZW50LnBheWxvYWQucG9zaXRpb24ueC50b1N0cmluZygpKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgZXZlbnQucGF5bG9hZC5wb3NpdGlvbi55LnRvU3RyaW5nKCkpO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIudXBkYXRlU2VsZWN0ZWRMaW5lKGV2ZW50LnBheWxvYWQubGluZSwgZXZlbnQucGF5bG9hZC5wYXRoKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgJ3RydWUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25OZXdDb25kaXRpb24oZXZlbnQ6IEN1c3RvbUV2ZW50KSB7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uID0gZXZlbnQuZGV0YWlsO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxpbmVDb25kaXRpb24udmVyaWZ5Q2FuQmVBcHBsaWVkKCk7XHJcbiAgICAgIHRoaXMuY29uZGl0aW9uTWF0Y2hlci52ZXJpZnlDb25kaXRpb25BbGxvd2VkKGxpbmVDb25kaXRpb24pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGFsZXJ0KGBDYW5ub3QgYXBwbHkgY29uZGl0aW9uOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsaW5lQ29uZGl0aW9uLmlzTWV0KCkpIHtcclxuICAgICAgdGhpcy5maXhVbm1ldExpbmVDb25kaXRpb24obGluZUNvbmRpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgbGluZUNvbmRpdGlvbi5wb2x5Z29uLmFkZExpbmVDb25kaXRpb24obGluZUNvbmRpdGlvbik7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci51cGRhdGVCdXR0b25zKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpeFVubWV0TGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uKSB7XHJcbiAgICBjb25zdCByZWFsUG9seWdvbiA9IGxpbmVDb25kaXRpb24ucG9seWdvbjtcclxuICAgIGNvbnN0IHAxSW5kZXggPSByZWFsUG9seWdvbi5maW5kUG9pbnRJbmRleChsaW5lQ29uZGl0aW9uLmxpbmUucDEpO1xyXG4gICAgY29uc3QgcDJJbmRleCA9IHJlYWxQb2x5Z29uLmZpbmRQb2ludEluZGV4KGxpbmVDb25kaXRpb24ubGluZS5wMik7XHJcbiAgICBjb25zdCBwb2x5Z29uQ2xvbmUgPSByZWFsUG9seWdvbi5jbG9uZSgpO1xyXG5cclxuICAgIGNvbnN0IGNvbmRpdGlvbkZpeGVyID0gbmV3IENvbmRpdGlvbkZpeGVyKHBvbHlnb25DbG9uZSwgcG9seWdvbkNsb25lLmdldFZlcnRleChwMUluZGV4KSwgW1xyXG4gICAgICBsaW5lQ29uZGl0aW9uLmR1cGxpY2F0ZUZvck5ld0xpbmUoXHJcbiAgICAgICAgbmV3IExpbmUocG9seWdvbkNsb25lLmdldFZlcnRleChwMUluZGV4KSwgcG9seWdvbkNsb25lLmdldFZlcnRleChwMkluZGV4KSksXHJcbiAgICAgICAgcG9seWdvbkNsb25lXHJcbiAgICAgIClcclxuICAgIF0pO1xyXG4gICAgY29uZGl0aW9uRml4ZXIudHJ5Rml4KCk7XHJcblxyXG4gICAgaWYgKGNvbmRpdGlvbkZpeGVyLmZpeFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgcmV0dXJuIHJlYWxQb2x5Z29uLm1vdmVUbyhwb2x5Z29uQ2xvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmRpdGlvbkZpeGVyLnJlc2V0KCk7XHJcbiAgICBjb25kaXRpb25GaXhlci5kaXJlY3Rpb24gPSBGaXhpbmdEaXJlY3Rpb24uUmV2ZXJzZTtcclxuICAgIHBvbHlnb25DbG9uZS5tb3ZlVG8ocmVhbFBvbHlnb24pO1xyXG4gICAgY29uZGl0aW9uRml4ZXIudHJ5Rml4KCk7XHJcblxyXG4gICAgaWYgKCFjb25kaXRpb25GaXhlci5maXhTdWNjZXNzZnVsKSB7XHJcbiAgICAgIGFsZXJ0KCdDYW5ub3QgYWRkIGEgY29uZGl0aW9uJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUmVtb3ZlQ29uZGl0aW9uKGV2ZW50OiBDdXN0b21FdmVudCkge1xyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvbiA9IGV2ZW50LmRldGFpbDtcclxuXHJcbiAgICBsaW5lQ29uZGl0aW9uLnBvbHlnb24ucmVtb3ZlTGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnVwZGF0ZUJ1dHRvbnMoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29uZGl0aW9ucy9VSUNvbmRpdGlvbkNvbnRyb2xsZXIudHMiLCJpbXBvcnQgeyBGaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9GaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQgeyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9Ib3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQgeyBWZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcblxyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50JztcclxuaW1wb3J0IHtcclxuICBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyxcclxuICBTZWxlY3RlZFRhcmdldFxyXG59IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzJztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcblxyXG5pbXBvcnQgJ3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvblBpY2tlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdGVkVGFyZ2V0OiBTZWxlY3RlZFRhcmdldCA9IHtcclxuICAgIGxpbmU6IG51bGwsXHJcbiAgICBwb2x5Z29uOiBudWxsXHJcbiAgfTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGxpbmVDb25kaXRpb25FbGVtZW50czogTGluZUNvbmRpdGlvbkVsZW1lbnRbXTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmRpdGlvbkVsZW1lbnRzQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNsb3NlQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5vbk1vdXNlRG93biA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuaGlkZSA9IHRoaXMuaGlkZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2NvbmRpdGlvbi1waWNrZXJfX2Nsb3NlLWJ1dHRvbic7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xyXG5cclxuICAgIHRoaXMuY29uZGl0aW9uRWxlbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29uZGl0aW9uRWxlbWVudHNDb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbmRpdGlvbi1lbGVtZW50cy1jb250YWluZXInO1xyXG5cclxuICAgIHRoaXMubGluZUNvbmRpdGlvbkVsZW1lbnRzID0gdGhpcy5jcmVhdGVMaW5lQ29uZGl0aW9uRWxlbWVudHMoKTtcclxuICAgIHRoaXMubGluZUNvbmRpdGlvbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB0aGlzLmNvbmRpdGlvbkVsZW1lbnRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpKTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcbiAgICByZXR1cm4gWydkYXRhLXgnLCAnZGF0YS15JywgJ2RhdGEtdmlzaWJsZSddO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5jb25kaXRpb25FbGVtZW50c0NvbnRhaW5lcik7XHJcblxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNvbmRpdGlvbkVsZW1lbnRzQ29udGFpbmVyKTtcclxuXHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlTmFtZTogc3RyaW5nLCBfb2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xyXG4gICAgc3dpdGNoIChhdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgJ2RhdGEteCc6XHJcbiAgICAgIGNhc2UgJ2RhdGEteSc6XHJcbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnZGF0YS12aXNpYmxlJzpcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVTZWxlY3RlZExpbmUobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lID0gbGluZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbiA9IHBvbHlnb247XHJcblxyXG4gICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQnV0dG9ucygpIHtcclxuICAgIHRoaXMubGluZUNvbmRpdGlvbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnVwZGF0ZUJ1dHRvbigpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICB0aGlzLnN0eWxlLmxlZnQgPSBgJHt0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgfHwgMH1weGA7XHJcbiAgICB0aGlzLnN0eWxlLnRvcCA9IGAke3RoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSB8fCAwfXB4YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudCAmJiBldmVudC5zcmNFbGVtZW50ICYmIHRoaXMuY29udGFpbnMoZXZlbnQuc3JjRWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoaWRlKCkge1xyXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScsICdmYWxzZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVMaW5lQ29uZGl0aW9uRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llczogTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMgPSB7XHJcbiAgICAgIHNlbGVjdGVkVGFyZ2V0OiB0aGlzLnNlbGVjdGVkVGFyZ2V0XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBbXHJcbiAgICAgIG5ldyBGaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQobGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpLFxyXG4gICAgICBuZXcgVmVydGljYWxMaW5lQ29uZGl0aW9uRWxlbWVudChsaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyksXHJcbiAgICAgIG5ldyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQobGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpXHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtY29uZGl0aW9uLXBpY2tlcicsIENvbmRpdGlvblBpY2tlcik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnRzIiwiaW1wb3J0IHsgRml4ZWRMZW5ndGhMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9GaXhlZExlbmd0aExpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzIH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudCBleHRlbmRzIExpbmVDb25kaXRpb25FbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzKSB7XHJcbiAgICBzdXBlcihkZXBlbmRlbmNpZXMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uLnRleHRDb250ZW50ID0gJ0ZpeGVkIGxlbmd0aCc7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0TGluZUNvbmRpdGlvbkNvbnN0cnVjdG9yKCkge1xyXG4gICAgcmV0dXJuIEZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVOZXdDb25kaXRpb24oKTogTGluZUNvbmRpdGlvbiB8IG51bGwge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUgfHwgIXRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBub3Qgc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbGVuZ3RoID0gTnVtYmVyLk5hTjtcclxuICAgIGNvbnN0IG9yaWdpbmFsTGluZUxlbmd0aCA9IHRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZS5nZXRMZW5ndGgoKS50b0ZpeGVkKDEpO1xyXG5cclxuICAgIHdoaWxlIChOdW1iZXIuaXNOYU4obGVuZ3RoKSB8fCBsZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBwcm9tcHQoJ1Byb3ZpZGUgdGhlIGZpeGVkIGxlbmd0aCcsIG9yaWdpbmFsTGluZUxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxlbmd0aCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24oXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSxcclxuICAgICAgdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uLFxyXG4gICAgICBsZW5ndGhcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2ZpeGVkLWxlbmd0aC1jb25kaXRpb24nLCBGaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9GaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQudHMiLCJpbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuXHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24gZXh0ZW5kcyBMaW5lQ29uZGl0aW9uIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGZpeGVkTGVuZ3RoOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBmaXhlZExlbmd0aFNxdWFyZWQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbiwgbGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIHN1cGVyKGxpbmUsIHBvbHlnb24pO1xyXG5cclxuICAgIHRoaXMuZml4ZWRMZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmZpeGVkTGVuZ3RoU3F1YXJlZCA9IE1hdGgucG93KGxlbmd0aCwgMik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNNZXQoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBsZW5ndGhTcXVhcmVkID0gUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZCh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguYWJzKGxlbmd0aFNxdWFyZWQgLSB0aGlzLmZpeGVkTGVuZ3RoU3F1YXJlZCkgPCBjb25maWd1cmF0aW9uLmVwc2lsb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KGxvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgY29uc3QgZnJlZVBvaW50ID0gdGhpcy5saW5lLnAxID09PSBsb2NrZWRQb2ludCA/IHRoaXMubGluZS5wMiA6IHRoaXMubGluZS5wMTtcclxuXHJcbiAgICBjb25zdCBsZW5ndGhCZWZvcmVGaXggPSBQb2ludC5nZXREaXN0YW5jZUJldHdlZW4obG9ja2VkUG9pbnQsIGZyZWVQb2ludCk7XHJcbiAgICBjb25zdCByYXRpbyA9IHRoaXMuZml4ZWRMZW5ndGggLyBsZW5ndGhCZWZvcmVGaXg7XHJcblxyXG4gICAgY29uc3QgeERlbHRhID0gZnJlZVBvaW50LnggLSBsb2NrZWRQb2ludC54O1xyXG4gICAgY29uc3QgeURlbHRhID0gZnJlZVBvaW50LnkgLSBsb2NrZWRQb2ludC55O1xyXG5cclxuICAgIGZyZWVQb2ludC5tb3ZlVG8obG9ja2VkUG9pbnQueCArIHhEZWx0YSAqIHJhdGlvLCBsb2NrZWRQb2ludC55ICsgeURlbHRhICogcmF0aW8pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGR1cGxpY2F0ZUZvck5ld0xpbmUobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgcmV0dXJuIG5ldyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24obGluZSwgcG9seWdvbiwgdGhpcy5maXhlZExlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFiZWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maXhlZExlbmd0aC50b0ZpeGVkKDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZlcmlmeUNhbkJlQXBwbGllZCgpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9GaXhlZExlbmd0aExpbmVDb25kaXRpb24udHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9MaW5lQ29uZGl0aW9uRWxlbWVudC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmxpbmUtY29uZGl0aW9uLS1hY3RpdmUgLmxpbmUtY29uZGl0aW9uX19idXR0b24ge1xcbiAgYm94LXNoYWRvdzogMCAwIDVweCAycHggIzFiOTdkZjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzIH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudCBleHRlbmRzIExpbmVDb25kaXRpb25FbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzKSB7XHJcbiAgICBzdXBlcihkZXBlbmRlbmNpZXMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uLnRleHRDb250ZW50ID0gJ0hvcml6b250YWwnO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldExpbmVDb25kaXRpb25Db25zdHJ1Y3RvcigpIHtcclxuICAgIHJldHVybiBIb3Jpem9udGFsTGluZUNvbmRpdGlvbjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVOZXdDb25kaXRpb24oKTogTGluZUNvbmRpdGlvbiB8IG51bGwge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUgfHwgIXRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBub3Qgc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEhvcml6b250YWxMaW5lQ29uZGl0aW9uKHRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSwgdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaG9yaXpvbnRhbC1saW5lLWNvbmRpdGlvbicsIEhvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0hvcml6b250YWxMaW5lQ29uZGl0aW9uRWxlbWVudC50cyIsImltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBWZXJ0aWNhbExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL1ZlcnRpY2FsTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50IGV4dGVuZHMgTGluZUNvbmRpdGlvbkVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpIHtcclxuICAgIHN1cGVyKGRlcGVuZGVuY2llcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b24udGV4dENvbnRlbnQgPSAnVmVydGljYWwnO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldExpbmVDb25kaXRpb25Db25zdHJ1Y3RvcigpIHtcclxuICAgIHJldHVybiBWZXJ0aWNhbExpbmVDb25kaXRpb247XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlTmV3Q29uZGl0aW9uKCk6IExpbmVDb25kaXRpb24gfCBudWxsIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lIHx8ICF0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb24pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgbm90IHNlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZXJ0aWNhbExpbmVDb25kaXRpb24odGhpcy5zZWxlY3RlZFRhcmdldC5saW5lLCB0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb24pO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2ZXJ0aWNhbC1saW5lLWNvbmRpdGlvbicsIFZlcnRpY2FsTGluZUNvbmRpdGlvbkVsZW1lbnQpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vQ29uZGl0aW9uUGlja2VyLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vQ29uZGl0aW9uUGlja2VyLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vQ29uZGl0aW9uUGlja2VyLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImFwcC1jb25kaXRpb24tcGlja2VyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDVweCwgLTUwJSk7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBwYWRkaW5nOiAwLjZlbTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICMyMjI7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UyZTJlMjtcXG4gIGJveC1zaGFkb3c6IDJweCAycHggNXB4IGJsYWNrO1xcbiAgei1pbmRleDogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XFxuXFxuLmNvbmRpdGlvbi1lbGVtZW50cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuY29uZGl0aW9uLWVsZW1lbnRzLWNvbnRhaW5lciAqIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4OyB9XFxuICAgIC5jb25kaXRpb24tZWxlbWVudHMtY29udGFpbmVyICo6bGFzdC1jaGlsZCB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMDsgfVxcblxcbi5jb25kaXRpb24tcGlja2VyX19jbG9zZS1idXR0b24ge1xcbiAgbWFyZ2luOiAtMnB4IC0ycHggM3B4IDA7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIGZvbnQtc2l6ZTogMTBweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy91aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyIHtcclxuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjYW52YXNDbGllbnRSZWN0OiBDbGllbnRSZWN0O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMudXBkYXRlQ2FudmFzT2Zmc2V0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQ2FudmFzT2Zmc2V0KCkge1xyXG4gICAgdGhpcy5jYW52YXNDbGllbnRSZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UG9pbnRGcm9tTW91c2VFdmVudChldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludChcclxuICAgICAgZXZlbnQucGFnZVggLSB0aGlzLmNhbnZhc0NsaWVudFJlY3QubGVmdCxcclxuICAgICAgZXZlbnQucGFnZVkgLSB0aGlzLmNhbnZhc0NsaWVudFJlY3QudG9wXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9Nb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIudHMiLCJpbXBvcnQgeyBMYXllciB9IGZyb20gJ2NvbW1vbi9MYXllcic7XHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBMRVggfSBmcm9tICdMRVgnO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJ1JlbmRlcmVyJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdTdGFnZSc7XHJcbmltcG9ydCB7IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciB9IGZyb20gJ3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcic7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgUG9pbnRDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL1BvaW50Q2xpY2tFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuXHJcbmludGVyZmFjZSBOZXdQb2x5Z29uVUlDb250cm9sbGVyRGVwZW5kZW5jaWVzIHtcclxuICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIHBvbHlnb25MYXllcjogTGF5ZXI7XHJcbiAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gIHN0YWdlOiBTdGFnZTtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5ld1BvbHlnb25VSUNvbnRyb2xsZXIgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSB1bmZpbmlzaGVkUGF0aDogUGF0aDtcclxuICBwcml2YXRlIHJlYWRvbmx5IHBhdGhMYXllciA9IG5ldyBMYXllcihMRVguUEFUSF9MQVlFUl9OQU1FKTtcclxuICBwcml2YXRlIHJlYWRvbmx5IHBvbHlnb25MYXllcjogTGF5ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTmV3UG9seWdvblVJQ29udHJvbGxlckRlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyID0gZGVwZW5kZW5jaWVzLmFwcGxpY2F0aW9uVUlDb250YWluZXI7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRlcGVuZGVuY2llcy5jYW52YXM7XHJcbiAgICB0aGlzLnN0YWdlID0gZGVwZW5kZW5jaWVzLnN0YWdlO1xyXG4gICAgdGhpcy5wb2x5Z29uTGF5ZXIgPSBkZXBlbmRlbmNpZXMucG9seWdvbkxheWVyO1xyXG4gICAgdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgPSBkZXBlbmRlbmNpZXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IGRlcGVuZGVuY2llcy5yZW5kZXJlcjtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLmNsb3NlUGF0aCA9IHRoaXMuY2xvc2VQYXRoLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vblBvaW50Q2xpY2sgPSB0aGlzLm9uUG9pbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbktleURvd24gPSB0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLnN0YWdlLmxheWVycy5wdXNoKHRoaXMucGF0aExheWVyKTtcclxuICAgIHRoaXMuc3RhcnROZXdVbmZpbmlzaGVkUGF0aCgpO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFBvaW50Q2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25Qb2ludENsaWNrKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9pbnRDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50Q2xpY2spO1xyXG4gICAgdGhpcy5zdGFnZS5yZW1vdmVMYXllcih0aGlzLnBhdGhMYXllcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkTmV3UG9pbnQocG9pbnQ6IFBvaW50KSB7XHJcbiAgICB0aGlzLnVuZmluaXNoZWRQYXRoLmFkZFZlcnRleChwb2ludCk7XHJcbiAgICB0aGlzLmRpc3BhdGNoVXBkYXRlVUlFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGNvbnN0IHVuZmluaXNoZWRQYXRoVmVydGljZXNDb3VudCA9IHRoaXMudW5maW5pc2hlZFBhdGguZ2V0VmVydGljZXNDb3VudCgpO1xyXG4gICAgaWYgKHVuZmluaXNoZWRQYXRoVmVydGljZXNDb3VudCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGFzdFBvaW50ID0gdGhpcy51bmZpbmlzaGVkUGF0aC5nZXRWZXJ0ZXgodW5maW5pc2hlZFBhdGhWZXJ0aWNlc0NvdW50IC0gMSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuXHJcbiAgICBjb25zdCBwb2ludCA9IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyLmdldFBvaW50RnJvbU1vdXNlRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5kcmF3TGluZShsYXN0UG9pbnQsIHBvaW50LCBjb25maWd1cmF0aW9uLm5ld0xpbmVQcmV2aWV3UHJvcGVydGllcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUG9pbnRDbGljayhldmVudDogUG9pbnRDbGlja0V2ZW50KSB7XHJcbiAgICBjb25zdCBwYXRoUG9pbnRDb21wb25lbnQgPSBldmVudC5wYXlsb2FkO1xyXG5cclxuICAgIGlmIChwYXRoUG9pbnRDb21wb25lbnQucGF0aCA9PT0gdGhpcy51bmZpbmlzaGVkUGF0aCAmJiBwYXRoUG9pbnRDb21wb25lbnQuaW5pdGlhbCkge1xyXG4gICAgICBldmVudC5oYW5kbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZVBhdGgoKTtcclxuICAgICAgICBwYXRoUG9pbnRDb21wb25lbnQuaW5pdGlhbCA9IGZhbHNlO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXJ0TmV3VW5maW5pc2hlZFBhdGgoKSB7XHJcbiAgICB0aGlzLnVuZmluaXNoZWRQYXRoID0gbmV3IFBhdGgoW10sIGNvbmZpZ3VyYXRpb24ubmV3UG9seWdvbkxpbmVQcm9wZXJ0aWVzKTtcclxuICAgIHRoaXMucGF0aExheWVyLnBhdGhzLnB1c2godGhpcy51bmZpbmlzaGVkUGF0aCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsb3NlUGF0aCgpIHtcclxuICAgIGlmICh0aGlzLnVuZmluaXNoZWRQYXRoLmdldFZlcnRpY2VzQ291bnQoKSA8IGNvbmZpZ3VyYXRpb24ubWluUG9seWdvblBvaW50cykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBvbHlnb24gbXVzdCBoYXZlIGF0IGxlYXN0ICR7Y29uZmlndXJhdGlvbi5taW5Qb2x5Z29uUG9pbnRzfSB2ZXJ0aWNlc2ApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudW5maW5pc2hlZFBhdGgubGluZVByb3BlcnRpZXMgPSBjb25maWd1cmF0aW9uLnBvbHlnb25MaW5lUHJvcGVydGllcztcclxuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbih0aGlzLnVuZmluaXNoZWRQYXRoKTtcclxuICAgIHRoaXMucG9seWdvbkxheWVyLnBhdGhzLnB1c2gocG9seWdvbik7XHJcbiAgICB0aGlzLnBhdGhMYXllci5yZW1vdmVQYXRoKHRoaXMudW5maW5pc2hlZFBhdGgpO1xyXG5cclxuICAgIHRoaXMuc3RhcnROZXdVbmZpbmlzaGVkUGF0aCgpO1xyXG4gICAgdGhpcy5kaXNwYXRjaFVwZGF0ZVVJRXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc3BhdGNoVXBkYXRlVUlFdmVudHMoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgMjc6XHJcbiAgICAgICAgdGhpcy5wYXRoTGF5ZXIucmVtb3ZlUGF0aCh0aGlzLnVuZmluaXNoZWRQYXRoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0TmV3VW5maW5pc2hlZFBhdGgoKTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoVXBkYXRlVUlFdmVudHMoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL05ld1BvbHlnb25VSUNvbnRyb2xsZXIudHMiLCJpbXBvcnQgeyBDT0xPUlMgfSBmcm9tICdjb21tb24vQ09MT1JTJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdjb21tb24vTGF5ZXInO1xyXG5pbXBvcnQgeyBMaW5lUHJvcGVydGllcyB9IGZyb20gJ2NvbW1vbi9MaW5lUHJvcGVydGllcyc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IExFWCB9IGZyb20gJ0xFWCc7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29udGludW91c0NvbmRpdGlvbkZpeGVyIH0gZnJvbSAnY29uZGl0aW9ucy9Db250aW51b3VzQ29uZGl0aW9uRml4ZXInO1xyXG5cclxuaW1wb3J0IHsgRmluaXNoUG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQnO1xyXG5pbXBvcnQgeyBTdGFydFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvU3RhcnRQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuXHJcbmludGVyZmFjZSBQb2ludERyYWdnaW5nU2VydmljZURlcGVuZGVuY2llcyB7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnREcmFnZ2luZ1NlcnZpY2UgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSBwYXRoR2hvc3RMYXllcjogTGF5ZXI7XHJcbiAgcHJpdmF0ZSBjb250aW51b3VzQ29uZGl0aW9uRml4ZXI6IENvbnRpbnVvdXNDb25kaXRpb25GaXhlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnREcmFnZ2luZ1NlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuICAgIHRoaXMuc3RhZ2UgPSBkZXBlbmRlbmNpZXMuc3RhZ2U7XHJcblxyXG4gICAgdGhpcy5vblN0YXJ0UG9pbnREcmFnID0gdGhpcy5vblN0YXJ0UG9pbnREcmFnLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uRmluaXNoUG9pbnREcmFnID0gdGhpcy5vbkZpbmlzaFBvaW50RHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vblBvaW50RHJhZyA9IHRoaXMub25Qb2ludERyYWcuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5wYXRoR2hvc3RMYXllciA9IG5ldyBMYXllcihMRVguUEFUSF9HSE9TVF9MQVlFUl9OQU1FKTtcclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLnNwbGljZSgwLCAwLCB0aGlzLnBhdGhHaG9zdExheWVyKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFN0YXJ0UG9pbnREcmFnRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uU3RhcnRQb2ludERyYWcpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihGaW5pc2hQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25GaW5pc2hQb2ludERyYWcpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25Qb2ludERyYWcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnBhdGhHaG9zdExheWVyLnBhdGhzID0gW107XHJcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUxheWVyKHRoaXMucGF0aEdob3N0TGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoU3RhcnRQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25TdGFydFBvaW50RHJhZyk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICBGaW5pc2hQb2ludERyYWdFdmVudC5ldmVudFR5cGUsXHJcbiAgICAgIHRoaXMub25GaW5pc2hQb2ludERyYWdcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50RHJhZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU3RhcnRQb2ludERyYWcoZXZlbnQ6IFN0YXJ0UG9pbnREcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG5cclxuICAgIGlmIChldmVudC5wYXlsb2FkLnBhdGggaW5zdGFuY2VvZiBQb2x5Z29uKSB7XHJcbiAgICAgIHRoaXMuY29udGludW91c0NvbmRpdGlvbkZpeGVyID0gbmV3IENvbnRpbnVvdXNDb25kaXRpb25GaXhlcihldmVudC5wYXlsb2FkLnBhdGgsIGV2ZW50LnBheWxvYWQucG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29uZmlndXJhdGlvbi5kaXNwbGF5UGF0aEdob3N0V2hlbkRyYWdnaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXRoID0gZXZlbnQucGF5bG9hZC5wYXRoLmNsb25lKCk7XHJcbiAgICBwYXRoLmxpbmVQcm9wZXJ0aWVzID0gbmV3IExpbmVQcm9wZXJ0aWVzKENPTE9SUy5HUkVFTiwgMSk7XHJcbiAgICB0aGlzLnBhdGhHaG9zdExheWVyLnBhdGhzLnB1c2gocGF0aCk7XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBTeW5jQ29tcG9uZW50c0V2ZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbmlzaFBvaW50RHJhZyhldmVudDogRmluaXNoUG9pbnREcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5jb250aW51b3VzQ29uZGl0aW9uRml4ZXIgPSBudWxsO1xyXG4gICAgaWYgKCFjb25maWd1cmF0aW9uLmRpc3BsYXlQYXRoR2hvc3RXaGVuRHJhZ2dpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF0aEdob3N0TGF5ZXIucGF0aHMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUG9pbnREcmFnKGV2ZW50OiBQb2ludERyYWdFdmVudCkge1xyXG4gICAgY29uc3QgeyBjb21wb25lbnQsIG5ld1Bvc2l0aW9uIH0gPSBldmVudC5wYXlsb2FkO1xyXG5cclxuICAgIGNvbXBvbmVudC5wb2ludC5tb3ZlVG8obmV3UG9zaXRpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbnRpbnVvdXNDb25kaXRpb25GaXhlcikge1xyXG4gICAgICB0aGlzLmNvbnRpbnVvdXNDb25kaXRpb25GaXhlci5maXgoKTtcclxuICAgICAgdGhpcy5jb250aW51b3VzQ29uZGl0aW9uRml4ZXIucHJvcGFnYXRlQ2hhbmdlc1RvT3JpZ2luYWxQb2x5Z29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICBldmVudC5oYW5kbGVkID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvUG9pbnREcmFnZ2luZ1NlcnZpY2UudHMiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IENvbmRpdGlvbkZpeGVyLCBGaXhpbmdEaXJlY3Rpb24gfSBmcm9tICdjb25kaXRpb25zL0NvbmRpdGlvbkZpeGVyJztcclxuXHJcbi8qKlxyXG4gKiBVc2Ugd2hlbiB0aGVyZSBpcyBhIG5lZWQgdG8gZml4IGNvbmRpdGlvbnMgb2Z0ZW4gKGZvciBpbnN0YW5jZSB3aGVuIGRyYWdnaW5nKS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ29udGludW91c0NvbmRpdGlvbkZpeGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29udGludW91c0NvbmRpdGlvbkZpeGVyIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHBvbHlnb246IFBvbHlnb247XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjbG9uZWRQb2x5Z29uOiBQb2x5Z29uO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHN0YXJ0aW5nUG9pbnQ6IFBvaW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2xvbmVkU3RhcnRpbmdQb2ludDogUG9pbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBvbHlnb246IFBvbHlnb24sIHN0YXJ0aW5nUG9pbnQ6IFBvaW50KSB7XHJcbiAgICAvLyBUT0RPOiBpbmplY3QgQ29udGludW91c0ZpeGVyIGNvbnN0cnVjdG9yXHJcbiAgICB0aGlzLnBvbHlnb24gPSBwb2x5Z29uO1xyXG4gICAgdGhpcy5zdGFydGluZ1BvaW50ID0gc3RhcnRpbmdQb2ludDtcclxuICAgIGNvbnN0IHN0YXJ0aW5nUG9pbnRJbmRleCA9IHBvbHlnb24uZmluZFBvaW50SW5kZXgodGhpcy5zdGFydGluZ1BvaW50KTtcclxuXHJcbiAgICB0aGlzLmNsb25lZFBvbHlnb24gPSBwb2x5Z29uLmNsb25lKCk7XHJcbiAgICB0aGlzLmNsb25lZFN0YXJ0aW5nUG9pbnQgPSB0aGlzLmNsb25lZFBvbHlnb24uZ2V0VmVydGV4KHN0YXJ0aW5nUG9pbnRJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KCkge1xyXG4gICAgY29uc3QgbGFzdFZhbGlkUG9zaXRpb24gPSB0aGlzLmNsb25lZFN0YXJ0aW5nUG9pbnQuY2xvbmUoKTtcclxuICAgIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludC5tb3ZlVG8odGhpcy5zdGFydGluZ1BvaW50KTtcclxuXHJcbiAgICBjb25zdCBjb25kaXRpb25GaXhlciA9IG5ldyBDb25kaXRpb25GaXhlcih0aGlzLmNsb25lZFBvbHlnb24sIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludCwgW10pO1xyXG4gICAgY29uZGl0aW9uRml4ZXIudHJ5Rml4KCk7XHJcblxyXG4gICAgaWYgKGNvbmRpdGlvbkZpeGVyLmZpeFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludC5tb3ZlVG8odGhpcy5zdGFydGluZ1BvaW50KTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLnJlc2V0KCk7XHJcbiAgICBjb25kaXRpb25GaXhlci5kaXJlY3Rpb24gPSBGaXhpbmdEaXJlY3Rpb24uUmV2ZXJzZTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLnRyeUZpeCgpO1xyXG5cclxuICAgIGlmIChjb25kaXRpb25GaXhlci5maXhTdWNjZXNzZnVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0cmFuc2xhdGlvblZlY3RvciA9IFBvaW50LnN1YnRyYWN0KHRoaXMuc3RhcnRpbmdQb2ludCwgbGFzdFZhbGlkUG9zaXRpb24pO1xyXG5cclxuICAgIHRoaXMuY2xvbmVkUG9seWdvbi5nZXRWZXJ0aWNlcygpLmZvckVhY2goY2xvbmVkUG9pbnQgPT4ge1xyXG4gICAgICBjbG9uZWRQb2ludC5tb3ZlVG8oUG9pbnQuYWRkKGNsb25lZFBvaW50LCB0cmFuc2xhdGlvblZlY3RvcikpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNsb25lZFN0YXJ0aW5nUG9pbnQubW92ZVRvKHRoaXMuc3RhcnRpbmdQb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcHJvcGFnYXRlQ2hhbmdlc1RvT3JpZ2luYWxQb2x5Z29uKCkge1xyXG4gICAgdGhpcy5wb2x5Z29uLm1vdmVUbyh0aGlzLmNsb25lZFBvbHlnb24pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0NvbnRpbnVvdXNDb25kaXRpb25GaXhlci50cyIsImltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBMaW5lQ2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9MaW5lQ2xpY2tFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgVUlTZXJ2aWNlIH0gZnJvbSAndWkvVUlTZXJ2aWNlJztcclxuXHJcbmludGVyZmFjZSBQb2ludEluc2VydGVyU2VydmljZURlcGVuZGVuY2llcyB7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludEluc2VydGVyU2VydmljZSBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSBwcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcCA9IDA7XHJcbiAgcHJpdmF0ZSBwcmV2aW91c0xpbmVIaXQ6IExpbmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnRJbnNlcnRlclNlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLm9uTGluZUNsaWNrID0gdGhpcy5vbkxpbmVDbGljay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKExpbmVDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vbkxpbmVDbGljayk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uTGluZUNsaWNrKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25MaW5lQ2xpY2soZXZlbnQ6IExpbmVDbGlja0V2ZW50KSB7XHJcbiAgICBjb25zdCBwcmV2aW91c0xpbmVIaXQgPSB0aGlzLnByZXZpb3VzTGluZUhpdDtcclxuICAgIGNvbnN0IHByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID0gdGhpcy5wcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcDtcclxuXHJcbiAgICBjb25zdCBjdXJyZW50VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMucHJldmlvdXNMaW5lSGl0ID0gZXZlbnQucGF5bG9hZC5saW5lO1xyXG4gICAgdGhpcy5wcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcCA9IGN1cnJlbnRUaW1lc3RhbXA7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhcHJldmlvdXNMaW5lSGl0IHx8XHJcbiAgICAgIGN1cnJlbnRUaW1lc3RhbXAgLSBwcmV2aW91c0xpbmVDbGlja1RpbWVzdGFtcCA+IGNvbmZpZ3VyYXRpb24uZG91YmxlQ2xpY2tNYXhEZWxheVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJldmlvdXNMaW5lSGl0LmVxdWFscyhldmVudC5wYXlsb2FkLmxpbmUpKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gZXZlbnQucGF5bG9hZC5wYXRoLmZpbmRQb2ludEluZGV4KGV2ZW50LnBheWxvYWQubGluZS5wMik7XHJcbiAgICAgIGNvbnN0IG5ld1BvaW50ID0gZXZlbnQucGF5bG9hZC5saW5lLmdldE1pZGRsZVBvaW50KCk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGV2ZW50LnBheWxvYWQucGF0aC5pbnNlcnRWZXJ0ZXgobmV3UG9pbnQsIGluZGV4KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gYWxlcnQoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL1BvaW50SW5zZXJ0ZXJTZXJ2aWNlLnRzIiwiaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IFBvaW50Q2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9Qb2ludENsaWNrRXZlbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuXHJcbmludGVyZmFjZSBQb2ludFJlbW92ZXJTZXJ2aWNlRGVwZW5kZW5jaWVzIHtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50UmVtb3ZlclNlcnZpY2UgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIHByaXZhdGUgcHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQ6IFBhdGhQb2ludENvbXBvbmVudDtcclxuICBwcml2YXRlIHByZXZpb3VzQ2xpY2tUaW1lc3RhbXAgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFBvaW50UmVtb3ZlclNlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuICAgIHRoaXMub25Qb2ludENsaWNrID0gdGhpcy5vblBvaW50Q2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihQb2ludENsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uUG9pbnRDbGljayk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoUG9pbnRDbGlja0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50Q2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblBvaW50Q2xpY2soZXZlbnQ6IFBvaW50Q2xpY2tFdmVudCkge1xyXG4gICAgY29uc3QgY3VycmVudFRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcblxyXG4gICAgY29uc3QgcGF0aFBvaW50Q29tcG9uZW50ID0gZXZlbnQucGF5bG9hZDtcclxuICAgIGNvbnN0IHByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50ID0gdGhpcy5wcmV2aW91c1BhdGhQb2ludENvbXBvbmVudDtcclxuICAgIGNvbnN0IHByZXZpb3VzQ2xpY2tUaW1lc3RhbXAgPSB0aGlzLnByZXZpb3VzQ2xpY2tUaW1lc3RhbXA7XHJcblxyXG4gICAgdGhpcy51cGRhdGVQcmV2aW91c0NsaWNrSW5mb3JtYXRpb24oZXZlbnQsIGN1cnJlbnRUaW1lc3RhbXApO1xyXG5cclxuICAgIGlmICghcHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQgfHwgcHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQgIT09IHBhdGhQb2ludENvbXBvbmVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbnRUaW1lc3RhbXAgLSBwcmV2aW91c0NsaWNrVGltZXN0YW1wID4gY29uZmlndXJhdGlvbi5kb3VibGVDbGlja01heERlbGF5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbW92ZVByZXZpb3VzQ2xpY2tlZFBvaW50KCk7XHJcbiAgICBldmVudC5oYW5kbGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUHJldmlvdXNDbGlja0luZm9ybWF0aW9uKGV2ZW50OiBQb2ludENsaWNrRXZlbnQsIHRpbWVzdGFtcDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50ID0gZXZlbnQucGF5bG9hZDtcclxuICAgIHRoaXMucHJldmlvdXNDbGlja1RpbWVzdGFtcCA9IHRpbWVzdGFtcDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlUHJldmlvdXNDbGlja2VkUG9pbnQoKSB7XHJcbiAgICBjb25zdCBwYXRoID0gdGhpcy5wcmV2aW91c1BhdGhQb2ludENvbXBvbmVudC5wYXRoO1xyXG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50LnBvaW50O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHBhdGgucmVtb3ZlVmVydGV4KHBvaW50KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBhbGVydCgnQ2Fubm90IHJlbW92ZSB2ZXJ0ZXgnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50LnJlbW92ZSgpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBTeW5jQ29tcG9uZW50c0V2ZW50KCkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9Qb2ludFJlbW92ZXJTZXJ2aWNlLnRzIiwiaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gJ1N0YWdlJztcclxuaW1wb3J0IHsgVUlTZXJ2aWNlIH0gZnJvbSAndWkvVUlTZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuaW1wb3J0IHsgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyIH0gZnJvbSAndWkvTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyJztcclxuXHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50c0V2ZW50IH0gZnJvbSAnZXZlbnRzL3VpL1N5bmNDb21wb25lbnRzRXZlbnQnO1xyXG5cclxuaW50ZXJmYWNlIFBvaW50U3luY1NlcnZpY2VEZXBlbmRlbmNpZXMge1xyXG4gIHN0YWdlOiBTdGFnZTtcclxuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUGF0aFBvaW50IHtcclxuICBwYXRoOiBQYXRoO1xyXG4gIHBvaW50OiBQb2ludDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50U3luY1NlcnZpY2UgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgcGF0aFBvaW50Q29tcG9uZW50czogUGF0aFBvaW50Q29tcG9uZW50W10gPSBbXTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFBvaW50U3luY1NlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuc3RhZ2UgPSBkZXBlbmRlbmNpZXMuc3RhZ2U7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRlcGVuZGVuY2llcy5jb250YWluZXI7XHJcbiAgICB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciA9IGRlcGVuZGVuY2llcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gICAgdGhpcy5zeW5jaHJvbml6ZUNvbXBvbmVudHMgPSB0aGlzLnN5bmNocm9uaXplQ29tcG9uZW50cy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFN5bmNDb21wb25lbnRzRXZlbnQuZXZlbnRUeXBlLCB0aGlzLnN5bmNocm9uaXplQ29tcG9uZW50cyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoU3luY0NvbXBvbmVudHNFdmVudC5ldmVudFR5cGUsIHRoaXMuc3luY2hyb25pemVDb21wb25lbnRzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzeW5jaHJvbml6ZUNvbXBvbmVudHMoZXZlbnQ6IFN5bmNDb21wb25lbnRzRXZlbnQpIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudHNUb1JlbW92ZSA9IHRoaXMuZ2V0UmVkdW5kYW50Q29tcG9uZW50cygpO1xyXG4gICAgY29tcG9uZW50c1RvUmVtb3ZlLmZvckVhY2goY29tcG9uZW50ID0+IGNvbXBvbmVudC5yZW1vdmUoKSk7XHJcblxyXG4gICAgY29uc3QgcGF0aFBvaW50cyA9IHRoaXMuZ2V0UGF0aFBvaW50cygpO1xyXG4gICAgY29uc3QgcG9pbnRzV2l0aG91dENvbXBvbmVudHMgPSB0aGlzLmdldFBvaW50c1dpdGhvdXRDb21wb25lbnRzKHBhdGhQb2ludHMpO1xyXG4gICAgY29uc3QgbmV3Q29tcG9uZW50cyA9IHRoaXMuY3JlYXRlUGF0aFBvaW50Q29tcG9uZW50cyhwb2ludHNXaXRob3V0Q29tcG9uZW50cyk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50c05vdFJlbW92ZWQgPSB0aGlzLnBhdGhQb2ludENvbXBvbmVudHMuZmlsdGVyKFxyXG4gICAgICBjb21wb25lbnQgPT4gY29tcG9uZW50c1RvUmVtb3ZlLmluZGV4T2YoY29tcG9uZW50KSA9PT0gLTFcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5wYXRoUG9pbnRDb21wb25lbnRzID0gWy4uLm5ld0NvbXBvbmVudHMsIC4uLmNvbXBvbmVudHNOb3RSZW1vdmVkXTtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXRoUG9pbnRzKCkge1xyXG4gICAgY29uc3QgcGF0aFBvaW50czogUGF0aFBvaW50W10gPSBbXTtcclxuXHJcbiAgICB0aGlzLnN0YWdlLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgbGF5ZXIucGF0aHMuZm9yRWFjaChwYXRoID0+IHtcclxuICAgICAgICBwYXRoLmdldFZlcnRpY2VzKCkuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICBwYXRoUG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBwYXRoLFxyXG4gICAgICAgICAgICBwb2ludFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBhdGhQb2ludHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBhdGhQb2ludENvbXBvbmVudHMocGF0aFBvaW50czogUGF0aFBvaW50W10pIHtcclxuICAgIHJldHVybiBwYXRoUG9pbnRzLm1hcChcclxuICAgICAgcGF0aFBvaW50ID0+XHJcbiAgICAgICAgbmV3IFBhdGhQb2ludENvbXBvbmVudChwYXRoUG9pbnQucGF0aCwgcGF0aFBvaW50LnBvaW50LCB7XHJcbiAgICAgICAgICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcclxuICAgICAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3IsXHJcbiAgICAgICAgICBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlZHVuZGFudENvbXBvbmVudHMoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVQYXRocyA9IHRoaXMuZ2V0QWN0aXZlUGF0aHMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5wYXRoUG9pbnRDb21wb25lbnRzLmZpbHRlcihcclxuICAgICAgY29tcG9uZW50ID0+XHJcbiAgICAgICAgYWN0aXZlUGF0aHMuaW5kZXhPZihjb21wb25lbnQucGF0aCkgPT09IC0xIHx8XHJcbiAgICAgICAgY29tcG9uZW50LnBhdGguZ2V0VmVydGljZXMoKS5pbmRleE9mKGNvbXBvbmVudC5wb2ludCkgPT09IC0xXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQb2ludHNXaXRob3V0Q29tcG9uZW50cyhwYXRoUG9pbnRzOiBQYXRoUG9pbnRbXSkge1xyXG4gICAgcmV0dXJuIHBhdGhQb2ludHMuZmlsdGVyKFxyXG4gICAgICBwYXRoUG9pbnQgPT5cclxuICAgICAgICAhdGhpcy5wYXRoUG9pbnRDb21wb25lbnRzLmZpbmQoXHJcbiAgICAgICAgICBjb21wb25lbnQgPT4gY29tcG9uZW50LnBhdGggPT09IHBhdGhQb2ludC5wYXRoICYmIGNvbXBvbmVudC5wb2ludCA9PT0gcGF0aFBvaW50LnBvaW50XHJcbiAgICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWN0aXZlUGF0aHMoKSB7XHJcbiAgICBjb25zdCBwYXRoczogUGF0aFtdID0gW107XHJcbiAgICB0aGlzLnN0YWdlLmxheWVycy5tYXAobGF5ZXIgPT4gcGF0aHMucHVzaCguLi5sYXllci5wYXRocykpO1xyXG5cclxuICAgIHJldHVybiBwYXRocztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvUG9pbnRTeW5jU2VydmljZS50cyIsImltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbmltcG9ydCB7IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciB9IGZyb20gJ3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcic7XHJcblxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgRmluaXNoUG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQnO1xyXG5pbXBvcnQgeyBTdGFydFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvU3RhcnRQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFBvaW50Q2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9Qb2ludENsaWNrRXZlbnQnO1xyXG5cclxuaW1wb3J0ICd1aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudC5zY3NzJztcclxuXHJcbmNvbnN0IENPTVBPTkVOVF9DTEFTU19OQU1FID0gJ2FwcGxpY2F0aW9uLXVpX192ZXJ0ZXgnO1xyXG5jb25zdCBJTklUSUFMX0NMQVNTX05BTUUgPSAnYXBwbGljYXRpb24tdWlfX3ZlcnRleC0taW5pdGlhbCc7XHJcblxyXG5pbnRlcmZhY2UgUGF0aFBvaW50Q29tcG9uZW50RGVwZW5kZW5jaWVzIHtcclxuICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhdGhQb2ludENvbXBvbmVudCB7XHJcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHB1YmxpYyBwYXRoOiBQYXRoO1xyXG4gIHB1YmxpYyBwb2ludDogUG9pbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGF0aDogUGF0aCxcclxuICAgIHBvaW50OiBQb2ludCxcclxuICAgIGRlcGVuZGVuY2llczogUGF0aFBvaW50Q29tcG9uZW50RGVwZW5kZW5jaWVzXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgdGhpcy5wb2ludCA9IHBvaW50O1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyID0gZGVwZW5kZW5jaWVzLmFwcGxpY2F0aW9uVUlDb250YWluZXI7XHJcbiAgICB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciA9IGRlcGVuZGVuY2llcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbiA9IHRoaXMudXBkYXRlUG9zaXRpb24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Nb3VzZURvd24gPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5zdG9wRHJhZ2dpbmcgPSB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlKCkge1xyXG4gICAgdGhpcy5wb2ludC5tb3ZlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pO1xyXG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMucGF0aC5saW5lUHJvcGVydGllcy5jb2xvci5maWxsU3R5bGU7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gYCR7dGhpcy5wb2ludC55fXB4YDtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5wb2ludC54fXB4YDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaW5pdGlhbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKElOSVRJQUxfQ0xBU1NfTkFNRSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGluaXRpYWwoaXNJbml0aWFsOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNJbml0aWFsKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKElOSVRJQUxfQ0xBU1NfTkFNRSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShJTklUSUFMX0NMQVNTX05BTUUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChDT01QT05FTlRfQ0xBU1NfTkFNRSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnBhdGguZ2V0VmVydGljZXNDb3VudCgpID09PSAxIHx8XHJcbiAgICAgICghdGhpcy5wYXRoLmNsb3NlZCAmJiB0aGlzLnBhdGguZmluZFBvaW50SW5kZXgodGhpcy5wb2ludCkgPT09IDApXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbml0aWFsID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICB0aGlzLnBvaW50Lm1vdmVDYWxsYmFjayA9IHRoaXMudXBkYXRlUG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTW91c2VEb3duKCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgUG9pbnRDbGlja0V2ZW50KHRoaXMpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG4gICAgaWYgKGV2ZW50LmhhbmRsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN0YXJ0UG9pbnREcmFnRXZlbnQodGhpcykpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5zdG9wRHJhZ2dpbmcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgY29uc3QgbW91c2VQb3NpdGlvbiA9IHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyLmdldFBvaW50RnJvbU1vdXNlRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUG9pbnREcmFnRXZlbnQodGhpcywgbW91c2VQb3NpdGlvbikpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmcoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBGaW5pc2hQb2ludERyYWdFdmVudCh0aGlzKSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuc3RvcERyYWdnaW5nKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQudHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmFwcGxpY2F0aW9uLXVpX192ZXJ0ZXgge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxuICB3aWR0aDogMTBweDtcXG4gIGhlaWdodDogMTBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpOyB9XFxuICAuYXBwbGljYXRpb24tdWlfX3ZlcnRleDphY3RpdmUge1xcbiAgICBib3JkZXItY29sb3I6IHJlZDtcXG4gICAgYm9yZGVyLXdpZHRoOiAycHg7IH1cXG5cXG4uYXBwbGljYXRpb24tdWlfX3ZlcnRleC0taW5pdGlhbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1MWZmOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEhvcml6b250YWxMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9Ib3Jpem9udGFsTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBWZXJ0aWNhbExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL1ZlcnRpY2FsTGluZUNvbmRpdGlvbic7XHJcblxyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5cclxuY29uc3QgZm9yYmlkZGVuQ29uZGl0aW9uQ29tYmluYXRpb25zID0gW1xyXG4gIFtIb3Jpem9udGFsTGluZUNvbmRpdGlvbiwgSG9yaXpvbnRhbExpbmVDb25kaXRpb25dLFxyXG4gIFtWZXJ0aWNhbExpbmVDb25kaXRpb24sIFZlcnRpY2FsTGluZUNvbmRpdGlvbl1cclxuXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25NYXRjaGVyIHtcclxuICBwdWJsaWMgdmVyaWZ5Q29uZGl0aW9uQWxsb3dlZChjb25kaXRpb246IExpbmVDb25kaXRpb24pIHtcclxuICAgIGNvbnN0IHBvbHlnb24gPSBjb25kaXRpb24ucG9seWdvbjtcclxuICAgIGNvbnN0IGxpbmUgPSBjb25kaXRpb24ubGluZTtcclxuXHJcbiAgICBjb25zdCBwMUluZGV4ID0gcG9seWdvbi5maW5kUG9pbnRJbmRleChsaW5lLnAxKTtcclxuICAgIGNvbnN0IHByZXZpb3VzUG9pbnQgPSBwb2x5Z29uLmdldFZlcnRleCh0aGlzLmdldFByZXZpb3VzUG9pbnRJbmRleChwMUluZGV4LCBwb2x5Z29uKSk7XHJcbiAgICBjb25zdCBwMkluZGV4ID0gcG9seWdvbi5maW5kUG9pbnRJbmRleChsaW5lLnAyKTtcclxuICAgIGNvbnN0IG5leHRQb2ludCA9IHBvbHlnb24uZ2V0VmVydGV4KHRoaXMuZ2V0TmV4dFBvaW50SW5kZXgocDJJbmRleCwgcG9seWdvbikpO1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzTGluZSA9IG5ldyBMaW5lKHByZXZpb3VzUG9pbnQsIGxpbmUucDEpO1xyXG4gICAgY29uc3QgbmV4dExpbmUgPSBuZXcgTGluZShsaW5lLnAyLCBuZXh0UG9pbnQpO1xyXG5cclxuICAgIGNvbnN0IGxpbmVDb25kaXRpb25zID0gcG9seWdvbi5nZXRMaW5lQ29uZGl0aW9ucygpO1xyXG4gICAgY29uc3QgcHJldmlvdXNMaW5lQ29uZGl0aW9ucyA9IGxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+XHJcbiAgICAgIGxpbmVDb25kaXRpb24ubGluZS5lcXVhbHMocHJldmlvdXNMaW5lKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG5leHRMaW5lQ29uZGl0aW9ucyA9IGxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+XHJcbiAgICAgIGxpbmVDb25kaXRpb24ubGluZS5lcXVhbHMobmV4dExpbmUpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMudmVyaWZ5Tm90Rm9yYmlkZGVuQ29tYmluYXRpb24ocHJldmlvdXNMaW5lQ29uZGl0aW9ucywgY29uZGl0aW9uKTtcclxuICAgIHRoaXMudmVyaWZ5Tm90Rm9yYmlkZGVuQ29tYmluYXRpb24obmV4dExpbmVDb25kaXRpb25zLCBjb25kaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoZWNrRm9yYmlkZGVuQ29tYmluYXRpb24oY29uc3RydWN0b3IxOiBGdW5jdGlvbiwgY29uc3RydWN0b3IyOiBGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGZvcmJpZGRlbkNvbmRpdGlvbkNvbWJpbmF0aW9ucy5maW5kKFxyXG4gICAgICBjb21iaW5hdGlvbiA9PlxyXG4gICAgICAgIChjb25zdHJ1Y3RvcjEgPT09IGNvbWJpbmF0aW9uWzBdICYmIGNvbnN0cnVjdG9yMiA9PT0gY29tYmluYXRpb25bMV0pIHx8XHJcbiAgICAgICAgKGNvbnN0cnVjdG9yMSA9PT0gY29tYmluYXRpb25bMV0gJiYgY29uc3RydWN0b3IyID09PSBjb21iaW5hdGlvblswXSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZlcmlmeU5vdEZvcmJpZGRlbkNvbWJpbmF0aW9uKFxyXG4gICAgbGluZUNvbmRpdGlvbnM6IExpbmVDb25kaXRpb25bXSxcclxuICAgIHNpbmdsZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvblxyXG4gICkge1xyXG4gICAgZm9yIChjb25zdCBsaW5lQ29uZGl0aW9uIG9mIGxpbmVDb25kaXRpb25zKSB7XHJcbiAgICAgIGNvbnN0IGZvcmJpZGRlbkNvbmRpdGlvbiA9IHRoaXMuY2hlY2tGb3JiaWRkZW5Db21iaW5hdGlvbihcclxuICAgICAgICBsaW5lQ29uZGl0aW9uLmNvbnN0cnVjdG9yLFxyXG4gICAgICAgIHNpbmdsZUNvbmRpdGlvbi5jb25zdHJ1Y3RvclxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKGZvcmJpZGRlbkNvbmRpdGlvbikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgIGBGb3JiaWRkZW4gY29tYmluYXRpb246ICR7Zm9yYmlkZGVuQ29uZGl0aW9uWzBdLm5hbWV9LCAke2ZvcmJpZGRlbkNvbmRpdGlvblsxXS5uYW1lfWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFByZXZpb3VzUG9pbnRJbmRleChjdXJyZW50SW5kZXg6IG51bWJlciwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgY3VycmVudEluZGV4IC09IDE7XHJcbiAgICBpZiAoY3VycmVudEluZGV4IDwgMCkge1xyXG4gICAgICBjdXJyZW50SW5kZXggPSBwb2x5Z29uLmdldFZlcnRpY2VzQ291bnQoKSAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TmV4dFBvaW50SW5kZXgoY3VycmVudEluZGV4OiBudW1iZXIsIHBvbHlnb246IFBvbHlnb24pIHtcclxuICAgIHJldHVybiAoY3VycmVudEluZGV4ICsgMSkgJSBwb2x5Z29uLmdldFZlcnRpY2VzQ291bnQoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9Db25kaXRpb25NYXRjaGVyLnRzIiwiaW1wb3J0IHsgSW5zdHJ1Y3Rpb25zRGlhbG9nIH0gZnJvbSAndWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnN0cnVjdGlvbnNCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgcHJpdmF0ZSBidXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuYnV0dG9uLnRleHRDb250ZW50ID0gJ0luc3RydWN0aW9ucyc7XHJcbiAgICB0aGlzLmJ1dHRvbi5jbGFzc05hbWUgPSAnaW5zdHJ1Y3Rpb25zLWJ1dHRvbic7XHJcblxyXG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrID0gdGhpcy5vbkJ1dHRvbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uKTtcclxuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkJ1dHRvbkNsaWNrKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5idXR0b24pO1xyXG4gICAgdGhpcy5idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQnV0dG9uQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkJ1dHRvbkNsaWNrKCkge1xyXG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zRGlhbG9nID0gbmV3IEluc3RydWN0aW9uc0RpYWxvZygpO1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbnNEaWFsb2cpO1xyXG4gIH1cclxufVxyXG5cclxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLWluc3RydWN0aW9ucy1idXR0b24nLCBJbnN0cnVjdGlvbnNCdXR0b24pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNCdXR0b24udHMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5pbnN0cnVjdGlvbnMtZGlhbG9nLXdyYXBwZXIge1xcbiAgei1pbmRleDogMjsgfVxcblxcbi5pbnN0cnVjdGlvbnMtZGlhbG9nX19vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiAyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAyNTBtcyBlYXNlLWluLW91dDsgfVxcblxcbi5pbnN0cnVjdGlvbnMtZGlhbG9nX19vdmVybGF5LS1hY3RpdmUge1xcbiAgb3BhY2l0eTogMC41OyB9XFxuXFxuLmluc3RydWN0aW9ucy1kaWFsb2cge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB6LWluZGV4OiAyO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCwgMCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWYzNTBmO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxuICBjb2xvcjogI2VlZTtcXG4gIHBhZGRpbmc6IDJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBib3gtc2hhZG93OiAycHggMnB4IDVweCBibGFjaztcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyNTBtcyBlYXNlLWluLW91dDsgfVxcblxcbi5pbnN0cnVjdGlvbnMtZGlhbG9nLS1hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSwgMSk7IH1cXG5cXG4uaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fdGl0bGUge1xcbiAgbWFyZ2luOiAwOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9