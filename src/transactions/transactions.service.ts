import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTransactionDto } from './transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto, userId: string) {
    return this.prisma.transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        category: data.category,
        date: data.date,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany();
  }

  async findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Partial<CreateTransactionDto>,
    userId: string,
  ) {
    return this.prisma.transaction.update({
      where: { id, user_id: userId },
      data,
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.transaction.delete({
      where: { id, user_id: userId },
    });
  }
}
