import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => (
   <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
         <span color="info" onClick={toggle} style={{ color: "#fff" }}>
            &times;
         </span>
         <h3>Bootstrap Sidebar</h3>
      </div>
      <div className="side-menu">
         <Nav vertical className="list-unstyled pb-3">
            <SubMenu title="Tri Bui Quang" icon="fas fa-user-circle" items={submenus[0]} />
            <NavItem>
               <NavLink tag={Link} to="/admin/dashboard">
                  <i className="mr-2 fas fa-chart-line" />
                  Dashboard
               </NavLink>
            </NavItem>
            <SubMenu title="Management" icon="fas fa-tasks" items={submenus[1]} />
            <NavItem>
               <NavLink tag={Link} to="/admin/chat">
                  <i className="mr-2 far fa-comment" />
                  Chat application
               </NavLink>
            </NavItem>

            <NavItem>
               <NavLink tag={Link} to="/">
                  <i className="mr-2 fas fa-sign-out-alt" />
                  Log Out
               </NavLink>
            </NavItem>
         </Nav>
      </div>
   </div>
);

const submenus = [
   [
      {
         title: "Profile",
         target: "/admin/",
      },
      {
         title: "Setting",
         target: "/admin/setting",
      },
   ],
   [
      {
         title: "Product",
         target: "/admin/management/product",
      },
   ],
];

export default SideBar;
