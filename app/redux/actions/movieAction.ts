import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { MovieAction } from "../reducers/movieReducer";

type MovieDetail = any;

interface MovieDetailActionTypes {
  getMovieDetailRequest: {};
  getMovieDetailSuccess: { payload: MovieDetail };
  getMovieDetailFail: { payload: string };
}

const api = "https://imdb.iamidiotareyoutoo.com/search";

export const getAllMovies =
  (keyword: string) => async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch({
        type: "GET_ALL_MOVIES_REQUEST",
      });

      const { data } = await axios.get(`${api}?q=${keyword}`);

      if (data) {
        const formattedData = data.description.map((item: any) => {
          return Object.keys(item).reduce((acc, key) => {
            const newKey = key.replace("#", "").toLowerCase();
            acc[newKey] = item[key];
            return acc;
          }, {});
        });

        dispatch({
          type: "getAllMoviesSuccess",
          payload: formattedData,
        });
      }

      // TODO: Define error
    } catch (error) {
      dispatch({
        type: "GET_ALL_MOVIES_FAIL",
        payload: error,
      });
    }
  };

export const getMovieDetail = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: "GET_MOVIE_DETAIL_REQUEST",
    });

    const { data } = await axios.get(`${api}?tt=${id}`);

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
