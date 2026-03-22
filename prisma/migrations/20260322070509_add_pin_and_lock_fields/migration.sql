-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pin" TEXT;

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false;
