import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const jwtSecret = this.configService.get<
      jwt.Secret | jwt.GetPublicKeyOrSecret
    >('SECRET_KEY');
    if (!jwtSecret) {
      throw new Error('SECRET_KEY não está definido nas variaveis de ambiente');
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded; // Armazenando os dados do usuário no objeto da requisição
      console.log(req.user);
      next();
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
