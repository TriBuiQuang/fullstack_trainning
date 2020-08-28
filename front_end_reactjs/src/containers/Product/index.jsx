import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import Product from "./Component/Product";

function ProductMananementComponent() {
   return (
      <Container fluid>
         <Row>
            <Col>
               <Product />
            </Col>
         </Row>
      </Container>
   );
}

export default withRouter(ProductMananementComponent);
