-- DropForeignKey
ALTER TABLE "Escrow" DROP CONSTRAINT "Escrow_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "EscrowTransaction" DROP CONSTRAINT "EscrowTransaction_escrowWalletId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "expirationDate" TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Escrow_transactionId_idx" ON "Escrow"("transactionId");

-- CreateIndex
CREATE INDEX "EscrowTransaction_escrowWalletId_idx" ON "EscrowTransaction"("escrowWalletId");

-- CreateIndex
CREATE INDEX "EscrowTransaction_relatedTransactionId_idx" ON "EscrowTransaction"("relatedTransactionId");

-- CreateIndex
CREATE INDEX "Rating_userId_idx" ON "Rating"("userId");

-- CreateIndex
CREATE INDEX "Transaction_buyerId_idx" ON "Transaction"("buyerId");

-- CreateIndex
CREATE INDEX "Transaction_sellerId_idx" ON "Transaction"("sellerId");

-- CreateIndex
CREATE INDEX "Transaction_status_idx" ON "Transaction"("status");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escrow" ADD CONSTRAINT "Escrow_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscrowTransaction" ADD CONSTRAINT "EscrowTransaction_escrowWalletId_fkey" FOREIGN KEY ("escrowWalletId") REFERENCES "EscrowWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
