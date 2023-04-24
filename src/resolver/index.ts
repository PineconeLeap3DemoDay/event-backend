import * as Query from '../resolver/query';
import * as Mutation from '../resolver/mutation';
import { dateScalar, emailScaler } from './scaler';
export const resolvers  = {
 Query,
 Mutation,
 Date: dateScalar,
 Email: emailScaler,
}
