import React from 'react'
import Breakout from './games/breakout/index'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/breakout">breakout</Link>
          </li>
        </ul>
      </div>
      <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>
      <Route path="/about">
    <h1>About</h1>
      </Route>
      <Route exact path="/breakout">
        <Breakout />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
