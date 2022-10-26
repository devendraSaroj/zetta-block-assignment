import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../configs/secrets";

export const fetchAPIList = createAsyncThunk(
  "apis/list",
  async (args, { dispatch, getState }) => {
    const response = await axios.get(`${baseURL}/apis`);
    console.log({ response: response.data });
    return response.data;
  }
);
