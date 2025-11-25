-- DropIndex
DROP INDEX "Admin_email_idx";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "color" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "popular" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oldPrice" DOUBLE PRECISION,
ADD COLUMN     "shortDesc" VARCHAR(255);

-- CreateIndex
CREATE INDEX "Category_popular_idx" ON "Category"("popular");

-- CreateIndex
CREATE INDEX "Product_isNew_idx" ON "Product"("isNew");
