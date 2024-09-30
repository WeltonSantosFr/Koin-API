/*
  Warnings:

  - You are about to drop the column `userId` on the `Debt` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `InvestmentDetail` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Debt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `InvestmentDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Debt" DROP CONSTRAINT "Debt_userId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_userId_fkey";

-- DropForeignKey
ALTER TABLE "InvestmentDetail" DROP CONSTRAINT "InvestmentDetail_userId_fkey";

-- DropIndex
DROP INDEX "Debt_userId_idx";

-- DropIndex
DROP INDEX "Investment_userId_idx";

-- DropIndex
DROP INDEX "InvestmentDetail_userId_idx";

-- AlterTable
ALTER TABLE "Debt" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Investment" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InvestmentDetail" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Debt_user_id_idx" ON "Debt"("user_id");

-- CreateIndex
CREATE INDEX "Investment_user_id_idx" ON "Investment"("user_id");

-- CreateIndex
CREATE INDEX "InvestmentDetail_user_id_idx" ON "InvestmentDetail"("user_id");

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentDetail" ADD CONSTRAINT "InvestmentDetail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
