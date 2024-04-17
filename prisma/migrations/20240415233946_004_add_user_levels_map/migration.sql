/*
  Warnings:

  - You are about to drop the column `multiplierFactor` on the `user_levels` table. All the data in the column will be lost.
  - You are about to drop the column `totalXP` on the `user_levels` table. All the data in the column will be lost.
  - You are about to drop the column `user_level_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `total_xp` to the `user_levels` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "total_xp" INTEGER NOT NULL,
    "multiplier_factor" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_user_levels" ("id", "isActive", "order", "title") SELECT "id", "isActive", "order", "title" FROM "user_levels";
DROP TABLE "user_levels";
ALTER TABLE "new_user_levels" RENAME TO "user_levels";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "preferenceId" INTEGER,
    "levelId" INTEGER,
    CONSTRAINT "users_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "user_preferences" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "user_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("createdAt", "email", "email_verified", "id", "image", "name", "password", "preferenceId", "updatedAt", "username") SELECT "createdAt", "email", "email_verified", "id", "image", "name", "password", "preferenceId", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_preferenceId_key" ON "users"("preferenceId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
