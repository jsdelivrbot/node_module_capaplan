/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbCalendarIslamicCivil } from './ngb-calendar-islamic-civil';
import { NgbDate } from '../ngb-date';
import { Injectable } from '@angular/core';
/** *
 * Umalqura calendar is one type of Hijri calendars used in islamic countries.
 * This Calendar is used by Saudi Arabia for administrative purpose.
 * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
  @type {?} */
const GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
/** @type {?} */
const GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
/** @type {?} */
const HIJRI_BEGIN = 1300;
/** @type {?} */
const HIJRI_END = 1600;
/** @type {?} */
const ONE_DAY = 1000 * 60 * 60 * 24;
/** @type {?} */
const MONTH_LENGTH = [
    '101010101010', '110101010100', '111011001001', '011011010100', '011011101010',
    '001101101100', '101010101101', '010101010101', '011010101001', '011110010010',
    '101110101001', '010111010100', '101011011010', '010101011100', '110100101101',
    '011010010101', '011101001010', '101101010100', '101101101010', '010110101101',
    '010010101110', '101001001111', '010100010111', '011010001011', '011010100101',
    '101011010101', '001011010110', '100101011011', '010010011101', '101001001101',
    '110100100110', '110110010101', '010110101100', '100110110110', '001010111010',
    '101001011011', '010100101011', '101010010101', '011011001010', '101011101001',
    '001011110100', '100101110110', '001010110110', '100101010110', '101011001010',
    '101110100100', '101111010010', '010111011001', '001011011100', '100101101101',
    '010101001101', '101010100101', '101101010010', '101110100101', '010110110100',
    '100110110110', '010101010111', '001010010111', '010101001011', '011010100011',
    '011101010010', '101101100101', '010101101010', '101010101011', '010100101011',
    '110010010101', '110101001010', '110110100101', '010111001010', '101011010110',
    '100101010111', '010010101011', '100101001011', '101010100101', '101101010010',
    '101101101010', '010101110101', '001001110110', '100010110111', '010001011011',
    '010101010101', '010110101001', '010110110100', '100111011010', '010011011101',
    '001001101110', '100100110110', '101010101010', '110101010100', '110110110010',
    '010111010101', '001011011010', '100101011011', '010010101011', '101001010101',
    '101101001001', '101101100100', '101101110001', '010110110100', '101010110101',
    '101001010101', '110100100101', '111010010010', '111011001001', '011011010100',
    '101011101001', '100101101011', '010010101011', '101010010011', '110101001001',
    '110110100100', '110110110010', '101010111001', '010010111010', '101001011011',
    '010100101011', '101010010101', '101100101010', '101101010101', '010101011100',
    '010010111101', '001000111101', '100100011101', '101010010101', '101101001010',
    '101101011010', '010101101101', '001010110110', '100100111011', '010010011011',
    '011001010101', '011010101001', '011101010100', '101101101010', '010101101100',
    '101010101101', '010101010101', '101100101001', '101110010010', '101110101001',
    '010111010100', '101011011010', '010101011010', '101010101011', '010110010101',
    '011101001001', '011101100100', '101110101010', '010110110101', '001010110110',
    '101001010110', '111001001101', '101100100101', '101101010010', '101101101010',
    '010110101101', '001010101110', '100100101111', '010010010111', '011001001011',
    '011010100101', '011010101100', '101011010110', '010101011101', '010010011101',
    '101001001101', '110100010110', '110110010101', '010110101010', '010110110101',
    '001011011010', '100101011011', '010010101101', '010110010101', '011011001010',
    '011011100100', '101011101010', '010011110101', '001010110110', '100101010110',
    '101010101010', '101101010100', '101111010010', '010111011001', '001011101010',
    '100101101101', '010010101101', '101010010101', '101101001010', '101110100101',
    '010110110010', '100110110101', '010011010110', '101010010111', '010101000111',
    '011010010011', '011101001001', '101101010101', '010101101010', '101001101011',
    '010100101011', '101010001011', '110101000110', '110110100011', '010111001010',
    '101011010110', '010011011011', '001001101011', '100101001011', '101010100101',
    '101101010010', '101101101001', '010101110101', '000101110110', '100010110111',
    '001001011011', '010100101011', '010101100101', '010110110100', '100111011010',
    '010011101101', '000101101101', '100010110110', '101010100110', '110101010010',
    '110110101001', '010111010100', '101011011010', '100101011011', '010010101011',
    '011001010011', '011100101001', '011101100010', '101110101001', '010110110010',
    '101010110101', '010101010101', '101100100101', '110110010010', '111011001001',
    '011011010010', '101011101001', '010101101011', '010010101011', '101001010101',
    '110100101001', '110101010100', '110110101010', '100110110101', '010010111010',
    '101000111011', '010010011011', '101001001101', '101010101010', '101011010101',
    '001011011010', '100101011101', '010001011110', '101000101110', '110010011010',
    '110101010101', '011010110010', '011010111001', '010010111010', '101001011101',
    '010100101101', '101010010101', '101101010010', '101110101000', '101110110100',
    '010110111001', '001011011010', '100101011010', '101101001010', '110110100100',
    '111011010001', '011011101000', '101101101010', '010101101101', '010100110101',
    '011010010101', '110101001010', '110110101000', '110111010100', '011011011010',
    '010101011011', '001010011101', '011000101011', '101100010101', '101101001010',
    '101110010101', '010110101010', '101010101110', '100100101110', '110010001111',
    '010100100111', '011010010101', '011010101010', '101011010110', '010101011101',
    '001010011101'
];
/**
 * @param {?} date1
 * @param {?} date2
 * @return {?}
 */
