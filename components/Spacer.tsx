import styled from 'styled-components/native';

export const Spacer = styled.View<{space: number}>`
  margin: ${({space}) => space + 'px'};
`;
