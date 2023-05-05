import { GraphQLError } from 'graphql';
import { Event } from '../../model/event';

export const events = async (_: any, {arg}: any) => {
    if(arg?.from && arg?.to) {
        const { from, to } = arg;
        console.log(from);
        
        const events = await Event.find({
            startDate: {
                $gte: new Date(from),
                $lt: new Date(to),
            }
        }).populate(['organizer', 'category']);
        return events
    } else if(arg?.includes) {
        const events = await Event.find({
            title: { $regex: arg.includes, "$options": "i" }
        })
        return events;
    }
    const events = await Event.find().populate(['organizer', 'category']);
    return events;
}
export const event = async (parent: any, args: any) => {
    const { id: eventid } = args;
    try {
        const event = await Event.findById(eventid).populate(['organizer', 'category']);
        return event;

    } catch (error) {
        throw new GraphQLError(`${eventid}-тай эвэнт байдаггүйн байна`)

    }
}
