import React, { useState } from "react";
import "./TBodyRow.style.css";
import { TableRowType } from "../types";
import { TableProps } from "../../Table";

type Props = {
  columns: TableProps["columns"];
  rowData: TableRowType;
  onUpdateDescription: (updatedObject: TableRowType) => void;
};

const TBodyRow = (props: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(
    props.rowData.description || ""
  );

  const onSaveDescription = () => {
    const updatedObject = Object.assign({}, props.rowData, { description });
    props.onUpdateDescription(updatedObject);
  };

  const isDescriptionEdited =
    props.rowData.description?.length! > 0 &&
    description !== props.rowData.description;
  return (
    <>
      <tr className="table-body-row" onClick={() => setExpanded(!expanded)}>
        {props.columns.map(({ dataField, text, formatter }, index) => {
          const cellData = props.rowData[dataField];
          return (
            <td key={index} title={cellData}>
              {typeof formatter === "function"
                ? formatter(props.rowData.id, dataField, text)
                : cellData}
            </td>
          );
        })}
      </tr>
      {expanded && (
        <tr className="row-expanded">
          <td colSpan={props.columns.length}>
            <div className="expanded_property_row">
              <div className="row_title">Description</div>
              <div className="description_container">
                <textarea
                  title="Write here to update this description."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                {isDescriptionEdited && (
                  <button type="button" onClick={onSaveDescription}>
                    Save
                  </button>
                )}
              </div>
            </div>
            <div className="expanded_property_row">
              <div className="row_title">Query</div>
              <textarea
                data-content={(props.rowData.query || "").length > 0}
                className="row_query"
                disabled
                defaultValue={props.rowData.query}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TBodyRow;
