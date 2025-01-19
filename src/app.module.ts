import { Module } from '@nestjs/common';
import { TaskModule } from "./tasks/tasks.module"
import { UsersModule } from './users/users.module';
import { HelloService } from './hello/hello.service';
import { HelloModule } from './hello/hello.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/") , TaskModule, UsersModule, HelloModule],
  providers: [HelloService],
})
export class AppModule { }
