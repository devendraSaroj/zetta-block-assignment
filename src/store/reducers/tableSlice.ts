import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableRowType } from "../../components/Table/components/types";
import {
  deleteApiEntry,
  fetchAPIList,
  updateApiDetail,
} from "../actions/tableActions";

interface TableState {
  data: Array<TableRowType>;
  uniqueTypeList: string[];
  alert: { isVisible: boolean; message: string };
}

const initialState: TableState = {
  data: [],
  uniqueTypeList: [],
  alert: { isVisible: false, message: "" },
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    customAlert: (
      state,
      action: PayloadAction<{ isVisible: boolean; message: string }>
    ) => {
      state.alert.isVisible = action.payload.isVisible;
      state.alert.message = action.payload.message;
    },
  },
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
    builder.addCase(deleteApiEntry.fulfilled, (state, action) => {
      state.data = state.data.filter((obj) => obj.id !== action.payload.id);
    });
  },
});

export const { customAlert } = tableSlice.actions;

export default tableSlice.reducer;
