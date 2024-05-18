// graphql/context.ts
import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
  // You can add other context properties as needed, e.g., user, token, etc.
}

export default Context;