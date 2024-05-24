// ratingResolvers.ts
import { Prisma } from '@prisma/client';
import Context from '../context';

const ratingResolvers = {
  Query: {
    ratings: async (_parent: undefined, args: { userId?: string }, { prisma }: Context) => {
      const where = args.userId ? { userId: args.userId } : {};
      return prisma.rating.findMany({ where });
    },
  },
  Mutation: {
    createRating: async (_parent: undefined, args: { data: Prisma.RatingCreateInput }, { prisma }: Context) => {
      const { data } = args;
      return prisma.rating.create({ data });
    },
    updateRating: async (_parent: undefined, args: { id: string; data: Prisma.RatingUpdateInput }, { prisma }: Context) => {
      const { id, data } = args;
      return prisma.rating.update({ where: { id }, data });
    },
  },
  Rating: {
    user: async (parent: { userId: string }, _args: undefined, { prisma }: Context) => {
      return prisma.user.findUnique({ where: { id: parent.userId } });
    },
  },
};

export default ratingResolvers;