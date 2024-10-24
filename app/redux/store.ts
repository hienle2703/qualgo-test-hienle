import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./reducers/movieReducer";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Since the response from the open api is quite large, we temporarily disable this check until getting another clean response
    }),
});

export type AppDispatch = typeof store.dispatch
