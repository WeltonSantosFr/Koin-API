/*
  Warnings:

  - You are about to drop the column `is_recurring` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence_period` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "is_recurring",
DROP COLUMN "recurrence_period",
DROP COLUMN "status";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
