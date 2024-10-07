import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateTransactionDto } from './transaction.dto';
import { TransactionsService } from './transactions.service';
import { Request } from 'express';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.transactionsService.createTransaction(
      createTransactionDto,
      userId,
    );
  }

  @Get()
  async findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: Partial<CreateTransactionDto>,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.transactionsService.update(id, updateTransactionDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.sub;
    return this.transactionsService.remove(id, userId);
  }
}
