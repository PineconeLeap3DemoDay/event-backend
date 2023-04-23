import {Event} from '../../model/event';
export const events = async () => {
    const events = await Event.find();
    return events;
}
export const event = async (parent: any, args: any) => {
    const {id: eventid} = args;
    const event = await Event.findById(eventid);
    return event;
}