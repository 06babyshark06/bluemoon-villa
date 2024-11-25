/*
  Warnings:

  - Added the required column `leaveDate` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `member` ADD COLUMN `leaveDate` DATETIME(3) NOT NULL;
