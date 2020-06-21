import React, { useRef, useCallback } from 'react';
import { ScrollView, TextInput, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
// import ImageEditor from '@react-native-community/image-editor';

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

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { user, updateUser } = useAuth();

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar camêra',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('/users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data);
        });
      }
    );
  }, [updateUser, user.id]);

  const handleGoToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digíte um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: value => !!value.lenght,
            then: Yup.string()
              .min(6, 'Minímo 6 digítos')
              .required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('password', {
              is: value => !!value.lenght,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };

        const response = await api.put('/profile', formData);

        Alert.alert('Perfil atualizado com sucesso!');

        updateUser(response.data);

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.'
        );
      }
    },
    [navigation, updateUser]
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

        <UserAvatarButton onPress={handleUpdateAvatar}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </UserAvatarButton>

        <View style={{ marginTop: 30 }}>
          <Title>Meu perfil</Title>
        </View>

        <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
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
            Atualizar
          </Button>
        </Form>
      </Container>
    </ScrollView>
  );
};

export default Profile;
