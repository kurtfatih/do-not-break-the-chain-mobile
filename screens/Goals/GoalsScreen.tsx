import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AddIcon from '../../assets/add.svg';
import {SmallText} from '../../components/Typography';
import {darkColor, greenColor} from '../../constants/stylesConstants';

const MainBody = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${darkColor};
`;
const Icon = styled(AddIcon)`
  fill: ${greenColor};
  width: 45px;
  height: 45px;
`;
const IconContainer = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 10px;
`;
export const GoalsScreen = () => {
  return (
    <MainBody>
      <IconContainer>
        <TouchableOpacity>
          <Icon />
        </TouchableOpacity>
      </IconContainer>
      <SmallText>Heyyo</SmallText>
    </MainBody>
  );
};
