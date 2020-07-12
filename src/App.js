import React from 'react';
import { Provider } from 'react-redux';
import store from './stateStuff/store';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { SnackbarProvider } from 'notistack';
import history from 'utils/history';
import MainPage from 'pages/MainPage';
import Login from 'pages/Login';
import ProtectedRoute from 'utils/privateRoute';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={MainPage} />
                {/* <ProtectedRoute exact path="/" component={MainPage} /> */}
            </Switch>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
