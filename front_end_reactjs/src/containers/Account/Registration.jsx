import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Card, Button, CardHeader, CardBody, Form, FormGroup, Label, Input, CardFooter } from "reactstrap";

import validateInput from "../../constants/validate";

function RegistrationComponent(props) {
   const [user, setUser] = useState({
      username: "",
      password: "",
      rePassword: "",
      firstName: "",
      lastName: "",
      gender: true,
      phone: "",
      country: "",
      city: "",
   });
   const [error, setError] = useState("");

   const onChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setUser((prevState) => ({ ...prevState, [name]: value }));
   };

   const Registration = () => {
      let errorList = validateInput("username", user.username);
      if (!errorList.isError) {
         errorList = validateInput("password", user.password);
         if (!errorList.isError) {
            errorList = validateInput("rePassword", user.rePassword);
            if (!errorList.isError) {
               errorList = validateInput("firstName", user.firstName);
               if (!errorList.isError) errorList = validateInput("lastName", user.lastName);
            }
         }
      }

      setError(errorList.errorMessage);
      if (!errorList.isError) {
         props.history.push("/login");
      } else {
         console.log("co error");
      }
   };

   const Login = () => {
      props.history.push("/login");
   };

   return (
      <Container fluid>
         <Row className="justify-content-md-center mt-5">
            <Col md={6}>
               <Card body inverse color="primary">
                  <CardHeader>Registration</CardHeader>
                  <CardBody>
                     <Form>
                        <FormGroup>
                           <Label for="username">Email</Label>
                           <Input type="email" name="username" id="username" placeholder="Username@gmail.com" onChange={(e) => onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                           <Label for="password">Password</Label>
                           <Input
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Password..."
                              className="is-invalid"
                              onChange={(e) => onChange(e)}
                           />
                        </FormGroup>
                        <FormGroup>
                           <Label for="rePassword">Re-password</Label>
                           <Input
                              type="password"
                              name="rePassword"
                              id="rePassword"
                              placeholder="Re-password..."
                              className="is-invalid"
                              onChange={(e) => onChange(e)}
                           />
                        </FormGroup>
                        <FormGroup>
                           <Label for="firstName">First Name</Label>
                           <Input type="email" name="firstName" id="firstName" placeholder="firstName" onChange={(e) => onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                           <Label for="lastName">Last Name</Label>
                           <Input type="email" name="lastName" id="lastName" placeholder="lastName" onChange={(e) => onChange(e)} />
                        </FormGroup>
                        <FormGroup tag="fieldset">
                           <legend>Gender</legend>
                           <FormGroup check>
                              <Label check>
                                 <Input
                                    type="radio"
                                    name="gender"
                                    checked={user.gender === true}
                                    onChange={() => setUser({ ...user, gender: true })}
                                 />{" "}
                                 Male
                              </Label>
                           </FormGroup>
                           <FormGroup check>
                              <Label check>
                                 <Input
                                    type="radio"
                                    name="gender"
                                    checked={user.gender === false}
                                    onChange={() => setUser({ ...user, gender: false })}
                                 />{" "}
                                 Female
                              </Label>
                           </FormGroup>
                        </FormGroup>
                        <FormGroup>
                           <Label for="phone">Phone</Label>
                           <Input type="email" name="phone" id="phone" placeholder="phone" onChange={(e) => onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                           <Label for="address">Address</Label>
                           <Input type="email" name="address" id="address" placeholder="address" onChange={(e) => onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                           <Label for="city">City</Label>
                           <Input type="email" name="city" id="city" placeholder="city" onChange={(e) => onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                           <Label for="country">Country</Label>
                           <Input type="email" name="country" id="country" placeholder="country" onChange={(e) => onChange(e)} />
                        </FormGroup>
                     </Form>
                     <Button color="secondary" className="mt-3 col-md-5 mr-2" onClick={Registration}>
                        Registration
                     </Button>
                     <Button color="secondary" className="mt-3 col-md-5 float-md-right" onClick={Login}>
                        Login
                     </Button>
                  </CardBody>
                  <CardFooter>
                     {error ?  <p className="text-danger font-weight-bold"> {error} </p> : ""}
                  </CardFooter>
               </Card>
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(RegistrationComponent);
