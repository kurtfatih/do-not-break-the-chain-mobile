import * as React from 'react';
import styled from 'styled-components/native';
import {darkColor} from '../../constants/stylesConstants';
import {useGoalContext} from '../../context/GoalContext';
import {useRouteHook} from '../../hooks/useRouteHook';
import {dateUtils} from '../../utils/dateUtils';
import {nowToDate} from '../../constants/dateConstants';
import {Timestamp} from '@firebase/firestore';
import {GoalText} from '../../firebase/types';
import {GoalHeader} from './GoalHeader';
import {GoalBody} from './GoalBody';

const MainBody = styled.View`
  flex: 8;
  background-color: ${darkColor};
  flex-direction: column;
`;
export const GoalScreen = () => {
  const {params} = useRouteHook('Goal');
  const {id} = params;

  const {
    findAndSetGoalData,
    goalData,
    generateNumberArrayByNumberOfDaysInActiveMonth,
    isTheSelectedDayMatchWithTheDayInTheComponent,
    activeYear,
    activeIndexOfMonth,
    updateGoal,
    getTheSelectedDayTextByDate,
    changeMonth,
    changeYear,
    getTheGoalTextByActiveDate,
    activeDate,
  } = useGoalContext();

  React.useEffect(() => {
    findAndSetGoalData(id);
  }, [findAndSetGoalData, id]);

  const [localGoalName, setLocalGoalName] = React.useState<string>();
  React.useEffect(() => {
    const activeGoalName = getTheGoalTextByActiveDate();
    setLocalGoalName(activeGoalName);
  }, [getTheGoalTextByActiveDate]);

  const handleNextYear = React.useCallback(() => {
    changeYear(activeYear + 1);
  }, [activeYear, changeYear]);
  const handlePrevYear = React.useCallback(() => {
    changeYear(activeYear - 1);
  }, [activeYear, changeYear]);
  const handleNextMonth = React.useCallback(() => {
    if (activeIndexOfMonth < 11) {
      return changeMonth(activeIndexOfMonth + 1);
    }
    return changeMonth(0);
  }, [activeIndexOfMonth, changeMonth]);
  const handlePrevMonth = React.useCallback(() => {
    if (activeIndexOfMonth > 0) {
      return changeMonth(activeIndexOfMonth - 1);
    }
    return changeMonth(11);
  }, [activeIndexOfMonth, changeMonth]);

  const handleGoalNameInputOnBlur = React.useCallback(() => {
    if (!localGoalName) {
      return;
    }
    const newObj: GoalText = {
      date: dateUtils.dateToTimestamp(activeDate),
      text: localGoalName,
    };
    if (goalData?.goalTexts) {
      const indexOfSameOne = goalData.goalTexts.findIndex(({date}) =>
        dateUtils.checkIsTimestampsAreEquals(date, newObj.date),
      );
      let newGoalTextsCopy = [...goalData.goalTexts];
      if (indexOfSameOne < 0) {
        newGoalTextsCopy = [...newGoalTextsCopy, newObj];
        //there is goal name before for active year
      } else {
        newGoalTextsCopy[indexOfSameOne] = newObj;
      }
      return updateGoal(
        {
          goalTexts: newGoalTextsCopy,
        },
        goalData.goalId,
      );
    } else {
      return updateGoal(
        {
          goalTexts: [newObj],
        },
        goalData!.goalId,
      );
    }
  }, [activeDate, goalData, localGoalName, updateGoal]);

  if (!goalData) {
    return null;
  }

  const handleSelectDayOnClick = (timestampOfTheDay: Timestamp) => {
    const newObj = {date: timestampOfTheDay, note: ''};
    updateGoal(
      {
        selectedDays: goalData.selectedDays
          ? [...goalData.selectedDays, newObj]
          : [newObj],
      },
      goalData.goalId,
    );
  };
  const handleOnLocalGoalNameChange = (e: string) => {
    setLocalGoalName(e);
  };

  const arrayOfTheDaysProps =
    generateNumberArrayByNumberOfDaysInActiveMonth.map(day => {
      const isSelected = isTheSelectedDayMatchWithTheDayInTheComponent(day);
      const dayDate = new Date(activeYear, activeIndexOfMonth, day);
      const dayTimestamp = dateUtils.dateToTimestamp(dayDate);
      const handleDayPress = () =>
        isTheDatesAreExactSame
          ? !isSelected
            ? handleSelectDayOnClick(dayTimestamp)
            : () => null
          : () => null;

      const {isTheDateOnTheFuture, isTheDateOnThePast, isTheDatesAreExactSame} =
        dateUtils.locationOfTheDateCompareToOtherDate(nowToDate, dayDate);

      const selectedDayNote = getTheSelectedDayTextByDate(dayTimestamp);

      return {
        isSelected,
        isTheDateOnTheFuture,
        isTheDateOnThePast,
        isTheDatesAreExactSame,
        day,
        dayTimestamp,
        handleDayPress,
        selectedDayNote,
      };
    });

  return (
    <MainBody>
      <GoalHeader
        activeIndexOfMonth={activeIndexOfMonth}
        year={activeYear.toString()}
        handleGoalNameInputOnBlur={handleGoalNameInputOnBlur}
        handleNextMonth={handleNextMonth}
        handleNextYear={handleNextYear}
        handleOnLocalGoalNameChange={handleOnLocalGoalNameChange}
        handlePrevMonth={handlePrevMonth}
        handlePrevYear={handlePrevYear}
        localGoalName={localGoalName ?? ''}
      />
      <GoalBody arrayOfTheDaysProps={arrayOfTheDaysProps} />
    </MainBody>
  );
};
