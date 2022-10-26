import { createSlice } from "@reduxjs/toolkit";
import { TableRowType } from "../../components/Table/components/types";
import { fetchAPIList } from "../actions/tableActions";

interface TableState {
  data: Array<TableRowType>;
}

const initialState: TableState = {
  data: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAPIList.fulfilled, (state, action) => {
      console.log({ action });
      state.data = action.payload;
    });
  },
});

export default tableSlice.reducer;
