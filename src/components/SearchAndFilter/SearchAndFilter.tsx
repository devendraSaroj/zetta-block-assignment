import React, { useState } from "react";
import classNames from "./SearchAndFilter.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

type Props = {
  uniqueTypeList: string[];
  onSearchOrFilter: (
    search: string | undefined,
    filter: { [key: string]: string | undefined }
  ) => void;
};

const SearchAndFilter = (props: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [typeFilterKeyword, setTypeFilterKeyword] = useState<string>("All");
  const [operationNameFilterKeyword, setOperationNameFilterKeyword] =
    useState<string>("All");
  return (
    <div className={classNames.search_and_filter_container}>
      <div className={classNames.search_container}>
        <p className={classNames.tool_title}>What are you looking for?</p>
        <div className={classNames.search_input_container}>
          <SearchIcon stroke="var(--gray-1)" height={16} />
          <input
            placeholder="Search for name, type, operation-name etc."
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
          />
        </div>
      </div>
      <div className={classNames.dropdown}>
        <p className={classNames.tool_title}>Type</p>
        <select
          name="Type"
          onChange={(event) => setTypeFilterKeyword(event.target.value)}
        >
          <option>All</option>
          {props.uniqueTypeList.map((type: any, index) => (
            <option key={index}>{type}</option>
          ))}
        </select>
      </div>
      {/* <div className={classNames.dropdown}>
        <p className={classNames.tool_title}>Operation Name</p>
        <select
          name="Operation Name"
          onChange={(event) =>
            setOperationNameFilterKeyword(event.target.value)
          }
        >
          <option>All</option>
          {uniqueOperationNameList.map((type: any, index) => (
            <option key={index}>{type}</option>
          ))}
        </select>
      </div> */}
      <div>
        <p> </p>
        <button
          className={classNames.search_button}
          type="button"
          onClick={() =>
            props.onSearchOrFilter(
              searchKeyword === "" ? undefined : searchKeyword,
              {
                type:
                  typeFilterKeyword === "All" ? undefined : typeFilterKeyword,
                // operationName:
                //   operationNameFilterKeyword === "All"
                //     ? undefined
                //     : operationNameFilterKeyword,
              }
            )
          }
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
