import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {greenColor, orangeColor} from '../constants/stylesConstants';
import {SmallText} from './Typography';

interface DayItemProps {
  isTheDateOnTheFuture: boolean;
  isTheDateOnThePast: boolean;
  isTheDatesAreExactSame: boolean;
  isSelected: boolean;
  dayAsText: string;
  handleDayPress: () => void;
  handleOnLongPress?: () => void;
}
export const DayItem: React.FC<DayItemProps> = ({
  dayAsText,
  handleDayPress,
  handleOnLongPress,
  ...props
}) => {
  // const [isSelectedLocal, setIsSelectedLocal] = React.useState(isSelected); // const handleDayPress = () => {
  //   if (props.isOnTheFuture || props.isOnThePast) {
  //     return;
  //   }
  //   if (props.isSelecTable && !isSelected) {
  //     return setIsSelectedLocal(true);
  //   }
  //   return;
  // };

  return (
    <TouchableOpacity onLongPress={handleOnLongPress} onPress={handleDayPress}>
      <Day {...props}>
        <SmallText>{dayAsText}</SmallText>
      </Day>
    </TouchableOpacity>
  );
};

const Day = styled.View<{
  isSelected?: boolean;
  isTheDateOnTheFuture: boolean;
  isTheDateOnThePast: boolean;
  isTheDatesAreExactSame: boolean;
}>`
  display: flex;
  color: #fff;
  background-color: ${({
    isSelected,
    isTheDateOnThePast,
    isTheDateOnTheFuture,
  }) => {
    if (isSelected) {
      return greenColor;
    }
    if (isTheDateOnThePast) {
      return orangeColor;
    }
    if (isTheDateOnTheFuture) {
      return 'gray';
    }
    return 'gray';
  }};
  padding: 5px 10px 20px 10px;
  border-radius: 10px;
  min-width: 45px;
  min-height: 45px;
  width: 45px;
  height: 45px;
  cursor: ${({isTheDatesAreExactSame}) =>
    isTheDatesAreExactSame ? 'pointer' : 'unset'};
  margin-vertical: 2;
  margin-horizontal: 2;
  shadow-color: #000;
  shadow-opacity: 0.58;
  shadow-radius: 16;
  text-align: left;
`;

export const DayItemContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
`;
