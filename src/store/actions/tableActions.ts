import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TableRowType } from "../../components/Table/components/types";
import { baseURL } from "../../configs/secrets";
import { customAlert } from "../reducers/tableSlice";

export const fetchAPIList = createAsyncThunk(
  "api/list/fetch",
  async (
    {
      sortBy,
      order,
      search,
      filters,
    }: {
      sortBy?: string | undefined;
      order?: "asc" | "desc";
      search?: string | undefined;
      filters?: { [key: string]: string | undefined };
    },
    { dispatch }
  ) => {
    try {
      const response = await axios.get(`${baseURL}/apis`, {
        params: { ...filters, search, sortBy, order },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(
        customAlert({
          isVisible: true,
          message: "Couldn't fetch data. Please try again.",
        })
      );
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

export const deleteApiEntry = createAsyncThunk(
  "api/delete",
  async (id: string, { dispatch, getState }) => {
    try {
      const response = await axios.delete(`${baseURL}/apis/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(
        customAlert({
          isVisible: true,
          message: "Delete action failed. Please try again.",
        })
      );
    }
  }
);
