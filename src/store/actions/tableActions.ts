import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { TableRowType } from "../../components/Table/components/types";
import { baseURL } from "../../configs/secrets";
import { customAlert, TableState } from "../reducers/tableSlice";

export const fetchAPIList = createAsyncThunk(
  "api/list/fetch",
  async (
    {
      sortBy,
      order,
      search,
      filters,
      page,
      limit,
    }: {
      sortBy?: string | undefined;
      order?: "asc" | "desc";
      search?: string | undefined;
      filters?: { [key: string]: string | undefined };
      page?: number;
      limit?: number;
    },
    { dispatch }
  ) => {
    try {
      const response = await axios.get(`${baseURL}/apis`, {
        params: { ...filters, search, sortBy, order, page, limit },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again";
      dispatch(
        customAlert({
          isVisible: true,
          message,
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
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again";
      dispatch(
        customAlert({
          isVisible: true,
          message,
        })
      );
    }
  }
);

export const undoDelete = createAsyncThunk(
  "apis/delete/undo",
  async (args, { dispatch, getState }) => {
    const {
      apis: { history },
    } = getState() as { apis: TableState };

    const undoItem = history[history.length - 1];
    try {
      const response = await axios.post(`${baseURL}/apis`, undoItem);
      return response.data;
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again";
      dispatch(
        customAlert({
          isVisible: true,
          message,
        })
      );
    }
  }
);
export const redoDelete = createAsyncThunk(
  "apis/delete/redo",
  async (args, { dispatch, getState }) => {
    const {
      apis: { redoList },
    } = getState() as { apis: TableState };

    const redoItem = redoList[redoList.length - 1];
    try {
      await dispatch(deleteApiEntry(redoItem.id));
      return { id: redoItem.id };
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again";
      dispatch(
        customAlert({
          isVisible: true,
          message,
        })
      );
    }
  }
);
