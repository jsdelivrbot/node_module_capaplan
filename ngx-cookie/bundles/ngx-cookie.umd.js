(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["ngx-cookie"] = factory(require("@angular/core"), require("@angular/common"));
	else
		root["ngx-cookie"] = factory(root["@angular/core"], root["@angular/common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COOKIE_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CookieOptionsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var COOKIE_OPTIONS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('COOKIE_OPTIONS');
/** @private */
var CookieOptionsProvider = (function () {
    function CookieOptionsProvider(options, _injector) {
        if (options === void 0) { options = {}; }
        this._injector = _injector;
        this.defaultOptions = {
            path: this._injector.get(__WEBPACK_IMPORTED_MODULE_1__angular_common__["APP_BASE_HREF"], '/'),
            domain: null,
            expires: null,
            secure: false,
            httpOnly: false
        };
        this._options = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* mergeOptions */])(this.defaultOptions, options);
    }
    Object.defineProperty(CookieOptionsProvider.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    CookieOptionsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(COOKIE_OPTIONS)),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], CookieOptionsProvider);
    return CookieOptionsProvider;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CookieService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cookie_options_provider__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CookieService = (function () {
    function CookieService(_optionsProvider) {
        this._optionsProvider = _optionsProvider;
        this.options = this._optionsProvider.options;
    }
    Object.defineProperty(CookieService.prototype, "cookieString", {
        get: function () {
            return document.cookie || '';
        },
        set: function (val) {
            document.cookie = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name CookieService#get
     *
     * @description
     * Returns the value of given cookie key.
     *
     * @param {string} key Id to use for lookup.
     * @returns {string} Raw cookie value.
     */
    CookieService.prototype.get = function (key) {
        return this._cookieReader()[key];
    };
    /**
     * @name CookieService#getObject
     *
     * @description
     * Returns the deserialized value of given cookie key.
     *
     * @param {string} key Id to use for lookup.
     * @returns {Object} Deserialized cookie value.
     */
    CookieService.prototype.getObject = function (key) {
        var value = this.get(key);
        return value ? Object(__WEBPACK_IMPORTED_MODULE_2__utils__["f" /* safeJsonParse */])(value) : value;
    };
    /**
     * @name CookieService#getAll
     *
     * @description
     * Returns a key value object with all the cookies.
     *
     * @returns {Object} All cookies
     */
    CookieService.prototype.getAll = function () {
        return this._cookieReader();
    };
    /**
     * @name CookieService#put
     *
     * @description
     * Sets a value for given cookie key.
     *
     * @param {string} key Id for the `value`.
     * @param {string} value Raw value to be stored.
     * @param {CookieOptions} options (Optional) Options object.
     */
    CookieService.prototype.put = function (key, value, options) {
        this._cookieWriter()(key, value, options);
    };
    /**
     * @name CookieService#putObject
     *
     * @description
     * Serializes and sets a value for given cookie key.
     *
     * @param {string} key Id for the `value`.
     * @param {Object} value Value to be stored.
     * @param {CookieOptions} options (Optional) Options object.
     */
    CookieService.prototype.putObject = function (key, value, options) {
        this.put(key, JSON.stringify(value), options);
    };
    /**
     * @name CookieService#remove
     *
     * @description
     * Remove given cookie.
     *
     * @param {string} key Id of the key-value pair to delete.
     * @param {CookieOptions} options (Optional) Options object.
     */
    CookieService.prototype.remove = function (key, options) {
        this._cookieWriter()(key, undefined, options);
    };
    /**
     * @name CookieService#removeAll
     *
     * @description
     * Remove all cookies.
     */
    CookieService.prototype.removeAll = function (options) {
        var _this = this;
        var cookies = this.getAll();
        Object.keys(cookies).forEach(function (key) {
            _this.remove(key, options);
        });
    };
    CookieService.prototype._cookieReader = function () {
        var lastCookies = {};
        var lastCookieString = '';
        var cookieArray, cookie, i, index, name;
        var currentCookieString = this.cookieString;
        if (currentCookieString !== lastCookieString) {
            lastCookieString = currentCookieString;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                index = cookie.indexOf('=');
                if (index > 0) {
                    name = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* safeDecodeURIComponent */])(cookie.substring(0, index));
                    // the first value that is seen for a cookie is the most
                    // specific one.  values for the same cookie name that
                    // follow are for less specific paths.
                    if (Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* isBlank */])(lastCookies[name])) {
                        lastCookies[name] = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* safeDecodeURIComponent */])(cookie.substring(index + 1));
                    }
                }
            }
        }
        return lastCookies;
    };
    CookieService.prototype._cookieWriter = function () {
        var that = this;
        return function (name, value, options) {
            that.cookieString = that._buildCookieString(name, value, options);
        };
    };
    CookieService.prototype._buildCookieString = function (name, value, options) {
        var opts = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* mergeOptions */])(this.options, options);
        var expires = opts.expires;
        if (Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* isBlank */])(value)) {
            expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
            value = '';
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* isString */])(expires)) {
            expires = new Date(expires);
        }
        var cookieValue = opts.storeUnencoded ? value : encodeURIComponent(value);
        var str = encodeURIComponent(name) + '=' + cookieValue;
        str += opts.path ? ';path=' + opts.path : '';
        str += opts.domain ? ';domain=' + opts.domain : '';
        str += expires ? ';expires=' + expires.toUTCString() : '';
        str += opts.secure ? ';secure' : '';
        str += opts.httpOnly ? '; HttpOnly' : '';
        // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
        // - 300 cookies
        // - 20 cookies per unique domain
        // - 4096 bytes per cookie
        var cookieLength = str.length + 1;
        if (cookieLength > 4096) {
            console.log("Cookie '" + name + "' possibly not set or overflowed because it was too \n      large (" + cookieLength + " > 4096 bytes)!");
        }
        return str;
    };
    CookieService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__cookie_options_provider__["b" /* CookieOptionsProvider */]])
    ], CookieService);
    return CookieService;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isBlank;
