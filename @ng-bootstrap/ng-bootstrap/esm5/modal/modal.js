/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Injector, ComponentFactoryResolver } from '@angular/core';
import { NgbModalStack } from './modal-stack';
import * as i0 from "@angular/core";
import * as i1 from "./modal-stack";
/**
 * Represent options available when opening new modal windows.
 * @record
 */
export function NgbModalOptions() { }
/**
 * Sets the aria attribute aria-labelledby to a modal window.
 *
 * \@since 2.2.0
 * @type {?|undefined}
 */
NgbModalOptions.prototype.ariaLabelledBy;
/**
 * Whether a backdrop element should be created for a given modal (true by default).
 * Alternatively, specify 'static' for a backdrop which doesn't close the modal on click.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.backdrop;
/**
 * Function called when a modal will be dismissed.
 * If this function returns false, the promise is resolved with false or the promise is rejected, the modal is not
 * dismissed.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.beforeDismiss;
/**
 * To center the modal vertically (false by default).
 *
 * \@since 1.1.0
 * @type {?|undefined}
 */
NgbModalOptions.prototype.centered;
/**
 * An element to which to attach newly opened modal windows.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.container;
/**
 * Injector to use for modal content.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.injector;
/**
 * Whether to close the modal when escape key is pressed (true by default).
 * @type {?|undefined}
 */
NgbModalOptions.prototype.keyboard;
/**
 * Size of a new modal window.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.size;
/**
 * Custom class to append to the modal window
 * @type {?|undefined}
 */
NgbModalOptions.prototype.windowClass;
/**
 * Custom class to append to the modal backdrop
 *
 * \@since 1.1.0
 * @type {?|undefined}
 */
