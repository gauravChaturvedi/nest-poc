import { ResourceModule } from '../resource/resource.module';
import { ActivityModel } from './activity.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';


@Module({
  imports: [forwardRef(() => ResourceModule), TypeOrmModule.forFeature([ActivityModel])],
  providers: [ActivityService, ActivityResolver],
  exports: [ActivityService]
})
export class ActivityModule {}
