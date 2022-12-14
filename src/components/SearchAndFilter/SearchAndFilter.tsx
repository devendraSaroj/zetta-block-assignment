import React, { useState } from "react";
import classNames from "./SearchAndFilter.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as UndoIcon } from "../../assets/undo.svg";
import { ReactComponent as RedoIcon } from "../../assets/redo.svg";

type Props = {
  uniqueTypeList: string[];
  searchKeyword: string;
  typeFilterKeyword: string;
  onChangeSearchKeyword: (updatedValue: string) => void;
  onChangeTypeFilterKeyword: (updatedValue: string) => void;
  onSearchOrFilter: (
    search: string | undefined,
    filter: { [key: string]: string | undefined }
  ) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

const SearchAndFilter = (props: Props) => {
  const { searchKeyword, typeFilterKeyword } = props;
  return (
    <div className={classNames.search_and_filter_container}>
      <div className={classNames.search_container}>
        <p className={classNames.tool_title}>What are you looking for?</p>
        <div className={classNames.search_input_container}>
          <SearchIcon stroke="var(--gray-1)" height={16} />
          <input
            placeholder="Search for name, type, operation-name etc."
            value={searchKeyword}
            onChange={(event) =>
              props.onChangeSearchKeyword(event.target.value)
            }
          />
        </div>
      </div>
      <div className={classNames.dropdown}>
        <p className={classNames.tool_title}>Type</p>
        <select
          name="Type"
          onChange={(event) =>
            props.onChangeTypeFilterKeyword(event.target.value)
          }
        >
          <option>All</option>
          {props.uniqueTypeList.map((type: any, index) => (
            <option key={index}>{type}</option>
          ))}
        </select>
      </div>
      <div className={classNames.button_wrapper}>
        <button
          className={classNames.search_button}
          type="button"
          onClick={() =>
            props.onSearchOrFilter(
              searchKeyword === "" ? undefined : searchKeyword,
              {
                type:
                  typeFilterKeyword === "All" ? undefined : typeFilterKeyword,
              }
            )
          }
        >
          Search
        </button>
        <button
          type="button"
          title="undo delete"
          className={classNames.icon_button}
          disabled={!props.canUndo}
          onClick={props.onUndo}
        >
          <UndoIcon fill="var(--white)" />
        </button>
        <button
          title="redo delete"
          type="button"
          className={classNames.icon_button}
          disabled={!props.canRedo}
          onClick={props.onRedo}
        >
          <RedoIcon fill="var(--white)" />
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
