/*
  Warnings:

  - A unique constraint covering the columns `[houseNumber,isLiving]` on the table `Home` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Home_houseNumber_isLiving_key` ON `Home`(`houseNumber`, `isLiving`);
