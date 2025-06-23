import { configureStore } from "@reduxjs/toolkit";
// ...
import { useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./user/userSlice";
import { CartSlice } from "./cart/cartslice";
import { favSlice } from "./favorite/favslice";

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    cart:CartSlice.reducer,fav:favSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()