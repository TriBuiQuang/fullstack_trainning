import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

function ChatComponent() {
   return (
      <Container fluid>
         <Row>
            <Col>
               <h2>Chat </h2>
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(ChatComponent);
