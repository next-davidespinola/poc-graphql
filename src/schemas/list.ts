import { Field, Int, ObjectType } from "type-graphql";
import Movie from "./movie";


@ObjectType({description: 'List of movies information '})
export default class List {

  constructor() {
  }


  @Field(type => Int, { description: 'Identifier of the list' })
  id: number;

  @Field({ description: 'Name of the list' })
  name: string;

  @Field({ description: 'Description of the list', nullable: true })
  description: string;

  @Field(type => [Movie],{ description: 'Description of the list', nullable: true })
  movies: Movie[];
  

}