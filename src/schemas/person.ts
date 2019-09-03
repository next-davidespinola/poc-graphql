import { Field, Int, ObjectType } from "type-graphql";
import Movie from "./movie";

@ObjectType({description: 'A Person which can be an actor/actress and also a director of several movies'})
export default class Person {

  static GENDERS = ['', 'female', 'male'];

  constructor(id: number) {
    this.id = id;
  }

  @Field(type => Int, { description: 'Identifier of the Person' })
  id: number;

  @Field({ description: 'Full name of the Person' })
  name: string;

  @Field({ description: 'Gender of the Person: male or female', nullable: true })
  gender: string;

  @Field({ description: 'The date when person was born', nullable: true })
  birthday: Date;

  @Field(type => [Movie], { description: 'All the films in which the Person has participated', defaultValue: [] })
  filmography: Movie[];

}