import React from "react";
import { Body } from "./components/containers/page-containers";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { MainPage } from "./components/pages/main-page";
import { LoginPage } from "./components/pages/login";
import "./app.css";
import { GuardPage } from "./components/pages/guard";
import { LogoutPage } from "./components/pages/logout";
function App() {
  return (
    <Body>
      <BrowserRouter>
        <Switch>
          <Route path="/logout" component={LogoutPage} />
          <Route path="/guard" component={GuardPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </Body>
  );
}

export default App;
