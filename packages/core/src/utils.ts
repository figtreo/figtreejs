import {timeParse, timeFormat} from "d3-time-format";

//https://stackoverflow.com/questions/29400171/how-do-i-convert-a-decimal-year-value-into-a-date-in-javascript
/**
 * Helper function to determine if the provided year is a leap year
 * @param year
 * @return {boolean}
 */
export function leapYear(year:number):boolean {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

/**
 * A function which converts a decimal float into a date object
 * @param decimalDate
 * @return {Date}
 */
export function decimalToDate(decimal:number):Date{
    const year = Math.trunc(decimal);
    const totalNumberOfDays = leapYear(year)? 366:365;
    const day = Math.round(((decimal-year)*totalNumberOfDays));
    return timeParse("%Y-%j")(`${year}-${day}`)!

}

/**
 * A function that converts a date into a decimal.
 * @param date
 * @return {number}
 */
export function dateToDecimal(date:Date){
    const year = parseInt(timeFormat("%Y")(date));
    const day = parseInt(timeFormat("%j")(date));
    const totalNumberOfDays = leapYear(year)? 366:365;
    return year+day/totalNumberOfDays
}
export function panic(message: string): never { throw new Error(message); }


export function u<T>(x: T | undefined): NonNullable<T> {
  if (x === undefined) {
    throw new Error('internal bug! unhandled undefined');
  }
  return x as NonNullable<T>;
}


export function notNull<T>(x: T,message:string): asserts x is NonNullable<T> {
  if (x === undefined) throw new Error(message);
}

