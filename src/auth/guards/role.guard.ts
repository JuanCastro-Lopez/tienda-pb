import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user?: UsuarioEntity;
    }>();
    const userRole = request.user?.rol?.nombre;

    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        'No tienes el rol requerido para esta solicitud',
      );
    }

    return true;
  }
}
