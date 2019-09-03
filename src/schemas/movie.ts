import { Field, Int, ObjectType,  } from "type-graphql";
import Person from "./person";

@ObjectType({description: 'Represents a movie with information such title, date, cast, director, etc.'})
export default class Movie {

  constructor(id: number) {
    this.id = id;
  }

  @Field(type => Int, { description: 'Identifier of the movie' })
  id: number;

  @Field({ description: 'The original title' })
  title: string;

  @Field(type => Date, { description: 'Release date', nullable: true })
  date?: Date;

  @Field(type => Person, { description: 'Director of the film', nullable: true })
  director?: Person;

  @Field(type => [Person], {description: 'Actors and actresses', defaultValue: []})
  cast: Person[];
}