import * as React from 'react';
import styled from 'styled-components/native';
import {SmallText} from '../../components/Typography';
import {darkColor} from '../../constants/stylesConstants';

const MainBody = styled.View`
  flex: 1;
  background-color: ${darkColor};
`;
export const ContactUsScreen = () => {
  return (
    <MainBody>
      <SmallText>Contact Us</SmallText>
    </MainBody>
  );
};
