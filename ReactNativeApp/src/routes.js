import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerStyle: {backgroundColor: '#7159c1'},
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{title: 'Usuários'}}
          />
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
