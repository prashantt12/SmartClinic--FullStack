/*
  Warnings:

  - You are about to drop the column `table` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `roomNumber` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `releasedAt` on the `RoomAssignment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tableName` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admission" DROP CONSTRAINT "Admission_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_doctorId_fkey";

-- DropIndex
DROP INDEX "Room_roomNumber_key";

-- AlterTable
ALTER TABLE "Admission" ALTER COLUMN "admittedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "scheduleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "table",
ADD COLUMN     "after" JSONB,
ADD COLUMN     "before" JSONB,
ADD COLUMN     "tableName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Billing" ALTER COLUMN "discount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomNumber",
DROP COLUMN "type",
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "roomType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoomAssignment" DROP COLUMN "releasedAt",
ADD COLUMN     "dischargedAt" TIMESTAMP(3),
ALTER COLUMN "assignedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "doctorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Admission_patientId_idx" ON "Admission"("patientId");

-- CreateIndex
CREATE INDEX "Appointment_patientId_idx" ON "Appointment"("patientId");

-- CreateIndex
CREATE INDEX "Appointment_doctorId_idx" ON "Appointment"("doctorId");

-- CreateIndex
CREATE INDEX "Appointment_scheduleId_idx" ON "Appointment"("scheduleId");

-- CreateIndex
CREATE INDEX "Billing_appointmentId_idx" ON "Billing"("appointmentId");

-- CreateIndex
CREATE INDEX "Billing_admissionId_idx" ON "Billing"("admissionId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_number_key" ON "Room"("number");

-- CreateIndex
CREATE INDEX "RoomAssignment_admissionId_idx" ON "RoomAssignment"("admissionId");

-- CreateIndex
CREATE INDEX "RoomAssignment_roomId_idx" ON "RoomAssignment"("roomId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
