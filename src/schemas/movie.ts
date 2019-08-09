import { Field, Int, ObjectType } from "type-graphql";
import Person from "./person";

@ObjectType()
export default class Movie {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => Int)
  year: number;

  @Field(type => Person)
  director: Person;

  @Field(type => [Person])
  cast: Person[];
}