import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {connect} from 'react-redux';
import {DrawerActions, useNavigation} from '@react-navigation/native';

import Firebase from '@/config/firebase';
import useTheme from '@/hooks/useTheme';
import Home from '@/scenes/home';
import CryptoPage from '@/scenes/cryptoPage';
import {authOperations} from '@/redux/auth';
import {ThunkDispatchType} from '@/redux/redux.types';

import Update from '@/scenes/update';
import routes from './routes';
import {
  HeaderLeftContainer,
  HeaderRightContainer,
  IconContainer,
} from './HomeScreen.s';

const Stack = createStackNavigator();

type ConnectedProps = ReturnType<typeof mapDispatchToProps>;

function HomeScreen({setIsAuthenticated}: ConnectedProps) {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleSignOut = async () => {
    await Firebase.auth().signOut();
    setIsAuthenticated(false);
  };

  return (
    <Stack.Navigator
      initialRouteName={routes.homeScreen}
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: theme.colors.primary},
        headerLeft: () => (
          <HeaderLeftContainer>
            <IconContainer
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <FontAwesomeIcon
                style={{marginLeft: 10}}
                size={24}
                color="white"
                icon="bars"
              />
            </IconContainer>
          </HeaderLeftContainer>
        ),
      }}>
      <Stack.Screen
        name={routes.homeScreen}
        component={Home}
        options={{
          title: 'Home',
          headerRight: () => (
            <HeaderRightContainer>
              <IconContainer onPress={handleSignOut}>
                <FontAwesomeIcon
                  style={{marginRight: 10}}
                  size={24}
                  color="white"
                  icon="sign-out-alt"
                />
              </IconContainer>
            </HeaderRightContainer>
          ),
        }}
      />
      <Stack.Screen
        name={routes.update}
        component={Update}
        options={{
          title: 'Update',
          headerRight: () => (
            <HeaderRightContainer>
              <IconContainer onPress={handleSignOut}>
                <FontAwesomeIcon
                  style={{marginRight: 10}}
                  size={24}
                  color="white"
                  icon="sign-out-alt"
                />
              </IconContainer>
            </HeaderRightContainer>
          ),
        }}
      />
      <Stack.Screen
        name={routes.cryptoPage}
        component={CryptoPage}
        options={{
          title: 'CryptoPage',
          headerRight: () => (
            <HeaderRightContainer>
              <IconContainer onPress={handleSignOut}>
                <FontAwesomeIcon
                  style={{marginRight: 10}}
                  size={24}
                  color="white"
                  icon="sign-out-alt"
                />
              </IconContainer>
            </HeaderRightContainer>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => {
  return {
    setIsAuthenticated: (isAuth: boolean) =>
      dispatch(authOperations.setIsAuthenticated(isAuth)),
  };
};

export default connect(null, mapDispatchToProps)(HomeScreen);
