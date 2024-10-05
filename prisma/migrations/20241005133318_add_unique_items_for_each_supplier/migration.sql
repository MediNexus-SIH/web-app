/*
  Warnings:

  - A unique constraint covering the columns `[item_name,supplier]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_item_name_supplier_key" ON "Item"("item_name", "supplier");
