import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "reactstrap";

import AreaChart from "./Component/AreaChart";
import DoughnutChart from "./Component/DoughnutChart";
function DashboardComponent() {
   return (
      <>
         <Row>
            <DoughnutChart />
            <DoughnutChart />
         </Row>
         <Row className="mt-2">
            <Col>
               <AreaChart />
            </Col>
         </Row>
      </>
   );
}

export default withRouter(DashboardComponent);
