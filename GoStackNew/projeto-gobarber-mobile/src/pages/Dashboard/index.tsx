import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
} from './styles';

import { Provider } from '../types';

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    // navigation.navigate('Profile');
    signOut();
  }, [signOut]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateAppointment', { providerId });
    },
    [navigation]
  );

  return (
    <Container style={{}}>
      <Header>
        <HeaderTitle>
          Bem-vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{
              uri: user.avatar_url,
            }}
          />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar
              source={{
                uri: provider.avatar_url
                  ? provider.avatar_url
                  : 'data:image/png;base64,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',
              }}
            />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#FF9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#FF9000" />
                <ProviderMetaText>08h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
