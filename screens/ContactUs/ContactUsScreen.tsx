import * as React from 'react';
import styled from 'styled-components/native';
import {SmallText} from '../../components/Typography';

const MainBody = styled.View`
  flex: 1;
  background-color: #1c222d;
`;
export const ContactUsScreen = () => {
  return (
    <MainBody>
      <SmallText>Contact Us</SmallText>
    </MainBody>
  );
};
