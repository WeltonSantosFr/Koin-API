import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Verifica o código de erro do Prisma e define a resposta adequada
    switch (exception.code) {
      case 'P2002': // Violação de restrição única
        status = HttpStatus.CONFLICT;
        message = `Um registro com o mesmo valor já existe: ${exception.meta?.target}`;
        break;
      // Adicione outros códigos de erro do Prisma conforme necessário
      default:
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
