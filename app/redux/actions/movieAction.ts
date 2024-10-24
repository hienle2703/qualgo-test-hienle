import { Dispatch } from "@reduxjs/toolkit";
import { MovieAction } from "../reducers/movieReducer";
import {
  getMovieDetailById,
  getRandomMovies,
  searchMovie,
} from "qualgo-network-sdk";

type MovieDetail = any;

interface MovieDetailActionTypes {
  getMovieDetailRequest: {};
  getMovieDetailSuccess: { payload: MovieDetail };
  getMovieDetailFail: { payload: string };
}

export const getAllMovies =
  (keyword?: string) => async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch({
        type: "GET_ALL_MOVIES_REQUEST",
      });

      const response = keyword
        ? await searchMovie(keyword)
        : await getRandomMovies();

      dispatch({
        type: "GET_ALL_MOVIES_SUCCESS",
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "GET_ALL_MOVIES_FAIL",
        payload: error,
      });
    }
  };

export const getMovieDetail =
  (id: string) => async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch({
        type: "GET_MOVIE_DETAIL_REQUEST",
      });

      const data = await getMovieDetailById(id);

      dispatch({
        type: "GET_MOVIE_DETAIL_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "GET_MOVIE_DETAIL_FAIL",
        payload: error,
      });
    }
  };

export const popMovieStack = (dispatch: Dispatch<MovieAction>) => {
  dispatch({
    type: "POP_MOVIE_STACK",
  });
};
