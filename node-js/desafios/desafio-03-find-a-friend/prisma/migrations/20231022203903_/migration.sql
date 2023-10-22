/*
  Warnings:

  - The `requests` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "requests",
ADD COLUMN     "requests" TEXT[];
