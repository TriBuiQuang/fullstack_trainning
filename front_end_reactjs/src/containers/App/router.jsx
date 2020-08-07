import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HeaderComponent from "../../components/Header";

import Home from "../Home";
import NotFound404 from "../NotFound";
import Login from '../Account/Login';
import Registration from '../Account/Registration'

const wrappedRoutes = () => (
   <>
      <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/login" component={Login} />
         <Route path="/registration" component={Registration} />
      </Switch>
   </>
);

const Router = () => (
   <>
      <HeaderComponent />
      <Switch>
         <Route path="/404" component={NotFound404} />
         <Route path="/" component={wrappedRoutes} />
         {/* <Redirect from="*" to="/404" /> */}
      </Switch>
   </>
);

export default Router;
