import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {
  Container,
  CryptoContainer,
  Title,
  TitleImage,
  TitleText,
  StatsContainer,
  StatsRow,
  StatsTitle,
  StatsInfo,
  StatsInfoSuccess,
  StatsInfoError,
} from './CryptoPage.s';

function round(value: number, precision: number) {
  const multiplier = Math.pow(10, precision || 0); // eslint-disable-line no-restricted-properties
  return Math.round(value * multiplier) / multiplier;
}

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

interface CryptoData {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  changePercent24Hr: number;
  priceUsd: number;
  supply: number;
  maxSupply: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
}

type RootStackParamList = {
  CryptoPage: {id: string};
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CryptoPage'>;

interface Props {
  route: ProfileScreenRouteProp;
}

function CryptoPage({route}: Props) {
  const {id} = route.params;
  const [crypto, setCrypto] = useState<CryptoData>();
  useEffect(() => {
    const getCryptoAsync = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
        const json = await response.json();
        setCrypto(json.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCryptoAsync();
    console.log(crypto);
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const getCryptoAsync = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
        const json = await response.json();
        setCrypto(json.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCryptoAsync();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {crypto && (
        <CryptoContainer>
          <Title>
            <TitleImage
              source={{
                uri: `https://static.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`,
              }}
            />
            <TitleText>{crypto.name}</TitleText>
          </Title>
          <StatsContainer>
            <StatsRow>
              <StatsTitle>Popularité :</StatsTitle>
              <StatsInfo>#{crypto.rank}</StatsInfo>
            </StatsRow>
            <StatsRow>
              <StatsTitle>Symbole boursier :</StatsTitle>
              <StatsInfo>{crypto.symbol}</StatsInfo>
            </StatsRow>
            <StatsRow>
              <StatsTitle>Prix :</StatsTitle>
              <StatsInfo>{round(crypto.priceUsd, 5)}</StatsInfo>
            </StatsRow>
            <StatsRow>
              <StatsTitle>Pourcentage évolution/24h :</StatsTitle>
              {crypto.changePercent24Hr > 0 && (
                <StatsInfoSuccess>
                  {round(crypto.changePercent24Hr, 2)}%
                </StatsInfoSuccess>
              )}
              {crypto.changePercent24Hr < 0 && (
                <StatsInfoError>
                  {round(crypto.changePercent24Hr, 2)}%
                </StatsInfoError>
              )}
            </StatsRow>
            <StatsRow>
              <StatsTitle>Approvisionnement :</StatsTitle>
              <StatsInfo>{Math.round(crypto.supply)}</StatsInfo>
            </StatsRow>
            <StatsRow>
              <StatsTitle>Approvisionnement max :</StatsTitle>
              <StatsInfo>{Math.round(crypto.maxSupply)}</StatsInfo>
            </StatsRow>
            <StatsRow>
              <StatsTitle>Capitalisation boursière :</StatsTitle>
              <StatsInfo>${Math.round(crypto.marketCapUsd)}</StatsInfo>
            </StatsRow>
            <StatsRow>
              <StatsTitle>Volume/24h :</StatsTitle>
              <StatsInfo>${Math.round(crypto.volumeUsd24Hr)}</StatsInfo>
            </StatsRow>
          </StatsContainer>
        </CryptoContainer>
      )}
    </Container>
  );
}

export default CryptoPage;
