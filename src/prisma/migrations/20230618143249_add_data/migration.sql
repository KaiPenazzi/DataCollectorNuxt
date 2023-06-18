-- CreateTable
CREATE TABLE "data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "collectedDate" DATETIME,
    "dataString" TEXT,
    "deviceid" INTEGER,
    CONSTRAINT "data_deviceid_fkey" FOREIGN KEY ("deviceid") REFERENCES "Device" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
