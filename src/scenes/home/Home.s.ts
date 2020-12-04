import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const TitleImage = styled.Image`
  width: 300px;
  height: 100px;
  margin: 5% auto;
`;

export const SignInButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  padding-vertical: 10px;
  border-width: 1px;
  border-radius: 5px;
  width: 100%;
  flex-direction: row;
  margin: 10px;
`;

export const SignInButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const CryptoTable = styled.View`
  width: 90%;
  align-items: center;
  margin: 2% auto;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
`;

export const CryptoRow = styled.TouchableOpacity`
  width: 95%;
  flex-direction: row;
  margin: 1%;
  border-width: 0;
  border-radius: 0;
  border-color: #ddd;
  border-bottom-width: 1px;
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
