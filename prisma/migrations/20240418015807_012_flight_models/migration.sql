-- CreateTable
CREATE TABLE "user_flights" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "flight_uuid" TEXT NOT NULL,
    "flight_code" TEXT NOT NULL,
    "passengers" INTEGER NOT NULL DEFAULT 0,
    "payment" REAL NOT NULL DEFAULT 0.00,
    "distance" REAL NOT NULL DEFAULT 0.00,
    "xp" REAL NOT NULL DEFAULT 0.00,
    "fuel" REAL NOT NULL DEFAULT 0.00,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departureId" INTEGER NOT NULL,
    "arrivalId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "aircraftId" INTEGER NOT NULL,
    CONSTRAINT "user_flights_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "airports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_flights_arrivalId_fkey" FOREIGN KEY ("arrivalId") REFERENCES "airports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_flights_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_flights_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "aircrafts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_flight_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type_slug" TEXT NOT NULL,
    "log" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userFlightId" INTEGER NOT NULL,
    CONSTRAINT "user_flight_logs_userFlightId_fkey" FOREIGN KEY ("userFlightId") REFERENCES "user_flights" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_complete_flights" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payment" REAL NOT NULL DEFAULT 0.00,
    "xp" REAL NOT NULL DEFAULT 0.00,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userFlightId" INTEGER NOT NULL,
    CONSTRAINT "user_complete_flights_userFlightId_fkey" FOREIGN KEY ("userFlightId") REFERENCES "user_flights" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "levelId" INTEGER,
    "first_access" BOOLEAN NOT NULL DEFAULT true,
    "status" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "users_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "user_preferences" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "user_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("createdAt", "email", "email_verified", "first_access", "id", "image", "levelId", "name", "password", "preferenceId", "updatedAt", "username") SELECT "createdAt", "email", "email_verified", "first_access", "id", "image", "levelId", "name", "password", "preferenceId", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_preferenceId_key" ON "users"("preferenceId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
