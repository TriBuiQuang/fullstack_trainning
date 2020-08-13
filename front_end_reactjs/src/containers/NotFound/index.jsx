import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function NotFoundComponent() {
   return (
      <Container fluid>
         <Row>
            <Col>
               <h2>404 page</h2>
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(NotFoundComponent);
