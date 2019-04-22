import React, {Component, Fragment} from 'react'
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter, withRouter } from 'react-router-dom';

import GameMenu from './GameMenu'
import Board from './Board'


const App = (props) => (
  <div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/menu" />} />
        <Route exact path="/menu" component={GameMenu} />
        <Route path="/board" component={Board} />
      </Switch>
    </div>
)

export default withRouter(App) //withRouter is a Higher Order Component (HOC) that returns a COPY of App with React router props injected
