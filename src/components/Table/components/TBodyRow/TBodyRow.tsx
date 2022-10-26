import React from "react";
import "./TBodyRow.style.css";
import { TableRow } from "../types";

type Props = {
  orderedDataFieldList: Array<string>;
  data: TableRow;
};

const TBodyRow = (props: Props) => {
  return (
    <tr className="table-body-row">
      {props.orderedDataFieldList.map((dataField) => {
        const cellData = props.data[dataField];
        return <td>{cellData}</td>;
      })}
    </tr>
  );
};

export default TBodyRow;
