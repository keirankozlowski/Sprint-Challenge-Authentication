import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import Signup from './Signup';
import Signin from './Signin';
import Jokes from './Jokes';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to='/signup'>
              <button>Register</button>
            </NavLink>

            <NavLink to='/signin'>
              <button>Log In</button>
            </NavLink>

            <NavLink to='/jokes'>
              <button>Show Jokes</button>
            </NavLink>
          </nav>

          <Route path='/signup' render={() => <Signup {...this.props} />} />
          <Route path='/signin' render={() => <Signin {...this.props} />} />
          <Route path='/jokes' render={() => <Jokes {...this.props} />} />
        </header>
      </div>
    );
  }
}

export default withRouter(App);
