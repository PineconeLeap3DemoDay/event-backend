export const userTypeDefs = `#graphql
    scalar Date
    scalar Email
    type Hashtag {
        id: ID!
        name: String
    }
    type Notification {
        title: String!
        thumbnail: String!
        subtitle: String
        id: ID!
    }
    type User {
        _id: ID
        email: Email!
        lastName: String!
        password: String!
        firstName: String!
        hashtags: [Hashtag]
        favorites: [Event]
        tickets: [Event]
        notifications: [Notification]
    }
    input addUserInput {
        email: Email!
        lastName: String!
        firstName: String!
        password: String!
    }
    input editUserInput {
        email: String
        lastName: String
        firstName: String
        password: String
    }
    type MyHashTagEvent {
        _id: ID!
        title: String!
        about: String!
        thumbnail: String!
        rating: Int!
        ticketcount: Int!
        category: Category!
        price: Int!
        organizer: Company!
        expirationdate: Int!
        location: String!
        startDate: Date
        endDate: Date
    }
    type getUsersResult {
        users: [User!]
        totalPages: Int!
    }
    type getUserResult {
        user: User!
        token: String!
    }
    type Query {
        getUser: User!
        myHashtagEvents: [MyHashTagEvent]
        myTickets: [Event]
        getUsers(page: Int!, limit: Int!): getUsersResult!
    }
    type Mutation {
        logout: Boolean!
        followCompany(companyid: ID!): Boolean!
        unfollowCompany(companyid: ID!): Boolean!
        deleteUser(_id: ID!): Boolean!
        signup(user: addUserInput!): getUserResult!
        editUser(user: editUserInput!): Boolean!
        signin(email: String!, password: String!): getUserResult!
    }
`;
