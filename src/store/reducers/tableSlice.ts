import { createSlice } from "@reduxjs/toolkit";
import { TableRowType } from "../../components/Table/components/types";
import { fetchAPIList, updateApiDetail } from "../actions/tableActions";

interface TableState {
  data: Array<TableRowType>;
  uniqueTypeList: string[];
}

const initialState: TableState = {
  data: [],
  uniqueTypeList: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAPIList.fulfilled, (state, action) => {
      state.data = action.payload;
      if (state.uniqueTypeList.length === 0) {
        const uniqueValues = action.payload?.reduce((acc: any, obj: any) => {
          if (obj.type) {
            acc[obj.type] = obj.type;
          }
          return acc;
        }, {});

        state.uniqueTypeList = Object.values(uniqueValues);
      }
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
