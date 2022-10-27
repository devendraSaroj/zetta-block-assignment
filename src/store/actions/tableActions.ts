import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TableRowType } from "../../components/Table/components/types";
import { baseURL } from "../../configs/secrets";

export const fetchAPIList = createAsyncThunk(
  "api/list/fetch",
  async (args: { dataField: string; order: "asc" | "desc" }) => {
    try {
      const response = await axios.get(
        `${baseURL}/apis?sortBy=${args.dataField}&order=${args.order}`
      );
      return response.data;
    } catch (error) {
      alert("error");
    }
  }
);

export const updateApiDetail = createAsyncThunk(
  "api/detail/update",
  async (updatedObject: TableRowType, { dispatch, getState }) => {
    const response = await axios.put(
      `${baseURL}/apis/${updatedObject.id}`,
      updatedObject
    );
    return response.data;
  }
);
