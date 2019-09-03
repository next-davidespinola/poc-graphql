
import {Field, InputType, Int} from "type-graphql";
import {ArrayMaxSize} from "class-validator";


@InputType()
export class MovieDto {
  @Field({description: 'The title of the movie'})
  title: string;

  @Field({description: 'The official release date of the movie'})
  date: Date;

  @Field(type => Int, { nullable: true, description: 'Identifier of the person who directed the movie' })
  director: number;

  @Field(type => [Int], {description: 'List of actors/actresses who participated in the movie'})
  @ArrayMaxSize(30)
  cast: number[];
}
