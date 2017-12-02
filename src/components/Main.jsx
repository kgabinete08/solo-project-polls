import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import App from './App';
import Create from './Create';

const Main = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/create">Add Poll</Link></li>
    </ul>

    <hr />

    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/create" component={Create} />
    </Switch>
  </div>
);

export default Main;
