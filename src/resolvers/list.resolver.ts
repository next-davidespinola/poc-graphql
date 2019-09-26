import {Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import List from "../schemas/list";
import {ListDto} from "../dtos/list.dto";
import {IDataSources} from "../datasources/datasources";
import {PaginationArgs} from "./query.args";

@Resolver(of => List)
export default class {

  ////////////////////////////////////////////////////////////////
  //                        QUERIES
  ////////////////////////////////////////////////////////////////

  @Query(returns => [List])
  async lists(
    @Args() {skip, take}: PaginationArgs,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<List[]> {
    return await dataSources.moviesAPI.getLists(skip, take);
  }

  @Query(returns => List)
  async list(
    @Arg("id") listId: number,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<List> {
    return await dataSources.moviesAPI.getList(listId);
  }


  ////////////////////////////////////////////////////////////////
  //                        MUTATIONS
  ////////////////////////////////////////////////////////////////

  @Mutation(returns => List)
  async createList(
    @Arg("data") list: ListDto,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<List> {
    return dataSources.moviesAPI.createList(list);
  }


  @Mutation(returns => String)
  async deleteList(
    @Arg("id") id: string,
    @Ctx('dataSources') dataSources: IDataSources
  ): Promise<String> {
    return dataSources.moviesAPI.deleteList(id);
  }

}