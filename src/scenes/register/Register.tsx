import React, {useState, useRef} from 'react';
import {ToastAndroid, Keyboard} from 'react-native';
import PasswordInput from '@/common/components/PasswordInput';
import logoSrc from '@/assets/logo/it-akademy.png';
import Firebase from '@/config/firebase';

import Toast from 'react-native-root-toast';

import {
  Container,
  RegisterButton,
  RegisterButtonText,
  InputBox,
  InputPasswordContainer,
  RegisterButtonContainer,
  InputsContainer,
  LogoContainer,
  Logo,
} from './Register.s';

function Register() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const pwdRef = useRef<any>(null);
  // firebase
  const handleRegister = async () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show(
          'Votre compte à été crée et vous êtes connecté',
          ToastAndroid.LONG,
        );
      })
      .catch((error: any) => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show(
            'Cette adresse e-mail est déjà utilisé',
            ToastAndroid.LONG,
          );
        }

        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show(
            'Cette adresse e-mail est invalide',
            ToastAndroid.LONG,
          );
        }

        console.error(error);
      });
  };

  return (
    <Container>
      <LogoContainer>
        <Logo source={logoSrc} />
      </LogoContainer>
      <InputsContainer>
        <InputBox
          placeholder="Email"
          value={email}
          onChangeText={setUsername}
          onSubmitEditing={() => {
            if (pwdRef.current != null) {
              pwdRef.current.focus();
            }
          }}
        />
        <InputPasswordContainer>
          <PasswordInput
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e)}
            pwdRef={pwdRef}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </InputPasswordContainer>
      </InputsContainer>

      <RegisterButtonContainer>
        <RegisterButton onPress={handleRegister}>
          <RegisterButtonText>Je m&apos;inscris</RegisterButtonText>
        </RegisterButton>
      </RegisterButtonContainer>
    </Container>
  );
}

export default Register;
