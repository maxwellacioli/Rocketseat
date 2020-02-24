import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

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
    error: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repos: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(prevProp, prevState) {
    const { repos } = this.state;

    if (prevState.repos !== repos) {
      localStorage.setItem('repositories', JSON.stringify(repos));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: false });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repos } = this.state;

    this.setState({ loading: true });

    try {
      const duplicated = repos.find(el => el.name === newRepo);

      if (duplicated) {
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repos: [...repos, data],
        newRepo: '',
        loading: false,
        error: false,
      });
    } catch (error) {
      this.setState({ loading: false, error: true });
      // console.log(error);
    }
  };

  render() {
    const { newRepo, repos, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error ? 1 : 0}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton
            loading={loading ? 1 : 0}
            emptyInput={newRepo.length === 0 ? 1 : 0}
          >
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
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
