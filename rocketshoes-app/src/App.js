import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global';
import Header from './compoonents/Header';

import Routes from './routes';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
