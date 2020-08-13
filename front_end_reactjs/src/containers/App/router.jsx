import React from "react";
import { Route, Switch } from "react-router-dom";

import HeaderComponent from "../../components/Header";

import Home from "../Home";
import NotFound404 from "../NotFound";
import Login from '../Account/Login';
import Registration from '../Account/Registration';

// Admin component
import Dashboard from '../Dashboard';
import Profile from '../Account/Profile';


const Router = () => (
   <>
     <HeaderComponent />
      <Switch>
         {/* user */}
         <Route exact path="/" component={Home} />
         <Route path="/login" component={Login} />
         <Route path="/registration" component={Registration} />

         {/* admin */}
         <Route exact path="/admin/" component={Profile} />
         <Route path="/admin/dashboard" component={Dashboard} />
         <Route path="/admin/management" component={Dashboard} />

         <Route path='*' exact={true} component={NotFound404} />
      </Switch>
   </>
);

export default Router;
