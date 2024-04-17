-- CreateTable
CREATE TABLE "aircrafts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "iata_code" TEXT,
    "icao_code" TEXT
);

-- CreateTable
CREATE TABLE "user_aicrafts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "aircraftId" INTEGER NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "user_aicrafts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_aicrafts_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "aircrafts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
