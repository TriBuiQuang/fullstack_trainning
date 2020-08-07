import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function HomeComponent() {
   return (
      <Container fluid>
         <Row>
            <Col>
               <h2>Home</h2>
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(HomeComponent);
