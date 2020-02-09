import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import GlobalStyles from './styles/global'

ReactDOM.render(
    <React.Fragment>
        <App />
        <GlobalStyles />
    </React.Fragment>, document.getElementById('root'));
