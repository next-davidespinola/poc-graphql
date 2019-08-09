import { Field, Int, ObjectType } from "type-graphql";
import Movie from "./movie";

@ObjectType()
export default class Person {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  gender: string;

  @Field(type => [Movie])
  filmography: Movie[];

}