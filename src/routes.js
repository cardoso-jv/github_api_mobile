import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

function Routes() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#7159c1' },
          headerTintColor: '#FFF',
        }}>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </>
  );
}

export default Routes;
