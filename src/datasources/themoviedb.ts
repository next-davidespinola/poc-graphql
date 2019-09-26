import {RequestOptions, RESTDataSource} from 'apollo-datasource-rest';
import Movie from "../schemas/movie";
import {ListDto} from "../dtos/list.dto";
import Person from "../schemas/person";
import List from "../schemas/list";

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
    request.params.set('session_id', this.context.sessionId);
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
   * Add a movie to list.
   * @param {number} movieId    The movie id to remove.
   * @param {number} listId       Identifier of the list.
   * @return {Promise<Number>}
   */
  async addMovieToList(movieId: number, listId: number): Promise<Number> {

    let body = { media_id: movieId }
    let headers = { headers: { 'Content-Type': 'application/json'} }
    let data = await this.post(`/list/${listId}/add_item`,
      JSON.stringify(body),
      headers
    );
    return movieId;
  }


  /**
   * Remove a movie from a list.
   * @param {number} movieId    The movie id to remove.
   * @param {number} listId       Identifier of the list.
   * @return {Promise<Number>}
   */
  async removeMovieFromList(movieId: number, listId: number): Promise<Number> {

    let body = { media_id: movieId }
    let headers = { headers: { 'Content-Type': 'application/json'} }
    let data = await this.post(`/list/${listId}/remove_item`,
      JSON.stringify(body),
      headers
    );
    return movieId;
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


  /**
   * Retrieves all movie lists for our account in TheMovieDB API.
   * @param {string} query
   * @param {number} skip
   * @param {number} take
   * @return {Promise<List[]>}
   */
  async getLists(
    skip?: number,
    take?: number
  ): Promise<List[]> {
    let data = await this.get(`/account/${this.context.accountId}/lists`, {});
    return await data.results.map(async (elem: any) => {
      return parseList(elem);
    });
  }

    /**
   * Retrieves all lists of our account in TheMovieDB API.
   * @param {number} id

   * @return {Promise<List>}
   */
  async getList( id: number ): Promise<List> {
    let data = await this.get(`/list/${id}`, {});

    return parseList(data);
  }

   /**
   * Create a list 
   * @param {ListDto} listDto
   * @return {Promise<List>}
   */
  async createList(listDto: ListDto): Promise<List> {

    let headers = { headers: { 'Content-Type': 'application/json'} } 
    let data = await this.post(`/list`,
      JSON.stringify(listDto),
      headers);
    
    let le = parseList(listDto);
    le.id = data.list_id;
    return le;
  }

  /**
   * Delete a Movie List.
   * @param {string} id
   * @return {Promise<Number>}
   */
  async deleteList(id: string) : Promise<String> {
    // The Movie Db API has a bug in this operation
    // https://www.themoviedb.org/talk/5947cc13c3a36816f6040f2f
    // The list is deleted but the API returns 500 error
    // If it deletes again the API returns 404 error.
    let data = await this.delete(`/list/${id}`, {});
    console.log(data);
    return id;
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


/**
 * Parses the JSON body response of a List.
 * @param data
 * @return {List}
 */
const parseList = (data: any): List => {
  let list = new List();
  list.id = data.id;
  list.name = data.name;
  list.description = data.description;
  if (data.items){
    list.movies = new Array<Movie>();
    data.items.map(async (elem: any) => {
      list.movies.push(parseMovie(elem))
    });
  }
  return list;
};
