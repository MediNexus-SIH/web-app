-- CreateTable
CREATE TABLE "SystemCheck" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospital_id" TEXT NOT NULL,

    CONSTRAINT "SystemCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SystemCheck_type_created_at_idx" ON "SystemCheck"("type", "created_at");

-- CreateIndex
CREATE INDEX "SystemCheck_hospital_id_type_created_at_idx" ON "SystemCheck"("hospital_id", "type", "created_at");

-- AddForeignKey
ALTER TABLE "SystemCheck" ADD CONSTRAINT "SystemCheck_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
