import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Switch } from 'react-router-dom'
import history from './shared/_helpers/history'
import IndexRoute from '../src/routes/IndexRoute'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
          <Switch>
            <IndexRoute />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
