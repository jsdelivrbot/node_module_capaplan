/**
 * @license Angular v6.1.0
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/upgrade/static')) :
    typeof define === 'function' && define.amd ? define('@angular/router/upgrade', ['exports', '@angular/core', '@angular/router', '@angular/upgrade/static'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.router = global.ng.router || {}, global.ng.router.upgrade = {}),global.ng.core,global.ng.router,global.ng.upgrade.static));
}(this, (function (exports,core,router,_static) { 'use strict';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     *
     * Creates an initializer that in addition to setting up the Angular
     * router sets up the ngRoute integration.
     *
     * ```
     * @NgModule({
     *  imports: [
     *   RouterModule.forRoot(SOME_ROUTES),
     *   UpgradeModule
     * ],
     * providers: [
     *   RouterUpgradeInitializer
     * ]
     * })
     * export class AppModule {
     *   ngDoBootstrap() {}
     * }
     * ```
     *
     * @experimental
     */
    var RouterUpgradeInitializer = {
        provide: core.APP_BOOTSTRAP_LISTENER,
        multi: true,
        useFactory: locationSyncBootstrapListener,
        deps: [_static.UpgradeModule]
    };
    /**
     * @internal
     */
    function locationSyncBootstrapListener(ngUpgrade) {
        return function () { setUpLocationSync(ngUpgrade); };
    }
    /**
     * @description
     *
     * Sets up a location synchronization.
     *
     * History.pushState does not fire onPopState, so the Angular location
     * doesn't detect it. The workaround is to attach a location change listener
     *
     * @experimental
     */
    function setUpLocationSync(ngUpgrade) {
        if (!ngUpgrade.$injector) {
            throw new Error("\n        RouterUpgradeInitializer can be used only after UpgradeModule.bootstrap has been called.\n        Remove RouterUpgradeInitializer and call setUpLocationSync after UpgradeModule.bootstrap.\n      ");
        }
        var router$$1 = ngUpgrade.injector.get(router.Router);
        var url = document.createElement('a');
        ngUpgrade.$injector.get('$rootScope')
            .$on('$locationChangeStart', function (_, next, __) {
            url.href = next;
            router$$1.navigateByUrl(url.pathname + url.search + url.hash);
        });
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // This file only reexports content of the `src` folder. Keep it that way.

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

    exports.RouterUpgradeInitializer = RouterUpgradeInitializer;
    exports.locationSyncBootstrapListener = locationSyncBootstrapListener;
    exports.setUpLocationSync = setUpLocationSync;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=router-upgrade.umd.js.map
