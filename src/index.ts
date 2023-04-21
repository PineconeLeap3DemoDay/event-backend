import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./db";
import { resolvers } from "./resolver";
import { categoryTypeDefs, eventTypeDefs, companyTypeDefs } from "./type";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

async function start() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs: [categoryTypeDefs, eventTypeDefs, companyTypeDefs],
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}}`);
}
start();
// module.exports.handler = startServerAndCreateLambdaHandler(
//   server,
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );
