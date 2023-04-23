import * as Query from '../resolver/query';
import * as Mutation from '../resolver/mutation';
import { dateScalar, emailScaler } from './scaler';
import {Event, Company} from '../model'
export const resolvers  = {
 Query,
 Mutation,
 Date: dateScalar,
 Email: emailScaler,
 Company: {
    events: async (parent: any, args: any) => {
        const {_id: companyid} = parent;
        const events = await Event.find({organizer: companyid});
        return  events;
    }
 },
  Event: {
    organizer: async (parent: any, args: any) => {
        const {organizer: organizerid} = parent;
        const company = await Company.findById(organizerid);
        return company;
    }
  }
}
