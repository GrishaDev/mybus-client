import React from 'react';
import { Provider } from 'react-redux';
import store from './stateStuff/store';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import history from 'utils/history';
import MainPage from './visual/MainPage';
import Login from './visual/Login';
import ProtectedRoute from 'utils/privateRoute';

function App() {
  return (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/" component={MainPage} />
            </Switch>
        </Router>
    </Provider>
  );
}

export default App;
