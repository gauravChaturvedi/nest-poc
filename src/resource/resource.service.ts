import { ActivityService } from './../activity/activity.service';
import { ResourceModel } from './resource.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDTO } from './resource.dto';

@Injectable()
export class ResourceService {

  constructor(
    @InjectRepository(ResourceModel)
    private resourceRepository: Repository<ResourceModel>,
    private activityService: ActivityService
  ) { }

 async create(resource: CreateResourceDTO): Promise<ResourceModel> {
    const activity = await this.activityService.findOne(resource.activity);
    const subTotal = resource.items.reduce((acc, curr) => {
      return acc + Number((curr.rate * curr.quantity).toFixed(2))
    }, 0)

    const taxAmount = subTotal * Number((resource.taxRate / 100).toFixed(2));
    const total = subTotal + taxAmount;
    const outstandingBalance = total;
    return this.resourceRepository.save({
      ...resource,
      activity,
      subTotal,
      taxAmount,
      total,
      outstandingBalance
    } as any);

  }

  findAll(): Promise<ResourceModel[]> {
    return this.resourceRepository.find();
  }

  findByActivity(id: string): Promise<ResourceModel[]>{
    return this.resourceRepository.createQueryBuilder("resource")
    .where("resource.activity = :id", { id })
    .getMany();
  }

  findOne(id: string): Promise<ResourceModel> {
    return this.resourceRepository.findOne(id);
  }
}
