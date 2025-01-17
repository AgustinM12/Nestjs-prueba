import { Module } from '@nestjs/common';
import { TaskModule } from "./tasks/tasks.module"
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TaskModule, ProjectsModule, UsersModule],
})
export class AppModule { }
