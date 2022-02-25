import * as React from 'react';
import styled from 'styled-components/native';
import {darkColor} from '../../constants/stylesConstants';
import {useUserContext} from '../../context/UserContext';
import {useNavigationHook} from '../../hooks/useNavigationHook';
import {LoginForm} from './LoginForm';
import {RegisterForm} from './RegisterForm';

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

export const LoginScreen = () => {
  const {isUserLoggedIn} = useUserContext();
  const navigate = useNavigationHook();
  const [isShowLoginForm, setIsShowLoginForm] = React.useState(true);
  const [currentEmail, setCurrentEmail] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [currentDisplayName, setCurrentDisplayName] = React.useState('');
  const handleShowLoginForm = () => {
    setIsShowLoginForm(!isShowLoginForm);
    setCurrentEmail('');
    setCurrentPassword('');
    setCurrentDisplayName('');
  };
  const handleChangeOnEmail = (email: string) => {
    setCurrentEmail(email);
  };
  const handleChangeOnPassword = (password: string) => {
    setCurrentPassword(password);
  };
  const handleChangeOnDisplayName = (displayName: string) => {
    setCurrentDisplayName(displayName);
  };
  React.useEffect(() => {
    if (isUserLoggedIn()) {
      navigate.navigate('Home', {});
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <KeyboardAvoidingView>
      <MainBody>
        <FormContainer>
          {isShowLoginForm ? (
            <LoginForm
              email={currentEmail}
              password={currentPassword}
              handleChangeOnEmail={handleChangeOnEmail}
              handleChangeOnPassword={handleChangeOnPassword}
              handleShowLoginForm={handleShowLoginForm}
            />
          ) : (
            <RegisterForm
              email={currentEmail}
              password={currentPassword}
              displayName={currentDisplayName}
              handleChangeOnEmail={handleChangeOnEmail}
              handleChangeOnPassword={handleChangeOnPassword}
              handleChangeOnDisplayName={handleChangeOnDisplayName}
              handleShowLoginForm={handleShowLoginForm}
            />
          )}
        </FormContainer>
      </MainBody>
    </KeyboardAvoidingView>
  );
};
