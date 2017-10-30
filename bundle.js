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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Octant_1 = __webpack_require__(19);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COLORS_1 = __webpack_require__(9);
const LineProperties_1 = __webpack_require__(12);
const Point_1 = __webpack_require__(0);
const configuration = {
    newLinePreviewProperties: new LineProperties_1.LineProperties(COLORS_1.COLORS.BLUE, 2),
    newPolygonLineProperties: new LineProperties_1.LineProperties(COLORS_1.COLORS.RED, 1),
    polygonLineProperties: LineProperties_1.LineProperties.getDefault(),
    applicationUIContainerID: 'application-ui',
    hitTolerance: 10,
    minPolygonPoints: 3,
    doubleClickMaxDelay: 500,
    displayPathGhostWhenDragging: false,
    epsilon: 0.1,
    lineDeviationAllowanceInDegrees: 20,
    canvasFont: '30pt serif',
    lineConditionLabelOffset: new Point_1.Point(5, 0),
    removeConditionsWhenInsertingPoints: true
};
exports.configuration = configuration;


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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(0);
class Line {
    constructor(p1, p2) {
        if (p1.equals(p2)) {
            throw new Error('Cannot create line between points at the same coordinates');
        }
        this.p1 = p1;
        this.p2 = p2;
    }
    distanceToPoint(p) {
        const pointProjection = this.projectPoint(p);
        return Point_1.Point.getDistanceBetween(p, pointProjection);
    }
    projectPoint(p) {
        const p1 = this.p1;
        const p2 = this.p2;
        let t = ((p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y)) /
            Point_1.Point.getDistanceBetweenSquared(p1, p2);
        t = Math.max(0, Math.min(1, t));
        return new Point_1.Point(p1.x + t * (p2.x - p1.x), p1.y + t * (p2.y - p1.y));
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

var	fixUrls = __webpack_require__(29);

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
const Line_1 = __webpack_require__(5);
const Path_1 = __webpack_require__(11);
const configuration_1 = __webpack_require__(1);
const ConditionDeserializer_1 = __webpack_require__(36);
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
    static fromSerializablePolygon(serializablePolygon) {
        const path = Path_1.Path.fromSerializablePath(serializablePolygon);
        const polygon = new Polygon(path);
        const conditionDeserializer = new ConditionDeserializer_1.ConditionDeserializer();
        serializablePolygon.lineConditions.forEach(condition => {
            const deserializedCondition = conditionDeserializer.deserializeCondition(polygon, condition);
            polygon.addLineCondition(deserializedCondition);
        });
        return polygon;
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
            if (configuration_1.configuration.removeConditionsWhenInsertingPoints) {
                matchingConditions.forEach(lineCondition => {
                    this.removeLineCondition(lineCondition);
                });
            }
            else {
                throw new Error(`Cannot insert a point because of an existing condition (${matchingConditions[0].constructor
                    .name})`);
            }
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
    toSerializableObject() {
        const pathSerializableObject = super.toSerializableObject();
        const serializedLineConditions = this.lineConditions.map(lineCondition => lineCondition.toSerializableObject());
        return Object.assign({}, pathSerializableObject, {
            lineConditions: serializedLineConditions
        });
    }
}
exports.Polygon = Polygon;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __webpack_require__(35);
exports.COLORS = {
    BLACK: new Color_1.Color(0, 0, 0),
    RED: new Color_1.Color(255, 0, 0),
    BLUE: new Color_1.Color(0, 255, 0),
    GREEN: new Color_1.Color(0, 0, 255)
};
Object.freeze(exports.COLORS);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Path_1 = __webpack_require__(11);
const Polygon_1 = __webpack_require__(8);
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
    toSerializableObject() {
        return {
            name: this.name,
            paths: this.paths.map(path => path.toSerializableObject())
        };
    }
    fromSerializableObject(serializableLayer) {
        this.name = serializableLayer.name;
        this.paths.splice(0, this.paths.length);
        serializableLayer.paths.forEach(serializablePath => {
            let pathOrPolygon;
            if (!serializablePath.closed) {
                pathOrPolygon = Path_1.Path.fromSerializablePath(serializablePath);
            }
            else {
                pathOrPolygon = Polygon_1.Polygon.fromSerializablePolygon(serializablePath);
            }
            this.paths.push(pathOrPolygon);
        });
    }
}
exports.Layer = Layer;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HitTestResult_1 = __webpack_require__(34);
const Line_1 = __webpack_require__(5);
const LineProperties_1 = __webpack_require__(12);
const Point_1 = __webpack_require__(0);
const configuration_1 = __webpack_require__(1);
class Path {
    constructor(vertices, lineProperties) {
        this.closed = false;
        this.vertices = vertices;
        this.lineProperties = lineProperties;
    }
    static fromSerializablePath(serializablePath) {
        const realPoints = serializablePath.vertices.map(vertex => new Point_1.Point(vertex.x, vertex.y));
        const realLineProperties = new LineProperties_1.LineProperties(serializablePath.lineProperties.color, serializablePath.lineProperties.thickness);
        const path = new Path(realPoints, realLineProperties);
        path.closed = serializablePath.closed;
        return path;
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
    getBoundingBox() {
        let minX = Infinity;
        let maxX = 0;
        let minY = Infinity;
        let maxY = 0;
        this.vertices.forEach(point => {
            if (point.x < minX) {
                minX = point.x;
            }
            if (point.x > maxX) {
                maxX = point.x;
            }
            if (point.y < minY) {
                minY = point.y;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
        });
        return {
            minX,
            maxX,
            minY,
            maxY
        };
    }
    isPointInBoundingBox(point) {
        const boundingBox = this.getBoundingBox();
        return (point.x >= boundingBox.minX &&
            point.x <= boundingBox.maxX &&
            point.y >= boundingBox.minY &&
            point.y <= boundingBox.maxY);
    }
    toSerializableObject() {
        return {
            lineProperties: this.lineProperties.clone(),
            closed: this.closed,
            vertices: this.vertices.map(vertex => ({
                x: vertex.x,
                y: vertex.y
            }))
        };
    }
}
exports.Path = Path;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COLORS_1 = __webpack_require__(9);
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
/* 13 */
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
    toSerializableObject() {
        throw new Error('Not implemented');
    }
}
exports.LineCondition = LineCondition;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(0);
const LineCondition_1 = __webpack_require__(13);
const configuration_1 = __webpack_require__(1);
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
    toSerializableObject() {
        return {
            name: HorizontalLineCondition.name,
            p1Index: this.polygon.findPointIndex(this.line.p1),
            p2Index: this.polygon.findPointIndex(this.line.p2)
        };
    }
    alignPointsHorizontally(subject, destination) {
        subject.moveTo(new Point_1.Point(subject.x, destination.y));
    }
}
exports.HorizontalLineCondition = HorizontalLineCondition;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(0);
const LineCondition_1 = __webpack_require__(13);
const configuration_1 = __webpack_require__(1);
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
    toSerializableObject() {
        return {
            name: VerticalLineCondition.name,
            p1Index: this.polygon.findPointIndex(this.line.p1),
            p2Index: this.polygon.findPointIndex(this.line.p2)
        };
    }
    alignPointsVertically(subject, destination) {
        subject.moveTo(new Point_1.Point(destination.x, subject.y));
    }
}
exports.VerticalLineCondition = VerticalLineCondition;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LEX_1 = __webpack_require__(2);
__webpack_require__(47);
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LineCondition_1 = __webpack_require__(13);
const Point_1 = __webpack_require__(0);
const configuration_1 = __webpack_require__(1);
class FixedLengthLineCondition extends LineCondition_1.LineCondition {
    constructor(line, polygon, length) {
        super(line, polygon);
        this.fixedLength = length;
    }
    isMet() {
        const lengthSquared = Point_1.Point.getDistanceBetween(this.line.p1, this.line.p2);
        return Math.abs(lengthSquared - this.fixedLength) < configuration_1.configuration.epsilon;
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
    toSerializableObject() {
        return {
            name: FixedLengthLineCondition.name,
            p1Index: this.polygon.findPointIndex(this.line.p1),
            p2Index: this.polygon.findPointIndex(this.line.p2),
            fixedLength: this.fixedLength
        };
    }
    verifyCanBeApplied() {
        return;
    }
}
exports.FixedLengthLineCondition = FixedLengthLineCondition;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UnidirectionalConditionFixer_1 = __webpack_require__(53);
class BidirectionalConditionFixer {
    constructor(polygon, startingPoint, additionalLineConditions = []) {
        this.unidirectionalConditionFixer = new UnidirectionalConditionFixer_1.UnidirectionalConditionFixer(polygon, startingPoint, additionalLineConditions, UnidirectionalConditionFixer_1.FixingDirection.Normal);
    }
    get startingPoint() {
        return this.unidirectionalConditionFixer.startingPoint;
    }
    set startingPoint(point) {
        this.unidirectionalConditionFixer.startingPoint = point;
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
        this._fixSuccessful = false;
        this.unidirectionalConditionFixer.tryFix();
        if (!this.unidirectionalConditionFixer.fixSuccessful) {
            return;
        }
        const lastLockedPointIndex = this.unidirectionalConditionFixer.lastLockedVertexIndex;
        this.unidirectionalConditionFixer.reset();
        this.unidirectionalConditionFixer.direction = UnidirectionalConditionFixer_1.FixingDirection.Reverse;
        this.unidirectionalConditionFixer.tryFix(lastLockedPointIndex);
        if (this.unidirectionalConditionFixer.fixSuccessful) {
            this._fixSuccessful = true;
        }
    }
    reset() {
        this._fixSuccessful = undefined;
        this.unidirectionalConditionFixer.reset();
    }
}
exports.BidirectionalConditionFixer = BidirectionalConditionFixer;


/***/ }),
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(67);
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
            'Click an edge to add or remove an edge relation',
            'Pressing Ctrl allows dragging a whole polygon',
            'Save allows you to export all the polygons on the screen (along with their relations)',
            'Load allows you to restore the state (from a string created by Save button)'
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(27);
__webpack_require__(30);
__webpack_require__(31);
const Application_1 = __webpack_require__(33);
window.addEventListener('load', bootstrap, false);
function bootstrap() {
    const canvasId = 'main-canvas';
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        throw new Error(`Canvas with id ${canvasId} cannot be found`);
    }
    const application = new Application_1.Application(canvas);
    application.init();
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "html, body {\n  box-sizing: border-box; }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nbody {\n  line-height: 1.5; }\n\n.main-canvas {\n  border: solid 1px black; }\n\n.main-container {\n  width: 100%;\n  margin: 0 1em; }\n\n.canvas-wrapper {\n  width: 100%;\n  position: relative; }\n\n.application-ui {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none; }\n  .application-ui * {\n    pointer-events: all; }\n\n.app-header {\n  margin-bottom: 1em;\n  margin-left: 1em; }\n\n.app-name {\n  margin: 0; }\n\n.footer {\n  margin: 1em 1em; }\n", ""]);

// exports


/***/ }),
/* 29 */
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
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = __webpack_require__(10);
const EventAggregator_1 = __webpack_require__(37);
const LEX_1 = __webpack_require__(2);
const LineRasterizer_1 = __webpack_require__(39);
const Renderer_1 = __webpack_require__(41);
const Stage_1 = __webpack_require__(42);
const UIController_1 = __webpack_require__(43);
const RenderEvent_1 = __webpack_require__(3);
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
/* 34 */
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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = __webpack_require__(5);
const FixedLengthLineCondition_1 = __webpack_require__(20);
const HorizontalLineCondition_1 = __webpack_require__(14);
const VerticalLineCondition_1 = __webpack_require__(15);
class ConditionDeserializer {
    deserializeCondition(polygon, serializableLineCondition) {
        const p1 = polygon.getVertex(serializableLineCondition.p1Index);
        const p2 = polygon.getVertex(serializableLineCondition.p2Index);
        const line = new Line_1.Line(p1, p2);
        switch (serializableLineCondition.name) {
            case FixedLengthLineCondition_1.FixedLengthLineCondition.name:
                return new FixedLengthLineCondition_1.FixedLengthLineCondition(line, polygon, 
                // tslint:disable-next-line no-string-literal
                serializableLineCondition['fixedLength']);
            case HorizontalLineCondition_1.HorizontalLineCondition.name:
                return new HorizontalLineCondition_1.HorizontalLineCondition(line, polygon);
            case VerticalLineCondition_1.VerticalLineCondition.name:
                return new VerticalLineCondition_1.VerticalLineCondition(line, polygon);
            default:
                throw new Error('Invalid line condition name');
        }
    }
}
exports.ConditionDeserializer = ConditionDeserializer;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventQueue_1 = __webpack_require__(38);
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
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(0);
const octant_vector_transformations_1 = __webpack_require__(40);
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Octant_1 = __webpack_require__(19);
const Point_1 = __webpack_require__(0);
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COLORS_1 = __webpack_require__(9);
const Line_1 = __webpack_require__(5);
const Point_1 = __webpack_require__(0);
const Polygon_1 = __webpack_require__(8);
const configuration_1 = __webpack_require__(1);
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
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = __webpack_require__(1);
const LEX_1 = __webpack_require__(2);
const UIConditionController_1 = __webpack_require__(44);
const MousePositionTransformer_1 = __webpack_require__(54);
const NewPolygonUIController_1 = __webpack_require__(55);
const PathDraggingService_1 = __webpack_require__(56);
const PointDraggingService_1 = __webpack_require__(57);
const PointInserterService_1 = __webpack_require__(59);
const PointRemoverService_1 = __webpack_require__(60);
const PointSyncService_1 = __webpack_require__(61);
const ConditionMatcher_1 = __webpack_require__(65);
const LineClickEvent_1 = __webpack_require__(17);
__webpack_require__(66);
__webpack_require__(25);
const LoadButton_1 = __webpack_require__(69);
const SaveButton_1 = __webpack_require__(70);
class UIController {
    constructor(dependencies) {
        this.uiServices = [];
        this.canvas = dependencies.canvas;
        this.renderer = dependencies.renderer;
        this.stage = dependencies.stage;
        this.eventAggregator = dependencies.eventAggregator;
        this.onClick = this.onClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }
    init() {
        const applicationUIContainer = document.getElementById(configuration_1.configuration.applicationUIContainerID);
        if (!applicationUIContainer) {
            throw new Error('Application UI container not found');
        }
        this.applicationUIContainer = applicationUIContainer;
        this.mousePositionTransformer = new MousePositionTransformer_1.MousePositionTransformer(this.canvas);
        this.canvas.addEventListener('click', this.onClick);
        this.canvas.addEventListener('mousedown', this.onMouseDown);
        this.createNewPolygonUIController();
        this.createPointDraggingService();
        this.createPointInserterService();
        this.createPointRemoverService();
        this.createPointSyncService();
        this.createUIConditionController();
        this.createPathDraggingService();
        this.uiServices.forEach(uiService => uiService.init());
        this.addSerializationButtons();
    }
    destroy() {
        this.canvas.removeEventListener('click', this.onClick);
        this.canvas.removeEventListener('mousedown', this.onMouseDown);
        this.uiServices.forEach(uiService => uiService.destroy());
        this.uiServices.splice(0, this.uiServices.length);
        // tslint:disable-next-line
        this.serializationContainer.innerHTML = '';
    }
    addSerializationButtons() {
        const serializationContainer = document.getElementById('serialization-container');
        if (!serializationContainer) {
            throw new Error('Serialization container not found');
        }
        this.serializationContainer = serializationContainer;
        const loadButton = new LoadButton_1.LoadButton({
            eventAggregator: this.eventAggregator,
            stage: this.stage
        });
        const saveButton = new SaveButton_1.SaveButton({
            stage: this.stage
        });
        this.serializationContainer.appendChild(loadButton);
        this.serializationContainer.appendChild(saveButton);
    }
    onMouseDown(event) {
        if (!event.ctrlKey) {
            return;
        }
        this.pathDraggingService.startMovingPath(event);
        return false;
    }
    onClick(event) {
        event.stopPropagation();
        if (this.pathDraggingService.isDragging) {
            return;
        }
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
    createPathDraggingService() {
        this.pathDraggingService = new PathDraggingService_1.PathDraggingService({
            canvas: this.canvas,
            eventAggregator: this.eventAggregator,
            mousePositionTransformer: this.mousePositionTransformer,
            stage: this.stage
        });
        this.uiServices.push(this.pathDraggingService);
    }
}
exports.UIController = UIController;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConditionPicker_1 = __webpack_require__(45);
const Line_1 = __webpack_require__(5);
const Polygon_1 = __webpack_require__(8);
const configuration_1 = __webpack_require__(1);
const LineClickEvent_1 = __webpack_require__(17);
const LEX_1 = __webpack_require__(2);
const BidirectionalConditionFixer_1 = __webpack_require__(21);
const RenderEvent_1 = __webpack_require__(3);
const SyncComponentsEvent_1 = __webpack_require__(4);
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
        const conditionFixer = new BidirectionalConditionFixer_1.BidirectionalConditionFixer(polygonClone, polygonClone.getVertex(p1Index), [
            lineCondition.duplicateForNewLine(new Line_1.Line(polygonClone.getVertex(p1Index), polygonClone.getVertex(p2Index)), polygonClone)
        ]);
        conditionFixer.tryFix();
        if (!conditionFixer.fixSuccessful) {
            conditionFixer.startingPoint = polygonClone.getVertex(p1Index);
            conditionFixer.reset();
            conditionFixer.tryFix();
        }
        if (!conditionFixer.fixSuccessful) {
            return alert('Cannot add a condition');
        }
        realPolygon.moveTo(polygonClone);
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FixedLengthConditionElement_1 = __webpack_require__(46);
const HorizontalLineConditionElement_1 = __webpack_require__(49);
const VerticalLineConditionElement_1 = __webpack_require__(50);
__webpack_require__(51);
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FixedLengthLineCondition_1 = __webpack_require__(20);
const LineConditionElement_1 = __webpack_require__(16);
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".line-condition--active .line-condition__button {\n  box-shadow: 0 0 5px 2px #1b97df; }\n", ""]);

// exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HorizontalLineCondition_1 = __webpack_require__(14);
const LineConditionElement_1 = __webpack_require__(16);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VerticalLineCondition_1 = __webpack_require__(15);
const LineConditionElement_1 = __webpack_require__(16);
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "app-condition-picker {\n  transform: translate(5px, -50%);\n  position: absolute;\n  padding: 0.6em;\n  border: solid 1px #222;\n  border-radius: 10px;\n  background-color: #e2e2e2;\n  box-shadow: 2px 2px 5px black;\n  z-index: 1;\n  display: flex;\n  flex-direction: column; }\n\n.condition-elements-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  .condition-elements-container * {\n    margin-bottom: 5px; }\n    .condition-elements-container *:last-child {\n      margin-bottom: 0; }\n\n.condition-picker__close-button {\n  margin: -2px -2px 3px 0;\n  align-self: flex-end;\n  font-size: 10px; }\n", ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = __webpack_require__(5);
var FixingDirection;
(function (FixingDirection) {
    FixingDirection[FixingDirection["Normal"] = 0] = "Normal";
    FixingDirection[FixingDirection["Reverse"] = 1] = "Reverse";
})(FixingDirection = exports.FixingDirection || (exports.FixingDirection = {}));
class UnidirectionalConditionFixer {
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
    get lastLockedVertexIndex() {
        if (this._lastLockedVertexIndex === undefined) {
            throw new Error('tryFix needs to be called first');
        }
        return this._lastLockedVertexIndex;
    }
    tryFix(pointIndexBoundary) {
        if (this._fixSuccessful !== undefined) {
            throw new Error('ConditionFixer needs to be reset before fixing again');
        }
        const points = this.polygon.getVertices();
        const lineConditions = [...this.polygon.getLineConditions(), ...this.additionalLineConditions];
        const startingPointIndex = this.polygon.findPointIndex(this.startingPoint);
        let lockedPointIndex = startingPointIndex;
        let currentPointIndex = this.getNextPointIndex(lockedPointIndex);
        if (!pointIndexBoundary) {
            pointIndexBoundary = startingPointIndex;
        }
        // tslint:disable-next-line no-constant-condition
        while (true) {
            const currentLine = new Line_1.Line(points[lockedPointIndex], points[currentPointIndex]);
            const currentLineConditions = lineConditions.filter(lineCondition => lineCondition.line.equals(currentLine));
            const unmetLineConditions = currentLineConditions
                .filter(lineCondition => !lineCondition.isMet());
            if (unmetLineConditions.length === 0) {
                this._fixSuccessful = true;
                this._lastLockedVertexIndex = lockedPointIndex;
                return;
            }
            if (currentPointIndex === pointIndexBoundary) {
                break;
            }
            unmetLineConditions
                .forEach(lineCondition => lineCondition.fix(points[lockedPointIndex]));
            lockedPointIndex = currentPointIndex;
            currentPointIndex = this.getNextPointIndex(currentPointIndex);
        }
        this._fixSuccessful = false;
    }
    reset() {
        this._fixSuccessful = undefined;
        this._lastLockedVertexIndex = undefined;
    }
    getNextPointIndex(currentPointIndex) {
        if (this.direction === FixingDirection.Reverse) {
            return this.polygon.getPreviousPointIndex(currentPointIndex);
        }
        return this.polygon.getNextPointIndex(currentPointIndex);
    }
}
exports.UnidirectionalConditionFixer = UnidirectionalConditionFixer;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(0);
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = __webpack_require__(10);
const Path_1 = __webpack_require__(11);
const Polygon_1 = __webpack_require__(8);
const configuration_1 = __webpack_require__(1);
const LEX_1 = __webpack_require__(2);
const PointClickEvent_1 = __webpack_require__(18);
const RenderEvent_1 = __webpack_require__(3);
const SyncComponentsEvent_1 = __webpack_require__(4);
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(0);
const RenderEvent_1 = __webpack_require__(3);
const SyncComponentsEvent_1 = __webpack_require__(4);
class PathDraggingService {
    constructor(dependencies) {
        this._isDragging = false;
        this.eventAggregator = dependencies.eventAggregator;
        this.stage = dependencies.stage;
        this.canvas = dependencies.canvas;
        this.mousePositionTransformer = dependencies.mousePositionTransformer;
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }
    init() {
        // TODO: possible polygon ghost layer here
    }
    destroy() {
        this.stopDraggingPath();
    }
    get isDragging() {
        return this._isDragging;
    }
    startMovingPath(event) {
        const point = this.mousePositionTransformer.getPointFromMouseEvent(event);
        this.pathToDrag = undefined;
        this.previousPoint = undefined;
        for (const layer of this.stage.layers) {
            for (const path of layer.paths) {
                if (!path.isPointInBoundingBox(point)) {
                    continue;
                }
                this.pathToDrag = path;
                break;
            }
        }
        if (!this.pathToDrag) {
            return alert('Cannot drag path - no path found, point is not in the bounding box');
        }
        this.previousPoint = point;
        this._isDragging = true;
        this.addEventListeners();
    }
    addEventListeners() {
        this.canvas.addEventListener('mousemove', this.onMouseMove);
        this.canvas.addEventListener('mouseup', this.onMouseUp);
        this.canvas.addEventListener('mouseout', this.onMouseOut);
    }
    removeEventListeners() {
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        this.canvas.removeEventListener('mouseup', this.onMouseUp);
        this.canvas.removeEventListener('mouseout', this.onMouseOut);
    }
    onMouseMove(event) {
        if (!this.pathToDrag || !this.previousPoint) {
            return;
        }
        const point = this.mousePositionTransformer.getPointFromMouseEvent(event);
        const transitionVector = Point_1.Point.subtract(point, this.previousPoint);
        for (const pathPoint of this.pathToDrag.getVertices()) {
            pathPoint.moveTo(Point_1.Point.add(pathPoint, transitionVector));
        }
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
        this.previousPoint = point;
    }
    onMouseUp(_event) {
        this.stopDraggingPath();
        this.cancelNextClickEvent();
    }
    onMouseOut(_event) {
        this.stopDraggingPath();
        this._isDragging = false;
    }
    stopDraggingPath() {
        this.removeEventListeners();
        this.pathToDrag = undefined;
        this.previousPoint = undefined;
    }
    cancelNextClickEvent() {
        const handler = (event) => {
            this.canvas.removeEventListener('click', handler, true);
            this._isDragging = false;
            event.stopPropagation();
        };
        this.canvas.addEventListener('click', handler, true);
    }
}
exports.PathDraggingService = PathDraggingService;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const COLORS_1 = __webpack_require__(9);
const Layer_1 = __webpack_require__(10);
const LineProperties_1 = __webpack_require__(12);
const Polygon_1 = __webpack_require__(8);
const configuration_1 = __webpack_require__(1);
const LEX_1 = __webpack_require__(2);
const ContinuousConditionFixer_1 = __webpack_require__(58);
const FinishPointDragEvent_1 = __webpack_require__(22);
const PointDragEvent_1 = __webpack_require__(23);
const StartPointDragEvent_1 = __webpack_require__(24);
const RenderEvent_1 = __webpack_require__(3);
const SyncComponentsEvent_1 = __webpack_require__(4);
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
        for (const point of component.path.getVerticesIterator()) {
            if (point.equals(newPosition)) {
                return;
            }
        }
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(0);
const BidirectionalConditionFixer_1 = __webpack_require__(21);
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
        const dragTranslationVector = Point_1.Point.subtract(this.startingPoint, this.clonedStartingPoint);
        this.clonedPolygon.moveTo(this.polygon);
        this.clonedStartingPoint.moveTo(this.startingPoint);
        const conditionFixer = new BidirectionalConditionFixer_1.BidirectionalConditionFixer(this.clonedPolygon, this.clonedStartingPoint, []);
        conditionFixer.tryFix();
        if (!conditionFixer.fixSuccessful) {
            return this.dragWholePolygon(dragTranslationVector);
        }
    }
    propagateChangesToOriginalPolygon() {
        this.polygon.moveTo(this.clonedPolygon);
    }
    dragWholePolygon(translationVector) {
        this.clonedPolygon.moveTo(this.polygon);
        this.clonedPolygon.getVertices().forEach(clonedPoint => {
            clonedPoint.moveTo(Point_1.Point.add(clonedPoint, translationVector));
        });
        this.clonedStartingPoint.moveTo(this.startingPoint);
    }
}
exports.ContinuousConditionFixer = ContinuousConditionFixer;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LineClickEvent_1 = __webpack_require__(17);
const RenderEvent_1 = __webpack_require__(3);
const SyncComponentsEvent_1 = __webpack_require__(4);
const configuration_1 = __webpack_require__(1);
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = __webpack_require__(1);
const PointClickEvent_1 = __webpack_require__(18);
const RenderEvent_1 = __webpack_require__(3);
const SyncComponentsEvent_1 = __webpack_require__(4);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PathPointComponent_1 = __webpack_require__(62);
const SyncComponentsEvent_1 = __webpack_require__(4);
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FinishPointDragEvent_1 = __webpack_require__(22);
const PointDragEvent_1 = __webpack_require__(23);
const StartPointDragEvent_1 = __webpack_require__(24);
const PointClickEvent_1 = __webpack_require__(18);
__webpack_require__(63);
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".application-ui__vertex {\n  border: solid 1px black;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  transform: translate(-50%, -50%); }\n  .application-ui__vertex:active {\n    border-color: red;\n    border-width: 2px; }\n\n.application-ui__vertex--initial {\n  background-color: #0051ff; }\n", ""]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HorizontalLineCondition_1 = __webpack_require__(14);
const VerticalLineCondition_1 = __webpack_require__(15);
const Line_1 = __webpack_require__(5);
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InstructionsDialog_1 = __webpack_require__(25);
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".instructions-dialog-wrapper {\n  z-index: 2; }\n\n.instructions-dialog__overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000;\n  opacity: 0;\n  transition: opacity 250ms ease-in-out; }\n\n.instructions-dialog__overlay--active {\n  opacity: 0.5; }\n\n.instructions-dialog {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: 2;\n  transform: translate(-50%, -50%) scale(0, 0);\n  background-color: #1f350f;\n  border: solid 1px black;\n  color: #eee;\n  padding: 2em;\n  border-radius: 10px;\n  box-shadow: 2px 2px 5px black;\n  transition: transform 250ms ease-in-out; }\n\n.instructions-dialog--active {\n  transform: translate(-50%, -50%) scale(1, 1); }\n\n.instructions-dialog__title {\n  margin: 0; }\n", ""]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RenderEvent_1 = __webpack_require__(3);
const SyncComponentsEvent_1 = __webpack_require__(4);
const LEX_1 = __webpack_require__(2);
class LoadButton extends HTMLElement {
    constructor(dependencies) {
        super();
        this.eventAggregator = dependencies.eventAggregator;
        this.stage = dependencies.stage;
        this.buttonElement = document.createElement('button');
        this.buttonElement.innerText = 'Load';
        this.onClick = this.onClick.bind(this);
    }
    connectedCallback() {
        this.buttonElement.addEventListener('click', this.onClick);
        this.appendChild(this.buttonElement);
    }
    disconnectedCallback() {
        this.removeChild(this.buttonElement);
        this.buttonElement.removeEventListener('click', this.onClick);
    }
    onClick() {
        const serializedData = prompt('Please paste the serialized data');
        if (!serializedData) {
            return;
        }
        const polygonLayer = this.stage.findLayerByName(LEX_1.LEX.POLYGON_LAYER_NAME);
        const currentSerializableLayer = polygonLayer.toSerializableObject();
        try {
            const serializableLayer = JSON.parse(serializedData);
            polygonLayer.fromSerializableObject(serializableLayer);
        }
        catch (error) {
            polygonLayer.fromSerializableObject(currentSerializableLayer);
            alert('Invalid data');
        }
        this.eventAggregator.dispatchEvent(new RenderEvent_1.RenderEvent());
        this.eventAggregator.dispatchEvent(new SyncComponentsEvent_1.SyncComponentsEvent());
    }
}
exports.LoadButton = LoadButton;
customElements.define('app-load-button', LoadButton);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LEX_1 = __webpack_require__(2);
class SaveButton extends HTMLElement {
    constructor(dependencies) {
        super();
        this.stage = dependencies.stage;
        this.buttonElement = document.createElement('button');
        this.buttonElement.innerText = 'Save';
        this.onClick = this.onClick.bind(this);
    }
    connectedCallback() {
        this.buttonElement.addEventListener('click', this.onClick);
        this.appendChild(this.buttonElement);
    }
    disconnectedCallback() {
        this.removeChild(this.buttonElement);
        this.buttonElement.removeEventListener('click', this.onClick);
    }
    onClick() {
        const polygonLayer = this.stage.findLayerByName(LEX_1.LEX.POLYGON_LAYER_NAME);
        const serializableObject = polygonLayer.toSerializableObject();
        const serializedData = JSON.stringify(serializableObject);
        console.log(serializedData);
        prompt('Copy the data', serializedData);
    }
}
exports.SaveButton = SaveButton;
customElements.define('app-save-button', SaveButton);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDE4OWQ0NTJlMzBhZjQ2MTgwZGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9Qb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTEVYLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvUmVuZGVyRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vTGluZS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0NPTE9SUy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0xheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vUGF0aC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0xpbmVQcm9wZXJ0aWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0xpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL0xpbmVDbGlja0V2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvUG9pbnRDbGlja0V2ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vT2N0YW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0ZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy9maXhlcnMvQmlkaXJlY3Rpb25hbENvbmRpdGlvbkZpeGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50cy9wb2ludC1kcmFnL1N0YXJ0UG9pbnREcmFnRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0RpYWxvZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3M/NDQ0NiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcy93ZWJjb21wb25lbnRzLWhpLXNkLWNlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vSGl0VGVzdFJlc3VsdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL0NvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25kaXRpb25zL0NvbmRpdGlvbkRlc2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL0V2ZW50QWdncmVnYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzL0V2ZW50UXVldWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpbmUtcmFzdGVyaXplci9MaW5lUmFzdGVyaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGluZS1yYXN0ZXJpemVyL29jdGFudC12ZWN0b3ItdHJhbnNmb3JtYXRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU3RhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL1VJQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29uZGl0aW9ucy9VSUNvbmRpdGlvbkNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9GaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3M/ZDM2YSIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlci5zY3NzP2U0MzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvZml4ZXJzL1VuaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvTmV3UG9seWdvblVJQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUGF0aERyYWdnaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnREcmFnZ2luZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvZml4ZXJzL0NvbnRpbnVvdXNDb25kaXRpb25GaXhlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvUG9pbnRJbnNlcnRlclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL1BvaW50UmVtb3ZlclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL1BvaW50U3luY1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudC5zY3NzPzcyOWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmRpdGlvbnMvQ29uZGl0aW9uTWF0Y2hlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zQnV0dG9uLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzcz80ZTJmIiwid2VicGFjazovLy8uL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvY29tcG9uZW50cy9zZXJpYWxpemF0aW9uL0xvYWRCdXR0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2NvbXBvbmVudHMvc2VyaWFsaXphdGlvbi9TYXZlQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSx5Q0FBdUM7QUFJdkM7SUFjRSxZQUFZLENBQVMsRUFBRSxDQUFTO1FBYnpCLGlCQUFZLEdBQXdCLElBQUksQ0FBQztRQWM5QyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQVhELElBQVcsQ0FBQztRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFXLENBQUM7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBT00sTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFTLEVBQUUsRUFBUztRQUNwQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FB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eEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sT0FBTztRQUNiLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFL0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFoQ0QsZ0NBZ0NDO0FBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDE4OWQ0NTJlMzBhZjQ2MTgwZGMiLCJpbXBvcnQgeyBPY3RhbnQgfSBmcm9tICdjb21tb24vT2N0YW50JztcclxuXHJcbnR5cGUgTW92ZUNhbGxiYWNrID0gKCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludCB7XHJcbiAgcHVibGljIG1vdmVDYWxsYmFjazogTW92ZUNhbGxiYWNrIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgX3g6IG51bWJlcjtcclxuICBwcml2YXRlIF95OiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBnZXQgeCgpIHtcclxuICAgIHJldHVybiB0aGlzLl94O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5feCA9IHg7XHJcbiAgICB0aGlzLl95ID0geTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KTogUG9pbnQge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludChwMS54ICsgcDIueCwgcDEueSArIHAyLnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBzdWJ0cmFjdChwMTogUG9pbnQsIHAyOiBQb2ludCk6IFBvaW50IHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQocDEueCAtIHAyLngsIHAxLnkgLSBwMi55KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGlzdGFuY2VCZXR3ZWVuKHAxOiBQb2ludCwgcDI6IFBvaW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZChwMSwgcDIpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZChwMTogUG9pbnQsIHAyOiBQb2ludCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5wb3cocDEueCAtIHAyLngsIDIpICsgTWF0aC5wb3cocDEueSAtIHAyLnksIDIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRBbmdsZShwMTogUG9pbnQsIHAyOiBQb2ludCk6IG51bWJlciB7XHJcbiAgICBsZXQgYW5nbGUgPSAoTWF0aC5hdGFuMihwMi55IC0gcDEueSwgcDIueCAtIHAxLngpKSAqIDE4MCAvIE1hdGguUEk7XHJcblxyXG4gICAgaWYgKGFuZ2xlIDwgMCkge1xyXG4gICAgICBhbmdsZSArPSAzNjA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFuZ2xlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVUbyhwb2ludDogUG9pbnQpOiB2b2lkO1xyXG4gIHB1YmxpYyBtb3ZlVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkO1xyXG4gIHB1YmxpYyBtb3ZlVG8ocG9pbnRPclg6IFBvaW50IHwgbnVtYmVyLCB5PzogbnVtYmVyKSB7XHJcbiAgICBpZiAodHlwZW9mIHBvaW50T3JYID09PSAnbnVtYmVyJykge1xyXG4gICAgICBpZiAoIXkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ggaXMgZGVmaW5lZCwgYnV0IHkgaXMgbm90IGRlZmluZWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMubW92ZVRvQ29vcmRpbmF0ZXMocG9pbnRPclgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLm1vdmVUb1BvaW50KHBvaW50T3JYKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPY3RhbnQoKTogT2N0YW50IHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG4gICAgbGV0IG9jdGFudCA9IE9jdGFudC5GaXJzdDtcclxuXHJcbiAgICBpZiAoeSA+PSAwKSB7XHJcbiAgICAgIGlmICh4ID49IDApIHtcclxuICAgICAgICAvLyBGaXJzdCBxdWFydGVyXHJcbiAgICAgICAgaWYgKHkgPD0geCkge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LkZpcnN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuU2Vjb25kO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBTZWNvbmQgcXVhcnRlclxyXG4gICAgICAgIGlmICh5ID49IC14KSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuVGhpcmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5Gb3VydGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeCA8PSAwKSB7XHJcbiAgICAgICAgLy8gVGhpcmQgcXVhcnRlclxyXG4gICAgICAgIGlmICh5ID49IHgpIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5GaWZ0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2N0YW50ID0gT2N0YW50LlNpeHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBGb3VydGggcXVhcnRlclxyXG4gICAgICAgIGlmICh5IDwgLXgpIHtcclxuICAgICAgICAgIG9jdGFudCA9IE9jdGFudC5TZXZlbnRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvY3RhbnQgPSBPY3RhbnQuRWlnaHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvY3RhbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXF1YWxzKHBvaW50OiBQb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMueCA9PT0gcG9pbnQueCAmJiB0aGlzLnkgPT09IHBvaW50Lnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGlzdGFuY2VUbyhwb2ludDogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIFBvaW50LmdldERpc3RhbmNlQmV0d2Vlbih0aGlzLCBwb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGlzdGFuY2VTcXVhcmVkVG8ocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBQb2ludC5nZXREaXN0YW5jZUJldHdlZW5TcXVhcmVkKHRoaXMsIHBvaW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9uZSgpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtb3ZlVG9Qb2ludChwb2ludDogUG9pbnQpIHtcclxuICAgIHJldHVybiB0aGlzLm1vdmVUb0Nvb3JkaW5hdGVzKHBvaW50LngsIHBvaW50LnkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtb3ZlVG9Db29yZGluYXRlcyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5feCA9IHg7XHJcbiAgICB0aGlzLl95ID0geTtcclxuXHJcbiAgICBpZiAodGhpcy5tb3ZlQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5tb3ZlQ2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL1BvaW50LnRzIiwiaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnY29tbW9uL0NPTE9SUyc7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuY29uc3QgY29uZmlndXJhdGlvbiA9IHtcclxuICBuZXdMaW5lUHJldmlld1Byb3BlcnRpZXM6IG5ldyBMaW5lUHJvcGVydGllcyhDT0xPUlMuQkxVRSwgMiksXHJcbiAgbmV3UG9seWdvbkxpbmVQcm9wZXJ0aWVzOiBuZXcgTGluZVByb3BlcnRpZXMoQ09MT1JTLlJFRCwgMSksXHJcbiAgcG9seWdvbkxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcy5nZXREZWZhdWx0KCksXHJcbiAgYXBwbGljYXRpb25VSUNvbnRhaW5lcklEOiAnYXBwbGljYXRpb24tdWknLFxyXG4gIGhpdFRvbGVyYW5jZTogMTAsXHJcbiAgbWluUG9seWdvblBvaW50czogMyxcclxuICBkb3VibGVDbGlja01heERlbGF5OiA1MDAsXHJcbiAgZGlzcGxheVBhdGhHaG9zdFdoZW5EcmFnZ2luZzogZmFsc2UsXHJcbiAgZXBzaWxvbjogMC4xLFxyXG4gIGxpbmVEZXZpYXRpb25BbGxvd2FuY2VJbkRlZ3JlZXM6IDIwLFxyXG4gIGNhbnZhc0ZvbnQ6ICczMHB0IHNlcmlmJyxcclxuICBsaW5lQ29uZGl0aW9uTGFiZWxPZmZzZXQ6IG5ldyBQb2ludCg1LCAwKSxcclxuICByZW1vdmVDb25kaXRpb25zV2hlbkluc2VydGluZ1BvaW50czogdHJ1ZVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBjb25maWd1cmF0aW9uXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbmZpZ3VyYXRpb24udHMiLCIvLyBEaWN0aW9uYXJ5XHJcbmNvbnN0IExFWCA9IHtcclxuICBQT0xZR09OX0xBWUVSX05BTUU6ICdQb2x5Z29uTGF5ZXInLFxyXG4gIFBBVEhfTEFZRVJfTkFNRTogJ1BhdGhMYXllcicsXHJcbiAgUEFUSF9HSE9TVF9MQVlFUl9OQU1FOiAnUGF0aEdob3N0TGF5ZXInLFxyXG4gIE5FV19DT05ESVRJT05fRVZFTlRfTkFNRTogJ25ldy1jb25kaXRpb24nLFxyXG4gIFJFTU9WRV9DT05ESVRJT05fRVZFTlRfTkFNRTogJ3JlbW92ZS1jb25kaXRpb24nLFxyXG4gIEtFWV9DT0RFOiB7XHJcbiAgICBFU0NBUEU6IDI3XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBMRVhcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvTEVYLnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlckV2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkID0gbnVsbDtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gUmVuZGVyRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnUmVuZGVyRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvUmVuZGVyRXZlbnQudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3luY0NvbXBvbmVudHNFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZCA9IG51bGw7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IFN5bmNDb21wb25lbnRzRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50VHlwZSgpIHtcclxuICAgIHJldHVybiAnU3luY0NvbXBvbmVudHNFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50LnRzIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmUge1xyXG4gIHB1YmxpYyBwMTogUG9pbnQ7XHJcbiAgcHVibGljIHAyOiBQb2ludDtcclxuXHJcbiAgY29uc3RydWN0b3IocDE6IFBvaW50LCBwMjogUG9pbnQpIHtcclxuICAgIGlmIChwMS5lcXVhbHMocDIpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNyZWF0ZSBsaW5lIGJldHdlZW4gcG9pbnRzIGF0IHRoZSBzYW1lIGNvb3JkaW5hdGVzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wMSA9IHAxO1xyXG4gICAgdGhpcy5wMiA9IHAyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3RhbmNlVG9Qb2ludChwOiBQb2ludCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBwb2ludFByb2plY3Rpb24gPSB0aGlzLnByb2plY3RQb2ludChwKTtcclxuXHJcbiAgICByZXR1cm4gUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuKHAsIHBvaW50UHJvamVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcHJvamVjdFBvaW50KHA6IFBvaW50KSB7XHJcbiAgICBjb25zdCBwMSA9IHRoaXMucDE7XHJcbiAgICBjb25zdCBwMiA9IHRoaXMucDI7XHJcblxyXG4gICAgbGV0IHQgPVxyXG4gICAgICAoKHAueCAtIHAxLngpICogKHAyLnggLSBwMS54KSArIChwLnkgLSBwMS55KSAqIChwMi55IC0gcDEueSkpIC9cclxuICAgICAgUG9pbnQuZ2V0RGlzdGFuY2VCZXR3ZWVuU3F1YXJlZChwMSwgcDIpO1xyXG4gICAgdCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHQpKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHAxLnggKyB0ICogKHAyLnggLSBwMS54KSwgcDEueSArIHQgKiAocDIueSAtIHAxLnkpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlcXVhbHMobGluZTogTGluZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgKHRoaXMucDEuZXF1YWxzKGxpbmUucDEpICYmIHRoaXMucDIuZXF1YWxzKGxpbmUucDIpKSB8fFxyXG4gICAgICAodGhpcy5wMS5lcXVhbHMobGluZS5wMikgJiYgdGhpcy5wMi5lcXVhbHMobGluZS5wMSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1pZGRsZVBvaW50KCk6IFBvaW50IHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQoKHRoaXMucDEueCArIHRoaXMucDIueCkgLyAyLCAodGhpcy5wMS55ICsgdGhpcy5wMi55KSAvIDIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExlbmd0aCgpIHtcclxuICAgIHJldHVybiBQb2ludC5nZXREaXN0YW5jZUJldHdlZW4odGhpcy5wMSwgdGhpcy5wMik7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9MaW5lLnRzIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUGF0aCwgU2VyaWFsaXphYmxlUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcblxyXG5pbXBvcnQgeyBDb25kaXRpb25EZXNlcmlhbGl6ZXIgfSBmcm9tICdjb25kaXRpb25zL0NvbmRpdGlvbkRlc2VyaWFsaXplcic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24sIFNlcmlhbGl6YWJsZUxpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemFibGVQb2x5Z29uIGV4dGVuZHMgU2VyaWFsaXphYmxlUGF0aCB7XHJcbiAgbGluZUNvbmRpdGlvbnM6IFNlcmlhbGl6YWJsZUxpbmVDb25kaXRpb25bXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvbHlnb24gZXh0ZW5kcyBQYXRoIHtcclxuICBwcml2YXRlIGxpbmVDb25kaXRpb25zOiBMaW5lQ29uZGl0aW9uW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGg6IFBhdGgpO1xyXG4gIGNvbnN0cnVjdG9yKHZlcnRpY2VzOiBQb2ludFtdLCBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXMpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXRoT3JWZXJ0aWNlczogUGF0aCB8IFBvaW50W10sIGxpbmVQcm9wZXJ0aWVzPzogTGluZVByb3BlcnRpZXMpIHtcclxuICAgIGxldCB2ZXJ0aWNlczogUG9pbnRbXTtcclxuXHJcbiAgICBpZiAocGF0aE9yVmVydGljZXMgaW5zdGFuY2VvZiBQYXRoKSB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBwYXRoT3JWZXJ0aWNlcztcclxuICAgICAgdmVydGljZXMgPSBwYXRoLmdldFZlcnRpY2VzKCk7XHJcbiAgICAgIGxpbmVQcm9wZXJ0aWVzID0gcGF0aC5saW5lUHJvcGVydGllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZlcnRpY2VzID0gcGF0aE9yVmVydGljZXM7XHJcbiAgICAgIGxpbmVQcm9wZXJ0aWVzID0gPExpbmVQcm9wZXJ0aWVzPmxpbmVQcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG5cclxuICAgIFBvbHlnb24uZW5zdXJlVmVydGljZXNMZW5ndGgodmVydGljZXMpO1xyXG4gICAgc3VwZXIodmVydGljZXMsIGxpbmVQcm9wZXJ0aWVzKTtcclxuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgIHRoaXMubGluZUNvbmRpdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZnJvbVNlcmlhbGl6YWJsZVBvbHlnb24oc2VyaWFsaXphYmxlUG9seWdvbjogU2VyaWFsaXphYmxlUG9seWdvbikge1xyXG4gICAgY29uc3QgcGF0aCA9IFBhdGguZnJvbVNlcmlhbGl6YWJsZVBhdGgoc2VyaWFsaXphYmxlUG9seWdvbik7XHJcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24ocGF0aCk7XHJcbiAgICBjb25zdCBjb25kaXRpb25EZXNlcmlhbGl6ZXIgPSBuZXcgQ29uZGl0aW9uRGVzZXJpYWxpemVyKCk7XHJcblxyXG4gICAgc2VyaWFsaXphYmxlUG9seWdvbi5saW5lQ29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XHJcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplZENvbmRpdGlvbiA9IGNvbmRpdGlvbkRlc2VyaWFsaXplci5kZXNlcmlhbGl6ZUNvbmRpdGlvbihwb2x5Z29uLCBjb25kaXRpb24pO1xyXG4gICAgICBwb2x5Z29uLmFkZExpbmVDb25kaXRpb24oZGVzZXJpYWxpemVkQ29uZGl0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBwb2x5Z29uO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZW5zdXJlVmVydGljZXNMZW5ndGgodmVydGljZXM6IFBvaW50W10pIHtcclxuICAgIGlmICh2ZXJ0aWNlcy5sZW5ndGggPj0gY29uZmlndXJhdGlvbi5taW5Qb2x5Z29uUG9pbnRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFBvbHlnb24gbXVzdCBoYXZlIGF0IGxlYXN0ICR7Y29uZmlndXJhdGlvbi5taW5Qb2x5Z29uUG9pbnRzfSB2ZXJ0aWNlc2ApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb25lKCk6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uKHN1cGVyLmNsb25lKCkpO1xyXG5cclxuICAgIHRoaXMubGluZUNvbmRpdGlvbnMuZm9yRWFjaChsaW5lQ29uZGl0aW9uID0+IHtcclxuICAgICAgY29uc3QgcDFJbmRleCA9IHRoaXMuZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAxKTtcclxuICAgICAgY29uc3QgcDJJbmRleCA9IHRoaXMuZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAyKTtcclxuXHJcbiAgICAgIGNvbnN0IG5ld0xpbmVDb25kaXRpb24gPSBsaW5lQ29uZGl0aW9uLmR1cGxpY2F0ZUZvck5ld0xpbmUoXHJcbiAgICAgICAgbmV3IExpbmUocG9seWdvbi52ZXJ0aWNlc1twMUluZGV4XSwgcG9seWdvbi52ZXJ0aWNlc1twMkluZGV4XSksXHJcbiAgICAgICAgcG9seWdvblxyXG4gICAgICApO1xyXG4gICAgICBwb2x5Z29uLmxpbmVDb25kaXRpb25zLnB1c2gobmV3TGluZUNvbmRpdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcG9seWdvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnNlcnRWZXJ0ZXgocG9pbnQ6IFBvaW50LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBwcmV2aW91c1BvaW50SW5kZXggPSB0aGlzLmdldFByZXZpb3VzUG9pbnRJbmRleChpbmRleCk7XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNMaW5lID0gbmV3IExpbmUodGhpcy5nZXRWZXJ0ZXgocHJldmlvdXNQb2ludEluZGV4KSwgdGhpcy5nZXRWZXJ0ZXgoaW5kZXgpKTtcclxuICAgIGNvbnN0IG1hdGNoaW5nQ29uZGl0aW9ucyA9IHRoaXMubGluZUNvbmRpdGlvbnMuZmlsdGVyKGxpbmVDb25kaXRpb24gPT5cclxuICAgICAgbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhwcmV2aW91c0xpbmUpXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChtYXRjaGluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoY29uZmlndXJhdGlvbi5yZW1vdmVDb25kaXRpb25zV2hlbkluc2VydGluZ1BvaW50cykge1xyXG4gICAgICAgIG1hdGNoaW5nQ29uZGl0aW9ucy5mb3JFYWNoKGxpbmVDb25kaXRpb24gPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgIGBDYW5ub3QgaW5zZXJ0IGEgcG9pbnQgYmVjYXVzZSBvZiBhbiBleGlzdGluZyBjb25kaXRpb24gKCR7bWF0Y2hpbmdDb25kaXRpb25zWzBdLmNvbnN0cnVjdG9yXHJcbiAgICAgICAgICAgIC5uYW1lfSlgXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN1cGVyLmluc2VydFZlcnRleChwb2ludCwgaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE5leHRQb2ludEluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiAoaW5kZXggKyAxKSAlIHRoaXMuZ2V0VmVydGljZXNDb3VudCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE5leHRQb2ludChwb2ludDogUG9pbnQpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52ZXJ0aWNlcy5pbmRleE9mKHBvaW50KTtcclxuICAgIGNvbnN0IG5leHRQb2ludEluZGV4ID0gdGhpcy5nZXROZXh0UG9pbnRJbmRleChpbmRleCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VmVydGV4KG5leHRQb2ludEluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcmV2aW91c1BvaW50SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IHByZXZpb3VzUG9pbnRJbmRleCA9IGluZGV4IC0gMTtcclxuICAgIGlmIChwcmV2aW91c1BvaW50SW5kZXggPCAwKSB7XHJcbiAgICAgIHByZXZpb3VzUG9pbnRJbmRleCA9IHRoaXMuZ2V0VmVydGljZXNDb3VudCgpIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJldmlvdXNQb2ludEluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByZXZpb3VzUG9pbnQocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmVydGljZXMuaW5kZXhPZihwb2ludCk7XHJcbiAgICBjb25zdCBwcmV2aW91c1BvaW50SW5kZXggPSB0aGlzLmdldFByZXZpb3VzUG9pbnRJbmRleChpbmRleCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VmVydGV4KHByZXZpb3VzUG9pbnRJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlVmVydGV4KHBvaW50OiBQb2ludCkge1xyXG4gICAgaWYgKHRoaXMuZ2V0VmVydGljZXNDb3VudCgpID09PSBjb25maWd1cmF0aW9uLm1pblBvbHlnb25Qb2ludHMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZGVsZXRlIHZlcnRleCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cGVyLnJlbW92ZVZlcnRleChwb2ludCk7XHJcblxyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbnNUb1JlbW92ZSA9IHRoaXMubGluZUNvbmRpdGlvbnMuZmlsdGVyKFxyXG4gICAgICBsaW5lQ29uZGl0aW9uID0+IGxpbmVDb25kaXRpb24ubGluZS5wMSA9PT0gcG9pbnQgfHwgbGluZUNvbmRpdGlvbi5saW5lLnAyID09PSBwb2ludFxyXG4gICAgKTtcclxuICAgIGxpbmVDb25kaXRpb25zVG9SZW1vdmUuZm9yRWFjaChsaW5lQ29uZGl0aW9uID0+IHRoaXMucmVtb3ZlTGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkTGluZUNvbmRpdGlvbihsaW5lQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uKSB7XHJcbiAgICBpZiAobGluZUNvbmRpdGlvbi5wb2x5Z29uICE9PSB0aGlzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBjb25kaXRpb24gYm91bmQgdG8gd3JvbmcgcG9seWdvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHAxSW5kZXggPSB0aGlzLmZpbmRQb2ludEluZGV4KGxpbmVDb25kaXRpb24ubGluZS5wMSk7XHJcbiAgICBjb25zdCBwMkluZGV4ID0gdGhpcy5maW5kUG9pbnRJbmRleChsaW5lQ29uZGl0aW9uLmxpbmUucDIpO1xyXG4gICAgaWYgKHAxSW5kZXggPT09IC0xIHx8IHAySW5kZXggPT09IC0yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBjb25kaXRpb24gYm91bmQgdG8gd3JvbmcgbGluZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbGluZUNvbmRpdGlvbi5pc01ldCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBjb25kaXRpb24gaXMgbm90IG1ldCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGluZUNvbmRpdGlvbnMucHVzaChsaW5lQ29uZGl0aW9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb246IExpbmVDb25kaXRpb24pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saW5lQ29uZGl0aW9ucy5pbmRleE9mKGxpbmVDb25kaXRpb24pO1xyXG5cclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lIGNvbmRpdGlvbiBub3QgZm91bmQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpbmVDb25kaXRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGluZUNvbmRpdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gWy4uLnRoaXMubGluZUNvbmRpdGlvbnNdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVUbyhwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICBpZiAodGhpcy5nZXRWZXJ0aWNlc0NvdW50KCkgIT09IHBvbHlnb24uZ2V0VmVydGljZXNDb3VudCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIG51bWJlciBvZiB2ZXJ0aWNlcyBkb2VzIG5vdCBtYXRjaCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmVydGljZXMuZm9yRWFjaCgocG9pbnQsIGluZGV4KSA9PiBwb2ludC5tb3ZlVG8ocG9seWdvbi5nZXRWZXJ0ZXgoaW5kZXgpKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9TZXJpYWxpemFibGVPYmplY3QoKTogU2VyaWFsaXphYmxlUG9seWdvbiB7XHJcbiAgICBjb25zdCBwYXRoU2VyaWFsaXphYmxlT2JqZWN0ID0gc3VwZXIudG9TZXJpYWxpemFibGVPYmplY3QoKTtcclxuICAgIGNvbnN0IHNlcmlhbGl6ZWRMaW5lQ29uZGl0aW9ucyA9IHRoaXMubGluZUNvbmRpdGlvbnMubWFwKGxpbmVDb25kaXRpb24gPT4gbGluZUNvbmRpdGlvbi50b1NlcmlhbGl6YWJsZU9iamVjdCgpKTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcGF0aFNlcmlhbGl6YWJsZU9iamVjdCwge1xyXG4gICAgICBsaW5lQ29uZGl0aW9uczogc2VyaWFsaXplZExpbmVDb25kaXRpb25zXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL1BvbHlnb24udHMiLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbW1vbi9Db2xvcic7XHJcblxyXG5leHBvcnQgY29uc3QgQ09MT1JTID0ge1xyXG4gIEJMQUNLOiBuZXcgQ29sb3IoMCwgMCwgMCksXHJcbiAgUkVEOiBuZXcgQ29sb3IoMjU1LCAwLCAwKSxcclxuICBCTFVFOiBuZXcgQ29sb3IoMCwgMjU1LCAwKSxcclxuICBHUkVFTjogbmV3IENvbG9yKDAsIDAsIDI1NSlcclxufTtcclxuXHJcbk9iamVjdC5mcmVlemUoQ09MT1JTKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0NPTE9SUy50cyIsImltcG9ydCB7IEhpdFRlc3RSZXN1bHQgfSBmcm9tICdjb21tb24vSGl0VGVzdFJlc3VsdCc7XHJcbmltcG9ydCB7IFBhdGgsIFNlcmlhbGl6YWJsZVBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiwgU2VyaWFsaXphYmxlUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdSZW5kZXJlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlcmlhbGl6YWJsZUxheWVyIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgcGF0aHM6IChTZXJpYWxpemFibGVQYXRoIHwgU2VyaWFsaXphYmxlUG9seWdvbilbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExheWVyIHtcclxuICBwdWJsaWMgcGF0aHM6IFBhdGhbXSA9IFtdO1xyXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW5kZXIocmVuZGVyZXI6IFJlbmRlcmVyKSB7XHJcbiAgICB0aGlzLnBhdGhzLmZvckVhY2gocGF0aCA9PiByZW5kZXJlci5kcmF3UGF0aChwYXRoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlUGF0aChwYXRoOiBQYXRoKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGF0aHMuaW5kZXhPZihwYXRoKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF0aHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaXRUZXN0KHBvaW50OiBQb2ludCk6IEhpdFRlc3RSZXN1bHQgfCBudWxsIHtcclxuICAgIGZvciAoY29uc3QgcGF0aCBvZiB0aGlzLnBhdGhzKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHBhdGguaGl0VGVzdChwb2ludCk7XHJcbiAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlc3VsdC5sYXllciA9IHRoaXM7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU2VyaWFsaXphYmxlT2JqZWN0KCk6IFNlcmlhbGl6YWJsZUxheWVyIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgcGF0aHM6IHRoaXMucGF0aHMubWFwKHBhdGggPT4gcGF0aC50b1NlcmlhbGl6YWJsZU9iamVjdCgpKVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmcm9tU2VyaWFsaXphYmxlT2JqZWN0KHNlcmlhbGl6YWJsZUxheWVyOiBTZXJpYWxpemFibGVMYXllcikge1xyXG4gICAgdGhpcy5uYW1lID0gc2VyaWFsaXphYmxlTGF5ZXIubmFtZTtcclxuXHJcbiAgICB0aGlzLnBhdGhzLnNwbGljZSgwLCB0aGlzLnBhdGhzLmxlbmd0aCk7XHJcblxyXG4gICAgc2VyaWFsaXphYmxlTGF5ZXIucGF0aHMuZm9yRWFjaChzZXJpYWxpemFibGVQYXRoID0+IHtcclxuICAgICAgbGV0IHBhdGhPclBvbHlnb246IFBhdGggfCBQb2x5Z29uO1xyXG4gICAgICBpZiAoIXNlcmlhbGl6YWJsZVBhdGguY2xvc2VkKSB7XHJcbiAgICAgICAgcGF0aE9yUG9seWdvbiA9IFBhdGguZnJvbVNlcmlhbGl6YWJsZVBhdGgoc2VyaWFsaXphYmxlUGF0aCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGF0aE9yUG9seWdvbiA9IFBvbHlnb24uZnJvbVNlcmlhbGl6YWJsZVBvbHlnb24oPFNlcmlhbGl6YWJsZVBvbHlnb24+c2VyaWFsaXphYmxlUGF0aCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucGF0aHMucHVzaChwYXRoT3JQb2x5Z29uKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vTGF5ZXIudHMiLCJpbXBvcnQgeyBIaXRUZXN0UmVzdWx0IH0gZnJvbSAnY29tbW9uL0hpdFRlc3RSZXN1bHQnO1xyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBMaW5lUHJvcGVydGllcyB9IGZyb20gJ2NvbW1vbi9MaW5lUHJvcGVydGllcyc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemFibGVQYXRoIHtcclxuICBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXM7XHJcbiAgY2xvc2VkOiBib29sZWFuO1xyXG4gIHZlcnRpY2VzOiB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgfVtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGF0aCB7XHJcbiAgcHVibGljIGNsb3NlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBsaW5lUHJvcGVydGllczogTGluZVByb3BlcnRpZXM7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHZlcnRpY2VzOiBQb2ludFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih2ZXJ0aWNlczogUG9pbnRbXSwgbGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzKSB7XHJcbiAgICB0aGlzLnZlcnRpY2VzID0gdmVydGljZXM7XHJcbiAgICB0aGlzLmxpbmVQcm9wZXJ0aWVzID0gbGluZVByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGZyb21TZXJpYWxpemFibGVQYXRoKHNlcmlhbGl6YWJsZVBhdGg6IFNlcmlhbGl6YWJsZVBhdGgpIHtcclxuICAgIGNvbnN0IHJlYWxQb2ludHMgPSBzZXJpYWxpemFibGVQYXRoLnZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gbmV3IFBvaW50KHZlcnRleC54LCB2ZXJ0ZXgueSkpO1xyXG4gICAgY29uc3QgcmVhbExpbmVQcm9wZXJ0aWVzID0gbmV3IExpbmVQcm9wZXJ0aWVzKHNlcmlhbGl6YWJsZVBhdGgubGluZVByb3BlcnRpZXMuY29sb3IsIHNlcmlhbGl6YWJsZVBhdGgubGluZVByb3BlcnRpZXMudGhpY2tuZXNzKTtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgUGF0aChyZWFsUG9pbnRzLCByZWFsTGluZVByb3BlcnRpZXMpO1xyXG4gICAgcGF0aC5jbG9zZWQgPSBzZXJpYWxpemFibGVQYXRoLmNsb3NlZDtcclxuXHJcbiAgICByZXR1cm4gcGF0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyAqZ2V0VmVydGljZXNJdGVyYXRvcigpIHtcclxuICAgIGNvbnN0IHZlcnRpY2VzQ291bnQgPSB0aGlzLnZlcnRpY2VzLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGljZXNDb3VudDsgaSArPSAxKSB7XHJcbiAgICAgIHlpZWxkIHRoaXMudmVydGljZXNbaV07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY2xvc2VkICYmIHZlcnRpY2VzQ291bnQgPiAwKSB7XHJcbiAgICAgIHlpZWxkIHRoaXMudmVydGljZXNbMF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgKmdldExpbmVJdGVyYXRvcigpIHtcclxuICAgIGxldCBwcmV2aW91c1BvaW50O1xyXG5cclxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgdGhpcy5nZXRWZXJ0aWNlc0l0ZXJhdG9yKCkpIHtcclxuICAgICAgaWYgKCFwcmV2aW91c1BvaW50KSB7XHJcbiAgICAgICAgcHJldmlvdXNQb2ludCA9IHBvaW50O1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB5aWVsZCBuZXcgTGluZShwcmV2aW91c1BvaW50LCBwb2ludCk7XHJcbiAgICAgIHByZXZpb3VzUG9pbnQgPSBwb2ludDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTdGFydGluZ1BvaW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXNbMF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmVydGljZXNDb3VudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZlcnRpY2VzLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMaW5lUHJvcGVydGllcygpIHtcclxuICAgIHJldHVybiB0aGlzLmxpbmVQcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpdFRlc3QocG9pbnQ6IFBvaW50KTogSGl0VGVzdFJlc3VsdCB8IG51bGwge1xyXG4gICAgZm9yIChjb25zdCBsaW5lIG9mIHRoaXMuZ2V0TGluZUl0ZXJhdG9yKCkpIHtcclxuICAgICAgaWYgKGxpbmUuZGlzdGFuY2VUb1BvaW50KHBvaW50KSA8PSBjb25maWd1cmF0aW9uLmhpdFRvbGVyYW5jZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgSGl0VGVzdFJlc3VsdChsaW5lLCB0aGlzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZlcnRleChpbmRleDogbnVtYmVyKTogUG9pbnQge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXNbaW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZlcnRpY2VzKCk6IFBvaW50W10ge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkVmVydGV4KHBvaW50OiBQb2ludCkge1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKHBvaW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVWZXJ0ZXgocG9pbnQ6IFBvaW50KSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZFBvaW50SW5kZXgocG9pbnQpO1xyXG5cclxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgdGhpcy52ZXJ0aWNlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluc2VydFZlcnRleChwb2ludDogUG9pbnQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMudmVydGljZXMuc3BsaWNlKGluZGV4LCAwLCBwb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvbmUoKTogUGF0aCB7XHJcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IFsuLi50aGlzLmdldFZlcnRpY2VzKCkubWFwKHBvaW50ID0+IHBvaW50LmNsb25lKCkpXTtcclxuICAgIGNvbnN0IGxpbmVQcm9wZXJ0aWVzID0gdGhpcy5saW5lUHJvcGVydGllcy5jbG9uZSgpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUGF0aCh2ZXJ0aWNlcywgbGluZVByb3BlcnRpZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRQb2ludEluZGV4KHBvaW50OiBQb2ludCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmVydGljZXMuaW5kZXhPZihwb2ludCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Qm91bmRpbmdCb3goKSB7XHJcbiAgICBsZXQgbWluWCA9IEluZmluaXR5O1xyXG4gICAgbGV0IG1heFggPSAwO1xyXG4gICAgbGV0IG1pblkgPSBJbmZpbml0eTtcclxuICAgIGxldCBtYXhZID0gMDtcclxuXHJcbiAgICB0aGlzLnZlcnRpY2VzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICBpZiAocG9pbnQueCA8IG1pblgpIHtcclxuICAgICAgICBtaW5YID0gcG9pbnQueDtcclxuICAgICAgfVxyXG4gICAgICBpZiAocG9pbnQueCA+IG1heFgpIHtcclxuICAgICAgICBtYXhYID0gcG9pbnQueDtcclxuICAgICAgfVxyXG4gICAgICBpZiAocG9pbnQueSA8IG1pblkpIHtcclxuICAgICAgICBtaW5ZID0gcG9pbnQueTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocG9pbnQueSA+IG1heFkpIHtcclxuICAgICAgICBtYXhZID0gcG9pbnQueTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWluWCxcclxuICAgICAgbWF4WCxcclxuICAgICAgbWluWSxcclxuICAgICAgbWF4WVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc1BvaW50SW5Cb3VuZGluZ0JveChwb2ludDogUG9pbnQpIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nQm94ID0gdGhpcy5nZXRCb3VuZGluZ0JveCgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIHBvaW50LnggPj0gYm91bmRpbmdCb3gubWluWCAmJlxyXG4gICAgICBwb2ludC54IDw9IGJvdW5kaW5nQm94Lm1heFggJiZcclxuICAgICAgcG9pbnQueSA+PSBib3VuZGluZ0JveC5taW5ZICYmXHJcbiAgICAgIHBvaW50LnkgPD0gYm91bmRpbmdCb3gubWF4WVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b1NlcmlhbGl6YWJsZU9iamVjdCgpOiBTZXJpYWxpemFibGVQYXRoIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxpbmVQcm9wZXJ0aWVzOiB0aGlzLmxpbmVQcm9wZXJ0aWVzLmNsb25lKCksXHJcbiAgICAgIGNsb3NlZDogdGhpcy5jbG9zZWQsXHJcbiAgICAgIHZlcnRpY2VzOiB0aGlzLnZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gKHtcclxuICAgICAgICB4OiB2ZXJ0ZXgueCxcclxuICAgICAgICB5OiB2ZXJ0ZXgueVxyXG4gICAgICB9KSlcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9QYXRoLnRzIiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb21tb24vQ29sb3InO1xyXG5pbXBvcnQgeyBDT0xPUlMgfSBmcm9tICdjb21tb24vQ09MT1JTJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lUHJvcGVydGllcyB7XHJcbiAgcHVibGljIGNvbG9yOiBDb2xvcjtcclxuICBwdWJsaWMgdGhpY2tuZXNzOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbG9yOiBDb2xvciwgdGhpY2tuZXNzOiBudW1iZXIpIHtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIHRoaXMudGhpY2tuZXNzID0gdGhpY2tuZXNzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXREZWZhdWx0KCk6IExpbmVQcm9wZXJ0aWVzIHtcclxuICAgIHJldHVybiBuZXcgTGluZVByb3BlcnRpZXMoQ09MT1JTLkJMQUNLLCAxKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9uZSgpOiBMaW5lUHJvcGVydGllcyB7XHJcbiAgICByZXR1cm4gbmV3IExpbmVQcm9wZXJ0aWVzKHRoaXMuY29sb3IsIHRoaXMudGhpY2tuZXNzKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0xpbmVQcm9wZXJ0aWVzLnRzIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemFibGVMaW5lQ29uZGl0aW9uIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgcDFJbmRleDogbnVtYmVyO1xyXG4gIHAySW5kZXg6IG51bWJlcjtcclxuICBbcHJvcGVydHk6IHN0cmluZ106IG51bWJlciB8IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVDb25kaXRpb24ge1xyXG4gIHB1YmxpYyByZWFkb25seSBsaW5lOiBMaW5lO1xyXG4gIHB1YmxpYyByZWFkb25seSBwb2x5Z29uOiBQb2x5Z29uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xyXG4gICAgdGhpcy5wb2x5Z29uID0gcG9seWdvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc01ldCgpOiBib29sZWFuIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTGluZUNvbmRpdGlvbi5pc01ldCBub3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaXgoX2xvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdMaW5lQ29uZGl0aW9uLmZpeCBub3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkdXBsaWNhdGVGb3JOZXdMaW5lKF9saW5lOiBMaW5lLCBfcG9seWdvbjogUG9seWdvbik6IExpbmVDb25kaXRpb24ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2ZXJpZnlDYW5CZUFwcGxpZWQoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExhYmVsKCk6IHN0cmluZyB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU2VyaWFsaXphYmxlT2JqZWN0KCk6IFNlcmlhbGl6YWJsZUxpbmVDb25kaXRpb24ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uLnRzIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuY29uc3QgbWF4RGV2aWF0aW9uID0gY29uZmlndXJhdGlvbi5saW5lRGV2aWF0aW9uQWxsb3dhbmNlSW5EZWdyZWVzO1xyXG5cclxuY29uc3QgYWxsb3dlZERlZ3JlZVJhbmdlcyA9IFtcclxuICBbMCwgbWF4RGV2aWF0aW9uXSxcclxuICBbMTgwIC0gbWF4RGV2aWF0aW9uLCAxODAgKyBtYXhEZXZpYXRpb25dLFxyXG4gIFszNjAgLSBtYXhEZXZpYXRpb24sIDM2MF1cclxuXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbiBleHRlbmRzIExpbmVDb25kaXRpb24ge1xyXG4gIHB1YmxpYyBpc01ldCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxpbmUucDEueSA9PT0gdGhpcy5saW5lLnAyLnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KGxvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgaWYgKGxvY2tlZFBvaW50ID09PSB0aGlzLmxpbmUucDEpIHtcclxuICAgICAgdGhpcy5hbGlnblBvaW50c0hvcml6b250YWxseSh0aGlzLmxpbmUucDIsIHRoaXMubGluZS5wMSk7XHJcbiAgICB9IGVsc2UgaWYgKGxvY2tlZFBvaW50ID09PSB0aGlzLmxpbmUucDIpIHtcclxuICAgICAgdGhpcy5hbGlnblBvaW50c0hvcml6b250YWxseSh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvY2tlZCBwb2ludCBkb2VzIG5vdCBtYXRjaCBlaXRoZXIgcG9pbnQgb24gdGhlIGxpbmUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkdXBsaWNhdGVGb3JOZXdMaW5lKGxpbmU6IExpbmUsIHBvbHlnb246IFBvbHlnb24pIHtcclxuICAgIHJldHVybiBuZXcgSG9yaXpvbnRhbExpbmVDb25kaXRpb24obGluZSwgcG9seWdvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmVyaWZ5Q2FuQmVBcHBsaWVkKCkge1xyXG4gICAgY29uc3QgYW5nbGUgPSBQb2ludC5nZXRBbmdsZSh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcblxyXG4gICAgaWYgKCFhbGxvd2VkRGVncmVlUmFuZ2VzLnNvbWUoZGVncmVlUmFuZ2UgPT4gYW5nbGUgPj0gZGVncmVlUmFuZ2VbMF0gJiYgYW5nbGUgPD0gZGVncmVlUmFuZ2VbMV0pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBpcyBub3QgaG9yaXpvbnRhbCBlbm91Z2gnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMYWJlbCgpIHtcclxuICAgIHJldHVybiAnLSc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9TZXJpYWxpemFibGVPYmplY3QoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBIb3Jpem9udGFsTGluZUNvbmRpdGlvbi5uYW1lLFxyXG4gICAgICBwMUluZGV4OiB0aGlzLnBvbHlnb24uZmluZFBvaW50SW5kZXgodGhpcy5saW5lLnAxKSxcclxuICAgICAgcDJJbmRleDogdGhpcy5wb2x5Z29uLmZpbmRQb2ludEluZGV4KHRoaXMubGluZS5wMilcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFsaWduUG9pbnRzSG9yaXpvbnRhbGx5KHN1YmplY3Q6IFBvaW50LCBkZXN0aW5hdGlvbjogUG9pbnQpIHtcclxuICAgIHN1YmplY3QubW92ZVRvKG5ldyBQb2ludChzdWJqZWN0LngsIGRlc3RpbmF0aW9uLnkpKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9Ib3Jpem9udGFsTGluZUNvbmRpdGlvbi50cyIsImltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuXHJcbmNvbnN0IG1heERldmlhdGlvbiA9IGNvbmZpZ3VyYXRpb24ubGluZURldmlhdGlvbkFsbG93YW5jZUluRGVncmVlcztcclxuXHJcbmNvbnN0IGFsbG93ZWREZWdyZWVSYW5nZXMgPSBbXHJcbiAgWzkwIC0gbWF4RGV2aWF0aW9uLCA5MCArIG1heERldmlhdGlvbl0sXHJcbiAgWzI3MCAtIG1heERldmlhdGlvbiwgMjcwICsgbWF4RGV2aWF0aW9uXVxyXG5dO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsTGluZUNvbmRpdGlvbiBleHRlbmRzIExpbmVDb25kaXRpb24ge1xyXG4gIHB1YmxpYyBpc01ldCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxpbmUucDEueCA9PT0gdGhpcy5saW5lLnAyLng7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KGxvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgaWYgKGxvY2tlZFBvaW50ID09PSB0aGlzLmxpbmUucDEpIHtcclxuICAgICAgdGhpcy5hbGlnblBvaW50c1ZlcnRpY2FsbHkodGhpcy5saW5lLnAyLCB0aGlzLmxpbmUucDEpO1xyXG4gICAgfSBlbHNlIGlmIChsb2NrZWRQb2ludCA9PT0gdGhpcy5saW5lLnAyKSB7XHJcbiAgICAgIHRoaXMuYWxpZ25Qb2ludHNWZXJ0aWNhbGx5KHRoaXMubGluZS5wMSwgdGhpcy5saW5lLnAyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTG9ja2VkIHBvaW50IGRvZXMgbm90IG1hdGNoIGVpdGhlciBwb2ludCBvbiB0aGUgbGluZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGR1cGxpY2F0ZUZvck5ld0xpbmUobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgcmV0dXJuIG5ldyBWZXJ0aWNhbExpbmVDb25kaXRpb24obGluZSwgcG9seWdvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmVyaWZ5Q2FuQmVBcHBsaWVkKCkge1xyXG4gICAgY29uc3QgYW5nbGUgPSBQb2ludC5nZXRBbmdsZSh0aGlzLmxpbmUucDEsIHRoaXMubGluZS5wMik7XHJcblxyXG4gICAgaWYgKCFhbGxvd2VkRGVncmVlUmFuZ2VzLnNvbWUoZGVncmVlUmFuZ2UgPT4gYW5nbGUgPj0gZGVncmVlUmFuZ2VbMF0gJiYgYW5nbGUgPD0gZGVncmVlUmFuZ2VbMV0pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGluZSBpcyBub3QgdmVydGljYWwgZW5vdWdoJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFiZWwoKSB7XHJcbiAgICByZXR1cm4gJ3wnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU2VyaWFsaXphYmxlT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogVmVydGljYWxMaW5lQ29uZGl0aW9uLm5hbWUsXHJcbiAgICAgIHAxSW5kZXg6IHRoaXMucG9seWdvbi5maW5kUG9pbnRJbmRleCh0aGlzLmxpbmUucDEpLFxyXG4gICAgICBwMkluZGV4OiB0aGlzLnBvbHlnb24uZmluZFBvaW50SW5kZXgodGhpcy5saW5lLnAyKVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWxpZ25Qb2ludHNWZXJ0aWNhbGx5KHN1YmplY3Q6IFBvaW50LCBkZXN0aW5hdGlvbjogUG9pbnQpIHtcclxuICAgIHN1YmplY3QubW92ZVRvKG5ldyBQb2ludChkZXN0aW5hdGlvbi54LCBzdWJqZWN0LnkpKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb24udHMiLCJpbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHtcclxuICBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyxcclxuICBTZWxlY3RlZFRhcmdldFxyXG59IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzJztcclxuXHJcbmltcG9ydCAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzcyc7XHJcblxyXG5jb25zdCBMSU5FX0NPTkRJVElPTl9BQ1RJVkVfQ0xBU1MgPSAnbGluZS1jb25kaXRpb24tLWFjdGl2ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUNvbmRpdGlvbkVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNlbGVjdGVkVGFyZ2V0OiBTZWxlY3RlZFRhcmdldDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcykge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYXJnZXQgPSBkZXBlbmRlbmNpZXMuc2VsZWN0ZWRUYXJnZXQ7XHJcblxyXG4gICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuYnV0dG9uLmNsYXNzTmFtZSA9ICdsaW5lLWNvbmRpdGlvbl9fYnV0dG9uJztcclxuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkJ1dHRvbkNsaWNrLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuYnV0dG9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVCdXR0b24oKSB7XHJcbiAgICBjb25zdCB0YXJnZXRDb25kaXRpb25zID0gdGhpcy5nZXRUYXJnZXRDb25kaXRpb25zKCk7XHJcbiAgICBjb25zdCBvdGhlckNvbmRpdGlvbnMgPSB0aGlzLmdldE90aGVyVGFyZ2V0Q29uZGl0aW9ucyh0YXJnZXRDb25kaXRpb25zKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbi5kaXNhYmxlZCA9IG90aGVyQ29uZGl0aW9ucy5sZW5ndGggPiAwO1xyXG5cclxuICAgIGlmICh0YXJnZXRDb25kaXRpb25zLmxlbmd0aCAtIG90aGVyQ29uZGl0aW9ucy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKExJTkVfQ09ORElUSU9OX0FDVElWRV9DTEFTUyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoTElORV9DT05ESVRJT05fQUNUSVZFX0NMQVNTKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVOZXdDb25kaXRpb24oKTogTGluZUNvbmRpdGlvbiB8IG51bGwge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRMaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IoKTogRnVuY3Rpb24ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25CdXR0b25DbGljayhldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0Q29uZGl0aW9ucyA9IHRoaXMuZ2V0VGFyZ2V0Q29uZGl0aW9ucygpO1xyXG4gICAgY29uc3Qgb3RoZXJDb25kaXRpb25zID0gdGhpcy5nZXRPdGhlclRhcmdldENvbmRpdGlvbnModGFyZ2V0Q29uZGl0aW9ucyk7XHJcblxyXG4gICAgaWYgKHRhcmdldENvbmRpdGlvbnMubGVuZ3RoIC0gb3RoZXJDb25kaXRpb25zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBjb25zdCBjb25kaXRpb24gPSB0YXJnZXRDb25kaXRpb25zWzBdO1xyXG5cclxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChMRVguUkVNT1ZFX0NPTkRJVElPTl9FVkVOVF9OQU1FLCB7IGJ1YmJsZXM6IHRydWUsIGRldGFpbDogY29uZGl0aW9uIH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjb25kaXRpb24gPSB0aGlzLmNyZWF0ZU5ld0NvbmRpdGlvbigpO1xyXG4gICAgICBpZiAoIWNvbmRpdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChMRVguTkVXX0NPTkRJVElPTl9FVkVOVF9OQU1FLCB7IGJ1YmJsZXM6IHRydWUsIGRldGFpbDogY29uZGl0aW9uIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFRhcmdldENvbmRpdGlvbnMoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSB8fCAhdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG5vdCBzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvbHlnb24gPSB0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb247XHJcbiAgICBjb25zdCBsaW5lID0gdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lO1xyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbnMgPSBwb2x5Z29uLmdldExpbmVDb25kaXRpb25zKCk7XHJcblxyXG4gICAgcmV0dXJuIGxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+IGxpbmVDb25kaXRpb24ubGluZS5lcXVhbHMobGluZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdGhlclRhcmdldENvbmRpdGlvbnModGFyZ2V0Q29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdKSB7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IgPSB0aGlzLmdldExpbmVDb25kaXRpb25Db25zdHJ1Y3RvcigpO1xyXG5cclxuICAgIHJldHVybiB0YXJnZXRDb25kaXRpb25zLmZpbHRlcihcclxuICAgICAgbGluZUNvbmRpdGlvbiA9PiAhKGxpbmVDb25kaXRpb24gaW5zdGFuY2VvZiBsaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudC50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICdjb21tb24vUGF0aCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbmludGVyZmFjZSBMaW5lQ2xpY2tFdmVudFBheWxvYWQge1xyXG4gIGxpbmU6IExpbmU7XHJcbiAgcGF0aDogUGF0aDtcclxuICBwb3NpdGlvbjogUG9pbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lQ2xpY2tFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiBMaW5lQ2xpY2tFdmVudFBheWxvYWQ7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IobGluZTogTGluZSwgcGF0aDogUGF0aCwgcG9zaXRpb246IFBvaW50KSB7XHJcbiAgICB0aGlzLnBheWxvYWQgPSB7XHJcbiAgICAgIGxpbmUsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIHBvc2l0aW9uXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdMaW5lQ2xpY2tFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9MaW5lQ2xpY2tFdmVudC50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50Q2xpY2tFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRUeXBlID0gUG9pbnRDbGlja0V2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZDogUGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGhQb2ludENvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50KSB7XHJcbiAgICB0aGlzLnBheWxvYWQgPSBwYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ1BvaW50Q2xpY2tFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9Qb2ludENsaWNrRXZlbnQudHMiLCJleHBvcnQgZW51bSBPY3RhbnQge1xyXG4gIEZpcnN0LFxyXG4gIFNlY29uZCxcclxuICBUaGlyZCxcclxuICBGb3VydGgsXHJcbiAgRmlmdGgsXHJcbiAgU2l4dGgsXHJcbiAgU2V2ZW50aCxcclxuICBFaWdodGhcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb21tb24vT2N0YW50LnRzIiwiaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcblxyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcblxyXG5pbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgRml4ZWRMZW5ndGhMaW5lQ29uZGl0aW9uIGV4dGVuZHMgTGluZUNvbmRpdGlvbiB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBmaXhlZExlbmd0aDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsaW5lOiBMaW5lLCBwb2x5Z29uOiBQb2x5Z29uLCBsZW5ndGg6IG51bWJlcikge1xyXG4gICAgc3VwZXIobGluZSwgcG9seWdvbik7XHJcblxyXG4gICAgdGhpcy5maXhlZExlbmd0aCA9IGxlbmd0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc01ldCgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGxlbmd0aFNxdWFyZWQgPSBQb2ludC5nZXREaXN0YW5jZUJldHdlZW4odGhpcy5saW5lLnAxLCB0aGlzLmxpbmUucDIpO1xyXG5cclxuICAgIHJldHVybiBNYXRoLmFicyhsZW5ndGhTcXVhcmVkIC0gdGhpcy5maXhlZExlbmd0aCkgPCBjb25maWd1cmF0aW9uLmVwc2lsb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZml4KGxvY2tlZFBvaW50OiBQb2ludCkge1xyXG4gICAgY29uc3QgZnJlZVBvaW50ID0gdGhpcy5saW5lLnAxID09PSBsb2NrZWRQb2ludCA/IHRoaXMubGluZS5wMiA6IHRoaXMubGluZS5wMTtcclxuXHJcbiAgICBjb25zdCBsZW5ndGhCZWZvcmVGaXggPSBQb2ludC5nZXREaXN0YW5jZUJldHdlZW4obG9ja2VkUG9pbnQsIGZyZWVQb2ludCk7XHJcbiAgICBjb25zdCByYXRpbyA9IHRoaXMuZml4ZWRMZW5ndGggLyBsZW5ndGhCZWZvcmVGaXg7XHJcblxyXG4gICAgY29uc3QgeERlbHRhID0gZnJlZVBvaW50LnggLSBsb2NrZWRQb2ludC54O1xyXG4gICAgY29uc3QgeURlbHRhID0gZnJlZVBvaW50LnkgLSBsb2NrZWRQb2ludC55O1xyXG5cclxuICAgIGZyZWVQb2ludC5tb3ZlVG8obG9ja2VkUG9pbnQueCArIHhEZWx0YSAqIHJhdGlvLCBsb2NrZWRQb2ludC55ICsgeURlbHRhICogcmF0aW8pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGR1cGxpY2F0ZUZvck5ld0xpbmUobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgcmV0dXJuIG5ldyBGaXhlZExlbmd0aExpbmVDb25kaXRpb24obGluZSwgcG9seWdvbiwgdGhpcy5maXhlZExlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFiZWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maXhlZExlbmd0aC50b0ZpeGVkKDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvU2VyaWFsaXphYmxlT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogRml4ZWRMZW5ndGhMaW5lQ29uZGl0aW9uLm5hbWUsXHJcbiAgICAgIHAxSW5kZXg6IHRoaXMucG9seWdvbi5maW5kUG9pbnRJbmRleCh0aGlzLmxpbmUucDEpLFxyXG4gICAgICBwMkluZGV4OiB0aGlzLnBvbHlnb24uZmluZFBvaW50SW5kZXgodGhpcy5saW5lLnAyKSxcclxuICAgICAgZml4ZWRMZW5ndGg6IHRoaXMuZml4ZWRMZW5ndGhcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmVyaWZ5Q2FuQmVBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0ZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbi50cyIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuXHJcbmltcG9ydCB7IEZpeGluZ0RpcmVjdGlvbiwgVW5pZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlciB9IGZyb20gJ2NvbmRpdGlvbnMvZml4ZXJzL1VuaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXInO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgdW5pZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlcjogVW5pZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlcjtcclxuXHJcbiAgcHJpdmF0ZSBfZml4U3VjY2Vzc2Z1bDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwb2x5Z29uOiBQb2x5Z29uLFxyXG4gICAgc3RhcnRpbmdQb2ludDogUG9pbnQsXHJcbiAgICBhZGRpdGlvbmFsTGluZUNvbmRpdGlvbnM6IExpbmVDb25kaXRpb25bXSA9IFtdXHJcbiAgKSB7XHJcbiAgICB0aGlzLnVuaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIgPSBuZXcgVW5pZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlcihcclxuICAgICAgcG9seWdvbixcclxuICAgICAgc3RhcnRpbmdQb2ludCxcclxuICAgICAgYWRkaXRpb25hbExpbmVDb25kaXRpb25zLFxyXG4gICAgICBGaXhpbmdEaXJlY3Rpb24uTm9ybWFsXHJcbiAgICApO1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0IHN0YXJ0aW5nUG9pbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51bmlkaXJlY3Rpb25hbENvbmRpdGlvbkZpeGVyLnN0YXJ0aW5nUG9pbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHN0YXJ0aW5nUG9pbnQocG9pbnQ6IFBvaW50KSB7XHJcbiAgICB0aGlzLnVuaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIuc3RhcnRpbmdQb2ludCA9IHBvaW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmaXhTdWNjZXNzZnVsKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RyeUZpeCBuZWVkcyB0byBiZSBjYWxsZWQgZmlyc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZml4U3VjY2Vzc2Z1bDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cnlGaXgoKSB7XHJcbiAgICBpZiAodGhpcy5fZml4U3VjY2Vzc2Z1bCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZGl0aW9uRml4ZXIgbmVlZHMgdG8gYmUgcmVzZXQgYmVmb3JlIGZpeGluZyBhZ2FpbicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgPSBmYWxzZTtcclxuICAgIHRoaXMudW5pZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlci50cnlGaXgoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMudW5pZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlci5maXhTdWNjZXNzZnVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXN0TG9ja2VkUG9pbnRJbmRleCA9IHRoaXMudW5pZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlci5sYXN0TG9ja2VkVmVydGV4SW5kZXg7XHJcbiAgICB0aGlzLnVuaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIucmVzZXQoKTtcclxuICAgIHRoaXMudW5pZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlci5kaXJlY3Rpb24gPSBGaXhpbmdEaXJlY3Rpb24uUmV2ZXJzZTtcclxuXHJcbiAgICB0aGlzLnVuaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIudHJ5Rml4KGxhc3RMb2NrZWRQb2ludEluZGV4KTtcclxuXHJcbiAgICBpZiAodGhpcy51bmlkaXJlY3Rpb25hbENvbmRpdGlvbkZpeGVyLmZpeFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgdGhpcy5fZml4U3VjY2Vzc2Z1bCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICB0aGlzLl9maXhTdWNjZXNzZnVsID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy51bmlkaXJlY3Rpb25hbENvbmRpdGlvbkZpeGVyLnJlc2V0KCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbmRpdGlvbnMvZml4ZXJzL0JpZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlci50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbmlzaFBvaW50RHJhZ0V2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiBQYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IEZpbmlzaFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZTtcclxuICBwdWJsaWMgaGFuZGxlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYXRoUG9pbnRDb21wb25lbnQ6IFBhdGhQb2ludENvbXBvbmVudCkge1xyXG4gICAgdGhpcy5wYXlsb2FkID0gcGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRUeXBlKCkge1xyXG4gICAgcmV0dXJuICdGaW5pc2hQb2ludERyYWdFdmVudCc7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9wb2ludC1kcmFnL0ZpbmlzaFBvaW50RHJhZ0V2ZW50LnRzIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludERyYWdFdmVudCBpbXBsZW1lbnRzIEFwcEV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcGF5bG9hZDoge1xyXG4gICAgY29tcG9uZW50OiBQYXRoUG9pbnRDb21wb25lbnQsXHJcbiAgICBuZXdQb3NpdGlvbjogUG9pbnRcclxuICB9O1xyXG4gIHB1YmxpYyByZWFkb25seSBldmVudFR5cGUgPSBQb2ludERyYWdFdmVudC5ldmVudFR5cGU7XHJcbiAgcHVibGljIGhhbmRsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocGF0aFBvaW50Q29tcG9uZW50OiBQYXRoUG9pbnRDb21wb25lbnQsIG5ld1Bvc2l0aW9uOiBQb2ludCkge1xyXG4gICAgdGhpcy5wYXlsb2FkID0ge1xyXG4gICAgICBjb21wb25lbnQ6IHBhdGhQb2ludENvbXBvbmVudCxcclxuICAgICAgbmV3UG9zaXRpb25cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ1BvaW50RHJhZ0V2ZW50JztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQudHMiLCJpbXBvcnQgeyBBcHBFdmVudCB9IGZyb20gJ2V2ZW50cy9BcHBFdmVudCc7XHJcbmltcG9ydCB7IFBhdGhQb2ludENvbXBvbmVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFydFBvaW50RHJhZ0V2ZW50IGltcGxlbWVudHMgQXBwRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBwYXlsb2FkOiBQYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgcHVibGljIHJlYWRvbmx5IGV2ZW50VHlwZSA9IFN0YXJ0UG9pbnREcmFnRXZlbnQuZXZlbnRUeXBlO1xyXG4gIHB1YmxpYyBoYW5kbGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBhdGhQb2ludENvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50KSB7XHJcbiAgICB0aGlzLnBheWxvYWQgPSBwYXRoUG9pbnRDb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBldmVudFR5cGUoKSB7XHJcbiAgICByZXR1cm4gJ1N0YXJ0UG9pbnREcmFnRXZlbnQnO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvcG9pbnQtZHJhZy9TdGFydFBvaW50RHJhZ0V2ZW50LnRzIiwiaW1wb3J0ICd1aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5zdHJ1Y3Rpb25zRGlhbG9nIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIHByaXZhdGUgb3ZlcmxheTogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBkaWFsb2dDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgZGlzbWlzc0J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtZGlhbG9nLXdyYXBwZXInO1xyXG5cclxuICAgIHRoaXMub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtZGlhbG9nX19vdmVybGF5JztcclxuXHJcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIuY2xhc3NOYW1lID0gJ2luc3RydWN0aW9ucy1kaWFsb2cnO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0luc3RydWN0aW9ucyc7XHJcbiAgICB0aXRsZS5jbGFzc05hbWUgPSAnaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fdGl0bGUnO1xyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG5cclxuICAgIHRoaXMuZGlhbG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlVXNhZ2VMaXN0KCkpO1xyXG5cclxuICAgIHRoaXMuZGlzbWlzc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5kaXNtaXNzQnV0dG9uLnRleHRDb250ZW50ID0gJ0Rpc21pc3MnO1xyXG4gICAgdGhpcy5kaXNtaXNzQnV0dG9uLmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtZGlhbG9nX19kaXNtaXNzLWJ1dHRvbic7XHJcblxyXG4gICAgdGhpcy5kaWFsb2dDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaXNtaXNzQnV0dG9uKTtcclxuXHJcbiAgICB0aGlzLmRpc21pc3MgPSB0aGlzLmRpc21pc3MuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2dDb250YWluZXIpO1xyXG4gICAgdGhpcy5kaXNtaXNzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kaXNtaXNzKTtcclxuICAgIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGlzbWlzcyk7XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2luc3RydWN0aW9ucy1kaWFsb2dfX292ZXJsYXktLWFjdGl2ZScpO1xyXG4gICAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbnN0cnVjdGlvbnMtZGlhbG9nLS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXkpO1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmRpYWxvZ0NvbnRhaW5lcik7XHJcbiAgICB0aGlzLmRpc21pc3NCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRpc21pc3MpO1xyXG4gICAgdGhpcy5vdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kaXNtaXNzKTtcclxuXHJcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnaW5zdHJ1Y3Rpb25zLWRpYWxvZ19fb3ZlcmxheS0tYWN0aXZlJyk7XHJcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpbnN0cnVjdGlvbnMtZGlhbG9nLS1hY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGlzbWlzcygpIHtcclxuICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVVzYWdlTGlzdCgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG5cclxuICAgIGNvbnN0IHVzYWdlID0gW1xyXG4gICAgICAnQ2xpY2sgb24gdGhlIGZyZWUgc3BhY2UgaW4gdGhlIGNhbnZhcyB0byBzdGFydCBjcmVhdGluZyB2ZXJ0aWNlcycsXHJcbiAgICAgICdDbGljayBvbiB0aGUgaW5pdGlhbCB2ZXJ0ZXggdG8gY2xvc2UgdGhlIHBhdGggaW50byBhIHBvbHlnb24nLFxyXG4gICAgICAnQWx0ZXJuYXRpdmVseSwgeW91IG1heSBwcmVzcyBFc2NhcGUgdG8gY2FuY2VsIGFkZGluZyBhIG5ldyBwYXRoJyxcclxuICAgICAgJ0NsaWNrIGFuZCBkcmFnIHRoZSB2ZXJ0ZXggdG8gbW92ZSBpdCcsXHJcbiAgICAgICdEb3VibGUgY2xpY2sgb24gYW4gZWRnZSB0byBhZGQgYSB2ZXJ0ZXggaW4gdGhlIG1pZGRsZSBvZiBpdCcsXHJcbiAgICAgICdEb3VibGUgY2xpY2sgb24gYSB2ZXJ0ZXggdG8gcmVtb3ZlIGl0JyxcclxuICAgICAgJ0NsaWNrIGFuIGVkZ2UgdG8gYWRkIG9yIHJlbW92ZSBhbiBlZGdlIHJlbGF0aW9uJyxcclxuICAgICAgJ1ByZXNzaW5nIEN0cmwgYWxsb3dzIGRyYWdnaW5nIGEgd2hvbGUgcG9seWdvbicsXHJcbiAgICAgICdTYXZlIGFsbG93cyB5b3UgdG8gZXhwb3J0IGFsbCB0aGUgcG9seWdvbnMgb24gdGhlIHNjcmVlbiAoYWxvbmcgd2l0aCB0aGVpciByZWxhdGlvbnMpJyxcclxuICAgICAgJ0xvYWQgYWxsb3dzIHlvdSB0byByZXN0b3JlIHRoZSBzdGF0ZSAoZnJvbSBhIHN0cmluZyBjcmVhdGVkIGJ5IFNhdmUgYnV0dG9uKSdcclxuICAgIF07XHJcblxyXG4gICAgdXNhZ2UubWFwKHVzYWdlSXRlbVRleHQgPT4gdGhpcy5jcmVhdGVVc2FnZUxpc3RJdGVtKHVzYWdlSXRlbVRleHQpKVxyXG4gICAgICAuZm9yRWFjaCh1c2FnZUxpc3RJdGVtID0+IGxpc3QuYXBwZW5kQ2hpbGQodXNhZ2VMaXN0SXRlbSkpO1xyXG5cclxuICAgIHJldHVybiBsaXN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVVc2FnZUxpc3RJdGVtKHRleHRDb250ZW50OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgaXRlbS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG5cclxuICAgIHJldHVybiBpdGVtO1xyXG4gIH1cclxufVxyXG5cclxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLWluc3RydWN0aW9ucy1kaWFsb2cnLCBJbnN0cnVjdGlvbnNEaWFsb2cpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cudHMiLCJpbXBvcnQgJ2luZGV4LnNjc3MnO1xyXG5pbXBvcnQgJ25vcm1hbGl6ZS5jc3MnO1xyXG5cclxuaW1wb3J0ICdAd2ViY29tcG9uZW50cy93ZWJjb21wb25lbnRzanMvd2ViY29tcG9uZW50cy1oaS1zZC1jZSc7XHJcblxyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gJ0FwcGxpY2F0aW9uJztcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYm9vdHN0cmFwLCBmYWxzZSk7XHJcblxyXG5mdW5jdGlvbiBib290c3RyYXAoKTogdm9pZCB7XHJcbiAgY29uc3QgY2FudmFzSWQgPSAnbWFpbi1jYW52YXMnO1xyXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcclxuICBpZiAoIWNhbnZhcykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW52YXMgd2l0aCBpZCAke2NhbnZhc0lkfSBjYW5ub3QgYmUgZm91bmRgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFwcGxpY2F0aW9uID0gbmV3IEFwcGxpY2F0aW9uKDxIVE1MQ2FudmFzRWxlbWVudD5jYW52YXMpO1xyXG4gIGFwcGxpY2F0aW9uLmluaXQoKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9pbmRleC50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9pbmRleC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLCBib2R5IHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7IH1cXG5cXG4ubWFpbi1jYW52YXMge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7IH1cXG5cXG4ubWFpbi1jb250YWluZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDAgMWVtOyB9XFxuXFxuLmNhbnZhcy13cmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmFwcGxpY2F0aW9uLXVpIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XFxuICAuYXBwbGljYXRpb24tdWkgKiB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7IH1cXG5cXG4uYXBwLWhlYWRlciB7XFxuICBtYXJnaW4tYm90dG9tOiAxZW07XFxuICBtYXJnaW4tbGVmdDogMWVtOyB9XFxuXFxuLmFwcC1uYW1lIHtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5mb290ZXIge1xcbiAgbWFyZ2luOiAxZW0gMWVtOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2luZGV4LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKCl7LypcblxuIENvcHlyaWdodCAoYykgMjAxNiBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuXG5Db3B5cmlnaHQgKGMpIDIwMTYgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbnN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG5cbkNvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcblxuIENvcHlyaWdodCAoYykgMjAxNCBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbid1c2Ugc3RyaWN0Jzt2YXIgSj1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3c9PT10aGlzP3RoaXM6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbCYmbnVsbCE9Z2xvYmFsP2dsb2JhbDp0aGlzLEFhPVwiZnVuY3Rpb25cIj09dHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzP09iamVjdC5kZWZpbmVQcm9wZXJ0eTpmdW5jdGlvbihnLHEsTil7ZyE9QXJyYXkucHJvdG90eXBlJiZnIT1PYmplY3QucHJvdG90eXBlJiYoZ1txXT1OLnZhbHVlKX07ZnVuY3Rpb24gc2IoKXtzYj1mdW5jdGlvbigpe307Si5TeW1ib2x8fChKLlN5bWJvbD10Yil9dmFyIHRiPWZ1bmN0aW9uKCl7dmFyIGc9MDtyZXR1cm4gZnVuY3Rpb24ocSl7cmV0dXJuXCJqc2NvbXBfc3ltYm9sX1wiKyhxfHxcIlwiKStnKyt9fSgpO1xuZnVuY3Rpb24gZGQoKXtzYigpO3ZhciBnPUouU3ltYm9sLml0ZXJhdG9yO2d8fChnPUouU3ltYm9sLml0ZXJhdG9yPUouU3ltYm9sKFwiaXRlcmF0b3JcIikpO1wiZnVuY3Rpb25cIiE9dHlwZW9mIEFycmF5LnByb3RvdHlwZVtnXSYmQWEoQXJyYXkucHJvdG90eXBlLGcse2NvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBlZCh0aGlzKX19KTtkZD1mdW5jdGlvbigpe319ZnVuY3Rpb24gZWQoZyl7dmFyIHE9MDtyZXR1cm4gZmQoZnVuY3Rpb24oKXtyZXR1cm4gcTxnLmxlbmd0aD97ZG9uZTohMSx2YWx1ZTpnW3ErK119Ontkb25lOiEwfX0pfWZ1bmN0aW9uIGZkKGcpe2RkKCk7Zz17bmV4dDpnfTtnW0ouU3ltYm9sLml0ZXJhdG9yXT1mdW5jdGlvbigpe3JldHVybiB0aGlzfTtyZXR1cm4gZ31mdW5jdGlvbiBnZChnKXtkZCgpO3ZhciBxPWdbU3ltYm9sLml0ZXJhdG9yXTtyZXR1cm4gcT9xLmNhbGwoZyk6ZWQoZyl9XG5mdW5jdGlvbiBoZChnKXtmb3IodmFyIHEsTj1bXTshKHE9Zy5uZXh0KCkpLmRvbmU7KU4ucHVzaChxLnZhbHVlKTtyZXR1cm4gTn1cbihmdW5jdGlvbigpe2Z1bmN0aW9uIGcoKXt2YXIgYT10aGlzO3RoaXMubT17fTt0aGlzLmc9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O3ZhciBiPW5ldyBCYTtiLnJ1bGVzPVtdO3RoaXMuaD12LnNldCh0aGlzLmcsbmV3IHYoYikpO3RoaXMuaT0hMTt0aGlzLmI9dGhpcy5hPW51bGw7dWIoZnVuY3Rpb24oKXthLmMoKX0pfWZ1bmN0aW9uIHEoKXt0aGlzLmN1c3RvbVN0eWxlcz1bXTt0aGlzLmVucXVldWVkPSExfWZ1bmN0aW9uIE4oKXt9ZnVuY3Rpb24gaGEoYSl7dGhpcy5jYWNoZT17fTt0aGlzLmM9dm9pZCAwPT09YT8xMDA6YX1mdW5jdGlvbiBuKCl7fWZ1bmN0aW9uIHYoYSxiLGMsZCxlKXt0aGlzLkQ9YXx8bnVsbDt0aGlzLmI9Ynx8bnVsbDt0aGlzLmxhPWN8fFtdO3RoaXMuTj1udWxsO3RoaXMuVj1lfHxcIlwiO3RoaXMuYT10aGlzLkE9dGhpcy5KPW51bGx9ZnVuY3Rpb24gdSgpe31mdW5jdGlvbiBCYSgpe3RoaXMuZW5kPXRoaXMuc3RhcnQ9MDt0aGlzLnJ1bGVzPXRoaXMucGFyZW50PVxudGhpcy5wcmV2aW91cz1udWxsO3RoaXMuY3NzVGV4dD10aGlzLnBhcnNlZENzc1RleHQ9XCJcIjt0aGlzLmF0UnVsZT0hMTt0aGlzLnR5cGU9MDt0aGlzLnBhcnNlZFNlbGVjdG9yPXRoaXMuc2VsZWN0b3I9dGhpcy5rZXlmcmFtZXNOYW1lPVwiXCJ9ZnVuY3Rpb24gaWQoYSl7ZnVuY3Rpb24gYihiLGMpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShiLFwiaW5uZXJIVE1MXCIse2VudW1lcmFibGU6Yy5lbnVtZXJhYmxlLGNvbmZpZ3VyYWJsZTohMCxnZXQ6Yy5nZXQsc2V0OmZ1bmN0aW9uKGIpe3ZhciBkPXRoaXMsZT12b2lkIDA7dCh0aGlzKSYmKGU9W10sTyh0aGlzLGZ1bmN0aW9uKGEpe2EhPT1kJiZlLnB1c2goYSl9KSk7Yy5zZXQuY2FsbCh0aGlzLGIpO2lmKGUpZm9yKHZhciBmPTA7ZjxlLmxlbmd0aDtmKyspe3ZhciBrPWVbZl07MT09PWsuX19DRV9zdGF0ZSYmYS5kaXNjb25uZWN0ZWRDYWxsYmFjayhrKX10aGlzLm93bmVyRG9jdW1lbnQuX19DRV9oYXNSZWdpc3RyeT9hLmYodGhpcyk6YS5sKHRoaXMpO1xucmV0dXJuIGJ9fSl9ZnVuY3Rpb24gYyhiLGMpe3goYixcImluc2VydEFkamFjZW50RWxlbWVudFwiLGZ1bmN0aW9uKGIsZCl7dmFyIGU9dChkKTtiPWMuY2FsbCh0aGlzLGIsZCk7ZSYmYS5hKGQpO3QoYikmJmEuYihkKTtyZXR1cm4gYn0pfXZiJiZ4KEVsZW1lbnQucHJvdG90eXBlLFwiYXR0YWNoU2hhZG93XCIsZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuX19DRV9zaGFkb3dSb290PWE9dmIuY2FsbCh0aGlzLGEpfSk7aWYoQ2EmJkNhLmdldCliKEVsZW1lbnQucHJvdG90eXBlLENhKTtlbHNlIGlmKERhJiZEYS5nZXQpYihIVE1MRWxlbWVudC5wcm90b3R5cGUsRGEpO2Vsc2V7dmFyIGQ9RWEuY2FsbChkb2N1bWVudCxcImRpdlwiKTthLnMoZnVuY3Rpb24oYSl7YihhLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gd2IuY2FsbCh0aGlzLCEwKS5pbm5lckhUTUx9LHNldDpmdW5jdGlvbihhKXt2YXIgYj1cInRlbXBsYXRlXCI9PT10aGlzLmxvY2FsTmFtZT9cbnRoaXMuY29udGVudDp0aGlzO2ZvcihkLmlubmVySFRNTD1hOzA8Yi5jaGlsZE5vZGVzLmxlbmd0aDspRmEuY2FsbChiLGIuY2hpbGROb2Rlc1swXSk7Zm9yKDswPGQuY2hpbGROb2Rlcy5sZW5ndGg7KWlhLmNhbGwoYixkLmNoaWxkTm9kZXNbMF0pfX0pfSl9eChFbGVtZW50LnByb3RvdHlwZSxcInNldEF0dHJpYnV0ZVwiLGZ1bmN0aW9uKGIsYyl7aWYoMSE9PXRoaXMuX19DRV9zdGF0ZSlyZXR1cm4geGIuY2FsbCh0aGlzLGIsYyk7dmFyIGQ9R2EuY2FsbCh0aGlzLGIpO3hiLmNhbGwodGhpcyxiLGMpO2M9R2EuY2FsbCh0aGlzLGIpO2EuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsYixkLGMsbnVsbCl9KTt4KEVsZW1lbnQucHJvdG90eXBlLFwic2V0QXR0cmlidXRlTlNcIixmdW5jdGlvbihiLGMsZCl7aWYoMSE9PXRoaXMuX19DRV9zdGF0ZSlyZXR1cm4geWIuY2FsbCh0aGlzLGIsYyxkKTt2YXIgZT1qYS5jYWxsKHRoaXMsYixjKTt5Yi5jYWxsKHRoaXMsYixjLGQpO2Q9amEuY2FsbCh0aGlzLFxuYixjKTthLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0aGlzLGMsZSxkLGIpfSk7eChFbGVtZW50LnByb3RvdHlwZSxcInJlbW92ZUF0dHJpYnV0ZVwiLGZ1bmN0aW9uKGIpe2lmKDEhPT10aGlzLl9fQ0Vfc3RhdGUpcmV0dXJuIHpiLmNhbGwodGhpcyxiKTt2YXIgYz1HYS5jYWxsKHRoaXMsYik7emIuY2FsbCh0aGlzLGIpO251bGwhPT1jJiZhLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0aGlzLGIsYyxudWxsLG51bGwpfSk7eChFbGVtZW50LnByb3RvdHlwZSxcInJlbW92ZUF0dHJpYnV0ZU5TXCIsZnVuY3Rpb24oYixjKXtpZigxIT09dGhpcy5fX0NFX3N0YXRlKXJldHVybiBBYi5jYWxsKHRoaXMsYixjKTt2YXIgZD1qYS5jYWxsKHRoaXMsYixjKTtBYi5jYWxsKHRoaXMsYixjKTt2YXIgZT1qYS5jYWxsKHRoaXMsYixjKTtkIT09ZSYmYS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodGhpcyxjLGQsZSxiKX0pO0JiP2MoSFRNTEVsZW1lbnQucHJvdG90eXBlLEJiKTpDYj9jKEVsZW1lbnQucHJvdG90eXBlLFxuQ2IpOmNvbnNvbGUud2FybihcIkN1c3RvbSBFbGVtZW50czogYEVsZW1lbnQjaW5zZXJ0QWRqYWNlbnRFbGVtZW50YCB3YXMgbm90IHBhdGNoZWQuXCIpO0hhKGEsRWxlbWVudC5wcm90b3R5cGUse1o6amQsYXBwZW5kOmtkfSk7bGQoYSx7amE6bWQsV2E6bmQscmVwbGFjZVdpdGg6b2QscmVtb3ZlOnBkfSl9ZnVuY3Rpb24gbGQoYSxiKXt2YXIgYz1FbGVtZW50LnByb3RvdHlwZTtmdW5jdGlvbiBkKGIpe3JldHVybiBmdW5jdGlvbihjKXtmb3IodmFyIGQ9W10sZT0wO2U8YXJndW1lbnRzLmxlbmd0aDsrK2UpZFtlLTBdPWFyZ3VtZW50c1tlXTtlPVtdO2Zvcih2YXIgZj1bXSxnPTA7ZzxkLmxlbmd0aDtnKyspe3ZhciBtPWRbZ107bSBpbnN0YW5jZW9mIEVsZW1lbnQmJnQobSkmJmYucHVzaChtKTtpZihtIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClmb3IobT1tLmZpcnN0Q2hpbGQ7bTttPW0ubmV4dFNpYmxpbmcpZS5wdXNoKG0pO2Vsc2UgZS5wdXNoKG0pfWIuYXBwbHkodGhpcyxcbmQpO2ZvcihkPTA7ZDxmLmxlbmd0aDtkKyspYS5hKGZbZF0pO2lmKHQodGhpcykpZm9yKGQ9MDtkPGUubGVuZ3RoO2QrKylmPWVbZF0sZiBpbnN0YW5jZW9mIEVsZW1lbnQmJmEuYihmKX19dm9pZCAwIT09Yi5qYSYmKGMuYmVmb3JlPWQoYi5qYSkpO3ZvaWQgMCE9PWIuamEmJihjLmFmdGVyPWQoYi5XYSkpO3ZvaWQgMCE9PWIucmVwbGFjZVdpdGgmJngoYyxcInJlcGxhY2VXaXRoXCIsZnVuY3Rpb24oYyl7Zm9yKHZhciBkPVtdLGU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7KytlKWRbZS0wXT1hcmd1bWVudHNbZV07ZT1bXTtmb3IodmFyIGg9W10sdz0wO3c8ZC5sZW5ndGg7dysrKXt2YXIgZz1kW3ddO2cgaW5zdGFuY2VvZiBFbGVtZW50JiZ0KGcpJiZoLnB1c2goZyk7aWYoZyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpZm9yKGc9Zy5maXJzdENoaWxkO2c7Zz1nLm5leHRTaWJsaW5nKWUucHVzaChnKTtlbHNlIGUucHVzaChnKX13PXQodGhpcyk7Yi5yZXBsYWNlV2l0aC5hcHBseSh0aGlzLFxuZCk7Zm9yKGQ9MDtkPGgubGVuZ3RoO2QrKylhLmEoaFtkXSk7aWYodylmb3IoYS5hKHRoaXMpLGQ9MDtkPGUubGVuZ3RoO2QrKyloPWVbZF0saCBpbnN0YW5jZW9mIEVsZW1lbnQmJmEuYihoKX0pO3ZvaWQgMCE9PWIucmVtb3ZlJiZ4KGMsXCJyZW1vdmVcIixmdW5jdGlvbigpe3ZhciBjPXQodGhpcyk7Yi5yZW1vdmUuY2FsbCh0aGlzKTtjJiZhLmEodGhpcyl9KX1mdW5jdGlvbiBxZChhKXtmdW5jdGlvbiBiKGIsZCl7T2JqZWN0LmRlZmluZVByb3BlcnR5KGIsXCJ0ZXh0Q29udGVudFwiLHtlbnVtZXJhYmxlOmQuZW51bWVyYWJsZSxjb25maWd1cmFibGU6ITAsZ2V0OmQuZ2V0LHNldDpmdW5jdGlvbihiKXtpZih0aGlzLm5vZGVUeXBlPT09Tm9kZS5URVhUX05PREUpZC5zZXQuY2FsbCh0aGlzLGIpO2Vsc2V7dmFyIGM9dm9pZCAwO2lmKHRoaXMuZmlyc3RDaGlsZCl7dmFyIGU9dGhpcy5jaGlsZE5vZGVzLGg9ZS5sZW5ndGg7aWYoMDxoJiZ0KHRoaXMpKXtjPUFycmF5KGgpO2Zvcih2YXIgdz1cbjA7dzxoO3crKyljW3ddPWVbd119fWQuc2V0LmNhbGwodGhpcyxiKTtpZihjKWZvcihiPTA7YjxjLmxlbmd0aDtiKyspYS5hKGNbYl0pfX19KX14KE5vZGUucHJvdG90eXBlLFwiaW5zZXJ0QmVmb3JlXCIsZnVuY3Rpb24oYixkKXtpZihiIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGIuY2hpbGROb2Rlcyk7Yj1EYi5jYWxsKHRoaXMsYixkKTtpZih0KHRoaXMpKWZvcihkPTA7ZDxjLmxlbmd0aDtkKyspYS5iKGNbZF0pO3JldHVybiBifWM9dChiKTtkPURiLmNhbGwodGhpcyxiLGQpO2MmJmEuYShiKTt0KHRoaXMpJiZhLmIoYik7cmV0dXJuIGR9KTt4KE5vZGUucHJvdG90eXBlLFwiYXBwZW5kQ2hpbGRcIixmdW5jdGlvbihiKXtpZihiIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGIuY2hpbGROb2Rlcyk7Yj1pYS5jYWxsKHRoaXMsYik7aWYodCh0aGlzKSlmb3IodmFyIGU9XG4wO2U8Yy5sZW5ndGg7ZSsrKWEuYihjW2VdKTtyZXR1cm4gYn1jPXQoYik7ZT1pYS5jYWxsKHRoaXMsYik7YyYmYS5hKGIpO3QodGhpcykmJmEuYihiKTtyZXR1cm4gZX0pO3goTm9kZS5wcm90b3R5cGUsXCJjbG9uZU5vZGVcIixmdW5jdGlvbihiKXtiPXdiLmNhbGwodGhpcyxiKTt0aGlzLm93bmVyRG9jdW1lbnQuX19DRV9oYXNSZWdpc3RyeT9hLmYoYik6YS5sKGIpO3JldHVybiBifSk7eChOb2RlLnByb3RvdHlwZSxcInJlbW92ZUNoaWxkXCIsZnVuY3Rpb24oYil7dmFyIGM9dChiKSxlPUZhLmNhbGwodGhpcyxiKTtjJiZhLmEoYik7cmV0dXJuIGV9KTt4KE5vZGUucHJvdG90eXBlLFwicmVwbGFjZUNoaWxkXCIsZnVuY3Rpb24oYixkKXtpZihiIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGIuY2hpbGROb2Rlcyk7Yj1FYi5jYWxsKHRoaXMsYixkKTtpZih0KHRoaXMpKWZvcihhLmEoZCksZD0wO2Q8Yy5sZW5ndGg7ZCsrKWEuYihjW2RdKTtcbnJldHVybiBifWM9dChiKTt2YXIgZj1FYi5jYWxsKHRoaXMsYixkKSxrPXQodGhpcyk7ayYmYS5hKGQpO2MmJmEuYShiKTtrJiZhLmIoYik7cmV0dXJuIGZ9KTtJYSYmSWEuZ2V0P2IoTm9kZS5wcm90b3R5cGUsSWEpOmEucyhmdW5jdGlvbihhKXtiKGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxiPTA7Yjx0aGlzLmNoaWxkTm9kZXMubGVuZ3RoO2IrKylhLnB1c2godGhpcy5jaGlsZE5vZGVzW2JdLnRleHRDb250ZW50KTtyZXR1cm4gYS5qb2luKFwiXCIpfSxzZXQ6ZnVuY3Rpb24oYSl7Zm9yKDt0aGlzLmZpcnN0Q2hpbGQ7KUZhLmNhbGwodGhpcyx0aGlzLmZpcnN0Q2hpbGQpO2lhLmNhbGwodGhpcyxkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhKSl9fSl9KX1mdW5jdGlvbiByZChhKXt4KERvY3VtZW50LnByb3RvdHlwZSxcImNyZWF0ZUVsZW1lbnRcIixmdW5jdGlvbihiKXtpZih0aGlzLl9fQ0VfaGFzUmVnaXN0cnkpe3ZhciBjPVxuYS5jKGIpO2lmKGMpcmV0dXJuIG5ldyBjLmNvbnN0cnVjdG9yfWI9RWEuY2FsbCh0aGlzLGIpO2EuZyhiKTtyZXR1cm4gYn0pO3goRG9jdW1lbnQucHJvdG90eXBlLFwiaW1wb3J0Tm9kZVwiLGZ1bmN0aW9uKGIsYyl7Yj1zZC5jYWxsKHRoaXMsYixjKTt0aGlzLl9fQ0VfaGFzUmVnaXN0cnk/YS5mKGIpOmEubChiKTtyZXR1cm4gYn0pO3goRG9jdW1lbnQucHJvdG90eXBlLFwiY3JlYXRlRWxlbWVudE5TXCIsZnVuY3Rpb24oYixjKXtpZih0aGlzLl9fQ0VfaGFzUmVnaXN0cnkmJihudWxsPT09Ynx8XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI9PT1iKSl7dmFyIGQ9YS5jKGMpO2lmKGQpcmV0dXJuIG5ldyBkLmNvbnN0cnVjdG9yfWI9dGQuY2FsbCh0aGlzLGIsYyk7YS5nKGIpO3JldHVybiBifSk7SGEoYSxEb2N1bWVudC5wcm90b3R5cGUse1o6dWQsYXBwZW5kOnZkfSl9ZnVuY3Rpb24gSGEoYSxiLGMpe2Z1bmN0aW9uIGQoYil7cmV0dXJuIGZ1bmN0aW9uKGMpe2Zvcih2YXIgZD1bXSxcbmU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7KytlKWRbZS0wXT1hcmd1bWVudHNbZV07ZT1bXTtmb3IodmFyIGY9W10sZz0wO2c8ZC5sZW5ndGg7ZysrKXt2YXIgbT1kW2ddO20gaW5zdGFuY2VvZiBFbGVtZW50JiZ0KG0pJiZmLnB1c2gobSk7aWYobSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpZm9yKG09bS5maXJzdENoaWxkO207bT1tLm5leHRTaWJsaW5nKWUucHVzaChtKTtlbHNlIGUucHVzaChtKX1iLmFwcGx5KHRoaXMsZCk7Zm9yKGQ9MDtkPGYubGVuZ3RoO2QrKylhLmEoZltkXSk7aWYodCh0aGlzKSlmb3IoZD0wO2Q8ZS5sZW5ndGg7ZCsrKWY9ZVtkXSxmIGluc3RhbmNlb2YgRWxlbWVudCYmYS5iKGYpfX12b2lkIDAhPT1jLlomJihiLnByZXBlbmQ9ZChjLlopKTt2b2lkIDAhPT1jLmFwcGVuZCYmKGIuYXBwZW5kPWQoYy5hcHBlbmQpKX1mdW5jdGlvbiB3ZChhKXt3aW5kb3cuSFRNTEVsZW1lbnQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBiKCl7dmFyIGI9dGhpcy5jb25zdHJ1Y3RvcixcbmQ9YS53KGIpO2lmKCFkKXRocm93IEVycm9yKFwiVGhlIGN1c3RvbSBlbGVtZW50IGJlaW5nIGNvbnN0cnVjdGVkIHdhcyBub3QgcmVnaXN0ZXJlZCB3aXRoIGBjdXN0b21FbGVtZW50c2AuXCIpO3ZhciBlPWQuY29uc3RydWN0aW9uU3RhY2s7aWYoMD09PWUubGVuZ3RoKXJldHVybiBlPUVhLmNhbGwoZG9jdW1lbnQsZC5sb2NhbE5hbWUpLE9iamVjdC5zZXRQcm90b3R5cGVPZihlLGIucHJvdG90eXBlKSxlLl9fQ0Vfc3RhdGU9MSxlLl9fQ0VfZGVmaW5pdGlvbj1kLGEuZyhlKSxlO2Q9ZS5sZW5ndGgtMTt2YXIgZj1lW2RdO2lmKGY9PT1GYil0aHJvdyBFcnJvcihcIlRoZSBIVE1MRWxlbWVudCBjb25zdHJ1Y3RvciB3YXMgZWl0aGVyIGNhbGxlZCByZWVudHJhbnRseSBmb3IgdGhpcyBjb25zdHJ1Y3RvciBvciBjYWxsZWQgbXVsdGlwbGUgdGltZXMuXCIpO2VbZF09RmI7T2JqZWN0LnNldFByb3RvdHlwZU9mKGYsYi5wcm90b3R5cGUpO2EuZyhmKTtyZXR1cm4gZn1iLnByb3RvdHlwZT14ZC5wcm90b3R5cGU7XG5yZXR1cm4gYn0oKX1mdW5jdGlvbiB5KGEpe3RoaXMuYz0hMTt0aGlzLmE9YTt0aGlzLmg9bmV3IE1hcDt0aGlzLmY9ZnVuY3Rpb24oYSl7cmV0dXJuIGEoKX07dGhpcy5iPSExO3RoaXMuZz1bXTt0aGlzLmk9bmV3IEphKGEsZG9jdW1lbnQpfWZ1bmN0aW9uIEdiKCl7dmFyIGE9dGhpczt0aGlzLmI9dGhpcy5hPXZvaWQgMDt0aGlzLmY9bmV3IFByb21pc2UoZnVuY3Rpb24oYil7YS5iPWI7YS5hJiZiKGEuYSl9KX1mdW5jdGlvbiBKYShhLGIpe3RoaXMuYj1hO3RoaXMuYT1iO3RoaXMuTT12b2lkIDA7dGhpcy5iLmYodGhpcy5hKTtcImxvYWRpbmdcIj09PXRoaXMuYS5yZWFkeVN0YXRlJiYodGhpcy5NPW5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuZi5iaW5kKHRoaXMpKSx0aGlzLk0ub2JzZXJ2ZSh0aGlzLmEse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSkpfWZ1bmN0aW9uIEIoKXt0aGlzLm89bmV3IE1hcDt0aGlzLm09bmV3IE1hcDt0aGlzLmo9W107dGhpcy5oPSExfWZ1bmN0aW9uIGwoYSxcbmIsYyl7aWYoYSE9PUhiKXRocm93IG5ldyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGNvbnN0cnVjdG9yXCIpO2E9ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2EuX19wcm90b19fPWwucHJvdG90eXBlO2EuRihiLGMpO3JldHVybiBhfWZ1bmN0aW9uIGthKGEpe2lmKCFhLl9fc2hhZHl8fHZvaWQgMD09PWEuX19zaGFkeS5maXJzdENoaWxkKXthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTthLl9fc2hhZHkuZmlyc3RDaGlsZD1LYShhKTthLl9fc2hhZHkubGFzdENoaWxkPUxhKGEpO0liKGEpO2Zvcih2YXIgYj1hLl9fc2hhZHkuY2hpbGROb2Rlcz1TKGEpLGM9MCxkO2M8Yi5sZW5ndGgmJihkPWJbY10pO2MrKylkLl9fc2hhZHk9ZC5fX3NoYWR5fHx7fSxkLl9fc2hhZHkucGFyZW50Tm9kZT1hLGQuX19zaGFkeS5uZXh0U2libGluZz1iW2MrMV18fG51bGwsZC5fX3NoYWR5LnByZXZpb3VzU2libGluZz1iW2MtMV18fG51bGwsSmIoZCl9fWZ1bmN0aW9uIHlkKGEpe3ZhciBiPWEmJmEuTTtcbmImJihiLlguZGVsZXRlKGEuUmEpLGIuWC5zaXplfHwoYS5TYS5fX3NoYWR5LlQ9bnVsbCkpfWZ1bmN0aW9uIHpkKGEsYil7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307YS5fX3NoYWR5LlR8fChhLl9fc2hhZHkuVD1uZXcgbGEpO2EuX19zaGFkeS5ULlguYWRkKGIpO3ZhciBjPWEuX19zaGFkeS5UO3JldHVybntSYTpiLE06YyxTYTphLHRha2VSZWNvcmRzOmZ1bmN0aW9uKCl7cmV0dXJuIGMudGFrZVJlY29yZHMoKX19fWZ1bmN0aW9uIGxhKCl7dGhpcy5hPSExO3RoaXMuYWRkZWROb2Rlcz1bXTt0aGlzLnJlbW92ZWROb2Rlcz1bXTt0aGlzLlg9bmV3IFNldH1mdW5jdGlvbiBUKGEpe3JldHVybiBhLl9fc2hhZHkmJnZvaWQgMCE9PWEuX19zaGFkeS5maXJzdENoaWxkfWZ1bmN0aW9uIEcoYSl7cmV0dXJuXCJTaGFkeVJvb3RcIj09PWEuTWF9ZnVuY3Rpb24gWihhKXthPWEuZ2V0Um9vdE5vZGUoKTtpZihHKGEpKXJldHVybiBhfWZ1bmN0aW9uIE1hKGEsYil7aWYoYSYmYilmb3IodmFyIGM9XG5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiKSxkPTAsZTtkPGMubGVuZ3RoJiYoZT1jW2RdKTtkKyspe3ZhciBmPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYixlKTtmJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxlLGYpfX1mdW5jdGlvbiBOYShhLGIpe2Zvcih2YXIgYz1bXSxkPTE7ZDxhcmd1bWVudHMubGVuZ3RoOysrZCljW2QtMV09YXJndW1lbnRzW2RdO2ZvcihkPTA7ZDxjLmxlbmd0aDtkKyspTWEoYSxjW2RdKTtyZXR1cm4gYX1mdW5jdGlvbiBBZChhLGIpe2Zvcih2YXIgYyBpbiBiKWFbY109YltjXX1mdW5jdGlvbiBLYihhKXtPYS5wdXNoKGEpO1BhLnRleHRDb250ZW50PUxiKyt9ZnVuY3Rpb24gTWIoYSxiKXtmb3IoO2I7KXtpZihiPT1hKXJldHVybiEwO2I9Yi5wYXJlbnROb2RlfXJldHVybiExfWZ1bmN0aW9uIE5iKGEpe1FhfHwoUWE9ITAsS2IobWEpKTthYS5wdXNoKGEpfWZ1bmN0aW9uIG1hKCl7UWE9ITE7Zm9yKHZhciBhPSEhYWEubGVuZ3RoO2FhLmxlbmd0aDspYWEuc2hpZnQoKSgpO1xucmV0dXJuIGF9ZnVuY3Rpb24gQmQoYSxiKXt2YXIgYz1iLmdldFJvb3ROb2RlKCk7cmV0dXJuIGEubWFwKGZ1bmN0aW9uKGEpe3ZhciBiPWM9PT1hLnRhcmdldC5nZXRSb290Tm9kZSgpO2lmKGImJmEuYWRkZWROb2Rlcyl7aWYoYj1BcnJheS5mcm9tKGEuYWRkZWROb2RlcykuZmlsdGVyKGZ1bmN0aW9uKGEpe3JldHVybiBjPT09YS5nZXRSb290Tm9kZSgpfSksYi5sZW5ndGgpcmV0dXJuIGE9T2JqZWN0LmNyZWF0ZShhKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcImFkZGVkTm9kZXNcIix7dmFsdWU6Yixjb25maWd1cmFibGU6ITB9KSxhfWVsc2UgaWYoYilyZXR1cm4gYX0pLmZpbHRlcihmdW5jdGlvbihhKXtyZXR1cm4gYX0pfWZ1bmN0aW9uIE9iKGEpe3N3aXRjaChhKXtjYXNlIFwiJlwiOnJldHVyblwiJmFtcDtcIjtjYXNlIFwiPFwiOnJldHVyblwiJmx0O1wiO2Nhc2UgXCI+XCI6cmV0dXJuXCImZ3Q7XCI7Y2FzZSAnXCInOnJldHVyblwiJnF1b3Q7XCI7Y2FzZSBcIlxcdTAwYTBcIjpyZXR1cm5cIiZuYnNwO1wifX1cbmZ1bmN0aW9uIFBiKGEpe2Zvcih2YXIgYj17fSxjPTA7YzxhLmxlbmd0aDtjKyspYlthW2NdXT0hMDtyZXR1cm4gYn1mdW5jdGlvbiBSYShhLGIpe1widGVtcGxhdGVcIj09PWEubG9jYWxOYW1lJiYoYT1hLmNvbnRlbnQpO2Zvcih2YXIgYz1cIlwiLGQ9Yj9iKGEpOmEuY2hpbGROb2RlcyxlPTAsZj1kLmxlbmd0aCxrO2U8ZiYmKGs9ZFtlXSk7ZSsrKXthOnt2YXIgaD1rO3ZhciB3PWE7dmFyIGc9Yjtzd2l0Y2goaC5ub2RlVHlwZSl7Y2FzZSBOb2RlLkVMRU1FTlRfTk9ERTpmb3IodmFyIG09aC5sb2NhbE5hbWUsbD1cIjxcIittLHE9aC5hdHRyaWJ1dGVzLG49MDt3PXFbbl07bisrKWwrPVwiIFwiK3cubmFtZSsnPVwiJyt3LnZhbHVlLnJlcGxhY2UoQ2QsT2IpKydcIic7bCs9XCI+XCI7aD1EZFttXT9sOmwrUmEoaCxnKStcIjwvXCIrbStcIj5cIjticmVhayBhO2Nhc2UgTm9kZS5URVhUX05PREU6aD1oLmRhdGE7aD13JiZFZFt3LmxvY2FsTmFtZV0/aDpoLnJlcGxhY2UoRmQsT2IpO2JyZWFrIGE7Y2FzZSBOb2RlLkNPTU1FTlRfTk9ERTpoPVxuXCJcXHgzYyEtLVwiK2guZGF0YStcIi0tXFx4M2VcIjticmVhayBhO2RlZmF1bHQ6dGhyb3cgd2luZG93LmNvbnNvbGUuZXJyb3IoaCksRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7fX1jKz1ofXJldHVybiBjfWZ1bmN0aW9uIFUoYSl7Qy5jdXJyZW50Tm9kZT1hO3JldHVybiBDLnBhcmVudE5vZGUoKX1mdW5jdGlvbiBLYShhKXtDLmN1cnJlbnROb2RlPWE7cmV0dXJuIEMuZmlyc3RDaGlsZCgpfWZ1bmN0aW9uIExhKGEpe0MuY3VycmVudE5vZGU9YTtyZXR1cm4gQy5sYXN0Q2hpbGQoKX1mdW5jdGlvbiBRYihhKXtDLmN1cnJlbnROb2RlPWE7cmV0dXJuIEMucHJldmlvdXNTaWJsaW5nKCl9ZnVuY3Rpb24gUmIoYSl7Qy5jdXJyZW50Tm9kZT1hO3JldHVybiBDLm5leHRTaWJsaW5nKCl9ZnVuY3Rpb24gUyhhKXt2YXIgYj1bXTtDLmN1cnJlbnROb2RlPWE7Zm9yKGE9Qy5maXJzdENoaWxkKCk7YTspYi5wdXNoKGEpLGE9Qy5uZXh0U2libGluZygpO3JldHVybiBifWZ1bmN0aW9uIFNiKGEpe0QuY3VycmVudE5vZGU9XG5hO3JldHVybiBELnBhcmVudE5vZGUoKX1mdW5jdGlvbiBUYihhKXtELmN1cnJlbnROb2RlPWE7cmV0dXJuIEQuZmlyc3RDaGlsZCgpfWZ1bmN0aW9uIFViKGEpe0QuY3VycmVudE5vZGU9YTtyZXR1cm4gRC5sYXN0Q2hpbGQoKX1mdW5jdGlvbiBWYihhKXtELmN1cnJlbnROb2RlPWE7cmV0dXJuIEQucHJldmlvdXNTaWJsaW5nKCl9ZnVuY3Rpb24gV2IoYSl7RC5jdXJyZW50Tm9kZT1hO3JldHVybiBELm5leHRTaWJsaW5nKCl9ZnVuY3Rpb24gWGIoYSl7dmFyIGI9W107RC5jdXJyZW50Tm9kZT1hO2ZvcihhPUQuZmlyc3RDaGlsZCgpO2E7KWIucHVzaChhKSxhPUQubmV4dFNpYmxpbmcoKTtyZXR1cm4gYn1mdW5jdGlvbiBZYihhKXtyZXR1cm4gUmEoYSxmdW5jdGlvbihhKXtyZXR1cm4gUyhhKX0pfWZ1bmN0aW9uIFpiKGEpe3N3aXRjaChhLm5vZGVUeXBlKXtjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOmNhc2UgTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFOmE9ZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihhLFxuTm9kZUZpbHRlci5TSE9XX1RFWFQsbnVsbCwhMSk7Zm9yKHZhciBiPVwiXCIsYztjPWEubmV4dE5vZGUoKTspYis9Yy5ub2RlVmFsdWU7cmV0dXJuIGI7ZGVmYXVsdDpyZXR1cm4gYS5ub2RlVmFsdWV9fWZ1bmN0aW9uIEsoYSxiLGMpe2Zvcih2YXIgZCBpbiBiKXt2YXIgZT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGEsZCk7ZSYmZS5jb25maWd1cmFibGV8fCFlJiZjP09iamVjdC5kZWZpbmVQcm9wZXJ0eShhLGQsYltkXSk6YyYmY29uc29sZS53YXJuKFwiQ291bGQgbm90IGRlZmluZVwiLGQsXCJvblwiLGEpfX1mdW5jdGlvbiBQKGEpe0soYSwkYik7SyhhLFNhKTtLKGEsVGEpfWZ1bmN0aW9uIGFjKGEsYixjKXtKYihhKTtjPWN8fG51bGw7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307Yi5fX3NoYWR5PWIuX19zaGFkeXx8e307YyYmKGMuX19zaGFkeT1jLl9fc2hhZHl8fHt9KTthLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nPWM/Yy5fX3NoYWR5LnByZXZpb3VzU2libGluZzpiLmxhc3RDaGlsZDtcbnZhciBkPWEuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc7ZCYmZC5fX3NoYWR5JiYoZC5fX3NoYWR5Lm5leHRTaWJsaW5nPWEpOyhkPWEuX19zaGFkeS5uZXh0U2libGluZz1jKSYmZC5fX3NoYWR5JiYoZC5fX3NoYWR5LnByZXZpb3VzU2libGluZz1hKTthLl9fc2hhZHkucGFyZW50Tm9kZT1iO2M/Yz09PWIuX19zaGFkeS5maXJzdENoaWxkJiYoYi5fX3NoYWR5LmZpcnN0Q2hpbGQ9YSk6KGIuX19zaGFkeS5sYXN0Q2hpbGQ9YSxiLl9fc2hhZHkuZmlyc3RDaGlsZHx8KGIuX19zaGFkeS5maXJzdENoaWxkPWEpKTtiLl9fc2hhZHkuY2hpbGROb2Rlcz1udWxsfWZ1bmN0aW9uIFVhKGEsYixjKXtpZihiPT09YSl0aHJvdyBFcnJvcihcIkZhaWxlZCB0byBleGVjdXRlICdhcHBlbmRDaGlsZCcgb24gJ05vZGUnOiBUaGUgbmV3IGNoaWxkIGVsZW1lbnQgY29udGFpbnMgdGhlIHBhcmVudC5cIik7aWYoYyl7dmFyIGQ9Yy5fX3NoYWR5JiZjLl9fc2hhZHkucGFyZW50Tm9kZTtpZih2b2lkIDAhPT1kJiZcbmQhPT1hfHx2b2lkIDA9PT1kJiZVKGMpIT09YSl0aHJvdyBFcnJvcihcIkZhaWxlZCB0byBleGVjdXRlICdpbnNlcnRCZWZvcmUnIG9uICdOb2RlJzogVGhlIG5vZGUgYmVmb3JlIHdoaWNoIHRoZSBuZXcgbm9kZSBpcyB0byBiZSBpbnNlcnRlZCBpcyBub3QgYSBjaGlsZCBvZiB0aGlzIG5vZGUuXCIpO31pZihjPT09YilyZXR1cm4gYjtiLnBhcmVudE5vZGUmJlZhKGIucGFyZW50Tm9kZSxiKTtkPVooYSk7dmFyIGU7aWYoZT1kKWE6e2lmKCFiLl9fbm9JbnNlcnRpb25Qb2ludCl7dmFyIGY7XCJzbG90XCI9PT1iLmxvY2FsTmFtZT9mPVtiXTpiLnF1ZXJ5U2VsZWN0b3JBbGwmJihmPWIucXVlcnlTZWxlY3RvckFsbChcInNsb3RcIikpO2lmKGYmJmYubGVuZ3RoKXtlPWY7YnJlYWsgYX19ZT12b2lkIDB9KGY9ZSkmJmQuUWEoZik7ZCYmKFwic2xvdFwiPT09YS5sb2NhbE5hbWV8fGYpJiZkLkwoKTtpZihUKGEpKXtkPWM7SWIoYSk7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307dm9pZCAwIT09YS5fX3NoYWR5LmZpcnN0Q2hpbGQmJlxuKGEuX19zaGFkeS5jaGlsZE5vZGVzPW51bGwpO2lmKGIubm9kZVR5cGU9PT1Ob2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpe2Y9Yi5jaGlsZE5vZGVzO2ZvcihlPTA7ZTxmLmxlbmd0aDtlKyspYWMoZltlXSxhLGQpO2IuX19zaGFkeT1iLl9fc2hhZHl8fHt9O2Q9dm9pZCAwIT09Yi5fX3NoYWR5LmZpcnN0Q2hpbGQ/bnVsbDp2b2lkIDA7Yi5fX3NoYWR5LmZpcnN0Q2hpbGQ9Yi5fX3NoYWR5Lmxhc3RDaGlsZD1kO2IuX19zaGFkeS5jaGlsZE5vZGVzPWR9ZWxzZSBhYyhiLGEsZCk7aWYoV2EoYSkpe2EuX19zaGFkeS5yb290LkwoKTt2YXIgaz0hMH1lbHNlIGEuX19zaGFkeS5yb290JiYoaz0hMCl9a3x8KGs9RyhhKT9hLmhvc3Q6YSxjPyhjPWJjKGMpLFhhLmNhbGwoayxiLGMpKTpjYy5jYWxsKGssYikpO2RjKGEsYik7cmV0dXJuIGJ9ZnVuY3Rpb24gVmEoYSxiKXtpZihiLnBhcmVudE5vZGUhPT1hKXRocm93IEVycm9yKFwiVGhlIG5vZGUgdG8gYmUgcmVtb3ZlZCBpcyBub3QgYSBjaGlsZCBvZiB0aGlzIG5vZGU6IFwiK1xuYik7dmFyIGM9WihiKTtpZihUKGEpKXtiLl9fc2hhZHk9Yi5fX3NoYWR5fHx7fTthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTtiPT09YS5fX3NoYWR5LmZpcnN0Q2hpbGQmJihhLl9fc2hhZHkuZmlyc3RDaGlsZD1iLl9fc2hhZHkubmV4dFNpYmxpbmcpO2I9PT1hLl9fc2hhZHkubGFzdENoaWxkJiYoYS5fX3NoYWR5Lmxhc3RDaGlsZD1iLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nKTt2YXIgZD1iLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nO3ZhciBlPWIuX19zaGFkeS5uZXh0U2libGluZztkJiYoZC5fX3NoYWR5PWQuX19zaGFkeXx8e30sZC5fX3NoYWR5Lm5leHRTaWJsaW5nPWUpO2UmJihlLl9fc2hhZHk9ZS5fX3NoYWR5fHx7fSxlLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nPWQpO2IuX19zaGFkeS5wYXJlbnROb2RlPWIuX19zaGFkeS5wcmV2aW91c1NpYmxpbmc9Yi5fX3NoYWR5Lm5leHRTaWJsaW5nPXZvaWQgMDt2b2lkIDAhPT1hLl9fc2hhZHkuY2hpbGROb2RlcyYmKGEuX19zaGFkeS5jaGlsZE5vZGVzPVxubnVsbCk7aWYoV2EoYSkpe2EuX19zaGFkeS5yb290LkwoKTt2YXIgZj0hMH19ZWMoYik7YyYmKChlPWEmJlwic2xvdFwiPT09YS5sb2NhbE5hbWUpJiYoZj0hMCksKChkPWMuVGEoYikpfHxlKSYmYy5MKCkpO2Z8fChmPUcoYSk/YS5ob3N0OmEsKCFhLl9fc2hhZHkucm9vdCYmXCJzbG90XCIhPT1iLmxvY2FsTmFtZXx8Zj09PVUoYikpJiZiYS5jYWxsKGYsYikpO2RjKGEsbnVsbCxiKTtyZXR1cm4gYn1mdW5jdGlvbiBlYyhhKXtpZihhLl9fc2hhZHkmJnZvaWQgMCE9PWEuX19zaGFkeS5tYSlmb3IodmFyIGI9YS5jaGlsZE5vZGVzLGM9MCxkPWIubGVuZ3RoLGU7YzxkJiYoZT1iW2NdKTtjKyspZWMoZSk7YS5fX3NoYWR5JiYoYS5fX3NoYWR5Lm1hPXZvaWQgMCl9ZnVuY3Rpb24gYmMoYSl7dmFyIGI9YTthJiZcInNsb3RcIj09PWEubG9jYWxOYW1lJiYoYj0oYj1hLl9fc2hhZHkmJmEuX19zaGFkeS5SKSYmYi5sZW5ndGg/YlswXTpiYyhhLm5leHRTaWJsaW5nKSk7cmV0dXJuIGJ9ZnVuY3Rpb24gV2EoYSl7cmV0dXJuKGE9XG5hJiZhLl9fc2hhZHkmJmEuX19zaGFkeS5yb290KSYmYS50YSgpfWZ1bmN0aW9uIGZjKGEsYil7XCJzbG90XCI9PT1iPyhhPWEucGFyZW50Tm9kZSxXYShhKSYmYS5fX3NoYWR5LnJvb3QuTCgpKTpcInNsb3RcIj09PWEubG9jYWxOYW1lJiZcIm5hbWVcIj09PWImJihiPVooYSkpJiYoYi5WYShhKSxiLkwoKSl9ZnVuY3Rpb24gZGMoYSxiLGMpe2lmKGE9YS5fX3NoYWR5JiZhLl9fc2hhZHkuVCliJiZhLmFkZGVkTm9kZXMucHVzaChiKSxjJiZhLnJlbW92ZWROb2Rlcy5wdXNoKGMpLGEuaGIoKX1mdW5jdGlvbiBnYyhhKXtpZihhJiZhLm5vZGVUeXBlKXthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTt2YXIgYj1hLl9fc2hhZHkubWE7dm9pZCAwPT09YiYmKEcoYSk/Yj1hOmI9KGI9YS5wYXJlbnROb2RlKT9nYyhiKTphLGNhLmNhbGwoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LGEpJiYoYS5fX3NoYWR5Lm1hPWIpKTtyZXR1cm4gYn19ZnVuY3Rpb24gbmEoYSxiLGMpe3ZhciBkPVtdO2hjKGEuY2hpbGROb2RlcyxcbmIsYyxkKTtyZXR1cm4gZH1mdW5jdGlvbiBoYyhhLGIsYyxkKXtmb3IodmFyIGU9MCxmPWEubGVuZ3RoLGs7ZTxmJiYoaz1hW2VdKTtlKyspe3ZhciBoO2lmKGg9ay5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFKXtoPWs7dmFyIHc9YixnPWMsbT1kLGw9dyhoKTtsJiZtLnB1c2goaCk7ZyYmZyhsKT9oPWw6KGhjKGguY2hpbGROb2Rlcyx3LGcsbSksaD12b2lkIDApfWlmKGgpYnJlYWt9fWZ1bmN0aW9uIGljKGEpe2E9YS5nZXRSb290Tm9kZSgpO0coYSkmJmEudmEoKX1mdW5jdGlvbiBqYyhhLGIsYyl7b2F8fChvYT13aW5kb3cuU2hhZHlDU1MmJndpbmRvdy5TaGFkeUNTUy5TY29waW5nU2hpbSk7b2EmJlwiY2xhc3NcIj09PWI/b2Euc2V0RWxlbWVudENsYXNzKGEsYyk6KGtjLmNhbGwoYSxiLGMpLGZjKGEsYikpfWZ1bmN0aW9uIGxjKGEsYil7aWYoYS5vd25lckRvY3VtZW50IT09ZG9jdW1lbnQpcmV0dXJuIFlhLmNhbGwoZG9jdW1lbnQsYSxiKTt2YXIgYz1ZYS5jYWxsKGRvY3VtZW50LFxuYSwhMSk7aWYoYil7YT1hLmNoaWxkTm9kZXM7Yj0wO2Zvcih2YXIgZDtiPGEubGVuZ3RoO2IrKylkPWxjKGFbYl0sITApLGMuYXBwZW5kQ2hpbGQoZCl9cmV0dXJuIGN9ZnVuY3Rpb24gWmEoYSxiKXt2YXIgYz1bXSxkPWE7Zm9yKGE9YT09PXdpbmRvdz93aW5kb3c6YS5nZXRSb290Tm9kZSgpO2Q7KWMucHVzaChkKSxkPWQuYXNzaWduZWRTbG90P2QuYXNzaWduZWRTbG90OmQubm9kZVR5cGU9PT1Ob2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUmJmQuaG9zdCYmKGJ8fGQhPT1hKT9kLmhvc3Q6ZC5wYXJlbnROb2RlO2NbYy5sZW5ndGgtMV09PT1kb2N1bWVudCYmYy5wdXNoKHdpbmRvdyk7cmV0dXJuIGN9ZnVuY3Rpb24gbWMoYSxiKXtpZighRylyZXR1cm4gYTthPVphKGEsITApO2Zvcih2YXIgYz0wLGQsZSxmLGs7YzxiLmxlbmd0aDtjKyspaWYoZD1iW2NdLGY9ZD09PXdpbmRvdz93aW5kb3c6ZC5nZXRSb290Tm9kZSgpLGYhPT1lJiYoaz1hLmluZGV4T2YoZiksZT1mKSwhRyhmKXx8XG4tMTxrKXJldHVybiBkfWZ1bmN0aW9uICRhKGEpe2Z1bmN0aW9uIGIoYixkKXtiPW5ldyBhKGIsZCk7Yi5lYT1kJiYhIWQuY29tcG9zZWQ7cmV0dXJuIGJ9QWQoYixhKTtiLnByb3RvdHlwZT1hLnByb3RvdHlwZTtyZXR1cm4gYn1mdW5jdGlvbiBuYyhhLGIsYyl7aWYoYz1iLl9faGFuZGxlcnMmJmIuX19oYW5kbGVyc1thLnR5cGVdJiZiLl9faGFuZGxlcnNbYS50eXBlXVtjXSlmb3IodmFyIGQ9MCxlOyhlPWNbZF0pJiZhLnRhcmdldCE9PWEucmVsYXRlZFRhcmdldCYmKGUuY2FsbChiLGEpLCFhLkthKTtkKyspO31mdW5jdGlvbiBHZChhKXt2YXIgYj1hLmNvbXBvc2VkUGF0aCgpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShhLFwiY3VycmVudFRhcmdldFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZH0sY29uZmlndXJhYmxlOiEwfSk7Zm9yKHZhciBjPWIubGVuZ3RoLTE7MDw9YztjLS0pe3ZhciBkPWJbY107bmMoYSxkLFwiY2FwdHVyZVwiKTtpZihhLmZhKXJldHVybn1PYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcblwiZXZlbnRQaGFzZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gRXZlbnQuQVRfVEFSR0VUfX0pO3ZhciBlO2ZvcihjPTA7YzxiLmxlbmd0aDtjKyspe2Q9YltjXTt2YXIgZj1kLl9fc2hhZHkmJmQuX19zaGFkeS5yb290O2lmKDA9PT1jfHxmJiZmPT09ZSlpZihuYyhhLGQsXCJidWJibGVcIiksZCE9PXdpbmRvdyYmKGU9ZC5nZXRSb290Tm9kZSgpKSxhLmZhKWJyZWFrfX1mdW5jdGlvbiBvYyhhLGIsYyxkLGUsZil7Zm9yKHZhciBrPTA7azxhLmxlbmd0aDtrKyspe3ZhciBoPWFba10sdz1oLnR5cGUsZz1oLmNhcHR1cmUsbT1oLm9uY2UsbD1oLnBhc3NpdmU7aWYoYj09PWgubm9kZSYmYz09PXcmJmQ9PT1nJiZlPT09bSYmZj09PWwpcmV0dXJuIGt9cmV0dXJuLTF9ZnVuY3Rpb24gcGMoYSxiLGMpe2lmKGIpe2lmKFwib2JqZWN0XCI9PT10eXBlb2YgYyl7dmFyIGQ9ISFjLmNhcHR1cmU7dmFyIGU9ISFjLm9uY2U7dmFyIGY9ISFjLnBhc3NpdmV9ZWxzZSBkPSEhYyxmPWU9ITE7dmFyIGs9YyYmYy5nYXx8XG50aGlzLGg9YltkYV07aWYoaCl7aWYoLTE8b2MoaCxrLGEsZCxlLGYpKXJldHVybn1lbHNlIGJbZGFdPVtdO2g9ZnVuY3Rpb24oZCl7ZSYmdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGEsYixjKTtkLl9fdGFyZ2V0fHxxYyhkKTtpZihrIT09dGhpcyl7dmFyIGY9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkLFwiY3VycmVudFRhcmdldFwiKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZCxcImN1cnJlbnRUYXJnZXRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGt9LGNvbmZpZ3VyYWJsZTohMH0pfWlmKGQuY29tcG9zZWR8fC0xPGQuY29tcG9zZWRQYXRoKCkuaW5kZXhPZihrKSlpZihkLnRhcmdldD09PWQucmVsYXRlZFRhcmdldClkLmV2ZW50UGhhc2U9PT1FdmVudC5CVUJCTElOR19QSEFTRSYmZC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtlbHNlIGlmKGQuZXZlbnRQaGFzZT09PUV2ZW50LkNBUFRVUklOR19QSEFTRXx8ZC5idWJibGVzfHxkLnRhcmdldD09PWspe3ZhciBoPVxuXCJvYmplY3RcIj09PXR5cGVvZiBiJiZiLmhhbmRsZUV2ZW50P2IuaGFuZGxlRXZlbnQoZCk6Yi5jYWxsKGssZCk7ayE9PXRoaXMmJihmPyhPYmplY3QuZGVmaW5lUHJvcGVydHkoZCxcImN1cnJlbnRUYXJnZXRcIixmKSxmPW51bGwpOmRlbGV0ZSBkLmN1cnJlbnRUYXJnZXQpO3JldHVybiBofX07YltkYV0ucHVzaCh7bm9kZTp0aGlzLHR5cGU6YSxjYXB0dXJlOmQsb25jZTplLHBhc3NpdmU6ZixsYjpofSk7YWJbYV0/KHRoaXMuX19oYW5kbGVycz10aGlzLl9faGFuZGxlcnN8fHt9LHRoaXMuX19oYW5kbGVyc1thXT10aGlzLl9faGFuZGxlcnNbYV18fHtjYXB0dXJlOltdLGJ1YmJsZTpbXX0sdGhpcy5fX2hhbmRsZXJzW2FdW2Q/XCJjYXB0dXJlXCI6XCJidWJibGVcIl0ucHVzaChoKSk6KHRoaXMgaW5zdGFuY2VvZiBXaW5kb3c/cmM6c2MpLmNhbGwodGhpcyxhLGgsYyl9fWZ1bmN0aW9uIHRjKGEsYixjKXtpZihiKXtpZihcIm9iamVjdFwiPT09dHlwZW9mIGMpe3ZhciBkPSEhYy5jYXB0dXJlO3ZhciBlPVxuISFjLm9uY2U7dmFyIGY9ISFjLnBhc3NpdmV9ZWxzZSBkPSEhYyxmPWU9ITE7dmFyIGs9YyYmYy5nYXx8dGhpcyxoPXZvaWQgMDt2YXIgZz1udWxsO3RyeXtnPWJbZGFdfWNhdGNoKHIpe31nJiYoZT1vYyhnLGssYSxkLGUsZiksLTE8ZSYmKGg9Zy5zcGxpY2UoZSwxKVswXS5sYixnLmxlbmd0aHx8KGJbZGFdPXZvaWQgMCkpKTsodGhpcyBpbnN0YW5jZW9mIFdpbmRvdz91Yzp2YykuY2FsbCh0aGlzLGEsaHx8YixjKTtoJiZhYlthXSYmdGhpcy5fX2hhbmRsZXJzJiZ0aGlzLl9faGFuZGxlcnNbYV0mJihhPXRoaXMuX19oYW5kbGVyc1thXVtkP1wiY2FwdHVyZVwiOlwiYnViYmxlXCJdLGg9YS5pbmRleE9mKGgpLC0xPGgmJmEuc3BsaWNlKGgsMSkpfX1mdW5jdGlvbiBIZCgpe2Zvcih2YXIgYSBpbiBhYil3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihhLGZ1bmN0aW9uKGEpe2EuX190YXJnZXR8fChxYyhhKSxHZChhKSl9LCEwKX1mdW5jdGlvbiBxYyhhKXthLl9fdGFyZ2V0PWEudGFyZ2V0O2EucmE9XG5hLnJlbGF0ZWRUYXJnZXQ7aWYoRS5TKXt2YXIgYj13YyxjPU9iamVjdC5nZXRQcm90b3R5cGVPZihhKTtpZighYy5oYXNPd25Qcm9wZXJ0eShcIl9fcGF0Y2hQcm90b1wiKSl7dmFyIGQ9T2JqZWN0LmNyZWF0ZShjKTtkLm5iPWM7TWEoZCxiKTtjLl9fcGF0Y2hQcm90bz1kfWEuX19wcm90b19fPWMuX19wYXRjaFByb3RvfWVsc2UgTWEoYSx3Yyl9ZnVuY3Rpb24gZWEoYSxiKXtyZXR1cm57aW5kZXg6YSxVOltdLFc6Yn19ZnVuY3Rpb24gSWQoYSxiLGMsZCl7dmFyIGU9MCxmPTAsaz0wLGg9MCxnPU1hdGgubWluKGItZSxkLWYpO2lmKDA9PWUmJjA9PWYpYTp7Zm9yKGs9MDtrPGc7aysrKWlmKGFba10hPT1jW2tdKWJyZWFrIGE7az1nfWlmKGI9PWEubGVuZ3RoJiZkPT1jLmxlbmd0aCl7aD1hLmxlbmd0aDtmb3IodmFyIHI9Yy5sZW5ndGgsbT0wO208Zy1rJiZKZChhWy0taF0sY1stLXJdKTspbSsrO2g9bX1lKz1rO2YrPWs7Yi09aDtkLT1oO2lmKDA9PWItZSYmMD09ZC1mKXJldHVybltdO1xuaWYoZT09Yil7Zm9yKGI9ZWEoZSwwKTtmPGQ7KWIuVS5wdXNoKGNbZisrXSk7cmV0dXJuW2JdfWlmKGY9PWQpcmV0dXJuW2VhKGUsYi1lKV07Zz1lO2s9ZjtkPWQtaysxO2g9Yi1nKzE7Yj1BcnJheShkKTtmb3Iocj0wO3I8ZDtyKyspYltyXT1BcnJheShoKSxiW3JdWzBdPXI7Zm9yKHI9MDtyPGg7cisrKWJbMF1bcl09cjtmb3Iocj0xO3I8ZDtyKyspZm9yKG09MTttPGg7bSsrKWlmKGFbZyttLTFdPT09Y1trK3ItMV0pYltyXVttXT1iW3ItMV1bbS0xXTtlbHNle3ZhciBsPWJbci0xXVttXSsxLG49YltyXVttLTFdKzE7YltyXVttXT1sPG4/bDpufWc9Yi5sZW5ndGgtMTtrPWJbMF0ubGVuZ3RoLTE7ZD1iW2ddW2tdO2ZvcihhPVtdOzA8Z3x8MDxrOykwPT1nPyhhLnB1c2goMiksay0tKTowPT1rPyhhLnB1c2goMyksZy0tKTooaD1iW2ctMV1bay0xXSxyPWJbZy0xXVtrXSxtPWJbZ11bay0xXSxsPXI8bT9yPGg/cjpoOm08aD9tOmgsbD09aD8oaD09ZD9hLnB1c2goMCk6KGEucHVzaCgxKSxcbmQ9aCksZy0tLGstLSk6bD09cj8oYS5wdXNoKDMpLGctLSxkPXIpOihhLnB1c2goMiksay0tLGQ9bSkpO2EucmV2ZXJzZSgpO2I9dm9pZCAwO2c9W107Zm9yKGs9MDtrPGEubGVuZ3RoO2srKylzd2l0Y2goYVtrXSl7Y2FzZSAwOmImJihnLnB1c2goYiksYj12b2lkIDApO2UrKztmKys7YnJlYWs7Y2FzZSAxOmJ8fChiPWVhKGUsMCkpO2IuVysrO2UrKztiLlUucHVzaChjW2ZdKTtmKys7YnJlYWs7Y2FzZSAyOmJ8fChiPWVhKGUsMCkpO2IuVysrO2UrKzticmVhaztjYXNlIDM6Ynx8KGI9ZWEoZSwwKSksYi5VLnB1c2goY1tmXSksZisrfWImJmcucHVzaChiKTtyZXR1cm4gZ31mdW5jdGlvbiBKZChhLGIpe3JldHVybiBhPT09Yn1mdW5jdGlvbiB4YyhhKXt2YXIgYj1bXTtkbyBiLnVuc2hpZnQoYSk7d2hpbGUoYT1hLnBhcmVudE5vZGUpO3JldHVybiBifWZ1bmN0aW9uIHljKGEpe2ljKGEpO3JldHVybiBhLl9fc2hhZHkmJmEuX19zaGFkeS5hc3NpZ25lZFNsb3R8fG51bGx9ZnVuY3Rpb24gTChhLFxuYil7Zm9yKHZhciBjPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGIpLGQ9MDtkPGMubGVuZ3RoO2QrKyl7dmFyIGU9Y1tkXSxmPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYixlKTtmLnZhbHVlP2FbZV09Zi52YWx1ZTpPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxlLGYpfX1mdW5jdGlvbiBLZCgpe3ZhciBhPXdpbmRvdy5jdXN0b21FbGVtZW50cyYmd2luZG93LmN1c3RvbUVsZW1lbnRzLm5hdGl2ZUhUTUxFbGVtZW50fHxIVE1MRWxlbWVudDtMKHdpbmRvdy5Ob2RlLnByb3RvdHlwZSxMZCk7TCh3aW5kb3cuV2luZG93LnByb3RvdHlwZSxNZCk7TCh3aW5kb3cuVGV4dC5wcm90b3R5cGUsTmQpO0wod2luZG93LkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLGJiKTtMKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSx6Yyk7TCh3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLEFjKTt3aW5kb3cuSFRNTFNsb3RFbGVtZW50JiZMKHdpbmRvdy5IVE1MU2xvdEVsZW1lbnQucHJvdG90eXBlLFxuQmMpO0woYS5wcm90b3R5cGUsT2QpO0UuUyYmKFAod2luZG93Lk5vZGUucHJvdG90eXBlKSxQKHdpbmRvdy5UZXh0LnByb3RvdHlwZSksUCh3aW5kb3cuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUpLFAod2luZG93LkVsZW1lbnQucHJvdG90eXBlKSxQKGEucHJvdG90eXBlKSxQKHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUpLHdpbmRvdy5IVE1MU2xvdEVsZW1lbnQmJlAod2luZG93LkhUTUxTbG90RWxlbWVudC5wcm90b3R5cGUpKX1mdW5jdGlvbiBDYyhhKXt2YXIgYj1QZC5oYXMoYSk7YT0vXlthLXpdWy4wLTlfYS16XSotW1xcLS4wLTlfYS16XSokLy50ZXN0KGEpO3JldHVybiFiJiZhfWZ1bmN0aW9uIHQoYSl7dmFyIGI9YS5pc0Nvbm5lY3RlZDtpZih2b2lkIDAhPT1iKXJldHVybiBiO2Zvcig7YSYmIShhLl9fQ0VfaXNJbXBvcnREb2N1bWVudHx8YSBpbnN0YW5jZW9mIERvY3VtZW50KTspYT1hLnBhcmVudE5vZGV8fCh3aW5kb3cuU2hhZG93Um9vdCYmYSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q/XG5hLmhvc3Q6dm9pZCAwKTtyZXR1cm4hKCFhfHwhKGEuX19DRV9pc0ltcG9ydERvY3VtZW50fHxhIGluc3RhbmNlb2YgRG9jdW1lbnQpKX1mdW5jdGlvbiBjYihhLGIpe2Zvcig7YiYmYiE9PWEmJiFiLm5leHRTaWJsaW5nOyliPWIucGFyZW50Tm9kZTtyZXR1cm4gYiYmYiE9PWE/Yi5uZXh0U2libGluZzpudWxsfWZ1bmN0aW9uIE8oYSxiLGMpe2M9Yz9jOm5ldyBTZXQ7Zm9yKHZhciBkPWE7ZDspe2lmKGQubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSl7dmFyIGU9ZDtiKGUpO3ZhciBmPWUubG9jYWxOYW1lO2lmKFwibGlua1wiPT09ZiYmXCJpbXBvcnRcIj09PWUuZ2V0QXR0cmlidXRlKFwicmVsXCIpKXtkPWUuaW1wb3J0O2lmKGQgaW5zdGFuY2VvZiBOb2RlJiYhYy5oYXMoZCkpZm9yKGMuYWRkKGQpLGQ9ZC5maXJzdENoaWxkO2Q7ZD1kLm5leHRTaWJsaW5nKU8oZCxiLGMpO2Q9Y2IoYSxlKTtjb250aW51ZX1lbHNlIGlmKFwidGVtcGxhdGVcIj09PWYpe2Q9Y2IoYSxlKTtjb250aW51ZX1pZihlPVxuZS5fX0NFX3NoYWRvd1Jvb3QpZm9yKGU9ZS5maXJzdENoaWxkO2U7ZT1lLm5leHRTaWJsaW5nKU8oZSxiLGMpfWQ9ZC5maXJzdENoaWxkP2QuZmlyc3RDaGlsZDpjYihhLGQpfX1mdW5jdGlvbiB4KGEsYixjKXthW2JdPWN9ZnVuY3Rpb24gZGIoYSl7YT1hLnJlcGxhY2UoRi5ZYSxcIlwiKS5yZXBsYWNlKEYucG9ydCxcIlwiKTt2YXIgYj1EYyxjPWEsZD1uZXcgQmE7ZC5zdGFydD0wO2QuZW5kPWMubGVuZ3RoO2Zvcih2YXIgZT1kLGY9MCxrPWMubGVuZ3RoO2Y8aztmKyspaWYoXCJ7XCI9PT1jW2ZdKXtlLnJ1bGVzfHwoZS5ydWxlcz1bXSk7dmFyIGg9ZSxnPWgucnVsZXNbaC5ydWxlcy5sZW5ndGgtMV18fG51bGw7ZT1uZXcgQmE7ZS5zdGFydD1mKzE7ZS5wYXJlbnQ9aDtlLnByZXZpb3VzPWc7aC5ydWxlcy5wdXNoKGUpfWVsc2VcIn1cIj09PWNbZl0mJihlLmVuZD1mKzEsZT1lLnBhcmVudHx8ZCk7cmV0dXJuIGIoZCxhKX1mdW5jdGlvbiBEYyhhLGIpe3ZhciBjPWIuc3Vic3RyaW5nKGEuc3RhcnQsXG5hLmVuZC0xKTthLnBhcnNlZENzc1RleHQ9YS5jc3NUZXh0PWMudHJpbSgpO2EucGFyZW50JiYoYz1iLnN1YnN0cmluZyhhLnByZXZpb3VzP2EucHJldmlvdXMuZW5kOmEucGFyZW50LnN0YXJ0LGEuc3RhcnQtMSksYz1RZChjKSxjPWMucmVwbGFjZShGLkJhLFwiIFwiKSxjPWMuc3Vic3RyaW5nKGMubGFzdEluZGV4T2YoXCI7XCIpKzEpLGM9YS5wYXJzZWRTZWxlY3Rvcj1hLnNlbGVjdG9yPWMudHJpbSgpLGEuYXRSdWxlPTA9PT1jLmluZGV4T2YoXCJAXCIpLGEuYXRSdWxlPzA9PT1jLmluZGV4T2YoXCJAbWVkaWFcIik/YS50eXBlPUkuTUVESUFfUlVMRTpjLm1hdGNoKEYuY2IpJiYoYS50eXBlPUkuZGEsYS5rZXlmcmFtZXNOYW1lPWEuc2VsZWN0b3Iuc3BsaXQoRi5CYSkucG9wKCkpOmEudHlwZT0wPT09Yy5pbmRleE9mKFwiLS1cIik/SS5uYTpJLlNUWUxFX1JVTEUpO2lmKGM9YS5ydWxlcylmb3IodmFyIGQ9MCxlPWMubGVuZ3RoLGY7ZDxlJiYoZj1jW2RdKTtkKyspRGMoZixiKTtyZXR1cm4gYX1mdW5jdGlvbiBRZChhKXtyZXR1cm4gYS5yZXBsYWNlKC9cXFxcKFswLTlhLWZdezEsNn0pXFxzL2dpLFxuZnVuY3Rpb24oYSxjKXthPWM7Zm9yKGM9Ni1hLmxlbmd0aDtjLS07KWE9XCIwXCIrYTtyZXR1cm5cIlxcXFxcIithfSl9ZnVuY3Rpb24gRWMoYSxiLGMpe2M9dm9pZCAwPT09Yz9cIlwiOmM7dmFyIGQ9XCJcIjtpZihhLmNzc1RleHR8fGEucnVsZXMpe3ZhciBlPWEucnVsZXMsZjtpZihmPWUpZj1lWzBdLGY9IShmJiZmLnNlbGVjdG9yJiYwPT09Zi5zZWxlY3Rvci5pbmRleE9mKFwiLS1cIikpO2lmKGYpe2Y9MDtmb3IodmFyIGs9ZS5sZW5ndGgsaDtmPGsmJihoPWVbZl0pO2YrKylkPUVjKGgsYixkKX1lbHNlIGI/Yj1hLmNzc1RleHQ6KGI9YS5jc3NUZXh0LGI9Yi5yZXBsYWNlKEYud2EsXCJcIikucmVwbGFjZShGLkFhLFwiXCIpLGI9Yi5yZXBsYWNlKEYuZWIsXCJcIikucmVwbGFjZShGLmpiLFwiXCIpKSwoZD1iLnRyaW0oKSkmJihkPVwiICBcIitkK1wiXFxuXCIpfWQmJihhLnNlbGVjdG9yJiYoYys9YS5zZWxlY3RvcitcIiB7XFxuXCIpLGMrPWQsYS5zZWxlY3RvciYmKGMrPVwifVxcblxcblwiKSk7cmV0dXJuIGN9ZnVuY3Rpb24gRmMoYSl7QT1cbmEmJmEuc2hpbWNzc3Byb3BlcnRpZXM/ITE6enx8IShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLzYwMXxFZGdlXFwvMTUvKXx8IXdpbmRvdy5DU1N8fCFDU1Muc3VwcG9ydHN8fCFDU1Muc3VwcG9ydHMoXCJib3gtc2hhZG93XCIsXCIwIDAgMCB2YXIoLS1mb28pXCIpKX1mdW5jdGlvbiBWKGEsYil7aWYoIWEpcmV0dXJuXCJcIjtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPWRiKGEpKTtiJiZXKGEsYik7cmV0dXJuIEVjKGEsQSl9ZnVuY3Rpb24gcGEoYSl7IWEuX19jc3NSdWxlcyYmYS50ZXh0Q29udGVudCYmKGEuX19jc3NSdWxlcz1kYihhLnRleHRDb250ZW50KSk7cmV0dXJuIGEuX19jc3NSdWxlc3x8bnVsbH1mdW5jdGlvbiBHYyhhKXtyZXR1cm4hIWEucGFyZW50JiZhLnBhcmVudC50eXBlPT09SS5kYX1mdW5jdGlvbiBXKGEsYixjLGQpe2lmKGEpe3ZhciBlPSExLGY9YS50eXBlO2lmKGQmJmY9PT1JLk1FRElBX1JVTEUpe3ZhciBrPWEuc2VsZWN0b3IubWF0Y2goUmQpO1xuayYmKHdpbmRvdy5tYXRjaE1lZGlhKGtbMV0pLm1hdGNoZXN8fChlPSEwKSl9Zj09PUkuU1RZTEVfUlVMRT9iKGEpOmMmJmY9PT1JLmRhP2MoYSk6Zj09PUkubmEmJihlPSEwKTtpZigoYT1hLnJ1bGVzKSYmIWUpe2U9MDtmPWEubGVuZ3RoO2Zvcih2YXIgaDtlPGYmJihoPWFbZV0pO2UrKylXKGgsYixjLGQpfX19ZnVuY3Rpb24gZWIoYSxiLGMsZCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO2ImJmUuc2V0QXR0cmlidXRlKFwic2NvcGVcIixiKTtlLnRleHRDb250ZW50PWE7SGMoZSxjLGQpO3JldHVybiBlfWZ1bmN0aW9uIEhjKGEsYixjKXtiPWJ8fGRvY3VtZW50LmhlYWQ7Yi5pbnNlcnRCZWZvcmUoYSxjJiZjLm5leHRTaWJsaW5nfHxiLmZpcnN0Q2hpbGQpO1E/YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihRKT09PU5vZGUuRE9DVU1FTlRfUE9TSVRJT05fUFJFQ0VESU5HJiYoUT1hKTpRPWF9ZnVuY3Rpb24gSWMoYSxiKXt2YXIgYz1hLmluZGV4T2YoXCJ2YXIoXCIpO1xuaWYoLTE9PT1jKXJldHVybiBiKGEsXCJcIixcIlwiLFwiXCIpO2E6e3ZhciBkPTA7dmFyIGU9YyszO2Zvcih2YXIgZj1hLmxlbmd0aDtlPGY7ZSsrKWlmKFwiKFwiPT09YVtlXSlkKys7ZWxzZSBpZihcIilcIj09PWFbZV0mJjA9PT0tLWQpYnJlYWsgYTtlPS0xfWQ9YS5zdWJzdHJpbmcoYys0LGUpO2M9YS5zdWJzdHJpbmcoMCxjKTthPUljKGEuc3Vic3RyaW5nKGUrMSksYik7ZT1kLmluZGV4T2YoXCIsXCIpO3JldHVybi0xPT09ZT9iKGMsZC50cmltKCksXCJcIixhKTpiKGMsZC5zdWJzdHJpbmcoMCxlKS50cmltKCksZC5zdWJzdHJpbmcoZSsxKS50cmltKCksYSl9ZnVuY3Rpb24gcWEoYSxiKXt6P2Euc2V0QXR0cmlidXRlKFwiY2xhc3NcIixiKTp3aW5kb3cuU2hhZHlET00ubmF0aXZlTWV0aG9kcy5zZXRBdHRyaWJ1dGUuY2FsbChhLFwiY2xhc3NcIixiKX1mdW5jdGlvbiBSKGEpe3ZhciBiPWEubG9jYWxOYW1lLGM9XCJcIjtiPy0xPGIuaW5kZXhPZihcIi1cIil8fChjPWIsYj1hLmdldEF0dHJpYnV0ZSYmYS5nZXRBdHRyaWJ1dGUoXCJpc1wiKXx8XG5cIlwiKTooYj1hLmlzLGM9YS5leHRlbmRzKTtyZXR1cm57aXM6YixWOmN9fWZ1bmN0aW9uIEpjKGEpe2Zvcih2YXIgYj0wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz1hW2JdO2lmKGMudGFyZ2V0IT09ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50JiZjLnRhcmdldCE9PWRvY3VtZW50LmhlYWQpZm9yKHZhciBkPTA7ZDxjLmFkZGVkTm9kZXMubGVuZ3RoO2QrKyl7dmFyIGU9Yy5hZGRlZE5vZGVzW2RdO2lmKGUubm9kZVR5cGU9PT1Ob2RlLkVMRU1FTlRfTk9ERSl7dmFyIGY9ZS5nZXRSb290Tm9kZSgpO3ZhciBrPWU7dmFyIGg9W107ay5jbGFzc0xpc3Q/aD1BcnJheS5mcm9tKGsuY2xhc3NMaXN0KTprIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnQmJmsuaGFzQXR0cmlidXRlKFwiY2xhc3NcIikmJihoPWsuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuc3BsaXQoL1xccysvKSk7az1oO2g9ay5pbmRleE9mKHAuYSk7aWYoKGs9LTE8aD9rW2grMV06XCJcIikmJmY9PT1lLm93bmVyRG9jdW1lbnQpcC5iKGUsXG5rLCEwKTtlbHNlIGlmKGYubm9kZVR5cGU9PT1Ob2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUmJihmPWYuaG9zdCkpaWYoZj1SKGYpLmlzLGs9PT1mKWZvcihlPXdpbmRvdy5TaGFkeURPTS5uYXRpdmVNZXRob2RzLnF1ZXJ5U2VsZWN0b3JBbGwuY2FsbChlLFwiOm5vdCguXCIrcC5hK1wiKVwiKSxmPTA7ZjxlLmxlbmd0aDtmKyspcC5oKGVbZl0sayk7ZWxzZSBrJiZwLmIoZSxrLCEwKSxwLmIoZSxmKX19fX1mdW5jdGlvbiBTZChhKXtpZihhPXJhW2FdKWEuX2FwcGx5U2hpbUN1cnJlbnRWZXJzaW9uPWEuX2FwcGx5U2hpbUN1cnJlbnRWZXJzaW9ufHwwLGEuX2FwcGx5U2hpbVZhbGlkYXRpbmdWZXJzaW9uPWEuX2FwcGx5U2hpbVZhbGlkYXRpbmdWZXJzaW9ufHwwLGEuX2FwcGx5U2hpbU5leHRWZXJzaW9uPShhLl9hcHBseVNoaW1OZXh0VmVyc2lvbnx8MCkrMX1mdW5jdGlvbiBLYyhhKXtyZXR1cm4gYS5fYXBwbHlTaGltQ3VycmVudFZlcnNpb249PT1hLl9hcHBseVNoaW1OZXh0VmVyc2lvbn1cbmZ1bmN0aW9uIFRkKGEpe2EuX2FwcGx5U2hpbVZhbGlkYXRpbmdWZXJzaW9uPWEuX2FwcGx5U2hpbU5leHRWZXJzaW9uO2EuYnx8KGEuYj0hMCxVZC50aGVuKGZ1bmN0aW9uKCl7YS5fYXBwbHlTaGltQ3VycmVudFZlcnNpb249YS5fYXBwbHlTaGltTmV4dFZlcnNpb247YS5iPSExfSkpfWZ1bmN0aW9uIHViKGEpe3JlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe0xjP0xjKGEpOihmYnx8KGZiPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGEpe2diPWF9KSxcImNvbXBsZXRlXCI9PT1kb2N1bWVudC5yZWFkeVN0YXRlP2diKCk6ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixmdW5jdGlvbigpe1wiY29tcGxldGVcIj09PWRvY3VtZW50LnJlYWR5U3RhdGUmJmdiKCl9KSksZmIudGhlbihmdW5jdGlvbigpe2EmJmEoKX0pKX0pfShmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEsYil7aWYoXCJmdW5jdGlvblwiPT09dHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudClyZXR1cm4gbmV3IEN1c3RvbUV2ZW50KGEsXG5iKTt2YXIgYz1kb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO2MuaW5pdEN1c3RvbUV2ZW50KGEsISFiLmJ1YmJsZXMsISFiLmNhbmNlbGFibGUsYi5kZXRhaWwpO3JldHVybiBjfWZ1bmN0aW9uIGMoYSl7aWYobSlyZXR1cm4gYS5vd25lckRvY3VtZW50IT09ZG9jdW1lbnQ/YS5vd25lckRvY3VtZW50Om51bGw7dmFyIGI9YS5fX2ltcG9ydERvYztpZighYiYmYS5wYXJlbnROb2RlKXtiPWEucGFyZW50Tm9kZTtpZihcImZ1bmN0aW9uXCI9PT10eXBlb2YgYi5jbG9zZXN0KWI9Yi5jbG9zZXN0KFwibGlua1tyZWw9aW1wb3J0XVwiKTtlbHNlIGZvcig7IWgoYikmJihiPWIucGFyZW50Tm9kZSk7KTthLl9faW1wb3J0RG9jPWJ9cmV0dXJuIGJ9ZnVuY3Rpb24gZChhKXt2YXIgYj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1tyZWw9aW1wb3J0XTpub3QoW2ltcG9ydC1kZXBlbmRlbmN5XSlcIiksYz1iLmxlbmd0aDtjP2woYixmdW5jdGlvbihiKXtyZXR1cm4gayhiLGZ1bmN0aW9uKCl7MD09PVxuLS1jJiZhKCl9KX0pOmEoKX1mdW5jdGlvbiBlKGEpe2Z1bmN0aW9uIGIoKXtcImxvYWRpbmdcIiE9PWRvY3VtZW50LnJlYWR5U3RhdGUmJmRvY3VtZW50LmJvZHkmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGIpLGEoKSl9ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixiKTtiKCl9ZnVuY3Rpb24gZihhKXtlKGZ1bmN0aW9uKCl7cmV0dXJuIGQoZnVuY3Rpb24oKXtyZXR1cm4gYSYmYSgpfSl9KX1mdW5jdGlvbiBrKGEsYil7aWYoYS5fX2xvYWRlZCliJiZiKCk7ZWxzZSBpZihcInNjcmlwdFwiPT09YS5sb2NhbE5hbWUmJiFhLnNyY3x8XCJzdHlsZVwiPT09YS5sb2NhbE5hbWUmJiFhLmZpcnN0Q2hpbGQpYS5fX2xvYWRlZD0hMCxiJiZiKCk7ZWxzZXt2YXIgYz1mdW5jdGlvbihkKXthLnJlbW92ZUV2ZW50TGlzdGVuZXIoZC50eXBlLGMpO2EuX19sb2FkZWQ9ITA7YiYmYigpfTthLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsXG5jKTt6JiZcInN0eWxlXCI9PT1hLmxvY2FsTmFtZXx8YS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixjKX19ZnVuY3Rpb24gaChhKXtyZXR1cm4gYS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFJiZcImxpbmtcIj09PWEubG9jYWxOYW1lJiZcImltcG9ydFwiPT09YS5yZWx9ZnVuY3Rpb24gZygpe3ZhciBhPXRoaXM7dGhpcy5hPXt9O3RoaXMuYj0wO3RoaXMuZj1uZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihiKXtyZXR1cm4gYS5sKGIpfSk7dGhpcy5mLm9ic2VydmUoZG9jdW1lbnQuaGVhZCx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KTt0aGlzLmMoZG9jdW1lbnQpfWZ1bmN0aW9uIGwoYSxiLGMpe3ZhciBkPWE/YS5sZW5ndGg6MCxlPWM/LTE6MTtmb3IoYz1jP2QtMTowO2M8ZCYmMDw9YztjKz1lKWIoYVtjXSxjKX12YXIgbT1cImltcG9ydFwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIiksbj1udWxsOyExPT09XCJjdXJyZW50U2NyaXB0XCJpbiBkb2N1bWVudCYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGRvY3VtZW50LFxuXCJjdXJyZW50U2NyaXB0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiBufHwoXCJjb21wbGV0ZVwiIT09ZG9jdW1lbnQucmVhZHlTdGF0ZT9kb2N1bWVudC5zY3JpcHRzW2RvY3VtZW50LnNjcmlwdHMubGVuZ3RoLTFdOm51bGwpfSxjb25maWd1cmFibGU6ITB9KTt2YXIgcT0vKHVybFxcKCkoW14pXSopKFxcKSkvZyx0PS8oQGltcG9ydFtcXHNdKyg/IXVybFxcKCkpKFteO10qKSg7KS9nLHU9Lyg8bGlua1tePl0qKShyZWw9Wyd8XCJdP3N0eWxlc2hlZXRbJ3xcIl0/W14+XSo+KS9nLHA9e1phOmZ1bmN0aW9uKGEsYil7YS5ocmVmJiZhLnNldEF0dHJpYnV0ZShcImhyZWZcIixwLiQoYS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLGIpKTthLnNyYyYmYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIixwLiQoYS5nZXRBdHRyaWJ1dGUoXCJzcmNcIiksYikpO2lmKFwic3R5bGVcIj09PWEubG9jYWxOYW1lKXt2YXIgYz1wLkNhKGEudGV4dENvbnRlbnQsYixxKTthLnRleHRDb250ZW50PXAuQ2EoYyxiLHQpfX0sQ2E6ZnVuY3Rpb24oYSxcbmIsYyl7cmV0dXJuIGEucmVwbGFjZShjLGZ1bmN0aW9uKGEsYyxkLGUpe2E9ZC5yZXBsYWNlKC9bXCInXS9nLFwiXCIpO2ImJihhPXAuJChhLGIpKTtyZXR1cm4gYytcIidcIithK1wiJ1wiK2V9KX0sJDpmdW5jdGlvbihhLGIpe2lmKHZvaWQgMD09PXAuaGEpe3AuaGE9ITE7dHJ5e3ZhciBjPW5ldyBVUkwoXCJiXCIsXCJodHRwOi8vYVwiKTtjLnBhdGhuYW1lPVwiYyUyMGRcIjtwLmhhPVwiaHR0cDovL2EvYyUyMGRcIj09PWMuaHJlZn1jYXRjaChzZSl7fX1pZihwLmhhKXJldHVybihuZXcgVVJMKGEsYikpLmhyZWY7Yz1wLlBhO2N8fChjPWRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcInRlbXBcIikscC5QYT1jLGMucGE9Yy5jcmVhdGVFbGVtZW50KFwiYmFzZVwiKSxjLmhlYWQuYXBwZW5kQ2hpbGQoYy5wYSksYy5vYT1jLmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTtjLnBhLmhyZWY9YjtjLm9hLmhyZWY9YTtyZXR1cm4gYy5vYS5ocmVmfHxhfX0sdj17YXN5bmM6ITAsbG9hZDpmdW5jdGlvbihhLFxuYixjKXtpZihhKWlmKGEubWF0Y2goL15kYXRhOi8pKXthPWEuc3BsaXQoXCIsXCIpO3ZhciBkPWFbMV07ZD0tMTxhWzBdLmluZGV4T2YoXCI7YmFzZTY0XCIpP2F0b2IoZCk6ZGVjb2RlVVJJQ29tcG9uZW50KGQpO2IoZCl9ZWxzZXt2YXIgZT1uZXcgWE1MSHR0cFJlcXVlc3Q7ZS5vcGVuKFwiR0VUXCIsYSx2LmFzeW5jKTtlLm9ubG9hZD1mdW5jdGlvbigpe3ZhciBhPWUucmVzcG9uc2VVUkx8fGUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJMb2NhdGlvblwiKTthJiYwPT09YS5pbmRleE9mKFwiL1wiKSYmKGE9KGxvY2F0aW9uLm9yaWdpbnx8bG9jYXRpb24ucHJvdG9jb2wrXCIvL1wiK2xvY2F0aW9uLmhvc3QpK2EpO3ZhciBkPWUucmVzcG9uc2V8fGUucmVzcG9uc2VUZXh0OzMwND09PWUuc3RhdHVzfHwwPT09ZS5zdGF0dXN8fDIwMDw9ZS5zdGF0dXMmJjMwMD5lLnN0YXR1cz9iKGQsYSk6YyhkKX07ZS5zZW5kKCl9ZWxzZSBjKFwiZXJyb3I6IGhyZWYgbXVzdCBiZSBzcGVjaWZpZWRcIil9fSx6PS9UcmlkZW50Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpfHxcbi9FZGdlXFwvXFxkLi9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7Zy5wcm90b3R5cGUuYz1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2E9YS5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1tyZWw9aW1wb3J0XVwiKTtsKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGIuaChhKX0pfTtnLnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsYz1hLmhyZWY7aWYodm9pZCAwIT09dGhpcy5hW2NdKXt2YXIgZD10aGlzLmFbY107ZCYmZC5fX2xvYWRlZCYmKGEuaW1wb3J0PWQsdGhpcy5nKGEpKX1lbHNlIHRoaXMuYisrLHRoaXMuYVtjXT1cInBlbmRpbmdcIix2LmxvYWQoYyxmdW5jdGlvbihhLGQpe2E9Yi5tKGEsZHx8Yyk7Yi5hW2NdPWE7Yi5iLS07Yi5jKGEpO2IuaSgpfSxmdW5jdGlvbigpe2IuYVtjXT1udWxsO2IuYi0tO2IuaSgpfSl9O2cucHJvdG90eXBlLm09ZnVuY3Rpb24oYSxiKXtpZighYSlyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO3omJihhPWEucmVwbGFjZSh1LFxuZnVuY3Rpb24oYSxiLGMpe3JldHVybi0xPT09YS5pbmRleE9mKFwidHlwZT1cIik/YitcIiB0eXBlPWltcG9ydC1kaXNhYmxlIFwiK2M6YX0pKTt2YXIgYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7Yy5pbm5lckhUTUw9YTtpZihjLmNvbnRlbnQpYT1jLmNvbnRlbnQ7ZWxzZSBmb3IoYT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7Yy5maXJzdENoaWxkOylhLmFwcGVuZENoaWxkKGMuZmlyc3RDaGlsZCk7aWYoYz1hLnF1ZXJ5U2VsZWN0b3IoXCJiYXNlXCIpKWI9cC4kKGMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSxiKSxjLnJlbW92ZUF0dHJpYnV0ZShcImhyZWZcIik7Yz1hLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPWltcG9ydF0sIGxpbmtbcmVsPXN0eWxlc2hlZXRdW2hyZWZdW3R5cGU9aW1wb3J0LWRpc2FibGVdLFxcbiAgICBzdHlsZTpub3QoW3R5cGVdKSwgbGlua1tyZWw9c3R5bGVzaGVldF1baHJlZl06bm90KFt0eXBlXSksXFxuICAgIHNjcmlwdDpub3QoW3R5cGVdKSwgc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCJdLFxcbiAgICBzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXScpO1xudmFyIGQ9MDtsKGMsZnVuY3Rpb24oYSl7ayhhKTtwLlphKGEsYik7YS5zZXRBdHRyaWJ1dGUoXCJpbXBvcnQtZGVwZW5kZW5jeVwiLFwiXCIpO1wic2NyaXB0XCI9PT1hLmxvY2FsTmFtZSYmIWEuc3JjJiZhLnRleHRDb250ZW50JiYoYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIixcImRhdGE6dGV4dC9qYXZhc2NyaXB0O2NoYXJzZXQ9dXRmLTgsXCIrZW5jb2RlVVJJQ29tcG9uZW50KGEudGV4dENvbnRlbnQrKFwiXFxuLy8jIHNvdXJjZVVSTD1cIitiKyhkP1wiLVwiK2Q6XCJcIikrXCIuanNcXG5cIikpKSxhLnRleHRDb250ZW50PVwiXCIsZCsrKX0pO3JldHVybiBhfTtnLnByb3RvdHlwZS5pPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcztpZighdGhpcy5iKXt0aGlzLmYuZGlzY29ubmVjdCgpO3RoaXMuZmxhdHRlbihkb2N1bWVudCk7dmFyIGI9ITEsYz0hMSxkPWZ1bmN0aW9uKCl7YyYmYiYmKGEuYyhkb2N1bWVudCksYS5ifHwoYS5mLm9ic2VydmUoZG9jdW1lbnQuaGVhZCx7Y2hpbGRMaXN0OiEwLHN1YnRyZWU6ITB9KSxhLmooKSkpfTtcbnRoaXMucyhmdW5jdGlvbigpe2M9ITA7ZCgpfSk7dGhpcy5vKGZ1bmN0aW9uKCl7Yj0hMDtkKCl9KX19O2cucHJvdG90eXBlLmZsYXR0ZW49ZnVuY3Rpb24oYSl7dmFyIGI9dGhpczthPWEucXVlcnlTZWxlY3RvckFsbChcImxpbmtbcmVsPWltcG9ydF1cIik7bChhLGZ1bmN0aW9uKGEpe3ZhciBjPWIuYVthLmhyZWZdOyhhLmltcG9ydD1jKSYmYy5ub2RlVHlwZT09PU5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSYmKGIuYVthLmhyZWZdPWEsYS5yZWFkeVN0YXRlPVwibG9hZGluZ1wiLGEuaW1wb3J0PWEsYi5mbGF0dGVuKGMpLGEuYXBwZW5kQ2hpbGQoYykpfSl9O2cucHJvdG90eXBlLm89ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihlKXtpZihlPGQpe3ZhciBmPWNbZV0sZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2YucmVtb3ZlQXR0cmlidXRlKFwiaW1wb3J0LWRlcGVuZGVuY3lcIik7bChmLmF0dHJpYnV0ZXMsZnVuY3Rpb24oYSl7cmV0dXJuIGcuc2V0QXR0cmlidXRlKGEubmFtZSxcbmEudmFsdWUpfSk7bj1nO2YucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZyxmKTtrKGcsZnVuY3Rpb24oKXtuPW51bGw7YihlKzEpfSl9ZWxzZSBhKCl9dmFyIGM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFtpbXBvcnQtZGVwZW5kZW5jeV1cIiksZD1jLmxlbmd0aDtiKDApfTtnLnByb3RvdHlwZS5zPWZ1bmN0aW9uKGEpe3ZhciBiPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdHlsZVtpbXBvcnQtZGVwZW5kZW5jeV0sXFxuICAgIGxpbmtbcmVsPXN0eWxlc2hlZXRdW2ltcG9ydC1kZXBlbmRlbmN5XVwiKSxkPWIubGVuZ3RoO2lmKGQpe3ZhciBlPXomJiEhZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpbmtbcmVsPXN0eWxlc2hlZXRdW2hyZWZdW3R5cGU9aW1wb3J0LWRpc2FibGVdXCIpO2woYixmdW5jdGlvbihiKXtrKGIsZnVuY3Rpb24oKXtiLnJlbW92ZUF0dHJpYnV0ZShcImltcG9ydC1kZXBlbmRlbmN5XCIpOzA9PT0tLWQmJmEoKX0pO2lmKGUmJmIucGFyZW50Tm9kZSE9PVxuZG9jdW1lbnQuaGVhZCl7dmFyIGY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChiLmxvY2FsTmFtZSk7Zi5fX2FwcGxpZWRFbGVtZW50PWI7Zi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJpbXBvcnQtcGxhY2Vob2xkZXJcIik7Yi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmLGIubmV4dFNpYmxpbmcpO2ZvcihmPWMoYik7ZiYmYyhmKTspZj1jKGYpO2YucGFyZW50Tm9kZSE9PWRvY3VtZW50LmhlYWQmJihmPW51bGwpO2RvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGIsZik7Yi5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpfX0pfWVsc2UgYSgpfTtnLnByb3RvdHlwZS5qPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxiPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rW3JlbD1pbXBvcnRdXCIpO2woYixmdW5jdGlvbihiKXtyZXR1cm4gYS5nKGIpfSwhMCl9O2cucHJvdG90eXBlLmc9ZnVuY3Rpb24oYSl7YS5fX2xvYWRlZHx8KGEuX19sb2FkZWQ9ITAsYS5pbXBvcnQmJihhLmltcG9ydC5yZWFkeVN0YXRlPVxuXCJjb21wbGV0ZVwiKSxhLmRpc3BhdGNoRXZlbnQoYihhLmltcG9ydD9cImxvYWRcIjpcImVycm9yXCIse2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMSxkZXRhaWw6dm9pZCAwfSkpKX07Zy5wcm90b3R5cGUubD1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2woYSxmdW5jdGlvbihhKXtyZXR1cm4gbChhLmFkZGVkTm9kZXMsZnVuY3Rpb24oYSl7YSYmYS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFJiYoaChhKT9iLmgoYSk6Yi5jKGEpKX0pfSl9O2lmKG0pe3ZhciB4PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rW3JlbD1pbXBvcnRdXCIpO2woeCxmdW5jdGlvbihhKXthLmltcG9ydCYmXCJsb2FkaW5nXCI9PT1hLmltcG9ydC5yZWFkeVN0YXRlfHwoYS5fX2xvYWRlZD0hMCl9KTt4PWZ1bmN0aW9uKGEpe2E9YS50YXJnZXQ7aChhKSYmKGEuX19sb2FkZWQ9ITApfTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLHgsITApO2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLFxueCwhMCl9ZWxzZXt2YXIgeT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE5vZGUucHJvdG90eXBlLFwiYmFzZVVSSVwiKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoKCF5fHx5LmNvbmZpZ3VyYWJsZT9Ob2RlOkVsZW1lbnQpLnByb3RvdHlwZSxcImJhc2VVUklcIix7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9aCh0aGlzKT90aGlzOmModGhpcyk7cmV0dXJuIGE/YS5ocmVmOnkmJnkuZ2V0P3kuZ2V0LmNhbGwodGhpcyk6KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJiYXNlXCIpfHx3aW5kb3cubG9jYXRpb24pLmhyZWZ9LGNvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwfSk7ZShmdW5jdGlvbigpe3JldHVybiBuZXcgZ30pfWYoZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChiKFwiSFRNTEltcG9ydHNMb2FkZWRcIix7Y2FuY2VsYWJsZTohMCxidWJibGVzOiEwLGRldGFpbDp2b2lkIDB9KSl9KTthLnVzZU5hdGl2ZT1tO2Eud2hlblJlYWR5PWY7YS5pbXBvcnRGb3JFbGVtZW50PVxuY30pKHdpbmRvdy5IVE1MSW1wb3J0cz13aW5kb3cuSFRNTEltcG9ydHN8fHt9KTt2YXIgRT13aW5kb3cuU2hhZHlET018fHt9O0UuJGE9ISghRWxlbWVudC5wcm90b3R5cGUuYXR0YWNoU2hhZG93fHwhTm9kZS5wcm90b3R5cGUuZ2V0Um9vdE5vZGUpO3ZhciBoYj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE5vZGUucHJvdG90eXBlLFwiZmlyc3RDaGlsZFwiKTtFLlM9ISEoaGImJmhiLmNvbmZpZ3VyYWJsZSYmaGIuZ2V0KTtFLnphPUUuZm9yY2V8fCFFLiRhO3ZhciBYPUVsZW1lbnQucHJvdG90eXBlLE1jPVgubWF0Y2hlc3x8WC5tYXRjaGVzU2VsZWN0b3J8fFgubW96TWF0Y2hlc1NlbGVjdG9yfHxYLm1zTWF0Y2hlc1NlbGVjdG9yfHxYLm9NYXRjaGVzU2VsZWN0b3J8fFgud2Via2l0TWF0Y2hlc1NlbGVjdG9yLFBhPWRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpLExiPTAsT2E9W107KG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKCl7Zm9yKDtPYS5sZW5ndGg7KXRyeXtPYS5zaGlmdCgpKCl9Y2F0Y2goYSl7dGhyb3cgUGEudGV4dENvbnRlbnQ9XG5MYisrLGE7fX0pKS5vYnNlcnZlKFBhLHtjaGFyYWN0ZXJEYXRhOiEwfSk7dmFyIFZkPSEhZG9jdW1lbnQuY29udGFpbnMsYWE9W10sUWE7bWEubGlzdD1hYTtsYS5wcm90b3R5cGUuaGI9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO3RoaXMuYXx8KHRoaXMuYT0hMCxLYihmdW5jdGlvbigpe2EuYigpfSkpfTtsYS5wcm90b3R5cGUuYj1mdW5jdGlvbigpe2lmKHRoaXMuYSl7dGhpcy5hPSExO3ZhciBhPXRoaXMudGFrZVJlY29yZHMoKTthLmxlbmd0aCYmdGhpcy5YLmZvckVhY2goZnVuY3Rpb24oYil7YihhKX0pfX07bGEucHJvdG90eXBlLnRha2VSZWNvcmRzPWZ1bmN0aW9uKCl7aWYodGhpcy5hZGRlZE5vZGVzLmxlbmd0aHx8dGhpcy5yZW1vdmVkTm9kZXMubGVuZ3RoKXt2YXIgYT1be2FkZGVkTm9kZXM6dGhpcy5hZGRlZE5vZGVzLHJlbW92ZWROb2Rlczp0aGlzLnJlbW92ZWROb2Rlc31dO3RoaXMuYWRkZWROb2Rlcz1bXTt0aGlzLnJlbW92ZWROb2Rlcz1bXTtyZXR1cm4gYX1yZXR1cm5bXX07XG52YXIgY2M9RWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQsWGE9RWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlLGJhPUVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkLGtjPUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZSxOYz1FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGUsaWI9RWxlbWVudC5wcm90b3R5cGUuY2xvbmVOb2RlLFlhPURvY3VtZW50LnByb3RvdHlwZS5pbXBvcnROb2RlLHNjPUVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIsdmM9RWxlbWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcixyYz1XaW5kb3cucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIsdWM9V2luZG93LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyLGpiPUVsZW1lbnQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQsY2E9Tm9kZS5wcm90b3R5cGUuY29udGFpbnN8fEhUTUxFbGVtZW50LnByb3RvdHlwZS5jb250YWlucyxXZD1PYmplY3QuZnJlZXplKHthcHBlbmRDaGlsZDpjYyxcbmluc2VydEJlZm9yZTpYYSxyZW1vdmVDaGlsZDpiYSxzZXRBdHRyaWJ1dGU6a2MscmVtb3ZlQXR0cmlidXRlOk5jLGNsb25lTm9kZTppYixpbXBvcnROb2RlOllhLGFkZEV2ZW50TGlzdGVuZXI6c2MscmVtb3ZlRXZlbnRMaXN0ZW5lcjp2YyxyYjpyYyxzYjp1YyxkaXNwYXRjaEV2ZW50OmpiLHF1ZXJ5U2VsZWN0b3I6RWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3RvcixxdWVyeVNlbGVjdG9yQWxsOkVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwsY29udGFpbnM6Y2F9KSxDZD0vWyZcXHUwMEEwXCJdL2csRmQ9L1smXFx1MDBBMDw+XS9nLERkPVBiKFwiYXJlYSBiYXNlIGJyIGNvbCBjb21tYW5kIGVtYmVkIGhyIGltZyBpbnB1dCBrZXlnZW4gbGluayBtZXRhIHBhcmFtIHNvdXJjZSB0cmFjayB3YnJcIi5zcGxpdChcIiBcIikpLEVkPVBiKFwic3R5bGUgc2NyaXB0IHhtcCBpZnJhbWUgbm9lbWJlZCBub2ZyYW1lcyBwbGFpbnRleHQgbm9zY3JpcHRcIi5zcGxpdChcIiBcIikpLEM9ZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihkb2N1bWVudCxcbk5vZGVGaWx0ZXIuU0hPV19BTEwsbnVsbCwhMSksRD1kb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGRvY3VtZW50LE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULG51bGwsITEpLFhkPU9iamVjdC5mcmVlemUoe3BhcmVudE5vZGU6VSxmaXJzdENoaWxkOkthLGxhc3RDaGlsZDpMYSxwcmV2aW91c1NpYmxpbmc6UWIsbmV4dFNpYmxpbmc6UmIsY2hpbGROb2RlczpTLHBhcmVudEVsZW1lbnQ6U2IsZmlyc3RFbGVtZW50Q2hpbGQ6VGIsbGFzdEVsZW1lbnRDaGlsZDpVYixwcmV2aW91c0VsZW1lbnRTaWJsaW5nOlZiLG5leHRFbGVtZW50U2libGluZzpXYixjaGlsZHJlbjpYYixpbm5lckhUTUw6WWIsdGV4dENvbnRlbnQ6WmJ9KSxrYj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnQucHJvdG90eXBlLFwiaW5uZXJIVE1MXCIpfHxPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEhUTUxFbGVtZW50LnByb3RvdHlwZSxcImlubmVySFRNTFwiKSxzYT1kb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJpbmVydFwiKS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxubGI9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihEb2N1bWVudC5wcm90b3R5cGUsXCJhY3RpdmVFbGVtZW50XCIpLCRiPXtwYXJlbnRFbGVtZW50OntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5wYXJlbnROb2RlO2EmJmEubm9kZVR5cGUhPT1Ob2RlLkVMRU1FTlRfTk9ERSYmKGE9bnVsbCk7cmV0dXJuIHZvaWQgMCE9PWE/YTpTYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxwYXJlbnROb2RlOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9fc2hhZHkmJnRoaXMuX19zaGFkeS5wYXJlbnROb2RlO3JldHVybiB2b2lkIDAhPT1hP2E6VSh0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxuZXh0U2libGluZzp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkubmV4dFNpYmxpbmc7cmV0dXJuIHZvaWQgMCE9PWE/YTpSYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxwcmV2aW91c1NpYmxpbmc6e2dldDpmdW5jdGlvbigpe3ZhciBhPVxudGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nO3JldHVybiB2b2lkIDAhPT1hP2E6UWIodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sY2xhc3NOYW1lOntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKXx8XCJcIn0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixhKX0sY29uZmlndXJhYmxlOiEwfSxuZXh0RWxlbWVudFNpYmxpbmc6e2dldDpmdW5jdGlvbigpe2lmKHRoaXMuX19zaGFkeSYmdm9pZCAwIT09dGhpcy5fX3NoYWR5Lm5leHRTaWJsaW5nKXtmb3IodmFyIGE9dGhpcy5uZXh0U2libGluZzthJiZhLm5vZGVUeXBlIT09Tm9kZS5FTEVNRU5UX05PREU7KWE9YS5uZXh0U2libGluZztyZXR1cm4gYX1yZXR1cm4gV2IodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0scHJldmlvdXNFbGVtZW50U2libGluZzp7Z2V0OmZ1bmN0aW9uKCl7aWYodGhpcy5fX3NoYWR5JiZ2b2lkIDAhPT10aGlzLl9fc2hhZHkucHJldmlvdXNTaWJsaW5nKXtmb3IodmFyIGE9XG50aGlzLnByZXZpb3VzU2libGluZzthJiZhLm5vZGVUeXBlIT09Tm9kZS5FTEVNRU5UX05PREU7KWE9YS5wcmV2aW91c1NpYmxpbmc7cmV0dXJuIGF9cmV0dXJuIFZiKHRoaXMpfSxjb25maWd1cmFibGU6ITB9fSxTYT17Y2hpbGROb2Rlczp7Z2V0OmZ1bmN0aW9uKCl7aWYoVCh0aGlzKSl7aWYoIXRoaXMuX19zaGFkeS5jaGlsZE5vZGVzKXt0aGlzLl9fc2hhZHkuY2hpbGROb2Rlcz1bXTtmb3IodmFyIGE9dGhpcy5maXJzdENoaWxkO2E7YT1hLm5leHRTaWJsaW5nKXRoaXMuX19zaGFkeS5jaGlsZE5vZGVzLnB1c2goYSl9dmFyIGI9dGhpcy5fX3NoYWR5LmNoaWxkTm9kZXN9ZWxzZSBiPVModGhpcyk7Yi5pdGVtPWZ1bmN0aW9uKGEpe3JldHVybiBiW2FdfTtyZXR1cm4gYn0sY29uZmlndXJhYmxlOiEwfSxjaGlsZEVsZW1lbnRDb3VudDp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RofSxjb25maWd1cmFibGU6ITB9LGZpcnN0Q2hpbGQ6e2dldDpmdW5jdGlvbigpe3ZhciBhPVxudGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkuZmlyc3RDaGlsZDtyZXR1cm4gdm9pZCAwIT09YT9hOkthKHRoaXMpfSxjb25maWd1cmFibGU6ITB9LGxhc3RDaGlsZDp7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkubGFzdENoaWxkO3JldHVybiB2b2lkIDAhPT1hP2E6TGEodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sdGV4dENvbnRlbnQ6e2dldDpmdW5jdGlvbigpe2lmKFQodGhpcykpe2Zvcih2YXIgYT1bXSxiPTAsYz10aGlzLmNoaWxkTm9kZXMsZDtkPWNbYl07YisrKWQubm9kZVR5cGUhPT1Ob2RlLkNPTU1FTlRfTk9ERSYmYS5wdXNoKGQudGV4dENvbnRlbnQpO3JldHVybiBhLmpvaW4oXCJcIil9cmV0dXJuIFpiKHRoaXMpfSxzZXQ6ZnVuY3Rpb24oYSl7c3dpdGNoKHRoaXMubm9kZVR5cGUpe2Nhc2UgTm9kZS5FTEVNRU5UX05PREU6Y2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6Zm9yKDt0aGlzLmZpcnN0Q2hpbGQ7KXRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKTtcbigwPGEubGVuZ3RofHx0aGlzLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUpJiZ0aGlzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGEpKTticmVhaztkZWZhdWx0OnRoaXMubm9kZVZhbHVlPWF9fSxjb25maWd1cmFibGU6ITB9LGZpcnN0RWxlbWVudENoaWxkOntnZXQ6ZnVuY3Rpb24oKXtpZih0aGlzLl9fc2hhZHkmJnZvaWQgMCE9PXRoaXMuX19zaGFkeS5maXJzdENoaWxkKXtmb3IodmFyIGE9dGhpcy5maXJzdENoaWxkO2EmJmEubm9kZVR5cGUhPT1Ob2RlLkVMRU1FTlRfTk9ERTspYT1hLm5leHRTaWJsaW5nO3JldHVybiBhfXJldHVybiBUYih0aGlzKX0sY29uZmlndXJhYmxlOiEwfSxsYXN0RWxlbWVudENoaWxkOntnZXQ6ZnVuY3Rpb24oKXtpZih0aGlzLl9fc2hhZHkmJnZvaWQgMCE9PXRoaXMuX19zaGFkeS5sYXN0Q2hpbGQpe2Zvcih2YXIgYT10aGlzLmxhc3RDaGlsZDthJiZhLm5vZGVUeXBlIT09Tm9kZS5FTEVNRU5UX05PREU7KWE9YS5wcmV2aW91c1NpYmxpbmc7XG5yZXR1cm4gYX1yZXR1cm4gVWIodGhpcyl9LGNvbmZpZ3VyYWJsZTohMH0sY2hpbGRyZW46e2dldDpmdW5jdGlvbigpe3ZhciBhO1QodGhpcyk/YT1BcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwodGhpcy5jaGlsZE5vZGVzLGZ1bmN0aW9uKGEpe3JldHVybiBhLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREV9KTphPVhiKHRoaXMpO2EuaXRlbT1mdW5jdGlvbihiKXtyZXR1cm4gYVtiXX07cmV0dXJuIGF9LGNvbmZpZ3VyYWJsZTohMH0saW5uZXJIVE1MOntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1cInRlbXBsYXRlXCI9PT10aGlzLmxvY2FsTmFtZT90aGlzLmNvbnRlbnQ6dGhpcztyZXR1cm4gVCh0aGlzKT9SYShhKTpZYihhKX0sc2V0OmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1cInRlbXBsYXRlXCI9PT10aGlzLmxvY2FsTmFtZT90aGlzLmNvbnRlbnQ6dGhpcztiLmZpcnN0Q2hpbGQ7KWIucmVtb3ZlQ2hpbGQoYi5maXJzdENoaWxkKTtmb3Ioa2ImJmtiLnNldD9rYi5zZXQuY2FsbChzYSxhKTpcbnNhLmlubmVySFRNTD1hO3NhLmZpcnN0Q2hpbGQ7KWIuYXBwZW5kQ2hpbGQoc2EuZmlyc3RDaGlsZCl9LGNvbmZpZ3VyYWJsZTohMH19LE9jPXtzaGFkb3dSb290OntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fX3NoYWR5JiZ0aGlzLl9fc2hhZHkuZmJ8fG51bGx9LGNvbmZpZ3VyYWJsZTohMH19LFRhPXthY3RpdmVFbGVtZW50OntnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1sYiYmbGIuZ2V0P2xiLmdldC5jYWxsKGRvY3VtZW50KTpFLlM/dm9pZCAwOmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7aWYoYSYmYS5ub2RlVHlwZSl7dmFyIGI9ISFHKHRoaXMpO2lmKHRoaXM9PT1kb2N1bWVudHx8YiYmdGhpcy5ob3N0IT09YSYmY2EuY2FsbCh0aGlzLmhvc3QsYSkpe2ZvcihiPVooYSk7YiYmYiE9PXRoaXM7KWE9Yi5ob3N0LGI9WihhKTthPXRoaXM9PT1kb2N1bWVudD9iP251bGw6YTpiPT09dGhpcz9hOm51bGx9ZWxzZSBhPW51bGx9ZWxzZSBhPW51bGw7cmV0dXJuIGF9LHNldDpmdW5jdGlvbigpe30sXG5jb25maWd1cmFibGU6ITB9fSxKYj1FLlM/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKGEpe2EuX19zaGFkeSYmYS5fX3NoYWR5Lk5hfHwoYS5fX3NoYWR5PWEuX19zaGFkeXx8e30sYS5fX3NoYWR5Lk5hPSEwLEsoYSwkYiwhMCkpfSxJYj1FLlM/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKGEpe2EuX19zaGFkeSYmYS5fX3NoYWR5LkxhfHwoYS5fX3NoYWR5PWEuX19zaGFkeXx8e30sYS5fX3NoYWR5LkxhPSEwLEsoYSxTYSwhMCksSyhhLE9jLCEwKSl9LG9hPW51bGwsZGE9XCJfX2V2ZW50V3JhcHBlcnNcIitEYXRlLm5vdygpLFlkPXtibHVyOiEwLGZvY3VzOiEwLGZvY3VzaW46ITAsZm9jdXNvdXQ6ITAsY2xpY2s6ITAsZGJsY2xpY2s6ITAsbW91c2Vkb3duOiEwLG1vdXNlZW50ZXI6ITAsbW91c2VsZWF2ZTohMCxtb3VzZW1vdmU6ITAsbW91c2VvdXQ6ITAsbW91c2VvdmVyOiEwLG1vdXNldXA6ITAsd2hlZWw6ITAsYmVmb3JlaW5wdXQ6ITAsaW5wdXQ6ITAsa2V5ZG93bjohMCxrZXl1cDohMCxjb21wb3NpdGlvbnN0YXJ0OiEwLFxuY29tcG9zaXRpb251cGRhdGU6ITAsY29tcG9zaXRpb25lbmQ6ITAsdG91Y2hzdGFydDohMCx0b3VjaGVuZDohMCx0b3VjaG1vdmU6ITAsdG91Y2hjYW5jZWw6ITAscG9pbnRlcm92ZXI6ITAscG9pbnRlcmVudGVyOiEwLHBvaW50ZXJkb3duOiEwLHBvaW50ZXJtb3ZlOiEwLHBvaW50ZXJ1cDohMCxwb2ludGVyY2FuY2VsOiEwLHBvaW50ZXJvdXQ6ITAscG9pbnRlcmxlYXZlOiEwLGdvdHBvaW50ZXJjYXB0dXJlOiEwLGxvc3Rwb2ludGVyY2FwdHVyZTohMCxkcmFnc3RhcnQ6ITAsZHJhZzohMCxkcmFnZW50ZXI6ITAsZHJhZ2xlYXZlOiEwLGRyYWdvdmVyOiEwLGRyb3A6ITAsZHJhZ2VuZDohMCxET01BY3RpdmF0ZTohMCxET01Gb2N1c0luOiEwLERPTUZvY3VzT3V0OiEwLGtleXByZXNzOiEwfSx3Yz17Z2V0IGNvbXBvc2VkKCl7ITEhPT10aGlzLmlzVHJ1c3RlZCYmdm9pZCAwPT09dGhpcy5lYSYmKHRoaXMuZWE9WWRbdGhpcy50eXBlXSk7cmV0dXJuIHRoaXMuZWF8fCExfSxjb21wb3NlZFBhdGg6ZnVuY3Rpb24oKXt0aGlzLnFhfHxcbih0aGlzLnFhPVphKHRoaXMuX190YXJnZXQsdGhpcy5jb21wb3NlZCkpO3JldHVybiB0aGlzLnFhfSxnZXQgdGFyZ2V0KCl7cmV0dXJuIG1jKHRoaXMuY3VycmVudFRhcmdldCx0aGlzLmNvbXBvc2VkUGF0aCgpKX0sZ2V0IHJlbGF0ZWRUYXJnZXQoKXtpZighdGhpcy5yYSlyZXR1cm4gbnVsbDt0aGlzLnNhfHwodGhpcy5zYT1aYSh0aGlzLnJhLCEwKSk7cmV0dXJuIG1jKHRoaXMuY3VycmVudFRhcmdldCx0aGlzLnNhKX0sc3RvcFByb3BhZ2F0aW9uOmZ1bmN0aW9uKCl7RXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbi5jYWxsKHRoaXMpO3RoaXMuZmE9ITB9LHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpmdW5jdGlvbigpe0V2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24uY2FsbCh0aGlzKTt0aGlzLmZhPXRoaXMuS2E9ITB9fSxhYj17Zm9jdXM6ITAsYmx1cjohMH0sWmQ9JGEod2luZG93LkV2ZW50KSwkZD0kYSh3aW5kb3cuQ3VzdG9tRXZlbnQpLGFlPVxuJGEod2luZG93Lk1vdXNlRXZlbnQpLEhiPXt9O2wucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUpO2wucHJvdG90eXBlLkY9ZnVuY3Rpb24oYSxiKXt0aGlzLk1hPVwiU2hhZHlSb290XCI7a2EoYSk7a2EodGhpcyk7dGhpcy5ob3N0PWE7dGhpcy5IPWImJmIubW9kZTthLl9fc2hhZHk9YS5fX3NoYWR5fHx7fTthLl9fc2hhZHkucm9vdD10aGlzO2EuX19zaGFkeS5mYj1cImNsb3NlZFwiIT09dGhpcy5IP3RoaXM6bnVsbDt0aGlzLlA9ITE7dGhpcy5iPVtdO3RoaXMuYT17fTt0aGlzLmM9W107Yj1TKGEpO2Zvcih2YXIgYz0wLGQ9Yi5sZW5ndGg7YzxkO2MrKyliYS5jYWxsKGEsYltjXSl9O2wucHJvdG90eXBlLkw9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO3RoaXMuUHx8KHRoaXMuUD0hMCxOYihmdW5jdGlvbigpe3JldHVybiBhLnZhKCl9KSl9O2wucHJvdG90eXBlLks9ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcyxiPXRoaXM7YjspYi5QJiYoYT1iKSxcbmI9Yi5VYSgpO3JldHVybiBhfTtsLnByb3RvdHlwZS5VYT1mdW5jdGlvbigpe3ZhciBhPXRoaXMuaG9zdC5nZXRSb290Tm9kZSgpO2lmKEcoYSkpZm9yKHZhciBiPXRoaXMuaG9zdC5jaGlsZE5vZGVzLGM9MCxkO2M8Yi5sZW5ndGg7YysrKWlmKGQ9YltjXSx0aGlzLmooZCkpcmV0dXJuIGF9O2wucHJvdG90eXBlLnZhPWZ1bmN0aW9uKCl7dGhpcy5QJiZ0aGlzLksoKS5fcmVuZGVyUm9vdCgpfTtsLnByb3RvdHlwZS5fcmVuZGVyUm9vdD1mdW5jdGlvbigpe3RoaXMuUD0hMTt0aGlzLkIoKTt0aGlzLnMoKX07bC5wcm90b3R5cGUuQj1mdW5jdGlvbigpe3RoaXMuZigpO2Zvcih2YXIgYT0wLGI7YTx0aGlzLmIubGVuZ3RoO2ErKyliPXRoaXMuYlthXSx0aGlzLm8oYik7Zm9yKGI9dGhpcy5ob3N0LmZpcnN0Q2hpbGQ7YjtiPWIubmV4dFNpYmxpbmcpdGhpcy5oKGIpO2ZvcihhPTA7YTx0aGlzLmIubGVuZ3RoO2ErKyl7Yj10aGlzLmJbYV07aWYoIWIuX19zaGFkeS5hc3NpZ25lZE5vZGVzLmxlbmd0aClmb3IodmFyIGM9XG5iLmZpcnN0Q2hpbGQ7YztjPWMubmV4dFNpYmxpbmcpdGhpcy5oKGMsYik7Yz1iLnBhcmVudE5vZGU7KGM9Yy5fX3NoYWR5JiZjLl9fc2hhZHkucm9vdCkmJmMudGEoKSYmYy5fcmVuZGVyUm9vdCgpO3RoaXMuZyhiLl9fc2hhZHkuUixiLl9fc2hhZHkuYXNzaWduZWROb2Rlcyk7aWYoYz1iLl9fc2hhZHkudWEpe2Zvcih2YXIgZD0wO2Q8Yy5sZW5ndGg7ZCsrKWNbZF0uX19zaGFkeS5pYT1udWxsO2IuX19zaGFkeS51YT1udWxsO2MubGVuZ3RoPmIuX19zaGFkeS5hc3NpZ25lZE5vZGVzLmxlbmd0aCYmKGIuX19zaGFkeS5rYT0hMCl9Yi5fX3NoYWR5LmthJiYoYi5fX3NoYWR5LmthPSExLHRoaXMuaShiKSl9fTtsLnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEsYil7YS5fX3NoYWR5PWEuX19zaGFkeXx8e307dmFyIGM9YS5fX3NoYWR5LmlhO2EuX19zaGFkeS5pYT1udWxsO2J8fChiPShiPXRoaXMuYVthLnNsb3R8fFwiX19jYXRjaGFsbFwiXSkmJmJbMF0pO2I/KGIuX19zaGFkeS5hc3NpZ25lZE5vZGVzLnB1c2goYSksXG5hLl9fc2hhZHkuYXNzaWduZWRTbG90PWIpOmEuX19zaGFkeS5hc3NpZ25lZFNsb3Q9dm9pZCAwO2MhPT1hLl9fc2hhZHkuYXNzaWduZWRTbG90JiZhLl9fc2hhZHkuYXNzaWduZWRTbG90JiYoYS5fX3NoYWR5LmFzc2lnbmVkU2xvdC5fX3NoYWR5LmthPSEwKX07bC5wcm90b3R5cGUubz1mdW5jdGlvbihhKXt2YXIgYj1hLl9fc2hhZHkuYXNzaWduZWROb2RlczthLl9fc2hhZHkuYXNzaWduZWROb2Rlcz1bXTthLl9fc2hhZHkuUj1bXTtpZihhLl9fc2hhZHkudWE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl7dmFyIGQ9YltjXTtkLl9fc2hhZHkuaWE9ZC5fX3NoYWR5LmFzc2lnbmVkU2xvdDtkLl9fc2hhZHkuYXNzaWduZWRTbG90PT09YSYmKGQuX19zaGFkeS5hc3NpZ25lZFNsb3Q9bnVsbCl9fTtsLnByb3RvdHlwZS5nPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPTAsZDtjPGIubGVuZ3RoJiYoZD1iW2NdKTtjKyspXCJzbG90XCI9PWQubG9jYWxOYW1lP3RoaXMuZyhhLGQuX19zaGFkeS5hc3NpZ25lZE5vZGVzKTpcbmEucHVzaChiW2NdKX07bC5wcm90b3R5cGUuaT1mdW5jdGlvbihhKXtqYi5jYWxsKGEsbmV3IEV2ZW50KFwic2xvdGNoYW5nZVwiKSk7YS5fX3NoYWR5LmFzc2lnbmVkU2xvdCYmdGhpcy5pKGEuX19zaGFkeS5hc3NpZ25lZFNsb3QpfTtsLnByb3RvdHlwZS5zPWZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuYixiPVtdLGM9MDtjPGEubGVuZ3RoO2MrKyl7dmFyIGQ9YVtjXS5wYXJlbnROb2RlO2QuX19zaGFkeSYmZC5fX3NoYWR5LnJvb3R8fCEoMD5iLmluZGV4T2YoZCkpfHxiLnB1c2goZCl9Zm9yKGE9MDthPGIubGVuZ3RoO2ErKyljPWJbYV0sdGhpcy5PKGM9PT10aGlzP3RoaXMuaG9zdDpjLHRoaXMudyhjKSl9O2wucHJvdG90eXBlLnc9ZnVuY3Rpb24oYSl7dmFyIGI9W107YT1hLmNoaWxkTm9kZXM7Zm9yKHZhciBjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWFbY107aWYodGhpcy5qKGQpKXtkPWQuX19zaGFkeS5SO2Zvcih2YXIgZT0wO2U8ZC5sZW5ndGg7ZSsrKWIucHVzaChkW2VdKX1lbHNlIGIucHVzaChkKX1yZXR1cm4gYn07XG5sLnByb3RvdHlwZS5qPWZ1bmN0aW9uKGEpe3JldHVyblwic2xvdFwiPT1hLmxvY2FsTmFtZX07bC5wcm90b3R5cGUuTz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1TKGEpLGQ9SWQoYixiLmxlbmd0aCxjLGMubGVuZ3RoKSxlPTAsZj0wLGs7ZTxkLmxlbmd0aCYmKGs9ZFtlXSk7ZSsrKXtmb3IodmFyIGc9MCxsO2c8ay5VLmxlbmd0aCYmKGw9ay5VW2ddKTtnKyspVShsKT09PWEmJmJhLmNhbGwoYSxsKSxjLnNwbGljZShrLmluZGV4K2YsMSk7Zi09ay5XfWZvcihlPTA7ZTxkLmxlbmd0aCYmKGs9ZFtlXSk7ZSsrKWZvcihmPWNbay5pbmRleF0sZz1rLmluZGV4O2c8ay5pbmRleCtrLlc7ZysrKWw9YltnXSxYYS5jYWxsKGEsbCxmKSxjLnNwbGljZShnLDAsbCl9O2wucHJvdG90eXBlLlFhPWZ1bmN0aW9uKGEpe3RoaXMuYy5wdXNoLmFwcGx5KHRoaXMuYyxbXS5jb25jYXQoYSBpbnN0YW5jZW9mIEFycmF5P2E6aGQoZ2QoYSkpKSl9O2wucHJvdG90eXBlLmY9ZnVuY3Rpb24oKXt0aGlzLmMubGVuZ3RoJiZcbih0aGlzLkcodGhpcy5jKSx0aGlzLmM9W10pfTtsLnByb3RvdHlwZS5HPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYixjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWFbY107ZC5fX3NoYWR5PWQuX19zaGFkeXx8e307a2EoZCk7a2EoZC5wYXJlbnROb2RlKTt2YXIgZT10aGlzLmwoZCk7dGhpcy5hW2VdPyhiPWJ8fHt9LGJbZV09ITAsdGhpcy5hW2VdLnB1c2goZCkpOnRoaXMuYVtlXT1bZF07dGhpcy5iLnB1c2goZCl9aWYoYilmb3IodmFyIGYgaW4gYil0aGlzLmFbZl09dGhpcy5tKHRoaXMuYVtmXSl9O2wucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSl7dmFyIGI9YS5uYW1lfHxhLmdldEF0dHJpYnV0ZShcIm5hbWVcIil8fFwiX19jYXRjaGFsbFwiO3JldHVybiBhLk9hPWJ9O2wucHJvdG90eXBlLm09ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc29ydChmdW5jdGlvbihhLGMpe2E9eGMoYSk7Zm9yKHZhciBiPXhjKGMpLGU9MDtlPGEubGVuZ3RoO2UrKyl7Yz1hW2VdO3ZhciBmPWJbZV07aWYoYyE9PWYpcmV0dXJuIGE9XG5BcnJheS5mcm9tKGMucGFyZW50Tm9kZS5jaGlsZE5vZGVzKSxhLmluZGV4T2YoYyktYS5pbmRleE9mKGYpfX0pfTtsLnByb3RvdHlwZS5UYT1mdW5jdGlvbihhKXt0aGlzLmYoKTt2YXIgYj10aGlzLmEsYztmb3IoYyBpbiBiKWZvcih2YXIgZD1iW2NdLGU9MDtlPGQubGVuZ3RoO2UrKyl7dmFyIGY9ZFtlXTtpZihNYihhLGYpKXtkLnNwbGljZShlLDEpO3ZhciBrPXRoaXMuYi5pbmRleE9mKGYpOzA8PWsmJnRoaXMuYi5zcGxpY2UoaywxKTtlLS07dGhpcy5JKGYpO2s9ITB9fXJldHVybiBrfTtsLnByb3RvdHlwZS5WYT1mdW5jdGlvbihhKXt2YXIgYj1hLk9hLGM9dGhpcy5sKGEpO2lmKGMhPT1iKXtiPXRoaXMuYVtiXTt2YXIgZD1iLmluZGV4T2YoYSk7MDw9ZCYmYi5zcGxpY2UoZCwxKTtiPXRoaXMuYVtjXXx8KHRoaXMuYVtjXT1bXSk7Yi5wdXNoKGEpOzE8Yi5sZW5ndGgmJih0aGlzLmFbY109dGhpcy5tKGIpKX19O2wucHJvdG90eXBlLkk9ZnVuY3Rpb24oYSl7aWYoYT1hLl9fc2hhZHkuUilmb3IodmFyIGI9XG4wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz1hW2JdLGQ9VShjKTtkJiZiYS5jYWxsKGQsYyl9fTtsLnByb3RvdHlwZS50YT1mdW5jdGlvbigpe3RoaXMuZigpO3JldHVybiEhdGhpcy5iLmxlbmd0aH07bC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihhLGIsYyl7XCJvYmplY3RcIiE9PXR5cGVvZiBjJiYoYz17Y2FwdHVyZTohIWN9KTtjLmdhPXRoaXM7dGhpcy5ob3N0LmFkZEV2ZW50TGlzdGVuZXIoYSxiLGMpfTtsLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyPWZ1bmN0aW9uKGEsYixjKXtcIm9iamVjdFwiIT09dHlwZW9mIGMmJihjPXtjYXB0dXJlOiEhY30pO2MuZ2E9dGhpczt0aGlzLmhvc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGIsYyl9O2wucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkPWZ1bmN0aW9uKGEpe3JldHVybiBuYSh0aGlzLGZ1bmN0aW9uKGIpe3JldHVybiBiLmlkPT1hfSxmdW5jdGlvbihhKXtyZXR1cm4hIWF9KVswXXx8bnVsbH07KGZ1bmN0aW9uKGEpe0soYSxcblNhLCEwKTtLKGEsVGEsITApfSkobC5wcm90b3R5cGUpO3ZhciBNZD17YWRkRXZlbnRMaXN0ZW5lcjpwYy5iaW5kKHdpbmRvdykscmVtb3ZlRXZlbnRMaXN0ZW5lcjp0Yy5iaW5kKHdpbmRvdyl9LExkPXthZGRFdmVudExpc3RlbmVyOnBjLHJlbW92ZUV2ZW50TGlzdGVuZXI6dGMsYXBwZW5kQ2hpbGQ6ZnVuY3Rpb24oYSl7cmV0dXJuIFVhKHRoaXMsYSl9LGluc2VydEJlZm9yZTpmdW5jdGlvbihhLGIpe3JldHVybiBVYSh0aGlzLGEsYil9LHJlbW92ZUNoaWxkOmZ1bmN0aW9uKGEpe3JldHVybiBWYSh0aGlzLGEpfSxyZXBsYWNlQ2hpbGQ6ZnVuY3Rpb24oYSxiKXtVYSh0aGlzLGEsYik7VmEodGhpcyxiKTtyZXR1cm4gYX0sY2xvbmVOb2RlOmZ1bmN0aW9uKGEpe2lmKFwidGVtcGxhdGVcIj09dGhpcy5sb2NhbE5hbWUpdmFyIGI9aWIuY2FsbCh0aGlzLGEpO2Vsc2UgaWYoYj1pYi5jYWxsKHRoaXMsITEpLGEpe2E9dGhpcy5jaGlsZE5vZGVzO2Zvcih2YXIgYz0wLGQ7YzxhLmxlbmd0aDtjKyspZD1cbmFbY10uY2xvbmVOb2RlKCEwKSxiLmFwcGVuZENoaWxkKGQpfXJldHVybiBifSxnZXRSb290Tm9kZTpmdW5jdGlvbigpe3JldHVybiBnYyh0aGlzKX0sY29udGFpbnM6ZnVuY3Rpb24oYSl7cmV0dXJuIE1iKHRoaXMsYSl9LGdldCBpc0Nvbm5lY3RlZCgpe3ZhciBhPXRoaXMub3duZXJEb2N1bWVudDtpZihWZCYmY2EuY2FsbChhLHRoaXMpfHxhLmRvY3VtZW50RWxlbWVudCYmY2EuY2FsbChhLmRvY3VtZW50RWxlbWVudCx0aGlzKSlyZXR1cm4hMDtmb3IoYT10aGlzO2EmJiEoYSBpbnN0YW5jZW9mIERvY3VtZW50KTspYT1hLnBhcmVudE5vZGV8fChhIGluc3RhbmNlb2YgbD9hLmhvc3Q6dm9pZCAwKTtyZXR1cm4hIShhJiZhIGluc3RhbmNlb2YgRG9jdW1lbnQpfSxkaXNwYXRjaEV2ZW50OmZ1bmN0aW9uKGEpe21hKCk7cmV0dXJuIGpiLmNhbGwodGhpcyxhKX19LE5kPXtnZXQgYXNzaWduZWRTbG90KCl7cmV0dXJuIHljKHRoaXMpfX0sYmI9e3F1ZXJ5U2VsZWN0b3I6ZnVuY3Rpb24oYSl7cmV0dXJuIG5hKHRoaXMsXG5mdW5jdGlvbihiKXtyZXR1cm4gTWMuY2FsbChiLGEpfSxmdW5jdGlvbihhKXtyZXR1cm4hIWF9KVswXXx8bnVsbH0scXVlcnlTZWxlY3RvckFsbDpmdW5jdGlvbihhKXtyZXR1cm4gbmEodGhpcyxmdW5jdGlvbihiKXtyZXR1cm4gTWMuY2FsbChiLGEpfSl9fSxCYz17YXNzaWduZWROb2RlczpmdW5jdGlvbihhKXtpZihcInNsb3RcIj09PXRoaXMubG9jYWxOYW1lKXJldHVybiBpYyh0aGlzKSx0aGlzLl9fc2hhZHk/KGEmJmEuZmxhdHRlbj90aGlzLl9fc2hhZHkuUjp0aGlzLl9fc2hhZHkuYXNzaWduZWROb2Rlcyl8fFtdOltdfX0semM9TmEoe3NldEF0dHJpYnV0ZTpmdW5jdGlvbihhLGIpe2pjKHRoaXMsYSxiKX0scmVtb3ZlQXR0cmlidXRlOmZ1bmN0aW9uKGEpe05jLmNhbGwodGhpcyxhKTtmYyh0aGlzLGEpfSxhdHRhY2hTaGFkb3c6ZnVuY3Rpb24oYSl7aWYoIXRoaXMpdGhyb3dcIk11c3QgcHJvdmlkZSBhIGhvc3QuXCI7aWYoIWEpdGhyb3dcIk5vdCBlbm91Z2ggYXJndW1lbnRzLlwiO3JldHVybiBuZXcgbChIYixcbnRoaXMsYSl9LGdldCBzbG90KCl7cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwic2xvdFwiKX0sc2V0IHNsb3QoYSl7amModGhpcyxcInNsb3RcIixhKX0sZ2V0IGFzc2lnbmVkU2xvdCgpe3JldHVybiB5Yyh0aGlzKX19LGJiLEJjKTtPYmplY3QuZGVmaW5lUHJvcGVydGllcyh6YyxPYyk7dmFyIEFjPU5hKHtpbXBvcnROb2RlOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGxjKGEsYil9LGdldEVsZW1lbnRCeUlkOmZ1bmN0aW9uKGEpe3JldHVybiBuYSh0aGlzLGZ1bmN0aW9uKGIpe3JldHVybiBiLmlkPT1hfSxmdW5jdGlvbihhKXtyZXR1cm4hIWF9KVswXXx8bnVsbH19LGJiKTtPYmplY3QuZGVmaW5lUHJvcGVydGllcyhBYyx7X2FjdGl2ZUVsZW1lbnQ6VGEuYWN0aXZlRWxlbWVudH0pO3ZhciBiZT1IVE1MRWxlbWVudC5wcm90b3R5cGUuYmx1cixPZD1OYSh7Ymx1cjpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX19zaGFkeSYmdGhpcy5fX3NoYWR5LnJvb3Q7KGE9YSYmYS5hY3RpdmVFbGVtZW50KT9cbmEuYmx1cigpOmJlLmNhbGwodGhpcyl9fSk7RS56YSYmKHdpbmRvdy5TaGFkeURPTT17aW5Vc2U6RS56YSxwYXRjaDpmdW5jdGlvbihhKXtyZXR1cm4gYX0saXNTaGFkeVJvb3Q6RyxlbnF1ZXVlOk5iLGZsdXNoOm1hLHNldHRpbmdzOkUsZmlsdGVyTXV0YXRpb25zOkJkLG9ic2VydmVDaGlsZHJlbjp6ZCx1bm9ic2VydmVDaGlsZHJlbjp5ZCxuYXRpdmVNZXRob2RzOldkLG5hdGl2ZVRyZWU6WGR9LHdpbmRvdy5FdmVudD1aZCx3aW5kb3cuQ3VzdG9tRXZlbnQ9JGQsd2luZG93Lk1vdXNlRXZlbnQ9YWUsSGQoKSxLZCgpLHdpbmRvdy5TaGFkb3dSb290PWwpO3ZhciBQZD1uZXcgU2V0KFwiYW5ub3RhdGlvbi14bWwgY29sb3ItcHJvZmlsZSBmb250LWZhY2UgZm9udC1mYWNlLXNyYyBmb250LWZhY2UtdXJpIGZvbnQtZmFjZS1mb3JtYXQgZm9udC1mYWNlLW5hbWUgbWlzc2luZy1nbHlwaFwiLnNwbGl0KFwiIFwiKSk7Qi5wcm90b3R5cGUuQj1mdW5jdGlvbihhLGIpe3RoaXMuby5zZXQoYSxiKTtcbnRoaXMubS5zZXQoYi5jb25zdHJ1Y3RvcixiKX07Qi5wcm90b3R5cGUuYz1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5vLmdldChhKX07Qi5wcm90b3R5cGUudz1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5tLmdldChhKX07Qi5wcm90b3R5cGUucz1mdW5jdGlvbihhKXt0aGlzLmg9ITA7dGhpcy5qLnB1c2goYSl9O0IucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpczt0aGlzLmgmJk8oYSxmdW5jdGlvbihhKXtyZXR1cm4gYi5nKGEpfSl9O0IucHJvdG90eXBlLmc9ZnVuY3Rpb24oYSl7aWYodGhpcy5oJiYhYS5fX0NFX3BhdGNoZWQpe2EuX19DRV9wYXRjaGVkPSEwO2Zvcih2YXIgYj0wO2I8dGhpcy5qLmxlbmd0aDtiKyspdGhpcy5qW2JdKGEpfX07Qi5wcm90b3R5cGUuYj1mdW5jdGlvbihhKXt2YXIgYj1bXTtPKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGIucHVzaChhKX0pO2ZvcihhPTA7YTxiLmxlbmd0aDthKyspe3ZhciBjPWJbYV07MT09PWMuX19DRV9zdGF0ZT90aGlzLmNvbm5lY3RlZENhbGxiYWNrKGMpOlxudGhpcy5pKGMpfX07Qi5wcm90b3R5cGUuYT1mdW5jdGlvbihhKXt2YXIgYj1bXTtPKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGIucHVzaChhKX0pO2ZvcihhPTA7YTxiLmxlbmd0aDthKyspe3ZhciBjPWJbYV07MT09PWMuX19DRV9zdGF0ZSYmdGhpcy5kaXNjb25uZWN0ZWRDYWxsYmFjayhjKX19O0IucHJvdG90eXBlLmY9ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzO2I9Yj9iOnt9O3ZhciBkPWIua2J8fG5ldyBTZXQsZT1iLkRhfHxmdW5jdGlvbihhKXtyZXR1cm4gYy5pKGEpfSxmPVtdO08oYSxmdW5jdGlvbihhKXtpZihcImxpbmtcIj09PWEubG9jYWxOYW1lJiZcImltcG9ydFwiPT09YS5nZXRBdHRyaWJ1dGUoXCJyZWxcIikpe3ZhciBiPWEuaW1wb3J0O2IgaW5zdGFuY2VvZiBOb2RlJiZcImNvbXBsZXRlXCI9PT1iLnJlYWR5U3RhdGU/KGIuX19DRV9pc0ltcG9ydERvY3VtZW50PSEwLGIuX19DRV9oYXNSZWdpc3RyeT0hMCk6YS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGZ1bmN0aW9uKCl7dmFyIGI9XG5hLmltcG9ydDtpZighYi5fX0NFX2RvY3VtZW50TG9hZEhhbmRsZWQpe2IuX19DRV9kb2N1bWVudExvYWRIYW5kbGVkPSEwO2IuX19DRV9pc0ltcG9ydERvY3VtZW50PSEwO2IuX19DRV9oYXNSZWdpc3RyeT0hMDt2YXIgZj1uZXcgU2V0KGQpO2YuZGVsZXRlKGIpO2MuZihiLHtrYjpmLERhOmV9KX19KX1lbHNlIGYucHVzaChhKX0sZCk7aWYodGhpcy5oKWZvcihhPTA7YTxmLmxlbmd0aDthKyspdGhpcy5nKGZbYV0pO2ZvcihhPTA7YTxmLmxlbmd0aDthKyspZShmW2FdKX07Qi5wcm90b3R5cGUuaT1mdW5jdGlvbihhKXtpZih2b2lkIDA9PT1hLl9fQ0Vfc3RhdGUpe3ZhciBiPXRoaXMuYyhhLmxvY2FsTmFtZSk7aWYoYil7Yi5jb25zdHJ1Y3Rpb25TdGFjay5wdXNoKGEpO3ZhciBjPWIuY29uc3RydWN0b3I7dHJ5e3RyeXtpZihuZXcgYyE9PWEpdGhyb3cgRXJyb3IoXCJUaGUgY3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3IgZGlkIG5vdCBwcm9kdWNlIHRoZSBlbGVtZW50IGJlaW5nIHVwZ3JhZGVkLlwiKTtcbn1maW5hbGx5e2IuY29uc3RydWN0aW9uU3RhY2sucG9wKCl9fWNhdGNoKGYpe3Rocm93IGEuX19DRV9zdGF0ZT0yLGY7fWEuX19DRV9zdGF0ZT0xO2EuX19DRV9kZWZpbml0aW9uPWI7aWYoYi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2spZm9yKGI9Yi5vYnNlcnZlZEF0dHJpYnV0ZXMsYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZD1iW2NdLGU9YS5nZXRBdHRyaWJ1dGUoZCk7bnVsbCE9PWUmJnRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGEsZCxudWxsLGUsbnVsbCl9dChhKSYmdGhpcy5jb25uZWN0ZWRDYWxsYmFjayhhKX19fTtCLnByb3RvdHlwZS5jb25uZWN0ZWRDYWxsYmFjaz1mdW5jdGlvbihhKXt2YXIgYj1hLl9fQ0VfZGVmaW5pdGlvbjtiLmNvbm5lY3RlZENhbGxiYWNrJiZiLmNvbm5lY3RlZENhbGxiYWNrLmNhbGwoYSl9O0IucHJvdG90eXBlLmRpc2Nvbm5lY3RlZENhbGxiYWNrPWZ1bmN0aW9uKGEpe3ZhciBiPWEuX19DRV9kZWZpbml0aW9uO2IuZGlzY29ubmVjdGVkQ2FsbGJhY2smJlxuYi5kaXNjb25uZWN0ZWRDYWxsYmFjay5jYWxsKGEpfTtCLnByb3RvdHlwZS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2s9ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1hLl9fQ0VfZGVmaW5pdGlvbjtmLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayYmLTE8Zi5vYnNlcnZlZEF0dHJpYnV0ZXMuaW5kZXhPZihiKSYmZi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suY2FsbChhLGIsYyxkLGUpfTtKYS5wcm90b3R5cGUuYz1mdW5jdGlvbigpe3RoaXMuTSYmdGhpcy5NLmRpc2Nvbm5lY3QoKX07SmEucHJvdG90eXBlLmY9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5hLnJlYWR5U3RhdGU7XCJpbnRlcmFjdGl2ZVwiIT09YiYmXCJjb21wbGV0ZVwiIT09Ynx8dGhpcy5jKCk7Zm9yKGI9MDtiPGEubGVuZ3RoO2IrKylmb3IodmFyIGM9YVtiXS5hZGRlZE5vZGVzLGQ9MDtkPGMubGVuZ3RoO2QrKyl0aGlzLmIuZihjW2RdKX07R2IucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXtpZih0aGlzLmEpdGhyb3cgRXJyb3IoXCJBbHJlYWR5IHJlc29sdmVkLlwiKTtcbnRoaXMuYT12b2lkIDA7dGhpcy5iJiZ0aGlzLmIodm9pZCAwKX07eS5wcm90b3R5cGUuZGVmaW5lPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcztpZighKGIgaW5zdGFuY2VvZiBGdW5jdGlvbikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkN1c3RvbSBlbGVtZW50IGNvbnN0cnVjdG9ycyBtdXN0IGJlIGZ1bmN0aW9ucy5cIik7aWYoIUNjKGEpKXRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSBlbGVtZW50IG5hbWUgJ1wiK2ErXCInIGlzIG5vdCB2YWxpZC5cIik7aWYodGhpcy5hLmMoYSkpdGhyb3cgRXJyb3IoXCJBIGN1c3RvbSBlbGVtZW50IHdpdGggbmFtZSAnXCIrYStcIicgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLlwiKTtpZih0aGlzLmMpdGhyb3cgRXJyb3IoXCJBIGN1c3RvbSBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgZGVmaW5lZC5cIik7dGhpcy5jPSEwO3RyeXt2YXIgZD1mdW5jdGlvbihhKXt2YXIgYj1lW2FdO2lmKHZvaWQgMCE9PWImJiEoYiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSl0aHJvdyBFcnJvcihcIlRoZSAnXCIrXG5hK1wiJyBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpO3JldHVybiBifSxlPWIucHJvdG90eXBlO2lmKCEoZSBpbnN0YW5jZW9mIE9iamVjdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBjdXN0b20gZWxlbWVudCBjb25zdHJ1Y3RvcidzIHByb3RvdHlwZSBpcyBub3QgYW4gb2JqZWN0LlwiKTt2YXIgZj1kKFwiY29ubmVjdGVkQ2FsbGJhY2tcIik7dmFyIGc9ZChcImRpc2Nvbm5lY3RlZENhbGxiYWNrXCIpO3ZhciBoPWQoXCJhZG9wdGVkQ2FsbGJhY2tcIik7dmFyIGw9ZChcImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja1wiKTt2YXIgbj1iLm9ic2VydmVkQXR0cmlidXRlc3x8W119Y2F0Y2gobSl7cmV0dXJufWZpbmFsbHl7dGhpcy5jPSExfWI9e2xvY2FsTmFtZTphLGNvbnN0cnVjdG9yOmIsY29ubmVjdGVkQ2FsbGJhY2s6ZixkaXNjb25uZWN0ZWRDYWxsYmFjazpnLGFkb3B0ZWRDYWxsYmFjazpoLGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjazpsLG9ic2VydmVkQXR0cmlidXRlczpuLGNvbnN0cnVjdGlvblN0YWNrOltdfTtcbnRoaXMuYS5CKGEsYik7dGhpcy5nLnB1c2goYik7dGhpcy5ifHwodGhpcy5iPSEwLHRoaXMuZihmdW5jdGlvbigpe3JldHVybiBjLmooKX0pKX07eS5wcm90b3R5cGUuaj1mdW5jdGlvbigpe3ZhciBhPXRoaXM7aWYoITEhPT10aGlzLmIpe3RoaXMuYj0hMTtmb3IodmFyIGI9dGhpcy5nLGM9W10sZD1uZXcgTWFwLGU9MDtlPGIubGVuZ3RoO2UrKylkLnNldChiW2VdLmxvY2FsTmFtZSxbXSk7dGhpcy5hLmYoZG9jdW1lbnQse0RhOmZ1bmN0aW9uKGIpe2lmKHZvaWQgMD09PWIuX19DRV9zdGF0ZSl7dmFyIGU9Yi5sb2NhbE5hbWUsZj1kLmdldChlKTtmP2YucHVzaChiKTphLmEuYyhlKSYmYy5wdXNoKGIpfX19KTtmb3IoZT0wO2U8Yy5sZW5ndGg7ZSsrKXRoaXMuYS5pKGNbZV0pO2Zvcig7MDxiLmxlbmd0aDspe3ZhciBmPWIuc2hpZnQoKTtlPWYubG9jYWxOYW1lO2Y9ZC5nZXQoZi5sb2NhbE5hbWUpO2Zvcih2YXIgZz0wO2c8Zi5sZW5ndGg7ZysrKXRoaXMuYS5pKGZbZ10pOyhlPXRoaXMuaC5nZXQoZSkpJiZcbmUuYygpfX19O3kucHJvdG90eXBlLmdldD1mdW5jdGlvbihhKXtpZihhPXRoaXMuYS5jKGEpKXJldHVybiBhLmNvbnN0cnVjdG9yfTt5LnByb3RvdHlwZS53aGVuRGVmaW5lZD1mdW5jdGlvbihhKXtpZighQ2MoYSkpcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTeW50YXhFcnJvcihcIidcIithK1wiJyBpcyBub3QgYSB2YWxpZCBjdXN0b20gZWxlbWVudCBuYW1lLlwiKSk7dmFyIGI9dGhpcy5oLmdldChhKTtpZihiKXJldHVybiBiLmY7Yj1uZXcgR2I7dGhpcy5oLnNldChhLGIpO3RoaXMuYS5jKGEpJiYhdGhpcy5nLnNvbWUoZnVuY3Rpb24oYil7cmV0dXJuIGIubG9jYWxOYW1lPT09YX0pJiZiLmMoKTtyZXR1cm4gYi5mfTt5LnByb3RvdHlwZS5sPWZ1bmN0aW9uKGEpe3RoaXMuaS5jKCk7dmFyIGI9dGhpcy5mO3RoaXMuZj1mdW5jdGlvbihjKXtyZXR1cm4gYShmdW5jdGlvbigpe3JldHVybiBiKGMpfSl9fTt3aW5kb3cuQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5PXk7eS5wcm90b3R5cGUuZGVmaW5lPVxueS5wcm90b3R5cGUuZGVmaW5lO3kucHJvdG90eXBlLmdldD15LnByb3RvdHlwZS5nZXQ7eS5wcm90b3R5cGUud2hlbkRlZmluZWQ9eS5wcm90b3R5cGUud2hlbkRlZmluZWQ7eS5wcm90b3R5cGUucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjaz15LnByb3RvdHlwZS5sO3ZhciBFYT13aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQsdGQ9d2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50TlMsc2Q9d2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5pbXBvcnROb2RlLHVkPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUucHJlcGVuZCx2ZD13aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLmFwcGVuZCxjZT13aW5kb3cuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUucHJlcGVuZCxkZT13aW5kb3cuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuYXBwZW5kLHdiPXdpbmRvdy5Ob2RlLnByb3RvdHlwZS5jbG9uZU5vZGUsaWE9d2luZG93Lk5vZGUucHJvdG90eXBlLmFwcGVuZENoaWxkLFxuRGI9d2luZG93Lk5vZGUucHJvdG90eXBlLmluc2VydEJlZm9yZSxGYT13aW5kb3cuTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQsRWI9d2luZG93Lk5vZGUucHJvdG90eXBlLnJlcGxhY2VDaGlsZCxJYT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5Ob2RlLnByb3RvdHlwZSxcInRleHRDb250ZW50XCIpLHZiPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5hdHRhY2hTaGFkb3csQ2E9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUsXCJpbm5lckhUTUxcIiksR2E9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZSx4Yj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlLHpiPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGUsamE9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZU5TLHliPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVOUyxcbkFiPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGVOUyxDYj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50LGpkPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5wcmVwZW5kLGtkPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5hcHBlbmQsbWQ9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmJlZm9yZSxuZD13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuYWZ0ZXIsb2Q9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnJlcGxhY2VXaXRoLHBkPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmUseGQ9d2luZG93LkhUTUxFbGVtZW50LERhPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZSxcImlubmVySFRNTFwiKSxCYj13aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLmluc2VydEFkamFjZW50RWxlbWVudCxGYj1uZXcgZnVuY3Rpb24oKXt9LHRhPXdpbmRvdy5jdXN0b21FbGVtZW50cztcbmlmKCF0YXx8dGEuZm9yY2VQb2x5ZmlsbHx8XCJmdW5jdGlvblwiIT10eXBlb2YgdGEuZGVmaW5lfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiB0YS5nZXQpe3ZhciBZPW5ldyBCO3dkKFkpO3JkKFkpO0hhKFksRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUse1o6Y2UsYXBwZW5kOmRlfSk7cWQoWSk7aWQoWSk7ZG9jdW1lbnQuX19DRV9oYXNSZWdpc3RyeT0hMDt2YXIgZWU9bmV3IHkoWSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdyxcImN1c3RvbUVsZW1lbnRzXCIse2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwLHZhbHVlOmVlfSl9dmFyIEk9e1NUWUxFX1JVTEU6MSxkYTo3LE1FRElBX1JVTEU6NCxuYToxRTN9LEY9e1lhOi9cXC9cXCpbXipdKlxcKisoW14vKl1bXipdKlxcKispKlxcLy9naW0scG9ydDovQGltcG9ydFteO10qOy9naW0sd2E6Lyg/Ol5bXjtcXC1cXHN9XSspPy0tW147e31dKj86W157fTtdKj8oPzpbO1xcbl18JCkvZ2ltLEFhOi8oPzpeW147XFwtXFxzfV0rKT8tLVteO3t9XSo/Oltee307XSo/e1tefV0qP30oPzpbO1xcbl18JCk/L2dpbSxcbmViOi9AYXBwbHlcXHMqXFwoP1teKTtdKlxcKT9cXHMqKD86WztcXG5dfCQpPy9naW0samI6L1teOzpdKj86W147XSo/dmFyXFwoW147XSpcXCkoPzpbO1xcbl18JCk/L2dpbSxjYjovXkBbXlxcc10qa2V5ZnJhbWVzLyxCYTovXFxzKy9nfSx6PSEod2luZG93LlNoYWR5RE9NJiZ3aW5kb3cuU2hhZHlET00uaW5Vc2UpO2lmKHdpbmRvdy5TaGFkeUNTUyYmdm9pZCAwIT09d2luZG93LlNoYWR5Q1NTLm5hdGl2ZUNzcyl2YXIgQT13aW5kb3cuU2hhZHlDU1MubmF0aXZlQ3NzO2Vsc2Ugd2luZG93LlNoYWR5Q1NTPyhGYyh3aW5kb3cuU2hhZHlDU1MpLHdpbmRvdy5TaGFkeUNTUz12b2lkIDApOkZjKHdpbmRvdy5XZWJDb21wb25lbnRzJiZ3aW5kb3cuV2ViQ29tcG9uZW50cy5mbGFncyk7dmFyIHVhPS8oPzpefFs7XFxze11cXHMqKSgtLVtcXHctXSo/KVxccyo6XFxzKig/OigoPzonKD86XFxcXCd8LikqPyd8XCIoPzpcXFxcXCJ8LikqP1wifFxcKFteKV0qP1xcKXxbXn07e10pKyl8XFx7KFtefV0qKVxcfSg/Oig/PVs7XFxzfV0pfCQpKS9naSxcbnZhPS8oPzpefFxcVyspQGFwcGx5XFxzKlxcKD8oW14pO1xcbl0qKVxcKT8vZ2ksZmU9LygtLVtcXHctXSspXFxzKihbOiw7KV18JCkvZ2ksZ2U9LyhhbmltYXRpb25cXHMqOil8KGFuaW1hdGlvbi1uYW1lXFxzKjopLyxSZD0vQG1lZGlhXFxzKC4qKS8saGU9L1xce1tefV0qXFx9L2csUT1udWxsO3UucHJvdG90eXBlLmI9ZnVuY3Rpb24oYSxiLGMpe2EuX19zdHlsZVNjb3BlZD9hLl9fc3R5bGVTY29wZWQ9bnVsbDp0aGlzLmooYSxifHxcIlwiLGMpfTt1LnByb3RvdHlwZS5qPWZ1bmN0aW9uKGEsYixjKXthLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREUmJnRoaXMuaChhLGIsYyk7aWYoYT1cInRlbXBsYXRlXCI9PT1hLmxvY2FsTmFtZT8oYS5jb250ZW50fHxhLm9iKS5jaGlsZE5vZGVzOmEuY2hpbGRyZW58fGEuY2hpbGROb2Rlcylmb3IodmFyIGQ9MDtkPGEubGVuZ3RoO2QrKyl0aGlzLmooYVtkXSxiLGMpfTt1LnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEsYixjKXtpZihiKWlmKGEuY2xhc3NMaXN0KWM/KGEuY2xhc3NMaXN0LnJlbW92ZShcInN0eWxlLXNjb3BlXCIpLFxuYS5jbGFzc0xpc3QucmVtb3ZlKGIpKTooYS5jbGFzc0xpc3QuYWRkKFwic3R5bGUtc2NvcGVcIiksYS5jbGFzc0xpc3QuYWRkKGIpKTtlbHNlIGlmKGEuZ2V0QXR0cmlidXRlKXt2YXIgZD1hLmdldEF0dHJpYnV0ZShpZSk7Yz9kJiYoYj1kLnJlcGxhY2UoXCJzdHlsZS1zY29wZVwiLFwiXCIpLnJlcGxhY2UoYixcIlwiKSxxYShhLGIpKTpxYShhLChkP2QrXCIgXCI6XCJcIikrXCJzdHlsZS1zY29wZSBcIitiKX19O3UucHJvdG90eXBlLmM9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWEuX19jc3NCdWlsZDt6fHxcInNoYWR5XCI9PT1kP2I9VihiLGMpOihhPVIoYSksYj10aGlzLkcoYixhLmlzLGEuVixjKStcIlxcblxcblwiKTtyZXR1cm4gYi50cmltKCl9O3UucHJvdG90eXBlLkc9ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9dGhpcy5mKGIsYyk7Yj10aGlzLmkoYik7dmFyIGY9dGhpcztyZXR1cm4gVihhLGZ1bmN0aW9uKGEpe2EuY3x8KGYuSShhLGIsZSksYS5jPSEwKTtkJiZkKGEsYixlKX0pfTt1LnByb3RvdHlwZS5pPWZ1bmN0aW9uKGEpe3JldHVybiBhP1xuamUrYTpcIlwifTt1LnByb3RvdHlwZS5mPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGI/XCJbaXM9XCIrYStcIl1cIjphfTt1LnByb3RvdHlwZS5JPWZ1bmN0aW9uKGEsYixjKXt0aGlzLmwoYSx0aGlzLmcsYixjKX07dS5wcm90b3R5cGUubD1mdW5jdGlvbihhLGIsYyxkKXthLnNlbGVjdG9yPWEudj10aGlzLm0oYSxiLGMsZCl9O3UucHJvdG90eXBlLm09ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9YS5zZWxlY3Rvci5zcGxpdChQYyk7aWYoIUdjKGEpKXthPTA7Zm9yKHZhciBmPWUubGVuZ3RoLGc7YTxmJiYoZz1lW2FdKTthKyspZVthXT1iLmNhbGwodGhpcyxnLGMsZCl9cmV0dXJuIGUuam9pbihQYyl9O3UucHJvdG90eXBlLnM9ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZShtYixmdW5jdGlvbihhLGMsZCl7LTE8ZC5pbmRleE9mKFwiK1wiKT9kPWQucmVwbGFjZSgvXFwrL2csXCJfX19cIik6LTE8ZC5pbmRleE9mKFwiX19fXCIpJiYoZD1kLnJlcGxhY2UoL19fXy9nLFwiK1wiKSk7cmV0dXJuXCI6XCIrYytcIihcIitcbmQrXCIpXCJ9KX07dS5wcm90b3R5cGUuZz1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcyxlPSExO2E9YS50cmltKCk7dmFyIGY9bWIudGVzdChhKTtmJiYoYT1hLnJlcGxhY2UobWIsZnVuY3Rpb24oYSxiLGMpe3JldHVyblwiOlwiK2IrXCIoXCIrYy5yZXBsYWNlKC9cXHMvZyxcIlwiKStcIilcIn0pLGE9dGhpcy5zKGEpKTthPWEucmVwbGFjZShrZSxuYitcIiAkMVwiKTthPWEucmVwbGFjZShsZSxmdW5jdGlvbihhLGYsZyl7ZXx8KGE9ZC5CKGcsZixiLGMpLGU9ZXx8YS5zdG9wLGY9YS5YYSxnPWEudmFsdWUpO3JldHVybiBmK2d9KTtmJiYoYT10aGlzLnMoYSkpO3JldHVybiBhfTt1LnByb3RvdHlwZS5CPWZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPWEuaW5kZXhPZihvYik7MDw9YS5pbmRleE9mKG5iKT9hPXRoaXMuRihhLGQpOjAhPT1lJiYoYT1jP3RoaXMubyhhLGMpOmEpO2M9ITE7MDw9ZSYmKGI9XCJcIixjPSEwKTtpZihjKXt2YXIgZj0hMDtjJiYoYT1hLnJlcGxhY2UobWUsZnVuY3Rpb24oYSxiKXtyZXR1cm5cIiA+IFwiK1xuYn0pKX1hPWEucmVwbGFjZShuZSxmdW5jdGlvbihhLGIsYyl7cmV0dXJuJ1tkaXI9XCInK2MrJ1wiXSAnK2IrXCIsIFwiK2IrJ1tkaXI9XCInK2MrJ1wiXSd9KTtyZXR1cm57dmFsdWU6YSxYYTpiLHN0b3A6Zn19O3UucHJvdG90eXBlLm89ZnVuY3Rpb24oYSxiKXthPWEuc3BsaXQoUWMpO2FbMF0rPWI7cmV0dXJuIGEuam9pbihRYyl9O3UucHJvdG90eXBlLkY9ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLm1hdGNoKFJjKTtyZXR1cm4oYz1jJiZjWzJdLnRyaW0oKXx8XCJcIik/Y1swXS5tYXRjaChTYyk/YS5yZXBsYWNlKFJjLGZ1bmN0aW9uKGEsYyxmKXtyZXR1cm4gYitmfSk6Yy5zcGxpdChTYylbMF09PT1iP2M6b2U6YS5yZXBsYWNlKG5iLGIpfTt1LnByb3RvdHlwZS5IPWZ1bmN0aW9uKGEpe2Euc2VsZWN0b3I9YS5wYXJzZWRTZWxlY3Rvcjt0aGlzLncoYSk7dGhpcy5sKGEsdGhpcy5LKX07dS5wcm90b3R5cGUudz1mdW5jdGlvbihhKXthLnNlbGVjdG9yPT09cGUmJihhLnNlbGVjdG9yPVwiaHRtbFwiKX07XG51LnByb3RvdHlwZS5LPWZ1bmN0aW9uKGEpe3JldHVybiBhLm1hdGNoKG9iKT90aGlzLmcoYSxUYyk6dGhpcy5vKGEudHJpbSgpLFRjKX07Si5PYmplY3QuZGVmaW5lUHJvcGVydGllcyh1LnByb3RvdHlwZSx7YTp7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuXCJzdHlsZS1zY29wZVwifX19KTt2YXIgbWI9LzoobnRoWy1cXHddKylcXCgoW14pXSspXFwpLyxUYz1cIjpub3QoLnN0eWxlLXNjb3BlKVwiLFBjPVwiLFwiLGxlPS8oXnxbXFxzPit+XSspKCg/OlxcWy4rP1xcXXxbXlxccz4rfj1bXSkrKS9nLFNjPS9bWy46IypdLyxuYj1cIjpob3N0XCIscGU9XCI6cm9vdFwiLG9iPVwiOjpzbG90dGVkXCIsa2U9bmV3IFJlZ0V4cChcIl4oXCIrb2IrXCIpXCIpLFJjPS8oOmhvc3QpKD86XFwoKCg/OlxcKFteKShdKlxcKXxbXikoXSopKz8pXFwpKS8sbWU9Lyg/Ojo6c2xvdHRlZCkoPzpcXCgoKD86XFwoW14pKF0qXFwpfFteKShdKikrPylcXCkpLyxuZT0vKC4qKTpkaXJcXCgoPzoobHRyfHJ0bCkpXFwpLyxcbmplPVwiLlwiLFFjPVwiOlwiLGllPVwiY2xhc3NcIixvZT1cInNob3VsZF9ub3RfbWF0Y2hcIixwPW5ldyB1O3YuZ2V0PWZ1bmN0aW9uKGEpe3JldHVybiBhP2EuX19zdHlsZUluZm86bnVsbH07di5zZXQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS5fX3N0eWxlSW5mbz1ifTt2LnByb3RvdHlwZS5jPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuRH07di5wcm90b3R5cGUuX2dldFN0eWxlUnVsZXM9di5wcm90b3R5cGUuYzt2YXIgVWM9ZnVuY3Rpb24oYSl7cmV0dXJuIGEubWF0Y2hlc3x8YS5tYXRjaGVzU2VsZWN0b3J8fGEubW96TWF0Y2hlc1NlbGVjdG9yfHxhLm1zTWF0Y2hlc1NlbGVjdG9yfHxhLm9NYXRjaGVzU2VsZWN0b3J8fGEud2Via2l0TWF0Y2hlc1NlbGVjdG9yfSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUpLHFlPW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goXCJUcmlkZW50XCIpO24ucHJvdG90eXBlLkg9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcyxjPXt9LGQ9W10sZT0wO1coYSxmdW5jdGlvbihhKXtiLmMoYSk7XG5hLmluZGV4PWUrKztiLkcoYS51LmNzc1RleHQsYyl9LGZ1bmN0aW9uKGEpe2QucHVzaChhKX0pO2EuYj1kO2E9W107Zm9yKHZhciBmIGluIGMpYS5wdXNoKGYpO3JldHVybiBhfTtuLnByb3RvdHlwZS5jPWZ1bmN0aW9uKGEpe2lmKCFhLnUpe3ZhciBiPXt9LGM9e307dGhpcy5iKGEsYykmJihiLkM9YyxhLnJ1bGVzPW51bGwpO2IuY3NzVGV4dD10aGlzLkYoYSk7YS51PWJ9fTtuLnByb3RvdHlwZS5iPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS51O2lmKGMpe2lmKGMuQylyZXR1cm4gT2JqZWN0LmFzc2lnbihiLGMuQyksITB9ZWxzZXtjPWEucGFyc2VkQ3NzVGV4dDtmb3IodmFyIGQ7YT11YS5leGVjKGMpOyl7ZD0oYVsyXXx8YVszXSkudHJpbSgpO2lmKFwiaW5oZXJpdFwiIT09ZHx8XCJ1bnNldFwiIT09ZCliW2FbMV0udHJpbSgpXT1kO2Q9ITB9cmV0dXJuIGR9fTtuLnByb3RvdHlwZS5GPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLksoYS5wYXJzZWRDc3NUZXh0KX07bi5wcm90b3R5cGUuSz1mdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKGhlLFxuXCJcIikucmVwbGFjZSh1YSxcIlwiKX07bi5wcm90b3R5cGUuRz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYztjPWZlLmV4ZWMoYSk7KXt2YXIgZD1jWzFdO1wiOlwiIT09Y1syXSYmKGJbZF09ITApfX07bi5wcm90b3R5cGUuYWE9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGEpLGM9MCxkO2M8Yi5sZW5ndGg7YysrKWQ9YltjXSxhW2RdPXRoaXMuYShhW2RdLGEpfTtuLnByb3RvdHlwZS5hPWZ1bmN0aW9uKGEsYil7aWYoYSlpZigwPD1hLmluZGV4T2YoXCI7XCIpKWE9dGhpcy5mKGEsYik7ZWxzZXt2YXIgYz10aGlzO2E9SWMoYSxmdW5jdGlvbihhLGUsZixnKXtpZighZSlyZXR1cm4gYStnOyhlPWMuYShiW2VdLGIpKSYmXCJpbml0aWFsXCIhPT1lP1wiYXBwbHktc2hpbS1pbmhlcml0XCI9PT1lJiYoZT1cImluaGVyaXRcIik6ZT1jLmEoYltmXXx8ZixiKXx8ZjtyZXR1cm4gYSsoZXx8XCJcIikrZ30pfXJldHVybiBhJiZhLnRyaW0oKXx8XCJcIn07bi5wcm90b3R5cGUuZj1mdW5jdGlvbihhLFxuYil7YT1hLnNwbGl0KFwiO1wiKTtmb3IodmFyIGM9MCxkLGU7YzxhLmxlbmd0aDtjKyspaWYoZD1hW2NdKXt2YS5sYXN0SW5kZXg9MDtpZihlPXZhLmV4ZWMoZCkpZD10aGlzLmEoYltlWzFdXSxiKTtlbHNlIGlmKGU9ZC5pbmRleE9mKFwiOlwiKSwtMSE9PWUpe3ZhciBmPWQuc3Vic3RyaW5nKGUpO2Y9Zi50cmltKCk7Zj10aGlzLmEoZixiKXx8ZjtkPWQuc3Vic3RyaW5nKDAsZSkrZn1hW2NdPWQmJmQubGFzdEluZGV4T2YoXCI7XCIpPT09ZC5sZW5ndGgtMT9kLnNsaWNlKDAsLTEpOmR8fFwiXCJ9cmV0dXJuIGEuam9pbihcIjtcIil9O24ucHJvdG90eXBlLkI9ZnVuY3Rpb24oYSxiKXt2YXIgYz1cIlwiO2EudXx8dGhpcy5jKGEpO2EudS5jc3NUZXh0JiYoYz10aGlzLmYoYS51LmNzc1RleHQsYikpO2EuY3NzVGV4dD1jfTtuLnByb3RvdHlwZS53PWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5jc3NUZXh0LGQ9YS5jc3NUZXh0O251bGw9PWEueWEmJihhLnlhPWdlLnRlc3QoYykpO2lmKGEueWEpaWYobnVsbD09XG5hLlkpe2EuWT1bXTtmb3IodmFyIGUgaW4gYilkPWJbZV0sZD1kKGMpLGMhPT1kJiYoYz1kLGEuWS5wdXNoKGUpKX1lbHNle2ZvcihlPTA7ZTxhLlkubGVuZ3RoOysrZSlkPWJbYS5ZW2VdXSxjPWQoYyk7ZD1jfWEuY3NzVGV4dD1kfTtuLnByb3RvdHlwZS5PPWZ1bmN0aW9uKGEsYil7dmFyIGM9e30sZD10aGlzLGU9W107VyhhLGZ1bmN0aW9uKGEpe2EudXx8ZC5jKGEpO3ZhciBmPWEudnx8YS5wYXJzZWRTZWxlY3RvcjtiJiZhLnUuQyYmZiYmVWMuY2FsbChiLGYpJiYoZC5iKGEsYyksYT1hLmluZGV4LGY9cGFyc2VJbnQoYS8zMiwxMCksZVtmXT0oZVtmXXx8MCl8MTw8YSUzMil9LG51bGwsITApO3JldHVybntDOmMsa2V5OmV9fTtuLnByb3RvdHlwZS5jYT1mdW5jdGlvbihhLGIsYyxkKXtiLnV8fHRoaXMuYyhiKTtpZihiLnUuQyl7dmFyIGU9UihhKTthPWUuaXM7ZT1lLlY7ZT1hP3AuZihhLGUpOlwiaHRtbFwiO3ZhciBmPWIucGFyc2VkU2VsZWN0b3IsZz1cIjpob3N0ID4gKlwiPT09Znx8XG5cImh0bWxcIj09PWYsaD0wPT09Zi5pbmRleE9mKFwiOmhvc3RcIikmJiFnO1wic2hhZHlcIj09PWMmJihnPWY9PT1lK1wiID4gKi5cIitlfHwtMSE9PWYuaW5kZXhPZihcImh0bWxcIiksaD0hZyYmMD09PWYuaW5kZXhPZihlKSk7XCJzaGFkb3dcIj09PWMmJihnPVwiOmhvc3QgPiAqXCI9PT1mfHxcImh0bWxcIj09PWYsaD1oJiYhZyk7aWYoZ3x8aCljPWUsaCYmKHomJiFiLnYmJihiLnY9cC5tKGIscC5nLHAuaShhKSxlKSksYz1iLnZ8fGUpLGQoe2liOmMsYmI6aCxxYjpnfSl9fTtuLnByb3RvdHlwZS5JPWZ1bmN0aW9uKGEsYil7dmFyIGM9e30sZD17fSxlPXRoaXMsZj1iJiZiLl9fY3NzQnVpbGQ7VyhiLGZ1bmN0aW9uKGIpe2UuY2EoYSxiLGYsZnVuY3Rpb24oZil7VWMuY2FsbChhLnBifHxhLGYuaWIpJiYoZi5iYj9lLmIoYixjKTplLmIoYixkKSl9KX0sbnVsbCwhMCk7cmV0dXJue2diOmQsYWI6Y319O24ucHJvdG90eXBlLmJhPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLGU9UihhKSxmPXAuZihlLmlzLFxuZS5WKSxnPW5ldyBSZWdFeHAoXCIoPzpefFteLiNbOl0pXCIrKGEuZXh0ZW5kcz9cIlxcXFxcIitmLnNsaWNlKDAsLTEpK1wiXFxcXF1cIjpmKStcIigkfFsuOltcXFxccz4rfl0pXCIpO2U9di5nZXQoYSkuRDt2YXIgaD10aGlzLmgoZSxjKTtyZXR1cm4gcC5jKGEsZSxmdW5jdGlvbihhKXtkLkIoYSxiKTt6fHxHYyhhKXx8IWEuY3NzVGV4dHx8KGQudyhhLGgpLGQubChhLGcsZixjKSl9KX07bi5wcm90b3R5cGUuaD1mdW5jdGlvbihhLGIpe2E9YS5iO3ZhciBjPXt9O2lmKCF6JiZhKWZvcih2YXIgZD0wLGU9YVtkXTtkPGEubGVuZ3RoO2U9YVsrK2RdKXRoaXMuaihlLGIpLGNbZS5rZXlmcmFtZXNOYW1lXT10aGlzLmkoZSk7cmV0dXJuIGN9O24ucHJvdG90eXBlLmk9ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVybiBiLnJlcGxhY2UoYS5mLGEuYSl9fTtuLnByb3RvdHlwZS5qPWZ1bmN0aW9uKGEsYil7YS5mPW5ldyBSZWdFeHAoYS5rZXlmcmFtZXNOYW1lLFwiZ1wiKTthLmE9YS5rZXlmcmFtZXNOYW1lK1xuXCItXCIrYjthLnY9YS52fHxhLnNlbGVjdG9yO2Euc2VsZWN0b3I9YS52LnJlcGxhY2UoYS5rZXlmcmFtZXNOYW1lLGEuYSl9O24ucHJvdG90eXBlLmw9ZnVuY3Rpb24oYSxiLGMsZCl7YS52PWEudnx8YS5zZWxlY3RvcjtkPVwiLlwiK2Q7Zm9yKHZhciBlPWEudi5zcGxpdChcIixcIiksZj0wLGc9ZS5sZW5ndGgsaDtmPGcmJihoPWVbZl0pO2YrKyllW2ZdPWgubWF0Y2goYik/aC5yZXBsYWNlKGMsZCk6ZCtcIiBcIitoO2Euc2VsZWN0b3I9ZS5qb2luKFwiLFwiKX07bi5wcm90b3R5cGUubz1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9YS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKXx8XCJcIixlPWQ7YyYmKGU9ZC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxccyp4LXNjb3BlXFxcXHMqXCIrYytcIlxcXFxzKlwiLFwiZ1wiKSxcIiBcIikpO2UrPShlP1wiIFwiOlwiXCIpK1wieC1zY29wZSBcIitiO2QhPT1lJiZxYShhLGUpfTtuLnByb3RvdHlwZS5zPWZ1bmN0aW9uKGEsYixjLGQpe2I9ZD9kLnRleHRDb250ZW50fHxcIlwiOnRoaXMuYmEoYSxiLGMpO3ZhciBlPVxudi5nZXQoYSksZj1lLmE7ZiYmIXomJmYhPT1kJiYoZi5fdXNlQ291bnQtLSwwPj1mLl91c2VDb3VudCYmZi5wYXJlbnROb2RlJiZmLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZikpO3o/ZS5hPyhlLmEudGV4dENvbnRlbnQ9YixkPWUuYSk6YiYmKGQ9ZWIoYixjLGEuc2hhZG93Um9vdCxlLmIpKTpkP2QucGFyZW50Tm9kZXx8KHFlJiYtMTxiLmluZGV4T2YoXCJAbWVkaWFcIikmJihkLnRleHRDb250ZW50PWIpLEhjKGQsbnVsbCxlLmIpKTpiJiYoZD1lYihiLGMsbnVsbCxlLmIpKTtkJiYoZC5fdXNlQ291bnQ9ZC5fdXNlQ291bnR8fDAsZS5hIT1kJiZkLl91c2VDb3VudCsrLGUuYT1kKTtyZXR1cm4gZH07bi5wcm90b3R5cGUubT1mdW5jdGlvbihhLGIpe3ZhciBjPXBhKGEpLGQ9dGhpczthLnRleHRDb250ZW50PVYoYyxmdW5jdGlvbihhKXt2YXIgYz1hLmNzc1RleHQ9YS5wYXJzZWRDc3NUZXh0O2EudSYmYS51LmNzc1RleHQmJihjPWMucmVwbGFjZShGLndhLFwiXCIpLnJlcGxhY2UoRi5BYSxcblwiXCIpLGEuY3NzVGV4dD1kLmYoYyxiKSl9KX07Si5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhuLnByb3RvdHlwZSx7Zzp7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuXCJ4LXNjb3BlXCJ9fX0pO3ZhciBNPW5ldyBuLHBiPXt9LHdhPXdpbmRvdy5jdXN0b21FbGVtZW50cztpZih3YSYmIXope3ZhciByZT13YS5kZWZpbmU7d2EuZGVmaW5lPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1kb2N1bWVudC5jcmVhdGVDb21tZW50KFwiIFNoYWR5IERPTSBzdHlsZXMgZm9yIFwiK2ErXCIgXCIpLGU9ZG9jdW1lbnQuaGVhZDtlLmluc2VydEJlZm9yZShkLChRP1EubmV4dFNpYmxpbmc6bnVsbCl8fGUuZmlyc3RDaGlsZCk7UT1kO3BiW2FdPWQ7cmV0dXJuIHJlLmNhbGwod2EsYSxiLGMpfX1oYS5wcm90b3R5cGUuYT1mdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPTA7ZDxjLmxlbmd0aDtkKyspe3ZhciBlPWNbZF07aWYoYS5DW2VdIT09YltlXSlyZXR1cm4hMX1yZXR1cm4hMH07XG5oYS5wcm90b3R5cGUuYj1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZT10aGlzLmNhY2hlW2FdfHxbXTtlLnB1c2goe0M6YixzdHlsZUVsZW1lbnQ6YyxBOmR9KTtlLmxlbmd0aD50aGlzLmMmJmUuc2hpZnQoKTt0aGlzLmNhY2hlW2FdPWV9O2hhLnByb3RvdHlwZS5mZXRjaD1mdW5jdGlvbihhLGIsYyl7aWYoYT10aGlzLmNhY2hlW2FdKWZvcih2YXIgZD1hLmxlbmd0aC0xOzA8PWQ7ZC0tKXt2YXIgZT1hW2RdO2lmKHRoaXMuYShlLGIsYykpcmV0dXJuIGV9fTtpZigheil7dmFyIFZjPW5ldyBNdXRhdGlvbk9ic2VydmVyKEpjKSxXYz1mdW5jdGlvbihhKXtWYy5vYnNlcnZlKGEse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSl9O2lmKHdpbmRvdy5jdXN0b21FbGVtZW50cyYmIXdpbmRvdy5jdXN0b21FbGVtZW50cy5wb2x5ZmlsbFdyYXBGbHVzaENhbGxiYWNrKVdjKGRvY3VtZW50KTtlbHNle3ZhciBxYj1mdW5jdGlvbigpe1djKGRvY3VtZW50LmJvZHkpfTt3aW5kb3cuSFRNTEltcG9ydHM/XG53aW5kb3cuSFRNTEltcG9ydHMud2hlblJlYWR5KHFiKTpyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtpZihcImxvYWRpbmdcIj09PWRvY3VtZW50LnJlYWR5U3RhdGUpe3ZhciBhPWZ1bmN0aW9uKCl7cWIoKTtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGEpfTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGEpfWVsc2UgcWIoKX0pfU49ZnVuY3Rpb24oKXtKYyhWYy50YWtlUmVjb3JkcygpKX19dmFyIHJhPXt9LFVkPVByb21pc2UucmVzb2x2ZSgpLGZiPW51bGwsTGM9d2luZG93LkhUTUxJbXBvcnRzJiZ3aW5kb3cuSFRNTEltcG9ydHMud2hlblJlYWR5fHxudWxsLGdiLHhhPW51bGwsZmE9bnVsbDtxLnByb3RvdHlwZS54YT1mdW5jdGlvbigpeyF0aGlzLmVucXVldWVkJiZmYSYmKHRoaXMuZW5xdWV1ZWQ9ITAsdWIoZmEpKX07cS5wcm90b3R5cGUuYj1mdW5jdGlvbihhKXthLl9fc2VlbkJ5U2hhZHlDU1N8fFxuKGEuX19zZWVuQnlTaGFkeUNTUz0hMCx0aGlzLmN1c3RvbVN0eWxlcy5wdXNoKGEpLHRoaXMueGEoKSl9O3EucHJvdG90eXBlLmE9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuX19zaGFkeUNTU0NhY2hlZFN0eWxlP2EuX19zaGFkeUNTU0NhY2hlZFN0eWxlOmEuZ2V0U3R5bGU/YS5nZXRTdHlsZSgpOmF9O3EucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5jdXN0b21TdHlsZXMsYj0wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz1hW2JdO2lmKCFjLl9fc2hhZHlDU1NDYWNoZWRTdHlsZSl7dmFyIGQ9dGhpcy5hKGMpO2QmJihkPWQuX19hcHBsaWVkRWxlbWVudHx8ZCx4YSYmeGEoZCksYy5fX3NoYWR5Q1NTQ2FjaGVkU3R5bGU9ZCl9fXJldHVybiBhfTtxLnByb3RvdHlwZS5hZGRDdXN0b21TdHlsZT1xLnByb3RvdHlwZS5iO3EucHJvdG90eXBlLmdldFN0eWxlRm9yQ3VzdG9tU3R5bGU9cS5wcm90b3R5cGUuYTtxLnByb3RvdHlwZS5wcm9jZXNzU3R5bGVzPXEucHJvdG90eXBlLmM7XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhxLnByb3RvdHlwZSx7dHJhbnNmb3JtQ2FsbGJhY2s6e2dldDpmdW5jdGlvbigpe3JldHVybiB4YX0sc2V0OmZ1bmN0aW9uKGEpe3hhPWF9fSx2YWxpZGF0ZUNhbGxiYWNrOntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZmF9LHNldDpmdW5jdGlvbihhKXt2YXIgYj0hMTtmYXx8KGI9ITApO2ZhPWE7YiYmdGhpcy54YSgpfX19KTt2YXIgWGM9bmV3IGhhO2cucHJvdG90eXBlLnc9ZnVuY3Rpb24oKXtOKCl9O2cucHJvdG90eXBlLkk9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5tW2FdPSh0aGlzLm1bYV18fDApKzE7cmV0dXJuIGErXCItXCIrYn07Zy5wcm90b3R5cGUuSGE9ZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGEpfTtnLnByb3RvdHlwZS5KYT1mdW5jdGlvbihhKXtyZXR1cm4gVihhKX07Zy5wcm90b3R5cGUuSD1mdW5jdGlvbihhKXthPWEuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3R5bGVcIik7Zm9yKHZhciBiPVtdLGM9MDtjPGEubGVuZ3RoO2MrKyl7dmFyIGQ9XG5hW2NdO2IucHVzaChkLnRleHRDb250ZW50KTtkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZCl9cmV0dXJuIGIuam9pbihcIlwiKS50cmltKCl9O2cucHJvdG90eXBlLmFhPWZ1bmN0aW9uKGEpe3JldHVybihhPWEuY29udGVudC5xdWVyeVNlbGVjdG9yKFwic3R5bGVcIikpP2EuZ2V0QXR0cmlidXRlKFwiY3NzLWJ1aWxkXCIpfHxcIlwiOlwiXCJ9O2cucHJvdG90eXBlLnByZXBhcmVUZW1wbGF0ZT1mdW5jdGlvbihhLGIsYyl7aWYoIWEuZil7YS5mPSEwO2EubmFtZT1iO2EuZXh0ZW5kcz1jO3JhW2JdPWE7dmFyIGQ9dGhpcy5hYShhKSxlPXRoaXMuSChhKTtjPXtpczpiLGV4dGVuZHM6YyxtYjpkfTt6fHxwLmIoYS5jb250ZW50LGIpO3RoaXMuYygpO3ZhciBmPXZhLnRlc3QoZSl8fHVhLnRlc3QoZSk7dmEubGFzdEluZGV4PTA7dWEubGFzdEluZGV4PTA7ZT1kYihlKTtmJiZBJiZ0aGlzLmEmJnRoaXMuYS50cmFuc2Zvcm1SdWxlcyhlLGIpO2EuX3N0eWxlQXN0PWU7YS5nPWQ7ZD1bXTtBfHwoZD1NLkgoYS5fc3R5bGVBc3QpKTtcbmlmKCFkLmxlbmd0aHx8QSliPXRoaXMuTyhjLGEuX3N0eWxlQXN0LHo/YS5jb250ZW50Om51bGwscGJbYl0pLGEuYT1iO2EuYz1kfX07Zy5wcm90b3R5cGUuTz1mdW5jdGlvbihhLGIsYyxkKXtiPXAuYyhhLGIpO2lmKGIubGVuZ3RoKXJldHVybiBlYihiLGEuaXMsYyxkKX07Zy5wcm90b3R5cGUuY2E9ZnVuY3Rpb24oYSl7dmFyIGI9UihhKSxjPWIuaXM7Yj1iLlY7dmFyIGQ9cGJbY107Yz1yYVtjXTtpZihjKXt2YXIgZT1jLl9zdHlsZUFzdDt2YXIgZj1jLmN9cmV0dXJuIHYuc2V0KGEsbmV3IHYoZSxkLGYsMCxiKSl9O2cucHJvdG90eXBlLkY9ZnVuY3Rpb24oKXshdGhpcy5hJiZ3aW5kb3cuU2hhZHlDU1MmJndpbmRvdy5TaGFkeUNTUy5BcHBseVNoaW0mJih0aGlzLmE9d2luZG93LlNoYWR5Q1NTLkFwcGx5U2hpbSx0aGlzLmEuaW52YWxpZENhbGxiYWNrPVNkKX07Zy5wcm90b3R5cGUuRz1mdW5jdGlvbigpe3ZhciBhPXRoaXM7IXRoaXMuYiYmd2luZG93LlNoYWR5Q1NTJiZ3aW5kb3cuU2hhZHlDU1MuQ3VzdG9tU3R5bGVJbnRlcmZhY2UmJlxuKHRoaXMuYj13aW5kb3cuU2hhZHlDU1MuQ3VzdG9tU3R5bGVJbnRlcmZhY2UsdGhpcy5iLnRyYW5zZm9ybUNhbGxiYWNrPWZ1bmN0aW9uKGIpe2EucyhiKX0sdGhpcy5iLnZhbGlkYXRlQ2FsbGJhY2s9ZnVuY3Rpb24oKXtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXsoYS5iLmVucXVldWVkfHxhLmkpJiZhLmYoKX0pfSl9O2cucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt0aGlzLkYoKTt0aGlzLkcoKX07Zy5wcm90b3R5cGUuZj1mdW5jdGlvbigpe3RoaXMuYygpO2lmKHRoaXMuYil7dmFyIGE9dGhpcy5iLnByb2Nlc3NTdHlsZXMoKTt0aGlzLmIuZW5xdWV1ZWQmJihBP3RoaXMuRmEoYSk6KHRoaXMubyh0aGlzLmcsdGhpcy5oKSx0aGlzLkIoYSkpLHRoaXMuYi5lbnF1ZXVlZD0hMSx0aGlzLmkmJiFBJiZ0aGlzLnN0eWxlRG9jdW1lbnQoKSl9fTtnLnByb3RvdHlwZS5zdHlsZUVsZW1lbnQ9ZnVuY3Rpb24oYSxiKXt2YXIgYz1SKGEpLmlzLGQ9di5nZXQoYSk7ZHx8KGQ9dGhpcy5jYShhKSk7XG50aGlzLmooYSl8fCh0aGlzLmk9ITApO2ImJihkLk49ZC5OfHx7fSxPYmplY3QuYXNzaWduKGQuTixiKSk7aWYoQSl7aWYoZC5OKXtiPWQuTjtmb3IodmFyIGUgaW4gYiludWxsPT09ZT9hLnN0eWxlLnJlbW92ZVByb3BlcnR5KGUpOmEuc3R5bGUuc2V0UHJvcGVydHkoZSxiW2VdKX1pZigoKGU9cmFbY10pfHx0aGlzLmooYSkpJiZlJiZlLmEmJiFLYyhlKSl7aWYoS2MoZSl8fGUuX2FwcGx5U2hpbVZhbGlkYXRpbmdWZXJzaW9uIT09ZS5fYXBwbHlTaGltTmV4dFZlcnNpb24pdGhpcy5jKCksdGhpcy5hJiZ0aGlzLmEudHJhbnNmb3JtUnVsZXMoZS5fc3R5bGVBc3QsYyksZS5hLnRleHRDb250ZW50PXAuYyhhLGQuRCksVGQoZSk7eiYmKGM9YS5zaGFkb3dSb290KSYmKGMucXVlcnlTZWxlY3RvcihcInN0eWxlXCIpLnRleHRDb250ZW50PXAuYyhhLGQuRCkpO2QuRD1lLl9zdHlsZUFzdH19ZWxzZSB0aGlzLm8oYSxkKSxkLmxhJiZkLmxhLmxlbmd0aCYmdGhpcy5LKGEsZCl9O2cucHJvdG90eXBlLmw9XG5mdW5jdGlvbihhKXtyZXR1cm4oYT1hLmdldFJvb3ROb2RlKCkuaG9zdCk/di5nZXQoYSk/YTp0aGlzLmwoYSk6dGhpcy5nfTtnLnByb3RvdHlwZS5qPWZ1bmN0aW9uKGEpe3JldHVybiBhPT09dGhpcy5nfTtnLnByb3RvdHlwZS5LPWZ1bmN0aW9uKGEsYil7dmFyIGM9UihhKS5pcyxkPVhjLmZldGNoKGMsYi5KLGIubGEpLGU9ZD9kLnN0eWxlRWxlbWVudDpudWxsLGY9Yi5BO2IuQT1kJiZkLkF8fHRoaXMuSShjKTtlPU0ucyhhLGIuSixiLkEsZSk7enx8TS5vKGEsYi5BLGYpO2R8fFhjLmIoYyxiLkosZSxiLkEpfTtnLnByb3RvdHlwZS5vPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5sKGEpLGQ9di5nZXQoYyk7Yz1PYmplY3QuY3JlYXRlKGQuSnx8bnVsbCk7dmFyIGU9TS5JKGEsYi5EKTthPU0uTyhkLkQsYSkuQztPYmplY3QuYXNzaWduKGMsZS5hYixhLGUuZ2IpO3RoaXMuYmEoYyxiLk4pO00uYWEoYyk7Yi5KPWN9O2cucHJvdG90eXBlLmJhPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjIGluIGIpe3ZhciBkPVxuYltjXTtpZihkfHwwPT09ZClhW2NdPWR9fTtnLnByb3RvdHlwZS5zdHlsZURvY3VtZW50PWZ1bmN0aW9uKGEpe3RoaXMuc3R5bGVTdWJ0cmVlKHRoaXMuZyxhKX07Zy5wcm90b3R5cGUuc3R5bGVTdWJ0cmVlPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5zaGFkb3dSb290OyhjfHx0aGlzLmooYSkpJiZ0aGlzLnN0eWxlRWxlbWVudChhLGIpO2lmKGI9YyYmKGMuY2hpbGRyZW58fGMuY2hpbGROb2RlcykpZm9yKGE9MDthPGIubGVuZ3RoO2ErKyl0aGlzLnN0eWxlU3VidHJlZShiW2FdKTtlbHNlIGlmKGE9YS5jaGlsZHJlbnx8YS5jaGlsZE5vZGVzKWZvcihiPTA7YjxhLmxlbmd0aDtiKyspdGhpcy5zdHlsZVN1YnRyZWUoYVtiXSl9O2cucHJvdG90eXBlLkZhPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj0wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz10aGlzLmIuZ2V0U3R5bGVGb3JDdXN0b21TdHlsZShhW2JdKTtjJiZ0aGlzLkVhKGMpfX07Zy5wcm90b3R5cGUuQj1mdW5jdGlvbihhKXtmb3IodmFyIGI9XG4wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz10aGlzLmIuZ2V0U3R5bGVGb3JDdXN0b21TdHlsZShhW2JdKTtjJiZNLm0oYyx0aGlzLmguSil9fTtnLnByb3RvdHlwZS5zPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsYz1wYShhKTtXKGMsZnVuY3Rpb24oYSl7ej9wLncoYSk6cC5IKGEpO0EmJihiLmMoKSxiLmEmJmIuYS50cmFuc2Zvcm1SdWxlKGEpKX0pO0E/YS50ZXh0Q29udGVudD1WKGMpOnRoaXMuaC5ELnJ1bGVzLnB1c2goYyl9O2cucHJvdG90eXBlLkVhPWZ1bmN0aW9uKGEpe2lmKEEmJnRoaXMuYSl7dmFyIGI9cGEoYSk7dGhpcy5jKCk7dGhpcy5hLnRyYW5zZm9ybVJ1bGVzKGIpO2EudGV4dENvbnRlbnQ9VihiKX19O2cucHJvdG90eXBlLmdldENvbXB1dGVkU3R5bGVWYWx1ZT1mdW5jdGlvbihhLGIpe3ZhciBjO0F8fChjPSh2LmdldChhKXx8di5nZXQodGhpcy5sKGEpKSkuSltiXSk7cmV0dXJuKGM9Y3x8d2luZG93LmdldENvbXB1dGVkU3R5bGUoYSkuZ2V0UHJvcGVydHlWYWx1ZShiKSk/XG5jLnRyaW0oKTpcIlwifTtnLnByb3RvdHlwZS5JYT1mdW5jdGlvbihhLGIpe3ZhciBjPWEuZ2V0Um9vdE5vZGUoKTtiPWI/Yi5zcGxpdCgvXFxzLyk6W107Yz1jLmhvc3QmJmMuaG9zdC5sb2NhbE5hbWU7aWYoIWMpe3ZhciBkPWEuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIik7aWYoZCl7ZD1kLnNwbGl0KC9cXHMvKTtmb3IodmFyIGU9MDtlPGQubGVuZ3RoO2UrKylpZihkW2VdPT09cC5hKXtjPWRbZSsxXTticmVha319fWMmJmIucHVzaChwLmEsYyk7QXx8KGM9di5nZXQoYSkpJiZjLkEmJmIucHVzaChNLmcsYy5BKTtxYShhLGIuam9pbihcIiBcIikpfTtnLnByb3RvdHlwZS5HYT1mdW5jdGlvbihhKXtyZXR1cm4gdi5nZXQoYSl9O2cucHJvdG90eXBlLmZsdXNoPWcucHJvdG90eXBlLnc7Zy5wcm90b3R5cGUucHJlcGFyZVRlbXBsYXRlPWcucHJvdG90eXBlLnByZXBhcmVUZW1wbGF0ZTtnLnByb3RvdHlwZS5zdHlsZUVsZW1lbnQ9Zy5wcm90b3R5cGUuc3R5bGVFbGVtZW50O2cucHJvdG90eXBlLnN0eWxlRG9jdW1lbnQ9XG5nLnByb3RvdHlwZS5zdHlsZURvY3VtZW50O2cucHJvdG90eXBlLnN0eWxlU3VidHJlZT1nLnByb3RvdHlwZS5zdHlsZVN1YnRyZWU7Zy5wcm90b3R5cGUuZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlPWcucHJvdG90eXBlLmdldENvbXB1dGVkU3R5bGVWYWx1ZTtnLnByb3RvdHlwZS5zZXRFbGVtZW50Q2xhc3M9Zy5wcm90b3R5cGUuSWE7Zy5wcm90b3R5cGUuX3N0eWxlSW5mb0Zvck5vZGU9Zy5wcm90b3R5cGUuR2E7Zy5wcm90b3R5cGUudHJhbnNmb3JtQ3VzdG9tU3R5bGVGb3JEb2N1bWVudD1nLnByb3RvdHlwZS5zO2cucHJvdG90eXBlLmdldFN0eWxlQXN0PWcucHJvdG90eXBlLkhhO2cucHJvdG90eXBlLnN0eWxlQXN0VG9TdHJpbmc9Zy5wcm90b3R5cGUuSmE7Zy5wcm90b3R5cGUuZmx1c2hDdXN0b21TdHlsZXM9Zy5wcm90b3R5cGUuZjtPYmplY3QuZGVmaW5lUHJvcGVydGllcyhnLnByb3RvdHlwZSx7bmF0aXZlU2hhZG93OntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gen19LG5hdGl2ZUNzczp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIEF9fX0pO1xudmFyIEg9bmV3IGc7aWYod2luZG93LlNoYWR5Q1NTKXt2YXIgWWM9d2luZG93LlNoYWR5Q1NTLkFwcGx5U2hpbTt2YXIgWmM9d2luZG93LlNoYWR5Q1NTLkN1c3RvbVN0eWxlSW50ZXJmYWNlfXdpbmRvdy5TaGFkeUNTUz17U2NvcGluZ1NoaW06SCxwcmVwYXJlVGVtcGxhdGU6ZnVuY3Rpb24oYSxiLGMpe0guZigpO0gucHJlcGFyZVRlbXBsYXRlKGEsYixjKX0sc3R5bGVTdWJ0cmVlOmZ1bmN0aW9uKGEsYil7SC5mKCk7SC5zdHlsZVN1YnRyZWUoYSxiKX0sc3R5bGVFbGVtZW50OmZ1bmN0aW9uKGEpe0guZigpO0guc3R5bGVFbGVtZW50KGEpfSxzdHlsZURvY3VtZW50OmZ1bmN0aW9uKGEpe0guZigpO0guc3R5bGVEb2N1bWVudChhKX0sZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlOmZ1bmN0aW9uKGEsYil7cmV0dXJuIEguZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKGEsYil9LG5hdGl2ZUNzczpBLG5hdGl2ZVNoYWRvdzp6fTtZYyYmKHdpbmRvdy5TaGFkeUNTUy5BcHBseVNoaW09WWMpO1pjJiYod2luZG93LlNoYWR5Q1NTLkN1c3RvbVN0eWxlSW50ZXJmYWNlPVxuWmMpO3ZhciByYj13aW5kb3cuY3VzdG9tRWxlbWVudHMseWE9d2luZG93LkhUTUxJbXBvcnRzO3dpbmRvdy5XZWJDb21wb25lbnRzPXdpbmRvdy5XZWJDb21wb25lbnRzfHx7fTtpZihyYiYmcmIucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjayl7dmFyIHphLCRjPWZ1bmN0aW9uKCl7aWYoemEpe3ZhciBhPXphO3phPW51bGw7YSgpO3JldHVybiEwfX0sYWQ9eWEud2hlblJlYWR5O3JiLnBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2soZnVuY3Rpb24oYSl7emE9YTthZCgkYyl9KTt5YS53aGVuUmVhZHk9ZnVuY3Rpb24oYSl7YWQoZnVuY3Rpb24oKXskYygpP3lhLndoZW5SZWFkeShhKTphKCl9KX19eWEud2hlblJlYWR5KGZ1bmN0aW9uKCl7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7d2luZG93LldlYkNvbXBvbmVudHMucmVhZHk9ITA7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJXZWJDb21wb25lbnRzUmVhZHlcIix7YnViYmxlczohMH0pKX0pfSk7XG52YXIgYmQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO2JkLnRleHRDb250ZW50PVwiYm9keSB7dHJhbnNpdGlvbjogb3BhY2l0eSBlYXNlLWluIDAuMnM7IH0gXFxuYm9keVt1bnJlc29sdmVkXSB7b3BhY2l0eTogMDsgZGlzcGxheTogYmxvY2s7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsgfSBcXG5cIjt2YXIgY2Q9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRcIik7Y2QuaW5zZXJ0QmVmb3JlKGJkLGNkLmZpcnN0Q2hpbGQpfSkoKTt9KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJjb21wb25lbnRzLWhpLXNkLWNlLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHdlYmNvbXBvbmVudHMvd2ViY29tcG9uZW50c2pzL3dlYmNvbXBvbmVudHMtaGktc2QtY2UuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdjb21tb24vTGF5ZXInO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHsgTGluZVJhc3Rlcml6ZXIgfSBmcm9tICdsaW5lLXJhc3Rlcml6ZXIvTGluZVJhc3Rlcml6ZXInO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJ1JlbmRlcmVyJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdTdGFnZSc7XHJcbmltcG9ydCB7IFVJQ29udHJvbGxlciB9IGZyb20gJ3VpL1VJQ29udHJvbGxlcic7XHJcblxyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb24ge1xyXG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICBwcml2YXRlIHVpQ29udHJvbGxlcjogVUlDb250cm9sbGVyO1xyXG4gIHByaXZhdGUgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih7IGxpbmVSYXN0ZXJpemVyOiBuZXcgTGluZVJhc3Rlcml6ZXIoKSwgY2FudmFzOiB0aGlzLmNhbnZhcyB9KTtcclxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgU3RhZ2UoKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gbmV3IEV2ZW50QWdncmVnYXRvcigpO1xyXG5cclxuICAgIHRoaXMudWlDb250cm9sbGVyID0gbmV3IFVJQ29udHJvbGxlcih7XHJcbiAgICAgIHJlbmRlcmVyOiB0aGlzLnJlbmRlcmVyLFxyXG4gICAgICBzdGFnZTogdGhpcy5zdGFnZSxcclxuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvclxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICBjb25zdCBwb2x5Z29uTGF5ZXIgPSBuZXcgTGF5ZXIoTEVYLlBPTFlHT05fTEFZRVJfTkFNRSk7XHJcbiAgICB0aGlzLnN0YWdlLmxheWVycy5wdXNoKHBvbHlnb25MYXllcik7XHJcblxyXG4gICAgdGhpcy51aUNvbnRyb2xsZXIuaW5pdCgpO1xyXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnVpQ29udHJvbGxlci5kZXN0cm95KCk7XHJcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlcihldmVudDogUmVuZGVyRXZlbnQpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuY2xlYXIoKTtcclxuICAgIHRoaXMuc3RhZ2UucmVuZGVyKHRoaXMucmVuZGVyZXIpO1xyXG4gICAgZXZlbnQuaGFuZGxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihSZW5kZXJFdmVudC5ldmVudFR5cGUsIHRoaXMucmVuZGVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFJlbmRlckV2ZW50LmV2ZW50VHlwZSwgdGhpcy5yZW5kZXIpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9BcHBsaWNhdGlvbi50cyIsImltcG9ydCB7IExheWVyIH0gZnJvbSAnY29tbW9uL0xheWVyJztcclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRUZXN0UmVzdWx0IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgbGluZTogTGluZTtcclxuICBwdWJsaWMgcGF0aD86IFBhdGg7XHJcbiAgcHVibGljIGxheWVyPzogTGF5ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxpbmU6IExpbmUsIHBhdGg/OiBQYXRoLCBsYXllcj86IExheWVyKSB7XHJcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29tbW9uL0hpdFRlc3RSZXN1bHQudHMiLCJleHBvcnQgY2xhc3MgQ29sb3Ige1xyXG4gIHB1YmxpYyByZWFkb25seSByOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGc6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgYjogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBmaWxsU3R5bGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocjogbnVtYmVyLCBiOiBudW1iZXIsIGc6IG51bWJlcikge1xyXG4gICAgdGhpcy5yID0gcjtcclxuICAgIHRoaXMuYiA9IGI7XHJcbiAgICB0aGlzLmcgPSBnO1xyXG5cclxuICAgIHRoaXMuZmlsbFN0eWxlID0gYHJnYigke3RoaXMucn0sICR7dGhpcy5nfSwgJHt0aGlzLmJ9KWA7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2NvbW1vbi9Db2xvci50cyIsImltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb24sIFNlcmlhbGl6YWJsZUxpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0xpbmVDb25kaXRpb24nO1xyXG5cclxuaW1wb3J0IHsgRml4ZWRMZW5ndGhMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9GaXhlZExlbmd0aExpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvSG9yaXpvbnRhbExpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBWZXJ0aWNhbExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL1ZlcnRpY2FsTGluZUNvbmRpdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uRGVzZXJpYWxpemVyIHtcclxuICBwdWJsaWMgZGVzZXJpYWxpemVDb25kaXRpb24oXHJcbiAgICBwb2x5Z29uOiBQb2x5Z29uLFxyXG4gICAgc2VyaWFsaXphYmxlTGluZUNvbmRpdGlvbjogU2VyaWFsaXphYmxlTGluZUNvbmRpdGlvblxyXG4gICk6IExpbmVDb25kaXRpb24ge1xyXG4gICAgY29uc3QgcDEgPSBwb2x5Z29uLmdldFZlcnRleChzZXJpYWxpemFibGVMaW5lQ29uZGl0aW9uLnAxSW5kZXgpO1xyXG4gICAgY29uc3QgcDIgPSBwb2x5Z29uLmdldFZlcnRleChzZXJpYWxpemFibGVMaW5lQ29uZGl0aW9uLnAySW5kZXgpO1xyXG4gICAgY29uc3QgbGluZSA9IG5ldyBMaW5lKHAxLCBwMik7XHJcblxyXG4gICAgc3dpdGNoIChzZXJpYWxpemFibGVMaW5lQ29uZGl0aW9uLm5hbWUpIHtcclxuICAgICAgY2FzZSBGaXhlZExlbmd0aExpbmVDb25kaXRpb24ubmFtZTpcclxuICAgICAgICByZXR1cm4gbmV3IEZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbihcclxuICAgICAgICAgIGxpbmUsXHJcbiAgICAgICAgICBwb2x5Z29uLFxyXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLXN0cmluZy1saXRlcmFsXHJcbiAgICAgICAgICA8bnVtYmVyPnNlcmlhbGl6YWJsZUxpbmVDb25kaXRpb25bJ2ZpeGVkTGVuZ3RoJ11cclxuICAgICAgICApO1xyXG5cclxuICAgICAgY2FzZSBIb3Jpem9udGFsTGluZUNvbmRpdGlvbi5uYW1lOlxyXG4gICAgICAgIHJldHVybiBuZXcgSG9yaXpvbnRhbExpbmVDb25kaXRpb24obGluZSwgcG9seWdvbik7XHJcblxyXG4gICAgICBjYXNlIFZlcnRpY2FsTGluZUNvbmRpdGlvbi5uYW1lOlxyXG4gICAgICAgIHJldHVybiBuZXcgVmVydGljYWxMaW5lQ29uZGl0aW9uKGxpbmUsIHBvbHlnb24pO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGluZSBjb25kaXRpb24gbmFtZScpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0NvbmRpdGlvbkRlc2VyaWFsaXplci50cyIsImltcG9ydCB7IEFwcEV2ZW50IH0gZnJvbSAnZXZlbnRzL0FwcEV2ZW50JztcclxuaW1wb3J0IHsgRXZlbnRRdWV1ZSB9IGZyb20gJ2V2ZW50cy9FdmVudFF1ZXVlJztcclxuXHJcbnR5cGUgRXZlbnRMaXN0ZW5lciA9IChldmVudDogQXBwRXZlbnQpID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRBZ2dyZWdhdG9yIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGxpc3RlbmVyTWFwID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50TGlzdGVuZXJbXT4oKTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UXVldWUgPSBuZXcgRXZlbnRRdWV1ZSgpO1xyXG4gIHByaXZhdGUgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gdGhpcy5nZXRFdmVudExpc3RlbmVycyhldmVudFR5cGUpO1xyXG5cclxuICAgIGlmIChldmVudExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSA9PT0gLTEpIHtcclxuICAgICAgZXZlbnRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1hcC5zZXQoZXZlbnRUeXBlLCBldmVudExpc3RlbmVycyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gdGhpcy5nZXRFdmVudExpc3RlbmVycyhldmVudFR5cGUpO1xyXG4gICAgY29uc3QgbGlzdGVuZXJJbmRleCA9IGV2ZW50TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG5cclxuICAgIGlmIChsaXN0ZW5lckluZGV4ICE9PSAtMSkge1xyXG4gICAgICBldmVudExpc3RlbmVycy5zcGxpY2UobGlzdGVuZXJJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1hcC5zZXQoZXZlbnRUeXBlLCBldmVudExpc3RlbmVycyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcGF0Y2hFdmVudChldmVudDogQXBwRXZlbnQpIHtcclxuICAgIHRoaXMuZXZlbnRRdWV1ZS5lbnF1ZXVlKGV2ZW50KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNEaXNwYXRjaGluZykge1xyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnRGcm9tUXVldWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGlzcGF0Y2hFdmVudEZyb21RdWV1ZSgpIHtcclxuICAgIHRoaXMuaXNEaXNwYXRjaGluZyA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50UXVldWUuZGVxdWV1ZSgpO1xyXG4gICAgY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmdldEV2ZW50TGlzdGVuZXJzKGV2ZW50LmV2ZW50VHlwZSk7XHJcbiAgICBldmVudExpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKGV2ZW50KSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZXZlbnRRdWV1ZS5pc0VtcHR5KCkpIHtcclxuICAgICAgdGhpcy5pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnRGcm9tUXVldWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RXZlbnRMaXN0ZW5lcnMoZXZlbnRUeXBlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyTWFwLmdldChldmVudFR5cGUpIHx8IFtdO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9ldmVudHMvRXZlbnRBZ2dyZWdhdG9yLnRzIiwiaW1wb3J0IHsgQXBwRXZlbnQgfSBmcm9tICdldmVudHMvQXBwRXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50UXVldWUge1xyXG4gIHByaXZhdGUgX3F1ZXVlOiBBcHBFdmVudFtdID0gW107XHJcblxyXG4gIHB1YmxpYyBlbnF1ZXVlKGV2ZW50OiBBcHBFdmVudCkge1xyXG4gICAgdGhpcy5fcXVldWUucHVzaChldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVxdWV1ZSgpOiBBcHBFdmVudCB7XHJcbiAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdRdWV1ZSBpcyBlbXB0eScpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9xdWV1ZS5zcGxpY2UoMCwgMSlbMF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0VtcHR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TGVuZ3RoKCkgPT09IDA7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2V2ZW50cy9FdmVudFF1ZXVlLnRzIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBvY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnMsIHJldmVyc2VPY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnMgfSBmcm9tICdsaW5lLXJhc3Rlcml6ZXIvb2N0YW50LXZlY3Rvci10cmFuc2Zvcm1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVSYXN0ZXJpemVyIHtcclxuICBwdWJsaWMgcmFzdGVyaXplTGluZShcclxuICAgIHN0YXJ0UG9pbnQ6IFBvaW50LFxyXG4gICAgZW5kUG9pbnQ6IFBvaW50LFxyXG4gICAgdGhpY2tuZXNzOiBudW1iZXJcclxuICApOiBQb2ludFtdIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uVmVjdG9yID0gUG9pbnQuc3VidHJhY3QoZW5kUG9pbnQsIHN0YXJ0UG9pbnQpO1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25WZWN0b3JPY3RhbnQgPSB0cmFuc2xhdGlvblZlY3Rvci5nZXRPY3RhbnQoKTtcclxuICAgIGNvbnN0IHZlY3RvclRyYW5zZm9ybWF0aW9uID1cclxuICAgICAgb2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zW3RyYW5zbGF0aW9uVmVjdG9yT2N0YW50XTtcclxuICAgIGNvbnN0IHJldmVyc2VWZWN0b3JUcmFuc2Zvcm1hdGlvbiA9XHJcbiAgICAgIHJldmVyc2VPY3RhbnRWZWN0b3JUcmFuc2Zvcm1hdGlvbnNbdHJhbnNsYXRpb25WZWN0b3JPY3RhbnRdO1xyXG5cclxuICAgIGNvbnN0IHJhc3Rlcml6ZWRUcmFuc2Zvcm1lZExpbmUgPSB0aGlzLnJhc3Rlcml6ZUxpbmVGaXJzdFF1YWRyYW50KFxyXG4gICAgICB2ZWN0b3JUcmFuc2Zvcm1hdGlvbih0cmFuc2xhdGlvblZlY3RvciksXHJcbiAgICAgIHRoaWNrbmVzc1xyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gcmFzdGVyaXplZFRyYW5zZm9ybWVkTGluZS5tYXAocG9pbnQgPT5cclxuICAgICAgUG9pbnQuYWRkKHJldmVyc2VWZWN0b3JUcmFuc2Zvcm1hdGlvbihwb2ludCksIHN0YXJ0UG9pbnQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByYXN0ZXJpemVMaW5lRmlyc3RRdWFkcmFudChlbmRQb2ludDogUG9pbnQsIHRoaWNrbmVzczogbnVtYmVyKSB7XHJcbiAgICBjb25zdCByYXN0ZXJpemVkTGluZTogUG9pbnRbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGR4ID0gZW5kUG9pbnQueDtcclxuICAgIGNvbnN0IGR5ID0gZW5kUG9pbnQueTtcclxuICAgIGNvbnN0IGluY3JlbWVudEUgPSAyICogZHk7XHJcbiAgICBjb25zdCBpbmNyZW1lbnRORSA9IDIgKiAoZHkgLSBkeCk7XHJcblxyXG4gICAgbGV0IGQgPSAyICogZHkgLSBkeDtcclxuICAgIGxldCB4ID0gMDtcclxuICAgIGxldCB5ID0gMDtcclxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgdGhpcy5nZXRUaGlja1BvaW50c0l0ZXJhdG9ySW5GaXJzdFF1YWRyYW50KFxyXG4gICAgICBuZXcgUG9pbnQoeCwgeSksXHJcbiAgICAgIHRoaWNrbmVzc1xyXG4gICAgKSkge1xyXG4gICAgICByYXN0ZXJpemVkTGluZS5wdXNoKHBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoeCA8IGVuZFBvaW50LngpIHtcclxuICAgICAgaWYgKGQgPCAwKSB7XHJcbiAgICAgICAgZCArPSBpbmNyZW1lbnRFO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQgKz0gaW5jcmVtZW50TkU7XHJcbiAgICAgICAgeSArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHggKz0gMTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgdGhpcy5nZXRUaGlja1BvaW50c0l0ZXJhdG9ySW5GaXJzdFF1YWRyYW50KFxyXG4gICAgICAgIG5ldyBQb2ludCh4LCB5KSxcclxuICAgICAgICB0aGlja25lc3NcclxuICAgICAgKSkge1xyXG4gICAgICAgIHJhc3Rlcml6ZWRMaW5lLnB1c2gocG9pbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJhc3Rlcml6ZWRMaW5lO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSAqZ2V0VGhpY2tQb2ludHNJdGVyYXRvckluRmlyc3RRdWFkcmFudChcclxuICAgIHBvaW50OiBQb2ludCxcclxuICAgIHRoaWNrbmVzczogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBsZXQgZHkgPSAxO1xyXG5cclxuICAgIHlpZWxkIHBvaW50O1xyXG5cclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBjdXJyZW50VGhpY2tuZXNzID0gMTtcclxuICAgICAgY3VycmVudFRoaWNrbmVzcyA8IHRoaWNrbmVzcztcclxuICAgICAgY3VycmVudFRoaWNrbmVzcyArPSAxXHJcbiAgICApIHtcclxuICAgICAgeWllbGQgbmV3IFBvaW50KHBvaW50LngsIHBvaW50LnkgKyBkeSk7XHJcbiAgICAgIGR5ID0gLWR5O1xyXG5cclxuICAgICAgaWYgKGR5ID4gMCkge1xyXG4gICAgICAgIGR5ICs9IDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbGluZS1yYXN0ZXJpemVyL0xpbmVSYXN0ZXJpemVyLnRzIiwiaW1wb3J0IHsgT2N0YW50IH0gZnJvbSAnY29tbW9uL09jdGFudCc7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuXHJcbi8vIFRyYW5zZm9ybWF0aW9ucyBmcm9tIGEgc3BlY2lmaWMgb2N0YW50IHRvIHRoZSBmaXJzdCBvY3RhbnRcclxuY29uc3Qgb2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zID0ge1xyXG4gIFtPY3RhbnQuRmlyc3RdOiAocDogUG9pbnQpID0+IHAsXHJcbiAgW09jdGFudC5TZWNvbmRdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludChwLnksIHAueCksXHJcbiAgW09jdGFudC5UaGlyZF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueSwgLXAueCksXHJcbiAgW09jdGFudC5Gb3VydGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC54LCBwLnkpLFxyXG4gIFtPY3RhbnQuRmlmdGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC54LCAtcC55KSxcclxuICBbT2N0YW50LlNpeHRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueSwgLXAueCksXHJcbiAgW09jdGFudC5TZXZlbnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueSwgcC54KSxcclxuICBbT2N0YW50LkVpZ2h0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueCwgLXAueSlcclxufTtcclxuXHJcbi8vIFRyYW5zZm9ybWF0aW9ucyBmcm9tIHRoZSBmaXJzdCBvY3RhbnQgdG8gYSBzcGVjaWZpYyBvY3RhbnRcclxuY29uc3QgcmV2ZXJzZU9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9ucyA9IHtcclxuICBbT2N0YW50LkZpcnN0XTogKHA6IFBvaW50KSA9PiBwLFxyXG4gIFtPY3RhbnQuU2Vjb25kXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQocC55LCBwLngpLFxyXG4gIFtPY3RhbnQuVGhpcmRdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludCgtcC55LCBwLngpLFxyXG4gIFtPY3RhbnQuRm91cnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueCwgcC55KSxcclxuICBbT2N0YW50LkZpZnRoXTogKHA6IFBvaW50KSA9PiBuZXcgUG9pbnQoLXAueCwgLXAueSksXHJcbiAgW09jdGFudC5TaXh0aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KC1wLnksIC1wLngpLFxyXG4gIFtPY3RhbnQuU2V2ZW50aF06IChwOiBQb2ludCkgPT4gbmV3IFBvaW50KHAueSwgLXAueCksXHJcbiAgW09jdGFudC5FaWdodGhdOiAocDogUG9pbnQpID0+IG5ldyBQb2ludChwLngsIC1wLnkpXHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIG9jdGFudFZlY3RvclRyYW5zZm9ybWF0aW9ucyxcclxuICByZXZlcnNlT2N0YW50VmVjdG9yVHJhbnNmb3JtYXRpb25zXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2xpbmUtcmFzdGVyaXplci9vY3RhbnQtdmVjdG9yLXRyYW5zZm9ybWF0aW9ucy50cyIsImltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29tbW9uL0NvbG9yJztcclxuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnY29tbW9uL0NPTE9SUyc7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZVJhc3Rlcml6ZXIgfSBmcm9tICdsaW5lLXJhc3Rlcml6ZXIvTGluZVJhc3Rlcml6ZXInO1xyXG5cclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5cclxuaW50ZXJmYWNlIFJlbmRlcmVyRGVwZW5kZW5jaWVzIHtcclxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIGxpbmVSYXN0ZXJpemVyOiBMaW5lUmFzdGVyaXplcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcclxuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZW5kZXJpbmdDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgcHJpdmF0ZSBsaW5lUmFzdGVyaXplcjogTGluZVJhc3Rlcml6ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUmVuZGVyZXJEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuY2FudmFzID0gZGVwZW5kZW5jaWVzLmNhbnZhcztcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgaWYgKGNvbnRleHQgPT09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZ2V0IGNhbnZhcyAyZCByZW5kZXJpbmcgY29udGV4dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbnRleHQuZm9udCA9IGNvbmZpZ3VyYXRpb24uY2FudmFzRm9udDtcclxuICAgIHRoaXMubGluZVJhc3Rlcml6ZXIgPSBkZXBlbmRlbmNpZXMubGluZVJhc3Rlcml6ZXI7XHJcbiAgICB0aGlzLnNldEZpbGxDb2xvcihDT0xPUlMuQkxBQ0spO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXdQb2ludChwb2ludDogUG9pbnQpIHtcclxuICAgIHRoaXMuZHJhd1BpeGVsKHBvaW50LngsIHBvaW50LnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXdQaXhlbCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5yZW5kZXJpbmdDb250ZXh0LmZpbGxSZWN0KHgsIHksIDEsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyYXdMaW5lKGxpbmU6IExpbmUsIGxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcyk6IHZvaWQ7XHJcbiAgcHVibGljIGRyYXdMaW5lKHN0YXJ0UG9pbnQ6IFBvaW50LCBlbmRQb2ludDogUG9pbnQsIGxpbmVQcm9wZXJ0aWVzOiBMaW5lUHJvcGVydGllcyk6IHZvaWQ7XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby1hbnlcclxuICBwdWJsaWMgZHJhd0xpbmUoLi4uYXJnczogYW55W10pIHtcclxuICAgIGlmIChhcmdzWzBdIGluc3RhbmNlb2YgTGluZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kcmF3TGluZUJldHdlZW5Qb2ludHMoYXJnc1swXS5wMSwgYXJnc1swXS5wMiwgYXJnc1sxXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5kcmF3TGluZUJldHdlZW5Qb2ludHMoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJhd1BhdGgocGF0aDogUGF0aCkge1xyXG4gICAgY29uc3QgcGF0aExpbmVQcm9wZXJ0aWVzID0gcGF0aC5nZXRMaW5lUHJvcGVydGllcygpO1xyXG5cclxuICAgIGZvciAoY29uc3QgbGluZSBvZiBwYXRoLmdldExpbmVJdGVyYXRvcigpKSB7XHJcbiAgICAgIHRoaXMuZHJhd0xpbmUobGluZSwgcGF0aExpbmVQcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIFBvbHlnb24pIHtcclxuICAgICAgdGhpcy5kcmF3TGluZUNvbmRpdGlvbnMocGF0aC5nZXRMaW5lQ29uZGl0aW9ucygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaWxsVGV4dCh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZDtcclxuICBwdWJsaWMgZmlsbFRleHQodGV4dDogc3RyaW5nLCBwb2ludDogUG9pbnQpOiB2b2lkO1xyXG4gIHB1YmxpYyBmaWxsVGV4dCh0ZXh0OiBzdHJpbmcsIHBvaW50T3JYOiBudW1iZXIgfCBQb2ludCwgeT86IG51bWJlcikge1xyXG4gICAgbGV0IHggPSBwb2ludE9yWDtcclxuICAgIGlmICh0eXBlb2YgcG9pbnRPclggPT09ICdvYmplY3QnICYmIHBvaW50T3JYIGluc3RhbmNlb2YgUG9pbnQpIHtcclxuICAgICAgeCA9IHBvaW50T3JYLng7XHJcbiAgICAgIHkgPSBwb2ludE9yWC55O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dC5maWxsVGV4dCh0ZXh0LCA8bnVtYmVyPngsIDxudW1iZXI+eSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEZpbGxDb2xvcihjb2xvcjogQ29sb3IpIHtcclxuICAgIHRoaXMucmVuZGVyaW5nQ29udGV4dC5maWxsU3R5bGUgPSBjb2xvci5maWxsU3R5bGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYXdMaW5lQmV0d2VlblBvaW50cyhcclxuICAgIHN0YXJ0UG9pbnQ6IFBvaW50LFxyXG4gICAgZW5kUG9pbnQ6IFBvaW50LFxyXG4gICAgbGluZVByb3BlcnRpZXM6IExpbmVQcm9wZXJ0aWVzXHJcbiAgKSB7XHJcbiAgICBjb25zdCByYXN0ZXJpemVkTGluZVBvaW50cyA9IHRoaXMubGluZVJhc3Rlcml6ZXIucmFzdGVyaXplTGluZShcclxuICAgICAgc3RhcnRQb2ludCxcclxuICAgICAgZW5kUG9pbnQsXHJcbiAgICAgIGxpbmVQcm9wZXJ0aWVzLnRoaWNrbmVzc1xyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNldEZpbGxDb2xvcihsaW5lUHJvcGVydGllcy5jb2xvcik7XHJcbiAgICByYXN0ZXJpemVkTGluZVBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHRoaXMuZHJhd1BvaW50KHBvaW50KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYXdMaW5lQ29uZGl0aW9ucyhsaW5lQ29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdKSB7XHJcbiAgICBsaW5lQ29uZGl0aW9ucy5mb3JFYWNoKGxpbmVDb25kaXRpb24gPT4ge1xyXG4gICAgICB0aGlzLmZpbGxUZXh0KFxyXG4gICAgICAgIGxpbmVDb25kaXRpb24uZ2V0TGFiZWwoKSxcclxuICAgICAgICBQb2ludC5hZGQobGluZUNvbmRpdGlvbi5saW5lLmdldE1pZGRsZVBvaW50KCksIGNvbmZpZ3VyYXRpb24ubGluZUNvbmRpdGlvbkxhYmVsT2Zmc2V0KVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL1JlbmRlcmVyLnRzIiwiaW1wb3J0IHsgSGl0VGVzdFJlc3VsdCB9IGZyb20gJ2NvbW1vbi9IaXRUZXN0UmVzdWx0JztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdjb21tb24vTGF5ZXInO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnUmVuZGVyZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YWdlIHtcclxuICBwdWJsaWMgbGF5ZXJzOiBMYXllcltdID0gW107XHJcblxyXG4gIHB1YmxpYyByZW5kZXIocmVuZGVyZXI6IFJlbmRlcmVyKSB7XHJcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IGxheWVyLnJlbmRlcihyZW5kZXJlcikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUxheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmxheWVycy5pbmRleE9mKGxheWVyKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGl0VGVzdChwb2ludDogUG9pbnQpOiBIaXRUZXN0UmVzdWx0IHwgbnVsbCB7XHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGxheWVyLmhpdFRlc3QocG9pbnQpO1xyXG4gICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRMYXllckJ5TmFtZShuYW1lOiBzdHJpbmcpOiBMYXllciB7XHJcbiAgICBjb25zdCBmb3VuZExheWVyID0gdGhpcy5sYXllcnMuZmluZChsYXllciA9PiBsYXllci5uYW1lID09PSBuYW1lKTtcclxuXHJcbiAgICBpZiAoIWZvdW5kTGF5ZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBMYXllciB3aXRoIG5hbWUgJHtuYW1lfSBkb2VzIG5vdCBleGlzdGApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3VuZExheWVyO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9TdGFnZS50cyIsImltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdSZW5kZXJlcic7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5cclxuaW1wb3J0IHsgVUlDb25kaXRpb25Db250cm9sbGVyIH0gZnJvbSAndWkvY29uZGl0aW9ucy9VSUNvbmRpdGlvbkNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgfSBmcm9tICd1aS9Nb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXInO1xyXG5pbXBvcnQgeyBOZXdQb2x5Z29uVUlDb250cm9sbGVyIH0gZnJvbSAndWkvTmV3UG9seWdvblVJQ29udHJvbGxlcic7XHJcbmltcG9ydCB7IFBhdGhEcmFnZ2luZ1NlcnZpY2UgfSBmcm9tICd1aS9QYXRoRHJhZ2dpbmdTZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9pbnREcmFnZ2luZ1NlcnZpY2UgfSBmcm9tICd1aS9Qb2ludERyYWdnaW5nU2VydmljZSc7XHJcbmltcG9ydCB7IFBvaW50SW5zZXJ0ZXJTZXJ2aWNlIH0gZnJvbSAndWkvUG9pbnRJbnNlcnRlclNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2ludFJlbW92ZXJTZXJ2aWNlIH0gZnJvbSAndWkvUG9pbnRSZW1vdmVyU2VydmljZSc7XHJcbmltcG9ydCB7IFBvaW50U3luY1NlcnZpY2UgfSBmcm9tICd1aS9Qb2ludFN5bmNTZXJ2aWNlJztcclxuaW1wb3J0IHsgVUlTZXJ2aWNlIH0gZnJvbSAndWkvVUlTZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IENvbmRpdGlvbk1hdGNoZXIgfSBmcm9tICdjb25kaXRpb25zL0NvbmRpdGlvbk1hdGNoZXInO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IExpbmVDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL0xpbmVDbGlja0V2ZW50JztcclxuXHJcbmltcG9ydCAndWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zQnV0dG9uJztcclxuaW1wb3J0ICd1aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cnO1xyXG5pbXBvcnQgeyBMb2FkQnV0dG9uIH0gZnJvbSAndWkvY29tcG9uZW50cy9zZXJpYWxpemF0aW9uL0xvYWRCdXR0b24nO1xyXG5pbXBvcnQgeyBTYXZlQnV0dG9uIH0gZnJvbSAndWkvY29tcG9uZW50cy9zZXJpYWxpemF0aW9uL1NhdmVCdXR0b24nO1xyXG5cclxuaW50ZXJmYWNlIFVJQ29udHJvbGxlckRlcGVuZGVuY2llcyB7XHJcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVUlDb250cm9sbGVyIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICBwcml2YXRlIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgc2VyaWFsaXphdGlvbkNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgdWlTZXJ2aWNlczogVUlTZXJ2aWNlW10gPSBbXTtcclxuICBwcml2YXRlIG5ld1BvbHlnb25VSUNvbnRyb2xsZXI6IE5ld1BvbHlnb25VSUNvbnRyb2xsZXI7XHJcbiAgcHJpdmF0ZSBwYXRoRHJhZ2dpbmdTZXJ2aWNlOiBQYXRoRHJhZ2dpbmdTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFVJQ29udHJvbGxlckRlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkZXBlbmRlbmNpZXMuY2FudmFzO1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IGRlcGVuZGVuY2llcy5yZW5kZXJlcjtcclxuICAgIHRoaXMuc3RhZ2UgPSBkZXBlbmRlbmNpZXMuc3RhZ2U7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VEb3duID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICBjb25zdCBhcHBsaWNhdGlvblVJQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uZmlndXJhdGlvbi5hcHBsaWNhdGlvblVJQ29udGFpbmVySUQpO1xyXG4gICAgaWYgKCFhcHBsaWNhdGlvblVJQ29udGFpbmVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXBwbGljYXRpb24gVUkgY29udGFpbmVyIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lciA9IGFwcGxpY2F0aW9uVUlDb250YWluZXI7XHJcblxyXG4gICAgdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgPSBuZXcgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyKHRoaXMuY2FudmFzKTtcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlTmV3UG9seWdvblVJQ29udHJvbGxlcigpO1xyXG4gICAgdGhpcy5jcmVhdGVQb2ludERyYWdnaW5nU2VydmljZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVQb2ludEluc2VydGVyU2VydmljZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVQb2ludFJlbW92ZXJTZXJ2aWNlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVBvaW50U3luY1NlcnZpY2UoKTtcclxuICAgIHRoaXMuY3JlYXRlVUlDb25kaXRpb25Db250cm9sbGVyKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVBhdGhEcmFnZ2luZ1NlcnZpY2UoKTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMuZm9yRWFjaCh1aVNlcnZpY2UgPT4gdWlTZXJ2aWNlLmluaXQoKSk7XHJcblxyXG4gICAgdGhpcy5hZGRTZXJpYWxpemF0aW9uQnV0dG9ucygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XHJcbiAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMuZm9yRWFjaCh1aVNlcnZpY2UgPT4gdWlTZXJ2aWNlLmRlc3Ryb3koKSk7XHJcbiAgICB0aGlzLnVpU2VydmljZXMuc3BsaWNlKDAsIHRoaXMudWlTZXJ2aWNlcy5sZW5ndGgpO1xyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxyXG4gICAgdGhpcy5zZXJpYWxpemF0aW9uQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTZXJpYWxpemF0aW9uQnV0dG9ucygpIHtcclxuICAgIGNvbnN0IHNlcmlhbGl6YXRpb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VyaWFsaXphdGlvbi1jb250YWluZXInKTtcclxuICAgIGlmICghc2VyaWFsaXphdGlvbkNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlcmlhbGl6YXRpb24gY29udGFpbmVyIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VyaWFsaXphdGlvbkNvbnRhaW5lciA9IHNlcmlhbGl6YXRpb25Db250YWluZXI7XHJcblxyXG4gICAgY29uc3QgbG9hZEJ1dHRvbiA9IG5ldyBMb2FkQnV0dG9uKHtcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvcixcclxuICAgICAgc3RhZ2U6IHRoaXMuc3RhZ2VcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IG5ldyBTYXZlQnV0dG9uKHtcclxuICAgICAgc3RhZ2U6IHRoaXMuc3RhZ2VcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2VyaWFsaXphdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkQnV0dG9uKTtcclxuICAgIHRoaXMuc2VyaWFsaXphdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICghZXZlbnQuY3RybEtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wYXRoRHJhZ2dpbmdTZXJ2aWNlLnN0YXJ0TW92aW5nUGF0aChldmVudCk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICBpZiAodGhpcy5wYXRoRHJhZ2dpbmdTZXJ2aWNlLmlzRHJhZ2dpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIuZ2V0UG9pbnRGcm9tTW91c2VFdmVudChldmVudCk7XHJcblxyXG4gICAgY29uc3QgaGl0VGVzdFJlc3VsdCA9IHRoaXMuc3RhZ2UuaGl0VGVzdChwb2ludCk7XHJcblxyXG4gICAgaWYgKCFoaXRUZXN0UmVzdWx0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5ld1BvbHlnb25VSUNvbnRyb2xsZXIuYWRkTmV3UG9pbnQocG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaGl0VGVzdFJlc3VsdC5wYXRoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IExpbmVDbGlja0V2ZW50KGhpdFRlc3RSZXN1bHQubGluZSwgaGl0VGVzdFJlc3VsdC5wYXRoLCBwb2ludCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVQb2ludFN5bmNTZXJ2aWNlKCkge1xyXG4gICAgY29uc3QgcG9pbnRTeW5jU2VydmljZSA9IG5ldyBQb2ludFN5bmNTZXJ2aWNlKHtcclxuICAgICAgY29udGFpbmVyOiB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIsXHJcbiAgICAgIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIsXHJcbiAgICAgIHN0YWdlOiB0aGlzLnN0YWdlLFxyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaChwb2ludFN5bmNTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUG9pbnRSZW1vdmVyU2VydmljZSgpIHtcclxuICAgIGNvbnN0IHBvaW50UmVtb3ZlclNlcnZpY2UgPSBuZXcgUG9pbnRSZW1vdmVyU2VydmljZSh7XHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHBvaW50UmVtb3ZlclNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVQb2ludERyYWdnaW5nU2VydmljZSgpIHtcclxuICAgIGNvbnN0IHBvaW50RHJhZ2dpbmdTZXJ2aWNlID0gbmV3IFBvaW50RHJhZ2dpbmdTZXJ2aWNlKHtcclxuICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvcixcclxuICAgICAgc3RhZ2U6IHRoaXMuc3RhZ2VcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHBvaW50RHJhZ2dpbmdTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTmV3UG9seWdvblVJQ29udHJvbGxlcigpIHtcclxuICAgIHRoaXMubmV3UG9seWdvblVJQ29udHJvbGxlciA9IG5ldyBOZXdQb2x5Z29uVUlDb250cm9sbGVyKHtcclxuICAgICAgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyLFxyXG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxyXG4gICAgICBzdGFnZTogdGhpcy5zdGFnZSxcclxuICAgICAgcG9seWdvbkxheWVyOiB0aGlzLnN0YWdlLmZpbmRMYXllckJ5TmFtZShMRVguUE9MWUdPTl9MQVlFUl9OQU1FKSxcclxuICAgICAgcmVuZGVyZXI6IHRoaXMucmVuZGVyZXIsXHJcbiAgICAgIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIsXHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3JcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHRoaXMubmV3UG9seWdvblVJQ29udHJvbGxlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBvaW50SW5zZXJ0ZXJTZXJ2aWNlKCkge1xyXG4gICAgY29uc3QgcG9pbnRJbnNlcnRlclNlcnZpY2UgPSBuZXcgUG9pbnRJbnNlcnRlclNlcnZpY2Uoe1xyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaChwb2ludEluc2VydGVyU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVVJQ29uZGl0aW9uQ29udHJvbGxlcigpIHtcclxuICAgIGNvbnN0IHVpQ29uZGl0aW9uQ29udHJvbGxlciA9IG5ldyBVSUNvbmRpdGlvbkNvbnRyb2xsZXIoe1xyXG4gICAgICBldmVudEFnZ3JlZ2F0b3I6IHRoaXMuZXZlbnRBZ2dyZWdhdG9yLFxyXG4gICAgICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIsXHJcbiAgICAgIGNvbmRpdGlvbk1hdGNoZXI6IG5ldyBDb25kaXRpb25NYXRjaGVyKClcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudWlTZXJ2aWNlcy5wdXNoKHVpQ29uZGl0aW9uQ29udHJvbGxlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVBhdGhEcmFnZ2luZ1NlcnZpY2UoKSB7XHJcbiAgICB0aGlzLnBhdGhEcmFnZ2luZ1NlcnZpY2UgPSBuZXcgUGF0aERyYWdnaW5nU2VydmljZSh7XHJcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXHJcbiAgICAgIGV2ZW50QWdncmVnYXRvcjogdGhpcy5ldmVudEFnZ3JlZ2F0b3IsXHJcbiAgICAgIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIsXHJcbiAgICAgIHN0YWdlOiB0aGlzLnN0YWdlXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVpU2VydmljZXMucHVzaCh0aGlzLnBhdGhEcmFnZ2luZ1NlcnZpY2UpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9VSUNvbnRyb2xsZXIudHMiLCJpbXBvcnQgeyBDb25kaXRpb25QaWNrZXIgfSBmcm9tICd1aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlcic7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAnY29tbW9uL0xpbmUnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgTGluZUNsaWNrRXZlbnQgfSBmcm9tICdldmVudHMvTGluZUNsaWNrRXZlbnQnO1xyXG5pbXBvcnQgeyBMRVggfSBmcm9tICdMRVgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZGl0aW9uTWF0Y2hlciB9IGZyb20gJ2NvbmRpdGlvbnMvQ29uZGl0aW9uTWF0Y2hlcic7XHJcbmltcG9ydCB7IEJpZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlciB9IGZyb20gJ2NvbmRpdGlvbnMvZml4ZXJzL0JpZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlcic7XHJcblxyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcblxyXG5pbnRlcmZhY2UgVUlDb25kaXRpb25Db250cm9sbGVyRGVwZW5kZW5jaWVzIHtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuICBhcHBsaWNhdGlvblVJQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBjb25kaXRpb25NYXRjaGVyOiBDb25kaXRpb25NYXRjaGVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVUlDb25kaXRpb25Db250cm9sbGVyIGltcGxlbWVudHMgVUlTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjb25kaXRpb25NYXRjaGVyOiBDb25kaXRpb25NYXRjaGVyO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmRpdGlvblBpY2tlcjogQ29uZGl0aW9uUGlja2VyID0gbmV3IENvbmRpdGlvblBpY2tlcigpO1xyXG4gIHByaXZhdGUgcHJldmlvdXNMaW5lQ2xpY2tUaW1lc3RhbXAgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFVJQ29uZGl0aW9uQ29udHJvbGxlckRlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyID0gZGVwZW5kZW5jaWVzLmFwcGxpY2F0aW9uVUlDb250YWluZXI7XHJcbiAgICB0aGlzLmNvbmRpdGlvbk1hdGNoZXIgPSBkZXBlbmRlbmNpZXMuY29uZGl0aW9uTWF0Y2hlcjtcclxuXHJcbiAgICB0aGlzLm9uTGluZUNsaWNrID0gdGhpcy5vbkxpbmVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbk5ld0NvbmRpdGlvbiA9IHRoaXMub25OZXdDb25kaXRpb24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25SZW1vdmVDb25kaXRpb24gPSB0aGlzLm9uUmVtb3ZlQ29uZGl0aW9uLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uTGluZUNsaWNrKTtcclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNvbmRpdGlvblBpY2tlcik7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5hZGRFdmVudExpc3RlbmVyKExFWC5ORVdfQ09ORElUSU9OX0VWRU5UX05BTUUsIHRoaXMub25OZXdDb25kaXRpb24pO1xyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihMRVguUkVNT1ZFX0NPTkRJVElPTl9FVkVOVF9OQU1FLCB0aGlzLm9uUmVtb3ZlQ29uZGl0aW9uKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgJ2ZhbHNlJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uTGluZUNsaWNrKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoTEVYLk5FV19DT05ESVRJT05fRVZFTlRfTkFNRSwgdGhpcy5vbk5ld0NvbmRpdGlvbik7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICBMRVguUkVNT1ZFX0NPTkRJVElPTl9FVkVOVF9OQU1FLFxyXG4gICAgICB0aGlzLm9uUmVtb3ZlQ29uZGl0aW9uXHJcbiAgICApO1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuY29uZGl0aW9uUGlja2VyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25MaW5lQ2xpY2soZXZlbnQ6IExpbmVDbGlja0V2ZW50KSB7XHJcbiAgICBpZiAoIShldmVudC5wYXlsb2FkLnBhdGggaW5zdGFuY2VvZiBQb2x5Z29uKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNDbGlja1RpbWVzdGFtcCA9IHRoaXMucHJldmlvdXNMaW5lQ2xpY2tUaW1lc3RhbXA7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMucHJldmlvdXNMaW5lQ2xpY2tUaW1lc3RhbXAgPSBjdXJyZW50VGltZXN0YW1wO1xyXG5cclxuICAgIGlmIChjdXJyZW50VGltZXN0YW1wIC0gcHJldmlvdXNDbGlja1RpbWVzdGFtcCA8PSBjb25maWd1cmF0aW9uLmRvdWJsZUNsaWNrTWF4RGVsYXkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uUGlja2VyLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgJ2ZhbHNlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb25kaXRpb25QaWNrZXIuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCBldmVudC5wYXlsb2FkLnBvc2l0aW9uLngudG9TdHJpbmcoKSk7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIGV2ZW50LnBheWxvYWQucG9zaXRpb24ueS50b1N0cmluZygpKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnVwZGF0ZVNlbGVjdGVkTGluZShldmVudC5wYXlsb2FkLmxpbmUsIGV2ZW50LnBheWxvYWQucGF0aCk7XHJcbiAgICB0aGlzLmNvbmRpdGlvblBpY2tlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScsICd0cnVlJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTmV3Q29uZGl0aW9uKGV2ZW50OiBDdXN0b21FdmVudCkge1xyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvbiA9IGV2ZW50LmRldGFpbDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsaW5lQ29uZGl0aW9uLnZlcmlmeUNhbkJlQXBwbGllZCgpO1xyXG4gICAgICB0aGlzLmNvbmRpdGlvbk1hdGNoZXIudmVyaWZ5Q29uZGl0aW9uQWxsb3dlZChsaW5lQ29uZGl0aW9uKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBhbGVydChgQ2Fubm90IGFwcGx5IGNvbmRpdGlvbjogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbGluZUNvbmRpdGlvbi5pc01ldCgpKSB7XHJcbiAgICAgIHRoaXMuZml4VW5tZXRMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGxpbmVDb25kaXRpb24ucG9seWdvbi5hZGRMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb24pO1xyXG4gICAgdGhpcy5kaXNwYXRjaFVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaXhVbm1ldExpbmVDb25kaXRpb24obGluZUNvbmRpdGlvbjogTGluZUNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgcmVhbFBvbHlnb24gPSBsaW5lQ29uZGl0aW9uLnBvbHlnb247XHJcbiAgICBjb25zdCBwMUluZGV4ID0gcmVhbFBvbHlnb24uZmluZFBvaW50SW5kZXgobGluZUNvbmRpdGlvbi5saW5lLnAxKTtcclxuICAgIGNvbnN0IHAySW5kZXggPSByZWFsUG9seWdvbi5maW5kUG9pbnRJbmRleChsaW5lQ29uZGl0aW9uLmxpbmUucDIpO1xyXG4gICAgY29uc3QgcG9seWdvbkNsb25lID0gcmVhbFBvbHlnb24uY2xvbmUoKTtcclxuXHJcbiAgICBjb25zdCBjb25kaXRpb25GaXhlciA9IG5ldyBCaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIocG9seWdvbkNsb25lLCBwb2x5Z29uQ2xvbmUuZ2V0VmVydGV4KHAxSW5kZXgpLCBbXHJcbiAgICAgIGxpbmVDb25kaXRpb24uZHVwbGljYXRlRm9yTmV3TGluZShcclxuICAgICAgICBuZXcgTGluZShwb2x5Z29uQ2xvbmUuZ2V0VmVydGV4KHAxSW5kZXgpLCBwb2x5Z29uQ2xvbmUuZ2V0VmVydGV4KHAySW5kZXgpKSxcclxuICAgICAgICBwb2x5Z29uQ2xvbmVcclxuICAgICAgKVxyXG4gICAgXSk7XHJcbiAgICBjb25kaXRpb25GaXhlci50cnlGaXgoKTtcclxuXHJcbiAgICBpZiAoIWNvbmRpdGlvbkZpeGVyLmZpeFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgY29uZGl0aW9uRml4ZXIuc3RhcnRpbmdQb2ludCA9IHBvbHlnb25DbG9uZS5nZXRWZXJ0ZXgocDFJbmRleCk7XHJcbiAgICAgIGNvbmRpdGlvbkZpeGVyLnJlc2V0KCk7XHJcbiAgICAgIGNvbmRpdGlvbkZpeGVyLnRyeUZpeCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29uZGl0aW9uRml4ZXIuZml4U3VjY2Vzc2Z1bCkge1xyXG4gICAgICByZXR1cm4gYWxlcnQoJ0Nhbm5vdCBhZGQgYSBjb25kaXRpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICByZWFsUG9seWdvbi5tb3ZlVG8ocG9seWdvbkNsb25lKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SZW1vdmVDb25kaXRpb24oZXZlbnQ6IEN1c3RvbUV2ZW50KSB7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uID0gZXZlbnQuZGV0YWlsO1xyXG5cclxuICAgIGxpbmVDb25kaXRpb24ucG9seWdvbi5yZW1vdmVMaW5lQ29uZGl0aW9uKGxpbmVDb25kaXRpb24pO1xyXG4gICAgdGhpcy5kaXNwYXRjaFVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaFVwZGF0ZSgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFJlbmRlckV2ZW50KCkpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgU3luY0NvbXBvbmVudHNFdmVudCgpKTtcclxuICAgIHRoaXMuY29uZGl0aW9uUGlja2VyLnVwZGF0ZUJ1dHRvbnMoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29uZGl0aW9ucy9VSUNvbmRpdGlvbkNvbnRyb2xsZXIudHMiLCJpbXBvcnQgeyBGaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9GaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQgeyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9Ib3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQgeyBWZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcblxyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50JztcclxuaW1wb3J0IHtcclxuICBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyxcclxuICBTZWxlY3RlZFRhcmdldFxyXG59IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzJztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcblxyXG5pbXBvcnQgJ3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnNjc3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvblBpY2tlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdGVkVGFyZ2V0OiBTZWxlY3RlZFRhcmdldCA9IHtcclxuICAgIGxpbmU6IG51bGwsXHJcbiAgICBwb2x5Z29uOiBudWxsXHJcbiAgfTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGxpbmVDb25kaXRpb25FbGVtZW50czogTGluZUNvbmRpdGlvbkVsZW1lbnRbXTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmRpdGlvbkVsZW1lbnRzQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNsb3NlQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5vbk1vdXNlRG93biA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuaGlkZSA9IHRoaXMuaGlkZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2NvbmRpdGlvbi1waWNrZXJfX2Nsb3NlLWJ1dHRvbic7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xyXG5cclxuICAgIHRoaXMuY29uZGl0aW9uRWxlbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29uZGl0aW9uRWxlbWVudHNDb250YWluZXIuY2xhc3NOYW1lID0gJ2NvbmRpdGlvbi1lbGVtZW50cy1jb250YWluZXInO1xyXG5cclxuICAgIHRoaXMubGluZUNvbmRpdGlvbkVsZW1lbnRzID0gdGhpcy5jcmVhdGVMaW5lQ29uZGl0aW9uRWxlbWVudHMoKTtcclxuICAgIHRoaXMubGluZUNvbmRpdGlvbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB0aGlzLmNvbmRpdGlvbkVsZW1lbnRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpKTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcbiAgICByZXR1cm4gWydkYXRhLXgnLCAnZGF0YS15JywgJ2RhdGEtdmlzaWJsZSddO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5jb25kaXRpb25FbGVtZW50c0NvbnRhaW5lcik7XHJcblxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNvbmRpdGlvbkVsZW1lbnRzQ29udGFpbmVyKTtcclxuXHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlTmFtZTogc3RyaW5nLCBfb2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xyXG4gICAgc3dpdGNoIChhdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgJ2RhdGEteCc6XHJcbiAgICAgIGNhc2UgJ2RhdGEteSc6XHJcbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnZGF0YS12aXNpYmxlJzpcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVTZWxlY3RlZExpbmUobGluZTogTGluZSwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lID0gbGluZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbiA9IHBvbHlnb247XHJcblxyXG4gICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQnV0dG9ucygpIHtcclxuICAgIHRoaXMubGluZUNvbmRpdGlvbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnVwZGF0ZUJ1dHRvbigpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICB0aGlzLnN0eWxlLmxlZnQgPSBgJHt0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgfHwgMH1weGA7XHJcbiAgICB0aGlzLnN0eWxlLnRvcCA9IGAke3RoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSB8fCAwfXB4YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudCAmJiBldmVudC5zcmNFbGVtZW50ICYmIHRoaXMuY29udGFpbnMoZXZlbnQuc3JjRWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoaWRlKCkge1xyXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScsICdmYWxzZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVMaW5lQ29uZGl0aW9uRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBsaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llczogTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMgPSB7XHJcbiAgICAgIHNlbGVjdGVkVGFyZ2V0OiB0aGlzLnNlbGVjdGVkVGFyZ2V0XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBbXHJcbiAgICAgIG5ldyBGaXhlZExlbmd0aENvbmRpdGlvbkVsZW1lbnQobGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpLFxyXG4gICAgICBuZXcgVmVydGljYWxMaW5lQ29uZGl0aW9uRWxlbWVudChsaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyksXHJcbiAgICAgIG5ldyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQobGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMpXHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtY29uZGl0aW9uLXBpY2tlcicsIENvbmRpdGlvblBpY2tlcik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvQ29uZGl0aW9uUGlja2VyLnRzIiwiaW1wb3J0IHsgRml4ZWRMZW5ndGhMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9GaXhlZExlbmd0aExpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnQgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudCc7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzIH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpeGVkTGVuZ3RoQ29uZGl0aW9uRWxlbWVudCBleHRlbmRzIExpbmVDb25kaXRpb25FbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzKSB7XHJcbiAgICBzdXBlcihkZXBlbmRlbmNpZXMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uLnRleHRDb250ZW50ID0gJ0ZpeGVkIGxlbmd0aCc7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0TGluZUNvbmRpdGlvbkNvbnN0cnVjdG9yKCkge1xyXG4gICAgcmV0dXJuIEZpeGVkTGVuZ3RoTGluZUNvbmRpdGlvbjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVOZXdDb25kaXRpb24oKTogTGluZUNvbmRpdGlvbiB8IG51bGwge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUgfHwgIXRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBub3Qgc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbGVuZ3RoID0gTnVtYmVyLk5hTjtcclxuICAgIGNvbnN0IG9yaWdpbmFsTGluZUxlbmd0aCA9IHRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZS5nZXRMZW5ndGgoKS50b0ZpeGVkKDEpO1xyXG5cclxuICAgIHdoaWxlIChOdW1iZXIuaXNOYU4obGVuZ3RoKSB8fCBsZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBwcm9tcHQoJ1Byb3ZpZGUgdGhlIGZpeGVkIGxlbmd0aCcsIG9yaWdpbmFsTGluZUxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxlbmd0aCA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgRml4ZWRMZW5ndGhMaW5lQ29uZGl0aW9uKFxyXG4gICAgICB0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUsXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbixcclxuICAgICAgbGVuZ3RoXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdmaXhlZC1sZW5ndGgtY29uZGl0aW9uJywgRml4ZWRMZW5ndGhDb25kaXRpb25FbGVtZW50KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvRml4ZWRMZW5ndGhDb25kaXRpb25FbGVtZW50LnRzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9MaW5lQ29uZGl0aW9uRWxlbWVudC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5saW5lLWNvbmRpdGlvbi0tYWN0aXZlIC5saW5lLWNvbmRpdGlvbl9fYnV0dG9uIHtcXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggMnB4ICMxYjk3ZGY7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgSG9yaXpvbnRhbExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0hvcml6b250YWxMaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IExpbmVDb25kaXRpb25FbGVtZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvTGluZUNvbmRpdGlvbkVsZW1lbnQnO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQgZXh0ZW5kcyBMaW5lQ29uZGl0aW9uRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBMaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcykge1xyXG4gICAgc3VwZXIoZGVwZW5kZW5jaWVzKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbi50ZXh0Q29udGVudCA9ICdIb3Jpem9udGFsJztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRMaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IoKSB7XHJcbiAgICByZXR1cm4gSG9yaXpvbnRhbExpbmVDb25kaXRpb247XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlTmV3Q29uZGl0aW9uKCk6IExpbmVDb25kaXRpb24gfCBudWxsIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZFRhcmdldC5saW5lIHx8ICF0aGlzLnNlbGVjdGVkVGFyZ2V0LnBvbHlnb24pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgbm90IHNlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBIb3Jpem9udGFsTGluZUNvbmRpdGlvbih0aGlzLnNlbGVjdGVkVGFyZ2V0LmxpbmUsIHRoaXMuc2VsZWN0ZWRUYXJnZXQucG9seWdvbik7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2hvcml6b250YWwtbGluZS1jb25kaXRpb24nLCBIb3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9Ib3Jpem9udGFsTGluZUNvbmRpdGlvbkVsZW1lbnQudHMiLCJpbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgVmVydGljYWxMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9WZXJ0aWNhbExpbmVDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uRWxlbWVudCB9IGZyb20gJ3VpL2NvbXBvbmVudHMvbGluZS1jb25kaXRpb25zL0xpbmVDb25kaXRpb25FbGVtZW50JztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbkVsZW1lbnREZXBlbmRlbmNpZXMgfSBmcm9tICd1aS9jb21wb25lbnRzL2xpbmUtY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uRWxlbWVudERlcGVuZGVuY2llcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVydGljYWxMaW5lQ29uZGl0aW9uRWxlbWVudCBleHRlbmRzIExpbmVDb25kaXRpb25FbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IExpbmVDb25kaXRpb25FbGVtZW50RGVwZW5kZW5jaWVzKSB7XHJcbiAgICBzdXBlcihkZXBlbmRlbmNpZXMpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uLnRleHRDb250ZW50ID0gJ1ZlcnRpY2FsJztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRMaW5lQ29uZGl0aW9uQ29uc3RydWN0b3IoKSB7XHJcbiAgICByZXR1cm4gVmVydGljYWxMaW5lQ29uZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU5ld0NvbmRpdGlvbigpOiBMaW5lQ29uZGl0aW9uIHwgbnVsbCB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSB8fCAhdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG5vdCBzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVmVydGljYWxMaW5lQ29uZGl0aW9uKHRoaXMuc2VsZWN0ZWRUYXJnZXQubGluZSwgdGhpcy5zZWxlY3RlZFRhcmdldC5wb2x5Z29uKTtcclxuICB9XHJcbn1cclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndmVydGljYWwtbGluZS1jb25kaXRpb24nLCBWZXJ0aWNhbExpbmVDb25kaXRpb25FbGVtZW50KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvY29tcG9uZW50cy9saW5lLWNvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uRWxlbWVudC50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0NvbmRpdGlvblBpY2tlci5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0NvbmRpdGlvblBpY2tlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0NvbmRpdGlvblBpY2tlci5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91aS9jb21wb25lbnRzL0NvbmRpdGlvblBpY2tlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJhcHAtY29uZGl0aW9uLXBpY2tlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSg1cHgsIC01MCUpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcGFkZGluZzogMC42ZW07XFxuICBib3JkZXI6IHNvbGlkIDFweCAjMjIyO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMmUyZTI7XFxuICBib3gtc2hhZG93OiAycHggMnB4IDVweCBibGFjaztcXG4gIHotaW5kZXg6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxcblxcbi5jb25kaXRpb24tZWxlbWVudHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmNvbmRpdGlvbi1lbGVtZW50cy1jb250YWluZXIgKiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDsgfVxcbiAgICAuY29uZGl0aW9uLWVsZW1lbnRzLWNvbnRhaW5lciAqOmxhc3QtY2hpbGQge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7IH1cXG5cXG4uY29uZGl0aW9uLXBpY2tlcl9fY2xvc2UtYnV0dG9uIHtcXG4gIG1hcmdpbjogLTJweCAtMnB4IDNweCAwO1xcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICBmb250LXNpemU6IDEwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvdWkvY29tcG9uZW50cy9Db25kaXRpb25QaWNrZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnY29tbW9uL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBMaW5lQ29uZGl0aW9uIH0gZnJvbSAnY29uZGl0aW9ucy9MaW5lQ29uZGl0aW9uJztcclxuXHJcbmV4cG9ydCBlbnVtIEZpeGluZ0RpcmVjdGlvbiB7XHJcbiAgTm9ybWFsLFxyXG4gIFJldmVyc2VcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVuaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIge1xyXG4gIHB1YmxpYyBkaXJlY3Rpb246IEZpeGluZ0RpcmVjdGlvbjtcclxuICBwdWJsaWMgc3RhcnRpbmdQb2ludDogUG9pbnQ7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgcG9seWdvbjogUG9seWdvbjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGFkZGl0aW9uYWxMaW5lQ29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdO1xyXG5cclxuICBwcml2YXRlIF9maXhTdWNjZXNzZnVsPzogYm9vbGVhbjtcclxuICBwcml2YXRlIF9sYXN0TG9ja2VkVmVydGV4SW5kZXg/OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcG9seWdvbjogUG9seWdvbixcclxuICAgIHN0YXJ0aW5nUG9pbnQ6IFBvaW50LFxyXG4gICAgYWRkaXRpb25hbExpbmVDb25kaXRpb25zOiBMaW5lQ29uZGl0aW9uW10gPSBbXSxcclxuICAgIGRpcmVjdGlvbjogRml4aW5nRGlyZWN0aW9uID0gRml4aW5nRGlyZWN0aW9uLk5vcm1hbFxyXG4gICkge1xyXG4gICAgdGhpcy5wb2x5Z29uID0gcG9seWdvbjtcclxuICAgIHRoaXMuc3RhcnRpbmdQb2ludCA9IHN0YXJ0aW5nUG9pbnQ7XHJcbiAgICB0aGlzLmFkZGl0aW9uYWxMaW5lQ29uZGl0aW9ucyA9IGFkZGl0aW9uYWxMaW5lQ29uZGl0aW9ucztcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmaXhTdWNjZXNzZnVsKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RyeUZpeCBuZWVkcyB0byBiZSBjYWxsZWQgZmlyc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZml4U3VjY2Vzc2Z1bDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbGFzdExvY2tlZFZlcnRleEluZGV4KCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5fbGFzdExvY2tlZFZlcnRleEluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0cnlGaXggbmVlZHMgdG8gYmUgY2FsbGVkIGZpcnN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2xhc3RMb2NrZWRWZXJ0ZXhJbmRleDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cnlGaXgocG9pbnRJbmRleEJvdW5kYXJ5PzogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fZml4U3VjY2Vzc2Z1bCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZGl0aW9uRml4ZXIgbmVlZHMgdG8gYmUgcmVzZXQgYmVmb3JlIGZpeGluZyBhZ2FpbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9seWdvbi5nZXRWZXJ0aWNlcygpO1xyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbnMgPSBbLi4udGhpcy5wb2x5Z29uLmdldExpbmVDb25kaXRpb25zKCksIC4uLnRoaXMuYWRkaXRpb25hbExpbmVDb25kaXRpb25zXTtcclxuICAgIGNvbnN0IHN0YXJ0aW5nUG9pbnRJbmRleCA9IHRoaXMucG9seWdvbi5maW5kUG9pbnRJbmRleCh0aGlzLnN0YXJ0aW5nUG9pbnQpO1xyXG4gICAgbGV0IGxvY2tlZFBvaW50SW5kZXggPSBzdGFydGluZ1BvaW50SW5kZXg7XHJcbiAgICBsZXQgY3VycmVudFBvaW50SW5kZXggPSB0aGlzLmdldE5leHRQb2ludEluZGV4KGxvY2tlZFBvaW50SW5kZXgpO1xyXG5cclxuICAgIGlmICghcG9pbnRJbmRleEJvdW5kYXJ5KSB7XHJcbiAgICAgIHBvaW50SW5kZXhCb3VuZGFyeSA9IHN0YXJ0aW5nUG9pbnRJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBjb25zdCBjdXJyZW50TGluZSA9IG5ldyBMaW5lKHBvaW50c1tsb2NrZWRQb2ludEluZGV4XSwgcG9pbnRzW2N1cnJlbnRQb2ludEluZGV4XSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRMaW5lQ29uZGl0aW9ucyA9IGxpbmVDb25kaXRpb25zLmZpbHRlcihsaW5lQ29uZGl0aW9uID0+XHJcbiAgICAgICAgbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhjdXJyZW50TGluZSlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IHVubWV0TGluZUNvbmRpdGlvbnMgPSBjdXJyZW50TGluZUNvbmRpdGlvbnNcclxuICAgICAgICAuZmlsdGVyKGxpbmVDb25kaXRpb24gPT4gIWxpbmVDb25kaXRpb24uaXNNZXQoKSk7XHJcblxyXG4gICAgICBpZiAodW5tZXRMaW5lQ29uZGl0aW9ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aGlzLl9maXhTdWNjZXNzZnVsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9sYXN0TG9ja2VkVmVydGV4SW5kZXggPSBsb2NrZWRQb2ludEluZGV4O1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjdXJyZW50UG9pbnRJbmRleCA9PT0gcG9pbnRJbmRleEJvdW5kYXJ5KSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVubWV0TGluZUNvbmRpdGlvbnNcclxuICAgICAgICAuZm9yRWFjaChsaW5lQ29uZGl0aW9uID0+IGxpbmVDb25kaXRpb24uZml4KHBvaW50c1tsb2NrZWRQb2ludEluZGV4XSkpO1xyXG5cclxuICAgICAgbG9ja2VkUG9pbnRJbmRleCA9IGN1cnJlbnRQb2ludEluZGV4O1xyXG4gICAgICBjdXJyZW50UG9pbnRJbmRleCA9IHRoaXMuZ2V0TmV4dFBvaW50SW5kZXgoY3VycmVudFBvaW50SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpIHtcclxuICAgIHRoaXMuX2ZpeFN1Y2Nlc3NmdWwgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl9sYXN0TG9ja2VkVmVydGV4SW5kZXggPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE5leHRQb2ludEluZGV4KGN1cnJlbnRQb2ludEluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRml4aW5nRGlyZWN0aW9uLlJldmVyc2UpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucG9seWdvbi5nZXRQcmV2aW91c1BvaW50SW5kZXgoY3VycmVudFBvaW50SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnBvbHlnb24uZ2V0TmV4dFBvaW50SW5kZXgoY3VycmVudFBvaW50SW5kZXgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL2ZpeGVycy9VbmlkaXJlY3Rpb25hbENvbmRpdGlvbkZpeGVyLnRzIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciB7XHJcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIHByaXZhdGUgY2FudmFzQ2xpZW50UmVjdDogQ2xpZW50UmVjdDtcclxuXHJcbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLnVwZGF0ZUNhbnZhc09mZnNldCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZUNhbnZhc09mZnNldCgpIHtcclxuICAgIHRoaXMuY2FudmFzQ2xpZW50UmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBvaW50RnJvbU1vdXNlRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQoXHJcbiAgICAgIGV2ZW50LnBhZ2VYIC0gdGhpcy5jYW52YXNDbGllbnRSZWN0LmxlZnQsXHJcbiAgICAgIGV2ZW50LnBhZ2VZIC0gdGhpcy5jYW52YXNDbGllbnRSZWN0LnRvcFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyLnRzIiwiaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdjb21tb24vTGF5ZXInO1xyXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnY29tbW9uL1BhdGgnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb24gfSBmcm9tICdjb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdSZW5kZXJlcic7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5pbXBvcnQgeyBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgfSBmcm9tICd1aS9Nb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXInO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IFBvaW50Q2xpY2tFdmVudCB9IGZyb20gJ2V2ZW50cy9Qb2ludENsaWNrRXZlbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcblxyXG5pbnRlcmZhY2UgTmV3UG9seWdvblVJQ29udHJvbGxlckRlcGVuZGVuY2llcyB7XHJcbiAgYXBwbGljYXRpb25VSUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBtb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI6IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICBwb2x5Z29uTGF5ZXI6IExheWVyO1xyXG4gIHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICBzdGFnZTogU3RhZ2U7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOZXdQb2x5Z29uVUlDb250cm9sbGVyIGltcGxlbWVudHMgVUlTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0YWdlOiBTdGFnZTtcclxuICBwcml2YXRlIHJlYWRvbmx5IG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIHByaXZhdGUgdW5maW5pc2hlZFBhdGg6IFBhdGg7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBwYXRoTGF5ZXIgPSBuZXcgTGF5ZXIoTEVYLlBBVEhfTEFZRVJfTkFNRSk7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBwb2x5Z29uTGF5ZXI6IExheWVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IE5ld1BvbHlnb25VSUNvbnRyb2xsZXJEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lciA9IGRlcGVuZGVuY2llcy5hcHBsaWNhdGlvblVJQ29udGFpbmVyO1xyXG4gICAgdGhpcy5jYW52YXMgPSBkZXBlbmRlbmNpZXMuY2FudmFzO1xyXG4gICAgdGhpcy5zdGFnZSA9IGRlcGVuZGVuY2llcy5zdGFnZTtcclxuICAgIHRoaXMucG9seWdvbkxheWVyID0gZGVwZW5kZW5jaWVzLnBvbHlnb25MYXllcjtcclxuICAgIHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyID0gZGVwZW5kZW5jaWVzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICAgIHRoaXMucmVuZGVyZXIgPSBkZXBlbmRlbmNpZXMucmVuZGVyZXI7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gICAgdGhpcy5jbG9zZVBhdGggPSB0aGlzLmNsb3NlUGF0aC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbk1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Qb2ludENsaWNrID0gdGhpcy5vblBvaW50Q2xpY2suYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25LZXlEb3duID0gdGhpcy5vbktleURvd24uYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5zdGFnZS5sYXllcnMucHVzaCh0aGlzLnBhdGhMYXllcik7XHJcbiAgICB0aGlzLnN0YXJ0TmV3VW5maW5pc2hlZFBhdGgoKTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihQb2ludENsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uUG9pbnRDbGljayk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFBvaW50Q2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25Qb2ludENsaWNrKTtcclxuICAgIHRoaXMuc3RhZ2UucmVtb3ZlTGF5ZXIodGhpcy5wYXRoTGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZE5ld1BvaW50KHBvaW50OiBQb2ludCkge1xyXG4gICAgdGhpcy51bmZpbmlzaGVkUGF0aC5hZGRWZXJ0ZXgocG9pbnQpO1xyXG4gICAgdGhpcy5kaXNwYXRjaFVwZGF0ZVVJRXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBjb25zdCB1bmZpbmlzaGVkUGF0aFZlcnRpY2VzQ291bnQgPSB0aGlzLnVuZmluaXNoZWRQYXRoLmdldFZlcnRpY2VzQ291bnQoKTtcclxuICAgIGlmICh1bmZpbmlzaGVkUGF0aFZlcnRpY2VzQ291bnQgPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxhc3RQb2ludCA9IHRoaXMudW5maW5pc2hlZFBhdGguZ2V0VmVydGV4KHVuZmluaXNoZWRQYXRoVmVydGljZXNDb3VudCAtIDEpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcblxyXG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lci5nZXRQb2ludEZyb21Nb3VzZUV2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMucmVuZGVyZXIuZHJhd0xpbmUobGFzdFBvaW50LCBwb2ludCwgY29uZmlndXJhdGlvbi5uZXdMaW5lUHJldmlld1Byb3BlcnRpZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblBvaW50Q2xpY2soZXZlbnQ6IFBvaW50Q2xpY2tFdmVudCkge1xyXG4gICAgY29uc3QgcGF0aFBvaW50Q29tcG9uZW50ID0gZXZlbnQucGF5bG9hZDtcclxuXHJcbiAgICBpZiAocGF0aFBvaW50Q29tcG9uZW50LnBhdGggPT09IHRoaXMudW5maW5pc2hlZFBhdGggJiYgcGF0aFBvaW50Q29tcG9uZW50LmluaXRpYWwpIHtcclxuICAgICAgZXZlbnQuaGFuZGxlZCA9IHRydWU7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgcGF0aFBvaW50Q29tcG9uZW50LmluaXRpYWwgPSBmYWxzZTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhbGVydChlcnJvci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydE5ld1VuZmluaXNoZWRQYXRoKCkge1xyXG4gICAgdGhpcy51bmZpbmlzaGVkUGF0aCA9IG5ldyBQYXRoKFtdLCBjb25maWd1cmF0aW9uLm5ld1BvbHlnb25MaW5lUHJvcGVydGllcyk7XHJcbiAgICB0aGlzLnBhdGhMYXllci5wYXRocy5wdXNoKHRoaXMudW5maW5pc2hlZFBhdGgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZVBhdGgoKSB7XHJcbiAgICBpZiAodGhpcy51bmZpbmlzaGVkUGF0aC5nZXRWZXJ0aWNlc0NvdW50KCkgPCBjb25maWd1cmF0aW9uLm1pblBvbHlnb25Qb2ludHMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQb2x5Z29uIG11c3QgaGF2ZSBhdCBsZWFzdCAke2NvbmZpZ3VyYXRpb24ubWluUG9seWdvblBvaW50c30gdmVydGljZXNgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVuZmluaXNoZWRQYXRoLmxpbmVQcm9wZXJ0aWVzID0gY29uZmlndXJhdGlvbi5wb2x5Z29uTGluZVByb3BlcnRpZXM7XHJcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24odGhpcy51bmZpbmlzaGVkUGF0aCk7XHJcbiAgICB0aGlzLnBvbHlnb25MYXllci5wYXRocy5wdXNoKHBvbHlnb24pO1xyXG4gICAgdGhpcy5wYXRoTGF5ZXIucmVtb3ZlUGF0aCh0aGlzLnVuZmluaXNoZWRQYXRoKTtcclxuXHJcbiAgICB0aGlzLnN0YXJ0TmV3VW5maW5pc2hlZFBhdGgoKTtcclxuICAgIHRoaXMuZGlzcGF0Y2hVcGRhdGVVSUV2ZW50cygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaFVwZGF0ZVVJRXZlbnRzKCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBTeW5jQ29tcG9uZW50c0V2ZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICBjYXNlIDI3OlxyXG4gICAgICAgIHRoaXMucGF0aExheWVyLnJlbW92ZVBhdGgodGhpcy51bmZpbmlzaGVkUGF0aCk7XHJcbiAgICAgICAgdGhpcy5zdGFydE5ld1VuZmluaXNoZWRQYXRoKCk7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaFVwZGF0ZVVJRXZlbnRzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9OZXdQb2x5Z29uVUlDb250cm9sbGVyLnRzIiwiaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdTdGFnZSc7XHJcbmltcG9ydCB7IE1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lciB9IGZyb20gJ3VpL01vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcic7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcblxyXG5pbnRlcmZhY2UgUGF0aERyYWdnaW5nU2VydmljZURlcGVuZGVuY2llcyB7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXRoRHJhZ2dpbmdTZXJ2aWNlIGltcGxlbWVudHMgVUlTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG5cclxuICBwcml2YXRlIHBhdGhUb0RyYWc6IFBhdGggfCB1bmRlZmluZWQ7XHJcbiAgcHJpdmF0ZSBwcmV2aW91c1BvaW50OiBQb2ludCB8IHVuZGVmaW5lZDtcclxuICBwcml2YXRlIF9pc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUGF0aERyYWdnaW5nU2VydmljZURlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy5zdGFnZSA9IGRlcGVuZGVuY2llcy5zdGFnZTtcclxuICAgIHRoaXMuY2FudmFzID0gZGVwZW5kZW5jaWVzLmNhbnZhcztcclxuICAgIHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyID0gZGVwZW5kZW5jaWVzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuXHJcbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbk1vdXNlVXAgPSB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbk1vdXNlT3V0ID0gdGhpcy5vbk1vdXNlT3V0LmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIC8vIFRPRE86IHBvc3NpYmxlIHBvbHlnb24gZ2hvc3QgbGF5ZXIgaGVyZVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN0b3BEcmFnZ2luZ1BhdGgoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNEcmFnZ2luZygpIHtcclxuICAgIHJldHVybiB0aGlzLl9pc0RyYWdnaW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXJ0TW92aW5nUGF0aChldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lci5nZXRQb2ludEZyb21Nb3VzZUV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICB0aGlzLnBhdGhUb0RyYWcgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnByZXZpb3VzUG9pbnQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLnN0YWdlLmxheWVycykge1xyXG4gICAgICBmb3IgKGNvbnN0IHBhdGggb2YgbGF5ZXIucGF0aHMpIHtcclxuICAgICAgICBpZiAoIXBhdGguaXNQb2ludEluQm91bmRpbmdCb3gocG9pbnQpKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF0aFRvRHJhZyA9IHBhdGg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMucGF0aFRvRHJhZykge1xyXG4gICAgICByZXR1cm4gYWxlcnQoJ0Nhbm5vdCBkcmFnIHBhdGggLSBubyBwYXRoIGZvdW5kLCBwb2ludCBpcyBub3QgaW4gdGhlIGJvdW5kaW5nIGJveCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldmlvdXNQb2ludCA9IHBvaW50O1xyXG4gICAgdGhpcy5faXNEcmFnZ2luZyA9IHRydWU7XHJcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApO1xyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLm9uTW91c2VPdXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKTtcclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5vbk1vdXNlT3V0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5wYXRoVG9EcmFnIHx8ICF0aGlzLnByZXZpb3VzUG9pbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIuZ2V0UG9pbnRGcm9tTW91c2VFdmVudChldmVudCk7XHJcbiAgICBjb25zdCB0cmFuc2l0aW9uVmVjdG9yID0gUG9pbnQuc3VidHJhY3QocG9pbnQsIHRoaXMucHJldmlvdXNQb2ludCk7XHJcblxyXG4gICAgZm9yIChjb25zdCBwYXRoUG9pbnQgb2YgdGhpcy5wYXRoVG9EcmFnLmdldFZlcnRpY2VzKCkpIHtcclxuICAgICAgcGF0aFBvaW50Lm1vdmVUbyhQb2ludC5hZGQocGF0aFBvaW50LCB0cmFuc2l0aW9uVmVjdG9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBTeW5jQ29tcG9uZW50c0V2ZW50KCkpO1xyXG5cclxuICAgIHRoaXMucHJldmlvdXNQb2ludCA9IHBvaW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbk1vdXNlVXAoX2V2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICB0aGlzLnN0b3BEcmFnZ2luZ1BhdGgoKTtcclxuICAgIHRoaXMuY2FuY2VsTmV4dENsaWNrRXZlbnQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZU91dChfZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIHRoaXMuc3RvcERyYWdnaW5nUGF0aCgpO1xyXG4gICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmdQYXRoKCkge1xyXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5wYXRoVG9EcmFnID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5wcmV2aW91c1BvaW50ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjYW5jZWxOZXh0Q2xpY2tFdmVudCgpIHtcclxuICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyLCB0cnVlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvUGF0aERyYWdnaW5nU2VydmljZS50cyIsImltcG9ydCB7IENPTE9SUyB9IGZyb20gJ2NvbW1vbi9DT0xPUlMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJ2NvbW1vbi9MYXllcic7XHJcbmltcG9ydCB7IExpbmVQcm9wZXJ0aWVzIH0gZnJvbSAnY29tbW9uL0xpbmVQcm9wZXJ0aWVzJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgTEVYIH0gZnJvbSAnTEVYJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdTdGFnZSc7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDb250aW51b3VzQ29uZGl0aW9uRml4ZXIgfSBmcm9tICdjb25kaXRpb25zL2ZpeGVycy9Db250aW51b3VzQ29uZGl0aW9uRml4ZXInO1xyXG5cclxuaW1wb3J0IHsgRmluaXNoUG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9GaW5pc2hQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvUG9pbnREcmFnRXZlbnQnO1xyXG5pbXBvcnQgeyBTdGFydFBvaW50RHJhZ0V2ZW50IH0gZnJvbSAnZXZlbnRzL3BvaW50LWRyYWcvU3RhcnRQb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuXHJcbmludGVyZmFjZSBQb2ludERyYWdnaW5nU2VydmljZURlcGVuZGVuY2llcyB7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnREcmFnZ2luZ1NlcnZpY2UgaW1wbGVtZW50cyBVSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSBwYXRoR2hvc3RMYXllcjogTGF5ZXI7XHJcbiAgcHJpdmF0ZSBjb250aW51b3VzQ29uZGl0aW9uRml4ZXI6IENvbnRpbnVvdXNDb25kaXRpb25GaXhlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnREcmFnZ2luZ1NlcnZpY2VEZXBlbmRlbmNpZXMpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuICAgIHRoaXMuc3RhZ2UgPSBkZXBlbmRlbmNpZXMuc3RhZ2U7XHJcblxyXG4gICAgdGhpcy5vblN0YXJ0UG9pbnREcmFnID0gdGhpcy5vblN0YXJ0UG9pbnREcmFnLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uRmluaXNoUG9pbnREcmFnID0gdGhpcy5vbkZpbmlzaFBvaW50RHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vblBvaW50RHJhZyA9IHRoaXMub25Qb2ludERyYWcuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5wYXRoR2hvc3RMYXllciA9IG5ldyBMYXllcihMRVguUEFUSF9HSE9TVF9MQVlFUl9OQU1FKTtcclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLnNwbGljZSgwLCAwLCB0aGlzLnBhdGhHaG9zdExheWVyKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFN0YXJ0UG9pbnREcmFnRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uU3RhcnRQb2ludERyYWcpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihGaW5pc2hQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25GaW5pc2hQb2ludERyYWcpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuYWRkRXZlbnRMaXN0ZW5lcihQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25Qb2ludERyYWcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnBhdGhHaG9zdExheWVyLnBhdGhzID0gW107XHJcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUxheWVyKHRoaXMucGF0aEdob3N0TGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoU3RhcnRQb2ludERyYWdFdmVudC5ldmVudFR5cGUsIHRoaXMub25TdGFydFBvaW50RHJhZyk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICBGaW5pc2hQb2ludERyYWdFdmVudC5ldmVudFR5cGUsXHJcbiAgICAgIHRoaXMub25GaW5pc2hQb2ludERyYWdcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5yZW1vdmVFdmVudExpc3RlbmVyKFBvaW50RHJhZ0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5vblBvaW50RHJhZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU3RhcnRQb2ludERyYWcoZXZlbnQ6IFN0YXJ0UG9pbnREcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG5cclxuICAgIGlmIChldmVudC5wYXlsb2FkLnBhdGggaW5zdGFuY2VvZiBQb2x5Z29uKSB7XHJcbiAgICAgIHRoaXMuY29udGludW91c0NvbmRpdGlvbkZpeGVyID0gbmV3IENvbnRpbnVvdXNDb25kaXRpb25GaXhlcihldmVudC5wYXlsb2FkLnBhdGgsIGV2ZW50LnBheWxvYWQucG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29uZmlndXJhdGlvbi5kaXNwbGF5UGF0aEdob3N0V2hlbkRyYWdnaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXRoID0gZXZlbnQucGF5bG9hZC5wYXRoLmNsb25lKCk7XHJcbiAgICBwYXRoLmxpbmVQcm9wZXJ0aWVzID0gbmV3IExpbmVQcm9wZXJ0aWVzKENPTE9SUy5HUkVFTiwgMSk7XHJcbiAgICB0aGlzLnBhdGhHaG9zdExheWVyLnBhdGhzLnB1c2gocGF0aCk7XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyRXZlbnQoKSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBTeW5jQ29tcG9uZW50c0V2ZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbmlzaFBvaW50RHJhZyhldmVudDogRmluaXNoUG9pbnREcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5jb250aW51b3VzQ29uZGl0aW9uRml4ZXIgPSBudWxsO1xyXG4gICAgaWYgKCFjb25maWd1cmF0aW9uLmRpc3BsYXlQYXRoR2hvc3RXaGVuRHJhZ2dpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF0aEdob3N0TGF5ZXIucGF0aHMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUG9pbnREcmFnKGV2ZW50OiBQb2ludERyYWdFdmVudCkge1xyXG4gICAgY29uc3QgeyBjb21wb25lbnQsIG5ld1Bvc2l0aW9uIH0gPSBldmVudC5wYXlsb2FkO1xyXG5cclxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgY29tcG9uZW50LnBhdGguZ2V0VmVydGljZXNJdGVyYXRvcigpKSB7XHJcbiAgICAgIGlmIChwb2ludC5lcXVhbHMobmV3UG9zaXRpb24pKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50LnBvaW50Lm1vdmVUbyhuZXdQb3NpdGlvbik7XHJcblxyXG4gICAgaWYgKHRoaXMuY29udGludW91c0NvbmRpdGlvbkZpeGVyKSB7XHJcbiAgICAgIHRoaXMuY29udGludW91c0NvbmRpdGlvbkZpeGVyLmZpeCgpO1xyXG4gICAgICB0aGlzLmNvbnRpbnVvdXNDb25kaXRpb25GaXhlci5wcm9wYWdhdGVDaGFuZ2VzVG9PcmlnaW5hbFBvbHlnb24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9Qb2ludERyYWdnaW5nU2VydmljZS50cyIsImltcG9ydCB7IFBvaW50IH0gZnJvbSAnY29tbW9uL1BvaW50JztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJ2NvbW1vbi9Qb2x5Z29uJztcclxuXHJcbmltcG9ydCB7IEJpZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlciB9IGZyb20gJ2NvbmRpdGlvbnMvZml4ZXJzL0JpZGlyZWN0aW9uYWxDb25kaXRpb25GaXhlcic7XHJcblxyXG4vKipcclxuICogVXNlIHdoZW4gdGhlcmUgaXMgYSBuZWVkIHRvIGZpeCBjb25kaXRpb25zIG9mdGVuIChmb3IgaW5zdGFuY2Ugd2hlbiBkcmFnZ2luZykuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIENvbnRpbnVvdXNDb25kaXRpb25GaXhlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbnRpbnVvdXNDb25kaXRpb25GaXhlciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBwb2x5Z29uOiBQb2x5Z29uO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2xvbmVkUG9seWdvbjogUG9seWdvbjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFydGluZ1BvaW50OiBQb2ludDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNsb25lZFN0YXJ0aW5nUG9pbnQ6IFBvaW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwb2x5Z29uOiBQb2x5Z29uLCBzdGFydGluZ1BvaW50OiBQb2ludCkge1xyXG4gICAgLy8gVE9ETzogaW5qZWN0IENvbnRpbnVvdXNGaXhlciBjb25zdHJ1Y3RvclxyXG4gICAgdGhpcy5wb2x5Z29uID0gcG9seWdvbjtcclxuICAgIHRoaXMuc3RhcnRpbmdQb2ludCA9IHN0YXJ0aW5nUG9pbnQ7XHJcbiAgICBjb25zdCBzdGFydGluZ1BvaW50SW5kZXggPSBwb2x5Z29uLmZpbmRQb2ludEluZGV4KHRoaXMuc3RhcnRpbmdQb2ludCk7XHJcblxyXG4gICAgdGhpcy5jbG9uZWRQb2x5Z29uID0gcG9seWdvbi5jbG9uZSgpO1xyXG4gICAgdGhpcy5jbG9uZWRTdGFydGluZ1BvaW50ID0gdGhpcy5jbG9uZWRQb2x5Z29uLmdldFZlcnRleChzdGFydGluZ1BvaW50SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpeCgpIHtcclxuICAgIGNvbnN0IGRyYWdUcmFuc2xhdGlvblZlY3RvciA9IFBvaW50LnN1YnRyYWN0KHRoaXMuc3RhcnRpbmdQb2ludCwgdGhpcy5jbG9uZWRTdGFydGluZ1BvaW50KTtcclxuICAgIHRoaXMuY2xvbmVkUG9seWdvbi5tb3ZlVG8odGhpcy5wb2x5Z29uKTtcclxuICAgIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludC5tb3ZlVG8odGhpcy5zdGFydGluZ1BvaW50KTtcclxuXHJcbiAgICBjb25zdCBjb25kaXRpb25GaXhlciA9IG5ldyBCaWRpcmVjdGlvbmFsQ29uZGl0aW9uRml4ZXIodGhpcy5jbG9uZWRQb2x5Z29uLCB0aGlzLmNsb25lZFN0YXJ0aW5nUG9pbnQsIFtdKTtcclxuICAgIGNvbmRpdGlvbkZpeGVyLnRyeUZpeCgpO1xyXG5cclxuICAgIGlmICghY29uZGl0aW9uRml4ZXIuZml4U3VjY2Vzc2Z1bCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kcmFnV2hvbGVQb2x5Z29uKGRyYWdUcmFuc2xhdGlvblZlY3Rvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcHJvcGFnYXRlQ2hhbmdlc1RvT3JpZ2luYWxQb2x5Z29uKCkge1xyXG4gICAgdGhpcy5wb2x5Z29uLm1vdmVUbyh0aGlzLmNsb25lZFBvbHlnb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkcmFnV2hvbGVQb2x5Z29uKHRyYW5zbGF0aW9uVmVjdG9yOiBQb2ludCkge1xyXG4gICAgdGhpcy5jbG9uZWRQb2x5Z29uLm1vdmVUbyh0aGlzLnBvbHlnb24pO1xyXG4gICAgdGhpcy5jbG9uZWRQb2x5Z29uLmdldFZlcnRpY2VzKCkuZm9yRWFjaChjbG9uZWRQb2ludCA9PiB7XHJcbiAgICAgIGNsb25lZFBvaW50Lm1vdmVUbyhQb2ludC5hZGQoY2xvbmVkUG9pbnQsIHRyYW5zbGF0aW9uVmVjdG9yKSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2xvbmVkU3RhcnRpbmdQb2ludC5tb3ZlVG8odGhpcy5zdGFydGluZ1BvaW50KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29uZGl0aW9ucy9maXhlcnMvQ29udGludW91c0NvbmRpdGlvbkZpeGVyLnRzIiwiaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IExpbmVDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL0xpbmVDbGlja0V2ZW50JztcclxuaW1wb3J0IHsgUmVuZGVyRXZlbnQgfSBmcm9tICdldmVudHMvUmVuZGVyRXZlbnQnO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50c0V2ZW50IH0gZnJvbSAnZXZlbnRzL3VpL1N5bmNDb21wb25lbnRzRXZlbnQnO1xyXG5cclxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2NvbW1vbi9MaW5lJztcclxuaW1wb3J0IHsgY29uZmlndXJhdGlvbiB9IGZyb20gJ2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW50ZXJmYWNlIFBvaW50SW5zZXJ0ZXJTZXJ2aWNlRGVwZW5kZW5jaWVzIHtcclxuICBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50SW5zZXJ0ZXJTZXJ2aWNlIGltcGxlbWVudHMgVUlTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICBwcml2YXRlIHByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID0gMDtcclxuICBwcml2YXRlIHByZXZpb3VzTGluZUhpdDogTGluZTtcclxuXHJcbiAgY29uc3RydWN0b3IoZGVwZW5kZW5jaWVzOiBQb2ludEluc2VydGVyU2VydmljZURlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICAgIHRoaXMub25MaW5lQ2xpY2sgPSB0aGlzLm9uTGluZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoTGluZUNsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uTGluZUNsaWNrKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihMaW5lQ2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25MaW5lQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkxpbmVDbGljayhldmVudDogTGluZUNsaWNrRXZlbnQpIHtcclxuICAgIGNvbnN0IHByZXZpb3VzTGluZUhpdCA9IHRoaXMucHJldmlvdXNMaW5lSGl0O1xyXG4gICAgY29uc3QgcHJldmlvdXNMaW5lQ2xpY2tUaW1lc3RhbXAgPSB0aGlzLnByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgdGhpcy5wcmV2aW91c0xpbmVIaXQgPSBldmVudC5wYXlsb2FkLmxpbmU7XHJcbiAgICB0aGlzLnByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID0gY3VycmVudFRpbWVzdGFtcDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICFwcmV2aW91c0xpbmVIaXQgfHxcclxuICAgICAgY3VycmVudFRpbWVzdGFtcCAtIHByZXZpb3VzTGluZUNsaWNrVGltZXN0YW1wID4gY29uZmlndXJhdGlvbi5kb3VibGVDbGlja01heERlbGF5XHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmV2aW91c0xpbmVIaXQuZXF1YWxzKGV2ZW50LnBheWxvYWQubGluZSkpIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBldmVudC5wYXlsb2FkLnBhdGguZmluZFBvaW50SW5kZXgoZXZlbnQucGF5bG9hZC5saW5lLnAyKTtcclxuICAgICAgY29uc3QgbmV3UG9pbnQgPSBldmVudC5wYXlsb2FkLmxpbmUuZ2V0TWlkZGxlUG9pbnQoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZXZlbnQucGF5bG9hZC5wYXRoLmluc2VydFZlcnRleChuZXdQb2ludCwgaW5kZXgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBhbGVydChlcnJvci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgU3luY0NvbXBvbmVudHNFdmVudCgpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdWkvUG9pbnRJbnNlcnRlclNlcnZpY2UudHMiLCJpbXBvcnQgeyBjb25maWd1cmF0aW9uIH0gZnJvbSAnY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ3VpL1VJU2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdldmVudHMvRXZlbnRBZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgUG9pbnRDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL1BvaW50Q2xpY2tFdmVudCc7XHJcbmltcG9ydCB7IFJlbmRlckV2ZW50IH0gZnJvbSAnZXZlbnRzL1JlbmRlckV2ZW50JztcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudHNFdmVudCB9IGZyb20gJ2V2ZW50cy91aS9TeW5jQ29tcG9uZW50c0V2ZW50JztcclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5cclxuaW50ZXJmYWNlIFBvaW50UmVtb3ZlclNlcnZpY2VEZXBlbmRlbmNpZXMge1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnRSZW1vdmVyU2VydmljZSBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSBwcmV2aW91c1BhdGhQb2ludENvbXBvbmVudDogUGF0aFBvaW50Q29tcG9uZW50O1xyXG4gIHByaXZhdGUgcHJldmlvdXNDbGlja1RpbWVzdGFtcCA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnRSZW1vdmVyU2VydmljZURlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBkZXBlbmRlbmNpZXMuZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy5vblBvaW50Q2xpY2sgPSB0aGlzLm9uUG9pbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5hZGRFdmVudExpc3RlbmVyKFBvaW50Q2xpY2tFdmVudC5ldmVudFR5cGUsIHRoaXMub25Qb2ludENsaWNrKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihQb2ludENsaWNrRXZlbnQuZXZlbnRUeXBlLCB0aGlzLm9uUG9pbnRDbGljayk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUG9pbnRDbGljayhldmVudDogUG9pbnRDbGlja0V2ZW50KSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBjb25zdCBwYXRoUG9pbnRDb21wb25lbnQgPSBldmVudC5wYXlsb2FkO1xyXG4gICAgY29uc3QgcHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQgPSB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50O1xyXG4gICAgY29uc3QgcHJldmlvdXNDbGlja1RpbWVzdGFtcCA9IHRoaXMucHJldmlvdXNDbGlja1RpbWVzdGFtcDtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVByZXZpb3VzQ2xpY2tJbmZvcm1hdGlvbihldmVudCwgY3VycmVudFRpbWVzdGFtcCk7XHJcblxyXG4gICAgaWYgKCFwcmV2aW91c1BhdGhQb2ludENvbXBvbmVudCB8fCBwcmV2aW91c1BhdGhQb2ludENvbXBvbmVudCAhPT0gcGF0aFBvaW50Q29tcG9uZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudFRpbWVzdGFtcCAtIHByZXZpb3VzQ2xpY2tUaW1lc3RhbXAgPiBjb25maWd1cmF0aW9uLmRvdWJsZUNsaWNrTWF4RGVsYXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVtb3ZlUHJldmlvdXNDbGlja2VkUG9pbnQoKTtcclxuICAgIGV2ZW50LmhhbmRsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVQcmV2aW91c0NsaWNrSW5mb3JtYXRpb24oZXZlbnQ6IFBvaW50Q2xpY2tFdmVudCwgdGltZXN0YW1wOiBudW1iZXIpIHtcclxuICAgIHRoaXMucHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQgPSBldmVudC5wYXlsb2FkO1xyXG4gICAgdGhpcy5wcmV2aW91c0NsaWNrVGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVQcmV2aW91c0NsaWNrZWRQb2ludCgpIHtcclxuICAgIGNvbnN0IHBhdGggPSB0aGlzLnByZXZpb3VzUGF0aFBvaW50Q29tcG9uZW50LnBhdGg7XHJcbiAgICBjb25zdCBwb2ludCA9IHRoaXMucHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQucG9pbnQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgcGF0aC5yZW1vdmVWZXJ0ZXgocG9pbnQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGFsZXJ0KCdDYW5ub3QgcmVtb3ZlIHZlcnRleCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldmlvdXNQYXRoUG9pbnRDb21wb25lbnQucmVtb3ZlKCk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL1BvaW50UmVtb3ZlclNlcnZpY2UudHMiLCJpbXBvcnQgeyBQYXRoIH0gZnJvbSAnY29tbW9uL1BhdGgnO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2NvbW1vbi9Qb2ludCc7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICd1aS9VSVNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgUGF0aFBvaW50Q29tcG9uZW50IH0gZnJvbSAndWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIgfSBmcm9tICd1aS9Nb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXInO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnZXZlbnRzL0V2ZW50QWdncmVnYXRvcic7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcblxyXG5pbnRlcmZhY2UgUG9pbnRTeW5jU2VydmljZURlcGVuZGVuY2llcyB7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQYXRoUG9pbnQge1xyXG4gIHBhdGg6IFBhdGg7XHJcbiAgcG9pbnQ6IFBvaW50O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnRTeW5jU2VydmljZSBpbXBsZW1lbnRzIFVJU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSBwYXRoUG9pbnRDb21wb25lbnRzOiBQYXRoUG9pbnRDb21wb25lbnRbXSA9IFtdO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWRvbmx5IG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogUG9pbnRTeW5jU2VydmljZURlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5zdGFnZSA9IGRlcGVuZGVuY2llcy5zdGFnZTtcclxuICAgIHRoaXMuY29udGFpbmVyID0gZGVwZW5kZW5jaWVzLmNvbnRhaW5lcjtcclxuICAgIHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyID0gZGVwZW5kZW5jaWVzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLnN5bmNocm9uaXplQ29tcG9uZW50cyA9IHRoaXMuc3luY2hyb25pemVDb21wb25lbnRzLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmFkZEV2ZW50TGlzdGVuZXIoU3luY0NvbXBvbmVudHNFdmVudC5ldmVudFR5cGUsIHRoaXMuc3luY2hyb25pemVDb21wb25lbnRzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihTeW5jQ29tcG9uZW50c0V2ZW50LmV2ZW50VHlwZSwgdGhpcy5zeW5jaHJvbml6ZUNvbXBvbmVudHMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN5bmNocm9uaXplQ29tcG9uZW50cyhldmVudDogU3luY0NvbXBvbmVudHNFdmVudCkge1xyXG4gICAgY29uc3QgY29tcG9uZW50c1RvUmVtb3ZlID0gdGhpcy5nZXRSZWR1bmRhbnRDb21wb25lbnRzKCk7XHJcbiAgICBjb21wb25lbnRzVG9SZW1vdmUuZm9yRWFjaChjb21wb25lbnQgPT4gY29tcG9uZW50LnJlbW92ZSgpKTtcclxuXHJcbiAgICBjb25zdCBwYXRoUG9pbnRzID0gdGhpcy5nZXRQYXRoUG9pbnRzKCk7XHJcbiAgICBjb25zdCBwb2ludHNXaXRob3V0Q29tcG9uZW50cyA9IHRoaXMuZ2V0UG9pbnRzV2l0aG91dENvbXBvbmVudHMocGF0aFBvaW50cyk7XHJcbiAgICBjb25zdCBuZXdDb21wb25lbnRzID0gdGhpcy5jcmVhdGVQYXRoUG9pbnRDb21wb25lbnRzKHBvaW50c1dpdGhvdXRDb21wb25lbnRzKTtcclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRzTm90UmVtb3ZlZCA9IHRoaXMucGF0aFBvaW50Q29tcG9uZW50cy5maWx0ZXIoXHJcbiAgICAgIGNvbXBvbmVudCA9PiBjb21wb25lbnRzVG9SZW1vdmUuaW5kZXhPZihjb21wb25lbnQpID09PSAtMVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnBhdGhQb2ludENvbXBvbmVudHMgPSBbLi4ubmV3Q29tcG9uZW50cywgLi4uY29tcG9uZW50c05vdFJlbW92ZWRdO1xyXG4gICAgZXZlbnQuaGFuZGxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhdGhQb2ludHMoKSB7XHJcbiAgICBjb25zdCBwYXRoUG9pbnRzOiBQYXRoUG9pbnRbXSA9IFtdO1xyXG5cclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICBsYXllci5wYXRocy5mb3JFYWNoKHBhdGggPT4ge1xyXG4gICAgICAgIHBhdGguZ2V0VmVydGljZXMoKS5mb3JFYWNoKHBvaW50ID0+IHtcclxuICAgICAgICAgIHBhdGhQb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgIHBvaW50XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcGF0aFBvaW50cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUGF0aFBvaW50Q29tcG9uZW50cyhwYXRoUG9pbnRzOiBQYXRoUG9pbnRbXSkge1xyXG4gICAgcmV0dXJuIHBhdGhQb2ludHMubWFwKFxyXG4gICAgICBwYXRoUG9pbnQgPT5cclxuICAgICAgICBuZXcgUGF0aFBvaW50Q29tcG9uZW50KHBhdGhQb2ludC5wYXRoLCBwYXRoUG9pbnQucG9pbnQsIHtcclxuICAgICAgICAgIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IHRoaXMuY29udGFpbmVyLFxyXG4gICAgICAgICAgZXZlbnRBZ2dyZWdhdG9yOiB0aGlzLmV2ZW50QWdncmVnYXRvcixcclxuICAgICAgICAgIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXJcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVkdW5kYW50Q29tcG9uZW50cygpIHtcclxuICAgIGNvbnN0IGFjdGl2ZVBhdGhzID0gdGhpcy5nZXRBY3RpdmVQYXRocygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnBhdGhQb2ludENvbXBvbmVudHMuZmlsdGVyKFxyXG4gICAgICBjb21wb25lbnQgPT5cclxuICAgICAgICBhY3RpdmVQYXRocy5pbmRleE9mKGNvbXBvbmVudC5wYXRoKSA9PT0gLTEgfHxcclxuICAgICAgICBjb21wb25lbnQucGF0aC5nZXRWZXJ0aWNlcygpLmluZGV4T2YoY29tcG9uZW50LnBvaW50KSA9PT0gLTFcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBvaW50c1dpdGhvdXRDb21wb25lbnRzKHBhdGhQb2ludHM6IFBhdGhQb2ludFtdKSB7XHJcbiAgICByZXR1cm4gcGF0aFBvaW50cy5maWx0ZXIoXHJcbiAgICAgIHBhdGhQb2ludCA9PlxyXG4gICAgICAgICF0aGlzLnBhdGhQb2ludENvbXBvbmVudHMuZmluZChcclxuICAgICAgICAgIGNvbXBvbmVudCA9PiBjb21wb25lbnQucGF0aCA9PT0gcGF0aFBvaW50LnBhdGggJiYgY29tcG9uZW50LnBvaW50ID09PSBwYXRoUG9pbnQucG9pbnRcclxuICAgICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBY3RpdmVQYXRocygpIHtcclxuICAgIGNvbnN0IHBhdGhzOiBQYXRoW10gPSBbXTtcclxuICAgIHRoaXMuc3RhZ2UubGF5ZXJzLm1hcChsYXllciA9PiBwYXRocy5wdXNoKC4uLmxheWVyLnBhdGhzKSk7XHJcblxyXG4gICAgcmV0dXJuIHBhdGhzO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9Qb2ludFN5bmNTZXJ2aWNlLnRzIiwiaW1wb3J0IHsgUGF0aCB9IGZyb20gJ2NvbW1vbi9QYXRoJztcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdjb21tb24vUG9pbnQnO1xyXG5cclxuaW1wb3J0IHsgTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyIH0gZnJvbSAndWkvTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyJztcclxuXHJcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBGaW5pc2hQb2ludERyYWdFdmVudCB9IGZyb20gJ2V2ZW50cy9wb2ludC1kcmFnL0ZpbmlzaFBvaW50RHJhZ0V2ZW50JztcclxuaW1wb3J0IHsgUG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9Qb2ludERyYWdFdmVudCc7XHJcbmltcG9ydCB7IFN0YXJ0UG9pbnREcmFnRXZlbnQgfSBmcm9tICdldmVudHMvcG9pbnQtZHJhZy9TdGFydFBvaW50RHJhZ0V2ZW50JztcclxuaW1wb3J0IHsgUG9pbnRDbGlja0V2ZW50IH0gZnJvbSAnZXZlbnRzL1BvaW50Q2xpY2tFdmVudCc7XHJcblxyXG5pbXBvcnQgJ3VpL2NvbXBvbmVudHMvUGF0aFBvaW50Q29tcG9uZW50LnNjc3MnO1xyXG5cclxuY29uc3QgQ09NUE9ORU5UX0NMQVNTX05BTUUgPSAnYXBwbGljYXRpb24tdWlfX3ZlcnRleCc7XHJcbmNvbnN0IElOSVRJQUxfQ0xBU1NfTkFNRSA9ICdhcHBsaWNhdGlvbi11aV9fdmVydGV4LS1pbml0aWFsJztcclxuXHJcbmludGVyZmFjZSBQYXRoUG9pbnRDb21wb25lbnREZXBlbmRlbmNpZXMge1xyXG4gIGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIG1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjogTW91c2VQb3NpdGlvblRyYW5zZm9ybWVyO1xyXG4gIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGF0aFBvaW50Q29tcG9uZW50IHtcclxuICBwdWJsaWMgZWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHVibGljIHBhdGg6IFBhdGg7XHJcbiAgcHVibGljIHBvaW50OiBQb2ludDtcclxuICBwcml2YXRlIHJlYWRvbmx5IGFwcGxpY2F0aW9uVUlDb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbW91c2VQb3NpdGlvblRyYW5zZm9ybWVyOiBNb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXI7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwYXRoOiBQYXRoLFxyXG4gICAgcG9pbnQ6IFBvaW50LFxyXG4gICAgZGVwZW5kZW5jaWVzOiBQYXRoUG9pbnRDb21wb25lbnREZXBlbmRlbmNpZXNcclxuICApIHtcclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uVUlDb250YWluZXIgPSBkZXBlbmRlbmNpZXMuYXBwbGljYXRpb25VSUNvbnRhaW5lcjtcclxuICAgIHRoaXMubW91c2VQb3NpdGlvblRyYW5zZm9ybWVyID0gZGVwZW5kZW5jaWVzLm1vdXNlUG9zaXRpb25UcmFuc2Zvcm1lcjtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZGVwZW5kZW5jaWVzLmV2ZW50QWdncmVnYXRvcjtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uID0gdGhpcy51cGRhdGVQb3NpdGlvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbk1vdXNlRG93biA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnN0b3BEcmFnZ2luZyA9IHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmUoKSB7XHJcbiAgICB0aGlzLnBvaW50Lm1vdmVDYWxsYmFjayA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5wYXRoLmxpbmVQcm9wZXJ0aWVzLmNvbG9yLmZpbGxTdHlsZTtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSBgJHt0aGlzLnBvaW50Lnl9cHhgO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBgJHt0aGlzLnBvaW50Lnh9cHhgO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpbml0aWFsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoSU5JVElBTF9DTEFTU19OQU1FKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgaW5pdGlhbChpc0luaXRpYWw6IGJvb2xlYW4pIHtcclxuICAgIGlmIChpc0luaXRpYWwpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoSU5JVElBTF9DTEFTU19OQU1FKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKElOSVRJQUxfQ0xBU1NfTkFNRSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYXBwbGljYXRpb25VSUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKENPTVBPTkVOVF9DTEFTU19OQU1FKTtcclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucGF0aC5nZXRWZXJ0aWNlc0NvdW50KCkgPT09IDEgfHxcclxuICAgICAgKCF0aGlzLnBhdGguY2xvc2VkICYmIHRoaXMucGF0aC5maW5kUG9pbnRJbmRleCh0aGlzLnBvaW50KSA9PT0gMClcclxuICAgICkge1xyXG4gICAgICB0aGlzLmluaXRpYWwgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICAgIHRoaXMucG9pbnQubW92ZUNhbGxiYWNrID0gdGhpcy51cGRhdGVQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Nb3VzZURvd24oKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBQb2ludENsaWNrRXZlbnQodGhpcyk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICBpZiAoZXZlbnQuaGFuZGxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IuZGlzcGF0Y2hFdmVudChuZXcgU3RhcnRQb2ludERyYWdFdmVudCh0aGlzKSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnN0b3BEcmFnZ2luZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBjb25zdCBtb3VzZVBvc2l0aW9uID0gdGhpcy5tb3VzZVBvc2l0aW9uVHJhbnNmb3JtZXIuZ2V0UG9pbnRGcm9tTW91c2VFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBQb2ludERyYWdFdmVudCh0aGlzLCBtb3VzZVBvc2l0aW9uKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BEcmFnZ2luZygpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IEZpbmlzaFBvaW50RHJhZ0V2ZW50KHRoaXMpKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5zdG9wRHJhZ2dpbmcpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudC50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL1BhdGhQb2ludENvbXBvbmVudC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL1BhdGhQb2ludENvbXBvbmVudC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL1BhdGhQb2ludENvbXBvbmVudC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91aS9jb21wb25lbnRzL1BhdGhQb2ludENvbXBvbmVudC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYXBwbGljYXRpb24tdWlfX3ZlcnRleCB7XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXG4gIHdpZHRoOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7IH1cXG4gIC5hcHBsaWNhdGlvbi11aV9fdmVydGV4OmFjdGl2ZSB7XFxuICAgIGJvcmRlci1jb2xvcjogcmVkO1xcbiAgICBib3JkZXItd2lkdGg6IDJweDsgfVxcblxcbi5hcHBsaWNhdGlvbi11aV9fdmVydGV4LS1pbml0aWFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDUxZmY7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvdWkvY29tcG9uZW50cy9QYXRoUG9pbnRDb21wb25lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgSG9yaXpvbnRhbExpbmVDb25kaXRpb24gfSBmcm9tICdjb25kaXRpb25zL0hvcml6b250YWxMaW5lQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvTGluZUNvbmRpdGlvbic7XHJcbmltcG9ydCB7IFZlcnRpY2FsTGluZUNvbmRpdGlvbiB9IGZyb20gJ2NvbmRpdGlvbnMvVmVydGljYWxMaW5lQ29uZGl0aW9uJztcclxuXHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdjb21tb24vTGluZSc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICdjb21tb24vUG9seWdvbic7XHJcblxyXG5jb25zdCBmb3JiaWRkZW5Db25kaXRpb25Db21iaW5hdGlvbnMgPSBbXHJcbiAgW0hvcml6b250YWxMaW5lQ29uZGl0aW9uLCBIb3Jpem9udGFsTGluZUNvbmRpdGlvbl0sXHJcbiAgW1ZlcnRpY2FsTGluZUNvbmRpdGlvbiwgVmVydGljYWxMaW5lQ29uZGl0aW9uXVxyXG5dO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbk1hdGNoZXIge1xyXG4gIHB1YmxpYyB2ZXJpZnlDb25kaXRpb25BbGxvd2VkKGNvbmRpdGlvbjogTGluZUNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgcG9seWdvbiA9IGNvbmRpdGlvbi5wb2x5Z29uO1xyXG4gICAgY29uc3QgbGluZSA9IGNvbmRpdGlvbi5saW5lO1xyXG5cclxuICAgIGNvbnN0IHAxSW5kZXggPSBwb2x5Z29uLmZpbmRQb2ludEluZGV4KGxpbmUucDEpO1xyXG4gICAgY29uc3QgcHJldmlvdXNQb2ludCA9IHBvbHlnb24uZ2V0VmVydGV4KHRoaXMuZ2V0UHJldmlvdXNQb2ludEluZGV4KHAxSW5kZXgsIHBvbHlnb24pKTtcclxuICAgIGNvbnN0IHAySW5kZXggPSBwb2x5Z29uLmZpbmRQb2ludEluZGV4KGxpbmUucDIpO1xyXG4gICAgY29uc3QgbmV4dFBvaW50ID0gcG9seWdvbi5nZXRWZXJ0ZXgodGhpcy5nZXROZXh0UG9pbnRJbmRleChwMkluZGV4LCBwb2x5Z29uKSk7XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNMaW5lID0gbmV3IExpbmUocHJldmlvdXNQb2ludCwgbGluZS5wMSk7XHJcbiAgICBjb25zdCBuZXh0TGluZSA9IG5ldyBMaW5lKGxpbmUucDIsIG5leHRQb2ludCk7XHJcblxyXG4gICAgY29uc3QgbGluZUNvbmRpdGlvbnMgPSBwb2x5Z29uLmdldExpbmVDb25kaXRpb25zKCk7XHJcbiAgICBjb25zdCBwcmV2aW91c0xpbmVDb25kaXRpb25zID0gbGluZUNvbmRpdGlvbnMuZmlsdGVyKGxpbmVDb25kaXRpb24gPT5cclxuICAgICAgbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhwcmV2aW91c0xpbmUpXHJcbiAgICApO1xyXG4gICAgY29uc3QgbmV4dExpbmVDb25kaXRpb25zID0gbGluZUNvbmRpdGlvbnMuZmlsdGVyKGxpbmVDb25kaXRpb24gPT5cclxuICAgICAgbGluZUNvbmRpdGlvbi5saW5lLmVxdWFscyhuZXh0TGluZSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy52ZXJpZnlOb3RGb3JiaWRkZW5Db21iaW5hdGlvbihwcmV2aW91c0xpbmVDb25kaXRpb25zLCBjb25kaXRpb24pO1xyXG4gICAgdGhpcy52ZXJpZnlOb3RGb3JiaWRkZW5Db21iaW5hdGlvbihuZXh0TGluZUNvbmRpdGlvbnMsIGNvbmRpdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hlY2tGb3JiaWRkZW5Db21iaW5hdGlvbihjb25zdHJ1Y3RvcjE6IEZ1bmN0aW9uLCBjb25zdHJ1Y3RvcjI6IEZ1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gZm9yYmlkZGVuQ29uZGl0aW9uQ29tYmluYXRpb25zLmZpbmQoXHJcbiAgICAgIGNvbWJpbmF0aW9uID0+XHJcbiAgICAgICAgKGNvbnN0cnVjdG9yMSA9PT0gY29tYmluYXRpb25bMF0gJiYgY29uc3RydWN0b3IyID09PSBjb21iaW5hdGlvblsxXSkgfHxcclxuICAgICAgICAoY29uc3RydWN0b3IxID09PSBjb21iaW5hdGlvblsxXSAmJiBjb25zdHJ1Y3RvcjIgPT09IGNvbWJpbmF0aW9uWzBdKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmVyaWZ5Tm90Rm9yYmlkZGVuQ29tYmluYXRpb24oXHJcbiAgICBsaW5lQ29uZGl0aW9uczogTGluZUNvbmRpdGlvbltdLFxyXG4gICAgc2luZ2xlQ29uZGl0aW9uOiBMaW5lQ29uZGl0aW9uXHJcbiAgKSB7XHJcbiAgICBmb3IgKGNvbnN0IGxpbmVDb25kaXRpb24gb2YgbGluZUNvbmRpdGlvbnMpIHtcclxuICAgICAgY29uc3QgZm9yYmlkZGVuQ29uZGl0aW9uID0gdGhpcy5jaGVja0ZvcmJpZGRlbkNvbWJpbmF0aW9uKFxyXG4gICAgICAgIGxpbmVDb25kaXRpb24uY29uc3RydWN0b3IsXHJcbiAgICAgICAgc2luZ2xlQ29uZGl0aW9uLmNvbnN0cnVjdG9yXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoZm9yYmlkZGVuQ29uZGl0aW9uKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgYEZvcmJpZGRlbiBjb21iaW5hdGlvbjogJHtmb3JiaWRkZW5Db25kaXRpb25bMF0ubmFtZX0sICR7Zm9yYmlkZGVuQ29uZGl0aW9uWzFdLm5hbWV9YFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UHJldmlvdXNQb2ludEluZGV4KGN1cnJlbnRJbmRleDogbnVtYmVyLCBwb2x5Z29uOiBQb2x5Z29uKSB7XHJcbiAgICBjdXJyZW50SW5kZXggLT0gMTtcclxuICAgIGlmIChjdXJyZW50SW5kZXggPCAwKSB7XHJcbiAgICAgIGN1cnJlbnRJbmRleCA9IHBvbHlnb24uZ2V0VmVydGljZXNDb3VudCgpIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudEluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXROZXh0UG9pbnRJbmRleChjdXJyZW50SW5kZXg6IG51bWJlciwgcG9seWdvbjogUG9seWdvbikge1xyXG4gICAgcmV0dXJuIChjdXJyZW50SW5kZXggKyAxKSAlIHBvbHlnb24uZ2V0VmVydGljZXNDb3VudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb25kaXRpb25zL0NvbmRpdGlvbk1hdGNoZXIudHMiLCJpbXBvcnQgeyBJbnN0cnVjdGlvbnNEaWFsb2cgfSBmcm9tICd1aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluc3RydWN0aW9uc0J1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIGJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5idXR0b24udGV4dENvbnRlbnQgPSAnSW5zdHJ1Y3Rpb25zJztcclxuICAgIHRoaXMuYnV0dG9uLmNsYXNzTmFtZSA9ICdpbnN0cnVjdGlvbnMtYnV0dG9uJztcclxuXHJcbiAgICB0aGlzLm9uQnV0dG9uQ2xpY2sgPSB0aGlzLm9uQnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5idXR0b24pO1xyXG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQnV0dG9uQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmJ1dHRvbik7XHJcbiAgICB0aGlzLmJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25CdXR0b25DbGljayk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQnV0dG9uQ2xpY2soKSB7XHJcbiAgICBjb25zdCBpbnN0cnVjdGlvbnNEaWFsb2cgPSBuZXcgSW5zdHJ1Y3Rpb25zRGlhbG9nKCk7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKGluc3RydWN0aW9uc0RpYWxvZyk7XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtaW5zdHJ1Y3Rpb25zLWJ1dHRvbicsIEluc3RydWN0aW9uc0J1dHRvbik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3VpL2NvbXBvbmVudHMvaW5zdHJ1Y3Rpb25zL0luc3RydWN0aW9uc0J1dHRvbi50cyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0luc3RydWN0aW9uc0RpYWxvZy5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91aS9jb21wb25lbnRzL2luc3RydWN0aW9ucy9JbnN0cnVjdGlvbnNEaWFsb2cuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmluc3RydWN0aW9ucy1kaWFsb2ctd3JhcHBlciB7XFxuICB6LWluZGV4OiAyOyB9XFxuXFxuLmluc3RydWN0aW9ucy1kaWFsb2dfX292ZXJsYXkge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDI1MG1zIGVhc2UtaW4tb3V0OyB9XFxuXFxuLmluc3RydWN0aW9ucy1kaWFsb2dfX292ZXJsYXktLWFjdGl2ZSB7XFxuICBvcGFjaXR5OiAwLjU7IH1cXG5cXG4uaW5zdHJ1Y3Rpb25zLWRpYWxvZyB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHotaW5kZXg6IDI7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwLCAwKTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjM1MGY7XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXG4gIGNvbG9yOiAjZWVlO1xcbiAgcGFkZGluZzogMmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJveC1zaGFkb3c6IDJweCAycHggNXB4IGJsYWNrO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0OyB9XFxuXFxuLmluc3RydWN0aW9ucy1kaWFsb2ctLWFjdGl2ZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxLCAxKTsgfVxcblxcbi5pbnN0cnVjdGlvbnMtZGlhbG9nX190aXRsZSB7XFxuICBtYXJnaW46IDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvdWkvY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvSW5zdHJ1Y3Rpb25zRGlhbG9nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2V2ZW50cy9FdmVudEFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBSZW5kZXJFdmVudCB9IGZyb20gJ2V2ZW50cy9SZW5kZXJFdmVudCc7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnRzRXZlbnQgfSBmcm9tICdldmVudHMvdWkvU3luY0NvbXBvbmVudHNFdmVudCc7XHJcblxyXG5pbXBvcnQgeyBMRVggfSBmcm9tICdMRVgnO1xyXG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gJ1N0YWdlJztcclxuXHJcbmltcG9ydCB7IFNlcmlhbGl6YWJsZUxheWVyIH0gZnJvbSAnY29tbW9uL0xheWVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEJ1dHRvbkRlcGVuZGVuY2llcyB7XHJcbiAgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3I7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZEJ1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhZ2U6IFN0YWdlO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYnV0dG9uRWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY2llczogTG9hZEJ1dHRvbkRlcGVuZGVuY2llcykge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGRlcGVuZGVuY2llcy5ldmVudEFnZ3JlZ2F0b3I7XHJcbiAgICB0aGlzLnN0YWdlID0gZGVwZW5kZW5jaWVzLnN0YWdlO1xyXG4gICAgdGhpcy5idXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmJ1dHRvbkVsZW1lbnQuaW5uZXJUZXh0ID0gJ0xvYWQnO1xyXG5cclxuICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5idXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcclxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5idXR0b25FbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5idXR0b25FbGVtZW50KTtcclxuICAgIHRoaXMuYnV0dG9uRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQ2xpY2soKSB7XHJcbiAgICBjb25zdCBzZXJpYWxpemVkRGF0YSA9IHByb21wdCgnUGxlYXNlIHBhc3RlIHRoZSBzZXJpYWxpemVkIGRhdGEnKTtcclxuXHJcbiAgICBpZiAoIXNlcmlhbGl6ZWREYXRhKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwb2x5Z29uTGF5ZXIgPSB0aGlzLnN0YWdlLmZpbmRMYXllckJ5TmFtZShMRVguUE9MWUdPTl9MQVlFUl9OQU1FKTtcclxuXHJcbiAgICBjb25zdCBjdXJyZW50U2VyaWFsaXphYmxlTGF5ZXIgPSBwb2x5Z29uTGF5ZXIudG9TZXJpYWxpemFibGVPYmplY3QoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzZXJpYWxpemFibGVMYXllciA9IDxTZXJpYWxpemFibGVMYXllcj5KU09OLnBhcnNlKHNlcmlhbGl6ZWREYXRhKTtcclxuICAgICAgcG9seWdvbkxheWVyLmZyb21TZXJpYWxpemFibGVPYmplY3QoPFNlcmlhbGl6YWJsZUxheWVyPnNlcmlhbGl6YWJsZUxheWVyKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHBvbHlnb25MYXllci5mcm9tU2VyaWFsaXphYmxlT2JqZWN0KGN1cnJlbnRTZXJpYWxpemFibGVMYXllcik7XHJcbiAgICAgIGFsZXJ0KCdJbnZhbGlkIGRhdGEnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJFdmVudCgpKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLmRpc3BhdGNoRXZlbnQobmV3IFN5bmNDb21wb25lbnRzRXZlbnQoKSk7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1sb2FkLWJ1dHRvbicsIExvYWRCdXR0b24pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL3NlcmlhbGl6YXRpb24vTG9hZEJ1dHRvbi50cyIsImltcG9ydCB7IExFWCB9IGZyb20gJ0xFWCc7XHJcbmltcG9ydCB7IFN0YWdlIH0gZnJvbSAnU3RhZ2UnO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2F2ZUJ1dHRvbkRlcGVuZGVuY2llcyB7XHJcbiAgc3RhZ2U6IFN0YWdlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2F2ZUJ1dHRvbiBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0YWdlOiBTdGFnZTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGJ1dHRvbkVsZW1lbnQ6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXBlbmRlbmNpZXM6IFNhdmVCdXR0b25EZXBlbmRlbmNpZXMpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5zdGFnZSA9IGRlcGVuZGVuY2llcy5zdGFnZTtcclxuICAgIHRoaXMuYnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5idXR0b25FbGVtZW50LmlubmVyVGV4dCA9ICdTYXZlJztcclxuXHJcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHRoaXMuYnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuYnV0dG9uRWxlbWVudCk7XHJcbiAgICB0aGlzLmJ1dHRvbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNsaWNrKCkge1xyXG4gICAgY29uc3QgcG9seWdvbkxheWVyID0gdGhpcy5zdGFnZS5maW5kTGF5ZXJCeU5hbWUoTEVYLlBPTFlHT05fTEFZRVJfTkFNRSk7XHJcbiAgICBjb25zdCBzZXJpYWxpemFibGVPYmplY3QgPSBwb2x5Z29uTGF5ZXIudG9TZXJpYWxpemFibGVPYmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBzZXJpYWxpemVkRGF0YSA9IEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6YWJsZU9iamVjdCk7XHJcbiAgICBjb25zb2xlLmxvZyhzZXJpYWxpemVkRGF0YSk7XHJcbiAgICBwcm9tcHQoJ0NvcHkgdGhlIGRhdGEnLCBzZXJpYWxpemVkRGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1zYXZlLWJ1dHRvbicsIFNhdmVCdXR0b24pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy91aS9jb21wb25lbnRzL3NlcmlhbGl6YXRpb24vU2F2ZUJ1dHRvbi50cyJdLCJzb3VyY2VSb290IjoiIn0=