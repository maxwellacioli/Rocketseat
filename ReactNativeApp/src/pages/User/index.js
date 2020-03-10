import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  FooterLoading
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  }


  async componentDidMount() {
    this.loadMore();
  }

  renderFooter = () => {
    const { loading } = this.state;

    if (!loading) return null;

    return (
      <FooterLoading>
        <ActivityIndicator color="#7159c1" />
      </FooterLoading>
    );
  };

  refreshList = () => {
    this.setState({ refreshing: true, page: 1 });

    this.loadMore();
  }

  loadMore = async () => {
    const { stars, page } = this.state;
    const { route } = this.props;

    const user = route.params.user;

    this.setState({ loading: true });

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: page,
      }
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page: page + 1,
      refreshing: false,
      loading: false,
    });
  }

  // handleNavigate = (repository) => {
  //   console.tron.log(repository);
  // }

  render() {
    const { stars, loading, refreshing } = this.state;
    const { route } = this.props;
    const user = route.params.user;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>


        {loading ?
          <ActivityIndicator color="#7159c1" />
          :
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={this.loadMore} // Função que carrega mais itens

            onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
            ListFooterComponent={this.renderFooter}
          />
        }
      </Container>
    );
  }
}
