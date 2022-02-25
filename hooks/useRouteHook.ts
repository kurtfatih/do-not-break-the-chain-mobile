import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/navigationType';

export const useRouteHook = <T extends keyof RootStackParamList>(x: T) => {
  const navigation = useRoute<RouteProp<RootStackParamList, typeof x>>();
  return navigation;
};
