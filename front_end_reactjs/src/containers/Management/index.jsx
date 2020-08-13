import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function ManagementComponent() {
   return (
      <Container fluid>
         <Row>
            <Col>
               <h2>Management page</h2>
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(ManagementComponent);
