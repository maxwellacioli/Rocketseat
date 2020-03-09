import 'react-native-gesture-handler';

import React from 'react';

import './config/ReactotronConfig';

// import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';

export default function App() {
  return (
    // <NavigationContainer>
    <Routes />
    // </NavigationContainer>
  );
}
