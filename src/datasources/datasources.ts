import {TheMovieDBAPI} from "./themoviedb";
import {MocksAPI} from "./mocks";

export interface IDataSources {
  moviesAPI: TheMovieDBAPI
}

export const DataSources = {
  sources: () => ({
    moviesAPI: new TheMovieDBAPI(),
    //moviesAPI: new MocksAPI(),
  })
};
