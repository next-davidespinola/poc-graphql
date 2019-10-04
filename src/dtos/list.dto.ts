
import {Field, InputType} from "type-graphql";

@InputType()
export class ListDto {
  @Field({description: 'The title of the movie'})
  name: string;

  @Field({description: 'The title of the movie'})
  description: string;

}
