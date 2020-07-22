import React from 'react';
import { Provider } from 'react-redux';
import store from './stateStuff/store';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { SnackbarProvider } from 'notistack';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import history from 'utils/history';
import MainPage from 'pages/MainPage';
import Login from 'pages/Login';
import ProtectedRoute from 'utils/privateRoute';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <Router history={history}>
              <Switch>
                  <Route exact path="/login" component={Login} />
                  <ProtectedRoute exact path="/" component={MainPage} />
              </Switch>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
