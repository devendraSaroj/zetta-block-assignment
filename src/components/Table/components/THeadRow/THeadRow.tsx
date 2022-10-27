import React from "react";
import "./THeadRow.style.css";
import arrowIcon from "../../../../assets/arrow.svg";
import { TableProps } from "../../Table";

export type TableHeaderProps = {
  columns: TableProps["columns"];
  onSort?: (dataField: string, order: "asc" | "desc") => void;
};

const THeader = (props: TableHeaderProps) => {
  return (
    <tr className="table-header-row">
      {props.columns
        .filter((thItem) => !thItem.hidden)
        .map((thItem, index) => (
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
