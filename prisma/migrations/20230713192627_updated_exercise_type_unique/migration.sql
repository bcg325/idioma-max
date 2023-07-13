/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `ExerciseType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExerciseType_type_key" ON "ExerciseType"("type");
