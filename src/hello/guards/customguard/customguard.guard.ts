import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// los guards son funciones que se ejecutan antes de que se ejecute el metodo. sirven para proteger rutas

@Injectable()
export class CustomguardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest() as Request;

    if (!request.headers["authorization"]) {
      return false;
    }

    return true;

  }
}
