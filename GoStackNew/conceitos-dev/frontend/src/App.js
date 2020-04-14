import React from 'react';

import './App.css'
import backgroundImage from './assets/background.jpg'

import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header title="Projects" />

      <img src={backgroundImage} alt=""/>
    </>
  );
}