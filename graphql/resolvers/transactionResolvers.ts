// transactionResolvers.ts
import { Prisma, TransactionStatus } from '@prisma/client';
import Context from '../context';

type WhereTransactionInput = {
    buyerId?: string;
    status?: TransactionStatus;
  };
  

const transactionResolvers = {
  Query: {
    transactions: async (_parent: undefined, args: { userId?: string; status?: TransactionStatus }, { prisma }: Context) => {
        const where: WhereTransactionInput = {};
        if (args.userId) where.buyerId = args.userId;
        if (args.status) where.status = args.status;
        return prisma.transaction.findMany({ where });
      },
  },
  Mutation: {
    createTransaction: async (_parent: undefined, args: { data: Prisma.TransactionCreateInput }, { prisma }: Context) => {
      const { data } = args;
      return prisma.transaction.create({ data });
    },
    updateTransaction: async (_parent: undefined, args: { id: string; data: Prisma.TransactionUpdateInput }, { prisma }: Context) => {
      const { id, data } = args;
      return prisma.transaction.update({ where: { id }, data });
    },
  },
  Transaction: {
    buyer: async (parent: { buyerId: string }, _args: undefined, { prisma }: Context) => {
      return prisma.user.findUnique({ where: { id: parent.buyerId } });
    },
    seller: async (parent: { sellerId: string }, _args: undefined, { prisma }: Context) => {
      return prisma.user.findUnique({ where: { id: parent.sellerId } });
    },
    status: async (parent: { status: TransactionStatus }) => parent.status,
  },
};

export default transactionResolvers;