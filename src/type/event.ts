export const eventTypeDefs = `#graphql
    type Event {
        _id: ID!
        title: String!
        about: String!
        price: Int!
        category: ID!
        thumbnail: String!
        rating: Int!
        ticketcount: Int!
        organizer: ID!
        expirationdate: String!
        location: String!
    }
    input addEventType {
        title: String!
        about: String!
        price: Int!
        category: ID!
        thumbnail: String!
        ticketcount: Int!
        organizer: ID!
        expirationdate: String!
        location: String!
    }
    # type Mutation {
    #     addCategory(name: String!): Category!
    #     deleteCategory(id: ID!): Boolean!
    #     updateCategory(id: ID!, name: String!): Category!
    # }
    # type Mutation {
    #     addEvent(): Event!
    # }
    type Query {
        events: [Event]
    }
`