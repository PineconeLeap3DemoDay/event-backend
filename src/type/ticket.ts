export const ticketTypeDefs = `#graphql
type Ticket {
    userid:ID
    eventid:ID
}
type Mutation {
    buyTicket(eventid: String): Boolean
}
`