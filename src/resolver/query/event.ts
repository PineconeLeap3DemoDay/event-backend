import { GraphQLError } from 'graphql';
import { Event } from '../../model/event';
import aggregatePipeline from '../../utils/pipeline';

export const events = async (_: any, { arg }: any) => {
    if(arg) {
        let pipeline = aggregatePipeline(arg);
        const a = await Event.aggregate(pipeline);
        a.map(b => b.category = b.category[0])
        a.map(b => b.country = b.country[0])
        a.map(b => b.city = b.city[0])
        a.map(b => b.organizer = b.organizer[0])
        return a;
    }
    const events = await Event.find().populate(['organizer', 'category','city','country']);
    return events
}
export const event = async (_parent: any, args: any) => {
    const { id: eventid } = args;
    console.log(eventid)
    try {
        const event = await Event.findById(eventid).populate(['organizer', 'category', 'city', 'country']);
        return event;

    } catch (error) {
        throw new GraphQLError(`${eventid}-тай эвэнт байдаггүйн байна`)

    }
}
