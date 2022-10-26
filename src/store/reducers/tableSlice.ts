import { createSlice } from "@reduxjs/toolkit";
import { TableRowType } from "../../components/Table/components/types";
import { fetchAPIList, updateApiDetail } from "../actions/tableActions";

interface TableState {
  data: { [key: string]: TableRowType };
}

const initialState: TableState = {
  data: {},
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAPIList.fulfilled, (state, action) => {
      // store data in a object, so that accessing an element should
      // take O(1) time.
      state.data = action.payload.reduce(
        (acc: TableState["data"], obj: TableRowType) => {
          acc[obj.id] = obj;
          return acc;
        },
        {}
      );
    });
    builder.addCase(updateApiDetail.fulfilled, (state, action) => {
      const id = action.payload.id;
      state.data[id] = action.payload;
    });
  },
});

export default tableSlice.reducer;
