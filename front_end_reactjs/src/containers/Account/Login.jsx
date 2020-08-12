import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, Button, CardHeader, CardBody, Form, FormGroup, Label, Input, CardFooter } from "reactstrap";

import validateInput from '../../constants/validate';

function LoginComponent(props) {
   const [user, setUser] = useState({
      username: "",
      password: ""
   });
   const [error, setError] = useState(""); 
   const [isError, setIsError] = useState(true); 
 

   const onChange = async (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      let errorList = validateInput(name, value);
      
		if(!errorList.isError){
			if(name === 'username'){
				errorList = validateInput('password', user.password);
			}else{
				errorList = validateInput('username', user.username);
			}
      }
      
      setIsError(errorList.isError);
		setError(errorList.errorMessage);
		setUser(prevState => ({ ...prevState,[name]: value }));
		
   }

   const Login = () => {
      if(!error){
         props.history.push("/admin/dashboard");
      }else {
         console.log("co error");
      }
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
                     <Button color="secondary" className="mt-3 col-md-5 mr-2" onClick={Login} disabled={isError ? true : false}>Login</Button>
                     <Button color="secondary" className="mt-3 col-md-5 float-md-right" onClick={Registration}>Registration</Button>
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

export default withRouter(LoginComponent);
