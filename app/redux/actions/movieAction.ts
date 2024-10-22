import { Dispatch } from "@reduxjs/toolkit";

type MovieDetail = any;

interface MovieDetailActionTypes {
  getMovieDetailRequest: {};
  getMovieDetailSuccess: { payload: MovieDetail };
  getMovieDetailFail: { payload: string };
}

export const getAllMovies =
  (keyword: string) => async (dispatch: Dispatch<MovieDetailActionTypes>) => {
    try {
      dispatch({
        type: "getAllMoviesRequest",
      });

      // TODO: GỌI SDK TỰ VIẾT
      // const { data } = await axios.get(
      //   `${server}/product/all?keyword=${keyword}&category=${category}`,
      //   {
      //     withCredentials: true,
      //   }
      // );

      dispatch({
        type: "getAllMoviesSuccess",
        //   payload: data.movies,
      });
      // TODO: Define error
    } catch (error) {
      dispatch({
        type: "getAllMoviesFail",
        //   payload: error.response.data.message,
      });
    }
  };

export const getMovieDetail = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: "getMovieDetailRequest",
    });

    // const { data } = await axios.get(`${server}/product/single/${id}`, {
    //   withCredentials: true,
    // });

    dispatch({
      type: "getMovieDetailSuccess",
      //   payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getMovieDetailFail",
      //   payload: error.response.data.message,
    });
  }
};
