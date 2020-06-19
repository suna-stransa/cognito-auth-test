import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import Logout from './Logout';
import * as serviceWorker from './serviceWorker';
import AuthContextProvider from './AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login/:redirect" component={App} />
          <Route path="/logout/:redirect" component={Logout} />
          <Route path="/" component={() => window.location.href = "http://localhost:3001"} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
