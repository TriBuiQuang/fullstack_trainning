import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import HeaderComponent from "../../components/Header";

import Home from "../Home";
import NotFound404 from "../NotFound";
import Login from "../Account/Login";
import Registration from "../Account/Registration";

//admin route
import AdminRouter from "./AdminRouter";

const Router = () => {
   const [sidebarIsOpen, setSidebarOpen] = useState(true);
   const [url, setUrl] = useState(false);

   const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

   useEffect(() => {
      // Update the document title using the browser API
      setUrl(window.location.href.includes("admin"));
   }, []);

   console.log(sidebarIsOpen);
   console.log("location", window.location.href.includes("admin"));

   return (
      <div className={`${url ? "App wrapper" : ""}`}>
         <HeaderComponent toggle={toggleSidebar} isOpen={sidebarIsOpen} url={url} />
         <Switch>
            {/* user */}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />

            {/* admin */}
            <AdminRouter sidebarIsOpen={sidebarIsOpen} toggleSidebar={toggleSidebar} />
            <Route path="*" exact={true} component={NotFound404} />
         </Switch>
      </div>
   );
};

export default Router;
