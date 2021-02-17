import { PaymentStatus, Currency, Item } from "./resource.model";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
class ItemDTO{
    @Field()
    description: string;

    @Field()
    rate: number;

    @Field()
    quantity: number
}

@InputType()
export class CreateResourceDTO{
@Field()
activity: string;
@Field()	
resourceNo: string;
@Field()
paymentStatus: PaymentStatus;
@Field()
description: string;
@Field()
currency: Currency;
@Field()
taxRate: number;
@Field()
issueDate: Date;
@Field()
dueDate: Date;
@Field()
note: string;
@Field(type => [ItemDTO])
items: Array<{ description: string; rate: number; quantity: number }>;
}
