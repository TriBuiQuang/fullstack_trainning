import React, { useState } from "react";
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from "reactstrap";

function HeaderComponent() {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);
   return (
      <div>
         <Navbar color="primary" dark expand="md">
            <NavbarBrand href="/">Project demo</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret>
                        Account
                     </DropdownToggle>

                     <DropdownMenu right>
                        <DropdownItem href="/login" >Login</DropdownItem>
                        <DropdownItem href="/registration">Registration</DropdownItem>
                     </DropdownMenu>
                     
                  </UncontrolledDropdown>
               </Nav>
            </Collapse>
         </Navbar>
      </div>
   );
}

export default HeaderComponent;
