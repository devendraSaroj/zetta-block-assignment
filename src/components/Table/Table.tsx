import React from "react";
import TBodyRow from "./components/TBodyRow/TBodyRow";
import THeadRow from "./components/THeadRow/THeadRow";
import { TableRowType } from "./components/types";
import "./Table.css";

export type TableProps = {
  data: Array<TableRowType>;
  columns: Array<{
    dataField: string;
    text: string;
    sort?: boolean;
    /**
     * defines current sorting order of the column
     */
    order?: "asc" | "desc";
  }>;
  onSort?: (dataField: string, order: "asc" | "desc") => void;
  onUpdateDescription: (updatedObject: TableRowType) => void;
};

const Table = (props: TableProps) => {
  return (
    <table className="table-container">
      <thead>
        <THeadRow
          columns={props.columns}
          onSort={(dataField, order) =>
            typeof props.onSort === "function"
              ? props.onSort(dataField, order)
              : undefined
          }
        />
      </thead>
      <tbody>
        {props.data.map((rowData, index) => (
          <TBodyRow
            key={rowData.id}
            columns={props.columns}
            rowData={rowData}
            onUpdateDescription={props.onUpdateDescription}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
