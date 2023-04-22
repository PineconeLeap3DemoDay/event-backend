import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./db";
import {GraphQLScalarType,Kind} from 'graphql';
import { resolvers } from "./resolver";
import {
  categoryTypeDefs,
  eventTypeDefs,
  companyTypeDefs,
  userTypeDefs,
} from "./type";
import dotenv from "dotenv";
import authScope from "./utils/authScope";
dotenv.config({
  path: ".env",
});

async function start() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs: [categoryTypeDefs, eventTypeDefs, companyTypeDefs, userTypeDefs],
    resolvers,
  });
  const { url } = await startStandaloneServer(server,
    {listen: { port: 4000 },
    context: async ({ req, res }) => {
      const {authorization} = req?.headers;
      if (!authorization) return null;
      const token = await authScope(authorization);
      return ({
        token
      })
    },
  },
  );

  console.log(`🚀 Server listening at: ${url}}`);
}
start();
// module.exports.handler = startServerAndCreateLambdaHandler(
//   server,
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );
