-- CreateTable
CREATE TABLE "Airport" (
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
CREATE TABLE "user_airport_hubs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "airportId" INTEGER NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "_UserToUserAirportHub" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserToUserAirportHub_A_fkey" FOREIGN KEY ("A") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserToUserAirportHub_B_fkey" FOREIGN KEY ("B") REFERENCES "user_airport_hubs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AirportToUserAirportHub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AirportToUserAirportHub_A_fkey" FOREIGN KEY ("A") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AirportToUserAirportHub_B_fkey" FOREIGN KEY ("B") REFERENCES "user_airport_hubs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserAirportHub_AB_unique" ON "_UserToUserAirportHub"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserAirportHub_B_index" ON "_UserToUserAirportHub"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AirportToUserAirportHub_AB_unique" ON "_AirportToUserAirportHub"("A", "B");

-- CreateIndex
CREATE INDEX "_AirportToUserAirportHub_B_index" ON "_AirportToUserAirportHub"("B");
