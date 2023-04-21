import { categorySchema } from '../schema/category';
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as Query from '../resolver/query';
import * as Mutation from '../resolver/mutation';
const resolvers  = {
 Query,
 Mutation
}
export const schema = makeExecutableSchema({
    typeDefs: [categorySchema],
    resolvers
});


