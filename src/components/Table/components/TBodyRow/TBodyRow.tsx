import React from "react";
import "./TBodyRow.style.css";
import { TableRowType } from "../types";

type Props = {
  columns: Array<{ dataField: string }>;
  rowData: TableRowType;
};

const TBodyRow = (props: Props) => {
  return (
    <tr className="table-body-row">
      {props.columns.map(({ dataField }, index) => {
        const cellData = props.rowData[dataField];
        return <td key={index}>{cellData}</td>;
      })}
    </tr>
  );
};

export default TBodyRow;
