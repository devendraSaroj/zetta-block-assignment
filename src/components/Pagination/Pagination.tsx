import React from "react";
import classNames from "./Pagination.module.css";

type Props = {
  pageLimit: number;
  currentPage: number;
  totalRecords: number;
  onChangePage: (page: number) => void;
};

const Pagination = (props: Props) => {
  const { currentPage, pageLimit, totalRecords } = props;

  const totalPageCount =
    Math.floor(totalRecords / pageLimit) +
    (totalRecords % pageLimit > 0 ? 1 : 0);
  return (
    <div className={classNames.pagination_row}>
      {/* <p className={classNames.pagination_text}>
        Showing {pageLimit * (currentPage - 1) + 1}-
        {currentPage * pageLimit > totalRecords
          ? totalRecords
          : currentPage * pageLimit}{" "}
        out of {totalRecords}
      </p> */}
      <div className={classNames.pagination_button_group}>
        {Array.from(Array(totalPageCount).keys())
          .slice(
            currentPage - (currentPage >= 2 ? 2 : 1),
            currentPage + (currentPage >= 2 ? 1 : 2)
          )
          .map((val, index) => {
            const isActive = currentPage === val + 1;
            return (
              <button
                key={index}
                className={[
                  classNames.pagination_button,
                  isActive ? classNames.selected : "",
                ].join(" ")}
                onClick={() => props.onChangePage(val + 1)}
              >
                {val + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Pagination;
