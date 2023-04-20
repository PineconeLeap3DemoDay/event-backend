const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone')
const connectDB = require('./db');
const dotenv = require('dotenv');
dotenv.config({
  path: '.env'
});
connectDB();

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    async hello() {
      return 'world'
    }
  },
};

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

  console.log(`🚀 Server listening at: ${url}`);
} start()
// module.exports.handler = startServerAndCreateLambdaHandler(
//   server,
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );
