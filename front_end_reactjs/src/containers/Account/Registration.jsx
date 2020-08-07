import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, Button, CardHeader, CardBody, Form, FormGroup, Label, Input, CardFooter } from "reactstrap";

function RegistrationComponent(props) {
   const [user, setUser] = useState({
      username: "",
      password: "",
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
      console.log(user);
   };

   const Login = () => {
      console.log(props);
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
                           <Label for="re-password">Re-password</Label>
                           <Input
                              type="password"
                              name="re-password"
                              id="re-password"
                              placeholder="re-password..."
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
                                 <Input type="radio" name="gender" checked={user.gender === true}  onChange={() => setUser({...user, gender : true })} /> Male
                              </Label>
                           </FormGroup>
                           <FormGroup check>
                              <Label check>
                                 <Input type="radio" name="gender" checked={user.gender === false}  onChange={() => setUser({...user, gender : false })}  /> Female
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
                     <p className="text-danger font-weight-bold"> Username must more than 5 !!!</p>
                     <p className="text-danger font-weight-bold"> Password must more than 5 !!!</p>
                     <p className="text-danger font-weight-bold"> Username must is a email !!!</p>
                  </CardFooter>
               </Card>
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(RegistrationComponent);
