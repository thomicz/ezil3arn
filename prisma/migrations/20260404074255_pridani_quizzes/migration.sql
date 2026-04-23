-- AlterTable
ALTER TABLE "User" ADD COLUMN     "quizzes" JSONB NOT NULL DEFAULT '[]';
