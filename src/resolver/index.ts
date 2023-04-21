import { makeExecutableSchema } from '@graphql-tools/schema';
import {mergeTypeDefs} from '@graphql-tools/merge';
import {loadFilesSync} from '@graphql-tools/load-files';
import * as Query from '../resolver/query';
import * as Mutation from '../resolver/mutation';
import { categoryTypeDefs } from '../schema';
const resolvers  = {
 Query,
 Mutation
}
// //read string
// const typeArray = loadFilesSync(process.cwd()+'/build/schema');
// //conver the string to object that graphql can understand

// const typeDefs = mergeTypeDefs(typeArray)

export const schema = makeExecutableSchema({
    typeDefs: [categoryTypeDefs],
    resolvers
});


