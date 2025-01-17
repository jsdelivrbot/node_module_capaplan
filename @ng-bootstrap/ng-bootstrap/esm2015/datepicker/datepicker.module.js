/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepicker } from './datepicker';
import { NgbDatepickerMonthView } from './datepicker-month-view';
import { NgbDatepickerNavigation } from './datepicker-navigation';
import { NgbInputDatepicker } from './datepicker-input';
import { NgbDatepickerDayView } from './datepicker-day-view';
import { NgbDatepickerI18n, NgbDatepickerI18nDefault } from './datepicker-i18n';
import { NgbCalendar, NgbCalendarGregorian } from './ngb-calendar';
import { NgbDateParserFormatter, NgbDateISOParserFormatter } from './ngb-date-parser-formatter';
import { NgbDateAdapter, NgbDateStructAdapter } from './adapters/ngb-date-adapter';
import { NgbDatepickerNavigationSelect } from './datepicker-navigation-select';
export { NgbDatepicker } from './datepicker';
export { NgbInputDatepicker } from './datepicker-input';
export { NgbCalendar } from './ngb-calendar';
export { NgbCalendarIslamicCivil } from './hijri/ngb-calendar-islamic-civil';
export { NgbCalendarIslamicUmalqura } from './hijri/ngb-calendar-islamic-umalqura';
export { NgbDatepickerMonthView } from './datepicker-month-view';
export { NgbDatepickerDayView } from './datepicker-day-view';
export { NgbDatepickerNavigation } from './datepicker-navigation';
export { NgbDatepickerNavigationSelect } from './datepicker-navigation-select';
export { NgbDatepickerConfig } from './datepicker-config';
export { NgbDatepickerI18n } from './datepicker-i18n';
export { NgbDate } from './ngb-date';
export { NgbDateAdapter } from './adapters/ngb-date-adapter';
export { NgbDateNativeAdapter } from './adapters/ngb-date-native-adapter';
export { NgbDateParserFormatter } from './ngb-date-parser-formatter';
export { NgbCalendarPersian } from './jalali/ngb-calendar-persian';
export class NgbDatepickerModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbDatepickerModule }; }
}
NgbDatepickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NgbDatepicker, NgbDatepickerMonthView, NgbDatepickerNavigation, NgbDatepickerNavigationSelect, NgbDatepickerDayView,
                    NgbInputDatepicker
                ],
                exports: [NgbDatepicker, NgbInputDatepicker],
                imports: [CommonModule, FormsModule],
                providers: [
                    { provide: NgbCalendar, useClass: NgbCalendarGregorian },
                    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nDefault },
                    { provide: NgbDateParserFormatter, useClass: NgbDateISOParserFormatter },
                    { provide: NgbDateAdapter, useClass: NgbDateStructAdapter }
                ],
                entryComponents: [NgbDatepicker]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFDLHNCQUFzQixFQUFFLHlCQUF5QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUYsT0FBTyxFQUFDLGNBQWMsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2pGLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTdFLE9BQU8sRUFBQyxhQUFhLEVBQTZCLE1BQU0sY0FBYyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxXQUFXLEVBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQWlCakUsTUFBTTs7Ozs7Ozs7SUFPSixNQUFNLENBQUMsT0FBTyxLQUEwQixNQUFNLENBQUMsRUFBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQyxFQUFFOzs7WUF0QmxGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osYUFBYSxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFFLG9CQUFvQjtvQkFDbkgsa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7Z0JBQ3BDLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO29CQUN0RCxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUM7b0JBQ2hFLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBQztvQkFDdEUsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztpQkFDMUQ7Z0JBQ0QsZUFBZSxFQUFFLENBQUMsYUFBYSxDQUFDO2FBQ2pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlcn0gZnJvbSAnLi9kYXRlcGlja2VyJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlck1vbnRoVmlld30gZnJvbSAnLi9kYXRlcGlja2VyLW1vbnRoLXZpZXcnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbn0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24nO1xuaW1wb3J0IHtOZ2JJbnB1dERhdGVwaWNrZXJ9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dCc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJEYXlWaWV3fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXZpZXcnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4biwgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0fSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5pbXBvcnQge05nYkNhbGVuZGFyLCBOZ2JDYWxlbmRhckdyZWdvcmlhbn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyLCBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyfSBmcm9tICcuL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXInO1xuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlciwgTmdiRGF0ZVN0cnVjdEFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0fSBmcm9tICcuL2RhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QnO1xuXG5leHBvcnQge05nYkRhdGVwaWNrZXIsIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXInO1xuZXhwb3J0IHtOZ2JJbnB1dERhdGVwaWNrZXJ9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dCc7XG5leHBvcnQge05nYkNhbGVuZGFyLCBOZ2JQZXJpb2R9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmV4cG9ydCB7TmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWx9IGZyb20gJy4vaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwnO1xuZXhwb3J0IHtOZ2JDYWxlbmRhcklzbGFtaWNVbWFscXVyYX0gZnJvbSAnLi9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy11bWFscXVyYSc7XG5leHBvcnQge05nYkRhdGVwaWNrZXJNb250aFZpZXd9IGZyb20gJy4vZGF0ZXBpY2tlci1tb250aC12aWV3JztcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlckRheVZpZXd9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdmlldyc7XG5leHBvcnQge05nYkRhdGVwaWNrZXJOYXZpZ2F0aW9ufSBmcm9tICcuL2RhdGVwaWNrZXItbmF2aWdhdGlvbic7XG5leHBvcnQge05nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0fSBmcm9tICcuL2RhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QnO1xuZXhwb3J0IHtOZ2JEYXRlcGlja2VyQ29uZmlnfSBmcm9tICcuL2RhdGVwaWNrZXItY29uZmlnJztcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcbmV4cG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuZXhwb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmV4cG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XG5leHBvcnQge05nYkRhdGVOYXRpdmVBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS1hZGFwdGVyJztcbmV4cG9ydCB7TmdiRGF0ZVBhcnNlckZvcm1hdHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyJztcbmV4cG9ydCB7TmdiQ2FsZW5kYXJQZXJzaWFufSBmcm9tICcuL2phbGFsaS9uZ2ItY2FsZW5kYXItcGVyc2lhbic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nYkRhdGVwaWNrZXIsIE5nYkRhdGVwaWNrZXJNb250aFZpZXcsIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uLCBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvblNlbGVjdCwgTmdiRGF0ZXBpY2tlckRheVZpZXcsXG4gICAgTmdiSW5wdXREYXRlcGlja2VyXG4gIF0sXG4gIGV4cG9ydHM6IFtOZ2JEYXRlcGlja2VyLCBOZ2JJbnB1dERhdGVwaWNrZXJdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBOZ2JDYWxlbmRhciwgdXNlQ2xhc3M6IE5nYkNhbGVuZGFyR3JlZ29yaWFufSxcbiAgICB7cHJvdmlkZTogTmdiRGF0ZXBpY2tlckkxOG4sIHVzZUNsYXNzOiBOZ2JEYXRlcGlja2VySTE4bkRlZmF1bHR9LFxuICAgIHtwcm92aWRlOiBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyLCB1c2VDbGFzczogTmdiRGF0ZUlTT1BhcnNlckZvcm1hdHRlcn0sXG4gICAge3Byb3ZpZGU6IE5nYkRhdGVBZGFwdGVyLCB1c2VDbGFzczogTmdiRGF0ZVN0cnVjdEFkYXB0ZXJ9XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nYkRhdGVwaWNrZXJdXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJNb2R1bGUge1xuICAvKipcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiRGF0ZXBpY2tlck1vZHVsZX07IH1cbn1cbiJdfQ==