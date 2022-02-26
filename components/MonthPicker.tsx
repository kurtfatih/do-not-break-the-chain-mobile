import * as React from 'react';
import {months} from '../constants/dateConstants';
import {LeftRightController} from './LeftRightController';
import {SmallText} from './Typography';

interface MonthPickerPropsI {
  monthIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
}

export const MonthPicker: React.FC<MonthPickerPropsI> = ({
  monthIndex,
  handleNext,
  handlePrev,
}) => {
  const currentMonthDisplayName = months[monthIndex];
  return (
    <LeftRightController handleNext={handleNext} handlePrev={handlePrev}>
      <SmallText>{currentMonthDisplayName}</SmallText>
    </LeftRightController>
  );
};
