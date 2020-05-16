import React from 'react';
import { Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <Image source={logoImg} />

        <Title>Faça seu logon</Title>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" icon="lock" placeholder="Senha" />

        <Button
          onPress={() => {
            console.log('deu');
          }}
        >
          Entrar
        </Button>

        <ForgotPassword>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>

        <CreateAccountButton>
          <Icon name="log-in" size={20} color="#ff9000" />

          <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
        </CreateAccountButton>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
