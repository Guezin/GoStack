import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/auth';

import AppRoute from './app.routes';
import AuthRoute from './auth.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return user ? <AppRoute /> : <AuthRoute />;
};

export default Routes;
