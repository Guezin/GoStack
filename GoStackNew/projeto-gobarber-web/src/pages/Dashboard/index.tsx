import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const history = useHistory();

  const handleSignOut = useCallback(() => {
    signOut();

    history.push('/');
  }, [signOut, history]);

  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={handleSignOut}>
        Logount
      </button>
    </>
  );
};
export default Dashboard;
