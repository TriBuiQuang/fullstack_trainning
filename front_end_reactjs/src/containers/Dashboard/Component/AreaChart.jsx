import React, { useState, useLayoutEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Line } from "react-chartjs-2";

const data = {
   labels: ["January", "February", "March", "April", "May", "June", "July"],
   datasets: [
      {
         label: "Blue",
         fill: false,
         lineTension: 0.3,
         backgroundColor: "#36A2EB",
         borderColor: "#36A2EB",
         borderWidth: 1,
         borderDash: [5, 3],
         pointBackgroundColor: "#36A2EB",
         pointHoverRadius: 3,
         pointHoverBorderWidth: 1,
         pointRadius: 2,
         pointHitRadius: 10,
         data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
         label: "Red",
         fill: false,
         lineTension: 0.3,
         backgroundColor: "#FF6384",
         borderColor: "#FF6384",
         borderWidth: 1,
         borderDash: [3, 3],
         pointBackgroundColor: "#FF6384",
         pointHoverRadius: 2,
         pointHoverBorderWidth: 1,
         pointRadius: 1,
         pointHitRadius: 10,
         data: [5, 7, 54, 32, 87, 45, 25],
      },
      {
         label: "Yellow",
         fill: false,
         lineTension: 0.3,
         backgroundColor: "#FFCE56",
         borderColor: "#FFCE56",
         borderWidth: 1,
         pointBackgroundColor: "#FFCE56",
         pointHoverRadius: 5,
         pointHoverBorderWidth: 1,
         pointRadius: 4,
         pointHitRadius: 10,
         data: [25, 54, 2, 48, 78, 54, 35],
      },
      {
         label: "Green",
         fill: false,
         lineTension: 0.3,
         backgroundColor: "#4BC0C0",
         borderColor: "#4BC0C0",
         borderWidth: 1,
         pointBackgroundColor: "#4BC0C0",
         pointHoverRadius: 6,
         pointHoverBorderWidth: 1,
         pointRadius: 5,
         pointHitRadius: 10,
         data: [52, 47, 45, 4, 58, 7, 45],
      },
   ],
};

const options = {
   legend: {
      position: "bottom",
   },
   scales: {
      xAxes: [
         {
            gridLines: {
               color: "rgb(204, 204, 204)",
               borderDash: [3, 3],
            },
            ticks: {
               fontColor: "rgb(204, 204, 204)",
            },
         },
      ],
      yAxes: [
         {
            gridLines: {
               color: "rgb(204, 204, 204)",
               borderDash: [3, 3],
            },
            ticks: {
               fontColor: "rgb(204, 204, 204)",
            },
         },
      ],
   },
};

const PointSizes = () => {
   const [size, setSize] = useState(1000);
   useLayoutEffect(() => {
      function updateSize() {
         setSize(window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
   }, []);

   return (
      <Card>
         <CardBody className="chart_line">
            <h4 className="bold-text">Dashboard</h4>

            <Line data={data} options={options} width={size} height={250} />
         </CardBody>
      </Card>
   );
};

export default PointSizes;