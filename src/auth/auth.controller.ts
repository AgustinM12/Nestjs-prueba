import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // @Public()
    @UseGuards(GoogleAuthGuard)
    @Get("google/login")
    googleLogin() { }

    @UseGuards(GoogleAuthGuard)
    @Get("google/callback")
    async googleCallback(@Req() req, @Res() res) {
        const resp = await this.authService.login(req.user.id)

        res.redirect(`http://localhost:5173?token=${resp.accessToken}`)
    }
}
