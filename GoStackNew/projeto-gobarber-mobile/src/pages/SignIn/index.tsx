import React, { useRef } from 'react';
import { Image, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const handleSignIn = (data: object): void => console.log(data);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <Image source={logoImg} />

        <Title>Faça seu logon</Title>

        <Form ref={formRef} onSubmit={handleSignIn}>
          <Input
            name="email"
            icon="mail"
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />
          <Input
            ref={passwordInputRef}
            name="password"
            icon="lock"
            placeholder="Senha"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />

          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Entrar
          </Button>
        </Form>

        <ForgotPassword>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>

        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="#ff9000" />

          <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
        </CreateAccountButton>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
