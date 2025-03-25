import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { TaskModule } from "./tasks/tasks.module"
import { UsersModule } from './users/users.module';
import { HelloService } from './hello/hello.service';
import { HelloModule } from './hello/hello.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesModule } from './modules/heroes/heroes.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/") , TaskModule, UsersModule, HelloModule, HeroesModule,ConfigModule.forRoot({isGlobal:true}), CloudinaryModule, AuthModule],
  providers: [HelloService],
})
export class AppModule { }
