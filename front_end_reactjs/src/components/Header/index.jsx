import React from "react";
import AdminMenu from "./Component/AdminMenu";
import UserMenu from "./Component/UserMenu";

function HeaderComponent(props) {
   if (props.url) {
      return <AdminMenu {...props} />;
   } else {
      return <UserMenu />;
   }
}

export default HeaderComponent;
