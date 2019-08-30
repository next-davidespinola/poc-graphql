
import {Field, InputType, Int} from "type-graphql";
import {ArrayMaxSize} from "class-validator";


@InputType()
export class PersonDto {
  @Field({description: 'The full name of the person'})
  name: string;

  @Field({description: 'The gender (male/female) of the person'})
  gender?: string;

  @Field({description: 'The country where of the person was born'})
  country?: string;

  @Field({description: 'Date of birth of the person'})
  birthday?: Date;

  @Field(type => Int, {nullable: true, description: 'List of identifiers of the movies directed by the person'})
  directed: number[];

  @Field(type => [Int], {description: 'List of identifier of the movies in which person has acted'})
  @ArrayMaxSize(30)
  actedIn: number[];
}
