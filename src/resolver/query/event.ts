import {Event} from '../../model/event';
export const events = async () => {
    const events = await Event.find();
    return events;
}