import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import bandeauSrc from '@/assets/logo/bandeau.png';
import routes from '@/navigation/routes';
import {
  Container,
  CryptoTable,
  TitleImage,
  CryptoRow,
  CryptoLogo,
  Logo,
  CryptoName,
  CryptoPrice,
  CryptoInfo,
  CryptoSymbol,
  CryptoPercentPositive,
  CryptoPercentNegative,
} from './Home.s';

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
}

function Home() {
  const navigation = useNavigation();
  const [crypto, setCrypto] = useState<CryptoData[]>([]);
  useEffect(() => {
    const getCryptoAsync = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        const json = await response.json();
        setCrypto(json.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCryptoAsync();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const getCryptoAsync = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets');
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
      <TitleImage source={bandeauSrc} />
      <CryptoTable>
        {crypto.map((line) => (
          <CryptoRow
            onPress={() =>
              navigation.navigate(routes.cryptoPage, {
                id: line.id,
              })
            }>
            <CryptoLogo>
              <Logo
                source={{
                  uri: `https://static.coincap.io/assets/icons/${line.symbol.toLowerCase()}@2x.png`,
                }}
              />
            </CryptoLogo>
            <CryptoInfo>
              <CryptoName>{line.name}</CryptoName>
              <CryptoSymbol>{line.symbol}</CryptoSymbol>
            </CryptoInfo>
            <CryptoInfo>
              <CryptoPrice>${round(line.priceUsd, 5)}</CryptoPrice>
              {line.changePercent24Hr > 0 && (
                <CryptoPercentPositive>
                  {round(line.changePercent24Hr, 2)}%
                </CryptoPercentPositive>
              )}
              {line.changePercent24Hr < 0 && (
                <CryptoPercentNegative>
                  {round(line.changePercent24Hr, 2)}%
                </CryptoPercentNegative>
              )}
            </CryptoInfo>
          </CryptoRow>
        ))}
      </CryptoTable>
    </Container>
  );
}

export default Home;
