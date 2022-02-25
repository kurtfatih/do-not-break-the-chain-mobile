import * as React from 'react';
import styled from 'styled-components/native';
import {SmallText} from '../../components/Typography';
import {darkColor} from '../../constants/stylesConstants';
import {ContactUsForm} from './ContactUsForm';

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${darkColor};
`;
const MainBody = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.View`
  width: 80%;
`;
export const ContactUsScreen = () => {
  return (
    <KeyboardAvoidingView>
      <MainBody>
        <FormContainer>
          <ContactUsForm />
        </FormContainer>
      </MainBody>
    </KeyboardAvoidingView>
  );
};
