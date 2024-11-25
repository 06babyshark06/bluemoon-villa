/*
  Warnings:

  - Added the required column `consumption` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bikes` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cars` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` ADD COLUMN `consumption` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `house` ADD COLUMN `bikes` INTEGER NOT NULL,
    ADD COLUMN `cars` INTEGER NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;
