export const userTypeDefs = `#graphql
    scalar Date
    scalar Email

    type User {
        _id: ID!
        email: Email!
        lastName: String!
        password: String!
        firstName: String!
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
        getUsers(page: Int!, limit: Int!): getUsersResult!
    }
    type Mutation {
        logout: Boolean!
        deleteUser(_id: ID!): Boolean!
        signup(user: addUserInput!): getUserResult!
        editUser(_id: ID!, user: editUserInput!): Boolean!
        signin(email: String!, password: String!): getUserResult!
    }
`;
