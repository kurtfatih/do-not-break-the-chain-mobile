import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {LargeText, MediumText, SmallText} from '../../components/Typography';
import {todayDays} from '../../constants/dateConstants';
import {
  darkColor,
  greenColor,
  orangeColor,
} from '../../constants/stylesConstants';
import {generateArrayFromNumber} from '../../utils/arrUtils';
export const Day = styled.View<{
  isSelected?: boolean;
  isSelecTable: boolean;
  isOnThePast: boolean;
  isOnTheFuture: boolean;
}>`
  display: flex;
  color: #fff;
  background-color: ${({isSelected, isOnThePast, isOnTheFuture}) => {
    if (isSelected) {
      return greenColor;
    }
    if (isOnThePast) {
      return orangeColor;
    }
    if (isOnTheFuture) {
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
  cursor: ${({isSelecTable}) => (isSelecTable ? 'pointer' : 'unset')};
  margin-vertical: 2;
  margin-horizontal: 2;
  &:hover {
    background-color: ${({isSelecTable}) =>
      isSelecTable ? greenColor : 'none'};
  }
  shadowcolor: #000;
  shadowopacity: 0.58;
  shadowradius: 16;
  text-align: left;
`;

const MainBody = styled.View`
  flex: 4;
  background-color: ${darkColor};
  flex-direction: column;
`;
const HeaderContainer = styled.View`
  flex: 1;
`;
const BodyContainer = styled.View`
  display: flex;
  flex: 2;
`;
const DayItemContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
`;
const FooterContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
`;

const days = generateArrayFromNumber(31);
const dummyDaysObj = days.map(day => {
  if (day === todayDays) {
    const obj = {
      isSelected: false,
      isSelecTable: true,
      isOnThePast: false,
      isOnTheFuture: false,
    };
    return obj;
  }
  if (day < todayDays) {
    return {
      isSelected: false,
      isSelecTable: false,
      isOnThePast: true,
      isOnTheFuture: false,
    };
  }
  if (day > todayDays) {
    return {
      isSelected: false,
      isSelecTable: false,
      isOnThePast: false,
      isOnTheFuture: true,
    };
  }
  return {
    isSelected: false,
    isSelecTable: false,
    isOnThePast: false,
    isOnTheFuture: false,
  };
});
const missedDays = todayDays - 1;
console.log(dummyDaysObj);
console.log('todadays', todayDays);
export const HomeScreen = () => {
  return (
    <MainBody>
      <HeaderContainer>
        <LargeText bolder upperCase>
          Do not break the chain
        </LargeText>
      </HeaderContainer>

      <BodyContainer>
        <DayItemContainer>
          {dummyDaysObj.map(
            ({isOnTheFuture, isOnThePast, isSelecTable, isSelected}, index) => (
              <DayItem
                key={index}
                isOnTheFuture={isOnTheFuture}
                isOnThePast={isOnThePast}
                isSelecTable={isSelecTable}
                isSelected={isSelected}
                dayAsText={(index + 1).toString()}
              />
            ),
          )}
        </DayItemContainer>
      </BodyContainer>
      <FooterContainer>
        <SmallText>Missed day here... {missedDays}</SmallText>
      </FooterContainer>
    </MainBody>
  );
};
interface DayItemProps {
  isOnTheFuture: boolean;
  isOnThePast: boolean;
  isSelecTable: boolean;
  isSelected: boolean;
  dayAsText: string;
}
const DayItem: React.FC<DayItemProps> = ({dayAsText, isSelected, ...props}) => {
  const [isSelectedLocal, setIsSelectedLocal] = React.useState(isSelected);
  const handleDayPress = () => {
    if (props.isOnTheFuture || props.isOnThePast) {
      return;
    }
    if (props.isSelecTable && !isSelected) {
      return setIsSelectedLocal(true);
    }
    return;
  };

  return (
    <TouchableOpacity onPress={handleDayPress}>
      <Day isSelected={isSelectedLocal} {...props}>
        <SmallText>{dayAsText}</SmallText>
      </Day>
    </TouchableOpacity>
  );
};
