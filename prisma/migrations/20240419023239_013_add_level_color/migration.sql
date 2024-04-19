-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_levels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "total_xp" INTEGER NOT NULL,
    "multiplier_factor" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL DEFAULT 'bronze'
);
INSERT INTO "new_user_levels" ("id", "isActive", "multiplier_factor", "order", "title", "total_xp") SELECT "id", "isActive", "multiplier_factor", "order", "title", "total_xp" FROM "user_levels";
DROP TABLE "user_levels";
ALTER TABLE "new_user_levels" RENAME TO "user_levels";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
