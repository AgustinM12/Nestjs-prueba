import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryProvider, CloudinaryService],
  // exports: [CloudinaryProvider, CloudinaryService],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
