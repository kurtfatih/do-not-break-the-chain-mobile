import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Spacer} from '../../components/Spacer';
import {SmallText} from '../../components/Typography';
import {useUserContext} from '../../context/UserContext';

interface ContactUsFormPropsI {}

const Input = styled.TextInput<{isMultiline?: boolean}>`
  border: 1px solid #fff;
  color: #fff;
  align-items: ${({isMultiline}) => (isMultiline ? 'flex-start' : 'center')};
  justify-content: ${({isMultiline}) =>
    isMultiline ? 'flex-start' : 'center'};
  border-radius: ${({isMultiline}) => (isMultiline ? '10px' : '10px')};
  max-height: 100px;
`;
const SubmitButton = styled.TouchableOpacity`
  background-color: #ee6c4d;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 50px;
`;
export const ContactUsForm: React.FC<ContactUsFormPropsI> = ({}) => {
  const {isUserLoggedIn} = useUserContext();
  return (
    <>
      {!isUserLoggedIn && (
        <Input
          keyboardType={'email-address'}
          placeholderTextColor="#fff"
          placeholder="Email..."
        />
      )}
      <Spacer space={20} />
      <Input placeholderTextColor="#fff" placeholder="Name..." />
      <Spacer space={20} />
      <Input
        numberOfLines={4}
        multiline
        isMultiline={true}
        placeholderTextColor="#fff"
        placeholder="Message..."
      />
      <Spacer space={20} />
      <SubmitButton>
        <SmallText>Send</SmallText>
      </SubmitButton>
      <Spacer space={5} />
    </>
  );
};
