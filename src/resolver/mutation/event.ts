import {Event, Company, AddEventInput} from '../../model';
import {GraphQLError} from 'graphql';
export const addEvent = async (_: any, 
    { event: input }: { event: AddEventInput }, 
    {token}: any
) => {
    if(!token || token.variant !== 'company') {
        throw new GraphQLError('Та эвэнт нэмэх эрхгүй байна')
    }
    const {id: companyid} = token;
    const company = await Company.findById(companyid);
    if(!company) {
        throw new GraphQLError('Таны оруулсан манайд бүртгэлгүй байна')
    }
    const {
        title, category, about,
        location, price,
        ticketcount,thumbnail
    } = input;
    const newEvent = await Event.create({
        title, category, about,
        location, organizer: companyid, price,
        ticketcount,thumbnail
    });
    return true
}