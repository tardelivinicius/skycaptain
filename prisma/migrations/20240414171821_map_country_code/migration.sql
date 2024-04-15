/*
  Warnings:

  - You are about to drop the column `countryCode` on the `user_preferences` table. All the data in the column will be lost.
  - Added the required column `country_code` to the `user_preferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_preferences" DROP COLUMN "countryCode",
ADD COLUMN     "country_code" TEXT NOT NULL;
