import { GraphQLError } from 'graphql';
import {Company} from '../../model';

export const companies = async () => {
    const companies = await Company.find().populate([{
        path: 'events',
        populate: {
            path: 'category',
          } 
    }]);
    return companies;
}
export const company = async (_: any, args: any) => {
    const {id: companyid} = args;
    const company = await Company.findById(companyid).populate('events').populate([{
        path: 'events',
        populate: {
            path: 'category',
          } 
    }]);
    if(!company) {
        throw new GraphQLError("Таны оруулсан компани оршдоггүй")
    }
    return company
}