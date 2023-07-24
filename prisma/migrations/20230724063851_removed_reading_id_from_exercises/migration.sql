/*
  Warnings:

  - You are about to drop the column `readingPageId` on the `Exercise` table. All the data in the column will be lost.
  - Made the column `term` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `answer` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `optionsLang` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `termLang` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Exercise_lessonId_readingPageId_key";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "readingPageId",
ALTER COLUMN "term" SET NOT NULL,
ALTER COLUMN "answer" SET NOT NULL,
ALTER COLUMN "optionsLang" SET NOT NULL,
ALTER COLUMN "termLang" SET NOT NULL;
