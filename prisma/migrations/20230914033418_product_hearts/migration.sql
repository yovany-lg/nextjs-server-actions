-- CreateTable
CREATE TABLE "ProductHearts" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductHearts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductHearts" ADD CONSTRAINT "ProductHearts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
