import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema'
import connectDB from './db';
import {schema} from './resolver'
import dotenv from 'dotenv';
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
    schema
  });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

  console.log(`🚀 Server listening at: ${url}}`);
} 
start()
// module.exports.handler = startServerAndCreateLambdaHandler(
//   server,
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );
