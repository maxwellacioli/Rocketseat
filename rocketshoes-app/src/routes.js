import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Page1 from './pages/Page1';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/page1" component={Page1} />
    </Switch>
  );
}
