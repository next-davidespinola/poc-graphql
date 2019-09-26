import {Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import Movie from "../schemas/movie";
import Person from "../schemas/person";
import {MovieDto} from "../dtos/movie.dto";
import {IDataSources} from "../datasources/datasources";
import {PaginationArgs} from "./query.args";

@Resolver(of => Movie)
export default class {

  ////////////////////////////////////////////////////////////////
  //                        QUERIES
  ////////////////////////////////////////////////////////////////

  @Query(returns => [Movie])
  async movies(
    @Arg("name") name: string,
    @Args() {skip, take}: PaginationArgs,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<Movie[]> {
    return await dataSources.moviesAPI.getMovies(name, skip, take);
  }

  @Query(returns => Movie)
  async movie(
    @Arg("id") id: number,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<Movie> {
    return await dataSources.moviesAPI.getMovie(id);
  }


  ////////////////////////////////////////////////////////////////
  //                        MUTATIONS
  ////////////////////////////////////////////////////////////////

  @Mutation(returns => Number)
  async addMovieToList(
    @Arg("listId") listId: number,
    @Arg("movieId") movieId: number,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<Number> {
    return await dataSources.moviesAPI.addMovieToList(movieId, listId);
  }


  @Mutation(returns => Number)
  async removeMovieFromList(
    @Arg("listId") listId: number,
    @Arg("movieId") movieId: number,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<Number> {
    return await dataSources.moviesAPI.removeMovieFromList(movieId, listId);
  }


  ////////////////////////////////////////////////////////////////
  //                        RESOLVERS
  ////////////////////////////////////////////////////////////////

  @FieldResolver()
  async director(
    @Root() movie: Movie,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<Person|null> {
    if (movie.director) {
      return await dataSources.moviesAPI.getPerson(movie.director.id);
    }
    return null;
  }

  @FieldResolver()
  async cast(
    @Root() movie: Movie,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<Person[]|null> {
    if (movie.cast){
      return await Promise.all(movie.cast.map(async (elem) => await dataSources.moviesAPI.getPerson(elem.id)));
    }
    return null;
  }
}
