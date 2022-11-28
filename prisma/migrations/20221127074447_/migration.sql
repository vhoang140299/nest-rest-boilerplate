-- AlterTable
ALTER TABLE "users" ADD COLUMN     "refreshToken" TEXT;

-- CreateTable
CREATE TABLE "codes" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "codes_userId_key" ON "codes"("userId");

-- AddForeignKey
ALTER TABLE "codes" ADD CONSTRAINT "codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
