import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Pagination } from './styles';

export default class Main extends Component {
  static propTypes = {
    error: PropTypes.bool
  }
  state = {
    newRepository: '',
    repositories: [],
    loading: false,
    error: false,
    activePage: 15,
  };

  checkDuplicateRepository(repository, repositories) {
    repositories.forEach(repos => {
      if(repos.name.toLowerCase() === repository) {
        throw new Error()
      }
    });
  }

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if(repositories) {
      this.setState({ repositories: JSON.parse(repositories) })
    }
  }

  // Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if(prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  hadleInputChange = e => {
    this.setState({ newRepository: e.target.value });
  };

  hadleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try{
      const { newRepository, repositories } = this.state;

      this.checkDuplicateRepository(newRepository, repositories)
      const response = await api.get(`/repos/${newRepository}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepository: '',
      });
    } catch(e) {
      this.setState({ error: true })
      setTimeout(() => this.setState({ error: false }), 3000)
      console.log('ERROR')
    }

    this.setState({ loading: false });

  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    const { newRepository, repositories, loading, error, activePage } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.hadleSubmit} error={error}>
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

              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
            </li>
          ))}
        </List>

        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={5}
          pageRangeDisplayed={15}
          onChange={this.handlePageChange}
        />
      </Container>
    );
  }
}
