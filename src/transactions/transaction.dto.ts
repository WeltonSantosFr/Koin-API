export class CreateTransactionDto {
  userId: string;
  type: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
}
