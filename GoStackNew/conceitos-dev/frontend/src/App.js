import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css'
//import backgroundImage from './assets/background.jpg'

import Header from './components/Header';

export default function App() {
  const [projects, setProject] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setProject(response.data);
    })
  }, []);

  async function handleProject() {
    const response = await api.post('/repositories', {
      title: `Novo Projeto ${new Date().getTime()}`,
      url: 'www.novo-projeto.com',
      techs: ['ReactJS']
    });

    const repositories = response.data;

    return setProject([...projects, repositories]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>{projects.map(project => (
        <li key={project.id}>
          <strong>{project.title}</strong>
          <p>URL: {project.url}</p>
          <p>Techs: {project.techs}</p>
        </li>
      ))}
      </ul>

      <button type="button" onClick={handleProject}>Adicionar projeto</button>
      
    </>
  );
}