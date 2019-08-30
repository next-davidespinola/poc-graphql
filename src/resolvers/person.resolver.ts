import {Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import Person from "../schemas/person";
import {IDataSources} from "../datasources/datasources";
import {PaginationArgs} from "./query.args";
import Movie from "../schemas/movie";

@Resolver(of => Person)
export default class {

  @Query(returns => [Person])
  async persons(
    @Arg("name") name: string,
    @Args() {skip, take}: PaginationArgs,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<Person[]> {
    return await dataSources.moviesAPI.getPersons(name, skip, take);
  }

  @FieldResolver()
  async filmography(
    @Root() person: Person,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<Movie[]> {
    return await Promise.all(person.filmography.map(async (elem) => await dataSources.moviesAPI.getMovie(elem.id)));
  }

}