/* harmony export (immutable) */ __webpack_exports__["b"] = isPresent;
/* harmony export (immutable) */ __webpack_exports__["c"] = isString;
/* harmony export (immutable) */ __webpack_exports__["d"] = mergeOptions;
/* harmony export (immutable) */ __webpack_exports__["e"] = safeDecodeURIComponent;
/* harmony export (immutable) */ __webpack_exports__["f"] = safeJsonParse;
function isBlank(obj) {
    return obj === undefined || obj === null;
}
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
function isString(obj) {
    return typeof obj === 'string';
}
function mergeOptions(oldOptions, newOptions) {
    if (!newOptions) {
        return oldOptions;
    }
    return {
        path: isPresent(newOptions.path) ? newOptions.path : oldOptions.path,
        domain: isPresent(newOptions.domain) ? newOptions.domain : oldOptions.domain,
        expires: isPresent(newOptions.expires) ? newOptions.expires : oldOptions.expires,
        secure: isPresent(newOptions.secure) ? newOptions.secure : oldOptions.secure,
        storeUnencoded: isPresent(newOptions.storeUnencoded) ? newOptions.storeUnencoded : oldOptions.storeUnencoded,
    };
}
function safeDecodeURIComponent(str) {
    try {
        return decodeURIComponent(str);
    }
    catch (e) {
        return str;
    }
}
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return str;
    }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cookieServiceFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cookie_service__ = __webpack_require__(2);

