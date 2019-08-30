import {Max, Min} from "class-validator";
import {ArgsType, Field, Int} from "type-graphql";


@ArgsType()
export class PaginationArgs {
  @Field(type => Int, { nullable: true, description: 'Skips the first "skip" elements of the result'})
  @Min(0)
  skip: number = 0;

  @Field(type => Int, { nullable: true, description: 'Return a maximum of "take" elements of the result' })
  @Min(1) @Max(50)
  take: number = 25;
}
