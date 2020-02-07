import React from 'react';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function Users({ navigation, route }) {
  console.tron.log(route);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Users</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
