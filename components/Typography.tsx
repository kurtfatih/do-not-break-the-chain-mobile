import styled from 'styled-components/native';

const Text = styled.Text<{
  color?: string;
  bolder?: boolean;
  upperCase?: boolean;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}>`
  font-family: Helvetica;
  font-weight: ${({bolder}) => (bolder ? 'bold' : 'normal')};
  text-transform: ${({upperCase}) => (upperCase ? 'uppercase' : 'none')};
  color: ${({color}) => color ?? '#fff'};
  ${({ml}) => ml && `margin-left:${ml + 'px'};`}
  ${({mb}) => mb && `margin-bottom:${mb + 'px'};`}
    ${({mt}) => mt && `margin-top:${mt + 'px'};`}
    ${({mr}) => mr && `margin-right:${mr + 'px'};`}
`;
export const SmallText = styled(Text)`
  font-size: 16px;
`;
export const MediumText = styled(Text)`
  font-size: 32px;
`;
export const LargeText = styled(Text)`
  font-size: 48px;
`;
