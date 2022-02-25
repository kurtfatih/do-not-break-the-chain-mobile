import {Timestamp} from 'firebase/firestore';
import React, {createContext, useContext} from 'react';

import {nowToDate} from '../constants/dateConstants';
import {
  GoalDataI,
  GoalsDataType,
  GoalTypeUpdatableFieldType,
  SelectedDaysType,
} from '../firebase/types';
import {dateUtils} from '../utils/dateUtils';
import {useDbContext} from './DbContext';

interface GoalContextI {
  getGoals: GoalsDataType | undefined;
  findTheGoal: (id: string) => boolean | undefined;
  isGoalExist: (id: string) => boolean;
  findAndGetGoalById: (id?: string | undefined) => GoalDataI | undefined;
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

  const getGoals = React.useMemo(() => {
    if (!goalsData) {
      return;
    }
    return goalsData;
  }, [goalsData]);
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

  const findAndGetGoalById = React.useCallback(
    (id?: string) => {
      const goal = goalsData?.filter(goalObj => goalObj.goalId === id);
      if (!goal) {
        return;
      }
      return goal[0];
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
        findAndGetGoalById,
        setGoalData,
        addNewGoal,
        updateGoal,
        getTheMissedDay,
        // changeOnGoalText,
        deleteGoal,
      }}>
      {children}
    </GoalContext.Provider>
  );
};
