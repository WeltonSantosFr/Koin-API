import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async loginUser(data: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      const isPasswordValid = bcrypt.compareSync(data.password, user.password);
      if (isPasswordValid) {
        const payload = { sub: user.id, email: user.email };

        return {
          access_token: this.jwtService.sign(payload, {
            expiresIn: '1d',
            issuer: 'Koin',
          }),
        };
      }
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateUser(id: string, data: Partial<CreateUserDto>) {
    return this.prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