function cookieServiceFactory(cookieOptionsProvider) {
    return new __WEBPACK_IMPORTED_MODULE_0__cookie_service__["a" /* CookieService */](cookieOptionsProvider);
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieModule", function() { return CookieModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_cookie_options_provider__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cookie_service__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_cookie_factory__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CookieService", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cookie_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_cookie_backend_service__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CookieBackendService", function() { return __WEBPACK_IMPORTED_MODULE_4__src_cookie_backend_service__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COOKIE_OPTIONS", function() { return __WEBPACK_IMPORTED_MODULE_1__src_cookie_options_provider__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CookieOptionsProvider", function() { return __WEBPACK_IMPORTED_MODULE_1__src_cookie_options_provider__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "cookieServiceFactory", function() { return __WEBPACK_IMPORTED_MODULE_3__src_cookie_factory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isBlank", function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isPresent", function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "mergeOptions", function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "safeDecodeURIComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "safeJsonParse", function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["f"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var CookieModule = (function () {
    function CookieModule() {
    }
    CookieModule_1 = CookieModule;
    /**
     * Use this method in your root module to provide the CookieService
     * @param {CookieOptions} options
     * @returns {ModuleWithProviders}
     */
    CookieModule.forRoot = function (options) {
        if (options === void 0) { options = {}; }
        return {
            ngModule: CookieModule_1,
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__src_cookie_options_provider__["a" /* COOKIE_OPTIONS */], useValue: options },
                { provide: __WEBPACK_IMPORTED_MODULE_2__src_cookie_service__["a" /* CookieService */], useFactory: __WEBPACK_IMPORTED_MODULE_3__src_cookie_factory__["a" /* cookieServiceFactory */], deps: [__WEBPACK_IMPORTED_MODULE_1__src_cookie_options_provider__["b" /* CookieOptionsProvider */]] }
            ]
        };
    };
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     * @param {CookieOptions} options
     * @returns {ModuleWithProviders}
     */
    CookieModule.forChild = function (options) {
        if (options === void 0) { options = {}; }
        return {
            ngModule: CookieModule_1,
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__src_cookie_options_provider__["a" /* COOKIE_OPTIONS */], useValue: options },
                { provide: __WEBPACK_IMPORTED_MODULE_2__src_cookie_service__["a" /* CookieService */], useFactory: __WEBPACK_IMPORTED_MODULE_3__src_cookie_factory__["a" /* cookieServiceFactory */], deps: [__WEBPACK_IMPORTED_MODULE_1__src_cookie_options_provider__["b" /* CookieOptionsProvider */]] }
            ]
        };
    };
    CookieModule = CookieModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [__WEBPACK_IMPORTED_MODULE_1__src_cookie_options_provider__["b" /* CookieOptionsProvider */]]
        })
    ], CookieModule);
    return CookieModule;
    var CookieModule_1;
}());



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CookieBackendService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cookie_service__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cookie_options_provider__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var CookieBackendService = (function (_super) {
    __extends(CookieBackendService, _super);
    function CookieBackendService(request, response, _optionsProvider) {
        var _this = _super.call(this, _optionsProvider) || this;
        _this.request = request;
        _this.response = response;
        return _this;
    }
    Object.defineProperty(CookieBackendService.prototype, "cookieString", {
        get: function () {
            return this.request.headers.cookie || '';
        },
        set: function (val) {
            this.request.headers.cookie = val;
            this.response.headers.cookie = val;
        },
        enumerable: true,
        configurable: true
    });
    CookieBackendService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('REQUEST')),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('RESPONSE')),
        __metadata("design:paramtypes", [Object, Object, __WEBPACK_IMPORTED_MODULE_2__cookie_options_provider__["b" /* CookieOptionsProvider */]])
    ], CookieBackendService);
    return CookieBackendService;
}(__WEBPACK_IMPORTED_MODULE_1__cookie_service__["a" /* CookieService */]));



