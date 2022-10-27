import React, { useEffect, useState } from "react";
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";
import SearchAndFilter from "../../components/SearchAndFilter/SearchAndFilter";
import { TableRowType } from "../../components/Table/components/types";
import Table, { TableProps } from "../../components/Table/Table";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import {
  deleteApiEntry,
  fetchAPIList,
  updateApiDetail,
} from "../../store/actions/tableActions";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import classNames from "./Home.module.css";
import Pagination from "../../components/Pagination/Pagination";

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch();
  const apiList = useAppSelector((state) => state.apis.data);
  const uniqueTypeList = useAppSelector((state) => state.apis.uniqueTypeList);
  const totalRecords = useAppSelector((state) => state.apis.totalRecords);

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [typeFilterKeyword, setTypeFilterKeyword] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(fetchAPIList({ sortBy: "name", order: "asc" }));
      setLoading(false);
    })();
  }, []);

  const handleUpdateDescription = async (updatedObject: TableRowType) => {
    setLoading(true);
    await dispatch(updateApiDetail(updatedObject));
    setLoading(false);
  };

  const handleSort = async (dataField: string, order: "asc" | "desc") => {
    setLoading(true);
    const response = await dispatch(
      fetchAPIList({ sortBy: dataField, order, page })
    );
    setLoading(false);
    if (response.payload) setSortOrder(order);
  };

  const handleSearchOrFilter = async (
    search: string | undefined,
    filters: { [key: string]: string | undefined }
  ) => {
    setLoading(true);
    const response = await dispatch(
      fetchAPIList({
        sortBy: "name",
        order: sortOrder,
        search: search,
        filters,
        page,
      })
    );
    setLoading(false);
  };

  const handleDeleteRow = async (id: string) => {
    setLoading(true);
    const response = await dispatch(deleteApiEntry(id));
    setLoading(false);
  };

  const handlePagination = async (page: number) => {
    setLoading(true);
    const response = await dispatch(
      fetchAPIList({
        sortBy: "name",
        order: sortOrder,
        search: searchKeyword,
        filters: { type: typeFilterKeyword },
        page,
      })
    );
    setLoading(false);
    if (response.payload) setPage(page);
  };

  const handleActionFormatter = (id: string) => {
    return (
      <div className={classNames.action_container}>
        <button
          className={classNames.delete_button}
          type="button"
          onClick={(event) => {
            handleDeleteRow(id);
            event.stopPropagation();
          }}
        >
          <DeleteIcon stroke="var(--white)" />
        </button>
      </div>
    );
  };

  const columns: TableProps["columns"] = [
    { dataField: "id", text: "Id" },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      order: sortOrder,
    },
    { dataField: "type", text: "Type" },
    { dataField: "operationName", text: "Operation name" },
    { dataField: "createdAt", text: "Created at" },
    { dataField: "updatedAt", text: "Updated at" },
    { dataField: "action", text: "Action", formatter: handleActionFormatter },
  ];

  const pageLimit = 10;

  return (
    <LoaderWrapper loading={loading}>
      <div className={classNames.container}>
        <div className={classNames.search_and_filter_wrapper}>
          <SearchAndFilter
            searchKeyword={searchKeyword}
            typeFilterKeyword={typeFilterKeyword}
            uniqueTypeList={uniqueTypeList}
            onChangeSearchKeyword={(value) => setSearchKeyword(value)}
            onChangeTypeFilterKeyword={(value) => setTypeFilterKeyword(value)}
            onSearchOrFilter={handleSearchOrFilter}
          />
        </div>
        <Table
          loading={loading}
          data={apiList}
          columns={columns}
          onUpdateDescription={handleUpdateDescription}
          onSort={handleSort}
        />
        <div className={classNames.pagination_wrapper}>
          {apiList.length > 0 && (
            <Pagination
              currentPage={page}
              pageLimit={pageLimit}
              totalRecords={totalRecords}
              onChangePage={handlePagination}
            />
          )}
        </div>
      </div>
    </LoaderWrapper>
  );
};

export default Home;
