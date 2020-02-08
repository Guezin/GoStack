import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import Routes from './routes';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import store from './store';

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <GlobalStyles />
                <Routes />
                <ToastContainer autoClose={3000}/>
            </BrowserRouter>
        </Provider>
    );
}
