// userResolvers.ts
import { Prisma, UserRole } from '@prisma/client';
import Context from '../context';

const userResolvers = {
  Query: {
    users: async (_parent: undefined, args: { archived?: boolean }, { prisma }: Context) => {
      const where = args.archived !== undefined ? { archived: args.archived } : {};
      return prisma.user.findMany({ where });
    },
    user: async (_parent: undefined, args: { id: string }, { prisma }: Context) => {
      return prisma.user.findUnique({ where: { id: args.id } });
    },
  },
  Mutation: {
    createUser: async (_parent: undefined, args: { data: Prisma.UserCreateInput }, { prisma }: Context) => {
      const { data } = args;
      return prisma.user.create({ data });
    },
    updateUser: async (_parent: undefined, args: { id: string; data: Prisma.UserUpdateInput }, { prisma }: Context) => {
      const { id, data } = args;
      return prisma.user.update({ where: { id }, data });
    },
    deleteUser: async (_parent: undefined, args: { id: string }, { prisma }: Context) => {
      const { id } = args;
      return prisma.user.delete({ where: { id } });
    },
  },
  User: {
    ratings: async (parent: { id: string }, _args: undefined, { prisma }: Context) => {
      return prisma.rating.findMany({ where: { userId: parent.id } });
    },
    transactions: async (parent: { id: string }, _args: undefined, { prisma }: Context) => {
      return prisma.transaction.findMany({ where: { buyerId: parent.id } });
    },
    soldTransactions: async (parent: { id: string }, _args: undefined, { prisma }: Context) => {
      return prisma.transaction.findMany({ where: { sellerId: parent.id } });
    },
    accounts: async (parent: { id: string }, _args: undefined, { prisma }: Context) => {
      return prisma.account.findMany({ where: { userId: parent.id } });
    },
    role: async (parent: { role: UserRole }) => parent.role,
    archived: async (parent: { archived: boolean }) => parent.archived,
  },
};

export default userResolvers;