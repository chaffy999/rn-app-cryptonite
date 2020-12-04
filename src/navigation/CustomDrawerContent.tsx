import React from 'react';
import {Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';

import routes from '@/navigation/routes';

import {
  Container,
  Header,
  Footer,
  Content,
  TextHeader,
} from './CustomDrawerContent.s';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Container>
        <Header>
          <TextHeader>Menu</TextHeader>
        </Header>
        <Content>
          <DrawerItem
            label="Home"
            onPress={() => props.navigation.navigate(routes.homeScreen)}
          />
          <DrawerItem
            label="Profil"
            onPress={() => props.navigation.navigate(routes.update)}
          />
        </Content>
        <Footer>
          <Text>Copyright © Cryptonite</Text>
        </Footer>
      </Container>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
