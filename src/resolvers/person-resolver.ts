import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import Person from "../schemas/person";
import { MockService, MovieData, PersonData } from "../services/mock-service";

@Resolver(of => Person)
export default class {

  @Query(returns => Person, { nullable: true })
  personsByName(@Arg("name") name: string): PersonData[] {
    return MockService.searchPersons(name);
  }

  @FieldResolver()
  filmography(@Root() personData: PersonData): MovieData[] {
    let movies: MovieData[] = [];
    personData.appearances.forEach(movieId => {
      const movie = MockService.getMovieById(movieId);
      if (movie) {
        movies.push(movie);
      }
    });
    return movies;
  }

}