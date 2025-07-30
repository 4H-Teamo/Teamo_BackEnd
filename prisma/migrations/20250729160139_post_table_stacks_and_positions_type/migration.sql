/*
  Warnings:

  - The `stacks` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `positions` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "stacks",
ADD COLUMN     "stacks" INTEGER[],
DROP COLUMN "positions",
ADD COLUMN     "positions" INTEGER[];
