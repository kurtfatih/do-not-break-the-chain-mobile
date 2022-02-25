import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useUserContext} from '../context/UserContext';
import {useNavigationHook} from '../hooks/useNavigationHook';
import {RootStackParamList} from '../navigation/navigationType';
import {SmallText} from './Typography';
// import SvgIcon from "react-native-svg-icon" import HomeIcon from "../assets/home.svg"
// import ContactIcon from "../assets/contact.svg"
// import LoginIcon from "../assets/login.svg"
// import LogoutIcon from "../assets/logout.svg"
// import ChaınIcon from "../assets/chain.svg"

const NavigationBarContainer = styled.View`
  display: flex;
  background-color: black;
  flex-direction: row;
  position: absolute;
  justify-content: space-around;
  bottom: 0;
  left: 0;
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
  }[] = [
    {
      text: 'Home',
      path: 'Home',
      showLink: true,
      onPress: () => navigate.navigate('Home', {}),
    },
    {
      text: 'Contact Us',
      path: 'Contact',
      showLink: true,
      onPress: () => navigate.navigate('Contact', {}),
    },
    {
      text: 'Login',
      path: 'Login',
      showLink: !isUserLoggedIn(),
      onPress: () => navigate.navigate('Login', {}),
    },
    {
      text: 'Logout',
      path: 'Logout',
      showLink: isUserLoggedIn(),
      onPress: async () => await signOutCurrentAuth(),
    },
  ];
  return (
    <NavigationBarContainer>
      {itemAlongBar.map(({text, showLink, onPress}, index) =>
        showLink ? (
          <TouchableOpacity key={index} onPress={onPress}>
            <SmallText>{text}</SmallText>
          </TouchableOpacity>
        ) : null,
      )}
    </NavigationBarContainer>
  );
};
