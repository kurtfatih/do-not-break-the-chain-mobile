import * as React from 'react';
import {useUserContext} from '../context/UserContext';
import {useNavigationHook} from '../hooks/useNavigationHook';

export const PrivateNavigation: React.FC = ({children}) => {
  const navigate = useNavigationHook();
  const {isUserLoggedIn} = useUserContext();
  React.useEffect(() => {
    if (isUserLoggedIn()) {
      return;
    } else {
      navigate.navigate('Login', {});
    }
  }, [isUserLoggedIn, navigate]);
  return <>{children}</>;
};
