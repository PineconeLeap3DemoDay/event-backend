import { GraphQLError } from 'graphql';
import { Event } from '../../model/event';
import aggregatePipeline from '../../utils/pipeline';

export const events = async (_: any, { arg }: any) => {
    console.log(arg)
    if(arg) {
        let pipeline = aggregatePipeline(arg);
        console.log(pipeline[0])
        const a = await Event.aggregate(pipeline);
        a.map(b => b.category = b.category[0])
        a.map(b => b.country = b.country[0])
        a.map(b => b.city = b.city[0])
        a.map(b => b.organizer = b.organizer[0])
        console.log(a)
        return a;
    }
    const events = await Event.find().populate(['organizer', 'category']);
    return events
}
export const event = async (_parent: any, args: any) => {
    const { id: eventid } = args;
    try {
        const event = await Event.findById(eventid).populate(['organizer', 'category']);
        return event;

    } catch (error) {
        throw new GraphQLError(`${eventid}-тай эвэнт байдаггүйн байна`)

    }
}
