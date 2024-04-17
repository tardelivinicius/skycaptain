/*
  Warnings:

  - You are about to drop the `Airport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Airport";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "airports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "iata_code" TEXT,
    "icao_code" TEXT,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "country_code" TEXT NOT NULL,
    "is_international" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "user_airport_licenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "airportId" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "user_airport_licenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_airport_licenses_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "airports" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_airport_hubs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "airportId" INTEGER NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "user_airport_hubs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_airport_hubs_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "airports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_airport_hubs" ("airportId", "id", "is_main", "user_id") SELECT "airportId", "id", "is_main", "user_id" FROM "user_airport_hubs";
DROP TABLE "user_airport_hubs";
ALTER TABLE "new_user_airport_hubs" RENAME TO "user_airport_hubs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "user_airport_licenses_user_id_airportId_key" ON "user_airport_licenses"("user_id", "airportId");
