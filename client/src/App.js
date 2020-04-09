import React from "react";
import "typeface-montserrat";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { Layout } from "./components/UI/Layout";
import { withAuthentication } from "./context/withAuthentication";
import { GlobalStyles } from "./components/styled/globalStyles";
import { NewRestaurant } from "./components/pages/NewRestaurant";

export const App = withAuthentication(() => (
  <Router>
    <GlobalStyles>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/restaurant/new" component={NewRestaurant} />
        </Switch>
      </Layout>
    </GlobalStyles>
  </Router>
));

export default App;
