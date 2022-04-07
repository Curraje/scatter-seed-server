/*
  Warnings:

  - A unique constraint covering the columns `[bedId,plantId]` on the table `BedPlant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BedPlant_bedId_plantId_key" ON "BedPlant"("bedId", "plantId");
