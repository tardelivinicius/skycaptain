/*
  Warnings:

  - A unique constraint covering the columns `[preferenceId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "preferenceId" INTEGER;

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_preferenceId_key" ON "users"("preferenceId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "user_preferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
