import React from "react";
import TBodyRow from "./components/TBodyRow/TBodyRow";
import THeadRow, { TableHeaderProps } from "./components/THeadRow/THeadRow";
import "./Table.css";

type Props = {};

const realData = [
  {
    createdAt: "2022-01-22T01:04:51.104Z",
    name: "ball_explicit.mjs",
    updatedAt: "2022-09-25T16:21:45.759Z",
    description: "description 15322",
    type: "smallint",
    id: "153",
  },
];

const Table = (props: Props) => {
  const columns: TableHeaderProps["headers"] = [
    { id: 1, dataField: "id", name: "id" },
    { id: 2, dataField: "name", name: "name", sort: true, ascending: true },
    { id: 3, dataField: "type", name: "type" },
    // { id: 4, name: "description" },
    // { id: 5, name: "query" },
    // { id: 9, name: "variables" },
    { id: 8, dataField: "operationName", name: "operationName" },
    { id: 6, dataField: "createdAt", name: "createdAt" },
    { id: 7, dataField: "updatedAt", name: "updatedAt" },
  ];

  const orderedDataFieldList = columns.map((col) => col.dataField);
  return (
    <table className="table-container">
      <thead>
        <THeadRow headers={columns} />
      </thead>
      <tbody>
        <TBodyRow
          orderedDataFieldList={orderedDataFieldList}
          data={{
            createdAt: "2022-01-22T01:04:51.104Z",
            name: "ball_explicit.mjs ball_explicit.mjs",
            updatedAt: "2022-09-25T16:21:45.759Z",
            description: "description 15322",
            type: "smallint",
            id: "153",
          }}
        />
      </tbody>
    </table>
  );
};

export default Table;
