import { GraphQLError } from "graphql";
import { Ticket } from "../../model"

export const buyTicket = async (_: any,
    { eventid }: any,
    { user }: any) => {
    const HaveUserAlreadyBoughtThisTicket = await Ticket.find({
        userid: user.id,
        eventid: eventid
    });
    if (HaveUserAlreadyBoughtThisTicket.length > 0) {
        throw new GraphQLError('You alreday bought this ticket')
    }
    const ticket = await Ticket.create({
        eventid: eventid,
        userid: user.id
    });
    return true
}