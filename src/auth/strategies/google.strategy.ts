import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth.config";
import { ConfigType } from "@nestjs/config";

// https://www.youtube.com/watch?v=-pbT0uKRWX8 min 10:25
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject(googleOauthConfig.KEY) private googleConfiguration: ConfigType<typeof googleOauthConfig>
    ) {
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ["email", "profile"],
        })
    }
}