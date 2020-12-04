import React, {useState, useRef} from 'react';
import {ToastAndroid, Keyboard} from 'react-native';

import Firebase from '@/config/firebase';

import profil from '@/assets/logo/profil.png';
import PasswordInput from '@/common/components/PasswordInput';
import Toast from 'react-native-root-toast';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  CustomText,
  Profil,
  UserText,
  InputsContainer,
  InputPasswordContainer,
  RegisterButtonContainer,
  RegisterButton,
  RegisterButtonText,
} from './Update.s';

function Update() {
  const [newPassword, setPassword] = useState('');

  const pwdRef = useRef<any>(null);
  // firebase
  const user = Firebase.auth().currentUser;

  const handleRegister = async () => {
    if (user) {
      user
        .updatePassword(newPassword)
        .then(() => {
          ToastAndroid.show(
            'Votre mot de passe à été modifié',
            ToastAndroid.LONG,
          );
        })
        .catch((error: any) => {
          Toast.show(error.message, {
            duration: 8000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        });
    }
  };

  return (
    <Container>
      <CustomText>Modifier votre profil</CustomText>
      <Profil source={profil} />
      <UserText>{user ? user.email : "pas d'utilisateur"}</UserText>
      <InputsContainer>
        <InputPasswordContainer>
          <PasswordInput
            label="Mot de passe"
            value={newPassword}
            onChange={(e) => setPassword(e)}
            pwdRef={pwdRef}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </InputPasswordContainer>
      </InputsContainer>
      <RegisterButtonContainer>
        <RegisterButton onPress={handleRegister}>
          <RegisterButtonText>modifier</RegisterButtonText>
        </RegisterButton>
      </RegisterButtonContainer>
    </Container>
  );
}

export default Update;
