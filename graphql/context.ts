// graphql/context.ts
import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
}

export default Context;