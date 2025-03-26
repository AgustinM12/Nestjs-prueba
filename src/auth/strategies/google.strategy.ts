import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth.config";
import { ConfigType } from "@nestjs/config";
import { Verify } from "crypto";
import { AuthService } from "../auth.service";

// https://www.youtube.com/watch?v=-pbT0uKRWX8 min 10:25
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject(googleOauthConfig.KEY)
        private googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private authService: AuthService,
    ) {
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ["email", "profile"],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback): Promise<any> {

        // const { name, email } = profile

        console.log({ profile });


        // ! NO USAR LOS TOKENS QUE TRAE GOOGLE, CREAR LOS PROPIOS
        const paylaod = {
            profile,
            accessToken
        }

        // luego se tiene que devolver esto
        const user = await this.authService.validateGoogleUser({
            email: profile.emails[0].value,
            fisrtName: profile.name.givenName,
            lastname: profile.familyName,
            avatarUrl: profile.photos[0].value,
        })

        done(null, paylaod)
    }

}