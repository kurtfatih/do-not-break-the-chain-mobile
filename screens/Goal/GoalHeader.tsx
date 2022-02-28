import * as React from 'react';
import {View, TextInput, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';
import {MonthPicker} from '../../components/MonthPicker';
import {YearPicker} from '../../components/YearPicker';

interface GoalHeaderPropsI {
  handleNextYear: () => void;
  handlePrevYear: () => void;
  year: string;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  activeIndexOfMonth: number;
  localGoalName: string;
  handleOnLocalGoalNameChange: (e: string) => void;
  handleGoalNameInputOnBlur: () => void;
}
export const GoalHeader: React.FC<GoalHeaderPropsI> = ({
  handleNextMonth,
  handleNextYear,
  handlePrevMonth,
  handlePrevYear,
  activeIndexOfMonth,
  localGoalName,
  handleOnLocalGoalNameChange,
  year,
  handleGoalNameInputOnBlur,
}) => {
  return (
    <>
      <HeaderItem>
        <YearPicker
          handleNext={handleNextYear}
          handlePrev={handlePrevYear}
          year={year}
        />
      </HeaderItem>
      <HeaderItem>
        <MonthPicker
          handleNext={handleNextMonth}
          handlePrev={handlePrevMonth}
          monthIndex={activeIndexOfMonth}
        />
      </HeaderItem>

      <HeaderItem
        fullWidth
        alignItems="flex-end"
        flexDirection="row"
        justifyContent="center">
        <Input
          placeholderTextColor="#fff"
          onChange={e => handleOnLocalGoalNameChange(e.nativeEvent.text)}
          onSubmitEditing={handleGoalNameInputOnBlur}
          value={localGoalName}
          placeholder="Goal name..."
        />
      </HeaderItem>
    </>
  );
};

const HeaderItem = styled.View<{
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center';
  alignItems?: 'flex-end' | 'flex-start';
  fullWidth?: boolean;
}>`
  flex: 1;
  ${({flexDirection}) => flexDirection && `flex-direction:${flexDirection};`}
  ${({alignItems}) => alignItems && `align-items:${alignItems};`}
  ${({justifyContent}) =>
    justifyContent && `justify-content:${justifyContent};`}
`;

const Input = styled.TextInput`
  border: 1px solid #fff;
  border-radius: 10px;
  color: #fff;
  width: 70%;
`;
