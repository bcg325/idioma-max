/*
  Warnings:

  - A unique constraint covering the columns `[lessonId,position]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unitId,position]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,position]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CardSet" DROP CONSTRAINT "CardSet_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_fromLanguageId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_learningLanguageId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourseProgress" DROP CONSTRAINT "UserCourseProgress_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourseProgress" DROP CONSTRAINT "UserCourseProgress_lessonId_fkey";

-- DropIndex
DROP INDEX "Exercise_position_key";

-- DropIndex
DROP INDEX "Lesson_position_key";

-- DropIndex
DROP INDEX "Unit_position_key";

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_lessonId_position_key" ON "Exercise"("lessonId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_unitId_position_key" ON "Lesson"("unitId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_courseId_position_key" ON "Unit"("courseId", "position");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_fromLanguageId_fkey" FOREIGN KEY ("fromLanguageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_learningLanguageId_fkey" FOREIGN KEY ("learningLanguageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseProgress" ADD CONSTRAINT "UserCourseProgress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseProgress" ADD CONSTRAINT "UserCourseProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardSet" ADD CONSTRAINT "CardSet_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
