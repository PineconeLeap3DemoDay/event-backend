export const eventTypeDefs = `#graphql
    scalar Date
    
    type Category {
        name: String!
        id: ID!
    }

    type City {
        name: String
        events: [Event]
    }

    type Country {
        name: String,
        cities: [City]
    }
    
    type Event {
        _id: ID!
        title: String!
        about: String!
        thumbnail: String!
        rating: Int!
        ticketcount: Int!
        category: Category!
        country: Country!
        city: City!
        price: Int!
        organizer: Company!
        expirationdate: Int!
        location: String!
        startDate: Date
        endDate: Date
    }
    input AddEventInput {
        title: String!
        about: String!
        price: Int!
        category: ID!
        thumbnail: String
        ticketcount: Int!
        location: String!
        country: ID!
        city: ID!
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
    input eventsQueryInput {
        from: String,
        to: String,
        includes: String
        categoryid: ID
        countryid: ID
        cityid: ID
    }
    type Query {
        events(arg:eventsQueryInput): [Event]
        event(id: ID!): Event!
    }
    type Mutation {
        addEvent(event: AddEventInput): AddAndUpdateEventResponse!
        updateEvent(event: UpdateEventInput): AddAndUpdateEventResponse!
        deleteEvent(eventid: ID!): Boolean!
    }
`;
