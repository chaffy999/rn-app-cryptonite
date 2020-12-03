import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const TitleText = styled.Text`
  font-size: ${(props) => props.theme.font.sizes.title};
  color: ${(props) => props.theme.colors.accent};
  text-transform: uppercase;
  text-align: center;
  margin: 5%;
`;

export const CryptoTable = styled.View`
  flex: 1;
  width: 90%;
  height: auto;
  margin: 2% auto;
  border-width: 1;
  border-radius: 10px;
  border-color: #ddd;
  border-bottom-width: 0;
  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  elevation: 1;
  align-items: center;
`;

export const CryptoRow = styled.View`
  width: 95%;
  flex-direction: row;
  margin: 1%;
  border-width: 0;
  border-radius: 1;
  border-color: #ddd;
  border-bottom-width: 1;
  justify-content: space-between;
`;

export const CryptoLogo = styled.View`
  height: auto;
  display: flex;
  margin: 5px;
`;

export const Logo = styled.Image`
  height: 50px;
  width: 50px;
`;

export const CryptoName = styled.Text`
  font-size: ${(props) => props.theme.font.sizes.extraLarge};
  color: ${(props) => props.theme.colors.accent};
`;

export const CryptoPrice = styled.Text`
  font-size: ${(props) => props.theme.font.sizes.extraLarge};
  color: ${(props) => props.theme.colors.accent};
  text-align: right;
`;

export const CryptoInfo = styled.View`
  flex: 1;
`;

export const CryptoSymbol = styled.Text`
  font-size: ${(props) => props.theme.font.sizes.large};
  color: ${(props) => props.theme.colors.lightGrey};
`;

export const CryptoPercentPositive = styled.Text`
  font-size: ${(props) => props.theme.font.sizes.large};
  color: ${(props) => props.theme.colors.success};
  text-align: right;
`;

export const CryptoPercentNegative = styled.Text`
  font-size: ${(props) => props.theme.font.sizes.large};
  color: ${(props) => props.theme.colors.error};
  text-align: right;
`;
