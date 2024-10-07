// @types/express.d.ts
import { User } from '.src/users/user.dto.ts'; // Ajuste o caminho conforme necessário

declare module 'express' {
  export interface Request {
    user?: User; // Altere o tipo 'User' para o tipo que representa o usuário em seu projeto
  }
}
