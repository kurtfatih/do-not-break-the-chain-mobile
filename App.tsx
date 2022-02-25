import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {ErrorMessageBox} from './components/ErrorMessageBox';
import {FixedBottomNavigation} from './components/FixedBottomNavigation';
import {DbContextProvider} from './context/DbContext';
import {ErrorContextProvider} from './context/ErrorContext';
import {GoalContextProvider} from './context/GoalContext';
import {UserContextProvider} from './context/UserContext';
import {Navigations} from './navigation/Navigations';

const MainSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const App = () => {
  return (
    // <UserContextProvider>
    <SafeAreaProvider>
      <NavigationContainer>
        <ErrorContextProvider>
          <UserContextProvider>
            <DbContextProvider>
              <GoalContextProvider>
                <MainSafeAreaView>
                  <ErrorMessageBox />
                  <Navigations />
                  <FixedBottomNavigation />
                </MainSafeAreaView>
              </GoalContextProvider>
            </DbContextProvider>
          </UserContextProvider>
        </ErrorContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
    // </UserContextProvider>
  );
};

export default App;
