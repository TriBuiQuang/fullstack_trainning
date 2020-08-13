import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function DashboardComponent() {
   return (
      <Container fluid>
         <Row>
            <Col>
               <h2>Dashboard page</h2>
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(DashboardComponent);