/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0ODNlNDJkYTYyNjNjZmRjZWYxOCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9jb3JlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nvb2tpZS1vcHRpb25zLXByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb29raWUuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nvb2tpZS5mYWN0b3J5LnRzIiwid2VicGFjazovLy8uL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBhbmd1bGFyL2NvbW1vblwiIiwid2VicGFjazovLy8uL3NyYy9jb29raWUtYmFja2VuZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsK0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTZFO0FBQzdCO0FBR1Q7QUFFaEMsSUFBTSxjQUFjLEdBQUcsSUFB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VyxZQUFZLENBOEJ4QjtJQUFELG1CQUFDOztDQUFBO0FBOUJ3Qjs7Ozs7OztBQ2pCekIsK0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBbUQ7QUFFRjtBQUNpQjtBQUdsRTtJQUEwQyx3Q0FBYTtJQUVyRCw4QkFBdUMsT0FBWSxFQUNYLFFBQWEsRUFDekMsZ0JBQXVDO1FBRm5ELFlBR0Usa0JBQU0sZ0JBQWdCLENBQUMsU0FDeEI7UUFKc0MsYUFBTyxHQUFQLE9BQU8sQ0FBSztRQUNYLGNBQVEsR0FBUixRQUFRLENBQUs7O0lBR3JELENBQUM7SUFFRCxzQkFBYyw4Q0FBWTthQUExQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzNDLENBQUM7YUFFRCxVQUEyQixHQUFXO1lBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNyQyxDQUFDOzs7T0FMQTtJQVZVLG9CQUFvQjtRQURoQyxpRUFBVSxFQUFFO1FBR0Usd0VBQU0sQ0FBQyxTQUFTLENBQUM7UUFDakIsd0VBQU0sQ0FBQyxVQUFVLENBQUM7eURBQ0QsdUZBQXFCO09BSnhDLG9CQUFvQixDQWdCaEM7SUFBRCwyQkFBQztDQUFBLENBaEJ5QyxzRUFBYSxHQWdCdEQ7QUFoQmdDIiwiZmlsZSI6Im5neC1jb29raWUudW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKSwgcmVxdWlyZShcIkBhbmd1bGFyL2NvbW1vblwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJAYW5ndWxhci9jb3JlXCIsIFwiQGFuZ3VsYXIvY29tbW9uXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5neC1jb29raWVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpLCByZXF1aXJlKFwiQGFuZ3VsYXIvY29tbW9uXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuZ3gtY29va2llXCJdID0gZmFjdG9yeShyb290W1wiQGFuZ3VsYXIvY29yZVwiXSwgcm9vdFtcIkBhbmd1bGFyL2NvbW1vblwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQ4M2U0MmRhNjI2M2NmZGNlZjE4IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBhbmd1bGFyL2NvcmVcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQVBQX0JBU0VfSFJFRiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IENvb2tpZU9wdGlvbnMgfSBmcm9tICcuL2Nvb2tpZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IG1lcmdlT3B0aW9ucyB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgQ09PS0lFX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29va2llT3B0aW9ucz4oJ0NPT0tJRV9PUFRJT05TJyk7XG5cbi8qKiBAcHJpdmF0ZSAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvb2tpZU9wdGlvbnNQcm92aWRlciB7XG5cbiAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogQ29va2llT3B0aW9ucztcbiAgcHJpdmF0ZSBfb3B0aW9uczogQ29va2llT3B0aW9ucztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KENPT0tJRV9PUFRJT05TKSBvcHRpb25zOiBDb29raWVPcHRpb25zID0ge30sXG4gICAgICAgICAgICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBwYXRoOiB0aGlzLl9pbmplY3Rvci5nZXQoQVBQX0JBU0VfSFJFRiwgJy8nKSxcbiAgICAgIGRvbWFpbjogbnVsbCxcbiAgICAgIGV4cGlyZXM6IG51bGwsXG4gICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgaHR0cE9ubHk6IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLl9vcHRpb25zID0gbWVyZ2VPcHRpb25zKHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0IG9wdGlvbnMoKTogQ29va2llT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2Nvb2tpZS1vcHRpb25zLXByb3ZpZGVyLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb29raWVPcHRpb25zUHJvdmlkZXIgfSBmcm9tICcuL2Nvb2tpZS1vcHRpb25zLXByb3ZpZGVyJztcbmltcG9ydCB7IENvb2tpZU9wdGlvbnMgfSBmcm9tICcuL2Nvb2tpZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IGlzQmxhbmssIGlzU3RyaW5nLCBtZXJnZU9wdGlvbnMsIHNhZmVEZWNvZGVVUklDb21wb25lbnQsIHNhZmVKc29uUGFyc2UgfSBmcm9tICcuL3V0aWxzJztcblxuZGVjbGFyZSBpbnRlcmZhY2UgRG9jdW1lbnQge1xuICBjb29raWU6IHN0cmluZztcbn1cbmRlY2xhcmUgY29uc3QgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb29raWVTZXJ2aWNlIHtcbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nO1xuICBnZXRPYmplY3Qoa2V5OiBzdHJpbmcpOiBPYmplY3Q7XG4gIGdldEFsbCgpOiBPYmplY3Q7XG4gIHB1dChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgb3B0aW9ucz86IENvb2tpZU9wdGlvbnMpOiB2b2lkO1xuICBwdXRPYmplY3Qoa2V5OiBzdHJpbmcsIHZhbHVlOiBPYmplY3QsIG9wdGlvbnM/OiBDb29raWVPcHRpb25zKTogdm9pZDtcbiAgcmVtb3ZlKGtleTogc3RyaW5nLCBvcHRpb25zPzogQ29va2llT3B0aW9ucyk6IHZvaWQ7XG4gIHJlbW92ZUFsbChvcHRpb25zPzogQ29va2llT3B0aW9ucyk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb29raWVTZXJ2aWNlIGltcGxlbWVudHMgSUNvb2tpZVNlcnZpY2Uge1xuXG4gIHByb3RlY3RlZCBvcHRpb25zOiBDb29raWVPcHRpb25zO1xuXG4gIHByb3RlY3RlZCBnZXQgY29va2llU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZSB8fCAnJztcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXQgY29va2llU3RyaW5nKHZhbDogc3RyaW5nKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gdmFsO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3B0aW9uc1Byb3ZpZGVyOiBDb29raWVPcHRpb25zUHJvdmlkZXIpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLl9vcHRpb25zUHJvdmlkZXIub3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBDb29raWVTZXJ2aWNlI2dldFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgZ2l2ZW4gY29va2llIGtleS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBJZCB0byB1c2UgZm9yIGxvb2t1cC5cbiAgICogQHJldHVybnMge3N0cmluZ30gUmF3IGNvb2tpZSB2YWx1ZS5cbiAgICovXG4gIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuICg8YW55PnRoaXMuX2Nvb2tpZVJlYWRlcigpKVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIENvb2tpZVNlcnZpY2UjZ2V0T2JqZWN0XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBSZXR1cm5zIHRoZSBkZXNlcmlhbGl6ZWQgdmFsdWUgb2YgZ2l2ZW4gY29va2llIGtleS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBJZCB0byB1c2UgZm9yIGxvb2t1cC5cbiAgICogQHJldHVybnMge09iamVjdH0gRGVzZXJpYWxpemVkIGNvb2tpZSB2YWx1ZS5cbiAgICovXG4gIGdldE9iamVjdChrZXk6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5nZXQoa2V5KTtcbiAgICByZXR1cm4gdmFsdWUgPyBzYWZlSnNvblBhcnNlKHZhbHVlKSA6IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIENvb2tpZVNlcnZpY2UjZ2V0QWxsXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBSZXR1cm5zIGEga2V5IHZhbHVlIG9iamVjdCB3aXRoIGFsbCB0aGUgY29va2llcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gQWxsIGNvb2tpZXNcbiAgICovXG4gIGdldEFsbCgpOiBPYmplY3Qge1xuICAgIHJldHVybiA8YW55PnRoaXMuX2Nvb2tpZVJlYWRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIENvb2tpZVNlcnZpY2UjcHV0XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXRzIGEgdmFsdWUgZm9yIGdpdmVuIGNvb2tpZSBrZXkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgSWQgZm9yIHRoZSBgdmFsdWVgLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgUmF3IHZhbHVlIHRvIGJlIHN0b3JlZC5cbiAgICogQHBhcmFtIHtDb29raWVPcHRpb25zfSBvcHRpb25zIChPcHRpb25hbCkgT3B0aW9ucyBvYmplY3QuXG4gICAqL1xuICBwdXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG9wdGlvbnM/OiBDb29raWVPcHRpb25zKSB7XG4gICAgdGhpcy5fY29va2llV3JpdGVyKCkoa2V5LCB2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgQ29va2llU2VydmljZSNwdXRPYmplY3RcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFNlcmlhbGl6ZXMgYW5kIHNldHMgYSB2YWx1ZSBmb3IgZ2l2ZW4gY29va2llIGtleS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBJZCBmb3IgdGhlIGB2YWx1ZWAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBWYWx1ZSB0byBiZSBzdG9yZWQuXG4gICAqIEBwYXJhbSB7Q29va2llT3B0aW9uc30gb3B0aW9ucyAoT3B0aW9uYWwpIE9wdGlvbnMgb2JqZWN0LlxuICAgKi9cbiAgcHV0T2JqZWN0KGtleTogc3RyaW5nLCB2YWx1ZTogT2JqZWN0LCBvcHRpb25zPzogQ29va2llT3B0aW9ucykge1xuICAgIHRoaXMucHV0KGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBDb29raWVTZXJ2aWNlI3JlbW92ZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmVtb3ZlIGdpdmVuIGNvb2tpZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBJZCBvZiB0aGUga2V5LXZhbHVlIHBhaXIgdG8gZGVsZXRlLlxuICAgKiBAcGFyYW0ge0Nvb2tpZU9wdGlvbnN9IG9wdGlvbnMgKE9wdGlvbmFsKSBPcHRpb25zIG9iamVjdC5cbiAgICovXG4gIHJlbW92ZShrZXk6IHN0cmluZywgb3B0aW9ucz86IENvb2tpZU9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLl9jb29raWVXcml0ZXIoKShrZXksIHVuZGVmaW5lZCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgQ29va2llU2VydmljZSNyZW1vdmVBbGxcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFJlbW92ZSBhbGwgY29va2llcy5cbiAgICovXG4gIHJlbW92ZUFsbChvcHRpb25zPzogQ29va2llT3B0aW9ucyk6IHZvaWQge1xuICAgIGxldCBjb29raWVzID0gdGhpcy5nZXRBbGwoKTtcbiAgICBPYmplY3Qua2V5cyhjb29raWVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZShrZXksIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29va2llUmVhZGVyKCk6IE9iamVjdCB7XG4gICAgbGV0IGxhc3RDb29raWVzID0ge307XG4gICAgbGV0IGxhc3RDb29raWVTdHJpbmcgPSAnJztcbiAgICBsZXQgY29va2llQXJyYXk6IHN0cmluZ1tdLCBjb29raWU6IHN0cmluZywgaTogbnVtYmVyLCBpbmRleDogbnVtYmVyLCBuYW1lOiBzdHJpbmc7XG4gICAgbGV0IGN1cnJlbnRDb29raWVTdHJpbmcgPSB0aGlzLmNvb2tpZVN0cmluZztcbiAgICBpZiAoY3VycmVudENvb2tpZVN0cmluZyAhPT0gbGFzdENvb2tpZVN0cmluZykge1xuICAgICAgbGFzdENvb2tpZVN0cmluZyA9IGN1cnJlbnRDb29raWVTdHJpbmc7XG4gICAgICBjb29raWVBcnJheSA9IGxhc3RDb29raWVTdHJpbmcuc3BsaXQoJzsgJyk7XG4gICAgICBsYXN0Q29va2llcyA9IHt9O1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNvb2tpZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvb2tpZSA9IGNvb2tpZUFycmF5W2ldO1xuICAgICAgICBpbmRleCA9IGNvb2tpZS5pbmRleE9mKCc9Jyk7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHsgIC8vIGlnbm9yZSBuYW1lbGVzcyBjb29raWVzXG4gICAgICAgICAgbmFtZSA9IHNhZmVEZWNvZGVVUklDb21wb25lbnQoY29va2llLnN1YnN0cmluZygwLCBpbmRleCkpO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCB2YWx1ZSB0aGF0IGlzIHNlZW4gZm9yIGEgY29va2llIGlzIHRoZSBtb3N0XG4gICAgICAgICAgLy8gc3BlY2lmaWMgb25lLiAgdmFsdWVzIGZvciB0aGUgc2FtZSBjb29raWUgbmFtZSB0aGF0XG4gICAgICAgICAgLy8gZm9sbG93IGFyZSBmb3IgbGVzcyBzcGVjaWZpYyBwYXRocy5cbiAgICAgICAgICBpZiAoaXNCbGFuaygoPGFueT5sYXN0Q29va2llcylbbmFtZV0pKSB7XG4gICAgICAgICAgICAoPGFueT5sYXN0Q29va2llcylbbmFtZV0gPSBzYWZlRGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZS5zdWJzdHJpbmcoaW5kZXggKyAxKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsYXN0Q29va2llcztcbiAgfVxuXG4gIHByaXZhdGUgX2Nvb2tpZVdyaXRlcigpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgb3B0aW9ucz86IENvb2tpZU9wdGlvbnMpIHtcbiAgICAgIHRoYXQuY29va2llU3RyaW5nID0gdGhhdC5fYnVpbGRDb29raWVTdHJpbmcobmFtZSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9idWlsZENvb2tpZVN0cmluZyhuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG9wdGlvbnM/OiBDb29raWVPcHRpb25zKTogc3RyaW5nIHtcbiAgICBsZXQgb3B0czogQ29va2llT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIGxldCBleHBpcmVzOiBhbnkgPSBvcHRzLmV4cGlyZXM7XG4gICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICBleHBpcmVzID0gJ1RodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UJztcbiAgICAgIHZhbHVlID0gJyc7XG4gICAgfVxuICAgIGlmIChpc1N0cmluZyhleHBpcmVzKSkge1xuICAgICAgZXhwaXJlcyA9IG5ldyBEYXRlKGV4cGlyZXMpO1xuICAgIH1cbiAgICBsZXQgY29va2llVmFsdWUgPSBvcHRzLnN0b3JlVW5lbmNvZGVkID8gdmFsdWUgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIGxldCBzdHIgPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBjb29raWVWYWx1ZTtcbiAgICBzdHIgKz0gb3B0cy5wYXRoID8gJztwYXRoPScgKyBvcHRzLnBhdGggOiAnJztcbiAgICBzdHIgKz0gb3B0cy5kb21haW4gPyAnO2RvbWFpbj0nICsgb3B0cy5kb21haW4gOiAnJztcbiAgICBzdHIgKz0gZXhwaXJlcyA/ICc7ZXhwaXJlcz0nICsgZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJyc7XG4gICAgc3RyICs9IG9wdHMuc2VjdXJlID8gJztzZWN1cmUnIDogJyc7XG4gICAgc3RyICs9IG9wdHMuaHR0cE9ubHkgPyAnOyBIdHRwT25seScgOiAnJztcblxuICAgIC8vIHBlciBodHRwOi8vd3d3LmlldGYub3JnL3JmYy9yZmMyMTA5LnR4dCBicm93c2VyIG11c3QgYWxsb3cgYXQgbWluaW11bTpcbiAgICAvLyAtIDMwMCBjb29raWVzXG4gICAgLy8gLSAyMCBjb29raWVzIHBlciB1bmlxdWUgZG9tYWluXG4gICAgLy8gLSA0MDk2IGJ5dGVzIHBlciBjb29raWVcbiAgICBsZXQgY29va2llTGVuZ3RoID0gc3RyLmxlbmd0aCArIDE7XG4gICAgaWYgKGNvb2tpZUxlbmd0aCA+IDQwOTYpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBDb29raWUgXFwnJHtuYW1lfVxcJyBwb3NzaWJseSBub3Qgc2V0IG9yIG92ZXJmbG93ZWQgYmVjYXVzZSBpdCB3YXMgdG9vIFxuICAgICAgbGFyZ2UgKCR7Y29va2llTGVuZ3RofSA+IDQwOTYgYnl0ZXMpIWApO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2Nvb2tpZS5zZXJ2aWNlLnRzIiwiaW1wb3J0IHsgQ29va2llT3B0aW9ucyB9IGZyb20gJy4vY29va2llLW9wdGlvbnMubW9kZWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmVzZW50KG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhvYmo6IGFueSk6IG9iaiBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9wdGlvbnMob2xkT3B0aW9uczogQ29va2llT3B0aW9ucywgbmV3T3B0aW9ucz86IENvb2tpZU9wdGlvbnMpOiBDb29raWVPcHRpb25zIHtcbiAgaWYgKCFuZXdPcHRpb25zKSB7XG4gICAgcmV0dXJuIG9sZE9wdGlvbnM7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwYXRoOiBpc1ByZXNlbnQobmV3T3B0aW9ucy5wYXRoKSA/IG5ld09wdGlvbnMucGF0aCA6IG9sZE9wdGlvbnMucGF0aCxcbiAgICBkb21haW46IGlzUHJlc2VudChuZXdPcHRpb25zLmRvbWFpbikgPyBuZXdPcHRpb25zLmRvbWFpbiA6IG9sZE9wdGlvbnMuZG9tYWluLFxuICAgIGV4cGlyZXM6IGlzUHJlc2VudChuZXdPcHRpb25zLmV4cGlyZXMpID8gbmV3T3B0aW9ucy5leHBpcmVzIDogb2xkT3B0aW9ucy5leHBpcmVzLFxuICAgIHNlY3VyZTogaXNQcmVzZW50KG5ld09wdGlvbnMuc2VjdXJlKSA/IG5ld09wdGlvbnMuc2VjdXJlIDogb2xkT3B0aW9ucy5zZWN1cmUsXG4gICAgc3RvcmVVbmVuY29kZWQ6IGlzUHJlc2VudChuZXdPcHRpb25zLnN0b3JlVW5lbmNvZGVkKSA/IG5ld09wdGlvbnMuc3RvcmVVbmVuY29kZWQgOiBvbGRPcHRpb25zLnN0b3JlVW5lbmNvZGVkLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZURlY29kZVVSSUNvbXBvbmVudChzdHI6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVKc29uUGFyc2Uoc3RyOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvdXRpbHMudHMiLCJpbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVPcHRpb25zUHJvdmlkZXIgfSBmcm9tICcuL2Nvb2tpZS1vcHRpb25zLXByb3ZpZGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvb2tpZVNlcnZpY2VGYWN0b3J5KGNvb2tpZU9wdGlvbnNQcm92aWRlcjogQ29va2llT3B0aW9uc1Byb3ZpZGVyKTogQ29va2llU2VydmljZSB7XG4gIHJldHVybiBuZXcgQ29va2llU2VydmljZShjb29raWVPcHRpb25zUHJvdmlkZXIpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29va2llLmZhY3RvcnkudHMiLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDT09LSUVfT1BUSU9OUywgQ29va2llT3B0aW9uc1Byb3ZpZGVyIH0gZnJvbSAnLi9zcmMvY29va2llLW9wdGlvbnMtcHJvdmlkZXInO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4vc3JjL2Nvb2tpZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvb2tpZU9wdGlvbnMgfSBmcm9tICcuL3NyYy9jb29raWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBjb29raWVTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vc3JjL2Nvb2tpZS5mYWN0b3J5JztcblxuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29va2llLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29va2llLWJhY2tlbmQuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb29raWUtb3B0aW9ucy5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb29raWUtb3B0aW9ucy1wcm92aWRlcic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb29raWUuZmFjdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy91dGlscyc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW0Nvb2tpZU9wdGlvbnNQcm92aWRlcl1cbn0pXG5leHBvcnQgY2xhc3MgQ29va2llTW9kdWxlIHtcbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHJvb3QgbW9kdWxlIHRvIHByb3ZpZGUgdGhlIENvb2tpZVNlcnZpY2VcbiAgICogQHBhcmFtIHtDb29raWVPcHRpb25zfSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtNb2R1bGVXaXRoUHJvdmlkZXJzfVxuICAgKi9cbiAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogQ29va2llT3B0aW9ucyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb29raWVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IENPT0tJRV9PUFRJT05TLCB1c2VWYWx1ZTogb3B0aW9uc30sXG4gICAgICAgIHtwcm92aWRlOiBDb29raWVTZXJ2aWNlLCB1c2VGYWN0b3J5OiBjb29raWVTZXJ2aWNlRmFjdG9yeSwgZGVwczogW0Nvb2tpZU9wdGlvbnNQcm92aWRlcl19XG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgaW4geW91ciBvdGhlciAobm9uIHJvb3QpIG1vZHVsZXMgdG8gaW1wb3J0IHRoZSBkaXJlY3RpdmUvcGlwZVxuICAgKiBAcGFyYW0ge0Nvb2tpZU9wdGlvbnN9IG9wdGlvbnNcbiAgICogQHJldHVybnMge01vZHVsZVdpdGhQcm92aWRlcnN9XG4gICAqL1xuICBzdGF0aWMgZm9yQ2hpbGQob3B0aW9uczogQ29va2llT3B0aW9ucyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb29raWVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IENPT0tJRV9PUFRJT05TLCB1c2VWYWx1ZTogb3B0aW9uc30sXG4gICAgICAgIHtwcm92aWRlOiBDb29raWVTZXJ2aWNlLCB1c2VGYWN0b3J5OiBjb29raWVTZXJ2aWNlRmFjdG9yeSwgZGVwczogW0Nvb2tpZU9wdGlvbnNQcm92aWRlcl19XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9pbmRleC50cyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9jb21tb25cIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4vY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29va2llT3B0aW9uc1Byb3ZpZGVyIH0gZnJvbSAnLi9jb29raWUtb3B0aW9ucy1wcm92aWRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb29raWVCYWNrZW5kU2VydmljZSBleHRlbmRzIENvb2tpZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ1JFUVVFU1QnKSBwcml2YXRlIHJlcXVlc3Q6IGFueSxcbiAgICAgICAgICAgICAgQEluamVjdCgnUkVTUE9OU0UnKSBwcml2YXRlIHJlc3BvbnNlOiBhbnksXG4gICAgICAgICAgICAgIF9vcHRpb25zUHJvdmlkZXI6IENvb2tpZU9wdGlvbnNQcm92aWRlcikge1xuICAgIHN1cGVyKF9vcHRpb25zUHJvdmlkZXIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBjb29raWVTdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmhlYWRlcnMuY29va2llIHx8ICcnO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldCBjb29raWVTdHJpbmcodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlcXVlc3QuaGVhZGVycy5jb29raWUgPSB2YWw7XG4gICAgdGhpcy5yZXNwb25zZS5oZWFkZXJzLmNvb2tpZSA9IHZhbDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29va2llLWJhY2tlbmQuc2VydmljZS50cyJdLCJzb3VyY2VSb290IjoiIn0=