NgbModalOptions.prototype.backdropClass;
/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 */
var NgbModal = /** @class */ (function () {
    function NgbModal(_moduleCFR, _injector, _modalStack) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
    }
    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content than instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     */
    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content than instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NgbModal.prototype.open = /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content than instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        if (options === void 0) { options = {}; }
        return this._modalStack.open(this._moduleCFR, this._injector, content, options);
    };
    NgbModal.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    NgbModal.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: NgbModalStack }
    ]; };
    /** @nocollapse */ NgbModal.ngInjectableDef = i0.defineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(i0.inject(i0.ComponentFactoryResolver), i0.inject(i0.INJECTOR), i0.inject(i1.NgbModalStack)); }, token: NgbModal, providedIn: "root" });
    return NgbModal;
}());
export { NgbModal };
if (false) {
    /** @type {?} */
    NgbModal.prototype._moduleCFR;
    /** @type {?} */
    NgbModal.prototype._injector;
    /** @type {?} */
    NgbModal.prototype._modalStack;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5RTFDLGtCQUNZLFlBQThDLFNBQW1CLEVBQVUsV0FBMEI7UUFBckcsZUFBVSxHQUFWLFVBQVU7UUFBb0MsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFlO0tBQUk7SUFFckg7Ozs7O09BS0c7Ozs7Ozs7Ozs7SUFDSCx1QkFBSTs7Ozs7Ozs7O0lBQUosVUFBSyxPQUFZLEVBQUUsT0FBNkI7UUFBN0Isd0JBQUEsRUFBQSxZQUE2QjtRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNqRjs7Z0JBYkYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OztnQkF6RUYsd0JBQXdCO2dCQUFsQyxRQUFRO2dCQUVwQixhQUFhOzs7bUJBRnJCOztTQTBFYSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3RvciwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JNb2RhbFN0YWNrfSBmcm9tICcuL21vZGFsLXN0YWNrJztcbmltcG9ydCB7TmdiTW9kYWxSZWZ9IGZyb20gJy4vbW9kYWwtcmVmJztcblxuLyoqXG4gKiBSZXByZXNlbnQgb3B0aW9ucyBhdmFpbGFibGUgd2hlbiBvcGVuaW5nIG5ldyBtb2RhbCB3aW5kb3dzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYk1vZGFsT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhcmlhIGF0dHJpYnV0ZSBhcmlhLWxhYmVsbGVkYnkgdG8gYSBtb2RhbCB3aW5kb3cuXG4gICAqXG4gICAqIEBzaW5jZSAyLjIuMFxuICAgKi9cbiAgYXJpYUxhYmVsbGVkQnk/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgYSBiYWNrZHJvcCBlbGVtZW50IHNob3VsZCBiZSBjcmVhdGVkIGZvciBhIGdpdmVuIG1vZGFsICh0cnVlIGJ5IGRlZmF1bHQpLlxuICAgKiBBbHRlcm5hdGl2ZWx5LCBzcGVjaWZ5ICdzdGF0aWMnIGZvciBhIGJhY2tkcm9wIHdoaWNoIGRvZXNuJ3QgY2xvc2UgdGhlIG1vZGFsIG9uIGNsaWNrLlxuICAgKi9cbiAgYmFja2Ryb3A/OiBib29sZWFuIHwgJ3N0YXRpYyc7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIGEgbW9kYWwgd2lsbCBiZSBkaXNtaXNzZWQuXG4gICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBmYWxzZSBvciB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCwgdGhlIG1vZGFsIGlzIG5vdFxuICAgKiBkaXNtaXNzZWQuXG4gICAqL1xuICBiZWZvcmVEaXNtaXNzPzogKCkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIFRvIGNlbnRlciB0aGUgbW9kYWwgdmVydGljYWxseSAoZmFsc2UgYnkgZGVmYXVsdCkuXG4gICAqXG4gICAqIEBzaW5jZSAxLjEuMFxuICAgKi9cbiAgY2VudGVyZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbiBlbGVtZW50IHRvIHdoaWNoIHRvIGF0dGFjaCBuZXdseSBvcGVuZWQgbW9kYWwgd2luZG93cy5cbiAgICovXG4gIGNvbnRhaW5lcj86IHN0cmluZztcblxuICAvKipcbiAgICogSW5qZWN0b3IgdG8gdXNlIGZvciBtb2RhbCBjb250ZW50LlxuICAgKi9cbiAgaW5qZWN0b3I/OiBJbmplY3RvcjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBjbG9zZSB0aGUgbW9kYWwgd2hlbiBlc2NhcGUga2V5IGlzIHByZXNzZWQgKHRydWUgYnkgZGVmYXVsdCkuXG4gICAqL1xuICBrZXlib2FyZD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgYSBuZXcgbW9kYWwgd2luZG93LlxuICAgKi9cbiAgc2l6ZT86ICdzbScgfCAnbGcnO1xuXG4gIC8qKlxuICAgKiBDdXN0b20gY2xhc3MgdG8gYXBwZW5kIHRvIHRoZSBtb2RhbCB3aW5kb3dcbiAgICovXG4gIHdpbmRvd0NsYXNzPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDdXN0b20gY2xhc3MgdG8gYXBwZW5kIHRvIHRoZSBtb2RhbCBiYWNrZHJvcFxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRvIG9wZW4gbW9kYWwgd2luZG93cy4gQ3JlYXRpbmcgYSBtb2RhbCBpcyBzdHJhaWdodGZvcndhcmQ6IGNyZWF0ZSBhIHRlbXBsYXRlIGFuZCBwYXNzIGl0IGFzIGFuIGFyZ3VtZW50IHRvXG4gKiB0aGUgXCJvcGVuXCIgbWV0aG9kIVxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfbW9kYWxTdGFjazogTmdiTW9kYWxTdGFjaykge31cblxuICAvKipcbiAgICogT3BlbnMgYSBuZXcgbW9kYWwgd2luZG93IHdpdGggdGhlIHNwZWNpZmllZCBjb250ZW50IGFuZCB1c2luZyBzdXBwbGllZCBvcHRpb25zLiBDb250ZW50IGNhbiBiZSBwcm92aWRlZFxuICAgKiBhcyBhIFRlbXBsYXRlUmVmIG9yIGEgY29tcG9uZW50IHR5cGUuIElmIHlvdSBwYXNzIGEgY29tcG9uZW50IHR5cGUgYXMgY29udGVudCB0aGFuIGluc3RhbmNlcyBvZiB0aG9zZVxuICAgKiBjb21wb25lbnRzIGNhbiBiZSBpbmplY3RlZCB3aXRoIGFuIGluc3RhbmNlIG9mIHRoZSBOZ2JBY3RpdmVNb2RhbCBjbGFzcy4gWW91IGNhbiB1c2UgbWV0aG9kcyBvbiB0aGVcbiAgICogTmdiQWN0aXZlTW9kYWwgY2xhc3MgdG8gY2xvc2UgLyBkaXNtaXNzIG1vZGFscyBmcm9tIFwiaW5zaWRlXCIgb2YgYSBjb21wb25lbnQuXG4gICAqL1xuICBvcGVuKGNvbnRlbnQ6IGFueSwgb3B0aW9uczogTmdiTW9kYWxPcHRpb25zID0ge30pOiBOZ2JNb2RhbFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGFsU3RhY2sub3Blbih0aGlzLl9tb2R1bGVDRlIsIHRoaXMuX2luamVjdG9yLCBjb250ZW50LCBvcHRpb25zKTtcbiAgfVxufVxuIl19