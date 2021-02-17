import { ActivityModule } from './../activity/activity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceResolver } from './resource.resolver';
import { ResourceModel } from './resource.model';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceModel]), forwardRef(() => ActivityModule)],
  providers: [ResourceService, ResourceResolver],
  exports: [ResourceService]
})
export class ResourceModule {}
