import React from "react";
import { Card, CardContent } from "@material-ui/core";
import "../Styling/TableBox.css";
import { ChartLine } from "./ChartLine";

const TableBox = ({ tableData, casesType }) => {
  return (
    <Card className="tablebox">
      <CardContent>
        <div className="table__information">
          <h2>Live Cases by Country</h2>
          <div className="info_rows">
            {tableData.map((data, k) => {
              return (
                <div className="eachrow" key={k}>
                  <tr>
                    <td>{data.country}</td>
                    <td>
                      <strong>{data.cases}</strong>
                    </td>
                  </tr>
                </div>
              );
            })}
          </div>
          <h2>Worldwide new {casesType}</h2>
          <ChartLine casesType={casesType} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TableBox;
