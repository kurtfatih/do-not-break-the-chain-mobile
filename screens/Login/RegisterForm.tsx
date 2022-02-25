import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Spacer} from '../../components/Spacer';
import {SmallText} from '../../components/Typography';
import {useUserContext} from '../../context/UserContext';

interface RegisterFormI {
  handleShowLoginForm: () => void;
  handleChangeOnPassword: (password: string) => void;
  handleChangeOnEmail: (email: string) => void;
  handleChangeOnDisplayName: (dispalyName: string) => void;
  password: string;
  email: string;
  displayName: string;
}

const Input = styled.TextInput`
  border: 1px solid #fff;
  border-radius: 10px;
  color: #fff;
`;
const SubmitButton = styled.TouchableOpacity`
  background-color: #ee6c4d;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 50px;
`;
export const RegisterForm: React.FC<RegisterFormI> = ({
  handleShowLoginForm,
  handleChangeOnDisplayName,
  handleChangeOnEmail,
  handleChangeOnPassword,
  email,
  password,
  displayName,
}) => {
  const {createUserWithEmailPasswordAndDisplayName} = useUserContext();
  const handleRegister = async () => {
    await createUserWithEmailPasswordAndDisplayName({
      displayName,
      email,
      password,
    });
  };
  return (
    <>
      <Input
        value={displayName}
        onChange={e => {
          handleChangeOnDisplayName(e.nativeEvent.text);
        }}
        placeholderTextColor="#fff"
        placeholder="Your name..."
      />
      <Spacer space={20} />
      <Input
        keyboardType="email-address"
        value={email}
        onChange={e => {
          handleChangeOnEmail(e.nativeEvent.text);
        }}
        placeholderTextColor="#fff"
        placeholder="Email..."
      />
      <Spacer space={20} />
      <Input
        keyboardType="visible-password"
        onChange={e => {
          handleChangeOnPassword(e.nativeEvent.text);
        }}
        value={password}
        placeholderTextColor="#fff"
        placeholder="Password..."
        secureTextEntry
      />
      <Spacer space={20} />
      <SubmitButton onPress={handleRegister}>
        <SmallText>Sign Up</SmallText>
      </SubmitButton>
      <Spacer space={5} />
      <TouchableOpacity onPress={handleShowLoginForm}>
        <SmallText>You have account already?</SmallText>
      </TouchableOpacity>
    </>
  );
};
