import { Event, Company, Category } from '../../model';
import { GraphQLError } from 'graphql';
import { AddEventInput, DeleteEventInput, UpdateEventInput } from '../../types'
export const addEvent = async (_: any,
    { event: input }: AddEventInput,
    { user }: any
) => {
    if (user?.variant !== 'company') {
        throw new GraphQLError('Та эвэнт нэмэх эрхгүй байна')
    }
    const { id: companyid } = user;
    const company = await Company.findById(companyid);
    if (!company) {
        throw new GraphQLError('Таны оруулсан компани манайд бүртгэлгүй байна')
    }
    const newEvent = await Event.create(Object.assign(input, { organizer: companyid }));
    //updated the company's events
    await Company.findByIdAndUpdate(companyid, {
        $push: {events: newEvent._id}
    })
    //updated the category events
    await Category.findByIdAndUpdate(input.category,{
        $push: {events: newEvent._id}
    })
    await company.save();
    return {
        success: true,
        event: newEvent
    }
}
export const updateEvent = async (_: any,
    { event: input }: { event: UpdateEventInput },
    { token }: any
) => {
    if (!token || token.variant !== 'company') {
        throw new GraphQLError('Та эвэнт нэмэх эрхгүй байна')
    }
    const event = await Event.findById(input.eventid);
    if (event?.organizer.toString() !== token.id) {
        throw new GraphQLError('Энэ эвэнт таных биш байна')
    }
    delete input.eventid;
    for (let attr in input) {
        //@ts-ignore
        event[attr] = input[attr];
    }
    event?.save();
    return {
        success: true,
        event
    }
}
export const deleteEvent = async (
    _: any, args: DeleteEventInput, context: any
) => {
    const { eventid } = args;

    if (!context.token || context.token.variant !== 'company') {
        throw new GraphQLError('Та эвэнт хасах эрхгүй байна')
    }
    if (!eventid) {
        throw new GraphQLError('Та эвэнтийн id-гаа явуулна уу')
    }
    try {
        const event = await Event.findById(eventid);
        if (event?.organizer.toString() !== context.token.id) {
            throw new GraphQLError('Энэ эвэнт таных биш байна')
        }
        await event?.deleteOne();
        return true
    } catch (error) {
        throw new GraphQLError(`${eventid}-тай эвэнт байдаггүйн байна`)
    }
}