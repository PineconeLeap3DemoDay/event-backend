import connectDB from "./db";
import { resolvers } from "./resolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  userTypeDefs,
  eventTypeDefs,
  companyTypeDefs,
  hashtagTypeDefs,
  categoryTypeDefs,
  favoriteTypeDefs,
  ticketTypeDefs,
  countryTypeDefs
} from "./type";
import dotenv from "dotenv";
import authScope from "./utils/authScope";
dotenv.config({
  path: ".env",
});
async function start() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs: [
      userTypeDefs,
      eventTypeDefs,
      companyTypeDefs,
      hashtagTypeDefs,
      categoryTypeDefs,
      favoriteTypeDefs,
      ticketTypeDefs,
      countryTypeDefs
    ],
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const { authorization } = req?.headers;
      if (!authorization) return null;
      const user = await authScope(authorization);
      return {
        user,
      };
    },
  });

  console.log(`🚀 Server listening at: ${url}}`);
}
start();
// module.exports.handler = startServerAndCreateLambdaHandler(
//   server,
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );
