/*
  Warnings:

  - You are about to drop the `_AirportToUserAirportHub` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToUserAirportHub` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `user_airport_hubs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AirportToUserAirportHub_B_index";

-- DropIndex
DROP INDEX "_AirportToUserAirportHub_AB_unique";

-- DropIndex
DROP INDEX "_UserToUserAirportHub_B_index";

-- DropIndex
DROP INDEX "_UserToUserAirportHub_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AirportToUserAirportHub";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserToUserAirportHub";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_airport_hubs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "airportId" INTEGER NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "user_airport_hubs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_airport_hubs_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_airport_hubs" ("airportId", "id", "is_main") SELECT "airportId", "id", "is_main" FROM "user_airport_hubs";
DROP TABLE "user_airport_hubs";
ALTER TABLE "new_user_airport_hubs" RENAME TO "user_airport_hubs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
