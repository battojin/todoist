import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import store, { history } from '../redux'
import Home from '../components/home'
import Category from '../components/category'

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/:category" component={() => <Category />} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
