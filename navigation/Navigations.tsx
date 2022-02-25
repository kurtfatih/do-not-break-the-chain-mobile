import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ContactUsScreen} from '../screens/ContactUs/ContactUsScreen';
import {GoalScreen} from '../screens/Goal/GoalScreen';
import {GoalsScreen} from '../screens/Goals/GoalsScreen';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {LoginScreen} from '../screens/Login/LoginScreen';
import {RootStackParamList} from './navigationType';
import {PrivateNavigation} from './PrivateNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigations: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home">{() => <HomeScreen />}</Stack.Screen>
      <Stack.Screen name="Contact">{() => <ContactUsScreen />}</Stack.Screen>
      <Stack.Screen name="Login">{() => <LoginScreen />}</Stack.Screen>
      <Stack.Screen name="Goals">
        {() => (
          <PrivateNavigation>
            <GoalsScreen />
          </PrivateNavigation>
        )}
      </Stack.Screen>

      <Stack.Screen name="Goal" initialParams={{id: ''}}>
        {() => (
          <PrivateNavigation>
            <GoalScreen />
          </PrivateNavigation>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
