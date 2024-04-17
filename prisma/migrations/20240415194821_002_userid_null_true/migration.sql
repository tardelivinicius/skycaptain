-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_preferences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT,
    "currency" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "country_code" TEXT NOT NULL
);
INSERT INTO "new_user_preferences" ("country_code", "currency", "id", "user_id", "weight") SELECT "country_code", "currency", "id", "user_id", "weight" FROM "user_preferences";
DROP TABLE "user_preferences";
ALTER TABLE "new_user_preferences" RENAME TO "user_preferences";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
