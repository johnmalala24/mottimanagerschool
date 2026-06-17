-- Exam workflow, assignments, CBE curriculum, email, promotion

CREATE TYPE "ExamStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'PROCESSED', 'PUBLISHED');
CREATE TYPE "SubmissionStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'GRADED', 'LATE');

ALTER TABLE "SchoolSettings" ADD COLUMN IF NOT EXISTS "emailEnabled" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "Announcement" ADD COLUMN IF NOT EXISTS "sendEmail" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Announcement" ADD COLUMN IF NOT EXISTS "emailsSent" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "Assignment" ADD COLUMN IF NOT EXISTS "maxScore" INTEGER NOT NULL DEFAULT 100;

ALTER TABLE "Grade" ADD COLUMN IF NOT EXISTS "examId" TEXT;
ALTER TABLE "Grade" ADD COLUMN IF NOT EXISTS "position" INTEGER;
ALTER TABLE "Grade" ADD COLUMN IF NOT EXISTS "teacherComment" TEXT;
ALTER TABLE "Grade" ADD COLUMN IF NOT EXISTS "isPublished" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "maxMarks" INTEGER NOT NULL DEFAULT 100,
    "status" "ExamStatus" NOT NULL DEFAULT 'DRAFT',
    "subjectIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "publishedAt" TIMESTAMP(3),
    "processedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AssignmentSubmission" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "content" TEXT,
    "fileUrl" TEXT,
    "score" DOUBLE PRECISION,
    "feedback" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'SUBMITTED',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gradedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AssignmentSubmission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CbeLearningArea" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "gradeLevel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CbeLearningArea_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CbeStrand" (
    "id" TEXT NOT NULL,
    "learningAreaId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CbeStrand_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CbeCompetency" (
    "id" TEXT NOT NULL,
    "strandId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CbeCompetency_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PromotionBatch" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "fromAcademicYear" TEXT NOT NULL,
    "toAcademicYear" TEXT NOT NULL,
    "promotedCount" INTEGER NOT NULL DEFAULT 0,
    "repeatedCount" INTEGER NOT NULL DEFAULT 0,
    "graduatedCount" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PromotionBatch_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EmailLog" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT,
    "to" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SENT',
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AssignmentSubmission_assignmentId_studentId_key" ON "AssignmentSubmission"("assignmentId", "studentId");
CREATE UNIQUE INDEX "CbeLearningArea_schoolId_code_key" ON "CbeLearningArea"("schoolId", "code");
CREATE UNIQUE INDEX "CbeStrand_learningAreaId_code_key" ON "CbeStrand"("learningAreaId", "code");
CREATE UNIQUE INDEX "CbeCompetency_strandId_code_key" ON "CbeCompetency"("strandId", "code");

CREATE INDEX "Exam_schoolId_idx" ON "Exam"("schoolId");
CREATE INDEX "Exam_classId_idx" ON "Exam"("classId");
CREATE INDEX "Exam_status_idx" ON "Exam"("status");
CREATE INDEX "AssignmentSubmission_schoolId_idx" ON "AssignmentSubmission"("schoolId");
CREATE INDEX "AssignmentSubmission_studentId_idx" ON "AssignmentSubmission"("studentId");
CREATE INDEX "CbeLearningArea_schoolId_idx" ON "CbeLearningArea"("schoolId");
CREATE INDEX "PromotionBatch_schoolId_idx" ON "PromotionBatch"("schoolId");
CREATE INDEX "EmailLog_schoolId_idx" ON "EmailLog"("schoolId");
CREATE INDEX "EmailLog_createdAt_idx" ON "EmailLog"("createdAt");
CREATE INDEX "Grade_examId_idx" ON "Grade"("examId");

ALTER TABLE "Exam" ADD CONSTRAINT "Exam_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CbeLearningArea" ADD CONSTRAINT "CbeLearningArea_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CbeStrand" ADD CONSTRAINT "CbeStrand_learningAreaId_fkey" FOREIGN KEY ("learningAreaId") REFERENCES "CbeLearningArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CbeCompetency" ADD CONSTRAINT "CbeCompetency_strandId_fkey" FOREIGN KEY ("strandId") REFERENCES "CbeStrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PromotionBatch" ADD CONSTRAINT "PromotionBatch_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
