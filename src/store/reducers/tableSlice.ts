import { createSlice } from "@reduxjs/toolkit";
import { TableRowType } from "../../components/Table/components/types";
import { fetchAPIList, updateApiDetail } from "../actions/tableActions";

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
      state.data = action.payload;
    });
    builder.addCase(updateApiDetail.fulfilled, (state, action) => {
      const index = state.data.findIndex(({ id }) => id === action.payload.id);
      if (index >= 0) {
        state.data[index] = action.payload;
      }
    });
  },
});

export default tableSlice.reducer;
