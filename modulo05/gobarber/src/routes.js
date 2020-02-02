import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main/index';
import Repository from './pages/Repository/index';
import Teste from './pages/Teste/index';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository/:repository" exact component={Repository} />
        <Route path="/teste" exact component={Teste}/>
      </Switch>
    </BrowserRouter>
  );
}
