/*
  Warnings:

  - Added the required column `locale` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "locale" TEXT NOT NULL;
