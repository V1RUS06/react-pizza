import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slices/filterSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