function getDaysDiff(date1, date2) {
    /** @type {?} */
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(diff / ONE_DAY);
}
export class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil {
    /**
     * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
     * `gdate` is s JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    fromGregorian(gDate) {
        /** @type {?} */
        let hDay = 1;
        /** @type {?} */
        let hMonth = 0;
        /** @type {?} */
        let hYear = 1300;
        /** @type {?} */
        let daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
        if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
            /** @type {?} */
            let year = 1300;
            for (let i = 0; i < MONTH_LENGTH.length; i++, year++) {
                for (let j = 0; j < 12; j++) {
                    /** @type {?} */
                    let numOfDays = +MONTH_LENGTH[i][j] + 29;
                    if (daysDiff <= numOfDays) {
                        hDay = daysDiff + 1;
                        if (hDay > numOfDays) {
                            hDay = 1;
                            j++;
                        }
                        if (j > 11) {
                            j = 0;
                            year++;
                        }
                        hMonth = j;
                        hYear = year;
                        return new NgbDate(hYear, hMonth + 1, hDay);
                    }
                    daysDiff = daysDiff - numOfDays;
                }
            }
        }
        else {
            return super.fromGregorian(gDate);
        }
    }
    /**
     * Converts the current Hijri date to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    toGregorian(hDate) {
        /** @type {?} */
        const hYear = hDate.year;
        /** @type {?} */
        const hMonth = hDate.month - 1;
        /** @type {?} */
        const hDay = hDate.day;
        /** @type {?} */
        let gDate = new Date(GREGORIAN_FIRST_DATE);
        /** @type {?} */
        let dayDiff = hDay - 1;
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            for (let y = 0; y < hYear - HIJRI_BEGIN; y++) {
                for (let m = 0; m < 12; m++) {
                    dayDiff += +MONTH_LENGTH[y][m] + 29;
                }
            }
            for (let m = 0; m < hMonth; m++) {
                dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
            }
            gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
        }
        else {
            gDate = super.toGregorian(hDate);
        }
        return gDate;
    }
    /**
     * Returns the number of days in a specific Hijri hMonth.
     * `hMonth` is 1 for Muharram, 2 for Safar, etc.
     * `hYear` is any Hijri hYear.
     * @param {?} hMonth
     * @param {?} hYear
     * @return {?}
     */
    getDaysPerMonth(hMonth, hYear) {
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            /** @type {?} */
            const pos = hYear - HIJRI_BEGIN;
            return +MONTH_LENGTH[pos][hMonth - 1] + 29;
        }
        return super.getDaysPerMonth(hMonth, hYear);
    }
}
NgbCalendarIslamicUmalqura.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWlzbGFtaWMtdW1hbHF1cmEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtdW1hbHF1cmEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQVN6QyxNQUFNLG9CQUFvQixHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBQ3BELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFDbkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDOztBQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7O0FBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEMsTUFBTSxZQUFZLEdBQUc7SUFFbkIsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMs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LENBQUMsR0FBRyxFQUFFLENBQUM7U0FDNUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDN0M7OztZQXRFRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JDYWxlbmRhcklzbGFtaWNDaXZpbH0gZnJvbSAnLi9uZ2ItY2FsZW5kYXItaXNsYW1pYy1jaXZpbCc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVW1hbHF1cmEgY2FsZW5kYXIgaXMgb25lIHR5cGUgb2YgSGlqcmkgY2FsZW5kYXJzIHVzZWQgaW4gaXNsYW1pYyBjb3VudHJpZXMuXG4gKiBUaGlzIENhbGVuZGFyIGlzIHVzZWQgYnkgU2F1ZGkgQXJhYmlhIGZvciBhZG1pbmlzdHJhdGl2ZSBwdXJwb3NlLlxuICogVW5saWtlIHRhYnVsYXIgY2FsZW5kYXJzLCB0aGUgYWxnb3JpdGhtIGludm9sdmVzIGFzdHJvbm9taWNhbCBjYWxjdWxhdGlvbiwgYnV0IGl0J3Mgc3RpbGwgZGV0ZXJtaW5pc3RpYy5cbiAqIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL2RldmVsb3BtZW50L2RldmVsb3BtZW50LXByb2Nlc3MvZGVzaWduLXByb3Bvc2Fscy9pc2xhbWljLWNhbGVuZGFyLXR5cGVzXG4gKi9cblxuY29uc3QgR1JFR09SSUFOX0ZJUlNUX0RBVEUgPSBuZXcgRGF0ZSgxODgyLCAxMCwgMTIpO1xuY29uc3QgR1JFR09SSUFOX0xBU1RfREFURSA9IG5ldyBEYXRlKDIxNzQsIDEwLCAyNSk7XG5jb25zdCBISUpSSV9CRUdJTiA9IDEzMDA7XG5jb25zdCBISUpSSV9FTkQgPSAxNjAwO1xuY29uc3QgT05FX0RBWSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG5cbmNvbnN0IE1PTlRIX0xFTkdUSCA9IFtcbiAgLy8gMTMwMC0xMzA0XG4gICcxMDEwMTAxMDEwMTAnLCAnMTEwMTAxMDEwMTAwJywgJzExMTAxMTAwMTAwMScsICcwMTEwMTEwMTAxMDAnLCAnMDExMDExMTAxMDEwJyxcbiAgLy8gMTMwNS0xMzA5XG4gICcwMDExMDExMDExMDAnLCAnMTAxMDEwMTAxMTAxJywgJzAxMDEwMTAxMDEwMScsICcwMTEwMTAxMDEwMDEnLCAnMDExMTEwMDEwMDEwJyxcbiAgLy8gMTMxMC0xMzE0XG4gICcxMDExMTAxMDEwMDEnLCAnMDEwMTExMDEwMTAwJywgJzEwMTAxMTAxMTAxMCcsICcwMTAxMDEwMTExMDAnLCAnMTEwMTAwMTAxMTAxJyxcbiAgLy8gMTMxNS0xMzE5XG4gICcwMTEwMTAwMTAxMDEnLCAnMDExMTAxMDAxMDEwJywgJzEwMTEwMTAxMDEwMCcsICcxMDExMDExMDEwMTAnLCAnMDEwMTEwMTAxMTAxJyxcbiAgLy8gMTMyMC0xMzI0XG4gICcwMTAwMTAxMDExMTAnLCAnMTAxMDAxMDAxMTExJywgJzAxMDEwMDAxMDExMScsICcwMTEwMTAwMDEwMTEnLCAnMDExMDEwMTAwMTAxJyxcbiAgLy8gMTMyNS0xMzI5XG4gICcxMDEwMTEwMTAxMDEnLCAnMDAxMDExMDEwMTEwJywgJzEwMDEwMTAxMTAxMScsICcwMTAwMTAwMTExMDEnLCAnMTAxMDAxMDAxMTAxJyxcbiAgLy8gMTMzMC0xMzM0XG4gICcxMTAxMDAxMDAxMTAnLCAnMTEwMTEwMDEwMTAxJywgJzAxMDExMDEwMTEwMCcsICcxMDAxMTAxMTAxMTAnLCAnMDAxMDEwMTExMDEwJyxcbiAgLy8gMTMzNS0xMzM5XG4gICcxMDEwMDEwMTEwMTEnLCAnMDEwMTAwMTAxMDExJywgJzEwMTAxMDAxMDEwMScsICcwMTEwMTEwMDEwMTAnLCAnMTAxMDExMTAxMDAxJyxcbiAgLy8gMTM0MC0xMzQ0XG4gICcwMDEwMTExMTAxMDAnLCAnMTAwMTAxMTEwMTEwJywgJzAwMTAxMDExMDExMCcsICcxMDAxMDEwMTAxMTAnLCAnMTAxMDExMDAxMDEwJyxcbiAgLy8gMTM0NS0xMzQ5XG4gICcxMDExMTAxMDAxMDAnLCAnMTAxMTExMDEwMDEwJywgJzAxMDExMTAxMTAwMScsICcwMDEwMTEwMTExMDAnLCAnMTAwMTAxMTAxMTAxJyxcbiAgLy8gMTM1MC0xMzU0XG4gICcwMTAxMDEwMDExMDEnLCAnMTAxMDEwMTAwMTAxJywgJzEwMTEwMTAxMDAxMCcsICcxMDExMTAxMDAxMDEnLCAnMDEwMTEwMTEwMTAwJyxcbiAgLy8gMTM1NS0xMzU5XG4gICcxMDAxMTAxMTAxMTAnLCAnMDEwMTAxMDEwMTExJywgJzAwMTAxMDAxMDExMScsICcwMTAxMDEwMDEwMTEnLCAnMDExMDEwMTAwMDExJyxcbiAgLy8gMTM2MC0xMzY0XG4gICcwMTExMDEwMTAwMTAnLCAnMTAxMTAxMTAwMTAxJywgJzAxMDEwMTEwMTAxMCcsICcxMDEwMTAxMDEwMTEnLCAnMDEwMTAwMTAxMDExJyxcbiAgLy8gMTM2NS0xMzY5XG4gICcxMTAwMTAwMTAxMDEnLCAnMTEwMTAxMDAxMDEwJywgJzExMDExMDEwMDEwMScsICcwMTAxMTEwMDEwMTAnLCAnMTAxMDExMDEwMTEwJyxcbiAgLy8gMTM3MC0xMzc0XG4gICcxMDAxMDEwMTAxMTEnLCAnMDEwMDEwMTAxMDExJywgJzEwMDEwMTAwMTAxMScsICcxMDEwMTAxMDAxMDEnLCAnMTAxMTAxMDEwMDEwJyxcbiAgLy8gMTM3NS0xMzc5XG4gICcxMDExMDExMDEwMTAnLCAnMDEwMTAxMTEwMTAxJywgJzAwMTAwMTExMDExMCcsICcxMDAwMTAxMTAxMTEnLCAnMDEwMDAxMDExMDExJyxcbiAgLy8gMTM4MC0xMzg0XG4gICcwMTAxMDEwMTAxMDEnLCAnMDEwMTEwMTAxMDAxJywgJzAxMDExMDExMDEwMCcsICcxMDAxMTEwMTEwMTAnLCAnMDEwMDExMDExMTAxJyxcbiAgLy8gMTM4NS0xMzg5XG4gICcwMDEwMDExMDExMTAnLCAnMTAwMTAwMTEwMTEwJywgJzEwMTAxMDEwMTAxMCcsICcxMTAxMDEwMTAxMDAnLCAnMTEwMTEwMTEwMDEwJyxcbiAgLy8gMTM5MC0xMzk0XG4gICcwMTAxMTEwMTAxMDEnLCAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMScsICcwMTAwMTAxMDEwMTEnLCAnMTAxMDAxMDEwMTAxJyxcbiAgLy8gMTM5NS0xMzk5XG4gICcxMDExMDEwMDEwMDEnLCAnMTAxMTAxMTAwMTAwJywgJzEwMTEwMTExMDAwMScsICcwMTAxMTAxMTAxMDAnLCAnMTAxMDEwMTEwMTAxJyxcbiAgLy8gMTQwMC0xNDA0XG4gICcxMDEwMDEwMTAxMDEnLCAnMTEwMTAwMTAwMTAxJywgJzExMTAxMDAxMDAxMCcsICcxMTEwMTEwMDEwMDEnLCAnMDExMDExMDEwMTAwJyxcbiAgLy8gMTQwNS0xNDA5XG4gICcxMDEwMTExMDEwMDEnLCAnMTAwMTAxMTAxMDExJywgJzAxMDAxMDEwMTAxMScsICcxMDEwMTAwMTAwMTEnLCAnMTEwMTAxMDAxMDAxJyxcbiAgLy8gMTQxMC0xNDE0XG4gICcxMTAxMTAxMDAxMDAnLCAnMTEwMTEwMTEwMDEwJywgJzEwMTAxMDExMTAwMScsICcwMTAwMTAxMTEwMTAnLCAnMTAxMDAxMDExMDExJyxcbiAgLy8gMTQxNS0xNDE5XG4gICcwMTAxMDAxMDEwMTEnLCAnMTAxMDEwMDEwMTAxJywgJzEwMTEwMDEwMTAxMCcsICcxMDExMDEwMTAxMDEnLCAnMDEwMTAxMDExMTAwJyxcbiAgLy8gMTQyMC0xNDI0XG4gICcwMTAwMTAxMTExMDEnLCAnMDAxMDAwMTExMTAxJywgJzEwMDEwMDAxMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJyxcbiAgLy8gMTQyNS0xNDI5XG4gICcxMDExMDEwMTEwMTAnLCAnMDEwMTAxMTAxMTAxJywgJzAwMTAxMDExMDExMCcsICcxMDAxMDAxMTEwMTEnLCAnMDEwMDEwMDExMDExJyxcbiAgLy8gMTQzMC0xNDM0XG4gICcwMTEwMDEwMTAxMDEnLCAnMDExMDEwMTAxMDAxJywgJzAxMTEwMTAxMDEwMCcsICcxMDExMDExMDEwMTAnLCAnMDEwMTAxMTAxMTAwJyxcbiAgLy8gMTQzNS0xNDM5XG4gICcxMDEwMTAxMDExMDEnLCAnMDEwMTAxMDEwMTAxJywgJzEwMTEwMDEwMTAwMScsICcxMDExMTAwMTAwMTAnLCAnMTAxMTEwMTAxMDAxJyxcbiAgLy8gMTQ0MC0xNDQ0XG4gICcwMTAxMTEwMTAxMDAnLCAnMTAxMDExMDExMDEwJywgJzAxMDEwMTAxMTAxMCcsICcxMDEwMTAxMDEwMTEnLCAnMDEwMTEwMDEwMTAxJyxcbiAgLy8gMTQ0NS0xNDQ5XG4gICcwMTExMDEwMDEwMDEnLCAnMDExMTAxMTAwMTAwJywgJzEwMTExMDEwMTAxMCcsICcwMTAxMTAxMTAxMDEnLCAnMDAxMDEwMTEwMTEwJyxcbiAgLy8gMTQ1MC0xNDU0XG4gICcxMDEwMDEwMTAxMTAnLCAnMTExMDAxMDAxMTAxJywgJzEwMTEwMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLCAnMTAxMTAxMTAxMDEwJyxcbiAgLy8gMTQ1NS0xNDU5XG4gICcwMTAxMTAxMDExMDEnLCAnMDAxMDEwMTAxMTEwJywgJzEwMDEwMDEwMTExMScsICcwMTAwMTAwMTAxMTEnLCAnMDExMDAxMDAxMDExJyxcbiAgLy8gMTQ2MC0xNDY0XG4gICcwMTEwMTAxMDAxMDEnLCAnMDExMDEwMTAxMTAwJywgJzEwMTAxMTAxMDExMCcsICcwMTAxMDEwMTExMDEnLCAnMDEwMDEwMDExMTAxJyxcbiAgLy8gMTQ2NS0xNDY5XG4gICcxMDEwMDEwMDExMDEnLCAnMTEwMTAwMDEwMTEwJywgJzExMDExMDAxMDEwMScsICcwMTAxMTAxMDEwMTAnLCAnMDEwMTEwMTEwMTAxJyxcbiAgLy8gMTQ3MC0xNDc0XG4gICcwMDEwMTEwMTEwMTAnLCAnMTAwMTAxMDExMDExJywgJzAxMDAxMDEwMTEwMScsICcwMTAxMTAwMTAxMDEnLCAnMDExMDExMDAxMDEwJyxcbiAgLy8gMTQ3NS0xNDc5XG4gICcwMTEwMTExMDAxMDAnLCAnMTAxMDExMTAxMDEwJywgJzAxMDAxMTExMDEwMScsICcwMDEwMTAxMTAxMTAnLCAnMTAwMTAxMDEwMTEwJyxcbiAgLy8gMTQ4MC0xNDg0XG4gICcxMDEwMTAxMDEwMTAnLCAnMTAxMTAxMDEwMTAwJywgJzEwMTExMTAxMDAxMCcsICcwMTAxMTEwMTEwMDEnLCAnMDAxMDExMTAxMDEwJyxcbiAgLy8gMTQ4NS0xNDg5XG4gICcxMDAxMDExMDExMDEnLCAnMDEwMDEwMTAxMTAxJywgJzEwMTAxMDAxMDEwMScsICcxMDExMDEwMDEwMTAnLCAnMTAxMTEwMTAwMTAxJyxcbiAgLy8gMTQ5MC0xNDk0XG4gICcwMTAxMTAxMTAwMTAnLCAnMTAwMTEwMTEwMTAxJywgJzAxMDAxMTAxMDExMCcsICcxMDEwMTAwMTAxMTEnLCAnMDEwMTAxMDAwMTExJyxcbiAgLy8gMTQ5NS0xNDk5XG4gICcwMTEwMTAwMTAwMTEnLCAnMDExMTAxMDAxMDAxJywgJzEwMTEwMTAxMDEwMScsICcwMTAxMDExMDEwMTAnLCAnMTAxMDAxMTAxMDExJyxcbiAgLy8gMTUwMC0xNTA0XG4gICcwMTAxMDAxMDEwMTEnLCAnMTAxMDEwMDAxMDExJywgJzExMDEwMTAwMDExMCcsICcxMTAxMTAxMDAwMTEnLCAnMDEwMTExMDAxMDEwJyxcbiAgLy8gMTUwNS0xNTA5XG4gICcxMDEwMTEwMTAxMTAnLCAnMDEwMDExMDExMDExJywgJzAwMTAwMTEwMTAxMScsICcxMDAxMDEwMDEwMTEnLCAnMTAxMDEwMTAwMTAxJyxcbiAgLy8gMTUxMC0xNTE0XG4gICcxMDExMDEwMTAwMTAnLCAnMTAxMTAxMTAxMDAxJywgJzAxMDEwMTExMDEwMScsICcwMDAxMDExMTAxMTAnLCAnMTAwMDEwMTEwMTExJyxcbiAgLy8gMTUxNS0xNTE5XG4gICcwMDEwMDEwMTEwMTEnLCAnMDEwMTAwMTAxMDExJywgJzAxMDEwMTEwMDEwMScsICcwMTAxMTAxMTAxMDAnLCAnMTAwMTExMDExMDEwJyxcbiAgLy8gMTUyMC0xNTI0XG4gICcwMTAwMTExMDExMDEnLCAnMDAwMTAxMTAxMTAxJywgJzEwMDAxMDExMDExMCcsICcxMDEwMTAxMDAxMTAnLCAnMTEwMTAxMDEwMDEwJyxcbiAgLy8gMTUyNS0xNTI5XG4gICcxMTAxMTAxMDEwMDEnLCAnMDEwMTExMDEwMTAwJywgJzEwMTAxMTAxMTAxMCcsICcxMDAxMDEwMTEwMTEnLCAnMDEwMDEwMTAxMDExJyxcbiAgLy8gMTUzMC0xNTM0XG4gICcwMTEwMDEwMTAwMTEnLCAnMDExMTAwMTAxMDAxJywgJzAxMTEwMTEwMDAxMCcsICcxMDExMTAxMDEwMDEnLCAnMDEwMTEwMTEwMDEwJyxcbiAgLy8gMTUzNS0xNTM5XG4gICcxMDEwMTAxMTAxMDEnLCAnMDEwMTAxMDEwMTAxJywgJzEwMTEwMDEwMDEwMScsICcxMTAxMTAwMTAwMTAnLCAnMTExMDExMDAxMDAxJyxcbiAgLy8gMTU0MC0xNTQ0XG4gICcwMTEwMTEwMTAwMTAnLCAnMTAxMDExMTAxMDAxJywgJzAxMDEwMTEwMTAxMScsICcwMTAwMTAxMDEwMTEnLCAnMTAxMDAxMDEwMTAxJyxcbiAgLy8gMTU0NS0xNTQ5XG4gICcxMTAxMDAxMDEwMDEnLCAnMTEwMTAxMDEwMTAwJywgJzExMDExMDEwMTAxMCcsICcxMDAxMTAxMTAxMDEnLCAnMDEwMDEwMTExMDEwJyxcbiAgLy8gMTU1MC0xNTU0XG4gICcxMDEwMDAxMTEwMTEnLCAnMDEwMDEwMDExMDExJywgJzEwMTAwMTAwMTEwMScsICcxMDEwMTAxMDEwMTAnLCAnMTAxMDExMDEwMTAxJyxcbiAgLy8gMTU1NS0xNTU5XG4gICcwMDEwMTEwMTEwMTAnLCAnMTAwMTAxMDExMTAxJywgJzAxMDAwMTAxMTExMCcsICcxMDEwMDAxMDExMTAnLCAnMTEwMDEwMDExMDEwJyxcbiAgLy8gMTU2MC0xNTY0XG4gICcxMTAxMDEwMTAxMDEnLCAnMDExMDEwMTEwMDEwJywgJzAxMTAxMDExMTAwMScsICcwMTAwMTAxMTEwMTAnLCAnMTAxMDAxMDExMTAxJyxcbiAgLy8gMTU2NS0xNTY5XG4gICcwMTAxMDAxMDExMDEnLCAnMTAxMDEwMDEwMTAxJywgJzEwMTEwMTAxMDAxMCcsICcxMDExMTAxMDEwMDAnLCAnMTAxMTEwMTEwMTAwJyxcbiAgLy8gMTU3MC0xNTc0XG4gICcwMTAxMTAxMTEwMDEnLCAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMCcsICcxMDExMDEwMDEwMTAnLCAnMTEwMTEwMTAwMTAwJyxcbiAgLy8gMTU3NS0xNTc5XG4gICcxMTEwMTEwMTAwMDEnLCAnMDExMDExMTAxMDAwJywgJzEwMTEwMTEwMTAxMCcsICcwMTAxMDExMDExMDEnLCAnMDEwMTAwMTEwMTAxJyxcbiAgLy8gMTU4MC0xNTg0XG4gICcwMTEwMTAwMTAxMDEnLCAnMTEwMTAxMDAxMDEwJywgJzExMDExMDEwMTAwMCcsICcxMTAxMTEwMTAxMDAnLCAnMDExMDExMDExMDEwJyxcbiAgLy8gMTU4NS0xNTg5XG4gICcwMTAxMDEwMTEwMTEnLCAnMDAxMDEwMDExMTAxJywgJzAxMTAwMDEwMTAxMScsICcxMDExMDAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJyxcbiAgLy8gMTU5MC0xNTk0XG4gICcxMDExMTAwMTAxMDEnLCAnMDEwMTEwMTAxMDEwJywgJzEwMTAxMDEwMTExMCcsICcxMDAxMDAxMDExMTAnLCAnMTEwMDEwMDAxMTExJyxcbiAgLy8gMTU5NS0xNTk5XG4gICcwMTAxMDAxMDAxMTEnLCAnMDExMDEwMDEwMTAxJywgJzAxMTAxMDEwMTAxMCcsICcxMDEwMTEwMTAxMTAnLCAnMDEwMTAxMDExMTAxJyxcbiAgLy8gMTYwMFxuICAnMDAxMDEwMDExMTAxJ1xuXTtcblxuZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTE6IERhdGUsIGRhdGUyOiBEYXRlKTogbnVtYmVyIHtcbiAgY29uc3QgZGlmZiA9IE1hdGguYWJzKGRhdGUxLmdldFRpbWUoKSAtIGRhdGUyLmdldFRpbWUoKSk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBPTkVfREFZKTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFySXNsYW1pY1VtYWxxdXJhIGV4dGVuZHMgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwge1xuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IGlzbGFtaWMoVW1hbHF1cmEpIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBHcmVnb3JpYW4gZGF0ZS5cbiAgKiBgZ2RhdGVgIGlzIHMgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXG4gICovXG4gIGZyb21HcmVnb3JpYW4oZ0RhdGU6IERhdGUpOiBOZ2JEYXRlIHtcbiAgICBsZXQgaERheSA9IDEsIGhNb250aCA9IDAsIGhZZWFyID0gMTMwMDtcbiAgICBsZXQgZGF5c0RpZmYgPSBnZXREYXlzRGlmZihnRGF0ZSwgR1JFR09SSUFOX0ZJUlNUX0RBVEUpO1xuICAgIGlmIChnRGF0ZS5nZXRUaW1lKCkgLSBHUkVHT1JJQU5fRklSU1RfREFURS5nZXRUaW1lKCkgPj0gMCAmJiBnRGF0ZS5nZXRUaW1lKCkgLSBHUkVHT1JJQU5fTEFTVF9EQVRFLmdldFRpbWUoKSA8PSAwKSB7XG4gICAgICBsZXQgeWVhciA9IDEzMDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1PTlRIX0xFTkdUSC5sZW5ndGg7IGkrKywgeWVhcisrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTI7IGorKykge1xuICAgICAgICAgIGxldCBudW1PZkRheXMgPSArTU9OVEhfTEVOR1RIW2ldW2pdICsgMjk7XG4gICAgICAgICAgaWYgKGRheXNEaWZmIDw9IG51bU9mRGF5cykge1xuICAgICAgICAgICAgaERheSA9IGRheXNEaWZmICsgMTtcbiAgICAgICAgICAgIGlmIChoRGF5ID4gbnVtT2ZEYXlzKSB7XG4gICAgICAgICAgICAgIGhEYXkgPSAxO1xuICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaiA+IDExKSB7XG4gICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICB5ZWFyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoTW9udGggPSBqO1xuICAgICAgICAgICAgaFllYXIgPSB5ZWFyO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOZ2JEYXRlKGhZZWFyLCBoTW9udGggKyAxLCBoRGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF5c0RpZmYgPSBkYXlzRGlmZiAtIG51bU9mRGF5cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3VwZXIuZnJvbUdyZWdvcmlhbihnRGF0ZSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAqIENvbnZlcnRzIHRoZSBjdXJyZW50IEhpanJpIGRhdGUgdG8gR3JlZ29yaWFuLlxuICAqL1xuICB0b0dyZWdvcmlhbihoRGF0ZTogTmdiRGF0ZSk6IERhdGUge1xuICAgIGNvbnN0IGhZZWFyID0gaERhdGUueWVhcjtcbiAgICBjb25zdCBoTW9udGggPSBoRGF0ZS5tb250aCAtIDE7XG4gICAgY29uc3QgaERheSA9IGhEYXRlLmRheTtcbiAgICBsZXQgZ0RhdGUgPSBuZXcgRGF0ZShHUkVHT1JJQU5fRklSU1RfREFURSk7XG4gICAgbGV0IGRheURpZmYgPSBoRGF5IC0gMTtcbiAgICBpZiAoaFllYXIgPj0gSElKUklfQkVHSU4gJiYgaFllYXIgPD0gSElKUklfRU5EKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhZZWFyIC0gSElKUklfQkVHSU47IHkrKykge1xuICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IDEyOyBtKyspIHtcbiAgICAgICAgICBkYXlEaWZmICs9ICtNT05USF9MRU5HVEhbeV1bbV0gKyAyOTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCBoTW9udGg7IG0rKykge1xuICAgICAgICBkYXlEaWZmICs9ICtNT05USF9MRU5HVEhbaFllYXIgLSBISUpSSV9CRUdJTl1bbV0gKyAyOTtcbiAgICAgIH1cbiAgICAgIGdEYXRlLnNldERhdGUoR1JFR09SSUFOX0ZJUlNUX0RBVEUuZ2V0RGF0ZSgpICsgZGF5RGlmZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdEYXRlID0gc3VwZXIudG9HcmVnb3JpYW4oaERhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZ0RhdGU7XG4gIH1cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBzcGVjaWZpYyBIaWpyaSBoTW9udGguXG4gICogYGhNb250aGAgaXMgMSBmb3IgTXVoYXJyYW0sIDIgZm9yIFNhZmFyLCBldGMuXG4gICogYGhZZWFyYCBpcyBhbnkgSGlqcmkgaFllYXIuXG4gICovXG4gIGdldERheXNQZXJNb250aChoTW9udGg6IG51bWJlciwgaFllYXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGhZZWFyID49IEhJSlJJX0JFR0lOICYmIGhZZWFyIDw9IEhJSlJJX0VORCkge1xuICAgICAgY29uc3QgcG9zID0gaFllYXIgLSBISUpSSV9CRUdJTjtcbiAgICAgIHJldHVybiArTU9OVEhfTEVOR1RIW3Bvc11baE1vbnRoIC0gMV0gKyAyOTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLmdldERheXNQZXJNb250aChoTW9udGgsIGhZZWFyKTtcbiAgfVxufVxuIl19