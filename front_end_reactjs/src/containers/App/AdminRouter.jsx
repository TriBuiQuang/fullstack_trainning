import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Topbar from "../../components/Header/Component/TopBar";

// Admin component
import Dashboard from "../Dashboard";
import Profile from "../Account/Profile";
import Product from "../Product";
import Chat from "../Chat";

const Router = ({ sidebarIsOpen, toggleSidebar }) => {
   return (
      <Container fluid className={`content ${sidebarIsOpen ? "is-open" : ""}`}>
         <Topbar toggleSidebar={toggleSidebar} />
         <Switch>
            <Route exact path="/admin/" component={Profile} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/management/product" component={Product} />
            <Route path="/admin/chat" component={Chat} />
         </Switch>
      </Container>
   );
};

export default Router;
