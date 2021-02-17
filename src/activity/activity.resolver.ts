import { ResourceModel } from '../resource/resource.model';

import { ResourceService } from '../resource/resource.service';
import { ActivityService } from './activity.service';
import { ActivityModel } from './activity.model';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

@Resolver(of => ActivityModel)
export class ActivityResolver {
  constructor(
    @Inject(ActivityService) private activityService: ActivityService,
    @Inject(ResourceService) private resourceService: ResourceService
  ) { }
  @Query(returns => ActivityModel)
  async activity(@Args('id') id: string): Promise<ActivityModel> {
    return await this.activityService.findOne(id);
  }

  @ResolveField(returns => [ResourceModel])
  async resources(@Parent() activity) {
    const { id } = activity;
    console.log(activity);
    return this.resourceService.findByActivity(id);
  }

  @Query(returns => [ActivityModel])
  async activitys(): Promise<ActivityModel[]> {
    return await this.activityService.findAll();
  }

  @Mutation(returns => ActivityModel)
  async createActivity(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('phone', { nullable: true }) phone: string,
    @Args('address', { nullable: true }) address: string,
  ): Promise<ActivityModel> {
    return await this.activityService.create({ name, email, phone, address })
  }
}