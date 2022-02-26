import {Timestamp} from 'firebase/firestore';
import React, {createContext, useContext, useCallback} from 'react';

import {months, now, nowToDate} from '../constants/dateConstants';
import {
  GoalDataI,
  GoalsDataType,
  GoalTypeUpdatableFieldType,
  SelectedDaysType,
} from '../firebase/types';
import {generateArrayFromNumber} from '../utils/arrUtils';
import {dateUtils} from '../utils/dateUtils';
import {checkIfTwoNumberAreEqual} from '../utils/numberUtils';
import {useDbContext} from './DbContext';

interface GoalContextI {
  getGoals: GoalsDataType | undefined;
  findTheGoal: (id: string) => boolean | undefined;
  isGoalExist: (id: string) => boolean;
  findAndSetGoalData: (id?: string | undefined) => void;
  goalData: GoalDataI | undefined;
  setGoalData: React.Dispatch<React.SetStateAction<GoalDataI | undefined>>;
  addNewGoal: () => Promise<void>;
  // changeOnGoalText: (e: string) => void;
  deleteGoal: (goalId: string) => void;
  updateGoal: (
    fieldsToUpdate: GoalTypeUpdatableFieldType,
    goalId: string,
  ) => void;
  getTheMissedDay: (
    goalCreatedAt: Timestamp,
    selectedDays: SelectedDaysType,
  ) => number;
  generateNumberArrayByNumberOfDaysInActiveMonth: number[];
  isTheSelectedDayMatchWithTheDayInTheComponent: (day: number) => boolean;
  activeYear: number;
  activeIndexOfMonth: number;
  getTheSelectedDayTextByDate: (
    selectedDayTimestamp: Timestamp,
  ) => string | undefined;
  changeMonth: (indexOfMonth: number) => void;
  changeYear: (year: number) => void;
}

const GoalContext = createContext<GoalContextI | null>(null);

export function useGoalContext() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error(
      'use GoalContext provider must be used within the GoalContext.Provider',
    );
  }
  return context;
}

