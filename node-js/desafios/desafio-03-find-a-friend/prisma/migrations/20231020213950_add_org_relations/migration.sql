/*
  Warnings:

  - You are about to drop the column `description` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `about` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requests` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "description",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT,
ADD COLUMN     "requests" JSONB NOT NULL;

-- DropTable
DROP TABLE "requests";

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
