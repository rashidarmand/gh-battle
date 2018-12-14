import React from 'react';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';
import Popular from './Popular';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/battle' component={ Battle } />
            <Route path='/battle/results' component={ Results } />
            <Route path='/popular' component={ Popular } />
            <Route render={ () => <p><h2>Not Found</h2></p> } />
          </Switch>
        </div>
      </Router>
    )
  }
}