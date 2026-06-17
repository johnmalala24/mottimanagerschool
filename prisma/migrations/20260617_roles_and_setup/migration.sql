-- Role structure & school setup migration
-- Run: npx prisma db push  (or apply manually)

ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'DEPUTY_ADMIN';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'ICT_ADMIN';

ALTER TABLE "SchoolSettings" ADD COLUMN IF NOT EXISTS "setupCompleted" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "SchoolSettings" ADD COLUMN IF NOT EXISTS "whatsappEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "SchoolSettings" ADD COLUMN IF NOT EXISTS "hostelEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "SchoolSettings" ADD COLUMN IF NOT EXISTS "payrollEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "SchoolSettings" ADD COLUMN IF NOT EXISTS "favicon" TEXT;

ALTER TABLE "Teacher" ADD COLUMN IF NOT EXISTS "isClassTeacher" BOOLEAN NOT NULL DEFAULT false;
