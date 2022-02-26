import * as React from 'react';
import {LeftRightController} from './LeftRightController';
import {SmallText} from './Typography';
interface YearPickerPropsI {
  year: string;
  handlePrev: () => void;
  handleNext: () => void;
}
export const YearPicker: React.FC<YearPickerPropsI> = ({
  year,
  handleNext,
  handlePrev,
}) => {
  return (
    <LeftRightController handleNext={handleNext} handlePrev={handlePrev}>
      <SmallText>{year}</SmallText>
    </LeftRightController>
  );
};
