export const eventTypeDefs = `#graphql
    scalar Date
    type Company {
        registrationnumber: String!
        rating: Int!
        id: ID!
    }
    type Event {
        id: ID!
        title: String!
        about: String!
        thumbnail: String!
        rating: Int!
        ticketcount: Int!
        category: ID!
        price: Int!
        organizer: Company!
        expirationdate: Int!
        location: String!
        startDate: Date
    }
    input AddEventInput {
        title: String!
        about: String!
        price: Int!
        category: ID!
        thumbnail: String
        ticketcount: Int!
        location: String!
    }
    input UpdateEventInput {
        eventid: String
        title: String
        about: String
        price: Int
        category: ID
        thumbnail: String
        ticketcount: Int
        location: String
    }
    type AddAndUpdateEventResponse {
        success: Boolean!
        event: Event!
    }
    type Query {
        events: [Event]
        event(id: ID!): Event!
    }
    type Mutation {
        addEvent(event: AddEventInput): AddAndUpdateEventResponse!
        updateEvent(event: UpdateEventInput): AddAndUpdateEventResponse!
        deleteEvent(eventid: ID!): Boolean!
    }
`;
