import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Input, Form, SubmitButton } from './styles';

export default function Main({ navigation }) {
  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
        />
        <SubmitButton>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
