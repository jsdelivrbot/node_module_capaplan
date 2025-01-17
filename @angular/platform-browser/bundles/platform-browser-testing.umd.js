/**
 * @license Angular v6.1.0
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@angular/platform-browser/testing', ['exports', '@angular/core', '@angular/platform-browser'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.platformBrowser = global.ng.platformBrowser || {}, global.ng.platformBrowser.testing = {}),global.ng.core,global.ng.platformBrowser));
}(this, (function (exports,core,platformBrowser) { 'use strict';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var BrowserDetection = /** @class */ (function () {
        function BrowserDetection(ua) {
            this._overrideUa = ua;
        }
        Object.defineProperty(BrowserDetection.prototype, "_ua", {
            get: function () {
                if (typeof this._overrideUa === 'string') {
                    return this._overrideUa;
                }
                return platformBrowser.ɵgetDOM() ? platformBrowser.ɵgetDOM().getUserAgent() : '';
            },
            enumerable: true,
            configurable: true
        });
        BrowserDetection.setup = function () { };
        Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
            get: function () { return this._ua.indexOf('Firefox') > -1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
            get: function () {
                return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
                    this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
                    this._ua.indexOf('IEMobile') == -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isEdge", {
            get: function () { return this._ua.indexOf('Edge') > -1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isIE", {
            get: function () { return this._ua.indexOf('Trident') > -1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
            get: function () {
                return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
                    this._ua.indexOf('IEMobile') == -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
            get: function () {
                return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
                    this._ua.indexOf('IEMobile') == -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isSlow", {
            get: function () { return this.isAndroid || this.isIE || this.isIOS7; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "supportsNativeIntlApi", {
            // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
            // This detector is needed in tests to make the difference between:
            // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
            // 2) IE9/IE10: they use the polyfill, and so no discrepancies
            get: function () {
                return !!core.ɵglobal.Intl && core.ɵglobal.Intl !== core.ɵglobal.IntlPolyfill;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isChromeDesktop", {
            get: function () {
                return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
                    this._ua.indexOf('Edge') == -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isOldChrome", {
            // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
            // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).
            get: function () {
                return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
                    this._ua.indexOf('Edge') == -1;
            },
            enumerable: true,
            configurable: true
        });
        return BrowserDetection;
    }());
    BrowserDetection.setup();
    function createNgZone() {
        return new core.NgZone({ enableLongStackTrace: true });
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function initBrowserTests() {
        platformBrowser.ɵBrowserDomAdapter.makeCurrent();
        BrowserDetection.setup();
    }
    var _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: core.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
    /**
     * Platform for testing
     *
     *
     */
    var platformBrowserTesting = core.createPlatformFactory(core.platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
    var ɵ0 = createNgZone;
    /**
     * NgModule for testing.
     *
     *
     */
    var BrowserTestingModule = /** @class */ (function () {
        function BrowserTestingModule() {
        }
        BrowserTestingModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [platformBrowser.BrowserModule],
                        providers: [
                            { provide: core.APP_ID, useValue: 'a' },
                            platformBrowser.ɵELEMENT_PROBE_PROVIDERS,
                            { provide: core.NgZone, useFactory: ɵ0 },
                        ]
                    },] }
        ];
        return BrowserTestingModule;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵangular_packages_platform_browser_testing_testing_a = createNgZone;
    exports.platformBrowserTesting = platformBrowserTesting;
    exports.BrowserTestingModule = BrowserTestingModule;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-browser-testing.umd.js.map
