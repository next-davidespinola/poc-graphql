
import Movie from "../schemas/movie";
import {DataSource} from "apollo-datasource";


const movies: any[] = [
  { id: 1, title: "Star Wars", director: 1, cast: [3, 4]},
  { id: 2, title: "Gran Torino", date: new Date(2008, 1), director: 2, cast: [1, 5] },
  { id: 3, title: "Indiana Jones", director: 1, cast: [3] }
];

const persons: any[] = [
  { id: 1, name: "George Lucas", gender: "male", directorOf: [1, 3], appearances: [] },
  { id: 2, name: "Clint Eastwood", gender: "male", directorOf: [2], appearances: [2] },
  { id: 3, name: "Harrison Ford", gender: "male", directorOf: [], appearances: [1, 3] },
  { id: 4, name: "Mark Hamil", gender: "male", directorOf: [], appearances: [1] },
];


export class MocksAPI extends DataSource {

  /**
   * Default constructor.
   */
  constructor() {
    super();
  }

  /**
   * Retrieves all the movies from TheMovieDB API.
   * @return {Promise<Movie[]>}
   */
  async getMovies(): Promise<Movie[]> {
    return await movies;
  }

  /**
   * Retrieves a single movie from TheMovieDB API.
   * @param {string} title  The title of the movie.
   * @return {Promise<Movie | undefined>}
   */
  async getMovie(title: string): Promise<Movie | undefined> {
    return await movies.find(movie => movie.title === title);
  }

}
