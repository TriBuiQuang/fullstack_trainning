import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function ProfileComponent() {
   return (
      <Container fluid>
         <Row>
            <Col>
               <h2>Profile page</h2>
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(ProfileComponent);
