export const companyTypeDefs = `#graphql
    type Company {
        _id: ID!
        email: String!
        name: String!
        password: String!
        registerId: String!
    }
    input addUserInput {
        email: String!
        name: String!
        password: String!
        registerId: String!
    }
    input editUserInput {
        email: String
        name: String
        password: String
        registerId: String
    }
    type getCompanyResult {
        company: [Company!]
        totalPages: Int!
    }
    type Query {
        getCompany(_id): User!
    }
    type Mutation {
        logout: Boolean!
        deleteCompany(_id: ID!): Boolean!
        signup(user: addUserInput!): Boolean!
        signin(email: String!, password: String!): Boolean!
        editCompany(_id: ID!, user: editUserInput!): Boolean!
    }
`;
