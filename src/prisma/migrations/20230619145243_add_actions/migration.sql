-- CreateTable
CREATE TABLE "Action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "startAction" TEXT,
    "stopAction" TEXT,
    "state" BOOLEAN,
    "deviceid" INTEGER,
    "userid" INTEGER,
    CONSTRAINT "Action_deviceid_fkey" FOREIGN KEY ("deviceid") REFERENCES "Device" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Action_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
