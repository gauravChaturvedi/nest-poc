import { Injectable } from '@nestjs/common';
import { ActivityModel } from './activity.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityDTO } from './activity.dto';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(ActivityModel)
        private activityRepository: Repository<ActivityModel>,
      ) {}

      create(details: ActivityDTO): Promise<ActivityModel>{
          return this.activityRepository.save(details);
      }
    
      findAll(): Promise<ActivityModel[]> {
        return this.activityRepository.find();
      }
    
      findOne(id: string): Promise<ActivityModel> {
        return this.activityRepository.findOne(id);
      }
}
