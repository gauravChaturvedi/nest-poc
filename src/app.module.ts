import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResourceModule } from './resource/resource.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    ResourceModule,
    ActivityModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'gaurav_chaturvedi',
      password: '',
      database: 'nest_poc',
      entities: ['dist/**/*.model.js'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
