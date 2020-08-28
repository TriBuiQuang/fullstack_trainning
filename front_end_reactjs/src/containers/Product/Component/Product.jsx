import React, { useState } from "react";
import { Table, Button } from "reactstrap";

const ProductComponent = (props) => {
   const [data, setData] = useState([]);
   const [limit] = useState(5);
   // const [offset, setOffset] = useState(0);
   const [total, setTotal] = useState(0);
   const Detail = () => {};

   return (
      <Table striped>
         <thead>
            <tr>
               <th>#</th>
               <th>Code</th>
               <th>Amount</th>
               <th>Action</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <th scope="row">1</th>
               <td>Mark</td>
               <td>Otto</td>
               <td>
                  <Button className="btn-icon" color="info" size="sm" type="button" onClick={() => Detail()}>
                     <i className="fa fa-user" />
                  </Button>
               </td>
            </tr>
            <tr>
               <th scope="row">2</th>
               <td>Jacob</td>
               <td>Thornton</td>
               <td>@fat</td>
            </tr>
            <tr>
               <th scope="row">3</th>
               <td>Larry</td>
               <td>the Bird</td>
               <td>@twitter</td>
            </tr>
         </tbody>
      </Table>
   );
};

export default ProductComponent;
