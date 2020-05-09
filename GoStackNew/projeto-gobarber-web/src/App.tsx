import React from 'react';

import GlobalStyles from './styles/global';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

import AuthContext from './context/authContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Leandro' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyles />
  </>
);

export default App;
