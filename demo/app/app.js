import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import HomeRoute from './routes/HomeRoute';

const App = () => (
  <Router history={createBrowserHistory()}>
    <div>
      <Route exact path="/" component={HomeRoute} />
    </div>
  </Router>
);

export default App;
