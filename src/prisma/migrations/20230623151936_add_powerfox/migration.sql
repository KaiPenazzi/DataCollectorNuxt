-- CreateTable
CREATE TABLE "PowerfoxData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "watt" REAL,
    "timestamp" DATETIME,
    "powerfoxid" INTEGER,
    CONSTRAINT "PowerfoxData_powerfoxid_fkey" FOREIGN KEY ("powerfoxid") REFERENCES "Powerfox" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Powerfox" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "auth" TEXT,
    "userid" INTEGER,
    CONSTRAINT "Powerfox_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
