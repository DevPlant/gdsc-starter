import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseInit } from '../services/firebase-init.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly admin: FirebaseInit) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.admin.setup();
    if (!context.getArgs()[0]?.headers?.authorization) {
      throw new UnauthorizedException();
    }
    const idToken = context.getArgs()[0]?.headers?.authorization.split(' ')[1];

    try {
      const claims = await app.auth().verifyIdToken(idToken);
      console.log(claims);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
