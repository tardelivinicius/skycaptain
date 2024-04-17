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
    "levelId" INTEGER,
    "first_access" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "users_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "user_preferences" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "user_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("createdAt", "email", "email_verified", "id", "image", "levelId", "name", "password", "preferenceId", "updatedAt", "username") SELECT "createdAt", "email", "email_verified", "id", "image", "levelId", "name", "password", "preferenceId", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_preferenceId_key" ON "users"("preferenceId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
