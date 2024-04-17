-- CreateTable
CREATE TABLE "user_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "totalXP" INTEGER NOT NULL,
    "multiplierFactor" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "user_level_id" INTEGER,
    CONSTRAINT "users_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "user_preferences" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_user_level_id_fkey" FOREIGN KEY ("user_level_id") REFERENCES "user_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("createdAt", "email", "email_verified", "id", "image", "name", "password", "preferenceId", "updatedAt", "username") SELECT "createdAt", "email", "email_verified", "id", "image", "name", "password", "preferenceId", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_preferenceId_key" ON "users"("preferenceId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
