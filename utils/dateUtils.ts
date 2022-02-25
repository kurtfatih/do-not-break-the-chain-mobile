import {Timestamp} from '@firebase/firestore';

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const dateUtils = Object.freeze({
  getTheDateWithoutHours: (date: Date) => {
    return date.setHours(0, 0, 0, 0);
  },

  parseTheDate: (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    return {year, month, day, hour};
  },

  getNumberOfDaysInMonth: (year: number, month: number) => {
    const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
    return numberOfDaysInMonth;
  },
  isTheDatesAreEqual: (
    date1WithoutHours: number,
    date2WithoutHours: number,
  ) => {
    // without hour mean Date.setHours(0,0,0,0)
    return date1WithoutHours.valueOf() === date2WithoutHours.valueOf();
  },

  checkIfTheDatesAreExactSame(date1: Date, date2: Date) {
    const today = this.getTheDateWithoutHours(date1);
    const currentDate = this.getTheDateWithoutHours(date2);
    const datesEqual = this.isTheDatesAreEqual(today, currentDate);
    return datesEqual;
  },

  locationOfTheDateCompareToOtherDate(
    baseDate: Date,
    dateWillCompareToBase: Date,
  ) {
    const firstDate = baseDate;
    const firstDateWithoutHour = this.getTheDateWithoutHours(firstDate);
    const secondDate = dateWillCompareToBase;
    const secondDateWithoutHOur = this.getTheDateWithoutHours(secondDate);
    const firstDateParsed = this.parseTheDate(firstDate);
    const secondDateParsed = this.parseTheDate(secondDate);

    const isTheYearSame = firstDateParsed.year === secondDateParsed.year;
    const isTheSameMonth = firstDateParsed.month === secondDateParsed.month;

    const isTheDateOnThePast = secondDateWithoutHOur < firstDateWithoutHour;
    const isTheDateOnTheFuture = secondDateWithoutHOur > firstDateWithoutHour;
    const isTheDatesAreExactSame = this.isTheDatesAreEqual(
      firstDateWithoutHour,
      secondDateWithoutHOur,
    );

    const isTheDatesAreDifferentButSameYear = isTheYearSame && !isTheSameMonth;
    const isTheDatesAreDifferentButSameMonth = !isTheYearSame && isTheSameMonth;

    const isTheDateOnThePastButSameMonth = isTheDateOnThePast && isTheSameMonth;
    const isTheDateOnTheFutureButSameMonth =
      isTheDateOnTheFuture && isTheSameMonth;
    const isTheDateOnTheSameYearAndSameMonth = isTheYearSame && isTheSameMonth;

    return {
      isTheDateOnThePast,
      isTheDateOnTheFuture,
      isTheDatesAreExactSame,
      isTheDatesAreDifferentButSameMonth,
      isTheDatesAreDifferentButSameYear,
      isTheDateOnThePastButSameMonth,
      isTheDateOnTheFutureButSameMonth,
      isTheDateOnTheSameYearAndSameMonth,
    };
  },

  // a and b are javascript Date objects
  dateDiffInDays(firstDate: Date, secondDate: Date) {
    // Discard the time and time-zone information.
    const utc1 = new Date(this.getTheDateWithoutHours(firstDate)).getTime();
    const utc2 = new Date(this.getTheDateWithoutHours(secondDate)).getTime();
    const abstract = utc2 - utc1;
    const result = abstract / _MS_PER_DAY;
    return result;
  },
  dateToTimestamp: (date: Date) => {
    const timestamp = Timestamp.fromDate(date);
    return timestamp;
  },
  timestampToDate: (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date;
  },
  checkIsTimestampsAreEquals: (
    timestamp1: Timestamp,
    timestamp2: Timestamp,
  ) => {
    const isEquals = timestamp1.isEqual(timestamp2);
    return isEquals;
  },
});
