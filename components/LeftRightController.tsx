import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import LeftArrowIcon from '../assets/leftarrow.svg';
import RightArrowIcon from '../assets/rightarrow.svg';

interface LeftRightControllerPropsI {
  handlePrev: () => void;
  handleNext: () => void;
}
const LeftRightControllerContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 100%;
`;
export const LeftRightController: React.FC<LeftRightControllerPropsI> = ({
  children,
  handleNext,
  handlePrev,
}) => {
  return (
    <LeftRightControllerContainer>
      <View
        style={{
          flexDirection: 'row',
          flex: 4,
          height: '100%',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={handlePrev}
          style={{
            flex: 2,
            height: '100%',
            justifyContent: 'center',
          }}>
          <LeftArrowIcon fill="#fff" width="20" height="20" />
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>{children}</View>
        <TouchableOpacity
          onPress={handleNext}
          style={{
            flex: 2,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <RightArrowIcon fill="#fff" width="20" height="20" />
        </TouchableOpacity>
      </View>
    </LeftRightControllerContainer>
  );
};
