import * as React from 'react';
import {Modal} from 'react-native';

interface ModalPropsI {
  isVisible?: boolean;
  onClose: () => void;
  modalAnimation?: 'slide' | 'none' | 'fade';
  isTransparent: boolean;
}
export const ModalWrapper: React.FC<ModalPropsI> = ({
  children,
  onClose,
  isVisible,
  modalAnimation,
  isTransparent,
}) => {
  return (
    <Modal
      animationType={modalAnimation}
      transparent={isTransparent}
      visible={isVisible}
      onRequestClose={onClose}>
      {children}
    </Modal>
  );
};
