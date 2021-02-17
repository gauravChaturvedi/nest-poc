import { InputType, Field } from "@nestjs/graphql";
@InputType()
export class CreateResourceDTO {
    @Field()
    activity: string;
    @Field()
    url: string;
    @Field()
    name: string;
}