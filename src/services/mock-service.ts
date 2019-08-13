import {isUndefined} from "util";

export interface MovieData {
  id: number;
  title: string;
  director: number;
  cast: number[];
}

export interface PersonData {
  id: number;
  name: string;
  gender: string;
  directorOf: number[];
  appearances: number[];
}

const movies: MovieData[] = [
  { id: 1, title: "Star Wars", director: 1, cast: [3, 4]},
  { id: 2, title: "Gran Torino", director: 2, cast: [1, 5] },
  { id: 3, title: "Indiana Jones", director: 1, cast: [3] }
];

const persons: PersonData[] = [
  { id: 1, name: "George Lucas", gender: "male", directorOf: [1, 3], appearances: [] },
  { id: 2, name: "Clint Eastwood", gender: "male", directorOf: [2], appearances: [2] },
  { id: 3, name: "Harrison Ford", gender: "male", directorOf: [], appearances: [1, 3] },
  { id: 4, name: "Mark Hamil", gender: "male", directorOf: [], appearances: [1] },
];

export const MockService = {

  /**
   * Retrieves all movies.
   * @return {MovieData[]}
   */
  getMovies: (): MovieData[] => {
    return movies;
  },

  /**
   * Retrieves a movie from its identifier.
   * @param id    The identifier of the movie.
   * @return {PersonData[]}
   */
  getMovieById: (id: number): MovieData | undefined => {
    return movies.find(movie => movie.id === id);
  },

  /**
   * Retrieves all movies matching given title.
   * @param {string} title    The title text for searching th movies.
   * @return {MovieData[]}
   */
  searchMovies: (title: string): MovieData[] => {
    return movies.filter(movie => movie.title.match(title));
  },

  /**
   * Retrieves all the persons.
   * @return {PersonData[]}
   */
  getPersons: (): PersonData[] => {
    return persons;
  },

  /**
   * Retrieves a person from its identifier.
   * @param id    The identifier of the person.
   * @return {PersonData[]}
   */
  getPersonById: (id: number): PersonData | undefined => {
    return persons.find(person => person.id === id);
  },

  /**
   * Searches for persons with a given name.
   * @param name    The name of the person
   * @return {PersonData[]}
   */
  searchPersons: (name: string): PersonData[] => {
    return persons.filter(person => person.name.match(name));
  }

};

