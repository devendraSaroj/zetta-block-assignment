import React, { useEffect } from "react";
import Table, { TableProps } from "../../components/Table/Table";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { fetchAPIList } from "../../store/actions/tableActions";

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch();
  const apiList = useAppSelector((state) => state.apis.data);

  useEffect(() => {
    (async () => {
      await dispatch(fetchAPIList());
    })();
  }, []);

  const columns: TableProps["columns"] = [
    { dataField: "id", text: "Id" },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "type", text: "Type" },
    { dataField: "operationName", text: "Operation name" },
    { dataField: "createdAt", text: "Created at" },
    { dataField: "updatedAt", text: "Updated at" },
  ];

  return (
    <div>
      <Table data={apiList} columns={columns} />
    </div>
  );
};

export default Home;
