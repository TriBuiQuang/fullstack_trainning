import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, Button, CardHeader, CardBody, Form, FormGroup, Label, Input, CardFooter } from "reactstrap";

function LoginComponent(props) {
   const [user, setUser] = useState({
      username: "",
      password: ""
   });
   const [error, setError] = useState(""); 
   
   const onChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setUser(prevState => ({ ...prevState,[name]: value }));
   }

   const Login = () => {
      console.log(user)
   }

   const Registration = () => {
      props.history.push("/registration");
   }
   
   return (
      <Container fluid>
         <Row className="justify-content-md-center mt-5">
            <Col md={6}>
               <Card body inverse color="primary">
                  <CardHeader>Login</CardHeader>
                  <CardBody>
                     <Form>
                        <FormGroup>
                           <Label for="username">Email</Label>
                           <Input type="email" name="username" id="username" placeholder="Username@gmail.com" onChange={(e)=> onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                           <Label for="password">Password</Label>
                           <Input type="password" name="password" id="password" placeholder="Password..." className="is-invalid" onChange={(e)=> onChange(e)} />
                        </FormGroup>
                     </Form>
                     <Button color="secondary" className="mt-3 col-md-5 mr-2" onClick={Login}>Login</Button>
                     <Button color="secondary" className="mt-3 col-md-5 float-md-right" onClick={Registration}>Registration</Button>
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

export default withRouter(LoginComponent);
