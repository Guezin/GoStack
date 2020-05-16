import React, { useRef } from 'react';
import { Image, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <Image source={logoImg} />

        <Title>Crie sua conta</Title>
        <Form ref={formRef} onSubmit={(data: object) => console.log(data)}>
          <Input
            name="name"
            icon="user"
            placeholder="Nome"
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
          />
          <Input
            ref={emailInputRef}
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

        <BackToSignIn onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#FFF" />

          <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
