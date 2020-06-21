import React, { useRef, useCallback } from 'react';
import { ScrollView, TextInput, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleGoToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digíte um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso',
          'Você já pode fazer o logon na aplicação.'
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente.'
        );
      }
    },
    [navigation]
  );

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <BackButton onPress={handleGoToBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <UserAvatarButton onPress={() => { }}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </UserAvatarButton>

        <View style={{ marginTop: 30 }}>
          <Title>Meu perfil</Title>
        </View>

        <Form ref={formRef} onSubmit={handleSignUp}>
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
              oldPasswordInputRef.current?.focus();
            }}
          />

          <Input
            ref={oldPasswordInputRef}
            containerStyle={{ marginTop: 16 }}
            name="old_password"
            icon="lock"
            placeholder="Senha atual"
            secureTextEntry
            textContentType="newPassword"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <Input
            ref={passwordInputRef}
            name="password"
            icon="lock"
            placeholder="Nova senha"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => {
              confirmPasswordInputRef.current?.focus();
            }}
          />

          <Input
            ref={confirmPasswordInputRef}
            name="password_confirmation"
            icon="lock"
            placeholder="Confirme sua senha"
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
            Cadastrar
          </Button>
        </Form>
      </Container>
    </ScrollView>
  );
};

export default Profile;
