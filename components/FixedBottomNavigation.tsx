import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useUserContext} from '../context/UserContext';
import {useNavigationHook} from '../hooks/useNavigationHook';
import {RootStackParamList} from '../navigation/navigationType';
import {SmallText} from './Typography';
// import SvgIcon from "react-native-svg-icon" import HomeIcon from "../assets/home.svg"
import ContactIcon from '../assets/contact.svg';
import LoginIcon from '../assets/login.svg';
import LogoutIcon from '../assets/logout.svg';
import ChainIcon from '../assets/chain.svg';
import HomeIcon from '../assets/home.svg';
import {backgroundColor} from '../constants/stylesConstants';

const NavigationBarContainer = styled.View`
  display: flex;
  background-color: ${backgroundColor};
  flex-direction: row;
  position: absolute;
  justify-content: space-around;
  bottom: 0;
  left: 0;
  padding: 3%;
  right: 0;
`;
// const Icon = (props:any) => <SvgIcon {...props} svgs={svgs} />;
export const FixedBottomNavigation = () => {
  const navigate = useNavigationHook();
  const {isUserLoggedIn, signOutCurrentAuth} = useUserContext();
  const itemAlongBar: {
    text: string;
    path: keyof RootStackParamList;
    showLink: boolean;
    onPress: () => void;
    icon: any;
  }[] = [
    {
      text: 'Home',
      path: 'Home',
      showLink: true,
      onPress: () => navigate.navigate('Home', {}),
      icon: <HomeIcon fill="#fff" width="25px" height="20px" />,
    },
    {
      text: 'Goals',
      path: 'Goals',
      showLink: isUserLoggedIn(),
      onPress: () => navigate.navigate('Goals', {}),
      icon: <ChainIcon fill="#fff" width="25px" height="20px" />,
    },
    {
      text: 'Contact Us',
      path: 'Contact',
      showLink: true,
      onPress: () => navigate.navigate('Contact', {}),

      icon: <ContactIcon fill="#fff" width="25px" height="20px" />,
    },
    {
      text: 'Login',
      path: 'Login',
      showLink: !isUserLoggedIn(),
      onPress: () => navigate.navigate('Login', {}),

      icon: <LoginIcon fill="#fff" width="25px" height="20px" />,
    },
    {
      text: 'Logout',
      path: 'Logout',
      showLink: isUserLoggedIn(),
      onPress: async () => await signOutCurrentAuth(),
      icon: <LogoutIcon fill="#fff" width="25px" height="20px" />,
    },
  ];
  return (
    <NavigationBarContainer>
      {itemAlongBar.map(({text, showLink, onPress, icon}, index) =>
        showLink ? (
          <TouchableOpacity key={index} onPress={onPress}>
            {icon}
          </TouchableOpacity>
        ) : null,
      )}
    </NavigationBarContainer>
  );
};
