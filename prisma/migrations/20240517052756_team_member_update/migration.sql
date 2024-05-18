/*
  Warnings:

  - You are about to drop the column `ci` on the `TeamMembers` table. All the data in the column will be lost.
  - You are about to drop the column `direction` on the `TeamMembers` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `TeamMembers` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TeamMembers` table. All the data in the column will be lost.
  - Added the required column `address` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TeamMembers` DROP COLUMN `ci`,
    DROP COLUMN `direction`,
    DROP COLUMN `hours`,
    DROP COLUMN `status`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
