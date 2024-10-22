import { createReducer } from "@reduxjs/toolkit";

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
      .addCase("getAllMoviesRequest", (state) => {
        state.loading = true;
      })
      .addCase("getMovieDetailRequest", (state) => {
        state.loading = true;
      })

      .addCase("getAllMoviesRequest", (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase("getMovieDetailSuccess", (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })

      .addCase("getAllMoviesFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getMovieDetailFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase("clearError", (state) => {
      state.error = null;
    });
    builder.addCase("clearMessage", (state) => {
      state.message = null;
    });
  }
);
