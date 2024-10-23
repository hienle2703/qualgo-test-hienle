import { createReducer } from "@reduxjs/toolkit";

export interface MovieState {
  movies: any[];
  movie: any;
  loading: boolean;
  error: any;
  message: any;
}

export interface MovieAction {
  type:
    | "GET_ALL_MOVIES_REQUEST"
    | "GET_ALL_MOVIES_SUCCESS"
    | "GET_ALL_MOVIES_FAIL"
    | "GET_MOVIE_DETAIL_REQUEST"
    | "GET_MOVIE_DETAIL_SUCCESS"
    | "GET_MOVIE_DETAIL_FAIL"
    | "CLEAR_ERROR"
    | "CLEAR_MESSAGE";
  payload?: any;
}

export const movieReducer = createReducer(
  {
    movies: [],
    movie: {},
    loading: false,
    error: null,
    message: null,
  },
  (builder) => {
    builder
      .addCase("GET_ALL_MOVIES_REQUEST", (state: MovieState) => {
        state.loading = true;
      })
      .addCase("GET_MOVIE_DETAIL_REQUEST", (state: MovieState) => {
        state.loading = true;
      })

      .addCase(
        "GET_ALL_MOVIES_SUCCESS",
        (state: MovieState, action: MovieAction) => {
          state.loading = false;
          state.movies = action.payload;
        }
      )
      .addCase(
        "GET_MOVIE_DETAIL_SUCCESS",
        (state: MovieState, action: MovieAction) => {
          state.loading = false;
          state.movie = action.payload;
        }
      )

      .addCase(
        "GET_ALL_MOVIES_FAIL",
        (state: MovieState, action: MovieAction) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        "GET_MOVIE_DETAIL_FAIL",
        (state: MovieState, action: MovieAction) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder.addCase("CLEAR_ERROR", (state: MovieState) => {
      state.error = null;
    });
    builder.addCase("CLEAR_MESSAGE", (state: MovieState) => {
      state.message = null;
    });
  }
);
