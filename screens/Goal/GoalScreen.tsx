import * as React from 'react';
import styled from 'styled-components/native';
import {SmallText} from '../../components/Typography';
import {darkColor} from '../../constants/stylesConstants';
import {useRouteHook} from '../../hooks/useRouteHook';

const MainBody = styled.View`
  flex: 1;
  background-color: ${darkColor};
  flex-direction: column;
`;
export const GoalScreen = () => {
  const {params} = useRouteHook('Goal');
  const {id} = params;
  console.log('bromm', id);
  return (
    <MainBody>
      <SmallText>Goal screen params {id}</SmallText>
    </MainBody>
  );
};
