import { ActivityModel } from '../activity/activity.model';
import { ActivityService } from './../activity/activity.service';
import { ResourceService } from './resource.service';
import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ResourceModel } from './resource.model';
import { CreateResourceDTO } from './resource.dto';

@Resolver(of => ResourceModel)
export class ResourceResolver {
  constructor(
    @Inject(ResourceService) private resourceService: ResourceService,
    @Inject(ActivityService) private activityService: ActivityService
  ) { }
  @Query(returns => ResourceModel)
  async resource(@Args('id') id: string): Promise<ResourceModel> {
    return await this.resourceService.findOne(id);
  }

  @ResolveField(returns => ActivityModel)
  async activity(@Parent() resource) {
    const { activity } = resource;
    return this.activityService.findOne(activity);
  }

  @Query(returns => [ResourceModel])
  async resources(): Promise<ResourceModel[]> {
    return await this.resourceService.findAll();
  }

  @Mutation(returns => ResourceModel)
  async createResource(
    @Args('resource') resource: CreateResourceDTO,
  ): Promise<ResourceModel> {
    return await this.resourceService.create(resource)
  }
}