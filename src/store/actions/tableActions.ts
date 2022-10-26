import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TableRowType } from "../../components/Table/components/types";
import { baseURL } from "../../configs/secrets";

export const fetchAPIList = createAsyncThunk(
  "apis/list",
  async (args, { dispatch, getState }) => {
    const response = await axios.get(`${baseURL}/apis`);
    console.log({ response: response.data });
    return response.data;
  }
);

export const updateApiDetail = createAsyncThunk(
  "api/detail/update",
  async (updatedObject: TableRowType, { dispatch, getState }) => {
    const response = await axios.put(
      `${baseURL}/apis/${updatedObject.id}`,
      updatedObject
    );
    console.log({ response: response.data });
    return response.data;
  }
);
