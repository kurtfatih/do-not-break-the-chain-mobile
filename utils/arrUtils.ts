import {Timestamp} from '@firebase/firestore';
import {dateUtils} from './dateUtils';

export const replaceObjInsideArrayWithExistOneByYear = <
  T extends {date: Timestamp},
>(
  arr: T[],
  newObj: T,
): T[] => {
  const newElements = arr.map(obj => {
    const isEquals = dateUtils.checkIsTimestampsAreEquals(
      obj.date,
      newObj.date,
    );
    const newobj = isEquals ? newObj : obj;
    return newobj;
  });
  return newElements;
};
export const generateArrayFromNumber = (num: number) => {
  const arr = Array.from(Array(num).keys()).map(x => x + 1);
  return arr;
};
