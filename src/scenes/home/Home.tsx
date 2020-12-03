import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {
  Container,
  CryptoTable,
  TitleText,
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

function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function Home() {
  const [crypto, setCrypto] = useState<any>([]);
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
      <TitleText>Cryptonite</TitleText>
      <CryptoTable>
        {crypto.map((line, index) => (
          <CryptoRow>
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
              <CryptoPrice>${line.priceUsd.substring(0, 10)}</CryptoPrice>
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
