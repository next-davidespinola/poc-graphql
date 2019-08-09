import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import Movie from "../schemas/movie";
import { MockService, MovieData, PersonData } from "../services/mock-service";

@Resolver(of => Movie)
export default class {

  @Query(returns => Movie, { nullable: true })
  movieByTitle(@Arg("title") title: string): MovieData[] {
    return MockService.searchMovies(title);
  }

  @FieldResolver()
  director(@Root() movieData: MovieData): PersonData | undefined {
    return MockService.getPersonById(movieData.director);
  }

  @FieldResolver()
  cast(@Root() movieData: MovieData): PersonData[] {
    let persons: PersonData[] = [];
    movieData.cast.forEach(personId => {
      const person = MockService.getPersonById(personId);
      if (person) {
        persons.push(person);
      }
    });
    return persons;
  }
}