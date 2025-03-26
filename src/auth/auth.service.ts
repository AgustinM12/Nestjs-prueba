import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async login(id) {

    }

    // ahi va el dto
    async validateGoogleUser(googleUser: any) {

        //buscar el usuario en la db e incertar si no esta
        const user = 0

    }
}
