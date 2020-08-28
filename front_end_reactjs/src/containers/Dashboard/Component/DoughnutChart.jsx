import React, { useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Doughnut } from "react-chartjs-2";

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
   labels: ["Red", "Blue", "Yellow"],
   datasets: [
      {
         data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
         borderColor: "rgba(255,255,255,0.54)",
      },
   ],
});

const DynamiclyRefreshedDoughnut = () => {
   const [data] = useState(getState());

   return (
      <Col md={12} lg={12} xl={6}>
         <Card>
            <CardBody>
               <div className="card__title">
                  <h5 className="bold-text">Doughnut chart</h5>
               </div>
               <Doughnut data={data} />
            </CardBody>
         </Card>
      </Col>
   );
};

export default DynamiclyRefreshedDoughnut;
