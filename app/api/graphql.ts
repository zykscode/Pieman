import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/schema';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

const cors = Cors();

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};