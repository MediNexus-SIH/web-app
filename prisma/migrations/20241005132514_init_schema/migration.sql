-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'SUCCESS', 'CANCELLED');

-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "pincode" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "admin_name" TEXT NOT NULL,
    "admin_email" TEXT NOT NULL,
    "security_question" TEXT NOT NULL,
    "security_answer" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "hod_name" TEXT NOT NULL,
    "hod_email" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalInventory" (
    "id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "batch_number" TEXT NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "MedicalInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expected_delivery_date" TIMESTAMP(3),
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "total_amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "medical_inventory_id" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockReplenishmentLog" (
    "replenishment_id" TEXT NOT NULL,
    "medical_inventory_id" TEXT NOT NULL,
    "replenishment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity_replenished" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_status" BOOLEAN NOT NULL,

    CONSTRAINT "StockReplenishmentLog_pkey" PRIMARY KEY ("replenishment_id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "description" TEXT,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "ResourceSharing" (
    "sharing_id" TEXT NOT NULL,
    "donor_hospital_id" TEXT NOT NULL,
    "receiver_hospital_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "quantity_shared" INTEGER NOT NULL,
    "sharing_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResourceSharing_pkey" PRIMARY KEY ("sharing_id")
);

-- CreateTable
CREATE TABLE "BloodBank" (
    "blood_bank_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,
    "quantity_in_stock" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BloodBank_pkey" PRIMARY KEY ("blood_bank_id")
);

-- CreateTable
CREATE TABLE "Vendors" (
    "vendor_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vendors_pkey" PRIMARY KEY ("vendor_id")
);

-- CreateTable
CREATE TABLE "VendorOrders" (
    "order_id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "quantity_ordered" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "VendorOrders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "UnifiedInventorySupplyDemand" (
    "id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "batch_number" TEXT NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "quantity_in_stock" INTEGER NOT NULL,
    "reorder_level" INTEGER NOT NULL,
    "quantity_in_transit" INTEGER NOT NULL,
    "dispatch_date" TIMESTAMP(3) NOT NULL,
    "expected_delivery_date" TIMESTAMP(3) NOT NULL,
    "average_monthly_usage" INTEGER NOT NULL,
    "predicted_demand" INTEGER NOT NULL,
    "last_order_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnifiedInventorySupplyDemand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_contact_number_key" ON "Hospital"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_admin_email_key" ON "Hospital"("admin_email");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_hod_email_key" ON "Departments"("hod_email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendors_contact_number_key" ON "Vendors"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "Vendors_username_key" ON "Vendors"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Vendors_email_key" ON "Vendors"("email");

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalInventory" ADD CONSTRAINT "MedicalInventory_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalInventory" ADD CONSTRAINT "MedicalInventory_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalInventory" ADD CONSTRAINT "MedicalInventory_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_medical_inventory_id_fkey" FOREIGN KEY ("medical_inventory_id") REFERENCES "MedicalInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockReplenishmentLog" ADD CONSTRAINT "StockReplenishmentLog_medical_inventory_id_fkey" FOREIGN KEY ("medical_inventory_id") REFERENCES "MedicalInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceSharing" ADD CONSTRAINT "ResourceSharing_donor_hospital_id_fkey" FOREIGN KEY ("donor_hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceSharing" ADD CONSTRAINT "ResourceSharing_receiver_hospital_id_fkey" FOREIGN KEY ("receiver_hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodBank" ADD CONSTRAINT "BloodBank_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOrders" ADD CONSTRAINT "VendorOrders_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOrders" ADD CONSTRAINT "VendorOrders_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnifiedInventorySupplyDemand" ADD CONSTRAINT "UnifiedInventorySupplyDemand_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnifiedInventorySupplyDemand" ADD CONSTRAINT "UnifiedInventorySupplyDemand_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
