const { ApolloServer } = require('@apollo/server');
const { startServerAndCreateLambdaHandler, handlers } = require('@as-integrations/aws-lambda');
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'world'
    } 
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
module.exports.handler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
