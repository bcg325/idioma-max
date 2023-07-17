-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currentCourseId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_currentCourseId_fkey" FOREIGN KEY ("currentCourseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
