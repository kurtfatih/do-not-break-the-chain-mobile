import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Spacer} from '../../components/Spacer';
import {SmallText} from '../../components/Typography';
import {useUserContext} from '../../context/UserContext';

interface LoginFormPropsI {
  handleShowLoginForm: () => void;
  handleChangeOnPassword: (password: string) => void;
  handleChangeOnEmail: (email: string) => void;
  password: string;
  email: string;
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
export const LoginForm: React.FC<LoginFormPropsI> = ({
  handleShowLoginForm,
  handleChangeOnEmail,
  handleChangeOnPassword,
  password,
  email,
}) => {
  const {signInWithPasswordAndEmail} = useUserContext();
  const handleLogin = async () => {
    await signInWithPasswordAndEmail({email, password});
  };
  return (
    <>
      <Input
        value={email}
        keyboardType="email-address"
        onChange={e => {
          handleChangeOnEmail(e.nativeEvent.text);
        }}
        placeholderTextColor="#fff"
        placeholder="Email..."
      />
      <Spacer space={20} />
      <Input
        onChange={e => {
          handleChangeOnPassword(e.nativeEvent.text);
        }}
        value={password}
        secureTextEntry
        placeholderTextColor="#fff"
        placeholder="Password..."
      />
      <Spacer space={20} />
      <SubmitButton onPress={handleLogin}>
        <SmallText>Login</SmallText>
      </SubmitButton>
      <Spacer space={5} />
      <TouchableOpacity onPress={handleShowLoginForm}>
        <SmallText>Haven't sign up yet</SmallText>
      </TouchableOpacity>
    </>
  );
};
