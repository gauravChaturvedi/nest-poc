
import { ActivityModel } from './../activity/activity.model';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ChildEntity } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

export enum Currency {
  NGN = "NGN",
  USD = "USD",
  GBP = "GBP",
  EUR = " EUR"
}
export enum PaymentStatus {
  PAID = "PAID",
  NOT_PAID = "NOT_PAID",
}

@ObjectType()
export class Item{
  @Field()
  description: string;

  @Field()
  rate: number;

  @Field()
  quantity: number 
}

@ObjectType()
@Entity()
export class ResourceModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  resourceNo: string;

  @Field()
  @Column('text')
  description: string;

  @Field(type => ActivityModel)
  @ManyToOne(type => ActivityModel, activity => activity.resources)
  activity: ActivityModel;

  @Field()
  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.NOT_PAID
  })
  paymentStatus: PaymentStatus;

  @Field()
  @Column({
    type: "enum",
    enum: Currency,
    default: Currency.USD
  })
  currency: Currency;

  @Field()
  @Column()
  taxRate: number;

  @Field()
  @Column()
  issueDate: string;

  @Field()
  @Column()
  dueDate: string;

  @Field()
  @Column('text')
  note: string;

  @Field( type => [Item])
  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  items: Item[];

  @Column()
  @Field()
  taxAmount: number;

  @Column()
  @Field()
  subTotal: number;

  @Column()
  @Field()
  total: string;

  @Column({
    default: 0
  })
  @Field()
  amountPaid: number;

  @Column()
  @Field()
  outstandingBalance: number;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}