export const GoalContextProvider: React.FC = ({children}) => {
  const {updateGoalOnDb, createNewGoalOnDb, goalsData, deleteGoalOnDb} =
    useDbContext();
  const [goalData, setGoalData] = React.useState<GoalDataI>();
  const goalCreatedAtToDate = dateUtils.timestampToDate(
    goalData?.createdAt ?? now,
  );
  const goalYear = dateUtils.parseTheDate(goalCreatedAtToDate).year;
  const goalMonth = dateUtils.parseTheDate(goalCreatedAtToDate).month;

  const [activeIndexOfMonth, setActiveIndexOfMonth] = React.useState(
    () => goalMonth,
  );
  const [activeMonthName, setActiveMonthName] = React.useState(
    () => months[activeIndexOfMonth],
  );
  const [activeYear, setActiveYear] = React.useState(() => goalYear);
  const [
    activeNumberOfDaysInCurrentMonth,
    setActiveNumberOfDaysInCurrentMonth,
  ] = React.useState(() =>
    dateUtils.getNumberOfDaysInMonth(activeYear, activeIndexOfMonth),
  );
  const [activeDate, setActiveDate] = React.useState(
    () => new Date(activeYear, activeIndexOfMonth),
  );
  const getGoals = React.useMemo(() => {
    if (!goalsData) {
      return;
    }
    return goalsData;
  }, [goalsData]);

  const generateNumberArrayByNumberOfDaysInActiveMonth = React.useMemo(() => {
    const days = generateArrayFromNumber(activeNumberOfDaysInCurrentMonth);
    return days;
  }, [activeNumberOfDaysInCurrentMonth]);

  const getTheGoalTextByActiveDate = () => {
    if (goalData?.goalTexts?.length === 0 || !goalData?.goalTexts) {
      return;
    }
    const goalTextObj = goalData?.goalTexts.filter(
      ({date}) =>
        dateUtils.parseTheDate(date.toDate()).year ===
        dateUtils.parseTheDate(activeDate).year,
    );
    if (goalTextObj.length === 0) {
      return;
    }
    const goalText = goalTextObj[goalTextObj.length - 1].text;
    return goalText;
  };

  const getTheSelectedDaysInMonthByActiveDate = React.useCallback(() => {
    const parsedActiveDate = dateUtils.parseTheDate(activeDate);
    if (!goalData?.selectedDays || goalData.selectedDays.length < 0) {
      return;
    }
    const selectedDaysInMonth = goalData.selectedDays.filter(obj => {
      const {month, year} = dateUtils.parseTheDate(
        dateUtils.timestampToDate(obj.date),
      );
      if (
        checkIfTwoNumberAreEqual(month, parsedActiveDate.month) &&
        checkIfTwoNumberAreEqual(year, parsedActiveDate.year)
      ) {
        return obj;
      }
    });
    if (selectedDaysInMonth.length === 0) {
      return;
    }
    return selectedDaysInMonth;
  }, [activeDate, goalData?.selectedDays]);

  const getTheSelectedDayTextByDate = (selectedDayTimestamp: Timestamp) => {
    if (!goalData?.selectedDays) {
      return;
    }
    const selectedday = goalData.selectedDays.find(({date}) =>
      date.isEqual(selectedDayTimestamp),
    );
    const selectedDayText = selectedday?.note;
    return selectedDayText;
  };
  const isTheSelectedDayMatchWithTheDayInTheComponent = React.useCallback(
    (day: number) => {
      const pureDaySelected = getTheSelectedDaysInMonthByActiveDate();
      if (!pureDaySelected) {
        return false;
      }
      const isDaySelected = pureDaySelected.some(
        ({date}) =>
          dateUtils.parseTheDate(dateUtils.timestampToDate(date)).day === day,
      );
      return isDaySelected;
    },
    [getTheSelectedDaysInMonthByActiveDate],
  );

  const changeMonth = useCallback(
    (indexOfMonth: number) => {
      setActiveMonthName(months[indexOfMonth]);
      setActiveIndexOfMonth(indexOfMonth);
      const newNumberOfDaysInActiveMonth = dateUtils.getNumberOfDaysInMonth(
        activeYear,
        indexOfMonth,
      );
      setActiveNumberOfDaysInCurrentMonth(newNumberOfDaysInActiveMonth);
      setActiveDate(new Date(activeYear, indexOfMonth));
    },
    [activeYear],
  );
  const changeYear = useCallback(
    (year: number) => {
      setActiveYear(year);
      const newNumberOfDaysInActiveMonth = dateUtils.getNumberOfDaysInMonth(
        year,
        activeIndexOfMonth,
      );
      setActiveNumberOfDaysInCurrentMonth(newNumberOfDaysInActiveMonth);
      setActiveDate(new Date(year, activeIndexOfMonth));
    },
    [activeIndexOfMonth],
  );

  // update the goal

  const findTheGoal = (id: string) => {
    if (!goalsData) {
      return false;
    }
    const res = goalsData.some(goal => goal.goalId === id);
    return res;
  };

  const isGoalExist = (id: string) => {
    const isExist = findTheGoal(id);
    return isExist;
  };

  const findAndSetGoalData = React.useCallback(
    (id?: string) => {
      const goal = goalsData?.filter(goalObj => goalObj.goalId === id);
      if (!goal) {
        return;
      }
      return setGoalData(goal[0]);
    },
    [goalsData],
  );

  const addNewGoal = React.useCallback(async () => {
    console.log('goalsdata', goalsData, goalsData?.length);
    if (!goalsData || goalsData.length > 11) {
      return;
    }
    await createNewGoalOnDb();
  }, [createNewGoalOnDb, goalsData]);

  const deleteGoal = React.useCallback(
    (goalId: string) => deleteGoalOnDb(goalId),
    [deleteGoalOnDb],
  );

  const updateGoal = (
    fieldsToUpdate: GoalTypeUpdatableFieldType,
    goalId: string,
  ) => {
    const obj: GoalTypeUpdatableFieldType = {...fieldsToUpdate};
    updateGoalOnDb(goalId, obj);
  };

  const getTheMissedDay = React.useCallback(
    (goalCreatedAt: Timestamp, selectedDays: SelectedDaysType) => {
      const goalCreatedAtTimestampToDate =
        dateUtils.timestampToDate(goalCreatedAt);

      const totalNumberOfSelectedDays = selectedDays ? selectedDays.length : 0;
      const lastItemDateInSelectedDays = selectedDays
        ? dateUtils.dateToTimestamp(
            new Date(
              dateUtils.getTheDateWithoutHours(
                dateUtils.timestampToDate(
                  selectedDays[selectedDays.length - 1].date,
                ),
              ),
            ),
          )
        : 1;
      const addPlustOneOrNot =
        lastItemDateInSelectedDays !== 1
          ? dateUtils.checkIsTimestampsAreEquals(
              lastItemDateInSelectedDays,
              dateUtils.dateToTimestamp(
                new Date(dateUtils.getTheDateWithoutHours(nowToDate)),
              ),
            )
            ? 1
            : 0
          : 0;
      const diffDays = dateUtils.dateDiffInDays(
        nowToDate,
        goalCreatedAtTimestampToDate,
      );

      const missedDayCalculation =
        Math.abs(diffDays) - totalNumberOfSelectedDays + addPlustOneOrNot;

      const missedDay = missedDayCalculation;
      return missedDay;
    },
    [],
  );
  //update goal
  return (
    <GoalContext.Provider
      value={{
        getGoals,
        goalData,
        findTheGoal,
        isGoalExist,
        findAndSetGoalData,
        setGoalData,
        addNewGoal,
        updateGoal,
        getTheMissedDay,
        generateNumberArrayByNumberOfDaysInActiveMonth,
        isTheSelectedDayMatchWithTheDayInTheComponent,
        activeYear,
        activeIndexOfMonth,
        getTheSelectedDayTextByDate,
        changeMonth,
        changeYear,
        // changeOnGoalText,
        deleteGoal,
      }}>
      {children}
    </GoalContext.Provider>
  );
};
