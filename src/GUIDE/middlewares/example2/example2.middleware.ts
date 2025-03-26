import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class Example2Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException("No autorizado", HttpStatus.UNAUTHORIZED);
    }

    if (authorization !== "1234") {
      throw new HttpException("Prohibido", HttpStatus.FORBIDDEN);
    }

    console.log("Esto es el middleware 2");

    next();
  }
}
