import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        ConfigModule.forFeature(googleOauthConfig)
    ],
    providers: [GoogleStrategy, AuthService],
    exports: [],
    controllers: [AuthController],
})
export class AuthModule { }
