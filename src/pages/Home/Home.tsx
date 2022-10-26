import React, { useEffect, useState } from "react";
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";
import { TableRowType } from "../../components/Table/components/types";
import Table, { TableProps } from "../../components/Table/Table";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import {
  fetchAPIList,
  updateApiDetail,
} from "../../store/actions/tableActions";

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch();
  const apiList = useAppSelector((state) => state.apis.data);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(fetchAPIList());
      setLoading(false);
    })();
  }, []);

  const handleUpdateDescription = async (updatedObject: TableRowType) => {
    setLoading(true);
    await dispatch(updateApiDetail(updatedObject));
    setLoading(false);
  };

  const columns: TableProps["columns"] = [
    { dataField: "id", text: "Id" },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "type", text: "Type" },
    { dataField: "operationName", text: "Operation name" },
    { dataField: "createdAt", text: "Created at" },
    { dataField: "updatedAt", text: "Updated at" },
  ];

  console.log({ loading });
  return (
    <LoaderWrapper loading={loading}>
      <Table
        data={Object.values(apiList)}
        columns={columns}
        onUpdateDescription={handleUpdateDescription}
      />
    </LoaderWrapper>
  );
};

export default Home;
