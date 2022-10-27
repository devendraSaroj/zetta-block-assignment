import React from "react";
import "./THeadRow.style.css";
import arrowIcon from "../../../../assets/arrow.svg";

export type TableHeaderProps = {
  columns: Array<{
    dataField: string;
    text: string;
    sort?: boolean;
    order?: "asc" | "desc";
  }>;
  onSort?: (dataField: string, order: "asc" | "desc") => void;
};

const THeader = (props: TableHeaderProps) => {
  return (
    <tr className="table-header-row">
      {props.columns.map((thItem, index) => (
        <th key={index}>
          {thItem.text}
          {thItem.sort && (
            <div
              onClick={() =>
                typeof props.onSort === "function"
                  ? props.onSort(
                      thItem.dataField,
                      ["asc", "desc"].includes(thItem.order || "")
                        ? thItem.order === "asc"
                          ? "desc"
                          : "asc"
                        : "desc"
                    )
                  : undefined
              }
            >
              <img src={arrowIcon} className={thItem.order ?? "asc"} />
            </div>
          )}
        </th>
      ))}
    </tr>
  );
};

export default THeader;
