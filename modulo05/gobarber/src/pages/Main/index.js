import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepository: '',
      repositories: [{name: 'guezin/gostack'}],
      loading: false,
    };
  }

  hadleInputChange = e => {
    this.setState({ newRepository: e.target.value });
  };

  hadleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepository, repositories } = this.state;
    const response = await api.get(`/repos/${newRepository}`);
    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepository: '',
    });

    this.setState({ loading: false });
  };

  render() {
    const { newRepository, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.hadleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepository}
            onChange={this.hadleInputChange}
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
          {repositories.map(repository => (
            <li key={repository.name}>
              {repository.name}

              <a href="">Detalhes</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
