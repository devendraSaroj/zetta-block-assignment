import React from "react";
import "./THeadRow.style.css";
import arrowIcon from "../../../../assets/arrow.svg";

export type TableHeaderProps = {
  columns: Array<{
    dataField: string;
    text: string;
    sort?: boolean;
    ascending?: boolean;
  }>;
};

const THeader = (props: TableHeaderProps) => {
  return (
    <tr className="table-header-row">
      {props.columns.map((thItem, index) => (
        <th key={index}>
          {thItem.text}
          {thItem.sort && (
            <div>
              <img
                src={arrowIcon}
                className={thItem.ascending ? "asc" : "desc"}
              />
            </div>
          )}
        </th>
      ))}
    </tr>
  );
};

export default THeader;
