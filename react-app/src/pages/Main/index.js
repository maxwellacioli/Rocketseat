import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  /*
    Forma correta de inicializar os estados de uma classe
  */
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     newRepo: '',
  //   };
  // }

  state = {
    newRepo: '',
    repos: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repos } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({ repos: [...repos, data], newRepo: '', loading: false });
  };

  render() {
    const { newRepo, repos, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <a href="">Detalhes</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
