import {Timestamp} from 'firebase/firestore';
import {dateUtils} from '../utils/dateUtils';

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const now = Timestamp.now();

const nowToDate = dateUtils.timestampToDate(now);

console.log('now', now, nowToDate);
const nowDateCopy = new Date(nowToDate);
const after1Date = new Date(nowDateCopy.setDate(nowDateCopy.getDate() + 1));
const {month, year, day} = dateUtils.parseTheDate(nowToDate);
const todayMonth = month;
const todayMonthName = months[todayMonth];
const todayYear = year;
const todayDays = day;

export {
  now,
  nowToDate,
  todayYear,
  todayMonthName,
  todayDays,
  after1Date,
  todayMonth,
};
