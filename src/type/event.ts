export const eventTypeDefs = `#graphql
    scalar Date
    type Company {
        registrationnumber: String!
        rating: Int!
        id: ID!
    }
    type Event {
        _id: ID!
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
    input addEventType {
        title: String!
        about: String!
        price: Int!
        category: ID!
        thumbnail: String
        ticketcount: Int!
        location: String!
    }
    type Query {
        events: [Event]
    }
    type Mutation {
        addEvent(event: addEventType): Boolean!
    }
`;
