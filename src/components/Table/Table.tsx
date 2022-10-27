import React, { ReactElement } from "react";
import TBodyRow from "./components/TBodyRow/TBodyRow";
import THeadRow from "./components/THeadRow/THeadRow";
import { TableRowType } from "./components/types";
import classNames from "./Table.module.css";

export type TableProps = {
  data: Array<TableRowType>;
  columns: Array<{
    dataField: string;
    text: string;
    sort?: boolean;
    hidden?: boolean;
    /**
     * defines current sorting order of the column
     */
    order?: "asc" | "desc";
    formatter?: (id: string, dataField: string, text: string) => ReactElement;
  }>;
  loading: boolean;
  onUpdateDescription: (updatedObject: TableRowType) => void;
  onSort?: (dataField: string, order: "asc" | "desc") => void;
};

const Table = (props: TableProps) => {
  return (
    <>
      <table className={classNames.table_container}>
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
      {props.data.length <= 0 && !props.loading && (
        <div className={classNames.empty_message}>
          <p>Oops! couldn't find anything.</p>
          <p>You might wanna reset the search/filter keywords.</p>
        </div>
      )}
    </>
  );
};

export default Table;
