import React from "react";
import "./THeadRow.style.css";
import arrowIcon from "../../../../assets/arrow.svg";

export type TableHeaderProps = {
  headers: Array<{
    id: number;
    dataField: string;
    name: string;
    sort?: boolean;
    ascending?: boolean;
  }>;
};

const THeader = (props: TableHeaderProps) => {
  return (
    <tr className="table-header-row">
      {props.headers.map((thItem) => (
        <th>
          {thItem.name}
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
