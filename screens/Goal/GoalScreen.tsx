import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {SmallText} from '../../components/Typography';
import {
  darkColor,
  greenColor,
  orangeColor,
} from '../../constants/stylesConstants';
import {useGoalContext} from '../../context/GoalContext';
import {useRouteHook} from '../../hooks/useRouteHook';
import moment from 'moment';
import {dateUtils} from '../../utils/dateUtils';
import {YearPicker} from '../../components/YearPicker';
import {MonthPicker} from '../../components/MonthPicker';
import {nowToDate} from '../../constants/dateConstants';
import {Timestamp} from '@firebase/firestore';
import {DayItem, DayItemContainer} from '../../components/DayItem';

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
  } = useGoalContext();

  React.useEffect(() => {
    findAndSetGoalData(id);
  }, [findAndSetGoalData, id]);

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
    return;
  }, [activeIndexOfMonth, changeMonth]);
  const handlePrevMonth = React.useCallback(() => {
    if (activeIndexOfMonth > 0) {
      return changeMonth(activeIndexOfMonth - 1);
    }
    return;
  }, [activeIndexOfMonth, changeMonth]);

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

  const arrayOfTheDayComponentsToProps =
    generateNumberArrayByNumberOfDaysInActiveMonth.map(day => {
      const isSelected = isTheSelectedDayMatchWithTheDayInTheComponent(day);
      const dayDate = new Date(activeYear, activeIndexOfMonth, day);
      const dayTimestamp = dateUtils.dateToTimestamp(dayDate);
      const handleDayPress = () =>
        isTheDatesAreExactSame
          ? handleSelectDayOnClick(dayTimestamp)
          : () => null;
      const {isTheDateOnTheFuture, isTheDateOnThePast, isTheDatesAreExactSame} =
        dateUtils.locationOfTheDateCompareToOtherDate(nowToDate, dayDate);

      const selectedDayNote = isSelected
        ? getTheSelectedDayTextByDate(dayTimestamp)
        : '';

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
      <View style={{flex: 1}}>
        <YearPicker
          handleNext={handleNextYear}
          handlePrev={handlePrevYear}
          year={activeYear.toString()}
        />
      </View>
      <View style={{flex: 1}}>
        <MonthPicker
          handleNext={handleNextMonth}
          handlePrev={handlePrevMonth}
          monthIndex={Number(activeIndexOfMonth)}
        />
      </View>
      <View style={{flex: 6}}>
        <DayItemContainer>
          {arrayOfTheDayComponentsToProps.map(
            (
              {
                day,
                handleDayPress,
                isSelected,
                isTheDateOnTheFuture,
                isTheDateOnThePast,
                isTheDatesAreExactSame,
              },
              index,
            ) => (
              <DayItem
                key={index}
                dayAsText={day.toString()}
                handleDayPress={handleDayPress}
                isTheDateOnTheFuture={isTheDateOnTheFuture}
                isTheDateOnThePast={isTheDateOnThePast}
                isTheDatesAreExactSame={isTheDatesAreExactSame}
                isSelected={isSelected}
              />
            ),
          )}
        </DayItemContainer>
      </View>
    </MainBody>
  );
};
