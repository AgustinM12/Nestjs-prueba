import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { TaskModule } from "./tasks/tasks.module"
import { UsersModule } from './users (legacy)/users.module';
import { HelloService } from './GUIDE/hello.service';
import { HelloModule } from './GUIDE/hello.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesModule } from './modules/heroes/heroes.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/") , TaskModule, UsersModule, HelloModule, HeroesModule,ConfigModule.forRoot({isGlobal:true}), CloudinaryModule, AuthModule, UserModule],
  providers: [HelloService],
})
export class AppModule { }
