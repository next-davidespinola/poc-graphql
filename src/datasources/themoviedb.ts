import {RequestOptions, RESTDataSource} from 'apollo-datasource-rest';
import Movie from "../schemas/movie";
import {MovieDto} from "../dtos/movie.dto";
import Person from "../schemas/person";

export class TheMovieDBAPI extends RESTDataSource {

  /**
   * Default constructor.
   */
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('api_key', this.context.token);
  }

  /**
   * Retrieves all the movies from TheMovieDB API.
   * @param {string} query
   * @param {number} skip
   * @param {number} take
   * @return {Promise<Movie[]>}
   */
  async getMovies(
    query: string,
    skip?: number,
    take?: number
  ): Promise<Movie[]> {
    let data = await this.get(`search/movie`, {query});
    return await data.results.map(async (elem: any) => {
      const credits = await this.get(`movie/${elem.id}/credits`);
      return parseMovie(elem, credits);
    });
  }

  /**
   * Retrieves a single movie from TheMovieDB API.
   * @param {number} id  The identifier of the movie.
   * @return {Promise<Movie>}
   */
  async getMovie(id: number): Promise<Movie> {
    const data = await this.get(`movie/${id}`);
    const credits = await this.get(`movie/${id}/credits`);
    return parseMovie(data, credits);
  }

  /**
   * Adds a movie to a list.
   * @param {MovieDto} movie    The movie to add.
   * @param {string} list       Name of the list.
   * @return {Promise<void>}
   */
  async addMovieToList(movie: MovieDto, list: string): Promise<Movie> {
    return await this.put('list', {movie});
  }

  /**
   * Retrieve a single person.
   * @param {number} id   The identifier of the person.
   * @return {Promise<Person>}
   */
  async getPerson(id: number): Promise<Person> {
    const data = await this.get(`person/${id}`);
    const credits = await this.get(`person/${id}/movie_credits`);
    return parsePerson(data, credits);
  }

  /**
   * Retrieve all person matching filters.
   * @param {string} query   The name to search.
   * @param {number} skip   Skip first results.
   * @param {number} take   Limit the results.
   * @return {Promise<Person[]>}
   */
  async getPersons(
    query?: string,
    skip?: number,
    take?: number): Promise<Person[]> {
    let data = await this.get(`search/person`, {query});
    return await data.results.map(async (elem: any) => {
      const credits = await this.get(`person/${elem.id}/movie_credits`);
      return parsePerson(elem, credits);
    });
  }

}


/////////////////////////////////////////////////////////////////////////
//                        JSON PARSERS
/////////////////////////////////////////////////////////////////////////

/**
 * Parses the JSON body response of a movie.
 * @param data
 * @param credits
 * @return {Movie}
 */
const parseMovie = (data: any, credits?: any): Movie => {
  let movie = new Movie(data.id);
  movie.title = data.title;

  if (data.release_date) {
    movie.date = new Date(data.release_date);
  }

  if (credits) {
    const director = credits.crew.find((person: any) => person.job === 'Director');
    if (director) {
      movie.director = new Person(director.id);
    }
    if ((credits.cast !== undefined) && credits.cast.length) {
      movie.cast = credits.cast.slice(0, 5).map((character: any) => new Person(character.id));
    }
  }

  return movie;
};

/**
 * Parses the JSON body response of a person.
 * @param data
 * @param credits
 * @return {Person}
 */
const parsePerson = (data: any, credits?: any): Person => {
  let person = new Person(data.id);
  person.name = data.name;
  person.gender = Person.GENDERS[data.gender];
  person.birthday = new Date(data.birthday);
  person.filmography = [];

  if (credits) {
    if ((credits.cast !== undefined) && credits.cast.length) {
      person.filmography = credits.cast.slice(0, 5).map((movie: any) => new Movie(movie.id));
    }
  }

  return person;
};

