/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgbAccordionModule } from './accordion/accordion.module';
import { NgbAlertModule } from './alert/alert.module';
import { NgbButtonsModule } from './buttons/buttons.module';
import { NgbCarouselModule } from './carousel/carousel.module';
import { NgbCollapseModule } from './collapse/collapse.module';
import { NgbDatepickerModule } from './datepicker/datepicker.module';
import { NgbDropdownModule } from './dropdown/dropdown.module';
import { NgbModalModule } from './modal/modal.module';
import { NgbPaginationModule } from './pagination/pagination.module';
import { NgbPopoverModule } from './popover/popover.module';
import { NgbProgressbarModule } from './progressbar/progressbar.module';
import { NgbRatingModule } from './rating/rating.module';
import { NgbTabsetModule } from './tabset/tabset.module';
import { NgbTimepickerModule } from './timepicker/timepicker.module';
import { NgbTooltipModule } from './tooltip/tooltip.module';
import { NgbTypeaheadModule } from './typeahead/typeahead.module';
export { NgbAccordionModule, NgbAccordionConfig, NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent } from './accordion/accordion.module';
export { NgbAlertModule, NgbAlertConfig, NgbAlert } from './alert/alert.module';
export { NgbButtonsModule, NgbCheckBox, NgbRadioGroup } from './buttons/buttons.module';
export { NgbCarouselModule, NgbCarouselConfig, NgbCarousel, NgbSlide } from './carousel/carousel.module';
export { NgbCollapseModule, NgbCollapse } from './collapse/collapse.module';
export { NgbCalendar, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarPersian, NgbDatepickerModule, NgbDatepickerI18n, NgbDatepickerConfig, NgbDate, NgbDateParserFormatter, NgbDateAdapter, NgbDateNativeAdapter, NgbDatepicker, NgbInputDatepicker } from './datepicker/datepicker.module';
export { NgbDropdownModule, NgbDropdownConfig, NgbDropdown } from './dropdown/dropdown.module';
export { NgbModalModule, NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from './modal/modal.module';
export { NgbPaginationModule, NgbPaginationConfig, NgbPagination } from './pagination/pagination.module';
export { NgbPopoverModule, NgbPopoverConfig, NgbPopover } from './popover/popover.module';
export { NgbProgressbarModule, NgbProgressbarConfig, NgbProgressbar } from './progressbar/progressbar.module';
export { NgbRatingModule, NgbRatingConfig, NgbRating } from './rating/rating.module';
export { NgbTabsetModule, NgbTabsetConfig, NgbTabset, NgbTab, NgbTabContent, NgbTabTitle } from './tabset/tabset.module';
export { NgbTimepickerModule, NgbTimepickerConfig, NgbTimepicker, NgbTimeAdapter } from './timepicker/timepicker.module';
export { NgbTooltipModule, NgbTooltipConfig, NgbTooltip } from './tooltip/tooltip.module';
export { NgbHighlight, NgbTypeaheadModule, NgbTypeaheadConfig, NgbTypeahead } from './typeahead/typeahead.module';
/** @type {?} */
const NGB_MODULES = [
    NgbAccordionModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule,
    NgbDropdownModule, NgbModalModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbRatingModule,
    NgbTabsetModule, NgbTimepickerModule, NgbTooltipModule, NgbTypeaheadModule
];
/**
 * NgbRootModule is no longer necessary, you can simply import NgbModule
 * Will be removed in 4.0.0.
 *
 * @deprecated 3.0.0
 */
export class NgbRootModule {
}
NgbRootModule.decorators = [
    { type: NgModule, args: [{ imports: [NGB_MODULES], exports: NGB_MODULES },] },
];
export class NgbModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbRootModule }; }
}
NgbModule.decorators = [
    { type: NgModule, args: [{ imports: NGB_MODULES, exports: NGB_MODULES },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUMsa0JBQWtCLEVBQXNCLE1BQU0sOEJBQThCLENBQUM7QUFDckYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQThELE1BQU0sc0JBQXNCLENBQUM7QUFDakgsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQW9CLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGtCQUFrQixFQUE4QixNQUFNLDhCQUE4QixDQUFDO0FBRTdGLE9BQU8sRUFD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Z3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiQWNjb3JkaW9uTW9kdWxlLCBOZ2JQYW5lbENoYW5nZUV2ZW50fSBmcm9tICcuL2FjY29yZGlvbi9hY2NvcmRpb24ubW9kdWxlJztcbmltcG9ydCB7TmdiQWxlcnRNb2R1bGV9IGZyb20gJy4vYWxlcnQvYWxlcnQubW9kdWxlJztcbmltcG9ydCB7TmdiQnV0dG9uc01vZHVsZX0gZnJvbSAnLi9idXR0b25zL2J1dHRvbnMubW9kdWxlJztcbmltcG9ydCB7TmdiQ2Fyb3VzZWxNb2R1bGV9IGZyb20gJy4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcbmltcG9ydCB7TmdiQ29sbGFwc2VNb2R1bGV9IGZyb20gJy4vY29sbGFwc2UvY29sbGFwc2UubW9kdWxlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlck1vZHVsZX0gZnJvbSAnLi9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlJztcbmltcG9ydCB7TmdiRHJvcGRvd25Nb2R1bGV9IGZyb20gJy4vZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7TmdiTW9kYWxNb2R1bGUsIE5nYk1vZGFsLCBOZ2JNb2RhbE9wdGlvbnMsIE5nYk1vZGFsUmVmLCBNb2RhbERpc21pc3NSZWFzb25zfSBmcm9tICcuL21vZGFsL21vZGFsLm1vZHVsZSc7XG5pbXBvcnQge05nYlBhZ2luYXRpb25Nb2R1bGV9IGZyb20gJy4vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZSc7XG5pbXBvcnQge05nYlBvcG92ZXJNb2R1bGV9IGZyb20gJy4vcG9wb3Zlci9wb3BvdmVyLm1vZHVsZSc7XG5pbXBvcnQge05nYlByb2dyZXNzYmFyTW9kdWxlfSBmcm9tICcuL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLm1vZHVsZSc7XG5pbXBvcnQge05nYlJhdGluZ01vZHVsZX0gZnJvbSAnLi9yYXRpbmcvcmF0aW5nLm1vZHVsZSc7XG5pbXBvcnQge05nYlRhYnNldE1vZHVsZSwgTmdiVGFiQ2hhbmdlRXZlbnR9IGZyb20gJy4vdGFic2V0L3RhYnNldC5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JUaW1lcGlja2VyTW9kdWxlfSBmcm9tICcuL3RpbWVwaWNrZXIvdGltZXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JUb29sdGlwTW9kdWxlfSBmcm9tICcuL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JUeXBlYWhlYWRNb2R1bGUsIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudH0gZnJvbSAnLi90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZSc7XG5cbmV4cG9ydCB7XG4gIE5nYkFjY29yZGlvbk1vZHVsZSxcbiAgTmdiUGFuZWxDaGFuZ2VFdmVudCxcbiAgTmdiQWNjb3JkaW9uQ29uZmlnLFxuICBOZ2JBY2NvcmRpb24sXG4gIE5nYlBhbmVsLFxuICBOZ2JQYW5lbFRpdGxlLFxuICBOZ2JQYW5lbENvbnRlbnRcbn0gZnJvbSAnLi9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZSc7XG5leHBvcnQge05nYkFsZXJ0TW9kdWxlLCBOZ2JBbGVydENvbmZpZywgTmdiQWxlcnR9IGZyb20gJy4vYWxlcnQvYWxlcnQubW9kdWxlJztcbmV4cG9ydCB7TmdiQnV0dG9uc01vZHVsZSwgTmdiQ2hlY2tCb3gsIE5nYlJhZGlvR3JvdXB9IGZyb20gJy4vYnV0dG9ucy9idXR0b25zLm1vZHVsZSc7XG5leHBvcnQge05nYkNhcm91c2VsTW9kdWxlLCBOZ2JDYXJvdXNlbENvbmZpZywgTmdiQ2Fyb3VzZWwsIE5nYlNsaWRlfSBmcm9tICcuL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XG5leHBvcnQge05nYkNvbGxhcHNlTW9kdWxlLCBOZ2JDb2xsYXBzZX0gZnJvbSAnLi9jb2xsYXBzZS9jb2xsYXBzZS5tb2R1bGUnO1xuZXhwb3J0IHtcbiAgTmdiQ2FsZW5kYXIsXG4gIE5nYlBlcmlvZCxcbiAgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwsXG4gIE5nYkNhbGVuZGFySXNsYW1pY1VtYWxxdXJhLFxuICBOZ2JDYWxlbmRhclBlcnNpYW4sXG4gIE5nYkRhdGVwaWNrZXJNb2R1bGUsXG4gIE5nYkRhdGVwaWNrZXJJMThuLFxuICBOZ2JEYXRlcGlja2VyQ29uZmlnLFxuICBOZ2JEYXRlU3RydWN0LFxuICBOZ2JEYXRlLFxuICBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyLFxuICBOZ2JEYXRlQWRhcHRlcixcbiAgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIsXG4gIE5nYkRhdGVwaWNrZXIsXG4gIE5nYklucHV0RGF0ZXBpY2tlclxufSBmcm9tICcuL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JEcm9wZG93bk1vZHVsZSwgTmdiRHJvcGRvd25Db25maWcsIE5nYkRyb3Bkb3dufSBmcm9tICcuL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZSc7XG5leHBvcnQge1xuICBOZ2JNb2RhbE1vZHVsZSxcbiAgTmdiTW9kYWwsXG4gIE5nYk1vZGFsT3B0aW9ucyxcbiAgTmdiQWN0aXZlTW9kYWwsXG4gIE5nYk1vZGFsUmVmLFxuICBNb2RhbERpc21pc3NSZWFzb25zXG59IGZyb20gJy4vbW9kYWwvbW9kYWwubW9kdWxlJztcbmV4cG9ydCB7TmdiUGFnaW5hdGlvbk1vZHVsZSwgTmdiUGFnaW5hdGlvbkNvbmZpZywgTmdiUGFnaW5hdGlvbn0gZnJvbSAnLi9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlJztcbmV4cG9ydCB7TmdiUG9wb3Zlck1vZHVsZSwgTmdiUG9wb3ZlckNvbmZpZywgTmdiUG9wb3Zlcn0gZnJvbSAnLi9wb3BvdmVyL3BvcG92ZXIubW9kdWxlJztcbmV4cG9ydCB7TmdiUHJvZ3Jlc3NiYXJNb2R1bGUsIE5nYlByb2dyZXNzYmFyQ29uZmlnLCBOZ2JQcm9ncmVzc2Jhcn0gZnJvbSAnLi9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JSYXRpbmdNb2R1bGUsIE5nYlJhdGluZ0NvbmZpZywgTmdiUmF0aW5nfSBmcm9tICcuL3JhdGluZy9yYXRpbmcubW9kdWxlJztcbmV4cG9ydCB7XG4gIE5nYlRhYnNldE1vZHVsZSxcbiAgTmdiVGFiQ2hhbmdlRXZlbnQsXG4gIE5nYlRhYnNldENvbmZpZyxcbiAgTmdiVGFic2V0LFxuICBOZ2JUYWIsXG4gIE5nYlRhYkNvbnRlbnQsXG4gIE5nYlRhYlRpdGxlXG59IGZyb20gJy4vdGFic2V0L3RhYnNldC5tb2R1bGUnO1xuZXhwb3J0IHtcbiAgTmdiVGltZXBpY2tlck1vZHVsZSxcbiAgTmdiVGltZXBpY2tlckNvbmZpZyxcbiAgTmdiVGltZVN0cnVjdCxcbiAgTmdiVGltZXBpY2tlcixcbiAgTmdiVGltZUFkYXB0ZXJcbn0gZnJvbSAnLi90aW1lcGlja2VyL3RpbWVwaWNrZXIubW9kdWxlJztcbmV4cG9ydCB7TmdiVG9vbHRpcE1vZHVsZSwgTmdiVG9vbHRpcENvbmZpZywgTmdiVG9vbHRpcH0gZnJvbSAnLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcbmV4cG9ydCB7XG4gIE5nYkhpZ2hsaWdodCxcbiAgTmdiVHlwZWFoZWFkTW9kdWxlLFxuICBOZ2JUeXBlYWhlYWRDb25maWcsXG4gIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudCxcbiAgTmdiVHlwZWFoZWFkXG59IGZyb20gJy4vdHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUnO1xuXG5leHBvcnQge1BsYWNlbWVudH0gZnJvbSAnLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuY29uc3QgTkdCX01PRFVMRVMgPSBbXG4gIE5nYkFjY29yZGlvbk1vZHVsZSwgTmdiQWxlcnRNb2R1bGUsIE5nYkJ1dHRvbnNNb2R1bGUsIE5nYkNhcm91c2VsTW9kdWxlLCBOZ2JDb2xsYXBzZU1vZHVsZSwgTmdiRGF0ZXBpY2tlck1vZHVsZSxcbiAgTmdiRHJvcGRvd25Nb2R1bGUsIE5nYk1vZGFsTW9kdWxlLCBOZ2JQYWdpbmF0aW9uTW9kdWxlLCBOZ2JQb3BvdmVyTW9kdWxlLCBOZ2JQcm9ncmVzc2Jhck1vZHVsZSwgTmdiUmF0aW5nTW9kdWxlLFxuICBOZ2JUYWJzZXRNb2R1bGUsIE5nYlRpbWVwaWNrZXJNb2R1bGUsIE5nYlRvb2x0aXBNb2R1bGUsIE5nYlR5cGVhaGVhZE1vZHVsZVxuXTtcblxuLyoqXG4gKiBOZ2JSb290TW9kdWxlIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCBOZ2JNb2R1bGVcbiAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cbiAqXG4gKiBAZGVwcmVjYXRlZCAzLjAuMFxuICovXG5ATmdNb2R1bGUoe2ltcG9ydHM6IFtOR0JfTU9EVUxFU10sIGV4cG9ydHM6IE5HQl9NT0RVTEVTfSlcbmV4cG9ydCBjbGFzcyBOZ2JSb290TW9kdWxlIHtcbn1cblxuQE5nTW9kdWxlKHtpbXBvcnRzOiBOR0JfTU9EVUxFUywgZXhwb3J0czogTkdCX01PRFVMRVN9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZHVsZSB7XG4gIC8qKlxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JSb290TW9kdWxlfTsgfVxufVxuIl19