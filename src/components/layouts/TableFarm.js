//Core
import React, { useMemo } from "react";
import Table from "../layouts/Table";

const TableFarm = (props) => {
    const data = [];
    
    Object.keys(props.farmOrders).forEach(farmTitle => {
        props.farmOrders[farmTitle].orders.forEach(order => {
            order.farmname = props.farmOrders[farmTitle].id;
            if (!data.includes(order.id)) {
                data.push(order)
            }
        }); 
    });

    const columns = useMemo(
        () => [
          {
            Header: "Farm",
            columns: [
              {
                Header: "Uretici",
                accessor: "farmname"
              },
              {
                Header: "ID",
                accessor: "farmid"
              },
              {
                Header: "Urun",
                accessor: "title"
              }
            ]
          }
        ],
        []
      );

      return (
        <div>
            <h5>Detayli Tablo: </h5>
            <Table columns={columns} data={data} />
        </div>
    );
};

export default TableFarm;
