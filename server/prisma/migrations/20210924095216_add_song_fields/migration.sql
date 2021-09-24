-- CreateEnum
CREATE TYPE "Tempo" AS ENUM ('FAST', 'MEDIUM', 'SLOW');

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "alternativeRange" INTEGER,
ADD COLUMN     "range" INTEGER,
ADD COLUMN     "tempo" "Tempo";
