import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SmallText} from '../../components/Typography';
import {darkColor} from '../../constants/stylesConstants';
import {useGoalContext} from '../../context/GoalContext';
import {useRouteHook} from '../../hooks/useRouteHook';
import moment from 'moment';

const MainBody = styled.View`
  flex: 1;
  background-color: ${darkColor};
  flex-direction: column;
`;
export const GoalScreen = () => {
  const {params} = useRouteHook('Goal');

  const {findAndSetGoalData, goalData} = useGoalContext();
  const {id} = params;
  React.useEffect(() => {
    findAndSetGoalData(id);
  }, [findAndSetGoalData, id]);
  console.log('bromm', goalData);
  if (!goalData) {
    return null;
  }
  return (
    <MainBody>
      <SmallText>Goal screen params {id}</SmallText>
      <SmallText>Show date</SmallText>
    </MainBody>
  );
};
