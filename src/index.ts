import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import connectDB from './db';
import { resolvers } from './resolver'
import { categoryTypeDefs} from './type'
import dotenv from 'dotenv';
dotenv.config({
  path: '.env'
});

async function start() {
await connectDB();

  const server = new ApolloServer({
    typeDefs: [categoryTypeDefs],
    resolvers,
  });
  const { url } = await startStandaloneServer(server, { 
    context: async ({req, res}) => {
      return ({
      })
    },
    listen: { port: 4000 },
   });

  console.log(`🚀 Server listening at: ${url}}`);
} 
start()
// module.exports.handler = startServerAndCreateLambdaHandler(
//   server,
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );
