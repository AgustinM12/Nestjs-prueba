import { Module } from '@nestjs/common';
import { TaskModule } from "./tasks/tasks.module"
import { UsersModule } from './users/users.module';
import { HelloService } from './hello/hello.service';
import { HelloModule } from './hello/hello.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesModule } from './modules/heroes/heroes.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/") , TaskModule, UsersModule, HelloModule, HeroesModule],
  providers: [HelloService],
})
export class AppModule { }
