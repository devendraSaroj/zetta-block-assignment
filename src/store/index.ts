import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "./reducers/tableSlice";

export const store = configureStore({
  reducer: {
    apis: tableSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
