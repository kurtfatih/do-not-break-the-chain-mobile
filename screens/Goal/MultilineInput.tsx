import * as React from 'react';
import styled from 'styled-components/native';

interface MultilineInputPropsI {
  value: string;
  placeholder: string;
  onChange: (e: string) => void;
}
export const MultilineInput: React.FC<MultilineInputPropsI> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Input
      numberOfLines={4}
      multiline
      value={value}
      onChange={e => onChange(e.nativeEvent.text)}
      isMultiline={true}
      placeholderTextColor="#fff"
    />
  );
};

const Input = styled.TextInput<{isMultiline?: boolean}>`
  border: 1px solid #fff;
  color: #fff;
  align-items: ${({isMultiline}) => (isMultiline ? 'flex-start' : 'center')};
  justify-content: ${({isMultiline}) =>
    isMultiline ? 'flex-start' : 'center'};
  border-radius: ${({isMultiline}) => (isMultiline ? '10px' : '10px')};
  max-height: 100px;
  align-self: stretch;
`;
