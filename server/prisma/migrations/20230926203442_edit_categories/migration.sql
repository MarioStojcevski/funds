/*
  Warnings:

  - You are about to drop the column `description` on the `ExpenseCategory` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `IncomeCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExpenseCategory" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "IncomeCategory" DROP COLUMN "description";
