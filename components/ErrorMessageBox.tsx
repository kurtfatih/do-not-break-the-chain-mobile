import * as React from 'react';
import styled from 'styled-components/native';
import {backgroundColor} from '../constants/stylesConstants';
import {useErrorContext} from '../context/ErrorContext';
import {SmallText} from './Typography';

const ErrorMessageBoxContainer = styled.View`
  display: flex;
  background-color: ${backgroundColor};
  flex-direction: row;
  justify-content: space-around;
  bottom: 0;
  left: 0;
  right: 0;
`;
export const ErrorMessageBox: React.FC = () => {
  const {errorMsg} = useErrorContext();
  return errorMsg.length > 0 ? (
    <ErrorMessageBoxContainer>
      <SmallText bolder>{errorMsg}</SmallText>
    </ErrorMessageBoxContainer>
  ) : null;
};
