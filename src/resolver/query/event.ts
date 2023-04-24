import { GraphQLError } from 'graphql';
import { Event } from '../../model/event';
export const events = async () => {
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