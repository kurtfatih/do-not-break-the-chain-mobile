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
import {DayItem, DayItemContainer} from '../../components/DayItem';
import {LargeText, MediumText, SmallText} from '../../components/Typography';
import {todayDays} from '../../constants/dateConstants';
import {
  darkColor,
  greenColor,
  orangeColor,
} from '../../constants/stylesConstants';
import {useNavigationHook} from '../../hooks/useNavigationHook';
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
  shadow-color: #000;
  shadow-opacity: 0.58;
  shadow-radius: 16;
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
const FooterContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
`;

const days = generateArrayFromNumber(31);
const missedDays = todayDays - 1;
export const HomeScreen = () => {
  const navigate = useNavigationHook();

  const dummyDaysObj = days.map(day => {
    if (day === todayDays) {
      const obj = {
        isSelected: false,
        isTheDatesAreExactSame: true,
        isTheDateOnThePast: false,
        isTheDateOnTheFuture: false,
        handleDayPress: () => navigate.navigate('Goals', {}),
      };
      return obj;
    }
    if (day < todayDays) {
      return {
        isSelected: false,
        isTheDatesAreExactSame: false,
        isTheDateOnThePast: true,
        isTheDateOnTheFuture: false,
        handleDayPress: () => null,
      };
    }
    if (day > todayDays) {
      return {
        isSelected: false,
        isTheDatesAreExactSame: false,
        isTheDateOnThePast: false,
        isTheDateOnTheFuture: true,
        handleDayPress: () => null,
      };
    }
    return {
      isSelected: false,
      isTheDatesAreExactSame: false,
      isTheDateOnThePast: false,
      isTheDateOnTheFuture: false,
      handleDayPress: () => null,
    };
  });
  return (
    <MainBody>
      <HeaderContainer>
        <LargeText bolder upperCase>
          Do not break the chain
        </LargeText>
      </HeaderContainer>

      <BodyContainer>
        <DayItemContainer>
          {dummyDaysObj.map((props, index) => (
            <DayItem
              key={index}
              dayAsText={(index + 1).toString()}
              {...props}
            />
          ))}
        </DayItemContainer>
      </BodyContainer>
      <FooterContainer>
        <SmallText>Missed day here... {missedDays}</SmallText>
      </FooterContainer>
    </MainBody>
  );
};
// interface DayItemProps {
//   isOnTheFuture: boolean;
//   isOnThePast: boolean;
//   isSelecTable: boolean;
//   isSelected: boolean;
//   dayAsText: string;
// }
// const DayItem: React.FC<DayItemProps> = ({dayAsText, isSelected, ...props}) => {
//   const [isSelectedLocal, setIsSelectedLocal] = React.useState(isSelected);
//   const handleDayPress = () => {
//     if (props.isOnTheFuture || props.isOnThePast) {
//       return;
//     }
//     if (props.isSelecTable && !isSelected) {
//       return setIsSelectedLocal(true);
//     }
//     return;
//   };

//   return (
//     <TouchableOpacity onPress={handleDayPress}>
//       <Day isSelected={isSelectedLocal} {...props}>
//         <SmallText>{dayAsText}</SmallText>
//       </Day>
//     </TouchableOpacity>
//   );
// };
