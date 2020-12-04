import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const CryptoContainer = styled.View`
  flex: 1;
`;

export const Title = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 5% auto;
`;

export const TitleImage = styled.Image`
  width: 60px;
  height: 60px;
`;

export const TitleText = styled.Text`
  font-size: ${(props) => props.theme.font.sizes.title};
  color: ${(props) => props.theme.colors.primary};
  margin: auto 5px;
`;

export const StatsContainer = styled.View`
  flex: 1;
  width: 90%;
  margin: 0 auto;
`;

export const StatsRow = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const StatsTitle = styled.Text`
  flex: 0.6;
  font-size: ${(props) => props.theme.font.sizes.large};
  color: ${(props) => props.theme.colors.accent};
`;

export const StatsInfo = styled.Text`
  flex: 0.4;
  font-size: ${(props) => props.theme.font.sizes.large};
  color: ${(props) => props.theme.colors.primary};
  text-align: right;
`;

export const StatsInfoSuccess = styled.Text`
  flex: 0.4;
  font-size: ${(props) => props.theme.font.sizes.large};
  color: ${(props) => props.theme.colors.success};
  text-align: right;
`;

export const StatsInfoError = styled.Text`
  flex: 0.4;
  font-size: ${(props) => props.theme.font.sizes.large};
  color: ${(props) => props.theme.colors.error};
  text-align: right;
`;
