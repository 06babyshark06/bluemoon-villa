-- DropForeignKey
ALTER TABLE `member` DROP FOREIGN KEY `Member_homeId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_billId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_homeId_fkey`;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
