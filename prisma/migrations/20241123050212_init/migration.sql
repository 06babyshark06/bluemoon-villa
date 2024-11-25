/*
  Warnings:

  - You are about to drop the column `houseId` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `houseId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the `house` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `homeId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `member` DROP FOREIGN KEY `Member_houseId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_houseId_fkey`;

-- AlterTable
ALTER TABLE `member` DROP COLUMN `houseId`,
    ADD COLUMN `homeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `houseId`,
    ADD COLUMN `homeId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `house`;

-- CreateTable
CREATE TABLE `Home` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `houseNumber` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `cars` INTEGER NOT NULL,
    `bikes` INTEGER NOT NULL,

    UNIQUE INDEX `Home_houseNumber_key`(`houseNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
