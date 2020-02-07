import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Bio,
  Name,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      page: 1,
      loading: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    const {
      navigation,
      route: {
        params: { user },
      },
    } = this.props;
    navigation.setOptions({ title: user.name });

    this.setState({ loading: true });

    const response = await api.get(`/users/${user.login}/starred`);
    this.setState({ stars: response.data, loading: false });
  }

  async loadMore(user) {
    const { stars, page } = this.state;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: page + 1,
      },
    });

    this.setState({ stars: stars.concat(response.data), page: page + 1 });
  }

  async refreshList(user) {
    this.setState({ refreshing: true });
    const response = await api.get(`/users/${user.login}/starred`);
    this.setState({
      stars: response.data,
      refreshing: false,
      page: 1,
    });
  }

  render() {
    const { route } = this.props;
    const { stars, loading, refreshing } = this.state;

    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onRefresh={() => this.refreshList(user)}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={() => this.loadMore(user)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape(),
    }),
  }).isRequired,
};
