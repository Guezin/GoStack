import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { listItems } from '../Teste/index';

import Container from '../../components/Container';
import { Loading, Owner, IssuesList } from './styles'

export default class Repository extends Component {
  static Proptypes = {
    match: Proptypes.shape({
      params: Proptypes.shape({
        repository: Proptypes.string,
      }),
    }).isRequired,
  }
  state = {
    repository: {},
    issues: [],
    loading: true
  }

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5
        }
      }),
    ])

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    })
  }

  render() {
    const { repository, issues, loading } = this.state;

    var next = ['next 1', 'next 2', 'next 3', 'next 4', 'next 5']

    if(loading) {
      return <Loading>Carregando...</Loading>
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login}></img>
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login}/>

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          {console.log(listItems(issues[0].title, 1, 3))}
        </IssuesList>
      </Container>
    )
  }
}

