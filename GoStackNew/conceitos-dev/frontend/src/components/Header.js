import React, { useState } from 'react';

export default function({ title }) {
  const [project, setProject] = useState(['Desenvolvimento de app', 'Front-end web']);
  
  function handleProject() {
    return setProject([...project, `Novo Projeto ${new Date().getTime()}`])
  }

  return (
    <header>
      <h1>{ title }</h1>
      <ul>{project.map(projects => (
        <li key={projects}>{ projects }</li>
      ))}
      </ul>

      <button type="button" onClick={handleProject}>Adicionar projeto</button>
    </header>
  );
}