import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import user from "./user";
import items from "./items";
import donate from "./donate";

export const store = configureStore({
  reducer: { user, items, donate },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
