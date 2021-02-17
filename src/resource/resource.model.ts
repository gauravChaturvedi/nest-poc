
import { ActivityModel } from './../activity/activity.model';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ChildEntity } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class ResourceModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column('text', { nullable: false })
  name: string;
  @Field()
  @Column({ length: 500, nullable: false })
  url: string;
  @Field(type => ActivityModel)
  @ManyToOne(type => ActivityModel, activity => activity.resources)
  activity: ActivityModel;
  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;
  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}